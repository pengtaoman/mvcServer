<%@ page contentType="text/html; charset=UTF-8" %>
<html>
<head>
<title></title>
<link rel="stylesheet" type="text/css" href="data/css/Style.css"></link>
<script language="javascript">
function download(){
  location.href = "<%=request.getContextPath()%>/unieap/pages/form/DownloadFile.jsp";	
}
function success_download(){
  //opener.refresh();
  window.close();
}

</script>
</head>  
<body>
<center>
<table border="0" cellpadding="0"   cellspacing="0"   >
  <tr>
    <td ><table  cellspacing="0" class="main_title_table">
      <tr>
        <td nowrap class="text_title" >表单打印插件下载</td>
        </tr>
    </table>
        <table width="366" height="119" border="0" cellpadding="0" cellspacing="0" class="warn_bg">
          <tr>
            <td align="center"><table border="0" cellpadding="0" cellspacing="0" class="table_base">
              <tr>
                <td width="50" height="50"><img src="<%=request.getContextPath()%>/unieap/pages/form/data/images/j1.gif" width="33" height="33"></td>
                <td nowrap>打印插件未找到,请下载安装。<br>
                </td>
                </tr>
            </table></td>
          </tr>
        </table>
        <table cellspacing="0" class="main_button">
          <tr>
            <td align="right" ><table class="button_table" cellspacing="0">
                <tr align="right">
                	<td>
                	 <input type="button" style="font-size:12px;" onclick="download()" value="下载"/>
                     <input type="button" style="font-size:12px;" onclick="javascript:window.close()" value="返回"/>
                     </td>
                </tr>
            </table></td>
          </tr>
      </table></td>
  </tr>
</table>
</center>
</body>
</html>