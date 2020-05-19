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
            {field: 'dispatch_code',align: "center", sort: true, title: '调度单编号'},
            // {field: 'banlie_id', align: "center", sort: true, title: '班列名称'},
            // {field: 'driver_id', align: "center", sort: true, title: '司机名称'},
            // {field: 'car_id', align: "center", sort: true, title: '汽车名称'},
            {field: 'train_name', align: "center", sort: true, title: '班列名称'},
            {field: 'driver_name', align: "center", sort: true, title: '司机姓名'},
            {field: 'car_num', align: "center", sort: true, title: '车牌号'},
            {field: 'shops_name', align: "center", sort: true, title: '配送门店'},
            {field: 'deliverydate', align: "center", sort: true, title: '配送日期'}
            // {align: 'center', toolbar: '#tableBar', title: '操作', minWidth: 200}
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

    // 渲染表格
    var tableResult = table.render({
        elem: '#' + Notice.tableId,
        url: Feng.ctxPath + '/dispatch/history/list',
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
