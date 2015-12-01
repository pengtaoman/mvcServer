<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
 
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<title></title>
		<style type="text/css">
			@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
		</style>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js"></script>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js"></script>
	    <script type="text/javascript"
			src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushJScript.js"></script>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/dialog/dialogSelect.js"></script>	
		<script type="text/javascript"
			src="<%=request.getContextPath()%>/unieap/ria3.3/dijit/dijit.js"
			charset="utf-8"></script>
	</head>
	<body class="unieap">
	  <div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="通过对话框选择数据">
			·点击按钮的时候，将会弹出对话框，在对话框的Grid中选择一条记录，并将Grid的DataStore返回，主页面的form将会绑定选择的记录。<br>
	  </div>
	  <div dojoType="unieap.layout.TitlePane" title="绑定form"
			style="width: 100%;">
	      <form id="form" dojoType="unieap.form.Form">
					<div dojoType="unieap.form.FieldSet" title="表单form控件">
						<table  >
							<tr style="margin-right:20px">
								<td style="font-size: 12px;font-family: 宋体">
									员工编号:
								</td>
								<td>
									<div dojoType="unieap.form.TextBox"
										binding="{name:'attr_empno'}" required="true" style="margin-right:20px"></div>
								</td>
								<td style="font-size: 12px;font-family: 宋体;">
									姓名:
								</td>
								<td>
									<div dojoType="unieap.form.TextBox"
										binding="{name:'NAME'}" required="true"></div>
								</td>
							</tr>
							<tr>
								<td style="font-size: 12px;font-family: 宋体">
									职位:
								</td>
								<td>
									<div dojoType="unieap.form.TextBox"
										binding="{name:'attr_job'}"></div>
	
								</td>
								<td style="font-size: 12px;font-family: 宋体">
									员工薪资:
								</td>
								<td>
									<div dojotype="unieap.form.TextBox" binding="{name:'attr_sal'}"
										validator="{regExp:/^\d+$/,errorMsg:'只能输入数字'}"></div>
								</td>
							</tr>
						</table>
					</div>
					</form>
				<div dojoType="unieap.form.Button" label='选择记录' id="select" onClick = "select"></div>	
	  </div>
	  <div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="对话框选择">
			<textarea name="code" class="js">
			function select(){
               DialogUtil.showDialog({url:"<%=appPath%>/pages/samples/dialog/innerSelect.jsp",onComplete:bindDataToForm},
            		   unieap.byId("select").domNode);
		    }
			function bindDataToForm(store){
				if(store){
			     //重新生成一个含有相同数据的store
			      var newStore = unieap.revDS(store);
			      var rows = newStore.getRowSet().getSelectedRows();
			      unieap.byId("form").getBinding().bind(rows[0])
			    }
			}
		   </textarea>
		</div>
	</body>