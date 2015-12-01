/****************************************************
*  Note  :elarp form \u62bd\u53d6\u8868\u5355\u4e2d\u4e1a\u52a1\u5904\u7406\u7684\u516c\u5171\u65b9\u6cd5
*  author:app
*  date  :2005.10.12
*****************************************************/

/**
 * \u5b58\u653e\u8868\u5355\u4e2d\u9700\u8981\u7684\u5168\u5c40\u5e38\u91cf\u6807\u8bc6
 * author:micy@neusoft.com
 * date  :2005.10.22
 */
function Globals_Params(){

    this.WEB_APP_NAME  = "mydomain";
    this.DEBUG         = false;
    
    //\u8fd4\u56de\u7ed3\u679c\u5206\u5272\u7b26
    this.resultSplit = "|";
    //\u4e1a\u52a1\u7c7b\u578b\u6807\u8bc6
    this.BizType =  "bizType";
    //\u63a5\u4ef6\u7f16\u53f7\u6807\u8bc6
	this.ReceiveID = "receiveID";
	//\u8282\u70b9\u5b9a\u4e49\u6807\u8bc6
	this.ActDefID = "actDefID";
	//\u6587\u4ef6\u4e0a\u4f20\u63a7\u4ef6\u6807\u8bc6
	this.FileUpload = "fileUpload";
	
    //\u63a2\u77ff\u5750\u6807\u4e32\u6807\u51c6\u683c\u5f0f
    this.COORDFORMAT_PROSPECT="1"; 
    //\u91c7\u77ff\u5750\u6807\u4e32\u6807\u51c6\u683c\u5f0f
    this.COORDFORMAT_MINING="2";
    
    //\u7ecf\u7eac\u5ea6\u5750\u6807
    this.COORDTYPE_A = "0";
    
    //GIS \u5750\u6807\u63a7\u4ef6\u6807\u8bc6
    this.GISCoords  = "giscoords";
    //GIS \u5750\u6807\u7b80\u56fe\u6807\u8bc6
    this.GISMap  = "gismap";
    //GIS \u5750\u6807\u7f13\u5b58\u9690\u85cf\u57df\u6807\u8bc6
    this.GISHidCoord  = "txt_hidCoord";
    
    //\u57fa\u672c\u533a\u5757\u6570
    this.GISBasicSection  = "txt_basicSection";
    //1/4\u533a\u5757\u6570
    this.GISQuarterSection = "txt_quarterSection";
    //1/16\u533a\u5757\u6570
    this.GISLittleSection = "txt_littleSection";
    //\u603b\u9762\u79ef
    this.GISTotalArea = "total_area";
    //\u56fe\u5e45\u53f7
    this.GISFrameNo = "txt_frameNo";
    //\u5f00\u91c7\u6df1\u5ea6\u8d77
    this.GISDeepUP="deep_up";
    //\u5f00\u91c7\u6df1\u5ea6\u6b62
    this.GISDeepDown="deep_down";
    
    //\u4e1c\u7ecf\u8d77
    this.GISLongeastStart = "longeast_start";  	    
	//\u4e1c\u7ecf\u6b62
	this.GISLongeastEnd = "longeast_end";  	  
	//\u5317\u7eac\u8d77
	this.GISLatnorthStart = "latnorth_start";  	 
	//\u5317\u7eac\u6b62
	this.GISLatnorthEnd = "latnorth_end"; 
	
	//\u91c7\u77ff\u6743\u4f7f\u7528\u8d39
	this.UseFee = "usefee"
	
	//\u4e1c\u7ecf\u8d77\u663e\u793a\u6807\u793a
    this.GISLongeastStartView = "longeast_start_view";  	    
	//\u4e1c\u7ecf\u6b62\u663e\u793a\u6807\u793a
	this.GISLongeastEndView  = "longeast_end_view";  	  
	//\u5317\u7eac\u8d77\u663e\u793a\u6807\u793a
	this.GISLatnorthStartView  = "latnorth_start_view";  	 
	//\u5317\u7eac\u6b62\u663e\u793a\u6807\u793a
	this.GISLatnorthEndView  = "latnorth_end_view";  
	
	//\u77ff\u4ea7\u4ee3\u7801 -- \u63a2\u77ff\u57fa\u672c\u533a\u5757\u6570\u6821\u9a8c
	this.MineCode = "kanchakuangzhong";
	
	//session\u4e2d\u8bbe\u7f6e\u5750\u6807\u6570\u636e\u7684key\u503c
	this.CroodString="coordstring";
	
	//\u4ee5\u4e0b\u8bbe\u7f6e\u76ee\u524d\u5404\u4e2a\u5e94\u7528\u7684\u9879\u76ee\u7c7b\u578b\u63cf\u8ff0
	
	this.biz401="\u63a2\u77ff\u6743\u65b0\u7acb";
	this.biz402="\u63a2\u77ff\u6743\u5ef6\u7eed";
	this.biz403="\u63a2\u77ff\u6743\u6ce8\u9500";
	this.biz407="\u63a2\u77ff\u6743\u4fdd\u7559";
	this.biz408="\u63a2\u77ff\u6743\u53d8\u66f4";
	this.biz415="\u5730\u8d28\u8c03\u67e5"; 
	
	this.biz421="\u91c7\u77ff\u6743\u65b0\u7acb";
	this.biz422="\u91c7\u77ff\u6743\u8f6c\u8ba9";
	this.biz423="\u91c7\u77ff\u6743\u5ef6\u7eed";
	this.biz424="\u91c7\u77ff\u6743\u53d8\u66f4";
	this.biz425="\u91c7\u77ff\u6743\u6ce8\u9500";
	this.biz426="\u5212\u5b9a\u77ff\u533a";
	

}
var globalsParams = new Globals_Params();

/**
 * \u5c40\u90e8\u5237\u65b0\u65b9\u6cd5\uff1a\u4f7f\u7528post\u65b9\u5f0f\u8fdb\u884c\u53c2\u6570\u4f20\u9012
 * author:micy@neusoft.com
 * date  :2005.10.10
 */
function postProxyRequest(action, method, parameter) {
    var objXMLReq = new ActiveXObject("Microsoft.XMLHTTP");
    var strURL = action ;
    if(method != null && method != ""){
        strURL += "?method=" + method;
    }
    
    if(parameter != null && parameter != ""){
    	strURL += "&isPartlyRefresh=true";
    	objXMLReq.open("POST", strURL, false);
    	objXMLReq.send(parameter);
    }
    
    //TestAlert(strURL);

    var strResult = objXMLReq.responseText;
    return strResult;
}


function testNum(strNum){
   if(strNum.indexOf("+")==0){
   	return (0);
   }
   if (isNaN(strNum)) {
		return (0);	
   }else 
	{   isInt=true;
	    for (i=0;i<strNum.length;i++)			 
	    {   a=strNum.charAt(i)
	  	if(a==".")
        	{   isInt=false;
        	    break;
        	}
            }
        	if (isInt==true) return (1);
        	else return (2);
	}
}

/**
 * \u6839\u636e\u4e1a\u52a1\u7c7b\u578b\u83b7\u53d6\u4e1a\u52a1\u63cf\u8ff0
 * author:micy@neusoft.com
 * date  :2005.12.05
 */
function GetBizName(bizType) {
	if(bizType=="401")
		return globalsParams.biz401;
	if(bizType=="402")
		return globalsParams.biz402;
	if(bizType=="403")
		return globalsParams.biz403;		
	if(bizType=="407")
		return globalsParams.biz407;
	if(bizType=="408")
		return globalsParams.biz408;		
	if(bizType=="415")
		return globalsParams.biz415;	
		
	if(bizType=="421")
		return globalsParams.biz421;
	if(bizType=="422")
		return globalsParams.biz422;
	if(bizType=="423")
		return globalsParams.biz423;		
	if(bizType=="424")
		return globalsParams.biz424;
	if(bizType=="425")
		return globalsParams.biz425;		
	if(bizType=="426")
		return globalsParams.biz426;		
}

/**
 * \u5b57\u7b26\u8f6c\u6362\u5de5\u5177
 * author:micy@neusoft.com
 * date  :2005.12.07
 */
function  Encode(code){
	if(code==null || code==""){
		return " ";
	}else{
		//return encodeURIComponent(code);
		//return encodeURI(code);
		return code;
	}

}



///////////////////////////////////////////////////////////////GIS START////////////////////////////////////////
/**
 * \u8868\u5355\u4e2dGIS\u56fe\u7684\u57fa\u672c\u663e\u793a
 *
 * author:mahaiy@neusoft.com
 * date  :2005.10.13
 */
 
function GisView(){

	var gisCoords = document.getElementById(globalsParams.GISCoords);
	var hidObj = document.getElementById(globalsParams.GISHidCoord);
	
	if(hidObj == null || hidObj == "")
	   return;
	   
	else{
	   	   
	   //\u4e1c\u7ecf\u8d77\u663e\u793a
	   var longeastStartView = document.getElementById(globalsParams.GISLongeastStartView);
	   if(longeastStartView != null){
	   	   var longeastStart = document.getElementById(globalsParams.GISLongeastStart);
	   	   longeastStartView.value = ZB_Exchange(longeastStart.value);
	   }
	   //\u4e1c\u7ecf\u6b62\u663e\u793a
	   var longeastEndView = document.getElementById(globalsParams.GISLongeastEndView);
	   if(longeastEndView != null){
	   	   var longeastEnd = document.getElementById(globalsParams.GISLongeastEnd);
	   	   longeastEndView.value = ZB_Exchange(longeastEnd.value);
	   }
	   //\u5317\u7eac\u8d77\u663e\u793a
	   var latnorthStartView = document.getElementById(globalsParams.GISLatnorthStartView);
	   if(latnorthStartView != null){
	   	   var latnorthStart = document.getElementById(globalsParams.GISLatnorthStart);
	   	   latnorthStartView.value = ZB_Exchange(latnorthStart.value);
	   }
	   //\u5317\u7eac\u6b62\u663e\u793a
	   var latnorthEndView = document.getElementById(globalsParams.GISLatnorthEndView);
	   if(latnorthEndView != null){
	   	   var latnorthEnd = document.getElementById(globalsParams.GISLatnorthEnd);
	   	   latnorthEndView.value = ZB_Exchange(latnorthEnd.value);
	   }
	   
	   if(gisCoords != null)
	       gisCoords.ZB_String = hidObj.value;
	   //\u7b80\u56fe\u663e\u793a
	   var gismap =  getFormObjectByName(globalsParams.GISMap);
	   if(gismap != null){
	   	   gismap.setPoints(gisCoords.ZB_JTString);
	   	   gismap.draw();
	   }
	}
	
}


/**
 * \u5750\u6807\u5199\u5165\u524d,\u6821\u9a8c\u5750\u6807\u683c\u5f0f\u7684\u6b63\u786e\u6027\uff08\u4e0d\u5206\u63a2\u77ff\u4e0e\u91c7\u77ff\uff09
 
 * author:mahaiy@neusoft.com
 * date  :2005.10.13
 */
function CheckCoordinate(objGis){
	var flag = objGis.Test_Flex_Data;
	if(flag == 0){
		return true;
	}else if(flag == 1){
    	alert("\u6570\u636e\u4e2d\u65e0\u6709\u6548\u533a\u57df");
    	return false;
	}else if(flag == 2){
    	alert("\u6570\u636e\u586b\u5199\u4e0d\u5b8c\u6574");
    	return false;
	}else if(flag == 3){
    	alert("\u67d0\u4e00\u533a\u57df\u62d0\u70b9\u4e2a\u6570\u5c0f\u4e8e3");
    	return false;
	}else if(flag == 4){
    	alert("\u7ecf\u5ea6(X)\u5750\u6807\u5217\u6570\u636e\u8d85\u8303\u56f4");
    	return false;
	}else if(flag == 5){
    	alert("\u7eac\u5ea6(Y)\u5750\u6807\u5217\u6570\u636e\u8d85\u8303\u56f4");
    	return false;
	}else if(flag == 6){
    	alert("\u5750\u6807\u8f93\u5165\u975e\u6570\u503c\u578b\u6570\u636e");
    	return false;
	}	else if(flag == 7){
	    alert("\u62d0\u70b9\u53f7\u672a\u586b\u5199\u6570\u503c");
	    return false;
	}else if(flag == 8){
	    alert("\u6027\u8d28\u6570\u636e\u586b\u5199\u9519\u8bef");
	    return false;
	}else if(flag == 9){
	    alert("\u6807\u9ad8\u5173\u7cfb\u586b\u5199\u9519\u8bef-\u6b62\u6807\u9ad8\u5e94\u5c0f\u4e8e\u8d77\u6807\u9ad8");
	    return false;
	}else if(flag == 10){
	    alert("\u62d0\u70b9\u53f7\u6570\u636e\u586b\u5199\u8d85\u957f(>8)");
	    return false;
	}else if(flag == 11){
	    alert("\u76f8\u90bb\u4e24\u70b9\u5750\u6807\u76f8\u540c");
	    return false;
	}else if(flag == 12){
	    alert("\u62d0\u70b9\u53f7\u5217\u672a\u586b\u5199\u6570\u503c");
	    return false;
	}else if(flag == -1){
	    alert("\u672a\u77e5\u9519\u8bef");
	    return false;
	}
	
}


/**
 * \u5750\u6807\u8f6c\u6362\u524d,\u6821\u9a8c\u5750\u6807\u683c\u5f0f\u7684\u6b63\u786e\u6027\uff08\u4e0d\u5206\u63a2\u77ff\u4e0e\u91c7\u77ff\uff09
 
 * author:micy@neusoft.com
 * date  :2005.10.25
 */
function ConvertCheckCoordinate(objGis){
	var flag = objGis.Test_Flex_Data_CH;
	if(flag == 0){
		return true;
	}else if(flag == 1){
    	alert("\u6570\u636e\u4e2d\u65e0\u6709\u6548\u533a\u57df");
    	return false;
	}else if(flag == 2){
    	alert("\u6570\u636e\u586b\u5199\u4e0d\u5b8c\u6574");
    	return false;
	}else if(flag == 3){
    	alert("\u67d0\u4e00\u533a\u57df\u62d0\u70b9\u4e2a\u6570\u5c0f\u4e8e3");
    	return false;
	}else if(flag == 4){
    	alert("\u5750\u6807\u5217\u6570\u636e\u8d85\u8303\u56f4");
    	return false;
	}else if(flag == 5){
    	alert("\u5750\u6807\u8f93\u5165\u975e\u6570\u503c\u578b\u6570\u636e");
    	return false;
	}else if(flag == -1){
    	alert("\u65e0\u9700\u8f6c\u6362");
    	return false;
	}
	
}

/**
 * \u7a7a\u95f4\u53e0\u52a0\u524d,\u6821\u9a8c\u5750\u6807\u683c\u5f0f\u7684\u6b63\u786e\u6027\uff08\u4e0d\u5206\u63a2\u77ff\u4e0e\u91c7\u77ff\uff09
 
 * author:micy@neusoft.com
 * date  :2005.10.25
 */
function CutoutCheckCoordinate(objGis){
	var flag = objGis.Test_Flex_Data_DJ;
	if(flag == 0){
		return true;
	}else if(flag == 1){
    	alert("\u6570\u636e\u4e2d\u65e0\u6709\u6548\u533a\u57df");
    	return false;
	}else if(flag == 2){
    	alert("\u6570\u636e\u586b\u5199\u4e0d\u5b8c\u6574");
    	return false;
	}else if(flag == 3){
    	alert("\u67d0\u4e00\u533a\u57df\u62d0\u70b9\u4e2a\u6570\u5c0f\u4e8e3");
    	return false;
	}else if(flag == 4){
    	alert("\u5750\u6807\u5217\u6570\u636e\u8d85\u8303\u56f4");
    	return false;
	}else if(flag == 5){
    	alert("\u5750\u6807\u8f93\u5165\u975e\u6570\u503c\u578b\u6570\u636e");
    	return false;
	}else if(flag == -1){
    	alert("\u65e0\u9700\u53e0\u52a0");
    	return false;
	}
	
}

/**
 * GIS\u6253\u5f00\u5750\u6807\u683c\u5f0f\u6587\u4ef6\uff0c\u8bfb\u5165\u5750\u6807\u63a7\u4ef6
 * \u9690\u542b\u5165\u53e3\u53c2\u6570\uff1afileObj\u2014\u2014\u6587\u4ef6\u5bf9\u8c61
 * \u9690\u542b\u5165\u53e3\u53c2\u6570\uff1ahidObj\u2014\u2014\u9690\u542b\u7684\u5750\u6807\u5bb9\u5668\u5bf9\u8c61
 
 * author:micy@neusoft.com
 * date  :2005.10.22
 */
function GISImportCoordFromFile(){

	var fileObj = document.getElementsByName(globalsParams.FileUpload)[0];
	var hidObj = document.getElementById(globalsParams.GISHidCoord);
	var gisCoords = document.getElementById(globalsParams.GISCoords);
   //\u53d6\u6587\u4ef6\u540d
   var fileName = fileObj.value;
   if( !fileName || fileName==""){
   	 alert("\u6587\u4ef6\u540d\u4e0d\u80fd\u4e3a\u7a7a\uff0c\u8bf7\u6b63\u786e\u9009\u62e9\uff01");
     return false;
   }
   
   //\u521b\u5efa\u6587\u4ef6\u64cd\u4f5c\u5bf9\u8c61
   var  fso = new ActiveXObject("Scripting.FileSystemObject");

    //\u4ee5\u8bfb\u65b9\u5f0f\u6253\u5f00\u6587\u4ef6
    var forReading = 1;
    
     // \u6253\u5f00\u6587\u4ef6 
    var  objTStream = fso.OpenTextFile(fileName, forReading); 
    
    // \u8bfb\u53d6\u6587\u4ef6\u5185\u5bb9\u5230\u5b57\u7b26\u4e32 
    var str = objTStream.ReadAll(); 
    // \u663e\u793a\u5b57\u7b26\u4e32\u4fe1\u606f 
    //alert("File contents = '" + str + "'"); 
    
    gisCoords.ZB_String_Add = str;
    
    // \u5173\u95ed\u6587\u4ef6 
     objTStream.Close(); 
  
}

/**
 * \u6839\u636eGIS\u5750\u6807\u8fdb\u884c\u57fa\u672c\u533a\u5757\u7b49\u503c\u7684\u8ba1\u7b97
 * \u5165\u53e3\u53c2\u6570\uff1astrCoord\u2014\u2014\u5750\u6807\u4e32
 
 * author:mahaiy@neusoft.com
 * date  :2005.10.13
 */
function GISCalculate(strCoord){

    var action =  globalsParams.WEB_APP_NAME +"/prospecting/prosGis.do";
    var method = "calculate";
    var param = "strCoord="+strCoord;
    var tempObj = null;
    
    var mineCode = "null";
    tempObj	= document.getElementsByName(globalsParams.MineCode)[0];
    if(tempObj != null){
    	mineCode = tempObj.value;
    }
    param = param + "&mineCode="+mineCode;
    
    var result = postProxyRequest(action,method,param);
   
    if(result.indexOf("true:") == 0){
    
    	result = result.substring(5);
    	
    	var strArr =  result.split(globalsParams.resultSplit); 

    	//\u8ba1\u7b97\u57fa\u672c\u533a\u5757\u6570
	    tempObj = document.getElementsByName(globalsParams.GISBasicSection)[0];
	    if(tempObj != null)
	    	tempObj.value=strArr[0];
	    
	    //1/4\u533a\u5757  
	    tempObj = document.getElementsByName(globalsParams.GISQuarterSection)[0];
	    if(tempObj != null)
	    	tempObj.value = strArr[1];
	    
	    //1/16\u533a\u5757\u6570
	    tempObj = document.getElementsByName(globalsParams.GISLittleSection)[0];
	    if(tempObj != null)
	    	tempObj.value=strArr[2];
	 
	 /*zhouqiang20070516 DEL \u5ef6\u7eed\u4e5f\u8ba1\u7b97\u603b\u9762\u79ef
	 
	   ///zhouqiang 20070301--------ADD----------
	    bizT = document.getElementsByName("bizType")[0];
	    
	    if(bizT != null && bizT.value!='402' ){//\u5ef6\u7eed\u4e0d\u8ba1\u7b97\u603b\u9762\u79ef
	    //\u603b\u9762\u79ef
	    tempObj = document.getElementsByName(globalsParams.GISTotalArea)[0];
	    if(tempObj != null)	    
	    	tempObj.value=strArr[3];
	    }
	    zhouqiang20070516 DEL END */
	    //zhouqiang20070516 ADD \u5ef6\u7eed\u4e5f\u8ba1\u7b97\u603b\u9762\u79ef
	    tempObj = document.getElementsByName(globalsParams.GISTotalArea)[0];
	    if(tempObj != null)	    
	    	tempObj.value=strArr[3];
	    //zhouqiang20070516 ADD \u5ef6\u7eed\u4e5f\u8ba1\u7b97\u603b\u9762\u79ef	
	    //\u4e1c\u7ecf\u8d77
	    tempObj = document.getElementsByName(globalsParams.GISLongeastStart)[0];
	    if(tempObj != null)	    
	    	tempObj.value=strArr[4];
	    
	    //\u4e1c\u7ecf\u6b62
	    tempObj = document.getElementsByName(globalsParams.GISLongeastEnd)[0];
	    if(tempObj != null)	    
	    	tempObj.value=strArr[5];
	    
	    //\u5317\u7eac\u8d77
	    tempObj = document.getElementsByName(globalsParams.GISLatnorthStart)[0];
	    if(tempObj != null)	    
	    	tempObj.value=strArr[6];
	    
	    //\u5317\u7eac\u6b62
	    tempObj = document.getElementsByName(globalsParams.GISLatnorthEnd)[0];
	    if(tempObj != null)	    
	    	tempObj.value=strArr[7];
	    //\u56fe\u5e45\u53f7
	    tempObj = document.getElementsByName(globalsParams.GISFrameNo)[0];
	    if(tempObj != null)	    
	    	tempObj.value=strArr[8];
	  
	    if(mineCode!="null" && mineCode!=""){
	    	var sectionFlage = strArr[9];
	    	
		    if(sectionFlage=="-1"){
		    	alert("\u6570\u636e\u5e93\u4e2d\u6ca1\u6709\u77ff\u4ea7\u4ee3\u7801\u4e3a "+mineCode+" \u7684 \u533a\u5757\u6570\u6570\u636e\uff01");
		    }else if(parseInt(sectionFlage)>1){
		    	alert("\u533a\u5757\u603b\u6570\u8d85\u8fc7\u4e86\u56fd\u5bb6\u9881\u5e03\u7684\u5141\u8bb8\u533a\u5757\u6570("+sectionFlage+")!");
		    }
	    }

	    
    	return true;
    }else{
        alert("\u6839\u636eGIS\u5750\u6807\u8fdb\u884c\u57fa\u672c\u533a\u5757\u7b49\u503c\u7684\u8ba1\u7b97\u5931\u8d25\uff01");
    	return false;
    }

}


/**
 * \u5750\u6807\u8f6c\u6362\uff1a\u5c06 \u539f\u683c\u5f0f\u7684\u5750\u6807 \u8f6c\u6362\u4e3a \u76ee\u7684\u683c\u5f0f\u7684\u5750\u6807
 * \u5165\u53e3\u53c2\u6570\uff1aoriginType\u2014\u2014\u5750\u6807\u7c7b\u578b\uff08\u63a2\u77ff 1 \uff0c\u91c7\u77ff 2\uff09
 * \u5165\u53e3\u53c2\u6570\uff1aobjectType\u2014\u2014\u76ee\u7684\u7c7b\u578b
 * \u5165\u53e3\u53c2\u6570\uff1astrCoord\u2014\u2014\u5750\u6807\u4e32
 
 * author:micy@neusoft.com
 * date  :2005.10.22
 */
function GISCoordConvert(originType,objectType,strCoord){

    var action =  globalsParams.WEB_APP_NAME +"/prospecting/prosGis.do";
    var method = "coordConvert";
    var param = "originType="+originType+"&objectType="+objectType+"&strCoord="+strCoord;
    
    var strReturn = postProxyRequest(action,method,param);
    //var cmdArr =  strReturn.split("RESPONSE_SEPARATOR"); 
    //var pos = cmdArr[0].indexOf("=");  
    //var strReturn = cmdArr[0].substring(pos+1);
    
    TestAlert("strReturn="+strReturn);
    
    if(strReturn.indexOf("true:") == 0){
        strReturn = strReturn.substring(5);
        TestAlert(param);
        //\u5750\u6807\u7c7b\u578b==\u63a2\u77ff
        if(originType==1){
 			var hidObj = document.getElementById(globalsParams.GISHidCoord);
 			hidObj.value = strReturn;         
        }
 
 		return strReturn;
 		
	}else{
	     alert("GIS\u5750\u6807\u8f6c\u6362\u5931\u8d25\uff01");
		 flag = false;
		 return flag;

	}
}

/**
 * \u7a7a\u95f4\u53e0\u52a0\uff1a\u5c06\u4e3b\u533a\u57df\u4e0e\u5176\u5b83\u533a\u57df\u6316\u7a7a\u90e8\u5206\u53bb\u6389\u540e\uff0c\u518d\u5c06\u4e0e\u5176\u5b83\u533a\u57df\u91cd\u53e0\u7684\u90e8\u5206\u53bb\u6389\u540e\u7684\u90e8\u5206\u6807
 * \u5165\u53e3\u53c2\u6570\uff1aoriginType\u2014\u2014\u5750\u6807\u7c7b\u578b\uff08\u63a2\u77ff 1 \uff0c\u91c7\u77ff 2\uff09
 * \u5165\u53e3\u53c2\u6570\uff1aobjectType\u2014\u2014\u76ee\u7684\u7c7b\u578b
 * \u5165\u53e3\u53c2\u6570\uff1astrCoord\u2014\u2014\u5750\u6807\u4e32
 //
 * author:micy@neusoft.com
 * date  :2005.10.22
 */
function GISCoordCutOut(originType,objectType,strCoord){
    var action =  globalsParams.WEB_APP_NAME +"/prospecting/prosGis.do";
    var method = "coordCutOut";
    var param = "originType="+originType+"&objectType="+objectType+"&strCoord="+strCoord;
    var strReturn = postProxyRequest(action,method,param);
    
    if(strReturn.indexOf("true:") == 0){
        strReturn = strReturn.substring(5);
        
		var hidObj = document.getElementById(globalsParams.GISHidCoord);
 		hidObj.value = strReturn;   
 		return strReturn;
 		
	}else{
    	 alert("\u7a7a\u95f4\u53e0\u52a0\u5931\u8d25\uff01");
		 flag = false;
		 return flag;

	}
}

/**
 * \u56fe\u5f62\u7f16\u8f91\uff1a\u901a\u8fc7\u7f16\u8f91\u5750\u6807\u4e32\u5b8c\u6210\u6dfb\u52a0\u3001\u4fee\u6539\u56fe\u5f62\u7684\u529f\u80fd
 * \u5165\u53e3\u53c2\u6570\uff1abizType\u2014\u2014\u4e1a\u52a1\u7c7b\u578b
 * \u5165\u53e3\u53c2\u6570\uff1aactDefID\u2014\u2014\u8282\u70b9\u5b9a\u4e49\u6807\u793a
 * \u5165\u53e3\u53c2\u6570\uff1astrCoord\u2014\u2014\u5750\u6807\u4e32
 
 * author:micy@neusoft.com
 * date  :2005.10.25
 */
function GISCoordEdit(bizType,actDefID,strCoords){

    var action =  globalsParams.WEB_APP_NAME +"/prospecting/prosGis.do";
    var method = "coordEdit";
    var param = "strCoord="+strCoords;
    var strReturn = postProxyRequest(action,method,param);
    
	var url =  "/"+ globalsParams.WEB_APP_NAME +"/elarpGISPortal/maplogin.jsp?envtype="+bizType+"&protype=4&cantoncode=0&actdefid="+actDefID;
	//TestAlert(url);
	var win = eval("window");
	win.open(url, "egovaGis", "menubar=0,toolbar=0,directories=0,scrollbars=1,resizable=1,left=0 ,top=0,width=" + (screen.availWidth - 10) + ",height=" + (screen.availHeight -25));
	
}

/**
 * \u56fe\u6d4f\u89c8:\u901a\u8fc7\u5750\u6807\u4e32\u5b8c\u6210\u56fe\u5f62\u7684\u6d4f\u89c8\u529f\u80fd
 * \u5165\u53e3\u53c2\u6570\uff1abizType\u2014\u2014\u4e1a\u52a1\u7c7b\u578b
 * \u5165\u53e3\u53c2\u6570\uff1astrCoord\u2014\u2014\u5750\u6807\u4e32
 
 * author:micy@neusoft.com
 * date  :2005.12.3
 */
function GISCoordView(bizType,strCoords){
    var action =  globalsParams.WEB_APP_NAME +"/prospecting/prosGis.do";
    var method = "coordEdit";
    var param = "strCoord="+strCoords;
    var strReturn = postProxyRequest(action,method,param);
    
	var url =  "/"+ globalsParams.WEB_APP_NAME +"/elarpGISPortal/maplogin.jsp?envtype="+bizType+"&protype=4&cantoncode=0&actdefid=0";
	//TestAlert(url);
	var win = eval("window");
	win.open(url, "egovaGis", "menubar=0,toolbar=0,directories=0,scrollbars=1,resizable=1,left=0 ,top=0,width=" + (screen.availWidth - 10) + ",height=" + (screen.availHeight -25));

}

/**
 * \u63a2\u77ff\u77ff\u6743\u91cd\u53e0\u68c0\u67e5\uff1a\u901a\u8fc7\u7f16\u8f91\u5750\u6807\u8fdb\u884c\u68c0\u67e5\u64cd\u4f5c,\u8fd4\u56detrue\u8868\u793a\u6821\u9a8c\u901a\u8fc7\uff0c\u5426\u5219\u8868\u793a\u6709\u91cd\u53e0\u73b0\u8c61
 * \u5165\u53e3\u53c2\u6570\uff1abizType\u2014\u2014\u4e1a\u52a1\u7c7b\u578b
 * \u5165\u53e3\u53c2\u6570\uff1aactDefID\u2014\u2014\u8282\u70b9\u5b9a\u4e49\u6807\u793a
 * \u5165\u53e3\u53c2\u6570\uff1areceiveID\u2014\u2014\u63a5\u4ef6\u7f16\u53f7
 * \u5165\u53e3\u53c2\u6570\uff1astrCoord\u2014\u2014\u5750\u6807\u4e32
 * \u5165\u53e3\u53c2\u6570\uff1aparams\u2014\u2014GIS\u56fe\u5c42\u4fdd\u5b58\u65f6\u9700\u8981\u4f20\u5165\u7684\u53c2\u6570 
 
 * author:micy@neusoft.com
 * date  :2005.11.3
 */
function GISValidateOverlap(bizType,actDefID,receiveID,strCoords,params){

    var action =  globalsParams.WEB_APP_NAME +"/prospecting/prosGis.do";

    var method = "validateOverlap";
    var param = "strCoord="+strCoords+"&bizType="+bizType+"&actDefID="+actDefID+"&receiveID="+receiveID+"&params="+params;
    TestAlert(param);
    var result = postProxyRequest(action,method,param);	

	return result;
    
}

/**
 * \u6253\u5f00\u91cd\u53e0\u9875\u9762\uff1a\u53d1\u73b0\u91cd\u53e0\u540e\uff0c\u6253\u5f00GIS\u56fe
 * \u5165\u53e3\u53c2\u6570\uff1abizType\uff0d\u4e1a\u52a1\u540d\u79f0
 * \u5165\u53e3\u53c2\u6570\uff1aprotype\uff0d\u64cd\u4f5c\u7c7b\u578b\uff08\u56fa\u5b9a 5 \uff09
 * \u5165\u53e3\u53c2\u6570\uff1acantoncode\uff0d\u884c\u653f\u533a\u5212\uff08\u56fa\u5b9a 0 \uff09
 * \u5165\u53e3\u53c2\u6570\uff1aactdefid\uff0d\u6d3b\u52a8\u6807\u8bc6
 * \u5165\u53e3\u53c2\u6570\uff1astrCoord\u2014\u2014\u5750\u6807\u4e32
 * \u5165\u53e3\u53c2\u6570\uff1aparams\u2014\u2014\u4e2a\u6027\u5316\u91cd\u53e0\u68c0\u67e5\u9700\u8981\u7684\u53c2\u6570
 
 * author:micy@neusoft.com
 * date  :2005.11.3
 */
 
 function GISOpenOverlap(bizType,actDefID,strCoord,params){
    var action=globalsParams.WEB_APP_NAME +"/businessconsole/gisOperation.do";
    var method="begin";
    //var param = "envtype="+bizType+"&proctype=3&cantoncode=0&actdefid="+actDefID+"&strCoord="+strCoord;
    //if(params!=null)
	//	param = param+"&"+params;	
	
	//\u5750\u6807\u4e0e\u9879\u76ee\u63cf\u8ff0\u7b49\u4e2d\u6587\u4fe1\u606f\u4f7f\u7528post\u65b9\u5f0f\u8fdb\u884c\u53c2\u6570\u4f20\u9012\uff0c\u4ece\u800c\u907f\u514d\u53c2\u6570\u8fc7\u957f\u4e0e\u4e2d\u6587\u4e71\u7801\u95ee\u9898
	var param="strCoord="+strCoord+"&"+params;
    var result = postProxyRequest(action,method,param);
    if(params!=null)
		params = "envtype="+bizType+"&proctype=3&cantoncode=0&actdefid="+actDefID;	
	var url =  "/"+ globalsParams.WEB_APP_NAME +"/elarpGISPortal/overlapanalysis.jsp?"+params;
	var win = eval("window");
	win.open(url, "egovaGis", "menubar=0,toolbar=0,directories=0,scrollbars=0,resizable=0,left=200 ,top=20,width=650,height=640");
 }
 
 
/**
 * \u63d0\u4ea4GIS\u5750\u6807\u5230\u540e\u53f0\u8fdb\u884c\u4fdd\u5b58\u64cd\u4f5c
 * \u5165\u53e3\u53c2\u6570\uff1abizType\u2014\u2014\u4e1a\u52a1\u7c7b\u578b
 * \u5165\u53e3\u53c2\u6570\uff1areceiveID\u2014\u2014\u63a5\u4ef6\u53f7
 * \u5165\u53e3\u53c2\u6570\uff1astrCoord\u2014\u2014\u5750\u6807\u4e32
 
 * author:mahaiy@neusoft.com
 * date  :2005.10.13
 */
function GISCoordSave(bizType,receiveID,strCoords){

	var gisCoords = document.getElementById(globalsParams.GISCoords);
	var hidObj = document.getElementById(globalsParams.GISHidCoord);
	
	var params="";

    if(bizType != null && method != ""){
        params += globalsParams.BizType+"="+bizType;
    }else{
        params += globalsParams.BizType+"="+document.getElementById(globalsParams.BizType).value;
    }
    
    if(receiveID != null && receiveID != ""){
        params += "&"+globalsParams.ReceiveID+"="+receiveID;
    }else{
        params += "&"+globalsParams.ReceiveID+"="+document.getElementById(globalsParams.ReceiveID).value;
    }
    
    if(strCoords != null && strCoords != ""){
        params += "&strCoord="+strCoords;
    }else{
    	hidObj.value = gisCoords.ZB_String;
        params += "&strCoord="+hidObj.value;
    }
		
	var flag = CheckCoordinate(gisCoords);

	if(flag == true){
	    //\u63d0\u4ea4\u5750\u6807
	    hidObj.value=gisCoords.ZB_String;
	    var action = globalsParams.WEB_APP_NAME +"/businessconsole/coordxy.do";
	    var method = "saveCoord";
	    
	    TestAlert(params);
	    var str = postProxyRequest(action,method,params);
	   
	    //gis\u8ba1\u7b97
	    var strReturn = GISCalculate(gisCoords.ZB_String);
		flag = strReturn;
	}
	return flag;
}

/**
 * \u63a2\u77ff\u8bbe\u7f6eGIS\u5750\u6807\u5230\u9690\u85cf\uff0c\u4f9b\u8868\u5355\u4fdd\u5b58blob\u5750\u6807\u65f6\u4f7f\u7528
 
 * author:micy@neusoft.com
 * date  :2005.11.7
 */
function GISSetCoords(){
	var gisCoords = document.getElementById(globalsParams.GISCoords);
	var hidObj = document.getElementById(globalsParams.GISHidCoord);

	var flag = CheckCoordinate(gisCoords);
	if(flag == true){
	    if(hidObj != null ){
	        //\u8bbe\u7f6eGIS\u5750\u6807\u5230\u9690\u85cf
	        hidObj.value=gisCoords.ZB_String;
	    
	   
	        //gis\u8ba1\u7b97
	        var strReturn = GISCalculate(gisCoords.ZB_String);
		    flag = strReturn;
		}
	}
	return flag;	
}

/**
 * \u83b7\u53d6\u5750\u6807\u63a7\u4ef6\u5bf9\u8c61
 
 * author:micy@neusoft.com
 * date  :2005.10.22
 */
function GISGetCoords(){
	var gisCoords = document.getElementById(globalsParams.GISCoords);
	return gisCoords;
}

/**
 *  \u76f4\u89d2\u5750\u6807 \u8f6c\u6210 \u5ea6'\u5206'\u79d2
 
 * author:micy@neusoft.com
 * date  :2005.10.26
 */
function ZB_Exchange(gisCoords) {

	if(gisCoords == null || gisCoords==""){
		return 0;
	}else{
		var floatCoords =  parseFloat(gisCoords);

		var du_int,fen_int,miao_int;
		du_int = parseInt(gisCoords);
		
		fen_int = parseInt((floatCoords - du_int) * 60);
		//TestAlert("fen_int="+fen_int);
		miao_int = Math.round(((60 * (floatCoords - du_int) - fen_int) * 60));
		if(miao_int==60){
			fen_int++;
			miao_int=0;
		}
		
		//\u5206\u3001\u79d2 \u8865\u96f6
		if(fen_int<10)
			fen_int="0"+fen_int;
		if(miao_int<10)
			miao_int="0"+miao_int;
			
		var returnStr = du_int+"\u00b0"+fen_int+"\u2032"+miao_int+"\u2033";
		//TestAlert("returnStr="+returnStr);
		return returnStr;
	}
	
}

////////////////////////\u91c7\u77ff\u90e8\u5206 START///////////////////////

/**
 * \u6839\u636eGIS\u5750\u6807\u8ba1\u7b97\u91c7\u77ff\u6570\u636e
 * \u5165\u53e3\u53c2\u6570\uff1astrCoord\u2014\u2014\u5750\u6807\u4e32
 
 * author:micy@neusoft.com
 * date  :2005.10.25
 */
function GISCKCalculate(strCoord){

    var action =  globalsParams.WEB_APP_NAME +"/mining/miningGis.do";
    var method = "calculate";
    var param = "strCoord="+strCoord;
    var result = postProxyRequest(action,method,param);
    
    if(result.indexOf("true:") == 0){
    	TestAlert(result);
    	result = result.substring(5);
    	
    	var strArr =  result.split(globalsParams.resultSplit); 
    	var tempObj = null;
    	   
	    //\u4e1c\u7ecf\u8d77
	    tempObj = document.getElementsByName(globalsParams.GISLongeastStart)[0];
	    if(tempObj != null)	    
	    	tempObj.value=strArr[0];
	    
	    //\u4e1c\u7ecf\u6b62
	    tempObj = document.getElementsByName(globalsParams.GISLongeastEnd)[0];
	    if(tempObj != null)	    
	    	tempObj.value=strArr[1];
	    
	    //\u5317\u7eac\u8d77
	    tempObj = document.getElementsByName(globalsParams.GISLatnorthStart)[0];
	    if(tempObj != null)	    
	    	tempObj.value=strArr[2];
	    
	    //\u5317\u7eac\u6b62
	    tempObj = document.getElementsByName(globalsParams.GISLatnorthEnd)[0];
	    if(tempObj != null)	    
	    	tempObj.value=strArr[3];
	    //\u91c7\u77ff\u9762\u79ef
	    tempObj = document.getElementsByName(globalsParams.GISTotalArea)[0];
	    if(tempObj != null)	    
	    	tempObj.value=strArr[4];
	    	
	    //\u8ba1\u7b97\u91c7\u77ff\u6743\u4f7f\u7528\u8d39
	    tempObj = document.getElementsByName(globalsParams.UseFee)[0];
	    if(tempObj != null)	    
	    	tempObj.value=strArr[5];
	    	
	    //\u5f00\u91c7\u6df1\u5ea6\u8d77
	    tempObj = document.getElementsByName(globalsParams.GISDeepUP)[0];
	   	if(tempObj != null)	    
	    	tempObj.value=formatDigit(strArr[6],2);
	    	
    	//\u5f00\u91c7\u6df1\u5ea6\u6b62
    	tempObj = document.getElementsByName(globalsParams.GISDeepDown)[0];
    	if(tempObj != null)	    
	    	tempObj.value=formatDigit(strArr[7],2);
	    	
	    return true;
    }else{
    	return false;
    }

}

/**
 * \u91c7\u77ff\u63d0\u4ea4GIS\u5750\u6807\u5230\u540e\u53f0\u8fdb\u884c\u4fdd\u5b58\u64cd\u4f5c
 * \u5165\u53e3\u53c2\u6570\uff1abizType\u2014\u2014\u4e1a\u52a1\u7c7b\u578b
 * \u5165\u53e3\u53c2\u6570\uff1areceiveID\u2014\u2014\u63a5\u4ef6\u53f7
 * \u5165\u53e3\u53c2\u6570\uff1astrCoord\u2014\u2014\u5750\u6807\u4e32
 
 * author:micy@neusoft.com
 * date  :2005.11.4
 */
function GISCKCoordSave(bizType,receiveID,strCoords){

	var gisCoords = document.getElementById(globalsParams.GISCoords);
	var hidObj = document.getElementById(globalsParams.GISHidCoord);
	
	var params="";

    if(bizType != null && method != ""){
        params += globalsParams.BizType+"="+bizType;
    }else{
        params += globalsParams.BizType+"="+document.getElementById(globalsParams.BizType).value;
    }
    
    if(receiveID != null && receiveID != ""){
        params += "&"+globalsParams.ReceiveID+"="+receiveID;
    }else{
        params += "&"+globalsParams.ReceiveID+"="+document.getElementById(globalsParams.ReceiveID).value;
    }
    
    if(strCoords != null && strCoords != ""){
        params += "&strCoord="+strCoords;
    }else{
    	hidObj.value = gisCoords.ZB_String;
        params += "&strCoord="+hidObj.value;
    }
    
    //params="";
		
	var flag = CheckCoordinate(gisCoords);
	if(flag == true){
	    //\u63d0\u4ea4\u5750\u6807
	    hidObj.value=gisCoords.ZB_String;
	    var action = globalsParams.WEB_APP_NAME +"/businessconsole/coordxy.do";
	    var method = "saveCoord";
	    
	    //TestAlert(params);
	    var str = postProxyRequest(action,method,params);
	   
	    //gis\u8ba1\u7b97
	    var strReturn = GISCKCalculate(gisCoords.ZB_String);
	    //if(strReturn=="fasle")
		flag = strReturn;
	}
	return flag;
}

/**
 * \u91c7\u77ff\u8bbe\u7f6eGIS\u5750\u6807\u5230\u9690\u85cf\uff0c\u4f9b\u8868\u5355\u4fdd\u5b58blob\u5750\u6807\u65f6\u4f7f\u7528
 
 * author:micy@neusoft.com
 * date  :2005.11.7
 */
function GISCKSetCoords(){
	var gisCoords = document.getElementById(globalsParams.GISCoords);
	var hidObj = document.getElementById(globalsParams.GISHidCoord);

	var flag = CheckCoordinate(gisCoords);
	if(flag == true){
	    //\u8bbe\u7f6eGIS\u5750\u6807\u5230\u9690\u85cf
	    hidObj.value=gisCoords.ZB_String;
	   
	    //gis\u8ba1\u7b97
	    var strReturn = GISCKCalculate(gisCoords.ZB_String);
		flag = strReturn;
	}
	return flag;	
}

/**
 * \u91c7\u77ff\u77ff\u6743\u91cd\u53e0\u68c0\u67e5\uff1a\u901a\u8fc7\u7f16\u8f91\u5750\u6807\u8fdb\u884c\u68c0\u67e5\u64cd\u4f5c,\u8fd4\u56detrue\u8868\u793a\u6821\u9a8c\u901a\u8fc7\uff0c\u5426\u5219\u8868\u793a\u6709\u91cd\u53e0\u73b0\u8c61
 * \u5165\u53e3\u53c2\u6570\uff1abizType\u2014\u2014\u4e1a\u52a1\u7c7b\u578b
 * \u5165\u53e3\u53c2\u6570\uff1aactDefID\u2014\u2014\u8282\u70b9\u5b9a\u4e49\u6807\u793a
 * \u5165\u53e3\u53c2\u6570\uff1astrCoord\u2014\u2014\u5750\u6807\u4e32
 * \u5165\u53e3\u53c2\u6570\uff1aparams\u2014\u2014GIS\u56fe\u5c42\u4fdd\u5b58\u65f6\u9700\u8981\u4f20\u5165\u7684\u53c2\u6570 
 
 * author:micy@neusoft.com
 * date  :2005.11.3
 */
function GISCKValidateOverlap(bizType,actDefID,receiveID,strCoords,params){

    var action =  globalsParams.WEB_APP_NAME +"/mining/miningGis.do";

    var method = "validateOverlap";
    var param = "strCoord="+strCoords+"&bizType="+bizType+"&actDefID="+actDefID+"&receiveID="+receiveID+"&params="+params;
    TestAlert(param);
    var result = postProxyRequest(action,method,param);	
	return result;
}

/**
 * \u91c7\u77ff\u56fe\u5f62\u6d4f\u89c8\uff1a\u901a\u8fc7\u5750\u6807\u4e32\u6253\u5f00\u56fe\u5f62,\u76ee\u524d\u7531\u4e8e\u5750\u6807\u4e32\u8fc7\u957f,\u56e0\u6b64\u653e\u5165session\u4e2d
 * \u5165\u53e3\u53c2\u6570\uff1aactDefID\u2014\u2014\u8282\u70b9\u5b9a\u4e49\u6807\u793a
 
 * author:micy@neusoft.com
 * date  :2005.10.25
 */
function GISCKPicture(strCoords){
	//alert("\u7b49\u5f85gis\u4fee\u6539\uff01");

    var action =  globalsParams.WEB_APP_NAME +"/mining/miningGis.do";
    var method = "setCoordstring";
    var param = "strCoord="+strCoords;
    var result = postProxyRequest(action,method,param);	
	var url =  "/"+globalsParams.WEB_APP_NAME +"/elarpGISPortal/3DView.jsp";
	var win = eval("window");
	win.open(url, "egovaGis", "menubar=0,toolbar=0,directories=0,scrollbars=1,resizable=1,left=0 ,top=0,width=" + (screen.availWidth - 10) + ",height=" + (screen.availHeight -25));

}

////////////////////////\u91c7\u77ff\u90e8\u5206 END/////////////////////////
/**
 * \u6d4b\u8bd5\u7684\u5f39\u51fa\u4fe1\u606f
 */
function TestAlert(str){
	//alert(str);
}

///////////////////////////////////////////////////////////////GIS END////////////////////////////////////////

/**
 * \u5224\u65ad\u65f6\u95f4\u5927\u5c0f\uff1a\u5224\u65ad\u8d77\u65f6\u95f4\u4e0e\u6b62\u65f6\u95f4\u7684\u5173\u7cfb\u662f\u5426\u6b63\u786e
 * \u5165\u53e3\u53c2\u6570\uff1abegin\u2014\u2014\u8d77\u65f6\u95f4
 * \u5165\u53e3\u53c2\u6570\uff1aend\u2014\u2014\u6b62\u65f6\u95f4
 * \u5165\u53e3\u53c2\u6570\uff1amessage\u2014\u2014\u63a7\u4ef6\u540d\u79f0
 
 * author:micy@neusoft.com
 * date  :2005.11.8
 
 example:
	 function onChange_calendar18() {

		beginDate = document.getElementsByName("calendar17")[0].value;
		endDate = document.getElementsByName("calendar18")[0].value;
		
		JudgeBigDate(beginDate,endDate,"\u6279\u51c6\u6709\u6548\u671f\u9650");
	}
 */
function JudgeBigDate(begin,end,message){
	if(begin==null || begin == ""){
		return false;	
	} 
	if(end==null || end == ""){
		return false;	
	} 
	if(message==null){
		message="\u5f00\u59cb\u65f6\u95f4\u4e0d\u80fd\u5927\u4e8e\u7ed3\u675f\u65f6\u95f4\uff01"
	}else{
		message=message+"\u8d77\u4e0d\u80fd\u5927\u4e8e"+message+"\u6b62\uff01";
	}
	
	var beginDate = begin.replace(/\-/g,"\/");
	var endDate = end.replace(/\-/g,"\/");
	
	if ((new Date(beginDate) > new Date(endDate))){
		alert(message);
		return false;
	}
	return true;
}

/**
 * \u751f\u6210\u7ec8\u6b62\u65f6\u95f4
 * \u5165\u53e3\u53c2\u6570\uff1adate\u2014\u2014\u8d77\u65f6\u95f4
 * \u5165\u53e3\u53c2\u6570\uff1amonths\u2014\u2014\u6708\u4efd\u6570
 
 * author:micy@neusoft.com
 * date  :2005.11.8
 
 example:
	function setUsefullife() {
		var use_start = document.getElementsByName("use_start")[0].value;
		var namevalue = document.getElementsByName("usefullife")[0].value;

		var temp = SetEndDatebyNum(use_start,namevalue);
		if(temp){
			document.getElementsByName("use_end")[0].value = temp;
			return true;
		}else{
			return temp;
		}
		
	}
 */
function SetEndDatebyNum(date,months) {
	var test = parseFloat(months) ;
	if(isNaN(test)){
		alert("\u4fdd\u7559\u671f\u9650\u5fc5\u987b\u8f93\u5165\u6570\u5b57\u7c7b\u578b\uff01");
		return false;
	}else{	
		if(date==null || date==""){
			alert("\u8bf7\u5148\u8f93\u5165 \u8d77\u59cb\u65e5\u671f\uff01");		
			return false;
		}
		var beginDate = date.replace(/\-/g,"\/");
		beginDate = new Date(beginDate);
		
		var arrays=date.split("-");
		var year_arrays=(months.toString()).split(".");
		var endyear,endmonth;
		
		if(year_arrays.length>1){
			if(parseInt(year_arrays[1])>11){
				alert("\u4fdd\u7559\u671f\u9650 \u5c0f\u6570\u90e8\u5206\u8bf7\u8f93\u51651-11\u7684\u6570\u5b57\uff01");
				return false;
			}
			
			endmonth = beginDate.getMonth() + parseInt(year_arrays[1]) + 1;			
			endyear = beginDate.getFullYear() + parseInt(year_arrays[0]);
			
			if(endmonth > 12){
			  endmonth = endmonth -12;
			  endyear = endyear + 1;
			}
		}else{
			endmonth = beginDate.getMonth() + 1;
            endyear = beginDate.getFullYear() + parseInt(year_arrays[0]);
		}
		
		var newdate = endyear + "-" + endmonth + "-" + arrays[2];
		return newdate;
	}

}
function SetMonthNum(begindate,enddate,months,flag){
    var use_start = document.getElementsByName(begindate)[0].value;
    var use_end=document.getElementsByName(enddate)[0].value;
    var namevalue = document.getElementsByName(months)[0]; 	
	if(flag=="change_start"){
	    if(use_end==null || use_end==""){	
			return ;
   	 	}	
	}
	else if(flag=="change_end"){
    	if(use_start==null || use_start==""){	
			return ;
   	 	}		
    }
    var startarrays=use_start.split("-");
   	var endarrays=use_end.split("-");
    var startyear=parseInt(startarrays[0]);
    var startmonth=parseInt(startarrays[1]);
    if(startmonth==0)
    	startmonth=parseInt(startarrays[1].substring(1));
    var endyear=parseInt(endarrays[0]);
    var endmonth=parseInt(endarrays[1]);
    if(endmonth==0)
    	endmonth=parseInt(endarrays[1].substring(1));		
    var year=endyear-startyear;
    var month=endmonth-startmonth;
    if(month<0){
	    year-=1;
	    month+=12;
    }
    namevalue.value=year+"."+month;	
}
/**
 * \u8ba1\u7b97\u65f6\u95f4\u95f4\u9694\u7684\u6708\u4efd\u6570
 * \u5165\u53e3\u53c2\u6570\uff1astartDate\u2014\u2014\u8d77\u65f6\u95f4
 * \u5165\u53e3\u53c2\u6570\uff1aendDate\u2014\u2014\u6b62\u65f6\u95f4
 
 * author:mahaiy@neusoft.com
 * date  :2005.11.9
 */
 function calMonth(startDate,endDate){
 		if(startDate==null || startDate==""){
			alert("\u8bf7\u5148\u8f93\u5165 \u8d77\u59cb\u65e5\u671f\uff01");		
			return;
		}
		if(endDate==null || endDate == ""){
			alert("\u8bf7\u5148\u8f93\u5165 \u7ed3\u675f\u65e5\u671f\uff01");		
			return;
		}

       
        var start_date = "";
        var end_date = ""; 
        if(startDate.indexOf("-") < 0 && endDate.indexOf("-") < 0){
            start_date = startDate.substr(0,4) + "-" + startDate.substr(5,2) + "-" + startDate.substr(8,2);
            end_date = endDate.substr(0,4) + "-" + endDate.substr(5,2) + "-" + endDate.substr(8,2);                 
        }else{
             start_date = startDate;
             end_date = endDate; 
                
        }
        var beginArrays = start_date.split("-");
		var finishArrays = end_date.split("-");
		
		var totalMonth = (finishArrays[0] - beginArrays[0])*12 + (finishArrays[1] - beginArrays[1]);
                
        return totalMonth;    
		
		 
 
 }
 
 /**
 *\u5f97\u5230\u5f53\u524d\u65f6\u95f4
 * author:mahaiy@neusoft.com
 * date  :2005.11.18
 */
function getCurrentDate(){
 		var date  = new Date();   		   
 		var strDate = date.getYear()+ "-";
		var m = date.getMonth() + 1;
		if(m<10) 
			m = "0" + m;       
		strDate += m + "-";
		var d = date.getDate();
		if(d<10)
			d = "0" + d;       
		strDate += d; 
 		
 		return strDate;	
 								 
}
 
/**
 *\u8ba1\u7b97\u591a\u4e2a\u63a7\u4ef6\u4e4b\u548c
 * author:mahaiy@neusoft.com
 * date  :2005.11.18
 */
function calSum(colNames,num){
 		var colsArray = colNames.split(";");
 		var sum = 0;
 		for(var i = 0;i<colsArray.length;i++){
 			var colValue = document.getElementsByName(colsArray[i])[0].value;
 			        
 			if(isNaN(colValue) || !colValue)
  				sum +=0;
  			else
  				sum +=parseFloat(colValue);
 		}
 		
		if(num == 0)
			return parseInt(sum);
		else
			return formatDigit(sum,num);				 
}

/**
 *\u8bcd\u5178\u8868\u5355\u4f4d
 * author:mahaiy@neusoft.com
 * date  :2006.03.13
 */
function flag_dw(mineName,gh_unit,cl_unit) {	
var flag1="17050,22004,42200,52403,52500,52600,75512,75540,75630,83990,83991,83992,83993,83994,83995,83996,84170,84210,84230,84250,84270,84290,84412,84413,84414,84415,84416,84417,84418,84590,84591,84592,84593,84610,84611,84612,84710,84711,84712,84790,84810,84811,84812,84850,84851,84852,84853,84910,84911,84912,84913,84914,84920,84921,84922,84930,84940,97010,97030".indexOf(getFormTree(mineName).getValue());
var flag2="11004,11005,11008,97070,97090,97110,97120,97130".indexOf(getFormTree(mineName).getValue());
var flag3="83010".indexOf(getFormTree(mineName).getValue());
var flag_gh="\u4e07\u5428/\u5e74";
var flag_cl="\u4e07\u5428";
if  (flag1>=0){
	flag_gh="\u4e07\u7acb\u65b9\u7c73/\u5e74";
	flag_cl="\u4e07\u7acb\u65b9\u7c73";}
if  (flag2>=0){
	flag_gh="\u4ebf\u7acb\u65b9\u7c73/\u5e74";
	flag_cl="\u4ebf\u7acb\u65b9\u7c73";}
if  (flag3>=0){
	flag_gh="\u4e07\u514b\u62c9/\u5e74";
	flag_cl="\u4e07\u514b\u62c9";}
//\u9ed8\u8ba4\u503c
if (getFormTree(mineName).getValue()=="")	{
	flag_gh="\u4e07\u5428/\u5e74";
	flag_cl="\u4e07\u5428";
}

if(gh_unit != "")
	document.getElementsByName(gh_unit)[0].value=flag_gh;
if(cl_unit != "")
	document.getElementsByName(cl_unit)[0].value=flag_cl;
	
}

/**
 * \u56fe\u5f62\u7f16\u8f91\uff1a\u901a\u8fc7\u7f16\u8f91\u5750\u6807\u4e32\u5b8c\u6210\u6dfb\u52a0\u3001\u4fee\u6539\u56fe\u5f62\u7684\u529f\u80fd
 * \u5165\u53e3\u53c2\u6570\uff1abizType\u2014\u2014\u4e1a\u52a1\u7c7b\u578b
 * \u5165\u53e3\u53c2\u6570\uff1aactDefID\u2014\u2014\u8282\u70b9\u5b9a\u4e49\u6807\u793a
 * \u5165\u53e3\u53c2\u6570\uff1astrCoord\u2014\u2014\u5750\u6807\u4e32
 
 * for tkck gis pic edit
 * date  :2007.2.3
 */
function GISCoordEdit_COPY(bizType,actDefID,strCoords){

    var action =  globalsParams.WEB_APP_NAME +"/prospecting/prosGis.do";
    var method = "coordEdit";
    var param = "strCoord="+strCoords;
    var strReturn = postProxyRequest(action,method,param);
    
	var url =  "/"+ globalsParams.WEB_APP_NAME +"/elarpGISPortal/maplogin.jsp?envtype="+bizType+"&protype=8&cantoncode=0&actdefid=0&editenabled=true";
	//TestAlert(url);
	var win = eval("window");
	win.open(url, "egovaGis", "menubar=0,toolbar=0,directories=0,scrollbars=1,resizable=1,left=0 ,top=0,width=" + (screen.availWidth - 10) + ",height=" + (screen.availHeight -25));
	
}

function nulltozero(){
//zhouqiang@2007-02-27\u5c06\u8868\u5355\u9875\u9762\u4e0a\u533a\u5757\u548c\u603b\u9762\u79ef\u7684\u7a7a\u503c\u8f6c\u4e3a\u201c0\u201d
	//\u8ba1\u7b97\u57fa\u672c\u533a\u5757\u6570
	    var bs = document.getElementsByName(globalsParams.GISBasicSection)[0];
	    if(bs == null || bs.value=="")
	    	bs.value=0;
	    
	    //1/4\u533a\u5757  
	    var qs = document.getElementsByName(globalsParams.GISQuarterSection)[0];
	    if(qs == null || qs.value=="")
	    	qs.value=0;
	    
	    //1/16\u533a\u5757\u6570
	    var ls = document.getElementsByName(globalsParams.GISLittleSection)[0];
	    if(ls == null || ls.value=="")
	    	ls.value=0;
	    
	    //\u603b\u9762\u79ef
	    var ta = document.getElementsByName(globalsParams.GISTotalArea)[0];
	    if(ta == null || ta.value=="")
	    	bs.value=0;

}
