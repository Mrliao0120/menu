//后台登录
var  loginUrl=moviesUrl+"/account/login";



function login() {
    let  username=$("#username").val();
    let  password=$("#password").val();
    if (username==null||username==""||username.length<=0){
        alert("请输入账号!");
        return;
    }
    if (password==null||password==""||password.length<=0){
        alert("请输入密码!");
        return;
    }
    let data={"username":username,"password":password};
    $.ajax({
        url:loginUrl,
        type:"POST",
        contentType:"application/json",
        data:JSON.stringify(data),
        dataType:"json",
        timeout:3000,
        success:function (data,status,request) {
            if (data.code==200){
                if (data.data!=null){
                    var token=request.getResponseHeader("BackgroundToken");
                    localStorage.setItem("BackgroundToken",token);
                    localStorage.setItem("username",data.data.username);
                    sessionStorage.setItem("bgnickname",data.data.nickname);
                    window.location.href="../background/index.html";
                }else {
                    alert(data.msg);
                }
            }else {
                alert(data.msg);
            }
        }
    })
}