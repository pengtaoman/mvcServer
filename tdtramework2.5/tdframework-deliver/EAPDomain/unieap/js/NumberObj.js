/**
 * Number校验组件
 * js组件：NumberObj.js
 * 应用例子：Number.html
 * 属性：isNullable：是否为空。 当为NO时不可以为空，需要非空校验；当为YES时可以为空，不需要非空校验。
 *       fixLength: 固定长度。如果输入没有达到fixlength，则会提示。
 * 说明：1、该组件主要是校验数字输入0－9 。
 *       2、支持输入固定长度，如果超出固定长度，则禁止输入。
 *       3、将Enter 键转换为 Tab 键。
 * 
 * @author  lixiangyu@neusoft.com,2003.04
 *          micy@neusoft.com	2003.07.19
 *				hugh@neusoft.com
 */

function NumberObj(editerObj){
	
	//定义输入对象
	this.edtObj = editerObj;
    	
	
	//公共方法
	this.getParentObj = NUM_getParentObj;
	this.getBaseObj = NUM_getBaseObj;
	
	this.onvalidate = NUM_onvalidate;
	this.checkInput = NUM_checkInput;
	
	this.OnlyNumber = NUM_OnlyNumber;
	this.onReady = NUM_onDocumentReady;
 	this.eventBand = NUM_eventBand;
	
	
	//私有方法
	
	//私有对象
    var ParObj=null;
    var BasObj=null;
}

	function NUM_getParentObj(){
    	if(this.ParObj==null){
    		this.ParObj = new BaseObj(this.edtObj);
    		}
    		return this.ParObj;	
   	}
   function NUM_getBaseObj(){
   	if(this.BasObj==null){
   		this.BasObj = new BaseObj(this.edtObj);
   		}
   		return this.BasObj;
   	
   	}


    function NUM_onvalidate() {
        var fixLength = this.edtObj.fixLength;
        var checkStr = this.edtObj.value;
        var objName = this.edtObj.name;
        
       //调用Base.htc中的公用函数检查数据合法性
     	if(!this.getBaseObj().commonCheck())	return false;
     
      if(!this.checkInput()){
		    alert(this.edtObj.prompt + "输入不合法！");
		   return false;
		 }     
	
	return true;

    }
    
  function NUM_checkInput(){
      var inputStr = this.edtObj.value;

      for (var i = 0; i < inputStr.length; i++) {
           var oneChar = inputStr.charAt(i)
           
           if (oneChar < "0" || oneChar > "9") {
             event.returnValue = false;
             return false;
           }
       }
  
           return true;   
    
    }

    function NUM_OnlyNumber()
    {
       //限制输入长度，超长禁止输入
        var fixLength = this.edtObj.getAttribute("fixLength");
        var inputLen = this.edtObj.value.length;
        if(!isNaN(fixLength)){
	         fixLength = parseInt(fixLength);
	         if(inputLen < fixLength)
	             event.returnValue = true;
	         else if(inputLen > fixLength-1)
	             event.returnValue = false;
	 }
	
       //只允许输入数字
	if ( !(((window.event.keyCode >= 48) && (window.event.keyCode <= 57))|| (window.event.keyCode == 13)))
	{
		window.event.keyCode = 0 ;
	}

	
    } 
  
  function NUM_onDocumentReady(){
  		 //调用ParentObj 的初始化方法   	 
    	 this.getParentObj().onReady();
  	};
  function NUM_eventBand(){
  	
  	this.getBaseObj().eventband("onkeypress","OnlyNumber()");
  	
  	}