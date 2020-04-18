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
@TableName("info_dispatch")
public class Dispatch implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 主键
     */
    @TableId(value = "dispatch_id", type = IdType.ID_WORKER)
    private Long dispatch_id;

    /**
     * 车牌号码
     */
    @TableField("dispatch_order_id")
    private Long dispatch_order_id;

    /**
     * 汽车容量
     */
    @TableField("dispatch_driver_id")
    private String dispatch_driver_id;

    @TableField("dispatch_warehouse_id")
    private String dispatch_warehouse_id;


    /**
     * 汽车状态
     */
    @TableField("dispatch_shop_id")
    private int dispatch_shop_id;


    @TableField("dispatch_shop_type")
    private String dispatch_shop_type;

    /**
     * 汽车类型
     */
    @TableField("dispatch_time")
    private String dispatch_time;


    public static long getSerialVersionUID() {
        return serialVersionUID;
    }


}
