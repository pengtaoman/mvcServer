dojo.addOnLoad(function(){
	dp.SyntaxHighlighter.HighlightAll('code');
});

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