<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    </meta>
    <title>inlineEditBox</title>
    <style type="text/css">
        @import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
    </style>
    <script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js">
    </script>
    <script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js">
    </script>
	<script type="text/javascript" src="<%=appPath%>/pages/samples/form/textbox/inlineEditBox_advance.js">
    </script>
</head>
<body class="unieap">
    <div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="表单InlineEditBox控件说明">
        ·编辑类型为日期选择框；
        <br>
		·数据绑定；
        <br>
        ·设置底边线不显示；
        <br>
        ·值格式化和解码；
        <br>
        ·不可编辑。
        <br>
    </div>
    <div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="表单InlineEditBox控件说明">
	 <fieldset dojoType="unieap.form.FieldSet" title="表单InlineEditBox控件">
	 <table width="100%" border="0">
	 	<tr width="20%">
        <td><div dojoType="unieap.form.InlineEditBox"
							 editor="{editorClass:'unieap.form.DateTextBox'}"></div>
		</td>
        <td>编辑类型为日期选择框</td>
      </tr>
      <tr width="20%">     	
        <td>
        	<form dojoType="unieap.form.Form" binding="{store:'empDataStore'}">
        		  <div dojoType="unieap.form.InlineEditBox" id="ieb1" binding="{name:'attr_ename'}"></div>
        	</form>
        </td>
        <td>数据绑定（数据修改时左上方显示红三角）</td>
      </tr>
      <tr width="20%">
        <td><div dojoType="unieap.form.InlineEditBox"  showUnderLine="false" value="基础软件">
        </div></td>
        <td>底边不显示</td>
      </tr>
      <tr width="20%">
        <td><div dojoType="unieap.form.InlineEditBox"  decoder="{store:'city_store'}" value="1">
        </div></td>
        <td>decoder解码(输入1显示宁波，2显示宁海等)</td>
      </tr>
      <tr width="20%">
        <td><div dojoType="unieap.form.InlineEditBox"  displayFormatter="{declaredClass:'unieap.form.NumberDisplayFormatter',dataFormat:'$###,###.00'}" value="2000">
        </div></td>
        <td>值格式化(输入数字，显示货币格式)</td>
      </tr>
      <tr width="20%">
        <td><div dojoType="unieap.form.InlineEditBox"  disabled="true" value="基础软件">
        </div></td>
        <td>设置为不可编辑</td>
      </tr>
    </table>
	</fieldset>
    </div>
    <div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="表单InlineEditBox控件源码">
        <textarea name="code" class="html">
        	<!--日期框-->
			<div dojoType="unieap.form.InlineEditBox" editor="{editorClass:'unieap.form.DateTextBox'}"></div>
			<!-- 数据绑定 -->
			<form dojoType="unieap.form.Form" binding="{store:'empDataStore'}">
				  <div dojoType="unieap.form.InlineEditBox" id="ieb1" binding="{name:'attr_ename'}"></div>
			</form>
			<!--底边隐藏-->
			<div dojoType="unieap.form.InlineEditBox"  showUnderLine="false" value="基础软件">
        	</div>
			<!--decoder解码-->
			<div dojoType="unieap.form.InlineEditBox"  decoder="{store:'city_store'}" value="1">
        	</div>
			<!--值格式化-->
			<div dojoType="unieap.form.InlineEditBox"  displayFormatter="{declaredClass:'unieap.form.NumberDisplayFormatter',dataFormat:'$###,###.00'}" value="2000">
        	</div>
			<!--设置为不可编辑-->
			<div dojoType="unieap.form.InlineEditBox"  disabled="true" value="基础软件">
        	</div>
        </textarea>
    </div>
</body>
</html>
