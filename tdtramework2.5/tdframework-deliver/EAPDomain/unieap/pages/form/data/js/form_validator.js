var validatorTypeMsg = new Array("","\u6587\u672c","\u6574\u6570","\u6b63\u786e\u7684\u6570\u5b57","IP \u5730\u5740","\u8eab\u4efd\u8bc1","\u7535\u5b50\u90ae\u4ef6","\u7535\u8bdd\u53f7\u7801","\u65e5\u671f","\u90ae\u653f\u7f16\u7801");
var radioGroupName;
function do_form_verify()
{ 
  try{
    var frm = document.forms[0];   
    
    for(var i=0;i<frm.elements.length;i++)
    {
      var elmnt=frm.elements[i]; 
      var parent = getParentDiv(elmnt);
      var altName = elmnt.title;
      if(!altName || altName.length==0)
          altName =  elmnt.name;
      	
	  if(verifyRequired(elmnt)==false)
	  {
	      page.f_activate_tab(parent.id.substring(parent.id.length-1));
	      if(elmnt.getAttribute("type")== "datatree"){
	        altName = altName.substring(0,elmnt.name.indexOf("_displaytext"));
	      }
	      if(elmnt.getAttribute("type")=="radio"){
	        altName = elmnt.parentNode.parentNode.title;
	        if(!altName || altName.length==0)
	            altName = elmnt.name;
	      }
	      alert("\u5fc5\u586b\u9879 ["+altName+"] \u4e2d\u672a\u8f93\u5165\u4fe1\u606f");
	      goToElement(elmnt);
	      return false;
	  }
	  if(elmnt.type=="text"
	    ||elmnt.type=="password"
	    ||elmnt.type=="textarea"){
	    if(!verifyMinLength(elmnt)){
	      page.f_activate_tab(parent.id.substring(parent.id.length-1));
	      alert(altName+": \u8bf7\u81f3\u5c11\u8f93\u5165"+elmnt.getAttribute("minlength")+"\u4f4d!");
   	      goToElement(elmnt);
              return false;
        }
        
	    if(elmnt.type=="textarea"||elmnt.type=="text"){
	      
	      if(!verifyMaxLength(elmnt)){
	      	page.f_activate_tab(parent.id.substring(parent.id.length-1));
	        alert("["+altName+"] \u4e2d\u5185\u5bb9\u8d85\u8fc7\u4e86\u6700\u5927\u957f\u5ea6 ["+elmnt.getAttribute("maxlength")+"]\u3002"
	        		+"(\u5176\u4e2d\u6c49\u5b57\u5360\u4e24\u4e2a\u5b57\u8282)");
            goToElement(elmnt);
	        return false;
	      }
	    }
	    if(elmnt.type!="password"){
	      if(!verifyFormat(elmnt)){
	      	page.f_activate_tab(parent.id.substring(parent.id.length-1));
	        alert("\u8bf7\u5728 ["+altName+"] \u4e2d\u8f93\u5165"+validatorTypeMsg[elmnt.datatype]);
   			goToElement(elmnt);
			return false;
	      }
        }
        
      } 
      if(!validateType(elmnt)){
      	page.f_activate_tab(parent.id.substring(parent.id.length-1));
		goToElement(elmnt);
      	return false;
      }
      if("file"==elmnt.type){
      	if(elmnt.value!=""){    		
      		if(!checkFileName(elmnt.value)){
      			alert("\u4e0a\u4f20\u7684\u6587\u4ef6\u4e0d\u5b58\u5728\uff0c\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u6587\u4ef6\u8def\u5f84\u3002");
      			return false;
      		}
        }
      }     
   }
   radioGroupName = "";
   return true;
   }catch(e){
   		radioGroupName = "";
   	    alert(e.description);
   	    return false;
   }
}
function checkFileName(path) 
{ 
  return new ActiveXObject("Scripting.FileSystemObject").FileExists(path); 
}
function isRequired(element){
   var required = element.getAttribute("required");
   return requried && requried!="";
}

function goToElement(element){
  //element.focus();

  drawValidateRect(element,element.getAttribute("type"));
  radioGroupName ="";
}

function verifyRequired(elmnt)
{ 

  var required = elmnt.getAttribute("required");
  //alert(elmnt.name+":"+required)
  //calendar
  //alert(elmnt.name+":"+elmnt.readOnly)	
  if(elmnt.readOnly){
	  if(elmnt.getAttribute("type")== "calendar" ){ 
	    if(elmnt.nextSibling.style.filter){
	        return true;
	    }
	    else if (required == "true"){ 
	      var cal = getFormCalendar(elmnt.name);
	      var value = cal.getValue();
	      if(value==null || value=="") return false;
	    }
	  } 
	  //datatree
	  else if(elmnt.getAttribute("type")== "datatree" ){ 

	    if(elmnt.nextSbling){
		    if(elmnt.nextSibling.style.filter){
		        return true;
		    }
	    }   
	    else if (required == "true"){ 
	      var tree = getFormTree(elmnt.name);
	      var value = tree.getValue(); 
	      if(value==null || value=="") return false;
	    }
	  }	
	  else return true; 
  }
  else if(elmnt.disabled){
     return true;
  }
 else{
	  //checkbox and radio 
	  
	  if(elmnt.getAttribute("type")== "checkbox" ){ 
	    //alert(elmnt.name+":"+elmnt.checked+":"+required)
	    if (required == "true"){
	      var obj = document.getElementsByName(elmnt.name)[0];
	      if(!obj.checked) return false;
	    }
	  }
	  
	  if(elmnt.getAttribute("type")== "radio" ){
	    //alert(elmnt.name+":"+elmnt.checked+":"+required)
	    if(radioGroupName==elmnt.name){
	      return true;
	    }
	    if (required == "true"){ 
	      
	      var obj = document.getElementsByName(elmnt.name);
	      var flag = false;
	      for(j=0;j<obj.length;j++){
	      	if(obj[j].checked){
	      	  flag=true; break;
	      	} 
	      }
	      radioGroupName = elmnt.name;  
	      return flag;
	    }
	    
	  }
	  //combox and list 
	  //..............
	  if(elmnt.style.visibility=="hidden")
	  	  return true;
	  if(elmnt.getAttribute("readonly")==true||elmnt.getAttribute("disabled")==true)
	  	  return true; 
	  
	  if (required && required!="")
		{
	      required = required.replace(/^\s+/,"");
	      required = required.replace(/\s+$/,"");
	      if(required.toLowerCase()=="true")
	      {
	  	    if(elmnt.value.trim().length-1<0)//elmnt.value.length-1<0, permit input space 
	  	    {
	  	      return false;
	        }
	      }
	  }
	  return true;
  }
}

function verifyMinLength(elmnt){
  if (elmnt.getAttribute("minlength")!=null
	&& elmnt.getAttribute("minlength")!=""){
    var min = elmnt.getAttribute("minlength");
    min = min.replace(/^\s+/,"");
    min = min.replace(/\s+$/,"");
	if(min!=""&& elmnt.value.length<min){
	  return false;
	}
  }
  return true;
}

function verifyMaxLength(elmnt){
  
  
  if (elmnt.getAttribute("maxlength")!=null
	&& elmnt.getAttribute("maxlength")!=""){
	
    var max = elmnt.getAttribute("maxlength");

    //max = max.replace(/^\s+/,"");
    //max = max.replace(/\s+$/,"");

	if(max!="" && elmnt.value.replace(/[^\x00-\xff]/g,'**').length>max){
	  return false;
	}
  }
  return true;
}

function verifyFormat(elmnt){
  
  if(elmnt.value=="")
  	 return true;
  if(elmnt.getAttribute("validator")!=null
	&& elmnt.getAttribute("validator")!=""){
    var validator = elmnt.getAttribute("validator");
    //validator = "^"+validator+"$";
    //var validator="(\\d{4}-((0)?[1-9]|1[0-2])-((0)?[1-9]|[12]\\d|3[0-1])\\s([01]\\d|[2][0-3]):([0-5]?\\d):([0-5]?\\d))";
	//var validator="(-)?\d+\.\d{0,2}";//((-)?\\d+)(\\.\\d*)?
	validator = "^"+validator+"$";
	validator = validator.replace(/^\s+/,"");
	validator = validator.replace(/\s+$/,"");
	if(validator!=""){
      validator =eval("/"+validator+"/");
      if(!validator.test(elmnt.value)){
        if(elmnt.getAttribute("datatype")==3){
        	validator = elmnt.getAttribute("validator");
			var int_fir = validator.indexOf(",");
  	    	if(int_fir==-1){		
				validator = validator.replace("{","{0,").replace("\\.","(\\.");
				validator = validator +")?";
				var val = "^"+validator+"$";
				if(val!=""){
      				val =eval("/"+val+"/");
      				if(!val.test(elmnt.value)){
	    				return false;
	 	 			}else{
	 	 				return true;
	 	 			}
    			}          
        	}
        	return false;
        }
	    else return false; 
	  }
    }
  }
  return true;
}
/**
* validate the textfield's data type
* 1:text
* 2:int
* 3:float
*/

function validateType(field){

  var altName = field.title;
      if(!altName || altName.length==0)
          altName =  field.name;

  if(!field.value){
 	return validateField(field);
  	//return;
  }
  else if(field.getAttribute("datatype")==2){
  	
  	if(field.value!=parseInt(field.value)){
  		alert("\u8bf7\u5728 ["+altName+"] \u4e2d\u8f93\u5165\u6574\u6570");
  		goToElement(field);
  		return false;
  	}
  	else {
  		return validateField(field);
  	}
  }
  else if(field.getAttribute("datatype")==3){
  	
  	if(field.value!=parseFloat(field.value)){
  		alert("\u8bf7\u5728 ["+altName+"] \u4e2d\u8f93\u5165\u6570\u5b57");
  		goToElement(field);
  		return false;
  	}
  	else { 
  	  if(!verifyFormat(field)){
  	    var validator = field.getAttribute("validator");
  	    var int_fir = validator.indexOf(",");
  	    if(int_fir==-1){		
			validator = validator.replace("{","{0,").replace("\\.","(\\.");
			validator = validator +")?";
		}
		
		verifyFloat(validator,field);

  	  }else {
  	    return validateField(field);
  	  }
  	}
  }
  else if(field.getAttribute("datatype")==1){
  	return validateField(field);
  }
  return true;
}
function verifyFloat(validator,field){
  var altName = field.title;
  if(!altName || altName.length==0)
    altName =  field.name;
	var int_fir = validator.indexOf(",");
  	var int_last = validator.indexOf("}");
  	var point_pos = validator.indexOf(".");
  	int_bits  = validator.substring(int_fir+1,int_last);
  	if(point_pos>int_last){
  	  	var float_fir = validator.lastIndexOf(",");
		var float_last = validator.lastIndexOf("}");
		float_bits = validator.substring(float_fir+1,float_last);
  	  	if(point_pos<float_fir){
  	   		alert("["+altName+"] \u4e2d\u8f93\u5165\u7684\u6574\u6570\u4f4d\u6570\u4e0d\u5141\u8bb8\u8d85\u8fc7 "+ int_bits +" \u4f4d\u5e76\u4e14\u5c0f\u6570\u4f4d\u6570\u4e0d\u5141\u8bb8\u8d85\u8fc7 "+ float_bits +" \u4f4d");  	    	
  	   	}else {
	    	alert("["+altName+"] \u4e2d\u8f93\u5165\u7684\u6574\u6570\u4f4d\u6570\u4e0d\u5141\u8bb8\u8d85\u8fc7 "+ int_bits +" \u4f4d");
	    }	
  	 }else {
  	   	alert("["+altName+"] \u4e2d\u8f93\u5165\u7684\u5c0f\u6570\u4f4d\u6570\u4e0d\u5141\u8bb8\u8d85\u8fc7 "+ int_bits +" \u4f4d");  	    	
  	 }
  	 
  	 goToElement(field);
  	 return false;
}
function validateField(field){

  var altName = field.title;
      if(!altName || altName.length==0)
          altName =  field.name;

  var expr = field.getAttribute("validateexpr"); 
  if(expr){
  	
  	var name = field.name;
  	
  	if(field.getAttribute("promptinfo")==null||field.getAttribute("promptinfo")==""){
  		field.setAttribute("promptinfo","\u8bed\u6cd5\u9519\u8bef\uff1a\u672a\u8f93\u5165\u9519\u8bef\u63d0\u793a\u4fe1\u606f\u3002");  	
  	}
  	var valueString = "document.all."+name+".value"; 
  	while(expr.indexOf(valueString)!=-1){
  		expr = expr.replace("document.all."+name+".value","'"+field.value+"'");
  	} 
  	if(!eval(expr)){
  		alert("["+altName +"] "+field.getAttribute("promptinfo"));
  		goToElement(field);
  		return false;
  	}else{
  		return true;
  	}
  }else{
  	return true;
  }
}

function toInt(value){
   if(value=="")
	   	return 0;
   return parseInt(value);
}
function toFloat(value){
   if(value=="")
	   	return 0.0;
   return parseFloat(value);
}
String.prototype.trim = function()
{
    return this.replace(/(^[\s]*)|([\s]*$)/g, "");
}
function trim(value){
	return value.trim();
}
/*
* judge whether the value contains this str
* return true or false;
*/
function matchstr(value,str){
	 return value.lastIndexOf(str)>=0;
}

function notmatchstr(value,str){
	return value.lastIndexOf(str)<0;
}
//checkout whether the value starts with this str
function startstr(value,str){
	//alert(value.lastIndexOf(str))
	return value.lastIndexOf(str)==0;
}

function notstartstr(value,str){
	return value.lastIndexOf(str)!=0;
}

//checkout whether the value is a nevigator
function isNevigator(value){
   return parseFloat(value)<0;
}



function do_submit_form(){
  if(do_form_verify()==true){
    document.forms[0].submit();
    return true;
  }
  return false; 
}
function do_reset_form(){
  document.forms[0].reset();
}


function do_open_url(url){
  location.replace(url);
}

function do_open_form(form,nn){
  WindowName="MyPopUpWindow";
  settings=
  "toolbar=yes,location=yes,directories=yes,"+
  "status=no,menubar=no,scrollbars=yes,"+
  "resizable=yes,width=600,height=600";
  MyNewWindow = window.open(form,WindowName,settings); 
}

function do_open_window(win){
  WindowName="MyPopUpWindow";
  settings=
  "toolbar=yes,location=yes,directories=yes,"+
  "status=no,menubar=no,scrollbars=yes,"+
  "resizable=yes,width=600,height=600";
  MyNewWindow=
  window.open(win,WindowName,settings); 
}

function setFowardURL(url){
  document.forms[0].p_frm_qs.value=url;
}

function getElementValue(name){
  var value = document.getElementById(name).value;
  if(!value){
    alert("\u9519\u8bef\u7684\u63a7\u4ef6\u540d\u79f0 {" + name + "}"); 
  }
  return value;
}

function  getCurrentDate(){
  var da = new Date();
  var month = parseInt(da.getMonth())+1;
  month =month.toString();
  if(month.length<2){
    month = "0"+month
  }
  var day=da.getDate().toString();
  if(day.length<2){
    day="0"+day;
  }
  return  da.getYear()+"-"+month+"-"+day;
}

function getCurrentTime(){
  var da = new Date();
  var hours = parseInt(da.getHours());
  hours =hours.toString();
  if(hours.length<2){
    hours = "0"+hours;
  }
  var minutes=da.getMinutes().toString();
  if(minutes.length<2){
    minutes="0"+minutes;
  }
  var seconds=da.getSeconds().toString();
  if(seconds.length<2){
    seconds="0"+seconds;
  }
  return  hours+":"+minutes+":"+seconds;
}

function getTimeStamp(){
  var timeStamp = getCurrentDate()+" "+getCurrentTime();
  return timeStamp;
}

function CAPITAL(num){
  var reg=/^(-|\+)?\d*(\.)?(\d)+((e|E)(\+|-)?\d{1,3})?$/;
  var regN=/^\d+(\.\d+)?$/;
  if(!reg.test(num)){
  	alert("\u8bf7\u8f93\u5165\u6d6e\u70b9\u578b\u6216\u6574\u578b\u91d1\u989d\u6570\uff01");
	return false;
  }
  num = num*1.0;
  if(!regN.test(num)){
    alert("\u8f93\u5165\u7684\u6d6e\u70b9\u578b\u6216\u6574\u578b\u91d1\u989d\u6570\u503c\u592a\u5927\u65e0\u6cd5\u8f6c\u6362\uff01");
    return false;
  }
  var AA = new Array("\u96f6","\u58f9","\u8d30","\u53c1","\u8086","\u4f0d","\u9646","\u67d2","\u634c","\u7396");
    var BB = new Array("","\u62fe","\u4f70","\u4edf","\u842c","\u5104","\u5706","","\u89d2","\u5206");
  var a = (""+ num).replace(/(^0*)/g, "").split("."), k = 0, re = "";
  
  //\u56db\u820d\u4e94\u5165\u53d6\u4e24\u4f4d\u5c0f\u6570
  if(a.length>1){
    num = num.toFixed(2);
	a = (""+ num).replace(/(^0*)/g, "").split(".");
  }

  for(var i=a[0].length-1; i>=0; i--){
	var a0 = a[0].charAt(i);
    switch(k)
    {
       case 0 : re = re; break;
       case 4 : if(a[0].charAt(i+2) != 0 && a[0].charAt(i+1) == 0){
                  re = AA[0] + re; 
	    		}
				if(!new RegExp("0{4}\\d{"+ (a[0].length-i-1) +"}$").test(a[0]))
				  re = BB[4] + re; 
				  break;
		        
       case 8 : if(a[0].charAt(i+2) != 0 && a[0].charAt(i+1) == 0){
                  re = AA[0] + re; 
	    		}
				re = BB[5] + re; BB[7] = BB[5]; k = 0; break;
     }
     if(( k%4 == 2||k%4 == 3) && a[0].charAt(i+2) != 0 && a[0].charAt(i+1) == 0){
	   re = AA[0] + re;
	 }
     if(a0 != 0) { 
	   re = AA[a0] + BB[k%4] + re; 
	 } 
	 k++;
   }

   if(re!=""){
     re=re+BB[6];
   }
   if(a.length>1){  //\u52a0\u4e0a\u5c0f\u6570\u90e8\u5206(\u5982\u679c\u6709\u5c0f\u6570\u90e8\u5206)
	 re = re+ AA[a[1].charAt(0)]+BB[8];
	 if(a[1].length>1){
	   re = re+ AA[a[1].charAt(1)]+BB[9];
	 }
   }
   //alert(re);
   return re;
}
