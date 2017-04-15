// window.addEventListener("load", function(){
//     function randomData(){
//         now = new Date(+now+oneDay); 
//         value = value + Math.random() * 21 - 10; 
//         return{
//             value: [
//                 [now.getFullYear(), now.getMonth()+1, now.getDate()].join("/"),
//                 Math.round(value)
//             ]
//         }
//     }

//     var data = []; 
//     var now = +new Date(2000, 0, 0); 
//     var oneDay = 24 * 3600 * 1000; 
//     var value = Math.random() * 1000; 
//     for(var i = 0; i < 1000; i++){
//         data.push(randomData()); 
//     }

//     var option = {
//         title:{
//             text: "举报主题"
//         }, 
//         tooltip:{
//             trigger: 'axis', 
//             formatter: function(params){
//                 params = params[0]; 
//                 var date = new Date(params.name); 
//                 return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ":" + params.value[1]; 
//             }, 
//             axisPointer:{
//                 animation: false
//             }
//         }, 
//         xAxis: {
//             type: "time", 
//             splitLine: {
//                 show: false
//             }
//         }, 
//         yAxis: {
//             type: "value", 
//             boundaryGap: [0, '100%'],
//             splitLine: {
//                 show: false 
//             }
//         }, 
//         series: [{
//             name: "举报主题", 
//             type: 'line', 
//             showSymbol: false, 
//             hoverAnimation: false, 
//             data: data
//         }]
//     }; 
//     var myChart = echarts.init(document.getElementById('main'));
//     myChart.setOption(option);
//     setInterval(function(){
//         for(var i = 0; i < 5; i++){
//             data.shift(); 
//             data.push(randomData()); 
//         }
//         myChart.setOption({
//             series: [{data: data}]
//         }); 
//     }, 100); 
// })
console.log("what should I do"); 
window.addEventListener("load", function(){
    var option = {
        title:{
            // text: "最近7天举报数据变化情况"
        }, 
        tooltip:{
            trigger: 'axis'
        }, 
        legend:{
            data:["健康养生","食品安全","新科技"]
        }, 
        grid:{
            left: "3%", 
            right: "4%", 
            bottom: "3%", 
            containLabel: true
        }, 
        toolbox:{
            feature: {
                saveAsImage:{}
            }
        },
        xAxis: {
            type: "category", 
            boundaryGap: false,
            // splitLine: {
            //     show: false 
            // }
            data: ["周一","周二","周三","周四", "周五","周六","周日"]
        }, 
        yAxis: {
            type: "value"
        }, 
        series: [
            {
                name: "健康养生", 
                type: "line", 
                data: [120, 132, 101, 134, 90, 230, 310]
            }, 
            {
                name: "食品安全", 
                type: "line", 
                data: [220, 182, 191, 234, 290, 330, 310]
            }, 
            {
                name: "新科技", 
                type: "line", 
                data: [150, 192, 289, 389, 101, 220, 404]
            }
        ]
    }; 

    var myChart = echarts.init(document.getElementById('main'));
    myChart.setOption(option);
})