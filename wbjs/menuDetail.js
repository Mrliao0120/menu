var user=localStorage.getItem("webToken");

var queryLocalHostImage=moviesUrl+"/util/queryLocalHostImage";
var queryByPageMenuEvaluate=moviesUrl+"/menuEvaluate/queryByPageMenuEvaluate";
var addMenuEvaluate=moviesUrl+"/menuEvaluate/addMenuEvaluate";
var queryByAndIndexId=moviesUrl+"/menu/queryByAndIndexId";
$(document).ready(function (){
    var data2=localStorage.getItem("menuEvaluateDetailIndex");
    var  datas=JSON.parse(data2);
    if(datas!=null){
        $("#menuName").val(datas.menuName);
        $("#menuEvaluateScore").val(datas.menuEvaluateScore);
        $("#menuPrice").val(datas.menuPrice);
        $("#images").attr("src",queryLocalHostImage+"?pathName="+datas.menuImage);
        $("#menuFloor").val(datas.menuFloor);
        $("#menuWindow").val(datas.menuWindow);
        $("#canteenName").val(datas.canteenName);
        $("#menuText").val(datas.menuText);
        if(datas.menuEvaluate!=null){
            $("#myEvaluateText").html(datas.menuEvaluate.menuEvaluate);
            $("#myEvaluateScore").html(datas.menuEvaluate.menuEvaluateScore);
            if(datas.queryMenuEvaluateDetailVOS!=null){
                $("#managerText").html(datas.queryMenuEvaluateDetailVOS[0].menuEvaluate);
            }else {
                $("#managerCentre").hide();
            }
            $("#returnInfo").hide();
        }else {
            $("#myEvaluate").hide();
            $("#returnText").hide();
        }
    }
});



layui.use('table', function()
{
    var table = layui.table;
    var user=localStorage.getItem("webToken");
    var data2=localStorage.getItem("menuEvaluateDetailIndex");
    var  datas=JSON.parse(data2);
    table.render({
        id:'wbIndex',
        elem: '#table-menu-data',
        url:queryByPageMenuEvaluate,
        method:'POST',
        headers: {
            "token" : user
        },
        where:{id:datas.id},
        contentType: 'application/json' ,
        height: 'full-100',
        skin:'line',
        //设置分页参数
        request: {
            pageName:"currPage",
            limitName:"pageSize"
        },
        response: {
            statusName: 'code' //规定数据状态的字段名称，默认：code
            ,statusCode: 200 //规定成功的状态码，默认：0
            ,msgName: 'msg' //规定状态信息的字段名称，默认：msg
        },page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
            layout: ['limit', 'count', 'prev', 'page', 'next', 'skip','refresh'] //自定义分页布局
            ,curr: 1 //设定初始在第 5 页
            ,groups: 3 //只显示 1 个连续页码
        },
        cols: [[
            {field:'nickName', width:100, title: '用户昵称'},
            {field:'menuEvaluate', width:180, title: '评价'},
            {field:'menuEvaluateScore', width:100, title: '评价分数'},
            {field:'gmtCreate', width:200, title: '创建日期'
                ,templet : function (data) {return formatDate(data.gmtCreate);}
            }
        ]],

        //格式化数据
        parseData: function (res) {
            return{
                "code": res.code, //解析接口状态
                "msg": res.msg, //解析提示文本
                "count": res.data.total, //解析数据长度
                "data": res.data.list //解析数据列表
            }
        },
    });


});

//提交新评价
function addEvalueate() {
    var data2=localStorage.getItem("menuEvaluateDetailIndex");
    var user=localStorage.getItem("webToken");
    var  scoreEvaluate=$("#scoreEvaluate").val();
    if(scoreEvaluate==null||scoreEvaluate<0||scoreEvaluate>100){
        alert("评分不能为空/不能超过最大数")
        return;
    }
    var  textEvaluate=$("#textEvaluate").val();
    if(textEvaluate==null){
        alert("评论不能为空");
        return;
    }
    var  datas=JSON.parse(data2);
    var menuId=datas.id;
    var  dataIndex={id:menuId,menuEvaluateScore:scoreEvaluate,menuEvaluate:textEvaluate};
    $.ajax({
        url:addMenuEvaluate,
        type:"POST",
        contentType: 'application/json' ,
        data:JSON.stringify(dataIndex),
        headers: {
            "token" : user
        },
        dataType:"json",
        timeout:3000,
        success:function (data) {
            if (data.code==200){
                alert("评价成功!");
                    queryMenuEvalueateId(menuId);
            }else {
                alert(data.msg);
            }
        }
    });

}




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