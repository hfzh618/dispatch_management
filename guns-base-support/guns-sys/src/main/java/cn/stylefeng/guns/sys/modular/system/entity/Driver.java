package cn.stylefeng.guns.sys.modular.system.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;

/**
 * Created by hufangzhou on 2020/1/7.
 */
@Data
@TableName("info_driver")
public class Driver implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 主键
     */
    @TableId(value = "driver_id", type = IdType.ID_WORKER)
    private Long driverId;

    /**
     * 车牌号码
     */
    @TableField("driver_name")
    private String driverName;

    /**
     * 汽车容量
     */
    @TableField("driver_tel")
    private String driverTel;

    /**
     * 汽车状态
     */
    @TableField("driver_status")
    private String driverStatus;

    /**
     * 汽车类型
     */
    @TableField("driver_type")
    private String driverType;


    public static long getSerialVersionUID() {
        return serialVersionUID;
    }


}
