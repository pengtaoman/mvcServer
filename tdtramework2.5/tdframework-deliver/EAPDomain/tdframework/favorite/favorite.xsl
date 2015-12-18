<?xml version="1.0" encoding="gb2312"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output omit-xml-declaration="yes" standalone="no" encoding="gb2312"/>
<xsl:strip-space elements="*"/>
<xsl:template match="/">
<html>
<head>
<LINK REL="stylesheet" HREF="{root/path}/common/css/td_style.css" TYPE="text/css"/>
<script language="javascript" src="{root/path}/common/js/td_common.js" ></script>
<script language="javascript" src="./views/common/js/nas_onkey.js" ></script>
<title>�ղؼй���</title>
<script language="javascript">
<xsl:comment><![CDATA[
//ҳ���ʼ��

function init(){
}

function commonInit(alertMessage) {
	if(alertMessage!=null && alertMessage!=""){
		alert(alertMessage);
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

]]></xsl:comment>	
</script>
</head>
<body onload="init();commonInit('{root/alertMessage}');return false;" class="mainBody">

	<form name="myform">

<div id="listDiv">

		<xsl:apply-templates select="root/frameFavoriteColl"/>

<div class="formButtonDIV">
	<button  class="formButton" name="delete" onclick="deleteFavorite();" >ɾ ��</button>
	<button  class="formButton" name="modify" onclick="modifyFavorite();">�� ��</button>
</div>

</div>
	</form>

	<form name="submitForm" method="post">
		<input type="hidden" name="operType"/>
		<input type="hidden" name="webPath" value="{root/path}"/>
		<input type="hidden" name="systemId" value="{root/systemId}"/>
		<input type="hidden" name="menuId" value="unselected"/>
		<input type="hidden" name="favoriteName"/>
		<input type="hidden" name="favoriteOrder"/>
	</form>

</body>
</html>
</xsl:template>

<!-- ��ɫ�б��template -->
<xsl:template match="root/frameFavoriteColl">

<div class="listTableBox">
  <table id="mt1" border="0" align="center" cellpadding="0" cellspacing="1" class="listTable" width="100%">

    <tr class="listTableHead">
	  <td width="24" ><input type="checkbox" name="selectAll" id="selectAll" class="checkbox" onclick="selectAllRow(this);" title="����ȫѡ"/></td>
      <td >����</td>
      <td >����˳��</td>
    </tr>
<tbody>

	<xsl:for-each select="frameFavorite">
   <tr class="listTableRow" style="cursor:hand;" 
   onmouseover="TableRow.lightMe(this);" onMouseOut="TableRow.resetMe(this);" onClick="TableRow.selectMe(this)" >
	    <td width="24" ><input type="checkbox" name="select" id="select{menuId}" class="checkbox"/></td>
        <td ><input type="text" class="textStyle" value="{favoriteName}" id="favoriteName{menuId}"/></td>
		<td ><input type="text" class="textStyle" value="{favoriteOrder}" id="favoriteOrder{menuId}" onkeypress="return nas_onkey(event,0,this,'','ck_number','ֻ����������','');"/></td>
	</tr>
</xsl:for-each>

	</tbody>
  </table>
</div>


</xsl:template>
</xsl:stylesheet>
