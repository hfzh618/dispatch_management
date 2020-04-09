package cn.stylefeng.guns.sys.modular.system.controller;

import cn.hutool.core.bean.BeanUtil;
import cn.stylefeng.guns.base.pojo.page.LayuiPageFactory;
import cn.stylefeng.guns.sys.core.exception.enums.BizExceptionEnum;
import cn.stylefeng.guns.sys.core.log.LogObjectHolder;
import cn.stylefeng.guns.sys.modular.system.entity.Dispatch;
import cn.stylefeng.guns.sys.modular.system.service.DispatchService;
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
@RequestMapping("/dispatch/info")
public class DispatchController extends BaseController {

    private static String PREFIX = "/modular/system/dispatch/";

    @Autowired
    private DispatchService dispatchService;

    @RequestMapping("")
    public String index(){
        return PREFIX + "info.html";
    }


    @RequestMapping("dispatch_add")
    public String dispatchAdd() {
        return PREFIX + "info_add.html";
    }

    @RequestMapping("analysis_html")
    public String analysis_html() {
        return PREFIX + "analysis.html";
    }

    @RequestMapping("analysis")
    public void analysis(@RequestParam(value = "order",required = false) String order,@RequestParam(value = "car",required = false) String car){
        System.out.println("order");
        int orderID = Integer.valueOf(order.split(",")[0]);
        int carID = Integer.valueOf(car.split(",")[0]);
        System.out.println(orderID);
        System.out.println("car");
        System.out.println(carID);
    }

    @RequestMapping("dispatch_update/{dispatchId}")
    public String dispatchUpdate(@PathVariable Long dispatchId, Model model) {
        Dispatch dispatch = this.dispatchService.getById(dispatchId);
        model.addAllAttributes(BeanUtil.beanToMap(dispatch));
        LogObjectHolder.me().set(dispatch);
        return PREFIX + "dispatch_edit.html";
    }

    @RequestMapping("list")
    //@Permission(Const.ADMIN_NAME)
    @ResponseBody
    public Object list(){
        //获取分页参数
        Page page = LayuiPageFactory.defaultPage();

        //根据条件查询日志
        List<Map<String, Object>> result = dispatchService.getDispatchs(page);
        page.setRecords(result);

        return LayuiPageFactory.createPageInfo(page);
    }

    @RequestMapping(value = "add")
    @ResponseBody
    public Object add(Dispatch dispatch) {
        if (ToolUtil.isOneEmpty(dispatch, dispatch.getDispatchId())) {
            throw new ServiceException(BizExceptionEnum.REQUEST_NULL);
        }
        this.dispatchService.saveDispatch(dispatch);
        return SUCCESS_TIP;
    }

    @RequestMapping(value = "delete")
    @ResponseBody
    public Object delete(@RequestParam Long dispatchId) {

        this.dispatchService.removeById(dispatchId);

        return SUCCESS_TIP;
    }

    @RequestMapping(value = "update")
    @ResponseBody
    public Object update(Dispatch dispatch) {
        if (ToolUtil.isOneEmpty(dispatch, dispatch.getDispatchId())) {
            throw new ServiceException(BizExceptionEnum.REQUEST_NULL);
        }
        Dispatch old = this.dispatchService.getById(dispatch.getDispatchId());
        this.dispatchService.updateById(old);
        return SUCCESS_TIP;
    }

    @RequestMapping(value = "generate")
    @ResponseBody
    public void generate() {
        this.dispatchService.generate();
    }

}
