function favourplanpageInit(){
    //���������˿�Ƭ
    var viaInfoCard = null;
  	if(viaInfoCard == null){
		// ������������Ϣ��Ƭʵ��
		viaInfoCard = BusCard.createInstance({
					productId : "-111",
					serviceOfferId : '-101'
				}, BusCard.util.$('viaInfoCardContainer'));
		// ��ʼ����������Ϣ��Ƭʵ��
		viaInfoCard.init();
	}
	
	//�ύ��ť�û�
	document.getElementById("commitBtn").disabled = true;
	//document.getElementById("printBtn").disabled = true;
}

//������ť�¼�

function doNew(){
   if (document.getElementById("favourplaninforow") == undefined){
     //window.showModalDialog(document.getElementById("webpath").value+'/orderaccept/favourplan/FavourPlanMgr.jsp',null,"status:yes;dialogWidth:600px;dialogHeight:200px;menubar:no");
     window.open(document.getElementById('webpath').value+'/orderaccept/favourplan/FavourPlanMgr.jsp', 'accountMgrPage', 'location=no,toolbar=no,menubar=no,status=yes,resizable=no,scrollbars=no,top=80,left=80,width=600,height=300');
   }
   else{
     alert('һ���˻�ֻ����һ����Ч���Żݼƻ�');
     return;
   }  
}

//ɾ����ť�¼�

function doDel(){
		
   if (document.getElementById("favourplaninforow") == undefined){
     alert('û���������߼ȴ��Żݼƻ��޷�ɾ��');
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

//ˢ���б��¼�

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

//�ύ   
function doSubmit(){

   	var pagePath = document.getElementById("webpath").value + "/ordermgr/favourPlanAction.do?method=doSubmit";
	document.getElementById("EAPForm").action = pagePath;
	document.getElementById("EAPForm").target = "ifa_result";
	document.getElementById("EAPForm").submit();
}
