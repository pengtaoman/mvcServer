		

		var WFStatdate = new Date();
		var WFstaticWinName = "WorkflowStaticWin" + WFStatdate.getTime();
		var WFstaticWin = null;
		
		function openWFStaticWin()
		{
			WFstaticWin = window.open (unieap.WEB_APP_NAME + "/unieap/pages/workflow/extension/report/PreLoader.jsp", WFstaticWinName, "height=768, width=1024, toolbar= no, menubar=no, scrollbars=yes, resizable=yes, location=no, status=no,top=0,left=0");
		}
		
		function prepareWFStaticWin()
		{
			if(WFstaticWin==null||WFstaticWin.closed == true) openWFStaticWin();
			else
			{
				WFstaticWin.location.href = unieap.WEB_APP_NAME + "/unieap/pages/workflow/extension/report/PreLoader.jsp";
				WFstaticWin.focus();
			}
		}
		
		function getWFStaticWinName()
		{
			return WFstaticWinName;
		}