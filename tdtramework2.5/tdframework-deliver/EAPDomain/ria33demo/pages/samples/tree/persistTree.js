
dojo.addOnLoad(function(){
    dp.SyntaxHighlighter.HighlightAll('code');
});
init();
//初始化请求数据
function init(){
    var dataStore = new unieap.ds.DataStore("treeStore");
    dataStore.setRowSetName("tree_test");
    dataStore.setPageSize(-1);
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

//保存
function save(){
    var dc = new unieap.ds.DataCenter();
    dc.addDataStore(dataCenter.getDataStore("treeStore"));
    unieap.Action.requestData({
        url: unieap.WEB_APP_NAME + "/getLazyData.do?method=save",
        parameters: {
            "synLoadStatistics": true
        },
        sync: true,
        load: function(a){
            alert("保存成功");
        }
    }, dc);
    dc.getDataStore("treeStore").getRowSet().resetUpdate();
}

//添加节点
function addNode(){
    var node = unieap.byId("persistTree").getCurrentNode();
    if (!node) {
        alert("请选择节点");
    }
    else {
        var parentId = "";
        if (node.isRoot()) {
            parentId = 'unieap_ria_tree_id_for_root';
        }
        else {
            parentId = unieap.byId("persistTree").getBinding().getId(node.getItem());
        }
        var randomId = new Date().getTime();
        var data = {
            "UP_TREE_TEST_ID": randomId,
            "UP_TREE_TEST_LABEL": "新增节点测试",
            "UP_TREE_TEST_PARENTID": parentId
        }
        unieap.byId("persistTree").createNode(data, node);
    }
}

//删除节点
function deleteNode(){
    var node = unieap.byId("persistTree").getCurrentNode();
    if (!node) {
        alert("请选择节点");
    }
    else {
        unieap.byId("persistTree").deleteNode(node);
    }
}

function check(){
    unieap.debug(dataCenter);
}
