var rowsetDataForLazyLoad = [
         					 {id:'1001',label:"节点",parentID:"",index:"8"},
         					 {id:'10011',label:"10011",parentID:"1001",index:"0"},
         					 {id:'1002',label:"1002",parentID:"",index:"1"},
         					 {id:'10012',label:"10012",parentID:"1002",index:"1"},
         					 {id:'10013',label:"10013",parentID:"1002",index:"3"},
         					 {id:'10014',label:"10014",parentID:"1002",index:"2"},
         					 {id:'100141',label:"100141",parentID:"10014",index:"1"},
         					 {id:'100142',label:"100142",parentID:"10014",index:"0"},
         					 {id:'10015',label:"10015",parentID:"1002",index:"0"},
         					 {id:'1006',label:"节点6",parentID:"",index:"2"},
         					 {id:'1007',label:"节点7",parentID:"",index:"3"}
        				   ];
var treeStoreForLazyLoad = new unieap.ds.DataStore("lazyload",rowsetDataForLazyLoad);
if (!dataCenter) {
	var dataCenter = new unieap.ds.DataCenter();
		dataCenter.addDataStore(treeStoreForLazyLoad);
}

var test1 = {
	id: "attributeRowSet",
	title: '属性',
	init: test1init,
	test: []
}
test = [];
test.push(test1);	
function test1init(){
	var c = new unieap.tree.Tree({label:"UniEAP",id:'lazyLoadTree',loader:{'url':'RowSetData.json',onBeforeLoad : beforeLoad},binding:{'store':treeStoreForLazyLoad,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:''}}});
    dojo.place(c.domNode, dojo.byId('attributeWidgetRowSet'), 'first')
}
function test1clear(){
    dojo.forEach(dijit.findWidgets(dojo.byId('attributeWidgetRowSet')), function(w){
        w.destroy && w.destroy();
    })
    dojo.empty(dojo.byId('attributeWidgetRowSet'));
}

function beforeLoad(item){
	if(this.widget.getBinding().getId(item)!='1007'){
		return false;
	}
}