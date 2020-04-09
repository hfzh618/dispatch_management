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
    var Train = {
        tableId: "trainTable"   //表格id
    };

    /**
     * 初始化表格的列
     */
    Train.initColumn = function () {
        return [[
            {type: 'checkbox'},
            {field: 'trainId',  hide: true, sort: true, title: 'id'},
            {field: 'trainName', align: "center", sort: true, title: '班列名称'},
            {field: 'trainStops', align: "center", sort: true, title: '班列停靠'},
            {field: 'trainStatus', align: "center", sort: true, title: '班列状态'},
            {field: 'trainType', align: "center", sort: true, title: '班列类型'},
            {align: 'center', toolbar: '#tableBar', title: '操作', minWidth: 200}
        ]];
    };



    // 渲染表格
    var tableResult = table.render({
        elem: '#' + Train.tableId,
        url: Feng.ctxPath + '/info/train/list',
        page: true,
        height: "full-98",
        cellMinWidth: 100,
        cols: Train.initColumn()
    });

    /**
     * 点击查询按钮
     */
    Train.search = function () {
        var queryData = {};
        queryData['condition'] = $("#condition").val();
        table.reload(Train.tableId, {
            where: queryData, page: {curr: 1}
        });
    };

    /**
     * 弹出添加通知
     */
    Train.openAddTrain = function () {
        func.open({
            height: 420,
            title: '添加车辆',
            content: Feng.ctxPath + '/info/train/train_add',
            tableId: Train.tableId
        });
    };

    Train.generate = function () {
        // Feng.confirm("是否生成!");
        alert("由算法根据门店生成班列");
        console.log("use js generate");
        $.ajax({
            url:Feng.ctxPath + "/info/train/generate",
            type:"get",
            async:"false",
            success:function(response){
                table.reload(Train.tableId);
            }
        });

        // var ajax = new $ax(Feng.ctxPath + "/info/train/generate",function(data){
        //     Feng.success("生成成功");
        //     table.reload(Train.tableId);
        // },function(data){
        //     Feng.error("生成失败!" + data.responseJSON.message + "!");
        // });
        // ajax.set("trainId", data.trainId);
        // ajax.start();
    };

    /**
     * 点击编辑通知
     *
     * @param data 点击按钮时候的行数据
     */
    Train.onEditTrain = function (data) {
        func.open({
            height: 420,
            title: '修改车辆',
            content: Feng.ctxPath + "/info/train/train_update/" + data.trainId,
            tableId: Train.tableId
        });
    };

    /**
     * 点击删除通知
     *
     * @param data 点击按钮时候的行数据
     */
    Train.onDeleteTrain = function (data) {
        var operation = function () {
            var ajax = new $ax(Feng.ctxPath + "/info/train/delete", function (data) {
                Feng.success("删除成功!");
                table.reload(Train.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.responseJSON.message + "!");
            });
            ajax.set("trainId", data.trainId);
            ajax.start();
        };
        Feng.confirm("是否删除车辆 " + data.trainNum + "?", operation);
    };

    // 添加从算法生成结果
    $('#btnGenerate').click(function () {
        Train.generate();
    });


    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        Train.search();
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {
        Train.openAddTrain();
    });



    // 工具条点击事件
    table.on('tool(' + Train.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            console.log('edit');
            Train.onEditTrain(data);
        } else if (layEvent === 'delete') {
            console.log("click delete");
            console.log(data);
            Train.onDeleteTrain(data);
        }
    });

});
