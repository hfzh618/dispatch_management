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
    var Market = {
        tableId: "marketTable"   //表格id
    };

    /**
     * 初始化表格的列
     */
    Market.initColumn = function () {
        return [[
            {type: 'checkbox'},
            {field: 'marketId',  hide: true, sort: true, title: 'id'},
            {field: 'marketName', align: "center", sort: true, title: '名称'},
            {field: 'marketDistrict', align: "center", sort: true, title: '区域'},
            {field: 'marketTel', align: "center", sort: true, title: '电话'},
            {field: 'marketAddress', align: "center", sort: true, title: '地址'},
            {align: 'center', toolbar: '#tableBar', title: '操作', minWidth: 200}
        ]];
    };



    // 渲染表格
    var tableResult = table.render({
        elem: '#' + Market.tableId,
        url: Feng.ctxPath + '/info/market/list',
        page: true,
        height: "full-98",
        cellMinWidth: 100,
        cols: Market.initColumn()
    });

    /**
     * 点击查询按钮
     */
    Market.search = function () {
        var queryData = {};
        queryData['condition'] = $("#condition").val();
        table.reload(Market.tableId, {
            where: queryData, page: {curr: 1}
        });
    };

    /**
     * 弹出添加通知
     */
    Market.openAddMarket = function () {
        func.open({
            height: 420,
            title: '添加车辆',
            content: Feng.ctxPath + '/info/market/market_add',
            tableId: Market.tableId
        });
    };

    /**
     * 点击编辑通知
     *
     * @param data 点击按钮时候的行数据
     */
    Market.onEditMarket = function (data) {
        func.open({
            height: 420,
            title: '修改仓库',
            content: Feng.ctxPath + "/info/market/market_update/" + data.marketId,
            tableId: Market.tableId
        });
    };

    /**
     * 点击删除通知
     *
     * @param data 点击按钮时候的行数据
     */
    Market.onDeleteMarket = function (data) {
        var operation = function () {
            var ajax = new $ax(Feng.ctxPath + "/info/market/delete", function (data) {
                Feng.success("删除成功!");
                table.reload(Market.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.responseJSON.message + "!");
            });
            ajax.set("marketId", data.marketId);
            ajax.start();
        };
        Feng.confirm("是否删除车辆 " + data.marketNum + "?", operation);
    };

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        Market.search();
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {
        Market.openAddMarket();
    });

    // 工具条点击事件
    table.on('tool(' + Market.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            console.log('edit');
            Market.onEditMarket(data);
        } else if (layEvent === 'delete') {
            console.log("click delete");
            console.log(data);
            Market.onDeleteMarket(data);
        }
    });

});
