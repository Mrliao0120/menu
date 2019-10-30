////后台登录验证
var   queryToken=moviesUrl+"/user/queryToken";


$(document).ready(function (){
   //登录效验
    var user=localStorage.getItem("webToken");
    if(user==null){
        window.location.href="./Login.html";
    }else {
        $.ajax({
            url:queryToken,
            type:"POST",
            headers: {
                "token" : user
            },
            dataType:"json",
            timeout:3000,
            success:function (data,status,request) {
                if (data.code==200){
                    if (data.data!=null){
                        $("#updateUser").html("<a href=\"updatePassWord.html\">修改用户信息</a>");
                        $("#loginOut").html("<a href=\"#\" onclick=\"loginOut()\">退出登录</a>");
                        $("#login").hide();
                      var bgNickName=sessionStorage.getItem("wbNickname");
                      if(bgNickName!=null){
                          $("#userName").html(bgNickName);
                      } else {
                          var userName=localStorage.getItem("wbUsername");
                          $("#userName").html(userName);
                      }
                    }else {
                        window.location.href="./Login.html";
                    }
                }else {
                    window.location.href="./Login.html";
                }
            }
        });
    }


});