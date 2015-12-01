/**
 * Text校验组件
 * js  组件：TextObj.js
 * 应用 例子: Text.html
 * 功     能: 1.支持平台录入编辑框的基本功能(查看BaseObj.js) 
 *             
 * @author  lixiangyu@neusoft.com,2003.04
 * 修改履历: micy@neusoft.com	2003.07.21
 *				 hugh@neusoft.com
 *
 */
 function TextObj(editerObj){
	
	//定义输入对象
	this.edtObj = editerObj;
    	
	
	//公共方法
	this.getParentObj = TEX_getParentObj;
	this.getBaseObj = TEX_getBaseObj;
	
	this.onvalidate = TEX_onvalidate;
	
	this.OnlyNumber = TEX_OnlyNumber;
	this.onReady = TEX_onContentReady;
 	this.eventBand = TEX_eventBand;
	
	
	//私有方法
	
	//私有对象
    var ParObj=null;
    var BasObj=null;
	}
	
 	function TEX_getParentObj(){
    	if(this.ParObj==null){
    		this.ParObj = new BaseObj(this.edtObj);
    		}
    		return this.ParObj;	
   	}
   function TEX_getBaseObj(){
   	if(this.BasObj==null){
   		this.BasObj = new BaseObj(this.edtObj);
   		}
   	return this.BasObj;
   	
   	}
  
    function TEX_onvalidate() {	
     //调用Base.htc中的公用函数检查合法性
     //alert("getBaseObj");
     return this.getBaseObj().commonCheck();  
    }
    function TEX_onContentReady(){
    	 //调用ParentObj 的初始化方法   	 
    	 this.getParentObj().onReady();
    	} 
   function TEX_OnlyNumber(){} 
   function TEX_eventBand(){}
  
