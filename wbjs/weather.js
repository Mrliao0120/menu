var  queryWeatherIndex=moviesUrl+"/weatherInfo/insertWeatherInfoDO";
function findWeather(){
    var newInf=$("#newsId").val();
    var user=localStorage.getItem("webToken");
    var  requestData={"location":newInf};
    $.ajax({
        url:queryWeatherIndex,
        type:"POST",
        data:JSON.stringify(requestData),
        contentType:"application/json",
        headers: {
            "token" : user
        },
        dataType:"json",
        timeout:3000,
        success:function (data) {
            if (data.code==200){
                if (data.data!=null){
                    localStorage.setItem("weatherData",data.data);
                    window.location.href="weatherInfoInfo.html";
                }else {
                    alert(data.msg);
                }
            }else {
                alert(data.msg);
            }
        }
    });

}