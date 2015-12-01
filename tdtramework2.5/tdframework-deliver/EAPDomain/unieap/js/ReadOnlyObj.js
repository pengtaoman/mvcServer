/**
 * 只读校验组件
 * js组件：ReadOnlyObj.js
 * 应用例子：ReadOnly.html
 * 说明：1、只读，不可写。
 *       2、改变背景颜色。
 * 
 * @author  lixiangyu@neusoft.com,2003.04
 *          micy@neusoft.com	2003.07.21
 *				hugh@neusoft.com
 */

function ReadOnlyObj(editerObj){
	//定义输入对象
	this.edtObj = editerObj;
	//公共方法
	this.getParentObj = ROO_getParentObj;
	this.getBaseObj = ROO_getBaseObj;
	
	this.onvalidate = ROO_onvalidate;
	
	this.OnlyRead = ROO_OnlyRead;
	this.onReady = ROO_onContentReady;
 	this.eventBand =ROO_eventBand;
	this.setEditer = ROO_setEditer;
	
	//私有方法
	
	//私有对象
    var ParObj=null;
    var BasObj=null;
}
   function ROO_setEditer(editerObj){
   	   	this.edtObj = editerObj;
	}
 	function ROO_getParentObj(){
    	if(this.ParObj==null){
    		this.ParObj = new BaseObj(this.edtObj);
    		}
    		return this.ParObj;	
   	}
   function ROO_getBaseObj(){
   	if(this.BasObj==null){   		
   		this.BasObj = new BaseObj(this.edtObj);
   		}
   	return this.BasObj;
   	
   	}


	//这个方法一定要有
	function ROO_onvalidate(){
		 return true;
	}    
    function ROO_OnlyRead()
    {
    
     window.event.keyCode = 0 ;
	
    } 
   
	function ROO_onContentReady(){
		//调用ParentObj 的初始化方法   	 
    	this.getParentObj().onReady();
    	 
		this.edtObj.readOnly = true;
   	this.edtObj.isUniEAP = false;
	 //  this.edtObj.isUniEAP=false;      
	}   
        
   function ROO_eventBand(){
    	this.getBaseObj().eventBand("onkeypress","OnlyRead()");
    	}
