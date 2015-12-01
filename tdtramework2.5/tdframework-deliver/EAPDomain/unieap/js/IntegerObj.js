/**
 * IntegerУ�����
 * js�����IntegerObj.js
 * Ӧ������:Integer.html
 * ���ԣ�isNullable���Ƿ�Ϊ�ա� ��ΪNOʱ������Ϊ�գ���Ҫ�ǿ�У�飻��ΪYESʱ����Ϊ�գ�����Ҫ�ǿ�У�顣
 *       fixLength: ����̶����ȡ�
 * ˵����1��֧������̶����ȣ���������̶����ȣ����ֹ���롣
 *       2��֧�����ͣ�0��9����-����
 *       3����Enter ��ת��Ϊ Tab ����
 *             
 * @author  lixiangyu@neusoft.com,2003.04
 *          micy@neusoft.com	2003.07.19
 *				hugh@neusoft.com
 */
 
 function IntegerObj(editerObj){
	
	//�����������
	this.edtObj = editerObj;
    	
	
	//��������
	this.getParentObj = INT_getParentObj;
	this.getBaseObj = INT_getBaseObj;
	
	this.onvalidate = INT_onvalidate;
	this.checkInput = INT_checkInput;
	
	this.OnlyNumber = INT_OnlyNumber;
	this.onReady = INT_onDocumentReady;
 	this.eventBand =INT_eventBand;
	
	
	//˽�з���
	
	//˽�ж���
    var ParObj=null;
    var BasObj=null;
}
 
    function INT_getParentObj(){
    	if(this.ParObj==null){
    		this.ParObj = new NumberObj(this.edtObj);
    		}
    		return this.ParObj;	
   	}
   function INT_getBaseObj(){
   	if(this.BasObj==null){
   		this.BasObj=this.getParentObj().getBaseObj();
   		}
   	return this.BasObj;
   	
   	}
    function INT_onvalidate() {
        var fixLength = this.edtObj.fixLength;
	     var inputStr = this.edtObj.value;
	     var objName =this.edtObj.name;
	    
       
       
	   //����Base.htc�еĹ��ú���������ݺϷ���
     	if(!this.getBaseObj().commonCheck())	return false;
	   	  //alert(fixLength+"  "+inputStr+"  "+objName);  
	   	if(!this.checkInput()){
		   alert(this.edtObj.prompt + "���벻�Ϸ���");
		   return false;
		}
		   	    
		
	    return true;
	}
	
	
    function INT_checkInput(){    

      
      var inputStr = this.edtObj.value;     
     
      if(inputStr=="") return true;
      //�����һλ���븺�ţ�����λ���������븺�š�-��
      if(inputStr.length>this.edtObj.maxlength) 
        return false;
      if(inputStr.indexOf("-0")>-1) return false;
    
      while(inputStr.length>1&&inputStr.indexOf("0")==0){
         inputStr = inputStr.substring(1);
      }
      if(inputStr!=parseInt(inputStr,10)+"") return false;
      
      return true;
    
    }
    


    function INT_OnlyNumber()
    {         
	   this.checkInput();
       
       var inputStr = this.edtObj.value;     
       this.edtObj.focus();//���λ�ò���
       var r = document.selection.createRange();    
       r.collapse(false);
       r.setEndPoint("StartToStart", this.edtObj.createTextRange());
       var cursor_index = r.text.length; 
     
       if(inputStr.charAt(0)=="-"&&cursor_index==1&&window.event.keyCode == 48){     
           window.event.keyCode = 0 ; 
       }
       else if(inputStr.charAt(0)=="0"&&cursor_index==0&&window.event.keyCode == 45)
          window.event.keyCode = 0 ; 
          
      
	   if ( !(((window.event.keyCode >= 48) && (window.event.keyCode <= 57))|| (window.event.keyCode == 13) || (window.event.keyCode == 45)))
	
	   {
			window.event.keyCode = 0 ;
	   }
		if(!CursorDispose(this.edtObj,0)) window.event.keyCode = 0 ;
		
	
    }
    
    function INT_onDocumentReady(){
    	//����ParentObj �ĳ�ʼ������   	 
    	 this.getParentObj().onReady();
    	};
    function INT_eventBand(){
    	this.getBaseObj().eventBand("onkeypress","OnlyNumber()")
    	}
    
