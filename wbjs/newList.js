var user=localStorage.getItem("webToken");

var queryLocalHostImage=moviesUrl+"/util/queryLocalHostImage";

var queryMyEvaluate=moviesUrl+"/menuEvaluate/queryMyEvaluate";
var queryByAndIndexId=moviesUrl+"/menu/queryByAndIndexId";

var deleteMyEvaluate=moviesUrl+"/menuEvaluate/deleteMyEvaluate";


function  queryMenuEvalueateId(ids) {
    var user=localStorage.getItem("webToken");
    var  id={id:ids};
    $.ajax({
        url:queryByAndIndexId,
        type:"POST",
        data:id,
        headers: {
            "token" : user
        },
        dataType:"json",
        timeout:3000,
        success:function (data) {
            if (data.code==200){
                if (data.data!=null){
                    //sessionStorage.setItem("menuData",data.data);
                    localStorage.setItem("menuEvaluateDetailIndex",JSON.stringify(data.data));
                    window.location.href="menuAndEvaluateDetail.html";
                }else {
                    alert(data.msg);
                }
            }else {
                alert(data.msg);
            }
        }
    });
}

var  queryNewsIndex=moviesUrl+"/web/news/info/findNewsInfoList";
$(document).ready(function (){
    var user=localStorage.getItem("webToken");
    var  requestData={};
    $.ajax({
        url:queryNewsIndex,
        type:"POST",
        data:JSON.stringify(requestData),
        contentType:"application/json",
        headers: {
            "token" : user
        },
        dataType:"json",
        timeout:3000,
        success:function (data) {
            if (data.code==200){
                if (data.data!=null){
                  var d=  data.data;
                    var htmlInner1=" ";
                    var htmlInner2=" ";
                    var htmlInner3=" ";
                    $.each(d,function(i,item){
                        if (i==0){
                            var  htmlInner="<a href=\"#\" onclick='queryNews("+item.id+")'><img src=\"http://localhost:3535/util/queryLocalHostImage?pathName="+item.coverImg+"\"/>" +
                                "<h2 class=\"title\">"+item.title+"</h2></a>";
                            $("#title1").append(htmlInner)
                        }
                       else if (i==1){
                            var  htmlInner="<a href=\"#\" onclick='queryNews("+item.id+")'><img src=\"http://localhost:3535/util/queryLocalHostImage?pathName="+item.coverImg+"\"/>" +
                                "<h2 class=\"title\">"+item.title+"</h2>";
                            $("#title2").append(htmlInner)
                        }
                        else if (i==2){
                            var  htmlInner="<a href=\"#\" onclick='queryNews("+item.id+")'><img src=\"http://localhost:3535/util/queryLocalHostImage?pathName="+item.coverImg+"\"/>" +
                                "<h2 class=\"title\">"+item.title+"</h2></a>";
                            $("#title3").append(htmlInner)
                        }else if (i>=3&&i<6){
                            htmlInner1+="<li><a href='#' onclick='queryNews("+item.id+")'><span>"+item.title+"</span></a></li>";

                        }else if (i>=6&&i<9){
                              htmlInner2+="<li><a href='#' onclick='queryNews("+item.id+")'><span>"+item.title+"</span></a></li>";

                        }else if (i>=9&&i<12){
                            htmlInner3+="<li><a href='#' onclick='queryNews("+item.id+")'><span>"+item.title+"</span></a></li>";

                        }

                    });
                    $("#text1").append(htmlInner1);
                    $("#text2").append(htmlInner2);
                    $("#text3").append(htmlInner3);
                }else {
                    alert(data.msg);
                }
            }else {
                alert(data.msg);
            }
        }
    });
});


var  selectByPrimaryKey=moviesUrl+"/web/news/info/selectByPrimaryKey";
function queryNews(id) {
    var user=localStorage.getItem("webToken");
    $.ajax({
        url:selectByPrimaryKey+"?id="+id,
        type:"GET",
        headers: {
            "token" : user
        },
        dataType:"json",
        timeout:3000,
        success:function (data) {
            if (data.code==200){
                if (data.data!=null){
                    localStorage.setItem("newsInfo",JSON.stringify(data.data));
                    window.location.href="newsInfo.html";
                }else {
                    alert(data.msg);
                }
            }else {
                alert(data.msg);
            }
        }
    });
}




