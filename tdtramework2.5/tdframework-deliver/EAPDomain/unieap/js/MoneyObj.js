/**
 * MoneyУ�����
 * js�����MoneyObj.js
 * Ӧ�����ӣ�Money.html
 * ���ԣ�isNullable���Ƿ�Ϊ�ա� ��ΪNOʱ������Ϊ�գ���Ҫ�ǿ�У�飻��ΪYESʱ����Ϊ�գ�����Ҫ�ǿ�У�顣
 * ˵����1������Money�ľ��ȹ̶�����Ϊ2��
 *       2����������0��9���֣���.�� �����Ҷ�������������ơ�
 *       3����Enter ��ת��Ϊ Tab ����  
 *       4������ͨ���趨 pattern ���ԣ�������ʾ��ʽ�Ŀ���
 * @author  lixiangyu@neusoft.com,2003.04
 *          micy@neusoft.com	2003.07.21
 *				hugh@neusoft.com
 */
 
 function MoneyObj(editerObj){
	
	//�����������
	this.edtObj = editerObj;
    	
	
	//��������
	this.getParentObj = MON_getParentObj;
	this.getBaseObj = MON_getBaseObj;
	
	this.onvalidate = MON_onvalidate;
	this.checkSymbol = MON_checkSymbol;
	
	this.OnlyNumber = MON_OnlyNumber;
	this.onReady = MON_onDocumentReady;
 	this.eventBand =MON_eventBand;
 	
 	this.dealInputOnblur = MON_onBlur;
	
	//˽�з���
	this.getOriValue = MON_getOriValue;
    this.cutComma = MON_cutComma; //ȥ�����Ų���
	//˽�ж���
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
       
      
        //����Base.htc�еĹ��ú���������ݺϷ���
     	if(!this.getBaseObj().commonCheck())	return false;
	  
	     if(!this.checkSymbol()){
		    alert(this.edtObj.prompt + "���벻�Ϸ���");
		    return false;
		 }	
		
		     
		 //�о�����У��û�б�Ҫ������ע�� by micy
        //���С����󾫶��Ƿ����  
		/*
          var n = this.edtObj.value.indexOf(".");
          var m=this.edtObj.value.length-1;
          var z=m-n;
        
          if((m-n)!=2){
             alert(this.edtObj.prompt+"���Ȳ�����Ҫ�󾫶�2λ��");
		     return false;
        
          }        
 		 */
		//���С����󾫶��Ƿ����
   
    
	  if(!isNaN(this.edtObj.precision)) 
      if(this.edtObj.precision!="0"&&this.edtObj.value!=""){      
        var n = this.edtObj.value.indexOf(".");
        var m=this.edtObj.value.length-1;
        var z=m-n;
        precision = parseInt(this.edtObj.precision);
        if(!isNaN(precision)){
	      if(n>-1&&((m-n)> precision||m==n)){
	         alert(this.edtObj.prompt+"���Ȳ�����Ҫ�󾫶�"+this.edtObj.precision+"λ��");
		     return false;
	    
	      }        
        }  
	  }     
	return true;	
 }
    
    
/**
 *���ƣ�MON_checkSymbol()
 *���ܣ������š�.���͡���������ĺϷ���
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
     if(checkStr.indexOf("-")==0 ){
       if(window.event.keyCode == 45)
              window.event.keyCode = 0 ; 
     }
     **/
     for (var i = 0; i < checkStr.length; i++) {
           var oneChar = checkStr.charAt(i)
           
           var pattern = this.edtObj.pattern;
           //patternΪ����("+")�������У��
           if (pattern.indexOf("+")==0 && i==0 && oneChar == "-"){
            return false;
           }
          //patternΪ����("-")�������У��
           if (pattern.indexOf("-")==0 && i==0 && oneChar>="0" && oneChar<="9"){
            return false;
           }           
           //patternû��ָ�����ŵ�����£���һλ�����Ǹ���
           if(i == 0 && oneChar == "-"){
              continue;
           }
     
           if ( i>0 && oneChar == "-") {
            alert("�������벻�Ϸ�");
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
        //����Ѿ�����һ��С���㣬���ֹ�ٴ�����С���㡣����С���㲻�������ڵ�һλ
        var n = this.edtObj.value.indexOf(".");
        if(n>-1){
          if(window.event.keyCode == 46)
              window.event.keyCode = 0 ; 
              
          //С����󳬹���λ���ֹ����
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
   	//����ParentObj �ĳ�ʼ������   	 
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
	     	    	//��ʽת����������ȡ��ת�����趨 formerValue 
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
     //ȥ����������磺-00123.00 ����-123.00
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