package cn.stylefeng.guns.sys.modular.system.controller;

import cn.stylefeng.guns.sys.modular.system.service.CarService;
import cn.stylefeng.roses.core.base.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by hufangzhou on 2020/1/7.
 * 车辆管理的控制器
 */
@Controller
@RequestMapping("/bigscreen2")
public class BigScreenController2 extends BaseController {

    private static String PREFIX = "/modular/system/screen/";

    @RequestMapping("")
    public String index(){
        return PREFIX + "console2.html";
    }

}
