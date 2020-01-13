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
    var Warehouse = {
        tableId: "warehouseTable"   //表格id
    };

    /**
     * 初始化表格的列
     */
    Warehouse.initColumn = function () {
        return [[
            {type: 'checkbox'},
            {field: 'warehouseId',  hide: true, sort: true, title: 'id'},
            {field: 'warehouseName', align: "center", sort: true, title: '名称'},
            {field: 'warehouseDistrict', align: "center", sort: true, title: '区域'},
            {field: 'warehouseArea', align: "center", sort: true, title: '面积'},
            {field: 'warehouseLocation', align: "center", sort: true, title: '状态'},
            {field: 'warehouseType', align: "center", sort: true, title: '仓库类型'},
            {align: 'center', toolbar: '#tableBar', title: '操作', minWidth: 200}
        ]];
    };



    // 渲染表格
    var tableResult = table.render({
        elem: '#' + Warehouse.tableId,
        url: Feng.ctxPath + '/info/warehouse/list',
        page: true,
        height: "full-98",
        cellMinWidth: 100,
        cols: Warehouse.initColumn()
    });

    /**
     * 点击查询按钮
     */
    Warehouse.search = function () {
        var queryData = {};
        queryData['condition'] = $("#condition").val();
        table.reload(Warehouse.tableId, {
            where: queryData, page: {curr: 1}
        });
    };

    /**
     * 弹出添加通知
     */
    Warehouse.openAddWarehouse = function () {
        func.open({
            height: 420,
            title: '添加车辆',
            content: Feng.ctxPath + '/info/warehouse/warehouse_add',
            tableId: Warehouse.tableId
        });
    };

    /**
     * 点击编辑通知
     *
     * @param data 点击按钮时候的行数据
     */
    Warehouse.onEditWarehouse = function (data) {
        func.open({
            height: 420,
            title: '修改仓库',
            content: Feng.ctxPath + "/info/warehouse/warehouse_update/" + data.warehouseId,
            tableId: Warehouse.tableId
        });
    };

    /**
     * 点击删除通知
     *
     * @param data 点击按钮时候的行数据
     */
    Warehouse.onDeleteWarehouse = function (data) {
        var operation = function () {
            var ajax = new $ax(Feng.ctxPath + "/info/warehouse/delete", function (data) {
                Feng.success("删除成功!");
                table.reload(Warehouse.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.responseJSON.message + "!");
            });
            ajax.set("warehouseId", data.warehouseId);
            ajax.start();
        };
        Feng.confirm("是否删除车辆 " + data.warehouseNum + "?", operation);
    };

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        Warehouse.search();
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {
        Warehouse.openAddWarehouse();
    });

    // 工具条点击事件
    table.on('tool(' + Warehouse.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            console.log('edit');
            Warehouse.onEditWarehouse(data);
        } else if (layEvent === 'delete') {
            console.log("click delete");
            console.log(data);
            Warehouse.onDeleteWarehouse(data);
        }
    });

});
