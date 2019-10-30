//添加菜品


var addAccount=moviesUrl+"/backGroundUser/userRegistered";
var user=localStorage.getItem("BackgroundToken");


function addMenuAe() {
    let  account=$("#account").val();
    if(account==null||account==""){
        alert("请输入账号");
        return;
    }
    let  password=$("#password").val();
    if(password==null||password==""){
        alert("请输入密码");
        return;
    }
    let  nickname=$("#nickname").val();
    if(nickname==null||nickname==""){
        alert("请输入昵称");
        return;
    }
   // let  systemLevel= $("#systemLevel").find("option:selected").val();
   /* let  systemLevel=$("#systemLevel").val();*/
    let data={"username":account,"password":password,
                "nickname":nickname};
    $.ajax({
        url:addAccount,
        type:"POST",
        headers: {
            "BackgroundToken" : user
        },
        contentType:"application/json",
        data:JSON.stringify(data),
        dataType:"json",
        timeout:3000,
        success:function (data) {
            if (data.code==200){
                alert("添加成功");
                window.location.reload();
            }else {
                alert(data.msg);
            }
        }
    });


}