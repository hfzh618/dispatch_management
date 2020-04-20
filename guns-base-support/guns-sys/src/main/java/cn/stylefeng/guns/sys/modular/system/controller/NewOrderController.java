package cn.stylefeng.guns.sys.modular.system.controller;

import cn.hutool.core.bean.BeanUtil;
import cn.stylefeng.guns.base.pojo.page.LayuiPageFactory;
import cn.stylefeng.guns.sys.core.exception.enums.BizExceptionEnum;
import cn.stylefeng.guns.sys.modular.system.entity.Order;
import cn.stylefeng.guns.sys.modular.system.service.NewOrderService;
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

import java.util.Map;

/**
 * Created by hufangzhou on 2020/1/7.
 * 车辆管理的控制器
 */
@Controller
@RequestMapping("/new_order")
public class NewOrderController extends BaseController {

    private static String PREFIX = "/modular/system/new_order/";

    @Autowired
    private NewOrderService newOrderService;

    @RequestMapping("")
    public String index(){
        return PREFIX + "new_order.html";
    }

    @RequestMapping("list")
    @ResponseBody
    public Object list(String condition){
        Page<Map<String, Object>> list = this.newOrderService.list(condition);
        Page<Map<String, Object>> wrap = new NoticeWrapper(list).wrap();
        return LayuiPageFactory.createPageInfo(wrap);
    }

}
