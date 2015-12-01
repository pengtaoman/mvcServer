/**
 * UniEAP1.7 对象集
 * @author  lixiangyu@neusoft.com,2003.04
 *				hugh@neusoft.com	2003.07.19
 *				micy@neusoft.com
 */
 

function BaseObj(editerObj){
	this.edtObj = editerObj;
	
	this.enterToTab = BSO_enterToTab;
	this.commonCheck = BSO_commonCheck;
	this.checkEmpty = BSO_checkEmpty;
	this.checkMinLength = BSO_checkMinLength;
	this.checkMaxLength = BSO_checkMaxLength;	
	this.checkFixLength = BSO_checkFixLength;
	this.getObjValue = BSO_getObjValue;
	this.isEmpty = BSO_isEmpty;
	this.onReady = BSO_onContentReady;
	this.eventBand = BSO_eventBand;
    this.isNeedtrim = true; //是否trim操作
}
/**
 *名称：enterToTab
 *功能：将回车键转换成TAB
 *形参：
 *
 *返回：
 */
function BSO_enterToTab(){
        if(event.srcElement.type != 'button' && event.srcElement.type != 'textarea' && event.keyCode == 13){
                event.keyCode = 9;
        }

}
/**
 *名称：checkEmpty()
 *功能：根据属性isNullable,检查是否合法
 *返回：Boolean型
 */
function BSO_commonCheck(){
    
	if( !this.checkEmpty() || !this.checkMinLength() || !this.checkMaxLength() || !this.checkFixLength())	return false;
    
	return true;
}
/**
 *名称：checkMinLength()
 *功能：检查是否满足最小长度
 *返回：Boolean型
 */
function BSO_checkMinLength(){
	var minLength = this.edtObj.getAttribute("minLength");
	if(minLength == null) return true;
	if(!isNaN(parseInt(minLength,10))){
		var value = this.getObjValue();
		var valueLength = bitLength(value);
		minLength = parseInt(minLength,10);
		if(minLength > valueLength){
			showAlert("长度最小为"+minLength+"位,请重新输入！\n注意：一个汉字占"+unieap.bitsOfOneChinese+"位",this.edtObj,true);
			return false;
		}
	}
	return true;
}

/**
 *名称：checkMaxLength()
 *功能：检查是否满足最大长度
 *返回：Boolean型
 */
function BSO_checkMaxLength(){
	var maxLength = this.edtObj.getAttribute("maxLength");
	if(maxLength == null) return true;
	if(!isNaN(parseInt(maxLength,10))){
		var value = this.getObjValue();
		var valueLength = bitLength(value);
		maxLength = parseInt(maxLength,10);
		if( valueLength > maxLength){
			showAlert("长度最大为"+maxLength+"位,请重新输入！\n注意：一个汉字占"+unieap.bitsOfOneChinese+"位",this.edtObj,true);
			return false;
		}
	}
	return true;
}

/**
 *名称：checkFixLength()
 *功能：检查是否满足固定长度
 *返回：Boolean型
 */
function BSO_checkFixLength(){
	var fixLength = this.edtObj.getAttribute("fixLength");
	if(fixLength == null) return true;
	if(!isNaN(parseInt(fixLength,10))){
		var value = this.getObjValue();
		var valueLength =bitLength(value);
		fixLength = parseInt(fixLength,10);
		if(fixLength != valueLength){
			showAlert("长度必须为"+fixLength+"位,请重新输入！\n注意：一个汉字占"+unieap.bitsOfOneChinese+"位",this.edtObj,true);
			return false;
		}
	}
	return true;
}
/**
 *名称：checkEmpty()
 *功能：根据属性isNullable,检查是否合法
 *返回：Boolean型
 */
function BSO_checkEmpty(){

	if(lowerCase(this.edtObj.getAttribute("isNullable")) == "false" ){
		if(this.isEmpty()){
			var mes = "不能为空，请重新输入！";
			if(lowerCase(this.edtObj.tagName) == "select")	mes = "不能为空，请选择！";
			showAlert(mes,this.edtObj,true);
			return false;
		}
	}
	return true;
}
/**
 *名称：isEmpty()
 *功能：对象值是否为空
 *返回：Boolean型
 */
function BSO_isEmpty(){
	if(this.getObjValue() == null)	return true;
    if(this.isNeedtrim)
       this.edtObj.value = trim(this.getObjValue());
    if(this.edtObj.value=="") return true;
	return false;
}
/**
 *名称：getObjValue()
 *功能：获取对象的值
 *返回：
 */
function BSO_getObjValue(){
  var value = this.edtObj.value;
  return value == null || value == "" ? null : value;
}

/**
 *名称：onContentReady()
 *功能：置unieap标志
 *形参：
 *返回：
 */
function BSO_onContentReady(){
   this.edtObj.isUniEAP=true;
   //把所有的fixLength属性转成maxLength属性
   var fixLength = this.edtObj.getAttribute("fixLength");
   if( fixLength != null && fixLength != "undenfied" && fixLength != "")  this.edtObj.maxLength = fixLength;
   //如果没有定义prompt属性，定义其值为name的值
   if(this.edtObj.getAttribute("prompt") == "undenfied"){
   		this.edtObj.prompt = this.edtObj.name;
   }
  var isReadOnly = this.edtObj.getAttribute("isreadonly");
  if(isReadOnly != null && isReadOnly.toUpperCase() == "TRUE"){
        this.edtObj.disabled = true;
       /*
       if(this.edtObj.tagName.toUpperCase() == "SELECT")
           this.edtObj.disabled = true;
       else
           this.edtObj.readOnly = true;
       */
  }
  if(this.edtObj.disabled) this.edtObj.className = "NEUDwReadOnly";

}
function BSO_eventBand(eventID,eventHandler){
	if("onkeydown" == eventID.toLowerCase()){
	 	var handler = "eapObjsMgr.getEAPObj(this).getBaseObj().enterToTab();eapObjsMgr.getEAPObj(this)."+eventHandler+";";
	 	this.edtObj.attachEvent("onkeydown",handler);
	 	return;
	}
	alert(eventID+","+eventHandler);
	alert(this.edtObj);
	//this.edtObj.attachEvent(eventID," eapObjsMgr.getEAPObj(this)."+eventHandler+";");
	this.edtObj.attachEvent(eventID,"alert(this);");
	alert(eventID+","+eventHandler);
}
	
///////////////  公用函数 ////////////////////////////////////
/**
 *名称：upperCase()
 *功能：把字符串转换成大写
 *返回：转换后的字符串
 */
function upperCase(arg){
	return makeCase(arg,"UPPER");
}
/**
 *名称：lowerCase()
 *功能：把字符串转换成小写
 *返回：转换后的字符串
 */
function lowerCase(arg){
	return makeCase(arg,"LOWER");
}
/**
 *名称：showAlert()
 *功能：显示提示信息
 *形参：message 显示的信息
 *      obj     相关对象
 *      isFocus 是否聚焦
 */
function showAlert(message,obj,isFocus){
	var mes = "";
	var flag = false;
	if(obj){
		if(obj.prompt)
			mes = "["+obj.prompt+"]";
		if(isFocus) flag = true;
	}
	alert(mes + message);
	if(flag)	try{obj.focus();}catch(e){}
}
/**
 *名称：makeCase()
 *功能：按要求转换大小写
 *形参：
 *返回：转换后的字符串
 */
function makeCase(arg,kind){
	if(arg == null)	return "";
	var str = ""+arg;
	if(kind == "UPPER")
		return str.toUpperCase();
	return str.toLowerCase();
}
/**
 *名称：bitLength()
 *功能：判断一个字符串的长度，可定义一个汉字占几位
 *形参：
 *返回：长度
 */
function bitLength(str){
	if(str==null || str == "") return 0;
	var len = 0;
	for(var i=0; i < str.length; i++){
		//非汉字
		//if(str.substring(i,i+1).charCodeAt(0) < 0x4e00){
		if(str.substring(i,i+1).charCodeAt(0) < 128){
			len ++;
		 	continue;
		}
		//汉字
		len += unieap.bitsOfOneChinese;
	}
	return len;
}
/**
*去空格操作
*/
function trim(arg){
    if(arg=="") return arg;     
    while(arg.charAt(0)==" ")
       arg = arg.substring(1);    
    while(arg.charAt(arg.length-1)==" ")
       arg = arg.substring(0,arg.length-1);     
    return arg;
}