<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
  <head>
	<meta content="text/html; charset=UTF-8" http-equiv="Content-Type"></meta>
	<style type="text/css">
			@import "<%=path%>/unieap/ria3.3/unieap/themes/default/css/unieap-all.css";
	</style>
	<script type="text/javascript" src="<%=path%>/unieap/ria3.3/dojo/dojo.js" djConfig="parseOnLoad: true,locale:'zh'" ></script>
	<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/unieap-all.js" ></script>
	<script type="text/javascript" src="<%=path%>/unieap/pages/workflow/extension/report/js/queryPageCommon.js" ></script>
	<script type="text/javascript">
		unieap.WEB_APP_NAME = "<%=path%>";
		
		dojo.require("unieap.dialog.MessageBox");

		function showCategoryTreeDialog()
			{
            	DialogUtil.showDialog({url:unieap.WEB_APP_NAME + "/unieap/pages/workflow/extension/report/ResourceCategoryTree.jsp",onComplete:writeBackResourceCategory,isExpand:false,width:"300",height:"400",title:'请选择一个流程分类：',resizable:false},document.getElementById("processCategory"));
			}
			
			function writeBackResourceCategory(returnValue)
			{
				processCategory.setValue(returnValue.label);
				categoryIdList.setValue(returnValue.id);
			}
			
			function CheckFormAndSubmit()
			{	
				var ifsubmit = true;
				if(categoryIdList.getValue()=="")
				{
					MessageBox.alert({title:"提示",message:"请选择一个流程分类。",type:"error"},processCategory.domNode); 
					ifsubmit = false;
					return;
				}
				if(StartDate.getValue()=="")
				{
					MessageBox.alert({title:"提示",message:"请设置统计起始时间。",type:"error"},StartDate.domNode); 
					ifsubmit = false;
					return;
				}
				if(EndDate.getValue()=="")
				{
					//MessageBox.alert({title:"提示",message:"请设置统计截止时间。",type:"error"},EndDate.domNode); 
					EndDate.setValue(new Date().getTime());
					//ifsubmit = false;
					//return;
				}
				if(ifsubmit)
				{
					//var helper = WFTemplateStatForm.getHelper();
					//var data=helper.collectData();
					//unieap.debug(data);
					prepareWFStaticWin();
					WFTemplateStatForm.domNode.target = getWFStaticWinName();
					WFTemplateStatForm.domNode.submit();
				}
			}
	</script>
    <title>QueryPage_WFTemplate</title>  
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">
	<style type="text/css">
			.unieap .lookupIcon{
				border-left: 1px solid #7f9db9; 
				width: 16px; 
				height: 19px; 
				float: right; 
				overflow:hidden;
				background:url("<%=path%>/unieap/pages/workflow/stylesheet/images/efficiencyCenter/find.gif") no-repeat;
			}
	</style>
  </head>
  <body class="unieap" style="margin:0px;background-color:#F1F7FE">
  				<!--
				==================================================================================================================
				
				
																流程模板运行统计分析
				
				
				==================================================================================================================
				  -->
				<div dojoType="unieap.layout.ContentPane" title="流程模板运行统计分析" style="vertical-align:top; text-align:center;">
					<table cellpadding="0" cellspacing="0" border="0" width="100%" height="420">
					<tr>
						<td width="10%" height="24"></td>
						<td></td>
						<td width="10%"></td>
					</tr>
					<tr>
						<td height="24"></td>
						<td style="font-size:14px; text-align:left; padding-left:5%;padding-right:5%; line-height:20px;">■&nbsp;&nbsp;<b>流程模板运行统计分析</b>以流程模板为单位，统计指定流程分类下各个流程模板在指定时间区间内的运行情况，包括：流程模板实例数、总耗时、平均耗时、超时数、运行数、完成数 、挂起数 、终止数。</td>
						<td></td>
					</tr>
					<tr>
						<td height="24"></td>
						<td style="font-size:12px;">注意：统计分析涉及到大量流程数据的运算，会对系统运行性能造成一定的影响。建议您在非繁忙时段使用此功能。</td>
						<td></td>
					</tr>
					<tr>
						<td colspan="3" align="center">
							<!-- Set Start -->
							<form name="WFTemplateStatForm" id="WFTemplateStatForm" jsId="WFTemplateStatForm" dojoType="unieap.form.Form" method="post" action="<%=path%>/ShowWFStat.do?newReport=true">
							<input type="hidden" name="reportId" value="347b26a5-454a-4d0a-a549-20ebd7bea54d" />
							<div name="CategotyID" id='categoryIdList' jsId="categoryIdList" dojoType="unieap.form.TextBox" style="display:none"></div>
							<div dojoType="unieap.form.FieldSet" title="请设置统计条件" style="width:640px">
							<table cellpadding="0" cellspacing="0" border="0" align="center">
							<tr>
								<td height="30" align="right"><strong>流 程 分 类</strong>&nbsp;&nbsp;</td>
								<td style="text-align:left; padding-left:15px;"><div id='processCategory' jsId="processCategory" dojoType="unieap.form.TextBoxWithIcon" iconClass="lookupIcon" readOnly="true" onClick="showCategoryTreeDialog" onIconClick="showCategoryTreeDialog"></div></td>
								<td style="text-align:left; padding-left:15px;"><span style="color:#FF0000">(*必填)</span>&nbsp;&nbsp;请选择您要查看的流程分类</td>
							</tr>
							<tr>
								<td colspan="3" height="10"></td>
							</tr>
							<tr>
								<td height="30" align="right"><strong>统计起始时间</strong>&nbsp;&nbsp;</td>
								<td style="text-align:left; padding-left:15px;"><div name="StartDate" dojoType="unieap.form.DateTextBox" id='StartDate' jsId='StartDate'></div></td>
								<td style="text-align:left; padding-left:15px;"><span style="color:#FF0000">(*必填)</span></td>
							</tr>
							<tr>
								<td colspan="3" height="10"></td>
							</tr>
							<tr>
								<td height="30"align="right"><strong>统计截止时间</strong>&nbsp;&nbsp;</td>
								<td style="text-align:left; padding-left:15px;"><div name="EndDate" dojoType="unieap.form.DateTextBox" validator="{preDate:'StartDate'}" id='EndDate' jsId='EndDate'></div></td>
								<td style="text-align:left; padding-left:15px;">不填写默认为当天</td>
							</tr>
							<tr>
								<td colspan="3" height="10"></td>
							</tr>
							<!--
							<tr>
								<td height="30" align="right"><strong>时间快捷设置</strong>&nbsp;&nbsp;</td>
								<td style="text-align:left; padding-left:15px;">
									<div dojoType="unieap.form.Button" label="上月"></div>&nbsp;&nbsp;
									<div dojoType="unieap.form.Button" label="本月"></div>&nbsp;&nbsp;
									<div dojoType="unieap.form.Button" label="本季度"></div>&nbsp;&nbsp;
									<div dojoType="unieap.form.Button" label="本年度"></div>
								</td>
								<td style="text-align:left; padding-left:15px;"></td>
							</tr>
							<tr>
								<td colspan="3" height="10"></td>
							</tr>
							 -->
							<tr>
								<td colspan="3" align="center">
								<div dojoType="unieap.form.Button" label="开始统计" onClick="CheckFormAndSubmit()"></div>
								</td>
							</tr>
							</table>
							</div>
							</form>
							<!-- Set End-->
						</td>
					</tr>
					</table>
				</div>
  </body>
</html>
