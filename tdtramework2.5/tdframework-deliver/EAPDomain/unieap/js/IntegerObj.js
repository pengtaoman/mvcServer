/**
 * Integer校验组件
 * js组件：IntegerObj.js
 * 应用例子:Integer.html
 * 属性：isNullable：是否为空。 当为NO时不可以为空，需要非空校验；当为YES时可以为空，不需要非空校验。
 *       fixLength: 输入固定长度。
 * 说明：1、支持输入固定长度，如果超出固定长度，则禁止输入。
 *       2、支持整型，0－9，“-”。
 *       3、将Enter 键转换为 Tab 键。
 *             
 * @author  lixiangyu@neusoft.com,2003.04
 *          micy@neusoft.com	2003.07.19
 *				hugh@neusoft.com
 */
 
 function IntegerObj(editerObj){
	
	//定义输入对象
	this.edtObj = editerObj;
    	
	
	//公共方法
	this.getParentObj = INT_getParentObj;
	this.getBaseObj = INT_getBaseObj;
	
	this.onvalidate = INT_onvalidate;
	this.checkInput = INT_checkInput;
	
	this.OnlyNumber = INT_OnlyNumber;
	this.onReady = INT_onDocumentReady;
 	this.eventBand =INT_eventBand;
	
	
	//私有方法
	
	//私有对象
    var ParObj=null;
    var BasObj=null;
}
 
    function INT_getParentObj(){
    	if(this.ParObj==null){
    		this.ParObj = new NumberObj(this.edtObj);
    		}
    		return this.ParObj;	
   	}
   function INT_getBaseObj(){
   	if(this.BasObj==null){
   		this.BasObj=this.getParentObj().getBaseObj();
   		}
   	return this.BasObj;
   	
   	}
    function INT_onvalidate() {
        var fixLength = this.edtObj.fixLength;
	     var inputStr = this.edtObj.value;
	     var objName =this.edtObj.name;
	    
       
       
	   //调用Base.htc中的公用函数检查数据合法性
     	if(!this.getBaseObj().commonCheck())	return false;
	   	  //alert(fixLength+"  "+inputStr+"  "+objName);  
	   	if(!this.checkInput()){
		   alert(this.edtObj.prompt + "输入不合法！");
		   return false;
		}
		   	    
		
	    return true;
	}
	
	
    function INT_checkInput(){    

      
      var inputStr = this.edtObj.value;     
     
      if(inputStr=="") return true;
      //如果第一位输入负号，其他位不允许输入负号“-”
      if(inputStr.length>this.edtObj.maxlength) 
        return false;
      if(inputStr.indexOf("-0")>-1) return false;
    
      while(inputStr.length>1&&inputStr.indexOf("0")==0){
         inputStr = inputStr.substring(1);
      }
      if(inputStr!=parseInt(inputStr,10)+"") return false;
      
      return true;
    
    }
    


    function INT_OnlyNumber()
    {         
	   this.checkInput();
       
       var inputStr = this.edtObj.value;     
       this.edtObj.focus();//光标位置不变
       var r = document.selection.createRange();    
       r.collapse(false);
       r.setEndPoint("StartToStart", this.edtObj.createTextRange());
       var cursor_index = r.text.length; 
     
       if(inputStr.charAt(0)=="-"&&cursor_index==1&&window.event.keyCode == 48){     
           window.event.keyCode = 0 ; 
       }
       else if(inputStr.charAt(0)=="0"&&cursor_index==0&&window.event.keyCode == 45)
          window.event.keyCode = 0 ; 
          
      
	   if ( !(((window.event.keyCode >= 48) && (window.event.keyCode <= 57))|| (window.event.keyCode == 13) || (window.event.keyCode == 45)))
	
	   {
			window.event.keyCode = 0 ;
	   }
		if(!CursorDispose(this.edtObj,0)) window.event.keyCode = 0 ;
		
	
    }
    
    function INT_onDocumentReady(){
    	//调用ParentObj 的初始化方法   	 
    	 this.getParentObj().onReady();
    	};
    function INT_eventBand(){
    	this.getBaseObj().eventBand("onkeypress","OnlyNumber()")
    	}
    
