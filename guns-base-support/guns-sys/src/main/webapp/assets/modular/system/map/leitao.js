const color = ['#FA6500','#B242FA', '#5AFA6D', '#5dacfa','#FA8072', '#fac26d', '#FA7037'];
const api = {
    originRoute: 'http://10.141.209.224:5001/vehicles',
    dynamicRoute: 'http://10.141.209.224:5002/algo3/',
    id2LngLat: 'http://10.141.209.224:5003/site'
};
let vehicleNum = 0, vehicle = [];
let selected = [], remain = [];
const carNumber = ['沪D3C323', '沪D9N897', '沪D7B856',  '沪B6A765'];
const icon = {
    car: "https://webapi.amap.com/images/car.png",
    site: '',
    warehouse: ''
};
const warehouse = ['江桥联华物流基地（上海市嘉定区翔江公路3588号）'];
let
    /**
     * 从接口读取的数据
     */
    number2Id = [],   // index:网点在本班列序号, val: 网点编号
    addressList = [], // index:网点在本班列序号, val: 网点经纬度[lat, lng]
    idList = [],      // index:车辆序号, val: 网点编号数组
    numberList = [],  // index:车辆序号, val: 网点序号数组
    lineArr = [],     // index:车辆序号, val: 网点经纬度数组
    markers = [],     // index:车辆序号, val: 车辆marker
    orders = {
        siteName: [],     // 网点全称
        siteNameEasy: [], // 网点名称
        weight: [],       // 重量
        addr: [],         // 网点经纬度
        lng: [],
        lat: [],
        volume: [],       // 货物体积
        num: [],          // 实发总箱数
        siteType: []      // 门店类型
    },      //
    passedPolylines = [],
    center = [121.570951, 31.158131],//[116.379028, 39.865042],      // 仓库经纬度
    pathSingle = {
        markersPassed: [],
        markersPassing: [],
        pathSinglePassed: [],
        pathSinglePassing: []
    },
    /**
     * 车辆订单
     */
    carOrders = [],        // index: 车辆序号, val: 单个车辆的订单信息数组（[siteNumber, weight, volume, num]）
    domCarOrders = [],     // 车辆对应订单的DOM
    carDOMs = [],
    carDOMsStyle = new Map(),
    /**
     * 地图上的覆盖物和折线
     */
    siteMarkers = [],      // 【marker】网点
    carMarkers = [],       // 【marker】车辆
    lines = {              // index: 车辆序号,
        linesEntire: [],   // [车辆全程路径的虚线, 虚线颜色]
        linesPassing: [],  // val: 车辆正在运行局部路径的实线
        linesPassed: [],   // val: 车辆已经运行路径的实线
        linesCurr: [],     // 当前正在画的线
    },
    /**
     * 经过导航扩充后，车辆的移动路径
     */
    routes = {
        routesEntire: [],  // 全程路径
        routesLocal: [],   // 每辆车的局部路径
    },
    polylineAll = [],
    polylineAllpassing = [],
    selectValue = -1;
let arrNew = [];

let map = new AMap.Map("container", {
    resizeEnable: false,
    center: center,
    zoom: 14
});
// map.setFitView();
/**
 * 车辆选择显示与隐藏
 */
function show(index) {
    let marker = carMarkers[index];
    console.log('set car marker:', new AMap.LngLat(center[0], center[1]));
    marker.setPosition(new AMap.LngLat(center[0], center[1]));
    marker.show();
    let lineEntire = lines.linesEntire[index][0];
    lineEntire.setMap(map);
}
// 隐藏单个车辆和对应虚线
function hide(index) {
    let marker = carMarkers[index];
    marker.hide();
    let lineEntire = lines.linesEntire[index][0];
    lineEntire.setMap(null);
}
// 清空所有实线
function hideLines() {
    for(let line of lines.linesCurr) {
        line.setMap(null);
    }
    lines.linesCurr = [];
}
// 选择显示哪一辆车
function selectChange(e) {
    console.log(e.target.value);
    let carId = e.target.value - 1;
    /*
    if(selectValue == -1) {
        carMarkers.forEach((marker, i)=>{
            setCarOrdersDOMHidden(selectValue);
        });
    } else {
        setCarOrdersDOMHidden(selectValue);
    }
    */
    if(carId == -1) { // 全部车辆
        let j = 1;

        /*
        console.log('carMarkers:', carMarkers);
        for(let i=0,len=carMarkers.length;i<len;++i) {
            let marker = carMarkers[i];
            show(i);
            setCarOrdersDOMVisibility(carId);
            getDriveDataSingle(i, marker, []);
        }
        */
        carMarkers.forEach((marker, i)=>{
            show(i);
        setCarOrdersDOMVisibility(i);
        getDriveDataSingle(i, marker, []);
    });

        /*
        for(let arr of lineArr) {
            let str = '第'+j+'辆车';
            getDriveDataInid2Addr(j, arr, str, carMarkers[carId]);
            j++;
        }

         */

    } else {
        // let str = '第'+carId+'辆车';
        carMarkers.forEach((marker, i)=>{
            hide(i);
        setCarOrdersDOMHidden(i);
    });
        hideLines();
        show(carId);
        // console.log('select car:', carId+1, color[carId]);
        console.log(carOrders[carId]);
        setCarOrdersDOMVisibility(carId);
        getDriveDataSingle(carId, carMarkers[carId], []);
        // getDriveDataInid2Addr(carId, arrlist, str, carMarkers[carId]);
    }
    selectValue = carId;
}
// 挂载select
function setInfoVisible(carNum) {
    let ele = document.getElementById('info'),
        select = document.getElementById('selectCar');
    const fragment = document.createDocumentFragment();

    const option = document.createElement('option');
    option.innerHTML = '全部车辆';
    option.value = '0';
    fragment.appendChild(option);
    for(let i=1;i<=carNum;++i) {
        const option = document.createElement('option');
        option.innerHTML = '第' + i + '辆车';
        option.value = i.toString();
        fragment.appendChild(option);
    }

    select.appendChild(fragment);
    select.addEventListener('change', selectChange);
    ele.style.visibility = 'visible';
}

/**
 * 提交时loading
 */
// 改变spinner状态
function changeBtnStatus(show) {
    let btn = document.getElementById('loading');
    if(show) {
        btn.style.display = 'inline-block';
    } else {
        btn.style.display = 'none';
    }
}

/**
 * 获取数据
 */
// 读取something中的内容
function getSomething(obj, currNameConverted) {
    let arr = orders[currNameConverted];
    for(let j in obj) {
        if(obj.hasOwnProperty(j)) {
            arr.push(obj[j]);
        }
    }
    // console.log('arr: ', arr);
}
// 获取选择数据
function getInput() {
    // 沪D3C323 沪D9N897 沪D7B856 沪B6A765

    let checkbox = document.getElementsByName('checkbox');
    for(let i = 0, len = checkbox.length; i < len; i++){
        if(checkbox[i].checked) {
            selected.push(checkbox[i].value);
            vehicleNum++;
        } else {
            remain.push(checkbox[i].value)
        }
    }
    let routeId = document.getElementById('exampleInputName1').value;
    //exampleInputName1
    let orderDate = document.getElementById('exampleInputName2').value;
    console.log('check:', vehicleNum, ' routeId:', routeId, ' date: ', orderDate);
    return {
        banlieId: 1,
        orderDate: '2020-04-03',
        vehicleNum: vehicleNum
    }
}

// 获取原始路径，网点编号、序号等
function getOriginRoute() {
    let param = getInput();
    let abc = 0, xyz = 0;
    axios.get(api.originRoute, {params: param})
        .then(response => {
        // console.log('original route:', response.data.data[13]);
        let data = response.data;
    let tmp, flag = 1;
    if (data.status == 'success') {
        data = data.data;
        for (let item of data) {
            if (item.hasOwnProperty('班列顺序')) {
                tmp = item['班列顺序'];
                const arr = [];
                for (let k in tmp) {
                    arr.push(tmp[k]);
                }
                number2Id = arr;
            } else if (item.hasOwnProperty('仓库位置')) {
                center = item['仓库位置'];
                console.log('center:', center);
            } else if (Array.isArray(item)) {
                ;
            } else if (item.hasOwnProperty('门店订单')) {
                let something = JSON.parse(item['门店订单']);
                const arrName = ['id', 'name', '门店名称', '重量', 'longitude', 'latitude', '体积', '实发总箱数', '门店类型'],
                    arrNameConverted = ['id', 'siteName', 'siteNameEasy', 'weight', 'lng', 'lat', 'volume', 'num', 'siteType'];
                for(let j = 1, len = arrNameConverted.length; j<len; ++j) {
                    let currNameConverted = arrNameConverted[j],
                        currName = arrName[j],
                        obj = something[currName];
                    getSomething(obj, currNameConverted);
                }
                for(let j = 0, len = orders.lng.length; j<len; ++j) {
                    orders.addr.push([orders.lng[j], orders.lat[j]]);
                }
                // console.log('converted orders:', orders);
            } else if (item.hasOwnProperty('车辆类型')) {
                ;
            } else { // 门店，线路
                if (flag == 1) { // 门店
                    for (let k in item) {
                        idList.push(item[k]);
                    }
                    if(abc < selected.length) {
                        vehicle[abc] = selected[abc];
                        abc++;
                    } else {
                        vehicle[abc] = remain[xyz];
                        abc++;
                        xyz++;
                    }

                } else { // 线路
                    for (let k in item) {
                        numberList.push(item[k]);
                    }
                }
                flag = -flag;
            }
        }
        /*
        console.log('------------');
        console.log('get original data.');
        console.log('number2Id:', number2Id);
        console.log('idList:', idList);
        console.log('numberList:', numberList);
        console.log('------------');
        */

        // 画出所有网点
        setSiteInfo(orders);
        // id -> lng lat
        idToAddr();
    } else {
        console.log(data.status);
    }
})
.catch(function (error) { // 请求失败处理
        console.log(error);
    });
}

// 单个车辆的所有订单 -> carOrders
function getCarOrders(carId) {
    let ordersSingleCar = numberList[carId],
        arr = [];
    // console.log(ordersSingleCar)
    ordersSingleCar.forEach((siteNumber, i)=>{
        let siteName = orders.siteName[siteNumber],
        weight = orders.weight[siteNumber],
        volume = orders.volume[siteNumber],
        num = orders.num[siteNumber];
    if(typeof weight != "undefined" && typeof volume != "undefined" && typeof num != "undefined")
        arr.push([siteName, weight, volume, num]);
    // console.log('第'+carId+'辆车', weight, volume, num);
});
    carOrders.push(arr);
}
function createCarOrdersDOM(carId) {
    let orders = carOrders[carId];
    let ele = document.getElementById('tableCarOrders');
    const fragment = document.createDocumentFragment();

    const tr = document.createElement('tr'),
        car = document.createElement('td');
    car.innerHTML = '第' + (carId + 1) + '辆车';
    car.colspan = 4;
    tr.colspan = 4;
    tr.id = carId;
    tr.className = 'car' + carId;
    tr.appendChild(car);
    fragment.appendChild(tr);

    // const key = ['网点名称：', '重量：', '体积：', '件数：'];
    orders.forEach(order => {
        const site = document.createElement('tr');
    site.className = 'car' + carId;
    order.forEach((detail, i) => {
        const td = document.createElement('td');
    td.innerHTML = detail;
    site.appendChild(td);
});
    fragment.appendChild(site);
});
    // carDOMsStyle.push([fragment, carId]);
    carDOMsStyle.set(carId, fragment);

    ele.appendChild(fragment);
    // select.addEventListener('change', selectChange);
    // ele.style.display = '';

}
function createCarOrdersDOMSingle() {
    let info = document.getElementById('info');
    carOrders.forEach((orders, index) => {
        // 某一辆车
        const fragment = document.createDocumentFragment(),
        table = document.createElement('table'),
        tr = document.createElement('tr');
    table.style.display = 'none';
    table.id = index + 'car';
    table.class = "table table-striped";
    const key = ['网点名称：', '重量：', '体积：', '件数：'];
    key.forEach(item => {
        const td = document.createElement('th');
    td.innerHTML = item;
    tr.appendChild(td);
});
    table.appendChild(tr);
    orders.forEach(order => {
        const innerTr = document.createElement('tr')
        order.forEach(item => {
        const td = document.createElement('td');
    td.innerHTML = item;
    innerTr.appendChild(td);
});
    table.appendChild(innerTr);
})
    fragment.appendChild(table);
    info.appendChild(fragment);
    carDOMs.push(fragment);
});

}
// TODO:
function setCarOrdersDOMHidden(carId) {
    let tableContent = document.getElementById('tableCarOrders');
    let str = 'main div table#tableCarOrders.table.table-striped tr.car';
    let arr = document.querySelectorAll(str + carId);
    if(arr.length) {
        const fragment = document.createDocumentFragment();
        arr.forEach(tr => {
            let tmp = tr.parentNode.removeChild(tr);
        fragment.appendChild(tmp);
    });
    }

    // carDOMsStyle.push([fragment, carId]);
}
function setCarOrdersDOMVisibility(carId) {
    let tableContent = document.getElementById('tableCarOrders');
    /*
    if(carDOMsStyle.has(carId)) {
        let t = carDOMsStyle.get(carId);
        console.log(t);
        tableContent.appendChild(t);
    }*/
    createCarOrdersDOM(carId);
    /*
    carDOMsStyle.forEach(item => {
        if(item[1] === carId) {
            tableContent.appendChild(item[0]);
        }
    });
    */
    // tableContent.appendChild(carDOMsStyle[carId]);
    // console.log('剩余：', carDOMsStyle);

    /*
    console.log('tablecontent:', tableContent);
    // document.getElementById('tableCarOrders').style.display = 'none';
    let idName = carId + 'car';
    document.getElementById(idName).style.display = 'block';
    // console.log(carDOMs[carId]);

     */
    /*
    let carSum = carMarkers.length;
    for(let i = 0; i<carSum; ++i) {
        if(i === carId) {
            tableContent.appendChild(carDOMsStyle[carId]);
        } else {
            let str = 'main div table#tableCarOrders.table.table-striped tr.car';
            let arr = document.querySelectorAll(str + i);
            arr.forEach(tr => {
                tr.style.display = 'none'
            });
        }
    }

     */
}

//carDOMsStyle
// tableContent.appendChild(carDOMsStyle[carId]);
/*
            let calssName = carId + 'car';
            let carDoms = document.querySelectorAll('main.div.table.#' + calssName);
            carDoms.forEach(tr => {
                console.log(tr);
            })
        }
        */

async function idToAddr() {
    for (let i of number2Id) {
        // console.log(i);
        await axios
            .get(api.id2LngLat, {params: {id: i}})
            .then(res => {
            res = res.data;
        if (res.success == 0) {
            let addr = [res.lng, res.lat];
            addressList.push(addr);
        } else {
            console.log('error. get address.');
        }
    })
    .catch(function (error) { // 请求失败处理
            console.log(error);
        });
    }
    console.log('get addreslist');
    for (let item of numberList) {
        let arr = [];
        for (let number of item) {
            let addr = addressList[number];
            if(typeof addr !='undefined') {
                arr.push(addr);
            }
        }
        arr.push(center);
        lineArr.push(arr);
    }
    console.log('lineArr:', lineArr);
    let j = 1;
    for(let arr of lineArr) {
        // 每辆车的订单 写入 carOrders
        getCarOrders(j-1);
        let str = '第'+j+'辆车';
        let marker = new AMap.Marker({
            map: map,
            position: center,
            icon: icon.car,
            offset: new AMap.Pixel(-26, -13),
            autoRotation: true,
            angle: -90,
            label: {
                content: str,
                direction: 'left',
                offset: new AMap.Pixel(20, 20)
            }
        });
        carMarkers.push(marker);
        getDriveDataInid2Addr(j, arr, str, marker);
        j++;
    }
    carOrders.forEach((order, i) => {
        createCarOrdersDOM(i);
    console.log(i);
});
    createCarOrdersDOMSingle();
    console.log('carOrders:', carOrders);
    // 设置select
    let carNum = idList.length;
    await setInfoVisible(carNum);
    await changeBtnStatus(false);
}
function getDriveDataInid2Addr(j, arr, str, marker) {
    let start = center,
        driving = new AMap.Driving({
            policy: AMap.DrivingPolicy.LEAST_TIME
        });
    arr.unshift(start);
    getDriveData(j, arr, marker, driving, []);
}

// TODO:1.丰富门店显示信息；2.换图
function setSiteInfo(orders) {
    let siteAddrList = orders.addr,
        siteNameList = orders.siteName,
        siteTypeList = orders.siteType;
    for (let i = 0; i < siteAddrList.length; i++) {
        let addr = siteAddrList[i],
            name = siteNameList[i],
            type = siteTypeList[i];
        // 生成门店
        let Marker = new AMap.Marker({
            position: addr,
            map: map
        });
        siteMarkers.push(Marker);

        // 点击门店显示信息
        let content = '<div class="info-title" style="padding:7px 0px 0px 0px;">'+ name +'</div><div class="info-content">' +
            '<img src="https://webapi.amap.com/images/amap.jpg">门店类型：' + type +
            '<br/>';
        let infowindow = new AMap.InfoWindow({
            content: content,
            offset: new AMap.Pixel(0, -30)
        });
        Marker.on('click', function () {
            infowindow.open(map, addr);
        });
    }
}

// 初始时所有车辆的局部路径
function getDriveDataLocal(carIndex, driving, marker, allPaths, i, j, arrlist, passed = []) {
    let nextPaths = [];
    let ccolor = color[carIndex];
    let ori = arrlist[i], des = arrlist[j];
    driving.search(ori, des, function (status, result) {
        if (status === 'complete') {
            console.log('第'+carIndex+'辆车局部驾车路线完成');
            nextPaths = getRoute(result);
            let passedPolylineAll = new AMap.Polyline({
                map: map,
                path: allPaths,
                strokeColor: ccolor,  //线颜色
                strokeWeight: 6,      //线宽
                strokeStyle: 'dashed',
                lineJoin: 'round'
            });
            // passedPolylineAll.setPath(allPaths);
            lines.linesEntire.push(passedPolylineAll);

            // 已经过的路径
            if (passed.length !== 0) {
                let passedPolyline = new AMap.Polyline({
                    map: map,
                    path: nextPaths,
                    strokeColor: ccolor,  //线颜色
                    strokeWeight: 6,      //线宽
                    lineJoin: 'round'
                });
                // passedPolyline.setPath(passed);
                lines.linesPassed.push(passedPolyline);
                lines.linesCurr.push(passedPolyline);
            }

            // 移动过程中的路径
            let passedPolyline = new AMap.Polyline({
                map: map,
                path: nextPaths,
                strokeColor: ccolor,  //线颜色
                strokeWeight: 6,      //线宽
                lineJoin: 'round'
            });
            lines.linesPassing.push(passedPolyline);
            lines.linesCurr.push(passedPolyline);

            marker.on('moving', function (e) {
                let path = e.passedPath;
                // passedPolyline.setPath(path);
            });
            marker.on('movealong', function () {
                var info = [];
                info.push("<div style=\"padding:7px 0px 0px 0px;\"><h4>到达网点</h4>");
                info.push("<p class='input-item'>正在上下货...</p>");
                let infowindow = new AMap.InfoWindow({
                    content: info.join('')
                });
                infowindow.on('close', function () {
                    console.log('close window.')
                    // getDynamic(0, j)
                    // 获取动态路径
                    if (false) {
                        passedPolylineAll.setMap(null);
                        pathSingle.pathSinglePassed = passed.concat(nextPaths);
                        // TODO:新获取的仓库
                        arrNew = [[116.42, 39.89]];

                        console.log('dynamic routes...')
                        let s = nextPaths.slice(-1)[0];
                        // console.log(s);
                        arrNew.unshift([s.lng, s.lat])
                        console.log('arrNew:', arrNew);
                        getDriveData(carIndex, arrNew, marker, driving, passed.concat(nextPaths));
                        return;
                    } else {
                        // 未改变的情况
                        if (j + 1 < arrlist.length) {
                            getDriveDataLocal(carIndex, driving, marker, allPaths, i + 1, j + 1, arrlist, passed.concat(nextPaths));
                        }
                    }
                })
                infowindow.open(map, nextPaths.slice(-1)[0]);
                console.log('arrive at next station.');
            });
            // console.log('nextPathsAll:', nextPathsAll);
            marker.moveAlong(nextPaths, 4000);
            map.setFitView();
        } else {
            console.log('获取驾车数据失败：' + result)
        }
    });
    return []; // 路径未变化
}

function getRoute(res) {
    let allPaths = [], allStartPoints = [];
    let allWays = res.routes[0].steps;
    for (let i = 0; i < allWays.length; i++) {
        let step = allWays[i];
        let startArr = [step.start_location.lng, step.start_location.lat];
        allStartPoints.push(startArr);
        allPaths.push(startArr);

        let PathArr = step.path;
        for (let t = 0; t < PathArr.length; t++) {
            let eachPathPoint = PathArr[t],
                eachPathArr = [eachPathPoint.lng, eachPathPoint.lat];
            //折线图使用
            allPaths.push(eachPathArr);
            allStartPoints.push(eachPathArr);
        }
    }
    return allPaths;
}

function getDriveDataStatic(carIndex, arrlist, marker, driving, passed) {
    let waypoints = arrlist.map((addr, i) => {
        return new AMap.LngLat(Number(addr[0]), Number(addr[1]));
}),
    ori = waypoints.shift(),
        nextDes = [].concat(waypoints),
        des = waypoints.pop(),
        opt = {waypoints: waypoints},
        path = [],
        allPaths = [],
        allStartPoints = [],
        nextPathsAll = [],
        nextPaths = [],
        Marker = new AMap.Marker({
            position: arrlist[0],
            map: map
        });
    // let ori = new AMap.LngLat(...start);

    driving.search(ori, des, opt, function (status, result) {
        if (status === 'complete') {
            console.log('绘制驾车路线完成')
            console.log(result);
            // let nextDes = arrlist.slice(1);
            let nextDes = arrlist.slice(1);
            allPaths = getRoute(result);

            // 门店
            for (let i = 0; i < nextDes.length; i++) {
                let Marker = new AMap.Marker({
                    position: nextDes[i],
                    map: map
                })
            }

            let ccolor = color[carIndex];
            let passedPolylineAll = new AMap.Polyline({
                map: map,
                path: allPaths,
                strokeColor: ccolor,  //线颜色
                strokeWeight: 6,      //线宽
                strokeStyle: 'dashed',
                lineJoin: 'round'
            });
            polylineAll.push(passedPolylineAll);
            passedPolylineAll.setPath(allPaths);

            // 移动过程中的路径
            let passedPolyline = new AMap.Polyline({
                map: map,
                path: allPaths,
                strokeColor: ccolor,  //线颜色
                strokeWeight: 6,      //线宽
                lineJoin: 'round'
            });
            polylineAllpassing.push(passedPolyline);

            marker.on('moving', function (e) {
                let path = e.passedPath;
                passedPolyline.setPath(path);
            });
            // console.log('nextPathsAll:', nextPathsAll);
            marker.moveAlong(allPaths, 4000);
            map.setFitView();
        } else {
            console.log('获取驾车数据失败：' + result)
        }
    });
}

// 初始时所有车辆
function getDriveData(carIndex, arrlist, marker, driving, passed) {

    let waypoints = arrlist.map((addr, i) => {
        return new AMap.LngLat(Number(addr[0]), Number(addr[1]));
}),
    ori = waypoints.shift(),
        nextDes = [].concat(waypoints),
        des = waypoints.pop(),
        opt = {waypoints: waypoints},
        allPaths = [],
        allStartPoints = [],
        nextPathsAll = [],
        nextPaths = [],
        Marker = new AMap.Marker({
            position: arrlist[0],
            map: map
        });
    // let ori = new AMap.LngLat(...start);

    driving.search(ori, des, opt, function (status, result) {
        if (status === 'complete') {
            console.log('绘制驾车路线完成')
            console.log(result);
            // let nextDes = arrlist.slice(1);
            let nextDes = arrlist.slice(1);
            // 获得所有车辆的全程路径
            allPaths = getRoute(result);
            routes.routesEntire.push(allPaths);

            // 生成全程路径的虚线，并在地图上画出
            console.log('original carId:', carIndex, color[carIndex - 1]);
            let passedPolylineAll = new AMap.Polyline({
                map: map,
                path: allPaths,
                strokeColor: color[carIndex - 1],  //线颜色
                strokeWeight: 6,      //线宽
                strokeStyle: 'dashed',
                lineJoin: 'round'
            });
            passedPolylineAll.setPath(allPaths);
            lines.linesEntire.push([passedPolylineAll, color[carIndex - 1]]);

            // 门店
            /*
            for (let i = 0; i < nextDes.length; i++) {
                let Marker = new AMap.Marker({
                    position: nextDes[i],
                    map: map
                })
            }
             */

            // getDriveDataLocal(carIndex, driving, marker, allPaths, 0, 1, arrlist, passed);
        } else {
            console.log('获取驾车数据失败：' + result)
        }
    });

}

// 单个车辆
function getDriveDataSingle(carIndex, marker, passed) {

    let allPaths = routes.routesEntire[carIndex];

    let passedPolylineAll = lines.linesEntire[carIndex][0],
        lineColor = lines.linesEntire[carIndex][1];
    passedPolylineAll.setPath(allPaths);

    // 移动过程中的路径
    let passedPolyline = new AMap.Polyline({
        map: map,
        path: allPaths,
        strokeColor: lineColor,  //线颜色
        strokeWeight: 6,      //线宽
        lineJoin: 'round'
    });
    lines.linesCurr.push(passedPolyline);

    marker.on('moving', function (e) {
        let path = e.passedPath;
        passedPolyline.setPath(path);
    });
    marker.moveAlong(allPaths, 4000);
    map.setFitView();
}

/**
 * 1.初始地图、路径
 *
 **/
function main() {
    changeBtnStatus(true); // loading 提示
    getOriginRoute();      // 获取原始路径
}

let btnSubmit = document.getElementById('submit');
let lazyLayout = _.debounce(main, 2000, true); // 防抖
btnSubmit.addEventListener('click', lazyLayout);
