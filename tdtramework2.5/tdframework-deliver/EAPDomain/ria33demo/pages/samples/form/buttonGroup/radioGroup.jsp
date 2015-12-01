<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        </meta>
        <title>radioGroup</title>
        <style type="text/css">
            @import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
        </style>
        <script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js">
        </script>
        <script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js">
        </script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/form/buttonGroup/raidoGroup.js">
        </script>
        <script type="text/javascript" src="<%=request.getContextPath()%>/unieap/ria3.3/dijit/dijit.js" charset="utf-8">
        </script>
    </head>
    <body class="unieap">
        <div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="表单单选按钮组控件说明">
            ·表单单选按钮组控件可以将单选按钮按组进行管理，支持绑定数据源的方式来动态生成单选按钮组；
            <br>
            ·表单单选按钮组控件可以方便的对文字与单选按钮进行布局；
            <br>
            ·用户可通过设置cols值来控制按钮组布局;
            <br>
            ·支持对组内按钮状态变化的监听。
        </div>
        <div dojoType="unieap.layout.TitlePane" title="表单单选按钮组控件样例" style="width: 100%;">
            <div dojoType="unieap.form.Form" id="form">
                <div dojoType="unieap.form.FieldSet" title="表单单选按钮组控件">
                    <table width="270px">
                    	<colgroup>
                    		<col style="font-size: 12px;font-family: 宋体;width:110px"></col>
							<col style="width:80px"></col>
							<col style="width:80px"></col>
                    	</colgroup>
                        <tr>
                            <td colspan="3">
                                <div id="RadioGroup" cols="3" labelAlign="left" 
									dojoType="unieap.form.RadioButtonGroup" 
									dataProvider="{'store':'city_store'}"
									style="height:60px">
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                获得选中标签值:
                            </td>
                            <td>
                                <div dojoType="unieap.form.Button" label="getText" onclick="getText()"/>
                            </td>
                            <td>
                            </td>
                        </tr>
						<tr>
							<td>
								禁用按钮组:
							</td>
							<td>
								<div dojoType="unieap.form.Button" label="禁用全部"
									onclick="setAllDisabled(true)"/>
							</td>
							<td>
								<div dojoType="unieap.form.Button" label="启用全部"
									onclick="setAllDisabled(false)"/>
							</td>
						</tr>
						<tr>
							<td>
								禁用部分按钮:
							</td>
							<td>
								<div dojoType="unieap.form.Button" label="禁用部分"
									onclick="setDisabled(true)"/>
							</td>
							<td>
								<div dojoType="unieap.form.Button" label="启用部分"
									onclick="setDisabled(false)"/>
							</td>
						</tr>
                    </table>
                </div>
            </div>
        </div>
        <div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="表单单选按钮组控件源码">
            <textarea name="code" class="html">
			<div id="RadioGroup" cols="3" labelAlign="left" dojoType="unieap.form.RadioButtonGroup" dataProvider="{'store':'city_store'}">
			</div>
				<script type="text/javascript">
						//获得选中标签值
					    function getText(){
			                var value = unieap.byId('RadioGroup').getText();
			                if (value == "") {
			                    alert("请选择一个城市");
			                }
			                else {
			                    alert(value);
			                }
			            }
						//全部禁用(全部启用)
						function setAllDisabled(b) {
							unieap.byId('RadioGroup').setDisabled(b);
						}
						//部分禁用(部分启用)
						function setDisabled(b) {
							unieap.byId('RadioGroup').setDisabled(b,[0,1,4]);
						}
				</script>
            </textarea>
        </div>
    </body>
</html>
