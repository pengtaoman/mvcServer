//var APP_PATH = document.getElementsByTagName("contextPath")[0].value;
dojo.require("dojo.io.script");
var APP_PATH = getcontext();
//alert("??????0002 : " + APP_PATH);
//收藏夹链接的首个占位符的宽度，现在使用一个空格占位，宽度设为
var favoriteLinkFristWidth = 12;
//收藏夹位置的下拉按钮的宽度
var favoriteDropDownImgWidth = 12;
//收藏夹链接的每个字符的宽度
var favoriteCharWidth = 13;

function fireAddTab() {
    
}
function initTab(){
	// var sunframe = document.getElementById("subframe").contentWindow;
	// var sysNaviDiv = sunframe.dojo.byId("sysNaviDiv");
	// if (sysNaviDiv && sysNaviDiv != null) {
		
	// } else {
	//	 sunframe.createTab();
	// }
	//addFristPageTab();

}

function addFristPageTab() {
	
	//var firstPageUri = APP_PATH + "/home/portalpage.jsp";
	var firstPageUri = APP_PATH + "/home/portalpage.jsp";
	//var firstPageUri = APP_PATH + "/home/homepage.do?systemId=80";
	document.getElementById("subframe").contentWindow.addTab('首页',firstPageUri,"NOFAVO01","S9",1);
	//document.frames("subframe").addTab('首页',firstPageUri,"NOFAVO01","S9");

}

function selCity(selfCityCode) {
	var citylst = null;
	dojo.rawXhrPost({
				url : APP_PATH + "/login.do?method=getMoreCity",
				//parameters:{j_username: "SUPER", j_password: "super0"},
				sync : false,
				load : function(text, args) {
					try {
					    if (text && text !="") {
						    citylst = eval("(" + text + ")");
							var opStr = "<table border=0 cellspacing=0 cellpadding=0>";
							for (var i = 0; i < citylst.length; i++) {
								if (citylst[i]["id"] == selfCityCode) {
									if (citylst.length > 1) {
										dojo.byId("selfCityDiv").innerHTML = "<a href='javascript:selectCity();'>" + citylst[i]["name"] + "</a>";
										if (i%2 == 0) {
										    opStr = opStr + "<tr><td height=20><a href='#' onclick='javascript:changeCity(\""+citylst[i]["id"]+"\",\""+citylst[i]["name"]+"\")'>"+ citylst[i]["name"] + "</a></td>";
										} else {
											opStr = opStr + "<td height=20><a href='#' onclick='javascript:changeCity(\""+citylst[i]["id"]+"\",\""+citylst[i]["name"]+"\")'>"+ citylst[i]["name"] + "</a></td></tr>";
										}
									} else {
										dojo.byId("selfCityDiv").innerHTML = citylst[i]["name"];
									}
								} else {
									if (citylst.length > 1) {
										if (i%2 == 0) {
									        opStr = opStr + "<tr><td height=20><a href='#' onclick='javascript:changeCity(\""+citylst[i]["id"]+"\",\""+citylst[i]["name"]+"\")'>"+ citylst[i]["name"] + "</a></td>";
										} else {
											 opStr = opStr + "<td height=20><a href='#' onclick='javascript:changeCity(\""+citylst[i]["id"]+"\",\""+citylst[i]["name"]+"\")'>"+ citylst[i]["name"] + "</a></td></tr>";
										}
									}
								}
							}
							opStr = opStr + "</table>";
							if (opStr != "") {
								dojo.byId("cityOption").innerHTML = opStr;
							}
						}
					} catch (e) {
						alert("初始化系统失败。" + e );
					}
				}
			});
}

function changeUserCity(selfCityCode) {
    //alert(selfCityCode);
	var citylst = changeUserCityLst;
    dojo.byId("selfCityDiv").innerHTML = "<a href='javascript:selectCity();'>切换地市</a>";
	if (citylst != null ) {
		var opStr = "<table border=0 cellspacing=0 cellpadding=0>";
		for (var i = 0; i < citylst.length; i++) {
			//if (citylst[i]["cityCode"] == selfCityCode) {
				if (citylst.length > 1) {
					//
					if (i%2 == 0) {
					    opStr = opStr + "<tr><td height=20><a href='#' onclick='javascript:changeUser(\""+citylst[i]["dsWorkNo"]+"\",\""+citylst[i]["pwd"]+"\")'>"+ citylst[i]["areaName"] + "</a></td>";
					} else {
						opStr = opStr + "<td height=20><a href='#' onclick='javascript:changeUser(\""+citylst[i]["dsWorkNo"]+"\",\""+citylst[i]["pwd"]+"\")'>"+ citylst[i]["areaName"] + "</a></td></tr>";
					}
				} else {
					opStr = opStr + "<td height=20><a href='#' onclick='javascript:changeUser(\""+citylst[i]["dsWorkNo"]+"\",\""+citylst[i]["pwd"]+"\")'>"+ citylst[i]["areaName"] + "</a></td></tr>";
				}
			//} else {
			//	if (citylst.length > 1) {
			//		if (i%2 == 0) {
			///	        opStr = opStr + "<tr><td height=20><a href='#' onclick='javascript:changeUser(\""+citylst[i]["dsWorkNo"]+"\",\""+citylst[i]["pwd"]+"\")'>"+ citylst[i]["areaName"] + "</a></td>";
			//		} else {
			//		    opStr = opStr + "<td height=20><a href='#' onclick='javascript:changeUser(\""+citylst[i]["dsWorkNo"]+"\",\""+citylst[i]["pwd"]+"\")'>"+ citylst[i]["areaName"] + "</a></td></tr>";
			//		}
			//	}
			//}
		}
		opStr = opStr + "</table>";
		if (opStr != "") {
			dojo.byId("cityOption").innerHTML = opStr;
		}
	}
}

function selectCity() {
	dojo.byId("citySelContent").style.display = "block";
}


function changeUser(workNo,pwd) {
	
	dojo.rawXhrPost({
		url : APP_PATH + "/login.do?method=changeCityUser&j_username="+workNo+"&j_password="+pwd,
		//parameters:{j_username: "SUPER", j_password: "super0"},
		sync : true,
		load : function(text, args) {
		    if (text == 1) {
		        //alert(APP_PATH+"/j_unieap_security_check.do?j_username="+workNo+"&j_password="+pwd+"&changeCityUser=1");
		    	window.location.href=APP_PATH+"/j_unieap_security_check.do?j_username="+workNo+"&j_password="+pwd+"&changeCityUser=1";
		    	window.location.reload();
		    } else {
		        
		    }
	    }
	});

}

function changeCity(cityCode,cityName,isLogin) {
	/*
	dojo.rawXhrPost({
		url : APP_PATH + "/promptInfoMsgAction.do?method=getContexts",
		//parameters:{j_username: "SUPER", j_password: "super0"},
		sync : false,
		load : function(text, args) {
			
		    if (text) {
		    	var happs = dojo.fromJson(text);
		    	for (var i = 0 ; i < happs.length; i++) {
		    		//alert(happs[i]["appname"]);
					try {
						dojo.rawXhrPost({
							url : happs[i]["appname"] + "promptInfoMsgAction.do?method=setMoreCity&cityCode="+cityCode+"&"+getJsParaAutoPara(),
							appname : happs[i]["appname"],
							sync : false,
							load : function(text, args) {
								try {
									if (text) {
										var response = dojo.fromJson(text);
										console.log("TD Change home city: Context:" + this.appname + "  Response : " + response["status"] + " current home city is:" + response["homecity"]);
									} else {
										console.log("TD Change home city: Context:" + this.appname + "  Response : ERROR.");
									}
								} catch(e) {
									console.log("Ajax ERROR : " + this.appname);
								}
							}
						});
					} catch(e) {
						console.log("changeCity ERROR.");
					}
		    	}
		    }
		  
	});*/
    //home_city_ifm.changeHomeCityCrm1.action="/crm1/promptInfoMsgAction.do?method=setMoreCity&cityCode="+cityCode+"&"+getJsParaAutoPara();
    //home_city_ifm.changeHomeCityCrm1.submit();
	//dojo.byId("selfCityDiv").innerHTML = "<a href='javascript:selectCity();'>" +cityName + "</a>";
	//dojo.byId("citySelContent").style.display = "none";
	document.getElementById("home_city_ifm").src="/crm1/promptInfoMsgAction.do?method=setMoreCity&cityCode="+cityCode+"&"+getJsParaAutoPara();
	dojo.byId("selfCityDiv").innerHTML = "<a href='javascript:selectCity();'>" +cityName + "</a>";
	dojo.byId("citySelContent").style.display = "none";
	if (isLogin && isLogin == "1") {
		
	} else {
		var tc = document.getElementById("subframe").contentWindow.unieap.byId("createTab");
		var contents = tc.getChildren(tc);
		for (var i = 0; i < contents.length; i++) {
			tc.removeChild(contents[i]);
		}
	}
}



//添加收藏夹操作
function doAddFavorite() {

    var favoDivWidth = dojo.byId("favoriteDiv").offsetWidth;
    var mainFrame = document.getElementById("subframe").contentWindow;
	//var mainFrame = document.frames("subframe");
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
	
	if (selectedTab.menuId.indexOf("NOFAVO") != -1) {
		alert("”"+selectedTab.title + "“功能不能添加到收藏夹。");
		return;
	}

	if(selectedTab != null) {
		
		var msg='您是否要将"'+selectedTab.title+'"加入收藏夹?';
		isContinue=confirm(msg);
		
		if (isContinue) {
			
			theResponse = window.showModalDialog(APP_PATH+"/tdframework/favorite/inputWindow.htm",selectedTab.title,'dialogWidth:300px;DialogHeight=150px;status:no');
			if  (theResponse != null && typeof(theResponse) !='undefined' ) {
			
				var favoriteName = theResponse;//selectedTab.title;
				var systemId = selectedTab.systemId;
				
				var postArgs1 = {"operType":"add",
						"menuId": selectedTab.menuId,
						"systemId":systemId,
						"pageLink": selectedTab.href};
				
				var isDBOperSuccess = true;
				if (selectedTab.href != null && selectedTab.menuId != null) {
				jQuery.ajax({
					type : "POST",
					url : APP_PATH + "/FavoriteHandler.do?method=addFavoriteMenu&favoriteName="+favoriteName,
					async : true,
					data:postArgs1,
					success : function(msg) {
						 //alert(msg);
						 if (msg != null && msg.indexOf("SUCCESS")!=-1) {
						 } else {
							 alert("添加收藏夹信息到数据库失败，下次登录时将不会显示该收藏信息，请联系管理员。");
							 isDBOperSuccess = false;
						 }

				           if (isDBOperSuccess) {
								var allFavorite = dojo.query("[id*=spanfavorite]");
								var spanWidth = 0;
				                for (var i = 0; i < allFavorite.length; i++) {
					                spanWidth = spanWidth + allFavorite[i].offsetWidth;
				                }
								var willSpanWidth = spanWidth + selectedTab.title.length*favoriteCharWidth + favoriteLinkFristWidth;
								
								if (willSpanWidth < favoDivWidth - favoriteDropDownImgWidth && unieap.byId("favoDorp") == null) {
									
									dojo.create("span", {id:"spanfavorite"+selectedTab.menuId}, "favoriteDiv", "first");
									
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
									//alert(favoDorp.btnNode.display);
									//dropBtn.btnNode.style.display = "none";
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
									    dropBtn.btnNode.style.display = "none";
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
				});	
			}
			}
		} else {
			
		}
	} 
}

//主页面载入时显示收藏夹的信息
function queryFavorite(){
    //alert("##########################################");
    var favoDivWidth = dojo.byId("favoriteDiv").offsetWidth;
    
	dojo.empty("favoriteDiv");
   

	var widget = dijit.byId("favoDorp");
	if (widget == null) {
    	
    } else {
    	widget.destroyRecursive();
    }

    var resultFavo;
	jQuery.ajax({
		type : "POST",
		url : APP_PATH + "/FavoriteHandler.do?method=getFavoriteMenu",
		async : true,
		success : function(msg) {
			 if (msg != null) {
				 resultFavo = eval("(" + msg + ")");
				    if (resultFavo == null || resultFavo == "") {
				    	return;
				    } 
				    
				    var favoriteSpanWidth = 0;
					for (var i = 0; i < resultFavo.length; i++) {
						
						favoriteSpanWidth = favoriteSpanWidth + resultFavo[i]["favoriteName"].length*favoriteCharWidth + favoriteLinkFristWidth;
						
						if (favoriteSpanWidth < favoDivWidth - favoriteDropDownImgWidth) {
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
							        dropBtn.btnNode.style.display = "none";
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
					
			 } else {
				 return;
			 }
		}
	});	
    

	
	//alert("alert(favoriteSpanWidth); :" + favoriteSpanWidth);
}

//打开收藏夹的链接
function openFavorite(tabTitle, tabHref, menuId, systemId) {
	
	
	var aa = tabHref.indexOf("STAFFNO");
	if (aa > 1) {
	//    tabHref = tabHref.substring(0, aa-1);
	}
	var tabFrame = document.getElementById("subframe").contentWindow;
	//var tabFrame = document.frames("subframe");
	//alert("??????????????????? " + tabHref);
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

