package cn.stylefeng.guns.sys.modular.system.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * Created by hufangzhou on 2020/1/7.
 */
@Data
@TableName("info_vehicletrace")
public class Trace implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 主键
     */
    @TableId(value = "vehicletraceid", type = IdType.ID_WORKER)
    private int vehicletraceid;

    /**
     * 车牌号码
     */
    @TableField("trainid")
    private int trainid;

    /**
     * 汽车容量
     */
    @TableField("vehicleid")
    private int vehicleid;

    @TableField("car_num")
    private String car_num;

    @TableField("dispatchid")
    private int dispatchid;

    @TableField("last_shop")
    private int last_shop;

    @TableField("next_shops")
    private String next_shops;

    @TableField("next_orders")
    private String next_orders;


    /**
     * 汽车状态
     */
    @TableField("time")
    private Date time;

    /**
     * 汽车类型
     */
    @TableField("cur_load")
    private Float cur_load;

    /**
     * 汽车类型
     */
    @TableField("cur_volume")
    private Float cur_volume;


    public static long getSerialVersionUID() {
        return serialVersionUID;
    }


}
