<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title> ‡é¢˜æ–‡æ¡£</title>
<script type="text/javascript">
var isLeftOpen=true;
function switchSysBar(){
 
		if (isLeftOpen){
			parent.mainFrame.cols="0,8,*";
			document.getElementById("switchPic").src="images/to-left_1.gif";
			isLeftOpen=false;
		}
		else{
			parent.mainFrame.cols="180,8,*";
			document.getElementById("switchPic").src="images/to-left_2.gif";
			isLeftOpen=true;
		}
}
</script>
<link href="css/td_style_frame_lt.css" rel="stylesheet" type="text/css">
</head>

<body marginheight="0" marginwidth="0">
<table width="8px" border="0" cellspacing="0" cellpadding="0" height="100%">
  <tr>
    <td  class="left-rightborder"><img id="switchPic" src='images/to-left_2.gif' width="6" height="50" style='cursor:hand'onclick="switchSysBar()"></td>
  </tr>
</table>

</body>
</html>
