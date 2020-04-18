layui.use(['layer', 'form', 'table', 'admin', 'ax', 'func'], function () {
    var $ = layui.$;
    var layer = layui.layer;
    var form = layui.form;
    var table = layui.table;
    var $ax = layui.ax;
    var admin = layui.admin;
    var func = layui.func;

    /**
     * 系统管理--消息管理
     */
    var Notice = {
        tableId: "noticeTable"    //表格id
    };

    /**
     * 初始化表格的列
     */
    Notice.initColumn = function () {
        return [[
            {type: 'checkbox'},
            {field: 'orderId', align: "center", sort: true, title: 'id'},
            // {field: 'deliverydate',  hide: true, sort: true, title: '发货日期'},
            {field: 'wave',  align: "center",  sort: true, title: '波次'},

            {field: 'drivingcarorder',  align: "center", sort: true, title: '排车单号'},
            {field: 'shopid',  align: "center", sort: true, title: '门店编码'},
            {field: 'shopname', align: "center", sort: true, title: '门店名称'},
            {field: 'carown',  align: "center", sort: true, title: '承运商'},
            {field: 'shopstate',  align: "center",sort: true, title: '业态'},
            {field: 'order_type',  align: "center", sort: true, title: '订单类型'},
            {field: 'package_type',  align: "center", sort: true, title: '包装类型'},
            {field: 'boxnum',  align: "center", sort: true, title: '实发总箱数'},
            {field: 'volume',  align: "center", sort: true, title: '体积'},
            {field: 'weight',  align: "center", sort: true, title: '重量'},
            {field: 'start_address',  align: "center", sort: true, title: '起始地址'},
            {field: 'end_address',  align: "center", sort: true, title: '目的地址'},
            {field: 'start_time',  align: "center", sort: true, title: '开始时间'},
            {field: 'end_time',  align: "center", sort: true, title: '结束时间'},
            {align: 'center', toolbar: '#tableBar', title: '操作', minWidth: 200}
        ]];
    };

    /**
     * 点击查询按钮
     */
    Notice.search = function () {
        var queryData = {};
        queryData['condition'] = $("#condition").val();
        table.reload(Notice.tableId, {
            where: queryData, page: {curr: 1}
        });
    };

    /**
     * 弹出添加通知
     */
    Notice.openAddNotice = function () {
        func.open({
            height: 420,
            title: '添加订单',
            content: Feng.ctxPath + '/info/order/order_add',
            tableId: Notice.tableId
        });
    };

    /**
     * 点击编辑通知
     *
     * @param data 点击按钮时候的行数据
     */
    Notice.onEditNotice = function (data) {
        func.open({
            height: 420,
            title: '修改订单信息',
            content: Feng.ctxPath + "info/order/order_update/" + data.orderId,
            tableId: Notice.tableId
        });
    };

    /**
     * 点击删除通知
     *
     * @param data 点击按钮时候的行数据
     */
    Notice.onDeleteNotice = function (data) {
        var operation = function () {
            var ajax = new $ax(Feng.ctxPath + "/info/order/delete", function (data) {
                Feng.success("删除成功!");
                table.reload(Notice.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.responseJSON.message + "!");
            });
            ajax.set("orderId", data.orderId);
            ajax.start();
        };
        Feng.confirm("是否删除订单" + data.orderId + "?", operation);
    };

    // 渲染表格
    var tableResult = table.render({
        elem: '#' + Notice.tableId,
        url: Feng.ctxPath + '/info/order/list',
        page: true,
        height: "full-98",
        cellMinWidth: 100,
        cols: Notice.initColumn()
    });

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        Notice.search();
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {
        Notice.openAddNotice();
    });

    // 工具条点击事件
    table.on('tool(' + Notice.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;
        if (layEvent === 'edit') {
            Notice.onEditNotice(data);
        } else if (layEvent === 'delete') {
            Notice.onDeleteNotice(data);
        }
    });
});
