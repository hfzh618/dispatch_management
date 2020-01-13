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
@TableName("info_warehouse")
public class Warehouse implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 主键
     */
    @TableId(value = "warehouse_id", type = IdType.ID_WORKER)
    private Long warehouseId;

    /**
     * 车牌号码
     */
    @TableField("warehouse_name")
    private String warehouseName;

    /**
     * 汽车容量
     */
    @TableField("warehouse_district")
    private String warehouseDistrict;

    /**
     * 汽车状态
     */
    @TableField("warehouse_area")
    private String warehouseArea;

    @TableField("warehouse_location")
    private String warehouseLocation;

    /**
     * 汽车类型
     */
    @TableField("warehouse_type")
    private String warehouseType;


    public static long getSerialVersionUID() {
        return serialVersionUID;
    }


}
