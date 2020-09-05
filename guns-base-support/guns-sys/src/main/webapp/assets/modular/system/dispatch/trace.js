layui.use(['layer', 'form', 'table', 'admin', 'ax', 'func'], function () {
    var $ = layui.$;
    var layer = layui.layer;
    var form = layui.form;
    var table = layui.table;
    var $ax = layui.ax;
    var admin = layui.admin;
    var func = layui.func;

    // 表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var train =  document.getElementById("train");
        var tindex= train.selectedIndex;
        var train_val = train.options[tindex].value;
        var car =  document.getElementById("car");
        var cindex= car.selectedIndex;
        var car_val = car.options[cindex].value;
        var car_text = car.options[cindex].text;
        var showTimeInterval = setInterval(function(){
            var queryData = {};
            queryData['condition']=car_text;
            table.reload(Notice.tableId, {
                where: queryData, page: {curr: 1}
            });
        },2000);
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.addEventListener("load", function(e) {
            setTimeout(function(){ clearInterval(showTimeInterval); }, 5000);
        });
        var URL = "http://10.120.11.235:5006/algo3/simrun/"+train_val+"/"+car_val;
        xmlHttp.open( "GET", URL);
        xmlHttp.send( null );
        return false;
    });

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
            {field: 'vehicletraceid',  hide: true, sort: true, title: '轨迹id'},
            {field: 'trainid', align: "center", sort: true, title: '班列id'},
            {field: 'car_num', align: "center", sort: true, title: '车牌号'},
            {field: 'cur_load', align: "center", sort: true, title: '当前载重'},
            {field: 'cur_volume', align: "center", sort: true, title: '当前容积'},
            {field: 'last_shop', align: "center", sort: true, title: '上一个网点'},
            {field: 'next_shops', align: "center", sort: true, title: '待配送网点'},
            {field: 'next_orders', align: "center", sort: true, title: '订单'},
            {align: 'center', toolbar: '#tableBar', title: '操作', minWidth: 200}
        ]];
    };

    var showTimeInterval;

    Notice.refreshTable = function(){
        showTimeInterval = setInterval(function(){
            var queryData = {};
            table.reload(Notice.tableId, {
                where: queryData, page: {curr: 1}
            });
        },2000);
    };

    Notice.stopRefreshTable =  function(){
        clearInterval(showTimeInterval);
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
            title: '添加车辆轨迹',
            content: Feng.ctxPath + '/dispatch/trace/trace_add',
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
            title: '修改轨迹信息',
            content: Feng.ctxPath + "/dispatch/trace/trace_update/" + data.vehicletraceid,
            tableId: Notice.tableId
        });
    };

    Notice.onShowNotice = function(data){
        func.open({
            height:800,
            title:'仪表盘显示',
            content: Feng.ctxPath + "/dispatch/trace/show/" + data.vehicleid,
            tableId:Notice.tableId
        });
    };

    /**
     * 点击删除通知
     *
     * @param data 点击按钮时候的行数据
     */
    Notice.onDeleteNotice = function (data) {
        var operation = function () {
            var ajax = new $ax(Feng.ctxPath + "/trace/info/delete", function (data) {
                Feng.success("删除成功!");
                table.reload(Notice.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.responseJSON.message + "!");
            });
            ajax.set("vehicletraceid", data.vehicletraceid);
            ajax.start();
        };
        Feng.confirm("是否删除轨迹" + data.vehicletraceid + "?", operation);
    };

    // 渲染表格
    var tableResult = table.render({
        elem: '#' + Notice.tableId,
        url: Feng.ctxPath + '/dispatch/trace/list',
        page: true,
        height: "full-98",
        cellMinWidth: 100,
        cols: Notice.initColumn()
    });

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        Notice.search();
    });

    // 搜索按钮点击事件
    $('#btnRefresh').click(function () {
        Notice.refreshTable();
    });

    // 搜索按钮点击事件
    $('#btnRefreshStop').click(function () {
        Notice.stopRefreshTable();
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
        }else if (layEvent === 'show') {
            Notice.onShowNotice(data);
        }
    });
});
