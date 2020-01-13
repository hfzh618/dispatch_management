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
    var Driver = {
        tableId: "driverTable"   //表格id
    };

    /**
     * 初始化表格的列
     */
    Driver.initColumn = function () {
        return [[
            {type: 'checkbox'},
            {field: 'driverId',  hide: true, sort: true, title: 'id'},
            {field: 'driverName', align: "center", sort: true, title: '姓名'},
            {field: 'driverTel', align: "center", sort: true, title: '电话'},
            {field: 'driverStatus', align: "center", sort: true, title: '状态'},
            {field: 'driverType', align: "center", sort: true, title: '驾照类型'},
            {align: 'center', toolbar: '#tableBar', title: '操作', minWidth: 200}
        ]];
    };



    // 渲染表格
    var tableResult = table.render({
        elem: '#' + Driver.tableId,
        url: Feng.ctxPath + '/info/driver/list',
        page: true,
        height: "full-98",
        cellMinWidth: 100,
        cols: Driver.initColumn()
    });

    /**
     * 点击查询按钮
     */
    Driver.search = function () {
        var queryData = {};
        queryData['condition'] = $("#condition").val();
        table.reload(Driver.tableId, {
            where: queryData, page: {curr: 1}
        });
    };

    /**
     * 弹出添加通知
     */
    Driver.openAddDriver = function () {
        func.open({
            height: 420,
            title: '添加车辆',
            content: Feng.ctxPath + '/info/driver/driver_add',
            tableId: Driver.tableId
        });
    };

    /**
     * 点击编辑通知
     *
     * @param data 点击按钮时候的行数据
     */
    Driver.onEditDriver = function (data) {
        func.open({
            height: 420,
            title: '修改车辆',
            content: Feng.ctxPath + "/info/driver/driver_update/" + data.driverId,
            tableId: Driver.tableId
        });
    };

    /**
     * 点击删除通知
     *
     * @param data 点击按钮时候的行数据
     */
    Driver.onDeleteDriver = function (data) {
        var operation = function () {
            var ajax = new $ax(Feng.ctxPath + "/info/driver/delete", function (data) {
                Feng.success("删除成功!");
                table.reload(Driver.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.responseJSON.message + "!");
            });
            ajax.set("driverId", data.driverId);
            ajax.start();
        };
        Feng.confirm("是否删除车辆 " + data.driverNum + "?", operation);
    };

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        Driver.search();
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {
        Driver.openAddDriver();
    });

    // 工具条点击事件
    table.on('tool(' + Driver.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            console.log('edit');
            Driver.onEditDriver(data);
        } else if (layEvent === 'delete') {
            console.log("click delete");
            console.log(data);
            Driver.onDeleteDriver(data);
        }
    });

});
