<?xml version="1.0" encoding="gb2312"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output omit-xml-declaration="yes" standalone="no" encoding="gb2312"/>
<xsl:strip-space elements="*"/>
<xsl:template match="/">
<html>
	<head>
	<title>EmployList</title>
	<LINK REL="stylesheet" HREF="{/root/path}/views/common/css/crm_style.css" TYPE="text/css"/>
	<script language="javascript" src="{root/path}/views/om/organ/employeeduty/common.js"></script> 			  			  
	<script language="javascript">
	<xsl:comment>
	<![CDATA[
var flagCkbClked=0;
//���ѡ���ɾ����ť����
function SetSelectBtnEnable(webpath){
	parent.actionbtn.document.myform.bAdd.disabled=true;
	parent.actionbtn.document.myform.bSelect.disabled=false;
	parent.actionbtn.document.myform.bCancel.disabled=true;
	parent.actionbtn.document.myform.bDelete.disabled=false;
/*	parent.actionbtn.document.all['imgSelect'].disabled=false;
	parent.actionbtn.document.all['imgSelect'].src=webpath+'/views/common/images/select_normal.gif';
	parent.actionbtn.document.all['imgCancel'].disabled=true;
	parent.actionbtn.document.all['imgCancel'].src=webpath+'/views/common/images/cancel_disabled.gif';
	parent.actionbtn.document.all['imgAdd'].disabled=true;
	parent.actionbtn.document.all['imgAdd'].src=webpath+'/views/common/images/add_disabled.gif';	
	parent.actionbtn.document.all['imgDelete'].disabled=false;
	parent.actionbtn.document.all['imgDelete'].src=webpath+'/views/common/images/delete_normal.gif';
	*/
}
//˫������Ա�д���
//�Ѷ�����ӵ���ѡ�����Ա�б�
function selectRow(objRow){
	var objTbl=parent.actionlist.document.all['tblEmployee'];
	if (containItem(objTbl,objRow))
		return false;
	var myRows=new Array();
	myRows.push(objRow);
	var tblS=document.all['tblEmployee'];
	var tblD=parent.actionlist.document.all['tblEmployee'];
	contentCopy(tblS,tblD,myRows,'parent.actionlist.SetRow(myRow)');
}

//���checkBox������������κ�checkBox��ѡ�У���������ѡ���ɾ����ť���������а�ť�û�
function ckbCheck(objCkb){
	var myInput=document.all.tags("input");
	for (var i=0;i<myInput.length;i++){
		if (myInput[i].type=='checkbox'&&myInput[i].id.indexOf('ckb')==0){
			if (myInput[i].checked){
				SetSelectBtnEnable(myform.Path.value);
				return;
			}
		}
	}
	AllBtnDisabled(myform.Path.value);
}
//�ж�objTbl���Ƿ������objRow��ͬid����
function containItem(objTbl,objRow){
	var eId;
	for (var i=1;i<objTbl.rows.length;i++){
		eId=objTbl.rows[i].id;
		if (eId==objRow.id) return true;
	}
	return false;
}


function init(){
	if (myform.alertMessage.value!='')
		alert (myform.alertMessage.value);
}
function checkTD(id){
	var objCkb=document.all['ckb'+id.substring(3)];
	objCkb.checked=!objCkb.checked;
	ckbCheck(objCkb);
}
//����ckbObj��ֵ�趨����checkBox��ֵ
function  checkAll(ckbObj){
	var myInput=document.all.tags("input");
	if (myInput.length==5){//û���κβ���Ա�򷵻�
		ckbObj.checked=false;
		return;
	}
	var flag=ckbObj.checked;
	for (var i=0;i<myInput.length;i++){
			myInput[i].checked=flag;
	}
	if (flag)
		SetSelectBtnEnable(myform.Path.value);
	else
		AllBtnDisabled(myform.Path.value);
}

var lastobj;//��һ��ѡ�еĶ���
var lastcolor;

//ѡ��һ�б�ɫ
function changeColor(obj)
{	
    if(lastobj != null)
    {
        lastobj.style.backgroundColor = lastcolor;
    }
    lastobj = obj;
    lastcolor = obj.style.backgroundColor;
    obj.style.backgroundColor = "#FFFFE9";
}

	]]>
	</xsl:comment>
	</script>
	</head>
	<body class="BODY" onload="init();">
		<form method="POST" name="myform" action="">
		<input type="hidden" id="employeeId"/>
		<input type="hidden" id="employeeName"/>
		<input type="hidden" id="alertMessage" value="{root/alertMessage}"/>
		<input type="hidden" id="Path" value="{root/path}"/>
		<xsl:apply-templates select="root/employeeColl"/>
		</form>
	</body>
	</html>	
</xsl:template>	
<xsl:template match="root/employeeColl">
                  <TABLE border="0"  cellpadding="0" cellspacing="1"  class="tablebluemore" align="center" id="tblEmployee">
                          <TBODY>
                          <tr class="thList" onselectstart="return false">
							 	<td width="30"><input type="checkbox" id="sltCheckAll" onclick="checkAll(this);"/></td>
                          <td width="100" class="tdfontstyle">ְԱ���</td>
                          <td class="tdfontstyle">����</td></tr>
		<xsl:for-each select="list">
	                         <TR style="cursor:hand"  ondblclick="selectRow(this);return false;" title="˫��ѡ�����Ա">
<xsl:attribute name="id">row<xsl:value-of select="EmployeeId"/></xsl:attribute>
				<xsl:choose>
				<xsl:when test="(position() mod 2) = 1 ">
					<xsl:attribute name="class">trList</xsl:attribute>
				</xsl:when>
				<xsl:otherwise>
					<xsl:attribute name="class">trListDark</xsl:attribute>
				</xsl:otherwise>
				</xsl:choose>	                         
                              <TD><input type="checkbox" id="ckb{EmployeeId}" onclick="ckbCheck(this);"/></TD>
							<TD vAlign="top" align="left" onclick="checkTD(this.parentElement.id);">
                         	     <xsl:value-of select="EmployeeId"/>
							</TD>
                            <TD vAlign="top" align="left" onclick="checkTD(this.parentElement.id);">
                              <IMG src="{/root/path}/views/common/images/yarrow.gif" />
							  <xsl:value-of select = "EmployeeName"/>
                            </TD>
                            </TR>
 		</xsl:for-each>
                          </TBODY>
                        </TABLE>
</xsl:template>
</xsl:stylesheet>