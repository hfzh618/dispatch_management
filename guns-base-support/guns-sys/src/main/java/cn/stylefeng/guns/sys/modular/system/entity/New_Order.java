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
@TableName("new_orders")
public class New_Order implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "uid", type = IdType.ID_WORKER)
    private int uid;

    @TableField("weight")
    private double weight;

    @TableField("volume")
    private double volume;

    @TableField("state")
    private int state;

    @TableField("upsiteid")
    private int upsiteid;

    @TableField("downsiteid")
    private int downsiteid;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }


}
