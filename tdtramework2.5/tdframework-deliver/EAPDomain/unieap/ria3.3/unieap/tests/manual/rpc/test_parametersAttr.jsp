<%@ page contentType="text/html; charset=UTF-8" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        </meta>
        <title>测试requestData的parameters属性</title>
        <%@ include file="/unieap/ria3.3/pages/config.jsp" %>
	</head>
	<script type = "text/javascript">
		function test(){
			var dc = new unieap.ds.DataCenter();
			dc.addParameter("a#b","a#b");
			unieap.Action.requestData({
				url:unieap.WEB_APP_NAME+ "/RPCTest.do?method=testParameters", 
				parameters:{"a#b":"a#b"},
				sync:true,
				load:function(dc){
					
				}
			},dc);
		}
	 test();
	</script>
    <body class="unieap">
		    
    </body>
</html>