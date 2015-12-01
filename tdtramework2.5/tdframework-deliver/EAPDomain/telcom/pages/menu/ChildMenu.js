dojo.require("unieap.rpc");
/**
 * 加载所有一级菜单
 */
function loadMenus(){
	unieap.Action.requestData({
		url : (unieap.WEB_APP_NAME + "/ria_menutree.do?method=getMenus"),
		load : function(dc){
			dataCenter.addDataStore(dc.getDataStore("appTree"));			
			createMenuList();		
		}
	},null,false);
} 
loadMenus();
//当前选中的菜单项
var currentMenuIndex = 0;
//收藏个数
var favoriteCount = 20;

var defaultSelected = true;
/**
 * 构建最下面菜单列表
 */
function createMenuList(){
	
	var store = dataCenter.getDataStore("appTree");
	if(store==null) return;	
	var result = ['<table width="100%" cellspacing="0" cellpadding="0">'];
	store.getRowSet().forEach(function(row,index){
		if(row.getItemValue("chief")=="true"){
			currentMenuIndex = index;
		}	
		result.push('<tr>');
		result.push('<td class="u-ngt-btm" onClick="setCurrentMenu('+index+')">');
		result.push('<div class="');
		result.push(row.getItemValue("logoClass") || 'u-ngt-logo');
		result.push('"></div>');
		result.push('<div class="u-ngt-label">');
		result.push(row.getItemValue("label"));
		result.push('</div>');
		result.push('</td>');
		result.push('</tr>');			
	});
	result.push('</table>');	
	dojo.byId("ngtmenus").innerHTML = result.join("");
	store.getRowSet().insertRow({id:"favorite",label:"历史记录",logoClass:"u-ngt-favorite",rootID:"unieap-favorite"},-1);
	var favoriteStore = new unieap.ds.DataStore("favorite");

//从缓存中获取收藏数据
//	dojo.require("dojo.cookie");
//	if(dojo.cookie.isSupported()){		
//		var obj = dojo.cookie("menufavorite");
//	    obj = dojo.fromJson(obj);
//		if(obj && dojo.isObject(obj)){
//			favoriteStore.getRowSet().addRows(obj);
//		}
//		//页面销毁时将收藏夹里的数据写入cookie
//	    dojo.addOnUnload(function(){
//	    	var favoriteStore =  dataCenter.getDataStore("favorite");
//	    	var str = dojo.toJson(favoriteStore.getRowSet().primary);
//			dojo.cookie("menufavorite",str,{expires: 5});
//	    });
//	}  

	dataCenter.addDataStore(favoriteStore);
	setCurrentMenu(currentMenuIndex);	
}
//选择当前菜单
function setCurrentMenu(rowIndex){
	var orignMenu = dojo.byId("menu".concat(currentMenuIndex));
	if(orignMenu){
		if( rowIndex== currentMenuIndex){
			return;
		}
		dojo.style(orignMenu,"display","none");
	}
	//关闭打开菜单
//	try{
//		parent.middern.closeAll();
//	}catch(e){}

	currentMenuIndex = rowIndex;	
	var currentMenu = dojo.byId("menu".concat(currentMenuIndex));
	var store = dataCenter.getDataStore("appTree");
	var row = store.getRowSet().getRow(rowIndex);
	if(currentMenu){
		 dojo.style(currentMenu,"display","block");
		 defaultSelectedTreeNode(row);
	}else{
		var parentname = row.getItemValue("id");
		//收藏夹操作
		if(dataCenter.getDataStore(parentname)){
			createMenu(row);
			return ;
		}
		//其他菜单
		var dc=unieap.Action.requestData({
			url : (unieap.WEB_APP_NAME + "/ria_menutree.do?method=getChildMenus"),
			parameters:{parentname:parentname},
			load : function(dc){
				dataCenter.addDataStore(dc.getDataStore(parentname));
				createMenu(row);
			}					
		});
	}	
	
}
/**
 * 创建菜单
 */
function createMenu(row){	
	var menu = dojo.create("div",{
		id : "menu".concat(row.getIndex()),
		'class' : "u-ngt-menu"		
	});
	var ngt = dojo.byId("u-navigator");
	ngt.appendChild(menu);
	var result = ['<table class="u-ngt-tab" cellspacing="0" cellpadding="0">'];
	result.push('<tr>');
	result.push('<td class="u-ngt-title">');
	result.push('<div class="');
	result.push(row.getItemValue("logoClass") || 'u-ngt-logo');
	result.push('"></div>');
	result.push('<div class="u-ngt-label">');
	result.push(row.getItemValue("label"));
	result.push('</div>');
	if(row.getIndex()<dataCenter.getDataStore("appTree").getRowSet().getRowCount() -1){
		result.push('<div class="u-ngt-synced" title="关联选中菜单" onClick=synced("');
		result.push('menu'.concat(row.getIndex()).concat('_content'));
		result.push('")></div>');
		result.push('<div class="u-ngt-collapse" title="合拢所有展开菜单" onClick=collapse("');
		result.push('menu'.concat(row.getIndex()).concat('_content'));
		result.push('")></div>');
	}
	else{
		result.push('<div class="u-ngt-clear" title="清除历史记录" onClick=clearFavorite()>&nbsp;</div>');
	}
	result.push('</td>');
	result.push('</tr>');	
	result.push('<tr>');
	result.push('<td><div style=\"overflow:hidden;width:100%;height:100%;position:relative;\">');	
	result.push('<div class="u-ngt-content" style=\"position:absolute;\" id="');
	result.push('menu'.concat(row.getIndex()).concat('_content'));
	result.push('"></div>');
	result.push('</div></td>');	
	result.push('</tr>');	
	result.push('</table>');			
	menu.innerHTML = result.join('');
	var tree = new unieap.tree.Tree({
		binding:{
			'leaf':'leaf',
			'store':dataCenter.getDataStore(row.getItemValue("id")),
			'label':'label',
			'parent':'parentID',
			query:{name:'parentID',relation:'=',value:row.getItemValue("rootID")}
		},onClick: clickNode,onEnterKeyPress:clickNode});
	var node =dojo.byId("menu".concat(row.getIndex()).concat("_content"));
	node.appendChild(tree.domNode);
	defaultSelectedTreeNode(row);
}
//默认选中
function defaultSelectedTreeNode(row){
	if(!defaultSelected) return ;
	var p = dataCenter.getDataStore(row.getItemValue("id")).getRowSet().primary;
	var selectedId = "";
	for(var i=0;i<p.length;i++){
		if(p[i]["leaf"] && p[i]["chief"] == "true"){
			selectedId = p[i]["id"];
			break;
		}
	}
	if(!selectedId){
		for(var i=0;i<p.length;i++){
			if(p[i]["leaf"]){
				selectedId = p[i]["id"];
				break;
			}
		}
	}
	defaultSelected = false;
	setTimeout(function(){
		var node = dojo.byId("menu".concat(row.getIndex()).concat("_content"));
		if(selectedId && node && (node= node.firstChild)){
			var tree = dijit.byNode(node);
			tree.showNodesById(selectedId);
			tree.focusNode(tree.getNodeById(selectedId).domNode);
			clickNode(tree.getNodeById(selectedId));
		}
	},0);
}
/**
 * 点击树节点
 */
function clickNode(treeNode){
	if(!treeNode.isLeaf()){
		return ;
	}
	
	var count = dataCenter.getDataStore("appTree") .getRowSet().getRowCount() -1 ;
	var row = new unieap.ds.Row(null,treeNode.item.data);
	var menuPath = row.getItemValue("location");	
	if(!menuPath || menuPath=="null") {
		return;
	}
	var href = unieap.appPath + "/controller.do?location=" + encodeURIComponent(menuPath);
	var label = row.getItemValue("label");
	var id = row.getItemValue("id");
	var middern = parent.middern;
	try{
		middern.addTab(id,label,href,currentMenuIndex);
	}catch(e){
		 return ;
	}
	
	if( count != currentMenuIndex){
			var frs= dataCenter.getDataStore("favorite").getRowSet();
			var result = frs.getSatisfiedFilterRows({name:"location",relation:"=",value:menuPath});
			if(result.length>0){
				frs.deleteRow(result[0]);
			}
			var data = dojo.clone(row.getData());
			data["parentID"] = "unieap-favorite";
			frs.insertRow(data,0);
			if(frs.getRowCount()>favoriteCount){
				frs.deleteRow(favoriteCount);
			}
			frs["delete"] = [];
			//更新收藏夹得内容
			var node = dojo.byId("menu".concat(count).concat("_content"));
			if(node && (node= node.firstChild)){
				var tree = dijit.byNode(node);
				tree.getRootNode().refresh();
			}
		}		
}
/**
 * 关联右侧选中菜单展开树指定节点
 */
function synced(name){
	var middern = parent.middern;
	try{
		var id = middern.getCurrentMenuId();	
		if(!id ) return ;
		var temp = ("menu"+middern.currentMenuIndex+'_content');
		if(temp!=name){
			setCurrentMenu(middern.currentMenuIndex);
			name = temp;
		}
		var node = dojo.byId(name).firstChild;
		var tree = dijit.byNode(node);
		tree.showNodesById(id);	
	
	}catch(e){
		return;
	}
	
}
/**
 * 合拢展开菜单
 */
function collapse(name){
	var node = dojo.byId(name).firstChild;
	var tree = dijit.byNode(node);
	tree.collapseAllNodes();
}
//原始宽度
var origCols = null;
/**
 * 放大缩小导航条
 */
function zoomNavigator(obj){
	obj.isZoom = !(obj.isZoom || false);
	var prvObj =  dojo.byId("nvgcontenttd");	
	 if(obj.isZoom){ //如果是放大应该缩小操作
	 	var node = parent.document.getElementById("Child");	 	
	 	origCols = node.cols;	 		 	
	 	node.cols = "7,*";	 
	 	dojo.style(prvObj,"visibility","hidden");
	 }
	 else{
	 	var node = parent.document.getElementById("Child");	 	
	 	node.cols = origCols ;		
	 	dojo.style(prvObj,"visibility","visible");
	 }
}
/**
 * 改变导航器宽度大小
 */
function dragNavigator(evt,obj){
	var prvObj = dojo.byId("nvgcontenttd");	
	if(prvObj.style.visibility=="hidden") return;
	var orignX = evt.screenX; 	
	document.onmouseup = function(){
		document.onmousemove = null;
		document.onmouseup = null;			
	}
	document.onmousemove = function(evt){
		var x = (evt || event).screenX ;
		var node = parent.document.getElementById("Child");	 
		var cols =( parseInt(node.cols) + x - orignX) + ",*";	
	 	origCols = node.cols = cols;
	 	orignX = x; 
	}
}
/**
 * 打开收藏夹
 */
function openFavorite(){
	var store = dataCenter.getDataStore("appTree");
	if(store==null) return;	
	var rowIndex = store.getRowSet().getRowCount()- 1;
	setCurrentMenu(rowIndex);
}
/**
 * 打开菜单列表
 */
function openMenus(obj){
	if(obj.className == "u-ngt-display"){		
		obj.className = "u-ngt-close";
		dojo.style(dojo.byId("ngtmenus"),"display","none");
	}
	else{
		obj.className = "u-ngt-display";
		dojo.style(dojo.byId("ngtmenus"),"display","block");
	}
}
function clearFavorite(){
	var count = dataCenter.getDataStore("appTree") .getRowSet().getRowCount() -1;
	var frs= dataCenter.getDataStore("favorite").getRowSet();
	frs.primary = [];
	var node = dojo.byId("menu".concat(count).concat("_content"));
	if(node && (node= node.firstChild)){
		var tree = dijit.byNode(node);
		tree.getRootNode().refresh();
	}
}