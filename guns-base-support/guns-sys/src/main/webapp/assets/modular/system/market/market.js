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
            {field: 'marketId',  hide: true, sort: true, title: 'id'},
            {field: 'market_code', align: "center", sort: true, title: '门店编码'},
            {field: 'marketName', align: "center", sort: true, title: '名称'},
            {field: 'marketDistrict', align: "center", sort: true, title: '区域'},
            {field: 'marketTel', align: "center", sort: true, title: '电话'},
            {field: 'marketAddress', align: "center", sort: true, title: '地址'},
            {field: 'market_type', align: "center", sort: true, title: '业态'},
            {field: 'permit_vehicle', align: "center", sort: true, title: '许可车型'},
            {field: 'updown_starttime', align: "center", sort: true, title: '上下货开始时间'},
            {field: 'updown_endtime', align: "center", sort: true, title: '上下货结束时间'},
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
            title: '添加门店',
            content: Feng.ctxPath + '/info/market/market_add',
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
            title: '修改门店信息',
            content: Feng.ctxPath + "info/market/market_update/" + data.marketId,
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
            var ajax = new $ax(Feng.ctxPath + "/info/market/delete", function (data) {
                Feng.success("删除成功!");
                table.reload(Notice.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.responseJSON.message + "!");
            });
            ajax.set("marketId", data.marketId);
            ajax.start();
        };
        Feng.confirm("是否删除门店" + data.marketName + "?", operation);
    };

    // 渲染表格
    var tableResult = table.render({
        elem: '#' + Notice.tableId,
        url: Feng.ctxPath + '/info/market/list',
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
