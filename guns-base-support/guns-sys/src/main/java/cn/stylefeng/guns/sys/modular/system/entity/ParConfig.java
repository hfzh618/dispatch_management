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
@TableName("info_algo")
public class ParConfig implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "algo_id", type = IdType.ID_WORKER)
    private Long algoId;

    @TableField("algo_name")
    private String algoName;

    @TableField("algo_desc")
    private String algoDesc;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }


}
