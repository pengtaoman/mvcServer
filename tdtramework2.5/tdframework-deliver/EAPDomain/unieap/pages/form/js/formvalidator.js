/****************************************************
*  Note  :formvalidator \u8868\u5355\u4e2d\u7684\u6821\u9a8c\u65b9\u6cd5
*  author:app
*  date  :2007.11.5
*****************************************************/

var verifyMsg = new Hashtable();
var errorMsg = new Hashtable();

var dataTypeInfo = new Array("","\u6587\u672c","\u6574\u6570","\u5c0f\u6570","IP \u5730\u5740","\u8eab\u4efd\u8bc1\u53f7","\u7535\u5b50\u90ae\u4ef6\u5730\u5740","\u7535\u8bdd\u53f7\u7801","\u65e5\u671f","\u90ae\u653f\u7f16\u7801");

function verifyAll(){

	verifyMsg.clear();
	errorMsg.clear();
	
	try{
		var frm = document.forms[0];
		var elmnt;
		var tipname;
		var parent; 
		var msg;
		for(var i=0;i<frm.elements.length;i++){
		    elmnt=frm.elements[i];
		    tipname = elmnt.title;
		    parent = getParentDiv(elmnt);
		    if(!tipname || ""==tipname){
		    	tipname = elmnt.name;
		    }
		    if(verifyRequired(elmnt)==false){
		        
		    	page.f_activate_tab(parent.id.substring(parent.id.length-1));
		    	msg = "\u6b64\u63a7\u4ef6\u4e3a\u5fc5\u586b\u9879";
		    	verifyMsg.put(tipname,msg);
		    }
		    if("textarea"==elmnt.type||"text"==elmnt.type){
		    	if(verifyMaxLength(elmnt)==false){
		    		
		    		page.f_activate_tab(parent.id.substring(parent.id.length-1));
		    		msg = "\u6b64\u63a7\u4ef6\u4e2d\u5185\u5bb9\u8d85\u8fc7\u4e86\u6700\u5927\u957f\u5ea6 ["+elmnt.getAttribute("maxlength")+"]\u3002"
	        		    +"(\u5176\u4e2d\u6c49\u5b57\u5360\u4e24\u4e2a\u5b57\u8282)"
		    		verifyMsg.put(tipname,msg);
		    	}
		    	
		    }
		    if("text"==elmnt.type){
		    	
		    	if(verifyDataType(elmnt)==false){
		    		page.f_activate_tab(parent.id.substring(parent.id.length-1));
		    		msg = "\u6b64\u63a7\u4ef6\u4e2d\u8981\u6c42\u8f93\u5165"+dataTypeInfo[elmnt.datatype]+"";
		    		verifyMsg.put(tipname,msg);
		    	}
		    }
		    if("file"==elmnt.type){
		    	if(elmnt.value!=null && ""!=elmnt.value){
		    		if(!checkFileName(elmnt.value)){
			    		page.f_activate_tab(parent.id.substring(parent.id.length-1));
			    		msg = "\u4e0a\u4f20\u7684\u6587\u4ef6\u4e0d\u5b58\u5728\uff0c\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u6587\u4ef6\u8def\u5f84\u3002";
			    		verifyMsg.put(tipname,msg);		    			
		    		}
		    	}
		    }		    
		}	
			
	
	}catch(e){
		alert(e.description);
		verifyMsg.put("JSError",e.description);
		return false;
	}
}


/**
 * juge the elmnt is required or not
 * author:ly_liuy@neusoft.com
 * date  :2007.11.5
 */
function isRequired(elmnt){

   	var required = elmnt.getAttribute("required");
   	if(!required || ""==required || "false"==required){
   		return false;
   	}else
   	if(required=="true"){
   		return true;
   	}
}

/**
 * verify required elmnt
 * author:ly_liuy@neusoft.com
 * date  :2007.11.5
 */
function verifyRequired(elmnt){

	if(isRequired(elmnt)==false){
		return true;
	}	
	
	//process calendar and datatree
	if(elmnt.readOnly){
		if(elmnt.getAttribute("type")== "calendar" ){
			//var cal = getFormCalendar(elmnt.name)
			//var value = cal.getValue();
			var value = elmnt.value;
			if(value==null || ""==value.trim()){
				return false;
			}
		}else{
			return true;
		}	
	}else
	if(elmnt.disabled){
		return true;
	}else
	if("hidden"==elmnt.style.visibility || "block"==elmnt.style.display){
		return true;
	}else
	{
		if(elmnt.value.trim().length-1<0){
			return false;
		}
		return true;	
	}
}

/**
 * check file name is valid and the file is exist or not
 * author:ly_liuy@neusoft.com
 * date  :2007.11.5
 */
function checkFileName(path) { 
  	return new ActiveXObject("Scripting.FileSystemObject").FileExists(path); 
}

/**
 * verity max length
 * author:ly_liuy@neusoft.com
 * date  :2007.11.5
 */
function verifyMaxLength(elmnt){
	
  	if (elmnt.getAttribute("maxLength")!=null&& elmnt.getAttribute("maxLength")!=""){	
    	var max = elmnt.getAttribute("maxLength");
		if(max!="" && parseInt(elmnt.value.replace(/[^\x00-\xff]/g,'**').length)>parseInt(max)){
	  		return false;
		}
  	}
  	return true;
}

/**
 * veriy datatype
 * author:ly_liuy@neusoft.com
 * date  :2007.11.6
 * 1. text
 * 2. int
 * 3. float
 * 4. IP
 * 5. ID
 * 6. Email
 * 7. phoneNum
 * 8. date
 * 9. postcode
 */
function verifyDataType(elmnt){

	var type = elmnt.datatype;
	
	if(type==null ||""==type){
		return true;
	}
	if(elmnt.value==null || ""==elmnt.value){
		return true;
	}
	
	
	var validator;
	if("1"==type){
		return true;
	}
	if("2"==type){
		validator = "(\\d)*";
	}
	if("3"==type){
		validator = "(((\\d)*)|((\\d)*\\.(\\d)*))";
	}
	if("4"==type){
		validator = "\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}";
		//validator = "^"+validator+"$";				
	}
	if("5"==type){
		validator = "(((\\d{17}\\w)|(\\d{15}))|(([a-z]|[A-Z])(1|2)\\d{8})|(([a-z]|[A-Z])\\d{6}\\(((A|a)|[0-9]))\\))";
	}
	if("6"==type){
		validator = "\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*";
	}
	if("7"==type){
		validator = "((\\d{3,4})|\\d{3,4}\\-)?\\d{7,8}(\\-\\d{3})*";
	}
	if("8"==type){
		validator = "(\\d{4}-((0)?[1-9]|1[0-2])-((0)?[1-9]|[12]\\d|3[0-1]))|(\\d{4}\\.((0)?[1-9]|1[0-2])\\.((0)?[1-9]|[12]\\d|3[0-1]))|(\\d{4}\\/((0)?[1-9]|1[0-2])\\/((0)?[1-9]|[12]\\d|3[0-1]))|(((0)?[1-9]|1[0-2])\\/((0)?[1-9]|[12]\\d|3[0-1])\\/\\d{4})|(\\d{4}-((0)?[1-9]|1[0-2])-((0)?[1-9]|[12]\\d|3[0-1])\\s([01]\\d|[2][0-3]):([0-5]?\\d):([0-5]?\\d))|(\\d{4}\\/((0)?[1-9]|1[0-2])\\/((0)?[1-9]|[12]\\d|3[0-1])\\s([01]\\d|[2][0-3]):([0-5]?\\d):([0-5]?\\d))";
	}
	if("9"==type){
		validator = "\\d{6}";
	}
	validator = "^"+validator+"$";
	validator = validator.replace(/^\s+/,"");
	validator = validator.replace(/\s+$/,"");	
	
	validator = eval("/"+validator+"/");

	if(!validator.test(elmnt.value)){
		
		return false;
	}else{
		return true;
	}	
}


/**
 * trim
 * author:ly_liuy@neusoft.com
 * date  :2007.11.5
 */
String.prototype.trim = function(){
    return this.replace(/(^[\s]*)|([\s]*$)/g, "");
}

function trim(value){
	return value.trim();
}


/**
 * enter to tab
 * author:ly_liuy@neusoft.com
 * date  :2007.11.5
 */
function Enter2Tab(e){
    try
    {
        var ob = IsFireFox ? e.target : event.srcElement;
        if(ob.tagName == "INPUT" &&
        (
        ob.type == "text" ||
        ob.type == "password" ||
        ob.type == "checkbox" ||
        ob.type == "radio"
        ) ||
        ob.tagName == "SELECT")
        {
            var key = IsFireFox ? e.which : event.keyCode;
            if (key == 13)
            {
                if (IsFireFox)
                {
                    event.which = 9;
                }
                else
                {
                    event.keyCode = 9;
                }
            }
        }
    }
    catch(E){}
}
