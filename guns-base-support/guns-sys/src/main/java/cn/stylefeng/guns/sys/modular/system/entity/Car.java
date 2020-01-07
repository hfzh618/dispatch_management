package cn.stylefeng.guns.sys.modular.system.entity;

import com.baomidou.mybatisplus.annotation.*;

import java.io.Serializable;
import java.util.Date;

/**
 * Created by hufangzhou on 2020/1/7.
 */
@TableName("info_car")
public class Car implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 主键
     */
    @TableId(value = "car_id", type = IdType.ID_WORKER)
    private Long carId;

    /**
     * 车牌号码
     */
    @TableField("car_num")
    private String carNum;

    /**
     * 汽车容量
     */
    @TableField("car_size")
    private Long carSize;

    /**
     * 汽车状态
     */
    @TableField("car_status")
    private Long carStatus;

    /**
     * 汽车类型
     */
    @TableField("car_type")
    private Long carType;

    /**
     * 默认司机
     */
    @TableField("car_defaultdriver")
    private Long carDefaultdriver;

    /**
     * 购买时间
     */
    @TableField(value = "car_buytime", fill = FieldFill.INSERT)
    private Date carBuytime;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Long getCarId() {
        return carId;
    }

    public Car setCarId(Long carId) {
        this.carId = carId;
        return this;
    }

    public String getCarNum() {
        return carNum;
    }

    public Car setCarNum(String carNum) {
        this.carNum = carNum;
        return this;
    }

    public Long getCarSize() {
        return carSize;
    }

    public Car setCarSize(Long carSize) {
        this.carSize = carSize;
        return this;
    }

    public Long getCarType() {
        return carType;
    }

    public Long getCarStatus() {
        return carStatus;
    }

    public Car setCarStatus(Long carStatus) {
        this.carStatus = carStatus;
        return this;
    }

    public Car setCarType(Long carType) {

        this.carType = carType;
        return this;
    }

    public Long getCarDefaultdriver() {
        return carDefaultdriver;
    }

    public Car setCarDefaultdriver(Long carDefaultdriver) {
        this.carDefaultdriver = carDefaultdriver;
        return this;
    }

    public Date getCarBuytime() {
        return carBuytime;
    }

    public Car setCarBuytime(Date carBuytime) {
        this.carBuytime = carBuytime;
        return this;
    }
}
