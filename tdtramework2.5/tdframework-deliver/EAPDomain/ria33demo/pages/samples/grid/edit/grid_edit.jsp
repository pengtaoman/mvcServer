<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Grid</title>
		<style type="text/css">
			@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
			@import "<%=appPath%>/pages/samples/blackbird/blackbird.css";
		</style>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/grid/edit/grid_edit.js"></script>
    </head>
    <body class="unieap">
	    <div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="说明"> 
			该样例展示了数据表格（Grid）组件中与编辑相关的特性：<br>
			·支持行编辑和单元格编辑两种编辑模式；<br>
			·根据Editor的decoder属性或displayFormatter属性等可以格式化列值；<br>
			·行编辑模式下回车可以切换编辑域或切换到下一行；<br>
			·支持动态改变列的编辑器。<br>
		</div>
		<br />
		<div id="grid" dojoType="unieap.grid.Grid" width="100%" height="200px"
			binding="{store:'empDataStore'}" views="{rowNumber:true,rowBar:true,orderType:'client'}" 
			rows="{defaultRowHeight:21}" views="{rowNumber:true,rowBar:true,orderType:'none'}"
			selection="{selectType:'m'}" 
			edit="{editType:'rowEdit',singleClickEdit:false}">
			<fixed>
				<cell label="员工编号" width="60" name="attr_empno"  styles="color:red;" editor="{editorClass:'unieap.form.TextBox',editorProps:{textAlign:'left'}}"></cell>
			</fixed>
			<header>
				<cell width="20%" label="姓名" name="attr_ename" headerStyles="text-align: left;" editor="{editorClass:'unieap.form.TextBox',editorProps:{textAlign:'left'}}" ></cell>
				<cell width="20%" label="部门" name="attr_deptno" decoder="{store:'DEPT',valueAttr:'CODEVALUE',displayAttr:'CODENAME'}" editor="{editorClass:'unieap.form.ComboBox',editorProps:{dataProvider:{store: 'DEPT'},decoder:{valueAttr:'CODEVALUE',displayAttr:'CODENAME'}}}"></cell>
				<cell width="20%" label="入职日期" name="attr_hiredate" displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}"  editor="{editorClass:'unieap.form.DateTextBox',editorProps:{displayFormatter:{dataFormat:'yyyy-MM-dd'}}}"></cell>
				<cell width="20%" label="职位" name="attr_job" headerStyles="text-align: left;"  editor="{editorClass:'unieap.form.TextBox',editorProps:{textAlign:'left'}}"></cell>
				<cell width="20%" label="工资" name="attr_sal"  editor="{editorClass:'unieap.form.TextBox',editorProps:{textAlign:'left'}}"></cell>
			</header>
		</div>
		<br />
		<table border="1" width="100%" cellspacing="0" cellpadding="0">
			<tr>
				<th width="200">操作</th>
				<th>说明</th>
			</tr>
			<tr>
				<td><div dojoType="unieap.form.Button" label="设置为行编辑" width="100%" class="formfield"  onclick="setRowEdit()" style="text-align: left;"></div></td>
				<td>切换当前的编辑模式为行编辑模式。</td>
			</tr>
			<tr>
				<td><div dojoType="unieap.form.Button" label="设置单元格编辑" width="100%" class="formfield"  onclick="setCellEdit()" style="text-align: left;"></div></td>
				<td>切换当前的编辑模式为单元格编辑模式。</td>
			</tr>
			<tr>
				<td><div dojoType="unieap.form.Button" label="设置不可编辑" width="100%" class="formfield"  onclick="setReadOnly()" style="text-align: left;"></div></td>
				<td>切换当前的编辑模式为不可编辑模式。</td>
			</tr>
			<tr>
				<td><div dojoType="unieap.form.Button" label="切换列编辑器" width="100%" class="formfield"  onclick="changeEditor()" style="text-align: left;"></div></td>
				<td>将“部门”列的编辑器改为“unieap.form.TextBox”。</td>
			</tr>
		</table>
		<br />
		<div dojoType="unieap.layout.TitlePane" open="open" title="代码">
			<textarea name="code" class="html">
				<div dojoType="unieap.grid.Grid" width="100%" height="200px"
					 binding="{store:'empDataStore'}" views="{rowNumber:true,rowBar:true,orderType:'client'}" selection="{selectType:'m'}">
					<fixed>
						<cell label="员工编号" width="60" name="attr_empno"  styles="color:red;" editor="{editorClass:'unieap.form.TextBox',editorProps:{textAlign:'left'}}"></cell>
					</fixed>
					<header>
						<cell label="姓名" name="NAME" editor="{editorClass:'unieap.form.TextBox'" ></cell>
						<cell label="部门" name="attr_deptno" decoder="{store:'DEPT',valueAttr:'CODEVALUE',displayAttr:'CODENAME'}" 
							  editor="{editorClass:'unieap.form.ComboBox',editorProps:{dataProvider:{store: 'DEPT'}">
						</cell>
						<cell label="入职日期" name="attr_hiredate" editor="{editorClass:'unieap.form.DateTextBox'"
							  displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}">
						</cell>
						<cell label="职位" name="attr_job" editor="{editorClass:'unieap.form.TextBox'}"></cell>
						<cell label="工资" name="attr_sal"  editor="{editorClass:'unieap.form.TextBox'}"></cell>
					</header>
				</div>
				
				<script type="text/javascript">
					//设置行编辑
					function setRowEdit() {
						var edit = unieap.byId('grid').getManager("EditManager");
						edit.setType("rowEdit");
					}
					//设置单元格编辑
					function setCellEdit() {
						var edit = unieap.byId('grid').getManager("EditManager");
						edit.setType("cellEdit");
					}
					//设置不可编辑
					function setReadOnly() {
						var edit = unieap.byId('grid').getManager("EditManager");
						edit.setType("readonly");
					}
					//改变编辑器
					function changeEditor() {
						var layout = unieap.byId('grid').getManager("LayoutManager")
						var cell = layout.getCell("attr_deptno");
						cell.setEditor('unieap.form.TextBox', {textAlign:'left'})
					}
				</script>
			</textarea>
		</div>
    </body>
</html>
