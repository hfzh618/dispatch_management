const map = new AMap.Map("container", {
    resizeEnable: false,
    center: [121.598251,31.190434],
    zoom: 14
});

var cangkuMarker;
var routeSites = [];
var walkingSites = [];
var toReachSites = [];
const cangkuArr = [];
var siteMarkers = [];
var carMarkers = [];

function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

function getVehicles() {

    const text = '{"status": "success", "data": [{"班列顺序": {"0": 1760, "1": 1565, "2": 1567, "3": 1568, "4": 1552, "5": 1566, "6": 1548,\n' +
        '"7": 1557, "8": 1553, "9": 1546, "10": 1551, "11": 1544, "12": 1543, "13": 1542, "14": 1539, "15": 1537, "16": 1554,\n' +
        '"17": 1556, "18": 1536, "19": 1545, "20": 1538, "21": 1540}}, {"第1辆车包含门店": [1556, 1536, 1545, 1544, 1539, 1553, 1548]},\n' +
        '{"第1辆车班次线路": [6, 8, 11, 14, 17, 18, 19]}, [{"第1辆车": 1.5}], {"仓库位置": [121.277055, 31.256239]}, {"门店订单": [{"orderid":\n' +
        '76121, "deliverydate": "2020-04-05", "shopname": "文河店", "weight": 142.8, "volume": 1.05315}, {"orderid": 76122,\n' +
        '"deliverydate": "2020-04-05", "shopname": "复兴店", "weight": 214.2, "volume": 1.579725}, {"orderid": 76123,\n' +
        '"deliverydate": "2020-04-05", "shopname": "制造店", "weight": 128.52, "volume": 0.947835}, {"orderid": 76124,\n' +
        '"deliverydate": "2020-04-05", "shopname": "马当一店", "weight": 235.62, "volume": 1.737698}, {"orderid": 76125,\n' +
        '"deliverydate": "2020-04-05", "shopname": "自忠店", "weight": 299.88, "volume": 2.211615}, {"orderid": 76126,\n' +
        '"deliverydate": "2020-04-05", "shopname": "南仓店", "weight": 299.88, "volume": 2.211615}, {"orderid": 76127,\n' +
        '"deliverydate": "2020-04-05", "shopname": "新红店", "weight": 121.38, "volume": 0.895178}]}, {"车辆类型": [1.5]}, {"门店信息":\n' +
        '[{"market_id": 1536, "market_code": "000852", "market_name": "文河店", "lon_lan": "121.490927,31.219487"}, {"market_id":\n' +
        '1537, "market_code": "008795", "market_name": "安澜店", "lon_lan": "121.486850,31.216064"}, {"market_id": 1538,\n' +
        '"market_code": "009374", "market_name": "外马路店", "lon_lan": "121.503796,31.207730"}, {"market_id": 1539, "market_code":\n' +
        '"008717", "market_name": "新红店", "lon_lan": "121.482861,31.214353"}, {"market_id": 1540, "market_code": "008571",\n' +
        '"market_name": "百联店", "lon_lan": "121.504495,31.221997"}, {"market_id": 1542, "market_code": "006722", "market_name":\n' +
        '"方红店", "lon_lan": "121.483050,31.211992"}, {"market_id": 1543, "market_code": "001191", "market_name": "瞿溪店", "lon_lan":\n' +
        '"121.485611,31.201581"}, {"market_id": 1544, "market_code": "001203", "market_name": "制造店", "lon_lan":\n' +
        '"121.484867,31.203853"}, {"market_id": 1545, "market_code": "000834", "market_name": "南仓店", "lon_lan":\n' +
        '"121.500226,31.211648"}, {"market_id": 1546, "market_code": "001444", "market_name": "卢斜店", "lon_lan":\n' +
        '"121.479349,31.204650"}, {"market_id": 1548, "market_code": "001212", "market_name": "复兴店", "lon_lan":\n' +
        '"121.466294,31.214976"}, {"market_id": 1551, "market_code": "011647", "market_name": "伊豪店", "lon_lan":\n' +
        '"121.481414,31.205214"}, {"market_id": 1552, "market_code": "009860", "market_name": "日晖店", "lon_lan":\n' +
        '"121.462778,31.193981"}, {"market_id": 1553, "market_code": "009073", "market_name": "马当一店", "lon_lan":\n' +
        '"121.476009,31.210036"}, {"market_id": 1554, "market_code": "000945", "market_name": "吉安店", "lon_lan":\n' +
        '"121.481212,31.218231"}, {"market_id": 1556, "market_code": "001193", "market_name": "自忠店", "lon_lan":\n' +
        '"121.480797,31.220198"}, {"market_id": 1557, "market_code": "000860", "market_name": "淡水店", "lon_lan":\n' +
        '"121.474160,31.211380"}, {"market_id": 1565, "market_code": "001477", "market_name": "肇平店", "lon_lan":\n' +
        '"121.446976,31.197716"}, {"market_id": 1566, "market_code": "003556", "market_name": "肇瑞店", "lon_lan":\n' +
        '"121.463160,31.203031"}, {"market_id": 1567, "market_code": "001174", "market_name": "太原店", "lon_lan":\n' +
        '"121.456583,31.201342"}, {"market_id": 1568, "market_code": "009549", "market_name": "嘉瑞店", "lon_lan":\n' +
        '"121.463160,31.203031"}, {"market_id": 1760, "market_code": null, "market_name": "仓库", "lon_lan":\n' +
        '"121.274029,31.256625"}]}]}';
    return JSON.parse(text);
}

//获取车辆数据
function getVehicles3() {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "http://10.141.209.224:5001/vehicles", false ); // false for synchronous request
    xmlHttp.send( null );
    const text = xmlHttp.responseText;
    // const obj = JSON.stringify(text);
    // var blob = new Blob([obj], {type: "text/plain;charset=utf-8"});
    // saveAs(blob, "/Users/hufangzhou/Desktop/code/java-project/dynamic-html/obj.json");
    return JSON.parse(text);
}

//获取车辆数据中的仓库数据并显示在地图上
function getCangku(vehickeObj) {
    const cangku_obj = vehickeObj.data.find(a => a.hasOwnProperty("仓库位置"));
    const cangku_lng = cangku_obj.仓库位置[0];
    const cangku_lat = cangku_obj.仓库位置[1];
    cangkuArr.push(cangku_lng);
    cangkuArr.push(cangku_lat);
    console.log("cangkuArr");
    console.log(cangkuArr);
    cangkuMarker = new AMap.Marker({
        map: map,
        position: [cangku_lng,cangku_lat],
        // icon: "https://webapi.amap.com/images/car.png",
        icon: "https://s1.ax1x.com/2020/04/13/GvmSfI.png",
        offset: new AMap.Pixel(-26,-13),
        autoRotation: true,
        // angle: -90,
    });
}

//获取网点id对应的经纬度的接口
function getLngLat(siteId){
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "http://localhost:5005/site?id="+siteId, false );
    xmlHttp.send( null );
    const lngJson = xmlHttp.responseText;
    return lngJson;
}

//获取所有路线的门店编号
function getAllSites(vehickeObj){
    const cars = vehickeObj.data.find(a => Array.isArray(a)).map(a => Object.keys(a)[0]);
    console.log("cars start");
    console.log(cars);
    for (var i = 0;i<cars.length;i++) {
        var car = cars[i];
        // console.log(car);
        var baohan_mendian = vehickeObj.data.find(a => a.hasOwnProperty(car + "包含门店"))[car + "包含门店"];

        var walking = [-1];
        //加入仓库的标识
        for (var j = 0;j<baohan_mendian.length;j++){
            walking.push(baohan_mendian[j]);
        }
        walkingSites.push(walking);
        routeSites.push(baohan_mendian.map(a=>a));
        toReachSites.push(baohan_mendian.map(a=>a));
    }
    console.log(routeSites);
    console.log("cars end");
}

//把门店编号集合改为门店经纬度集合 其中仓库使用-1标识
function id2LngLat(arr){
    var lnglatArr = [];
    for (var i = 0;i<arr.length;i++) {
        const siteId = arr[i];
        //判断是否为仓库
        if (siteId == -1){
            lnglatArr.push(cangkuArr);
        }else{
            const LngLatJson = getLngLat(siteId);
            const mendian_lng = parseFloat(JSON.parse(LngLatJson).lng);
            const mendian_lat = parseFloat(JSON.parse(LngLatJson).lat);
            var mendianLatLngArr = [];
            mendianLatLngArr.push(mendian_lng);
            mendianLatLngArr.push(mendian_lat);
            lnglatArr.push(mendianLatLngArr);
        }
    }
    return lnglatArr;
}

//使用webAPI调用起始点和终止点的路径规划得到经纬度点集
function routeArrExtendWebAPI(start,end) {
    var start_lng = start.lng;
    var start_lat = start.lat;
    var end_lng = end.lng;
    var end_lat = end.lat;
    const xmlHttp = new XMLHttpRequest();
    var routeAPI = "http://restapi.amap.com/v3/direction/driving?key=e6ce86301999ce54d5dc11063e45a69d&origin="+start_lng+","+start_lat+"&destination="+end_lng+","+end_lat;
    xmlHttp.open( "GET", routeAPI, false );
    xmlHttp.send( null );
    const lngJson = xmlHttp.responseText;
    var route = JSON.parse(lngJson).route;
    var origin = route.origin;
    var destination = route.destination;
    var paths = route.paths[0];
    //获取所有的导航路段，进行遍历
    var steps = paths.steps;
    var polylineArr = [];
    //添加起始点经纬度
    polylineArr.push([parseFloat(origin.split(",")[0]),parseFloat(origin.split(",")[1])]);
    for (var i = 0; i< steps.length;i++){
        //获取对应的此路段坐标点串 进行解析得到经纬度集合
        var polyline = steps[i].polyline;
        var polylines = polyline.split(";");
        for (var j = 0;j < polylines.length;j++) {
            var polylinesPoint = polylines[j];
            polylineArr.push([parseFloat(polylinesPoint.split(",")[0]),parseFloat(polylinesPoint.split(",")[1])]);
        }
    }
    //添加终止点经纬度
    polylineArr.push([parseFloat(destination.split(",")[0]),parseFloat(destination.split(",")[1])]);
    return polylineArr;
}

//输入起始点和结束点之间的经纬度数组 展示在图中路线 idx表示第几条线路
function showPath(arr,idx,style) {
    var colorSet = ["#2ecc71","#C4E538","#12CBC4","#FDA7DF","#ED4C67","#EE5A24","#1289A7","#0652DD","#1B1464"];
    var color = colorSet[idx];
    //画出所有的路径
    var passedPolyline = new AMap.Polyline({
        map: map,
        path: arr,
        strokeColor: color,  //线颜色
        strokeStyle: style,
        lineJoin:"round",
        // showDir:true,
        strokeWeight: 6      //线宽
    });
    return passedPolyline;
}

//传入的一段路线(两个相邻网点)的经纬度集合 开始动画 到达终点显示窗体
function segmentAnimal(arr,marker,passedPolyline,siteMarker,carId,siteId,expectedPath) {

    //沿着该路线行动
    marker.moveAlong(arr,4000);
    //把走过的路线变色
    marker.on('moving', function (e) {
        passedPolyline.setPath(e.passedPath);
    });
    //如果到达了终点站 则执行动作
    marker.on('movealong',function (e) {
        var carPosition = marker.getPosition();
        reachSegmentActions(siteMarker,carId,siteId,expectedPath,carPosition,marker);
    });


}

//传入门店未扩充前的经纬度集合，展示门店的图标,idx表示第几条线路
function site2markers(arr,idx) {
    var lineSiteMarkers = [];
    for (var i = 0;i < arr.length;i++){
        var siteMarker = new AMap.Marker({
            map: map,
            position: arr[i],
            // icon: 'http://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
            icon: 'https://s1.ax1x.com/2020/04/13/Gvmupq.png',
            offset: new AMap.Pixel(-26,-13),
            autoRotation: true,
            // angle: -90,
        });
        var context ="第"+(idx+1)+"条线路第"+(i+1)+"个网点";
        siteMarker.setLabel({
            offset: new AMap.Pixel(20, 20),  //设置文本标注偏移量
            // content: "<div class='info'>"+context+"</div>", //设置文本标注内容
            content: context, //设置文本标注内容
            direction: 'right' //设置文本标注方位
        });
        lineSiteMarkers.push(siteMarker);
    }
    return lineSiteMarkers;
}

//关闭信息窗体
function closeInfoWindow() {
    map.clearInfoWindow();
}

//构建自定义信息窗体
function createInfoWindow(title, content) {
    var info = document.createElement("div");
    info.className = "custom-info input-card content-window-card";

    //可以通过下面的方式修改自定义窗体的宽高
    //info.style.width = "400px";
    // 定义顶部标题
    var top = document.createElement("div");
    var titleD = document.createElement("div");
    var closeX = document.createElement("img");
    top.className = "info-top";
    titleD.innerHTML = title;
    closeX.src = "https://webapi.amap.com/images/close2.gif";
    closeX.onclick = closeInfoWindow;

    top.appendChild(titleD);
    top.appendChild(closeX);
    info.appendChild(top);

    // 定义中部内容
    var middle = document.createElement("div");
    middle.className = "info-middle";
    middle.style.backgroundColor = 'white';
    middle.innerHTML = content;
    info.appendChild(middle);

    // 定义底部内容
    var bottom = document.createElement("div");
    bottom.className = "info-bottom";
    bottom.style.position = 'relative';
    bottom.style.top = '0px';
    bottom.style.margin = '0 auto';
    var sharp = document.createElement("img");
    sharp.src = "https://webapi.amap.com/images/sharp.png";
    bottom.appendChild(sharp);
    info.appendChild(bottom);
    return info;
}

//设置到达网点后的动作
function reachSegmentActions(marker,carId,siteId,expectedPath,carPosition,oldCarMarker) {
    //到达后设置弹跳效果
    // marker.setAnimation('AMAP_ANIMATION_BOUNCE');
    // var newSites = dynamicUpdate(carId+1,siteId+1);

    console.log("到达网点之后执行的操作");
    console.log("carId"+carId+"siteID"+siteId);
    var site = simulationDynamicUpdate(carId,siteId,true);

    var title = '已经到达第'+(carId+1)+'条路线<span style="font-size:11px;color:#F00;">第'+(siteId+1)+'个网点</span>';
    var content = [];
    if(toReachSites[carId].length == 0){
        content.push("<img src='http://tpc.googlesyndication.com/simgad/5843493769827749134'>该条线路以及配送完毕");
    }else{
        content.push("<img src='http://tpc.googlesyndication.com/simgad/5843493769827749134'>正在接收新订单...");
        content.push("正在为您重新规划路线，请稍等");
        content.push("新的配送门店为"+toReachSites[carId]);
    }
    //显示信息窗体
    var infoWindow = new AMap.InfoWindow({
        position:marker.getPosition(),
        isCustom: true,  //使用自定义窗体
        content: createInfoWindow(title, content.join("<br/>")),
        offset: new AMap.Pixel(16, -45)
    });
    infoWindow.open(map,marker.getPosition());

    //如果还有需要配送的网点 则继续执行函数
    if (toReachSites[carId].length != 0){
        //     console.log("开始显示第"+carId+"条路线第"+(siteId+1)+"个网点陆地");
        //     //清楚之前的预期路线
        expectedPath.hide();
        sleep(2000);
        //     //生成预期路线
        var siteRoutesArray = walkingSites[carId];
        //     console.log("经过仿真后的代配送门店");
        //     console.log(siteRoutesArray);
        //     // siteRoutesArray.unshift(site);
        //     console.log("siteRoutesArray");
        //     console.log(siteRoutesArray);
        //     //在待配送门店中去掉以配送
        //     var index = updatingRouteSites[carId].indexOf(site);
        //     if (index > -1){
        //         updatingRouteSites[carId].splice(index,1);
        //     }
        var newExpectedPath = siteIdsToRoutes(siteRoutesArray,carId);
        //     //开始动画
        //     carMarkers[carId].setPosition(carPosition);
        //     //生成图标
        oldCarMarker.hide();
        var carMarker = new AMap.Marker({
            map: map,
            position: carPosition,
            // content: "第" + i + "辆车",
            icon: "https://webapi.amap.com/images/car.png",
            // icon: "truck.png",
            offset: new AMap.Pixel(-26, -13),
            autoRotation: true,
            angle: -90
        });
        //
        carMarker.setLabel({
            offset: new AMap.Pixel(20, 20),  //设置文本标注偏移量
            content: "第" + (carId+1) + "辆车",
        });
        firstAnimal(siteRoutesArray,carId,siteId+1,carMarker,siteMarkers[carId][siteId+1],newExpectedPath);
    }

}


function sleep(ms) {
    for(var t = Date.now();Date.now() - t <= ms;);
}


//接收王鹏动态算法更新路径的函数 返回网点id的列表
function dynamicUpdate(carId,siteId) {
    const xmlHttp = new XMLHttpRequest();
    var URL = "http://10.141.209.224:5002/algo3/"+carId+"/"+siteId;
    xmlHttp.open( "GET", URL, false );
    xmlHttp.send( null );
    const dynamicJson = xmlHttp.responseText;
    var algo3 = JSON.parse(dynamicJson).algo3;
    var algo3_item_path = algo3[carId].path;
    console.log(algo3);
    console.log(algo3_item_path);
    return algo3_item_path;
}

//模拟动态更新的接口函数 没调用一次则减少一次 返回删除的网点
function simulationDynamicUpdate(carId,siteId,isShuffed) {
    console.log("routeSites");

    // var obj = getVehicles();
    console.log("未删除之前的路径");
    console.log(walkingSites[carId]);
    var site = routeSites[carId][siteId];
    console.log("待删除节点");
    console.log(site);
    console.log("未删除之前的待行走路径");
    console.log(toReachSites[carId]);

    var index = toReachSites[carId].indexOf(site);
    console.log("待删除节点的索引"+index);
    if (index > -1){
        toReachSites[carId].splice(index,1);
        walkingSites[carId].shift();
    }
    console.log("删除之后的路径");
    console.log(walkingSites[carId]);
    console.log("删除之后的待行走路径");
    console.log(toReachSites[carId]);

    if (toReachSites[carId].length != 0 && isShuffed == true){
        for (let i = 1; i < toReachSites[carId].length; i++) {
            const random = Math.floor(Math.random() * (i + 1));
            [toReachSites[carId][i], toReachSites[carId][random]] = [toReachSites[carId][random], toReachSites[carId][i]];
        }
    }
    return site;
}

//给定网点列表集合，返回预期的路线列表
function siteIdsToRoutes(arr,i) {
    //获取经纬度集合
    var siteLngLats = id2LngLat(arr);
    console.log("路线对应经纬度集合为");
    console.log(siteLngLats);
    var routeAllPoints = [];
    for (var j = 0; j < siteLngLats.length - 1; j++) {
        var start = new AMap.LngLat(siteLngLats[j][0], siteLngLats[j][1]);
        var end = new AMap.LngLat(siteLngLats[j + 1][0], siteLngLats[j + 1][1]);
        var segmentRouteArr = routeArrExtendWebAPI(start, end);
        for (var t = 0; t < segmentRouteArr.length; t++) {
            routeAllPoints.push(segmentRouteArr[t]);
        }
    }
    return showPath(routeAllPoints, i, "dashed");
}

//将第一段的函数进行动画的展示 输入的是网点的id的集合
function firstAnimal(arr,carId,siteId,carMarker,siteMarker,expectedPath) {
    var lineLatArray = id2LngLat(arr);
    var start = new AMap.LngLat(lineLatArray[0][0], lineLatArray[0][1]);
    var end = new AMap.LngLat(lineLatArray[1][0], lineLatArray[1][1]);
    var segmentRouteArr = routeArrExtendWebAPI(start, end);
    var passed = showPath(segmentRouteArr, carId, "solid");
    segmentAnimal(segmentRouteArr, carMarker, passed,siteMarker,carId,siteId,expectedPath);
}

//主要的函数的流程
function main() {
    //1.读取初始路线数据
    const vehickeObj = getVehicles();
    console.log("1.读取初始路线数据");
    console.log(vehickeObj);

    //2.获取仓库数据
    getCangku(vehickeObj);
    console.log("2.获取仓库数据");

    console.log("3.获取所有的行驶路线的网点列表");
    //3.获取所有的行驶路线的网点列表
    getAllSites(vehickeObj);

    //4.把所有的网点数据转为经纬度
    console.log("4.把所有的网点数据转为经纬度");
    //遍历所有的路线
    for (var i = 0;i<routeSites.length;i++){
        //暂时只显示第一条路线
        // if(i==0) {
            console.log("第"+(i+1)+"条路线");

            //生成图标
            var carMarker = new AMap.Marker({
                map: map,
                position: cangkuArr,
                // content: "第" + i + "辆车",
                icon: "https://webapi.amap.com/images/car.png",
                // icon: "truck.png",
                offset: new AMap.Pixel(-26, -13),
                autoRotation: true,
                angle: -90
            });

            carMarker.setLabel({
                offset: new AMap.Pixel(20, 20),  //设置文本标注偏移量
                content: "第" + (i+1) + "辆车",
            });

            carMarkers.push(carMarker);

            console.log("生成初始路线");
            console.log("原始配送网点id列表为");
            console.log(routeSites[i]);
            console.log("行驶路线为");
            console.log(walkingSites[i]);
            console.log("生成预期路线");
            var expectedPath = siteIdsToRoutes(walkingSites[i],i);
            //
            console.log("网点转化为图标");
            siteMarkers.push(site2markers(id2LngLat(routeSites[i]), i));
            console.log("开始行走第一部分");
            firstAnimal(walkingSites[i],i,0,carMarker,siteMarkers[i][0],expectedPath);
        // }
    }
}

main();
