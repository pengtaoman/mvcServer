var saveCustOrder = null;
var webPath = document.getElementsByTagName("context")[0].path;
var newWin = null;
var ifCompoundQuery = false;//add by zhuguojun 20120508 for UI������ԭҳ��߼���ѯ��Ϊ��ѯ��ʽradio�е�һ��ֵ�������Ƶ�������������ʽ��ʾ��Ϊ�˲��Ķ�ԭ���߼�����Ҫ���Ӹñ�����ʶ���Ƿ�Ϊ�߼���ѯ

var CustRecognitionHead = function() {
	var Me = this;
	Me.preAcceptFlag = "";
	
	/* ��ȡ·�� */
	Me.getPathValue = function() {
		return document.getElementsByTagName("context")[0].path;
	};
	// ��ѯ��ʽ�����򼯺�
	var queryKindMap = {
		'' : ["��ѡ��"],
		'SERVICEID' : ["ҵ�����"],
		'IDENTITYCARD' : ["���֤"],
		'CUSTNAME' : ["�ͻ�����"],
		'ICCIDNUM' : ["ICCID����"],
		'OTHERIDENTITYCARD' : ["����֤������"],
		'PREACCEPT' : ["Ԥ������"]
	};
	
	// ��ղ�ѯ��ʽ���������¸�ֵ
	Me.addQueryKinds = function(innetMethodArray) {
		var oQuerykind = $("query_type");
		oQuerykind.innerHTML = "";
		for (var i = 0; i < innetMethodArray.length; i++) {
			Me.addAnQueryKind(innetMethodArray[i], oQuerykind);
		}
	};
	// ������ֵ����
	Me.addAnQueryKind = function(type, moveType) {
		var desc = queryKindMap[type];
		var option = document.createElement("option");
		option.value = type;
		var textNode = document.createTextNode(desc);
		option.appendChild(textNode);
		moveType.appendChild(option);
	};
	
	/**
	 * ��ʼ��ҳ��
	 */
	Me.init = function() {
		WaitingBar.initMe();
		Me.onBlurTips($('exactQuery'));
		Me.initEvent();
		/*���ɼ�ҳ�治�ÿ����޸�Ϊ�ɼ��������ťʱ��JS�ж��Ƿ�ѡ��ͻ�*/
		//$("modifyCust").style.display = "none";//�޸Ŀͻ���Ϣ���ɼ�
		//$("custAllView").style.display = "none";//�ͻ�ȫ��ͼ���ɼ�

		
		saveCustOrder = new SaveCustOrder();
		
		//�������쵼����,���۽�����ҳ�� /modify by yusong @20120725
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
		//�ж������֤�ĵ���ҳ���ѵ��� ����������ǻس����� ��ѯ����
		document.body.onkeyup = function(evt){
			 var evt = window.event||evt;
				if ($("passValidWindow").style.display !='none' && evt.keyCode == 13) {
					cust_Recognition_Head.BValid_OnClick();
					return false;
				}
		};
		// add by yuan.jt 20111229 �ͻ�ʶ��
		CheckIdService.handleCase('init')({
			        'webPath' : webPath,
			        'page' : 'custrecognition'
		        });
		
		// add by hao.zj 2011-06-23 NP���븴�ÿͻ�ʶ��ҳ�� start
		var flag = $("batchFlag").value;
		if (flag == "3") {
			$("myIframe").src = "";
			$("myIframe").style.height = "300";
		}
		// add by hao.zj 2011-06-23 NP���븴�ÿͻ�ʶ��ҳ�� end
		//add by zhuguojun 20120513 ��ʾ���ﳵ�ڶ������� start
		Me.showShoppingCartOrderCount();
		//add by zhuguojun 20120513 ��ʾ���ﳵ�ڶ������� end
		
		// add by yuan.jt 20111229 �ͻ�ʶ�� start
		$("checkIdBtn").disabled = true;
		$("checkIdBtn").style.cursor = "default";
		// add by yuan.jt 20111229 �ͻ�ʶ�� end

		//����Ȩ�ް�ť���ƶ�����ť�Ƿ��չʾ
		if (!eval($("pageOrderButton").value)) {
			$("orderButton").style.display = "none";
		}
		
		
	
	};
	
	
	// �������ʾ��ʾ��Ϣ
	Me.onBlurTips = function(obj) {
		if (obj.value == "") {
			obj.valueCache = "";
			obj.value = obj.tips;
			// ������ʾ��޸���ʽ add
			obj.style.color = "#cccccc";
		} else {
			obj.valueCache = obj.value;
		}
	};
	
	// �������ʾ��ʾ��Ϣ
	Me.onFocusTips = function(obj) {
		obj.value = obj.valueCache;
		// ���ʼ�����������
		var e = event.srcElement;
		var r = e.createTextRange();
		r.moveStart('character', e.value.length);
		r.collapse(true);
		r.select();
		// ��ʾ����ʧ���ָ���ʽ add
		obj.style.color = "#000000";
	};
	
	//������������ȷ����ѯ��ʽ
	Me.onChangeQueryType = function(obj) {
		var exactQueryValue = obj.value;
		if (exactQueryValue != obj.tips) {
			/*ҵ����룺[9��14λ����] �� [2Ӣ�� + 10����] �� [2Ӣ��+11����] */
			/*20121217���ӣ���a/A/n/N/ip/IP��ͷ��Ϊ�������*/
			var regServiceId = /^(\d{9,14})$|^([a-zA-Z]{2}\d{10,11})$|^(a|A|n|N|ip|IP|h|H|g|EP).*$/
			/*���֤ 15 �� 18λ���� ��17λ������X��β*/
			var regIdentity = /^(\d{15}|\d{17}[\dxX])$/ 
			/*ICCID��*/
			var regIccid = /^\d{19}$/
			/*����֤������*/
			var regOther =  /^\d*$/
			if(regServiceId.test(exactQueryValue)){
				$('query_type').value = "SERVICEID";//ҵ�����
			}
			else if(regIdentity.test(exactQueryValue)){
				$('query_type').value = "IDENTITYCARD";//���֤
			}
			else if(regIccid.test(exactQueryValue)){
				$('query_type').value = "ICCIDNUM";//ICCID
			}
			else if(regOther.test(exactQueryValue)){
				$('query_type').value = "OTHERIDENTITYCARD";//����֤����
			}
			else{
				$('query_type').value = "CUSTNAME";//����
			}
		}
	};
	
	// �����������ݹ��˲�ѯ��ʽ
	//delete by zhuguojun���Ż����򣬼�Me.onChangeQueryType
	Me.onChangeQueryTypeBak = function(obj) {
		var exactQueryValue = obj.value;
		if (exactQueryValue != obj.tips) {
			// ������ʽ�ж�������Ƿ��Ǻ���
			var reg = /[\u4E00-\u9FA5]/g
			// ������ں��֣���Ѳ�ѯ��ʽ���óɿͻ����Ʋ�ѯ
			if (reg.test(exactQueryValue)) {
				$('query_type').value = "CUSTNAME";
			} else if (exactQueryValue.length == 15 || exactQueryValue.length == 18) {// ����������ݳ���Ϊ15����18����Ϊ�����֤��ѯ
				$('query_type').value = "IDENTITYCARD";
			} else if (exactQueryValue.length == 19) { // ����������ݳ���Ϊ19λ����Ϊ��ICCID����
				$('query_type').value = "ICCIDNUM";
			} else if (exactQueryValue.length == 11 || exactQueryValue.length == 12
			        || exactQueryValue.length == 32) { // ����������ݳ���Ϊ11CDMA 12PSTN 32ADSL����Ϊ�ǲ�Ʒʵ�������ѯ
				$('query_type').value = "SERVICEID";
			} else {
				// �����ж��Ƿ��ǽ��������
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
	 * ��ʼ��ҳ���¼�
	 */
	Me.initEvent = function() {
		$('exactQuery').onblur = function() {// �������ʾ��Ϣ
			trimField($('exactQuery'));
			Me.onBlurTips($('exactQuery'));
			Me.onChangeQueryType($('exactQuery'));
		};
		$('exactQuery').onfocus = function() {// �������ʾ��Ϣ
			Me.onFocusTips($('exactQuery'));
		};
		$("BQuery").onclick = function() {// ��ȷ��ѯ��ť����¼�
			Me.doQuery();
		};
		$("easyQuery").onclick = function() {// �򵥲�ѯ
			ifCompoundQuery = false;
			Me.onQueryMethodChange();
		};
		$("compoundQuery").onclick = function() {// �߼���ѯ
			ifCompoundQuery = true;
			Me.onQueryMethodChange();
			Me.compoundQuery_onClick();
		};
		$("preacceptQuery").onclick = function() {// Ԥ������ѡ���¼�
			ifCompoundQuery = false;
			Me.onQueryMethodChange();
		};
		
		$("newCust").onclick = function() {// �½��ͻ�
			Me.newCust_onClick();
			return false;
		};
		$("modifyCust").onclick = function() {// �޸Ŀͻ�
			Me.modifyCust_onClick();
			return false;
		};
		// $("newAccount").onclick = function(){//�����˻�
		// Me.newAccount_onClick();
		// return false;
		// };
		$("custAllView").onclick = function() {// �ͻ�ȫ��ͼ
			Me.custAllView_onClick();
			return false;
		};
		$("lineButton").onclick = function() {// ��Դȷ��
			Me.checkResource_onClick();
			return false;
		};
		$("chooseNumButton").onclick = function() {// ѡ�����
			Me.chooseNum_onClick();
			return false;
		};		
		$("descInfo").onmouseout = function() {// ˵����Ϣ
			unieap.hideTooltip();
			return false;
		};
		$("ReadIdentity").onclick = function(){//�������֤
			//Me.showPic();
			Me.BIdentityRead_onclick();
		};
	};
	
	//�������֤
	Me.BIdentityRead_onclick = function(){
	   var nRet;
	   var obj = document.getElementById("SynCardOcx");//������
	   try{
		   //ֻװ�������������
		   if(obj && obj.FindReader() && obj.FindReader()>0){
		      obj.SetReadType(0);//������0=�ֶ���1=�Զ�
		      var setphotoname=obj.SetPhotoName(2);//������0=tmp �� 1=����	��2=���֤��	��3=����_���֤��
		      var setphototype=obj.SetPhotoType(2);//������0=bmp �� 1=jpeg	��2=base64
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
	
		        //alert("��ȷ�����֤�����Ƿ���ȷ��");
		        orderaccept.common.dialog.MessageBox.alert({busiCode:"08510129"});
		      }
		    }else{
		    	//alert("�Ҳ��������������������Ƿ���ȷ��װ������������USB�ӿڡ�");
		    	orderaccept.common.dialog.MessageBox.alert({busiCode:"08510130"});
		    }
	   }catch(e){
		   orderaccept.common.dialog.MessageBox.alert({busiCode:"08510130"});
	   }
	}
	
	/**
	 * �߼���ѯ
	 */
	Me.compoundQuery_onClick = function() {
		var pagePath = Me.getPathValue() + "/newCustRecognitionAction.do?method=doCompoundQuery";
		// window.showModalDialog(pagePath, cust_Recognition_Head,
		// 'dialogHeight:500px;dialogWidth:850px;center:yes;scroll=no;');
		var title = '�ͻ���ѯ';
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
	 * �½��ͻ�
	 */
	Me.newCust_onClick = function() {
		var pagePath = Me.getPathValue() + "/custInfoServiceAction.do?method=doInit";
		var title = '�½��ͻ�';
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
	 * �����¿ͻ��ɹ�����ʾ�¿ͻ���Ϣ
	 */
	Me.doAfterAddCust = function(param) {
		$("custIdHidden").value = param;
		$("custOrderId").value = "";
		/* modify by zhuguojun 20120510 for ui start ���ֱ�ͼƬ��һֱ��ʾ��*/
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
	 * �޸Ŀͻ�����
	 */
	Me.modifyCust_onClick = function() {
		//if ($("modifyCust").disabled) return;
		if(!Me.isChooseCust()){
			orderaccept.common.dialog.MessageBox.alert({busiCode:"08410059"});
			//alert("���Ȳ�ѯ��ѡ��ͻ�");
			return false;
		}
		var paramValue = "&custId=" + $("custIdHidden").value;
		paramValue += "&strServingStatus=" + $('statusCd').value;
		paramValue += "&varValue=1002";// �޸�
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
		var title = '�޸Ŀͻ�';
		var height = '400';
		var width = '1000';
		var data = {opener:window};
		var isComplete = new Boolean(false);
		openWinDialog(pagePath,title,height,width,data,isComplete);
		
	};
	/**
	 * �޸Ŀͻ��ɹ�����ʾ�¿ͻ���Ϣ
	 */
	Me.doAfterModifyCust = function() {
		Me.getCustInfoMethod();
		Me.getCustRetainMethod();
		Me.getCustDetailMethod();
		Me.showShoppingCartOrderCount();
	};
	
	// �����˻�
	Me.newAccount_onClick = function() {
		if ($("newAccount").disabled) return;
		var pagePath = Me.getPathValue() + "/accountAcceptAction.do?method=getAccountInfoBus";
		document.EAPForm.action = pagePath;
		newWin = window.open("about:blank", 'accountAddPage',
		        'status=1,resizable=0,scrollbars=yes,top=10,left=10,width=1000,height=700');// �ύ���´򿪵�ȫ��������
		document.EAPForm.target = "accountAddPage";
		document.EAPForm.submit();
		
	};
	
	// �ͻ�ȫ��ͼ
	Me.custAllView_onClick = function() {
		//if ($("custAllView").disabled) return;
		if(!Me.isChooseCust()){
			orderaccept.common.dialog.MessageBox.alert({busiCode:"08410059"});
			//alert("���Ȳ�ѯ��ѡ��ͻ�");
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
	
	//��Դȷ��
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
	
	//ѡ�����
	Me.chooseNum_onClick = function(){		
		var pagePath = Me.getPathValue() + "/custcontact/preselectphone/PreSelectPhoneMain.jsp";
		newWin = window.open(pagePath, 'newWin',
		        'status=1,resizable=1,scrollbars=yes,top=100,left=100,width=900,height=650');
	}
	
	// ˵����Ϣ
	Me.descInfo_onClick = function(obj) {
		var htmlStr = "<div class='tooltip-wrapper' style='width: 300px;'>";
			htmlStr += "<div class='tooltip-title'>";
			htmlStr += "<span class='tooltip-title-text'>��ܰ��ʾ</span>";
			htmlStr += "</div>";
			htmlStr += "<div class='tooltip-content' style='padding: 0 10 0 0;'>";
			htmlStr += "	<ul type=1>";
			htmlStr += "		<li>�������û¼��ͻ���Ϣ���������Ͻǵġ��½��ͻ�����¼�������Ϣ��</li>";
			htmlStr += "        <li>��ѯ�ֶ��ַ�ʽ���ͻ���ѯ��Ԥ�����ѯ�����������Զ�ƥ���ѯ��ʽ��Ҳ���ֶ�ѡ��ҳ�����Ͻǿ���ѡ��߼��ͻ���ѯ��</li>";
			htmlStr += "        <li>���ѡ��δѡ��ģ����ѯ��Ϊ��ȷ��ѯ�����δѡ��ͻ�����Ϊ�ǿͻ�����ѯ��</li>";
		    htmlStr += "    </ul>";
			htmlStr += "</div>";
			htmlStr += "</div>";
		unieap.showTooltip({inner:htmlStr,autoClose:true},obj,['below']);
	};
	
	// �ж�ѡ�����Ԥ�����ѯ���Ǽ򵥲�ѯ��ʾ��ѯ��ʽ��ͬ
	Me.onQueryMethodChange = function() {
		var queryMethod = Me.getCheckedQueryMethod();// ѡ�еĲ�ѯ��ʽ
		
		if (queryMethod == "COMPOUNDQUERY") { // �߼���ѯ
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
		
		if (queryMethod == "PREACCEPTQUERY") { // Ԥ�����ѯ
			Me.addQueryKinds(['PREACCEPT']);
			$('exactQuery').value = "";
			$('exactQuery').onblur = function() {// ��������ʾ���¼����
			};
		} else {
			Me.addQueryKinds(['', 'SERVICEID', 'IDENTITYCARD', 'CUSTNAME', 'ICCIDNUM',
			        'OTHERIDENTITYCARD']);
			$('exactQuery').value = "ҵ����롢֤�����롢�ͻ����ơ�ICCID����ģ����ѯ";
			// ������ʾ��޸���ʽ add
			$('exactQuery').style.color = "#cccccc";
			$('exactQuery').onblur = function() {// �������ʾ��Ϣ
				Me.onBlurTips($('exactQuery'));
				Me.onChangeQueryType($('exactQuery'));
			};
		}
	};
	
	/**
	 * �����ѯ��ť�¼�
	 */
	Me.doQuery = function() {
		WaitingBar.showMe();
		ifCompoundQuery = false;
		var queryMethod = Me.getCheckedQueryMethod();// ѡ�еĲ�ѯ��ʽ
		//��ʼ��ͼƬ
		 $("identityPhotoLink").src= webPath +"/common/dx20/images/photo.gif";
		
		if($("query_type").value==""){
			orderaccept.common.dialog.MessageBox.alert({busiCode:"08410228"});
			//alert("��ѡ���ѯ��ʽ��");
			WaitingBar.hideMe();
			return false;
		}
		trimField($('exactQuery'));
		// ����ѯ��ʽΪ���ϲ�ѯ��ʱ�򣬲����зǿռ��顣
		if (queryMethod != "CompoundQuery") {
			if ($("exactQuery").value == "" || $("exactQuery").value == $("exactQuery").tips) {
				orderaccept.common.dialog.MessageBox.alert({busiCode:"08410060"});
				//alert("�������ѯ������");
				$("exactQuery").focus();
				WaitingBar.hideMe();
				return false;
			}
		}
		
		$("serviceIdHidden").value = "";
		$("prodcutIdHidden").value = "";
		
		var nicetyQuery = Me.getNicetyQueryMethod();// �Ƿ�ȷ��ѯ
		var custLevel = Me.getCustLevelMethod();// �Ƿ�ͻ���
		var parameter = '';
		parameter += "&queryCityCode=" + Me.getCityCode();
		parameter += "&nicetyQuery=" + nicetyQuery;
		parameter += "&custLevel=" + custLevel;
		if (queryMethod == "EASYQUERY") { // �򵥲�ѯ
			parameter += "&exactQuery=" + $("exactQuery").value;
			parameter += "&queryMethod=" + queryMethod;
			
		}
		// �ж��Ƿ���Ԥ�������NP ����ǻ�ȡԤ�����Ż���NP��Ϣ
		Me.getPreOrNPMethod(queryMethod);
		
		if ($("npInfo").value != "") {
			parameter += "&queryType=npMethod";// ��ѯ��ʽ
			parameter += "&custIdHidden=" + $("custIdHidden").value;// ��ѯ��ʽ
		} else {
			parameter += "&queryType=" + $("query_type").value;// ��ѯ��ʽ
		}
		
		// ԤԼ����������ѯ
		if (queryMethod == "PREACCEPTQUERY"
		        || ($("query_type").value == "SERVICEID" && Me.preAcceptFlag == "1")) {
			var param = "preRgsNo=" + $("preRgsNo").value;
			var result = executeRequest("preAcceptAction", "getProAcceptOrderInfo", param);
			if (!result) {
				orderaccept.common.dialog.MessageBox.alert({busiCode:"08410061"});
				//alert("��Ԥ�����Ų�����δ������!");
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
						//alert("û����ؼ�¼����˲飡");
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
					var title = '�½��ͻ�';
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
			//alert("û����ؼ�¼����˲飡");
			return;
		}
		
		if (jsonResultObj.count == "1") {
			WaitingBar.hideMe();
			//�����ж��Ƿ���Ҫ�ͻ������֤ 0����Ҫ1��Ҫ
			var paramerer = "cityCode=" + Me.getCityCode() + "&objectValue=5566&serviceKind=-1&serviceOfferId=-1"; 
			var result = executeRequest("custAcceptAjaxAction", "doBusinessSwitch", paramerer);
			//�����ҵ�������в�ѯ
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
						//alert("��ʹ�õ���"+result+"������������������ҵ�������ȡ�¿�!");
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
			parameter += "&doQueryCount=" + jsonResultObj.count;//��ѯ������
			var pagePath = Me.getPathValue() + "/newCustRecognitionAction.do?method=doQuery&"
			        + parameter;
			// window.showModalDialog(pagePath, cust_Recognition_Head,
			// 'dialogHeight:500px;dialogWidth:850px;center:yes;scroll=no;');
			var title = '��ѯ���';
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
	 * ��ȡѡ�еĲ�ѯ��ʽ
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
	 * ��ȡ�Ƿ�ȷ��ѯ
	 */
	Me.getNicetyQueryMethod = function() {
		var queryMethod;
		if ($("nicetyQuery").checked) {
			queryMethod = "0";// ģ����ѯ  modify by zhuguojun 20120602 ҳ��ͼ����ʾ�����ɾ�ȷ��ѯ��Ϊģ����ѯ
		} else {
			queryMethod = "1";// ��ȷ��ѯ
		}
		return queryMethod;
	};
	/**
	 * ��ȡ�Ƿ��ǿͻ���
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
	 * ����������֤ҳ��
	 */
	Me.showPassValidWindow = function(custId, identityKind, identityCode) {
		$("custPassWordValid").value = "";
		$("identityCodeValid").value = "";
		$("custPassWordValid").value = "";
		$("productPassWordValid").value = "";
		// modify by yuan.jt 20111222 start Ĭ������ͨ��ѡ��
		// $("checking01").checked =true;
		$("checking04").checked = true;
		// modify by yuan.jt 20111222 end Ĭ������ͨ��ѡ��
		if ($("query_type").value == "SERVICEID") {
			$('prodPassWord').style.display = "";
		} else {
			$('prodPassWord').style.display = "none";
		}
		
		jUtil.showwindow($("passValidWindow"), 1);
		$("custIdHidden").value = custId;// ��ȡ�ͻ�ID
		$("identityKindHidden").value = identityKind;// ��ȡ�ͻ�ID
		$("identityCodeHidden").value = identityCode;// ��ȡ�ͻ�ID
		// add by yuan.jt 20111229 ��ݺ˲� start
		if (identityKind == '1') $('checkIdBtn').disabled = false;
		// add by yuan.jt 20111229 ��ݺ˲� end
		
		$("passValidWindow").style.top = "140px";
	};
	/**
	 * ���벻��֤����
	 */
	Me.DoNotValid_OnClick = function(custId, identityKind, identityCode) {
		$("custIdHidden").value = custId;// ��ȡ�ͻ�ID
		$("identityKindHidden").value = identityKind;// ��ȡ�ͻ�ID
		$("identityCodeHidden").value = identityCode;// ��ȡ�ͻ�ID
		
		var custCheckVlue = Me.getCustCheckMethod();
		var custId = $("custIdHidden").value;
		$("preAcceptQueryFlag").value = "";

		Me.getCustInfoMethod();
		Me.getCustRetainMethod();
		var queryMethod = Me.getCheckedQueryMethod();// ��ȡ��ѯ��ʽ
		if (!(queryMethod == "PREACCEPTQUERY" || ($("query_type").value == "SERVICEID" && Me.preAcceptFlag == "1"))) {// Ԥ�����Ų�ѯ��ʽ����������
			Me.getPreAcceptInfoByCustId();// �ÿͻ��Ƿ���Ԥ������Ϣ����
		}
		Me.getCustDetailMethod();
		
		// ��������ӿڡ��鿴�Ƿ�Ƿ��
		var jsonObj = Jscu.util.CommUtil.parse($('custXml').value);
		    cityCode = jsonObj.cityCode,
			identityKind = jsonObj.identityKind,
			identityCode = jsonObj.identityCode;
		
		var accoutParam = "cityCode="+cityCode+"&identityKind="+identityKind+"&identityCode="+identityCode;
		var isLack = executeRequest("newCustRecognitionAction", "getIfShowLeft", accoutParam);
		if("-1"==isLack){//Ƿ��
			$("ifShow").style.display = "";	
		}	
		Me.showShoppingCartOrderCount();
		$("custOrderId").value = "";
		
		if (identityKind == '1') $('checkIdBtn').disabled = false;
		//Me.checkImportantUserLack();
		window.setTimeout("checkImportantUserLack()",1);
		
	};
	/**
	 * ������֤����
	 */
	Me.BValid_OnClick = function() {
		var custCheckVlue = Me.getCustCheckMethod();
		var custId = $("custIdHidden").value;
		$("preAcceptQueryFlag").value = "";
		
		if (custCheckVlue == "custPassWordValid") {// ���ݿͻ�������֤
			var pass = $("custPassWordValid").value;
			if (!pass) {
				orderaccept.common.dialog.MessageBox.alert({busiCode:"08410064"});
				//alert("���벻��Ϊ��!");
				return;
			}
			if (pass && pass.length < 6) {
				orderaccept.common.dialog.MessageBox.alert({busiCode:"08410065"});
				//alert("���볤�Ȳ���ȷ!");
				return;
			}
			var paramerer = "custId=" + custId + "&passwdType=1&passwd=" + pass;
			var result = executeRequest("custAcceptAjaxAction", "doValidPassword", paramerer);
			if (result == '1') {
				// ������֤ͨ��
				//orderaccept.common.dialog.MessageBox.alert({busiCode:"08410066"});
				//alert('������֤ͨ��,���Լ���������');
				jUtil.hide($("passValidWindow"), 1);
			} else {
				orderaccept.common.dialog.MessageBox.alert({busiCode:"08410067"});
				//alert('������֤ûͨ����');
				$('custPassWordValid').value = '';
				$('custPassWordValid').focus();
				return;
			}
			
		} else if (custCheckVlue == "identityKindValid") {// ����֤��������֤
			var identityKindValid = $("identityKindValid").value;
			var identityCodeValid = $("identityCodeValid").value;
			if (identityKindValid != $("identityKindHidden").value) {
				//alert("֤������У�鲻������ȷ�ϣ�");
				orderaccept.common.dialog.MessageBox.alert({busiCode:"08410068"});
				$('identityKindValid').focus();
				return;
			} else if (identityCodeValid != $("identityCodeHidden").value) {
				orderaccept.common.dialog.MessageBox.alert({busiCode:"08410069"});
				//alert("֤������У��ʧ�ܣ���ȷ�ϣ�");
				$('identityCodeValid').focus();
				return;
			}
			jUtil.hide($("passValidWindow"), 1);
		} else if (custCheckVlue == "productPassWordValid") { // ���ݲ�Ʒ����У��
			if (!$("productPassWordValid").value) {
				orderaccept.common.dialog.MessageBox.alert({busiCode:"08410070"});
				//alert("���벻��Ϊ��!");
				return;
			}
			if ($("productPassWordValid").value && $("productPassWordValid").value.length < 6) {
				orderaccept.common.dialog.MessageBox.alert({busiCode:"08410071"});
				//alert("���볤�Ȳ���ȷ!");
				return;
			}
			var paramerer = "custId=" + custId;
			paramerer += "&productPassWordValid=" + $("productPassWordValid").value;
			paramerer += "&queryCityCode=" + Me.getCityCode();
			paramerer += "&serviceId=" + $("exactQuery").value;
			
			var result = executeRequest("newCustRecognitionAction", "getProductPassword", paramerer);
			if (result == '1') {
				// ������֤ͨ��
				//alert('������֤ͨ��,���Լ���������');
				//orderaccept.common.dialog.MessageBox.alert({busiCode:"08410072"});
				jUtil.hide($("passValidWindow"), 1);
			} else {
				orderaccept.common.dialog.MessageBox.alert({busiCode:"08410073"});
				//alert('������֤ûͨ����');
				$('productPassWordValid').value = '';
				$('productPassWordValid').focus();
				return;
			}
		} else if (custCheckVlue == "passCheck") {
			jUtil.hide($("passValidWindow"), 1);
		}
		Me.getCustInfoMethod();
		Me.getCustRetainMethod();
		var queryMethod = Me.getCheckedQueryMethod();// ��ȡ��ѯ��ʽ
		if (!(queryMethod == "PREACCEPTQUERY" || ($("query_type").value == "SERVICEID" && Me.preAcceptFlag == "1"))) {// Ԥ�����Ų�ѯ��ʽ����������
			Me.getPreAcceptInfoByCustId();// �ÿͻ��Ƿ���Ԥ������Ϣ����
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
		
		// ��������ӿڡ��鿴�Ƿ�Ƿ��
		var jsonObj = Jscu.util.CommUtil.parse($('custXml').value);
		    cityCode = jsonObj.cityCode,
			identityKind = jsonObj.identityKind,
			identityCode = jsonObj.identityCode;
		
		var accoutParam = "cityCode="+cityCode+"&identityKind="+identityKind+"&identityCode="+identityCode;
		var isLack = executeRequest("newCustRecognitionAction", "getIfShowLeft", accoutParam);
		if("-1"==isLack){//Ƿ��
			$("ifShow").style.display = "";	
		}	
		Me.showShoppingCartOrderCount();
		$("custOrderId").value = "";
		//Me.checkImportantUserLack();
		window.setTimeout("checkImportantUserLack()",1);
	};
	
	/**
	 * ��ȡ�ͻ���Ϣ
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
			
			// ��֣�ƴȡjson�� --��̨�ύʱʹ��
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
		// ���ﳵ�Ͷ�����ť��ʾ
		// add by hao.zj 2011-06-23 NP���븴�ÿͻ�ʶ��ҳ�� start
		// $("orderButton").style.display = "";
		// $("cartButton").style.display = "";
		// $("lineButton").style.display = "";
		/*delete by zhuguojun 20120517 Ŀǰҵ��֧��NP�����������롣
		var flag = $("batchFlag").value;
		if (flag != "3") {
			$("orderButton").style.display = "";
			$("cartButton").style.display = "";
			$("lineButton").style.display = "";
		}*/
		// add by hao.zj 2011-06-23 NP���븴�ÿͻ�ʶ��ҳ�� end
	};
	/**
	 * ��ȡ�ͻ�άϵ��Ϣ
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
	 * �ͻ�������Ϣ
	 */
	Me.getCustDetailMethod = function() {
		var src = Me.getPathValue()
		        + "/newCustRecognitionAction.do?method=doQueryCustDetail&custId="
		        + $("custIdHidden").value + "&queryType=" + $("query_type").value + "&cityCode="
		        + Me.getCityCode() + "&serviceId=" + $("exactQuery").value + "&queryLevel="
		        + Me.getCustLevelMethod() + "&npInfo=" + $("npInfo").value + "&preRgsNo="
		        + $("preRgsNo").value + "&preAcceptQueryFlag=" + $("preAcceptQueryFlag").value
		        + "&preAcceptInfo=" + $("preFlag").value;
		// add by hao.zj 2011-06-23 NP���븴�ÿͻ�ʶ��ҳ�� start
		var flag = $("batchFlag").value;
		if (flag == "3") {
			var parameter = "flag=" + flag + "&custId=" + $("custIdHidden").value;
			src = Me.getPathValue() + "/npAction.do?method=gotoNpAcceptContent&" + parameter;
		}
		// add by hao.zj 2011-06-23 NP���븴�ÿͻ�ʶ��ҳ�� end
		$("myIframe").src = src;
	};
	
	/**
	 * ���ݿͻ�id�ж��Ƿ����Ԥ������Ϣ
	 */
	Me.getPreAcceptInfoByCustId = function() {
		var parameter = "custId=" + $("custIdHidden").value;
		parameter + "&cityCode=" + Me.getCityCode();
		var result = executeRequest("preAcceptAction", "getPreAcceptInfoByCustId", parameter);
		if (result) {
			$("preRgsNo").value = result;
			$("preAcceptQueryFlag").value = "queryByCustId";// ��ʶ��ѯ��ʽΪ�ͻ���ʶ
		}
	};
	/**
	 * ��ȡ�ͻ������֤��ʽ
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
	 * ȡ����֤
	 */
	Me.closePage = function() {
		jUtil.hide($("passValidWindow"), 1);
	};
	/**
	 * �ж��Ƿ���Ԥ�������NP ����ǻ�ȡԤ�����Ż���NP��Ϣ
	 */
	Me.getPreOrNPMethod = function(queryMethod) {
		var queryType = $('query_type').value; // ��ѯ��ʽ
		
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
	/* �������Ʒ�����¼� */
	Me.onOrderSalesBn = function() {
		// һ��������
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
	/* �������Ʒ�����¼� */
	Me.initProdOfferOrder = function() {
		if(!Me.isChooseCust()){
			orderaccept.common.dialog.MessageBox.alert({busiCode:"08410059"});
			//alert("���Ȳ�ѯ��ѡ��ͻ�");
			return false;
		}
		// һ��������
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
	/* ������ﳵ�¼� */
	Me.openShoppingCart = function() {
		if(!Me.isChooseCust()){
			orderaccept.common.dialog.MessageBox.alert({busiCode:"08410059"});
			//alert("���Ȳ�ѯ��ѡ��ͻ�");
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
		var title = '���ﳵ';
		var height = '600';
		var width = '1200';
		var data = {opener:window};
		var isComplete = new Boolean(false);
		openWinDialog(pagePath,title,height,width,data,isComplete);
		
	};
	
	/**
	 * չ�ֹ��ﳵ��ѯҳ��
	 */
	Me.openShoppingCartQueryPage = function(){
		var pagePath = Me.getPathValue() + "/orderQueryAction.do?method=initShoppingCartQuery";
		var title = '���ﳵ��ѯ';
		var height = '600';
		var width = '1200';
		var data = {opener:window};
		var isComplete = new Boolean(false);
		openWinDialog(pagePath,title,height,width,data,isComplete);
	};
	
	/**
	 * ҳ���ʼ��ʱչʾ��ǰ����Ա��ص����й��ﳵ����
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
	
	/*add by zhuguojun 20120513 ��ʾ���ﳵ�ڶ������� start*/
	Me.showShoppingCartOrderCount = function(){
		if(!Me.isChooseCust()){
			return false;
		}
		var parameter = "custId=" + $('custIdHidden').value + "&cityCode="+ Me.getCityCode();//�ο���openShoppingCart��������custOrderId��=���൱��û�д�
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
	/*add by zhuguojun 20120517 �Ƿ�ѡ��ͻ� start*/
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

// ���������ֵ���س�ִ������
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
/* ���NPѡ��ʱ������JS�¼� */
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

/* ���Ԥ����ť�¼� */
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
/* ������ﳵ��ť�¼� */
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
	jTip.show($("shoppingCartLink"), "���ﳵ", "����˴���Ʒ��ǰ�������б��������ύ������");
}

/**
 *  ��⹫�ͻ��Ƿ�Ƿ�ѣ��������ͻ�Ƿ�ѣ�����ʾǷ�Ѻ��뼰Ƿ�ѽ��
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
// Ϊ��֧���첽���Ҹ���ԭ�п��executeRequest�߼�,������д����executeRequest
var __executeRequest = function(actionName, actionMethod, postParameter, isAsynchronism, cb) {
	// �ж��Ƿ�ʹ�þֲ�ˢ��
	var isPartlyRefresh;
	var objXMLReq = getObjXMLReq();
	var strURL = unieap.WEB_APP_NAME + "/" + actionName + ".do";
	currentActionName = actionName;
	var flag = false;
	if (actionMethod != null && actionMethod != "") {
		strURL += "?method=" + actionMethod;
		flag = true;
	}
	// ���Ӿֲ�ˢ�±�ʾ��
	if (flag) strURL += "&isPartlyRefresh=true";
	else strURL += "?isPartlyRefresh=true";
	if (postParameter == null) postParameter = "";
	// postParameter=replaceStr(postParameter); //����ظ��滻����������
	// ������Ϣ
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
		// ������Ϣ
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



