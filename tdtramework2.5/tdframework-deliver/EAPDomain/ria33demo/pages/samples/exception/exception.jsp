<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
<html>
	<head>
		<meta content="text/html; charset=UTF-8" http-equiv="Content-Type"></meta>
		<title>错误处理样例</title>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/exception/exception.js"></script>
	</head>
	<body class="unieap">
		<form id="form"  method="post"></form>
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" open=false  title="错误异常处理说明">
			当后台发生错误异常时，用户新建一个AppException，代码示例如下：<br>
			<div dojoType="unieap.form.FieldSet" title="FieldSet控件">
				 java.security.MessageDigest alga =null;
				 <br>  try {
				 <br>		alga = java.security.MessageDigest.getInstance("S");
				 <br>  } catch (NoSuchAlgorithmException e) {				
				<br>		AppException ex = new AppException("test exception");
				<br>		ex.setErrCode(-1);
				<br>		ex.setErrMsg("这是一个错误处理的测试。");
				<br>		ex.setStackTrace(e.getStackTrace());
				<br>		throw ex;
				<br>   }
			</div>
			<br>
			示例代码中有个申请算法的异常，将AppException对象抛出，在AppExceptionHandler中得到此对象，将错误信息返回到前台。<br>
			默认错误异常码小于0
		</div>
		<div dojoType="unieap.layout.TitlePane" title="ajax请求异常处理">
			.通过ajax请求<br>
			<div dojoType = "unieap.form.Button" onClick="testExp" label="测试异常处理"></div>
			<div dojoType="unieap.form.Button" id="showExp" label="显示异常详细信息" onClick="showExp" style="display:none"></div>
			<div id="dialogContainer" style="display:none">
				<div id="dialog" style="height:99%;width:auto">
					<div dojoType="unieap.form.Textarea" id="text" readOnly =true  width='100%' height="100%">
					</div>
				</div>
			</div>	
			
		</div>
		<div dojoType="unieap.layout.TitlePane" title="form请求异常处理">
			.通过form请求，并跳转到error.jsp页面<br>
			<div dojoType = "unieap.form.Button" onClick="testFormSubmit" label="form提交"></div>
		</div>
			<div dojoType="unieap.layout.TitlePane" title="请求成功处理">
			.若dc.getCode()>0给出成功提示<br>
			.若dc.getCode()=0不给出任何提示<br>
			.本例dc.getCode()=1<br>
			<div dojoType = "unieap.form.Button" onClick="testSuccess" label="成功提示"></div>
		</div>
		
		
		
	</body>
</html>