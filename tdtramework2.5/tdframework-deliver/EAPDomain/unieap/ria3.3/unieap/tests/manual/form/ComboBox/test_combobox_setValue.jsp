<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
        </meta>
		<title>U_EAP00011814 ComboBox.setValue的值为undefined时有脚本错误</title>
		<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
		<script type="text/javascript">
			
			var ds=new unieap.ds.DataStore("ds",[
				{CODEVALUE:'1',CODENAME:'One'},
				{CODEVALUE:'2',CODENAME:'Two'},
				{CODEVALUE:'3',CODENAME:'Tree'}
			]);
			dataCenter.addDataStore(ds);
			
			function fn(){
				unieap.byId('box').setValue('1');
			}
			
			function fn1(){
				unieap.byId('box').setValue(undefined);
			}
		</script>
    </head>
    <body class="unieap">
	  	<div id="titlePane1" dojoType="unieap.layout.TitlePane" title="用例说明" height="10%">
				测试功能点：
				<li>调用ComboBox控件的setValue方法，当传入值为undefined时控件报错</li>
	  	</div>
        <div id="titlePane2" dojoType="unieap.layout.TitlePane" title="测试用例" height="90%" style="float:left;width:35%" >
			<div dojoType="unieap.form.ComboBox" id='box' dataProvider="{store:'ds'}"></div>
			<div style='margin:5px'></div>
			<div dojoType="unieap.form.Button" style='margin-right:5px' label="设置值为1" onClick="fn"></div>
			<div dojoType="unieap.form.Button" label="设置值为undefined" onClick="fn1"></div>
		</div>
		<div id="titlePane3" dojoType="unieap.layout.TitlePane" title="说明" height="90%" style="float:right;width:65%">
			<table border="1" bordercolor="#99BBE8">
				<colgroup>
					<col style="width:30%"></col>
					<col style="width:35%"></col>
					<col style="width:35%"></col>
				</colgroup>
				<tr height="50px">
					<td><strong>功能点描述</strong></td>
					<td><strong>操作过程</strong></td>
					<td><strong>预期结果</strong></td>
				</tr>
				<tr height="50px">
					<td style="vertical-align:top">测试setValue</td>
					<td style="vertical-align:top">点击左侧的两个按钮</td>
					<td style="vertical-align:top">下拉框的值分别为1和空,不报错</td>
				</tr>
			</table>
		</div>
    </body>
</html>
