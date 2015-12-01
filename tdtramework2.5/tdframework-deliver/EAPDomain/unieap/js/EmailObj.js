/**
 * Email校验组件
 * js组件：EmailObj.js
 * 应用例子：Eamil.html
 * 属性：isNullable：是否为空。 当为NO时不可以为空，需要非空校验；当为YES时可以为空，不需要非空校验。
 *       fixLength: 固定长度。如果输入没有达到fixlength，则会提示。
 * 说明: 1、支持输入固定长度，如果超出固定长度，则禁止输入。
 *       2、将Enter 键转换为 Tab 键。
 * 
 * @author  yang-zz 2005-06-24
 */

function EmailObj(editerObj){    
    //定义输入对象
    this.edtObj = editerObj;
    //公共方法
    this.getBaseObj = Email_getBaseObj;    
    this.onvalidate = Email_onvalidate;
    this.checkInput = Email_checkInput;    
    this.OnlyNumber = Email_OnlyNumber;
    this.onReady = Email_onDocumentReady;
    this.eventBand = Email_eventBand;    
    //私有对象
    this.validateInput = Email_input;
    var BasObj=null;
}

   function Email_getBaseObj(){
    if(this.BasObj==null){
        this.BasObj = new BaseObj(this.edtObj);
        }
        return this.BasObj;
    
    }


    function Email_onvalidate() {       
       //调用Base.htc中的公用函数检查数据合法性
        if(!this.getBaseObj().commonCheck())    return false;     
        if(!this.checkInput()){
             alert(this.edtObj.prompt + "输入不合法！");
             return false;
        }    
        return true;
    }
    
  function Email_checkInput(){
  
      var inputStr = this.edtObj.value;
      if(inputStr==null||inputStr=="") return true;
      
      var key = inputStr.charCodeAt(0);
      if(!((key>=48&&key<=57)||(key>=65&&key<=90)||(key>=97&&key<=122))) return false;
      for(var i=1;i<inputStr.length;i++){ //逐个字母进行检查
         key = inputStr.charCodeAt(i);
         if(!((key>=48&&key<=57)||(key>=65&&key<=90)||(key>=97&&key<=122)||key==45||key==95||key==46||key==64))
             return false;         
      }      
      if(inputStr.indexOf("--")>0||inputStr.indexOf("-_")>0||inputStr.indexOf("-.")>0||inputStr.indexOf("-@")>0)
          return false;
      else if(inputStr.indexOf("_-")>0||inputStr.indexOf("__")>0||inputStr.indexOf("_.")>0||inputStr.indexOf("_@")>0)
          return false;
      else if(inputStr.indexOf(".-")>0||inputStr.indexOf("._")>0||inputStr.indexOf("..")>0||inputStr.indexOf(".@")>0)
          return false;
      else if(inputStr.indexOf("@-")>0||inputStr.indexOf("@_")>0||inputStr.indexOf("@.")>0)
          return false;
      if(inputStr.indexOf("@")<0||inputStr.indexOf(".")<0) return false;//必须含有"@"和"."
      var temp = inputStr.substring(inputStr.indexOf("@")+1);
      
      if(temp.indexOf("@")>0) return false; //不能含有两个"@";
      
      var lastKey = inputStr.charAt(inputStr.length-1); //检查最后一个字符
      if(lastKey=="-"||lastKey=="_"||lastKey=="."||lastKey=="@") //不能以下结尾
         return false;
      if (temp.indexOf(".")<0)//不能为一级域名
      	return false;  
         
      return true;   
    
  }
  function Email_OnlyNumber(){ 
         
       var value = this.edtObj.value 
       var key = window.event.keyCode;
       //只能输入数字、字母和‘-’、‘_’还有'.'和'@'
       if(!((key>=48&&key<=57)||(key>=65&&key<=90)||(key>=97&&key<=122)||key==45||key==95||key==46||key==64))
           window.event.keyCode=0;
       if(value==null||value==""){           
            //第一位只能以数字012...或者字母abc..ABC...开头
            if(key==45||key==95||key==46||key==64)
               window.event.keyCode=0;            
       }
       //限制输入长度，超长禁止输入 fixlength优先于maxlength
       var inputLen = value.length;
       if(this.edtObj.fixlength){ //如果不为空
         var fixLength = this.edtObj.fixlength;
         if(!isNaN(fixLength)){
             fixLength = parseInt(fixLength);
             if(inputLen >= fixLength)
                 event.returnValue = false;
         }
       }
       else if(this.edtObj.maxlength){
         var maxLength = this.edtObj.maxlength;
         if(!isNaN(maxLength)){
             maxLength = parseInt(maxLength);
             if(inputLen >= maxLength)
                 event.returnValue = false;
         }
       }
       //一些禁止的输入组合方式 
         this.edtObj.focus();//光标位置不变
         var r = document.selection.createRange();
         var selected_text = r.text;        
         r.collapse(false);
         r.setEndPoint("StartToStart", this.edtObj.createTextRange());
         var cursor_index = r.text.length; 
                
         if(key==45||key==95||key==46||key==64){
              if(cursor_index==0)   window.event.keyCode=0;
              var nextKey = value.charAt(cursor_index); 
              this.validateInput(nextKey);             
              if(selected_text==""){
                 var preKey = value.charAt(cursor_index-1); 
                 this.validateInput(preKey);
              }
              else{
                 if(cursor_index-selected_text.length-1< 0 ) window.event.keyCode =0; //第一位不可以输入
                 var preKey = value.charAt(cursor_index-selected_text.length-1); 
                 this.validateInput(preKey);
              }              
        }                          
       if(key==64){//输入的是'@'时
           if(value.indexOf("@")>0&&selected_text.indexOf("@")<0) window.event.keyCode=0; //不存在两个'@'
       } 
       
    } 
  
    function Email_onDocumentReady(){
       //调用ParentObj 的初始化方法        
       this.getBaseObj().onReady();
    }
 /**
  *可以动态的绑定event事件
  */
  function Email_eventBand(key){   
    this.getBaseObj().eventband("onkeypress","OnlyNumber()");    
  }
  function Email_input(lastKey){
      if(lastKey=="-"||lastKey=="_"||lastKey=="."||lastKey=="@"){
           window.event.keyCode =0;
      }
  }