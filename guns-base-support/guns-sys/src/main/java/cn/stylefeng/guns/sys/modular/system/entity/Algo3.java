package cn.stylefeng.guns.sys.modular.system.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;

/**
 * Created by hufangzhou on 2020/1/7.
 */
@Data
@TableName("dynamic_pick_conf")
public class Algo3 implements Serializable {

    private static final long serialVersionUID = 1L;


    @TableField("v")
    private double v;

    @TableField("per_load")
    private double per_load;

    @TableField("per_volume")
    private double per_volume;

    @TableField("u")
    private double u;

    @TableField("p")
    private double p;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }


}
