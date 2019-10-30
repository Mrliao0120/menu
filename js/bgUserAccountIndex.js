//后台用户首页
var queryUserAccountPage=moviesUrl+"/backGroundUser/queryUserAccountPage";
//var queryLocalHostImage=moviesUrl+"/util/queryLocalHostImage";
/*var queryMenuEvaluateDetail=moviesUrl+"/menuEvaluateBackground/queryMenuEvaluateDetail";
var updateMenuEvaluate=moviesUrl+"/menuEvaluateBackground/updateMenuEvaluate";*/
var queryUserAccountById=moviesUrl+"/backGroundUser/queryUserAccountById";
var deleteById=moviesUrl+"/backGroundUser/deleteById";
var user=localStorage.getItem("BackgroundToken");


layui.use('table', function()
{
    var table = layui.table;
    table.render({
        id:'UserAccount',
        elem: '#table-menu-data',
        url:queryUserAccountPage,
        method:'POST',
        contentType: 'application/json' ,
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
        headers:{"BackgroundToken":user},
        cols: [[
            {field:'id', width:100, title: 'ID', sort: false},
            {field:'username', width:180, title: '用户账号'},
            {field:'nickname', width:200, title: '用户昵称'},
            {field:'isLock', width:100, title: '是否锁定', templet:function (data) {
                    var  value= data.isLock!=null?data.isDelete==1?"是":"否":"否";
                    return  value
                }},
            {field:'isDelete', width:100, title: '是否删除', templet:function (data) {
                    var  value= data.isDelete!=null?data.isDelete==1?"是":"否":"否";
                    return  value
                }},
            {field:'gmtCreate', width:200, title: '创建日期'
                 ,templet : function (data) {return formatDate(data.gmtCreate);}
                    },
            {fixed: 'right', width: 300, title:'操作',align:'center', toolbar: '#barDemo'}
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


    table.on('tool(demo)', function(obj){
        var data = obj.data;
        /*if(obj.event === 'detail'){
            queryId(data.id);
        }*/
        if (obj.event === 'delete'){
            deleteMenu(data.id);
        }
    });

    $('#searchMenu').on('click',function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });
    // 点击获取数据
    var  active = {
        getInfo: function () {
            var orderId=$('#demoReload').val();
            if (orderId) {
                var index = layer.msg('查询中，请稍候...',{icon: 16,time:false,shade:0});
                setTimeout(function(){
                    table.reload('UserAccount', { //表格的id
                        url:queryUserAccountPage,
                        where: {
                            'search':$.trim(orderId)
                        }
                    });
                    layer.close(index);
                },800);
            } else {
                window.location.reload();
            }
        },
    };
    //监听回车事件,扫描枪一扫描或者按下回车键就直接执行查询
    $("#select_orderId").bind("keyup", function (e) {
        if (e.keyCode == 13) {
            var type = "getInfo";
            active[type] ? active[type].call(this) : '';
        }
    });
});


function deleteMenu(ids) {
    var  deleteData={"id":ids,"isDelete":1};
    $.ajax({
        url:deleteById,
        type:"POST",
        data:deleteData,
        dataType:"json",
        headers: {
            "BackgroundToken" : user
        },
        timeout:3000,
        success:function (data) {
            if (data.code==200){
                alert("删除成功");
                window.location.reload();
            }else {
                alert(data.msg);
            }
        }
    })
};


/*function  queryId(ids) {
    var  id={id:ids};
    $.ajax({
        url:queryMenuEvaluateDetail,
        type:"POST",
        data:id,
        dataType:"json",
        timeout:3000,
        success:function (data) {
            if (data.code==200){
                if (data.data!=null){
                    //sessionStorage.setItem("menuData",data.data);
                    localStorage.setItem("menuEvaluateDetail",JSON.stringify(data.data));
                    window.location.href="../background/updateMenuEvaluate.html";
                }else {
                    alert(data.msg);
                }
            }else {
                alert(data.msg);
            }
        }
    })
}*/















