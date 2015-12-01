	dojo.require("dijit.dijit");
	dojo.require("dojo.cookie");
	dojo.require("dijit.layout.TabContainer");
	dojo.require("dijit.layout.AccordionContainer");
	dojo.require("dijit.layout.BorderContainer");
	dojo.require("dijit.Tooltip");
	dojo.require("dijit.Tree");
	dojo.require("dojox.widget.Portlet");
	dojo.require("dojox.layout.GridContainer");
	dojo.require("dojox.layout.TableContainer");
	dojo.require("dojox.grid.DataGrid");
var ModTreeClass = function(){
		
	var APP_PATH = getcontext();
	var Me=this;
	
	Me.menuInfoJson=null;
	Me.containerColumn = 2;
	Me.subscribeHandles = [];
	Me.tempPortaletShowingMenu = [];
	Me.portaletViews = {};
	Me.viewInfoJson = {};
	Me.defaultView ={};
	Me.viewsMenuInfoJson = "";
	Me.tempJSON ={};
	Me.getViewInfo = function(){
		try {
		var viewInfo;
		dojo.rawXhrPost({
					url : APP_PATH + "/portalpage.do?actionMethod=getViewForEmployee",
					sync : false,
					load : function(text, args) {
						try {
							viewInfo = dojo.fromJson(text);
							Me.viewInfoJson = viewInfo;
							if (Me.viewInfoJson.length > 0) {
								for (var i = 0 ; i < Me.viewInfoJson.length; i++) {
									if (Me.viewInfoJson[i]["view_Id"] == Me.viewInfoJson[i]["default_view_Id"]) {
										Me.defaultView = Me.viewInfoJson[i];
										break;
									}
								}
							}
							
							var viewIds = "";
							try {
							for (var i = 0; i < Me.viewInfoJson.length; i++) {
								if (i == 0) {
									viewIds = viewIds + Me.viewInfoJson[i]["view_Id"];
								} else {
									viewIds = viewIds + "~" + Me.viewInfoJson[i]["view_Id"];
								}
							}
							}
							catch(e) {
								
							}
							
							Me.getAllPortalet();
							

						} catch (e) {
							alert("读取Portal信息失败。");
						}
					}
				});

		} catch(e) {
			
		}
	};
	
	Me.getAllPortalet = function() {
		try {
		Me.menuInfoJson = null;
		if (Me.menuInfoJson == null) {
			var menuInfo;
			var viewIds = "";
			for (var i = 0; i < Me.viewInfoJson.length; i++) {
				if (i == 0) {
					viewIds = viewIds + Me.viewInfoJson[i]["view_Id"];
				} else {
					viewIds = viewIds + "~" + Me.viewInfoJson[i]["view_Id"];
				}
			}
			dojo.rawXhrPost({
						url : APP_PATH + "/portalpage.do?actionMethod=getPortaletForView&viewId="+viewIds,
						sync : false,
						load : function(text, args) {
							try {
								menuInfo = dojo.fromJson(text);
								Me.tempJSON = menuInfo;
								Me.initSettingInfo(viewIds, "", false);
							}
							catch(e) {
							}
							
							if (menuInfo != null && menuInfo != "") {
								for (var i = 0; i < menuInfo.length; i++) {
									if (menuInfo[i]["f_Page_Link"].indexOf("?") > -1) {
										menuInfo[i]["f_Page_Link"] = menuInfo[i]["f_Page_Link"] + "&" + authQueryStr;
									} else {
										menuInfo[i]["f_Page_Link"] = menuInfo[i]["f_Page_Link"] + "?" + authQueryStr;
									}
								}
							}
							var viewSel = dojo.byId("viewSel");
							try{
							    viewSel.options.length = 0;
							    try {
									for (var i = 0; i < Me.viewInfoJson.length; i++) {
										viewSel.add(new Option(Me.viewInfoJson[i]["view_Name"],Me.viewInfoJson[i]["view_Id"]));
									}
								}
								catch(e) {
								}
								
								for (var i = 0; i < viewSel.options.length; i++) {
									if (viewSel.options[i].value == Me.defaultView["default_view_Id"]) {
										viewSel.options[i].selected="selected";
										break;
									}
								}
								Me.createPortalet(Me.defaultView["view_Id"]);
								Me.createPortaletSubMenu();
									
							} catch (e) {
								//alert("读取Portal信息失败。" + e);
							}
						}
					});
			
		}
		} catch (e) {
		}
		
	};
	
	Me.getPortaletForSetting = function() {
		try{
        var menuInfoClient =new Array();
        var micCount = 0;
        
		for (var i = 0; i < Me.viewInfoJson.length; i++) {
		
			var vid = Me.viewInfoJson[i]["view_Id"];
			if (settingPortalTempHeight != null && settingPortalTempHeight != "" & settingPortalTempHeight.get(vid+"tempHeight") != null) {
				if (settingPortalTempHeight.get(vid+"tempHeight") != null) {
					cookMenuHeight = settingPortalTempHeight.get(vid+"tempHeight")["value"];
				}
				for (var j = 0; j < cookMenuHeight.length; j++) {
					
					var evaluator = dojox.json.query("?menu_Id='"+ cookMenuHeight[j]["menu_Id"] +"'||f_Parent_Menu_Id='"+cookMenuHeight[j]["menu_Id"]+"'");
					var menuInfo = evaluator(Me.tempJSON);
					var tempStore = new dojo.store.Memory();
					tempStore.idProperty = "menu_Id";
					for (var k = 0; k < menuInfo.length; k++) {
						tempStore.put(menuInfo[k]);
					}
					for (var k = 0; k < tempStore["data"].length; k++) {
						var mme = dojo.clone(tempStore["data"][k]);
						if (mme["f_Parent_Menu_Id"] == "") {
							var evaluatorHei = dojox.json.query("?menu_Id='"+ mme["menu_Id"] +"'");
							var eleHei = evaluatorHei(cookMenuHeight);
							if (eleHei != null && eleHei.length > 0) {
							    mme["f_Height"] = eleHei[0]["f_Height"];
							}
						}
						mme["view_Id"] = vid;
						menuInfoClient.push(mme);
					}
				}
			}
			
		}
		if (menuInfoClient.length > 0) {
			Me.menuInfoJson = null;
		    Me.menuInfoJson = menuInfoClient;
		}
		} catch(e) {
		}
	};
	
	/**
	 * crete Portalet in Portal
	 * */
	Me.createPortalet = function(viewId) {
		try {
			var portalLayoutJson = {};
			Me.getPortaletForSetting();
			if (dojo.cookie("portalLayout_" + employeeid + "_" + viewId) != null && dojo.cookie("portalLayout_" + employeeid + "_" + viewId) != "") {
				portalLayoutJson = dojo.fromJson(dojo.cookie("portalLayout_" + employeeid + "_" + viewId));
			}
			
			var evaluator = dojox.json.query("?view_Id='"+ viewId +"'");
			var menuInfo = evaluator(Me.menuInfoJson);
			
			var evaluatorSub = dojox.json.query("?f_Parent_Menu_Id=''");
			var menuInfoSub = evaluatorSub(menuInfo);
			
			var col = 0;
			var colCount = 0;
			if (menuInfo != null && menuInfo != "") {
				for (var i = 0; i < menuInfo.length; i++) {
					var element = menuInfo[i];
					
					if (element["f_Parent_Menu_Id"] == "") {
						var subMenutitle = "";
						var subMebuUrl = element["f_Page_Link"];	
						var subMenuId = element["menu_Id"];
						
						var protalet = new unieap.layout.TDPortalTitlePane({
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
							    +"ifm' frameborder=0 width='100%' height='97%'></iframe>"
				        }));
						
						protalet.arrowNode.className="iconPortaletTitle";
						
						var titleHtml = "<table><tr><td>&nbsp;<img src='" + APP_PATH + element["f_Icon"] + "' width='16' height='16'/>&nbsp;</td><td>" + element["f_Menu_Name"];
						if (element["f_Detail_Page"] != null && element["f_Detail_Page"] != "") {
							titleHtml = titleHtml + "&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:openDetailPage(\""+ APP_PATH + "/" +element["f_Detail_Page"]+"\")'>[更多...]</a></td></tr></table>"
						}
						protalet.titleNode.innerHTML = titleHtml;
						var container =  dijit.byId("gridContainer");
						if (portalLayoutJson != null 
								&& portalLayoutJson != "" && portalLayoutJson.length > 0
									&& portalLayoutJson[0]["colsNumber"] == Me.containerColumn) {
						    if (menuInfoSub.length == 1) {
						    	container.setColumns(1);
						    } else {
							    container.setColumns(portalLayoutJson[0]["colsNumber"]);
						    }
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
							if (menuInfoSub.length == 1) {
						    	container.setColumns(1);
						    } else {
						    	container.setColumns(Me.defaultView["view_Column"]);
						    }
							
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
						ifm.src = subMebuUrl;
						var mkey = element["menu_Id"];
						var temPage = {"parentId":mkey,"tempId":mkey};
						Me.tempPortaletShowingMenu[col] = temPage;
						if (typeof(element["f_Height"]) != "undefined" && element["f_Height"] != null && element["f_Height"] !="") {
						    protalet.setHeight(element["f_Height"]);
						    ifm.height=element["f_Height"] - 40;
						} else {
							protalet.setHeight(300);
						    ifm.height="260px";
						}
						col++;
					}
				}
			} else {
				dojo.byId("gridContainer").innerHTML = "您没有可见的主题窗口，请联系系统管理员进行配置。";
				return false;
			}
			var columnRateCookie =  dojo.cookie("portalContainerColums-"+viewId);
			
			if (columnRateCookie != null) {
				try {
					if (menuInfoSub.length == 1) {
				    	container.set("colWidths", "100");
				    } else {
				    	container.set("colWidths", columnRateCookie);
				    }
				
				} catch (e) {}
			} else {
				for (var i = 0 ; i < Me.viewInfoJson.length; i++) {
					if (Me.viewInfoJson[i]["view_Id"] == viewId) {
						try {
							if (menuInfoSub.length == 1) {
						    	container.set("colWidths", "100");
						    } else {
						    	container.set("colWidths", Me.viewInfoJson[i]["column_Rate"]);
						    }
						} catch (e) {}
						break;
					}
				}
			}
	        
		} catch (e) {
			Me.clearPortalContainer();
			dojo.byId("div-wellcome").style.display="block";
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
				fbtnReflesh.arrowNode.className="iconBtnRefleshEvery";
				dojo.connect(dojo.byId(evePo.id+'fbtnReflesh'),"onclick",{"pid":evePo.id},toolPortaletReflesh);
				
				
				var fbtn = new unieap.form.DropDownButton({label:'',iconClass:'iconBtnClose',width:'20',id:evePo.id+'btn'});
				fbtn.placeAt(iid,"first");
				fbtn.btnNode.style.display = "none";
				fbtn.arrowNode.className="iconBtnMin";
				dojo.connect(dojo.byId(evePo.id+'btn'),"onclick",{"pid":evePo.id},toolPortaletClick);
				
				var fbtnmw = new unieap.form.DropDownButton({label:'',iconClass:'iconBtnClose',width:'20',id:evePo.id+'btnMw'});
				fbtnmw.placeAt(iid,"last");
				fbtnmw.btnNode.style.display = "none";
				fbtnmw.arrowNode.className="iconBtnOpenDialog";
				var evaluatorE = dojox.json.query("?menu_Id='"+ evePo.id +"'");
				//unieap.debug(Me.tempJSON);
				var menuInfoE = evaluatorE(Me.menuInfoJson);
				var diaIcon = "";
				if (menuInfoE != null && menuInfoE.length==1) {
					diaIcon =  "<img src='" + APP_PATH + menuInfoE[0]["f_Icon"] + "' width='18' height='18'/>&nbsp;";
				}
				dojo.connect(dojo.byId(evePo.id+'btnMw'),"onclick",{"pid":evePo.id,"icon":diaIcon},toolMaxWindowClick);
				
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
		var sel = dojo.byId("viewSel");
		var viewId = sel.options[sel.selectedIndex].value;
		
		for (var pCol = 0; pCol < container.gridNode.childNodes.length; pCol++) {
			var everyColsPortalets = container.gridNode.childNodes[pCol].childNodes;
			for (var pCount = 0; pCount < everyColsPortalets.length; pCount++) {
				var evePo = everyColsPortalets[pCount];
				var eleLay = {
						"menuId":evePo.id,
						"col":pCol,
						"row":pCount,
						"colsNumber":Me.containerColumn,
						"viewId":viewId
				        };
				layArr[arrCou] = eleLay;
				arrCou++;
				if (navigator.userAgent.indexOf("Firefox")<0) {
					unieap.byId(evePo.id).toggle();
				    unieap.byId(evePo.id).toggle();
				}
				 
			}
		}
		var layJson = dojo.toJson(layArr);
		//unieap.debug(layJson);
		dojo.cookie("portalLayout_" + employeeid + "_" + viewId, layJson);
	}
	
	/*-*/
	Me.initSettingInfo = function(viewId,selectedViewId,isSelectedChange) {
        
		if (isToolDialogOpenned == false || isSelectedChange == true) {
			isToolDialogOpenned = true;
			if (Me.viewsMenuInfoJson == null || Me.viewsMenuInfoJson == "") {
				var viewSelectSetMenu = dojo.byId("viewSelectSetMenu");
				viewSelectSetMenu.options.length = 0;
				for (var i = 0; i < Me.viewInfoJson.length; i++) {
					viewSelectSetMenu.add(new Option(Me.viewInfoJson[i]["view_Name"],Me.viewInfoJson[i]["view_Id"]));
				}
				
	            for (var i = 0; i < viewSelectSetMenu.options.length; i++) {
	            	if (viewSelectSetMenu.options[i].value == Me.defaultView["default_view_Id"]) {
						viewSelectSetMenu.options[i].selected="selected";
					}
					var evaluator = dojox.json.query("?view_Id='"+ viewSelectSetMenu.options[i].value +"'&&f_Parent_Menu_Id=''");

					var menuInfo = evaluator(Me.tempJSON);
					var returnValueHei = new Array();
					for (var j = 0; j < menuInfo.length; j++) {
							var eleHeight = {
									menu_Id:menuInfo[j]["menu_Id"],
									f_Menu_Name:menuInfo[j]["f_Menu_Name"],
									f_Height:menuInfo[j]["f_Height"],
									view_Id:menuInfo[j]["view_Id"]
							}
							returnValueHei[j] = eleHeight;
					}
					
					var returnObjHei =  {id:viewSelectSetMenu.options[i].value+"tempHeight",value:returnValueHei};
					if (settingPortalTempHeight == null) {
						settingPortalTempHeight = new dojo.store.Memory(); 
					}
					settingPortalTempHeight.put(returnObjHei);
					
				}

				if (typeof(dojo.cookie("menuHeightSetting" + employeeid)) != "undefined" && dojo.cookie("menuHeightSetting" + employeeid) != "") {
					
					var cookieviewToMenuRela = dojo.fromJson(dojo.cookie("menuHeightSetting" + employeeid));
					
					settingPortalTempHeight = new dojo.store.Memory({
						data: cookieviewToMenuRela["data"]
						});
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
		}
	}
	
	Me.generateInputMenu = function(viewId, isCancle) {
		var tempHeightArr = null;
		if (settingPortalTempHeight != null) {
			settingPortalTempHeight.get(tempSettingHeightSelectView +"tempHeight");
		}
		if (isCancle && isCancle == true) {
			//doNothing
		} else {
			if (tempHeightArr != null) {
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
				htmlStr = htmlStr + "<tr><td>"+menuInfoForPointView[i]["f_Menu_Name"]+"(高度):</td><td id='td"+menuInfoForPointView[i]["menu_Id"]+"'></td></tr>";
			}
			htmlStr= htmlStr + "</table>"
			dojo.byId("settingPortaletHeightTd").innerHTML = htmlStr;
			for (var i = 0 ; i < menuInfoForPointView.length; i++) {
				var inputCon = new unieap.form.TextBox({id:menuInfoForPointView[i]["menu_Id"]+"HeightInput",maxLength:3,inputFilter:{filterRule:/[0-9]/}});
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
			returnValue[i] = {"menu_Id":select.options[i].value,"f_Menu_Name":select.options[i].text};
		}
		var returnObj =  {id:id+"tempselect",value:returnValue};
		return returnObj;
	}
}



function toolPortaletClick() {
	if (navigator.userAgent.indexOf("Firefox") < 0) {
		var polet = unieap.byId(this["pid"]);
		polet.toggle();
		polet.arrowNode.innerHTML = "";
		polet.arrowNode.className="iconPortaletTitle";
	}
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
			var dialog = DialogUtil.showDialog({url:iurl,title:this["icon"] + iname,height:"600",width:"800",iconCloseComplete: true});
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