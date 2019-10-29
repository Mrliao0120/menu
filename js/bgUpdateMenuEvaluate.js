var user=localStorage.getItem("BackgroundToken");

var addReturnMenuEvaluate=moviesUrl+"/menuEvaluateBackground/addReturnMenuEvaluate";


var userEvaluateId=null;
$(document).ready(function(){
    var data2=localStorage.getItem("menuEvaluateDetail");
    var  datas=JSON.parse(data2);
    if(datas!=null){
        id=datas.id;
        $("#id").val(id);
        userEvaluateId=id;
        $("#menuName").val(datas.menuName);
        $("#nickName").val(datas.nickName);
        $("#menuEvaluate").val(datas.menuEvaluate);
        $("#menuEvaluateScore").val(datas.menuEvaluateScore);
        if(datas.returnMenuEvaluate!=null){
            $("#returnInfo").css("display", "none");
            $("#returnNickName").val(datas.returnMenuEvaluate.nickName);
            $("#returnMenuEvaluate").val(datas.returnMenuEvaluate.menuEvaluate);
        }else {
            $("#returnText").css("display", "none");
        }
    }
});




function addReturnEvaluate() {
    let  textEvaluate=$("#textEvaluate").val();
    if(textEvaluate==null||textEvaluate.length<=0){
            alert("请填写回复内容");
            return;
    }
    let requestData={"id":userEvaluateId,"textEvaluate":textEvaluate};
    $.ajax({
        url:addReturnMenuEvaluate,
        type:"POST",
        headers: {
            "BackgroundToken" : user
        },
        data:requestData,
        dataType:"json",
        timeout:3000,
        success:function (data,status,request) {
            if (data.code==200){
                alert("回复成功");
                window.location.href="../background/menuEvaluate.html";
            }else {
                alert(data.msg);
            }
        }
    })

}