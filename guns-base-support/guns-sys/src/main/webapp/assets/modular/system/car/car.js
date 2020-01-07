layui.use(['layer', 'table', 'ax', 'laydate'], function () {
    var $ = layui.$;
    var $ax = layui.ax;
    var layer = layui.layer;
    var table = layui.table;
    var laydate = layui.laydate;

    /**
     * 系统管理--登陆日志
     */
    var Car = {
        tableId: "carTable"   //表格id
    };

    /**
     * 初始化表格的列
     */
    Car.initColumn = function () {
        return [[
            {type: 'checkbox'},
            {field: 'carId',  hide: true, sort: true, title: 'id'},
            {field: 'carNum', align: "center", sort: true, title: '车牌号'},
            {field: 'carSize', align: "center", sort: true, title: '车辆大小'},
            {field: 'carStatus', align: "center", sort: true, title: '车辆状态'},
            {field: 'carType', align: "center", sort: true, title: '车辆类型'},
            {field: 'carDefaultdriver', align: "center", sort: true, title: '默认司机'}
        ]];
    };



    // 渲染表格
    var tableResult = table.render({
        elem: '#' + Car.tableId,
        url: Feng.ctxPath + '/info/car/list',
        page: true,
        height: "full-98",
        cellMinWidth: 100,
        cols: Car.initColumn()
    });

});
