var num=0;
var numArr="";
var areaCodeFlag=true;//���Ϊtrue����ʶ���ſ������ɾ�������Ϊfalse������Ӻ�ɾ�����Ű�ťʧЧ
var operFlag;//ADDNEW,MODIFY
var path;
function init(webPath){
	path=webPath;
	var message=document.getElementById("message").value;
	if(message!=""){
		alert(message);
	}
	operFlag=document.getElementById("operFlag").value;
	
	//������Ϣ
	if(document.getElementById("areaCodeFlag").value=="true"){
		var areaCodes=document.getElementById("areaCodeStr").value;
		areaCodes=areaCodes.replaceAll("\\[","");
		var areaCodeArr=areaCodes.split("]");
		for(var i=0;i<areaCodeArr.length;i++){
			var infoArr=areaCodeArr[i].split(",");
			if(infoArr.length==2){
				addAreaCode(infoArr[0],infoArr[1],areaCodeFlag);
			}
		}
	}
}

function deleteAreaCode(areaCodeNum,flag){
	var bodyDiv=document.getElementById("bodyDiv");
	var dChild=document.getElementById("mainDiv_"+areaCodeNum);
	//alert(dChild.innerHTML);
	//alert(dChild.children(0).innerHTML);
	dChild.removeChild(dChild.children(0));
	///bodyDiv.removeChild(dChild);
	numArr=numArr.replace("\["+areaCodeNum+"\]","");	
}

function addAreaCode(areaNbr,areaCode,flag){
	var style='class="iInput"';
	
	num++;
	numArr+="["+num+"]";	
				
	var htmlStr='<div class="mainDiv">';
	htmlStr+='<div class="xDiv" id="buttorn_div_'+num+'" onclick="deleteAreaCode(\''+num+'\');">��</div>';
	htmlStr+='<div class="iDiv"  id="areaNbr_div_'+num+'">���ű��� ��';
	htmlStr+='<input type="text" '+style+' id="areaNbr_'+num+'" name="areaNbr_'+num+'" value="'+areaNbr+'"/></div>';
	htmlStr+='<div class="iDiv" id="areaCode_div_'+num+'">��&#160;&#160;&#160;&#160;�� ��';
	htmlStr+='<input type="text" '+style+' id="areaCode_'+num+'" name="areaCode_'+num+'" value="'+areaCode+'" /></div>';
	htmlStr+='</div>';

	var newDiv=document.createElement("div");
	//newDiv.setAttribute("class","mainDiv");
	newDiv.setAttribute("id","mainDiv_"+num);
	newDiv.setAttribute("name","mainDiv_"+num);
	newDiv.innerHTML=htmlStr;
	
	var bodyDiv=document.getElementById("bodyDiv");
	if(bodyDiv.children(0)==null){
		bodyDiv.insertAdjacentElement("beforeEnd",newDiv);
	}else{
		bodyDiv.children(0).insertAdjacentElement("beforeEnd",newDiv);
	}
}

function doStore(){
	if(operFlag=="ADDNEW"){
		if(checkValues()){
			if(document.getElementById("bodyDiv")!=null){
				setAreaCode();
			}
			setButtonDisabled();
			document.getElementById("mainForm").action=path+"/om/commonRegionAction.do?method=doAddCommonRegion";
			document.getElementById("mainForm").target="_self";
			document.getElementById("mainForm").submit();
		}else{
			return false;
		}
	}else if(operFlag=="MODIFY"){
		if(checkValues()){
			if(document.getElementById("bodyDiv")!=null){
				setAreaCode();
			}
			setButtonDisabled();
			document.getElementById("mainForm").action=path+"/om/commonRegionAction.do?method=doModifyCommonRegion";
			document.getElementById("mainForm").target="_self";
			document.getElementById("mainForm").submit();
		}else{
			return false;
		}
	}
}

function goBack(){
	setButtonDisabled();
	document.getElementById("mainForm").action=path+"/om/commonRegionAction.do?method=initCommonRegionPage";
	document.getElementById("mainForm").target="_self";
	document.getElementById("mainForm").submit();
}

function setAreaCode(){
	var tNumArr=numArr.replaceAll("\\[","");
	var arr=tNumArr.split("]");
	var areaCodeStr="";
	for(var i=0;i<arr.length;i++){
		if(arr[i]==null||arr[i]==""){
			continue;
		}
		areaCodeStr+="[";
		areaCodeStr+=document.getElementById("areaCode_"+arr[i]).value;
		areaCodeStr+=",";
		areaCodeStr+=document.getElementById("areaNbr_"+arr[i]).value;
		areaCodeStr+="]";
	}
	document.getElementById("areaCodeStr").value=areaCodeStr;
}

function checkValues(){
	if((operFlag=="ADDNEW"||operFlag=="MODIFY")){
		if(document.getElementById("s_region_name").value==""){
			alert("����д���������ơ�");
			document.getElementById("s_region_name").focus();
			return false;
		}
		
		if(document.getElementById("bodyDiv")!=null){
			if(numArr==""){
				alert("������ť'+'������������Ϣ");
				return false;
			}else{
				var tNumArr=numArr.replaceAll("\\[","");
				var arr=tNumArr.split("]");
				for(var i=0;i<arr.length;i++){
					if(arr[i]==null||arr[i]==""){
						continue;
					}
					if(document.getElementById("areaNbr_"+arr[i]).value==""){
						alert("����д�����ű��롿���������������ϢΪ���࣬�뽫��ɾ��");
						document.getElementById("areaNbr_"+arr[i]).focus();
						return false;
					}
					if(document.getElementById("areaCode_"+arr[i]).value==""){
						alert("����д����	   �š����������������ϢΪ���࣬�뽫��ɾ��");
						document.getElementById("areaCode_"+arr[i]).focus();
						return false;
					}
				}
			}
		}
		if(checkPoliticalLocation()==false){
			alert("��ѡ����������");
			return false;
		}
	}
	return true;
}

String.prototype.replaceAll = function(s1, s2) {    
    return this.replace(new RegExp(s1, "gm"), s2); //gȫ��   
}

function checkPoliticalLocation(){
	var checkBoxArr=document.getElementsByName("checked_node_politicalLocationTree");
	for(var i=0;i<checkBoxArr.length;i++){
		if(checkBoxArr[i].checked == true){
			return true;
		}
	}
	return false;
}

function setButtonDisabled(){
	document.getElementById("storeButton").disabled=true;
	document.getElementById("goBackButton").disabled=true;
}