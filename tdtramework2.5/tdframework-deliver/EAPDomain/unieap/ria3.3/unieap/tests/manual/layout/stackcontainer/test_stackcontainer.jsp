<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>unieap.layout.StackContainer</title>
        <%@ include file="/unieap/ria3.3/pages/config.jsp" %>
        <script type="text/javascript" src="test_stackcontainer.js"></script>
        <script type="text/javascript">
    		dojo.require("unieap.layout.StackContainer");
    		dojo.require("unieap.layout.HBoxContainer");
    		dojo.require("unieap.layout.VBoxContainer");
        </script>
    </head>
    <body class="unieap">
    	<div dojoType="unieap.layout.TitlePane" title="测试样例" height="500px">
    		<div dojoType="unieap.layout.HBoxContainer" height="90%" width="auto" paddings="5" margins="5" style="border:2px solid black;">
    			
    			<div dojoType="unieap.layout.VBoxContainer" height="90%" width="100px" 
    				pack="center" align="right"
    				margins="0 0 10 0" paddings="0 5 0 0" style="border:1px solid red;">
    				<div dojoType="unieap.form.Button" onClick="hide" id='hideBtn'  label="隐藏容器" ></div>
					<div dojoType="unieap.form.Button" onClick="show" id='showBtn' label="显示容器" ></div>
					<div dojoType="unieap.form.Button" onClick="change" id='changeBtn' label="改变容器" ></div>
    			</div>
    			
    			<div dojoType="unieap.layout.VBoxContainer" height="90%" width="auto" margins="0 0 10 0" paddings="5 10"  style="border:1px solid blue;">
    				
    				<div dojoType="unieap.layout.HBoxContainer" pack="center" width="98%" margins="5 10 2 0" height="20%" style="border:1px solid red;">
						<div dojoType="unieap.form.Button" onClick="back" id='backBtn'  label="前一页" ></div>
						<div dojoType="unieap.form.Button" onClick="forward" id='forwardBtn' label="后一页" ></div>
						<div dojoType="unieap.form.Button" onClick="addChild" id='addBtn' label="新增一页" ></div>
						<div dojoType="unieap.form.Button" onClick="removeChild" id='removeBtn' label="删除当前页" ></div>
						<div dojoType="unieap.form.Button" onClick="removeChildByIndex" label="删除index=1的页面" ></div>
						<div dojoType="unieap.form.Button" onClick="removeChildByID" label="根绝ID删除页面" ></div>
						<div dojoType="unieap.form.Button" onClick="selectChild" label="隐藏当前，显示指定"></div>
					</div>
					
					<div dojoType="unieap.layout.StackContainer" id="tsc" width="98%" height="80%" style="border:1px solid red;"
						onContainerResize="alert('改变了大小');">
						<div dojoType="unieap.layout.ContentPane" id="FP" >unieap.layout.StackContainer </div>
						<div dojoType="unieap.layout.ContentPane" id="SP" refreshOnShow="true" href="test.jsp"></div>
						<div dojoType="unieap.layout.ContentPane" id="introduction" selected="true" height="90%">
							<div dojoType="unieap.layout.HBoxContainer" align="top"  pack="center" paddings="5 0 0 0">
								<table border="1" bordercolor="#99BBE8">
									<tr>
										<td colspan="2" align="center" >简介</td>
									</tr>
									<tr>
										<td>方法</td>
										<td>事件</td>
									</tr>
									<tr>
										<td>
											<ul>
												<li>支持向前/向后一页</li>
												<li>支持增加一页</li>
												<li>支持删除一页，可删除当前页或者指定页面</li>
												<li>支持获取当前页面</li>
												<li>支持设置高度/宽度</li>
												<li>支持显示/隐藏容器</li>
												<li>执行隐藏当前页面，显示指定页面</li>
											</ul>
										</td>
										<td>
											<ul>
												<li>支持大小改变事件</li>
											</ul>
										</td>
									</tr>
								</table>
							</div>
						</div>
						<div dojoType="unieap.layout.ContentPane" id="form">
							<div dojoType="unieap.form.Form" binding="{store:'demo',bindIndex:0}">
								<table>
									<tr>
										<td>
											员工编号：
										</td>
										<td>
											<div dojoType="unieap.form.TextBox" id="id" binding="{name:'attr_empno'}"></div>
										</td>
										<td>
											姓名：
										</td>
										<td>
											<div dojoType="unieap.form.TextBox" id="name" binding="{name:'attr_name'}"></div>
										</td>
									</tr>
									<tr>
										<td>
											职位：
										</td>
										<td>
											<div dojoType="unieap.form.TextBox" id="post" binding="{name:'attr_job'}"></div>
										</td>
										<td>
											工资：
										</td>
										<td>
											<div dojoType="unieap.form.NumberTextBox" id="salary" binding="{name:'attr_sal'}"></div>
										</td>
									</tr>
								</table>
							</div>
						</div>
					</div>
    			</div>
    		</div>
    	</div>
    </body>
</html>
