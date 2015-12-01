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
       <div>
                      Prompt Message 信息重新装入缓存操作成功。
       </div>
   <% } else { %>
       <form action="<%=path %>/promptInfoAction.do?method=reloadCache" method="post">
          <input type="submit" value="重新载入Prompt Message 信息">
       </form>
   <% }%>

</body>
</html>	