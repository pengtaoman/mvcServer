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
		 * ҳ���ʼ��
		 */
		var eccn=new ECCN("ec");
		function initial(){
			parent.query.document.getElementById("bModify").disabled="true";
			parent.query.document.getElementById("bDelete").disabled="true";
		    var message = document.getElementById("message").value;
		    if(message != null && message != ""){
		    	alert(message);
		    }				
			eccn.doPrep=false;
			eccn.ajaxSubmit=false;
			eccn.init();
		}
		/**
		 * �Խ�Ҫ�ύ�ı굥��ֵ
		 */
		function selectMenu(menuId, menuType)
		{		
			document.getElementById("menuId").value = menuId;
			document.getElementById("menuType").value = menuType;
			parent.query.document.getElementById("bModify").disabled= false;
			parent.query.document.getElementById("bDelete").disabled= false;
		}
	
		/**
		 * ��ϸ��Ϣ
		 */
		function getDetail(webpath, menuId, menuType)
		{
			var cb = document.getElementById("idx_" + menuId);
			cb.checked = "checked";
			var url = webpath+ '/om/menuAction.do?method=getDetail&menuId='+menuId+'&menuType='+menuType+"&oper=view";
			var width = 550;
			var height = 250;
			var wleft=(screen.width-width)/2;
			var wtop=(screen.availHeight-height)/2-20;
			dimensions="width="+width+",height="+height+",left="+wleft+",top="+wtop+",scrollbars";
			window.open(url,'markpage',dimensions);
		}
		
		
	   
	    // begin add by jialixin
	    /**
	     *����һ��ʱ��ѡ�е�ѡ��ť
	     */
	    function doOnClickEvent(workNo, employeeId,adminType,areaId){
	   		//alert("workNo="+workNo+" employeeId="+employeeId);
	   		var cb = document.getElementById("idx_" + employeeId);
			cb.checked = "checked";
			selectEmployee(workNo, employeeId, adminType);
			parent.organdisplayhidden.document.myform.CurrentSelectBelongArea.value=areaId;
	    }
	    /**
	     *��ʾ�ȴ���
	     */
	    function showWaitingBar(){
			//WaitingBar.setMsg("���ڲ�ѯԱ����Ϣ�����Ե�");
			WaitingBar.showMe();  //��ʾ�ȴ���
			//WaitingBar.hideMe();
		}
	</script>
	</head>
	<body onLoad="initial();" class="mainBody">
		<%
		if(!((List)request.getAttribute("menuColl")).isEmpty()) {
		%>
			<ec:table items="menuColl" var="menu" action="${pageContext.request.contextPath}/menuAction.do?method=query">
				<ec:row >
				    <ec:column property="recordId" title=" " width="15">
	                   <input type="radio" class="radio" id="idx_${menu.menuId}" name="radio" onClick="selectMenu('${menu.menuId}','${menu.menuType}')" />
	                </ec:column>
	                <ec:column property="menuId" title="Ȩ�ޱ�ʶ"/>
					<ec:column property="menuName" title="Ȩ������">
						<a href="javascript:getDetail('<%=path%>','${menu.menuId}','${menu.menuType}')">${menu.menuName}</a>
					</ec:column>
					<ec:column property="menuTypeName" title="Ȩ������"/>
					<ec:column property="menuDesc" title="Ȩ������"/>					
					<ec:column property="disabledDate" title="ʧЧ����"/>
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
						<td class="tableTitle2">Ȩ����Ϣ&#160;</td>
						<td class="tableTitleRight2" >&#160;</td>
						</tr>
					 </table>
					 </td>
				</tr>
			    <tr> 
			       <td class="formTableL" >&#160;</td>
			       <td class="formTableC" align="center">
						<span style="font-size:20px;color:red;">�޷��ϲ�ѯ��������Ϣ</span>
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
		<form name="OperForm" id="OperForm" action="" method="POST">
			<input type="hidden" id="menuId" name="menuId" value="" />
			<input type="hidden" id="menuType" name="menuType" value="" />
			<input type="hidden" id="message" value='<%=message %>'/>
		</form>
	</body>
</html>