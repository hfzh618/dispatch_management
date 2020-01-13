package cn.stylefeng.guns.sys.modular.system.controller;

import cn.hutool.core.bean.BeanUtil;
import cn.stylefeng.guns.base.pojo.page.LayuiPageFactory;
import cn.stylefeng.guns.sys.core.exception.enums.BizExceptionEnum;
import cn.stylefeng.guns.sys.core.log.LogObjectHolder;
import cn.stylefeng.guns.sys.modular.system.entity.Warehouse;
import cn.stylefeng.guns.sys.modular.system.service.WarehouseService;
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
@RequestMapping("info/warehouse")
public class WarehouseController extends BaseController {

    private static String PREFIX = "/modular/system/warehouse/";

    @Autowired
    private WarehouseService warehouseService;

    @RequestMapping("")
    public String index(){
        return PREFIX + "warehouse.html";
    }


    @RequestMapping("warehouse_add")
    public String Add() {
        return PREFIX + "warehouse_add.html";
    }

    @RequestMapping("warehouse_update/{warehouseId}")
    public String warehouseUpdate(@PathVariable Long warehouseId, Model model) {
        Warehouse warehouse = this.warehouseService.getById(warehouseId);
        model.addAllAttributes(BeanUtil.beanToMap(warehouse));
        LogObjectHolder.me().set(warehouse);
        return PREFIX + "warehouse_edit.html";
    }

    @RequestMapping("list")
    //@Permission(Const.ADMIN_NAME)
    @ResponseBody
    public Object list(){
        //获取分页参数
        Page page = LayuiPageFactory.defaultPage();

        //根据条件查询日志
        List<Map<String, Object>> result = warehouseService.getWarehouses(page);
        page.setRecords(result);

        return LayuiPageFactory.createPageInfo(page);
    }

    @RequestMapping(value = "add")
    @ResponseBody
    public Object add(Warehouse warehouse) {
        if (ToolUtil.isOneEmpty(warehouse, warehouse.getWarehouseName())) {
            throw new ServiceException(BizExceptionEnum.REQUEST_NULL);
        }
        this.warehouseService.saveWarehouse(warehouse);
        return SUCCESS_TIP;
    }

    @RequestMapping(value = "delete")
    @ResponseBody
    public Object delete(@RequestParam Long warehouseId) {

        this.warehouseService.removeById(warehouseId);

        return SUCCESS_TIP;
    }

    @RequestMapping(value = "update")
    @ResponseBody
    public Object update(Warehouse warehouse) {
        if (ToolUtil.isOneEmpty(warehouse, warehouse.getWarehouseId())) {
            throw new ServiceException(BizExceptionEnum.REQUEST_NULL);
        }
        Warehouse old = this.warehouseService.getById(warehouse.getWarehouseId());
        old.setWarehouseName(warehouse.getWarehouseName());
        old.setWarehouseType(warehouse.getWarehouseType());
        old.setWarehouseArea(warehouse.getWarehouseArea());
        old.setWarehouseLocation(warehouse.getWarehouseLocation());
        old.setWarehouseDistrict(warehouse.getWarehouseDistrict());
        this.warehouseService.updateById(old);
        return SUCCESS_TIP;
    }

}
