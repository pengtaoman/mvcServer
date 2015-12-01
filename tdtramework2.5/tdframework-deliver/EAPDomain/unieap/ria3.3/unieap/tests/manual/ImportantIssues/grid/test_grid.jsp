<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>数据表格测试</title>
		<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
		<script type="text/javascript" src="../data.js"></script>
		<script type="text/javascript" src="test_grid.js"></script>
    </head>
    <body class="unieap">
		<div dojoType="unieap.layout.TabContainer" style="height:100%;width:100%;">
			<div dojoType="unieap.layout.ContentPane" title="数据表格测试 - 1">
				<div dojoType="unieap.layout.TitlePane" open="open" title="[U_EAP00010830]">
					<span style="font-size:9pt;color:blue">
						测试说明：
						<br>
						此测试用例用于验证RIA缺陷：[U_EAP00010830]
						<br>
						预期结果：
						<br>
						数据表格的选择操作为多选。当无数据绑定的时候，左上角的多选按钮处于未选中状态，不可操作。
						<br>
						点击按钮，数据表格绑定数据，左上角的多选按钮可以操作。
						<br>
					</span>
					<div id="grid" jsId="grid" dojoType="unieap.grid.Grid" width="650px" height="300px" 
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
					<span style="font-size:9pt;color:blue">点击下面按钮，为表格绑定数据。</span>
					<button onclick="setStore()">绑定数据</button>
				</div>
			</div>
			
			<div dojoType="unieap.layout.ContentPane" title="数据表格测试 - 2">
				<div dojoType="unieap.layout.TitlePane" open="open" title="[U_EAP00010880]">
					<span style="font-size:9pt;color:blue">
						测试说明：
						<br>
						此测试用例用于验证RIA缺陷：[U_EAP00010880]
						<br>
						预期结果：
						<br>
						在数据表格中姓名一列输入HTML的转义字符，能够正确显示输入的数据，而不是转义以后的数据。
						<br>
					</span>
					<div dojoType="unieap.grid.Grid" width="595px" height="300px" 
						views="{rowNumber:true}"
						binding="{store:'empDataStore'}"
						edit="{editType:'rowEdit'}">
						<header>
							<cell label="员工编号" width="150" name="attr_empno"></cell>
							<cell width="100px" label="姓名" name="NAME" editor="{editorClass:'unieap.form.TextBox'}"></cell>
							<cell width="150px" label="职位" name="attr_job" headerStyles="text-align: left;"></cell>
							<cell width="150px" label="工资" name="attr_sal" editor="{editorClass:'unieap.form.NumberTextBox'}" headerStyles="text-align: left;"></cell>
						</header>
					</div>
				</div>
			</div>
			
			<div dojoType="unieap.layout.ContentPane" title="数据表格测试 - 3">
				<div dojoType="unieap.layout.TitlePane" open="open" title="[U_EAP00011408]">
					<span style="font-size:9pt;color:blue">
						测试说明：
						<br>
						此测试用例用于验证RIA缺陷：[U_EAP00011408]
						<br>
						预期结果：
						<br>
						数据表格数据不合法(例如姓名为空)，点击校验按钮，鼠标自动聚焦不合法的单元格，且不会出现红叹号
						<br>
					</span>
					<div id="edit_grid" jsId="edit_grid" dojoType="unieap.grid.Grid" width="595px" height="300px" 
						views="{rowNumber:true}"
						binding="{store:'empDataStore'}"
						edit="{editType:'rowEdit'}">
						<header>
							<cell label="员工编号" width="150" name="attr_empno"></cell>
							<cell width="100px" label="姓名" name="NAME" editor="{editorClass:'unieap.form.TextBox',editorProps:{validator:{realTime:true},required:true}}"></cell>
							<cell width="150px" label="职位" name="attr_job" headerStyles="text-align: left;"></cell>
							<cell width="150px" label="工资" name="attr_sal" editor="{editorClass:'unieap.form.NumberTextBox'}" headerStyles="text-align: left;"></cell>
						</header>
					</div>
					<div dojoType="unieap.form.Button" label="校验" onClick="validate"></div>
				</div>
			</div>
			
			<div dojoType="unieap.layout.ContentPane" title="数据表格测试 - 4">
				<div dojoType="unieap.layout.TitlePane" open="open" title="[U_EAP00011143]">
					<span style="font-size:9pt;color:blue">
						测试说明：
						<br>
						此测试用例用于验证RIA缺陷：[U_EAP00011143]
						<br>
						预期结果：
						<br>
						数据表格使用ToolTip属性，页面右侧无滚动条，无晃动。
						<br>
					</span>
					<div id="tooltip_grid" jsId="tooltip_grid" dojoType="unieap.grid.Grid" width="100%" height="500px" 
						views="{rowNumber:true,enableTooltip:true}"
						binding="{store:'empDataStore'}"
						edit="{editType:'rowEdit'}">
						<header>
							<cell width="20%" label="员工编号" name="attr_empno"></cell>
							<cell width="30%" label="姓名" name="NAME" editor="{editorClass:'unieap.form.TextBox'}"></cell>
							<cell width="20%" label="职位" name="attr_job" headerStyles="text-align: left;"></cell>
							<cell width="20%" label="工资" name="attr_sal" editor="{editorClass:'unieap.form.NumberTextBox'}" headerStyles="text-align: left;"></cell>
							<cell width="10%" label="地址" name="attr_address" editor="{editorClass:'unieap.form.TextBox'}" headerStyles="text-align: left;" enableToolTip="true"></cell>
						</header>
					</div>
				</div>
			</div>
			
			<div dojoType="unieap.layout.ContentPane" title="数据表格测试 - 5">
				<div dojoType="unieap.layout.TitlePane" open="open" title="[U_EAP00011374]">
					<span style="font-size:9pt;color:blue">
						测试说明：
						<br>
						此测试用例用于验证RIA缺陷：[U_EAP00011374]
						<br>
						预期结果：
						<br>
						下拉列表切换时，为数据表格绑定数据，数据表格表头无晃动。
						<br>
					</span>
					<div dojoType="unieap.form.Button" id="test_dialog_grid" jsId="test_dialog_grid" label="弹出对话框" onClick="click"></div>
				</div>
			</div>
			
		</div>
    </body>
</html>
