const infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});
/**
 * 地图相关
 * */
const map = new AMap.Map('container', {
    resizeEnable: true,
    //  center: [116.405285, 39.904989],
    // zoom: 17
    center: [121.498586, 31.239637] //初始地图中心点选为上海
});


/**
 * 输入提示
 * */

var start, end;

var autoStartOptions = {
    input: "tipinput1"
};
var autoStart = new AMap.Autocomplete(autoStartOptions);
var placeSearch = new AMap.PlaceSearch({
    map: map
});  //构造地点查询类

var startIcon = new AMap.Icon({
    // 图标尺寸
    size: new AMap.Size(25, 34),
    // 图标的取图地址
    image: '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png',
    // 图标所用图片大小
    imageSize: new AMap.Size(135, 40),
    // 图标取图偏移量
    imageOffset: new AMap.Pixel(-9, -3)
});

function selectStart(e) {
    placeSearch.setCity(e.poi.adcode);
    placeSearch.search(e.poi.name);  //关键字查询查询
    start = new AMap.LngLat(e.poi.location.lng, e.poi.location.lat);
    map.clearMap();
}

function selectEnd(e) {
    placeSearch.setCity(e.poi.adcode);
    placeSearch.search(e.poi.name);  //关键字查询查询
    end = new AMap.LngLat(e.poi.location.lng, e.poi.location.lat);
}

var autoEndOptions = {
    input: "tipinput2"
};
var autoEnd = new AMap.Autocomplete(autoEndOptions);
AMap.event.addListener(autoStart, "select", selectStart);//注册监听，当选中某条记录时会触发
AMap.event.addListener(autoEnd, "select", selectEnd);//注册监听，当选中某条记录时会触发


/**
 * 路径规划
 * */
document.querySelector("#route").onclick = createRoute;

//构造路线导航类
var driving = new AMap.Driving({
    map: map,
    panel: "panel"      //panel表示导航的信息路线
});

function createRoute() {
    map.clearMap();

    driving.search(start, end, function (status, result) {
        // result 即是对应的驾车导航信息，相关数据结构文档请参考 https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
        if (status === 'complete') {
            printRoot(result);
        } else {
            // log.error('获取驾车数据失败：' + result)
        }
    });
}


function markerClick(e) {
    infoWindow.setContent(e.target.content);
    infoWindow.open(map, e.target.getPosition());
}

/**
 * @param {number} lng
 * @param {number} lat
 * @return {Promise<{
     *  marker: object,
     *  crossNum: number,
     * }>}
 */

var markerIdx = 1;
var crossNameArr = [];
async function lngLat2Marker(lng, lat, crossIndex) {
    const marker = new AMap.Marker({
        position: new AMap.LngLat(lng, lat),
        animation:"AMAP_ANIMATION_DROP",
        // icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png"
        // icon: "road.png",
        icon: "${ctxPath}/assets/expand/images/road.png",
        // icon: "https://cdn.nlark.com/yuque/0/2019/png/372732/1574002651750-8ad96322-1fa7-41e4-a607-38d620953edd.png"
        // icon: "https://cdn.nlark.com/yuque/0/2019/png/372732/1574002941905-db0c9918-2cb4-4a3e-a1a5-b632c260eadb.png"

    });
    marker.on('click', markerClick);
    // marker.emit('click', {target: marker});
    return new Promise(resolve => {
        regeoCode([lng, lat], (data) => {
        const crossNum = data.crosses.length;

        if (crossNum !== 0) {
            const firstRoad = data.crosses[0].first_name;
            const secondRoad = data.crosses[0].second_name;
            const crossName = `${firstRoad}与${secondRoad}交叉口`;

            // console.log('crossNameArr:'+crossNameArr);
            if(crossNameArr.indexOf(crossName)===-1){
                crossNameArr.push(crossName);
                // console.log('markerIdx:'+markerIdx);
                marker.content = `交叉路口的名称：${crossName}<br>坐标是： ${lng},${lat}`;
                markerIdx++;
            }else{
                marker.hide();
            }

        }
        else{
            marker.hide();
        }
        resolve({marker, crossNum});
    });
});
}

/**
 * 获取点的信息
 */
var allStartPoints;
var routePoints;
var allPaths;

async function printRoot(result) {
    allStartPoints = [];
    routePoints = [];
    allPaths = [];
    var allWays = result.routes[0].steps;
    for (let i = 0; i < allWays.length; i++) {
        /**
         * 起始点信息
         * */
        var step = allWays[i];
        var startArr = [];
        startArr.push(step.start_location.lng);
        startArr.push(step.start_location.lat);
        allStartPoints.push(startArr);
        allPaths.push(startArr);
        /**
         * 每一段的点集
         * 这里只将有交叉路口的中间点加入到点集中
         **/
        var PathArr = step.path;
        for (var t = 0; t < PathArr.length; t++) {
            var eachPathPoint = PathArr[t];
            var eachPathArr = [];
            eachPathArr.push(eachPathPoint.lng);
            eachPathArr.push(eachPathPoint.lat);
            //折线图使用
            allPaths.push(eachPathArr);
            allStartPoints.push(eachPathArr);
        }

    }
    /**
     * 把所有的点加入到marker中
     * */
    console.log('allStartPoints.length:' + allStartPoints.length);
    var resStr = "";
    console.log('allStartPoints' + allStartPoints);
    for(let i = 0; i<allStartPoints.length;i++)
        resStr += '['+allStartPoints[i][0]+','+allStartPoints[i][1]+'],';
    console.log("resStr: "+resStr);
    routePoints = (await Promise.all(allStartPoints.map(([lng, lat], idx) => lngLat2Marker(lng, lat, idx + 1)))).filter(result => result.crossNum > 0).map(result => result.marker);
    console.log(routePoints);

}


// 添加覆盖物群组
function addOverlayGroup(markers) {
    // 创建覆盖物群组，并将 marker 传给 OverlayGroup
    var overlayGroups = new AMap.OverlayGroup(markers);
    map.add(overlayGroups);
    startAnimation();
}

document.getElementById("addOverlayGroup").onclick = () => addOverlayGroup(routePoints);


/**
 * 动画
 * */
function startAnimation() {
    var carMarker = new AMap.Marker({
        map: map,
        position: allPaths[0],
        icon: "https://webapi.amap.com/images/car.png",
        // icon: "trunk2.png",
        offset: new AMap.Pixel(-26, -13),
        autoRotation: true,
        angle: -90,
    });

    // 绘制轨迹
    var polyline = new AMap.Polyline({
        map: map,
        path: allPaths,
        showDir: true,
        strokeColor: "#28F",  //线颜色
        // strokeOpacity: 1,     //线透明度
        strokeWeight: 6,      //线宽
        // strokeStyle: "solid"  //线样式
    });

    var passedPolyline = new AMap.Polyline({
        map: map,
        // path: lineArr,
        strokeColor: "#AF5",  //线颜色
        // strokeOpacity: 1,     //线透明度
        strokeWeight: 6,      //线宽
        // strokeStyle: "solid"  //线样式
    });


    carMarker.on('moving', function (e) {
        passedPolyline.setPath(e.passedPath);
    });

    map.setFitView();

    carMarker.moveAlong(allPaths, 1000);
}

/**
 * 解析poi地址
 * */


function regeoCode(lnglat, callback) {


    var geocoder = new AMap.Geocoder({
        // city: "010", //城市设为北京，默认：“全国”
        extensions: "all",
        radius: 30 //范围，默认：500
    });

    geocoder.getAddress(lnglat, function (status, result) {
        if (status === 'complete' && result.regeocode) {
            // var add = result.regeocode.formattedAddress;
            var data = result.regeocode;
            if (callback) {
                callback(data);
            }
            return data;
        } else {
            // log.error('根据经纬度查询地址失败' + lnglat)
        }
    });
}