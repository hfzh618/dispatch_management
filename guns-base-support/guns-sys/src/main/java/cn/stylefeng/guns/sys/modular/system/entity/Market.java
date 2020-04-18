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


    @TableId(value = "market_id", type = IdType.ID_WORKER)
    private Long marketId;

    @TableField("market_name")
    private String marketName;

    @TableField("market_code")
    private String market_code;

    @TableField("market_type")
    private String market_type;

    @TableField("updown_endtime")
    private String updown_endtime;

    @TableField("updown_starttime")
    private String updown_starttime;

    @TableField("permit_vehicle")
    private String permit_vehicle;

    @TableField("market_tel")
    private String marketTel;

    @TableField("market_district")
    private String marketDistrict;

    @TableField("market_address")
    private String marketAddress;


    public static long getSerialVersionUID() {
        return serialVersionUID;
    }


}
