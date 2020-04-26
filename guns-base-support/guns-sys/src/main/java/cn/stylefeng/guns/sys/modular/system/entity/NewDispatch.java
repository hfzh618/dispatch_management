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
@TableName("dispatch")
public class NewDispatch implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.ID_WORKER)
    private Long id;

//    @TableId(value = "banlie_id")
//    private Long banlie_id;
//
//    @TableId(value = "driver_id")
//    private Long driver_id;
//
//    @TableId(value = "car_id")
//    private Long car_id;
//
//    @TableField("shops_id")
//    private String shops_id;

    @TableField("dispatch_code")
    private String dispatch_code;

    @TableField("train_name")
    private String train_name;

    @TableField("driver_name")
    private String driver_name;

    @TableField("car_num")
    private String car_num;

    @TableField("shops_name")
    private String shops_name;

    @TableField("deliverydate")
    private String deliverydate;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }


}
