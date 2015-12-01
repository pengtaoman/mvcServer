<%--
/***************************************************************
* ������ : FilterInfo.jsp
* ����  :  2007-8-11 
* ����  :  sunchonggui@neusoft.com
* ģ��  : 
* ����  : 
* ��ע  : 
* ------------------------------------------------------------
* �޸���ʷ
* ���  ����  �޸���   �޸�ԭ��
* 1
* 2
***************************************************************/
--%>
<%@ page contentType="text/html; charset=gb2312"%>
<%@ taglib uri="/WEB-INF/taglib/unieap.tld" prefix="unieap"%>
<%@ taglib uri="/WEB-INF/tld/td.tld" prefix="td"%>
<%@ taglib uri="/WEB-INF/tld/om.tld" prefix="om"%>
<%@ page import="java.util.List"%>
<%@ page import="com.neusoft.tdframework.common.data.ParamObjectCollection"%>
<%
  String webpath = request.getContextPath();
  //����ϸ��Ϣҳ����ʾʱ��ȡ��ʶλ
  String flag=(String)request.getAttribute("flag");
  //System.out.println("flag filterinfo"+flag);
  //����ϸ��Ϣҳ����ʾʱ��ȡ����������Ϣ
  String paramTableDesc=(String)request.getAttribute("paramTableDesc")==null?"":(String)request.getAttribute("paramTableDesc");  
  ParamObjectCollection tableColl=(ParamObjectCollection)request.getAttribute("tableColl");
  //��ѯ���������ݵ�SQL���
  //List sqlList=(List)request.getAttribute("filterSql");
  //������������������Ϣ
  List listFilterName=(List)request.getAttribute("listFilterName");
  //������������TAG��ʶ
  List filterTagName=(List)request.getAttribute("filterTagName");
  //�������������ONCHANGE����
  List methodList=(List)request.getAttribute("methodList");
  //������������������Ϣ
  List listColl=(List)request.getAttribute("listColl");
  int length=0;
  if(listFilterName!=null){
  	 length=listFilterName.size();
  }
  String tableId=(String)request.getAttribute("tableId")==null?"":(String)request.getAttribute("tableId");
  String roleId =(String)request.getAttribute("roleId");
  String employeeId =(String)request.getAttribute("employeeId");
  String filterTagNames =(String)request.getAttribute("filterTagNames");   //�洢������TAG��ʶ
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<base target="_self" />

		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="This is my page">
		
		<link href="<%=webpath%>/common/css/td_style.css" rel=stylesheet type="text/css">
		
		<script language="javascript" src="<%=webpath%>/common/js/td_date.js"></script>
		<script language="javascript" src="<%=webpath%>/unieap/js/Globals.js"> </script>
		<script language="javascript" src="<%=webpath%>/unieap/js/Common.js"> </script>
		<script language="javascript" src="<%=webpath%>/unieap/js/EAPObjsMgr.js"> </script>
		<script language="javascript" src="<%=webpath%>/unieap/js/BaseObj.js"> </script>
		<script language="javascript" src="<%=webpath%>/common/js/titlebar.js"> </script>
		<script language="javascript" src="<%=webpath%>/common/js/waitingbar.js" ></script>
		<script language="javascript" src="<%=webpath%>/common/js/td_common.js"></script>
		<script language="javascript" src="<%=webpath%>/views/om/organ/dataParamRole/dataParamManage/js/filterInfo.js"></script>
		<script language="javascript" src="<%=webpath%>/views/om/organ/dataParamRole/dataParamManage/js/passiveSelect.js"></script>
	</head>
	<body class="mainBody" onload="init('<%=flag%>')">
		<unieap:form method="post" action="">
			<table cellspacing="0" border="0" width="100%" cellpadding="0" class="formTable">
				<tr class="tableTitleTR2">
					<td colspan="4">
						<table width="100%" border="0" cellpadding="0" cellspacing="0">
							<tr>
								<td class="tableTitleLeft2">&#160;</td>
								<td class="tableTitle2">&#160;���ݽ�ɫ��Ȩ&#160;</td>
								<td class="tableTitleRight2">&#160;</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td class="formTableL">&#160;</td>
					<td class="formTableC">
						<table border="0" cellpadding="0" cellspacing="2" class="formTableCore">
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									���˱���Ϣ&#160;<span class="formRequested" >*</span>
								</td>
								<td align="left" colspan="3" class="formField" style="width:80%">
									<td:SelectTag selectFlag="true" selectColl="<%=tableColl%>" selectvalue="<%=tableId%>" 
												  tagName="tableId" title="����Դ����" onchange="getTable(this.value)" fixlength="200px"/>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">����Ȩ��������Ϣ</td>
								<td align="left" colspan="3" class="formField" style="width:80%">
									<input type="text"  name="tableDesc" id="tableDesc" style="width:560px" value="<%=paramTableDesc%>" maxlength="128"/>
								</td>
							</tr>
							<%if(length>0){%>
								<tr>
								<%for(int i=0;i<length;i++){
									String tagName = (String)filterTagName.get(i);
									ParamObjectCollection selectColl=(ParamObjectCollection)listColl.get(i);
									String methodInfo = (String)methodList.get(i);
									//String filterSql = (String)sqlList.get(i);
								%>
									<td align="left" class="formLabel" style="width:20%">
										<%=(String)listFilterName.get(i)%>
									</td>
									<td align="left" class="formField" style="width:30%">
										<td:SelectTag selectFlag="false" selectColl="<%=selectColl%>" selectvalue="" tagName="<%=tagName%>" 
											title="���˱�" myOptionValue="<%=selectColl.getSelectFlag()%>" onchange="<%=methodInfo%>" fixlength="200px"/>
									</td>
									<%if((i+1)%2==0&&i>0){%>
										</tr><tr>
									<%}
								}%>
								</tr>
							<%}%>
						</table>
					</td>
					<td class="formTableR">&#160;</td>
				</tr>
				
				<tr>
					<td class="formTableLB">&#160;</td>
					<td class="formTableB">&#160;</td>
					<td class="formTableRB">&#160;</td>
				</tr>
			</table>
			<div class="formButtonDIV" id="filebutton1">
				<button class="formButton" name="bSearch" id="bSearch" onclick="doSearch('<%=webpath%>')" disabled="disabled">
					�� ѯ
				</button>	
				<button class="formButton" name="bDelete" id="bDelete"  onclick="doSave()" disabled="disabled">
					�� ��
				</button>
				<button class="formButton" name="bBack" id="bBack" onclick="goBack();">
					�� ��
				</button>
			</div>
			<input type="hidden" name="webpath" id="webpath"  value="<%=webpath%>"/>
			<input type="hidden" name="roleId" id="roleId"  value="<%=roleId%>"/>
			<input type="hidden" name="employeeId" id="employeeId" value="<%=employeeId%>"/>
			<input type="hidden" name="flag" id="flag"  value="<%=flag%>"/>
			<input type="hidden" name="filterTagNames" id="filterTagNames"  value="<%=filterTagNames%>"/>
			<!--��list.jsp ��getResult()���õ� -->
			<input type="hidden" id="tableNames" name="tableNames" />
		</unieap:form>
	</body>
</html>
