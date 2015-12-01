<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
		<contextPath value="<%=path%>"/>
		<script type="text/javascript">

		function testCancelConfirm(){
		    MessageBox.cancelConfirm({
				onComplete: cancelConfirmReturn,message:"您确认要删除所选择的信息么？您确认要删除所选择的信息么" 
				     + 	"您确认要删除所选择的信息么您确认要删除所选择的信息么"
				     + 	"您确认要删除所选择的信息么您确认要删除所选择的信息么"
				     + 	"您确认要删除所选择的信息么您确认要删除所选择的信息么"
				     + 	"您确认要删除所选择的信息么您确认要删除所选择的信息么"
				     + 	"您确认要删除所选择的信息么您确认要删除所选择的信息么"
				     + 	"您确认要删除所选择的信息么您确认要删除所选择的信息么"
				     + 	"您确认要删除所选择的信息么您确认要删除所选择的信息么"
				     + 	"您确认要删除所选择的信息么您确认要删除所选择的信息么"
				     + 	"您确认要删除所选择的信息么您确认要删除所选择的信息么"
				     + 	"您确认要删除所选择的信息么您确认要删除所选择的信息么"
				     + 	"您确认要删除所选择的信息么您确认要删除所选择的信息么"
				     + 	"您确认要删除所选择的信息么您确认要删除所选择的信息么\n"
				     + 	"您确认要删除所选择的信息么您确认要删除所选择的信息么"
				     + 	"您确认要删除所选择的信息么您确认要删除所选择的信息么\n"
				     + 	"您确认要删除所选择的信息么您确认要删除所选择的信息么\n"
				     + 	"您确认要删除所选择的信息么您确认要删除所选择的信息么\n"
				     + 	"您确认要删除所选择的信息么您确认要删除所选择的信息么\n"
				     + 	"您确认要删除所选择的信息么您确认要删除所选择的信息么\n"
				     + 	"您确认要删除所选择的信息么您确认要删除所选择的信息么\n"
			});

		}

		function cancelConfirmReturn(value) {
			if(value=='yes'){
				alert('您选择了"是"');
			}else if(value=='no'){
				alert('您选择了"否"');
			}else{
				alert('您选择了"取消"');
			}
		}

		function testAlertConfirm(){
			MessageBox.autoCloseAlert({
				durationTime:'2000',
				message:'自动关闭的提示框的提示信息',
				type:'info'
				}
			);


		}

		function testInputConfirm(){
		    MessageBox.prompt({
				onComplete: promptReturn,message:"请输入您要操作的客户信息码。"
			}, document.getElementById("inputWindow"));


		}
		function promptReturn(value){
				if(value.btn){
					alert("您输入了"+'"'+value.text+'"');
				}
		}
		
		function customBtn() {
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
			}, unieap.byId("custombtn"));
			
		}
		
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
		</script>
		
	</head>
<body class="unieap">
<font color='red'>※ 信息提示对话框在分帧里显示按钮有问题，后续确认。</font>
<div dojoType="unieap.layout.TitlePane" title="对话框" style="width:420;margin-bottom:3px;'">
    
    <form id='form05' jsId="form05" dojoType="unieap.form.Form" style="margin:0px;">	
        <table style="table-layout:fixed;font-size:12px;height:68px;">
			<tr border=1>
				<td width="150"><div dojoType="unieap.form.Button" id="cancelconfirm" label=" 确认对话框 " onclick="testCancelConfirm()"></div></td>
			</tr>
			<tr border=1>
				<td width="240"><div dojoType="unieap.form.Button" id="" label=" 信息提示框 " onclick="testAlertConfirm()"></div></td>
			</tr>
			<tr border=1>
				<td width="150"><div dojoType="unieap.form.Button" id="inputWindow" label=" 输入提示框 " onclick="testInputConfirm()"></div></td>
			</tr>
			<tr border=1>
				<td width="150"><div dojoType="unieap.form.Button" id="custombtn" label="自定义对话框按钮 " onclick="customBtn()"></div></td>
			</tr>
	    </table>		
	</form>
</div>
</body>
</html>	
	