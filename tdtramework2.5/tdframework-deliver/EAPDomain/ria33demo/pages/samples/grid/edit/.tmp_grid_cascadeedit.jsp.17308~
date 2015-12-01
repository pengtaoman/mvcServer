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
		<script type="text/javascript" src="<%=appPath%>/pages/samples/grid/edit/grid_cascadeedit.js"></script>

    </head>
    <body class="unieap">
	    <div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="说明">
			该样例展示了数据表格（Grid）组件中与编辑相关的如下特性：<br>
			·ComboBox级联编辑，修改“所在省”列，“所在市”列将随之联动；<br>
			·Checkbox，RadioButton和ComboBoxTree编辑。<br>
		</div>
		<br />
		<div id="grid" dojoType="unieap.grid.Grid" width="100%" height="200px"
			binding="{store:'empDataStore'}" rows="{defaultRowHeight:21}"
			views="{rowNumber:true,rowBar:true,orderType:'none'}"
			selection="{selectType:'m'}" edit="{editType:'cellEdit',singleClickEdit:false}">
			<fixed>
				<cell label="员工编号" width="120px" editor="{editorClass:'unieap.form.TextBox',editorProps:{textAlign:'left'}}" name="attr_empno" headerStyles="text-align: left;"></cell>
			</fixed>
			<header>
				<cell width="120px" label="姓名" name="NAME" onBeforeEdit="mybe" editor="{editorClass:'unieap.form.TextBox',editorProps:{textAlign:'left'}}" headerStyles="text-align: left;"></cell>
				<cell width="80px" label="部长" name="master" editor="{editorClass:'unieap.form.RadioButton',editorProps:{checkedValue:1,uncheckedValue:0}}"></cell>
				<cell width="50px" label="婚否" name="married" editor="{editorClass:'unieap.form.CheckBox',editorProps:{checkedValue:1,uncheckedValue:0}}"></cell>
				<cell width="100px" label="籍贯" name="attr_jiguan" decoder="{store:'jiguan',valueAttr:'id',displayAttr:'label'}" editor="{editorClass:'unieap.form.ComboBoxTree',editorProps:{value:'111',popup:{width:'200px'},treeJson:{binding:{store:'jiguan',leaf:'leaf',query:{name:'parent',relation:'=',value:''}}}  }}"></cell>
				<cell width="100px" label="入职日期" name="attr_hiredate" editor="{editorClass:'unieap.form.DateTextBox',editorProps:{displayFormatter:{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}}}"></cell>
				<cell width="100px" label="所在省"  name="attr_province" 
					  editor="{editorClass:'unieap.form.ComboBox',editorProps:{id:'ed_province',dataProvider:{store: 'p'}}}"></cell>
				<cell width="100px" label="所在市"  name="attr_city" 
					  editor="{editorClass:'unieap.form.ComboBox',editorProps:{dataProvider:{store: 'c1'},cascade:{primary:'ed_province',getCascadeStore:getCascade}}}"></cell>
			</header>
		</div>
		<br />
		<div dojoType="unieap.layout.TitlePane" open="open" title="代码">
			<textarea name="code" class="html">
				<div id="grid" dojoType="unieap.grid.Grid" width="100%" height="200px"
					binding="{store:'empDataStore'}" rows="{defaultRowHeight:21}"
					views="{rowNumber:true,rowBar:true,orderType:'none'}"
					selection="{selectType:'m'}" edit="{editType:'cellEdit',singleClickEdit:false}">
					<fixed>
						<cell label="员工编号" width="120px" editor="{editorClass:'unieap.form.TextBox',editorProps:{textAlign:'left'}}" name="attr_empno" headerStyles="text-align: left;"></cell>
					</fixed>
					<header>
						<cell width="120px" label="姓名" name="NAME" onBeforeEdit="mybe" editor="{editorClass:'unieap.form.TextBox',editorProps:{textAlign:'left'}}" headerStyles="text-align: left;"></cell>
						<cell width="80px" label="部长" name="master" editor="{editorClass:'unieap.form.RadioButton',editorProps:{checkedValue:1,uncheckedValue:0}}"></cell>
						<cell width="50px" label="婚否" name="married" editor="{editorClass:'unieap.form.CheckBox',editorProps:{checkedValue:1,uncheckedValue:0}}"></cell>
						<cell width="100px" label="籍贯" name="attr_jiguan" decoder="{store:'jiguan',valueAttr:'id',displayAttr:'label'}" editor="{editorClass:'unieap.form.ComboBoxTree',editorProps:{value:'111',popup:{width:'200px'},treeJson:{binding:{store:'jiguan',leaf:'leaf',query:{name:'parent',relation:'=',value:''}}}  }}"></cell>
						<cell width="100px" label="入职日期" name="attr_hiredate" editor="{editorClass:'unieap.form.DateTextBox',editorProps:{displayFormatter:{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}}}"></cell>
						<cell width="100px" label="所在省"  name="attr_province" 
							  editor="{editorClass:'unieap.form.ComboBox',editorProps:{id:'ed_province',dataProvider:{store: 'p'}}}"></cell>
						<cell width="100px" label="所在市"  name="attr_city" 
							  editor="{editorClass:'unieap.form.ComboBox',editorProps:{dataProvider:{store: 'c1'},cascade:{primary:'ed_province',getCascadeStore:getCascade}}}"></cell>
					</header>
				</div>
			</textarea>
		</div>
    </body>
</html>
