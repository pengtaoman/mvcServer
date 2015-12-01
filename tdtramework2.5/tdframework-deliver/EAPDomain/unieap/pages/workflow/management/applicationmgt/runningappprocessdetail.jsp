 <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html>
    <head>
        <meta content="text/html; charset=UTF-8" http-equiv="Content-Type"></meta>
        <title>异常应用程序管理</title>
		<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
		<script type="text/javascript">
			unieap.WEB_APP_NAME = "<%=path%>";
			var ds;
			function init(){
				ds = new unieap.ds.DataStore("processStore");
				ds.setPageSize(16);
				dataCenter.addDataStore(ds);
			}
			
			init();
			
			function query(){
				var dc = new unieap.ds.DataCenter();
				var ds=dataCenter.getDataStore("processStore");
				ds=ds.collect('none');
				dc.addDataStore(ds);
				var ddc=unieap.Action.requestData({
						url:unieap.WEB_APP_NAME+ '/LoadErrorApps.do?method=loadRunningApps&type=<%=request.getParameter("type")%>',
						sync:true,
						parameters:{procInstID:'<%=request.getParameter("procInstID")%>'},
						load:function(dc,ds){
						}
					},dc);
				dataCenter.addDataStore(ddc.getDataStore("processStore"));
			}
			
			query();
			
			function doReset(){
	            	var id = "";
	            	var index = grid.getManager("SelectionManager").getSelectedRowIndexs();
	            	if (index.length > 0 && (window.confirm("您将恢复当前应用程序，确认恢复？"))==true){
	            	id = grid.getBinding().getRowSet().getRow(index[0]).getItemValue("groupID");
	            	unieap.Action.requestData({
							url:unieap.WEB_APP_NAME+ "/errorAppMgr.do?method=resetErrorApp",
							parameters:{selectedID:id,type:"groupID",state:"running"},
							sync:true
						});
					query();
					grid.getBinding().setDataStore(dataCenter.getDataStore("processStore"));
					grid.refresh();
				}
				else{
					return;
				}
            }
            
            function doRefresh(){
				query();
				grid.getBinding().setDataStore(dataCenter.getDataStore("processStore"));
				grid.refresh();
			}
			
			 function showException(cell,inRowIndex){
		    	var node= document.createElement('p');
		    	var browser = navigator.userAgent.toLowerCase();
		    	if(cell.label=="异常信息"){
			    	if(browser.indexOf("firefox") != -1){
			    		node.textContent=grid.getBinding().getRowSet().getRow(inRowIndex).getItemValue("exception");
			    	}else{
			    		node.innerText=grid.getBinding().getRowSet().getRow(inRowIndex).getItemValue("exception");
			    	}
			    	var dialog = new unieap.dialog.Dialog({title:'异常信息',inner:node});
			    	dialog.show(grid.getManager("ViewManager").getCellNode("exception",inRowIndex));
		    	}
		    }
            
            function doDelete(){
	            	var id = "";
	            	var index = grid.getManager("SelectionManager").getSelectedRowIndexs();
	            	if (index.length > 0 && (window.confirm("您将删除当前应用程序，确认删除？"))==true){
	            	id = grid.getBinding().getRowSet().getRow(index[0]).getItemValue("groupID");
	            	unieap.Action.requestData({
							url:unieap.WEB_APP_NAME+ "/errorAppMgr.do?method=deleteErrorApp",
							parameters:{selectedID:id,type:"groupID",state:"running"},
							sync:true
						});
					query();
					grid.getBinding().setDataStore(dataCenter.getDataStore("processStore"));
					grid.refresh();
				}
				else{
					return;
				}
            }
            
			
			dojo.addOnLoad(function(){
				document.body.style.visibility = "visible";
				grid.getBinding().setDataStore(dataCenter.getDataStore("processStore"));
			});
		</script>
    </head>
    <body class="unieap" style="visibility:hidden;">
		<div id="grid" jsId="grid" dojoType="unieap.grid.Grid" width="100%" height="500px"
					selection="{selectType:'m'}"
					views="{rowNumber:true,rowBar:true,orderType:'client',onCellClick:showException}"
					unitedCell="{unite:['procName','instName']}">
					<fixed>
						<cell width="150px" label="流程名称" name="procName" styles="text-align:center"></cell>
					</fixed>
					<header>
						<cell width="100px" label="消息来源名称" name="instName" styles="text-align:center"></cell>
						<cell width="100px" label="消息来源操作" name="event_id" styles="text-align:center"></cell>
						<cell width="75px" label="处理状态" name="state" styles="text-align:center"></cell>
						<cell width="75px" label="重试次数" name="retries" styles="text-align:center"></cell>
						<cell width="150px" label="加锁时间" name="locktime" styles="text-align:center"></cell>
						<cell width="200px" label="标识" name="groupID" styles="text-align:center"></cell>
						<cell width="200px" label="运行时间(秒)" name="runningTime" styles="text-align:center"></cell>
					</header>
					 <toolbar paging="{parameters:{procInstID:'<%=request.getParameter("procInstID")%>','type':'<%=request.getParameter("type")%>'},url:'/LoadErrorApps.do?method=loadRunningApps'}">
		            	<button dojoType="unieap.form.Button" label=" 删除 " onClick="doDelete()"></button>&nbsp;
		            	<button dojoType="unieap.form.Button" label=" 恢复 " onClick="doReset()"></button>&nbsp;
		            	<button dojoType="unieap.form.Button" label=" 刷新 " onClick="doRefresh()"></button>
		            </toolbar> 
		</div>
		</body>
</html>