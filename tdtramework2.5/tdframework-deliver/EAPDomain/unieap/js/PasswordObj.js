/**
 * Password校验组件
 * js组件：PasswordObj.js
 * 应用例子:Password.html
 * 属性：isNullable：是否为空。 当为NO时不可以为空，需要非空校验；当为YES时可以为空，不需要非空校验。
 * 说明：1、支持输入固定长度，如果超出固定长度，则禁止输入。
 *       2、支持文本输入。
 *       3、将Enter 键转换为 Tab 键。
 *             
 * @author  lixiangyu@neusoft.com,2003.04
 *          micy@neusoft.com	2003.07.21
 *				hugh@neusoft.com
 */
 
 function PasswordObj(editerObj){
	
	//定义输入对象
	this.edtObj = editerObj;
    	
	
	//公共方法
	this.getParentObj = PAS_getParentObj;
	this.getBaseObj = PAS_getBaseObj;
	
	this.onvalidate = PAS_onvalidate;
	
	this.onReady = PAS_onDocumentReady;
	this.OnlyNumber = PAS_OnlyNumber;
 	this.eventBand =PAS_eventBand;
	
	
	//私有方法
	
	//私有对象
    var ParObj=null;
    var BasObj=null;
}

	function PAS_getParentObj(){
    	if(this.ParObj==null){
    		this.ParObj = new BaseObj(this.edtObj);
    		}
    		return this.ParObj;	
   	}
   function PAS_getBaseObj(){
   	if(this.BasObj==null){
   		this.BasObj = new BaseObj(this.edtObj);
   		}
   	return this.BasObj;
   	
   	}

  
    function PAS_onvalidate() {      
     //调用Base.htc中的公用函数检查数据合法性
     if(!this.getBaseObj().commonCheck())	return false;
     return true;
    }
   function PAS_onDocumentReady(){
   	//调用ParentObj 的初始化方法   	 
    	 this.getParentObj().onReady();
   	};  
   function PAS_OnlyNumber(){}; 
   function PAS_eventBand(){};

