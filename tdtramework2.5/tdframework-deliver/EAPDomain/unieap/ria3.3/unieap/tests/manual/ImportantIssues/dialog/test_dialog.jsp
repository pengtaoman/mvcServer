<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>对话框测试</title>
		<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
		
		<script type="text/javascript" src="test_dialog.js"></script>
    </head>
    <body class="unieap">
    	<div dojoType="unieap.layout.TabContainer" style="height:100%;width:100%;">
    		<div dojoType="unieap.layout.ContentPane" title="对话框测试 - 1">
    			<div dojoType="unieap.layout.TitlePane" open="open" title="[U_EAP00011605]">
					<span style="font-size:9pt;color:blue">
						测试说明：
						<br>
						此测试用例用于验证RIA缺陷：[U_EAP00011605]
						<br>
						预期结果：
						<br>
						Dialog支持自适应内容的高，宽，可以不需要设置高度和宽度
						<br>
					</span>
					<div dojoType="unieap.form.Button" label="自适应宽度对话框" id="test_wd" jsId="test_wd" onClick="popWidthDialog()"></div>
					<div dojoType="unieap.form.Button" label="自适应高度对话框" id="test_hd" jsId="test_hd" onClick="popHeightDialog()"></div>
					<div dojoType="unieap.form.Button" label="自适应对话框" id="test_d" jsId="test_d" onClick="popDialog()"></div>
				</div>
    		</div>
    		
    		<div dojoType="unieap.layout.ContentPane" title="对话框测试 - 2">
    			<div dojoType="unieap.layout.TitlePane" open="open" title="[U_EAP00011170]">
					<span style="font-size:9pt;color:blue">
						测试说明：
						<br>
						此测试用例用于验证RIA缺陷：[U_EAP00011170]
						<br>
						预期结果：
						<br>
						支持设置Dialog的高度。初始值Dialog的高度设置为400px,5秒后高度设置为500px
						<br>
					</span>
					<div dojoType="unieap.form.Button" label="弹出对话框" id="t_dialog" jsId="t_dialog" onClick="popTestDialog()"></div>
				</div>
    		</div>
    		
    		<div dojoType="unieap.layout.ContentPane" title="对话框测试 - 3">
    			<div dojoType="unieap.layout.TitlePane" open="open" title="[U_EAP00011656]">
					<span style="font-size:9pt;color:blue">
						测试说明：
						<br>
						此测试用例用于验证RIA缺陷：[U_EAP00011656]
						<br>
						预期结果：
						<br>
						在IE8下，不适用兼容性试图，弹出对话框后无滚动条
						<br>
					</span>
					<div dojoType="unieap.form.Button" label="新建对话框" id="td" jsId="td" onClick="newDialog()"></div>
				</div>
    		</div>
    	</div>
    </body>
</html>