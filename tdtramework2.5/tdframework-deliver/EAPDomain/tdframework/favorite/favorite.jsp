<%@ page contentType="text/html; charset=gb2312" %>
<%@ page import="com.neusoft.tdframework.support.favorite.dao.FavoriteColl"%>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core"%>

<%
	String webPath = request.getContextPath();
	FavoriteColl favoriteColl = (FavoriteColl)request.getAttribute(FavoriteColl.REQUEST_ATTRIBUTE);
	request.setAttribute("favoriteList",favoriteColl.getList());
%>
<html style="overflow-y:auto;overflow-x:hidden;">
<head>
<META HTTP-EQUIV="Pragma" CONTENT="no-cache"> 
<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache"> 
<META HTTP-EQUIV="Expires" CONTENT="0">
<title>�ղؼй���</title>
<link href="<%=webPath%>/common/css/td_style.css" rel=stylesheet>
<link href="{root/path}/common/css/td_style.css" rel="stylesheet">
<unieap:base/>
<script language="javascript" src="./views/common/js/nas_onkey.js" ></script>
<script language="javascript" src="<%=webPath%>/common/js/td_common.js" ></script>
<script language="javascript">
//ҳ���ʼ��
function init(){
}

function commonInit(alertMessage) {
	if(alertMessage!=null && alertMessage!=""){
		alert(alertMessage);
		//parent.frames["mainleft"].location.reload();
		parent.parent.parent.queryFavorite();
	}
}

//ɾ��������¼
function deleteFavorite() {

	var menuIdStr = "";
	var checkboxs = document.getElementsByName("select");
	var selectAll = document.getElementById("selectALl");
	
	if(selectAll.checked){
	   var confirmDel = confirm("�ò�����ɾ�������ղز˵�,ȷ��ɾ����?");
	   if(!confirmDel){
	       return;
	   }
	}        
       
	for(var i = 0; i < checkboxs.length; i++) {
		var checkbox = checkboxs[i];
		if(checkbox.checked){
		    var menuId = checkbox.id.substring(checkbox.name.length,checkbox.id.length);
			menuIdStr += menuId+",";
	    }
    }
    	
	if(menuIdStr == "") {
		alert("��ѡ���ղز˵���Ϣ!");
		return;
	}
	
	document.submitForm.menuId.value = menuIdStr;
	document.submitForm.operType.value = "delete";
	document.submitForm.action= document.submitForm.webPath.value + "/favoriteMenuAdmin.do";
	document.submitForm.submit();
	
}

//�޸Ķ�����¼
function modifyFavorite() {

	var menuIdStr = "";
	var favoriteNameStr = "";
	var favoriteOrderStr = "";
	
	var checkboxs = document.getElementsByName("select");        
    
	for(var i = 0; i < checkboxs.length; i++) {
		var checkbox = checkboxs[i];
		if(checkbox.checked){
		    var menuId = checkbox.id.substring(checkbox.name.length,checkbox.id.length);
			menuIdStr += menuId+",";
			var favoriteName = document.getElementById("favoriteName"+menuId).value;
			if(favoriteName == ""){
			   alert("���Ʋ���Ϊ��!");
			   document.getElementById("favoriteName"+menuId).focus();
			   return;
			}
			favoriteNameStr += favoriteName+",";
			var favoriteOrder = document.getElementById("favoriteOrder"+menuId).value;
			if(favoriteOrder == ""){
			   alert("����˳����Ϊ��!");
			   document.getElementById("favoriteOrder"+menuId).focus();
			   return;
			}
			favoriteOrderStr += favoriteOrder+",";
	    }
    }
     
	if(menuIdStr == "") {
		alert("��ѡ���ղز˵���Ϣ!");
		return;
	}
		
	document.submitForm.menuId.value = menuIdStr;
    document.submitForm.favoriteName.value = favoriteNameStr;
	document.submitForm.favoriteOrder.value = favoriteOrderStr;
	
	document.submitForm.operType.value = "modify";
	document.submitForm.action = document.submitForm.webPath.value + "/favoriteMenuAdmin.do";
	document.submitForm.submit();
}

//����ȫѡ����
function selectAllRow(obj) {
  
    var mark = true;    
	var checkboxs = document.getElementsByName("select"); 
	       
	for(var i = 0; i < checkboxs.length; i++) {
		var checkbox = checkboxs[i];
		if(checkbox.checked == false){
			mark = false;
	    }
    }    
    for(var j = 0; j < checkboxs.length; j++) {
	   var checkbox = checkboxs[j];
	   checkbox.checked = !mark;
    }
}

</script>
</head>

<body onload="init();commonInit('<c:out value="${controllerData.alertMessage}"/>');return false;" class="mainBody" style="overflow-y:auto;overflow-x:hidden;">

<div class="listTableBox" style="overflow-y:auto;overflow-x:hidden;">
	<table id="mt1" border="0" align="center" cellpadding="0" cellspacing="1" class="listTable" width="100%">
		<tr class="listTableHead">
	    	<td width="24"><input type="checkbox" name="selectAll" id="selectAll" class="checkbox" onclick="selectAllRow(this);" title="����ȫѡ"/></td>
      		<td >����</td>
      		<td >����˳��</td>
    	</tr>
		<tbody>
		    <c:forEach items="${favoriteList}" var="item">
         	 	<tr class="listTableRow" style="cursor:hand;" onmouseover="TableRow.lightMe(this);" onMouseOut="TableRow.resetMe(this);" onClick="TableRow.selectMe(this)">
					<td width="24"><input type="checkbox" name="select" id="select<c:out value="${item.menuId}"/>" class="checkbox"/></td>
        			<td><input type="text" class="textStyle" value="<c:out value="${item.favoriteName}"/>" id="favoriteName<c:out value="${item.menuId}"/>"/></td>
					<td><input type="text" class="textStyle" value="<c:out value="${item.favoriteOrder}"/>" id="favoriteOrder<c:out value="${item.menuId}"/>" onkeypress="return nas_onkey(event,0,this,'','ck_number','ֻ����������','');"/></td>
				</tr>
			</c:forEach>
		</tbody>
	</table>
</div>

<form name="myform">
	<div id="listDiv">
		<div class="formButtonDIV">
			<button  class="formButton" name="delete" onclick="deleteFavorite();">ɾ ��</button>
			<button  class="formButton" name="modify" onclick="modifyFavorite();">�� ��</button>
		</div>
	</div>
</form>

<form name="submitForm" method="post">
	<input type="hidden" name="operType"/>
	<input type="hidden" name="webPath" value="<%=webPath%>"/>
	<input type="hidden" name="systemId" value="<c:out value="${systemId}"/>"/>
	<input type="hidden" name="menuId" value="unselected"/>
	<input type="hidden" name="favoriteName"/>
	<input type="hidden" name="favoriteOrder"/>
</form>

</body>
</html>