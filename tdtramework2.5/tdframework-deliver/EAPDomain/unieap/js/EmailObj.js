/**
 * EmailУ�����
 * js�����EmailObj.js
 * Ӧ�����ӣ�Eamil.html
 * ���ԣ�isNullable���Ƿ�Ϊ�ա� ��ΪNOʱ������Ϊ�գ���Ҫ�ǿ�У�飻��ΪYESʱ����Ϊ�գ�����Ҫ�ǿ�У�顣
 *       fixLength: �̶����ȡ��������û�дﵽfixlength�������ʾ��
 * ˵��: 1��֧������̶����ȣ���������̶����ȣ����ֹ���롣
 *       2����Enter ��ת��Ϊ Tab ����
 * 
 * @author  yang-zz 2005-06-24
 */

function EmailObj(editerObj){    
    //�����������
    this.edtObj = editerObj;
    //��������
    this.getBaseObj = Email_getBaseObj;    
    this.onvalidate = Email_onvalidate;
    this.checkInput = Email_checkInput;    
    this.OnlyNumber = Email_OnlyNumber;
    this.onReady = Email_onDocumentReady;
    this.eventBand = Email_eventBand;    
    //˽�ж���
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
       //����Base.htc�еĹ��ú���������ݺϷ���
        if(!this.getBaseObj().commonCheck())    return false;     
        if(!this.checkInput()){
             alert(this.edtObj.prompt + "���벻�Ϸ���");
             return false;
        }    
        return true;
    }
    
  function Email_checkInput(){
  
      var inputStr = this.edtObj.value;
      if(inputStr==null||inputStr=="") return true;
      
      var key = inputStr.charCodeAt(0);
      if(!((key>=48&&key<=57)||(key>=65&&key<=90)||(key>=97&&key<=122))) return false;
      for(var i=1;i<inputStr.length;i++){ //�����ĸ���м��
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
      if(inputStr.indexOf("@")<0||inputStr.indexOf(".")<0) return false;//���뺬��"@"��"."
      var temp = inputStr.substring(inputStr.indexOf("@")+1);
      
      if(temp.indexOf("@")>0) return false; //���ܺ�������"@";
      
      var lastKey = inputStr.charAt(inputStr.length-1); //������һ���ַ�
      if(lastKey=="-"||lastKey=="_"||lastKey=="."||lastKey=="@") //�������½�β
         return false;
      if (temp.indexOf(".")<0)//����Ϊһ������
      	return false;  
         
      return true;   
    
  }
  function Email_OnlyNumber(){ 
         
       var value = this.edtObj.value 
       var key = window.event.keyCode;
       //ֻ���������֡���ĸ�͡�-������_������'.'��'@'
       if(!((key>=48&&key<=57)||(key>=65&&key<=90)||(key>=97&&key<=122)||key==45||key==95||key==46||key==64))
           window.event.keyCode=0;
       if(value==null||value==""){           
            //��һλֻ��������012...������ĸabc..ABC...��ͷ
            if(key==45||key==95||key==46||key==64)
               window.event.keyCode=0;            
       }
       //�������볤�ȣ�������ֹ���� fixlength������maxlength
       var inputLen = value.length;
       if(this.edtObj.fixlength){ //�����Ϊ��
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
       //һЩ��ֹ��������Ϸ�ʽ 
         this.edtObj.focus();//���λ�ò���
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
                 if(cursor_index-selected_text.length-1< 0 ) window.event.keyCode =0; //��һλ����������
                 var preKey = value.charAt(cursor_index-selected_text.length-1); 
                 this.validateInput(preKey);
              }              
        }                          
       if(key==64){//�������'@'ʱ
           if(value.indexOf("@")>0&&selected_text.indexOf("@")<0) window.event.keyCode=0; //����������'@'
       } 
       
    } 
  
    function Email_onDocumentReady(){
       //����ParentObj �ĳ�ʼ������        
       this.getBaseObj().onReady();
    }
 /**
  *���Զ�̬�İ�event�¼�
  */
  function Email_eventBand(key){   
    this.getBaseObj().eventband("onkeypress","OnlyNumber()");    
  }
  function Email_input(lastKey){
      if(lastKey=="-"||lastKey=="_"||lastKey=="."||lastKey=="@"){
           window.event.keyCode =0;
      }
  }