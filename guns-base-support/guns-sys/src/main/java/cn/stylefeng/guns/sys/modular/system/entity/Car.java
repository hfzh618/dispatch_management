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

    @TableId(value = "car_id", type = IdType.ID_WORKER)
    private Long carId;

    @TableField("car_num")
    private String carNum;

    @TableField("car_load")
    private Long carLoad;

    @TableField("car_status")
    private String carStatus;

    @TableField("car_type")
    private String carType;

    @TableField("carrier_code")
    private String carrier_code;

    @TableField("carrier_name")
    private String carrier_name;

    @TableField("avaliable_num")
    private int avaliable_num;

    @TableField("rated_load")
    private String rated_load;

    @TableField("rated_volume")
    private Double rated_volume;

    @TableField("car_speed")
    private Double car_speed;

    @TableField("volume")
    private String volume;

    @TableField("permit_type")
    private String permit_type;

    @TableField("start_cost")
    private Double start_cost;

    @TableField("park_cost")
    private Double park_cost;

    @TableField("perkm_cost")
    private Double perkm_cost;







    public static long getSerialVersionUID() {
        return serialVersionUID;
    }


}
