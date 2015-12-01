var APP_PATH = document.getElementsByTagName("contextPath")[0].value;

var favoMaxShowNum = 5;

function fireAddTab() {
    
	document.frames("subframe").frames("subframe").addTab();
}
function initTab(){
	//alert("11111");
	document.frames("subframe").frames("subframe").createTab();
}


//添加收藏夹操作
function doAddFavorite() {

	var mainFrame = document.frames("subframe").frames("subframe");
	var selectedTab = mainFrame.getSelectTab();
	
	if (selectedTab == null) {
		alert("请打开功能操作页面进行收藏。");
		return;
	}
	
	//判断在收藏夹下拉菜单中是否存在相同的收藏项目
	var isFavoToMenu = false;
	var MenuFavo = unieap.byId("favoMenu");
	
	if(MenuFavo != null) {
		var childItems = MenuFavo.getChildren();
		for (var i = 0; i < childItems.length; i++) {
			var childItem = childItems[i];
			var childItemMenuId = childItem.menuId;
			if (childItemMenuId == selectedTab.menuId) {
				isFavoToMenu = true;
				break;
			}
		}
	} 
	
	if (dojo.byId("spanfavorite"+selectedTab.menuId) != null || isFavoToMenu) {
		alert("”"+selectedTab.title + "“功能已经添加到收藏夹了，不能重复添加。");
		return;
	}
	
	if (selectedTab.menuId == "UPD99") {
		alert("”"+selectedTab.title + "“功能不能添加到收藏夹。");
		return;
	}

	if(selectedTab != null) {
		
		var msg='您是否要将"'+selectedTab.title+'"加入收藏夹?';
		isContinue=confirm(msg);
		
		if (isContinue) {
			
			theResponse = window.showModalDialog(APP_PATH+"/tdframework/favorite/inputWindow.htm",selectedTab.title,'dialogWidth:300px;DialogHeight=150px;status:no');
			if  (theResponse==null || typeof(theResponse) =='undefined' ) return false;
			
			var favoriteName = theResponse;//selectedTab.title;
			var systemId = selectedTab.systemId;
			
			var postArgs1 = {"operType":"add",
					"menuId": selectedTab.menuId,
					"systemId":systemId,
					"pageLink": selectedTab.href};
			
			jQuery.ajax({
				type : "POST",
				url : APP_PATH + "/FavoriteHandler.do?method=addFavoriteMenu&favoriteName="+favoriteName,
				async : false,
				data:postArgs1,
				success : function(msg) {
					 //alert(msg);
					 if (msg != null && msg.indexOf("SUCCESS")!=-1) {
					 } else {
						 alert("添加收藏夹信息到数据库失败，下次登录时将不会显示该收藏信息，请联系管理员。");
					 }
				}
			});	

    //document.favoForm.operType.value ="add";
	//document.favoForm.menuId.value = selectedTab.menuId;
	//document.favoForm.systemId.value = systemId;
	//document.favoForm.pageLink.value = selectedTab.href;
	//document.favoForm.action = APP_PATH + "/FavoriteHandler.do?method=addFavoriteMenu&favoriteName="+favoriteName;
	//alert(APP_PATH + "/FavoriteHandler.do?method=addFavoriteMenu&favoriteName="+favoriteName);
	//alert(document.favoForm.action);
	//document.favoForm.submit();

			var allFavorite = dojo.query("[id*=spanfavorite]");
			var favoNum = allFavorite.length;
			
			if (favoNum < favoMaxShowNum) {
				
				dojo.create("span", {id:"spanfavorite"+selectedTab.menuId}, "favoriteDiv", "last");
				
				dojo.create("a", 
					{ href: "javascript:openFavorite('"
					        + selectedTab.title
					        + "', '"
					        + selectedTab.href
					        + "', '"
					        + selectedTab.menuId
					        + "', '"
					        + selectedTab.systemId
					        + "');",
					    title:selectedTab.title,  
					    innerHTML: "&nbsp;&nbsp;"
					    	+favoriteName}, 
					"spanfavorite"+selectedTab.menuId, 
					"last");
					alert("增加收藏夹信息成功。");
	
			} else {
				
				var favoDorp = unieap.byId("favoDorp");
				
				if (favoDorp == null) { 
					
					var menu = new unieap.menu.Menu({id:"favoMenu"});
					menu.addChild(new unieap.menu.MenuItem(
							{//id:'menuItemFavo',
							 label:selectedTab.title,
							 onClick:function(e){openFavorite(selectedTab.title,
									 selectedTab.href,
									 selectedTab.menuId,
									 selectedTab.systemId);},
							 menuId:selectedTab.menuId}));
				    var dropBtn=new unieap.form.DropDownButton({label:'',conClass:'newBtn',id:'favoDorp',dropDown:menu});
					dropBtn.placeAt("favoriteDiv");
					
				} else {
					var favoMenu = unieap.byId("favoMenu");
                    var menuItem = new unieap.menu.MenuItem(
							{//id:'menuItemFavo',
							 label:selectedTab.title,
							 onClick:function(e){openFavorite(selectedTab.title,
										 selectedTab.href,
										 selectedTab.menuId,
										 selectedTab.systemId);},
							 menuId:selectedTab.menuId});
                    favoMenu.addChild(menuItem);
				}
                alert("增加收藏夹信息成功。");
			}
			
		}
	} 
}

//主页面载入时显示收藏夹的信息
function queryFavorite(){
    var resultFavo;
	jQuery.ajax({
		type : "POST",
		url : APP_PATH + "/FavoriteHandler.do?method=getFavoriteMenu",
		async : false,
		success : function(msg) {
			 if (msg != null) {
				 resultFavo = eval("(" + msg + ")");
			 } else {
				 return;
			 }
		}
	});	
    
    if (resultFavo == null || resultFavo == "") {
    	return;
    } 
	for (var i = 0; i < resultFavo.length; i++) {
		
		if (i < favoMaxShowNum) {
			dojo.create("span", {id:"spanfavorite"+resultFavo[i]["menuId"]}, "favoriteDiv", "last");
			dojo.create("a", 
					{ href: "javascript:openFavorite('"
					        + resultFavo[i]["favoriteName"]
					        + "', '"
					        + resultFavo[i]["pageLink"]
			                + "', '"
			                + resultFavo[i]["menuId"]
	                        + "', '"
	                        + resultFavo[i]["systemId"]
					        + "');",
					    title:resultFavo[i]["favoriteName"],  
					    innerHTML: "&nbsp;&nbsp;"
					    	+resultFavo[i]["favoriteName"]}, 
					"spanfavorite"+resultFavo[i]["menuId"], 
					"last");
			
	    } else {
	    	
			var menuName = resultFavo[i]["favoriteName"];
			var menuHref = resultFavo[i]["pageLink"];
			var menuId = resultFavo[i]["menuId"];
			var systemId = resultFavo[i]["systemId"];
			 
	    	var favoDorp = unieap.byId("favoDorp");
	    	if (favoDorp == null) {
				var menu = new unieap.menu.Menu({id:"favoMenu"});
				menu.addChild(new unieap.menu.MenuItem(
						{//id:'menuItemFavo',
						 label:menuName ,
						 menuHref:menuHref,
						 menuId:menuId,
						 systemId:systemId,
						 onClick:function(e){openFavorite(this.label,
								 this.menuHref ,
								 this.menuId ,
								 this.systemId );},
						 menuId:menuId }));
			    var dropBtn=new unieap.form.DropDownButton({label:'',conClass:'newBtn',id:'favoDorp',dropDown:menu});
				dropBtn.placeAt("favoriteDiv");
	    	} else {
	    		var favoMenu = unieap.byId("favoMenu");
	    		var menuItem = new unieap.menu.MenuItem(
						{//id:'menuItemFavo',
						 label:menuName ,
						 menuHref:menuHref,
						 menuId:menuId,
						 systemId:systemId,
						 onClick:function(e){
						 	     openFavorite(this.label ,
								 this.menuHref ,
								 this.menuId ,
								 this.systemId );},
						 menuId:menuId });
	    		favoMenu.addChild(menuItem);
	    	}
	    }
	}
}

//打开收藏夹的链接
function openFavorite(tabTitle, tabHref, menuId, systemId) {
	
	var tabFrame = document.frames("subframe").frames("subframe");
	tabFrame.addTab(tabTitle, tabHref, menuId, systemId);
	
}

function getTdTabHeight() {
	return dojo.byId("tdTab").offsetHeight;
}

function allPrpos(obj) { 
    // 用来保存所有的属性名称和值 
    var props = ""; 
    // 开始遍历 
    for(var p in obj){  
        // 方法 
        if(typeof(obj[p])=="function"){  
            obj[p](); 
        }else{  
            // p 为属性名称，obj[p]为对应属性的值 
            props+= p + "=" + obj[p] + "       "; 
        }  
    }  
    // 最后显示所有的属性 
    alert( props);
}

