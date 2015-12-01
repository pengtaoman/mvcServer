/**
 * IDCard校验组件
 * js组件：IDCardObj.js
 * 应用例子：IDCard.html
 * 属性：isNullable：是否为空。 当为NO时不可以为空，需要非空校验；当为YES时可以为空，不需要非空校验。
 * 说明：1、身份证可以输入15位，也可以输入18位，如果是18位身份证，允许最后一位是X
 *       2、将Enter 键转换为 Tab 键。
 *       3、只允许输入数字和X。        
 * @author  lixiangyu@neusoft.com,2003.04
 *          micy@neusoft.com	2003.07.19
 *				hugh@neusoft.com
 */
 
 function IDCardObj(editerObj){
     
 		//定义输入对象
 		this.edtObj = editerObj;
 	
    	//公共方法
    	this.onvalidate = IDC_onvalidate;
    	this.checkID = IDC_checkID;
    	this.is0AndPosInteger = IDC_is0AndPosInteger;
    	
    	this.getParentObj = IDC_getParentObj;
    	this.getBaseObj = IDC_getBaseObj;
    	
 		this.OnlyNumber = IDC_OnlyNumber;
 		this.onReady = IDC_onReady;
 		this.eventBand = IDC_eventBand;
 	
 	
 		//私有方法
 	
 		//私有对象
    	var ParObj=null;
    	var BasObj=null;
 	
 }
 
   function IDC_getParentObj(){  
		if(this.ParObj==null){
			this.ParObj = new BaseObj(this.edtObj);
			}
			return this.ParObj;
   }
    
   function IDC_getBaseObj(){  
		if(this.BasObj==null){
			this.BasObj = new BaseObj(this.edtObj);
			}
			return this.BasObj;
   }
   
   
    function IDC_onvalidate(){      
       var inputStr = this.edtObj.value;
     	 var inputPro = this.edtObj.prompt;
       if(inputStr == null) inputStr = "";
       var format=inputStr.length;
       
        //调用Base.htc中的公用函数检查数据合法性
     	if(!this.getBaseObj().commonCheck())	return false;
	    
	   if(!this.is0AndPosInteger(inputStr)){
          alert(this.edtObj.prompt + "输入不合法！");
          return false;			
       }                 
        
       if(inputStr == "") return true; 
          
       if(format==15 || format==18){
         if(!this.checkID(this.edtObj.value,this.edtObj.prompt,format))
         //if(!this.checkID(this.edtObj.value,this.edtObj.prompt,this.edtObj.value.length))		
            return false;
       }else{
          alert("身份证的位数输入不正确！");
          return false;
       }
       //针对18位身份证号码的末尾数校验
       if (format==18){
       		var iSum=0;
       		var a;
       		var b;
       		for(var i=17;i>=0;i--) {
       		a=(Math.pow(2,i)%11);
       		if (i==0){
       			//最后一位的值为"X"或者"x"的情况
       			if (inputStr.charAt(17 - i)=='x'||inputStr.charAt(17 - i)=='X')	{
       				//对于最后一位为"x"的对应的整数值为10
       				b=10;
       			}
       			else{
       				b=parseInt(inputStr.charAt(17 - i),11);
       			}
       		}
       		else{
       			b=parseInt(inputStr.charAt(17 - i),11);
       		}
       		iSum=iSum+a*b;
  		}
			if(iSum%11!=1){
				alert("身份证的输入不正确！");
				return  false;
			}
		}
       
       return true;
		
	}

	
/**
 *名称：checkDate(txtObj,objName,format)
 *功能：检查时间型数据是否合乎要求
 *形参：txtObj- 文本域对象
 *      objName-文本域对象对应的标签名称
 *      format- 身份证格式，共有以下几种格式：
 *              15位，18位（最后一位可能为X）
 *返回：Boolean型
 */
    function IDC_checkID(inputStr,objName,format){
                var temp;
                var year,month,day;
                if(inputStr.length != format){
                      alert(objName+"格式不对,应为“"+format+"”位。");
                      return false;
                }
                else {
                                    
                    //检查年的格式
                    if(format==18){
                    	//alert("aaa");
                      temp=inputStr.substring(6,10);
                      year=parseInt(temp,10);
                      if(year<1900 || year>2200){
                         alert(objName+"年份应介于1900与2200之间，请重新输入！");
                         return false;
                      }
                      
                    }
                    else if(format==15){
                      temp=inputStr.substring(6,8);
                      year=parseInt(temp,10);
                      if(year<00 || year>99){
                         alert(objName+"年份应介于00与99之间，请重新输入！");
                         return false;
                      }
                    }
                    
                      
                    //检查月的格式
                    if(format==18)
                      temp=inputStr.substring(10,12);
                    else if(format==15)
                      temp=inputStr.substring(8,10);
                    
                    month=parseInt(temp,10);
                    if(month<1 ||month>12){
                        alert(objName+"月份必须介于1与12之间！");
                        return false;
                    }

                    //检查日的格式
                     if(format==18)
                       temp=inputStr.substring(12,14);
                    else if(format==15)
                      temp=inputStr.substring(10,12);
                   
                    day=parseInt(temp,10);
                    if((day==0)||(day>31)){
                            alert(objName+"日必须介于0与31之间！");
                            return false;
                    }else if(day>28 && day<31){
                            if(month==2){
                                    if(day!=29){
                                            alert(objName+year+"年"+month+"月无"+day+"日。");
                                            return false;
                                    }
                                    else {
                                            if((year%4)!=0){
                                                    alert(objName+year+"年"+month+"月无"+day+"日。");
                                                    return false;
                                             }
                                             else {
                                                    if((year%100==0)&&(year%400!=0)){
                                                           alert(objName+year+"年"+month+"月无"+day+"日。");
                                                           return false;
                                                    }
                                             }
                                    }
                            }
                    }

                    else if(day==31){
                            if((month==2)||(month==4)||(month==6)||(month==9)||(month==11)){
                                    alert(objName+month+"月无"+day+"日");
                                    return false;
                            }
                    }
               }
               
               return true;
        }

   
    
    function IDC_is0AndPosInteger(inputVal) {
        //如果是18位身份证，最后一位允许是X
         var format=inputVal.length;
         if(format==18){
             var lastChar = inputVal.charAt(inputVal.length-1)
             if(lastChar=="X"||lastChar=="x")
                inputVal=inputVal.substring(0, inputVal.length-1); 
         }
       	 for (var i = 0; i < inputVal.length; i++) {
               var oneChar = inputVal.charAt(i)
	   if (oneChar < "0" || oneChar > "9") {
	       return false;
           }
           
        }
        return true;
   }
  

 function IDC_OnlyNumber()
 {
       
        
        //限制输入长度，超长禁止输入
        var fixLength =18;
        var inputLen = this.edtObj.value.length;
        
        //因为校验位X只能出现在最后一位，如果出现X,认为输入结束，则禁止输入。
       /* var n = this.edtObj.value.indexOf("X");
        if(n>-1)
          window.event.keyCode = 0 ;   */   
         
	/*if(inputLen < fixLength){
	 
	   event.returnValue = true;
	   
	 }
	else if(inputLen > fixLength-1)
	    event.returnValue = false;
	*/
	if ( !(((window.event.keyCode >= 48) && (window.event.keyCode <= 57))|| (window.event.keyCode == 13)||(window.event.keyCode == 88)||(window.event.keyCode == 120) ))
	{   
           
		    window.event.keyCode = 0 ;
	}
         this.edtObj.focus();//光标位置不变
         var r = document.selection.createRange();
         var temp =r.text;         
         r.collapse(false);
         r.setEndPoint("StartToStart", this.edtObj.createTextRange());        
         var rr = r.text.length - temp.length; //得出在最前面的光标的位置。  
         //alert("rr= "+rr);        
         if(temp==""){ //如果选中的内容为空            
            if(inputLen==fixLength||(rr!=fixLength-1&&(window.event.keyCode == 88||window.event.keyCode == 120))) window.event.keyCode = 0 ; 
         }
         else{
            if((window.event.keyCode == 88||window.event.keyCode == 120)&&!(inputLen==fixLength&&rr==fixLength-1)) window.event.keyCode = 0 ; 
         }
 } 
    
function IDC_onReady(){
		//调用ParentObj 的初始化方法   	 
    	 this.getParentObj().onReady();
	}
function IDC_eventBand(){
	this.getBaseObj().eventBand("onkeypress","OnlyNumber()")
}
