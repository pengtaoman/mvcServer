<%--
/* JSP�����Ҫ������Ϣ
**************************************************************
* ������	: ���ݽ�ɫ��Ȩҳ��
* ��������: 
* ����		: yanglm@neusoft.com
* ģ��		: Ȩ��
* ����		: Ȩ��ϵͳ-ְԱά��
* ��ע		: 
* ------------------------------------------------------------
* �޸���ʷ
* ���		����		�޸���			�޸�ԭ��
* 1	
* 2
**************************************************************
*/
--%>
<%@ page language="java" import="java.util.*" pageEncoding="GB2312"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core"%>
<%@ taglib prefix="unieap" uri="/WEB-INF/taglib/unieap"%>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String size = String.valueOf(((List) request.getAttribute("employeeRoleColl")).size());
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
    <meta http-equiv="description" content="This is my page">
    <title>������ɫ��Ȩ</title>
    
    <link href="<%=path%>/common/css/td_style.css" rel=stylesheet>
	<link href="<%=path%>/common/css/td_style_ec.css" rel=stylesheet>
    
	<script language="javascript" src="<%=path%>/common/js/eccn.js"> </script>
	<script language="javascript" src="<%=path%>/common/js/td_common.js"> </script>
    <script type="text/javascript" language="java">
    var eccn=new ECCN("ec");
	function initial()
	{
		eccn.doPrep=false;
		eccn.doPrepPrev=false;
		eccn.init();
	}
	/**
	 * ����Ȩcheckbox�ĵ���¼�
	 */
	function adminFlagChangeStat(roleId)
	{
		var role = document.getElementById('role_'+roleId);
		var usable = document.getElementById('u_'+roleId);
		var admin = document.getElementById('a_'+roleId);
		if (admin.checked == false && usable.checked == false)
		{
			role.checked = false;
		} else if (role.checked == false && usable.checked == false)
		{
			role.checked = true;
		}
	}
	/**
	 * ʹ��Ȩcheckbox�ĵ���¼�
	 */
	function usebleFlagChangeStat(roleId)
	{
		var role = document.getElementById('role_'+roleId);
		var usable = document.getElementById('u_'+roleId);
		var admin = document.getElementById('a_'+roleId);
		if (admin.checked == false && usable.checked == false)
		{
			role.checked = false;
		} else if (role.checked == false && admin.checked == false)
		{
			role.checked = true;
		}
	}
	/**
	 * ��ɫcheckbox�ĵ���¼�
	 */
	function roleFlagChangeStat(roleId)
	{
		var role = document.getElementById('role_'+roleId);
		var usable = document.getElementById('u_'+roleId);
		var admin = document.getElementById('a_'+roleId);
		if (role.checked == false)
		{
			usable.checked = false;
			admin.checked = false;
		} else if (role.checked == true)
		{
			usable.checked = true;
			admin.checked = true;
		}
	}
	/**
	 * �ύ
	 */
	function apply(webpath)
	{
		var url = webpath + '/om/EmployeeMaintanceAction.do?OperType=makeParamDuty';
		ec.action = url;
		ec.submit();
	}
	/**
	 * ����
	 */
	function reset()
	{
		ec.reset();
	}
	/**
	 * ��ʾ��ɫ
	 */
	function showDuty(path, roleId)
	{
		var url = path+"/views/om/organ/dataParamRole/dataParamManage/index.jsp?roleId="+roleId+"&tableId=-100"; 
		var back = showModalDialog(url,window,'status:no;scroll:no;DialogWidth:750px;DialogHeight:560px;');
		//var width = 750;
		//var height = 560;
		//var wleft=(screen.width-width)/2;
		//var wtop=(screen.availHeight-height)/2-20;
		//dimensions="width="+width+",height="+height+",left="+wleft+",top="+wtop+",noscrollbars";
		//window.open(url,'_blank',dimensions);
	}
	/**
	 * ȫѡ / ȫ��ѡ 
	 */
	function checkAll(obj, flagAll, flagNone)
	{
		var checkBoxs = document.getElementsByTagName("input");
		if (obj.value == flagAll) {
			for(i=0; i<checkBoxs.length; i++){
				var e = checkBoxs[i];
				if(e.type == 'checkbox'){
					e.checked = true;
				}
			}
	    	obj.value = flagNone;
	    }
	    else if (obj.value == flagNone) {
	    	for(i=0; i<checkBoxs.length; i++){
				var e = checkBoxs[i];
				if (e.type == 'checkbox') {
					e.checked = false;
				}
			}
	    	obj.value = flagAll;
	    }
	}
	/**
	 * �رմ���
	 */
	function closeWindow()
	{
		if (!confirm('��ȷ���ر�ô��')) return false;
		window.close();
	}
	</script>
  </head>
  
  <body onLoad="initial();">
  <table width="100%" height="105" border="0" cellpadding="10" cellspacing="0">
    <tr>
    	<td width="100%">
			<%
				if (!size.equals("0")) {
			%>
			<ec:table items="employeeRoleColl" rowsDisplayed="-1" var="role" paginationLocation="false" >
					<ec:parameter name="beforetable" value="">
						<table border='0' cellpadding='0' cellspacing='0' class="tableRegion"  width='100%'>
							<tr class='trType'>
								<td colspan='2' height="1" align='center' bgcolor='#ffffff'></td>
							</tr>
							<tr class="trType">
								<td width='34' height="26" align='center' valign='middle' background="<%=path%>/views/common/images/top_line1.jpg">
								</td>
								<td align='center' height="26" valign='middle' background='<%=path%>/views/common/images/top_line_bg.jpg'>
									<div align='left'>���ݽ�ɫ</div>
								</td>
							</tr>
						</table>
					</ec:parameter>
					<ec:row >
					    <ec:column property="rowId" title=" " style="width:20px;text-align:center;">
					    	<c:if test="${role.usableFlag == 1 || role.adminFlag == 1}">
			            		<input type="checkbox" id="role_${role.roleId}" name="role_${role.roleId}" onclick="roleFlagChangeStat('${role.roleId}')" style="width:15px" checked="checked"/>
			            	</c:if>
			            	<c:if test="${role.usableFlag == 0 && role.adminFlag == 0}">
			            		<input type="checkbox" id="role_${role.roleId}" name="role_${role.roleId}" onclick="roleFlagChangeStat('${role.roleId}')" style="width:15px"/>
			            	</c:if>
			            	<input type="hidden" id="idx_${role.roleId}" name="idx_${role.roleId}" />
			            </ec:column>
						<ec:column property="roleName" title="��ɫ����">
							<!-- <a href="javascript:showDuty('<%=path%>','${role.roleId}')">  -->
								${role.roleName}
							<!-- </a> -->
						</ec:column>
						<ec:column property="usableFlag" title="ʹ��Ȩ">
							<c:if test="${role.usableFlag == 0}">
								<input type="checkbox" id="u_${role.roleId}" name="uf_${role.roleId}" value="1" onclick="usebleFlagChangeStat('${role.roleId}')" style="width:20px"/>
							</c:if>
							<c:if test="${role.usableFlag == 1}">
								<input type="checkbox" id="u_${role.roleId}" name="uf_${role.roleId}" value="1" onclick="usebleFlagChangeStat('${role.roleId}')" style="width:20px" checked="checked"/>
							</c:if>ʹ��Ȩ
						</ec:column>
						<ec:column property="adminFlag" title="����Ȩ">
							<c:if test="${role.adminFlag == 0}">
								<input type="checkbox" id="a_${role.roleId}" name="af_${role.roleId}" value="1" onclick="adminFlagChangeStat('${role.roleId}')" style="width:20px"/>
							</c:if>
							<c:if test="${role.adminFlag == 1}">
								<input type="checkbox" id="a_${role.roleId}" name="af_${role.roleId}" value="1" onclick="adminFlagChangeStat('${role.roleId}')" style="width:20px" checked="checked" />
							</c:if>����Ȩ
						</ec:column>
				    </ec:row>
				</ec:table>
				<p>&#160;</p>
				<div class="formButtonDIV" id="filebutton1" style="display:block"> 
					<button class="formButton" name="bSelectAll" onclick="checkAll(this, 'ȫ��ѡ��', '����ȫѡ')">ȫ��ѡ��</button>
				 	<button class="formButton" name="bSave" onclick="apply('<%=path%>')">��&#160;&#160;��</button>
				 	<button class="formButton" name="bReset" onclick="reset()">��&#160;&#160;��</button>
					<button class="formButton" name="bDelete" onclick="closeWindow()">��&#160;&#160;��</button>	
				</div>
				<%
					} else {
				%>
				<p>û�пɷ����Ȩ��</p>
				<input type="button" class="button1" value="�ر�" onclick="closeWindow()" />
				<%
					}
				%>
			</td>
   		</tr>
 	</table>
	</body>
</html>
