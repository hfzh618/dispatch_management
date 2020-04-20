package cn.stylefeng.guns.sys.modular.system.mapper;

import cn.stylefeng.guns.sys.modular.system.entity.New_Order;
import cn.stylefeng.guns.sys.modular.system.entity.Order;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;

import java.util.Map;

/**
 * Created by hufangzhou on 2020/1/7.
 */
public interface NewOrderMapper extends BaseMapper<New_Order> {

    Page<Map<String, Object>> list(@Param("page") Page page, @Param("condition") String condition);

}
