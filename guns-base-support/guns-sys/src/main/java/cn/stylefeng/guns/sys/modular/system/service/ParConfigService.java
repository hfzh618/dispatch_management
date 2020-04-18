package cn.stylefeng.guns.sys.modular.system.service;

import cn.stylefeng.guns.base.pojo.page.LayuiPageFactory;
import cn.stylefeng.guns.sys.modular.system.entity.*;
import cn.stylefeng.guns.sys.modular.system.mapper.CarMapper;
import cn.stylefeng.guns.sys.modular.system.mapper.ParConfigMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

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
public class ParConfigService extends ServiceImpl<ParConfigMapper, ParConfig> {

    /**
     * 获取登录日志列表
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:53 PM
     */
    public Page<Map<String, Object>> list(String condition) {
        Page page = LayuiPageFactory.defaultPage();
        return this.baseMapper.list(page, condition);
    }

    public Algo1 getAlgo1(){
        return this.baseMapper.getAlgo1();
    }

    public Algo2 getAlgo2(){
        return this.baseMapper.getAlgo2();
    }

    public Algo3 getAlgo3(){
        return this.baseMapper.getAlgo3();
    }
}
