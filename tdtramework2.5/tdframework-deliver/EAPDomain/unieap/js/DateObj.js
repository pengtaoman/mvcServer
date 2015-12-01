/**
 * DateУ�����
 * js�����DateObj.js
 * Ӧ�����ӣ�Date.html
 * ���ԣ�isNullable���Ƿ�Ϊ�ա� ��Ϊfalseʱ������Ϊ�գ���Ҫ�ǿ�У�飻��Ϊtrueʱ����Ϊ�գ�����Ҫ�ǿ�У�顣
         dateformat�����ڸ�ʽ��
         age: ָ����������Ԫ��id��
         preDate:ָ����ǰ�������������ڡ���֮�Ƚϵ�ǰһ�����ڡ�
         
 * ˵����
 *     1�������Լ��Date���������ڵ�form����EAPForm��,Ӧ�õ���javascript�ű�DatePicker.js����д��
 *        html�ļ��У��磺<script Language="JavaScript" src="./js/DatePicker.js"></script>��
 *     2��Լ�����ڸ�ʽΪ��YYYY-MM-DD HH-MI-SS����YYYY-MM-DD HH-MI����YYYY-MM-DD����YYYY-MM����YYYY�� 
 *     3����Enter ��ת��Ϊ Tab ����
 * @author  lixiangyu@neusoft.com,2003.04
 *          micy@neusoft.com	2003.07.19
 *				hugh@neusoft.com
 */

function DateObj(editerObj){
	
	//�����������
	this.edtObj = editerObj;
    	
	
	//��������
	this.getParentObj = DTO_getParentObj;
	this.getBaseObj = DTO_getBaseObj;
	
	this.onvalidate = DTO_onvalidate;
	this.checkDate = DTO_checkDate;
	this.checkSymbol = DTO_checkSymbol;
	this.IsDigits = DTO_IsDigits;
	this.IsTabBTab = DTO_IsTabBTab;
	this.IsDestruct = DTO_IsDestruct;
	this.checkLaterDate = DTO_checkLaterDate;
	
	this.OnlyNumber = DTO_OnlyNumber;
	this.onReady = DTO_onDocumentReady;
 	this.eventBand = DTO_eventBand;
	this.parseDate = DTO_parseDate;
	
	//˽�з���
	this.changeImg = _changeImg;
	this.disableImg = _disableImg;
	this.enableImg = _enableImg;
	this.contrlInput = _contrlInput;
	this.clearCtr = _clearCtr;
	this.checkNum = _checkNum;
	this.onPropertyChange = _onPropertyChange;
	this.getDateMask = _getDateMask;
	
	
	//˽�ж���
    var ParObj=null;
    var BasObj=null;
    
}

	
   function DTO_getParentObj(){  
		if(this.ParObj==null){
			this.ParObj = new BaseObj(this.edtObj);
			}
			return this.ParObj;
		
   }
    
   function DTO_getBaseObj(){  
	
		if(this.BasObj==null){
			this.BasObj = new BaseObj(this.edtObj);
			}
			return this.BasObj;
		
   }
    
    function DTO_onvalidate(){        
                
        //����Base.htc�еĹ��ú���������ݺϷ���
     	if(!this.getBaseObj().commonCheck())	return false;
	   		     	    
	    //if(!this.checkDate(this.edtObj.value,this.edtObj.prompt,this.edtObj.getAttribute("dateformat"))) return false; 	    	    
       if(!this.checkDate(this.edtObj.value,this.edtObj.prompt,this.edtObj.dateformat)) return false;
       //У��������������������Ƿ��ิ��
       if(this.edtObj.age!=null && this.edtObj.age!=""){
          var ageCount = this.onPropertyChange();
	       var ageInput = this.edtObj.document.all[this.edtObj.age].value;

	       if(ageInput != ageCount){
	         alert("���䲻����ӦΪ" + ageCount);
	         return false;
	       } 
       
       }
       if(this.edtObj.preDate!=null && this.edtObj.preDate!="" && this.edtObj.value!="" && document.all(this.edtObj.preDate).value!=""){
	       //��������Ⱥ�˳���Ƿ����Ҫ�� 
	       if(!this.checkLaterDate()){
	       	var preDateID = this.edtObj.preDate;
	         alert(this.edtObj.prompt+"����Ӧ����"+this.edtObj.document.all[preDateID].value);
	
	          return false;
	       
	       } 
       }
       return true;
	
    }
function _changeImg(myStatus){
//	alert(myStatus);
	//������
	//alert("ddddd"+this.edtObj);
	
	if(!myStatus){
	    this.edtObj.parentElement.children(1).disabled = true;
	    this.edtObj.parentElement.children(1).style.cursor = "";
	    this.edtObj.parentElement.children(1).alt = "";
	    this.edtObj.parentElement.children(1).src = unieap.WEB_APP_NAME+"/unieap/images/unieap/time_disabled.gif";  
	}else{
	    this.edtObj.parentElement.children(1).disabled = false;
	    this.edtObj.parentElement.children(1).style.cursor = "hand";
	    this.edtObj.parentElement.children(1).alt = "�������������˵�";
	    this.edtObj.parentElement.children(1).src = unieap.WEB_APP_NAME + "/unieap/images/unieap/time.gif"; 
	}
	
}
function _disableImg(){
	this.changeImg(false);
}
function _enableImg(){
	this.changeImg(true);
}
///**
//*@description: ���ķ���,��Ӧtab��ѡ�񡢰�ť�ĵ��
//*/
//function DoPropChange(){	
//	var propertyName = window.event.propertyName;
//	
//	if( propertyName.toLowerCase() == "disabled" ||
//	    propertyName.toLowerCase() == "readonly"){
//	}	
//}    
/**
 *���ƣ�DTO_checkSymbol()
 *���ܣ������š�.���͡���������ĺϷ���
 */
   function DTO_checkSymbol(){
     var checkStr = this.edtObj.value; 
     var j=0;
     var flag=0;   
     //��һλ���������롰-��������
     if(checkStr == null || checkStr=="" ){
        if(window.event.keyCode == 45 || window.event.keyCode == 58 )
            window.event.keyCode = 0 ; 
               
     }  
       
    for (var i = 0; i < checkStr.length; i++) {
           var oneChar = checkStr.charAt(i)
           if (oneChar < "0" || oneChar > "9") {
             if(oneChar != "-" && oneChar != ":" && oneChar != " " )
                return false;
           }
       }
         
        return true; 
   } 
       
    
    //�����Զ�����׼ȷ���ڸ�ʽ
    function _contrlInput() {    
     var ctr;	
		 ctr = this.checkNum();
		 switch (ctr) {
			   case 4:  
			        if(this.edtObj.value.length==4){
			            if(this.edtObj.dateformat !="YYYY")
			               event.srcElement.value+="-";
			        }
			        break;
			   case 6: 
			        if(this.edtObj.value.length==7){
			          if(this.edtObj.dateformat !="YYYY" && this.edtObj.dateformat !="YYYY-MM")
			            event.srcElement.value+="-";
			        }
			        break;
			   case 8: 
			   		if(this.edtObj.value.length==10){
			   		   if(this.edtObj.dateformat =="YYYY-MM-DD HH:MI:SS" || this.edtObj.dateformat =="YYYY-MM-DD HH:MI"  )
					      event.srcElement.value+=" ";
					}
			        break;
			   case 10: 
			   		if(this.edtObj.value.length==13){
			   		  if(this.edtObj.dateformat =="YYYY-MM-DD HH:MI:SS" || this.edtObj.dateformat =="YYYY-MM-DD HH:MI"  )
					    event.srcElement.value+=":";
					}	
			   			
			        break;
			   case 12: 
			       if(this.edtObj.value.length==16){
			          if(this.edtObj.dateformat =="YYYY-MM-DD HH:MI:SS")
					     event.srcElement.value+=":";
					}	
			        break;
			   case 14:
			        ctr=0;
			        break;     
			   default: break;
			  }
		  return true;
    }
    
 
	
// ����뿪�����¼�
 function _clearCtr() { /*Ctr=0; */}
 
 //�Ƿ�����������
 function DTO_IsDigits(theKey) {
  return ((theKey > 47) && (theKey < 58))
 }
 
 //�Ƿ�Ϊtab��
 function DTO_IsTabBTab(theKey) {
  return theKey == 9;
 }
 //
 function DTO_IsDestruct(theKey) {
  if (theKey==37||theKey==8){
   event.keyCode=(0x08);
   return true;
  }
 }
 
  /**
 *���ƣ�_checkNum()
 *���ܣ�������ָ���
 */
   function _checkNum(){
     var checkStr = this.edtObj.value; 
     var num=0;
     for (var i = 0; i < checkStr.length; i++) {
           var oneChar = checkStr.charAt(i)
           if (oneChar >= "0" && oneChar <= "9") {
             num=num+1;
           }
       }
       return num; 
   }
   
 function _onPropertyChange(){
       var age;
     if(this.edtObj.age != null && this.edtObj.age != ""){
	      var birthday = this.edtObj.value;
	      var year=parseInt(birthday.substring(0,4));
	      var date=new Date();
	      var currentYear=date.getYear(); //ȡ�õ�ǰ�������
	   //   alert("��ǰ��"+currentYear);
	      age=currentYear-year;
	    //  alert("����"+age);
	    //  alert( edtObj.age);
		  this.edtObj.document.all[this.edtObj.age].value=age;
     }
     return age;
} 

 //������ڴ�С�Ƿ������Ⱥ�˳��
   function DTO_checkLaterDate(){
    	var date1ID = this.edtObj.preDate;
    	if(!document.all(date1ID)){
    	   alert("������'"+date1ID+"'ʱ�������");
    	   return false;
    	}
    	if(document.all(date1ID).value==null||document.all(date1ID).value=="") return false;
    	var date1 = this.parseDate(document.all(date1ID));
    	var date2 = this.parseDate(this.edtObj);
        if(date2-date1>0)
        	return true;
        else 
        	return false;
    
   } 
   /**
    *ʱ��������������ֵת����Date����
    *@param objʱ���������
    *@return Date���� 
    */
   function DTO_parseDate(obj){
      var format = obj.dateformat;
      var year = 0;
      var month = 0;
      var day = 0;
      var hour = 0;
      var minute = 0;
      var second = 0;
 	  switch (format) {
			case "YYYY":
				year = parseInt(obj.value.substring(0,4),10);
				break;
			case "YYYYMM":
			    year = parseInt(obj.value.substring(0,4),10);
			    month = parseInt(obj.value.substring(4,6),10);				
			    break;
			case "YYYYMMDD":					
			    year = parseInt(obj.value.substring(0,4),10); 
			    month = parseInt(obj.value.substring(4,6),10);
			    day = parseInt(obj.value.substring(6,8),10);				
			    break;	
			    
			case "YYYYMMDD HH:MI":
				year = parseInt(obj.value.substring(0,4),10); 
			    month = parseInt(obj.value.substring(4,6),10);
			    day = parseInt(obj.value.substring(6,8),10);	
			    hour = parseInt(obj.value.substring(9,11),10);
			    minute = parseInt(obj.value.substring(12,14),10);	
			    break; 				    
			case "YYYYMMDD HH:MI:SS":
			    year = parseInt(obj.value.substring(0,4),10); 
			    month = parseInt(obj.value.substring(4,6),10);
			    day = parseInt(obj.value.substring(6,8),10);	
			    hour = parseInt(obj.value.substring(9,11),10);
			    minute = parseInt(obj.value.substring(12,14),10);	
			    second = parseInt(obj.value.substring(15,17),10);	
			    break; 		
			    
			case "YYYY-MM":
			    year = parseInt(obj.value.substring(0,4),10);
			    month = parseInt(obj.value.substring(5,7),10);								    
			    break;
			case "YYYY-MM-DD":				   
			    year = parseInt(obj.value.substring(0,4),10);
			    month = parseInt(obj.value.substring(5,7),10);
			    day = parseInt(obj.value.substring(8,10),10);	
			    break;
			case "YYYY-MM-DD HH:MI":
				year = parseInt(obj.value.substring(0,4),10);
			    month = parseInt(obj.value.substring(5,7),10);
			    day = parseInt(obj.value.substring(8,10),10);	
			    hour = parseInt(obj.value.substring(11,13),10);
			    minute = parseInt(obj.value.substring(14,16),10);	
			    break;
			case "YYYY-MM-DD HH:MI:SS":
				year = parseInt(obj.value.substring(0,4),10);
			    month = parseInt(obj.value.substring(5,7),10);
			    day = parseInt(obj.value.substring(8,10),10);	
			    hour = parseInt(obj.value.substring(11,13),10);
			    minute = parseInt(obj.value.substring(14,16),10);
			    second = parseInt(obj.value.substring(17,19),10);		
			    break;
			    
			case "MM-DD-YYYY":
			 	month = parseInt(obj.value.substring(0,2),10);
			 	day = parseInt(obj.value.substring(3,5),10);	
			    year = parseInt(obj.value.substring(6,10),10);
			    break;
			case "MM-DD-YYYY HH:MI:SS":
			    month = parseInt(obj.value.substring(0,2),10);
			 	day = parseInt(obj.value.substring(3,5),10);	
			    year = parseInt(obj.value.substring(6,10),10);
			    hour = parseInt(obj.value.substring(11,13),10);
			    minute = parseInt(obj.value.substring(14,16),10);
			    second = parseInt(obj.value.substring(17,19),10);		
			    break;
		   case "DD-MM-YYYY":
		  		day = parseInt(obj.value.substring(0,2),10);	
			    month = parseInt(obj.value.substring(3,5),10);
			    year = parseInt(obj.value.substring(6,10),10);
			    break;
			case "DD-MM-YYYY HH:MI:SS":
			    day = parseInt(obj.value.substring(0,2),10);	
			    month = parseInt(obj.value.substring(3,5),10);
			    year = parseInt(obj.value.substring(6,10),10);
			    hour = parseInt(obj.value.substring(11,13),10);
			    minute = parseInt(obj.value.substring(14,16),10);
			    second = parseInt(obj.value.substring(17,19),10);		
			    break;
			    	
			default:
			    alert(obj.prompt+"�ж����ʱ���ʽ�����ܴ���!");
			    return null;
	    	}
	    var date = new Date(year,month,day,hour,minute,second);
	    return date;
   } 
/**
*@description ��ָ����ʽ��ʱ���ַ���װ���һ��Date����
*@param     dateStr
*@param     objName
*@param     format
*               �ܴ���ĸ�ʽ:
*                          YYYY,
*					       YYYYMM,YYYYMMDD,YYYYMMDD HH:MI:SS,
*                          YYYY-MM,YYYY-MM-DD,YYYY-MM-DD HH:MI:SS,
*@return    boolean
*/
function DTO_checkDate(dateStr,objName,format){
    if(dateStr == null || dateStr == "" ) return true;
    if(dateStr.length != format.length){
    	alert(objName+"���Ⱥ͸�ʽ("+format+")Ҫ��Ĳ�һ��,����������");
    	return false;
    }   
	var year,month,day,hour,minute,second;
	switch (format) {
		case "YYYY":
			year = dateStr;
			break;
		case "YYYYMM":
		    year = dateStr.substring(0,4);
		    month = dateStr.substring(4,6);
		    break;
		case "YYYYMMDD":
		    year = dateStr.substring(0,4);
		    month = dateStr.substring(4,6);
		    day = dateStr.substring(6,8);
		    break;
		    
		case "YYYYMMDD HH:MI":
		    year = dateStr.substring(0,4);
		    month = dateStr.substring(4,6);
		    day = dateStr.substring(6,8);
		    hour = dateStr.substring(9,11);
		    minute = dateStr.substring(12,14);
		    break; 	
		case "YYYYMMDD HH:MI:SS":
		    year = dateStr.substring(0,4);
		    month = dateStr.substring(4,6);
		    day = dateStr.substring(6,8);
		    hour = dateStr.substring(9,11);
		    minute = dateStr.substring(12,14);
		    second = dateStr.substring(15,17);
		    break; 		
		    
		case "YYYY-MM":
		    if(!_checkSpecial(objName,dateStr,4,"-")) return false;
		    year = dateStr.substring(0,4);
		    month = dateStr.substring(5,7);
		    break;
		case "YYYY-MM-DD":
		    if(!_checkSpecial(objName,dateStr,4,"-")) return false;
		    if(!_checkSpecial(objName,dateStr,7,"-")) return false;
		    year = dateStr.substring(0,4);
		    month = dateStr.substring(5,7);
		    day = dateStr.substring(8,10);		    
		    break;
		case "YYYY-MM-DD HH:MI:SS":
		    if(!_checkSpecial(objName,dateStr,4,"-")) return false;
		    if(!_checkSpecial(objName,dateStr,7,"-")) return false;
		    year = dateStr.substring(0,4);
		    month = dateStr.substring(5,7);
		    day = dateStr.substring(8,10);
		    hour = dateStr.substring(11,13);
		    minute = dateStr.substring(14,16);
		    second = dateStr.substring(17,19);
		    break; 
		case "YYYY-MM-DD HH:MI":
		    if(!_checkSpecial(objName,dateStr,4,"-")) return false;
		    if(!_checkSpecial(objName,dateStr,7,"-")) return false;
		    year = dateStr.substring(0,4);
		    month = dateStr.substring(5,7);
		    day = dateStr.substring(8,10);
		    hour = dateStr.substring(11,13);
		    minute = dateStr.substring(14,16);
		    break; 
		    
		case "MM-DD-YYYY":
		    if(!_checkSpecial(objName,dateStr,2,"-")) return false;
		    if(!_checkSpecial(objName,dateStr,5,"-")) return false;
		    year = dateStr.substring(7,10);
		    month = dateStr.substring(0,2);
		    day = dateStr.substring(4,6);		    
		    break;
		case "MM-DD-YYYY HH:MI:SS":
		    if(!_checkSpecial(objName,dateStr,2,"-")) return false;
		    if(!_checkSpecial(objName,dateStr,5,"-")) return false;
		    year = dateStr.substring(6,10);
		    month = dateStr.substring(0,2);
		    day = dateStr.substring(3,5);		    
		    break;
		case "DD-MM-YYYY":
		    if(!_checkSpecial(objName,dateStr,2,"-")) return false;
		    if(!_checkSpecial(objName,dateStr,5,"-")) return false;
		    year = dateStr.substring(7,10);
		    month = dateStr.substring(3,5);
		    day = dateStr.substring(0,2);		    
		    break;
		case "DD-MM-YYYY HH:MI:SS":
		    if(!_checkSpecial(objName,dateStr,2,"-")) return false;
		    if(!_checkSpecial(objName,dateStr,5,"-")) return false;
		    year = dateStr.substring(7,10);
		    month = dateStr.substring(3,5);
		    day = dateStr.substring(0,2);		    
		    break;
		    
		default:
		    alert(objName+"�ж����ʱ���ʽ�����ܴ���!");
		    return false;		    
	}
	//check year
	if(year != null){
		year = parseInt(year,10);		
	    if(isNaN(year)){	
	    	alert(objName+" ��� �зǷ��ַ�,�봦������!");
			return false;
	    }    	
        if(year<1900 || year>2200){
                alert(objName+" ��� Ӧ����1900��2200֮�䣬���������룡");
                return false;
        }
	    
	}
	//check month
	if(month != null){
		monthtmp=month;
		month = parseInt(month,10);
	    if(isNaN(month)||monthtmp.indexOf("-")>-1){	 
	    	alert(objName+" �·� �зǷ��ַ�,�봦������!");
			return false;
		}   	
        if(month<1 || month >12){
                alert(objName+" �·� Ӧ����1��12֮�䣬���������룡");
                return false;
        }	    
	}
	//check day
	if(day != null){
		daytmp=day;
		day = parseInt(day,10);
	    if(isNaN(day)||daytmp.indexOf("-")>-1){	
	    	alert(objName+" �� �зǷ��ַ�,�봦������!");
			return false;
		}    	
        if((day < 1)||(day>31)){
                alert(objName+" �� �������1��31֮�䣡");
                return false;
         }
         else if(day>28 && day<31){
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
	//check hour
	if(hour != null){
		hour = parseInt(hour,10);
	    if(isNaN(hour)){
	    	alert(objName+"Сʱ�зǷ��ַ�,�봦������!");
			return false;
		}	    	
        if(hour<0 || hour >23){
                alert(objName+"СʱӦ����0��23֮�䣬���������룡");
                return false;
        }	    
	}
	//check minute
	if(minute != null){
		minute = parseInt(minute,10);
	    if(isNaN(minute)){
	    	alert(objName+"�����зǷ��ַ�,�봦������!");
			return false;
		}	    	
        if(minute<0 || minute >59){
                alert(objName+"СʱӦ����0��59֮�䣬���������룡");
                return false;
        }	   
	}
	//check second
	if(second != null){
		second = parseInt(second,10);
	    if(isNaN(second)){	   
	    	alert(objName+"���зǷ��ַ�,�봦������!");
			return false;
		} 	
        if(second<0 || second >59){
                alert(objName+"��Ӧ����0��59֮�䣬���������룡");
                return false;
        }	    
	}	
	return true;	
}
/**
*@description ��ȡʱ������
*@param format
*        �ܴ���ĸ�ʽ:
*        YYYY,
*		 YYYYMM,YYYYMMDD,YYYYMMDD HH:MI:SS,
*        YYYY-MM,YYYY-MM-DD,YYYY-MM-DD HH:MI:SS,
*@return String 
*/
function _getDateMask(format){
        var mask;
     switch (format) {
		case "YYYY":
			mask = "    ";
			break;
		case "YYYYMM":
		    mask = "      ";
		    break;
		case "YYYYMMDD":
		    mask = "        ";
		    break;    
		case "YYYYMMDD HH:MI":
		    mask = "           :  ";
		    break; 
		case "YYYYMMDD HH:MI:SS":
		    mask = "           :  :  ";
		    break; 		
		    
		case "YYYY-MM":
		     mask = "    -  ";
		    break;
		case "YYYY-MM-DD":
		     mask = "    -  -  ";
		    break;
		case "YYYY-MM-DD HH:MI:SS":
		     mask = "    -  -     :  :  ";
		    break; 
		case "YYYY-MM-DD HH:MI":
		     mask = "    -  -     :  ";
		    break; 
		    
		case "MM-DD-YYYY":
		     mask = "  -  -    ";
		    break;		    
		case "MM-DD-YYYY HH:MI:SS":
		     mask = "  -  -       :  ";
		    break;		
		case "DD-MM-YYYY":
		     mask = "  -  -    ";
		    break;	
		case "DD-MM-YYYY HH:MI:SS":
		     mask = "  -  -       :  :  ";
		    break;	
		default:
			 mask = "    -  -  ";
	}
	return mask;
}
function _checkSpecial(objName,str,pos,identifier){
	if(str.substring(pos,pos+1) == identifier) return true;
	pos++;
	alert(objName+"�ĵ�"+pos+"λ������\""+identifier+"\"");
	return false;
}

/**
 *���ƣ�DTO_OnlyNumber()
 *���ܣ�onkeypress �¼�ʱ������Ҫ�����������ֻ�����������ַ�
 */
    function DTO_OnlyNumber()
    {      
      var key = window.event.keyCode ;
      //��Ч����: 0��9,-,:,�ո� ,      
      if( (key <= 57 && key >= 48) || key == 45 || key == 58 || key == 32)  return true;
      window.event.keyCode = 0;      
      return false;
    }

    //�ĵ�����׼����ɺ��һЩ����
    function DTO_onDocumentReady() {    	 	 	    	  	
		//    	var id = this.edtObj.id;    	
		//    	if(id != null && ""+id != "undefined" && ""+id == "")	id = this.edtObj.name;       	   	 	
    	//var format = this.edtObj.getAttribute("dateformat");
    	
    	 //����ParentObj �ĳ�ʼ������  
          	 
    	 this.getParentObj().onReady();
    	 
    	 var format = this.edtObj.dateformat;
	    var defaultValue = this.edtObj.defaultValue;
	    
	    	       	
	    if(format == null || format == "" || format == "undenfied"){
	    	format="YYYY-MM-DD";			        
	    	this.edtObj.dateformat = format;
	    }	  
	    this.edtObj.maxLength = format.length;  	       
	    //this.edtObj.value = this.getDateMask(format);		    
    	
    	//�ж��Ƿ��Ѿ�����ͼƬ��,���Ѿ�������,����Ҫ���²���
    	var haveImg = this.edtObj.getAttribute("haveImg");
        
    	//����notShowImg�����������Ƿ���ʾͼƬ
    	if(this.edtObj.notShowImg == null && haveImg == null||this.edtObj.oImg==null){
    		//�������֮������һ��ͼƬ��ť
    		//this.edtObj.width = this.edtObj.offsetWidth - 20;   
    		
    		//ʱ��ؼ����� popup ���ԣ��Ӷ����Կ��ƿؼ��ĵ���λ�� 2003-12-09
    		var position = this.edtObj.popup;
		
	    	this.edtObj.oImg = document.createElement("<img id='dateimg' name='dateimg'  align='middle' popup='"+position+"'>");
	    	this.edtObj.oImg.src = unieap.WEB_APP_NAME+"/unieap/images/unieap/time.gif"; //modify by hugh 2003/05/12              	
	    	this.edtObj.parentElement.insertBefore(this.edtObj.oImg, this.edtObj.nextSibling);
            this.edtObj.oImg.onclick =   function() {                
                var x = window.event.x;
                var y = window.event.y;
            //��൯��
                if(this.popup.toUpperCase() == "LEFT"){
                //alert("this.popup="+this.popup);
                    x=x-200;
                }
                //���ϲ൯��
                else if(this.popup.toUpperCase() == "LTOP"){
                    x=x-200;
                    y=y-250;
                }
                //���ϲ൯��
                else if(this.popup.toUpperCase() == "RTOP"){
                    y=y-250;
                }
            if(format=="YYYY-MM-DD HH:MI:SS" || format=="YYYYMMDD HH:MI:SS" || format=="YYYYMMDD HH:MI" || format=="YYYY-MM-DD HH:MI"){
                    riliShow(0,obj,defaultValue,y,x);
                }else{
                    riliShow(1,obj,defaultValue,y,x);
                }
              //  show_calendar(obj,'','',obj.dateformat);               
            };
	    	//var isreadonly = this.edtObj.getAttribute("isreadonly").toLowerCase();
	    	//var isreadonly = this.edtObj.isreadonly.toLowerCase();
           
	    	if(this.edtObj.disabled || this.edtObj.readOnly ){
	    			this.edtObj.readOnly = true;
	    	}
	    	this.edtObj.haveImg = "true";
	    
    	}       
         // if set the attribute of readOnly is true 
                
         if(this.edtObj.readOnly!=null&&this.edtObj.readOnly==true){            
           
            this.edtObj.oImg.src = unieap.WEB_APP_NAME+"/unieap/images/unieap/time_disabled.gif";
            this.edtObj.oImg.style.cursor = "";
            this.edtObj.oImg.alt = "";
            this.edtObj.oImg.disabled = true;
            return;
         }
         else{            
             
            this.edtObj.oImg.src = unieap.WEB_APP_NAME+"/unieap/images/unieap/time.gif";
            var obj = this.edtObj;
            this.edtObj.oImg.style.cursor = "hand";
            this.edtObj.oImg.alt = "�������������˵�";
            this.edtObj.oImg.disabled = false;
         }   
         
            
    	if(this.edtObj.age!=null && this.edtObj.age !=""){
    	   this.edtObj.document.all[this.edtObj.age].value=0;
    	}    		
    	//��Ĭ�ϸ�ʽת����ָ����ʽ
    	var defualtFormat = "2003-05-13 00:00:00.0";        	
    	if(this.edtObj.value !="" && this.edtObj.value.length == defualtFormat.length){  
    				
    	    this.edtObj.value = this.edtObj.value.substring(0,20);     	     	    
    		switch (format) {
				case "YYYY":
					this.edtObj.value = this.edtObj.value.substring(0,4);
					break;
				case "YYYYMM":
				    this.edtObj.value = this.edtObj.value.substring(0,4) + this.edtObj.value.substring(5,7);				
				    break;
				case "YYYYMMDD":					
				    this.edtObj.value = this.edtObj.value.substring(0,4) + this.edtObj.value.substring(5,7) + this.edtObj.value.substring(8,10);				
				    break;	
				    
				case "YYYYMMDD HH:MI":
				   this.edtObj.value = this.edtObj.value.substring(0,4) + this.edtObj.value.substring(5,7) + this.edtObj.value.substring(8,10) + this.edtObj.value.substring(10,16);				
				    break; 				    
				case "YYYYMMDD HH:MI:SS":
				   this.edtObj.value = this.edtObj.value.substring(0,4) + this.edtObj.value.substring(5,7) + this.edtObj.value.substring(8,10) + this.edtObj.value.substring(10);				
				    break; 		
				    
				case "YYYY-MM":
				    this.edtObj.value = this.edtObj.value.substring(0,7);								    
				    break;
				case "YYYY-MM-DD":				   
				    this.edtObj.value = this.edtObj.value.substring(0,10);
				    break;
				case "YYYY-MM-DD HH:MI":
					 this.edtObj.value = this.edtObj.value.substring(0,10)+ this.edtObj.value.substring(10,16);
				    break;
				case "YYYY-MM-DD HH:MI:SS":
				    break;
				    
				case "MM-DD-YYYY":
				    this.edtObj.value = this.edtObj.value.substring(5,7)+"-"+ this.edtObj.value.substring(8,10)+"-"+this.edtObj.value.substring(0,4);
				    break;
				case "MM-DD-YYYY HH:MI:SS":
				    this.edtObj.value =  this.edtObj.value.substring(5,7)+"-"+ this.edtObj.value.substring(8,10)+"-"+this.edtObj.value.substring(0,4) + this.edtObj.value.substring(10);				
				    break;
			   case "DD-MM-YYYY":
				    this.edtObj.value = this.edtObj.value.substring(8,10)+"-"+this.edtObj.value.substring(5,7)+"-"+this.edtObj.value.substring(0,4);				
				    break;
				case "DD-MM-YYYY HH:MI:SS":
				    this.edtObj.value = this.edtObj.value.substring(8,10)+"-"+this.edtObj.value.substring(5,7)+"-"+this.edtObj.value.substring(0,4)+ this.edtObj.value.substring(10);							
				    break;
				    	
				default:
				    alert(this.edtObj.prompt+"�ж����ʱ���ʽ�����ܴ���!");
				    return false;
		    	}
		}	
    }


	function DTO_eventBand(){
		this.getBaseObj().eventBand("onkeypress","OnlyNumber()")
	}