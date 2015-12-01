
dojo.addOnLoad(function(){
    dp.SyntaxHighlighter.HighlightAll('code');
});
var rowsetDataForLazyLoad = [{
    id: '1001',
    label: "01",
    parentID: "",
    index: "8",
    leaf: false
}, {
    id: '1002',
    label: "02",
    parentID: "",
    index: "1",
    leaf: false
}, {
    id: '1006',
    label: "03",
    parentID: "",
    index: "2",
    leaf: false
}, {
    id: '1007',
    label: "04",
    parentID: "",
    index: "3",
    leaf: true
}];
var treeStoreForLazyLoad = new unieap.ds.DataStore("lazyload", rowsetDataForLazyLoad);
dataCenter.addDataStore(treeStoreForLazyLoad);

function beforeLoad(item){
    var id = this.widget.getBinding().getId(item);
    alert("loading data for " + id);
    return true;
}
