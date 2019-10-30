//后台菜品首页
var queryMenuAe=moviesUrl+"/menuAeBackground/queryMenuAe";
var queryLocalHostImage=moviesUrl+"/util/queryLocalHostImage";
var queryById=moviesUrl+"/menuAeBackground/queryById";
var user=localStorage.getItem("BackgroundToken");

var updateMenuAe=moviesUrl+"/menuAeBackground/updateMenuAe";
layui.use('table', function()
{
    var table = layui.table;
    table.render({
        id:'LAY-app-message-all',
        elem: '#table-menu-data',
        url:queryMenuAe,
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
            {field:'menuName', width:180, title: '菜品名称'},
            {field:'menuImage', width:150, title: '菜品图片', templet:function (data) {
                    if (data.menuImage!=null){
                        return  "<div><img class=\"layui-upload-img\" src='"+queryLocalHostImage+"?pathName="+data.menuImage+"' width=\"300px\"/></div>";
                    }else {
                        return "暂无";
                    }
                }
            },
            {field:'menuPrice', width:100, title: '菜品单价'},
            {field:'menuText', title: '菜品详细', width: 100},
            {field:'menuFloor', title: '菜品楼层', width: 100},
            {field:'menuWindow', title: '菜品窗口', width: 100},
            {field:'canteenName', width:100, title: '食堂', sort: false},
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
        if(obj.event === 'detail'){
            queryId(data.id);
        }
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
                    table.reload('LAY-app-message-all', { //表格的id
                        url:queryMenuAe,
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

function deleteMenu(ids) {
    var  deleteData={"id":ids,"isDelete":1};
    $.ajax({
        url:updateMenuAe,
        type:"POST",
        contentType:"application/json",
        data:JSON.stringify(deleteData),
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

function  queryId(ids) {
    var  id={id:ids};
    $.ajax({
        url:queryById,
        type:"POST",
        data:id,
        dataType:"json",
        timeout:3000,
        success:function (data) {
            if (data.code==200){
                if (data.data!=null){
                    //sessionStorage.setItem("menuData",data.data);
                    localStorage.setItem("menuData",JSON.stringify(data.data));
                    window.location.href="../background/updateMenu.html";
                }else {
                    alert(data.msg);
                }
            }else {
                alert(data.msg);
            }
        }
    })
}















