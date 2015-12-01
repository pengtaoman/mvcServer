    	/**
    	 * ?????
    	 */
    	function load()
    	{
    		setAllButtonDisabled();
    	}
    	/**
		 * ??????????
		 */
		function setAllButtonDisabled()
		{
			var modifyBtn = document.all("bModify");
			var deleteBtn = document.all("bDelete");
			modifyBtn.disabled=true;
			deleteBtn.disabled=true;
		}
		/**
		 * ?????????
		 */
		function setAllButtonEnabled()
		{
			var modifyBtn = document.all("bModify");
			var deleteBtn = document.all("bDelete");
			modifyBtn.disabled=false;
			deleteBtn.disabled=false;
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
			if (myform.workNo.disabled==false)
			{
				if (myform.workNo.value == '')
				{
					alert('请输入帐号');
					myform.workNo.focus();
					return false;
				}
				var workNo = myform.workNo.value;
				parent.employeelist.location.href = webpath+"/om/EmployeeMaintanceAction.do?" + "workNo=" + workNo + "&opt=workNo&OperType=dealerEmpSearch";
			} else if (myform.employeeName.disabled==false)
			{
				if (myform.employeeName.value == '')
				{
					alert('请输入姓名');
					myform.employeeName.focus();
					return false;
				}
				var employeeName = myform.employeeName.value;
				parent.employeelist.location.href = webpath+"/om/EmployeeMaintanceAction.do?" + "employeeName=" + employeeName + "&" + "opt=employeeName&OperType=dealerEmpSearch";
			}
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
		 	var url = webpath + "/om/EmployeeMaintanceAction.do?&OrganKind="+organKind+"&OrganId="+organId+"&BelongArea="+belongArea+"&OperType=init&DealerId="+dealerId;
		
			var width =550;
			var height = 550;
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
			var OperForm = parent.employeelist.OperForm;
			var belongArea = parent.organdisplayhidden.document.myform.CurrentSelectBelongArea.value;
			var organId = parent.organdisplayhidden.document.myform.CurrentSelectOrganId.value;
			var workNo = OperForm.workNo.value;
			var employeeId = OperForm.employeeId.value;
			var authId = OperForm.authId.value;
			var url = webpath + '/om/EmployeeMaintanceAction.do?&BelongArea='+belongArea+'&OrganId='+organId+'&workNo='+workNo+'&employeeId='+employeeId+'&authId='+authId+'&OperType=modifyInit';
			var width = 550;
			var height = 600;
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
			if (!confirm('确认要恢复密码?')) return false;
			var OperForm = parent.employeelist.OperForm;
			OperForm.action = webpath + '/om/EmployeeMaintanceAction.do';
			OperForm.OperType.value = "renewpwd";
			OperForm.submit();
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
			var width = 573;
			var height = 403;
			var wleft=(screen.width-width)/2;
			var wtop=(screen.availHeight-height)/2-20;
			dimensions="width="+width+",height="+height+",left="+wleft+",top="+wtop+",scrollbars";
			window.open(url,'markpage',dimensions);
		}
		/**
		 * ??????
		 */
		function makeDuty(webpath)
		{
			var OperForm = parent.employeelist.OperForm;
			var assignedEmpId = OperForm.employeeId.value;
			var url = webpath + '/om/EmployeeMaintanceAction.do?OperType=makeDutyInit&assignedEmpId=' + assignedEmpId;
			var width = 550;
			var height = 300;
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
			var height = 300;
			var wleft=(screen.width-width)/2;
			var wtop=(screen.availHeight-height)/2-20;
			dimensions="width="+width+",height="+height+",left="+wleft+",top="+wtop+",scrollbars";
			window.open(url,'markpage',dimensions);
		}
