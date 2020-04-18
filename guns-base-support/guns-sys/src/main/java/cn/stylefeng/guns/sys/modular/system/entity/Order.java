package cn.stylefeng.guns.sys.modular.system.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.sql.Struct;
import java.util.Date;

/**
 * Created by hufangzhou on 2020/1/7.
 */
@Data
@TableName("original_order_m")
public class Order implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "orderid", type = IdType.ID_WORKER)
    private int orderId;

//    @TableField("deliverydate")
//    private Date deliverydate;

    @TableField("wave")
    private String wave;

    @TableField("drivingcarorder")
    private String drivingcarorder;

    @TableField("shopid")
    private String shopid;

    @TableField("shopname")
    private String shopname;

    @TableField("carown")
    private String carown;

    @TableField("shopstate")
    private String shopstate;

    @TableField("order_type")
    private String order_type;

    @TableField("package_type")
    private String package_type;

    @TableField("boxnum")
    private int boxnum;

    @TableField("volume")
    private Double volume;

    @TableField("weight")
    private Double weight;

    @TableField("start_address")
    private String start_address;

    @TableField("end_address")
    private String end_address;

    @TableField("start_time")
    private String start_time;

    @TableField("end_time")
    private String end_time;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }


}
