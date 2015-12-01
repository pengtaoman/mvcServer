<%@ page language="java" import="java.util.*" pageEncoding="GB2312"%>
<%@ taglib uri="/WEB-INF/tld/crm_taglibs.tld" prefix="crm" %>
<%@ taglib uri="/WEB-INF/tld/om.tld" prefix="om" %>
<%@ taglib uri="/WEB-INF/tld/td.tld" prefix="td"%>
<%@ page import="com.neusoft.om.dao.organ.OrganVO" %>
<%@ page import="com.neusoft.om.bo.OMDictionaryBO" %>
<%@ page import="com.neusoft.om.dao.area.AreaColl" %>
<%@ page import="com.neusoft.om.dao.organkind.OrganKindColl" %>
<%@ page import="com.neusoft.om.dao.organ.OrganColl" %>
<%@ page import="com.neusoft.tdframework.common.data.ParamObjectCollection" %>
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil"%>
<%@ page import="com.neusoft.tdframework.common.data.ParamObject" %>

<% 
	String path = request.getContextPath();
	String operType = (String)request.getAttribute("OperType");
	OrganVO organVO = (OrganVO)request.getAttribute("OrganVO");
	AreaColl areaColl = (AreaColl)request.getAttribute("AreaColl");
	ParamObjectCollection organColl =(ParamObjectCollection)request.getAttribute("OrganColl");
	ParamObjectCollection dutyParentColl = (ParamObjectCollection)request.getAttribute("DutyParent");
	String currentSelectArea = organVO.getAreaId(); //当前选中的地市
	String currentSelectOrgan = NullProcessUtil.nvlToString(organVO.getParentOrganId(),""); //上级组织机构
	ParamObjectCollection InnerDutyColl = (ParamObjectCollection)request.getAttribute("InnerDutyColl");
	ParamObjectCollection PareaColl = (ParamObjectCollection)request.getAttribute("PareaColl");
	ParamObjectCollection StatusColl = (ParamObjectCollection)request.getAttribute("StatusColl");		
	String parentOrganId = (String) request.getAttribute("parentOrganId");
	String areaName = (String) request.getAttribute("areaName");
	String areaId = (String) request.getAttribute("areaId");
	String organDim = (String) request.getAttribute("organDim");
	String message = (String)request.getAttribute("Message");
	if(message == null){
		message = "";
	}
	String imagePath = path + "/views/common/images/search_l.gif";
	OrganKindColl organKindColl =(OrganKindColl)request.getAttribute("OrganKind");
	ParamObjectCollection kindColl = new ParamObjectCollection();
	for(int i=0;i<organKindColl.getRowCount();i++){
		ParamObject vo = new ParamObject();
		vo.setId(String.valueOf(organKindColl.getOrganKind(i).getOrganKind()));
		vo.setName(organKindColl.getOrganKind(i).getKindDesc());
		kindColl.addParamObject(vo);
	}
%>

<html>
	<head>
	<title></title>
	<LINK REL="stylesheet" HREF="<%=path%>/views/common/css/pubstyle.css" TYPE="text/css"/>
	<LINK REL="stylesheet" href="<%=path%>/common/css/td_style.css"  type="text/css" />
	<script language="javascript" src="<%=path%>/views/common/js/nas_select_default.js"></script>
	<script language="javascript" src="<%=path%>/views/common/js/nas_check_no_null.js"></script>
	<script language="javascript" src="<%=path%>/views/common/js/nas_date_compare.js"></script> 	
	<script language="javascript" src="<%=path%>/views/common/js/nas_ip_onlost.js"></script> 	
	<script language="javascript" src="<%=path%>/views/common/js/calendar.js"></script> 	
	<script language="javascript" src="<%=path%>/views/common/js/date.js"></script> 
	<script language="javascript" src="<%=path%>/views/common/js/nas_calendar.js"></script> 		
	<script type="text/javascript" src="<%=path%>/views/om/commontree/MzTreeView10.js" ></script>   
	<script language="javascript">
	function init(){
		var arrayBtn=new Array(myform.bSubmit);
		var organDim = document.getElementById("organDim").value;	
		//nas_select_value(myform.AreaId,parent.organdisplayhidden.myform.CurrentSelectBelongArea.value);
		//nas_select_value(myform.ParentOrganId,parent.organdisplayhidden.myform.CurrentSelectOrganId.value);	
		for (var i=0;i<myform.length;i++){
			if(myform[i].value == "null"){
				myform[i].value = "";
			}
			myform[i].disabled=true;
		}
		document.getElementById('bReload').disabled = false;
		document.getElementById('bSubmit').disabled = false;
		parent.organmainbuttons.document.getElementById('main').style.display='';
		parent.organmainbuttons.document.getElementById('tail').style.display='none';

		document.getElementById("showAreaBtn").style.display="none";
		
	}
	function nas_select_value(selObj,strValue){
		if(selObj != null ){
			for (var i=0;i<selObj.length;i++){
				if (selObj[i].value==strValue){
					selObj[i].selected=true;
					return;
				}
			}
		}
	}
	function checkOrganName(strValue){
		if (strValue.length>0)
			myform.bSubmit.disabled=false;
	}
	
	function bSubmitClick(){
	//校验
		var webPath = document.getElementById("path").value;
		CurrentSelectOrganId = parent.organdisplayhidden.document.myform.CurrentSelectOrganId.value;
		CurrentSelectBelongArea = parent.organdisplayhidden.document.myform.CurrentSelectBelongArea.value;
		if (CurrentSelectOrganId.length==0||CurrentSelectBelongArea==0){
			alert ('您必须选中某一节点进行操作');
			return ;
		}
		if(nas_check_no_null('组织机构名称',myform.OrganName,0)==false)
		  return;
	//写值
		document.getElementById("OperType").value="modify";
		var OrganId = document.getElementById("OrganId").value;
		document.myform.target = "_self";
		document.myform.action = webPath + "/om/OrganMaintanceAction.do?OperType=modify&OrganId="+OrganId;
		document.myform.submit();
	}


	function showAreaData(){
		var webpath = document.getElementById("path").value;
		var AreaId = document.getElementById("AreaId").value;
		var parentOrganId = document.getElementById("ParentOrganId").value;
		var organId = document.getElementById("OrganId").value;
		var url = webpath + '/om/OrganMaintanceAction.do?OperType=showArea&parentOrganId='+parentOrganId+"&organId="+organId;
		var width = 250;
		var height = 300;
		var wleft=(screen.width-width)/2+200;
		var wtop=(screen.availHeight-height)/2;
		dimensions="width="+width+",height="+height+",left="+wleft+",top="+wtop+",scrollbars";
		window.open(url,'markpage',dimensions);
		return false;
	}
	function doReload()
	{
		myform.reset();
		init();
	}
	</script>
	</head>
	<body class="mainBody"  onload="init()">
	<form action=""  name="myform" method="post">
	  <table cellspacing="0" border="0" width="100%" cellpadding="0" class="formTable">
			<tr class="tableTitleTR2">
				<td colspan="4" >
				<table width="100%" border="0" cellpadding="0" cellspacing="0" >
	                <tr>
					<td class="tableTitleLeft2" >&#160;</td>
					<td class="tableTitle2">组织机构管理</td>
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
						<td align="left" class="formLabel" >组织机构编号&#160;&#160;</td>
						<td align="left" class="formField" >
							<input type="text" name="OrganId" maxlength ="32" value="<%=organVO.getOrganId()%>" class="textfield"/>
						</td>	
						<td align="left" class="formLabel" >组织机构名称&#160;&#160;<span class="formRequested" >*</span></td>
						<td align="left" class="formField" >
							<input type="text" name="OrganName" maxlength ="32"  value ="<%=organVO.getOrganName()%>" class="textfield"/>
							<input type="hidden" name="priOrganName" maxlength ="32"  value ="<%=organVO.getOrganName()%>" class="textfield"/>
						</td>
					</tr>
					<tr>
						<td align="left" class="formLabel" >组织机构类型&#160;&#160;</td>
						<td align="left" class="formField" >
							<td:SelectTag selectColl="<%=kindColl%>" selectvalue="<%=String.valueOf(organVO.getOrganKind())%>" selectFlag="" 
								tagName="OrganKind" title="组织机构类型"/>	
						</td>	
						<td align="left" class="formLabel" >是否内部组织机构&#160;&#160;</td>
						<td align="left" class="formField" >						
							<td:SelectTag selectColl="<%=InnerDutyColl%>" selectvalue="<%=String.valueOf(organVO.getInnerDuty())%>" selectFlag="" 
								tagName="InnerDuty" title="是否内部组织机构"/>
						</td>
					</tr>
					<tr>
						<td align="left" class="formLabel" >上级组织机构&#160;&#160;<span class="formRequested" >*</span></td>
						<td align="left" class="formField" >						
							<td:SelectTag selectColl="<%=organColl%>" selectvalue="<%=organVO.getParentOrganId()%>" selectFlag="" 
								tagName="ParentOrganId" title="上级组织机构"/>										
						</td>
						<td align="left" class="formLabel" >所属区域&#160;&#160;</td>
						<td align="left" class="formField" >														
							<input type="text" id="areaName" name="areaName" value="<%=areaName %>" />
							<img onclick="return showAreaData()" name="showAreaBtn" style="cursor:hand; " src="<%=imagePath%>"></img>
           					<input type="hidden" id="AreaId" name="AreaId" value="<%=organVO.getAreaId()%>" />													
						</td>	
					</tr>
					<tr>
						<td align="left" class="formLabel" >负责人&#160;&#160;</td>
						<td align="left" class="formField" >
							<input type="text" name="Principal"  maxlength ="32" value="<%=organVO.getPrincipal()%>"  class="textfield"/>
						</td>	
						<td align="left" class="formLabel" style="display:none">顺序&#160;&#160;</td>
						<td align="left" class="formField" style="display:none">
							<input type="text" name="order"  maxlength ="32"  value="<%=organVO.getOrder()%>"  class="textfield"/>
						</td>
						<td align="left" class="formLabel" >详细描述&#160;&#160;</td>
						<td align="left" class="formField" >
							<input type="text" class="textfield" name="OrganDesc" maxlength="32" value="<%=organVO.getOrganDesc()%>" />
						</td>
							
					</tr>
					<tr style="display:none">
						<td align="left" class="formLabel" >职能归属&#160;&#160;</td>
						<td align="left" class="formField" >
							<td:SelectTag selectColl="<%=dutyParentColl%>" selectvalue="<%=organVO.getDutyParent()%>" selectFlag="true" 
								tagName="dutyParent" title="职能归属"/>	
						</td>
					</tr>
					<tr>
						<td align="right" class="formField" colspan="4" style="display:none">
							<input type="button"  name="bSubmit" value="提交" class="formButton" onclick="bSubmitClick();return false;" />
							<input type="button" id="bReload" name="bReload" value="返回" class="button2" onclick="doReload();" />	
							<input type="hidden" name="path" value="<%=path%>"/>
							<input type="hidden" name="organDim" value="<%=organDim%>"/>
							<input type="hidden" name="OperType" value=""/>
							<input type="hidden" name="CurrentSelectKind" value=""/>
							<input type="hidden" name="parentOrganId" value="<%=parentOrganId %>"/>
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
