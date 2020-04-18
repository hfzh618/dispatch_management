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
@TableName("dynamic_train_conf")
public class Algo1 implements Serializable {

    private static final long serialVersionUID = 1L;


    @TableField("cross_rate")
    private double cross_rate;

    @TableField("variation_rate")
    private double variation_rate;

    @TableField("swap_count")
    private int swap_count;

    @TableField("climb_epoch")
    private int climb_epoch;

    @TableField("rank_count")
    private int rank_count;

    @TableField("epoch")
    private int epoch;

    @TableField("penalty")
    private double penalty;

    @TableField("load_rate")
    private double load_rate;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }


}
