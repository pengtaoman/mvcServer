<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Grid样例</title>
		<style type="text/css">
			@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
		</style>

		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushJScript.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/grid/advanced/grid_cells.js"></script>
    </head>
    <body class="unieap">
	   <div dojoType="unieap.layout.TitlePane" open="open" title="说明">
			<span style="font-size:14px;color:red;">注意：当前版本下，本样例功能不能在复杂表头或多标题下使用。</span>
			<br>
		</div>
        <div dojoType="unieap.grid.Grid" id="grid" width="800px" height="250px" 
        	binding="{store:'empDataStore'}" views="{rowBar:true,rowNumber:true}">
            <header>
                <cell label="姓名(id:NAME)" name="attr_ename"  width="250px" id="NAME"></cell>
                <cell label="部门(id:attr_empno)" name="attr_empno" width="250px" id="attr_empno"></cell>
                <cell label="职位(id:attr_job)" name="attr_job" width="250px" id="attr_job"></cell>
                <cell label="工资(id:attr_sal)" name="attr_sal"  width="250px" id="attr_sal"></cell>
            </header>
        </div>
		<br>
		<table cellspacing="1" border="1">
			<colgroup>
				<col width="200px"/>
				<col width="200px"/>
			</colgroup>
			<tr>
				<td>
					<label>选择列：</label>
				</td>
				<td>
					<div popup="{displayStyle:'multi'}" id="nameCombo" dojoType="unieap.form.ComboBox" dataProvider="{'store':'cells'}" value="NAME"></div>
				</td>
			</tr>
			<tr>
				<td>
					<div dojoType="unieap.form.Button" onClick="hideCell()" label="隐藏列"></div>
				</td>
				<td>
					<div dojoType="unieap.form.Button" onClick="showCell()" label="显示列"></div>
				</td>
			</tr>
			<tr>
				<td>
					<div dojoType="unieap.form.Button" onClick="lockCell()" label="锁定列"></div>
				</td>
				<td>
					<div dojoType="unieap.form.Button" onClick="unlockCell()" label="解锁列"></div>
				</td>
			</tr>
		</table>
		<br>
		<table cellspacing="1" border="1">
			<colgroup>
				<col width="200px"/>
				<col width="200px"/>
			</colgroup>
			<tr>
				<td>
					<div dojoType="unieap.form.Button" onClick="sortCell()" label="排序列(输入列id，用逗号分隔)"></div>
				</td>
				<td>
					<input id="cellList"></input>
				</td>
			</tr>
		</table>
		<div dojoType="unieap.layout.TitlePane" open="open" title="说明">
			<br>
			<span style="font-size:14px;">排序列:</span>
			<textarea name="code" class="js">
				layout.sortCell(sequence, fixedNum);
			</textarea>
			<br>
			<span style="font-size:14px;">隐藏列:</span>
			<textarea name="code" class="js">
				layout.hideCell(cells);
			</textarea>
			<br>
			<span style="font-size:14px;">显示列(重新显示的列将被放在表格其他显示列之后):</span>
			<textarea name="code" class="js">
				layout.showCell(cells);
			</textarea>
			<br>
			<span style="font-size:14px;">锁定/解锁列:</span>
			<textarea name="code" class="js">
				layout.lockCell(cells, /*isLock*/bool);
			</textarea>
		</div>
    </body>
</html>
