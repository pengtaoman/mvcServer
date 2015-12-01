<%@ page contentType="text/html; charset=GBK" %>
<html>
<head>
<%
		String webpath = request.getContextPath();
		String id = request.getParameter("id");
		if(id.indexOf("<")!=-1||id.indexOf(">")!=-1||id.indexOf("(")!=-1||id.indexOf(")")!=-1){
		  id="";
		}
		String function ="tabCreate"+id;
%>
<link rel="stylesheet" href="<%=webpath%>/unieap/css/tab/unieapTab.css" type="text/css"></link>
<script type="text/javascript" src="<%=webpath%>/unieap/js/tab/unieapTab.js"></script>


<script type="text/javascript">

//objTabT.controlid由taglib生成的js将以src形式为request付值。<iframe id="tab" scrolling="no" style="Z-INDEX: 100; WIDTH: 100%; HEIGHT: 300px" src="/eapdomain/unieap/pages/tab/unieapTab.jsp?id=tab" frameBorder="0"></iframe>
function load(){

  var controlID="<%=id%>";
  if(controlID == "" || controlID == "null") {
    try {
      controlID = window.frameElement.id;
    } catch(Error) {
      alert("TAB页参数错误!");
    }
  }
 
  try {
   
    var objTabT = new Tab();

    objTabT.controlid=controlID;
    
    eval('parent.<%=function%>(objTabT, controlID)');
  } catch(Exception) {}
}
</script>
</head>

<body style="margin:0px;padding:0px;overflow:hidden" onload="load()"/>

</html>

