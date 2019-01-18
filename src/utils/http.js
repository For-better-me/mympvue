import utils from './index.js'
import store from '../store/index.js'
let _http = function (opt){//封装请求
    var self = this
    const _promise =  new Promise((resolve,reject) => {
      let defaultOpt = {
          loading: false, // 是否显示Loading提示窗
          method: 'GET', // 请求方法，必须大写！！
          data: {}, // 入参
          header: {
              token: wx.getStorageSync('token') ? wx.getStorageSync('token') : ''
          }
      }
        // 合并
        opt = Object.assign({},defaultOpt,opt)
        let loading = opt.loading // 是否显示加载提示弹窗
        wx.request({
            url:opt.url,
            method: opt.method,
            data: opt.data,
            header: opt.header,
            success:(res)=>{
                if(res.data.code == 10001){
                    reject({
                        code: 10001,
                        msg: opt.url + '接口需要token参数3，但系统中不存在token'
                    })
                } else if(res.data.code == 0){
                    wx.hideLoading()
                    resolve(res.data.data)
                    console.log('请求成功',opt.url,res.data);
                } else{
                    wx.hideLoading()
                    reject(res.data)
                }
            },
            fail:(res)=>{
                reject(res)
                console.log(opt.url,'通信接口失败')
            }
        })
        if(loading){
            wx.showLoading({
                title: '加载中',
                mask: true
            })
        }
    })

    return _promise.catch(err=>{
        wx.hideLoading()
        if(err.code == 10001){
            wx.hideLoading()
            console.log('err10001',err.msg)
            wx.login({
              success(resp) {
                if (resp.code) {
                  let now = Date.now();
                  console.log(now);
                  store.commit('update',{'isLogin':true,'code':resp.code,'time':now})
                } else {
                  console.log('登录失败！' + resp.errMsg)
                }
              }
            })
            
        }
        else if(err.code == -1){
            utils.showToast(err.msg)
            console.log('非err10001',err.msg,opt.url)
        }
        return Promise.reject({
            code: err.code,
            msg: err.msg
        })
    })

}


export default _http