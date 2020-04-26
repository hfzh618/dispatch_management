package cn.stylefeng.guns.sys.modular.system.mapper;

import cn.stylefeng.guns.sys.modular.system.entity.*;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;

import java.util.Map;

/**
 * Created by hufangzhou on 2020/1/7.
 */
public interface ParConfigMapper2 extends BaseMapper<AlgoConf> {


    Page<Map<String, Object>> list(@Param("page") Page page, @Param("condition") String condition);

    Algo1 getAlgo1();
    Algo2 getAlgo2();
    Algo3 getAlgo3();

}
