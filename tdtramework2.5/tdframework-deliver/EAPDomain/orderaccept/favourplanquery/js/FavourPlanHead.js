/*version20100427001*/

/* 初始化界面*/
function Init_OnLoad(){
	/*给所有标签是 select 的对象添加显示title的功能*/
}

/*通过业务号码来刷新主产品名称下拉框*/
function getProductIdList(obj){
    var serviceId = obj.value;
    if (serviceId == ""){
      $("productId").outerHTML = "<select name='productId' id='productId' ><option value='-1'>请选择</option></select>";
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
        $("productId").outerHTML = "<select name='productId' id='productId' ><option value='-1'>请选择</option></select>";
        return;
    }
    $("productId").outerHTML = result;
}

function Query_OnClick(){

	if ($("productId").value == ""){
		alert('请选择产品名称!');
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
