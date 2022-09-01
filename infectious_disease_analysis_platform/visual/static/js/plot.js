// 数据
// 各省份新增确诊，累计确诊，累计死亡
// 关键数据：时间+人数

function getCurrentDate(){
  let date = new Date()
  let year = date.getFullYear()
  let month = date.getMonth()+1
  let day = date.getDate()
  return year + '/' + month + '/' + day 
}

var chartDom1 = document.getElementById('plot1');
var myChart1 = echarts.init(chartDom1, 'custom');
var option1;


// 1. 获取当前日期
// 2. 计算当前日期在data中的index位置
// 3. 当前日期index作为颜色分割线
// 4. 展示哪个时间区段，由datazoom决定，during_set进行设置。
// plot_json来源与index.html的全局变量
let data = plot_json['Zhejiang']
let data_date = data.map(function(value,index) { return value[0]; });
let current_date = getCurrentDate()

let current_index = data_date.indexOf(current_date)
let during_set = data.length - current_index
// 前两个是确诊，死亡颜色，后一个是预测颜色
let color = ['#FFCC99','#3366CC', 'red','#3366CC']
// #FFCC99
visualMap_plot = [{
  show: false,
  dimension: 0,
  pieces: [
      {
        gt: 0,
        lte: current_index,
        color: color[0]
      },
      {
        gt: current_index,
        // 预测颜色调整在这里
        color: color[2]
      }
  ]
  },
  {
    show: false,
    showLabel:true,
    dimension: 0,
    pieces: [
        {
          gt: 0,
          lte: current_index,
          color: color[1]
        },
        {
          gt: current_index,
          color: color[2]
        }
    ]
    }
  ]
option1 = {
animationDuration: 1000,
  title: {
    text: '浙江省Convid-19病例统计',
    x:'center',
  },
  tooltip: {
    trigger: 'axis',
    formatter: function (element) {
      title = element[0].seriesName
      point_date = element[0].name
      value = element[0].data
      if (new Date(current_date).getTime() < new Date(point_date).getTime()){
        if (title == "新增确诊")
          return "<div style='color:"+color[2]+"'>" + point_date +"<br/>预测确诊: " + value + "</div>"
        else{
          return "<div style='color:"+color[2]+"'>" + point_date +"<br/>预测死亡: " + value + "</div>"
        }
      }else{
        return point_date +"<br/>" + title+ ": " + value
      }
    }, 
     axisPointer: {
       type: 'shadow',
     }
  },
  legend: {
    y:'15%',
    x:'right',
    data: ['新增确诊','新增死亡'],
    selectedMode:'single'
  },
  grid: {
    top:'15%',
    left: '3%',
    right: '4%',
    bottom: '15%',
    containLabel: true
  },
  toolbox: {
    feature: {
      restore: {},
      saveAsImage: {}
    }
  },
  dataZoom: [
    {
      type: 'slider',
      startValue: '2022/1/1',
      startValue: current_index - during_set,
      endValue: current_index + during_set,
      height:"8%",
      left:"4%",
      bottom:"4%"
    },
  ],
  xAxis: {
    type: 'category',
    boundaryGap: false,
    // 这个data是json传来的，时间加数量
    data: data.map(function(item){
      return item[0]
    })
  },
  yAxis: {
    min:0,
    max: function(value){
      return Math.ceil(value.max * 1.2)
    },
    type: 'value',
    minInterval:1
  },
  visualMap: [visualMap_plot[0]],
  series: [
    {
      name: '新增确诊',
      type: 'line',
      data: data.map(function(item){
          return item[1]
        }),
      smooth:true,
      itemStyle: {normal: {areaStyle: {type: 'default'}}},
      // lineStyle: {color: '#d5ceeb'},
    },
    {
      name: '新增死亡',
      type: 'line',
      data: data.map(function(item){
          return item[3]
        }),
      smooth:true,
      itemStyle: {normal: {areaStyle: {type: 'default'}}},
      // lineStyle: {color: color[3]}
    }
  ],
  // 折线颜色
  color: color
};
option1 && myChart1.setOption(option1);
myChart1.on('legendselectchanged', function (params) {
  option1.title[0].text = provin_name + 'Convid-19病例统计'
  data = plot_json[province_map[provin_name]]
  if (params.name == '新增确诊') {
    // 更新数据
    option1.visualMap = [visualMap_plot[0]]
  } else if (params.name == '新增死亡') {
    // 更新数据
    option1.visualMap = [visualMap_plot[1]]
  }
  myChart1.setOption(option1)
})    



var chartDom2 = document.getElementById('plot2');
var myChart2 = echarts.init(chartDom2, 'custom');
var option2;
option2 = {
  animationDuration: 1000,
  title: {
    text: '浙江省Convid-19病例统计',
    x:'center',
    y:'1.5%'
  },
  tooltip: {
    trigger: 'axis',
    formatter: function (element) {
      title = element[0].seriesName
      point_date = element[0].name
      value = element[0].data
      if (new Date(current_date).getTime() < new Date(point_date).getTime()){
        if (title == "累计确诊")
          return "<div style='color:"+color[2]+"'>" + point_date +"<br/>预测累计确诊: " + value + "</div>"
        else{
          return "<div style='color:"+color[2]+"'>" + point_date +"<br/>预测累计死亡: " + value + "</div>"
        }
      }else{
        return point_date +"<br/>" + title+ ": " + value
      }
    }, 
     axisPointer: {
       type: 'shadow',
     }
  },
  legend: {
    y:'10%',
    x:'right',
    data: ['累计确诊','累计死亡'],
    selectedMode:'single'
  },
  dataZoom: [
    {
      type: 'slider',
      startValue: '2022/1/1',
      startValue: current_index-during_set,
      endValue: current_index+during_set,
      height:"7%",
      left:"10%",
      bottom:'5%'
    },
  ],
  grid: {
    top:'20%',
    left: '3%',
    right: '4%',
    bottom: '15%',
    containLabel: true
  },
  toolbox: {
    feature: {
      restore: {},
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    // 这个data是json传来的，时间加数量
    data: data.map(function(item){
      return item[0]
    })
  },
  yAxis: {
    min:0,
    max: function(value){
      return Math.ceil(value.max * 1.2)
    },
    minInterval:1,
    type: 'value',
  },
  visualMap: [visualMap_plot[0]],
  series: [
    {
      name: '累计确诊',
      type: 'line',
      data: data.map(function(item){
          return item[2]
        }),
      smooth:true,
      itemStyle: {normal: {areaStyle: {type: 'default'}}},
      // lineStyle: {color: color[3]},
    },
    {
      name: '累计死亡',
      type: 'line',
      data: data.map(function(item){
          return item[4]
        }),
      smooth:true,
      itemStyle: {normal: {areaStyle: {type: 'default'}}},
      // lineStyle: {color: color[3]}
    }
  ],
  color:color
};
option2 && myChart2.setOption(option2);
myChart2.on('legendselectchanged', function (params) {
  option2.title[0].text = provin_name + 'Convid-19病例统计'
  data = plot_json[province_map[provin_name]]
  if (params.name == '累计确诊') {
    // 更新数据
    option2.visualMap = [visualMap_plot[0]]
    top_province = dealTopData(plot_json,Object.values(province_map),1)
  } else if (params.name == '累计死亡') {
    // 更新数据
    option2.visualMap = [visualMap_plot[1]]
  }
  myChart2.setOption(option2)
})




// 柱状图
// 处理数据,得到当前top10的新增排行
// 模式选择：1是新增，2是累计，3是死亡新增，4是死亡累计
function dealTopData(datas, keys, mode_select,nums_bar = 8){
  let date_len = datas[keys[0]].length
  // 获取每一个省份的累计数据
  // js中不定义变量，默认当作全局变量
  let cum_top_dict = {}
  keys.forEach(function(element){
    cum_top_dict[element] = datas[element][date_len-1]
  })
  // Create items array
  let items = Object.keys(cum_top_dict).map(function(key) {
    return [key, cum_top_dict[key]];
  });
  // Sort the array based on the second element
  items.sort(function(first, second) {
    return second[1][mode_select] - first[1][mode_select];
  });
  let items_top_10 = items.slice(0,nums_bar)
  // 人数表示柱子的长度；score表示柱子的颜色 1-100
  let result = [['score', '省份','当前','新增确诊', '累计确诊', '累计死亡']]
    // [89.3, 100, '江西']
  items_top_10.forEach(element => {
    province_name = element[0]
    people_info = element[1]
    
    let current = people_info[mode_select]
    // 使用对数，图像展示更美观
    if (current != 0){
      current = Math.log(current)
    }
    // score = Math.ceil(current*100/max_infect)
    let score = 5
    let new_confirm = people_info[1] 
    let cum_confirm = people_info[2]
    let cum_death = people_info[4]
    result.push([score,s_reverse_province_map[province_name],current,new_confirm,cum_confirm,cum_death])
  })
  console.log(result)
  return result
}

let bar_series_list = [
  {
    name: '累计确诊',
    type: 'bar',
    encode: {
      // Map the "amount" column to X axis.
      x: '当前',
      // Map the "product" column to Y axis
      y: '省份'
    },
    barWidth:'70%',
    itemStyle: {
      // 修改柱子圆角
      barBorderRadius: 5,
      //定义柱子不同颜色
      normal: {
          color: function (params) {
              var colorList = [
                '#67C23A', '#B5C334', '#ffa41b', '#E87C25', '#27727B',
                '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
              ];
              return colorList[params.dataIndex]
          },
          label: {
            show: true,
            position: 'right',
            formatter: function(data){
              let comma = data.data[4].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              return comma      
            } 
        }
      }
  }},
  {
    name: '新增确诊',
    type: 'bar',
    encode: {
      // Map the "amount" column to X axis.
      x: '当前',
      // Map the "product" column to Y axis
      y: '省份'
    },
    barWidth:'70%',
    itemStyle: {
      // 修改柱子圆角
      barBorderRadius: 5,
      //定义柱子不同颜色
      normal: {
          color: function (params) {
              var colorList = [
                '#67C23A', '#B5C334', '#ffa41b', '#E87C25', '#27727B',
                '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
              ];
              return colorList[params.dataIndex]
          },
          // 显示柱子上方数据
          label: {
            show: true,
            position: 'right',
            formatter: function(data){
              let comma = data.data[3].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              return comma       
            } 
        }
      }
  }
  },
  {
    name: '累计死亡',
    type: 'bar',
    encode: {
      // Map the "amount" column to X axis.
      x: '当前',
      // Map the "product" column to Y axis
      y: '省份'
    },
    barWidth:'70%',
    itemStyle: {
      // 修改柱子圆角
      barBorderRadius: 5,
      //定义柱子不同颜色
      normal: {
          color: function (params) {
              var colorList = [
                '#67C23A', '#B5C334', '#ffa41b', '#E87C25', '#27727B',
                '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
              ];
              return colorList[params.dataIndex]
          },
          label: {
            show: true,
            position: 'right',
            formatter: function(data){
              let comma = data.data[5].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              return comma     
            } 
        }
      }
  }
  }
]
let top_province = dealTopData(plot_json,Object.values(province_map),2)
var chartDom3 = document.getElementById('plot3');
var myChart3 = echarts.init(chartDom3,'custom');
option3 = {
  dataset: {
    source: top_province
  },
  legend:{
    data: ['累计确诊','新增确诊','累计死亡'],
    selectedMode:'series',
    // 模式最关键
    selected:{
      '累计确诊':true,'新增确诊':false,'累计死亡':false
    },
    top:'1%'
  },
  tooltip: {
    trigger: 'axis', 
     formatter: function (datas) {
      info = datas[0].data
      let temp = info[1] + '<br/>' + '新增确诊: '
      temp = temp + info[3] + '<br/>' + '累计确诊: '
      temp = temp + info[4] + '<br/>' + '累计死亡: '
      temp = temp + info[5]
      return temp
    }, 
     axisPointer: {
       type: 'shadow',
     }
  },
  grid: { 
    left: "5%",
    top: "10%",
    right: "20%",
    bottom: "8%",
    containLabel: true},
  xAxis: {
    name: '人数/(log)', 
    type:'value',
    splitLine:{
      show:false
    }},
  yAxis: {
    type: 'category',
    splitLine:{
      show:false
    }
  },
  series: [bar_series_list[0],bar_series_list[1],bar_series_list[2]]
  // series: [bar_series_list[1],bar_series_list[0],bar_series_list[2]]
};
option3 && myChart3.setOption(option3);

myChart3.on('legendselectchanged', function (params) {
  if (params.name == '新增确诊') {
    option3.legend.selected = {"累计确诊":false,"累计死亡":false}
    // 更新数据
    top_province = dealTopData(plot_json,Object.values(province_map),1)
  } else if (params.name == '累计确诊') {
    option3.legend.selected = {"新增确诊":false,"累计死亡":false}
    // 更新数据
    top_province = dealTopData(plot_json,Object.values(province_map),2)
  } else if (params.name == '累计死亡') {
    option3.legend.selected = {"累计确诊":false,"新增确诊":false}
    // 更新数据
    top_province = dealTopData(plot_json,Object.values(province_map),4)
  }
  option3.dataset.source = top_province
  myChart3.setOption(option3)
})
