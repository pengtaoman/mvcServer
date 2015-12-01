function favourplanpageInit(){
    //创建经办人卡片
    var viaInfoCard = null;
  	if(viaInfoCard == null){
		// 创建经办人信息卡片实例
		viaInfoCard = BusCard.createInstance({
					productId : "-111",
					serviceOfferId : '-101'
				}, BusCard.util.$('viaInfoCardContainer'));
		// 初始化经办人信息卡片实例
		viaInfoCard.init();
	}
	
	//提交按钮置灰
	document.getElementById("commitBtn").disabled = true;
	//document.getElementById("printBtn").disabled = true;
}

//新增按钮事件

function doNew(){
   if (document.getElementById("favourplaninforow") == undefined){
     //window.showModalDialog(document.getElementById("webpath").value+'/orderaccept/favourplan/FavourPlanMgr.jsp',null,"status:yes;dialogWidth:600px;dialogHeight:200px;menubar:no");
     window.open(document.getElementById('webpath').value+'/orderaccept/favourplan/FavourPlanMgr.jsp', 'accountMgrPage', 'location=no,toolbar=no,menubar=no,status=yes,resizable=no,scrollbars=no,top=80,left=80,width=600,height=300');
   }
   else{
     alert('一个账户只能有一个有效的优惠计划');
     return;
   }  
}

//删除按钮事件

function doDel(){
		
   if (document.getElementById("favourplaninforow") == undefined){
     alert('没有新增或者既存优惠计划无法删除');
     return;
   }
   else{
     document.getElementById("newFavourPlanValue").value = '';
     if (document.getElementById("oldfbegDate").value != ''){
       document.getElementById("commitBtn").disabled = false;
     }else{
       document.getElementById("commitBtn").disabled = true;
     }
     document.getElementById("favourplaninfotable").deleteRow(1);
     
   }  
}

//刷新列表事件

function planfresh(){
   
   if (document.getElementById("newFavourPlanValue").value.length>0 && document.getElementById("newBegDate").value.length>0 && document.getElementById("newEndDate").value.length>0){
   
     var newFavourPlanValue = document.getElementById("newFavourPlanValue").value.split("==");
     
     document.getElementById("favourplaninfotable").insertRow(1);
     document.getElementById('favourplaninfotable').rows[1].className = "listTableRow";
     document.getElementById('favourplaninfotable').rows[1].id = "favourplaninforow";
     document.getElementById('favourplaninfotable').rows[1].onmouseover =function(){TableRow.lightMe(this);};
     document.getElementById('favourplaninfotable').rows[1].onmouseout = function(){TableRow.resetMe(this);};
     document.getElementById('favourplaninfotable').rows[1].insertCell();
     document.getElementById('favourplaninfotable').rows[1].insertCell();
     document.getElementById('favourplaninfotable').rows[1].insertCell();
     document.getElementById('favourplaninfotable').rows[1].insertCell();
     document.getElementById('favourplaninfotable').rows[1].cells[0].innerHTML = newFavourPlanValue[0];
     document.getElementById('favourplaninfotable').rows[1].cells[1].innerHTML = newFavourPlanValue[1];
     document.getElementById('favourplaninfotable').rows[1].cells[2].innerHTML = document.getElementById("newBegDate").value;
     document.getElementById('favourplaninfotable').rows[1].cells[3].innerHTML = document.getElementById("newEndDate").value;  
     
     document.getElementById("commitBtn").disabled = false;
   }
}

//提交   
function doSubmit(){

   	var pagePath = document.getElementById("webpath").value + "/ordermgr/favourPlanAction.do?method=doSubmit";
	document.getElementById("EAPForm").action = pagePath;
	document.getElementById("EAPForm").target = "ifa_result";
	document.getElementById("EAPForm").submit();
}
