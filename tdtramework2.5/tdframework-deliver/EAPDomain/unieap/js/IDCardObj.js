/**
 * IDCardУ�����
 * js�����IDCardObj.js
 * Ӧ�����ӣ�IDCard.html
 * ���ԣ�isNullable���Ƿ�Ϊ�ա� ��ΪNOʱ������Ϊ�գ���Ҫ�ǿ�У�飻��ΪYESʱ����Ϊ�գ�����Ҫ�ǿ�У�顣
 * ˵����1�����֤��������15λ��Ҳ��������18λ�������18λ���֤���������һλ��X
 *       2����Enter ��ת��Ϊ Tab ����
 *       3��ֻ�����������ֺ�X��        
 * @author  lixiangyu@neusoft.com,2003.04
 *          micy@neusoft.com	2003.07.19
 *				hugh@neusoft.com
 */
 
 function IDCardObj(editerObj){
     
 		//�����������
 		this.edtObj = editerObj;
 	
    	//��������
    	this.onvalidate = IDC_onvalidate;
    	this.checkID = IDC_checkID;
    	this.is0AndPosInteger = IDC_is0AndPosInteger;
    	
    	this.getParentObj = IDC_getParentObj;
    	this.getBaseObj = IDC_getBaseObj;
    	
 		this.OnlyNumber = IDC_OnlyNumber;
 		this.onReady = IDC_onReady;
 		this.eventBand = IDC_eventBand;
 	
 	
 		//˽�з���
 	
 		//˽�ж���
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
       
        //����Base.htc�еĹ��ú���������ݺϷ���
     	if(!this.getBaseObj().commonCheck())	return false;
	    
	   if(!this.is0AndPosInteger(inputStr)){
          alert(this.edtObj.prompt + "���벻�Ϸ���");
          return false;			
       }                 
        
       if(inputStr == "") return true; 
          
       if(format==15 || format==18){
         if(!this.checkID(this.edtObj.value,this.edtObj.prompt,format))
         //if(!this.checkID(this.edtObj.value,this.edtObj.prompt,this.edtObj.value.length))		
            return false;
       }else{
          alert("���֤��λ�����벻��ȷ��");
          return false;
       }
       //���18λ���֤�����ĩβ��У��
       if (format==18){
       		var iSum=0;
       		var a;
       		var b;
       		for(var i=17;i>=0;i--) {
       		a=(Math.pow(2,i)%11);
       		if (i==0){
       			//���һλ��ֵΪ"X"����"x"�����
       			if (inputStr.charAt(17 - i)=='x'||inputStr.charAt(17 - i)=='X')	{
       				//�������һλΪ"x"�Ķ�Ӧ������ֵΪ10
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
				alert("���֤�����벻��ȷ��");
				return  false;
			}
		}
       
       return true;
		
	}

	
/**
 *���ƣ�checkDate(txtObj,objName,format)
 *���ܣ����ʱ���������Ƿ�Ϻ�Ҫ��
 *�βΣ�txtObj- �ı������
 *      objName-�ı�������Ӧ�ı�ǩ����
 *      format- ���֤��ʽ���������¼��ָ�ʽ��
 *              15λ��18λ�����һλ����ΪX��
 *���أ�Boolean��
 */
    function IDC_checkID(inputStr,objName,format){
                var temp;
                var year,month,day;
                if(inputStr.length != format){
                      alert(objName+"��ʽ����,ӦΪ��"+format+"��λ��");
                      return false;
                }
                else {
                                    
                    //�����ĸ�ʽ
                    if(format==18){
                    	//alert("aaa");
                      temp=inputStr.substring(6,10);
                      year=parseInt(temp,10);
                      if(year<1900 || year>2200){
                         alert(objName+"���Ӧ����1900��2200֮�䣬���������룡");
                         return false;
                      }
                      
                    }
                    else if(format==15){
                      temp=inputStr.substring(6,8);
                      year=parseInt(temp,10);
                      if(year<00 || year>99){
                         alert(objName+"���Ӧ����00��99֮�䣬���������룡");
                         return false;
                      }
                    }
                    
                      
                    //����µĸ�ʽ
                    if(format==18)
                      temp=inputStr.substring(10,12);
                    else if(format==15)
                      temp=inputStr.substring(8,10);
                    
                    month=parseInt(temp,10);
                    if(month<1 ||month>12){
                        alert(objName+"�·ݱ������1��12֮�䣡");
                        return false;
                    }

                    //����յĸ�ʽ
                     if(format==18)
                       temp=inputStr.substring(12,14);
                    else if(format==15)
                      temp=inputStr.substring(10,12);
                   
                    day=parseInt(temp,10);
                    if((day==0)||(day>31)){
                            alert(objName+"�ձ������0��31֮�䣡");
                            return false;
                    }else if(day>28 && day<31){
                            if(month==2){
                                    if(day!=29){
                                            alert(objName+year+"��"+month+"����"+day+"�ա�");
                                            return false;
                                    }
                                    else {
                                            if((year%4)!=0){
                                                    alert(objName+year+"��"+month+"����"+day+"�ա�");
                                                    return false;
                                             }
                                             else {
                                                    if((year%100==0)&&(year%400!=0)){
                                                           alert(objName+year+"��"+month+"����"+day+"�ա�");
                                                           return false;
                                                    }
                                             }
                                    }
                            }
                    }

                    else if(day==31){
                            if((month==2)||(month==4)||(month==6)||(month==9)||(month==11)){
                                    alert(objName+month+"����"+day+"��");
                                    return false;
                            }
                    }
               }
               
               return true;
        }

   
    
    function IDC_is0AndPosInteger(inputVal) {
        //�����18λ���֤�����һλ������X
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
       
        
        //�������볤�ȣ�������ֹ����
        var fixLength =18;
        var inputLen = this.edtObj.value.length;
        
        //��ΪУ��λXֻ�ܳ��������һλ���������X,��Ϊ������������ֹ���롣
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
         this.edtObj.focus();//���λ�ò���
         var r = document.selection.createRange();
         var temp =r.text;         
         r.collapse(false);
         r.setEndPoint("StartToStart", this.edtObj.createTextRange());        
         var rr = r.text.length - temp.length; //�ó�����ǰ��Ĺ���λ�á�  
         //alert("rr= "+rr);        
         if(temp==""){ //���ѡ�е�����Ϊ��            
            if(inputLen==fixLength||(rr!=fixLength-1&&(window.event.keyCode == 88||window.event.keyCode == 120))) window.event.keyCode = 0 ; 
         }
         else{
            if((window.event.keyCode == 88||window.event.keyCode == 120)&&!(inputLen==fixLength&&rr==fixLength-1)) window.event.keyCode = 0 ; 
         }
 } 
    
function IDC_onReady(){
		//����ParentObj �ĳ�ʼ������   	 
    	 this.getParentObj().onReady();
	}
function IDC_eventBand(){
	this.getBaseObj().eventBand("onkeypress","OnlyNumber()")
}
