<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page import="com.neusoft.uniflow.api.handler.NWProcInst"%>
<%@ page import="com.neusoft.uniflow.web.util.CommonInfoManager"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<uniflow:style/>
<script type="text/javascript">
function his_manual_onClick(actInstID,actdefID){
     	var Url="<%=request.getContextPath()%>/widetail.do?actinstid="+actInstID; 
     	document.all.frame.src=Url;  
}
/*
查看并发分支的流转历史，此处取得是并发结束节点id
*/
function his_parallel_onClick(actInstID,actdefID){
	var Url="<%=request.getContextPath()%>/paralleldetail.do?actinstid="+actInstID;
	var width = 590;
    var height = 550;
	open_windows(Url,width,height);
}
function his_auto_onClick(actInstID,actdefID){
     var Url="<%=request.getContextPath()%>/addetail.do?actdefid="+actdefID; 
     document.all.frame.src=Url; 
}
function cancel_onclick(){
  parent.returnValue = false;
  parent.close();
}
</script>
</head>
<body  style="background-color:#EEEEEE;margin-left:10px;margin-top: 0px;margin-right:10px;margin-bottom: 0px;scrollbar-face-color: #D8E2E7;
scrollbar-shadow-color: #EEEEEE; scrollbar-highlight-color: #EEEEEE;scrollbar-3dlight-color: #EEEEEE;
scrollbar-darkshadow-color: #EEEEEE;scrollbar-track-color: #EEEEEE;scrollbar-arrow-color: #606D79;">
<table class="input_text" width="100%">
<tr><td>并发流转历史记录</td></tr>
<tr>
	<td>
		<table class="main_list" width="100%">
			<uniflow:iteratorMap keySet='<%=request.getAttribute("keySet")%>' name='<%=request.getAttribute("parallelDetail")%>'></uniflow:iteratorMap>
		</table>
	</td>
</tr>
<tr>
	<td>监控信息</td>
</tr>
<tr>
	<td>
		<uniflow:m_table style="main_list">
			<tr>
				<td class="main_list_th">节点名称</td>
				<td class="main_list_th">开始时间</td>
				<td class="main_list_th">完成时间</td>
				<td class="main_list_th">描述</td>
			</tr>
			<tr>
				<td class="main_list_td"><bean:write bundle="uniflow" name="parallelform" property="name"/></td>
				<td  class="main_list_td"><bean:write bundle="uniflow" name="parallelform"  property="startTime"/></td>
				<td  class="main_list_td"><bean:write bundle="uniflow" name="parallelform"  property="completeTime"/></td>
				<td  class="main_list_td"><bean:write bundle="uniflow" name="parallelform"  property="description"/></td>
			</tr>
		</uniflow:m_table>
	</td>
</tr>
<tr><td>工作项列表</td></tr>
<tr>
<td>
<iframe name="frame" style="width:105%;height:80px;margin-left:0px;margin-right:0px;padding-right:0px;padding-left:0px" frameborder="0" class="input_text" src="<%=request.getContextPath()%>/blank.do">
</iframe>
</td>
</tr>
<tr>
<td>
<uniflow:p_action>
  <uniflow:button id="cancel" action="javascript:cancel_onclick()" name="button.cancel"></uniflow:button>
</uniflow:p_action>
</td>
</tr>
</table>
</body>
</html>