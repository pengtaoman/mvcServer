<%@ page contentType="text/html; charset=UTF-8"%>
<html>
<head>
	
	<script type="text/javascript">
	function backWard(){
		var xmlStr =document.backwardForm.xmlStr.value;
		var id = '<%=request.getAttribute("id")%>';
		var name = '<%=request.getAttribute("name")%>';
		var templateNodeType = '<%=request.getAttribute("templateNodeType") == null?"":request.getAttribute("templateNodeType")%>';
		window.close();
		if(templateNodeType != '')
		{ 
		  //把jsp的编辑信息，回写到flex树上
		  opener.callFlexTree(xmlStr,id ,name,templateNodeType);
		}
		else
		{
			opener.callFlex(xmlStr , id , name);
			
		}
	
	}	
		
    </script>
</head>
<body onLoad="backWard()">
<form name="backwardForm" >
<input type="hidden" name="xmlStr"  value='<%=request.getAttribute("xmlStr")%>'/>
</form>
</body>
</html>