let baseUrl = 'https://www.99tjit.cn/api';
let api = {
    banner:`${baseUrl}/focus/getFcousList`,//首页banner图--get
    reserveOption:`${baseUrl}/Reserve/reserveOption`,//预约表单选项--get
    login:`${baseUrl}/user/login`,//post
    detail:`${baseUrl}/Category/getCategoryInfo`,//简介详情(租赁详情共用)--get
    leaseList:`${baseUrl}/Category/getReserveList`,//租赁预约列表--get
    mediaList:`${baseUrl}/Info/getInfoList`,//创意视频作品列表--get
    navList:`${baseUrl}/Category/getCategoryList`,//首页分类--get

}

export default api