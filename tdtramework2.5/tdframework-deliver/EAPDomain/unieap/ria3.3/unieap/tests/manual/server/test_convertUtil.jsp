<%@ page contentType="text/html; charset=UTF-8" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        </meta>
        <title>测试将查询结果放入DataStore中</title>
        <%@ include file="/unieap/ria3.3/pages/config.jsp" %>
	</head>
	<script type = "text/javascript">
		function test(){
			
			unieap.Action.requestData({
				url:unieap.WEB_APP_NAME+ "/utilTest.do?method=test_codelistToDS", 
				sync:true,
				load:function(dc){
					unieap.debug(dc);
				}
			});
		}
	</script>
    <body class="unieap">
    	<div dojoType="unieap.layout.TitlePane" title="">
			 <div dojoType="unieap.form.Button" label="test" onClick="test"></div>
		</div>
		<div dojoType="unieap.layout.TitlePane" title="说明">
				CodeList codeList = CodeListManager.getCodeListCache().getDefaultCodeList();<br>
			OneKindCodes oneKindCodes = null;<br>
			oneKindCodes = codeList.getOneKindCodes("AAC012");<br>
			得到codelist中的一个类别转为DataStore
			DataStore ds = ConvertionUtil.codelistToDS(oneKindCodes);<br>
			</div>	
    </body>
</html>