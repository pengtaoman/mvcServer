

 function TextAreaObj(editerObj){

	this.edtObj = editerObj;

	this.getParentObj = TAO_getParentObj;
	this.getBaseObj = TAO_getBaseObj;
	
	this.onvalidate = TAO_onvalidate;
	
	this.onReady = TAO_onContentReady;
	this.doKeypress = TAO_doKeypress;
 	this.eventBand = TAO_eventBand;
	this.maxLength = this.edtObj.getAttribute("maxLength");
	if(null != this.maxLength){
		if(!isNaN(parseInt(this.maxLength,10))){
     		this.maxLength = parseInt(this.maxLength,10);
		}
	}

    var ParObj=null;
    var BasObj=null;
	}

 	function TAO_getParentObj(){
    	if(this.ParObj==null){
    		this.ParObj = new BaseObj(this.edtObj);
    		}
    		return this.ParObj;	
   	}
   function TAO_getBaseObj(){
   	if(this.BasObj==null){
   		this.BasObj = new BaseObj(this.edtObj);
   		}
   	return this.BasObj;
   	}

       function TAO_onvalidate() {

           return this.getBaseObj().commonCheck();  
       }
       

     function TAO_doKeypress(){   
     	if(this.maxLength == null) return true;
      	if(this.edtObj.value.length>=this.maxLength){
            window.event.keyCode = 0 ;
         	this.edtObj.value=this.edtObj.value.substr(0,this.maxLength);
	     }
   }
     
     
     function TAO_onContentReady(){
    	 this.getParentObj().onReady();
     	}
     function TAO_eventBand(){
     	  this.getBaseObj().eventBand("onkeypress","doKeypress()");     	
     	}
