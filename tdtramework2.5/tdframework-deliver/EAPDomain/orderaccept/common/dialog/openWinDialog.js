dojo.require("unieap.global");
dojo.require("unieap.util.util");
dojo.require("unieap.dialog.DialogUtil");

/*
 * 参数描述
 * 页面链接：windowUrl 对话框内容的链接地址
 * 页面标题：windowTitle 对话框的标题 
 * 页面高度：winHeight 对话框的高度
 * 页面宽度：winWidth 对话框的宽度
 * 传入参数：setData 父窗口传递到弹出窗口的对象 参数类型{object} 例 {name:"param1",value:"param2"}
 * 关闭回调：isComplete 点击右上角的关闭按钮时，是否调用回调函数 值为 true 和false
 * 回调方法：funcName 对话框关闭的回调函数
 */

function openWinDialog(windowUrl,windowTitle,winHeight,winWidth,setData,isComplete,funcName){
	
	var dialog = DialogUtil.showDialog(
	{
		url:windowUrl,
		title:windowTitle,
		height:winHeight,
		width:winWidth,
		dialogData:setData,
		onComplete:funcName,
		iconCloseComplete: isComplete
	});
	
}