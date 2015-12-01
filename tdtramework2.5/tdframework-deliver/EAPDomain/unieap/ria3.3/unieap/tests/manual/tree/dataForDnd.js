var rowsetData = [{
    "id": "1231035443386",
    "label": "数据结构",
    "type": "menu",
    "parentID": "1212403325756",
    "leaf": false,
    "image": "null",
    "pagearea": "null",
    "location": "null",
    "chief": "false"
},{
    "id": "111111",
    "label": "test1",
    "type": "menu",
    "parentID": "1231035443386",
    "leaf": true,
    "image": "null",
    "pagearea": "null",
    "location": "null",
    "chief": "false"
},
{
    "id": "2222222",
    "label": "test2",
    "type": "menu",
    "parentID": "1231035443386",
    "leaf": true,
    "image": "null",
    "pagearea": "null",
    "location": "null",
    "chief": "false"
},
{
    "id": "33333333",
    "label": "test3",
    "type": "menu",
    "parentID": "1231035443386",
    "leaf": true,
    "image": "null",
    "pagearea": "null",
    "location": "null",
    "chief": "false"
},
{
    "id": "444444444",
    "label": "test4",
    "type": "menu",
    "parentID": "1231035443386",
    "leaf": true,
    "image": "null",
    "pagearea": "null",
    "location": "null",
    "chief": "false"
},
 {
    "id": "1228896990281",
    "label": "验证码",
    "type": "menu",
    "index": "30",
    "parentID": "1212403325756",
    "leaf": false,
    "image": "null",
    "pagearea": "null",
    "location": "null",
    "chief": "false"
}, {
    "id": "1228897005421",
    "label": "RIA版",
    "type": "menu",
    "index": "1",
    "parentID": "1228896990281",
    "leaf": true,
    "image": "null",
    "pagearea": "null",
    "location": "/jcaptcha_ria.do",
    "chief": "false"
}];


var rowset2Data = [
{
    "id": "1213062998781",
    "label": "表单构件",
    "type": "menu",
    "index": "6",
    "parentID": "1212403325756",
    "leaf": false,
    "image": "null",
    "pagearea": "null",
    "location": "null",
    "chief": "false"
},{
    "id": "1213246850136",
    "label": "数字文本框",
    "type": "menu",
    "index": "14",
    "parentID": "1213062998781",
    "leaf": true,
    "image": "null",
    "pagearea": "null",
    "location": "/form_numbertextbox.do",
    "chief": "false"
}, {
    "id": "1213149919455",
    "label": "日期输入框",
    "type": "menu",
    "index": "16",
    "parentID": "1213062998781",
    "leaf": true,
    "image": "null",
    "pagearea": "null",
    "location": "/form_datetextbox.do",
    "chief": "false"
},{
    "id": "1213346355116",
    "label": "多行文本框",
    "type": "menu",
    "index": "20",
    "parentID": "1213062998781",
    "leaf": true,
    "image": "null",
    "pagearea": "null",
    "location": "/form_textarea.do",
    "chief": "false"
}, {
    "id": "1213063141603",
    "label": "异常处理",
    "type": "menu",
    "index": "18",
    "parentID": "1212403325756",
    "leaf": false,
    "image": "null",
    "pagearea": "null",
    "location": "null",
    "chief": "false"
}, {
    "id": "1213063167970",
    "label": "演示样例",
    "type": "menu",
    "index": "1",
    "parentID": "1213063141603",
    "leaf": true,
    "image": "null",
    "pagearea": "null",
    "location": "/ria_exceptiondemo.do",
    "chief": "false"
}, {
    "id": "1220493735802",
    "label": "信息中心",
    "type": "menu",
    "index": "2",
    "parentID": "1213063141603",
    "leaf": false,
    "image": "null",
    "pagearea": "null",
    "location": "/ria_infocenter.do",
    "chief": "false"
},{
    "id": "newtest",
    "label": "二级节点测试",
    "type": "menu",
    "index": "2",
    "parentID": "1220493735802",
    "leaf": true,
    "image": "null",
    "pagearea": "null",
    "location": "/ria_infocenter.do",
    "chief": "false"
}];

var treeStore = new unieap.ds.DataStore("menuTree", rowsetData);
var treeStore2 = new unieap.ds.DataStore("menuTree2", rowset2Data);
dataCenter = new unieap.ds.DataCenter();
dataCenter.addDataStore(treeStore);
dataCenter.addDataStore(treeStore2);