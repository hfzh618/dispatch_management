package cn.stylefeng.guns.sys.modular.system.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by hufangzhou on 2020/1/14.
 */
@Controller
@RequestMapping("map")
public class MonitorController {

    private static String PREFIX = "/modular/system/map/";

    @RequestMapping("/car")
    public String carIndex(){
        return PREFIX + "car.html";
    }

    @RequestMapping("/route")
    public String routeIndex(){
        return PREFIX + "route.html";
    }

    @RequestMapping("/market")
    public String marketIndex(){
        return PREFIX + "market.html";
    }

    @RequestMapping("/banlie")
    public String banlieIndex(){
        return PREFIX + "banlie.html";
    }

    @RequestMapping("/dynamic_order")
    public String dynamic_order(){
        return PREFIX + "dynamic.html";
    }
}
