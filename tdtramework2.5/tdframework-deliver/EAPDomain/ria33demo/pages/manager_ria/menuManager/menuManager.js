/**
 * 如果往后台传递其他变量参数，可以重新写buliderParams方法,如果服务器为TomCat，那么需要修改服务器配置，否则get提交会把编码变为GBK
 */
//function buliderParams(params,item){	
//	params  = params?params:{};
//    params.node = this.widget.getBinding().getId(item);
//    params.name="噢噢噢";
//    return params;
//}




var selectNodeID; 
/**
 * 如果往后台传递其他变量参数，可以重新写getPostData方法
 */
function getPostData(item){
	var dc = new unieap.ds.DataCenter();	
	var nodeType = item.data.nodeType;

	if(nodeType){		
		dc.setParameter("nodeType",nodeType);	   
    }
    return dc;
}


dojo.addOnLoad(init);

//dojo.addOnUnload(function(){
//	parent.detail.menuInfoForm.clear();
//	parent.detail.menuInfoForm.getBinding().unbind();
//});

//菜单树初始化
function init(){
	
	  menuName.focus();
	  
	  dojo.require("unieap.menu.Menu");
	 
	  //增加右键菜单   
      var pMenu = new unieap.menu.Menu({targetNodeIds:["menuTree"], id:"popupMenu"});
      pMenu.addChild(new unieap.menu.MenuItem({label:"增加菜单", onClick:addMenu}));
	  pMenu.addChild(new unieap.menu.MenuItem({label:"删除菜单", onClick:deleteMenu}));
	  pMenu.addChild(new unieap.menu.MenuItem({label:"菜单上移", onClick:moveUp}));
	  pMenu.addChild(new unieap.menu.MenuItem({label:"菜单下移", onClick:moveDown}));
	  pMenu.startup();
	  pMenu.bindDomNode(menuTree.domNode);
}

function onContextMenu(node){
	//selectNode = node;
	selectNodeID = node.getData().id;
	menuTree.setCurrentNode(node);
	getMenuInfo();

}

//点击树节点时触发的事件
function treeNodeClick(node){
	//debugger;
	//selectNode = node;
	selectNodeID = node.getData().id;
	getMenuInfo();
}

//树展开后事件
function onAfterMenuTreeExpand(node){
	
	if(!node.getData().hasExpand){
		
		node.getData().hasExpand=true;
	}
	
}

//获得菜单信息
function getMenuInfo(){	
	
	var selectNode = menuTree.getNodeById(selectNodeID);
	
	if(selectNode && selectNode.getData().nodeType =="menu"){
	    var appName=selectNode.getData().id.split(":")[0];
		var menuName=selectNode.getData().id.split(":")[1];
		
		unieap.Action.requestData({
			url : (unieap.WEB_APP_NAME +"/ria_menumanager.do?method=getMenuInfo"),
			parameters:{"menuName":menuName,"appName":appName},
			load : function(dc){
				var row = dc.getDataStore("MenuInfoDS").getRowSet().getRow(0);	
				menuInfoForm.getBinding().bind(row);
					
			}
		},null,false);
	}else{
		menuInfoForm.clear();
		menuInfoForm.getBinding().unbind();
	}
	
}

/**
 * 增加菜单
 */
function addMenu(){
	
	var id = new Date().getTime();
	
	var selectNode = menuTree.getNodeById(selectNodeID);
    var parentNode = selectNode;
   
    
    var appName="";
    var parentName="";
    
    if(parentNode.getData().nodeType=="application"){
    	appName = parentNode.getData().id;   	
    	parentName="";
    }else if(parentNode.getData().nodeType=="menu"){
    	appName = parentNode.getData().id.split(":")[0];
    	parentName=parentNode.getData().id.split(":")[1];
    }   
    
    
    unieap.Action.requestData({
			url : (unieap.WEB_APP_NAME +"/ria_menumanager.do?method=addMenus"),
			parameters:{"name":id,"title":id,"appName":appName,"parentName":parentName},
			load : function(dc){
               var detail = dc.getDetail();
               if(detail=="success"){             	
               	 if(parentNode.getData().hasExpand){     
               	 	         	                     	  
	               	  var data = {"id":(appName+":"+id), "label":id,"parentID":parentNode.getData().id,"nodeType":"menu","leaf":true,"hasExpand":true };   
	     			  menuTree.createNode(data,parentNode);  	

	     			  menuTree.expandNode(parentNode);
     			  	  var createNode = menuTree.getNodeById(appName+":"+id);	 
     			      menuTree.setCurrentNode(createNode);
     			      selectNodeID = appName+":"+id;
     			      getMenuInfo(); 
     			          			     	     			   			  
               	  }else{
               	  	
               	  	  menuTree.expandNode(parentNode);
               	  
               	  }
   			  
     			  MessageBox.alert ({
						title:"信息提示框",
						message:"增加菜单成功！",
						icon:"info"
					});
               	  
               	
               }else if(detail=="fail"){
               	    
               	    MessageBox.alert ({
						title:"信息提示框",
						message:"增加菜单失败！",
						icon:"info"
					});
               }
					
			}
	},null,false);
	
	
}

/**
 * 删除菜单
 */
function deleteMenu(){
	
	var selectNode = menuTree.getNodeById(selectNodeID);
	
	if(!selectNode){
       return;
    }else if(selectNode.getData().nodeType=="application"){
    	
        MessageBox.alert ({
			title:"信息提示框",
			message:"不能删除应用节点！",
			icon:"info"
		}); 
    	
    	return;
    }
               
    var appName = selectNode.getData().id.split(":")[0];
    var menuName = selectNode.getData().id.split(":")[1];
    
    unieap.Action.requestData({
			url : (unieap.WEB_APP_NAME +"/ria_menumanager.do?method=delMenu"),
			parameters:{"appName":appName,"menuName":menuName},
			load : function(dc){
               var detail = dc.getDetail();
               if(detail=="success"){  
               	  menuTree.deleteNode(selectNode);                  	        	
     			  
     			  menuInfoForm.getBinding().unbind();
     			  menuInfoForm.clear();
     			  MessageBox.alert ({
						title:"信息提示框",
						message:"菜单删除成功！",
						icon:"info"
				  }); 
				  
				  
     			              	
               }else if(detail=="fail"){
               	  MessageBox.alert ({
						title:"信息提示框",
						message:"菜单删除失败！",
						icon:"info"
					}); 
               }
					
			}
	},null,false);    
}


/**
 * 保存菜单
 */
function saveMenu(){
	
	var selectNode = menuTree.getNodeById(selectNodeID);
	
	var appName = selectNode.getData().id.split(":")[0];
	var oldMenuName = selectNode.getData().id.split(":")[1];

	var ds = menuInfoForm.getBinding().getDataStore(); 
	var dc = new unieap.ds.DataCenter();
	dc.addDataStore(ds);
	
	unieap.Action.requestData({
			url : (unieap.WEB_APP_NAME +"/ria_menumanager.do?method=saveMenu"),
			parameters:{appName:appName,oldMenuName:oldMenuName},
			load : function(datacenter){
				var detail = datacenter.getDetail();
				
				if(detail=="duplicate"){
					MessageBox.alert ({
						title:"信息提示框",
						message:"菜单名称有重复！",
						icon:"info"
					}); 
				}else if(detail=="fail"){
					MessageBox.alert ({
						title:"信息提示框",
						message:"菜单保存失败！",
						icon:"info"
					}); 
				}else{
					var row = datacenter.getDataStore("MenuInfoDS").getRowSet().getRow(0);
					
					menuInfoForm.getBinding().bind(row);
					
					menuTree.getBinding().setLabel(selectNode,row.getItemValue("title"));

					MessageBox.alert ({
						title:"信息提示框",
						message:"菜单保存成功！",
						icon:"info"
					}); 
				}
					
			}
	},dc,false);
	
}

/**
 * 菜单上移
 */
function moveUp(){
	
	var selectNode = menuTree.getNodeById(selectNodeID);
	
	if(selectNode.getData().nodeType == "menu"){
		var appName = selectNode.getData().id.split(":")[0];
		var selectedMenuName = selectNode.getData().id.split(":")[1];
		var parentNode = selectNode.getParent();
		//前一个兄弟节点
		var preNode = selectNode.getPreviousChild();
		
		if(preNode){
			var preMenuName = preNode.getData().id.split(":")[1];
			
			
			unieap.Action.requestData({
				url : (unieap.WEB_APP_NAME +"/ria_menumanager.do?method=moveMenu"),
				parameters:{"appName":appName,"selectedMenuName":selectedMenuName,"targetMenuName":preMenuName},
				load : function(datacenter){
					var text = datacenter.getDetail();
					if(text=="success"){						
						var position = selectNode.getPosition();							
						menuTree.deleteNode(preNode,false);
						
						menuTree.createNode(preNode.getData(),parentNode,position)
						 

						MessageBox.alert ({
							title:"信息提示框",
							message:"上移菜单成功!"
						});
					}else if(text=="fail"){
						MessageBox.alert ({
							title:"信息提示框",
							message:"上移菜单失败!"
						});
					}
						
				}
			},null);
			
			
		}else{
			MessageBox.alert ({
				title:"信息提示框",
				message:"没有可交换的节点！",
				icon:"info"
			}); 
		}
		
		
	}else if(selectNode.getData().nodeType == "application"){
		
		MessageBox.alert ({
			title:"信息提示框",
			message:"应用节点不能移动！",
			icon:"info"
		}); 
		
	}
}

/**
 * 菜单下移
 */
function moveDown(){
	var selectNode = menuTree.getNodeById(selectNodeID);
	
	if(selectNode.getData().nodeType == "menu"){
		
		var appName = selectNode.getData().id.split(":")[0];
		var selectedMenuName = selectNode.getData().id.split(":")[1];
		var parentNode = selectNode.getParent();		
		var nextNode = selectNode.getNextChild();
		
		
		if(nextNode){
			
			var nextMenuName = nextNode.getData().id.split(":")[1];
			
			unieap.Action.requestData({
				url : (unieap.WEB_APP_NAME +"/ria_menumanager.do?method=moveMenu"),
				parameters:{"appName":appName,"selectedMenuName":selectedMenuName,"targetMenuName":nextMenuName},
				load : function(datacenter){
					var text = datacenter.getDetail();
					if(text=="success"){						
						var position = nextNode.getPosition();							
						menuTree.deleteNode(selectNode,false);
						
						menuTree.createNode(selectNode.getData(),parentNode,position)
						 
						MessageBox.alert ({
							title:"信息提示框",
							message:"下移菜单成功!"
						});
					}else if(text=="fail"){
						MessageBox.alert ({
							title:"信息提示框",
							message:"下移菜单失败!"
						});
					}
						
				}
			},null);
			

		}else{
			MessageBox.alert ({
				title:"信息提示框",
				message:"没有可交换的节点！",
				icon:"info"
			}); 
		}
				
	}else if(selectNode.getData().nodeType == "application"){
		
		MessageBox.alert ({
			title:"信息提示框",
			message:"应用节点不能移动！",
			icon:"info"
		}); 
		
	}
}



//=================================================Detail====================================================================



//是否选择了一个菜单节点
function isSelectedNode(){
	var selectNode = menuTree.getNodeById(selectNodeID);
       
    if(selectNode!=null && selectNode.getData().nodeType=="menu"){
    	return true;
    }

    return false;
}

//检查菜单项的正确性
function checkMenuName(){

    if(!menuInfoForm.isModified()){
		MessageBox.alert ({
			title:"信息提示框",
			message:"数据没有发生变化！",
			icon:"info"
		}); 
    	return false;
    }


   
   if (menuName.getValue()==""){		
		MessageBox.alert ({
			title:"信息提示框",
			message:"菜单项名称不能为空！",
			icon:"info"
		}); 
		
		menuName.focus();		
		return false;
   }
   
   if (title.getValue()==""){
		
		MessageBox.alert ({
			title:"信息提示框",
			message:"菜单项标题不能为空！",
			icon:"info"
		}); 
		
		title.focus();		
		return false;
	}
  
  
  	var namevalue = menuName.getValue();
    
    //允许输入的字符
	var allowchars = new Array("a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u"
	,"v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W"
	,"X","Y","Z","1","2","3","4","5","6","7","8","9","0","_");
	var namechar;
    for (var i=0;i<namevalue.length;i++){
        var flag = false;
        namechar = namevalue.substring(i,i+1);
           for (var j=0;j<allowchars.length;j++){
               if (namechar==allowchars[j]){
                  flag = true;
                  break;
               }
            }
           if (!flag){

                MessageBox.alert ({
					title:"信息提示框",
					message:"名称无效！",
					icon:"info"
				}); 
                return false;
           }
   }
   
   return true;
}



//重置菜单信息
function resetMenuInfo(){	
	menuInfoForm.reset();
}

//刷新
function refresh(){
    window.location.href=unieap.WEB_APP_NAME+"/ria_menumanager.do?method=begin";
}

//保存菜单信息
function saveMenuInfo(){

   if(!isSelectedNode()){
	    MessageBox.alert ({
			title:"信息提示框",
			message:"请选择菜单结点！",
			icon:"info"
		}); 
        return ;
   }
   
  
   if(!checkMenuName()){
      return ;
   }
	
	saveMenu();

}