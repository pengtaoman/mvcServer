<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<title>数据传输样例</title>
		<style type="text/css">
			@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
		</style>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/integration/encrypt/encrypt.js"></script>
	</head>
	<body class="unieap">
		<div dojoType="unieap.layout.TitlePane" style="line-height:20px;font-size:13px;font-family:宋体;length:250px" title="说明">
			通过摘要算法对前后台传输数据生成摘要，<br>
			传输数据同时传输摘要字符串，摘要发生变化表示数据发生变化<br>
		</div>
		<div dojoType="unieap.layout.TitlePane" style="line-height:20px;font-size:13px;font-family:宋体;" title="数据传输样例">
			 原始数据:<br>
			 <div width="auto" dojoType="unieap.form.Textarea" id="initText" style="width:auto" readonly='true'></div>
			 <br>
			 <table border=1>
				<tr>
			 		<td>前台生成摘要：</td>
					<td>&nbsp;</td>
					<td><div dojoType="unieap.form.TextBox" id="preText" width="auto" readonly='true'></div></td>
			 	</tr>
				<tr>
			 		<td>手动输入篡改数据（不输入则不篡改）：</td>
					<td><div dojoType="unieap.form.TextBox" id="modText"></div></td>
					<td>说明：将前台数据在生成摘要后发送请求前篡改，实际可能在数据传输过程中被篡改。</td>
			 	</tr>
				<tr>
			 		<td>后台生成摘要：</td>
					<td><div dojoType="unieap.form.Button" label="getAftDigest" onClick="getAftDigest"></div></td>
					<td><div dojoType="unieap.form.TextBox" id="aftText" width="auto" readonly='true'></div></td>
			 	</tr>
				<tr>
			 		<td>比较前后台生成摘要：</td>
					<td><div dojoType="unieap.form.Button" label="compare" onClick="compare"></div></td>
					<td>&nbsp;</td>
			 	</tr>
			</table>
		</div>
		<div  dojoType="unieap.layout.TitlePane" title="代码说明">
			<textarea name="code" class="html">
				<!--生成前台摘要并从后台接受摘要-->
				<script type="text/javascript">
				function getAftDigest(){
					if(unieap.byId("modText").getValue()){
						dc.addParameter("changedigest",unieap.byId("modText").getValue());
					}
					dc =unieap.Action.requestData({
						url:unieap.WEB_APP_NAME+ "/encrypt.do?method=encrypt", 
						sync:true,
						load:function(dc){
						}
					},dc);	
					var aftDigest =  dc.getParameter("digest");
					unieap.byId("aftText").setValue(aftDigest);
				}
				</script>
			</textarea>
		</div>
	</body>
</html>