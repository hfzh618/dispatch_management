package cn.stylefeng.guns.sys.modular.system.controller;

import cn.stylefeng.guns.base.auth.annotion.Permission;
import cn.stylefeng.guns.base.pojo.page.LayuiPageFactory;
import cn.stylefeng.guns.sys.core.constant.Const;
import cn.stylefeng.guns.sys.modular.system.service.CarService;
import cn.stylefeng.guns.sys.modular.system.warpper.LogWrapper;
import cn.stylefeng.roses.core.base.controller.BaseController;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

/**
 * Created by hufangzhou on 2020/1/7.
 * 车辆管理的控制器
 */
@Controller
@RequestMapping("/info/car")
public class CarController extends BaseController {

    private static String PREFIX = "/modular/system/car/";

    @Autowired
    private CarService carService;

    @RequestMapping("")
    public String index(){
        return PREFIX + "car.html";
    }

    @RequestMapping("/list")
    //@Permission(Const.ADMIN_NAME)
    @ResponseBody
    public Object list(){
        //获取分页参数
        Page page = LayuiPageFactory.defaultPage();

        //根据条件查询日志
        List<Map<String, Object>> result = carService.getCars(page);
        page.setRecords(result);

        return LayuiPageFactory.createPageInfo(page);
    }

}
