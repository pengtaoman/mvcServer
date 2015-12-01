<%--
/* JSP�����Ҫ������Ϣ
**************************************************************
* ������	: ����ά����ѯ����ҳ��
* ��������: 2007-04-05
* ����		: yanglm@neusoft.com
* ģ��		: Ȩ��
* ����		: Ȩ��ϵͳ-����ά��
* ��ע		: 
* ------------------------------------------------------------
* �޸���ʷ
* ���		����		�޸���			�޸�ԭ��
* 1
* 2
**************************************************************
*/
--%>
<%@ page contentType="text/html; charset=gb2312" %>
<%@ taglib uri="/WEB-INF/taglib/unieap.tld" prefix="unieap" %>
<%@ taglib uri="/WEB-INF/tld/td.tld" prefix="td" %>
<%@ taglib uri="/WEB-INF/tld/om.tld" prefix="om" %>
<%
	String webpath = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+webpath+"/";
	String authAreaLevel = (String)request.getAttribute("authAreaLevel");
	String parentAreaName = (String)request.getAttribute("parentAreaName");
	String parentAreaId = (String)request.getAttribute("parentAreaId");
	if(parentAreaId == null || parentAreaId.equals("null")){
		parentAreaId = "";
	}
	if(parentAreaName == null || parentAreaName.equals("null")){
		parentAreaName = "";
	}
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">
<title>����ά��</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<link   href="<%=webpath%>/common/css/td_style.css" rel=stylesheet type="text/css">
<script language="javascript" src="<%=webpath%>/common/js/td_date.js" ></script>
<script language="javascript" src="<%=webpath%>/unieap/js/Globals.js"> </script>
<script language="javascript" src="<%=webpath%>/unieap/js/Common.js"> </script>
<script language="javascript" src="<%=webpath%>/unieap/js/EAPObjsMgr.js"> </script>
<script language="javascript" src="<%=webpath%>/unieap/js/BaseObj.js"> </script>		
<script language="javascript" src="<%=webpath%>/common/js/titlebar.js"> </script>
<script language="javascript" src="<%=webpath%>/views/common/js/nas_check_no_null.js"></script>
<script language="javascript" src="<%=webpath%>/views/common/js/nas_date_compare.js"></script>
<script language="javascript" src="<%=webpath%>/common/js/td_common.js" ></script>
<script language="javascript">
	/*
	 *ylm
	 */
	function load(){	
		document.getElementById("bModify").disabled = 'true';
		document.getElementById("bDelete").disabled = 'true';
		
		DateUtil.addDateArea("activeDate","chooseDate1",false);
		DateUtil.addDateArea("inactiveDate","chooseDate2",false);
		TitleBar.addTitleBarByTag('select');
		
		var parentAreaName = document.getElementById("hiddenPareaName").value;
		var parentAreaId = document.getElementById("hiddenPareaId").value;
		document.getElementById("parentArea").value = parentAreaId;
		document.getElementById("parentAreaName").value = parentAreaName;
		adjustIframeSize();
	}
	/*
	 *ylm
	 */
	function doSearch(path,areaInfo){		
	    //��ҪУ��,�ϼ����������������������һ��
	    var param = "";
		var areaId = document.getElementById("parentArea").value;
		if(areaInfo==null || areaInfo==''){
			areaInfo = document.getElementById("areaName").value;
		}else{
			param = "&newAreaId="+areaInfo;
		} 
		if(areaId=='' && areaInfo==''){
			alert("[�ϼ�����]��[��������]����ͬʱΪ��");
			return;
		}
		parent.parent.areaList.showWaitingBar();		
		document.getElementById("bModify").disabled='true';
		document.getElementById("bDelete").disabled='true';
		document.forms[0].action = "areaaction.do?OperType=query"+param;
		document.forms[0].target = "areaList";	    	
		document.forms[0].submit();
	}
	/*
	 *ylm
	 */
	function doAdd(path){
		var parentArea = document.getElementById("parentArea").value;
		var parentAreaName = document.getElementById("parentAreaName").value;
		if(parentArea == ''){
			alert("����ѡ��[�ϼ�����]��Ȼ����ܽ�����������");
			return;
		}
		
		var url = path+ '/om/areaaction.do?OperType=queryDetail&mode=add&parentArea='+parentArea+'&parentAreaName='+parentAreaName;
		var width = 550;
		var height = 250;
		var wleft=(screen.width-width)/2;
		var wtop=(screen.availHeight-height)/2-20;
		dimensions="width="+width+",height="+height+",left="+wleft+",top="+wtop+",scrollbars";
		window.open(url,'markpage',dimensions);
	}
	/*
	 *ylm
	 */
	function doModify(path){
		var areaId = document.getElementById("areaId").value;
		
		if(areaId!=null && areaId!=''){
			var url = path+ '/om/areaaction.do?OperType=queryDetail&mode=modify&parentArea='+areaId;
			var width = 550;
			var height = 250;
			var wleft=(screen.width-width)/2;
			var wtop=(screen.availHeight-height)/2-20;
			dimensions="width="+width+",height="+height+",left="+wleft+",top="+wtop+",scrollbars";
			window.open(url,'markpage',dimensions);
		}		
	}
	/*
	 *ylm
	 */
	function doDelete(path){
		if(confirm("ȷ��ɾ����������Ϣ��?")){
			var areaId = document.getElementById("areaId").value;
			document.getElementById("areaId").value="";
			
			//ˢ��EC TABLE��״̬��Ϣ
			parent.parent.areaList.EccnUtil.noExport('ec');
			parent.parent.areaList.EccnUtil.refresh('ec');
			var priAreaId = parent.document.getElementById("areaId").value;
			document.forms[0].action = "areaaction.do?OperType=delete&areaId="+areaId+"&priAreaId="+priAreaId;
			document.forms[0].target = "query";	    	
			document.forms[0].submit();			
		}		
	}
	
	
		
	function adjustIframeSize() {
		var a = window.parent.document.getElementsByTagName('iframe');
		for (var i=0; i<a.length; i++) {
			if (a[i].name == self.name) {
				a[i].style.height = document.body.scrollHeight+10;
				return;
			}
		}
	}
		
</script>
</head>
  
<body onload="load()" class="mainBody">
<form method="POST" name="myform">
	 <table border="0" cellpadding="0" cellspacing="2" class="formTableCore" id="QueryCondition">
		<tr>
			<td class="formLabel">
				�ϼ�����
			</td>
			<td class="formField">
				<input type="text" id="parentAreaName" name="parentAreaName" value="<%=parentAreaName %>" readonly>
            	<unieap:innertree requestid="areaTree" id="areaTree" display="true" buttonCssClass="searchImgButton" valueBackInput="parentArea" textBackInput="parentAreaName" multiSelect="false"  treeImagePath="<%=webpath%>"/>
           		<input type="hidden" id="parentArea" name="parentArea" value="<%=parentAreaId %>">
            </td>
			<td class="formLabel">
				��������
			</td>
			<td class="formField">
				<input type="text" id="areaName" name="areaName" />
			</td>
		</tr>
		<tr>
			<td class="formLabel">
				��Чʱ��
			</td>
			<td class="formField">
				<input type="text" id="activeDate" name="activeDate" />
				<button class="calendarImgButton" id="chooseDate1"></button>
			</td>
			<td class="formLabel">
				ʧЧʱ��
			</td>
			<td class="formField">
				<input type="text" id="inactiveDate" name="inactiveDate" />
				<button class="calendarImgButton" id="chooseDate2"></button>
			</td>
		</tr>
	 </table>
	 <input type="hidden" id="areaId" name="areaId" value="" />
	 <input type="hidden" id="authAreaLevel" name = "authAreaLevel" value="<%=authAreaLevel%>"/>
	 <input type="hidden" id="hiddenPareaId" name="hiddenPareaId" value="<%=parentAreaId %>"/>
	 <input type="hidden" id="hiddenPareaName" name="hiddenPareaName" value="<%=parentAreaName %>"/>
	 <div class="formButtonDIV" id="filebutton1" style="display:block"> 
	 	<button class="formButton" id="bSearch" name="bSearch" onclick="doSearch('<%=webpath%>')">�� ѯ</button>
	 	<button class="formButton" id="bAdd" name="bAdd" onclick="doAdd('<%=webpath%>')">�� ��</button>
		<button class="formButton" id="bModify" name="bModify" onclick="doModify('<%=webpath%>')">�� ��</button>
		<button class="formButton" id="bDelete" name="bDelete" onclick="doDelete('<%=webpath%>')">ɾ ��</button>
	 </div>
</form>
</body>
</html>
