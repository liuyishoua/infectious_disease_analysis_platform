import time
import numpy as np
import pandas as pd
from .predict import predict 
# if you use like this, which means you are viewed it as a module
# can only call by other files

class Update(object):
    """处理步骤：
    1. 新增确诊以及死亡数据作为元数据
    2. 预测新增确诊与死亡
    3. 将预测结果与原始数据相连接
    4. 生成累计确诊与死亡数据=
    5. 处理成js读取的json格式
    """
    def __init__(self,d_confirm_path = './data/daily_confirm.csv'
                    ,d_death_path = './data/daily_death.csv'
                    ,p_confirm_path = './data/predict_confirm.csv'
                    ,p_death_path = './data/predict_death.csv'
                    ,save_path = './data/plot.json') -> None:
        # 默认有预测数据，从第三步开始
        self.d_confirm_path = d_confirm_path
        self.d_death_path = d_death_path
        self.p_confirm_path = p_confirm_path
        self.p_death_path = p_death_path
        self.save_path = save_path

    def pd_read_csv(self,path):
        """读取文件
        """
        data = pd.read_csv(path)
        return data
    
    # def _date_format(self, date):
    #     year,month,day = date.split('-')
    #     return str(int (year)) + '/' + str(int (month)) + '/' + str(int(day))

    def generate_future(self,d_confirm,d_death,pred_day=90):
        """时间: 30min, 生成预测数据，并保存到相应文件夹
        :params d_confirm d_death 新增确诊与死亡数据
        :return p_confirm p_death 预测死亡与确诊
        """
        print ("Beginning predict: --------------------------------")
        start = time.time()
        p_confirm = predict(d_confirm,pred_day)
        # change datetime format
        p_confirm['Date'] = p_confirm['Date'].apply(lambda date: str(date.year) + '/' + str(date.month) + '/' + str(date.day))
        p_confirm.to_csv(self.p_confirm_path,index=False)
        
        middle = time.time()
        print (f"Predict file has save to {self.p_confirm_path}")
        print (f"Time consume: {round((middle-start)/60,2)} min")
        
        p_death = predict(d_death,pred_day)
        p_death['Date'] = p_death['Date'].apply(lambda date: str(date.year) + '/' + str(date.month) + '/' + str(date.day))
        p_death.to_csv(self.p_death_path,index=False)
        
        end = time.time()
        print (f"Predict file has save to {self.p_death_path}")
        print (f"Time consume: {round((end-middle)/60,2)} min")
        print ("Ending predict: -----------------------------------")
        return p_confirm,p_death

        # 3. 将预测结果与原始数据相连接
    def concat_predict(self,d_confirm,d_death,p_confirm,p_death):
        """将预测数据与原始数据连接一起
        :params 输入新增与预测的（确诊与死亡）
        :return 连接后的新增与死亡
        """
        # load the prediction
        p_confirm = pd.read_csv(self.p_confirm_path)
        p_death = pd.read_csv(self.p_death_path)

        # get the result
        a_confirm = pd.concat([d_confirm, p_confirm],axis=0).reset_index(drop=True)
        a_death = pd.concat([d_death, p_death],axis=0).reset_index(drop=True)

        return a_confirm, a_death


        # 4. 生成累计确诊与死亡数据
    def generate_cumulative(self,daily_pd):
        """
        :params daily_pd
        :return cumulative_pd
        """
        cum_pd = pd.DataFrame()
        without_date = daily_pd.columns[daily_pd.columns!='Date']
        cum_pd['Date'] = daily_pd['Date']
        for column in without_date:
            cum_pd[column] = daily_pd[column].cumsum()
        return cum_pd

        # 5. 处理成js读取的json格式
    def generate_json(self,a_confirm,a_death,save_path = 'plot.json'):
        """a_confirm,a_death,save_path = 'plot.json'
        :params a_confirm a_death 新增确诊与死亡（包括预测部分）
        :params save_path 最终json文件的保存位置 
        :return None
        """
        # 生成累计数据
        c_confirm = self.generate_cumulative(a_confirm)
        c_death = self.generate_cumulative(a_death)

        result = dict()
        without_date = a_confirm.columns[a_confirm.columns!='Date']
        for column in without_date:
            temp = pd.DataFrame()
            temp['Date'] = a_confirm['Date']
            temp[column+'1'] = a_confirm[column]
            temp[column+'2'] = c_confirm[column]
            temp[column+'3'] = a_death[column]
            temp[column+'4'] = c_death[column]
            temp = temp.values.tolist()
            result[column] = temp
        import json
        with open(save_path,"w") as f:
            json.dump(result,f)

    def update_json_with_predict(self):
        """需要存在新增和预测文件
        预测数据已经生成, 最终会生成plot.json数据
        :params self使用类的变量即可
        :return None
        """
        # 1. 新增确诊以及死亡数据作为元数据
        # 2. 预测新增确诊与死亡
        d_confirm = self.pd_read_csv(self.d_confirm_path)
        d_death = self.pd_read_csv(self.d_death_path)
        p_confirm = self.pd_read_csv(self.p_confirm_path)
        p_death = self.pd_read_csv(self.p_death_path)

        # 3. 将预测结果与原始数据相连接
        a_confirm, a_death = self.concat_predict(d_confirm,d_death,p_confirm,p_death)

        # 4. 生成累计确诊与死亡数据
        # 5. 处理成js读取的json格式
        self.generate_json(a_confirm,a_death,self.save_path)

    def update_json_without_predict(self,pred_day):
        """时长至少半小时。只需存在新增数据，预测数据未生成, 最终会生成plot.json数据
        :params self使用类的变量即可
        :pred_time 设置预测未来多少天
        :return None
        """
        # 1. 新增确诊以及死亡数据作为元数据
        # 2. 预测新增确诊与死亡
        d_confirm = self.pd_read_csv(self.d_confirm_path)
        d_death = self.pd_read_csv(self.d_death_path)
        p_confirm,p_death = self.generate_future(d_confirm,d_death,pred_day)
        
        # 3. 将预测结果与原始数据相连接
        a_confirm, a_death = self.concat_predict(d_confirm,d_death,p_confirm,p_death)

        # 4. 生成累计确诊与死亡数据
        # 5. 处理成js读取的json格式
        self.generate_json(a_confirm,a_death,self.save_path)
