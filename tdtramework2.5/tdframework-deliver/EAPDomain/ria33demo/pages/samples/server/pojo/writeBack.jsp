<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
<html>
    <head>
        <meta content="text/html; charset=UTF-8" http-equiv="Content-Type">
        </meta>
        <title>后台回写样例</title>
        <script type="text/javascript" src="<%=appPath%>/pages/samples/grid/data.js"></script>
   		<script type="text/javascript" src="<%=appPath%>/pages/samples/server/pojo/writeBack.js"></script>
    </head>
    <body class="unieap">
        <div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="说明">
            ·该样例演示插入记录时，在后台生成主键然后回显的功能<br>
			·操作步骤：<br>
			1.填写录入信息Form，点击<增加到列表>按钮<br>
			2.点击<保存>按钮（可以增加多个，一起保存，此处只是演示后台生成主键回显，不会真正持久化到数据库）
            <br>
        </div>
        <div dojoType="unieap.layout.TitlePane" title="信息录入">
            <div dojoType="unieap.form.FieldSet">
                <div id="form" dojoType="unieap.form.Form">
                    <table style="table-layout:fixed;">
                        <tr>
                            <td style="width:50px;">
                                姓名：
                            </td>
                            <td>
                                <div id="name" dojoType="unieap.form.TextBox">
                                </div>
                            </td>
                            <td style="width:50px;">
                                职位：
                            </td>
                            <td>
                                <div id="job" dojoType="unieap.form.TextBox">
                                </div>
                            </td>
                            <td style="width:50px;">
                                工资：
                            </td>
                            <td>
                                <div id="sal" dojoType="unieap.form.NumberTextBox">
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div style="text-align:right;padding-right:10px">
                <div id="addBtn" dojoType="unieap.form.Button" label="增加到列表" onClick="addData">
                </div>
            </div>
        </div>
        <div dojoType="unieap.layout.TitlePane" title="数据表格">
            <div id="grid" dojoType="unieap.grid.Grid" width="100%" height="300px" binding="{store:'empDataStore'}" views="{rowNumber:false,rowBar:false}">
            <fixed>
                <cell label="员工编号" width="20%" name="attr_empno">
                </cell>
            </fixed>
				<header>
                    <cell width="25%" label="姓名" name="NAME">
                    </cell>
                    <cell width="25%" label="职位" name="attr_job">
                    </cell>
                    <cell width="30%" label="工资" name="attr_sal">
                    </cell>
                </header>
            </div>
			<div style="text-align:right;padding-right:10px">
				<div id="saveBtn" dojoType="unieap.form.Button" label="保存" width="70px" onClick="save">
                </div>
			</div>
        </div>
    </body>
</html>
