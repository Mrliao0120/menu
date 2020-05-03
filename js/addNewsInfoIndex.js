//后台菜品首页
var queryPageByCondition=moviesUrl+"/news/info/findNewsInfo";
//var queryLocalHostImage=moviesUrl+"/util/queryLocalHostImage";
var queryMenuEvaluateDetail=moviesUrl+"/news/info/selectByPrimaryKey";
var uploadFile=moviesUrl+"/util/uploadFile";
var deleteUrl=moviesUrl+"/news/info/delete";
var user=localStorage.getItem("BackgroundToken");
var queryLocalHostImage=moviesUrl+"/util/queryLocalHostImage";
var updateNews=moviesUrl+"/news/info/addNewsInfo";
layui.use('table', function()
{
    var table = layui.table;
    table.render({
        id:'menuEvaluatePage',
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
            {field:'title', width:180, title: '新闻标题'},
            {field:'contentInfo', width:200, title: '内容'},
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
                    table.reload('menuEvaluatePage', { //表格的id
                        url:queryPageByCondition,
                        where: {
                            'title':$.trim(orderId)
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
    var  deleteData="?id="+ids;
    $.ajax({
        url:deleteUrl+deleteData,
        type:"POST",
        contentType:"application/json",
        data:null,
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




var uploadFile=moviesUrl+"/util/uploadFile";
var uploadFileRichText=moviesUrl+"/util/uploadFileRichText";


layui.use('layedit', function(){
    var layedit = layui.layedit;
    layedit.set({
        uploadImage: {
            url:uploadFileRichText //接口url
             //默认post
        }
    });

   var index = layedit.build('demo'); //建立编辑器


    var active = {
        content: function(){
         var contents=layedit.getContent(index);
            updateMenu(contents);
        }
    };
    $('.site-demo-layedit').on('click', function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

});






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


function updateMenu(contentInfoText) {
    let  menu_name=$("#menuName").val();
    let  imges= image;
    let  contentInfo=contentInfoText;
    let requestData={"title":menu_name,"coverImg":imges,
        "contentInfo":contentInfo};
    $.ajax({
        url:updateNews,
        type:"POST",
        headers: {
            "BackgroundToken" : user
        },
        contentType:"application/json",
        data:JSON.stringify(requestData),
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





