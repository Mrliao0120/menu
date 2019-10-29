//添加菜品
var uploadFile=moviesUrl+"/util/uploadFile";
var queryLocalHostImage=moviesUrl+"/util/queryLocalHostImage";

var insertMenuAe=moviesUrl+"/menuAeBackground/insertMenuAe";
var user=localStorage.getItem("BackgroundToken");

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

function addMenuAe() {
    let  menuName=$("#menu_name").val();
    if(menuName==null||menuName==""){
        alert("请输入菜品名称");
        return;
    }
    let  menuPrice=$("#menu_price").val();
    let  menuFloor=$("#menu_floor").val();
    let  menuWindow=$("#menu_window").val();
    let  canteenName=$("#canteen_name").val();
    let  menuText=$("#menuText").val();
    let  menuImage=image;
    let data={"menuName":menuName,"menuPrice":menuPrice,
                "menuFloor":menuFloor,"menuWindow":menuWindow,
                "canteenName":canteenName,"menuText":menuText,
                "menuImage":menuImage};
    $.ajax({
        url:insertMenuAe,
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
                    window.location.href="../background/addMenu.html";
            }else {
                alert(data.msg);
            }
        }
    });


}