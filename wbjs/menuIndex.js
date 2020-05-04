



var queryByAndIndexId=moviesUrl+"/menu/findMenuAeLimit5";

$(document).ready(function (){
    var user=localStorage.getItem("webToken");
    $.ajax({
        url:queryByAndIndexId,
        type:"POST",
        data:null,
        headers: {
            "BackgroundToken" : user
        },
        timeout:3000,
        success:function (data) {
            if (data.code==200){
                let htmls=" ";
                $.each( data.data, function (i, item){
                    console.log(item.menuImage);
                    // $("#d+"+i+"").append("<img src="+"//localhost:3535/util/queryLocalHostImage?pathName="+item.menuImage +"/>")
                    htmls+="<li><img width="+960+" height="+540+" src="+"//localhost:3535/util/queryLocalHostImage?pathName="+item.menuImage +"></li>";

                });
               $("#carousel").append(htmls);
            }else {

            }
        }
    })
});
