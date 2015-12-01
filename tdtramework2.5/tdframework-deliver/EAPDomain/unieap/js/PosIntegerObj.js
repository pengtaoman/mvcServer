/**
 * PosInteger正整数校验组件
 * js组件：PosIntegerObj.js
 * 应用例子:PosInteger.html
 * 属性：isNullable：是否为空。 当为NO时不可以为空，需要非空校验；当为YES时可以为空，不需要非空校验。
 *       fixLength: 输入固定长度。
 * 说明：1、支持输入固定长度，如果超出固定长度，则禁止输入。
 *       2、支持整型，0－9。  
 *       3、将Enter 键转换为 Tab 键。     
 * @author  lixiangyu@neusoft.com,2003.04
 *          micy@neusoft.com	2003.07.21
 *				hugh@neusoft.com
 */
 
  function PosIntegerObj(editerObj){
	
	//定义输入对象
	this.edtObj = editerObj;
    	
	
	//公共方法
	this.getParentObj = POS_getParentObj;
	this.getBaseObj = POS_getBaseObj;
	
	this.onvalidate = POS_onvalidate;
	this.checkInput = POS_checkInput;
	
	this.OnlyNumber = POS_OnlyNumber;
	this.onReady = POS_onDocumentReady;
 	this.eventBand =POS_eventBand;
	
	
	//私有方法
	
	//私有对象
    var ParObj=null;
    var BasObj=null;
	}
 
 	function POS_getParentObj(){
    	if(this.ParObj==null){
    		this.ParObj = new NumberObj(this.edtObj);
    		}
    		return this.ParObj;	
   	}
   function POS_getBaseObj(){
   	if(this.BasObj==null){
   		this.BasObj = this.getParentObj().getBaseObj();
   		}
   	return this.BasObj;
   	
   	}


      
    function POS_onvalidate() {
    
	     var inputStr = this.edtObj.value;
	     var objName =this.edtObj.name;
	     
	     //调用Base.htc中的公用函数检查数据合法性
     	if(!this.getBaseObj().commonCheck())	return false;
		 //alert(inputStr);
		 if(!this.checkInput()){
		    alert(this.edtObj.prompt + "输入不合法！");
		   return false;
		 }		 	    
	     return true;

    }
    
    function POS_checkInput(){
      var inputStr = this.edtObj.value;
      //alert(inputStr);
      //如果输入长度大于1，第一位不能输入0
 		/*
      for (var i = 0; i < inputStr.length; i++) {
           var oneChar = inputStr.charAt(i)
           if (i == 0 && oneChar == "0") {
           	   if(this.edtObj.fixLength != 1){
	           	   window.event.keyCode = 0 ;
	           	   //alert("第一位不能输入0");
	           	   return false;
           	   }
           }
           if (oneChar < "0" || oneChar > "9") {
             event.returnValue = false;
             return false;
           }
       }
  		*/
  		if(inputStr!=null&&inputStr!=""){
          if(inputStr.charAt(0)=="0") return false;
          var tt = parseInt(inputStr)+"";
          if(inputStr!=tt) return false;
        }
        //
        return true;   
    
    }

    function POS_OnlyNumber(){       
    	
	
		if ( !(((window.event.keyCode >= 48) && (window.event.keyCode <= 57))|| (window.event.keyCode == 13) ))

		{
			window.event.keyCode = 0 ;
		}
        var inputStr = this.edtObj.value;
        if(inputStr==null||inputStr==""){
            if(window.event.keyCode==48){
                window.event.keyCode = 0 ;              
            }
        }
	
    }
    
    function POS_onDocumentReady(){
    	//调用ParentObj 的初始化方法   	 
    	 this.getParentObj().onReady();
    	}  
    function POS_eventBand(){
    	this.getBaseObj().eventBand("onkeypress","OnlyNumber()");
    	}
    

