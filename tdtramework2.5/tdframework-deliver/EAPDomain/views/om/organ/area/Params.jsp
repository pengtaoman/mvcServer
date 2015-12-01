<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap" %>
<%@ taglib uri="/WEB-INF/tld/td.tld" prefix="td" %>
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil" %>
<%@ page import="com.neusoft.tdframework.common.data.ParamObjectCollection"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%
	String webpath = request.getContextPath();	
	ParamObjectCollection areaColl = (ParamObjectCollection)request.getAttribute("AreaColl");
	
	String opAreaId   = NullProcessUtil.nvlToString((String)request.getAttribute("opAreaId"),"");
	String flag   = "true";NullProcessUtil.nvlToString((String)request.getAttribute("flag"),"true");
	ParamObjectCollection countryColl = (ParamObjectCollection)request.getAttribute("countryColl");
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
<!-- 禁止 windows 主题风格 -->
<meta http-equiv="MSThemeCompatible" content="no" />
<!-- 禁止缓存 headers -->
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="-1" />
<meta http-equiv="Cache-Control" content="no-cache" />
<!-- end 禁止缓存 headers --> 
		
<title></title>
<contextPath value="<%=webpath%>"/>
<link href="<%=webpath%>/common/css/td_style.css" rel=stylesheet type="text/css">
	<script language="javascript" src="<%=webpath%>/common/js/td_common.js"></script>
	<script language="javascript" src="<%=webpath%>/common/js/waitingbar.js"></script>
	<script language="javascript" src="<%=webpath%>/common/js/titlebar.js"></script>
	<script language="javascript" src="<%=webpath%>/unieap/js/Common.js"></script>
	<script language="javascript" src="<%=webpath%>/unieap/js/common.js"></script>
	<script language="javascript" src="<%=webpath%>/unieap/js/Globals.js"></script>
	<script language="javascript" src="<%=webpath%>/common/js/eccn.js"></script>
<script language="javascript">
	function init(areaId){
		TitleBar.addTitleBarByTag('select');

		if(areaId != ''){
			initQueryPage();
		}
	}
	
	function initQueryPage(){
		var areaId = document.getElementById("countryId").value;
		if(areaId == ''){
			return;
		}
		parent.areaList.location.href = "<%=webpath%>/views/common/jsp/WaittingPage.jsp";
		
		document.getElementById("iframeSpace").style.height = "100px";
		document.getElementById("queryPage").src = "areaaction.do?OperType=initQueryPage&areaIdValue="+areaId;
	}
	
	function cityChange(){
		var areaId = document.getElementById("areaId").value;
		
		var parameter = 'areaId='+areaId;
		var result = executeRequest("areaRefreshAction","getCountryColl",parameter);
		document.all('countryId').outerHTML = result;
		if(areaId == null || areaId == ''){
			document.getElementById("queryPage").src = "<%=webpath%>/views/common/jsp/WaittingPage.jsp";
			parent.areaList.location.href = "<%=webpath%>/views/common/jsp/WaittingPage.jsp";
		}
	}
</script>
</head>
<body onload="init('<%=opAreaId%>');" class="mainBody">
	<form method="post" action="">
	<table cellspacing="0" border="0" width="100%" cellpadding="0" class="formTable">
		<tr class="tableTitleTR2">
			<td colspan="4" >
			<table width="100%" border="0" cellpadding="0" cellspacing="0" >
                <tr>
				<td class="tableTitleLeft2" >&#160;</td>
				<td class="tableTitle2">区域维护</td>
				<td class="tableTitleRight2" >&#160;</td>
				</tr>
			 </table>
			 </td>
		</tr>
        <tr> 
           <td class="formTableL" >&#160;</td>
           <td class="formTableC">		 	 			
				<table border="0" cellpadding="0" cellspacing="2" class="formTableCore">
					<tr>
						<td id="paramsSpace" align="center" colspan="4">
							<table border="0" cellpadding="0" cellspacing="2" class="formTableCore" id="paramsCondition">
								<tr>
									<td align="left" class="formLabel" >&#160;地市名称&#160;&#160;<span class="formRequested" >*</span></td>
									<td align="left" class="formField">
										<td:SelectTag selectFlag="<%=flag%>" selectColl="<%=areaColl%>" tagName="areaId" 
											selectvalue="" onchange="cityChange();" title="地市名称"/>
									</td>
									<td align="left" class="formLabel" >&#160;区县名称&#160;&#160;<span class="formRequested" >*</span></td>
									<td align="left" class="formField">
										<td:SelectTag selectFlag="" selectColl="<%=countryColl%>" tagName="countryId" 
											selectvalue="" onchange="initQueryPage();" title="区县名称"/>
									</td>
																	
								</tr>
							</table>
						</td>	
					</tr>
					<tr>
						<td id="iframeSpace" align="center" colspan="4" style="height:0px">
							<iframe name="queryPage" id="queryPage" style="width:100%;height:100%" frameborder="0" 
								marginwidth="0" marginheight="0"></iframe>
						</td>
					</tr>
				</table>
				
			</td>
           <td class="formTableR" >&#160;</td>
         </tr> 
		 <tr> 
		   <td class="formTableLB">&#160;</td>
		   <td class="formTableB">&#160;</td>
		   <td class="formTableRB">&#160;</td>
	     </tr>        
	</table>				 	
	</form>
</body>
</html>
