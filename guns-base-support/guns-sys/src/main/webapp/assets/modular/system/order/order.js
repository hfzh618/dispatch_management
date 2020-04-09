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
    var Order = {
        tableId: "orderTable"   //表格id
    };

    /**
     * 初始化表格的列
     */
    Order.initColumn = function () {
        return [[
            {type: 'checkbox'},
            {field: 'orderId',  hide: true, sort: true, title: 'id'},
            {field: 'orderProduct', align: "center", sort: true, title: '商品名称'},
            {field: 'orderNum', align: "center", sort: true, title: '商品数量'},
            {field: 'orderShop', align: "center", sort: true, title: '门店'},
            {field: 'orderTime', align: "center", sort: true, title: '订单时间'},
            {align: 'center', toolbar: '#tableBar', title: '操作', minWidth: 200}
        ]];
    };



    // 渲染表格
    var tableResult = table.render({
        elem: '#' + Order.tableId,
        url: Feng.ctxPath + '/info/order/list',
        page: true,
        height: "full-98",
        cellMinWidth: 100,
        cols: Order.initColumn()
    });

    /**
     * 点击查询按钮
     */
    Order.search = function () {
        var queryData = {};
        queryData['condition'] = $("#condition").val();
        table.reload(Order.tableId, {
            where: queryData, page: {curr: 1}
        });
    };

    /**
     * 弹出添加通知
     */
    Order.openAddOrder = function () {
        func.open({
            height: 420,
            title: '添加订单',
            content: Feng.ctxPath + '/info/order/order_add',
            tableId: Order.tableId
        });
    };

    /**
     * 点击编辑通知
     *
     * @param data 点击按钮时候的行数据
     */
    Order.onEditOrder = function (data) {
        func.open({
            height: 420,
            title: '修改订单',
            content: Feng.ctxPath + "/info/order/order_update/" + data.orderId,
            tableId: Order.tableId
        });
    };

    /**
     * 点击删除通知
     *
     * @param data 点击按钮时候的行数据
     */
    Order.onDeleteOrder = function (data) {
        var operation = function () {
            var ajax = new $ax(Feng.ctxPath + "/info/order/delete", function (data) {
                Feng.success("删除成功!");
                table.reload(Order.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.responseJSON.message + "!");
            });
            ajax.set("orderId", data.orderId);
            ajax.start();
        };
        Feng.confirm("是否删除订单 " + data.orderNum + "?", operation);
    };

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        Order.search();
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {
        Order.openAddOrder();
    });

    // 工具条点击事件
    table.on('tool(' + Order.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            console.log('edit');
            Order.onEditOrder(data);
        } else if (layEvent === 'delete') {
            console.log("click delete");
            console.log(data);
            Order.onDeleteOrder(data);
        }
    });

});
