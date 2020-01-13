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
@TableName("info_market")
public class Market implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 主键
     */
    @TableId(value = "market_id", type = IdType.ID_WORKER)
    private Long marketId;

    /**
     * 车牌号码
     */
    @TableField("market_name")
    private String marketName;

    @TableField("market_tel")
    private String marketTel;

    /**
     * 汽车容量
     */
    @TableField("market_district")
    private String marketDistrict;


    @TableField("market_address")
    private String marketAddress;



    public static long getSerialVersionUID() {
        return serialVersionUID;
    }


}
