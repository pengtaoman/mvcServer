<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic" %>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<html:html locale="true">
<head>
<uniflow:style/> 
<script language="javascript">

var preSelectedNode = null;

function document_onclick()
{
    if(document.all)
    {
	var selectedNode = event.srcElement;
	if (selectedNode.tagName == "A")
	{
	    selectedNode.className = "v11_r1";
	    if (null != preSelectedNode)
	    {
		if (preSelectedNode != selectedNode)
		{
		    preSelectedNode.className = "v11_b1";
		}
	    }
	    preSelectedNode = selectedNode;
	}
    }
}
function selectActor(type,name,id)
{
  document.forms[0].elements[2].value = name;
  document.forms[0].elements[1].value = id;
  document.forms[0].elements[0].value = type;
  try{
	parent.document.forms[0].YWJBR.value =name;
	parent.document.getElementById("orgtree_iframe").style.display="none";
  }catch(e){}
}

function getSelectedType()
{
    return document.forms[0].elements[0].value;
}
function getSelectedID()
{
    return document.forms[0].elements[1].value;
}
function getSelectedName()
{
    return document.forms[0].elements[2].value;
}
</script>
</head>

<body bgcolor="#ffffff" text="#000000"  leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" onclick="return document_onclick();">
<uniflow:m_form action="oneactorsel.do">
<html:hidden property="selType"/>
<html:hidden property="selActorID"/>
<html:hidden property="selActorName"/>
<table border="0" width="100%" cellpadding="0" cellspacing="0" height="37" class="v11_b1">
  <tr>
    <td nowrap>
	  <uniflow:roleseltree/>
    </td>
  </tr>
</table>

</uniflow:m_form>
</body>
</html:html>
