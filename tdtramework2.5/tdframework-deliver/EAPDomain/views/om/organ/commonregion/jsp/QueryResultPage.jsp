<%@ page language="java" import="java.util.*" pageEncoding="GB2312"%>
<%@ page contentType="text/html; charset=gb2312" %>
<%@ taglib uri="/WEB-INF/taglib/unieap.tld" prefix="unieap"%>
<%@ taglib uri="/WEB-INF/tld/td.tld" prefix="td"%>
<%@ page import="com.neusoft.om.dao.region.CommonRegionColl" %>
<%@ page import="com.neusoft.om.dao.region.CommonRegionVO" %>

<%
	String path = request.getContextPath();
	CommonRegionColl coll = (CommonRegionColl)request.getAttribute("commonRegionColl");

	//得到页面所需要的下拉框信息	
	String message = (String)request.getAttribute("message");
	String operType = (String)request.getAttribute("operType");
	String password = (String)request.getAttribute("password");
	if(password == null){
		password = "";
	}
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
	<base target="_self">
		<title>公共管理区域查询结果</title>
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="This is my page">		
		<link href="<%=path%>/common/css/td_style.css" rel=stylesheet type="text/css">		
		<script  language=javascript src="<%=path%>/unieap/js/Globals.js"> </script>
		<script  language=javascript src="<%=path%>/unieap/js/Common.js"> </script>
		<script  language=javascript src="<%=path%>/unieap/js/BaseObj.js"> </script>
		<script language="javascript" src="<%=path%>/common/js/td_common.js"></script>
		<script language="javascript" src="<%=path%>/views/common/js/nas_check_no_null.js"></script>

		<script language="javascript">
		function initial(){		
			var message = document.getElementById("message").value;
			if(message != null && message != '' && message != 'null'){
				alert(message);
			}
		}
		/*
		 * 确定
		 */
		function bSaveClick(webpath){
			document.body.onunload = "";			
			window.close();
		}

		/*
		 * 返回
		 */
		function bBackClick()
		{
			window.returnValue = 'back';
			window.close();
		}
		
		function checkRadio(commonRegionId)
		{
			document.getElementById("bSave").disabled = "";
			window.returnValue = document.getElementById("radio_"+commonRegionId).value;					
		}

		</script>
		<style>
			em { color: red;
				font-style: normal;
				font-family: Courier; }
			fieldset { 
				width: 100%;
		}
		</style>
	</head>
	<body class="mainBody"  onLoad="initial();" onunload="bBackClick();" >
		<form action="" method="post">
			<fieldset align="center">
			<legend>
				<em>公共管理区域查询结果</em>
			</legend>
			<table cellspacing="0" border="0" width="100%" cellpadding="0" class="formTable">
				<tr>
					<td class="formTableL">
						<input type="hidden" id="tableNames" name="tableNames" />
					</td>
					<td class="formTableC">
						<table border="0" cellpadding="0" cellspacing="2" class="formTableCore">
						<%
						if (coll != null && coll.getRowCount() != 0) {
							for (int i=0; i < coll.getRowCount(); i++) {
								CommonRegionVO vo = coll.getCommonRegionVO(i);
						%>
							<tr>
								<td align="left" class="formLabel" style="width:50%">
									<input type="radio" name="radio" id="radio_<%=vo.getCommonRegionId() %>" value="<%=vo.getCommonRegionId()%>" onclick="checkRadio('<%=vo.getCommonRegionId() %>');" /><%=vo.getRegionName()%>						
								</td>								
							</tr>
						<%
							}
						} else {
						%>							
						    <tr>
							   <td class="formTableC" align="center">
									<span style="font-size:20px;color:red;">无符合查询条件的信息</span>
							   </td>
							</tr> 
						<%
						}
						%>									
						</table>
					</td>
					<td class="formTableR">&#160;</td>
				</tr>
				<tr>
					<td class="formTableLB">&#160;</td>
					<td class="formTableB">&#160;
						<input type="hidden" name="message" value="<%=message %>" />
						<input type="hidden" name="regionId" value="" />
					</td>
					<td class="formTableRB">&#160;</td>
				</tr>
			</table>	
			</fieldset>
			<div class="formButtonDIV" id="formButton">
				<button class="formButton" id="bSave" name="bSave" disabled="true" onclick="return bSaveClick('<%=path%>');">
					确&#160;&#160;定
				</button>
				<button class="formButton" id="bBack" name="bBack" onclick="return bBackClick();">
					返&#160;&#160;回
				</button>
			</div>
		</form>
	</body>
</html>
