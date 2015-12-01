/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+ 
+ �ű����������������
+           
+ ��    ���� ���⻪ hugh@neusoft.com
+ �޸�������
+ �޸�  �ˣ�
+
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

var errorHandler = new ErrorHandler();
function ErrorHandler(){		
	this.ErrType_EvalError = "val()��ʹ���붨�岻һ��";
����this.ErrType_RangeError = "��ֵԽ��";
����this.ErrType_ReferenceError = "�Ƿ�����ʶ���������ֵ"; 
����this.ErrType_SyntaxError = "�����﷨��������";
����this.ErrType_TypeError = "���������ʹ���";
����this.ErrType_URIError = "URI������ʹ�ò���";
	this.ErrType_UnkonwedError = "δ֪����";    
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
		alert(combErrMsg("ErrorHandler.handleOhterError()","δ֪","δ֪"));
	}
}
function combErrMsg(methedName,type,message){
	return "��ִ��JavaScript����\""+methedName+"\"ʱ�������󣺴�������Ϊ\""+ type + "\",������ϢΪ\"" + message + "\"";
}