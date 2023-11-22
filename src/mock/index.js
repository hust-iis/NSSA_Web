const Mock = require("mockjs");
let alertInfo = Mock.mock({
    "alertInfo|6": [ //生成6条数据 数组
        {
            "title":Mock.mock('@ip'),
            "detail":"@ctitle(20)",
            "danger|1-10":1,
            //#region 
            // "shopId|+1": 1,//生成商品id，自增1
            // "shopMsg": "@ctitle(10)", //生成商品信息，长度为10个汉字
            // "shopName": "@cname",//生成商品名 ， 都是中国人的名字
            // "shopTel": /^1(5|3|7|8)[0-9]{9}$/,//生成随机电话号
            // "shopAddress": "@county(true)", //随机生成地址
            // "shopStar|1-5": "★", //随机生成1-5个星星
            // "salesVolume|30-1000": 30, //随机生成商品价格 在30-1000之间
            // "shopLogo": "@Image('100x40','#c33', '#ffffff','小北鼻')", //生成随机图片，大小/背景色/字体颜色/文字信息
            // "food|2": [ //每个商品中再随机生成2个food
            //     {
            //         "foodName": "@cname", //food的名字
            //         "foodPic": "@Image('100x40','#c33', '#ffffff','小可爱')",//生成随机图片，大小/背景色/字体颜色/文字信息
            //         "foodPrice|1-100": 20,//生成1-100的随机数
            //         "aname|2": [
            //             { 
            //                 "aname": "@cname", 
            //                 "aprice|30-60": 20 
            //             }
            //         ]
            //#endregion
                }
            // ]
        // }
    ]
})
let riskInfo = Mock.mock({
    "riskInfo|1": [ //生成6条数据 数组
        {
            "threat|1-5":1,
            "vul|1-3":1,

        }
    ]
})
let allAttack=Mock.mock({
    "allAttack|7":[{
        "num|1-100":1,
    }]
})
let tableData=Mock.mock({
    "tableData|10":[
        {
            "ip":/(((\d)|([1-9]\d)|(1\d{2})|(2[0-4]\d)|(25[0-5]))\.){3}((\d)|([1-9]\d)|(1\d{2})|(2[0-4]\d)|(25[0-5]))/,
            "hostname":Mock.Random.cfirst(),
            "type":Mock.Random.cfirst(),
            "mac":/((([A-F0-9]{2}:){5})|(([A-F0-9]{2}-){5}))[A-F0-9]{2}/,
            "os|1":['Linux','Ubuntu','Windows','Mac'],
            "detail":"@ctitle(20)",
            "status|1":['已处理','未查看','处理中']
                    // <el-table-column prop="type" label="设备类型"></el-table-column>
        // <el-table-column prop="mac" label="MAC地址"></el-table-column>
        // <el-table-column prop="os" label="操作系统"></el-table-column>
        // <el-table-column prop="detail" label="威胁详情"></el-table-column>
        // <el-table-column prop="status
        }
    ]
})
Mock.mock(/biaoge\/shuju/,'get',()=>{
    return tableData
})
Mock.mock(/zongti\/weixie/,'get',()=>{
    return allAttack
})
Mock.mock(/yingji\/xiangying/, 'get', () => { //三个参数。第一个：路径，第二个：请求方式post/get，第三个：回调，返回值
    return alertInfo
});


Mock.mock(/weixie\/cuiruo/,'get',()=>{
    return riskInfo
})