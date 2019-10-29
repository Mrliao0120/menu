//后台修改密码
var  loginUrl=moviesUrl+"/account/updatePassWord";

var user=localStorage.getItem("BackgroundToken");

function updatePassword() {
    let  password=$("#password").val();
    let  newPassword=$("#newPassword").val();
    if (password==null||password==""||password.length<=0){
        alert("请输入原密码!");
        return;
    }
    if (newPassword==null||newPassword==""||newPassword.length<=0){
        alert("请输入新密码!");
        return;
    }
    let data={"passWord":password,"newPassWord":newPassword};
    $.ajax({
        url:loginUrl,
        type:"POST",
        headers: {
            "BackgroundToken" : user
        },
        data:data,
        dataType:"json",
        timeout:3000,
        success:function (data,status,request) {
            if (data.code==200){
                localStorage.setItem("BackgroundToken",null);
                localStorage.setItem("username",null);
                alert("修改成功");
                window.location.href="../background/backgroundLogin.html";
            }else {
                alert(data.msg);
            }
        }
    })
}