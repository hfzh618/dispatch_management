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

        //添加到接口中去
        let param = new URLSearchParams();
        param.append('marketCode',JSON.stringify(codes));
        param.append('banlieId',data.field.trainId);
        try {
            axios({
                method: 'post',
                url: 'http://10.120.11.235:5001/addBanlie',
                data: param
            })
                .then(response => {
                    let data = response.data;
                    console.log('---------------');
                    console.log(data);
                    console.log('---------------')
                    let tmp, flag = 1;
                    if (data.status == 'success') {
                        console.log('success');
                    } else {
                        console.log(data.status);
                    }
                })
                .catch(function (error) { // 请求失败处理
                    console.log(error);
                });
        } catch (e) {
            console.log('出错：', e);
        }


        ajax.set(data.field);
        ajax.start();

        //添加 return false 可成功跳转页面
        return false;
    });
});