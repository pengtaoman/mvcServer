<%@ page contentType="text/html; charset=GBK" language="java"%>
<html>
<%
	String webpath = request.getContextPath();
%>
<head>
<base target="_self">
<meta http-equiv="Content-Type" content="text/html; charset=GBK">
<title>错误信息提示页</title>
<!-- 禁止 windows 主题风格 -->
<meta http-equiv="MSThemeCompatible" content="no" />
<!-- 禁止缓存 headers -->
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="-1" />
<meta http-equiv="Cache-Control" content="no-cache" />
<link href="<%=webpath%>/common/css/td_style.css" rel=stylesheet type="text/css">  
</head>
<body class="mainBody">
  <form action="">
         <table cellspacing="0"  border="0" class="formTable" >
		  <tr class="tableTitleTR2" > 
            <td colspan="3" >
				<table width="100%" border="0" cellpadding="0" cellspacing="0" >
                    <tr>
						<td class="tableTitleLeft2" >&#160;</td>
						<td class="tableTitle2">错误信息提示</td>
						<td class="tableTitleRight2" >&#160;</td>
					</tr>
				</table>
            </td>
          </tr>  
          <tr>    
		    <td colspan="3">&#160;</td>
		  </tr>
		  <tr>    
		    <td colspan="3">&#160;</td>
		  </tr>
		  <tr>    
		    <td colspan="3">&#160;</td>
		  </tr>
		  <tr>    
		    <td colspan="3">&#160;</td>
		  </tr>
		  <tr>    
		    <td colspan="3">&#160;</td>
		  </tr>
          <tr>    
		    <td align="center" valign="middle" colspan="3">
		        <font size="15" color="red">你的页面EC TABLE的action中没有配置默认方法，请仔细参考DEMO阅读更新文档</font>
		    </td>
		  </tr>
		  <tr>    
		    <td align="right" colspan="3">
		    	<input type="image" src="<%=webpath%>/tdframework/mainframe/images/u_logo_l.gif" value=""/>	
		    </td>
		  </tr>
          </table>
  </form>  
</body>
</html>
