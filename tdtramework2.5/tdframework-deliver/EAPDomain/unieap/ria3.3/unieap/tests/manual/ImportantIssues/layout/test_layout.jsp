<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>布局测试</title>
		<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
		<script type="text/javascript" src="../data.js"></script>
		<script type="text/javascript" src="test_layout.js"></script>
    </head>
    <body class="unieap">
		<div dojoType="unieap.layout.TabContainer" style="height:100%;width:100%;">
			<div dojoType="unieap.layout.ContentPane" title="布局测试 - 1">
				<div dojoType="unieap.layout.TitlePane" open="open" title="[U_EAP00009051]">
					<span style="font-size:9pt;color:blue">
						测试说明：
						<br>
						此测试用例用于验证RIA缺陷：[U_EAP00009051]
						<br>
						预期结果：
						<br>
						TabContainer容器高度设置为"100%"，在IE6下能正确显示底边线
						<br>
					</span>
					<div id="grid" jsId="grid" dojoType="unieap.grid.Grid" width="650px" height="300px"
						binding="{store:'empDataStore'}"
						views="{rowNumber:true,enableTooltip:true}"
						selection="{selectType:'m'}">
						<header>
							<cell label="员工编号" width="150px" name="attr_empno"></cell>
							<cell width="100px" label="姓名" name="NAME"></cell>
							<cell width="150px" label="职位" name="attr_job" headerStyles="text-align: left;"></cell>
							<cell width="100px" label="部门" name="attr_deptno" 
								decoder="{store:'DEPT',valueAttr:'CODEVALUE',displayAttr:'CODENAME'}"
								headerStyles="text-align: left;">
							</cell>
							<cell width="100px" label="工资" name="attr_sal" headerStyles="text-align: left;"></cell>
						</header>
					</div>
				</div>
			</div>
			
			
			<div dojoType="unieap.layout.ContentPane" title="布局测试 - 2">
				<div dojoType="unieap.layout.TitlePane" open="open" title="[U_EAP00011485]" id="titlePane">
					<span style="font-size:9pt;color:blue">
						测试说明：
						<br>
						此测试用例用于验证RIA缺陷：[U_EAP00011485]
						<br>
						预期结果：
						<br>
						TitlePane的setContent方法
						<br>
					</span>
					<div id="form" dojoType="unieap.form.Button" label="setContent方法" onClick="click"></div>
				</div>
			</div>
		</div>
    </body>
</html>
