//查看详情 以及更新ajax
var  id=null;
var queryLocalHostImage=moviesUrl+"/util/queryLocalHostImage";
var updateMenuAe=moviesUrl+"/menuAeBackground/updateMenuAe";
var user=localStorage.getItem("BackgroundToken");




$(document).ready(function(){
     var data2=localStorage.getItem("menuData");
    var  data=JSON.parse(data2);
   if(data!=null){
       id=data.id;
       $("#images").attr("src",queryLocalHostImage+"?pathName="+data.menuImage);
       $("#menuText").val(data.menuText);
       $("#id").val(id);
       $("#menu_name").val(data.menuName);
       $("#menu_price").val(data.menuPrice);
       $("#menu_floor").val(data.menuFloor);
       $("#menu_window").val(data.menuWindow);
       $("#canteen_name").val(data.canteenName);
   }
});



function updateMenu() {
    let  images=null;
    var data2=localStorage.getItem("menuData");
    var  data=JSON.parse(data2);

    if(image==null||image==""){
        images= data.menuImage;
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
    let data={"menuName":menu_name,"menuPrice":menu_price,
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
        data:JSON.stringify(data),
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