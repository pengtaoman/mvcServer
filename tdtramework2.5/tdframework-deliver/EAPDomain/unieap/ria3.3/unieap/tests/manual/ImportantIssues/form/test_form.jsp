<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>表单测试</title>
        <%@ include file="/unieap/ria3.3/pages/config.jsp" %>
         <script type="text/javascript" src="../data.js"></script>
        <script type="text/javascript" src="test_form.js">
        </script>
    </head>
    <body class="unieap">
    	<div dojoType="unieap.layout.TabContainer" style="height:600px;width:100%;">
    		<div dojoType="unieap.layout.ContentPane" title="表单测试 - 1">
    			
    			<div dojoType="unieap.layout.TitlePane" open="open" title="[U_EAP00009258]">
    				<span style="font-size:9pt;color:blue">
						测试说明：
						<br>
						此测试用例用于验证RIA缺陷：[U_EAP00009258]
						<br>
						预期结果：
						<br>
						普通文本字体和多行文本字体一样
						<br>
					</span>
					<div dojoType="unieap.form.Form">
						名称：<div dojoType="unieap.form.TextBox"></div>
						<br>
						<br>
						描述：<div dojoType="unieap.form.Textarea"></div>
					</div>
				</div>
				
				<div dojoType="unieap.layout.TitlePane" open="open" title="[U_EAP00009719]">
					<span style="font-size:9pt;color:blue">
						测试说明：
						<br>
						此测试用例用于验证RIA缺陷：[U_EAP00009719]
						<br>
						预期结果：
						<br>
						普通文本可以对空格(包括全角空格)进行trim处理；
						<br>
						多行文本可以对空格(包括全角空格)进行trim处理。
						<br>
					</span>
					<div dojoType="unieap.form.Form">
						名称：<div dojoType="unieap.form.TextBox" trim="true" required="true"></div>
						<br>
						<br>
						描述：<div dojoType="unieap.form.Textarea" trim="true" required="true"></div>
					</div>
				</div>
				
				<div dojoType="unieap.layout.TitlePane" open="open" title="[U_EAP00011571]">
					<span style="font-size:9pt;color:blue">
						测试说明：
						<br>
						此测试用例用于验证RIA缺陷：[U_EAP00011571]
						<br>
						预期结果：
						<br>
						普通文本设置最大长度16，允许输入8个字符，4个汉字;最小长度为4。
						<br>
						多行文本设置最大长度16，允许输入8个字符，4个汉字;;最小长度为4。
						<br>
					</span>
					<div dojoType="unieap.form.Form">
						名称：<div dojoType="unieap.form.TextBox" maxLength="8" minLength="4"></div>
						<br>
						<br>
						描述：<div dojoType="unieap.form.Textarea" maxLength="8" minLength="4"></div>
					</div>
				</div>
    		</div>
    		
    		<div dojoType="unieap.layout.ContentPane" title="表单测试 - 2">
    			<div dojoType="unieap.layout.TitlePane" open="open" title="[U_EAP00010923]">
    				<span style="font-size:9pt;color:blue">
						测试说明：
						<br>
						此测试用例用于验证RIA缺陷：[U_EAP00010923]
						<br>
						预期结果：
						<br>
						form表单绑定数据时，初始化时，不出现校验提示框；当鼠标焦点离开时，空值项进行校验。
						<br>
					</span>
		    		<div dojoType="unieap.form.Form" id='t_form' jsId="t_form" binding="{store:'demo'}">
						名称：<div id="name" dojoType="unieap.form.TextBox" binding="{name:'name'}" required="true"></div>
						<br>
						<br>
						年龄：<div id="age" dojoType="unieap.form.NumberTextBox" binding="{name:'age'}" required="true"></div>
						<br>
						<br>
						简介：<div id="introduction" dojoType="unieap.form.Textarea" binding="{name:'introduction'}" required="true"></div>
					</div>
				</div>
    		</div>
    		
    		
    		<div dojoType="unieap.layout.ContentPane" title="表单测试 - 3">
    			<div dojoType="unieap.layout.TitlePane" open="open" title="[U_EAP00011441]">
    				<span style="font-size:9pt;color:blue">
						测试说明：
						<br>
						此测试用例用于验证RIA缺陷：[U_EAP00011441]
						<br>
						预期结果：
						<br>
						初始化时，下拉列表控件含有默认值时，底色应该为白色，而不是未填写数据时的黄色。
						<br>
					</span>
		    		<div dojoType="unieap.form.Form">
						<div id="t_combobox" jsId="t_combobox" dojoType="unieap.form.ComboBox" hasDefault='true' required="true"
							dataProvider="{store:'deptDataStore'}"
							decoder="{displayAttr:'attr_deptname',valueAttr:'attr_deptno'}"></div>
					</div>
				</div>
    		</div>
    		
    		<div dojoType="unieap.layout.ContentPane" title="表单测试 - 4">
    			<div dojoType="unieap.layout.TitlePane" open="open" title="[U_EAP00011814]">
    				<span style="font-size:9pt;color:blue">
						测试说明：
						<br>
						此测试用例用于验证RIA缺陷：[U_EAP00011814]
						<br>
						预期结果：
						<br>
						ComboBox.setValue的值为undefined时无错误
						<br>
					</span>
		    		<div dojoType="unieap.form.Form">
						<div id="test_combobox" jsId="test_combobox" dojoType="unieap.form.ComboBox" required="true"></div>
						<br>
						
						<div dojoType="unieap.form.Button" label="设置值为空" onClick="test_combobox.setValue();"></div>
						<br>
						<div dojoType="unieap.form.TextBox" id="tb"></div>
						<div dojoType="unieap.form.Button" label="设置值" onClick="setValue"></div>
						<br>
						<div dojoType="unieap.form.Button" label="获取值" onClick="getValue"></div>
						
					</div>
				</div>
    		</div>
    		
    		<div dojoType="unieap.layout.ContentPane" title="表单测试 - 5">
    			<div dojoType="unieap.layout.TitlePane" open="open" title="[U_EAP00011185]">
    				<span style="font-size:9pt;color:blue">
						测试说明：
						<br>
						此测试用例用于验证RIA缺陷：[U_EAP00011185]
						<br>
						预期结果：
						<br>
						下拉列表设置值为'true'/'false'时，无修改标记
						<br>
					</span>
		    		<div dojoType="unieap.form.Form" binding={store:'formDs'}>
						<div id="cbb" jsId="cbb" dojoType="unieap.form.ComboBox" required="true" dataType='boolean'
							binding={name:'cbb'}
							dataProvider="{store:'booleanDataStore'}"
							></div>
					</div>
				</div>
    		</div>
    	</div>
    </body>
</html>
