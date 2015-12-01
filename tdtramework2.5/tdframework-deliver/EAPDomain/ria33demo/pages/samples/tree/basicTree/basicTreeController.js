
dojo.addOnLoad(function(){
    dp.SyntaxHighlighter.HighlightAll('code');
    dp.SyntaxHighlighter.HighlightAll('code1');
    dp.SyntaxHighlighter.HighlightAll('code2');
    
});
function selectAllNode(){
    unieap.byId("basicTree").selectAll(true);
}

function deSelectAllNode(){
    unieap.byId("basicTree").selectAll(false);
}

function setReadOnly(){
    var node = unieap.byId("basicTree").getSelectedNodes();
    node &&
    dojo.forEach(node, function(x){
        x.setReadOnly(true);
    });
}

function cancelReadOnly(){
    var node = unieap.byId("basicTree").getSelectedNodes();
    node &&
    dojo.forEach(node, function(x){
        x.setReadOnly(false);
    });
}

function setDisabled(){
    var node = unieap.byId("basicTree").getSelectedNodes();
    node &&
    dojo.forEach(node, function(x){
        x.setDisabled(true);
    });
}

function cancelDisabled(){
    var node = unieap.byId("basicTree").getSelectedNodes();
    node &&
    dojo.forEach(node, function(x){
        x.setDisabled(false);
    });
}

function setDataStore(){
    var node = unieap.byId("basicTree2").getCurrentNode();
    var arg = {
        query: {
            name: 'id',
            relation: '=',
            value: '1'
        }
    };
    unieap.byId("basicTree").getBinding().setDataStore(node, neusoft, arg);
}

function getParent(){
    var node = unieap.byId("basicTree1").getCurrentNode();
    if (node && !node.isRoot()) {
        alert("当前节点父节点label为：" + node.getParent().getLabel());
    }
    if (node && node.isRoot()) {
        alert("当前节点为根节点");
    }
}

function getRoot(){
    alert("根节点label值为：" + unieap.byId("basicTree1").getRootNode().getLabel());
}

function getText(){
    alert("根节点显示值为：" + unieap.byId("basicTree1").getText());
}

function getSelectedNodes(){
    var nodesArray = unieap.byId("basicTree1").getSelectedNodes();
    var alertNodes = "选中节点label为：";
    dojo.forEach(nodesArray, function(x){
        alertNodes += x.getLabel() + ",";
    });
    if ("选中节点为：" == alertNodes) {
        alert("未选中任何节点");
    }
    else {
        alert(alertNodes);
    }
}

function getChildren(){
    var node = unieap.byId("basicTree1").getCurrentNode();
    if (node) {
        unieap.debug(node.getChildren());
    }
    else {
        alert("无当前节点");
    }
}

function getPreviousChild(){
    var node = unieap.byId("basicTree1").getCurrentNode();
    if (node) {
        if (node.getPreviousChild() != null) {
            alert("该节点的上一个兄弟节点label为：" + node.getPreviousChild().getLabel());
        }
        else {
            alert(node.getPreviousChild());
        }
    }
    else {
        alert("无当前节点");
    }
}

function getNextChild(){
    var node = unieap.byId("basicTree1").getCurrentNode();
    if (node) {
        if (node.getNextChild() != null) {
            alert("该节点的下一个兄弟节点label为：" + node.getNextChild().getLabel());
        }
        else {
            alert(node.getNextChild());
        }
    }
    else {
        alert("无当前节点");
    }
}

function setChecked(){
    var node = unieap.byId("basicTree2").getCurrentNode();
    if (node) {
        if (node.isChecked()) {
            node.setChecked(false);
        }
        else {
            node.setChecked(true);
        }
    }
    else {
        alert("无当前节点");
    }
}

function setLabel(){
    var node = unieap.byId("basicTree2").getCurrentNode();
    unieap.byId("basicTree").getBinding().setLabel(node, "新label值");
}

var neusoft = new unieap.ds.DataStore('neusoft_store', [{
    id: '1',
    label: '基础软件',
    parent: '',
    leaf: false
}]);

dataCenter.addDataStore(neusoft);
