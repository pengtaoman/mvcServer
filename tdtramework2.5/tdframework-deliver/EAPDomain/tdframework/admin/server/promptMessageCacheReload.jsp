<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
		<contextPath value="<%=path%>"/>
		<script type="text/javascript">
	    </script>
		
	</head>
<body class="unieap">

   <% if (request.getAttribute("reloaded") != null && "true".equals(request.getAttribute("reloaded"))) {%>
       <br><br><br><br><br>
       <div align=center>
                      <font size="6">Prompt Message 更新操作成功。</font>
       </div>
   <% } else { %>
       <form action="<%=path %>/promptInfoMsgAction.do?method=reloadCache" method="post">
       <br><br><br><br><br>
       <div align=center>
                   点击下面的按钮，在缓存中更新Prompt Message信息.
       <br><br><br>
          <input type="submit" value="重新载入Prompt Message 信息"/>
         </div>
       </form>
   <% }%>

</body>
</html>	