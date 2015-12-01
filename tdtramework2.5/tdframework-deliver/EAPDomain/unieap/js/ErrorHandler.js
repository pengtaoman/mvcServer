/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+ 
+ 脚本描述：错误处理对象
+           
+ 创    建： 胡光华 hugh@neusoft.com
+ 修改履历：
+ 修改  人：
+
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

var errorHandler = new ErrorHandler();
function ErrorHandler(){		
	this.ErrType_EvalError = "val()的使用与定义不一致";
　　this.ErrType_RangeError = "数值越界";
　　this.ErrType_ReferenceError = "非法或不能识别的引用数值"; 
　　this.ErrType_SyntaxError = "发生语法解析错误";
　　this.ErrType_TypeError = "操作数类型错误";
　　this.ErrType_URIError = "URI处理函数使用不当";
	this.ErrType_UnkonwedError = "未知错误";    
}
function handleError(methedName,err){
	if(err instanceof EvalError){
		this.handleEvalError(err);
		return;
	}
	if(err instanceof RangeError){
		this.handleRangeError(err);
		return;
	}
	if(err instanceof ReferenceError){
		this.handleReferenceError(err);
		return;
	}
	if(err instanceof SyntaxError){
		this.handleSyntaxError(err);
		return;
	}
	if(err instanceof TypeError){
		this.handleTypeError(err);
		return;
	}
	if(err instanceof URIError){
		this.handleURIError(err);
		return;
	}
	handleOhterError(err);
	
}
function handleEvalError(methedName,err){
	alert(this.combErrMsg(this.ErrType_EvalError,err.message));	
}
function handleRangeError(methedName,err){
	alert(this.combErrMsg(this.ErrType_RangeError,err.message));
}
function handleReferenceError(methedName,err){
	alert(this.combErrMsg(this.ErrType_ReferenceError,err.message));
}
function handleSyntaxError(methedName,err){
	alert(this.combErrMsg(this.ErrType_SyntaxError,err.message));
}
function handleTypeError(methedName,err){
	alert(this.combErrMsg(this.ErrType_TypeError,err.message));
}
function handleURIError(methedName,err){
	alert(this.combErrMsg(this.ErrType_URIError,err.message));
}
function handleOhterError(methedName,err){
	try{
		var type = err.name;
		var msg = err.message;
		alert(combErrMsg(methedName,type,msg));
	}
	catch(e){
		alert(combErrMsg("ErrorHandler.handleOhterError()","未知","未知"));
	}
}
function combErrMsg(methedName,type,message){
	return "在执行JavaScript方法\""+methedName+"\"时发生错误：错误类型为\""+ type + "\",错误信息为\"" + message + "\"";
}