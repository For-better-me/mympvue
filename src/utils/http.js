let _http = function (opt){//封装请求
    var self = this
      const _promise =  new Promise((resolve,reject) => {
      let checkToken = true // token是否验证通过
      // 检测该接口是否需要token
      if (/^token\|/.test(opt.url)) {
          if (!wx.getStorageSync('token')) {
              checkToken = false
              reject({
                  code: 998,
                  msg: opt.url + '接口需要token参数2，但系统中不存在token'
              })
          }
          let defaultOpt = {
              loading: true, // 是否显示Loading提示窗
              method: 'GET', // 请求方法，必须大写！！
              data: {}, // 入参
              header: {
                  token: wx.getStorageSync('token') ? wx.getStorageSync('token') : ''
              }
          }
          opt.url = opt.url.replace('token|', '')
          // 合并
          opt = Object.assign({},defaultOpt,opt)
      }
      if(checkToken){
        let loading = opt.loading // 是否显示加载提示弹窗
        wx.request({
          url:opt.url,
          method: opt.method,
          data: opt.data,
          header: opt.header,
          success:(res)=>{
            if(res.data.code == 998){
                reject({
                    code: 998,
                    msg: opt.url + '接口需要token参数3，但系统中不存在token'
                })
            } else if(res.data.code == 100){
                wx.hideLoading()
                resolve(res)
                console.log('请求成功',opt.url,res);
            } else if(res.data.code == 999){
                reject(res.data)
                console.log(opt.url,'系统出错了')
            } else if(res.data.code == 101){
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
      }
    })

    return _promise.catch(err=>{
        if(err.code == 998){
            console.log('err998',err.msg)
            wx.reLaunch({
              url: '/pages/login/login'
            })
        }
        else if(err.code = 101){
            this.showToast(err.msg)
            console.log('非err998',err.msg,opt.url)
        }
        return Promise.reject({
            code: err.code,
            msg: err.msg
        })
    })

  }


  export default {
    _http
  }