<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>DataCenter测试</title>
		<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
		<script type="text/javascript" src="test_datacenter.js"></script>
    </head>
    <body class="unieap">
    	<div dojoType="unieap.layout.TabContainer" style="height:100%;width:100%;">
    		<div dojoType="unieap.layout.ContentPane" title="DataCenter测试 - 1">
				<div dojoType="unieap.layout.TitlePane" open="open" title="[U_EAP00010503]">
					<span style="font-size:9pt;color:blue">
						测试说明：
						<br>
						此测试用例用于验证RIA缺陷：[U_EAP00010503]
						<br>
						预期结果：
						<br>
						新new出来的DataStore的pageSize的默认值为   
						<br>
					</span>
				</div>
			</div>
    	</div>
    </body>
</html>