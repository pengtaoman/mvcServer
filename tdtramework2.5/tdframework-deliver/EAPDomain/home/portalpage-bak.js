	dojo.require("dijit.dijit");
	dojo.require("dojo.date.locale");
	dojo.require("dojo.cookie");
	dojo.require("dijit.form.CheckBox");
	dojo.require("dijit.form.TextBox");
	dojo.require("dijit.form.Slider");
	dojo.require("dijit.layout.TabContainer");
	dojo.require("dijit.layout.AccordionContainer");
	dojo.require("dijit.layout.BorderContainer");
	dojo.require("dijit.Tooltip");
	dojo.require("dijit.Tree");
	dojo.require("dijit.tree.ForestStoreModel");
	dojo.require("dojox.image.Gallery");
	dojo.require("dojox.widget.PlaceholderMenuItem");
	dojo.require("dojox.data.FileStore");
	dojo.require("dojox.charting.widget.Chart2D");
	dojo.require("dojox.charting.themes.Grasslands");
	dojo.require("dojox.charting.themes.PlotKit.orange");
	dojo.require("dojox.widget.Calendar");
	dojo.require("dojox.widget.Portlet");
	dojo.require("dojox.layout.GridContainer");
	dojo.require("dojox.layout.TableContainer");
	dojo.require("dojox.grid.DataGrid");
	dojo.require("dojox.data.HtmlStore");
	dojo.require("dojox.data.FlickrRestStore");
	dojo.require("dojox.fx.text");
	dojo.require("dojox.layout.ExpandoPane");
	dojo.require("dojox.charting.action2d.Highlight");
	dojo.require("dojox.charting.action2d.MoveSlice");
	dojo.require("dojox.charting.action2d.Tooltip");
var ModTreeClass = function(){
		
	var APP_PATH = getcontext();
	var Me=this;
	
//	var splitTitle = "___"
	Me.menuInfoJson=null;
	Me.containerColumn = 2;
	Me.subscribeHandles = [];
	
	Me.tempPortaletShowingMenu = [];
	Me.portaletViews = {};
	
	Me.viewInfoJson = {};
	Me.defaultView ={};
	
	Me.viewsMenuInfoJson = "";
	
	Me.tempJSON ={};
	
//	Me.containerLayout = {"2":["40,60","60,40","30,70","70,30","20,80","80,20"],
//			"3":["30,30,40","30,40,30","40,30,30","25,25,50","25,50,25","50,25,25","20,25,60","20,60,20","60,20,20"],
//			"4":["20,20,20,40","20,20,40,20","20,40,20,20","40,20,20,20",]};
	
	Me.getViewInfo = function(){
		var viewInfo;
		dojo.rawXhrPost({
					url : APP_PATH + "/portalpage.do?actionMethod=getViewForEmployee",
					sync : true,
					load : function(text, args) {
						try {
							viewInfo = dojo.fromJson(text);
						} catch (e) {
							alert("读取Portal信息失败。");
						}
					}
				});
		Me.viewInfoJson = viewInfo;
		if (Me.viewInfoJson.length > 0) {
			for (var i = 0 ; i < Me.viewInfoJson.length; i++) {
				if (Me.viewInfoJson[i]["view_Id"] == Me.viewInfoJson[i]["default_view_Id"]) {
					Me.defaultView = Me.viewInfoJson[i];
					break;
				}
			}
		}
	}
	
	/**
	 * get portal menu URL Infomation
	 * */
//	Me._getMenuInfo = function(){
//	
//	    var menuInfo;
//		dojo.rawXhrPost({
//					url : APP_PATH + "/home/portalpage.do?systemId=80",
//					sync : true,
//					load : function(text, args) {
//						try {
//							//alert(text);
//							menuInfo = dojo.fromJson(text);
//						} catch (e) {
//							alert("读取Portal信息失败。");
//						}
//					}
//				});
//	    //document.writeln("" + dojo.toJson(menuInfo));
//		Me.menuInfoJson = menuInfo;
//		
//		var portaletViewsin = [];
//		for (var i = 0; i < menuInfo.length; i++) {
//			if (portaletViewsin.length == 0 && menuInfo[i]["parentMenuId"] == "") {
//				portaletViewsin[0] = menuInfo[i]["pageKind"];
//			} else {
//				if (menuInfo[i]["parentMenuId"] == "") {
//					var isNotExit = true;
//					for (var j = 0; j < portaletViewsin.length; j++) {
//						if (portaletViewsin[j] == menuInfo[i]["pageKind"]) {
//							isNotExit = false;
//							break;
//						}
//					}
//					if (isNotExit == true) {
//						portaletViewsin[portaletViewsin.length] = menuInfo[i]["pageKind"];
//					}
//				}
//			}
//		}
//		//alert(portaletViewsin);
//		Me.portaletViews = portaletViewsin;
//		//unieap.debug(Me.portaletViews);
//	};
	
	Me.getAllPortalet = function() {
		Me.menuInfoJson = null;
		if (Me.menuInfoJson == null) {
			var menuInfo;
			var viewIds = "";
			for (var i = 0; i < mod.viewInfoJson.length; i++) {
				if (i == 0) {
					viewIds = viewIds + mod.viewInfoJson[i]["view_Id"];
				} else {
					viewIds = viewIds + "~" + mod.viewInfoJson[i]["view_Id"];
				}
			}
			dojo.rawXhrPost({
						url : APP_PATH + "/portalpage.do?actionMethod=getPortaletForView&viewId="+viewIds,
						sync : true,
						load : function(text, args) {
							try {
								//alert(text);
								menuInfo = dojo.fromJson(text);
							} catch (e) {
								alert("读取Portal信息失败。");
							}
						}
					});
		   // document.writeln(dojo.toJson(menuInfo));
			if (menuInfo != null && menuInfo != "") {
				for (var i = 0; i < menuInfo.length; i++) {
					if (menuInfo[i]["f_Page_Link"].indexOf("?") > -1) {
						menuInfo[i]["f_Page_Link"] = menuInfo[i]["f_Page_Link"] + "&" + authQueryStr;
					} else {
						menuInfo[i]["f_Page_Link"] = menuInfo[i]["f_Page_Link"] + "?" + authQueryStr;
					}
				}
			}
			//Me.menuInfoJson = menuInfo;
			Me.tempJSON = menuInfo;
		}
		
	}
	
	
	
	Me.getPortaletForSetting = function() {
	/////////////////////////For SettingPortal///////////////////////////////
		
        var menuInfoClient =new Array();
        var micCount = 0;
        
		for (var i = 0; i < mod.viewInfoJson.length; i++) {
		
			var vid = mod.viewInfoJson[i]["view_Id"];
			//alert(vid);
			//unieap.debug(settingPortalTempStore);
			if (settingPortalTempStore != null && settingPortalTempStore != "" & settingPortalTempStore.get(vid+"tempselect") != null) {
				//unieap.debug(settingPortalTempStore.get(vid+"tempselect"));
				var cookViewMenu = settingPortalTempStore.get(vid+"tempselect")["value"];
				
				var cookMenuHeight = "";
				if (settingPortalTempHeight.get(vid+"tempHeight") != null) {
					cookMenuHeight = settingPortalTempHeight.get(vid+"tempHeight")["value"];
				}
				//unieap.debug(cookViewMenu);
				//unieap.debug(cookMenuHeight);
				for (var j = 0; j < cookViewMenu.length; j++) {
					
					var evaluator = dojox.json.query("?menu_Id='"+ cookViewMenu[j]["menu_Id"] +"'||f_Parent_Menu_Id='"+cookViewMenu[j]["menu_Id"]+"'");
					var menuInfo = evaluator(Me.tempJSON);
					var tempStore = new dojo.store.Memory();
					tempStore.idProperty = "menu_Id";
                    //unieap.debug(menuInfo);
					//alert(menuInfo.length);
					for (var k = 0; k < menuInfo.length; k++) {
						tempStore.put(menuInfo[k]);
					}
					//unieap.debug(tempStore);
					//alert(tempStore["data"].length)
					for (var k = 0; k < tempStore["data"].length; k++) {
						
						var mme = dojo.clone(tempStore["data"][k]);
						if (mme["f_Parent_Menu_Id"] == "") {
							
							var evaluatorHei = dojox.json.query("?menu_Id='"+ mme["menu_Id"] +"'");
							var eleHei = evaluatorHei(cookMenuHeight);
							
							if (eleHei != null && eleHei.length > 0) {
							    mme["f_Height"] = eleHei[0]["f_Height"];
							}
						}
						//alert(mme["f_Height"]);
						mme["view_Id"] = vid;
						menuInfoClient.push(mme);
					}
					
				}
			}
			
		}
		//Me.menuInfoJson = "";
		
		if (menuInfoClient.length > 0) {
			//alert(menuInfoClient.length);
			//document.writeln(dojo.toJson(menuInfoClient));
		    Me.menuInfoJson = menuInfoClient;
		    unieap.debug(Me.menuInfoJson);
		    var evaluatorHei111 = dojox.json.query("?view_Id='v01'&&f_Parent_Menu_Id=''");
		    var evaluatorHei111 = dojox.json.query("?menu_Id='080A'");
			var eleHei111 = evaluatorHei111(Me.menuInfoJson);
			unieap.debug(eleHei111);
		}
	}
	
	/**
	 * crete Portalet in Portal
	 * */
	Me.createPortalet = function(viewId) {
		var portalLayoutJson = {};
		//Me._getAllPortalet();
		Me.getPortaletForSetting();
		
		portalLayoutJson = dojo.fromJson(dojo.cookie("portalLayout_" + employeeid + "_" + viewId));
		//unieap.debug(Me.menuInfoJson);
		var evaluator = dojox.json.query("?view_Id='"+ viewId +"'");
		var menuInfo = evaluator(Me.menuInfoJson);
		//unieap.debug(menuInfo);
		var col = 0;
		var colCount = 0;
		
		for (var i = 0; i < menuInfo.length; i++) {
			var element = menuInfo[i];
			
			if (element["f_Parent_Menu_Id"] == "") {
				var subMenutitle = "";
				var subMebuUrl = element["f_Page_Link"];	
				var subMenuId = element["menu_Id"];
				
				var protalet = new unieap.layout.TitlePane({
					id: element["menu_Id"],
					onCollapse:function(){
						var fbtncc = unieap.byId(this.id+"btn");
						fbtncc.arrowNode.className="iconBtnMax";
						},
					onExpand:function(){
						var fbtn = unieap.byId(this.id+"btn");
						fbtn.arrowNode.className="iconBtnMin";
                        },
					flexible:false
					}, 
					dojo.create("div", {
					id: element["menu_Id"]+"bts",
					innerHTML: "<div align=left type='buttons' id='"+element["menu_Id"]+"buttons01' nowarp><table><tr><td id='"+element["menu_Id"]+"buttonsDrop'></td><td id='"+element["menu_Id"]+"buttons'></td></tr></table></div>"
					    +"<iframe id='"
					    +element["menu_Id"]
					    +"ifm' frameborder=0 width='99%' height='97%'></iframe>"
		        }));
				
				protalet.arrowNode.className="iconPortaletTitle";
				
				var titleHtml = "<img src='" + APP_PATH + element["f_Icon"] + "' width='14' height='14'/>&nbsp;&nbsp;" + element["f_Menu_Name"];
				if (element["f_Detail_Page"] != null && element["f_Detail_Page"] != "") {
					titleHtml = titleHtml + "&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:openDetailPage(\""+ APP_PATH + "/" +element["f_Detail_Page"]+"\")'>[更多...]</a>"
				}
				protalet.titleNode.innerHTML = titleHtml;
				
				if (typeof(element["f_Height"]) != "undefined") {
				    protalet.setHeight(element["f_Height"]);
				}
				
				var container =  dijit.byId("gridContainer");
				//portalLayoutJson = null;
				if (portalLayoutJson != null 
						&& portalLayoutJson != "" 
							&& portalLayoutJson[0]["colsNumber"] == Me.containerColumn) {
				    
					container.setColumns(portalLayoutJson[0]["colsNumber"]);
					for(var plCount = 0; plCount < portalLayoutJson.length; plCount++) {
						if (portalLayoutJson[plCount]["menuId"] == element["menu_Id"]) {
							if (navigator.userAgent.indexOf("Firefox")>0) {
								container.addService(protalet, portalLayoutJson[plCount]["col"]-1, portalLayoutJson[plCount]["row"]);
							} else {
								container.addService(protalet, portalLayoutJson[plCount]["col"], portalLayoutJson[plCount]["row"]);
							}
						    break;
						}
					}
				} 
				else {
					container.setColumns(Me.defaultView["view_Column"]);
					if (colCount < Me.defaultView["view_Column"]) {
						container.addService(protalet, colCount);
						colCount++;
					} else {
						colCount = 0;
						container.addService(protalet, colCount);
						colCount++;
					}
				}
				

				var ifm = dojo.byId(element["menu_Id"]+"ifm");
				//alert(dojo.byId(element["menu_Id"]+"buttons01"));
				ifm.src = subMebuUrl;
				//alert(subMebuUrl);
				var mkey = element["menu_Id"];
				var temPage = {"parentId":mkey,"tempId":mkey};
				Me.tempPortaletShowingMenu[col] = temPage;
				
				col++;
			}
		}
		
		var columnRateCookie =  dojo.cookie("portalContainerColums-"+viewId);
		
		if (columnRateCookie != null) {
			try {
			container.set("colWidths", columnRateCookie);
			} catch (e) {}
		} else {
			//unieap.debug(Me.defaultView["column_Rate"]);
			for (var i = 0 ; i < Me.viewInfoJson.length; i++) {
//				alert(Me.viewInfoJson[i]["view_Id"]);
				if (Me.viewInfoJson[i]["view_Id"] == viewId) {
					try {
						container.set("colWidths", Me.viewInfoJson[i]["column_Rate"]);
					} catch (e) {}
					break;
				}
			}
			
		}
        
		
	};
	
	
	Me.clearPortalContainer = function() {

		var container =  dijit.byId("gridContainer");
		for (var pCol = container.gridNode.childNodes.length -1 ; pCol >=0 ; pCol--) {
			var everyColsPortalets = container.gridNode.childNodes[pCol].childNodes;
			for (var pCount =  everyColsPortalets.length -1 ; pCount >=0; pCount--) {
				var evePo = everyColsPortalets[pCount];
				try {
					
					var dropSelect =  unieap.byId(evePo.id+"Dorp");
					
					dropSelect.destroyRecursive();
				}catch(e){}
				
				var portaletDijit = dijit.byId(evePo.id);
				container.removeChild(portaletDijit);
				portaletDijit.destroyRecursive();
				
				
			}
		}
	}
	
	/**
	 * create Portalet title Bar's right dropdown Menu
	 * */
	Me.createPortaletSubMenu =function() {
		
		var jsoninfo = Me.menuInfoJson;
		var container =  dijit.byId("gridContainer");
		//alert("-------------- " + jsoninfo.length);
		for (var pCol = 0; pCol < container.gridNode.childNodes.length; pCol++) {
			var everyColsPortalets = container.gridNode.childNodes[pCol].childNodes;
			for (var pCount = 0; pCount < everyColsPortalets.length; pCount++) {
				
				
				
				var evePo = everyColsPortalets[pCount];
				var iid = evePo.id + "buttons";
				var iidDrop = evePo.id + "buttonsDrop";
				//var menu = new unieap.menu.Menu({id:evePo.id+"subMenu"});
				var titleSelect = new unieap.form.ComboBox({id:evePo.id+'Dorp',width:150});
				var subMenuNumber = 0;
				var rowset = new unieap.ds.RowSet();
				for (var j = 0; j < jsoninfo.length; j++) {

					if (jsoninfo[j]["f_Parent_Menu_Id"] == evePo.id) {
						var data = {CODEVALUE:jsoninfo[j]["menu_Id"],CODENAME:jsoninfo[j]["f_Menu_Name"]};
						rowset.addRow(data);
						subMenuNumber++;
					}
					
				}

				var fbtnReflesh = new unieap.form.DropDownButton({label:'',iconClass:'iconBtnClose',width:'20',id:evePo.id+'fbtnReflesh'});
				fbtnReflesh.placeAt(iid,"first");
				fbtnReflesh.btnNode.style.display = "none";
				fbtnReflesh.arrowNode.className="iconBtnMin";
				dojo.connect(dojo.byId(evePo.id+'fbtnReflesh'),"onclick",{"pid":evePo.id},toolPortaletReflesh);
				
				
				var fbtn = new unieap.form.DropDownButton({label:'',iconClass:'iconBtnClose',width:'20',id:evePo.id+'btn'});
				fbtn.placeAt(iid,"first");
				fbtn.btnNode.style.display = "none";
				fbtn.arrowNode.className="iconBtnMin";
				dojo.connect(dojo.byId(evePo.id+'btn'),"onclick",{"pid":evePo.id},toolPortaletClick);
				
				var fbtnmw = new unieap.form.DropDownButton({label:'',iconClass:'iconBtnClose',width:'20',id:evePo.id+'btnMw'});
				fbtnmw.placeAt(iid,"last");
				fbtnmw.btnNode.style.display = "none";
				fbtnmw.arrowNode.className="iconBtnMin";
				dojo.connect(dojo.byId(evePo.id+'btnMw'),"onclick",{"pid":evePo.id},toolMaxWindowClick);
				
				var fbtnClose = new unieap.form.DropDownButton({label:'',width:'20',id:evePo.id+'btnClose'});
				fbtnClose.arrowNode.className="iconBtnClose";
				fbtnClose.btnNode.style.display = "none";
				fbtnClose.placeAt(iid,"last");
				dojo.connect(dojo.byId(evePo.id+'btnClose'),"onclick",{"pid":evePo.id},toolClosePortaletClick);
				
			    if (subMenuNumber > 0) {
			    	var ds = new unieap.ds.DataStore("titleSelectDs",[]);
			    	ds.setRowSet(rowset);
			    	titleSelect.getDataProvider().setDataStore(ds);
			    	
			    	titleSelect.placeAt(iidDrop,"first");
			    	
			    	
			    	titleSelect.onChange = function() {
			    		
			    		for (var i = 0; i < Me.menuInfoJson.length; i++) {
			    			var element = Me.menuInfoJson[i];
			    			if (element["menu_Id"] == this.getValue()) {
			    				
			    				for (var j = 0; j < Me.tempPortaletShowingMenu.length; j++) {
			    					if (Me.tempPortaletShowingMenu[j]["parentId"] == element["f_Parent_Menu_Id"]) {
			    						for (var k = 0; k < Me.subscribeHandles.length; k++) {
			    							if (Me.subscribeHandles[k] != null) {
			    							if (Me.subscribeHandles[k].id == Me.tempPortaletShowingMenu[j]["tempId"]+"subHandler") {
			    								    dojo.unsubscribe(Me.subscribeHandles[k]);
			    								    Me.subscribeHandles[k] = null;
			    								
			    								var temPage = {"parentId":element["f_Parent_Menu_Id"],"tempId":element["menu_Id"]};
			    								Me.tempPortaletShowingMenu[i] = temPage;
			    								break;
			    							}
			    							}
			    						}
			    					}
			    				}
			    				
			    				var ifm = dojo.byId(element["f_Parent_Menu_Id"]+"ifm");
			    				//alert(element["f_Page_Link"]);
			    				ifm.src = element["f_Page_Link"];
			    				break;
			    			}
			    		}
			    	};
			    }
			    rowset.reset();
			}
			
		}
	}
	

	/**
	 * Portalet title Bar's right dropdown Menu CLICK Event
	 */
//	Me._subMenuClick = function(ags) {
//		
//		var ifm = dojo.byId(ags["parentMenuId"]+"ifm");
//		//alert(Me.tempPortaletShowingMenu.length);
//		//unieap.debug(Me.subscribeHandles);
//		for(var i = 0; i < Me.tempPortaletShowingMenu.length; i++) {
//			//unieap.debug(Me.tempPortaletShowingMenu[i]);
//			var mkey = ags["parentMenuId"];
//			if (Me.tempPortaletShowingMenu[i]["parentId"] == ags["parentMenuId"] 
//			        &&  Me.tempPortaletShowingMenu[i][mkey] != ags["menuId"]) {
//				for (var j = 0; j < Me.subscribeHandles.length; j++) {
//					if (Me.subscribeHandles[j].id == Me.tempPortaletShowingMenu[i]["tempId"]+"subHandler") {
//						
//						dojo.unsubscribe(Me.subscribeHandles[j]);
//					}
//				}
//				var temPage = {"parentId":mkey,"tempId":ags["menuId"]};
//				Me.tempPortaletShowingMenu[i] = temPage;
//			}
//		}
//		var iportalet = unieap.byId(ags["parentMenuId"]);
//		var titlesub = iportalet.titleNode.innerHTML.split(splitTitle); //= "<img src='"+APP_PATH+"/common/dx20/images/portal_icon.png' width='14' height='14'/>&nbsp;&nbsp;" + element["menuName"] + splitTitle + subMenutitle;
//		//alert(titlesub[0]);
//		iportalet.titleNode.innerHTML = titlesub[0] + splitTitle + ags["menuName"];
//		ifm.src = ags["pageLink"];
//	}
	
	
	/**
	 * unsubscribeAllHandler
	 */
	Me.unsubscribeAllHandler = function(ags) {
		for (var j = 0; j < Me.subscribeHandles.length; j++) {
			if (Me.subscribeHandles[i] != null) {
				dojo.unsubscribe(Me.subscribeHandles[j]);
			}
		}
	}
	
	/**
	 * subscribe portal's layout change topic
	 */
	Me.subscribeLayout = function() {
		var layArr = new Array();
		var container =  dijit.byId("gridContainer");
		var arrCou = 0;
		//alert(container.gridNode.childNodes.length);
		var sel = dojo.byId("viewSel");
		var viewId = sel.options[sel.selectedIndex].value;
		
		var isIe7 = false;
		if(navigator.appName == "Microsoft Internet Explorer")
		 {
		   if(navigator.appVersion.match(/7./i)=='7.')
		   {
			   isIe7 = true;
			   
		   }
		 }
		
		for (var pCol = 0; pCol < container.gridNode.childNodes.length; pCol++) {
			var everyColsPortalets = container.gridNode.childNodes[pCol].childNodes;
			for (var pCount = 0; pCount < everyColsPortalets.length; pCount++) {
				var evePo = everyColsPortalets[pCount];
				//evePo.show();
				var eleLay = {
						"menuId":evePo.id,
						"col":pCol,
						"row":pCount,
						"colsNumber":Me.containerColumn,
						"viewId":viewId
				        };
				layArr[arrCou] = eleLay;
				arrCou++;
				if (isIe7 == true) {
					unieap.byId(evePo.id).toggle();
				    unieap.byId(evePo.id).toggle();
				}
				 
			}
		}
		var layJson = dojo.toJson(layArr);
		//unieap.debug(layJson);
		dojo.cookie("portalLayout_" + employeeid + "_" + viewId, layJson);
	}
	
	///////////////////////////////////////////////////////////////////////////////////////For PortalSetting//////////////////////////
	Me.initSettingInfo = function(viewId,selectedViewId,isSelectedChange) {

		if (isToolDialogOpenned == false || isSelectedChange == true) {
			isToolDialogOpenned = true;
			if (Me.viewsMenuInfoJson == null || Me.viewsMenuInfoJson == "") {
				var viewSelectSet = dojo.byId("viewSelectSet");
				var viewSelectSetMenu = dojo.byId("viewSelectSetMenu");
				viewSelectSet.options.length = 0;
				for (var i = 0; i < Me.viewInfoJson.length; i++) {
					viewSelectSet.add(new Option(mod.viewInfoJson[i]["view_Name"],Me.viewInfoJson[i]["view_Id"]));
					viewSelectSetMenu.add(new Option(mod.viewInfoJson[i]["view_Name"],Me.viewInfoJson[i]["view_Id"]));
				}
				
	            for (var i = 0; i < viewSelectSet.options.length; i++) {
	            	if (viewSelectSet.options[i].value == Me.defaultView["default_view_Id"]) {
						viewSelectSet.options[i].selected="selected";
						viewSelectSetMenu.options[i].selected="selected";
					}
					//alert(viewSelectSet.options[i].value);
					var evaluator = dojox.json.query("?view_Id='"+ viewSelectSet.options[i].value +"'&&f_Parent_Menu_Id=''");
					//unieap.debug(Me.tempJSON);
					var menuInfo = evaluator(Me.tempJSON);
					var returnValue = new Array();
					var returnValueHei = new Array();
					for (var j = 0; j < menuInfo.length; j++) {
						    //alert(menuInfo[j]["menu_Id"]);
							returnValue[j] = {menu_Id:menuInfo[j]["menu_Id"],f_Menu_Name:menuInfo[j]["f_Menu_Name"]};
							var eleHeight = {
									menu_Id:menuInfo[j]["menu_Id"],
									f_Menu_Name:menuInfo[j]["f_Menu_Name"],
									f_Height:menuInfo[j]["f_Height"],
									view_Id:menuInfo[j]["view_Id"]
							}
							returnValueHei[j] = eleHeight;
					}
					
					var returnObj =  {id:viewSelectSet.options[i].value+"tempselect",value:returnValue};
					settingPortalTempStore.put(returnObj);
					//unieap.debug(settingPortalTempStore);			
					var returnObjHei =  {id:viewSelectSet.options[i].value+"tempHeight",value:returnValueHei};
					settingPortalTempHeight.put(returnObjHei);
					
				}
	            //unieap.debug(settingPortalTempStore);
	            
	            if (typeof(dojo.cookie("viewToMenuRela" + employeeid)) != "undefined" && dojo.cookie("viewToMenuRela" + employeeid) != "") {
					
					var cookieDataViewToMenuRela = dojo.fromJson(dojo.cookie("viewToMenuRela" + employeeid));
					//unieap.debug(cookieDataViewToMenuRela);
					settingPortalTempStore = new dojo.store.Memory({
						data: cookieDataViewToMenuRela["data"]
						});
					//unieap.debug(settingPortalTempStore);
					//unieap.debug(settingPortalTempStore.get("v01tempselect"));
				}
				
				if (typeof(dojo.cookie("menuHeightSetting" + employeeid)) != "undefined" && dojo.cookie("menuHeightSetting" + employeeid) != "") {
					
					var cookieviewToMenuRela = dojo.fromJson(dojo.cookie("menuHeightSetting" + employeeid));
					
					settingPortalTempHeight = new dojo.store.Memory({
						data: cookieviewToMenuRela["data"]
						});
					//unieap.debug(settingPortalTempHeight);
				}
	            
	            var evaluator = dojox.json.query("?f_Parent_Menu_Id=''");
				var tempAllMenu = evaluator(Me.tempJSON);
				var memTempStore = new dojo.store.Memory();
				memTempStore.idProperty = "menu_Id";
		        for (var i =0; i < tempAllMenu.length;i++) {
		        	memTempStore.put(tempAllMenu[i]);
		        }
		        Me.viewsMenuInfoJson = memTempStore;
		        Me.generateInputMenu(Me.defaultView["default_view_Id"]);
		        
			}
			
	        var tempMenuIds = new dojo.store.Memory();
			var selectViewsAll = dojo.byId("selectViewsAll");
			selectViewsAll.options.length = 0;
			var currentSelectViewId;
			if (selectedViewId == "") {
				currentSelectViewId= Me.defaultView["default_view_Id"];
			} else {
				currentSelectViewId =selectedViewId;
			}
			var currentPointMenu;
			//unieap.debug(settingPortalTempStore.get(currentSelectViewId+"tempselect"));
			if (settingPortalTempStore.get(currentSelectViewId+"tempselect") == null) {
				
			    currentPointMenu = Me._getPortaletForPointView(currentSelectViewId);
			} else {
				currentPointMenu = settingPortalTempStore.get(currentSelectViewId+"tempselect")["value"];
				//unieap.debug(currentPointMenu);
			}
			
			var selectViewsPoint = dojo.byId("selectViewsPoint");
			selectViewsPoint.options.length = 0;
			for (var j = 0; j < currentPointMenu.length; j++) {
				selectViewsPoint.add(new Option(currentPointMenu[j]["f_Menu_Name"],currentPointMenu[j]["menu_Id"]));
			}
			
			for (var i = 0; i < Me.viewsMenuInfoJson.data.length; i++) {
				var existInCurrent = false;
				for (var j = 0; j < currentPointMenu.length; j++) {
					if (currentPointMenu[j]["menu_Id"] == Me.viewsMenuInfoJson.data[i]["menu_Id"]) {
						existInCurrent = true;
						break;
					} 
				}
				
				if (existInCurrent == false) {
					selectViewsAll.add(new Option(Me.viewsMenuInfoJson.data[i]["f_Menu_Name"],Me.viewsMenuInfoJson.data[i]["menu_Id"]));
				}
				
			}
			tempSettingSelectView = currentSelectViewId;
		}
		//var evaluator = dojox.json.query("?f_Parent_Menu_Id=''");
		//unieap.debug(evaluator(Me.menuInfoJson));
	}
	
	Me.generateInputMenu = function(viewId, isCancle) {
		var tempHeightArr = settingPortalTempHeight.get(tempSettingHeightSelectView +"tempHeight");
		//alert(isCancle);
		if (isCancle && isCancle == true) {
			//doNothing
		} else {
			if (tempHeightArr != null) {
				//unieap.debug(tempHeightArr["value"]);
				for (var i = 0; i < tempHeightArr["value"].length; i++) {
					var settingValue = unieap.byId(tempHeightArr["value"][i]["menu_Id"]+"HeightInput").getValue();
					if (settingValue != tempHeightArr["value"][i]["f_Height"]) {
						dojo.byId("alertDiv").style.display = "block";
			            dojo.byId("settingDiv").style.display = "none";
			            dojo.byId("alertDiv").innerHTML = "<br><br><br><br><br><br><br>您做的设置还没有应用，请在设置页面点击\"应用\"按钮或\"取消\"按钮。<br><br><br><br><div align=center><input type=button value='    确定    ' onclick='confirmSetting();'></input></div>";
				    	return false;
					}
				}
			}
		}
		for (var i = 0; i < Me.viewsMenuInfoJson.data.length; i++) {
			try {
				var existedCon = dijit.byId(Me.viewsMenuInfoJson.data[i]["menu_Id"]+"HeightInput");
				existedCon.destroyRecursive();
			} catch (e) {
			}
		}
		dojo.byId("settingPortaletHeightTd").innerHTML = "";
		var menuInfoForPointView = Me._getPortaletForPointView(viewId);
		//unieap.debug(settingPortalTempHeight.get(viewId+"tempHeight"));
		if (settingPortalTempHeight.get(viewId+"tempHeight") != null) {
			menuInfoForPointView = settingPortalTempHeight.get(viewId+"tempHeight")["value"];
		}
		if (menuInfoForPointView != null && menuInfoForPointView !="") {
			
			var returnValue = new Array();
			
			var htmlStr = "<table style='width:100%;border:0px solid #86b5e4'>";
			for (var i = 0 ; i < menuInfoForPointView.length; i++) {
				//htmlStr = htmlStr + "<tr><td>"+menuInfoForPointView[i]["f_Menu_Name"]+"(高度):</td><td><input type=text id='"+menuInfoForPointView[i]["menu_Id"]+"' value='"+menuInfoForPointView[i]["f_Height"]+"'/>px</td></tr>"
				
				htmlStr = htmlStr + "<tr><td>"+menuInfoForPointView[i]["f_Menu_Name"]+"(高度):</td><td id='td"+menuInfoForPointView[i]["menu_Id"]+"'></td></tr>";
			}
			htmlStr= htmlStr + "</table>"
			dojo.byId("settingPortaletHeightTd").innerHTML = htmlStr;
			for (var i = 0 ; i < menuInfoForPointView.length; i++) {
				var inputCon = new unieap.form.TextBox({id:menuInfoForPointView[i]["menu_Id"]+"HeightInput",maxLength:3,inputFilter:{filterRule:/[0-9]/}});
				//inputCon.inputFilter='{filterRule:/[0-9]/}';
				inputCon.setValue(menuInfoForPointView[i]["f_Height"]);
				inputCon.placeAt("td"+menuInfoForPointView[i]["menu_Id"]);
				var eleHeight = {
						menu_Id:menuInfoForPointView[i]["menu_Id"],
						f_Menu_Name:menuInfoForPointView[i]["f_Menu_Name"],
						f_Height:menuInfoForPointView[i]["f_Height"],
						view_Id:menuInfoForPointView[i]["view_Id"]
				}
				returnValue[i] = eleHeight;
			}
			
			var returnObj =  {id:viewId+"tempHeight",value:returnValue};
			settingPortalTempHeight.put(returnObj);
			//unieap.debug(settingPortalTempHeight);
		}
		tempSettingHeightSelectView = viewId;
	}


	Me._getPortaletForPointView = function(viewId) {
		var pointViewMenu = dojo.cookie("pointViewMenu" + employeeid + "_" + viewId);
		if (pointViewMenu == null || pointViewMenu == "") {
			var evaluator = dojox.json.query("?f_Parent_Menu_Id=''&view_Id='"+viewId+"'");
			pointViewMenu = evaluator(Me.tempJSON);
		} else {
			
		}
		return pointViewMenu;
	}
	
	Me.getMulSelectOptions = function(id) {
		var select = dojo.byId("selectViewsPoint");
		var returnValue = new Array();
		for (var i = 0; i < select.options.length; i++) {
			//if (i == 0) {
				returnValue[i] = {"menu_Id":select.options[i].value,"f_Menu_Name":select.options[i].text};
			//} else {
			//	returnValue = returnValue + "," + 	select.options[i].value;
			//}
		}
		var returnObj =  {id:id+"tempselect",value:returnValue};
		return returnObj;
	}
}



function toolPortaletClick() {
	//alert("1111111111111   " + this["pid"]);
	var polet = unieap.byId(this["pid"]);
	polet.toggle();
	//polet.arrowNode.innerHTML = "<img src='"+APP_PATH+"/common/dx20/images/portal_icon.png' width='20' height='20'/>";
	polet.arrowNode.innerHTML = "";
	polet.arrowNode.className="iconPortaletTitle";
}

function toolPortaletReflesh() {
	
	for (var i = 0; i < mod.subscribeHandles.length; i++) {
		if (mod.subscribeHandles[i] != null) {
			if (this["pid"] + "subHandler" == mod.subscribeHandles[i].id) {
			    	dojo.unsubscribe(mod.subscribeHandles[i]);
			    	mod.subscribeHandles[i]=null;
				
				break;
			}
		}
	}
	for (var i = 0; i < mod.menuInfoJson.length; i++) {
		var element = mod.menuInfoJson[i];
		if (element["menu_Id"] == this["pid"]) {
			var ifm = dojo.byId(element["menu_Id"]+"ifm");
			ifm.src = element["f_Page_Link"];
			var titleSelect = unieap.byId(element["menu_Id"]+"Dorp");
			titleSelect.setText("");
			titleSelect.setValue("");
			break;
		}
	}
}

function toolClosePortaletClick() {
	var polet = unieap.byId(this["pid"]);
	polet.hide();
}

function openDetailPage(urlarg) {
	var dialog = DialogUtil.showDialog({url:urlarg,title:"业务窗口I",height:"600",width:"800",iconCloseComplete: true});
}

function toolMaxWindowClick() {
	//var dialog = DialogUtil.showDialog({url:urlarg,title:"业务窗口I",height:"600",width:"800",iconCloseComplete: true});
	
	//alert(this["pid"]+"Dorp");
	//alert(unieap.byId(this["pid"]+"Dorp").getValue());
	var dorpValue = unieap.byId(this["pid"]+"Dorp").getValue();
	if (dorpValue != null && dorpValue != "") {
		
	} else {
		dorpValue = this["pid"];
	}
	for (var i = 0; i < mod.menuInfoJson.length; i++) {
		var element = mod.menuInfoJson[i];
		if (element["menu_Id"] == dorpValue) {
			var iurl = element["f_Page_Link"];
			var iname = element["f_Menu_Name"];
			alert(iurl);
			var dialog = DialogUtil.showDialog({url:iurl,title:iname,height:"600",width:"800",iconCloseComplete: true});
			break;
		}
	}
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