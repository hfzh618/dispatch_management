package cn.stylefeng.guns.sys.modular.system.controller;

import cn.hutool.core.bean.BeanUtil;
import cn.stylefeng.guns.base.pojo.page.LayuiPageFactory;
import cn.stylefeng.guns.sys.core.exception.enums.BizExceptionEnum;
import cn.stylefeng.guns.sys.core.log.LogObjectHolder;
import cn.stylefeng.guns.sys.modular.system.entity.Market;
import cn.stylefeng.guns.sys.modular.system.service.MarketService;
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
@RequestMapping("info/market")
public class MarketController extends BaseController {

    private static String PREFIX = "/modular/system/market/";

    @Autowired
    private MarketService marketService;

    @RequestMapping("")
    public String index(){
        return PREFIX + "market.html";
    }


    @RequestMapping("market_add")
    public String Add() {
        return PREFIX + "market_add.html";
    }

    @RequestMapping("market_update/{marketId}")
    public String marketUpdate(@PathVariable Long marketId, Model model) {
        Market market = this.marketService.getById(marketId);
        model.addAllAttributes(BeanUtil.beanToMap(market));
        LogObjectHolder.me().set(market);
        return PREFIX + "market_edit.html";
    }

    @RequestMapping("list")
    //@Permission(Const.ADMIN_NAME)
    @ResponseBody
    public Object list(){
        //获取分页参数
        Page page = LayuiPageFactory.defaultPage();

        //根据条件查询日志
        List<Map<String, Object>> result = marketService.getMarkets(page);
        page.setRecords(result);

        return LayuiPageFactory.createPageInfo(page);
    }

    @RequestMapping(value = "add")
    @ResponseBody
    public Object add(Market market) {
        if (ToolUtil.isOneEmpty(market, market.getMarketName())) {
            throw new ServiceException(BizExceptionEnum.REQUEST_NULL);
        }
        this.marketService.saveMarket(market);
        return SUCCESS_TIP;
    }

    @RequestMapping(value = "delete")
    @ResponseBody
    public Object delete(@RequestParam Long marketId) {

        this.marketService.removeById(marketId);

        return SUCCESS_TIP;
    }

    @RequestMapping(value = "update")
    @ResponseBody
    public Object update(Market market) {
        if (ToolUtil.isOneEmpty(market, market.getMarketId())) {
            throw new ServiceException(BizExceptionEnum.REQUEST_NULL);
        }
        Market old = this.marketService.getById(market.getMarketId());
        old.setMarketName(market.getMarketName());
        old.setMarketTel(market.getMarketTel());
        old.setMarketAddress(market.getMarketAddress());
        old.setMarketDistrict(market.getMarketDistrict());
        this.marketService.updateById(old);
        return SUCCESS_TIP;
    }

}
