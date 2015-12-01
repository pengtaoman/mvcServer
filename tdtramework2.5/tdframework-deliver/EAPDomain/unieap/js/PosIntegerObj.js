/**
 * PosInteger������У�����
 * js�����PosIntegerObj.js
 * Ӧ������:PosInteger.html
 * ���ԣ�isNullable���Ƿ�Ϊ�ա� ��ΪNOʱ������Ϊ�գ���Ҫ�ǿ�У�飻��ΪYESʱ����Ϊ�գ�����Ҫ�ǿ�У�顣
 *       fixLength: ����̶����ȡ�
 * ˵����1��֧������̶����ȣ���������̶����ȣ����ֹ���롣
 *       2��֧�����ͣ�0��9��  
 *       3����Enter ��ת��Ϊ Tab ����     
 * @author  lixiangyu@neusoft.com,2003.04
 *          micy@neusoft.com	2003.07.21
 *				hugh@neusoft.com
 */
 
  function PosIntegerObj(editerObj){
	
	//�����������
	this.edtObj = editerObj;
    	
	
	//��������
	this.getParentObj = POS_getParentObj;
	this.getBaseObj = POS_getBaseObj;
	
	this.onvalidate = POS_onvalidate;
	this.checkInput = POS_checkInput;
	
	this.OnlyNumber = POS_OnlyNumber;
	this.onReady = POS_onDocumentReady;
 	this.eventBand =POS_eventBand;
	
	
	//˽�з���
	
	//˽�ж���
    var ParObj=null;
    var BasObj=null;
	}
 
 	function POS_getParentObj(){
    	if(this.ParObj==null){
    		this.ParObj = new NumberObj(this.edtObj);
    		}
    		return this.ParObj;	
   	}
   function POS_getBaseObj(){
   	if(this.BasObj==null){
   		this.BasObj = this.getParentObj().getBaseObj();
   		}
   	return this.BasObj;
   	
   	}


      
    function POS_onvalidate() {
    
	     var inputStr = this.edtObj.value;
	     var objName =this.edtObj.name;
	     
	     //����Base.htc�еĹ��ú���������ݺϷ���
     	if(!this.getBaseObj().commonCheck())	return false;
		 //alert(inputStr);
		 if(!this.checkInput()){
		    alert(this.edtObj.prompt + "���벻�Ϸ���");
		   return false;
		 }		 	    
	     return true;

    }
    
    function POS_checkInput(){
      var inputStr = this.edtObj.value;
      //alert(inputStr);
      //������볤�ȴ���1����һλ��������0
 		/*
      for (var i = 0; i < inputStr.length; i++) {
           var oneChar = inputStr.charAt(i)
           if (i == 0 && oneChar == "0") {
           	   if(this.edtObj.fixLength != 1){
	           	   window.event.keyCode = 0 ;
	           	   //alert("��һλ��������0");
	           	   return false;
           	   }
           }
           if (oneChar < "0" || oneChar > "9") {
             event.returnValue = false;
             return false;
           }
       }
  		*/
  		if(inputStr!=null&&inputStr!=""){
          if(inputStr.charAt(0)=="0") return false;
          var tt = parseInt(inputStr)+"";
          if(inputStr!=tt) return false;
        }
        //
        return true;   
    
    }

    function POS_OnlyNumber(){       
    	
	
		if ( !(((window.event.keyCode >= 48) && (window.event.keyCode <= 57))|| (window.event.keyCode == 13) ))

		{
			window.event.keyCode = 0 ;
		}
        var inputStr = this.edtObj.value;
        if(inputStr==null||inputStr==""){
            if(window.event.keyCode==48){
                window.event.keyCode = 0 ;              
            }
        }
	
    }
    
    function POS_onDocumentReady(){
    	//����ParentObj �ĳ�ʼ������   	 
    	 this.getParentObj().onReady();
    	}  
    function POS_eventBand(){
    	this.getBaseObj().eventBand("onkeypress","OnlyNumber()");
    	}
    

