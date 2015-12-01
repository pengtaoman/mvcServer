/**
 * Money校验组件
 * js组件：MoneyObj.js
 * 应用例子：Money.html
 * 属性：isNullable：是否为空。 当为NO时不可以为空，需要非空校验；当为YES时可以为空，不需要非空校验。
 * 说明：1、这里Money的精度固定长度为2。
 *       2、允许输入0－9数字，“.” ，并且对输入进行了限制。
 *       3、将Enter 键转换为 Tab 键。  
 *       4、可以通过设定 pattern 属性，进行显示样式的控制
 * @author  lixiangyu@neusoft.com,2003.04
 *          micy@neusoft.com	2003.07.21
 *				hugh@neusoft.com
 */
 
 function MoneyObj(editerObj){
	
	//定义输入对象
	this.edtObj = editerObj;
    	
	
	//公共方法
	this.getParentObj = MON_getParentObj;
	this.getBaseObj = MON_getBaseObj;
	
	this.onvalidate = MON_onvalidate;
	this.checkSymbol = MON_checkSymbol;
	
	this.OnlyNumber = MON_OnlyNumber;
	this.onReady = MON_onDocumentReady;
 	this.eventBand =MON_eventBand;
 	
 	this.dealInputOnblur = MON_onBlur;
	
	//私有方法
	this.getOriValue = MON_getOriValue;
    this.cutComma = MON_cutComma; //去掉逗号操作
	//私有对象
    var ParObj=null;
    var BasObj=null;
}

	function MON_getParentObj(){
    	if(this.ParObj==null){
    		this.ParObj = new NumberObj(this.edtObj);
    		}
    		return this.ParObj;	
   	}
   function MON_getBaseObj(){
   	if(this.BasObj==null){
   		this.BasObj=this.getParentObj().getBaseObj();
   		}
   	return this.BasObj;
   	
   	}


    function MON_onvalidate(){
               
        var inputName = this.edtObj.name;
       var format = this.edtObj.format;
       var inputStr=this.edtObj.formerValue;
       
       if(inputStr==null){
       	  inputStr = this.getOriValue(this.edtObj.value);
      	}
       
      
        //调用Base.htc中的公用函数检查数据合法性
     	if(!this.getBaseObj().commonCheck())	return false;
	  
	     if(!this.checkSymbol()){
		    alert(this.edtObj.prompt + "输入不合法！");
		    return false;
		 }	
		
		     
		 //感觉以下校验没有必要，故先注释 by micy
        //检查小数点后精度是否符合  
		/*
          var n = this.edtObj.value.indexOf(".");
          var m=this.edtObj.value.length-1;
          var z=m-n;
        
          if((m-n)!=2){
             alert(this.edtObj.prompt+"精度不符，要求精度2位。");
		     return false;
        
          }        
 		 */
		//检查小数点后精度是否符合
   
    
	  if(!isNaN(this.edtObj.precision)) 
      if(this.edtObj.precision!="0"&&this.edtObj.value!=""){      
        var n = this.edtObj.value.indexOf(".");
        var m=this.edtObj.value.length-1;
        var z=m-n;
        precision = parseInt(this.edtObj.precision);
        if(!isNaN(precision)){
	      if(n>-1&&((m-n)> precision||m==n)){
	         alert(this.edtObj.prompt+"精度不符，要求精度"+this.edtObj.precision+"位。");
		     return false;
	    
	      }        
        }  
	  }     
	return true;	
 }
    
    
/**
 *名称：MON_checkSymbol()
 *功能：检查符号“.”和“－”输入的合法性
 */
   function MON_checkSymbol(){
     var checkStr = this.edtObj.formerValue; 
     if(checkStr==null){
       	  checkStr = this.getOriValue(this.edtObj.value);
       	}
     
     if(checkStr==null || checkStr==""){
     	checkStr = this.edtObj.value;
     }
     var j=0;
     var flag=0; 
     /**  
     //第一位不允许输入小数点“.”
     if(checkStr == null || checkStr=="" ){
        if(window.event.keyCode == 46)
            window.event.keyCode = 0 ; 
               
     }  
     //如果第一位是负号，第二位禁止输入“.”  
     if(checkStr=="-"){
       if(window.event.keyCode == 46)
               window.event.keyCode = 0 ; 
     }
     
     //如果第一位输入负号，其他位不允许输入负号“-”
     if(checkStr.indexOf("-")==0 ){
       if(window.event.keyCode == 45)
              window.event.keyCode = 0 ; 
     }
     **/
     for (var i = 0; i < checkStr.length; i++) {
           var oneChar = checkStr.charAt(i)
           
           var pattern = this.edtObj.pattern;
           //pattern为正数("+")的情况下校验
           if (pattern.indexOf("+")==0 && i==0 && oneChar == "-"){
            return false;
           }
          //pattern为负数("-")的情况下校验
           if (pattern.indexOf("-")==0 && i==0 && oneChar>="0" && oneChar<="9"){
            return false;
           }           
           //pattern没有指定符号的情况下，第一位可以是负号
           if(i == 0 && oneChar == "-"){
              continue;
           }
     
           if ( i>0 && oneChar == "-") {
            alert("负号输入不合法");
            event.returnValue = false;
            return false;
           }
           
           if (oneChar < "0" || oneChar > "9") {
              if(oneChar != "-" && oneChar != ".")
                return false;
           }
      }
      
         
        return true; 
   } 
    

    function MON_OnlyNumber()
    {   
        if(!CursorDispose(this.edtObj,2))
          window.event.keyCode = 0 ; 
      /* if(this.edtObj.value!="")   
        this.checkSymbol();
        //如果已经输入一个小数点，则禁止再次输入小数点。并且小数点不能输入在第一位
        var n = this.edtObj.value.indexOf(".");
        if(n>-1){
          if(window.event.keyCode == 46)
              window.event.keyCode = 0 ; 
              
          //小数点后超过两位则禁止输入
          var m=this.edtObj.value.length;
          if((m-n)>2){
           window.event.keyCode = 0 ;
        
          }        
        
        }                    
        */
	if ( !(((window.event.keyCode >= 48) && (window.event.keyCode <= 57))|| (window.event.keyCode == 13)|| (window.event.keyCode == 46)|| (window.event.keyCode == 45) ))

	{
		window.event.keyCode = 0 ;
	}
	
 	} 
    
   function MON_onDocumentReady(){
   	//调用ParentObj 的初始化方法   	 
    	 this.getParentObj().onReady();
        // if(!this.edtObj.precision||isNaN(this.edtObj.precision))
        //    this.edtObj.precision = 2;
   	}
   	
   function MON_eventBand(){
   	this.getBaseObj().eventBand("onkeypress","OnlyNumber()");
   	} 
   	
  function MON_onBlur(){
    if(this.edtObj.value=="") return;
  	var formerValue = this.edtObj.formerValue;    
  	var nowValue = this.cutComma(this.edtObj.value);
  	var pattern = this.edtObj.pattern;
  	//alert("formerValue="+formerValue);
  	//alert("nowValue="+nowValue);
  	//alert("pattern="+pattern);
  	if(formerValue==null || formerValue==""){       
     
  		this.edtObj.formerValue = nowValue;
  		formerValue = nowValue;
  	}else if( nowValue!= formatNumber(this.cutComma(formerValue),pattern) ){
  		this.edtObj.formerValue = nowValue;
  		formerValue = nowValue;
  	}else{
  		return;
  	}
  	
  		
	  	if(pattern == null || pattern=="" ){          
		   return;    
	     	}else{   
               if(formerValue=="") formerValue = 0;         
	     	   var formatValue = formatNumber(formerValue,pattern);                         
	     	   if(formatValue.split('.')[0]!='NaN'){
	     	   	this.edtObj.value = formatValue;
	     	    }else{
	     	    	//样式转化发生错误，取消转换并设定 formerValue 
	     	    	this.edtObj.formerValue = this.getOriValue(nowValue);
	     	    }
	     	 }
	}
	

	function MON_getOriValue(theValue){
            if(theValue=="") return "";
			var arr = theValue.split(',');
	     	    	if(arr.length>0){
		     	    	var str="";
		     	    	for(i=0;i<arr.length;i++){
		     	    		str+=arr[i];
		     	    	}
		     	    	return str;
	     		}
	     		return theValue;
	}
    function MON_cutComma(value){       
      var temp = "";
      while(value.indexOf(",")>=0){
        temp +=value.substr(0,value.indexOf(","));
        value= value.substr(value.indexOf(",")+1);
     }
     temp+=value;
     //去掉多余的零如：-00123.00 会变成-123.00
     var temp1 = temp;
     for(var i=0;i<temp1.length;i++){       
            if(temp.charAt(0)=="0"&&((temp.indexOf(".")<0&&temp.length>1)||temp.indexOf(".")>1)){
                temp = temp.substr(1); 
            }
            else if(temp.charAt(0)=="-"&&temp.length==1)
            {
               temp = temp + "0"; 
            }
            else if(temp.charAt(0)=="-"&&temp.charAt(1)=="0"&&((temp.indexOf(".")<0&&temp.length>2)||temp.indexOf(".")>2)){
                temp = temp.charAt(0) + temp.substr(2);                
            }
            else{
                break;
            }          
     }    
     return temp;
   }