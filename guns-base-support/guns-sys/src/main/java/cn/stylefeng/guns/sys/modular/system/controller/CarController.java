package cn.stylefeng.guns.sys.modular.system.controller;

import cn.hutool.core.bean.BeanUtil;
import cn.stylefeng.guns.base.pojo.page.LayuiPageFactory;
import cn.stylefeng.guns.sys.core.exception.enums.BizExceptionEnum;
import cn.stylefeng.guns.sys.core.log.LogObjectHolder;
import cn.stylefeng.guns.sys.modular.system.entity.Car;
import cn.stylefeng.guns.sys.modular.system.service.CarService;
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

import java.util.List;
import java.util.Map;

/**
 * Created by hufangzhou on 2020/1/7.
 * 车辆管理的控制器
 */
@Controller
@RequestMapping("info/car")
public class CarController extends BaseController {

    private static String PREFIX = "/modular/system/car/";

    @Autowired
    private CarService carService;

    @RequestMapping("")
    public String index(){
        return PREFIX + "car2.html";
    }


    @RequestMapping("car_add")
    public String carAdd() {
        return PREFIX + "car_add.html";
    }

    @RequestMapping("car_update/{carId}")
    public String carUpdate(@PathVariable Long carId, Model model) {
        Car car = this.carService.getById(carId);
        model.addAllAttributes(BeanUtil.beanToMap(car));
        return PREFIX + "car_edit.html";
    }

    @RequestMapping("list")
    @ResponseBody
    public Object list(String condition){
        Page<Map<String, Object>> list = this.carService.list(condition);
        Page<Map<String, Object>> wrap = new NoticeWrapper(list).wrap();
        return LayuiPageFactory.createPageInfo(wrap);
    }

    @RequestMapping(value = "add")
    @ResponseBody
    public Object add(Car car) {
        if (ToolUtil.isOneEmpty(car, car.getCarNum())) {
            throw new ServiceException(BizExceptionEnum.REQUEST_NULL);
        }
        this.carService.save(car);
        return SUCCESS_TIP;
    }

    @RequestMapping(value = "delete")
    @ResponseBody
    public Object delete(@RequestParam Long carId) {

        this.carService.removeById(carId);

        return SUCCESS_TIP;
    }

    @RequestMapping(value = "update")
    @ResponseBody
    public Object update(Car car) {
        if (ToolUtil.isOneEmpty(car, car.getCarId())) {
            throw new ServiceException(BizExceptionEnum.REQUEST_NULL);
        }
        Car old = this.carService.getById(car.getCarId());
        old.setCarNum(car.getCarNum());
        old.setCarStatus(car.getCarStatus());
        old.setCarType(car.getCarType());
        old.setCar_speed(car.getCar_speed());
        old.setVolume(car.getVolume());
        old.setStart_cost(car.getStart_cost());
        old.setRated_volume(car.getRated_volume());
        old.setRated_load(car.getRated_load());
        old.setPermit_type(car.getPermit_type());
        old.setPerkm_cost(car.getPerkm_cost());
        old.setPark_cost(car.getPark_cost());
        old.setCarrier_name(car.getCarrier_name());
        old.setCarrier_code(car.getCarrier_code());
        this.carService.updateById(old);
        return SUCCESS_TIP;
    }

}
