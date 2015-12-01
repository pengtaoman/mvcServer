<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        </meta>
        <title>comboBox_advanced</title>
        <style type="text/css">
            @import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
        </style>
        <script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js">
        </script>
        <script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js">
        </script>
        <script type="text/javascript" src="<%=appPath%>/pages/samples/form/combobox/comboBox_advanced.js">
        </script>
    </head>
    <body class="unieap">
        <div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="表单下拉框控件其它功能说明">
            ·设置下拉列表的宽高；
            <br>
            ·静态下拉框数据；
            <br>
            ·onChange等事件；
            <br>
            ·自定义下拉结构；
            <br>
            ·getValue/setValue；
            <br>
            ·默认选中第一项；
            <br>
            ·用户自定义数据源。
            <br>
        </div>
        <div dojoType="unieap.layout.TitlePane" title="表单下拉框控件其它功能样例" style="width: 100%;">
            <fieldset dojoType="unieap.form.FieldSet" title="下拉控件">
			<table width="707" border="0">
                <tr>
                    <td width="224">
                        <div>
                            <select dojoType="unieap.form.ComboBox" id="staticComboBox" popup="{height:'100px',width:'400px'}" dataProvider="{staticData:'true'}"  onchange="fn_onchange()">
                                <option value="1">男</option>
                                <option value="0">女</option>
                            </select>
                        </div>
                    </td>
                    <td height="23" colspan="2">
                        <div align="left">
                            自定义下拉列表宽高(自定义宽为400px)、静态下拉框数据：男女两项
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div dojoType="unieap.form.ComboBox" id="combobox1" popup="{displayStyle:'table',structure:{rows:[{title:'编号',field:'attr_empno'},{title:'<strong>姓名</strong>',field:'attr_ename'}]}}" dataProvider="{store:'empDataStore'}" decoder="{valueAttr:'attr_empno',displayAttr:'attr_ename'}">
                        </div>
                    </td>
                    <td height="21" colspan="2">
                        <div align="left">
                            自定义下拉结构：分两列结构，其中第二列标题加粗
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div dojoType="unieap.form.ComboBox" id="combobox2"  
						     dataProvider="{store:'empDataStore',customItem:{attr_empno:'psd_ria',attr_ename:'Ria3.3新版本'}}" 
							 decoder="{valueAttr:'attr_empno',displayAttr:'attr_ename'}">
                        </div>
                    </td>
                    <td width="233" height="21">
                    	setValue方法
                        <div dojoType="unieap.form.Button" id="button1" label="setValue" onclick="fn_SetValue()">
                        </div> 
                    </td>
                    <td width="233" height="21">
                    	getValue方法
                        <div dojoType="unieap.form.Button" id="button2" label="getValue" onclick="fn_GetValue()">
                        </div> 
                    </td>
                </tr>
                <tr>
                    <td>
                        <div dojoType="unieap.form.ComboBox" id="combobox4" popup="{displayStyle:'table',structure:{rows:[{field:'attr_ename'}]}}" dataProvider="{store:'empDataStore'}" decoder="{valueAttr:'attr_empno',displayAttr:'attr_ename'}" hasDefault="true">
                        </div>
                    </td>
                    <td height="21" colspan="2">
                        <div align="left">
                            默认选中第一项
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                		<div dojoType="unieap.form.ComboBox" dataProvider="{loadStore:fn}" ></div>
                    </td>
                    <td height="23" colspan="2">
                        <div align="left">
                           	用户自定义数据源
                        </div>
                    </td>
                </tr>
            </table>
			</fieldset>
        </div>
        <div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="表单下拉框控件其它功能源码">
            <textarea name="code" class="html">
            	
				<!--自定义宽高-->
				<select dojoType="unieap.form.ComboBox" popup="{height:'100px',width:'400px'}" dataProvider="{staticData:'true'}"
				 		onclick="fn_onclick" onchange="fn_onchange()">
						<option value="1">男</option>
						<option value="0">女</option>
				</select>
				
				<!--自定义下拉结构-->
				<div dojoType="unieap.form.ComboBox"  
				     popup="{displayStyle:'table',structure:{rows:[{title:'编号',field:'attr_empno'},{title:'<strong>姓名</strong>',field:'attr_ename'}]}}" 
					 dataProvider="{store:'empDataStore'}" 
					 decoder="{valueAttr:'attr_empno',displayAttr:'attr_ename'}">
					 
				</div>
				
				
				<!-- getValue、setValue -->
				<div dojoType="unieap.form.ComboBox" id="combox_fn"  
				     dataProvider="{store:'empDataStore',customItem:{attr_empno:'psd_ria',attr_ename:'Ria3.3新版本'}}" 
					 decoder="{valueAttr:'attr_empno',displayAttr:'attr_ename'}">
				</div>
				<script type="text/javascript">
					function getValue(){
						alert(unieap.byId('combox_fn').getValue());
					}
					
					function setValue(){
						unieap.byId('combox_fn').setValue('psd_ria');
					}
				</script>
				
				
				<!--默认选中第一项-->
				<div dojoType="unieap.form.ComboBox" 
					  dataProvider="{store:'empDataStore'}" 
					  decoder="{valueAttr:'attr_empno',displayAttr:'attr_ename'}" 
					  hasDefault="true">
				</div>
				
				
				
				<!--用户自定义数据源-->
				<div dojoType="unieap.form.ComboBox" dataProvider="{loadStore:fn}" ></div>
				<script type="text/javascript">
					function fn(){
						var ds=new unieap.ds.DataStore("customData",[
							{CODEVALUE:1,CODENAME:'工程师'},
							{CODEVALUE:2,CODENAME:'销售人员'},
							{CODEVALUE:3,CODENAME:'技术总监'}
						]);
						return ds;
					}
				</script>
			</textarea>
        </div>
    </body>
</html>
