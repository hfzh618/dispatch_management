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
    private Long dispatchId;

    /**
     * 车牌号码
     */
    @TableField("dispatch_order_id")
    private Long dispatchOrderId;

    /**
     * 汽车容量
     */
    @TableField("dispatch_driver")
    private String dispatchDriver;

    @TableField("dispatch_warehuose")
    private String dispatchWarehouse;


    /**
     * 汽车状态
     */
    @TableField("dispatch_shop")
    private String dispatchShop;

    /**
     * 汽车类型
     */
    @TableField("dispatch_type")
    private String dispatchTime;


    public static long getSerialVersionUID() {
        return serialVersionUID;
    }


}
