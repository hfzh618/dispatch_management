package cn.stylefeng.guns.sys.modular.system.controller;

import cn.hutool.core.bean.BeanUtil;
import cn.stylefeng.guns.base.pojo.page.LayuiPageFactory;
import cn.stylefeng.guns.sys.core.exception.enums.BizExceptionEnum;
import cn.stylefeng.guns.sys.modular.system.entity.*;
import cn.stylefeng.guns.sys.modular.system.service.*;
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

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
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

    @Autowired
    private ParConfigService2 parConfigService2;

    @RequestMapping("")
    public String index(){
        return PREFIX + "par_config.html";
    }


    @RequestMapping(value = "/update2_html/{id}")
    public String update2(@PathVariable Long id, Model model) {
        AlgoConf old = parConfigService2.getById(id);
        model.addAllAttributes(BeanUtil.beanToMap(old));
        return PREFIX + "par_config_edit.html";
    }


    @RequestMapping("list")
    @ResponseBody
    public Object list(String condition){
        Page<Map<String, Object>> list = this.parConfigService.list(condition);
        Page<Map<String, Object>> wrap = new NoticeWrapper(list).wrap();
        return LayuiPageFactory.createPageInfo(wrap);
    }

    @RequestMapping("list2")
    @ResponseBody
    public Object list2(String condition){
        Page<Map<String, Object>> list = this.parConfigService2.list(condition);
        Page<Map<String, Object>> wrap = new NoticeWrapper(list).wrap();
        return LayuiPageFactory.createPageInfo(wrap);
    }


    @RequestMapping(value = "/updatenew")
    @ResponseBody
    public Object update(AlgoConf algoConf) {
        AlgoConf old = parConfigService2.getById(algoConf.getId());
        old.setNot_pick_cond(algoConf.getNot_pick_cond());
        old.setOpen_doors(algoConf.getOpen_doors());
        old.setPer_load(algoConf.getPer_load());
        old.setPer_volume(algoConf.getPer_volume());
        parConfigService2.updateById(old);
        return SUCCESS_TIP;
    }
}
