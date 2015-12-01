/**
 * DoubleУ�����
 * js�����DoubleObj.js
 * Ӧ�����ӣ�Double.html
 * ���ԣ�
 *       precision�� ���ȡ�
 * ˵����1����������0��9���֣���.��  ��-�������Ҷ�������������ơ� 
 *       2����Enter ��ת��Ϊ Tab ����  
 * @author  lixiangyu@neusoft.com,2003.04
 *          micy@neusoft.com	2003.07.19
 *				hugh@neusoft.com
 */
 
 
 
 function DoubleObj(editerObj){
     
 	//�����������
 	this.edtObj = editerObj;
 	
    	
    	//��������
    	this.onvalidate = DOU_onvalidate;
    	this.checkSymbol = DOU_checkSymbol;
    	this.getParentObj = DOU_getParentObj;
    	this.getBaseObj = DOU_getBaseObj;
    	
 		this.onReady = DOU_onReady;
 		this.eventBand = DOU_eventBand;
    	this.OnlyNumber = DOU_OnlyNumber; 
        this.dealInputOnblur = DOU_dealInputOnblur;	
 	
 	//˽�з���
 	    this.addZero = DOU_addZero;
        this.delZero = DOU_delZero;
        this.deleteZero = DOU_deleteZero;       
 	//˽�ж���
    	var ParObj=null;
 		var BasObj=null;
 }

   function DOU_getParentObj(){  
	if(this.ParObj==null){
		this.ParObj = new NumberObj(this.edtObj);
		}
		return this.ParObj;
    }
    
   function DOU_getBaseObj(){  
		if(this.BasObj==null){
			this.BasObj = this.getParentObj().getBaseObj();
			}
			return this.BasObj;
   }

    function DOU_onvalidate() {
     
      //����Base.htc�еĹ��ú���������ݺϷ���
        //if(!commonCheck())	return false;      
        
    
     	if(!this.getBaseObj().commonCheck())	return false;
	     
	  if(!this.checkSymbol()){
		    alert(this.edtObj.prompt + "���벻�Ϸ���");
		   return false;
	  }		  
	   
	//���С����󾫶��Ƿ����
	 if(!isNaN(this.edtObj.precision))
      if(this.edtObj.precision!="0"&&this.edtObj.value!=""){ 
      var n = this.edtObj.value.indexOf(".");
      var m=this.edtObj.value.length-1;
      var z=m-n;
      precision = parseInt(this.edtObj.precision);
      if(!isNaN(precision)){
	      if(n>-1&&((m-n)> precision||m==n)){//���������Ȼ����Ǻ���ֻ��С����ʱ
	         alert(this.edtObj.prompt+"���Ȳ�����Ҫ�󾫶�"+this.edtObj.precision+"λ��");
		     return false;
	    
	      }        
      }
	   
	}
      return true;
      
    }
    
    
    function DOU_OnlyNumber()
    {         
         //this.cursorDispose(this.edtObj);            
         if(!CursorDispose(this.edtObj,this.edtObj.precision))
             window.event.keyCode = 0;         
       
         
         //�������볤�ȣ�������ֹ����
       var fixLength = this.edtObj.fixLength;
        var inputLen = this.edtObj.value.length;
        if(!isNaN(fixLength)){
	         fixLength = parseInt(fixLength);
	         if(inputLen < fixLength)
	             event.returnValue = true;
	         else if(inputLen > fixLength-1)
	             event.returnValue = false;
	    }
         
         
         if ( !(((window.event.keyCode >= 48) && (window.event.keyCode <= 57))|| (window.event.keyCode == 13) || (window.event.keyCode == 46)|| (window.event.keyCode == 45)))
         {
           window.event.keyCode = 0 ;
          }
      
    } 



 /**
 *���ƣ�DOU_checkSymbol()
 *���ܣ������š�.���͡���������ĺϷ���
 */
   function DOU_checkSymbol(){
     var checkStr = this.edtObj.value; 
     var j=0;
     var flag=0;   
    if(window.event!=null){
     //��һλ����������С���㡰.��
     if(checkStr == null || checkStr=="" ){
     
        if(window.event.keyCode == 46)
            window.event.keyCode = 0 ; 
            
          
     }  
     //�����һλ�Ǹ��ţ��ڶ�λ��ֹ���롰.��  
     if(checkStr=="-"){
       if(window.event.keyCode == 46)
               window.event.keyCode = 0 ; 
     }
    
     //�����һλ���븺�ţ�����λ���������븺�š�-��
     if(checkStr.indexOf("-")>-1 || checkStr.length>1){
       if(window.event.keyCode == 45)
              window.event.keyCode = 0 ; 
     }
    }
    for (var i = 0; i < checkStr.length; i++) {
           var oneChar = checkStr.charAt(i)
           
           //��һλ�����Ǹ���
           if(i == 0 && oneChar == "-"){
              continue;
           }
     
           if ( i>0 && oneChar == "-") {
          //  alert("�������벻�Ϸ�");
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

	function DOU_onReady(){
		//����ParentObj �ĳ�ʼ������            	 
    	 this.getParentObj().onReady();
         if(!this.edtObj.getAttribute("precision")|| isNaN(this.edtObj.getAttribute("precision"))) //Ĭ�ϵĻ�����ֵ����ȷʱΪ2
           this.edtObj.precision ="2";
                   
         }
	function DOU_eventBand(){
		this.getBaseObj().eventBand("onkeypress","OnlyNumber()")
		}
    function DOU_dealInputOnblur(){
       if(this.edtObj.value=="")return;
       var value =this.edtObj.value;
       if(value=="-") value = "-0";
       var precision = this.edtObj.precision;
       if(precision==0){ //��������ʱ
           this.edtObj.value = this.delZero(value);
           return;
       }
       if(value.indexOf(".")<0){
          this.edtObj.value = this.deleteZero(value+".") + this.addZero(parseInt(precision));
       }
       else{
          if(value.charAt(0)==".") value = "0" + value;
          var leftPrec = parseInt(precision)-(value.length-value.indexOf(".")-1);
          value = value + this.addZero(leftPrec);
          value = value.substring(0,value.indexOf(".")+parseInt(precision)+1); //�ƶ��ص����Ǿ�ȷλ
          this.edtObj.value = this.deleteZero(value);
       }
    }
    function DOU_addZero(num)
    {
       var prec = "";
       for(var i=0;i<num;i++){
         prec+= "0";
       }
       return prec; 
    }
    function DOU_delZero(str){
       var oper ="";
       if(str.indexOf("-")>-1){
         oper="-";
         str = str.substring(1); 
       }
       while(str.indexOf("0")==0&&str.length>1){
          str = str.substring(1);
       }
       if(str=="0") return "0";
       else return oper+str;
    }
    function DOU_deleteZero(str)
    {       
       var i = 0;
       var str1 = str;
       for(;i<str1.length;i++){
          
          if(str.indexOf("0")==0&&str.indexOf(".")>1){
             str = str.substr(1);
          }
          else if(str.indexOf("-")==0&&str.indexOf("0")==1&&str.indexOf(".")>2){
             str = "-" + str.substr(2);
          }
          else if(str.indexOf("-")==0&&str.indexOf(".")==1){
             str = "-0" + str.substr(1); 
             break;
          }
          else{
             break;
          }          
       }
       return str;
    }
    
    