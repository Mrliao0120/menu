//公共工具js
//window.moviesUrl="//biyesehji.wicp.vip:42410";
window.moviesUrl="//127.0.0.1:3535";


/*function   formatDate(now)   {
    let datetime = new Date();
    datetime.setTime(now);
    let   year=datetime.getUTCFullYear();
    let   month=datetime.getMonth()+1;
    let   date=datetime.getDay();
    return   year+"年"+month+"月"+date+"日";
}*/
function formatDate(date){
    date=date || new Date();
    var fmt=fmt || 'yyyy-MM-dd hh:mm:ss';
    if(Object.prototype.toString.call(date).slice(8,-1)!=='Date'){
        date=new Date(date)
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + ''
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
        }
    }
    return fmt
}
function padLeftZero (str) {
    return ('00' + str).substr(str.length)
};



