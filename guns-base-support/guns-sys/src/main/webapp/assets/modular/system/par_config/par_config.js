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
            {field: 'id', hide: true, sort: true, title: 'id'},
            {field: 'per_load',  align: "center", sort: true,edit: 'text', title: '车辆载重满载率'},
            {field: 'per_volume', align: "center", sort: true,edit: 'text', title: '车辆空间满载率'},
            {field: 'u', align: "center", sort: true,edit: 'text', title: '单位人力时间成本'},
            {field: 'open_doors', align: "center",edit: 'text', sort: true, title: '车辆开门方向'},
            {field: 'not_pick_cond', align: "center",edit: 'text', sort: true, title: '车辆接收订单的最远距离'},
            {align: 'center', toolbar: '#tableBar',edit: 'text', title: '操作', minWidth: 200}
        ]];
    };

    //监听单元格编辑
    table.on('edit(noticeTable)', function(obj){
        var value = obj.value //得到修改后的值
            ,data = obj.data //得到所在行所有键值
            ,field = obj.field; //得到字段
        layer.msg( field + ' 字段更改为：'+ value);
    });

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
     * 点击编辑通知
     *
     * @param data 点击按钮时候的行数据
     */
    Notice.onEditNotice = function (data) {
        func.open({
            height: 1000,
            title: '修改算法配置',
            content: Feng.ctxPath + "/par_config/update2_html/" + data.id,
            tableId: Notice.tableId
        });
    };

    // 渲染表格
    var tableResult = table.render({
        elem: '#' + Notice.tableId,
        url: Feng.ctxPath + '/par_config/list2',
        page: true,
        height: "full-98",
        cellMinWidth: 100,
        cols: Notice.initColumn()
    });

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        Notice.search();
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
