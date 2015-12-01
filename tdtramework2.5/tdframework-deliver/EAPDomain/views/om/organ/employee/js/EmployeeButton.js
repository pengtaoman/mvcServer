    	/**
    	 * ?????
    	 */
    	function load()
    	{
    		setAllButtonDisabled();
    	}
    	
    	function init()
    	{
    	    var message = document.getElementById("message").value;
    		if(message != null && message != "" && message != "null"){
    			alert(message);
    		}
			DateUtil.addDateArea("pwdUpdateDateBegin","chooseDate1",false);
			DateUtil.addDateArea("pwdUpdateDateEnd","chooseDate2",false);
			TitleBar.addTitleBarByTag('select');
    	}
    	
    	/**
		 * ??????????
		 */
		function setAllButtonDisabled()
		{
			var modifyBtn = document.all("bModify");
			var inchingBtn = document.all("bInching");
			var deleteBtn = document.all("bDelete");
			var renewPBtn = document.all("bRenewPassword");
			var showPermissionBtn = document.all("bShowPermission");
			var grantBtn = document.all("bGrant");
			var grantPDBtn = document.all("bGrantParamDuty");
			var bDeliverPower = document.all("bDeliverPower");
			var bCancelInching = document.all("bCancelInching");
			document.getElementById("dataPowerAdjust").disabled = 'disabled';
			modifyBtn.disabled=true;
			inchingBtn.disabled=true;
			deleteBtn.disabled=true;
			renewPBtn.disabled=true;
			showPermissionBtn.disabled=true;
			grantBtn.disabled=true;
			grantPDBtn.disabled=true;
			bDeliverPower.disabled = true;
			bCancelInching.disabled = true;
		}
		/**
		 * ?????????
		 */
		function setAllButtonEnabled(ifShowTree)
		{
			var modifyBtn = document.all("bModify");
			var inchingBtn = document.all("bInching");
			var deleteBtn = document.all("bDelete");
			var renewPBtn = document.all("bRenewPassword");
			var showPermissionBtn = document.all("bShowPermission");
			var grantBtn = document.all("bGrant");
			var grantPDBtn = document.all("bGrantParamDuty");
			var bDeliverPower = document.all("bDeliverPower");
			var bCancelInching = document.all("bCancelInching");
			document.getElementById("dataPowerAdjust").disabled = '';
			modifyBtn.disabled=false;
			inchingBtn.disabled=false;
			deleteBtn.disabled=false;
			renewPBtn.disabled=false;
			showPermissionBtn.disabled=false;
			grantBtn.disabled=false;
			grantPDBtn.disabled=false;
			bDeliverPower.disabled = false;
			bCancelInching.disabled = false;
			document.getElementById("ifShowTree").value = ifShowTree;
		}
		/**
		 * ??????
		 */
    	function changeCondition(obj)
		{
			if(obj.value=="workNo")
			{
				myform.workNo.disabled=false;
				myform.employeeName.disabled=true;
				myform.workNo.focus();
			} else if(obj.value=="employeeName")
			{
				myform.workNo.disabled=true;
				myform.employeeName.disabled=false;
				myform.employeeName.focus();
			}
		}
		/**
		 * ??????
		 */
		function nas_enter(webpath)
		{
			var scode=(navigator.appname=="Nwtscape")?event.which:event.keyCode;
			if(scode == 13){
				doSearch(webpath);
			}
		}
		/**
		 * ??
		 */
	   	function doSearch(webpath)
		{
			var selectNodeKind = parent.organdisplayhidden.document.myform.CurrentSelectOrganKind.value;
			var selectNodeId = parent.organdisplayhidden.document.myform.CurrentSelectOrganId.value;
			var url = webpath+'/om/EmployeeMaintanceAction.do?';
			url += '&OperType=search';
			if (document.getElementById('workNo').disabled != true && document.getElementById('workNo').value != '') {
				url += '&workNo=' + document.getElementById('workNo').value;
			}
			if (document.getElementById('employeeName').disabled != true && document.getElementById('employeeName').value != '') {
				url += '&employeeName=' + document.getElementById('employeeName').value;
			}
			if (document.getElementById('employeeId').disabled != true && document.getElementById('employeeId').value != '') {
				url += '&employeeId=' + document.getElementById('employeeId').value;
			}
			if (document.getElementById('dutyId').disabled != true && document.getElementById('dutyId').value != '') {
				url += '&dutyId=' + document.getElementById('dutyId').value;
			}
			if (document.getElementById('roleId').disabled != true && document.getElementById('roleId').value != '') {
				url += '&roleId=' + document.getElementById('roleId').value;
			}
			if (document.getElementById('adminType').disabled != true && document.getElementById('adminType').value != '') {
				url += '&adminType=' + document.getElementById('adminType').value;
			}
			if (document.getElementById('status').disabled != true && document.getElementById('status').value != '') {
				url += '&status=' + document.getElementById('status').value;
			}
			if (document.getElementById('pwdUpdateDateBegin').disabled != true && document.getElementById('pwdUpdateDateBegin').value != '') {
				url += '&pwdUpdateDateBegin=' + document.getElementById('pwdUpdateDateBegin').value;
			}
			if (document.getElementById('pwdUpdateDateEnd').disabled != true && document.getElementById('pwdUpdateDateEnd').value != '') {
				url += '&pwdUpdateDateEnd=' + document.getElementById('pwdUpdateDateEnd').value;
			}
			if (document.getElementById('flagType').disabled != true && document.getElementById('flagType').value != '') {
				url += '&flagType=' + document.getElementById('flagType').value;
			}
			
			if(selectNodeKind != null && selectNodeKind != '' && selectNodeKind != 'null'){
				if(selectNodeKind == 'area'){
					url += '&selectNodeKind=area';
				}else if(selectNodeKind == 'organ'){
					url += '&selectNodeKind=organ'
				}
				if( selectNodeId!= null && selectNodeId!='' && selectNodeId!= 'null'){
					url += '&selectNodeId='+selectNodeId
				}
			}
			
			
			parent.employeelist.showWaitingBar();
			parent.employeelist.location.href = url;
		}
		
		
		/**
		 * ??
		 */
	    function doAdd(webpath)
		{
			var organKind = parent.organdisplayhidden.document.myform.CurrentSelectOrganKind.value;
			var organId = parent.organdisplayhidden.document.myform.CurrentSelectOrganId.value;
			var belongArea = parent.organdisplayhidden.document.myform.CurrentSelectBelongArea.value;
			var dealerId = parent.organdisplayhidden.document.myform.CurrentSelectDealerId.value;
		 	var currentOrganName = "";
		 	var url = webpath + "/om/EmployeeMaintanceAction.do?OrganKind="+organKind+"&OrganId="+organId+"&BelongArea="+belongArea+"&OperType=init&DealerId="+dealerId;
			var width =550;
			var height = 580;
			var wleft=(screen.width-width)/2;
			var wtop=(screen.availHeight-height)/2-20;
			dimensions="width="+width+",height="+height+",left="+wleft+",top="+wtop+",scrollbars";
			window.open(url,'markpage',dimensions);
		}
		
		/**
		 * ??
		 */
		function doModify(webpath)
		{
			var ifShowTree = document.getElementById("ifShowTree").value;
			var OperForm = parent.employeelist.OperForm;
			var belongArea = parent.organdisplayhidden.document.myform.CurrentSelectBelongArea.value;
			var organId = parent.organdisplayhidden.document.myform.CurrentSelectOrganId.value;
			var workNo = OperForm.workNo.value;
			var employeeId = OperForm.employeeId.value;
			var authId = OperForm.authId.value;
			var url = webpath + '/om/EmployeeMaintanceAction.do?BelongArea='+belongArea+'&ifShowTree='+ifShowTree+'&OrganId='+organId+'&workNo='+workNo+'&employeeId='+
				employeeId+'&authId='+authId+'&OperType=modifyInit';
			var width = 550;
			var height = 580;
			var wleft=(screen.width-width)/2;
			var wtop=(screen.availHeight-height)/2-20;
			dimensions="width="+width+",height="+height+",left="+wleft+",top="+wtop+",scrollbars";
			window.open(url,'markpage',dimensions);
		}
		/**
		 * ????
		 */
		function doRenewPwd(webpath)
		{
			//if (!confirm('确认恢复密码？')) return false;
			var OperForm = parent.employeelist.OperForm;
			var workNo = OperForm.workNo.value;
			var url = webpath+"/om/EmployeeMaintanceAction.do?workNo="+workNo+"&OperType=renewpwd";
			var returnValue = showModalDialog(url,window,'status:no;scroll:no;DialogWidth:450px;DialogHeight:260px;');
		}
		/**
		 * ??
		 */
		function doDelete(webpath)
		{
			if (!confirm('确认删除该职员？')) return false;
			var OperForm = parent.employeelist.OperForm;
			OperForm.action = webpath + '/om/EmployeeMaintanceAction.do';
			OperForm.OperType.value = "delete";
			OperForm.submit();
		}
		/**
		 * ????,???????????????
		 */
		function showDuty(webpath, needCheckBox)
		{
			var OperForm = parent.employeelist.OperForm;
			var assignedEmpId = OperForm.employeeId.value;
			var url = webpath + '/om/EmployeeMaintanceAction.do?OperType=showPower&employeeId=' + assignedEmpId+"&needCheckBox="+needCheckBox;
			//var url = webpath+'/views/om/organ/menu/menuFuncTree/menuTreePage.jsp?employeeId='+assignedEmpId+'&needCheckBox='+needCheckBox;
			var width = 573;
			var height = 500;
			var wleft=(screen.width-width)/2;
			var wtop=(screen.availHeight-height)/2-20;
			dimensions="width="+width+",height="+height+",left="+wleft+",top="+wtop+",scrollbars";
			window.open(url,'markpage',dimensions);
		}
		/**
		 * 打开数据权限微调页面
		 */
		function dataPowerAdjust3(webpath){
			var OperForm = parent.employeelist.OperForm;
			var assignedEmpId = OperForm.employeeId.value;
			if(assignedEmpId==null || assignedEmpId=='' || assignedEmpId=='null'){
				alert("职员编号为空，不能进行数据权限微调操作");
				return;
			}
			//var url = webpath + '/om/EmployeeMaintanceAction.do?OperType=showPower&employeeId=' + assignedEmpId+"&needCheckBox="+needCheckBox;
			var url = webpath+"/om/EmployeeMaintanceAction.do?employeeId="+assignedEmpId+"&OperType=powerAdjust";
			//var width = 573;
			//var height = 500;
			//var wleft=(screen.width-width)/2;
			//var wtop=(screen.availHeight-height)/2-20;
			//dimensions="width="+width+",height="+height+",left="+wleft+",top="+wtop+",scrollbars";
			//window.open(url,'markpage',dimensions);
			var back = showModalDialog(url,window,'status:no;scroll:no;DialogWidth:750px;DialogHeight:560px;');
		}
		function makeDuty(webpath)
		{
			var OperForm = parent.employeelist.OperForm;
			var assignedEmpId = OperForm.employeeId.value;
			var url = webpath + '/om/EmployeeMaintanceAction.do?OperType=makeDutyInit&assignedEmpId=' + assignedEmpId;
			var width = 550;
			var height = 580;
			var wleft=(screen.width-width)/2;
			var wtop=(screen.availHeight-height)/2-20;
			dimensions="width="+width+",height="+height+",left="+wleft+",top="+wtop+",scrollbars";
			window.open(url,'markpage',dimensions);
		}
		/**
		 * ??????
		 */
		function makeParamDuty(webpath)
		{
			var OperForm = parent.employeelist.OperForm;
			var assignedEmpId = OperForm.employeeId.value;
			var url = webpath + '/om/EmployeeMaintanceAction.do?OperType=makeParamDutyInit&assignedEmpId=' + assignedEmpId;
			var width = 550;
			var height = 580;
			var wleft=(screen.width-width)/2;
			var wtop=(screen.availHeight-height)/2-20;
			dimensions="width="+width+",height="+height+",left="+wleft+",top="+wtop+",scrollbars";
			window.open(url,'markpage',dimensions);
		}
		
		function deliverPower(webpath){
			var OperForm = parent.employeelist.OperForm;
			var belongArea = parent.organdisplayhidden.document.myform.CurrentSelectBelongArea.value;
			var workNo = OperForm.workNo.value;
			var employeeId = OperForm.employeeId.value;
			var authId = OperForm.authId.value;
			var url = webpath + '/om/EmployeeQueryAction.do?AreaId='+belongArea+'&employeeId='+
				employeeId+'&OperType=deliverEmp';
			var width = 550;
			var height = 400;
			var wleft=(screen.width-width)/2;
			var wtop=(screen.availHeight-height)/2-20;
			dimensions="width="+width+",height="+height+",left="+wleft+",top="+wtop+",scrollbars";
			window.open(url,'markpage',dimensions);
		}
		
		function setStatus(){
			
			if(myform.employeeName.disabled==false){
				myform.employeeName.style.background='gray';
				myform.employeeName.disabled = true;
				myform.workNo.disabled = false;
				myform.workNo.style.background='';
			}else{
				myform.employeeName.disabled = false;
				myform.employeeName.style.background ='';
				myform.workNo.style.background='gray';
				myform.workNo.disabled = true;
			}
				
		}
		
		function setParentFrameSetSize()
		{
			var detailOper = document.getElementById('detailOper');
			var hideOper = document.getElementById('hideOper');
			var detailFlag = document.getElementById('detailFlag');
			var hideFlag = document.getElementById('hideFlag');
			showOrHideQueryCondition(hideFlag.value); 
			var pageSize = document.body.scrollHeight;
			var rowsStr = pageSize + ',*';
			parent.resizeTheFrameSet(rowsStr);
		}
		
		function showOrHideQueryCondition(flag) 
		{
			var qc = document.getElementById('QueryCondition');
			var hideOper = document.getElementById('hideOper');
			var hideFlag = document.getElementById('hideFlag');
			if (flag == '0') {
				// 隐藏查询条件
				qc.style.display = 'none';
				hideOper.title = '显示查询条件';
				hideOper.innerHTML = '[显示]';
				hideFlag.value = '1';
			} else if (flag == '1') {
				// 显示查询条件
				qc.style.display = '';
				hideOper.title = '隐藏查询条件';
				hideOper.innerHTML = '[隐藏]';
				hideFlag.value = '0';
			}
		}
		
		function setFlagType(flagType) {
			document.getElementById('flagType').value = flagType;
		}
		
		function cancelInching(path){
			var OperForm = parent.employeelist.OperForm;
			var empId = OperForm.employeeId.value;
			var url = path + '/om/EmployeeMaintanceAction.do?employeeId='+empId+"&OperType=cancelInch";
			var width = 450;
			var height = 150;
			var wleft=(screen.width-width)/2;
			var wtop=(screen.availHeight-height)/2-20;
			dimensions="width="+width+",height="+height+",left="+wleft+",top="+wtop+",scrollbars";
			window.open(url,'markpage',dimensions);
		}
