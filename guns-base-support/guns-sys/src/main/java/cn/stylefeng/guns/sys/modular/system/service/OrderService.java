package cn.stylefeng.guns.sys.modular.system.service;

import cn.stylefeng.guns.sys.modular.system.entity.Order;
import cn.stylefeng.guns.sys.modular.system.mapper.OrderMapper;
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
public class OrderService extends ServiceImpl<OrderMapper, Order> {

    /**
     * 获取登录日志列表
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:53 PM
     */
    public List<Map<String, Object>> getOrders(Page page) {
        return this.baseMapper.getOrders(page);
    }

    public void saveOrder(Order order){
        this.baseMapper.saveOrder(order);
    }
}
