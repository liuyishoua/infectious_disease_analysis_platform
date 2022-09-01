# encoding:utf-8
import numpy as np
import pandas as pd
import pandas as pd
from fbprophet import Prophet
from tqdm import tqdm


def predict(input_data,pred_len=20):
    '''
    :params pred_len 预测的天数
    :params input_data 使用 input_data = pd.read_csv(input_path)。 
    :return pdata  保存使用 pdata.to_csv(save_path,index=False)
    输入为累计数据
    使用数据作为输入输出，防止代码耦合过严重
    '''
    Dates = input_data['Date']
    Provinces = list(input_data.columns.values) # 省市名
    # Provinces.pop(0) # 删除序号
    Provinces.pop(0) # 删除‘dates’

    pdata = pd.DataFrame() # 保存预测结果
    RMSE_all = pd.DataFrame(columns = Provinces) # 保存

    ### 参数选择
    t0 = 800 # 时间起点
    steplen = 5 # 平滑处理的步长：一般取3~5即可
    changepoint_prior_scale = 2 
    growth='logistic'
    # pred_len = 20 # 预测长度

    for p in tqdm(Provinces):
        df = pd.DataFrame(columns=['ds','y'])
        df['ds'] = Dates[t0:]
        df['y'] = input_data[p][t0:]
        df['ds'] = pd.to_datetime(df['ds'],yearfirst=True)

        ### 移动平均处理
        avglist = list(df['y']) 
        for t in range(steplen,len(df['y'])):
            avglist[t] = np.average(df['y'][t+1-steplen:t+1])
        df['y'] = avglist

        ### 模型预测
        # 模型训练
        m = Prophet(growth = growth,
                    changepoint_prior_scale = changepoint_prior_scale,
                    yearly_seasonality = False,
                    daily_seasonality = True)
        df['cap'] = round(max(df['y']))+1
        m.fit(df)
        future = m.make_future_dataframe(periods=pred_len)
        future['cap'] = round(max(df['y'])) + 1
        forecast = m.predict(future)

        # 预测结果
        test = forecast[['ds','yhat']].tail(pred_len) 
        test['yhat'] = round(test['yhat']) # 取整
        test['yhat'][test['yhat']<0] = 0 #  负数改为0

        # 计算RMSE
        y1 = list(df['y'])
        y2 = list(forecast['yhat'][:len(y1)])
        RMSE = np.sqrt(sum([(y1[i]-y2[i])**2 for i in range(len(y1))])/len(y1))

        # 计算R2拟合优度
        sum1 = sum([(y1[i]-y2[i])**2 for i in range(len(y1))])
        avr = np.average(y1)
        sum2 = sum([(y1[i]-avr)**2 for i in range(len(y1))])
        R2 = 1 - sum1/sum2

        ### 记录预测结果、测试结果
        RMSE_all[p] = [RMSE,R2]
        pdata['Date'] = test['ds']
        pdata[p] = test['yhat']

    return pdata

# if __name__ == '__main__':
#     import numpy as np
#     import pandas as pd

#     # 使用新增确证与死亡生成累计csv文件
#     d_confirm = pd.read_csv('visual/core_function/data/daily_confirm.csv')
#     # d_death = pd.read_csv('./data/daily_death.csv')
    
#     pred_day = 80
#     p_confirm = predict(d_confirm,pred_day)
#     p_confirm.to_csv("visual/core_function/data/perdict_comfirm.csv",index=False)