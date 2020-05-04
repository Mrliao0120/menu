var  queryByPageCondition=moviesUrl+"/menu/queryByPageCondition";
var queryLocalHostImage=moviesUrl+"/util/queryLocalHostImage";

var queryByAndIndexId=moviesUrl+"/menu/queryByAndIndexId";




layui.use('table', function()
{
    var table = layui.table;
    var user=localStorage.getItem("webToken");
    table.render({
        id:'wbIndex',
        elem: '#table-menu-data',
        url:queryByPageCondition,
        method:'POST',
        headers: {
            "token" : user
        },
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
            {field:'id', width:100, title: 'ID', sort: false,hide:true},
            {field:'menuName', width:180, title: '菜品名称'},
            {field:'menuImage', title: '菜品图片', templet:function (data) {
                    if (data.menuImage!=null){
                        return  "<div><img class=\"layui-upload-img\"  src='"+queryLocalHostImage+"?pathName="+data.menuImage+"' /></div>";
                    }else {
                        return "暂无";
                    }
                }
            },
            {field:'menuPrice', width:100, title: '菜品单价'},
            {field:'menuText', title: '菜品详细', width: '20%'},
            {field:'menuFloor', title: '菜品楼层', width: 100},
            {field:'menuWindow', title: '菜品窗口', width: 100},
            {field:'canteenName', width:100, title: '食堂', sort: false},
            {field:'menuEvaluateScore', title: '平均得分', width: 100,templet:function (data) {
                    if (data.menuEvaluateScore!=null){
                        return  data.menuEvaluateScore;
                    }else {
                        return "暂无";
                    }
                }},
            {field: 'right', width: 300, title:'操作',align:'center', toolbar: '#barDemo'}
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
        if(obj.event === 'detail'){
            queryMenuEvalueateId(data.id);
        }
        /*if (obj.event === 'delete'){
            deleteMenu(data.id);
        }*/
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
                    table.reload('wbIndex', { //表格的id
                        url:queryByPageCondition,
                        where: {
                            'menuName':$.trim(orderId)
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
                    window.location.href="./menuAndEvaluateDetail.html";
                }else {
                    alert(data.msg);
                }
            }else {
                alert(data.msg);
            }
        }
    });
}


