<?xml version="1.0" encoding="gb2312"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output omit-xml-declaration="yes" standalone="no" encoding="gb2312"/>
<xsl:strip-space elements="*"/>
<xsl:template match="/">
<html>
	
	<head>
	<title></title>
	<link href="{root/create/path}/common/css/td_style.css" REL="stylesheet" TYPE="text/css"/>
	
	<script language="javascript" src="{/root/create/path}/views/common/js/nas_select_default.js"></script>
	<script language="javascript" src="{/root/create/path}/views/common/js/nas_check_no_null.js"></script>
	<script language="javascript" src="{/root/create/path}/views/common/js/nas_date_compare.js"></script> 	
	<script language="javascript" src="{/root/create/path}/views/common/js/nas_ip_onlost.js"></script> 	
	<script language="javascript" src="{/root/create/path}/views/common/js/calendar.js"></script> 	
	<script language="javascript" src="{/root/create/path}/views/common/js/date.js"></script> 
	<script language="javascript" src="{/root/create/path}/views/common/js/nas_calendar.js"></script> 		
	<script language="javascript">
	<xsl:comment>
	<![CDATA[
	function init(){
		var arrayBtn=new Array(myform.bSubmit);
	
		nas_select_value(myform.AreaId,parent.organdisplayhidden.myform.CurrentSelectBelongArea.value);
		myform.AreaId.disabled=true;
		//alert(myform.ParentOrganId,parent.organdisplayhidden.myform.CurrentSelectOrganId.value);
		nas_select_value(myform.ParentOrganId,parent.organdisplayhidden.myform.CurrentSelectOrganId.value);		
		myform.ParentOrganId.disabled=true;
		parent.organmainbuttons.document.getElementById('main').style.display='none';
		parent.organmainbuttons.document.getElementById('tail').style.display='';
	}

	function nas_select_value(selObj,strValue){
		for (var i=0;i<selObj.length;i++){
			if (selObj[i].value==strValue){
				selObj[i].selected=true;
				return;
			}
		}
	}

	function checkOrganName(strValue){
		if (strValue.length>0)
			myform.bSubmit.disabled=false;
	}
	
	function bSubmitClick(webPath){
		//校验
		var CurrentSelectOrganId=parent.organdisplayhidden.document.myform.CurrentSelectOrganId.value;
		var CurrentSelectBelongArea=parent.organdisplayhidden.document.myform.CurrentSelectBelongArea.value;
		var CurrentSelectOrganKind=parent.organdisplayhidden.document.myform.CurrentSelectOrganKind.value;
		
		if (CurrentSelectOrganId.length==0||CurrentSelectBelongArea==0){
			alert ('您必须选中某一节点进行操作');
			return ;
		}
		OrganName=document.myform.OrganName.value;//组织机构名称
		if(nas_check_no_null('组织机构名称',myform.OrganName,0)==false)
				return;
		if(nas_check_no_null('组织机构类型',myform.OrganKind,0)==false)
				return;

		//写值
		document.addIframe.document.myform.OperType.value="add";
		//document.addIframe.document.myform.OrganId.value="";
		document.addIframe.document.myform.OrganName.value=OrganName;
		
		document.addIframe.document.myform.OrganKind.value = document.myform.OrganKind.value;
		//上级组织机构
		document.addIframe.document.myform.ParentOrganId.value = CurrentSelectOrganId;
		//职能归属
		document.addIframe.document.myform.dutyParent.value = document.myform.dutyParent.value;
		//所属地市
		document.addIframe.document.myform.AreaId.value = CurrentSelectBelongArea;
		document.addIframe.document.myform.InnerDuty.value = document.myform.InnerDuty.value;
		document.addIframe.document.myform.Principal.value = document.myform.Principal.value;	
		
		document.addIframe.document.myform.OrganDesc.value = document.myform.OrganDesc.value;
		document.addIframe.document.myform.order.value = document.myform.order.value;
		//当前选中的树结点的类型
		document.addIframe.document.myform.CurrentSelectKind.value = CurrentSelectOrganKind;
		document.addIframe.document.myform.target = "_self";
		//alert(document.addIframe.document.myform.OperType.value);
		document.addIframe.document.myform.action = webPath + "/om/OrganMaintanceAction.do";
		document.addIframe.document.myform.submit();
	}
   
	]]>
	</xsl:comment>
	</script>
	</head>
	<body onload="init();" class="mainBody">
      <IFRAME id="CalFrame"
      style="DISPLAY: none; Z-INDEX: 100; WIDTH: 148px; POSITION: absolute; HEIGHT: 194px" 
      marginWidth="0" marginHeight="0" src="{/root/create/path}/views/common/htm/calendar.htm" 
      frameBorder="0" scrolling="no"></IFRAME>
		<form method="POST" name="myform" action="{root/create/path}/om/OrganMaintanceAction.do">		
			<xsl:apply-templates select="root/create"/>
		</form>
	</body>
	</html>	
</xsl:template>	

<xsl:template match="root/create">
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
						<input type="text" name="OrganId" maxlength ="32" onkeypress="" disabled = "true" value="不必填" class="textfield"/>
					</td>	
					<td align="left" class="formLabel" >组织机构名称&#160;&#160;<span class="formRequested" >*</span></td>
					<td align="left" class="formField" >
						<input type="text" name="OrganName" maxlength ="32"  value ="" class="textfield"/>
					</td>
				</tr>
				<tr>
					<td align="left" class="formLabel" >组织机构类型&#160;&#160;</td>
					<td align="left" class="formField" >
						<select name="OrganKind" onChange="" tabindex="1" onkeypress="" class="listTableRowSelected">
							<xsl:for-each select="//create/OrganKind/option">
								<option value="{value}">
									<xsl:value-of select="caption"/>
								</option>
							</xsl:for-each>
						</select>
					</td>	
					<td align="left" class="formLabel" >是否内部组织机构&#160;&#160;</td>
					<td align="left" class="formField" >
						<select name="InnerDuty" onChange="" tabindex="1" onkeypress="" class="listTableRowSelected">
							<xsl:for-each select="//create/InnerDuty/option">
								<option value="{value}">
									<xsl:value-of select="caption"/>
								</option>
							</xsl:for-each>
						</select>
					</td>
				</tr>
				<tr>
					<td align="left" class="formLabel" >所属区域&#160;&#160;</td>
					<td align="left" class="formField" >
						<select name="AreaId" class="listTableRowSelected">
							<option/>
								<xsl:for-each select="AreaList/option">
							<option>
								<xsl:attribute name="value"><xsl:value-of select="value"/></xsl:attribute>
								<xsl:value-of select="caption"/>
							</option>
								</xsl:for-each>
						</select>
					</td>	
					<td align="left" class="formLabel" >上级组织机构&#160;&#160;<span class="formRequested" >*</span></td>
					<td align="left" class="formField" >
						<select name="ParentOrganId" class="listTableRowSelected">
							<option/>
								<xsl:for-each select="OrganList/option">
								<option>
									<xsl:attribute name="value"><xsl:value-of select="value"/></xsl:attribute>
									<xsl:value-of select="caption"/>
								</option>
								</xsl:for-each>
						</select>
					</td>
				</tr>
				<tr>
					<td align="left" class="formLabel" >负责人&#160;&#160;</td>
					<td align="left" class="formField" >
						<input type="text" name="Principal"  maxlength ="32"  onkeypress="" class="textfield"/>
					</td>	
					<td align="left" class="formLabel" >顺序&#160;&#160;</td>
					<td align="left" class="formField" >
						<input type="text" name="order"  maxlength ="32"  onkeypress="" class="textfield"/>
					</td>	
				</tr>
				<tr>
					<td align="left" class="formLabel" >职能归属&#160;&#160;</td>
					<td align="left" class="formField" >
						<select name="dutyParent" class="listTableRowSelected">
							<option/>
								<xsl:for-each select="DutyOrganList/option">
								<option>
									<xsl:attribute name="value"><xsl:value-of select="value"/></xsl:attribute>
									<xsl:value-of select="caption"/>
								</option>
								</xsl:for-each>
						</select>
					</td>
					<td align="left" class="formLabel" >详细描述&#160;&#160;</td>
					<td align="left" class="formField" >
						<input type="text" class="textType1" name="OrganDesc" maxlength="32" onkeypress="" value="" />
					</td>
				</tr>
				<tr>
					<td align="right" class="formField" colspan="4" style="display:none">
						<input type="button"  name="bSubmit" value="提交" class="formButton" onclick="bSubmitClick('{//create/path}');return false;" />
  						<xsl:text disable-output-escaping="yes">&amp;nbsp;&amp;nbsp;&amp;nbsp;</xsl:text>
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
	<iframe name="addIframe" id="addIframe" FRAMEBORDER="0" SCROLLING="yes" marginwidth="0" marginheight="0" height ="0" src="{//create/path}/views/om/organ/organ/OrganMaintanceHidden.jsp" />
</xsl:template>
</xsl:stylesheet>