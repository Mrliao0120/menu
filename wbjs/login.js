var  login=moviesUrl+"/user/login";



function wbLogin() {
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
        url:login,
        type:"POST",
        contentType:"application/json",
        data:JSON.stringify(data),
        dataType:"json",
        timeout:3000,
        success:function (data,status,request) {
            if (data.code==200){
                if (data.data!=null){
                    var token=request.getResponseHeader("token");
                    localStorage.setItem("webToken",token);
                    localStorage.setItem("wbUsername",data.data.username);
                    sessionStorage.setItem("wbNickname",data.data.nickname);
                    window.location.href="./index.html";
                }else {
                    alert(data.msg);
                }
            }else {
                alert(data.msg);
            }
        }
    })
}
