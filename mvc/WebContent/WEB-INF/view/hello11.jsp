<!DOCTYPE html>
<html>

<head>

<%
    String contextPath = request.getContextPath();
%>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1">
<title>metisMenu</title>


<script src="<%=contextPath%>/resources/common/jquery/jquery-1.11.3.min.js"></script>

<script>
var contextPath='<%=contextPath%>';

   function ac(aaa) {console.log("---------------------------------------------------------" + aaa);};
   
   var ser = function() {
	   var aj = $.ajax({
			url : contextPath+'/app/tss',// 跳转到 action  
			data : {
				
			},
			type : 'get',
			cache : false,
			success : function(data) {
				console.log("-----------------------------??????????????????????" + data);
				$('#ss').append(data);
			},
			error : function(e, da, dd,ee) {
				// view("异常！");  
				alert("异常！" + e + da + "--" +dd + "--" + ee);
			}
		});
   }
    
	var postssl = function() {
        /*
		$.getJSON("https://10.4.122.210:8443/testssl", function(data) {
	            console.log("---------------------------------------------------------");
		});
		*/
		/**/
		var aj = $.ajax({
			url : 'https://192.168.1.178:8443/testssl',// 跳转到 action  
			data : {
				
			},
			type : 'post',
			cache : false,
			//dataType : 'JSONP',
			crossDomain: true,
			//jsonp: "ac",
			success : function(data) {
				//eval('(' + data + ')');
				console.log("-----------------------------??????????????????????" + data);
			},
			error : function(e, da, dd,ee) {
				// view("异常！");  
				alert("异常！" + e + da + "--" +dd + "--" + ee);
			}
		});
		
		
	}
	$(document).ready(function() { 

}); 

		/*
    $("#ifr").load(function(){ 
    	console.log("KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK");
        console.log($("#ifr").document.html());
    });
    /**/
    function ilo() {
    	console.log("KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK");
    	var iframes=document.getElementsByTagName("iframe");
    	var ifrhtml = iframes[0].contentWindow.document.html();
    	 console.log(ifrhtml);
    }
    
</script>

</head>
<body ng-app="td.main">
<a href="#" onclick="postssl();">SSL</a> <br><br><br>
<a href="#" onclick="ser();">SSLSer</a>
<br>
<div id="ss"></div>
<!-- <iframe id="ifr" src="https://10.4.122.210:8443/testssl" onload="ilo();"></iframe> -->
<% out.println(request.getAttribute("msg"));%>

<br><br><br><br><br><br><br><br><br><br><br><br><br>
asdfasdf
<br><br><br><br><br><br><br><br><br><br>
asdfasdfasd
</body>
</html>