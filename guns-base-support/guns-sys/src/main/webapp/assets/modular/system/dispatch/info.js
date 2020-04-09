layui.use(['layer', 'table', 'ax', 'laydate','admin','func'], function () {
    var $ = layui.$;
    var $ax = layui.ax;
    var layer = layui.layer;
    var table = layui.table;
    var laydate = layui.laydate;
    var admin = layui.admin;
    var func = layui.func;

    /**
     * 系统管理--登陆日志
     */
    var Dispatch = {
        tableId: "dispatchTable"   //表格id
    };

    /**
     * 初始化表格的列
     */
    Dispatch.initColumn = function () {
        return [[
            {type: 'checkbox'},
            {field: 'dispatch_id',  hide: true, sort: true, title: 'id'},
            {field: 'dispatch_order_id', align: "center", sort: true, title: '订单id'},
            {field: 'dispatch_driver', align: "center", sort: true, title: '司机姓名'},
            {field: 'dispatch_warehouse', align: "center", sort: true, title: '仓库'},
            {field: 'dispatch_shop', align: "center", sort: true, title: '门店名'},
            {field: 'dispatch_time', align: "center", sort: true, title: '配送时间'},
            {align: 'center', toolbar: '#tableBar', title: '操作', minWidth: 200}
        ]];
    };



    // 渲染表格
    var tableResult = table.render({
        elem: '#' + Dispatch.tableId,
        url: Feng.ctxPath + '/dispatch/info/list',
        page: true,
        height: "full-98",
        cellMinWidth: 100,
        cols: Dispatch.initColumn()
    });

    /**
     * 点击查询按钮
     */
    Dispatch.search = function () {
        var queryData = {};
        queryData['condition'] = $("#condition").val();
        table.reload(Dispatch.tableId, {
            where: queryData, page: {curr: 1}
        });
    };

    /**
     * 弹出添加通知
     */
    Dispatch.openAddDispatch = function () {
        func.open({
            height: 420,
            title: '添加调度单',
            content: Feng.ctxPath + '/dispatch/info/dispatch_add',
            tableId: Dispatch.tableId
        });
    };

    /**
     * 弹出添加通知
     */
    Dispatch.openAnalysis = function () {
        func.open({
            height: 420,
            title: '调度单分析',
            content: Feng.ctxPath + '/dispatch/info/analysis_html',
            tableId: Dispatch.tableId
        });
    };

    /**
     * 点击编辑通知
     *
     * @param data 点击按钮时候的行数据
     */
    Dispatch.onEditDispatch = function (data) {
        func.open({
            height: 420,
            title: '修改车辆',
            content: Feng.ctxPath + "/dispatch/info/dispatch_update/" + data.dispatchId,
            tableId: Dispatch.tableId
        });
    };

    Dispatch.generate = function (){
        // Feng.confirm("是否生成!");
        alert("由算法根据门店生成班列");
        console.log("use js generate");
        $.ajax({
            url:Feng.ctxPath + "/dispatch/info/generate",
            type:"get",
            async:"false",
            success:function(response){
                table.reload(Dispatch.tableId);
            }
        });
    };

    /**
     * 点击删除通知
     *
     * @param data 点击按钮时候的行数据
     */
    Dispatch.onDeleteDispatch = function (data) {
        var operation = function () {
            var ajax = new $ax(Feng.ctxPath + "/dispatch/info/delete", function (data) {
                Feng.success("删除成功!");
                table.reload(Dispatch.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.responseJSON.message + "!");
            });
            ajax.set("dispatchId", data.dispatchId);
            ajax.start();
        }
        Feng.confirm("是否删除车辆 " + data.dispatchNum + "?", operation);
    };

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        Dispatch.search();
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {
        Dispatch.openAddDispatch();
    });

    // 添加调用算法事件
    $('#btnGenerate').click(function () {
        Dispatch.openAnalysis();
    });


    // 工具条点击事件
    table.on('tool(' + Dispatch.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            console.log('edit');
            Dispatch.onEditDispatch(data);
        } else if (layEvent === 'delete') {
            console.log("click delete");
            console.log(data);
            Dispatch.onDeleteDispatch(data);
        }
    });

});
