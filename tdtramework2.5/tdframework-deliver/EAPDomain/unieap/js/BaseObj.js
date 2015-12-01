/**
 * UniEAP1.7 ����
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
    this.isNeedtrim = true; //�Ƿ�trim����
}
/**
 *���ƣ�enterToTab
 *���ܣ����س���ת����TAB
 *�βΣ�
 *
 *���أ�
 */
function BSO_enterToTab(){
        if(event.srcElement.type != 'button' && event.srcElement.type != 'textarea' && event.keyCode == 13){
                event.keyCode = 9;
        }

}
/**
 *���ƣ�checkEmpty()
 *���ܣ���������isNullable,����Ƿ�Ϸ�
 *���أ�Boolean��
 */
function BSO_commonCheck(){
    
	if( !this.checkEmpty() || !this.checkMinLength() || !this.checkMaxLength() || !this.checkFixLength())	return false;
    
	return true;
}
/**
 *���ƣ�checkMinLength()
 *���ܣ�����Ƿ�������С����
 *���أ�Boolean��
 */
function BSO_checkMinLength(){
	var minLength = this.edtObj.getAttribute("minLength");
	if(minLength == null) return true;
	if(!isNaN(parseInt(minLength,10))){
		var value = this.getObjValue();
		var valueLength = bitLength(value);
		minLength = parseInt(minLength,10);
		if(minLength > valueLength){
			showAlert("������СΪ"+minLength+"λ,���������룡\nע�⣺һ������ռ"+unieap.bitsOfOneChinese+"λ",this.edtObj,true);
			return false;
		}
	}
	return true;
}

/**
 *���ƣ�checkMaxLength()
 *���ܣ�����Ƿ�������󳤶�
 *���أ�Boolean��
 */
function BSO_checkMaxLength(){
	var maxLength = this.edtObj.getAttribute("maxLength");
	if(maxLength == null) return true;
	if(!isNaN(parseInt(maxLength,10))){
		var value = this.getObjValue();
		var valueLength = bitLength(value);
		maxLength = parseInt(maxLength,10);
		if( valueLength > maxLength){
			showAlert("�������Ϊ"+maxLength+"λ,���������룡\nע�⣺һ������ռ"+unieap.bitsOfOneChinese+"λ",this.edtObj,true);
			return false;
		}
	}
	return true;
}

/**
 *���ƣ�checkFixLength()
 *���ܣ�����Ƿ�����̶�����
 *���أ�Boolean��
 */
function BSO_checkFixLength(){
	var fixLength = this.edtObj.getAttribute("fixLength");
	if(fixLength == null) return true;
	if(!isNaN(parseInt(fixLength,10))){
		var value = this.getObjValue();
		var valueLength =bitLength(value);
		fixLength = parseInt(fixLength,10);
		if(fixLength != valueLength){
			showAlert("���ȱ���Ϊ"+fixLength+"λ,���������룡\nע�⣺һ������ռ"+unieap.bitsOfOneChinese+"λ",this.edtObj,true);
			return false;
		}
	}
	return true;
}
/**
 *���ƣ�checkEmpty()
 *���ܣ���������isNullable,����Ƿ�Ϸ�
 *���أ�Boolean��
 */
function BSO_checkEmpty(){

	if(lowerCase(this.edtObj.getAttribute("isNullable")) == "false" ){
		if(this.isEmpty()){
			var mes = "����Ϊ�գ����������룡";
			if(lowerCase(this.edtObj.tagName) == "select")	mes = "����Ϊ�գ���ѡ��";
			showAlert(mes,this.edtObj,true);
			return false;
		}
	}
	return true;
}
/**
 *���ƣ�isEmpty()
 *���ܣ�����ֵ�Ƿ�Ϊ��
 *���أ�Boolean��
 */
function BSO_isEmpty(){
	if(this.getObjValue() == null)	return true;
    if(this.isNeedtrim)
       this.edtObj.value = trim(this.getObjValue());
    if(this.edtObj.value=="") return true;
	return false;
}
/**
 *���ƣ�getObjValue()
 *���ܣ���ȡ�����ֵ
 *���أ�
 */
function BSO_getObjValue(){
  var value = this.edtObj.value;
  return value == null || value == "" ? null : value;
}

/**
 *���ƣ�onContentReady()
 *���ܣ���unieap��־
 *�βΣ�
 *���أ�
 */
function BSO_onContentReady(){
   this.edtObj.isUniEAP=true;
   //�����е�fixLength����ת��maxLength����
   var fixLength = this.edtObj.getAttribute("fixLength");
   if( fixLength != null && fixLength != "undenfied" && fixLength != "")  this.edtObj.maxLength = fixLength;
   //���û�ж���prompt���ԣ�������ֵΪname��ֵ
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
	
///////////////  ���ú��� ////////////////////////////////////
/**
 *���ƣ�upperCase()
 *���ܣ����ַ���ת���ɴ�д
 *���أ�ת������ַ���
 */
function upperCase(arg){
	return makeCase(arg,"UPPER");
}
/**
 *���ƣ�lowerCase()
 *���ܣ����ַ���ת����Сд
 *���أ�ת������ַ���
 */
function lowerCase(arg){
	return makeCase(arg,"LOWER");
}
/**
 *���ƣ�showAlert()
 *���ܣ���ʾ��ʾ��Ϣ
 *�βΣ�message ��ʾ����Ϣ
 *      obj     ��ض���
 *      isFocus �Ƿ�۽�
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
 *���ƣ�makeCase()
 *���ܣ���Ҫ��ת����Сд
 *�βΣ�
 *���أ�ת������ַ���
 */
function makeCase(arg,kind){
	if(arg == null)	return "";
	var str = ""+arg;
	if(kind == "UPPER")
		return str.toUpperCase();
	return str.toLowerCase();
}
/**
 *���ƣ�bitLength()
 *���ܣ��ж�һ���ַ����ĳ��ȣ��ɶ���һ������ռ��λ
 *�βΣ�
 *���أ�����
 */
function bitLength(str){
	if(str==null || str == "") return 0;
	var len = 0;
	for(var i=0; i < str.length; i++){
		//�Ǻ���
		//if(str.substring(i,i+1).charCodeAt(0) < 0x4e00){
		if(str.substring(i,i+1).charCodeAt(0) < 128){
			len ++;
		 	continue;
		}
		//����
		len += unieap.bitsOfOneChinese;
	}
	return len;
}
/**
*ȥ�ո����
*/
function trim(arg){
    if(arg=="") return arg;     
    while(arg.charAt(0)==" ")
       arg = arg.substring(1);    
    while(arg.charAt(arg.length-1)==" ")
       arg = arg.substring(0,arg.length-1);     
    return arg;
}