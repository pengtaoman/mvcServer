<%@ page contentType="text/html; charset=gb2312" %>
<%@ taglib uri="/WEB-INF/tld/crm_taglibs.tld" prefix="crm" %>
<%@ taglib uri="/WEB-INF/tld/om.tld" prefix="om" %>
<%@ taglib prefix="unieap" uri="/WEB-INF/taglib/unieap"%>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core"%>
<%@ page import="java.util.List" %>

<% 
	String path = request.getContextPath();
	String message =(String) request.getAttribute("message");
	if(message == null){
		message = "";
	}
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
		/**
		 * 页面初始化
		 */
		var eccn=new ECCN("ec");
		function initial(){
		    var message = "<%=message%>";
		    if(message != null && message != ""){
		    	alert(message);
		    }
		    eccn.doPrep=false;
			eccn.ajaxSubmit=false;
			eccn.init();
			var parentObj = parent.params.document.queryPage;
			var i=0;
		}

		function selectArea(areaId){
			var parentObj = parent.params.document.queryPage.document;
			
			parentObj.getElementById("bModify").disabled = '';
			parentObj.getElementById("bDelete").disabled = '';
			parentObj.getElementById("areaId").value = areaId;
		}
	
		/**
		 * 详细信息
		 */
		function getDetail(webpath,areaId){
			var cb = document.getElementById("idx_" + areaId);
			cb.checked = "checked";
			selectArea(areaId);
			var url = webpath+ '/om/areaaction.do?OperType=queryDetail&parentArea='+areaId+'&mode=show';
			var width = 550;
			var height = 280;
			var wleft=(screen.width-width)/2;
			var wtop=(screen.availHeight-height)/2-20;
			dimensions="width="+width+",height="+height+",left="+wleft+",top="+wtop+",scrollbars";
			window.open(url,'markpage',dimensions);
		}

	    /**
	     *单击一行时候选中单选按钮
	     */
	    function doOnClickEvent(areaId){
	   		var cb = document.getElementById("idx_" + areaId);
			cb.checked = "checked";
			selectArea(areaId);
	    }
	    /**
	     *显示等待条
	     */
	    function showWaitingBar(){
			WaitingBar.showMe();  //显示等待条
		}
	</script>
	</head>
	<body onLoad="initial()"class="mainBody">
		<%
		if(request.getAttribute("areaList")!=null && !((List)request.getAttribute("areaList")).isEmpty()) {
		%>
			<ec:table items="areaList" var="area" rowsDisplayed="10" 
				action="${pageContext.request.contextPath}/areaaction.do?OperType=query">
				<ec:row  onclick="doOnClickEvent('${area.areaId}');">
				    <ec:column property="recordId" title=" " width="15">
	                   <input type="radio" class="radio" id="idx_${area.areaId}" name="radio" onClick="selectArea('${area.areaId}')" />
	                </ec:column>
	                <ec:column property="areaId" title="区域代码"/>
					<ec:column property="areaName" title="区域名称">
						<a href="javascript:getDetail('<%=path%>','${area.areaId}')">${area.areaName}</a>
					</ec:column>
					<ec:column property="parentAreaName" title="上级区域"/>					
					<ec:column property="activeDate" title="生效时间"/>
					<ec:column property="inactiveDate" title="失效时间"/>
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
						<td class="tableTitle2">区域信息&#160;</td>
						<td class="tableTitleRight2" >&#160;</td>
						</tr>
					 </table>
					 </td>
				</tr>
			    <tr> 
			       <td class="formTableL" >&#160;</td>
			       <td class="formTableC" align="center">
						<span style="font-size:20px;color:red;">无符合查询条件的信息</span>
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
	</body>
</html>