package cn.stylefeng.guns.sys.modular.system.service;

import cn.stylefeng.guns.sys.modular.system.entity.Market;
import cn.stylefeng.guns.sys.modular.system.mapper.MarketMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * <p>
 * 登录记录 服务实现类
 * </p>
 *
 * @author stylefeng
 * @since 2018-12-07
 */
@Service
public class MarketService extends ServiceImpl<MarketMapper, Market> {

    /**
     * 获取登录日志列表
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:53 PM
     */
    public List<Map<String, Object>> getMarkets(Page page) {
        return this.baseMapper.getMarkets(page);
    }

    public void saveMarket(Market driver){
        this.baseMapper.saveMarket(driver);
    }
}
