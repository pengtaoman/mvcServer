<%@ page contentType="text/html; charset=UTF-8"%>
<html>
<head>
<script language="javascript">
function displayPurviewInfo(role){
  var id=role.id;//获得角色的id
  var name=role.name;//获得角色的名字
  location.href = "<%=request.getContextPath()%>/purviewtree.do?id="+id;
}
</script>
</head>  
<body>

</body>
</html>