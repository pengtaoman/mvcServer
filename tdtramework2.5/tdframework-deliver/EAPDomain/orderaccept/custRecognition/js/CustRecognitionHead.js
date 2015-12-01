var saveCustOrder = null;
var webPath = document.getElementsByTagName("context")[0].path;
var newWin = null;
var ifCompoundQuery = false;//add by zhuguojun 20120508 for UI调整：原页面高级查询做为查询方式radio中的一个值，现在移到顶部以连接形式显示，为了不改动原有逻辑，需要增加该变量标识出是否为高级查询

var CustRecognitionHead = function() {
	var Me = this;
	Me.preAcceptFlag = "";
	
	/* 获取路径 */
	Me.getPathValue = function() {
		return document.getElementsByTagName("context")[0].path;
	};
	// 查询方式下拉框集合
	var queryKindMap = {
		'' : ["请选择"],
		'SERVICEID' : ["业务号码"],
		'IDENTITYCARD' : ["身份证"],
		'CUSTNAME' : ["客户名称"],
		'ICCIDNUM' : ["ICCID号码"],
		'OTHERIDENTITYCARD' : ["其它证件号码"],
		'PREACCEPT' : ["预受理编号"]
	};
	
	// 清空查询方式下拉框，重新赋值
	Me.addQueryKinds = function(innetMethodArray) {
		var oQuerykind = $("query_type");
		oQuerykind.innerHTML = "";
		for (var i = 0; i < innetMethodArray.length; i++) {
			Me.addAnQueryKind(innetMethodArray[i], oQuerykind);
		}
	};
	// 下拉框赋值方法
	Me.addAnQueryKind = function(type, moveType) {
		var desc = queryKindMap[type];
		var option = document.createElement("option");
		option.value = type;
		var textNode = document.createTextNode(desc);
		option.appendChild(textNode);
		moveType.appendChild(option);
	};
	
	/**
	 * 初始化页面
	 */
	Me.init = function() {
		WaitingBar.initMe();
		Me.onBlurTips($('exactQuery'));
		Me.initEvent();
		/*不可见页面不好看，修改为可见。点击按钮时加JS判断是否选择客户*/
		//$("modifyCust").style.display = "none";//修改客户信息不可见
		//$("custAllView").style.display = "none";//客户全视图不可见

		
		saveCustOrder = new SaveCustOrder();
		
		//经过和领导商量,不聚焦弹出页面 /modify by yusong @20120725
		/* 
		window.onfocus = function() {
			if (newWin) {
				if (!newWin.closed) newWin.focus();
			}
		};
		
		window.document.onfocus = function() {
			if (newWin) {
				if (!newWin.closed) newWin.focus();
			}
		};
		window.document.onclick = function() {
			if (newWin) {
				if (!newWin.closed) newWin.focus();
			}
		};
		
		window.document.ondblclick = function() {
			if (newWin) {
				if (!newWin.closed) newWin.focus();
			}
		};
		
		$("myIframe").onfocus = function() {
			if (newWin) {
				if (!newWin.closed) newWin.focus();
			}
		};
		$("myIframe").document.onfocus = function() {
			if (newWin) {
				if (!newWin.closed) newWin.focus();
			}
		};
		$("myIframe").document.onclick = function() {
			if (newWin) {
				if (!newWin.closed) newWin.focus();
			}
		};
		$("myIframe").document.ondblclick = function() {
			if (newWin) {
				if (!newWin.closed) newWin.focus();
			}
		};
		*/
		//判断如果验证的弹出页面已弹出 并且输入的是回车调用 查询方法
		document.body.onkeyup = function(evt){
			 var evt = window.event||evt;
				if ($("passValidWindow").style.display !='none' && evt.keyCode == 13) {
					cust_Recognition_Head.BValid_OnClick();
					return false;
				}
		};
		// add by yuan.jt 20111229 客户识别
		CheckIdService.handleCase('init')({
			        'webPath' : webPath,
			        'page' : 'custrecognition'
		        });
		
		// add by hao.zj 2011-06-23 NP申请复用客户识别页面 start
		var flag = $("batchFlag").value;
		if (flag == "3") {
			$("myIframe").src = "";
			$("myIframe").style.height = "300";
		}
		// add by hao.zj 2011-06-23 NP申请复用客户识别页面 end
		//add by zhuguojun 20120513 显示购物车内订单数量 start
		Me.showShoppingCartOrderCount();
		//add by zhuguojun 20120513 显示购物车内订单数量 end
		
		// add by yuan.jt 20111229 客户识别 start
		$("checkIdBtn").disabled = true;
		$("checkIdBtn").style.cursor = "default";
		// add by yuan.jt 20111229 客户识别 end

		//增加权限按钮控制订购按钮是否可展示
		if (!eval($("pageOrderButton").value)) {
			$("orderButton").style.display = "none";
		}
		
		
	
	};
	
	
	// 输入框显示提示信息
	Me.onBlurTips = function(obj) {
		if (obj.value == "") {
			obj.valueCache = "";
			obj.value = obj.tips;
			// 出现提示语，修改样式 add
			obj.style.color = "#cccccc";
		} else {
			obj.valueCache = obj.value;
		}
	};
	
	// 输入框显示提示信息
	Me.onFocusTips = function(obj) {
		obj.value = obj.valueCache;
		// 光标始终在文字最后
		var e = event.srcElement;
		var r = e.createTextRange();
		r.moveStart('character', e.value.length);
		r.collapse(true);
		r.select();
		// 提示语消失，恢复样式 add
		obj.style.color = "#000000";
	};
	
	//根据输入内容确定查询方式
	Me.onChangeQueryType = function(obj) {
		var exactQueryValue = obj.value;
		if (exactQueryValue != obj.tips) {
			/*业务号码：[9到14位数字] 或 [2英文 + 10数字] 或 [2英文+11数字] */
			/*20121217增加：以a/A/n/N/ip/IP开头的为宽带号码*/
			var regServiceId = /^(\d{9,14})$|^([a-zA-Z]{2}\d{10,11})$|^(a|A|n|N|ip|IP|h|H|g|EP).*$/
			/*身份证 15 或 18位数字 或17位数字以X结尾*/
			var regIdentity = /^(\d{15}|\d{17}[\dxX])$/ 
			/*ICCID号*/
			var regIccid = /^\d{19}$/
			/*其他证件号码*/
			var regOther =  /^\d*$/
			if(regServiceId.test(exactQueryValue)){
				$('query_type').value = "SERVICEID";//业务号码
			}
			else if(regIdentity.test(exactQueryValue)){
				$('query_type').value = "IDENTITYCARD";//身份证
			}
			else if(regIccid.test(exactQueryValue)){
				$('query_type').value = "ICCIDNUM";//ICCID
			}
			else if(regOther.test(exactQueryValue)){
				$('query_type').value = "OTHERIDENTITYCARD";//其他证件号
			}
			else{
				$('query_type').value = "CUSTNAME";//姓名
			}
		}
	};
	
	// 根据输入内容过滤查询方式
	//delete by zhuguojun：优化规则，见Me.onChangeQueryType
	Me.onChangeQueryTypeBak = function(obj) {
		var exactQueryValue = obj.value;
		if (exactQueryValue != obj.tips) {
			// 正则表达式判断输入的是否是汉字
			var reg = /[\u4E00-\u9FA5]/g
			// 如果存在汉字，则把查询方式设置成客户名称查询
			if (reg.test(exactQueryValue)) {
				$('query_type').value = "CUSTNAME";
			} else if (exactQueryValue.length == 15 || exactQueryValue.length == 18) {// 如果输入内容长度为15或者18则认为是身份证查询
				$('query_type').value = "IDENTITYCARD";
			} else if (exactQueryValue.length == 19) { // 如果输入内容长度为19位则认为是ICCID号码
				$('query_type').value = "ICCIDNUM";
			} else if (exactQueryValue.length == 11 || exactQueryValue.length == 12
			        || exactQueryValue.length == 32) { // 如果输入内容长度为11CDMA 12PSTN 32ADSL则认为是产品实例号码查询
				$('query_type').value = "SERVICEID";
			} else {
				// 首先判断是否是接入类号码
				var param = "exactQuery=" + $("exactQuery").value + "&queryCityCode="
				        + Me.getCityCode();
				var result = executeRequest("newCustRecognitionAction", "getProdInstCount", param);
				if (result == 0) {
					$('query_type').value = "OTHERIDENTITYCARD";
				} else {
					$('query_type').value = "SERVICEID";
				}
			}
		} else {
			$('query_type').value = "";
		}
		
	};
	
	/**
	 * 初始化页面事件
	 */
	Me.initEvent = function() {
		$('exactQuery').onblur = function() {// 输入框提示信息
			trimField($('exactQuery'));
			Me.onBlurTips($('exactQuery'));
			Me.onChangeQueryType($('exactQuery'));
		};
		$('exactQuery').onfocus = function() {// 输入框提示信息
			Me.onFocusTips($('exactQuery'));
		};
		$("BQuery").onclick = function() {// 精确查询按钮点击事件
			Me.doQuery();
		};
		$("easyQuery").onclick = function() {// 简单查询
			ifCompoundQuery = false;
			Me.onQueryMethodChange();
		};
		$("compoundQuery").onclick = function() {// 高级查询
			ifCompoundQuery = true;
			Me.onQueryMethodChange();
			Me.compoundQuery_onClick();
		};
		$("preacceptQuery").onclick = function() {// 预受理编号选中事件
			ifCompoundQuery = false;
			Me.onQueryMethodChange();
		};
		
		$("newCust").onclick = function() {// 新建客户
			Me.newCust_onClick();
			return false;
		};
		$("modifyCust").onclick = function() {// 修改客户
			Me.modifyCust_onClick();
			return false;
		};
		// $("newAccount").onclick = function(){//新增账户
		// Me.newAccount_onClick();
		// return false;
		// };
		$("custAllView").onclick = function() {// 客户全视图
			Me.custAllView_onClick();
			return false;
		};
		$("lineButton").onclick = function() {// 资源确认
			Me.checkResource_onClick();
			return false;
		};
		$("chooseNumButton").onclick = function() {// 选择号码
			Me.chooseNum_onClick();
			return false;
		};		
		$("descInfo").onmouseout = function() {// 说明信息
			unieap.hideTooltip();
			return false;
		};
		$("ReadIdentity").onclick = function(){//二代身份证
			//Me.showPic();
			Me.BIdentityRead_onclick();
		};
	};
	
	//二代身份证
	Me.BIdentityRead_onclick = function(){
	   var nRet;
	   var obj = document.getElementById("SynCardOcx");//新中新
	   try{
		   //只装新中新驱动情况
		   if(obj && obj.FindReader() && obj.FindReader()>0){
		      obj.SetReadType(0);//参数：0=手动，1=自动
		      var setphotoname=obj.SetPhotoName(2);//参数：0=tmp ， 1=姓名	，2=身份证号	，3=姓名_身份证号
		      var setphototype=obj.SetPhotoType(2);//参数：0=bmp ， 1=jpeg	，2=base64
		      nRet = obj.ReadCardMsg();
		      if(nRet == 0 && setphotoname==0 && setphototype == 0){
		    	  $('exactQuery').value=  obj.CardNo;
		    		trimField($('exactQuery'));
					Me.onBlurTips($('exactQuery'));
					Me.onFocusTips($('exactQuery'));
					Me.onChangeQueryType($('exactQuery'));
					
		    	  cust_Recognition_Head.doQuery();
		    	  $("identityPhotoLink").src="data:image/jpeg;base64,"+obj.Base64Photo;
			  }else{
	
		        //alert("请确认身份证放置是否正确！");
		        orderaccept.common.dialog.MessageBox.alert({busiCode:"08510129"});
		      }
		    }else{
		    	//alert("找不到读卡器！请检查驱动是否正确安装，并尝试其他USB接口。");
		    	orderaccept.common.dialog.MessageBox.alert({busiCode:"08510130"});
		    }
	   }catch(e){
		   orderaccept.common.dialog.MessageBox.alert({busiCode:"08510130"});
	   }
	}
	
	/**
	 * 高级查询
	 */
	Me.compoundQuery_onClick = function() {
		var pagePath = Me.getPathValue() + "/newCustRecognitionAction.do?method=doCompoundQuery";
		// window.showModalDialog(pagePath, cust_Recognition_Head,
		// 'dialogHeight:500px;dialogWidth:850px;center:yes;scroll=no;');
		var title = '客户查询';
		var height = '540';
		var width = '1000';
		var data = {opener:window};
		var isComplete = new Boolean(false);
		openWinDialog(pagePath,title,height,width,data,isComplete);
		//newWin = window
		//        .open(
		//                pagePath,
		//                'newWin',
		//                'toolbar=no,menubar=no,status=0,location=no,resizable=0,scrollbars=no,top=150,left=10,width=1000,height=500');
	};
	
	/**
	 * 新建客户
	 */
	Me.newCust_onClick = function() {
		var pagePath = Me.getPathValue() + "/custInfoServiceAction.do?method=doInit";
		var title = '新建客户';
		var height = '400';
		var width = '1000';
		var data = {opener:window};
		var isComplete = new Boolean(false);
		openWinDialog(pagePath,title,height,width,data,isComplete);
		
		//newWin = window.open(pagePath, 'newWin',
		//        'status=1,resizable=0,scrollbars=yes,top=150,left=10,width=1000,height=400');
	};
	
	Me.getCityCode = function() {
		return $("queryCityCode").value;
	};
	
	/**
	 * 增加新客户成功后，显示新客户信息
	 */
	Me.doAfterAddCust = function(param) {
		$("custIdHidden").value = param;
		$("custOrderId").value = "";
		/* modify by zhuguojun 20120510 for ui start 文字变图片，一直显示。*/
		//$("modifyCust").disabled = false;
		//$("custAllView").disabled = false;
		//$("modifyCust").style.display = "";
		//$("custAllView").style.display = "";
		/* modify by zhuguojun 20120510 for ui end*/
		$("query_type").value = "";
		Me.getCustInfoMethod();
		Me.getCustRetainMethod();
		Me.getCustDetailMethod();
		Me.showShoppingCartOrderCount();
	};
	
	/**
	 * 修改客户资料
	 */
	Me.modifyCust_onClick = function() {
		//if ($("modifyCust").disabled) return;
		if(!Me.isChooseCust()){
			orderaccept.common.dialog.MessageBox.alert({busiCode:"08410059"});
			//alert("请先查询并选择客户");
			return false;
		}
		var paramValue = "&custId=" + $("custIdHidden").value;
		paramValue += "&strServingStatus=" + $('statusCd').value;
		paramValue += "&varValue=1002";// 修改
		paramValue += "&strCustKind=" + $('groupFlag').value;
		
		if($("serviceIdHidden").value!="" && $("prodcutIdHidden").value!=""){
			paramValue += "&serviceId=" + $('serviceIdHidden').value;
			paramValue += "&productId=" + $('prodcutIdHidden').value;
		}
		
		/*document.EAPForm.action = Me.getPathValue()
		        + "/ordermgr/custInfoMgrAction.do?method=doCustInfoQuery" + paramValue;
		newWin = window.open("about:blank", 'custModifyPage',
		        'status=1,resizable=0,scrollbars=yes,top=10,left=10,width=1000,height=400');
		document.EAPForm.target = "custModifyPage";
		document.EAPForm.submit();*/
		
		
		var pagePath = Me.getPathValue()+ "/ordermgr/custInfoMgrAction.do?method=doCustInfoQuery" + paramValue;
		var title = '修改客户';
		var height = '400';
		var width = '1000';
		var data = {opener:window};
		var isComplete = new Boolean(false);
		openWinDialog(pagePath,title,height,width,data,isComplete);
		
	};
	/**
	 * 修改客户成功后，显示新客户信息
	 */
	Me.doAfterModifyCust = function() {
		Me.getCustInfoMethod();
		Me.getCustRetainMethod();
		Me.getCustDetailMethod();
		Me.showShoppingCartOrderCount();
	};
	
	// 新增账户
	Me.newAccount_onClick = function() {
		if ($("newAccount").disabled) return;
		var pagePath = Me.getPathValue() + "/accountAcceptAction.do?method=getAccountInfoBus";
		document.EAPForm.action = pagePath;
		newWin = window.open("about:blank", 'accountAddPage',
		        'status=1,resizable=0,scrollbars=yes,top=10,left=10,width=1000,height=700');// 提交到新打开的全屏窗口中
		document.EAPForm.target = "accountAddPage";
		document.EAPForm.submit();
		
	};
	
	// 客户全视图
	Me.custAllView_onClick = function() {
		//if ($("custAllView").disabled) return;
		if(!Me.isChooseCust()){
			orderaccept.common.dialog.MessageBox.alert({busiCode:"08410059"});
			//alert("请先查询并选择客户");
			return false;
		}
		var customerId = $("custIdHidden").value;
		var cityCode = Me.getCityCode();
		var userName = $("userName").value;
		var userPassWord = $("userPassWord").value;
		var pagePath = Me.getPathValue()
		        + '/../crm3/views/crmsystem/retain/unifycustview/UnifyCustView.jsp?&customerId='
		        + customerId + '&cityCode=' + cityCode + '&STAFFNO=' + userName + '&PASSWORD='
		        + userPassWord;
		newWin = window.open(pagePath, 'newWin',
		        'status=1,resizable=0,scrollbars=yes,top=10,left=100,width=1000,height=700');
		
	};
	
	//资源确认
	Me.checkResource_onClick = function(){
		var cityCode = $("employeeCity").value;
		var areaCode = $("areaCode").value;
		var userName = $("userName").value;
		var userPassWord = $("userPassWord").value;
		var pagePath = Me.getPathValue()
		        + '/../crm2/resource/interfacemanage/standardadd/StandardAddrQuery.jsp?&cityCode='
		        + cityCode + '&areaCode=' + areaCode + '&STAFFNO=' + userName + '&PASSWORD='
		        + userPassWord;
		newWin = window.open(pagePath, 'newWin',
		        'status=1,resizable=0,scrollbars=yes,top=10,left=100,width=1000,height=700');
	}
	
	//选择号码
	Me.chooseNum_onClick = function(){		
		var pagePath = Me.getPathValue() + "/custcontact/preselectphone/PreSelectPhoneMain.jsp";
		newWin = window.open(pagePath, 'newWin',
		        'status=1,resizable=1,scrollbars=yes,top=100,left=100,width=900,height=650');
	}
	
	// 说明信息
	Me.descInfo_onClick = function(obj) {
		var htmlStr = "<div class='tooltip-wrapper' style='width: 300px;'>";
			htmlStr += "<div class='tooltip-title'>";
			htmlStr += "<span class='tooltip-title-text'>温馨提示</span>";
			htmlStr += "</div>";
			htmlStr += "<div class='tooltip-content' style='padding: 0 10 0 0;'>";
			htmlStr += "	<ul type=1>";
			htmlStr += "		<li>如果您还没录入客户信息，请点击左上角的【新建客户】，录入相关信息！</li>";
			htmlStr += "        <li>查询分二种方式：客户查询、预受理查询。输入号码后，自动匹配查询方式，也可手动选择。页面右上角可以选择高级客户查询。</li>";
			htmlStr += "        <li>如果选择未选择模糊查询则为精确查询，如果未选择客户级则为非客户级查询。</li>";
		    htmlStr += "    </ul>";
			htmlStr += "</div>";
			htmlStr += "</div>";
		unieap.showTooltip({inner:htmlStr,autoClose:true},obj,['below']);
	};
	
	// 判断选择的是预受理查询还是简单查询显示查询方式不同
	Me.onQueryMethodChange = function() {
		var queryMethod = Me.getCheckedQueryMethod();// 选中的查询方式
		
		if (queryMethod == "COMPOUNDQUERY") { // 高级查询
			$('exactQuery').value = "";
			$("EASYQUERY").checked = true;
			//$('exactQuery').disabled = true;
			//$('query_type').disabled = true;
			//$('BQuery').disabled = true;
			//$('ReadIdentity').disabled = true;
		} else {
			$('exactQuery').value = $('exactQuery').tips;
			//$('exactQuery').disabled = false;
			//$('query_type').disabled = false;
			//$('BQuery').disabled = false;
			//$('ReadIdentity').disabled = false;
		}
		
		if (queryMethod == "PREACCEPTQUERY") { // 预受理查询
			Me.addQueryKinds(['PREACCEPT']);
			$('exactQuery').value = "";
			$('exactQuery').onblur = function() {// 将输入提示框事件清空
			};
		} else {
			Me.addQueryKinds(['', 'SERVICEID', 'IDENTITYCARD', 'CUSTNAME', 'ICCIDNUM',
			        'OTHERIDENTITYCARD']);
			$('exactQuery').value = "业务号码、证件号码、客户名称、ICCID进行模糊查询";
			// 出现提示语，修改样式 add
			$('exactQuery').style.color = "#cccccc";
			$('exactQuery').onblur = function() {// 输入框提示信息
				Me.onBlurTips($('exactQuery'));
				Me.onChangeQueryType($('exactQuery'));
			};
		}
	};
	
	/**
	 * 点击查询按钮事件
	 */
	Me.doQuery = function() {
		WaitingBar.showMe();
		ifCompoundQuery = false;
		var queryMethod = Me.getCheckedQueryMethod();// 选中的查询方式
		//初始化图片
		 $("identityPhotoLink").src= webPath +"/common/dx20/images/photo.gif";
		
		if($("query_type").value==""){
			orderaccept.common.dialog.MessageBox.alert({busiCode:"08410228"});
			//alert("请选择查询方式！");
			WaitingBar.hideMe();
			return false;
		}
		trimField($('exactQuery'));
		// 当查询方式为复合查询的时候，不进行非空检验。
		if (queryMethod != "CompoundQuery") {
			if ($("exactQuery").value == "" || $("exactQuery").value == $("exactQuery").tips) {
				orderaccept.common.dialog.MessageBox.alert({busiCode:"08410060"});
				//alert("请输入查询条件！");
				$("exactQuery").focus();
				WaitingBar.hideMe();
				return false;
			}
		}
		
		$("serviceIdHidden").value = "";
		$("prodcutIdHidden").value = "";
		
		var nicetyQuery = Me.getNicetyQueryMethod();// 是否精确查询
		var custLevel = Me.getCustLevelMethod();// 是否客户级
		var parameter = '';
		parameter += "&queryCityCode=" + Me.getCityCode();
		parameter += "&nicetyQuery=" + nicetyQuery;
		parameter += "&custLevel=" + custLevel;
		if (queryMethod == "EASYQUERY") { // 简单查询
			parameter += "&exactQuery=" + $("exactQuery").value;
			parameter += "&queryMethod=" + queryMethod;
			
		}
		// 判断是否是预受理或者NP 如果是获取预受理编号或者NP信息
		Me.getPreOrNPMethod(queryMethod);
		
		if ($("npInfo").value != "") {
			parameter += "&queryType=npMethod";// 查询方式
			parameter += "&custIdHidden=" + $("custIdHidden").value;// 查询方式
		} else {
			parameter += "&queryType=" + $("query_type").value;// 查询方式
		}
		
		// 预约受理特例查询
		if (queryMethod == "PREACCEPTQUERY"
		        || ($("query_type").value == "SERVICEID" && Me.preAcceptFlag == "1")) {
			var param = "preRgsNo=" + $("preRgsNo").value;
			var result = executeRequest("preAcceptAction", "getProAcceptOrderInfo", param);
			if (!result) {
				orderaccept.common.dialog.MessageBox.alert({busiCode:"08410061"});
				//alert("此预受理编号不存在未受理订单!");
				$("preRgsNo").value = "";
				Me.preAcceptFlag == "";
				WaitingBar.hideMe();
				return false;
			} else {
				var resultJson = Jscu.util.CommUtil.parse(result);
				var customerId = resultJson.customerId;
				if (customerId > 0) {
					var param = "&custIdHidden=" + customerId + "&queryType=PREACCEPT";
					var preResult = executeRequest("newCustRecognitionAction", "doQueryCount",
					        param);
					var preResultObj;
					if (preResult != "null") {
						preResultObj = Jscu.util.CommUtil.parse(preResult);
					}
					
					if (preResultObj.count == "0") {
						orderaccept.common.dialog.MessageBox.alert({busiCode:"08410062"});
						//alert("没有相关记录，请核查！");
						WaitingBar.hideMe();
						return;
					}
					WaitingBar.hideMe();
					Me.showPassValidWindow(resultJson.customerId, resultJson.identityKind,
					        resultJson.identityCode);
					WaitingBar.hideMe();
					return;
					
				} else {
					$("preFlag").value = "have";
					var pagePath = Me.getPathValue() + "/custInfoServiceAction.do?method=doInit"
					        + "&preAcceptInfo=have" + "&preRgsNo=" + $("preRgsNo").value;					        
					var title = '新建客户';
					var height = '400';
					var width = '1000';
					var data = {opener:window};
					var isComplete = new Boolean(false);
					openWinDialog(pagePath,title,height,width,data,isComplete);
					
					WaitingBar.hideMe();
//					newWin = window
//					        .open(pagePath, 'newWin',
//					                'status=1,resizable=0,scrollbars=yes,top=10,left=10,width=1000,height=400');
					return;
				}
			}
		}
		
		var resultMsg = executeRequest("newCustRecognitionAction", "doQueryCount", parameter
		                .substring(1));
		var jsonResultObj;
		if (resultMsg != "null") {
			jsonResultObj = Jscu.util.CommUtil.parse(resultMsg);
		}
		
		if (jsonResultObj.count == "0") {
			WaitingBar.hideMe();
			orderaccept.common.dialog.MessageBox.alert({busiCode:"08410063"});
			//alert("没有相关记录，请核查！");
			return;
		}
		
		if (jsonResultObj.count == "1") {
			WaitingBar.hideMe();
			//开关判断是否需要客户身份验证 0不需要1需要
			var paramerer = "cityCode=" + Me.getCityCode() + "&objectValue=5566&serviceKind=-1&serviceOfferId=-1"; 
			var result = executeRequest("custAcceptAjaxAction", "doBusinessSwitch", paramerer);
			//如果是业务号码进行查询
			if ($("query_type").value == "SERVICEID") {
				$("serviceIdHidden").value = $("exactQuery").value;
				$("prodcutIdHidden").value = jsonResultObj.productId;
			}
			
			if(result==1){
				Me.showPassValidWindow(jsonResultObj.custId, jsonResultObj.identityKind,
				        jsonResultObj.identityCode);
			}else{
				if($("query_type").value=="SERVICEID"){
					var paramerer = "cityCode=" + Me.getCityCode() + "&serviceId=" + $("exactQuery").value;
					var result = executeRequest("custAcceptAjaxAction", "doCheckUimKindIsOld", paramerer);
					if(result != "" && result != null){
						//alert("您使用的是"+result+"卡，可以先受理换补卡业务，免费领取新卡!");
						orderaccept.common.dialog.MessageBox.alert({busiCode:"08410240",infoList:[result],
							onComplete:function(){
							Me.DoNotValid_OnClick(jsonResultObj.custId, jsonResultObj.identityKind,
							        jsonResultObj.identityCode);
						}});
						
					}else{
						Me.DoNotValid_OnClick(jsonResultObj.custId, jsonResultObj.identityKind,
						        jsonResultObj.identityCode);
					}
				}else{
					Me.DoNotValid_OnClick(jsonResultObj.custId, jsonResultObj.identityKind,
					        jsonResultObj.identityCode);
				}
			}
			
			return;
		} else {
			parameter += "&doQueryCount=" + jsonResultObj.count;//查询的行数
			var pagePath = Me.getPathValue() + "/newCustRecognitionAction.do?method=doQuery&"
			        + parameter;
			// window.showModalDialog(pagePath, cust_Recognition_Head,
			// 'dialogHeight:500px;dialogWidth:850px;center:yes;scroll=no;');
			var title = '查询结果';
			var height = '420';
			var width = '1000';
			var data = {opener:window};
			var isComplete = new Boolean(false);
			openWinDialog(pagePath,title,height,width,data,isComplete);
			WaitingBar.hideMe();
			//newWin = window.open(pagePath, 'newWin',
			//        'status=1,resizable=0,scrollbars=yes,top=10,left=10,width=1000,height=400');
		}
		
	};
	/**
	 * 获取选中的查询方式
	 */
	Me.getCheckedQueryMethod = function() {
		var queryMethod;
		if(ifCompoundQuery){
			return "COMPOUNDQUERY";
		}
		var queryMethodColl = document.getElementsByName("queryMethod");
		for (var i = 0; i < queryMethodColl.length; i++) {
			if (queryMethodColl[i].checked) {
				queryMethod = queryMethodColl[i].value;
			}
		}
		return queryMethod;
	};
	
	/**
	 * 获取是否精确查询
	 */
	Me.getNicetyQueryMethod = function() {
		var queryMethod;
		if ($("nicetyQuery").checked) {
			queryMethod = "0";// 模糊查询  modify by zhuguojun 20120602 页面图标显示名称由精确查询变为模糊查询
		} else {
			queryMethod = "1";// 精确查询
		}
		return queryMethod;
	};
	/**
	 * 获取是否是客户级
	 */
	Me.getCustLevelMethod = function() {
		var queryMethod;
		if ($("custLevel").checked) {
			queryMethod = "1";
		} else {
			queryMethod = "2";
		}
		return queryMethod;
	};
	/**
	 * 加载密码验证页面
	 */
	Me.showPassValidWindow = function(custId, identityKind, identityCode) {
		$("custPassWordValid").value = "";
		$("identityCodeValid").value = "";
		$("custPassWordValid").value = "";
		$("productPassWordValid").value = "";
		// modify by yuan.jt 20111222 start 默认密码通过选项
		// $("checking01").checked =true;
		$("checking04").checked = true;
		// modify by yuan.jt 20111222 end 默认密码通过选项
		if ($("query_type").value == "SERVICEID") {
			$('prodPassWord').style.display = "";
		} else {
			$('prodPassWord').style.display = "none";
		}
		
		jUtil.showwindow($("passValidWindow"), 1);
		$("custIdHidden").value = custId;// 获取客户ID
		$("identityKindHidden").value = identityKind;// 获取客户ID
		$("identityCodeHidden").value = identityCode;// 获取客户ID
		// add by yuan.jt 20111229 身份核查 start
		if (identityKind == '1') $('checkIdBtn').disabled = false;
		// add by yuan.jt 20111229 身份核查 end
		
		$("passValidWindow").style.top = "140px";
	};
	/**
	 * 密码不验证方法
	 */
	Me.DoNotValid_OnClick = function(custId, identityKind, identityCode) {
		$("custIdHidden").value = custId;// 获取客户ID
		$("identityKindHidden").value = identityKind;// 获取客户ID
		$("identityCodeHidden").value = identityCode;// 获取客户ID
		
		var custCheckVlue = Me.getCustCheckMethod();
		var custId = $("custIdHidden").value;
		$("preAcceptQueryFlag").value = "";

		Me.getCustInfoMethod();
		Me.getCustRetainMethod();
		var queryMethod = Me.getCheckedQueryMethod();// 获取查询方式
		if (!(queryMethod == "PREACCEPTQUERY" || ($("query_type").value == "SERVICEID" && Me.preAcceptFlag == "1"))) {// 预受理编号查询方式，不做处理
			Me.getPreAcceptInfoByCustId();// 该客户是否有预受理信息存在
		}
		Me.getCustDetailMethod();
		
		// 调用账务接口。查看是否欠费
		var jsonObj = Jscu.util.CommUtil.parse($('custXml').value);
		    cityCode = jsonObj.cityCode,
			identityKind = jsonObj.identityKind,
			identityCode = jsonObj.identityCode;
		
		var accoutParam = "cityCode="+cityCode+"&identityKind="+identityKind+"&identityCode="+identityCode;
		var isLack = executeRequest("newCustRecognitionAction", "getIfShowLeft", accoutParam);
		if("-1"==isLack){//欠费
			$("ifShow").style.display = "";	
		}	
		Me.showShoppingCartOrderCount();
		$("custOrderId").value = "";
		
		if (identityKind == '1') $('checkIdBtn').disabled = false;
		//Me.checkImportantUserLack();
		window.setTimeout("checkImportantUserLack()",1);
		
	};
	/**
	 * 密码验证方法
	 */
	Me.BValid_OnClick = function() {
		var custCheckVlue = Me.getCustCheckMethod();
		var custId = $("custIdHidden").value;
		$("preAcceptQueryFlag").value = "";
		
		if (custCheckVlue == "custPassWordValid") {// 根据客户密码验证
			var pass = $("custPassWordValid").value;
			if (!pass) {
				orderaccept.common.dialog.MessageBox.alert({busiCode:"08410064"});
				//alert("密码不能为空!");
				return;
			}
			if (pass && pass.length < 6) {
				orderaccept.common.dialog.MessageBox.alert({busiCode:"08410065"});
				//alert("密码长度不正确!");
				return;
			}
			var paramerer = "custId=" + custId + "&passwdType=1&passwd=" + pass;
			var result = executeRequest("custAcceptAjaxAction", "doValidPassword", paramerer);
			if (result == '1') {
				// 密码验证通过
				//orderaccept.common.dialog.MessageBox.alert({busiCode:"08410066"});
				//alert('密码验证通过,可以继续操作！');
				jUtil.hide($("passValidWindow"), 1);
			} else {
				orderaccept.common.dialog.MessageBox.alert({busiCode:"08410067"});
				//alert('密码验证没通过！');
				$('custPassWordValid').value = '';
				$('custPassWordValid').focus();
				return;
			}
			
		} else if (custCheckVlue == "identityKindValid") {// 根据证件号码验证
			var identityKindValid = $("identityKindValid").value;
			var identityCodeValid = $("identityCodeValid").value;
			if (identityKindValid != $("identityKindHidden").value) {
				//alert("证件类型校验不符，请确认！");
				orderaccept.common.dialog.MessageBox.alert({busiCode:"08410068"});
				$('identityKindValid').focus();
				return;
			} else if (identityCodeValid != $("identityCodeHidden").value) {
				orderaccept.common.dialog.MessageBox.alert({busiCode:"08410069"});
				//alert("证件号码校验失败，请确认！");
				$('identityCodeValid').focus();
				return;
			}
			jUtil.hide($("passValidWindow"), 1);
		} else if (custCheckVlue == "productPassWordValid") { // 根据产品密码校验
			if (!$("productPassWordValid").value) {
				orderaccept.common.dialog.MessageBox.alert({busiCode:"08410070"});
				//alert("密码不能为空!");
				return;
			}
			if ($("productPassWordValid").value && $("productPassWordValid").value.length < 6) {
				orderaccept.common.dialog.MessageBox.alert({busiCode:"08410071"});
				//alert("密码长度不正确!");
				return;
			}
			var paramerer = "custId=" + custId;
			paramerer += "&productPassWordValid=" + $("productPassWordValid").value;
			paramerer += "&queryCityCode=" + Me.getCityCode();
			paramerer += "&serviceId=" + $("exactQuery").value;
			
			var result = executeRequest("newCustRecognitionAction", "getProductPassword", paramerer);
			if (result == '1') {
				// 密码验证通过
				//alert('密码验证通过,可以继续操作！');
				//orderaccept.common.dialog.MessageBox.alert({busiCode:"08410072"});
				jUtil.hide($("passValidWindow"), 1);
			} else {
				orderaccept.common.dialog.MessageBox.alert({busiCode:"08410073"});
				//alert('密码验证没通过！');
				$('productPassWordValid').value = '';
				$('productPassWordValid').focus();
				return;
			}
		} else if (custCheckVlue == "passCheck") {
			jUtil.hide($("passValidWindow"), 1);
		}
		Me.getCustInfoMethod();
		Me.getCustRetainMethod();
		var queryMethod = Me.getCheckedQueryMethod();// 获取查询方式
		if (!(queryMethod == "PREACCEPTQUERY" || ($("query_type").value == "SERVICEID" && Me.preAcceptFlag == "1"))) {// 预受理编号查询方式，不做处理
			Me.getPreAcceptInfoByCustId();// 该客户是否有预受理信息存在
		}
		Me.getCustDetailMethod();
		
		//$("modifyCust").disabled = false;
		//$("modifyCust").style.display = "";
		//$("modifyCust").style.cursor = "pointer";
		// $("newAccount").disabled = false;
		// $("newAccount").style.cursor = "pointer";
		//$("custAllView").disabled = false;
		//$("custAllView").style.display = "";
		//$("custAllView").style.cursor = "pointer";
		
		// 调用账务接口。查看是否欠费
		var jsonObj = Jscu.util.CommUtil.parse($('custXml').value);
		    cityCode = jsonObj.cityCode,
			identityKind = jsonObj.identityKind,
			identityCode = jsonObj.identityCode;
		
		var accoutParam = "cityCode="+cityCode+"&identityKind="+identityKind+"&identityCode="+identityCode;
		var isLack = executeRequest("newCustRecognitionAction", "getIfShowLeft", accoutParam);
		if("-1"==isLack){//欠费
			$("ifShow").style.display = "";	
		}	
		Me.showShoppingCartOrderCount();
		$("custOrderId").value = "";
		//Me.checkImportantUserLack();
		window.setTimeout("checkImportantUserLack()",1);
	};
	
	/**
	 * 获取客户信息
	 */
	Me.getCustInfoMethod = function() {
		var paramerer = "custId=" + $("custIdHidden").value;
		paramerer += "&queryCityCode=" + Me.getCityCode();
		var jsonResult = executeRequest("newCustRecognitionAction", "getCustInfoMethod", paramerer);
		var jsonObj = Jscu.util.CommUtil.parse(jsonResult);
		if (jsonObj.flag == 1) {
			$('custNameShow').value = jsonObj.custNameShow;
			$('identityKindShow').innerHTML = jsonObj.identityKindShow;
			$('identityCodeShow').innerHTML = jsonObj.identityCodeShow;
			$('contactNameShow').innerHTML = jsonObj.contactNameShow;
			$('contactPhoneShow').innerHTML = jsonObj.contactPhoneShow;
			$('certAddressShow').value = jsonObj.certAddressShow;
			$('custTypeShow').innerHTML = jsonObj.custTypeShow;
			$('stateShow').innerHTML = jsonObj.stateShow;
			$('linkAddressShow').value = jsonObj.linkAddressShow;
			$('statusCd').value = jsonObj.state;
			$('groupFlag').value = jsonObj.groupFlag;
			$('importantLevel').value = jsonObj.importantLevel;
			
			// 拆分，拼取json串 --后台提交时使用
			var queryMsg = {
				custId : jsonObj.custId,
				cityCode : jsonObj.cityCode,
				custName : jsonObj.custName,
				identityKind : jsonObj.identityKind,
				identityCode : jsonObj.identityCode,
				custAddress : jsonObj.custAddress,
				customerKind : jsonObj.customerKind,
				state : jsonObj.state,
				custType : jsonObj.custType,
				linkPhone : jsonObj.linkPhone
			}
			var JsonData = Jscu.util.CommUtil.toJson(queryMsg);
			$('custXml').value = JsonData;
		}
		// 购物车和订购按钮显示
		// add by hao.zj 2011-06-23 NP申请复用客户识别页面 start
		// $("orderButton").style.display = "";
		// $("cartButton").style.display = "";
		// $("lineButton").style.display = "";
		/*delete by zhuguojun 20120517 目前业务不支持NP受理，保留代码。
		var flag = $("batchFlag").value;
		if (flag != "3") {
			$("orderButton").style.display = "";
			$("cartButton").style.display = "";
			$("lineButton").style.display = "";
		}*/
		// add by hao.zj 2011-06-23 NP申请复用客户识别页面 end
	};
	/**
	 * 获取客户维系信息
	 */
	Me.getCustRetainMethod = function() {
		var paramerer = "custId=" + $("custIdHidden").value;
		paramerer += "&queryCityCode=" + Me.getCityCode();
		var jsonResult = executeRequest("newCustRecognitionAction", "getCustRetainMethod",
		        paramerer);
		var jsonObj = Jscu.util.CommUtil.parse(jsonResult);
		if (jsonObj.flag == 1) {
			// $('custBirthdyShow').innerHTML="1982-02-02";
			$('creditLevelShow').innerHTML = jsonObj.creditLevel;
			$('hcustLevelShow').innerHTML = jsonObj.hcustLevel;
			$('pointValueShow').innerHTML = jsonObj.pointValue;
			// $('complaintHandlingShow').innerHTML="";
			// $('stoppageReportShow').innerHTML="";
		}
	};
	/**
	 * 客户订购信息
	 */
	Me.getCustDetailMethod = function() {
		var src = Me.getPathValue()
		        + "/newCustRecognitionAction.do?method=doQueryCustDetail&custId="
		        + $("custIdHidden").value + "&queryType=" + $("query_type").value + "&cityCode="
		        + Me.getCityCode() + "&serviceId=" + $("exactQuery").value + "&queryLevel="
		        + Me.getCustLevelMethod() + "&npInfo=" + $("npInfo").value + "&preRgsNo="
		        + $("preRgsNo").value + "&preAcceptQueryFlag=" + $("preAcceptQueryFlag").value
		        + "&preAcceptInfo=" + $("preFlag").value;
		// add by hao.zj 2011-06-23 NP申请复用客户识别页面 start
		var flag = $("batchFlag").value;
		if (flag == "3") {
			var parameter = "flag=" + flag + "&custId=" + $("custIdHidden").value;
			src = Me.getPathValue() + "/npAction.do?method=gotoNpAcceptContent&" + parameter;
		}
		// add by hao.zj 2011-06-23 NP申请复用客户识别页面 end
		$("myIframe").src = src;
	};
	
	/**
	 * 根据客户id判断是否存在预受理信息
	 */
	Me.getPreAcceptInfoByCustId = function() {
		var parameter = "custId=" + $("custIdHidden").value;
		parameter + "&cityCode=" + Me.getCityCode();
		var result = executeRequest("preAcceptAction", "getPreAcceptInfoByCustId", parameter);
		if (result) {
			$("preRgsNo").value = result;
			$("preAcceptQueryFlag").value = "queryByCustId";// 标识查询方式为客户标识
		}
	};
	/**
	 * 获取客户身份验证方式
	 */
	Me.getCustCheckMethod = function() {
		var queryMethod;
		var queryMethodColl = document.getElementsByName("check_radio");
		for (var i = 0; i < queryMethodColl.length; i++) {
			if (queryMethodColl[i].checked) {
				queryMethod = queryMethodColl[i].value;
			}
		}
		return queryMethod;
	};
	/**
	 * 取消认证
	 */
	Me.closePage = function() {
		jUtil.hide($("passValidWindow"), 1);
	};
	/**
	 * 判断是否是预受理或者NP 如果是获取预受理编号或者NP信息
	 */
	Me.getPreOrNPMethod = function(queryMethod) {
		var queryType = $('query_type').value; // 查询方式
		
		if (queryMethod == "PREACCEPTQUERY") {
			$("preRgsNo").value = $("exactQuery").value;
			return;
		}
		if (queryType != "SERVICEID") {
			$("npInfo").value = "";
			return;
		}
		var serviceId = $('exactQuery').value;
		var parameter = "serviceId=" + serviceId + "&ifValid=1";
		var result = executeRequest("custAcceptAjaxAction", "getProductIdList", parameter);
		if (result == -1) {
			var param = "serviceId=" + serviceId;
			var resultStr = executeRequest("preAcceptAction", "getOrderInfosByServiceId", param);
			if (resultStr != -1) {
				Me.preAcceptFlag = "1";
				$("preRgsNo").value = resultStr;
				return;
			} else {
				var returnResult = executeRequest("custAcceptAjaxAction", "getinfoFromselectNum",
				        param);
				if (!returnResult) {
					return;
				} else {
					var npJson = Jscu.util.CommUtil.parse(returnResult);
					var customerId = npJson.customerId;
					var serviceId = npJson.serviceId;
					var serviceKind = npJson.serviceKind;
					var npFlag = npJson.npFlag;
					var npMgs = serviceId + "'nps'" + serviceKind + "'" + npFlag;
					$("npInfo").value = npMgs;
					$("custIdHidden").value = customerId;
					return;
				}
			}
		}
		Me.preAcceptFlag = "";
		$("preRgsNo").value = "";
		$("npInfo").value = "";
		$("custIdHidden").value = "";
	};
	/* 点击销售品订购事件 */
	Me.onOrderSalesBn = function() {
		// 一次受理检测
		var parameters = "customerId=" + $("custIdHidden").value;
		parameters += "&cityCode=" + Me.getCityCode();
		parameters += "&actionCD=301";
		var resultJsonStr = executeRequest("prodOfferSaleAjaxAction", "doCheckOrderValid",
		        parameters);
		var result = executeAjaxResult(resultJsonStr);
		if (result === false) { return false; }
		$("operFlag").value = "productInstall";
		
		var parameter = "&flag=" + $("batchFlag").value + "&npMsg=" + $("npInfo").value
		        + "&preRgstNo=" + $("preRgsNo").value;
		// "&custXml="+$('custXml').value+
		// "&operFlag="+$("operFlag").value+
		// "&tempSaveOrderXML="+$("tempSaveOrderXML").value+
		// "&custOrderId="+$("custOrderId").value+
		// "&accountXml="+$("accountXml").value+
		// "&accountId="+$("accountId").value;
		// var pagePath = Me.getPathValue()+"/prodOfferSaleAction.do?method=init"+parameter;
		// newWin = window.open(pagePath, 'newWin',
		// 'status=1,resizable=0,scrollbars=yes,top=10,left=10,width=1000,height=700');
		
		document.EAPForm.action = Me.getPathValue() + "/prodOfferSaleAction.do?method=init"
		        + parameter;
		newWin = window.open("about:blank", 'prodOfferSalePage',
		        'status=1,resizable=0,scrollbars=yes,top=10,left=10,width=1000,height=700');
		document.EAPForm.target = "prodOfferSalePage";
		document.EAPForm.submit();
	};
	/* 点击销售品订购事件 */
	Me.initProdOfferOrder = function() {
		if(!Me.isChooseCust()){
			orderaccept.common.dialog.MessageBox.alert({busiCode:"08410059"});
			//alert("请先查询并选择客户");
			return false;
		}
		// 一次受理检测
		var parameters = "customerId=" + $("custIdHidden").value;
		parameters += "&cityCode=" + Me.getCityCode();
		parameters += "&actionCD=301";
		var resultJsonStr = executeRequest("prodOfferSaleAjaxAction", "doCheckOrderValid",
		        parameters);
		var result = executeAjaxResult(resultJsonStr);
		if (result === false) { return false; }
		$("operFlag").value = "productInstall";
		
		var parameter = "&flag=" + $("batchFlag").value + "&npMsg=" + $("npInfo").value
		        + "&preRgstNo=" + $("preRgsNo").value;
		// "&custXml="+$('custXml').value+
		// "&operFlag="+$("operFlag").value+
		// "&tempSaveOrderXML="+$("tempSaveOrderXML").value+
		// "&custOrderId="+$("custOrderId").value+
		// "&accountXml="+$("accountXml").value+
		// "&accountId="+$("accountId").value;
		// var pagePath = Me.getPathValue()+"/prodOfferSaleAction.do?method=init"+parameter;
		// newWin = window.open(pagePath, 'newWin',
		// 'status=1,resizable=0,scrollbars=yes,top=10,left=10,width=1000,height=700');
		//alert(detectedOrderDetailFrame())
		if (detectedOrderDetailFrame()) {
			var orderDetalFrame = detectedOrderDetailFrame();
			document.EAPForm.target = "orderDetailFrame";
			orderDetalFrame.contentWindow.parent.$switchPane$([false, true]);
			parameter = parameter + "&custXml=" + $('custXml').value + "&operFlag="
			        + $("operFlag").value + "&tempSaveOrderXML=" + $("tempSaveOrderXML").value
			        + "&custOrderId=" + $("custOrderId").value + "&accountXml="
			        + $("accountXml").value + "&accountId=" + $("accountId").value;
			__executeRequest("prodOfferSaleAction", "initProdOfferOrderWithAjax", parameter
			                .substring(1), true, function(xhr) {
				        orderDetalFrame.contentWindow.initOrderAcceptPage(xhr.responseText);
			        });
			
		} else {
			parameter+="&custId="+$("custIdHidden").value;
			var targetUrl=document.EAPForm.action = Me.getPathValue()
			        + "/prodOfferSaleAction.do?method=initProdOfferOrder" + parameter;
			document.EAPForm.action=targetUrl;
			newWin = window.open("about:blank", 'prodOfferSalePage',
			        'status=0,resizable=1,scrollbars=yes,top=0,left=0,width='
			                + (window.screen.width-12) + ',height='
			                + (window.screen.height));
			document.EAPForm.target = "prodOfferSalePage";
			document.EAPForm.submit();
			
		}
		
	};
	/* 点击购物车事件 */
	Me.openShoppingCart = function() {
		if(!Me.isChooseCust()){
			orderaccept.common.dialog.MessageBox.alert({busiCode:"08410059"});
			//alert("请先查询并选择客户");
			return false;
		}
//		var parameter = "&custId=" + $('custIdHidden').value + "&cityCode="
//		        + Me.getCityCode() + "&custOrderId" + $("custOrderId").value;
//		var pagePath = Me.getPathValue() + "/orderQueryAction.do?method=initShoppingCartPage"
//		        + parameter;
//		newWin = window.open(pagePath, 'newWin',
//		        'status=1,resizable=0,scrollbars=yes,top=10,left=10,width=1000,height=700');
		
		var parameter = "&custId=" + $('custIdHidden').value + "&cityCode="
		        + Me.getCityCode() + "&custOrderId" + $("custOrderId").value;
		var pagePath = Me.getPathValue() + "/orderQueryAction.do?method=getOrderListByCust"
		        + parameter;
		var title = '购物车';
		var height = '600';
		var width = '1200';
		var data = {opener:window};
		var isComplete = new Boolean(false);
		openWinDialog(pagePath,title,height,width,data,isComplete);
		
	};
	
	/**
	 * 展现购物车查询页面
	 */
	Me.openShoppingCartQueryPage = function(){
		var pagePath = Me.getPathValue() + "/orderQueryAction.do?method=initShoppingCartQuery";
		var title = '购物车查询';
		var height = '600';
		var width = '1200';
		var data = {opener:window};
		var isComplete = new Boolean(false);
		openWinDialog(pagePath,title,height,width,data,isComplete);
	};
	
	/**
	 * 页面初始化时展示当前操作员相关的所有购物车数据
	 */
	Me.showAllShoppingCartCount = function(){
		var parameter ="";
		var returnResult = executeRequest("orderQueryAction", "getAllShoppingCartCount",parameter);
		if (!returnResult) {
			return;
		} 
		else {
			var countJson = Jscu.util.CommUtil.parse(returnResult);
			var count = countJson.tempSaveOrderCount;
			$("orderCount").innerText = count;
		}
	};
	
	/*add by zhuguojun 20120513 显示购物车内订单数量 start*/
	Me.showShoppingCartOrderCount = function(){
		if(!Me.isChooseCust()){
			return false;
		}
		var parameter = "custId=" + $('custIdHidden').value + "&cityCode="+ Me.getCityCode();//参考“openShoppingCart”，其中custOrderId少=，相当于没有传
		var returnResult = executeRequest("orderQueryAction", "getTempSaveOrderCountByCust",parameter);
		if (!returnResult) {
			return;
		} 
		else {
			var countJson = Jscu.util.CommUtil.parse(returnResult);
			var count = countJson.tempSaveOrderCount;
			$("orderCount").innerText = count;
		}
	};
	/*add by zhuguojun 20120517 是否选择客户 start*/
	Me.isChooseCust = function(){
		if($('custIdHidden').value == ""){
			return false;
		}
		return true;
	};
};
var cust_Recognition_Head = new CustRecognitionHead();

var SaveCustOrder = function() {
	var Me = this;
	Me.saveCustOrderId = function(custOrderId) {
		$("custOrderId").value = custOrderId;
	};
};

// 输入框输入值后点回车执行内容
function enterIn(event) {
	if (event.keyCode == 13) {
		cust_Recognition_Head.onChangeQueryType($('exactQuery'));
		cust_Recognition_Head.doQuery();
		return false;
	}
}

function saveCustOrderId(custOrderId) {
	$("custOrderId").value = custOrderId;
}
/* 点击NP选择时触发的JS事件 */
function npDeal(npServiceId) {
	// $("npServiceId").value = npServiceId;
	
	var parameters = "customerId=" + $("custIdHidden").value;
	parameters += "&cityCode=" + CustRecognitionHead.getCityCode();
	parameters += "&actionCD=301";
	var resultJsonStr = executeRequest("prodOfferSaleAjaxAction", "doCheckOrderValid", parameters);
	var result = executeAjaxResult(resultJsonStr);
	if (result === false) { return false; }
	
	var parameter = "&flag" + $("batchFlag").value + "&npMsg=" + $("npInfo").value;
	// "&custXml="+$('custXml').value+
	// "&operFlag="+$("operFlag").value+
	// "&custOrderId="+$("custOrderId").value+
	// "&accountId="+$("accountId").value;
	
	// var pagePath = webPath + "/prodOfferSaleAction.do?method=init"+parameter;
	// newWin = window.open(pagePath, 'newWin',
	// 'status=1,resizable=0,scrollbars=yes,top=10,left=10,width=1000,height=700');
	
	document.EAPForm.action = webPath + "/prodOfferSaleAction.do?method=init" + parameter;
	newWin = window.open("about:blank", 'npInfoPage',
	        'status=1,resizable=0,scrollbars=yes,top=10,left=10,width=1000,height=700');
	document.EAPForm.target = "npInfoPage";
	document.EAPForm.submit();
}

/* 点击预受理按钮事件 */
function onPreAcceptBtn(preRgstNo) {
	$("preRgsNo").value = preRgstNo;
	
	var parameters = "customerId=" + $("custIdHidden").value;
	parameters += "&cityCode=" + CustRecognitionHead.getCityCode();
	parameters += "&actionCD=301";
	var resultJsonStr = executeRequest("prodOfferSaleAjaxAction", "doCheckOrderValid", parameters);
	var result = executeAjaxResult(resultJsonStr);
	if (result === false) { return false; }
	$("operFlag").value = "preAccept";
	var parameter = "&flag" + $("batchFlag").value + "&preRgstNo=" + $("preRgsNo").value;
	// "&custXml="+$('custXml').value+
	// "&operFlag="+$("operFlag").value+
	// "&custOrderId="+$("custOrderId").value+
	// "&accountId="+$("accountId").value;
	// var pagePath = webPath + "/prodOfferSaleAction.do?method=init"+parameter;
	// newWin = window.open(pagePath, 'newWin',
	// 'status=1,resizable=0,scrollbars=yes,top=10,left=10,width=1000,height=700');
	
	document.EAPForm.action = webPath + "/prodOfferSaleAction.do?method=init" + parameter;
	newWin = window.open("about:blank", 'preAcceptPage',
	        'status=1,resizable=0,scrollbars=yes,top=10,left=10,width=1000,height=700');
	document.EAPForm.target = "preAcceptPage";
	document.EAPForm.submit();
	
}
/* 点击购物车按钮事件 */
function showShoppingCartInfo() {
	var parameter = "&flag" + $("batchFlag").value + "&preRgstNo=" + $("preRgsNo").value;
	var pagePath = webPath + "/prodOfferSaleAction.do?method=init" + parameter;
	
	document.EAPForm.action = pagePath;
	newWin = window.open("about:blank", 'prodOfferSalePage',
	        'status=1,resizable=0,scrollbars=yes,top=10,left=10,width=1000,height=700');
	document.EAPForm.target = "prodOfferSalePage";
	document.EAPForm.submit();
}
function saveOrderInfo() {
	jTip.show($("shoppingCartLink"), "购物车", "点击此处产品当前订购的列表，可以做提交操作；");
}

/**
 *  检测公客户是否欠费，如果公免客户欠费，则提示欠费号码及欠费金额
 */
function checkImportantUserLack(){
	var custId = $("custIdHidden").value;
	var importantLevel = $("importantLevel").value;
	if(importantLevel == 3){
		var cityCode = cust_Recognition_Head.getCityCode();
		var param = "cityCode=" + cityCode + "&custId=" + custId;
		var prompt = executeRequest("newCustRecognitionAction", "checkImportantUserLack", param);
		if(prompt != ""){
			orderaccept.common.dialog.MessageBox.alert({
				message:prompt
			});
		}
	}
}
	
/*=================================for CRM2.0 /begin=====================================*/
// if rendering page with one-page-one-application style,
// using ajax to get request parameter
// modify by yusong @ 2012-03-15
var detectedOrderDetailFrame = function() {
	var parent = window.parent;
	do {
		if (parent.document.getElementById("orderDetailFrame")) {
			return parent.document.getElementById("orderDetailFrame");
		} else {
			parent = parent.parent;
		}
		
	} while (parent&&parent!=parent.parent);
	
};
// override getCustInfoMethod method of object cust_Recognition_Head
// modify by yusong @ 2012-03-15
(function() {
	var _old_method_ref = cust_Recognition_Head.getCustInfoMethod;
	cust_Recognition_Head.getCustInfoMethod = function() {
		try {
			var orderDetailFrame = detectedOrderDetailFrame();
			if (orderDetailFrame) {
				var controller = orderDetailFrame.contentWindow.prodOfferAcceptLoader;
				if (controller) {
					controller.destroy();
				}
			}
		}
		catch (e) {

		}
		return _old_method_ref.apply(this, arguments);
		
	};
	
}());
// 为了支持异步并且复用原有框架executeRequest逻辑,这里重写部分executeRequest
var __executeRequest = function(actionName, actionMethod, postParameter, isAsynchronism, cb) {
	// 判断是否使用局部刷新
	var isPartlyRefresh;
	var objXMLReq = getObjXMLReq();
	var strURL = unieap.WEB_APP_NAME + "/" + actionName + ".do";
	currentActionName = actionName;
	var flag = false;
	if (actionMethod != null && actionMethod != "") {
		strURL += "?method=" + actionMethod;
		flag = true;
	}
	// 增加局部刷新标示符
	if (flag) strURL += "&isPartlyRefresh=true";
	else strURL += "?isPartlyRefresh=true";
	if (postParameter == null) postParameter = "";
	// postParameter=replaceStr(postParameter); //如果重复替换将会有问题
	// 调试信息
	if (findObj("SendMsg")) findObj("SendMsg").innerText = postParameter;
	
	if (isAsynchronism == null) isAsynchronism = false;
	objXMLReq.open("POST", strURL, isAsynchronism);
	if (isAsynchronism) {
		objXMLReq.onreadystatechange = function() {
			if (objXMLReq.readyState == '4') {
				if (objXMLReq.status == '200') {
					
					return cb.call(null, objXMLReq);
					
				} else {
					alert("asyn request fail:" + objXMLReq.responseText);
					
				}
				objXMLReq.onreadystatechange = null;
				
			}
		};
		
	}
	
	objXMLReq.send(postParameter);
	
	var result;
	if (isAsynchronism == false) {
		result = objXMLReq.responseText;
		// 调试信息
		if (findObj("RetrieveMsg")) findObj("RetrieveMsg").innerText = result;
		return result;
	}
};

var __addEventListener = function(dom,event,cb){
	if(window.attachEvent){
		dom.attachEvent("on" + event,cb);
		
	}else if(window.addEventListener){
		dom.addEventListener(event,cb,false);
	}

};

//reigster event listener when page reload
__addEventListener(window,"unload",function(){
	var frame = detectedOrderDetailFrame();
	if(frame&&frame.contentWindow&&frame.contentWindow.prodOfferAcceptLoader){
		//alert("begin destroy orderDetail");
		frame.contentWindow.prodOfferAcceptLoader.destroy();
	}
});
/*=================================for CRM2.0 /end=====================================*/



