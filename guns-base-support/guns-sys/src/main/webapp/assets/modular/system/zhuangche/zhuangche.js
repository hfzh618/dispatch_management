layui.use(['layer', 'form', 'admin', 'ax'], function () {
    var $ = layui.jquery;
    var $ax = layui.ax;
    var form = layui.form;
    var admin = layui.admin;
    var layer = layui.layer;

    // 表单提交事件
    form.on('submit(btnSubmit)', function (data) {

        var train =  document.getElementById("train");
        var tindex= train.selectedIndex;
        var train_val = train.options[tindex].value;
        var car =  document.getElementById("car");
        var cindex= car.selectedIndex;
        var car_val = car.options[cindex].value;
        var xmlHttp = new XMLHttpRequest();
        var URL = "http://10.141.209.224:5006/algo1/"+train_val+"/"+car_val;
        xmlHttp.open( "GET", URL, false );
        xmlHttp.send( null );
        var res = JSON.parse(xmlHttp.responseText);
        var carType = res.carType;
        alert(carType);
        var arr = res.arr;
        alert(arr);
        var imageurl;
        if (carType == 0){
            // imageurl = "https://cdn.nlark.com/yuque/0/2020/jpeg/372732/1587382632614-6fef0fa9-d814-4c23-93db-de7718dde2b3.jpeg";
            imageurl = "carType=0.jpg";
        }else{
            imageurl = "carType=1.jpg";
        }
        var bigImg = document.createElement("img");     //创建一个img元素
        bigImg.src=imageurl;   //给img元素的src属性赋值
        var body = document.getElementsByTagName("body")[0];
        body.appendChild(bigImg);    //为dom添加子元素img
        // generate_table(left,right);
        //添加 return false 可成功跳转页面
        return false;
    });

    function generate_table(left,right) {

        // get the reference for the body
        var body = document.getElementsByTagName("body")[0];

        // creates a <table> element and a <tbody> element
        var tbl = document.createElement("table");
        tbl.className = ('layui-table');
        var tblBody = document.createElement("tbody");

        var maxLen = right.length;
        if (left.length>right.length)
            maxLen = left.length;

        var row0 = document.createElement("tr");
        var cell00 = document.createElement("td");
        var cell01 = document.createElement("td");
        var cell00Text = document.createTextNode("车厢左侧");
        cell00.appendChild(cell00Text);
        var cell01Text = document.createTextNode("车厢右侧");
        cell01.appendChild(cell01Text);
        row0.appendChild(cell00);
        row0.appendChild(cell01);
        tblBody.appendChild(row0);

        // creating all cells
        for (var i = 0; i < maxLen; i++) {
            var row = document.createElement("tr");

            for (var j = 0; j < 2; j++) {
                var cell = document.createElement("td");
                var cellText;
                if (j==0){
                    var text;
                    if (i>=left.length){
                        text = "";
                    }else{
                        text = left[i];
                    }
                    cellText = document.createTextNode(text);
                }else{
                    var text;
                    if (i>=right.length){
                        text = "";
                    }else{
                        text = right[i];
                    }
                    cellText = document.createTextNode(text);
                }
                cell.appendChild(cellText);
                row.appendChild(cell);
            }

            // add the row to the end of the table body
            tblBody.appendChild(row);
        }

        tbl.appendChild(tblBody);
        body.appendChild(tbl);
        tbl.setAttribute("border", "2");
    }


});