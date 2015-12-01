<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
		<script type="text/javascript" src="../data.js"></script>
		<script type="text/javascript" src="test_grid.js"></script>
    </head>
    <body class="unieap">
    <div dojoType="unieap.layout.TitlePane" title=查询条件 >

		<div id="combobox" jsId="combobox" dojoType="unieap.form.ComboBox" 
			dataProvider="{store:'demo'}"
			decoder="{displayAttr:'value',valueAttr:'key'}"
			onChange="change">
		</div>
	</div>
		<div id="t_grid" jsId="t_grid" dojoType="unieap.grid.Grid" height="79%" 
			views="{rowNumber:true,enableTooltip:true}" selection="{selectType:'m'}"
			edit="{editType:'rowEdit'}">
			<header>
			<fixed>
			
				<cell width="20%" label="员工编号" name="attr_empno"></cell>
			</fixed>
				<cell width="30%" label="姓名" name="NAME" editor="{editorClass:'unieap.form.TextBox'}"></cell>
				<cell width="20%" label="职位" name="attr_job" headerStyles="text-align: left;"></cell>
				<cell width="20%" label="工资" name="attr_sal" editor="{editorClass:'unieap.form.NumberTextBox'}" headerStyles="text-align: left;"></cell>
				<cell width="10%" label="地址" name="attr_address" editor="{editorClass:'unieap.form.TextBox'}" headerStyles="text-align: left;" enableToolTip="true"></cell>
			</header>
		</div>
	</body>
</html>