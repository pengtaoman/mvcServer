/**
 * PasswordConfirm校验组件
 * htc组件：PasswordConfirm.htc
 * 应用例子:PasswordConfirm.html
 * 属性：isNullable：是否为空。 当为NO时不可以为空，需要非空校验；当为YES时可以为空，不需要非空校验。
 *       prePassword: 指定前一个password的id 或者是 name。
 * 说明：1、支持输入固定长度，如果超出固定长度，则禁止输入。
 *       2、支持文本输入。
 *       3、将Enter 键转换为 Tab 键。
 *             
 * @author  lixiangyu@neusoft.com,2003.04
 *          micy@neusoft.com	2003.07.21
 *				hugh@neusoft.com
 */
 
 
 function PasswordConfirmObj(editerObj){
	
	//定义输入对象
	this.edtObj = editerObj;
    	
	
	//公共方法
	this.getParentObj = PCF_getParentObj;
	this.getBaseObj = PCF_getBaseObj;
	
	this.onvalidate = PCF_onvalidate;
	this.checkPassword = PCF_checkPassword;
	
	this.OnlyNumber = PCF_OnlyNumber;
	this.onReady = PCF_onDocumentReady;
 	this.eventBand =PCF_eventBand;
	
	
	//私有方法
	
	//私有对象
    var ParObj=null;
    var BasObj=null;
	}
	
	
	function PCF_getParentObj(){
    	if(this.ParObj==null){
    		this.ParObj = new BaseObj(this.edtObj);
    		}
    		return this.ParObj;	
   	}
   function PCF_getBaseObj(){
   	if(this.BasObj==null){
   		this.BasObj = new BaseObj(this.edtObj);
   		}
   	return this.BasObj;
   	
   	}

  
    function PCF_onvalidate() {
    
     var inputStr = this.edtObj.value;
     var objName =this.edtObj.name;
     
     //调用Base.htc中的公用函数检查数据合法性
     if(!this.getBaseObj().commonCheck())	return false;
     
     if (!this.checkPassword()){
         alert("密码输入不一致，请重新输入！");
	     return false; 
     }
    
     return true;

    }

  
  //校验输入password是否一致	
    function PCF_checkPassword(){
      //var pass1 = this.edtObj.document.all[prePassword].value;
      var pass1ID = this.edtObj.prePassword;
      var pass1 = document.all[pass1ID].value;
      var pass2 = this.edtObj.value;
    //  alert("pass1="+pass1+" "+"pass2="+pass2);
      if(pass1==pass2){
           return true;
     
      } else{   
           return false;   
      }
    }
    function PCF_OnlyNumber(){}
    function PCF_onDocumentReady(){
    	//调用ParentObj 的初始化方法   	 
    	 this.getParentObj().onReady();
    	};  
    function PCF_eventBand(){};
    

