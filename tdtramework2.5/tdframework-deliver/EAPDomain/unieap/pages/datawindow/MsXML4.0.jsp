<%@ page buffer="none"  contentType="text/html;charset=GBK" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
<title>MSXML 4.0 �Զ����ذ�װ</title>
<style>
BODY {
	font-family: "����";FONT-WEIGHT: normal; FONT-SIZE: 12pt; FONT-STYLE: normal; TEXT-DECORATION: none��color: #000000
}
</style>
</head>
<body onload="javascript:body_onload();">
<object id="MSXML4"
classid="clsid:88d969c0-f192-11d4-a65f-0040963251e5"
codebase="MsXML4.0.cab#version=4,00,9004,0"
type="application/x-oleobject"
STYLE="display: none">
</object>

<div id="installing" style="color:'blue'">MSXML 4.0 ���ڰ�װ,���Ե�...</div>
<script language="javascript">
	function body_onload() {
		document.all("installing").innerHTML = "<p style=\"color:'red'\">MSXML 4.0 ��װ��ɣ������½���ҵ�����</p>";
	}

</script>
</body>
</html>

