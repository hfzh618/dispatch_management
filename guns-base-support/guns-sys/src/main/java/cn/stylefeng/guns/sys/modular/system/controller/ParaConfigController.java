package cn.stylefeng.guns.sys.modular.system.controller;

import cn.hutool.core.bean.BeanUtil;
import cn.stylefeng.guns.base.pojo.page.LayuiPageFactory;
import cn.stylefeng.guns.sys.core.exception.enums.BizExceptionEnum;
import cn.stylefeng.guns.sys.modular.system.entity.Algo1;
import cn.stylefeng.guns.sys.modular.system.entity.Algo2;
import cn.stylefeng.guns.sys.modular.system.entity.Algo3;
import cn.stylefeng.guns.sys.modular.system.entity.Car;
import cn.stylefeng.guns.sys.modular.system.service.CarService;
import cn.stylefeng.guns.sys.modular.system.service.ParConfigService;
import cn.stylefeng.guns.sys.modular.system.warpper.NoticeWrapper;
import cn.stylefeng.roses.core.base.controller.BaseController;
import cn.stylefeng.roses.core.util.ToolUtil;
import cn.stylefeng.roses.kernel.model.exception.ServiceException;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

/**
 * Created by hufangzhou on 2020/1/7.
 * 车辆管理的控制器
 */
@Controller
@RequestMapping("/par_config")
public class ParaConfigController extends BaseController {

    private static String PREFIX = "/modular/system/par_config/";

    @Autowired
    private ParConfigService parConfigService;

    @RequestMapping("")
    public String index(){
        return PREFIX + "par_config.html";
    }


    @RequestMapping("update/{algo_id}")
    public String carUpdate(@PathVariable Long algo_id, Model model) {
        if (algo_id==1){
//            Algo1 algo1 = this.parConfigService.getAlgo1();
//            model.addAllAttributes(BeanUtil.beanToMap(algo1));
            return PREFIX + "algo1_edit.html";
        }else if (algo_id ==2){
//            Algo2 algo2 = this.parConfigService.getAlgo2();
//            model.addAllAttributes(BeanUtil.beanToMap(algo2));
            return PREFIX + "algo2_edit.html";
        }else if (algo_id==3){
//            Algo3 algo3 = this.parConfigService.getAlgo3();
//            model.addAllAttributes(BeanUtil.beanToMap(algo3));
            return PREFIX + "algo3_edit.html";
        }
        return PREFIX + "par_config.html";
    }

    @RequestMapping("list")
    @ResponseBody
    public Object list(String condition){
        Page<Map<String, Object>> list = this.parConfigService.list(condition);
        Page<Map<String, Object>> wrap = new NoticeWrapper(list).wrap();
        return LayuiPageFactory.createPageInfo(wrap);
    }

//    @RequestMapping(value = "add")
//    @ResponseBody
//    public Object add(Car car) {
//        if (ToolUtil.isOneEmpty(car, car.getCarNum())) {
//            throw new ServiceException(BizExceptionEnum.REQUEST_NULL);
//        }
//        this.carService.save(car);
//        return SUCCESS_TIP;
//    }
//
//    @RequestMapping(value = "delete")
//    @ResponseBody
//    public Object delete(@RequestParam Long carId) {
//
//        this.carService.removeById(carId);
//
//        return SUCCESS_TIP;
//    }
//
//    @RequestMapping(value = "update")
//    @ResponseBody
//    public Object update(Car car) {
//        if (ToolUtil.isOneEmpty(car, car.getCarId())) {
//            throw new ServiceException(BizExceptionEnum.REQUEST_NULL);
//        }
//        Car old = this.carService.getById(car.getCarId());
//        old.setCarNum(car.getCarNum());
//        old.setCarStatus(car.getCarStatus());
//        old.setCarType(car.getCarType());
//        old.setAvaliable_num(car.getAvaliable_num());
//        old.setCar_speed(car.getCar_speed());
//        old.setVolume(car.getVolume());
//        old.setStart_cost(car.getStart_cost());
//        old.setRated_volume(car.getRated_volume());
//        old.setRated_load(car.getRated_load());
//        old.setPermit_type(car.getPermit_type());
//        old.setPerkm_cost(car.getPerkm_cost());
//        old.setPark_cost(car.getPark_cost());
//        old.setCarrier_name(car.getCarrier_name());
//        old.setCarrier_code(car.getCarrier_code());
//        this.carService.updateById(old);
//        return SUCCESS_TIP;
//    }

}
