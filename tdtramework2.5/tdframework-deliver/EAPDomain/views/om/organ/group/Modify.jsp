<%@ page language="java" import="java.util.*" pageEncoding="GB2312"%>
<%@ page contentType="text/html; charset=gb2312" %>
<%@ taglib uri="/WEB-INF/taglib/unieap.tld" prefix="unieap"%>
<%@ taglib uri="/WEB-INF/tld/td.tld" prefix="td"%>
<%@ page import="com.neusoft.om.dao.group.GroupVO" %>

<%
	String path = request.getContextPath();
 	GroupVO groupVO = (GroupVO)request.getAttribute("groupVO");
 	String method = (String)request.getAttribute("method");
 	if(groupVO == null || groupVO.getGroupId() ==null){
 		groupVO = new GroupVO();
 		method = "doAdd";
 	}	
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title>组信息</title>
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="This is my page">
		
		<link href="<%=path%>/common/css/td_style.css" rel=stylesheet type="text/css">		
		<script  language=javascript src="<%=path%>/unieap/js/Globals.js"> </script>
		<script  language=javascript src="<%=path%>/unieap/js/Common.js"> </script>
		<script  language=javascript src="<%=path%>/unieap/js/BaseObj.js"> </script>
		<script  language=javascript src="<%=path%>/unieap/js/EAPObjsMgr.js"> </script>
		<script  language=javascript src="<%=path%>/unieap/js/NumberObj.js"> </script>
		<script  language=javascript src="<%=path%>/unieap/js/IntegerObj.js"> </script>
		<script  language=javascript src="<%=path%>/unieap/js/ReadOnlyFieldObj.js"> </script>
		<script  language=javascript src="<%=path%>/unieap/js/ReadOnlyObj.js"> </script>
		<script  language=javascript src="<%=path%>/unieap/js/TextObj.js"> </script>		
		<script language="javascript" src="<%=path%>/common/js/td_date.js"></script>
		<script language="javascript" src="<%=path%>/common/js/titlebar.js"> </script>
		<script language="javascript" src="<%=path%>/common/js/td_common.js"></script>
		<script language="javascript" src="<%=path%>/views/common/js/nas_check_no_null.js"></script>

		<script language="javascript">
		
		function bSaveClick(webpath){
			var checkNull = checkNullValue();
			var method = '<%=method%>'			
			if(method == null || method == ''){
				method = 'doAdd';
			}
			if(checkNull == false){		
				var info = getInfo();
				window.opener.parent.GroupList.location.href=webpath+ '/om/groupAction.do?method='+method+info;	
				window.close();
		    }
		}
		function checkNullValue(){
			var groupName = document.getElementById("groupName").value;
			var groupDesc = document.getElementById("groupDesc").value;
			if(groupName == null || groupName == ''){
				document.getElementById("groupName").focus();
				alert("请填写组名称");
				return true;
			}
			if(groupDesc == null || groupDesc == ''){
				document.getElementById("groupDesc").focus();
				alert("请填写组说明");
				return true;
			}	
			return false;
		}
		function getInfo(){
			var groupId = document.getElementById("groupId").value;
			var groupName = document.getElementById("groupName").value;
			var groupDesc = document.getElementById("groupDesc").value;
			return '&groupId='+groupId+'&groupName='+groupName+'&groupDesc='+groupDesc;
		}
		/*
		 *关闭方法
		 */
		function bBackClick(webpath)
		{
			if (!confirm('您确定关闭么？')) 
				return false;
			window.close();
		}
		/*
		 *重置方法
		 */
		function bResetClick(webpath)
		{
			if (!confirm('您确定要重置么？')) 
				return false;
			EAPForm.reset();
		}
		
		</script>
	</head>
	<body class="mainBody"  >
		<unieap:form action="" method="post">
			<table cellspacing="0" border="0" width="100%" cellpadding="0" class="formTable">
				<tr class="tableTitleTR2">
					<td colspan="4">
						<table width="100%" border="0" cellpadding="0" cellspacing="0">
							<tr>
								<td class="tableTitleLeft2">&#160;</td>
								<td class="tableTitle2">组信息</td>
								<td class="tableTitleRight2">&#160;</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td class="formTableL">
						<input type="hidden" id="tableNames" name="tableNames" />
					</td>
					<td class="formTableC">
						<table border="0" cellpadding="0" cellspacing="2" class="formTableCore">
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									组编码&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
								<%if(method.equals("doAdd")){ %>
									<input type="Text" id="groupId" name="groupId" value="自动生成" disabled="true"  />
								<%}else{ %>
									<input type="text" id="groupId" name="groupId" value="<%=groupVO.getGroupId() %>" disabled="true"/>
								<%} %>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									组名称&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input  tcname="Text" id="groupName" name="groupName"  
										maxlength="32" classname="textType" value="<%=groupVO.getGroupName()%>" prompt="组名称"/>
								</td>								
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									组描述&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">									
									<unieap:input tcname="Text" id="groupDesc" name="groupDesc"
										maxlength="32" classname="textType"  value="<%=groupVO.getGroupDesc()%>" prompt="组描述"/>
								</td>
							</tr>
						</table>
					</td>
					<td class="formTableR">&#160;</td>
				</tr>
			</table>
			<input type="hidden" name="method" id="method" value="<%=method %>" />
			<input type="hidden" name="priGroupName" value="<%=groupVO.getGroupName() %>"/>
			<div class="formButtonDIV" id="formButton">
				<button class="formButton" id="bSave" name="bSave" onclick="return bSaveClick('<%=path%>');">
					保&#160;&#160;存
				</button>
				<button class="formButton" id="bReset" name="bReset" onclick="return bResetClick();">
					重&#160;&#160;置
				</button>
				<button class="formButton" id="bBack" name="bBack" onclick="return bBackClick('<%=path%>');">
					关&#160;&#160;闭
				</button>
			</div>
		</unieap:form>
	</body>
</html>
