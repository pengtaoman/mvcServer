<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<html>
  <head>
	<meta content="text/html; charset=UTF-8" http-equiv="Content-Type"/>
	<meta http-equiv="pragma" content="no-cache"/>
	<meta http-equiv="cache-control" content="no-cache"/>
	<meta http-equiv="expires" content="0"/>
	<title>Workflow Main Menu Tree</title> 
	<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
	<style type="text/css">
		.unieap .categoryIcon{background-image: url("<%=path%>/unieap/pages/workflow/extension/report/images/category.gif");width : 16px;}
	</style>
	<script type="text/javascript">
		var mainMenuRowSet = [
         					 {id:'0001',label:"任务中心",parentID:"mainMenuTreeRoot",index:"0",leaf:false},
         					 {id:'0002',label:"管理中心",parentID:"mainMenuTreeRoot",index:"1",leaf:false},
         					 {id:'0004',label:"体验中心",parentID:"mainMenuTreeRoot",index:"3",leaf:false},
							 
							 {id:'0005',label:"待办任务",parentID:"0001",index:"0",leaf:true, href:'allwork.do?state=6&op=all'},
         					 {id:'0006',label:"已办任务",parentID:"0001",index:"1",leaf:true, href:'allwork.do?state=48&op=complete'},
         					 {id:'0007',label:"挂起任务",parentID:"0001",index:"2",leaf:true, href:'allwork.do?state=8&op=suspend'},
							 
							 {id:'0008',label:"实例管理",parentID:"0002",index:"0",leaf:false},
         					 {id:'0009',label:"资源管理",parentID:"0002",index:"1",leaf:false},
         					 {id:'0010',label:"系统管理",parentID:"0002",index:"2",leaf:false},
							 {id:'0011',label:"个人管理",parentID:"0002",index:"3",leaf:false},
							 
							 {id:'0013',label:"电力行业",parentID:"0004",index:"0",leaf:true},
							 {id:'0014',label:"电信行业",parentID:"0004",index:"1",leaf:true},
							 
							 {id:'0015',label:"未完成实例",parentID:"0008",index:"0",leaf:true, href:'procinst.do?state=15&op=all'},
							 {id:'0016',label:"已完成实例",parentID:"0008",index:"1",leaf:true, href:'procinst.do?state=48&op=monitor'},
							 
							 {id:'0017',label:"流程模板",parentID:"0009",index:"0",leaf:true, href:'m_category.do?method=categoryManager'},
							 {id:'0018',label:"节点模板",parentID:"0009",index:"1",leaf:true, href:'act_templet.do?method=templetManager'},
							 {id:'0019',label:"应用程序",parentID:"0009",index:"2",leaf:true, href:'application.do?method=applicationManager'},
							 
							 {id:'0020',label:"业务代理",parentID:"0010",index:"0",leaf:true, href:'agentlist.do'},
							 {id:'0021',label:"工作日历",parentID:"0010",index:"1",leaf:true, href:'scheduleAction.do'},
							 {id:'0022',label:"组织机构",parentID:"0010",index:"2",leaf:true, href:'userlist.do'},
							 
							 {id:'0023',label:"异常应用程序管理",parentID:"0010",index:"0",leaf:true, href:'errorAppProcess.do?method=getErrorApptaskNum&type=errorApps'},
							 {id:'0024',label:"运行中应用程序管理",parentID:"0010",index:"1",leaf:true, href:'errorAppProcess.do?method=getErrorApptaskNum&type=runningApps'},
							 {id:'0025',label:"异常超时任务管理",parentID:"0010",index:"2",leaf:true, href:'errorTimerTaskProcess.do?method=getErrorTimertaskNum&type=errorTimertasks'},
							 {id:'0026',label:"运行中超时任务管理",parentID:"0010",index:"3",leaf:true, href:'errorTimerTaskProcess.do?method=getErrorTimertaskNum&type=runningTimertasks'},
							 
							 {id:'0027',label:"我的代理",parentID:"0011",index:"0",leaf:true, href:'agentlist_mine.do'},
							 {id:'0028',label:"任务通知",parentID:"0011",index:"1",leaf:true, href:'notifypref.do'}
        				     ];
		var mainMenuStore = new unieap.ds.DataStore("mainMenuStore",mainMenuRowSet);

		function openUrl(url){
			if(url==undefined || url==null || url=="#") return;
			parent.page.location.href=unieap.WEB_APP_NAME + "/" + url;
		}
		
		function onMenuTreeClick(node)
		{
			var href = node.item.data.href;
			openUrl(href);
		}
		
		dojo.addOnLoad(function(){
			dijit.byId("mainMenuTree").expandNodeByLevel(1);
		});		
	</script>
  </head>
  
  <body class="unieap">
  <div dojoType="unieap.layout.AdaptiveContainer" height="100%" width="100%">
  <div dojoType="unieap.layout.AdaptivePane" autoHeight=true height="100%">
  	<div style="overflow:scroll; width:100%; height:100%;">
		<div dojoType="unieap.tree.Tree" id="mainMenuTree" label="" binding = "{rootNodeId:'mainMenuTreeRoot','leaf':'leaf','store':mainMenuStore,'label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:'mainMenuTreeRoot'}}" onClick="onMenuTreeClick" style="padding-top:3px;padding-left:3px">
		</div>
	</div> 
  </div>
  </div>
  </body>
</html>
