package cn.stylefeng.guns.sys.modular.system.service;

import cn.stylefeng.guns.sys.modular.system.entity.Train;
import cn.stylefeng.guns.sys.modular.system.mapper.TrainMapper;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.csvreader.CsvReader;
import java.nio.charset.Charset;


/**
 * <p>
 * 登录记录 服务实现类
 * </p>
 *
 * @author stylefeng
 * @since 2018-12-07
 */
@Service
public class TrainService extends ServiceImpl<TrainMapper, Train> {

    /**
     * 获取登录日志列表
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:53 PM
     */

    public static Map<Integer,Double> lng = new HashMap<>();
    public static Map<Integer,Double> lat = new HashMap<>();

    public List<Map<String, Object>> getTrains(Page page) {
        return this.baseMapper.getTrains(page);
    }

    public void saveTrain(Train train){
        this.baseMapper.saveTrain(train);
    }

    public void generate() throws IOException {
        CloseableHttpClient httpClient = HttpClients.createDefault();

        HttpGet request = new HttpGet("http://10.141.209.224:5001/routes");
        try (CloseableHttpResponse response = httpClient.execute(request)) {

            HttpEntity entity = response.getEntity();

            if (entity != null) {
                String result = EntityUtils.toString(entity);

                JSONObject json;
                json = JSONObject.parseObject(result);
                JSONArray data =  json.getJSONArray("data");
                for (int i = 0;i<data.size();i++){
                    JSONObject obj = data.getJSONObject(i);
                    String key = obj.keySet().toArray()[0].toString();
                    String value = obj.get(key).toString();
                    System.out.println("key"+key);
                    System.out.println("value"+value);

                    //得到经纬度序列
                    value = value.substring(1,value.length()-1);
                    String[] items = value.split(",");
                    List<List<Double>> lnglats = new ArrayList<>();
                    for (String item:items){
                        Double longitude = lng.get(Integer.valueOf(item));
                        Double latitude = lat.get(Integer.valueOf(item));
                        List<Double> lnglat = new ArrayList<>();
                        lnglat.add(longitude);
                        lnglat.add(latitude);
                        lnglats.add(lnglat);
                    }
                    System.out.println(lnglats.toString());
                    Train train = new Train();
                    train.setTrainName(key);
                    train.setTrainStops(value);
                    train.setTrainType("常规");
                    train.setTrainStatus("初始");
                    this.baseMapper.saveTrain(train);
                }
            }
        }
    }

    public static void banlieData() throws Exception{
        String file = "/Users/hufangzhou/Desktop/mendian.csv";
        readCSV(file);
    }

    public static void readCSV(String filePath) throws Exception{
        lng.clear();
        lat.clear();
        char separator = ',';
        CsvReader reader = null;
        try {
            //如果生产文件乱码，windows下用gbk，linux用UTF-8
            reader = new CsvReader(filePath, separator,Charset.forName("UTF-8"));

            // 读取表头
            reader.readHeaders();
            String[] headArray = reader.getHeaders();//获取标题
            System.out.println(headArray[0] + headArray[1] + headArray[2] + headArray[3]+ headArray[4]+ headArray[5]+ headArray[6]);

            // 逐条读取记录，直至读完
            while (reader.readRecord()) {
                // 读一整行
                System.out.println(reader.getRawRecord());
                // 读这行的第一列
                System.out.println(reader.get("id"));
                Integer id = Integer.valueOf(reader.get("id"));
                Double longitude = Double.valueOf(reader.get("longitude"));
                Double latitude = Double.valueOf(reader.get("latitude"));
                System.out.println(longitude);
                System.out.println(latitude);
                lng.put(id,longitude);
                lat.put(id,latitude);

            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (null != reader) {
                reader.close();
            }
        }
    }

    public static void main(String[] args) throws Exception{
        banlieData();
//        generate();
    }
}
