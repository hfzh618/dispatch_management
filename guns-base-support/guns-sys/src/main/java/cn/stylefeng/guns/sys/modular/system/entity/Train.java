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
@TableName("info_train")
public class Train implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 主键
     */
    @TableId(value = "train_id", type = IdType.ID_WORKER)
    private Long trainId;

    /**
     * 车牌号码
     */
    @TableField("train_name")
    private String trainName;

    @TableField("train_stops")
    private String trainStops;



    /**
     * 汽车状态
     */
    @TableField("train_status")
    private String trainStatus;

    /**
     * 汽车类型
     */
    @TableField("train_type")
    private String trainType;


    public static long getSerialVersionUID() {
        return serialVersionUID;
    }


}
