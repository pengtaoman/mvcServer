<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
 
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<title>fileinput</title>
		<style type="text/css">
			@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
		</style>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js"></script>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js"></script>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/form/fileInput/fileInput_db.js"></script>
	</head>
	<body class="unieap">
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="表单文本上传控件说明">
			·支持设置文件类型过滤；<br>
			·支持上传文件的同时传参。
		</div>
		<div dojoType="unieap.layout.TitlePane" title="表单文本上传控件样例"
			style="width: 100%;">
			<form dojoType="unieap.form.Form" id="blob_form" enctype="multipart/form-data">
				<div dojoType="unieap.form.FieldSet" title="上传到数据库">
					<table style="width:100%;table-layout:fixed;position:relative">
						<tr>
							<td width="100" style="font-size: 13px;font-family: 宋体">
								员工姓名:
							</td>
							<td>
								<div dojoType="unieap.form.TextBox" id="ename" ></div>
							</td>
						</tr>
						<tr>
							<td style="font-size: 13px;font-family: 宋体">
								所在部门:
							</td>
							<td>
								<div dojoType="unieap.form.TextBox" id="dept" ></div>
							</td>
						</tr>
						<tr>
							<td style="font-size: 13px;font-family: 宋体">
								员工照片:
							</td>
							<td>
								<div width="400px" dojotype="unieap.form.FileInput" fileFilter='jpg,png' ></div>
							</td>
						</tr>
						<tr>
							<td  height="15">
							</td>
						</tr>
						<tr>
							<td style="font-size: 13px;font-family: 宋体">
								保存员工信息:
							</td>
							<td>
								<div dojoType="unieap.form.Button" label="保存" onClick="persist" ></div>
							</td>
						</tr>
					</table>
				</div>
			</form>
		</div>
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="表单文本上传控件源码">
			<textarea name="code" class="html">
				
				文本上传控件：
				<div dojotype="unieap.form.FileInput" fileFilter='jpg,png'>
				</div>
				
				上传关键JavaScript：
				<script type="text/javascript">
					function persist(){
				  		var empNo = new Date().getTime();
						dataCenter.addParameter("empno",empNo);
						var data = {
							"UP_DEMO_FORM_FILEINPUT_ID": empNo,
							"UP_DEMO_FORM_FILEINPUT_NAME":unieap.byId("ename").getValue(),
							"UP_DEMO_FORM_FILEINPUT_DEPT":unieap.byId("dept").getValue()
						};
				  		dataCenter.getDataStore("demo").getRowSet().insertRow(data);
				  		unieap.Action.upload({
				  			url:unieap.WEB_APP_NAME+"/upload_downLoad_file.do?method=uploadWithBlob",
				  			form:'blob_form',
				  			parameters:{
				  				dc:dataCenter.toJson() //传参
				  			},
				  			load:function(res){
				  				alert(res.result);
				  			},
				  			error:function(res){
				  				alert(res.result);
				  			}
				  		});
				  	}
				</script>
			</textarea>
		</div>
	</body>
</html>