function recRule(type,val) {
   switch(type)
   {    
       case 3:
         addrMac(val)
         break;
       case 4:
         numFloat(val)
         break;
       case 10:
         filePath(val)
         break;
       case 11:
         numberInt(val,0,255)
         break;
       case 12:
         numberInt(val,0,65535)
         break;
       case 13:
         numberInt(val,0,100)
         break;
       
   }
}

// function filePath(val) {//文件路径-10
//     var reg = (^[A-Za-z]{1}:\/|^\/)([\w]*\/)*\w+\.{1}[a-zA-Z]+$
//     if(reg.test(val)){
//         return true;
//     } else{
//         return false;
//     }
// }
function numberInt(num,min,max) {//无符号整型 11/12/13
    var reg = ^\d+$ ;
    if(reg.test(num) && num<=max && num>=min){
        return true;
    } else{
        return false;
    }
}

function addrMac(val) 
{ 
    //mac地址正则表达式 --3
    var reg_name=/[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}/; 
    if(reg_name.test(val)){ 
        return true; 
    } 
        return false; 
} 
function numFloat(num) {// 浮点数  >=0 --4
    var reg = ^\d+(\.\d+)?$;
    if(reg.test(num)){
        return true;
    } else{
        return false;
    }
}
export default recRule;