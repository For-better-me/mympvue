import $http from './http.js'
import $api from './api.js'
function login(){
    var self = this
    _login()
    function _login(){
        wx.login({
          success: res => {
            if(res.errMsg = 'login:ok'){
                $http({
                    loading:false,
                    url:$api.openId,
                    data:{
                        code:res.code
                    }
                })
                .then(res => {
                    let now = new Date().getTime()
                    wx.setStorageSync('token',res.data.data.token)
                    console.log('token,success');
                    return res.data.data
                })
                .catch(err=>{
                    _login()
                })
               
            }
            
          }
        })
    }
}

export default login