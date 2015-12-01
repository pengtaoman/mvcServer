<%@ page language="java" pageEncoding="GBK"%>
<%@page import="com.neusoft.tdframework.common.data.ParamObjectCollection"%>
<%@page import="com.neusoft.om.dao.loginuserlist.LoginUserListVO"%>
<%@page import="com.neusoft.tdframework.common.util.NullProcessUtil"%>
<%@taglib prefix="unieap" uri="/WEB-INF/taglib/unieap.tld"%>
<%@ taglib uri="/WEB-INF/tld/td.tld" prefix="td"%>
<%
String path = request.getContextPath();
LoginUserListVO loginUserListVO = (LoginUserListVO)request.getAttribute("loginUserListVO");
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
        <title>��¼ϵͳ��Ա��ϸ��Ϣ</title>
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
        <script language=javascript src="<%=path%>/unieap/js/ReadOnlyFieldObj.js"> </script>
        <script language=javascript src="<%=path%>/unieap/js/NumberObj.js"> </script>
        <script language=javascript src="<%=path%>/unieap/js/TextAreaObj.js"> </script>
        <script language=javascript src="<%=path%>/unieap/js/TextObj.js"> </script>
        <!-- ����css  -->
        <link rel="stylesheet" type="text/css" href="<%=path%>/common/css/td_style.css"  />
        <!-- ����js  -->
        <script language="javascript" src="<%=path%>/common/js/td_common.js"></script>
        <script language="javascript" src="<%=path%>/common/js/waitingbar.js"></script>
        <script language="javascript" src="<%=path%>/common/js/titlebar.js"></script>
        <script language="javascript" src="<%=path%>/common/js/td_date.js"></script>
        
  </head>
  
  <body class="mainBody" onload="init()">
        <unieap:form action="" method="post">
            <table cellspacing="0" border="0" width="600" cellpadding="0"
                class="formTable">
                <tr class="tableTitleTR2">
                    <td colspan="4">
                        <table width="100%" border="0" cellpadding="0" cellspacing="0">
                            <tr>
                                <td class="tableTitleLeft2">
                                    &#160;
                                    <br>
                                </td>
                                <td class="tableTitle2">
                                    ��¼��Ա��ϸ��Ϣ
                                    <br>
                                </td>
                                <td class="tableTitleRight2">
                                    &#160;
                                    <br>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td class="formTableL">
                        &nbsp;
                    </td>
                    <td class="formTableC">
                            <table border="0" cellpadding="0" cellspacing="2"
                                class="formTableCore">
                                <tr>
                                    <td align="left" class="formLabel" style="width: 20%">
                                                ��¼�˺�<span class="formRequested">*</span>
                                    </td>
                                    <td align="left" class="formField" style="width: 30%">
                                        <input type="Text" id="workNo" readonly="true" name="workNo" value="<%= loginUserListVO.getPersonId() %>" />                                 
                                    </td>
                                    <td align="left" class="formLabel" style="width: 20%">
                                        IP��ַ<span class="formRequested">*</span>
                                    </td>
                                    <td align="left" class="formField" style="width: 30%">
                                        <input type="Text" value="<%= loginUserListVO.getIpAddress() %>" />                   
                                    </td>
                                </tr>
                                <tr>
                                    <td align="left" class="formLabel" style="width: 20%">
                                        ��¼��ʽ<span class="formRequested">*</span>
                                    </td>
                                    <td align="left" class="formField" style="width: 30%">
                                        <input type="Text" value="<%= loginUserListVO.getLoginType() %>" />
                                    </td>
                                    <td align="left" class="formLabel" style="width: 20%">
                                        ��ǰλ��<span class="formRequested">*</span>
                                    </td>
                                    <td align="left" class="formField" style="width: 30%">
                                        <input type="Text" value="<%= loginUserListVO.getLocation() %>" />
                                    </td>
                                </tr>
                                <tr>
                                    <td align="left" class="formLabel" style="width: 20%">
                                        ��¼ʱ��<span class="formRequested">*</span>
                                    </td>
                                    <td align="left" class="formField" style="width: 30%">
                                        <input type="Text" value="<%= loginUserListVO.getLoginTime() %>" />
                                    </td>
                                    <td align="left" class="formLabel" style="width: 20%">
                                        �뿪ʱ��
                                    </td>
                                    <td align="left" class="formField" style="width: 20%">
                                        <input type="Text" value="<%= loginUserListVO.getLogoutTime() %>" />
                                    </td>
                                </tr>
                                <tr>
                                    <td align="left" class="formLabel" style="width: 20%">
                                        MAC��ַ
                                    </td>
                                    <td align="left" class="formField" style="width: 30%">
                                       <input type="Text" value="<%= loginUserListVO.getMacAddress() %>" />
                                    </td>
                                    <td align="left" class="formLabel" style="width: 20%">
                                        DNS����
                                    </td>
                                    <td align="left" class="formField" style="width: 30%">
                                        <input type="Text" value="<%= loginUserListVO.getDnsName() %>" />
                                    </td>
                                </tr>
                            </table>
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
            <div class="formButtonDIV" id="formButton">
                <button class="formButton" id="close" name="close" onclick="window.close()">
                    ��&#160;&#160;��
                </button>
            </div>
        </unieap:form>
  </body>
</html>
