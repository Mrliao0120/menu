
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
    var  datas={"newPassWord":newPassWord,"password":password,"nickname":nickname};
    $.ajax({
        url:updatePassWordAndNickNames,
        type:"POST",
        data:JSON.parse(datas),
        headers: {
            "token" : user
        },
        contentType:"application/json",
        dataType:"json",
        timeout:3000,
        success:function (data) {
            if (data.code==200){
                window.location.reload();
            }else {
                alert(data.msg);
            }
        }
    });


}