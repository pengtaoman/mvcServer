<%@ page contentType="text/html; charset=gb2312" %>
<%@ taglib uri="/WEB-INF/tld/crm_taglibs.tld" prefix="crm" %>
<%@ taglib uri="/WEB-INF/tld/om.tld" prefix="om" %>
<%@ taglib prefix="unieap" uri="/WEB-INF/taglib/unieap"%>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core"%>
<%@ page import="java.util.List" %>

<% 
	String path = request.getContextPath();
	String message = (String)request.getAttribute("message");
	if(message == null){
		message = "";
	}
	String action = path+"/om/pwdComplexityAction.do";
%>
<html>
	<head>
	<link href="<%=path%>/common/css/td_style.css"    rel=stylesheet></link>
	<link href="<%=path%>/common/css/td_style_ec.css" rel=stylesheet></link>
	<script language="javascript" src="<%=path%>/common/js/td_common.js"></script>
	<script language="javascript" src="<%=path%>/common/js/waitingbar.js"></script>
	<script language="javascript" src="<%=path%>/common/js/titlebar.js"></script>
	<script language="javascript" src="<%=path%>/unieap/js/Common.js"></script>
	<script language="javascript" src="<%=path%>/unieap/js/Globals.js"></script>
	<script language="javascript" src="<%=path%>/common/js/eccn.js"></script>
	<script language="JavaScript">

		var eccn=new ECCN("ec");
		function initial(){
			eccn.doPrep=false;
			eccn.init();
			
		    var message = "<%=message%>";
		    if(message != null && message != ""){
		    	alert(message);
		    }
		}
		function getDetail(id)
		{
			var cb = document.getElementById("idx_" + id);
			cb.checked = "checked";
			var path = document.getElementById("path").value;
			var url = path+ '/om/pwdComplexityAction.do?method=getDetailInfo&id='+id;
			var width = 550;
			var height = 200;
			var wleft=(screen.width-width)/2;
			var wtop=(screen.availHeight-height)/2-20;
			dimensions="width="+width+",height="+height+",left="+wleft+",top="+wtop+",scrollbars";
			window.open(url,'markpage',dimensions);
		}
		
	    /**
	     *单击一行时候选中单选按钮
	     */
	    function doOnClickEvent(id){
	   		var cb = document.getElementById("idx_" + id);
			cb.checked = "checked";
			selectPwd(id);
	    }
	    /**
	     *显示等待条
	     */
	    function showWaitingBar(){
			WaitingBar.showMe(); 
		}
		
		function selectPwd(id){
			document.getElementById("pwdid").value=id;
			document.getElementById("bModify").disabled='';
			document.getElementById("bDelete").disabled='';
		}
		function doAdd(webpath){
			var url = webpath+ '/views/om/organ/pwd/detail.jsp';
			var width = 550;
			var height = 200;
			var wleft=(screen.width-width)/2;
			var wtop=(screen.availHeight-height)/2-20;
			dimensions="width="+width+",height="+height+",left="+wleft+",top="+wtop+",scrollbars";
			window.open(url,'markpage',dimensions);
		}
		function doModify(webpath){
			var id = document.getElementById("pwdid").value;
			var url = webpath+ '/om/pwdComplexityAction.do?method=getDetailInfo&id='+id;
			var width = 550;
			var height = 200;
			var wleft=(screen.width-width)/2;
			var wtop=(screen.availHeight-height)/2-20;
			dimensions="width="+width+",height="+height+",left="+wleft+",top="+wtop+",scrollbars";
			window.open(url,'markpage',dimensions);
		}
		
		
		function doDelete(webpath){
			if(window.confirm("确认要删除此配置吗？")){
				var id = document.getElementById("pwdid").value;
				document.OperForm.action =  webpath+ '/om/pwdComplexityAction.do?method=doDeletePwdComplexity&id='+id;
				document.OperForm.submit();
			}
			
		}
		
	</script>
	</head>
	<body class="mainBody" onload="initial()">
	<form name="OperForm" id="OperForm"  method="POST">
		<div class="formButtonDIV" id="filebutton1" style="display:block"> 
		 	<button class="formButton" name="bAdd" onclick="doAdd('<%=path%>')"> 增 加 </button>
			<button class="formButton" name="bModify" onclick="doModify('<%=path%>')"  disabled="disabled">修 改</button>
			<button class="formButton" name="bDelete" onclick="doDelete('<%=path%>')"  disabled="disabled">删 除</button>	
			<input type="hidden" name="pwdid" value="" />
			<input type="hidden" name="path" value="<%=path %>" />
			<input type="hidden" name="message" value="<%=message %>">
		 </div>
		<%
		if(!((List)request.getAttribute("pwdList")).isEmpty()) {
		%>
			<ec:table items="pwdList" var="pwd" paginationLocation ="false" rowsDisplayed="-1" action="<%=action%>">
				<ec:row  onclick="doOnClickEvent('${pwd.id}');" ondblclick="getDetail('${pwd.id}');">
				    <ec:column property="recordId" title=" " width="15">
	                   <input type="radio" class="radio" id="idx_${pwd.id}" name="radio" onClick="selectPwd('${pwd.id}')" />
	                </ec:column>
	                <ec:column property="id" title="编号"/>
					<ec:column property="lowercase" title="小写字母"/>
					<ec:column property="uppercase" title="大写字母"/>
					<ec:column property="specialChar" title="特殊字符"/>					
					<ec:column property="number" title="数字"/>
					<ec:column property="desc" title="说明"/>
					<ec:column property="creater" title="创建者"/>
					<ec:column property="createDate" title="创建时间"/>
					<ec:column property="updater" title="更新者"/>
					<ec:column property="updDate" title="更新时间"/>
			    </ec:row>
			</ec:table>
		<%
		} else {
		%>
			<table cellspacing="0" border="0" width="100%" cellpadding="0" class="formTable">
				<tr class="tableTitleTR2">
					<td colspan="4" >
					<table width="100%" border="0" cellpadding="0" cellspacing="0" >
			            <tr>
						<td class="tableTitleLeft2" >&#160;</td>
						<td class="tableTitle2">密码复杂度配置信息&#160;</td>
						<td class="tableTitleRight2" >&#160;</td>
						</tr>
					 </table>
					 </td>
				</tr>
			    <tr> 
			       <td class="formTableL" >&#160;</td>
			       <td class="formTableC" align="center">
						<span style="font-size:20px;color:red;">无密码复杂度配置信息</span>
				   </td>
			       <td class="formTableR" >&#160;</td>
			    </tr> 
				<tr> 
				    <td class="formTableLB">&#160;</td>
				    <td class="formTableB">&#160;</td>
				    <td class="formTableRB">&#160;</td>
				</tr>        
			</table>			 	
		<%
		}
		%>	
			
		</form>
	</body>
</html>