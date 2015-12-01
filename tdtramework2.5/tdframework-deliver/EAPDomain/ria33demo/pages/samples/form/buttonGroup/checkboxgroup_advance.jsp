<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        </meta>
        <title>checkboxgroup</title>
        <style type="text/css">
            @import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
        </style>
        <script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js">
        </script>
        <script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js">
        </script>
        <script type="text/javascript" src="<%=appPath%>/pages/samples/form/buttonGroup/checkboxgroup_advanced.js">
        </script>
    </head>
    <body class="unieap">
        <div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="复选框组控件说明">
            ·设置选中值；
            <br>
            ·onChange等事件；
            <br>
            ·显示布局；
            <br>
            ·数据绑定(标签为绑定数据)；
            <br>
            ·反向选择；
            <br>
            ·获取选中值和显示值。
            <br>
        </div>
        <p style="margin:10px 0px 10px 0px">
        </p>
        <div dojoType="unieap.layout.TitlePane" title="复选框组控件样例" style="width: 100%;">
            <div dojoType="unieap.layout.TabContainer"  style="height:350px;width:100%">
                <div dojoType="unieap.layout.ContentPane" id="contentpane" title="设置，获取选中值和显示值及onChange事件">
                    <div dojoType="unieap.form.Form" id="form">
                        <div dojoType="unieap.form.FieldSet" title="设置，获取选中值和显示值事件">
                            <div id="CheckboxGroup" cols="3" labelAlign="left" dojoType="unieap.form.CheckBoxGroup" dataProvider="{'store':'city_store'}" onChange="fn_GetValue">
                            </div>
                            <br>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <div dojoType="unieap.form.Button" id="btn" label="设置选中值宁波" onclick="fn_setValue">
                            </div>
                        </div>
                    </div>
                </div>
                <div dojoType="unieap.layout.ContentPane" id="contentpane1" title="反向选择">
                    <div dojoType="unieap.form.FieldSet" title="反向选择">
                        <div id="CheckboxGroup1" cols="3" labelAlign="left" dojoType="unieap.form.CheckBoxGroup" dataProvider="{'store':'city_store'}">
                        </div>
                        <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <div dojoType="unieap.form.Button" id="btn2" label="点击反向选择" onclick="fn_ShowReverse">
                        </div>
                    </div>
                </div>
                <div dojoType="unieap.layout.ContentPane" id="contentpane2" title="显示布局">
                    <div dojoType="unieap.layout.TitlePane" title= "右侧布局" style="width:100%;height:25%">
                        <div id="CheckboxGroup2" cols="3" labelAlign="right" style:"width:400px" dojoType="unieap.form.CheckBoxGroup" dataProvider="{'store':'city_store'}">
                        </div>
                    </div>
                    <div dojoType="unieap.layout.TitlePane" title= "顶端布局" style="width:100%; height:40%">
                        <div id="CheckboxGroup3" cols="3" labelAlign="top" style:"width:400px" dojoType="unieap.form.CheckBoxGroup" dataProvider="{'store':'city_store'}">
                        </div>
                    </div>
                    <div dojoType="unieap.layout.TitlePane" title= "底端布局" style="width:100%; height:35%">
                        <div id="CheckboxGroup4" cols="3" labelAlign="bottom" style:"width:400px" dojoType="unieap.form.CheckBoxGroup" dataProvider="{'store':'city_store'}">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <p style="margin:10px 0px 10px 0px">
        </p>
        <div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="复选按钮组源码">
            <textarea name="code" class="html">
                <!-- onChange事件 -->
                <div cols="3" labelAlign="left" dojoType="unieap.form.CheckBoxGroup" dataProvider="{'store':'city_store'}" onChange="fn_GetValue">
                </div>
                <!--反向选择-->
                <script type="text/javascript">
                    unieap.byId('chk_group').checkReverse();
                </script>
                <!--居右、居下、居上布局-->
                <div cols="3" labelAlign="right" dojoType="unieap.form.CheckBoxGroup" dataProvider="{'store':'city_store'}">
                </div>
                <div cols="3" labelAlign="bottom" dojoType="unieap.form.CheckBoxGroup" dataProvider="{'store':'city_store'}">
                </div>
                <div cols="3" labelAlign="top" dojoType="unieap.form.CheckBoxGroup" dataProvider="{'store':'city_store'}">
                </div>
            </textarea>
        </div>
    </body>
</html>
