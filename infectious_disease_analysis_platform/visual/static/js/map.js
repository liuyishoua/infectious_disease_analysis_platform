// 数据
// 各省份新增确诊，累计确诊，累计死亡
// 关键数据：时间+人数

function getMapname(map_json) {
  var province_list = new Array();
  pro_len = map_json.responseJSON.features.length
  for (var i = 0; i <= pro_len - 1; i++) {
    province_list[i] = map_json.responseJSON.features[i].properties.name
  }
  return province_list
}
// 开启同步模式，获取json数据
$.ajaxSettings.async = false;
// 目前路径在index.html下,这些js都属于调用文件
china_json = $.getJSON('static/datas/china.json')
$.ajaxSettings.async = true;
province_list = getMapname(china_json)

// 数据放这块地方，包括新增累计确诊，死亡确诊。
// mode 1 新增确诊
// mode 2 现有确诊
// mode 3 新增死亡
// mode 4 累计确诊
function getMapdata(datas,mode_select){
  keys = Object.values(province_map)
  let date_len = datas[keys[0]].length
  // 获取每一个省份的累计数据
  // js中不定义变量，默认当作全局变量
  let cum_top_dict = {}
  for (i in keys){
    cum_top_dict[keys[i]] = datas[keys[i]][date_len-1]
  }
  // Create items array
  let items = Object.keys(cum_top_dict).map(function(key) {
    return [key, cum_top_dict[key]];
  });
  let map_infect_data = []
  items.forEach(function(element){
    map_infect_data.push({ 'name': reverse_province_map[element[0]], 'value': element[1][mode_select], 'confirm': element[1][1], 'total_confirm': element[1][2],'total_dead': element[1][4]})
  })
  return map_infect_data
}
// 初始地图是累计确诊
map_infect_data = getMapdata(plot_json,2)
series_list = [{
  name: '累计确诊',
  type: 'map',
  roam: true,
  map: 'China',
  zoom: 2,
  layoutCenter: ['50%', '70%'],
  layoutSize: 350,
  label: {
    show: true,
    // color: "rgb(249, 249, 249)", //省份标签字体颜色
    color: '#F08080',
    formatter: p => {
      switch (p.name) {
        case '内蒙古自治区':
          p.name = "内蒙古"
          break;
        case '西藏自治区':
          p.name = "西藏"
          break;
        case '新疆维吾尔自治区':
          p.name = "新疆"
          break;
        case '宁夏回族自治区':
          p.name = "宁夏"
          break;
        case '广西壮族自治区':
          p.name = "广西"
          break;
        case '香港特别行政区':
          p.name = "香港"
          break;
        case '澳门特别行政区':
          p.name = "澳门"
          break;

      }
      return p.name;

    },
    itemStyle: {
      normal: {
        areaColor: '#24CFF4',
        borderColor: '#53D9FF',
        borderWidth: 1.3,
        shadowBlur: 15,
        shadowColor: 'rgb(58,115,192)',
        shadowOffsetX: 7,
        shadowOffsetY: 6,
      },
      emphasis: {
        areaColor: '#8dd7fc',
        borderWidth: 1.6,
        shadowBlur: 25,
      }
    }
  },
  emphasis: {
    label: {
      show: true,
      color: '#f75a00'
    }
  },
  data: map_infect_data
  // data: [    
  //   { name: '江西省', value: 4822023 },
},{
  name: '新增确诊',
  type: 'map',
  roam: true,
  map: 'China',
  zoom: 2,
  layoutCenter: ['50%', '70%'],
  layoutSize: 350,
  label: {
    show: true,
    color: "rgb(249, 249, 249)", //省份标签字体颜色
    color: '#F08080',
    formatter: p => {
      switch (p.name) {
        case '内蒙古自治区':
          p.name = "内蒙古"
          break;
        case '西藏自治区':
          p.name = "西藏"
          break;
        case '新疆维吾尔自治区':
          p.name = "新疆"
          break;
        case '宁夏回族自治区':
          p.name = "宁夏"
          break;
        case '广西壮族自治区':
          p.name = "广西"
          break;
        case '香港特别行政区':
          p.name = "香港"
          break;
        case '澳门特别行政区':
          p.name = "澳门"
          break;

      }
      return p.name;

    },
    itemStyle: {
      normal: {
        areaColor: '#24CFF4',
        borderColor: '#53D9FF',
        borderWidth: 1.3,
        shadowBlur: 15,
        shadowColor: 'rgb(58,115,192)',
        shadowOffsetX: 7,
        shadowOffsetY: 6,
      },
      emphasis: {
        areaColor: '#8dd7fc',
        borderWidth: 1.6,
        shadowBlur: 25,
      }
    }
  },
  emphasis: {
    label: {
      show: true,
      color: '#f75a00'
    }
  },
  data: map_infect_data,

  // data: [    
  //   { name: '江西省', value: 4822023 },
},{
  name: '累计死亡',
  type: 'map',
  roam: true,
  map: 'China',
  zoom: 2,
  layoutCenter: ['50%', '70%'],
  layoutSize: 350,
  label: {
    show: true,
    color: "rgb(249, 249, 249)", //省份标签字体颜色
    color: '#eeeeee',
    formatter: p => {
      switch (p.name) {
        case '内蒙古自治区':
          p.name = "内蒙古"
          break;
        case '西藏自治区':
          p.name = "西藏"
          break;
        case '新疆维吾尔自治区':
          p.name = "新疆"
          break;
        case '宁夏回族自治区':
          p.name = "宁夏"
          break;
        case '广西壮族自治区':
          p.name = "广西"
          break;
        case '香港特别行政区':
          p.name = "香港"
          break;
        case '澳门特别行政区':
          p.name = "澳门"
          break;

      }
      return p.name;

    },
    itemStyle: {
      normal: {
        areaColor: '#24CFF4',
        borderColor: '#53D9FF',
        borderWidth: 1.3,
        shadowBlur: 15,
        shadowColor: 'rgb(58,115,192)',
        shadowOffsetX: 7,
        shadowOffsetY: 6,
      },
      emphasis: {
        areaColor: '#8dd7fc',
        borderWidth: 1.6,
        shadowBlur: 25,
      }
    }
  },
  emphasis: {
    label: {
      show: true,
      color: '#f75a00'
    }
  },
  data: map_infect_data,
}]
var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom, 'custom');
var option;
myChart.showLoading();

$.get('static/datas/china.json', function (chinaJson) {
  myChart.hideLoading();
  // console.log(chinaJson)
  echarts.registerMap('China', chinaJson, {});
  option = {
    // 地图标题
    title: {
      text: '中国新冠预测 (2022)',
      subtext: '数据来源：中国卫健委',
      //   加入跳转链接
      sublink: '',
      left: 'right'
    },
    // 悬停弹出提示
    tooltip: {
      trigger: 'item',
      formatter: function (datas) {
        let temp = datas.data.name + '<br/>' + '累计确诊: '
        temp = temp + datas.data.total_confirm + '<br/>' + '新增确诊: '
        temp = temp + datas.data.confirm + '<br/>' + '累计死亡: '
        temp = temp + datas.data.total_dead
        return temp
      },
      showDelay: 0,
      transitionDuration: 0.2
    },
    legend: {
      y: '1%',
      selectedMode: 'single' // 设置单选多选模式
    },
    // 左下角的人力图
    visualMap: {
      min: 0,
      max: 1000,
      left: 26,
      // top: 400,
      bottom: '2%',
      showLabel: !0,
      // text: ["高", "低"],
      textStyle: {
        color: '#fff',
        fontSize: 14,
      },
      pieces: [
        {
          gte: 2000,
          label: '累计确诊 >= 2000',
          color: '#8B4513',
        },
        {
          lte: 2000,
          gte: 1000,
          label: '累计确诊 < 2000',
          color: '#D2691E',
        },
        {
          lte: 1000,
          gte: 500,
          label: '累计确诊 < 1000',
          color: '#CD853F',
        },
        {
          lte: 500,
          gte: 100,
          label: '累计确诊 < 500',
          color: '#F4A460',
        },
        {
          lte: 100,
          gte: 1,
          label: '累计确诊 < 100',
          color: '#FFDAB9',
        },
        {
          lte: 10,
          label: '累计确诊 < 10',
          color: '#FAF0E6',
        }
      ],
      show: true,
    },
    toolbox: {
      show: true,
      //orient: 'vertical',
      left: 'left',
      top: 'top',
      feature: {
        dataView: { readOnly: false },
        restore: {},
        saveAsImage: {}
      }
    },
    // series集合展示数据
    series: [
      series_list[0],
      series_list[1],
      series_list[2]
    ]
  };
  myChart.setOption(option);
});
option && myChart.setOption(option);

provin_name = 'Zhejiang'
myChart.on('click', function (params) {
  let option1 = myChart1.getOption()
  let option2 = myChart2.getOption()
  provin_name = params.name
  option1.title[0].text = provin_name + 'Convid-19病例统计'
  option2.title[0].text = provin_name + 'Convid-19病例统计'
  // plot_json来源与index.html中的js全局变量
  // province_map也是
  data = plot_json[province_map[provin_name]]
  option1.series = [
    {
      name: '新增确诊',
      type: 'line',
      data: data.map(function(item){
          return item[1]
        }),
      smooth:true,
      itemStyle: {normal: {areaStyle: {type: 'default'}}},
    },
    {
      name: '新增死亡',
      type: 'line',
      data: data.map(function(item){
          return item[3]
        }),
      smooth:true,
      itemStyle: {normal: {areaStyle: {type: 'default'}}},
    }
  ]
  option2.series = [
    {
      name: '累计确诊',
      type: 'line',
      data: data.map(function(item){
          return item[2]
        }),
      smooth:true,
      itemStyle: {normal: {areaStyle: {type: 'default'}}},
    },
    {
      name: '累计死亡',
      type: 'line',
      data: data.map(function(item){
          return item[4]
        }),
      smooth:true,
      itemStyle: {normal: {areaStyle: {type: 'default'}}},
    }
  ]
  myChart1.setOption(option1, true)
  myChart2.setOption(option2, true)
})
myChart.on('legendselectchanged', function (params) {
  
  if (params.name == '累计确诊') {
    // 更新数据
    option.visualMap.pieces = pieces[0]
    series_list.forEach(function(series){
      series.data = getMapdata(plot_json,2)
    })
  } else if (params.name == '新增确诊') {
    // 更新数据
    option.visualMap.pieces = pieces[1]
    series_list.forEach(function(series){
      series.data = getMapdata(plot_json,1)
    })
  } else if (params.name == '累计死亡') {
    // 更新数据
    option.visualMap.pieces = pieces[2]
    series_list.forEach(function(series){
      series.data = getMapdata(plot_json,4)
    })
    console.log(series_list)
  }
  option.series = [series_list[0],series_list[1],series_list[2]]
  myChart.setOption(option)
})

// 新增确诊
pieces = [[
    {
      gte: 2000,
      label: '累计确诊 >= 2000',
      color: '#8B4513',
    },
    {
      lte: 2000,
      gte: 1000,
      label: '累计确诊 < 2000',
      color: '#D2691E',
    },
    {
      lte: 1000,
      gte: 500,
      label: '累计确诊 < 1000',
      color: '#CD853F',
    },
    {
      lte: 500,
      gte: 100,
      label: '累计确诊 < 500',
      color: '#F4A460',
    },
    {
      lte: 100,
      gte: 1,
      label: '累计确诊 < 100',
      color: '#FFDAB9',
    },
    {
      lte: 10,
      label: '累计确诊 < 10',
      color: '#FAF0E6',
    }
  ],[
  {
      gte: 200,
      label: '新增确诊 >= 200',
      color: '#8B4513',
  },
  {
      lte: 200,
      gte: 100,
      label: '新增确诊 < 200',
      color: '#D2691E',
  },
  {
    lte: 100,
      gte: 50,
    label: '新增确诊 < 100',
    color: '#CD853F',
},
{
    lte: 50,
    gte: 10,
    label: '新增确诊 < 50',
    color: '#F4A460',
},
  {
    lte: 10,
    gte: 1,
      label: '新增确诊 < 10',
      color: '#FFDAB9',
  },
  {
    value: 0,
    label: '无新增确诊',
    color: '#FAF0E6',
}
],
[
  {
      gte: 50,
      label: '累计死亡 >= 50',
      color: '#D2691E',
  },
  {
    lte: 50,
      gte: 10,
    label: '累计死亡 < 50',
    color: '#CD853F',
},
{
    lte: 10,
    gte: 5,
    label: '累计死亡 < 10',
    color: '#F4A460',
},
  {
    lte: 5,
    gte: 0,
      label: '累计死亡 < 5',
      color: '#FFDAB9',
  },
  {
    value: 0,
    label: '无累计死亡',
    color: '#FAF0E6',
},
{
  value: 45,
  label: '无累计死亡',
  color: '#FAF0E6',
}
]
]
