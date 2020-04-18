package cn.stylefeng.guns.sys.modular.system.mapper;

import cn.stylefeng.guns.sys.modular.system.entity.Car;
import cn.stylefeng.guns.sys.modular.system.entity.Driver;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * Created by hufangzhou on 2020/1/7.
 */
public interface DriverMapper extends BaseMapper<Driver> {

    /**
     * 查询车辆信息
     * */

    Page<Map<String, Object>> list(@Param("page") Page page, @Param("condition") String condition);
}
