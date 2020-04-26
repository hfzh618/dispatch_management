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
@TableName("dynamic_conf")
public class AlgoConf implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.ID_WORKER)
    private Long id;

    @TableField("per_load")
    private double per_load;

    @TableField("per_volume")
    private double per_volume;

    @TableField("open_doors")
    private int open_doors;

    @TableField("u")
    private double u;

    @TableField("not_pick_cond")
    private double not_pick_cond;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }


}
