
dojo.addOnLoad(function(){
    dp.SyntaxHighlighter.HighlightAll('code');
});

init();

function init(){
    var dataStore = new unieap.ds.DataStore("treeStore");
    dataStore.setRowSetName("tree_test");
    var dc = new unieap.ds.DataCenter();
    dc.addDataStore(dataStore);
    var newdc = unieap.Action.requestData({
        url: unieap.WEB_APP_NAME + "/getLazyData.do?method=getLazyData",
        parameters: {
            "asynLoadStatistics": true
        },
        sync: true,
        load: function(dc){
        
        }
    }, dc);
    dataCenter.addDataStore(newdc.getDataStore("treeStore"));
}


function save(){
    var dc = new unieap.ds.DataCenter();
    dc.addDataStore(dataCenter.getDataStore("treeStore"));
    unieap.Action.requestData({
        url: unieap.WEB_APP_NAME + "/getLazyData.do?method=save",
        parameters: {
            "asynLoadStatistics": true
        },
        sync: true,
        load: function(dc){
            alert("成功");
        }
    }, dc);
    dc.getDataStore("treeStore").getRowSet().resetUpdate();
}

function selfDefineLabelStyle(item, opened, isExpandable){
    return {
        fontSize: "13px"
    };
}

var b1 = new Date().getTime() + "L1";
var b2 = new Date().getTime() + "L2";
var b3 = new Date().getTime() + "L3";
var b4 = new Date().getTime() + "L4";
var l1 = new Date().getTime() + "L21";
var l2 = new Date().getTime() + "L31";

var rowsetData = [{
    UP_TREE_TEST_ID: b1,
    UP_TREE_TEST_LABEL: "11",
    UP_TREE_TEST_PARENTID: ""
}, {
    UP_TREE_TEST_ID: b2,
    UP_TREE_TEST_LABEL: "12",
    UP_TREE_TEST_PARENTID: ""
}, {
    UP_TREE_TEST_ID: b3,
    UP_TREE_TEST_LABEL: "13",
    UP_TREE_TEST_PARENTID: ""
}, {
    UP_TREE_TEST_ID: b4,
    UP_TREE_TEST_LABEL: "14",
    UP_TREE_TEST_PARENTID: ""
}, {
    UP_TREE_TEST_ID: l1,
    UP_TREE_TEST_LABEL: "21",
    UP_TREE_TEST_PARENTID: b2
}, {
    UP_TREE_TEST_ID: l2,
    UP_TREE_TEST_LABEL: "31",
    UP_TREE_TEST_PARENTID: b3
}];
var treeStore = new unieap.ds.DataStore("menuTree", rowsetData);
dataCenter.addDataStore(treeStore);
