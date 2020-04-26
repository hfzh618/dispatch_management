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
            {field: 'carId',  align: "center", sort: true, title: 'id'},
            {field: 'carNum', align: "center", sort: true, title: '车牌号'},
            // {field: 'carLoad', align: "center", sort: true, title: '车辆载重'},
            {field: 'carStatus', align: "center", sort: true, title: '车辆状态'},
            {field: 'carType', align: "center", sort: true, title: '车辆类型'},
            {field: 'carrier_code', align: "center", sort: true, title: '承运商编码'},
            {field: 'carrier_name', align: "center", sort: true, title: '承运商名称'},
            {field: 'rated_load', align: "center", sort: true, title: '额定载重'},
            {field: 'car_speed', align: "center", sort: true, title: '行驶速度'},
            {field: 'volume', align: "center", sort: true, title: '容积'},
            {field: 'permit_type', align: "center", sort: true, title: '允许类型'},
            {field: 'start_cost', align: "center", sort: true, title: '启用成本'},
            {field: 'park_cost', align: "center", sort: true, title: '停车成本'},
            {field: 'perkm_cost', align: "center", sort: true, title: '每公里成本'},
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
            title: '添加车辆',
            content: Feng.ctxPath + '/info/car/car_add',
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
            title: '修改车辆信息',
            content: Feng.ctxPath + "info/car/car_update/" + data.carId,
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
            var ajax = new $ax(Feng.ctxPath + "/info/car/delete", function (data) {
                Feng.success("删除成功!");
                table.reload(Notice.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.responseJSON.message + "!");
            });
            ajax.set("carId", data.carId);
            ajax.start();
        };
        Feng.confirm("是否删除车辆" + data.carNum + "?", operation);
    };

    // 渲染表格
    var tableResult = table.render({
        elem: '#' + Notice.tableId,
        url: Feng.ctxPath + '/info/car/list',
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
