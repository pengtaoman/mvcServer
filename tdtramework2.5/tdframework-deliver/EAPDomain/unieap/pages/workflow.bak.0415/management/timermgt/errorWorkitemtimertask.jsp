
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
%>
<html>
	<head>
		<meta content="text/html; charset=UTF-8" http-equiv="Content-Type"></meta>
		<title>异常超时任务管理</title>
		<style type="text/css">
@import
	"<%=path%>/unieap/ria3.3/unieap/themes/default/css/unieap-all.css";
</style>
		<script type="text/javascript"
			src="<%=path%>/unieap/ria3.3/dojo/dojo.js"
			djConfig="parseOnLoad: true,locale:'zh'"></script>
		<script type="text/javascript"
			src="<%=path%>/unieap/ria3.3/unieap/unieap-all.js"></script>
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
						url:unieap.WEB_APP_NAME+ "/loadTimerProcess.do?method=loadErrorTimertaskProcess&type=2",
						sync:true,
						load:function(dc,ds){
						}
					},dc);
				dataCenter.addDataStore(ddc.getDataStore("processStore"));
			}
			
			query();
			
			function doRefresh(){
				query();
				grid.getBinding().setDataStore(dataCenter.getDataStore("processStore"));
				grid.refresh();
			}
			
			function doReset(){
					var id = "";
	            	var index = grid.getManager("SelectionManager").getSelectedRowIndexs();
	            	if (index.length > 0 && (window.confirm("您将恢复当前流程中全部超时任务，确认恢复？"))==true){
	            		id = grid.getBinding().getRowSet().getRow(index[0]).getItemValue("proc_instance_id");
	            		unieap.Action.requestData({
							url:unieap.WEB_APP_NAME+ "/errorTimertaskMgr.do?method=resetErrorTimertask",
							parameters:{selectedID:id,type:"procID",state:"error"},
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
            
             function doDelete(){
	            	var id = "";
	            	var index = grid.getManager("SelectionManager").getSelectedRowIndexs();
	            	if (index.length > 0 && (window.confirm("您将删除当前流程中全部超时任务，确认删除？"))==true){
	            	id = grid.getBinding().getRowSet().getRow(index[0]).getItemValue("proc_instance_id");
	            	unieap.Action.requestData({
							url:unieap.WEB_APP_NAME+ "/errorTimertaskMgr.do?method=deleteErrorTimertask",
							parameters:{selectedID:id,type:"procID",state:"error"},
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
            
            function showDetail(){
            	var selectedProcID = "";
            	var index = grid.getManager("SelectionManager").getSelectedRowIndexs();
            	if(index.length > 0){
	            	var procInstID = grid.getBinding().getRowSet().getRow(index[0]).getItemValue("proc_instance_id")
	            	selectedProcID = procInstID;
	            	var url = unieap.WEB_APP_NAME + "/errorTimerTaskProcessDetail.do?type=2&procInstID=" + selectedProcID;
	            	window.open(url);
            	}
            }
			
			dojo.addOnLoad(function(){
				document.body.style.visibility = "visible";
				grid.getBinding().setDataStore(dataCenter.getDataStore("processStore"));
			});
		</script>
	</head>
	<body class="unieap" style="visibility: hidden;">
		<div id="grid" jsId="grid" dojoType="unieap.grid.Grid" width="100%"
			height="500px" selection="{selectType:'s'}" filter='{}'
			group="{groupBar:true}"
			views="{rowNumber:true,rowBar:true,orderType:'client'}">
			<fixed> <cell width="150px" label="流程名" name="name"
				styles="text-align:center"></cell> </fixed>
			<header> <cell width="150px" label="模板名称"
				name="templet_name" styles="text-align:center"></cell> <cell
				width="120px" label="流程状态" name="current_state"
				styles="text-align:center"></cell> <cell width="150px" label="业务分类"
				name="category" styles="text-align:center"></cell> <cell
				width="150px" label="开始时间" name="start_time"
				styles="text-align:center"></cell> <cell width="150px" label="完成时间"
				name="complete_time" styles="text-align:center"></cell> </header>
			<toolbar
				paging="{parameters:{'method':'loadErrorTimertaskProcess','type':'2'},url:'/loadTimerProcess.do'}">
			<button dojoType="unieap.form.Button" label=" 删除 "
				onClick="doDelete()"></button>
			&nbsp;
			<button dojoType="unieap.form.Button" label=" 恢复 "
				onClick="doReset()"></button>
			&nbsp;
			<button dojoType="unieap.form.Button" label=" 刷新 "
				onClick="doRefresh()"></button>
			&nbsp;
			<button dojoType="unieap.form.Button" label=" 详细 "
				onClick="showDetail()"></button>
			</toolbar>
		</div>
	</body>
</html>