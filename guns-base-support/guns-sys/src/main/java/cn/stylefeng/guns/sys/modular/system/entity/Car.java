package cn.stylefeng.guns.sys.modular.system.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * Created by hufangzhou on 2020/1/7.
 */
@Data
@TableName("info_car")
public class Car implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 主键
     */
    @TableId(value = "car_id", type = IdType.ID_WORKER)
    private Long carId;

    /**
     * 车牌号码
     */
    @TableField("car_num")
    private String carNum;

    /**
     * 汽车容量
     */
    @TableField("car_load")
    private Long carLoad;

    /**
     * 汽车状态
     */
    @TableField("car_status")
    private String carStatus;

    /**
     * 汽车类型
     */
    @TableField("car_type")
    private String carType;


    public static long getSerialVersionUID() {
        return serialVersionUID;
    }


}
