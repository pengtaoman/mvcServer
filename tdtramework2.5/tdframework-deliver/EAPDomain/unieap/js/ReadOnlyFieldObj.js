/**
 * 只读校验组件
 * js组件：ReadOnlyFieldObj.js
 * 应用例子：ReadOnly.html
 * 说明：1、只读，不可写。
 *       2、改变背景颜色。
 * 
 * @author  lixiangyu@neusoft.com,2003.04
 *          micy@neusoft.com	2003.07.21
 *				hugh@neusoft.com
 */
function ReadOnlyFieldObj(editerObj){
	
	//定义输入对象
	this.edtObj = editerObj;
    	
	
	//公共方法
	this.getParentObj = ROF_getParentObj;
	this.getBaseObj = ROF_getBaseObj;
	
	this.onvalidate = ROF_onvalidate;
	
	this.onReady = ROF_onContentReady;
 	this.eventBand = ROF_eventBand;
	
	
	//私有方法
	
	//私有对象
    var ParObj=null;
    var BasObj=null;
}

 	function ROF_getParentObj(){
    	if(this.ParObj==null){
    		this.ParObj = new BaseObj(this.edtObj);
    		}
    		return this.ParObj;	
   	}
   function ROF_getBaseObj(){
   	if(this.BasObj==null){
   		this.BasObj = new BaseObj(this.edtObj);
   		}
   	return this.BasObj;
   	
   	}

//这个方法一定要有
function ROF_onvalidate(){
  return true;
}
   
function ROF_onContentReady(){ 
	//调用ParentObj 的初始化方法   	 
   this.getParentObj().onReady(); 
   
   this.edtObj.readOnly = true;
   this.edtObj.isUniEAP = false;
}   
        
        
function ROF_eventBand(){}
