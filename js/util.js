//公共工具js
window.moviesUrl="//127.0.0.1:3535";



function   formatDate(now)   {
    let datetime = new Date();
    datetime.setTime(now);
    let   year=datetime.getUTCFullYear();
    let   month=datetime.getMonth()+1;
    let   date=datetime.getDay();
    return   year+"年"+month+"月"+date+"日";
}



