
var updatePassWordAndNickNames=moviesUrl+"/user/updatePassWordAndNickName";



var user=localStorage.getItem("webToken");
function updatePassWordAndNickName() {
    var password=$("#password").val();
    var newPassword=$("#newPassword").val();
    if(newPassword!=null){
        if (password==null){
            alert("请输入原密码!")
        }
    }
    var nickname=$("#nickname").val();
    var  datas={"newPassWord":newPassword,"password":password,"nickname":nickname};
    $.ajax({
        url:updatePassWordAndNickNames,
        type:"POST",
        data:JSON.stringify(datas),
        headers: {
            "token" : user
        },
        contentType:"application/json",
        dataType:"json",
        timeout:3000,
        success:function (data) {
            if (data.code==200){
                if(nickname!=null){
                    sessionStorage.setItem("wbNickname",nickname);
                }
                if(password!=null&&newPassword!=null){
                    localStorage.setItem("webToken",null);
                }
                window.location.reload();
            }else {
                alert(data.msg);
            }
        }
    });


}