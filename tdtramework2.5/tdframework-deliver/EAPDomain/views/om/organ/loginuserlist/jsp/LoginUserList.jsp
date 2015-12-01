<%@ page language="java" pageEncoding="GBK"%>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec"%>
<%
    String path = request.getContextPath();
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<ContextPath value=<%=path%> />
        <!-- ��ֹ windows ������ -->
        <meta http-equiv="MSThemeCompatible" content="no" />
        <meta http-equiv="Pragma" content="no-cache" />
        <meta http-equiv="Expires" content="-1" />
        <meta http-equiv="Cache-Control" content="no-cache" />
        <!--������ص�JS-->
        <script language=javascript src="<%=path%>/unieap/js/Globals.js"> </script>
        <script language=javascript src="<%=path%>/unieap/js/Common.js"> </script>
        <script language=javascript src="<%=path%>/unieap/js/BaseObj.js"> </script>
        <script language=javascript src="<%=path%>/unieap/js/EAPObjsMgr.js"> </script>
        <!-- ����css  -->
        <link rel="stylesheet" type="text/css" href="<%=path%>/common/css/td_style.css"  />
        <link rel="stylesheet" type="text/css" href="<%=path%>/common/css/td_style_ec.css" />
        <!-- ����js  -->
        <script language="javascript" src="<%=path%>/common/js/td_common.js"></script>
        <script language="JavaScript" src="<%=path%>/common/js/eccn.js"></script>
        <script language="javascript" src="<%=path%>/common/js/waitingbar.js"></script>
        <script language="javascript" src="<%=path%>/common/js/titlebar.js"></script>
        <script language="javascript" src="<%=path%>/common/js/td_date.js"></script>

		<script src="<%=path%>/views/om/organ/loginuserlist/js/LoginUserList.js"></script>
	</head>
	
	<body class="mainBody" onload="init();">
        <table width="100%" border="0" cellpadding="0" cellspacing="0">
            <tr>
                <td class="tableTitleLeft2">
                    &#160;
                </td>
                <td class="tableTitle2">
                    ��¼ϵͳ��Ա��־��Ϣ�б�
                </td>
                <td class="tableTitleRight2">
                    &#160;
                </td>
            </tr>
        </table>
        <table width="100%" border="0" cellpadding="0" cellspacing="0">
            <tr>
                <td class="formTableL">
                    &#160;
                </td>
                <td class="formTableC">
                    <ec:table
                        action="${pageContext.request.contextPath}/loginUserListAction.do?method=getList"
                        items="loginUserList" var="aEmp" rowsDisplayed="5" method="post" >
                        <ec:row tagAttributes="" ondblclick="" highlightRow="true" >
                            <ec:column style="text-align:center;width:70px"
                                property="personId" title="��½�˺�"
                                value="${aEmp.personId}"></ec:column>
                            <ec:column style="text-align:center;width:70px"
                                property="empName" title="Ա������"
                                value="${aEmp.empName}"></ec:column>
                            <ec:column style="text-align:center;width:90px"
                                property="ipAddress" title="IP��ַ" value="${aEmp.ipAddress}"></ec:column>                            
                            <ec:column style="text-align:center;width:110px"
                                property="loginTime" title="��¼ʱ��" value="${aEmp.loginTime}"></ec:column>
                            <ec:column style="text-align:center;width:110px"
                                property="logoutTime" title="�뿪ʱ��" value="${aEmp.logoutTime}"></ec:column>
                        </ec:row>
                        <ec:extend>
							<input type="button" class="exportButton exportCsv"  id="exportButton"
								onclick="ECSideUtil.doCustomExport('LoginUserList.csv','<%=path%>/loginUserListAction.do?method=doDirectExportCSV')"
								alt="ֱ�ӵ���CSV" title="ֱ�ӵ���ΪCSV�ļ�" /><span class="formRequested">(����)</span>
						</ec:extend>
                        
                    </ec:table>
                </td>
                <td class="formTableR">
                    &#160;
                </td>
            </tr>           
            <tr>
                <td class="formTableLB">
                    &#160;
                </td>
                <td class="formTableB">
                    &#160;
                </td>
                <td class="formTableRB">
                    &#160;
                </td>
            </tr>
        </table>
	</body>
</html>
