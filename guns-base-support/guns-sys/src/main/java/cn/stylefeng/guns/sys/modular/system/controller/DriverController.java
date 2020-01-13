package cn.stylefeng.guns.sys.modular.system.controller;

import cn.hutool.core.bean.BeanUtil;
import cn.stylefeng.guns.base.pojo.page.LayuiPageFactory;
import cn.stylefeng.guns.sys.core.exception.enums.BizExceptionEnum;
import cn.stylefeng.guns.sys.core.log.LogObjectHolder;
import cn.stylefeng.guns.sys.modular.system.entity.Driver;
import cn.stylefeng.guns.sys.modular.system.entity.Driver;
import cn.stylefeng.guns.sys.modular.system.service.DriverService;
import cn.stylefeng.guns.sys.modular.system.service.DriverService;
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
@RequestMapping("info/driver")
public class DriverController extends BaseController {

    private static String PREFIX = "/modular/system/driver/";

    @Autowired
    private DriverService driverService;

    @RequestMapping("")
    public String index(){
        return PREFIX + "driver.html";
    }


    @RequestMapping("driver_add")
    public String Add() {
        return PREFIX + "driver_add.html";
    }

    @RequestMapping("driver_update/{driverId}")
    public String driverUpdate(@PathVariable Long driverId, Model model) {
        Driver driver = this.driverService.getById(driverId);
        model.addAllAttributes(BeanUtil.beanToMap(driver));
        LogObjectHolder.me().set(driver);
        return PREFIX + "driver_edit.html";
    }

    @RequestMapping("list")
    //@Permission(Const.ADMIN_NAME)
    @ResponseBody
    public Object list(){
        //获取分页参数
        Page page = LayuiPageFactory.defaultPage();

        //根据条件查询日志
        List<Map<String, Object>> result = driverService.getDrivers(page);
        page.setRecords(result);

        return LayuiPageFactory.createPageInfo(page);
    }

    @RequestMapping(value = "add")
    @ResponseBody
    public Object add(Driver driver) {
        if (ToolUtil.isOneEmpty(driver, driver.getDriverName())) {
            throw new ServiceException(BizExceptionEnum.REQUEST_NULL);
        }
        this.driverService.saveDriver(driver);
        return SUCCESS_TIP;
    }

    @RequestMapping(value = "delete")
    @ResponseBody
    public Object delete(@RequestParam Long driverId) {

        this.driverService.removeById(driverId);

        return SUCCESS_TIP;
    }

    @RequestMapping(value = "update")
    @ResponseBody
    public Object update(Driver driver) {
        if (ToolUtil.isOneEmpty(driver, driver.getDriverId())) {
            throw new ServiceException(BizExceptionEnum.REQUEST_NULL);
        }
        Driver old = this.driverService.getById(driver.getDriverId());
        old.setDriverName(driver.getDriverName());
        old.setDriverTel(driver.getDriverTel());
        old.setDriverType(driver.getDriverType());
        old.setDriverStatus(driver.getDriverStatus());
        this.driverService.updateById(old);
        return SUCCESS_TIP;
    }

}
