function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}
function formatDate (date,mark='-') {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const t1 = [year, month, day].map(formatNumber).join(mark)

  return `${t1}`
}
function showToast(tip,icon='none'){
  wx.showToast({
    title: tip,
    icon: icon,
    duration: 2000
  })
}
function isPhone(tel) {
  var reg = /^1[2|3|4|5|6|7|8|9]\d{9}$/;
  if (reg.test(tel)) {
    return true;
  } else {
    return false;
  }
}

export default {
  formatNumber,
  formatTime,
  showToast,
  isPhone,
  formatDate
}
