var   queryToken=moviesUrl+"/account/queryToken";

//后台登录验证
$(document).ready(function (){
   //登录效验
    var user=localStorage.getItem("BackgroundToken");
    if(user==null){
        window.location.href="../background/backgroundLogin.html";
    }else {
        $.ajax({
            url:queryToken,
            type:"POST",
            headers: {
                "BackgroundToken" : user
            },
            dataType:"json",
            timeout:3000,
            success:function (data,status,request) {
                if (data.code==200){
                    if (data.data!=null){
                    }else {
                        window.location.href="../background/backgroundLogin.html";
                    }
                }else {
                    window.location.href="../background/backgroundLogin.html";
                }
            }
        });
    }


});