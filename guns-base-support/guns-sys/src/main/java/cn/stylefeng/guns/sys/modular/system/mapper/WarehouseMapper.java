package cn.stylefeng.guns.sys.modular.system.mapper;

import cn.stylefeng.guns.sys.modular.system.entity.Driver;
import cn.stylefeng.guns.sys.modular.system.entity.Warehouse;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * Created by hufangzhou on 2020/1/7.
 */
public interface WarehouseMapper extends BaseMapper<Warehouse> {

    /**
     * 查询车辆信息
     * */

    List<Map<String,Object>> getWarehouses(@Param("page") Page page);

    void saveWarehouse(Warehouse warehouse);
}
