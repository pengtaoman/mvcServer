<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
 
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<title>FileInput控件</title>
		<style type="text/css">
			@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
		</style>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js"></script>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js"></script>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/form/fileInput/fileInput_server.js"></script>
	</head>
	<body class="unieap">
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="表单文本上传控件说明">
			·文本上传控件支持同时生成多个FileInput并上传。
		</div>
		<div dojoType="unieap.layout.TitlePane" title="表单文本上传控件样例"
			style="width: 100%;">
			<form id="common_form" dojoType="unieap.form.Form" enctype="multipart/form-data">
				<div dojoType="unieap.form.FieldSet" title="上传到服务器">
					<table>
						<tr>
							<td width="100" style="font-size: 13px;font-family: 宋体">
								文件1:
							</td>
							<td>
								<div width="400px" dojotype="unieap.form.FileInput" name="file_demo" fileFilter='jpg,png,doc'></div>
							</td>
						</tr>
						<tr>
							<td width="100" style="font-size: 13px;font-family: 宋体">
								文件2:
							</td>
							<td>
								<div width="400px" dojotype="unieap.form.FileInput" name="file_demo" fileFilter='jpg,png,doc'></div>
							</td>
						</tr>
						<tr>
							<td>
								<div dojoType="unieap.form.Button" label="文件上传" onClick="common_upload" style="margin-right:5px"></div>
							</td>
							<td>
								<div id="downLoadBtn" dojoType="unieap.form.Button" label="文件下载" onClick="common_download" style="margin-right:5px"></div>
							</td>
						</tr>
					</table>
				</div>
			</form>
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="表单文本上传控件源码">
			<textarea name="code" class="html">
				文本上传控件：
				<div width="400px" dojotype="unieap.form.FileInput" fileFilter='jpg,png,doc'></div>
				
				上传关键JavaScript：
				<script type="text/javascript">
					function common_upload(){
				  		unieap.Action.upload({
				  			url:unieap.WEB_APP_NAME+"/upload_downLoad_file.do?method=commonUpLoad",
				  			form:'common_form',
				  			load:function(res){
				  				animate(res.result);
				  			},
				  			error:function(res){
				  				alert('发生错误,开始显示错误信息');
				  				unieap.debug(res);
				  			}
				  		});
				  	}
				</script>
			</textarea>
		</div>
	</body>
</html>