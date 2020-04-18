package cn.stylefeng.guns.sys.modular.system.controller;

import cn.hutool.core.bean.BeanUtil;
import cn.stylefeng.guns.base.pojo.page.LayuiPageFactory;
import cn.stylefeng.guns.sys.core.exception.enums.BizExceptionEnum;
import cn.stylefeng.guns.sys.core.log.LogObjectHolder;
import cn.stylefeng.guns.sys.modular.system.entity.Order;
import cn.stylefeng.guns.sys.modular.system.service.OrderService;
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
@RequestMapping("info/order")
public class OrderController extends BaseController {

    private static String PREFIX = "/modular/system/order/";

    @Autowired
    private OrderService orderService;

    @RequestMapping("")
    public String index(){
        return PREFIX + "order.html";
    }


    @RequestMapping("order_add")
    public String orderAdd() {
        return PREFIX + "order_add.html";
    }

    @RequestMapping("order_update/{orderId}")
    public String orderUpdate(@PathVariable Long orderId, Model model) {
        Order order = this.orderService.getById(orderId);
        model.addAllAttributes(BeanUtil.beanToMap(order));
        return PREFIX + "order_edit.html";
    }

    @RequestMapping("list")
    @ResponseBody
    public Object list(String condition){
        Page<Map<String, Object>> list = this.orderService.list(condition);
        Page<Map<String, Object>> wrap = new NoticeWrapper(list).wrap();
        return LayuiPageFactory.createPageInfo(wrap);
    }

    @RequestMapping(value = "add")
    @ResponseBody
    public Object add(Order order) {
        if (ToolUtil.isOneEmpty(order, order.getOrderId())) {
            throw new ServiceException(BizExceptionEnum.REQUEST_NULL);
        }
        this.orderService.save(order);
        return SUCCESS_TIP;
    }

    @RequestMapping(value = "delete")
    @ResponseBody
    public Object delete(@RequestParam Long orderId) {

        this.orderService.removeById(orderId);

        return SUCCESS_TIP;
    }

    @RequestMapping(value = "update")
    @ResponseBody
    public Object update(Order order) {
        if (ToolUtil.isOneEmpty(order, order.getOrderId())) {
            throw new ServiceException(BizExceptionEnum.REQUEST_NULL);
        }
        Order old = this.orderService.getById(order.getOrderId());
        old.setBoxnum(order.getBoxnum());
        old.setCarown(order.getCarown());
        old.setWeight(order.getWeight());
        old.setWave(order.getWave());
        old.setVolume(order.getVolume());
        old.setStart_time(order.getStart_time());
        old.setStart_address(order.getStart_address());
        old.setShopstate(order.getShopstate());
        old.setShopname(order.getShopname());
        old.setPackage_type(order.getPackage_type());
        old.setOrder_type(order.getOrder_type());
        old.setEnd_time(order.getEnd_time());
        old.setEnd_address(order.getEnd_address());
        old.setDrivingcarorder(order.getDrivingcarorder());
        this.orderService.updateById(old);
        return SUCCESS_TIP;
    }

}
