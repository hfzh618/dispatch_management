layui.use(['layer', 'form', 'admin', 'ax'], function () {
    var $ = layui.jquery;
    var $ax = layui.ax;
    var form = layui.form;
    var admin = layui.admin;
    var layer = layui.layer;

    // 表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var ajax = new $ax(Feng.ctxPath + "/info/train/add", function (data) {
            Feng.success("添加成功！");

            //传给上个页面，刷新table用
            admin.putTempData('formOk', true);

            //关掉对话框
            admin.closeThisDialog();

        }, function (data) {
            Feng.error("添加失败！" + data.responseJSON.message)
        });
        var codes = [];
        var names = [];
        for(var i =0; i< data.field.trainStops.length;i++){
            codes.push(data.field.trainStops[i].split(":")[0]);
            names.push(data.field.trainStops[i].split(":")[1]);
        }
        // data.field.trainStops = data.field.trainStops.join(',');
        data.field.trainStops = names.join(',');
        data.field.shops_id = codes.join(',');

        ajax.set(data.field);
        ajax.start();

        //添加 return false 可成功跳转页面
        return false;
    });
});