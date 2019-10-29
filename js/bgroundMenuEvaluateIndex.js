//后台菜品首页
var queryPageByCondition=moviesUrl+"/menuEvaluateBackground/queryPageByCondition";
//var queryLocalHostImage=moviesUrl+"/util/queryLocalHostImage";



var user=localStorage.getItem("BackgroundToken");


layui.use('table', function()
{
    var table = layui.table;
    table.render({
        elem: '#table-menu-data',
        url:queryPageByCondition,
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
            {field:'menuEvaluate', width:180, title: '菜品评价'},
            {field:'menuEvaluateScore', width:100, title: '菜品分数'},
            {field:'menuType', width:100, title: '回复类型', templet:function (data) {
                    var  value= data.menuType!=null?data.menuType==1?"普通回复":"商家回复":"无";
                    return  value
                }},
            {field:'isDelete', width:100, title: '是否删除', templet:function (data) {
                    var  value= data.isDelete!=null?data.isDelete==1?"是":"否":"否";
                    return  value
                }},
            {field:'gmtCreate', width:200, title: '创建日期'
                // ,templet : function (data) {return formatDate(data.gmtCreate);}
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

});

/*
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
*/

/*function  queryId(ids) {
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
}*/















