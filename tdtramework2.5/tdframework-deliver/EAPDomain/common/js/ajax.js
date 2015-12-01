/*
Copyright 2005  Vitaliy Shevchuk (shevit@users.sourceforge.net)

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

*/

AjaxAnywhere.defaultInstanceName = "default";
// constructor;
function AjaxAnywhere() {

    this.id = AjaxAnywhere.defaultInstanceName;
    this.formName = null;
    this.notSupported = false;


    if (window.XMLHttpRequest) {
        this.req = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        try {
            this.req = new ActiveXObject("Msxml2.XMLHTTP");
        } catch(e) {
            try {
                this.req = new ActiveXObject("Microsoft.XMLHTTP");
            } catch(e1) {
                this.notSupported = true; /* XMLHTTPRequest not supported */
            }
        }
    }

    if (this.req == null || typeof this.req == "undefined")
        this.notSupported = true;
}
/**
* System ajax extends parent some attributes
* @targets refreshed the selected zones ids
* @isPartRefresh  is part refresh //if(targets=="_page") fresh all page
* @jsf_clear_prefix the prefix of the different jsfimpls clearing parameters function
*/
AjaxAnywhere.prototype = {
   targets : "" ,
   isPartRefresh : true ,
   jsf_clear_prefix : ["clear_"] , /** myface,sun, iceFace,... **/
   jsf_clear : null ,
   postFormName : "ajaxAnywherePostFormName" 

}
/**
* Stores substitutes SubmitButton names in to redo sustitution if a button was eventually inside a refresh zone.
*/
AjaxAnywhere.prototype.substitutedSubmitButtons = new Array();
AjaxAnywhere.prototype.substitutedSubmitButtonsInfo = new Object();

/**
* Returns a Form object that corresponds to formName property of this AjaxAnywhere class instance.
*/
AjaxAnywhere.prototype.findForm = function () {
    var form;   
    if (this.formName != null)
        form = document.forms[this.formName];
    else if (document.forms.length > 0)
        form = document.forms[0];

    if (typeof form != "object")
        alert("AjaxAnywhere error: Form with name [" + this.formName + "] not found");
    return form;
}

/**
* Binds this instance to window object using "AjaxAnywhere."+this.id as a key.
*/
AjaxAnywhere.prototype.bindById = function () {
    var key = "AjaxAnywhere." + this.id;
    window[key] = this;
}

/**
* Finds an instance by id.
*/
AjaxAnywhere.findInstance = function(id) { 
    var key = "AjaxAnywhere." + id;
    return window[key];
}

/**
* This function is used to submit all form fields by AJAX request to the server.
* If the form is submited with &lt;input type=submit|image&gt;, submitButton should be a reference to the DHTML object. Otherwise - undefined.
*/
AjaxAnywhere.prototype.submit = function(targets,additionalPostData, submitButton,isAsynchronism) {
     
    if(typeof targets == "undefined")
       this.targets=="" ;    
    else
       this.targets = targets;    
 
    if (typeof additionalPostData == "undefined")
        additionalPostData = "";
    
    if(typeof submitButton == "undefined"||typeof submitButton !="object")
       if(event)
         submitButton = event.srcElement;
  
    if(typeof isAsynchronism == "undefined"||isAsynchronism!= false)
        isAsynchronism = true;  
      
    this.bindById();

    this.formName = this.locateForm(submitButton);

    var form = this.findForm();
   
    var url = form.action;
    if (url == "")
        url = location.href;
    //var zones = this.getZonesToReload(url, submitButton);
    //不是局部刷新请求
    if(!this.isPartRefresh){
        if (typeof form.submit_old == "undefined")
            form.submit();
        else
            form.submit_old();
        return;
    }
    
    var postData = this.preparePostData(submitButton); 

    if(this.targets==""){    
       this.targets = postData[1];
    } 
 
    postData = postData[0];

    if(this.targets=="")     
       this.seekZone(submitButton);
     

    if(this.targets == "") {
        if (typeof form.submit_old == "undefined")
            form.submit();
        else
            form.submit_old();
        return;
    }

    this.dropPreviousRequest();

    this.req.open("POST", url, isAsynchronism);
    this.req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
   
    postData = '&aazones=' + encodeURIComponent(this.targets) + "&" + postData + "&" + additionalPostData;   
    postData+= "&"+this.postFormName+"="+this.formName;
    
    this.clear();

    this.sendPreparedRequest(postData);
    
    return false;
}

AjaxAnywhere.prototype.jsfSubmit = function(){
    this.isPartRefresh = false ;
    this.submit();
    return false;
}

/**
* sends a GET request to the server.
*/
AjaxAnywhere.prototype.getAJAX = function(url) {

    this.bindById();

    var zones = this.getZonesToReload(url);

    this.dropPreviousRequest();

    url += (url.indexOf("?") != -1) ? "&" : "?";

    url += "aa_rand=" + Math.random();
    // avoid caching

    if (zones != null && zones != "")
        url += '&aazones=' + encodeURIComponent(zones);

    this.req.open("GET", url, true);

    this.sendPreparedRequest("");
}

/**
* @private
*/
AjaxAnywhere.prototype.sendPreparedRequest = function (postData) {
    var callbackKey = this.id + "_callbackFunction";
    
    if (typeof window[callbackKey] == "undefined")
        window[callbackKey] = new Function("AjaxAnywhere.findInstance(\"" + this.id + "\").callback(); ");
    this.req.onreadystatechange = window[callbackKey];
    //this.showLoadingMessage();
    this.req.setRequestHeader("aaxmlrequest", "true");
    this.req.send(postData);

}
/**
* Used internally by AjaxAnywhere. Aborts previous request if not completed.
*/
AjaxAnywhere.prototype.dropPreviousRequest = function() {
    if (this.req.readyState != 0 && this.req.readyState != 4) {
        // abort previous request if not completed
        this.req.abort();
        this.handlePrevousRequestAborted();
    }
}

/**
* Internally used to prepare Post data.
* If the form is submited with &lt;input type=submit|image&gt;, submitButton is a reference to the DHTML object. Otherwise - undefined.
*/
AjaxAnywhere.prototype.preparePostData = function(submitButton) {
    var form = this.findForm();
    var targets = "";
    var result = "";
    for (var i = 0; i < form.elements.length; i++) {
        var el = form.elements[i];     
        if (el.tagName.toLowerCase() == "select") {
            for (var j = 0; j < el.options.length; j++) {
                var op = el.options[j];
                if (op.selected)
                    result += "&" + encodeURIComponent(el.name) + "=" + encodeURIComponent(op.value);
            }
        } else if (el.tagName.toLowerCase() == "textarea") {
            result += "&" + encodeURIComponent(el.name) + "=" + encodeURIComponent(el.value);
        } else if (el.tagName.toLowerCase() == "input") {
            
            if (el.type.toLowerCase() == "checkbox" || el.type.toLowerCase() == "radio") {
                if (el.checked){
                    result += "&" + encodeURIComponent(el.name) + "=" + encodeURIComponent(el.value);                    
                }
            } else if (el.type.toLowerCase() == "submit" || el.type.toLowerCase() == "image") {
                if (el == submitButton) // is "el" the submit button that fired the form submit?
                    result += "&" + encodeURIComponent(el.name) + "=" + encodeURIComponent(el.value);
            } else if (el.type.toLowerCase() != "button") {
                if(el.name=="ajaxTarget" && el.type.toLowerCase() == "hidden"){
                   if(el.value!=null&&el.value!=""&&el.value!="null")
                      targets+=","+el.value;
                   continue;
                }
                result += "&" + encodeURIComponent(el.name) + "=" + encodeURIComponent(el.value);
            }
        }
    }
    var all = new Array();
    all[0] = result;
    all[1] = targets!=""?targets.substring(1):"";
    return all;
}

/**
* A callback. internally used
*/
AjaxAnywhere.prototype.callback = function() {

    if (this.req.readyState == 4) {

        this.onBeforeResponseProcessing();
        this.hideLoadingMessage();

        if (this.req.status == 200) {

            if (this.req.getResponseHeader('content-type').toLowerCase().substring(0,8)!='text/xml')
                alert("AjaxAnywhere error : content-type in not text/xml : ["+this.req.getResponseHeader('content-type')+"]");

            var docs = this.req.responseXML.getElementsByTagName("document");
            var redirects = this.req.responseXML.getElementsByTagName("redirect");
            var zones = this.req.responseXML.getElementsByTagName("zone");
            var exceptions = this.req.responseXML.getElementsByTagName("exception");
            var scripts = this.req.responseXML.getElementsByTagName("script");

            if (redirects.length != 0) {
                var newURL = redirects[0].firstChild.data;
                location.href = newURL;
            }
            if (docs.length != 0) {
                var newContent = docs[0].firstChild.data;

                //cleanup ressources
                delete this.req;

                document.close();
                document.write(newContent);
                document.close();
            }
            if (zones.length != 0) {
                for (var i = 0; i < zones.length; i++) {
                    var zoneNode = zones[i];
                    var name = zoneNode.getAttribute("name");
                    var fc = zoneNode.firstChild;

                    var html = (fc == null)?"":fc.data;

                    var zoneHolder = document.getElementById(this.ajaxPrefix + name);
                    if (typeof(zoneHolder) != "undefined") {
                        zoneHolder.innerHTML = html;
                    }

                }
            }
            if (exceptions.length != 0) {
                var e = exceptions[0];
                var type = e.getAttribute("type");
                var stackTrace = e.firstChild.data;
                this.handleException(type, stackTrace);
            }

            if (scripts.length != 0) {
                for (var i = 0; i < scripts.length; i++) {
                    var script = scripts[i].firstChild;
                    if (script != null) {
                        script = script.data;
                        if (script.indexOf("document.write") != -1) {
                            this.handleException("document.write", "This script contains document.write(), which is not compatible with AjaxAnywhere : \n\n" + script);
                        } else {
                            eval(script);
                        }
                    }
                }

                var globals = this.getGlobalScriptsDeclarationsList(script);
                if (globals != null)
                    for (var i in globals) {
                        var objName = globals[i];
                        try {
                            window[objName] = eval(objName);
                        } catch(e) {
                        }
                    }
            }

        } else {
            if (this.req.status != 0)
                this.handleHttpErrorCode(this.req.status);
        }
        this.restoreSubstitutedSubmitButtons();
        this.onAfterResponseProcessing();

    }


}

/**
*  Default sample loading message shuw function. Overrride it if you like.
*/
AjaxAnywhere.prototype.showLoadingMessage = function() {

    var div = document.getElementById("AA_" + this.id + "_loading_div");
    if (div == null) {
        div = document.createElement("DIV");

        document.body.appendChild(div);
        div.id = "AA_" + this.id + "_loading_div";

        div.innerHTML = "&nbsp;Loading...";
        div.style.position = "absolute";
        div.style.border = "1 solid black";
        div.style.color = "white";
        div.style.backgroundColor = "blue";
        div.style.width = "100px";
        div.style.heigth = "50px";
        div.style.fontFamily = "Arial, Helvetica, sans-serif";
        div.style.fontWeight = "bold";
        div.style.fontSize = "11px";
    }
    div.style.top = document.body.scrollTop + "px";
    div.style.left = (document.body.offsetWidth - 100 - (document.all?20:0)) + "px";

    div.style.display = "";
}

/**
*  Default sample loading message hide function. Overrride it if you like.
*/
AjaxAnywhere.prototype.hideLoadingMessage = function() {
    var div = document.getElementById("AA_" + this.id + "_loading_div");
    if (div != null)
        div.style.display = "none";

}

/**
* This function is used to facilitatte AjaxAnywhere integration with existing projects/frameworks.
* It substitutes default Form.sumbit().
* The new implementation calls AjaxAnywhere.isFormSubmitByAjax() function to find out if the form
* should be submitted in traditional way or by AjaxAnywhere.
*/
AjaxAnywhere.prototype.substituteFormSubmitFunction = function() {

    this.bindById();
    
    // var form = this.findForm();
    /** 重构所有form的submit方法 **/
    var forms = document.forms;
    for(var i=0;i<forms.length;i++){
      
	    var form = forms[i]; 
	    form.submit_old = form.submit;
	    var code = "var ajax = AjaxAnywhere.findInstance(\"" + this.id + "\"); " +
	               "if (typeof ajax !='object' || ! ajax.isFormSubmitByAjax() ) " +
	               "ajax.findForm().submit_old();" +
	               " else{ " +	                      
	               "ajax.submit();}"
	    form.submit = new Function(code);
    }
}
/**
* Substitutes the default behavior of &lt;input type=submit|image&gt; to submit the form via AjaxAnywhere.
*
* @param {boolean} indicates if existing onClick handlers should be preserved.
* If keepExistingOnClickHandler==true,
* Existing handler will be called first if it returns false, or if event.returnValue==false, AjaxAnywhere will not
* continue form submission.
* If keepExistingOnClickHandler==false or undefines, existing onClick event handlers will be replaced.
*
* @param {Array} list of submitButtons and submitImages names. If the parameter is omitted or undefined,
* all elements will be processed
*/
AjaxAnywhere.prototype.substituteSubmitButtonsBehavior = function (keepExistingOnClickHandler, elements) {
   
  var forms = document.forms;
  for(var i=0;i<forms.length;i++){
    var form = forms[i];
    
    //var form = this.findForm();
    if (typeof elements == "undefined") { // process all elements
        for (var i = 0; i < form.elements.length; i++) {
            var el = form.elements[i];
            if (el.tagName.toLowerCase() == "input" && (el.type.toLowerCase() == "submit" || el.type.toLowerCase() == "submit")) {
                this.substituteSubmitBehavior(el, keepExistingOnClickHandler);
            }
        }
    } else { //process only specified elements
        for (var i = 0; i < elements.length; i++) {
            var el = form.elements[elements[i]];
            if (typeof el != "undefined") {
                if (el.tagName.toLowerCase() == "input" && (el.type.toLowerCase() == "submit" || el.type.toLowerCase() == "submit"))
                    this.substituteSubmitBehavior(el, keepExistingOnClickHandler);
            }
        }
    }
   
  }

}
/**
* Performs a single element behavior substitution
*
* @private
*/
AjaxAnywhere.prototype.substituteSubmitBehavior = function (el, keepExistingOnClickHandler) {

    var inList = false;
    for (var i = 0; i < this.substitutedSubmitButtons.length; i++) {
        var btnName = this.substitutedSubmitButtons[i];
        
        if (btnName == el.name) {
            inList = true;
            break;
        }
    }
    if (!inList)
        this.substitutedSubmitButtons.push(el.name);

    this.substitutedSubmitButtonsInfo[el.name] = keepExistingOnClickHandler;

    if (keepExistingOnClickHandler && (typeof el.onclick != "undefined") && ( el.onclick != null) && ( el.onclick != "")) {
        el.AA_old_onclick = el.onclick;
    }
    el.onclick = handleSubmitButtonClick;
    
}

/**
*
* @private
*/
AjaxAnywhere.prototype.restoreSubstitutedSubmitButtons = function() {
    if (this.substitutedSubmitButtons.length == 0)
        return;

    var form = this.findForm();

    for (var i = 0; i < this.substitutedSubmitButtons.length; i++) {
        var name = this.substitutedSubmitButtons[i];
        var el = form.elements[name];
        if (typeof el != "undefined" && (el.onclick != handleSubmitButtonClick)) {
            var keepExistingOnClickHandler = this.substitutedSubmitButtonsInfo[el.name];
            this.substituteSubmitBehavior(el, keepExistingOnClickHandler);
        }
    }
}

/**
* @private
*/
function handleSubmitButtonClick(_event) {
    ajax.targets== "";
    if (typeof this.AA_old_onclick != "undefined") { //this point to e1
        if (false == this.AA_old_onclick(_event))
            return false;
        if (typeof window.event != "undefined")
            if (window.event.returnValue == false)
                return false;
    }
    var onsubmit = this.form.onsubmit;
    if (typeof onsubmit == "function") {
        if (false == onsubmit(_event))
            return false;
        if (typeof window.event != "undefined")
            if (window.event.returnValue == false)
                return false;
    }
    
    ajax.submit('','', this);

    return false;
}
/**
* Override this function if you use AjaxAnywhere.substituteFormSubmitFunction() to
* dynamically inform AjaxAnywhere of the method you want to use for the form submission.
*/
AjaxAnywhere.prototype.isFormSubmitByAjax = function () {
    return true;
}

/**
*   If an exception is throws on the server-side during AJAX request, it will be processed
* by this function. The default implementation is alert(stackTrace);
* Override it if you need.
*/
AjaxAnywhere.prototype.handleException = function(type, details) {
    alert(details);
}
/**
*   If an HTTP Error code returned during AJAX request, it will be processed
* by this function. The default implementation is alert(code);
* Override it if you need.
*/
AjaxAnywhere.prototype.handleHttpErrorCode = function(code) {
    var details = confirm("AjaxAnywhere default error handler. XMLHttpRequest HTTP Error code:" + code+" \n\n Would you like to view the response content in a new window?");
    if (details){
        var win = window.open("",this.id+"_debug_window");
        if (win != null){
            win.document.write("<html><body><xmp>"+this.req.responseText);
            win.document.close();
            win.focus();
        } else {
            alert("Please, disable your pop-up blocker for this site first.");
        }
    }
}

/**
* Override it if you need.
*/
AjaxAnywhere.prototype.handlePrevousRequestAborted = function() {
   // alert("AjaxAnywhere default error handler. INFO: previous AJAX request dropped")
}


/**
*   If the HTML received in responce to AJAX request contains JavaScript that defines new
* functions/variables, they must be propagated to the proper context. Override this method
* to return the Array of function/variable names.
*/
AjaxAnywhere.prototype.getGlobalScriptsDeclarationsList = function(script) {
    return null;
}

/**
* This function should be overridden by AjaxAnywhere user to implement client-side
* determination of zones to reload.
*
* If the form is submited with &lt;input type=submit|image&gt;, submitButton is a reference to the DHTML object. Otherwise - undefined.
*
* @Returns a comma separated list of zones to reload, or "document.all" to reload
* the whole page. Return null if the form must be submitted in traditional way
*
*
*/
AjaxAnywhere.prototype.getZonesToReload = function(url, submitButton) {
    return this.getZonesToReaload();
    // backward compatibility only
}
/**
* depreceted : wrond spelling : Reaload will be removed in later versions
*/
AjaxAnywhere.prototype.getZonesToReaload = function(url, submitButton) {
    return "";
}

/**
* Override this method to implement a custom action
*/
AjaxAnywhere.prototype.onRequestSent = function () {
};
/**
* Override this method to implement a custom action
*/
AjaxAnywhere.prototype.onBeforeResponseProcessing = function () {
};
/**
* Override this method to implement a custom action
*/
AjaxAnywhere.prototype.onAfterResponseProcessing = function () {
};

/**
*search the object in the anywhere district
*/
AjaxAnywhere.prototype.seekZone = function(_self){
   if (typeof _self == "undefined") {    
      return;
   }  
   this.targets = "";
   var parentNode = _self.parentElement;   
   while(parentNode){
      switch(parentNode.tagName.toUpperCase()){
        case "SPAN" :            
           if(parentNode.id.indexOf(this.ajaxPrefix)==0){             
              if(parentNode.auto == "true")
                  this.isPartRefresh = true;              
              else{
                 this.isPartRefresh = false;
                 return;  
              }
              this.targets = parentNode.id.substring(this.ajaxPrefix.length);  
              return;
           }
           else
              parentNode = parentNode.parentElement;
           break;
        case "BODY" :
           this.targets = ""; 
           return;
        default :
           parentNode = parentNode.parentElement;

      }
   }

}
AjaxAnywhere.prototype.locateForm = function(src){
 
    if(!src) return null;
    if(src.tagName.toUpperCase()=="FORM")
      return src.name;
    if(src.form)
      return src.form.name;
    else{
      src = src.parentElement;
      while(src){
        if(src.tagName.toUpperCase()=="FORM")
           return src.name;
        else if(src.tagName.toUpperCase()=="BODY"||src.tagName.toUpperCase()=="HTML")
           return null;
        else
           src = src.parentElement;
      }
      return null;
   }
}
AjaxAnywhere.prototype.init = function(identifier){
  // if(document.documentElement.innerHTML.indexOf("<SPAN id="+this.ajaxPrefix) < 0 &&){
      //log.info("it has no aazone tag ,shut down ");
  //    return;
  // }
   if(document.forms.length >0){
      this.formName = document.forms[0].name; //init the first form name
      if(!identifier) identifier = true;
   }
   else {
     alert("init parameters failure ,miss form message.");
     return false;
   }
   this.bindById();
   this.substituteFormSubmitFunction();
   this.substituteSubmitButtonsBehavior(identifier);
}
AjaxAnywhere.prototype.clear = function(){
   this.targets = "";
   this.isPartRefresh = true;

   //if(this.jsf_clear==null){
     for(var i=0;i<this.jsf_clear_prefix.length;i++){
       this.jsf_clear = window[this.jsf_clear_prefix[i] +this.formName];   
       if(typeof this.jsf_clear != "undefined" ) break;
     }
  // }  
   if(typeof this.jsf_clear == "function"){
      this.jsf_clear();
   }
   else if(this.clearHidden){
      var form = this.findForm();
      for(var i=0;form.elements.length;i++){ 
         var element = form.elements[i];
         if(element.tagName.toLowerCase()=="input" && element.type.toLowerCase()=="hidden"){
              element.value = null;
         }
      }
   }
   else{
      //default:
   }
}
AjaxAnywhere.prototype.clearHidden = false;
AjaxAnywhere.prototype.ajaxPrefix = "aazone.";

// default instance.
var ajax; 
//function systemInitializtion(){
   ajax = new AjaxAnywhere();
   ajax.init();
//}

//document.onload = systemInitializtion;


