package cn.stylefeng.guns.sys.modular.system.controller;

import cn.hutool.core.bean.BeanUtil;
import cn.stylefeng.guns.base.pojo.page.LayuiPageFactory;
import cn.stylefeng.guns.sys.core.exception.enums.BizExceptionEnum;
import cn.stylefeng.guns.sys.core.log.LogObjectHolder;
import cn.stylefeng.guns.sys.modular.system.entity.Train;
import cn.stylefeng.guns.sys.modular.system.service.TrainService;
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

import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * Created by hufangzhou on 2020/1/7.
 * 车辆管理的控制器
 */
@Controller
@RequestMapping("info/train")
public class TrainController extends BaseController {

    private static String PREFIX = "/modular/system/train/";

    @Autowired
    private TrainService trainService;

    @RequestMapping("")
    public String index(){
        return PREFIX + "train.html";
    }


    @RequestMapping("train_add")
    public String trainAdd() {
        return PREFIX + "train_add2.html";
    }

    @RequestMapping("train_update/{trainId}")
    public String trainUpdate(@PathVariable Long trainId, Model model) {
        Train train = this.trainService.getById(trainId);
        model.addAllAttributes(BeanUtil.beanToMap(train));
        return PREFIX + "train_edit2.html";
    }

    @RequestMapping("list")
    @ResponseBody
    public Object list(String condition){
        Page<Map<String, Object>> list = this.trainService.list(condition);
        Page<Map<String, Object>> wrap = new NoticeWrapper(list).wrap();
        return LayuiPageFactory.createPageInfo(wrap);
    }

    @RequestMapping(value = "add")
    @ResponseBody
    public Object add(Train train) {
        System.out.println(train);
        String original = train.getTrainStops();
        original  = original.replaceAll("& #40;","(");
        original  = original.replaceAll("& #41;",")");
        train.setTrainStops(original);
        if (ToolUtil.isOneEmpty(train, train.getTrainName())) {
            throw new ServiceException(BizExceptionEnum.REQUEST_NULL);
        }
        this.trainService.save(train);
        return SUCCESS_TIP;
    }

    @RequestMapping(value = "delete")
    @ResponseBody
    public Object delete(@RequestParam Long trainId) {

        this.trainService.removeById(trainId);

        return SUCCESS_TIP;
    }

    @RequestMapping(value = "update")
    @ResponseBody
    public Object update(Train train) {
        String original = train.getTrainStops();
        original  = original.replaceAll("& #40;","(");
        original  = original.replaceAll("& #41;",")");
        train.setTrainStops(original);
        if (ToolUtil.isOneEmpty(train, train.getTrainId())) {
            throw new ServiceException(BizExceptionEnum.REQUEST_NULL);
        }
        Train old = this.trainService.getById(train.getTrainId());
        old.setTrainStatus(train.getTrainStatus());
        old.setTrainType(train.getTrainType());
        old.setTrainName(train.getTrainName());
        old.setTrainStops(train.getTrainStops());
        old.setShops_id(train.getShops_id());
        this.trainService.updateById(old);
        return SUCCESS_TIP;
    }

    @RequestMapping(value = "generate")
    @ResponseBody
    public Object generate() throws IOException {
        System.out.println("/info/train/generate is used");
//        this.trainService.generate();
        return list("");
    }

//    @RequestMapping(value = "banlieData")
//    @ResponseBody
//    public Object banlieData(){
//
//    }

}
