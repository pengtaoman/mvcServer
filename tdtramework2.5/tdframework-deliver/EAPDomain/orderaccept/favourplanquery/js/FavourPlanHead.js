/*version20100427001*/

/* ��ʼ������*/
function Init_OnLoad(){
	/*�����б�ǩ�� select �Ķ��������ʾtitle�Ĺ���*/
}

/*ͨ��ҵ�������ˢ������Ʒ����������*/
function getProductIdList(obj){
    var serviceId = obj.value;
    if (serviceId == ""){
      $("productId").outerHTML = "<select name='productId' id='productId' ><option value='-1'>��ѡ��</option></select>";
      return;
    }
    var parameter = null;
    if($("cityCode")){
    	var cityCode =$("cityCode").value;
    	parameter = "serviceId="+serviceId+"&ifValid=1&cityCode="+cityCode;	
    }else{
    	parameter = "serviceId="+serviceId+"&ifValid=1";
    }
    var result = executeRequest("custAcceptAjaxAction","getProductIdList",parameter);
    if(result==-1){
        $("productId").outerHTML = "<select name='productId' id='productId' ><option value='-1'>��ѡ��</option></select>";
        return;
    }
    $("productId").outerHTML = result;
}

function Query_OnClick(){

	if ($("productId").value == ""){
		alert('��ѡ���Ʒ����!');
		return false;
	}
	document.forms[0].action=document.forms[0].WebPath.value+"/favourPlanQueryAction.do?method=doQuery";
	document.forms[0].target="F_BodyFra";
	document.forms[0].submit();
}

function Refresh_OnClick(){
	document.getElementById("serviceId").value = "";
	document.getElementById("serviceId").onblur();
}
