////后台登录验证
var   queryToken=moviesUrl+"/account/queryToken";


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
                       var systemLevel=localStorage.getItem("systemLevel");
                        if(systemLevel!=null&&systemLevel==1){
                            var htmls="<li class=\"layui-nav-item layui-nav-itemed\" id=\"userMenu\">\n" +
                                "                    <a href=\"javascript:;\">用户相关</a>\n" +
                                "                    <dl class=\"layui-nav-child\">\n" +
                                "                        <dd><a href=\"userAccount.html\">管理员列表</a></dd>\n" +
                                "                        <dd><a href=\"accountUser.html\">用户列表</a></dd>\n" +
                                "                    </dl>\n" +
                                "                </li>";
                            $("#addUserMenu").append(htmls);
                        }
                      var bgNickName=sessionStorage.getItem("bgnickname");
                      if(bgNickName!=null){
                          $("#userName").html(bgNickName);
                      } else {
                          var userName=localStorage.getItem("username");
                          $("#userName").html(userName);
                      }
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