package cn.stylefeng.guns.sys.modular.system.service;

import cn.stylefeng.guns.sys.modular.system.entity.Dispatch;
import cn.stylefeng.guns.sys.modular.system.mapper.DispatchMapper;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;
import org.springframework.stereotype.Service;

import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <p>
 * 登录记录 服务实现类
 * </p>
 *
 * @author stylefeng
 * @since 2018-12-07
 */
@Service
public class DispatchService extends ServiceImpl<DispatchMapper, Dispatch> {

    /**
     * 获取登录日志列表
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:53 PM
     */
    public List<Map<String, Object>> getDispatchs(Page page) {
        return this.baseMapper.getDispatchs(page);
    }

    public void saveDispatch(Dispatch dispatch){
        this.baseMapper.saveDispatch(dispatch);
    }

    public void analysis(int orderId,int carId){

    }

    public static void generate(){

        JSONObject input = new JSONObject();
        JSONObject vehicle = new JSONObject();
        vehicle.put("vehicleid","1");
        vehicle.put("maxW",1);
        vehicle.put("maxV",1);
        vehicle.put("loc",3);

        JSONObject pickedOrders = new JSONObject();
        JSONArray orderArray = new JSONArray();

        JSONObject order1 = new JSONObject();
        order1.put("uid",349593485);
        order1.put("weight",12);
        order1.put("volume",9);
        order1.put("state",0);
        order1.put("upsiteid",16);
        order1.put("downsiteid",27);
        order1.put("downtime",1576051523);

        JSONObject order2 = new JSONObject();
        order2.put("uid",548349294);
        order2.put("weight",18);
        order2.put("volume",20);
        order2.put("state",0);
        order2.put("upsiteid",20);
        order2.put("downsiteid",26);
        order2.put("downtime",1576051623);

        orderArray.add(order1);
        orderArray.add(order2);

        input.put("orders",orderArray);
        input.put("vehicle",vehicle);
        System.out.println(input);
        String url = "http://localhost:5005/api/data";
        JSONObject res = doPost(url,input);
        System.out.println("res");
        System.out.println(res);
    }

    public static JSONObject doPost(String url,JSONObject json){
        DefaultHttpClient client = new DefaultHttpClient();
        HttpPost post = new HttpPost(url);
        JSONObject response = null;
        try {
            StringEntity s = new StringEntity(json.toString());
            s.setContentEncoding("UTF-8");
            s.setContentType("application/json");//发送json数据需要设置contentType
            post.setEntity(s);
            HttpResponse res = client.execute(post);
            if(res.getStatusLine().getStatusCode() == HttpStatus.SC_OK){
                HttpEntity entity = res.getEntity();
                String result = EntityUtils.toString(res.getEntity());// 返回json格式：
                System.out.println("result"+result);
                response = JSONObject.parseObject(result);
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return response;
    }


    public static void main(String[] args) {
        generate();
    }
}
