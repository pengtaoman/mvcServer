<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@page import="java.util.ArrayList"%>
<%@ page contentType="text/html; charset=UTF-8"%>

<%
String https = (String)request.getAttribute("httpWars");
ArrayList<String> httpLst = (ArrayList<String>)request.getAttribute("httpWarsLst");
String webpath= request.getContextPath();
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</meta>

<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
		<%@ include file="/tdframework/scheduler/commonHead.jsp" %>
<contextPath value="<%=path%>" />
<script language="javascript" src="<%=path%>/common/js/td_common.js" ></script>
<script language="javascript" src="<%=path%>/common/js/waitingbar.js" ></script>

<script type="text/javascript">
//dojo.require("dojox.layout.GridContainer");
//dojo.require("dojox.layout.TableContainer");
//dojo.require("dojox.grid.DataGrid");
//dojo.require("dijit.layout.ContentPane");
dojo.require("dojo.io.script");
var gridData = '<%=https%>';
var jsonData = 		dojo.fromJson(gridData);
var gridStore = new unieap.ds.DataStore('grid_data', jsonData);
dataCenter.addDataStore(gridStore);


function getMyDetail (inRowIndex) {

var tabStr = "<table width='100%'><tr><td>asdf</td><td>dddd</td><td>eeee</td><td>bbbbb</td></tr><tr><td>asdf</td><td>dddd</td><td>eeee</td><td>bbbbb</td></tr><tr><td>asdf</td><td>dddd</td><td>eeee</td><td>bbbbb</td></tr></table>";

var spand = dojo.create("span",{id:"span000"+inRowIndex,innerHTML:tabStr});

return spand;

}

function buildStructure() {
	var fixed={noscroll: true};
	fixed["rows"] = buildFixedRows();
	var header={};
	header["rows"] = buildRows();
	var layout = [fixed, header];
	return layout;
}

function buildFixedRows() {
	var rows = [];
	rows.push(buildFixedColumns());
	return rows;
}
function buildFixedColumns() {
	var row = [];
	var column = {
		label: "",
		name: "schName",
		width: "0px"
	};
	row.push(column);
	return row;
}
function buildRows() {
	var rows = [];
	rows.push(buildColumns());
	return rows;
}
function buildColumns() {
	var row = [];

	var column = {
			label: "Scheduler名称",
			name: "schName",
			width: "25%"
		};
	row.push(column);
		
	var column = {
		label: "线程数",
		name: "tNumber",
		width: "10%"
	};
	row.push(column);
	
	column = {
		label: "Scheduler开始时间",
		name : "beginTime",
		width : "25%"
	};
	row.push(column);

	column = {
			label: "状态",
			name : "isScheStarted",
			formatter:formatterStatus,
			width : "10%"
		};
	row.push(column);
	
	column = {
			label: "操作",
			name : "schName",
			formatter:formatterOperate,
			width : "20%"
		};
	row.push(column);
	
	return row;
}

function formatterStatus(inValue, inRowIndex) {
	
	//alert(inValue + " ====  " + inRowIndex + "=====" + this);
	if (inValue == "true") {
		return "<font color='green'>运行中</font>";
	} else {
	    return "<font color='red'>停止</font>";
	}
}

function formatterOperate(inValue, inRowIndex) {
	//if (inRowIndex == 1) {unieap.debug(this.grid);}
    
	var rowData = this.grid.binding.rowData[inRowIndex];
	var httpinfo = rowData["httpInfo"];
	var status = rowData["isScheStarted"];
	var scheName = rowData["schName"];
	
	if (status && status == true) {
		//return "<div align='right'><a href='javascript:startUpSche(\""+httpinfo+"\",0,\""+scheName+"\", "+inRowIndex+");'>停止Scheduler</a></div>";
		return "<div align='right'><a href='"+httpinfo+"schedulerMonitorAction.do?method=stopScheduler&scheName="+scheName+"' style='color:red;'>停止Scheduler</a></div>";
	} else {
		var isOtherWarSchedulerStar = isOtherWarSchedulerStarted(scheName, httpinfo);

		if (isOtherWarSchedulerStar != "0") {
			var res = isOtherWarSchedulerStar.split("~");
			return "<font color='green'>节点"+res[1]+"启动中......</font>";
		} else {
		    //return "<div align='left'><a href='javascript:startUpSche(\""+httpinfo+"\",1,\""+scheName+"\", "+inRowIndex+");'>启动Scheduler</a></div>";
			return "<div align='left'><a href='"+httpinfo+"schedulerMonitorAction.do?method=startScheduler&scheName="+scheName+"' style='color:blue;'>启动Scheduler</a></div>";
		}
		
	}
}

function startUpSche(httpinfo, isStart, scheName, rowIndex) {

	
	var stores = dataCenter.getDataStores();
	var store = stores['grid_store_'+httpinfo];
	var rowset = store.getRowSet();
	var row = rowset.getRow(rowIndex);
	if (isStart == 1) {
		for(var i = 0; i < jsonData.length;i++) {
		     var grid = unieap.byId('gridbody'+jsonData[i]);
		     if (grid && grid != null) {
			     var detailMan=grid.getManager("DetailManager");
			     var rowCount = grid.getBinding().getRowCount();
			     for (var j = 0; j < rowCount; j++) {
			    	 detailMan.collapse(j); 
			     }
		     }
		}
		row.setItemValue("isScheStarted", true);
	} else {
		row.setItemValue("isScheStarted", false);
		for(var i = 0; i < jsonData.length;i++) {
			 var grid = unieap.byId('gridbody'+jsonData[i]);
		     if (grid && grid != null) {
		    	 grid.refresh();
		     }
		}
	}
	

}

function isOtherWarSchedulerStarted(scheName, httpWar) {
	var stores = dataCenter.getDataStores();
	//unieap.debug(stores);
	var isOtherSta = "0";
	for (var i = 0 ;i < jsonData.length;i++) {
		if (httpWar && httpWar != jsonData[i]) {
			var flag = "";
			var store = stores['grid_store_'+jsonData[i]];
			//unieap.debug(store);
			if (store && store != null) {
				//alert(httpWar + "----" + jsonData[i] + "----" + scheName);
				var rowset = store.getRowSet();
				rowset.forEach(function(row){
					var scheNameRow = row.getItemValue("schName");

					if (scheNameRow == scheName) {
					    var isStarted = row.getItemValue("isScheStarted");
					    if (isStarted == true) {
					    	var ht = row.getItemValue("httpInfo");
					    	flag = "1~"+ht;
					    }
					}
			    });
			}
			
			if (flag != "") {
				return flag;
			}
		}
	}
	return isOtherSta;
}



for(var i = 0; i < jsonData.length;i++) {
	//alert(jsonData.length + "---" + i);
	//alert(jsonData[i]+"schedulerMonitorAction.do?method=getSchedulers"+last);
	var scheInfo = null;
	var xhrurl = jsonData[i]+"schedulerMonitorAction.do?method=getSchedulers"+last;
		/*
		dojo.rawXhrPost({
			url : jsonData[i]+"schedulerMonitorAction.do?method=getSchedulers"+last,
			sync : true,
			load : function(text, args) {
				try {
					scheInfo = dojo.fromJson(text);
				} catch (e) {
					alert(e);
				}
			}
		});
		*/
		// alert("????????????????????????  " + i);
		dataCenter.setParameter("reqCount",0);
		dojo.io.script.get({
		    url: jsonData[i]+"schedulerMonitorAction.do?method=getSchedulers"+last,
		    jsonp: "callback", //由flickr指定
		    //content: {id: jsonData[i]},
		    
		    timeout: 10000,
			handleAs: "json",
			preventCache: true,
			handle: function(response, ioArgs){
				if(response instanceof Error && response.dojoType == "timeout"){

					dataCenter.setParameter("reqCount",dataCenter.getParameter("reqCount") + 1);
					
				}else{
					var id = response["id"];
			    	var sches = response["sche"];
			    	try {
				    	var gridStore = new unieap.ds.DataStore('grid_store_'+id, sches);
						var rowset = gridStore.getRowSet();
						rowset.forEach(function(row){
							row.setItemValue("httpInfo", id);
						});
					    dataCenter.addDataStore(gridStore);
					    dataCenter.setParameter("reqCount",dataCenter.getParameter("reqCount") + 1);
					    //alert(jsonData.length);
			    	}catch (e) {
			    		dataCenter.setParameter("reqCount",dataCenter.getParameter("reqCount") + 1);
			    		alert(e);
			    	}
			}
			}
		});
	
}
var int_value = setInterval("waiting()",1000);

function waiting() {
	//alert(dataCenter.getParameter("reqCount"));
	if(dataCenter.getParameter("reqCount") == jsonData.length){
    	clearInterval(int_value);
    	WaitingBar.hideMe();
    	for(var i = 0; i < jsonData.length;i++) {
    		var sto = dataCenter.getDataStore('grid_store_'+jsonData[i]);
    		if (sto && sto != null) {
    			//unieap.debug(dataCenter.getDataStore('grid_store_'+jsonData[i]));
    			var vm = {rowNumber: true};
    			var s = buildStructure();
    			var lm = {structure: s};
    			var binding = {store:'grid_store_'+jsonData[i]};
    			var grid = new unieap.grid.Grid({
    				id:'gridbody'+jsonData[i],
    				views: vm,
    				layout: lm,
    				binding: binding,
    				width: '100%',
    				height: '220px',
    				style:"overflow-y:hidden;overflow-x:hidden;",
    				detail:{expandAll:false,getMasterDetail:getMyDetail}
    			});
    	  	   grid.placeAt("div-" + jsonData[i]);
    		} else {
    		  dojo.byId("div-" + jsonData[i]).innerHTML = "服务器可能发生意外了...........";
    	    }
    	}
    } else {
    	//alert(validData + "????????");
    	WaitingBar.setMsg("<font color='red'>正在获取数据，请稍等....</font>");
    	WaitingBar.showMe();
    }
}

    
dojo.addOnLoad(function() {
	
});

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


function getMyDetail (inRowIndex) {
	//	var spand = dojo.create("span",{id:"span000"+inRowIndex});
    var rowData = this.grid.binding.rowData[inRowIndex];
    var job = rowData["jobVoLst"];
    if (job && job != null) {
	    var tabStr = "<table width='100%' style='width:100%;border:2px solid #86b5e4'>";
	    tabStr = tabStr + "<tr><td width='3%'>&nbsp;</td><td width='17%'>JOB名称</td><td width='20%'>JOB group名称</td><td width='60%'>JOB CLASS名称</td></tr>";
	    for (var i = 0; i < job.length; i++) {
	    	tabStr = tabStr + "<tr><td width='3%'>&nbsp;</td><td width='17%'>"+job[i]["jobName"]+"</td><td width='20%'>"+job[i]["jobGroup"]+"</td><td width='60%'>"+job[i]["jobClass"]+"</td></tr>";
	    	var trigger = job[i]["triggerVOLst"];
	    	if (trigger && trigger != null) {
	    		tabStr = tabStr + "<tr><td width='3%'>&nbsp;</td><td colspan=3><table width='100%' style='width:100%;border:2px solid red'>";
	    		tabStr = tabStr + "<tr><td width='20%'>Trigger名称</td><td width='20%'>Trigger group名称</td><td width='30%'>Trigger下次触发时间</td><td width='30%'>Trigger表达式</td></tr>";
		    	for (var j = 0; j < trigger.length; j++) {
		    		tabStr = tabStr + "<tr><td width='20%'>"+trigger[j]["triggerName"]+"</td><td width='20%'>"+trigger[j]["triggerGroupName"]+"</td><td width='30%'>"+trigger[j]["triggernexttime"]+"</td><td width='30%'>"+trigger[j]["cros"]+"</td></tr>";
		    	}
	    	}
	    }
    }
    tabStr = tabStr + "</table>";
	var spand = dojo.create("span",{id:"span-"+rowData["httpInfo"]+"-"+inRowIndex,innerHTML:tabStr});
	return spand;

	}
</script>

</head>
<body class="unieap">

<% for (String httpw : httpLst) {%>
<div dojoType="unieap.layout.TitlePane"  width="100%" title="<%=httpw%>">
<div id="div-<%=httpw %>" ></div>
</div>
<%} %>
</body>
</html>
