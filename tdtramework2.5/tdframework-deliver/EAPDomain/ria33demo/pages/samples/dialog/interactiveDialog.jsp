<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
 
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<title>interactiveDialog</title>
		<style type="text/css">
			@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
		</style>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js"></script>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushJScript.js"></script>
		<script type="text/javascript"
			src="<%=request.getContextPath()%>/unieap/ria3.3/dijit/dijit.js"
			charset="utf-8"></script>
			<script type="text/javascript"
			src="<%=appPath%>/pages/samples/dialog/interactiveDialog.js"></script>
    </head>
    <body class="unieap">
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="信息提示框说明">
			·信息提示框提供了多种与用户交互的方式；<br>
			·信息提示框包括了简单提示、确认、提示输入等类型；<br>
			·信息提示框控件可以方便的根据返回值进行不同处理；<br>
		</div>
		<div dojoType="unieap.layout.TitlePane" title="信息提示框样例" style="width: 100%;">
	    	<table>
	    	     <tr>
	    			<td style="font-size: 13px;font-family: 宋体;width:150px">
	    				简单反馈提示框:
	    			</td>
	    			<td>
	    				<div id="infoalert" dojoType="unieap.form.Button" label="info类型简单弹出框" onclick="testInfoAlert()"></div>&nbsp;&nbsp;
	    				<div id="warnalert" dojoType="unieap.form.Button" label="warn类型简单确认框" onclick="testWarnAlert()"></div>&nbsp;&nbsp;
	    				<div id="erroralert" dojoType="unieap.form.Button" label="error类型简单确认框" onclick="testErrorAlert()"></div>&nbsp;&nbsp;
	    				<div id="questionalert" dojoType="unieap.form.Button" label="question类型简单弹出框" onclick="testQuestionAlert()"></div>
	    			</td>
	    		</tr>
	    	   	<tr>
	    			<td style="font-size: 13px;font-family: 宋体;width:150px">
	    				自动关闭的提示框:
	    			</td>
	    			<td>
	    				<div id="autoclose" dojoType="unieap.form.Button" label="自动关闭的提示框" onclick="autoCloseAlert()"></div>
	    			</td>
	    		</tr>
	    		<tr>
	    			<td style="font-size: 13px;font-family: 宋体;width:150px">
	    				确认对话框:
	    			</td>
	    			<td>
	    				<div id="confirm" dojoType="unieap.form.Button" label="简单确认弹出框" onclick="confirm()"></div>&nbsp;&nbsp;
	    				<div id="cancelconfirm" dojoType="unieap.form.Button" label="复杂确认弹出框" onclick="cancelConfirm()"></div>&nbsp;&nbsp;
	    				<div id="customerbuttonconfirm" dojoType="unieap.form.Button" label="自定义按钮确认弹出框" onclick="customerButtonConfirm()"></div>
	    			</td>
	    		</tr>
	    		<tr>
	    			<td style="font-size: 13px;font-family: 宋体;width:150px">
	    				输入提示框:
	    			</td>
	    			<td>
	    			   <div id="prompt" dojoType="unieap.form.Button" label="单行输入提示框" onclick="prompt()"></div>&nbsp;&nbsp;
	    				<div id="multiprompt" dojoType="unieap.form.Button" label="多行输入提示框" onclick="multiPrompt()"></div>
	    			</td>
	    		</tr>
	    	</table>
		</div>
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="信息提示框源码">
			<textarea name="code" class="js">
			//info类型的简单反馈提示框
			function testInfoAlert(){
				MessageBox.alert({type:"info"},document.getElementById("infoalert"));
			}
			//warn类型的简单反馈提示框
			function testWarnAlert(){
				MessageBox.alert({type:"warn"},document.getElementById("warnalert"));
			}
			//error类型的简单反馈提示框
			function testErrorAlert(){
				MessageBox.alert({type:"error"},document.getElementById("erroralert"));
			}
			//question类型的简单反馈提示框
			function testQuestionAlert(){
				MessageBox.alert({type:"question"},document.getElementById("questionalert"));
			}
			//简单确认提示框
			function confirm(){
                MessageBox.confirm({
                    onComplete: confirmReturn
                }, document.getElementById("confirm"));
            }
			//复杂确认提示框
			function cancelConfirm(){
                MessageBox.cancelConfirm({
                    onComplete: cancelConfirmReturn
                }, document.getElementById("cancelconfirm"));
             }
			//自定义按钮的确认提示框
			function customerButtonConfirm(){
                MessageBox.customerButtonConfirm({
                    onComplete: customerButtonConfirmReturn,
                    customerButtons: [{
                        label: "跳过",
                        returnValue: "skip"
                    }, {
                        label: "忽略",
                        returnValue: "ignore"
                    }, {
                        label: "确定",
                        returnValue: "confirm"
                    }, {
                        label: "取消",
                        returnValue: "cancel"
                    }]
                }, document.getElementById("customerbuttonconfirm"));
            }
			//简单确认提示框的回调方法
			function confirmReturn(value){
                if(value==true){
                	alert('您选择了"确定"');
                }else{
               		alert('您选择了"取消"');
                }
            }
			//复杂确认提示框的回调方法
			function cancelConfirmReturn(value){
                if(value=='yes'){
                	alert('您选择了"是"');
                }else if(value=='no'){
               		alert('您选择了"否"');
                }else{
                	alert('您选择了"取消"');
                }
            }
			//自定义确认提示框的回调方法
			function customerButtonConfirmReturn(value){
                if(value=='skip'){
                	alert('您选择了"跳过"');
                }else if(value=='ignore'){
               		alert('您选择了"忽略"');
                }else if(value=='confirm'){
                	alert('您选择了"确定"');
                }else{
                	alert('您选择了"取消"');
                }
            }
			//多行输入
			function multiPrompt(){
            	MessageBox.multiPrompt({
                    onComplete: promptReturn
                }, document.getElementById("multiprompt"));	
            }
			//单行输入
			function prompt(){
            	MessageBox.prompt({
                    onComplete: promptReturn
                }, document.getElementById("prompt"));	
            }
			//输入信息提示框的回调
			function promptReturn(value){
            	if(value.btn){
            		alert("您输入了"+'"'+value.text+'"');
            	}
            }
			//自动关闭的提示框
			function autoCloseAlert(){
				MessageBox.autoCloseAlert({'durationTime':'2000','message':'自动关闭的提示框的提示信息'},document.getElementById("autoclose"));
			}
			</textarea>
		</div>
    </body>
</html>

