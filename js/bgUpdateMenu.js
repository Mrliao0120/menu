//查看详情 以及更新ajax
var  id=null;
var queryLocalHostImage=moviesUrl+"/util/queryLocalHostImage";
var updateMenuAe=moviesUrl+"/menuAeBackground/updateMenuAe";
var user=localStorage.getItem("BackgroundToken");
var uploadFile=moviesUrl+"/util/uploadFile";

var image="";
layui.use('upload', function(){
    var $ = layui.jquery
        ,upload = layui.upload;

    //普通图片上传
    var uploadInst = upload.render({
        elem: '#uploadImage',
        url: uploadFile,
        method:"POST",
        contentType:"multipart/form-data",
        field:'file',
        /*before: function(obj){
            //预读本地文件示例，不支持ie8
            obj.preview(function(index, file, result){
                $('#image').attr('src', result); //图片链接（base64）
            });
        },*/
        done: function(res){
            //如果上传失败
            if(res.code!=200){
                return layer.msg('上传失败');
            }else {
                //上传成功  本地图片地址
                $("#images").attr("src",queryLocalHostImage+"?pathName="+res.data);
                //$("#images").attr("value",res.data);
                image=res.data;
                return layer.msg('上传成功');
            }
        }
        ,error: function(){
            //失败状态，实现重传
            var demoText = $('#demoText');
            demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
            demoText.find('.demo-reload').on('click', function(){
                uploadInst.upload();
            });
        }
    });
});





$(document).ready(function(){
     var data2=localStorage.getItem("menuData");
    var  datas=JSON.parse(data2);
   if(datas!=null){
       id=datas.id;
       $("#images").attr("src",queryLocalHostImage+"?pathName="+datas.menuImage);
       $("#menuText").val(datas.menuText);
       $("#id").val(id);
       $("#menu_name").val(datas.menuName);
       $("#menu_price").val(datas.menuPrice);
       $("#menu_floor").val(datas.menuFloor);
       $("#menu_window").val(datas.menuWindow);
       $("#canteen_name").val(datas.canteenName);
   }
});



function updateMenu() {
    let  images=null;
    var data2=localStorage.getItem("menuData");
    var  data4=JSON.parse(data2);

    if(image==null||image==""){
        images= data4.menuImage;
    }else {
        images=image;
    }
    let  menuText=$("#menuText").val();
    let  id=$("#id").val();
    let  menu_name=$("#menu_name").val();
    let  menu_price=$("#menu_price").val();
    let  menu_floor=$("#menu_floor").val();
    let  menu_window=$("#menu_window").val();
    let  canteen_name=$("#canteen_name").val();
    let requestData={"menuName":menu_name,"menuPrice":menu_price,
        "menuFloor":menu_floor,"menuWindow":menu_window,
        "canteenName":canteen_name,"menuText":menuText,
        "menuImage":images,"id":id};
    $.ajax({
        url:updateMenuAe,
        type:"POST",
        headers: {
            "BackgroundToken" : user
        },
        contentType:"application/json",
        data:JSON.stringify(requestData),
        dataType:"json",
        timeout:3000,
        success:function (data,status,request) {
            if (data.code==200){
                alert("修改成功");
            }else {
                alert(data.msg);
            }
        }
    })
}