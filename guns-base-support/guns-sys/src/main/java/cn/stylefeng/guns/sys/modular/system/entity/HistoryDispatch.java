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
@TableName("dispatch_trace")
public class HistoryDispatch implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.ID_WORKER)
    private Long id;

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
