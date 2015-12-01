 <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%String path = request.getContextPath();%>
<html>
    <head>
        <meta content="text/html; charset=UTF-8" http-equiv="Content-Type"></meta>
        <title>异常超时任务管理</title>
		<style type="text/css">
			@import "<%=path%>/unieap/ria3.3/unieap/themes/default/css/unieap-all.css";
		</style>
		<script type="text/javascript" src="<%=path%>/unieap/ria3.3/dojo/dojo.js" djConfig="parseOnLoad: true,locale:'zh'" ></script>
		<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/unieap-all.js" ></script>
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
						url:unieap.WEB_APP_NAME+ '/LoadErrorTimertasks.do?method=loadErrorTimertasks&type=<%=request.getParameter("type")%>',
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
	            	if (index.length > 0 && (window.confirm("您将恢复当前超时任务，确认恢复？"))==true){
	            	id = grid.getBinding().getRowSet().getRow(index[0]).getItemValue("groupID");
	            	unieap.Action.requestData({
							url:unieap.WEB_APP_NAME+ "/errorTimertaskMgr.do?method=resetErrorTimertask",
							parameters:{selectedID:id,type:"groupID",state:"error"},
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
            
            function doDelete(){
	            	var id = "";
	            	var index = grid.getManager("SelectionManager").getSelectedRowIndexs();
	            	if (index.length > 0 && (window.confirm("您将删除当前超时任务，确认删除？"))==true){
	            	id = grid.getBinding().getRowSet().getRow(index[0]).getItemValue("groupID");
	            	unieap.Action.requestData({
							url:unieap.WEB_APP_NAME+ "/errorTimertaskMgr.do?method=deleteErrorTimertask",
							parameters:{selectedID:id,type:"groupID",state:"error"},
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
            
            function showException(cell,inRowIndex){
		    	var node= document.createElement('p');
		    	var browser = navigator.userAgent.toLowerCase();
		    	if(cell.label=="异常信息"){
			    	if(browser.indexOf("firefox") != -1){
			    		node.textContent=grid.getBinding().getRowSet().getRow(inRowIndex).getItemValue("exception");
			    	}else{
			    		node.innerText=grid.getBinding().getRowSet().getRow(inRowIndex).getItemValue("exception");
			    	}
			    	var dialog = DialogUtil.createDialog({title:'异常信息',inner:node});
			    	dialog.show(grid.getManager("ViewManager").getCellNode("exception",inRowIndex));
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
					filter='{}' 
					views="{rowNumber:true,rowBar:true,orderType:'client',onCellClick:showException}"
					unitedCell="{unite:['procName','instName']}">
					<fixed>
						<cell width="150px" label="流程名" name="procName" styles="text-align:center"></cell>
					</fixed>
					<header>
						<cell width="150px" label="实例名" name="instName" styles="text-align:center"></cell>
						<cell width="75px" label="实例状态" name="current_state" styles="text-align:center"></cell>
						<cell width="75px" label="超时类型" name="timer_type" styles="text-align:center"></cell>
						<cell width="100px" label="超时对象类型" name="type" styles="text-align:center"></cell>
						<cell width="100px" label="超时处理状态" name="handlestate" styles="text-align:center"></cell>
						<cell width="75px" label="重试次数" name="retries" styles="text-align:center"></cell>
						<cell width="150px" label="加锁时间" name="locktime" styles="text-align:center"></cell>
						<cell width="200px" label="组标识" name="groupID" styles="text-align:center"></cell>
						<cell width="300px" label="异常信息" name="exception" styles="text-align:center"></cell>
					</header>
					 <toolbar paging="{parameters:{procInstID:'<%=request.getParameter("procInstID")%>','type':'<%=request.getParameter("type")%>'},url:'/LoadErrorTimertasks.do?method=loadErrorTimertasks'}">
		            	<button dojoType="unieap.form.Button" label=" 删除 " onClick="doDelete()"></button>&nbsp;
		            	<button dojoType="unieap.form.Button" label=" 恢复 " onClick="doReset()"></button>&nbsp;
		            	<button dojoType="unieap.form.Button" label=" 刷新 " onClick="doRefresh()"></button>
		            </toolbar> 
		</div>
		</body>
</html>