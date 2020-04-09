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
@TableName("info_order")
public class Order implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 主键
     */
    @TableId(value = "order_id", type = IdType.ID_WORKER)
    private int orderId;

    /**
     * 车牌号码
     */
    @TableField("order_num")
    private int orderNum;

    /**
     * 汽车容量
     */
    @TableField("order_product")
    private String orderProduct;

    /**
     * 汽车状态
     */
    @TableField("order_shop")
    private String orderShop;

    /**
     * 汽车类型
     */
    @TableField("order_time")
    private String orderTime;


    public static long getSerialVersionUID() {
        return serialVersionUID;
    }


}
