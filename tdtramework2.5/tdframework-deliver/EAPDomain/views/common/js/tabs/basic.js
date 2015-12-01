function processException(e){
	switch (typeof(e)){
		case "string":{
			if (e!="abort"){
				if (e)
					alert(e);
				else
					alert(constErrUnknown);
			}
			break;
		}

		case "object":{
			alert(e.description+"\n"+constErrType+":"+(e.number & 0xFFFF));
			break;
		}
	}
}

function trimStr(str){
	str=getValidStr(str);
	if (!str) return "";
	for(var i=str.length-1; i>=0; i--){
		if (str.charCodeAt(i, 10)!=32) break;
	}
	return str.substr(0, i+1);
}

function getValidStr(str) {
	str+="";
	if (str=="undefined" || str=="null")
		return "";
	else
		return str;
}

function encode(strIn)
{
	var intLen=strIn.length;
	var strOut="";
	var strTemp;

	for(var i=0; i<intLen; i++)
	{
		strTemp=strIn.charCodeAt(i);
		if (strTemp>255)
		{
			tmp = strTemp.toString(16);
			for(var j=tmp.length; j<4; j++) tmp = "0"+tmp;
			strOut = strOut+"^"+tmp;
		}
		else
		{
			if (strTemp < 48 || (strTemp > 57 && strTemp < 65) || (strTemp > 90 && strTemp < 97) || strTemp > 122)
			{
				tmp = strTemp.toString(16);
				for(var j=tmp.length; j<2; j++) tmp = "0"+tmp;
				strOut = strOut+"~"+tmp;
			}
			else
			{
				strOut=strOut+strIn.charAt(i);
			}
		}
	}
	return (strOut);
}

function decode(strIn)
{
	var intLen = strIn.length;
	var strOut = "";
	var strTemp;

	for(var i=0; i<intLen; i++)
	{
		strTemp = strIn.charAt(i);
		switch (strTemp)
		{
			case "~":{
				strTemp = strIn.substring(i+1, i+3);
				strTemp = parseInt(strTemp, 16);
				strTemp = String.fromCharCode(strTemp);
				strOut = strOut+strTemp;
				i += 2;
				break;
			}
			case "^":{
				strTemp = strIn.substring(i+1, i+5);
				strTemp = parseInt(strTemp,16);
				strTemp = String.fromCharCode(strTemp);
				strOut = strOut+strTemp;
				i += 4;
				break;
			}
			default:{
				strOut = strOut+strTemp;
				break;
			}
		}

	}
	return (strOut);
}

function getEncodeStr(str) {
	return encode(getValidStr(str));
}

function getDecodeStr(str) {
	return ((str)?decode(getValidStr(str)):"");
}

function compareText(str1, str2){
	str1=getValidStr(str1);
	str2=getValidStr(str2);
	if (str1==str2) return true;
	if (str1=="" || str2=="") return false;
	return (str1.toLowerCase()==str2.toLowerCase());
}

function isTrue(value){
	return (value==true || (typeof(value)=="number" && value!=0) ||
		compareText(value, "true") || compareText(value, "T") ||
		compareText(value, "yes") || compareText(value, "on"));
}

function getStringValue(value){
	if (typeof(value)=="string" || typeof(value)=="object")
		return "\""+getValidStr(value)+"\"";
	else if (typeof(value)=="date")
		return "\""+(new Date(value))+"\"";
	else if (getValidStr(value)=="")
		return "\"\"";
	else
		return value;
}

function getInt(value){
	var result=parseInt(value);
	if (isNaN(result)) result=0;
	return result;
}

function getFloat(value){
	var result=parseFloat(value);
	if (isNaN(result)) result=0;
	return result;
}

function formatFloat(value, decimalLength){
	var text=getValidStr(Math.round(getFloat(value)*Math.pow(10, decimalLength)));
	var len=text.length;
	if (decimalLength > 0)
		return text.substr(0, len-decimalLength)+"."+text.substr(len-decimalLength, decimalLength);
	else
		return text.substr(0, len-decimalLength);
}

function formatDateTime(date, mode){
	function getDateString(date){
		var years=date.getFullYear();
		var months=date.getMonth()+1;
		var days=date.getDate();

		if (months<10) months="0"+months;
		if (days<10) days="0"+days;

		return years+"-"+months+"-"+days;
	}

	function getTimeString(date){
		var hours=date.getHours();
		var minutes=date.getMinutes();
		var seconds=date.getSeconds();

		if (hours<10) hours="0"+hours;
		if (minutes<10) minutes="0"+minutes;
		if (seconds<10) seconds="0"+seconds;

		return hours+":"+minutes+":"+seconds;
	}

	if (typeof(date)=="object" && !isNaN(date)){
		if (!mode) mode="datetime";
		switch (mode){
			case "date":{
				return getDateString(date);
				break;
			}
			case "time":{
				return getTimeString(date);
				break;
			}
			case "datetime":{
				return getDateString(date)+" "+getTimeString(date);
				break;
			}
			default:{
				return getDateString(date)+" "+getTimeString(date);
				break;
			}
		}
	}
	else
		return "";
}

function getTypedValue(value, dataType){
	var result="";
	switch (dataType){
		case "string":{
			result=getValidStr(value);
			break;
		}
		case "byte":;
		case "short":;
		case "int":;
		case "long":{
			result=Math.round(parseFloat(value));
			break;
		}
		case "float":;
		case "double":;
		case "bigdecimal":{
			result=parseFloat(value);
			break;
		}		
		case "date":;
		case "time":;
		case "timestamp":{
			value=getValidStr(value);
			result=new Date(value.replace(/-/g, "/"));
			break;
		}
		case "boolean":{
			result=isTrue(value);
			break;
		}
		default:{
			result=getValidStr(value);
			break;
		}
	}
	return result;
}

function pArray(){
	this.firstUnit=null;
	this.lastUnit=null;
	this.length=0;
}

function pArray_clear(pArray){
	var unit=pArray.firstUnit;
	var _unit;
	while (unit){
		_unit=unit;
		unit=unit.nextUnit;
		if (_unit.data) delete _unit.data;
		delete _unit;
	}
	pArray.firstUnit=null;
	pArray.lastUnit=null;
	pArray.length=0;
}

function pArray_insert(pArray, mode, unit, newUnit){
	var u1, u2;
	switch (mode){
		case "begin":{
			u1=null;
			u2=pArray.firstUnit;
			break;
		}
		case "before":{
			u1=(unit)?unit.prevUnit:null;
			u2=unit;
			break;
		}
		case "after":{
			u1=unit;
			u2=(unit)?unit.nextUnit:null;
			break;
		}
		default:{
			u1=pArray.lastUnit;
			u2=null;
			break;
		}
	}

	newUnit.prevUnit=u1;
	newUnit.nextUnit=u2;
	if (u1) u1.nextUnit=newUnit; else pArray.firstUnit=newUnit;
	if (u2) u2.prevUnit=newUnit; else pArray.lastUnit=newUnit;
	pArray.length++;
}

function pArray_insertArray(pArray, mode, unit, subArray){
	if (!subArray || !subArray.firstUnit) return;

	var u1, u2;
	switch (mode){
		case "begin":{
			u1=null;
			u2=pArray.firstUnit;
			break;
		}
		case "before":{
			u1=(unit)?unit.prevUnit:null;
			u2=unit;
			break;
		}
		case "after":{
			u1=unit;
			u2=(unit)?unit.nextUnit:null;
			break;
		}
		default:{
			u1=pArray.lastUnit;
			u2=null;
			break;
		}
	}

	subArray.firstUnit.prevUnit=u1;
	subArray.lastUnit.nextUnit=u2;
	if (u1) u1.nextUnit=subArray.firstUnit; else pArray.firstUnit=subArray.firstUnit;
	if (u2) u2.prevUnit=subArray.lastUnit; else pArray.lastUnit=subArray.lastUnit;
	pArray.length+=subArray.length;
}

function pArray_delete(pArray, unit){
	var u1, u2;
	u1=unit.prevUnit;
	u2=unit.nextUnit;
	if (u1) u1.nextUnit=u2; else pArray.firstUnit=u2;
	if (u2) u2.prevUnit=u1; else pArray.lastUnit=u1;
	delete unit;
	pArray.length--;
}

function pArray_ex_insert(pArray, data){
	var found=false;
	var _unit=pArray.firstUnit;
	while (_unit){
		if (_unit.data==data){
			found=true;
			break;
		}
		_unit=_unit.nextUnit;
	}

	var newUnit=new Object();
	newUnit.data=data;
	if (!found) pArray_insert(pArray, "end", null, newUnit);
}

function pArray_ex_delete(pArray, data){
	var _unit=pArray.firstUnit;
	while (_unit){
		if (_unit.data==data){
			pArray_delete(pArray, _unit);
			break;
		}
		_unit=_unit.nextUnit;
	}
}