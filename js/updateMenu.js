//查看详情 以及更新ajax
var  id=null;
var queryLocalHostImage=moviesUrl+"/util/queryLocalHostImage";




$(document).ready(function(){
     var data2=localStorage.getItem("menuData");
     var v1=JSON.stringify(data2);
    var  data=JSON.parse(v1);
   if(data!=null){
     var datas=JSON.stringify(data);
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