package cn.stylefeng.guns.sys.modular.system.controller;

import cn.hutool.core.bean.BeanUtil;
import cn.stylefeng.guns.base.pojo.page.LayuiPageFactory;
import cn.stylefeng.guns.sys.core.exception.enums.BizExceptionEnum;
import cn.stylefeng.guns.sys.core.log.LogObjectHolder;
import cn.stylefeng.guns.sys.modular.system.entity.Trace;
import cn.stylefeng.guns.sys.modular.system.service.TraceService;
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
@RequestMapping("dispatch/trace")
public class TraceController extends BaseController {

    private static String PREFIX = "/modular/system/dispatch/";

    @Autowired
    private TraceService traceService;

    @RequestMapping("")
    public String index(){
        return PREFIX + "trace.html";
    }


    @RequestMapping("trace_add")
    public String traceAdd() {
        return PREFIX + "trace_add.html";
    }

    @RequestMapping("trace_update/{vehicletraceid}")
    public String traceUpdate(@PathVariable Long vehicletraceid, Model model) {
        Trace trace = this.traceService.getById(vehicletraceid);
        model.addAllAttributes(BeanUtil.beanToMap(trace));
        return PREFIX + "trace_edit.html";
    }

    @RequestMapping("list")
    @ResponseBody
    public Object list(String condition){
        Page<Map<String, Object>> list = this.traceService.list(condition);
        Page<Map<String, Object>> wrap = new NoticeWrapper(list).wrap();
        return LayuiPageFactory.createPageInfo(wrap);
    }

    @RequestMapping(value = "add")
    @ResponseBody
    public Object add(Trace trace) {
        if (ToolUtil.isOneEmpty(trace)) {
            throw new ServiceException(BizExceptionEnum.REQUEST_NULL);
        }
        this.traceService.save(trace);
        return SUCCESS_TIP;
    }

    @RequestMapping(value = "delete")
    @ResponseBody
    public Object delete(@RequestParam Long vehicletraceid) {

        this.traceService.removeById(vehicletraceid);

        return SUCCESS_TIP;
    }

    //跳转到展示仪表盘的界面
    @RequestMapping("show/{vehicleid}")
    public String show(@PathVariable Long vehicleid, Model model) {
        System.out.println("vehicleid:"+vehicleid);
        model.addAttribute("vehicleid",vehicleid);
        return PREFIX + "yibiaopan.html";
    }




    @RequestMapping(value = "update")
    @ResponseBody
    public Object update(Trace trace) {
        if (ToolUtil.isOneEmpty(trace, trace.getVehicletraceid())) {
            throw new ServiceException(BizExceptionEnum.REQUEST_NULL);
        }
        Trace old = this.traceService.getById(trace.getVehicletraceid());
        old.setCur_load(trace.getCur_load());
        old.setVehicleid(trace.getVehicleid());
        old.setTrainid(trace.getTrainid());
        old.setTime(trace.getTime());
        old.setNext_shops(trace.getNext_shops());
        old.setNext_orders(trace.getNext_orders());
        old.setLast_shop(trace.getLast_shop());
        old.setCur_volume(trace.getCur_volume());
        this.traceService.updateById(old);
        return SUCCESS_TIP;
    }

}
