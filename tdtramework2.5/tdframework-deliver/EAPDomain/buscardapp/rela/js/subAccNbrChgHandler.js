BusCard.define('/buscardapp/rela/js/subAccNbrChgHandler',function(_buscard,cardParam){ 
	var Me = this;
	dojo.require("orderaccept.prodofferaccept.util");
	
	var getAccNbrNums = null;
	try{
		getAccNbrNums = ordermgr.accept.accNbrHandler.getAccNbrNums;
	}catch(e){
		alert(e.message)
	}
	Me.$('oldAccNum').innerHTML =getAccNbrNums.getInnerHtml();
	getAccNbrNums.initCheckBox();
	Me.$('oldAccNum').collectData =  function(){
	  	return  getAccNbrNums.collectData();
	}
	var customerData =function(){
		return {
			custId : cardParam.serviceRelation.customerId,
			cityCode : cardParam.serviceRelation.cityCode
		};
	}();
	
	/**
	 * 检测号码是否可以展示，因为涉及到老号码的转换问题
	 */
	Me.checkIfDisplay = function(userId){
		//如果userId为空，则不处理
		if(userId==""||userId==null){
			return true;
		}
		var prodInstAccNbrList = BusCard.$remote("prodInstCommFacadeBO").queryProdInstAccNbrInfo({prodInstId:userId});
		if(prodInstAccNbrList==null||(prodInstAccNbrList&&prodInstAccNbrList.length==0)){
			return true;
		}
		for(var p=0;p<prodInstAccNbrList.length;p++){
			if(prodInstAccNbrList[p].accNbrTypeCd == 2){
				return false;
			}
		}
		return true;
	};
	
	var custId = customerData.custId;
	var cityCode = customerData.cityCode;
	var tempNbrInfoList = [];
	var instNbrInfoLit = [];
	//产品名称的集合
	var productNames = {};
	// 在途的号码.查询方法稍后修改
	var tempPstnInfoList = BusCard.$remote("accessProdItemInfoDAO").selectByProperties({customerId:custId,serviceOfferId:301,serviceKind:10,cityCode:cityCode});
	var tempCdmaInfoList =BusCard.$remote("accessProdItemInfoDAO").selectByProperties({customerId:custId,serviceOfferId:301,serviceKind:8,cityCode:cityCode});
	// 实例号码查询方法稍后修改
	var instPstnInfoList = BusCard.$remote("serviceRelationDAO").query({customerId:custId,serviceKind:10,ifValid:1,cityCode:cityCode});
	var instCdmaInfoList = BusCard.$remote("serviceRelationDAO").query({customerId:custId,serviceKind:8,ifValid:1,cityCode:cityCode});
	
	//过滤掉，去重，如果不进行同步回调，那么号码会展示重复
	tempPstnInfoList = dojo.filter(tempPstnInfoList||[],function(_temp){
		return !dojo.some(instPstnInfoList||[],function(_instTemp){
			return _temp.userId== _instTemp.userId;
		});
	});
	
	tempCdmaInfoList = dojo.filter(tempCdmaInfoList||[],function(_temp){
		return !dojo.some(instCdmaInfoList||[],function(_instTemp){
			return _temp.userId== _instTemp.userId;
		});
	});
	var tempAccNbrNums = getAccNbrNums._fusionNumsList;
	//过滤掉已有的并且过滤掉类型是2
	tempPstnInfoList = dojo.filter(tempPstnInfoList||[],function(_temp){
		return _buscard.util.exist(tempAccNbrNums,function(numInfo){
							return numInfo.userId == _temp.userId;
						})||Me.checkIfDisplay(_temp.userId);
	});
	
	//过滤掉已有的并且过滤掉类型是2
	tempCdmaInfoList = dojo.filter(tempCdmaInfoList||[],function(_temp){
		return _buscard.util.exist(tempAccNbrNums,function(numInfo){
							return numInfo.userId == _temp.userId;
						})||Me.checkIfDisplay(_temp.userId);
	});
	
	//过滤掉已有的并且过滤掉类型是2
	instPstnInfoList = dojo.filter(instPstnInfoList||[],function(_temp){
		return _buscard.util.exist(tempAccNbrNums,function(numInfo){
							return numInfo.userId == _temp.userId;
						})||Me.checkIfDisplay(_temp.userId);
	});
	
	//过滤掉已有的并且过滤掉类型是2
	instCdmaInfoList = dojo.filter(instCdmaInfoList||[],function(_temp){
		return _buscard.util.exist(tempAccNbrNums,function(numInfo){
							return numInfo.userId == _temp.userId;
						})||Me.checkIfDisplay(_temp.userId);
	});
	
	//合并临时号码到一个集合中
	Array.prototype.push.apply(tempNbrInfoList,tempPstnInfoList);
	Array.prototype.push.apply(tempNbrInfoList,tempCdmaInfoList);
	
	//合并实例号码到一个集合中
	Array.prototype.push.apply(instNbrInfoLit,instPstnInfoList);
	Array.prototype.push.apply(instNbrInfoLit,instCdmaInfoList);
	
	//防止选账号选当前号码的情况
	var leftAccNbrInfo = dojo.filter(getAccNbrNums.oldAccNbrData||[],function(oldAccNbr){
		return !dojo.some(instNbrInfoLit||[],function(instNbr){
			return instNbr.userId == oldAccNbr.prodInstId;
		});
	});
	if(leftAccNbrInfo.length>0){
		dojo.forEach(leftAccNbrInfo||[],function(accNbrInfo){
			var serviceKindList = BusCard.$remote("productToServiceDAO").query({productId:accNbrInfo.productId});
			accNbrInfo.serviceId = accNbrInfo.accNbr;
			accNbrInfo.userId = accNbrInfo.prodInstId;
			if(serviceKindList.length>0){
				accNbrInfo.serviceKind = serviceKindList[0].netType;
			}
		});
		Array.prototype.push.apply(instNbrInfoLit,leftAccNbrInfo);
	}
	
	
	
	/**
	 * 加载选择号码页面
	 */
	Me.$("accountNbrChoose").onload = function(){
		Me.nbrUniqueId = orderaccept.prodofferaccept.util.CommUtils.generateUniqueId();
		var popWinTp  = BusCard.Template.create("<div id='nbr_selected_ctn' style='width:100%'>\
	        		<fieldset  id='inst_nbr_fieldset'><legend>实例号码</legend><div id='inst_nbr_div' style='width:100%'>#{instItemList}</div></fieldset>			\
					<fieldset id='temp_nbr_fieldset'><legend>在途号码</legend><div id='temp_nbr_div' style='width:100%'>#{tempItemList}</div></fieldset>			\
	        		<span style='color:red;display:none'>(注意:修改账号密码会同时修改账号的服务密码！其他选择此号码作为账号的宽带类号码的账号密码也同时修改)</span>\
	        		</div>");
	    //sourceFlag为1时展示
		var itemTp = BusCard.Template.create("<input type='radio' name='accServiceId-#{uniqueId}' targetUniqueId='#{targetUniqueId}' value='#{serviceId}' serviceId='#{serviceId}' sourceFlag='#{sourceFlag}' prodInstId ='#{prodInstId}' serviceKind='#{serviceKind}' serviceKindIndex='#{serviceKindIndex}'><span style='margin-right:5px'>#{serviceId}</span><span style='color:#3399cc;font-weight:bold;'>[#{serviceKindDesc}]</span>" +
				"<tp:if $$.sourceFlag ==3>" +
				"<a id='modifyPass-#{prodInstId}' #{disableFlag} prodInstId ='#{prodInstId}' href='#' style='color:#3399cc;font-weight:bold;cursor:pointer'>账号密码变更</a>" +
				//"<span style='color:red;'>(请注意，修改账号密码会同时修改#{serviceId}的服务密码！其他选择此号码作为账号的宽带类号码的账号密码也同时修改)</span>"+
				"<div  id='pass-div-#{prodInstId}' class='buscard-item-el' style = 'display:none;margin-left:10px'>" +
				"<span>原密码:</span><input type='text' class='buscard-el buscard-input-line' id='old-pass-#{prodInstId}' prodInstId ='#{prodInstId}' value='' maxLength =6 serviceId='#{serviceId}' productId='#{productId}' style='width:20%'/>&nbsp;&nbsp;" +
				"<span>新密码:</span><input type='password' class='buscard-el buscard-input-line' id='new-pass-#{prodInstId}' prodInstId ='#{prodInstId}' value='' maxLength =6 style='width:20%'/>&nbsp;&nbsp;" +
				"<span>再次输入新密码:</span><input type='password' class='buscard-el buscard-input-line' id='sureNew-pass-#{prodInstId}' prodInstId ='#{prodInstId}' value='' maxLength =6 style='width:20%'/>" +
				"</div>"+    
				"<br></tp:if>&nbsp;&nbsp;&nbsp;&nbsp;");
		//循环实例号码，生成带有产品实例号码的复选框的代码
		var instItemList =BusCard.map(instNbrInfoLit,function(info){
			return itemTp.apply({
			serviceKind:info.serviceKind,
			serviceKindDesc : orderaccept.prodofferaccept.util.ServiceKindPrefixMap[info.serviceKind]?orderaccept.prodofferaccept.util.ServiceKindPrefixMap[info.serviceKind]+"号码":"未知类型号码",
			sourceFlag:1,
			disableFlag : "",
			prodInstId : info.userId,
			serviceId:info.serviceId,
			uniqueId : Me.nbrUniqueId,
			productId : info.productId
			});
		
		});
		
		//为了展现美观特殊处理一下
		instItemList = Me.dealDisplayOneRow(instItemList);
		//循环在途号码，生成带有在途号码的复选框的代码
		var tempItemList =BusCard.map(tempNbrInfoList,function(info){
			return itemTp.apply({
			serviceKind:info.serviceKind,
			serviceKindDesc : orderaccept.prodofferaccept.util.ServiceKindPrefixMap[info.serviceKind]?orderaccept.prodofferaccept.util.ServiceKindPrefixMap[info.serviceKind]+"号码":"未知类型号码",
			sourceFlag:2,
			disableFlag : "disabled",
			prodInstId : info.userId,
			serviceId:info.serviceId,
			uniqueId :Me.nbrUniqueId,
			productId : info.productId
			});
		
		});
		//为了展现美观特殊处理一下
		tempItemList = Me.dealDisplayOneRow(tempItemList);
		var accountNbrHtml = popWinTp.apply({
		instItemList:instItemList,
		tempItemList:tempItemList
		});
		
		this.innerHTML = accountNbrHtml;
		//重置页面宽度
		Me.$("subpage_wrapper_accountNbrChoose").style.width = '500px';
		//为密码修改绑定事件
		Me.initEventForPassWordComponent(instNbrInfoLit,tempNbrInfoList);
		Me.selectAcctNbr();
		//Me.disabledAccNbr();
		Me.doGetAccNbrSameProductId();
	};
	
	/**
	 * 一行展示个数的处理逻辑
	 */
	Me.dealDisplayOneRow = function(instItemList){
		var returnStr = "";
		var index = 1;
		if(instItemList&&instItemList.length>0){
			for(var p=0;p<instItemList.length;p++){
				returnStr+=instItemList[p];
				if(index%2==0){
					returnStr+="<br>";
				}
				index++;
			}
		}
		return returnStr;
	};
	
	Me.$("accountNbrChoose").collectData = function(cardInstance, _buscard, cardInfo) {
		var data = [];
		var checkboxList = dojo.query("[name='newAccNbrInfo']",Me.$("newAccNum"));
		_buscard.util.each(checkboxList||[], function(dom) {
					if (dom.type && dom.type.toUpperCase() == 'CHECKBOX' && dom.checked) {
						var obj = {};
						obj.serviceId = dom.getAttribute("serviceId");
						obj.sourceFlag = dom.getAttribute("sourceFlag");
						obj.uniqueId = dom.getAttribute("targetUniqueId");
						obj.prodInstId = dom.getAttribute("prodInstId");
						obj.serviceKind = dom.getAttribute("serviceKind");
						obj.serviceKindIndex = dom.getAttribute("serviceKindIndex");
						obj.password = dom.getAttribute("modifyPassword");
						data.push(obj);
					}
				});
		return data;
	};
	/**
	 * 选中账号信息
	 */
	Me.selectAcctNbr =  function(){
		var accNbrNums = getAccNbrNums._fusionNumsList;
		var checkboxList  = dojo.query("[name=accServiceId-"+Me.nbrUniqueId+"]",dojo.query('#nbr_selected_ctn',Me.dom)[0]);
		_buscard.util.each(checkboxList, function(dom) {
					if (dom.type && dom.type.toUpperCase() == 'RADIO') {
						var prodInstId = dom.getAttribute("prodInstId");
						if(_buscard.util.exist(accNbrNums,function(numInfo){
							return numInfo.userId == prodInstId;
						})){
							dom.checked = true;
						}
						//给每个复选框都绑定事件
						dojo.connect(dom,"click",function(event){
							Me.doCheckAccNbr(event);
						});
					}
				});
		BusCard.addEventListener(Me.$("subpage_close_accountNbrChoose"),'click', function(){
			Me.displayNewNbr();
		});
	};
	
	Me.displayNewNbr = function(){
		var fusionNumsList = []
		var tpParam = {};
		var checkboxList  = dojo.query("[name=accServiceId-"+Me.nbrUniqueId+"]",dojo.query('#nbr_selected_ctn',Me.dom)[0]);
		_buscard.util.each(checkboxList, function(dom) {
			if(dom.checked){
				var prodInstId = dom.getAttribute("prodInstId");
				var newPassword = "";
				//密码全存在的时候才设置密码
				if((!!Me.$('old-pass-'+prodInstId))&&(!!Me.$('new-pass-'+prodInstId))&&(!!Me.$('sureNew-pass-'+prodInstId))){
					if(Me.$('old-pass-'+prodInstId).value!=""&&Me.$('new-pass-'+prodInstId).value!=""&&Me.$('sureNew-pass-'+prodInstId).value!=""){
						newPassword = Me.$('sureNew-pass-'+prodInstId).value;
					}
				}
				fusionNumsList.push({
					userId : dom.getAttribute("prodInstId"),
					serviceId : dom.getAttribute("serviceId"),
					password : newPassword
				});
			}
		});
		tpParam.fusionNumsList = fusionNumsList;
		var tp = "<div id='newAccNbrDiv'>\
          <tp:for ds='fusionNumsList'>\
            <input type='checkbox' id='#{userId}' modifyPassword='#{password}' prodInstId ='#{userId}' value='#{userId}' productId='#{productId}' serviceId='#{serviceId}' disabled checked name='newAccNbrInfo'/>\
           <span>#{serviceId}</span>\
         </tp:for>\
        </div>";
 		var innerStr = BusCard.Template.create(tp).apply(tpParam);
 		Me.$("newAccNum").innerHTML = innerStr;
	};
	
	
	/**
	 * 将同客户下同一个产品id下的账号不允许相同
	 */
	Me.doGetAccNbrSameProductId = function(){
        //产品id
		var productId = cardParam.serviceRelation.productId;
		var prodInstId = cardParam.serviceRelation.userId;
		var instInfoList = BusCard.$remote("serviceRelationDAO").query({customerId:custId,productId:productId,ifValue:1,cityCode:cityCode});
		Me.checkInstList = [];
		dojo.forEach(instInfoList, function(instInfo){
			if(instInfo.userId == prodInstId){
				return;
			}
			var data = BusCard.$remote("prodInstCommFacadeBO").getAccNbrInstByProdInstId(instInfo.userId);
			
			Me.checkInstList.push({
				data : data,
				serviceId : instInfo.serviceId
			});
		});
	};
	/**
	 * 账号的检测
	 */
	Me.doCheckAccNbr = function(event){
		var businessParamVO = BusCard.$remote("prodOfferSaleDataBO").getAccNbrSwitch(cardParam.serviceRelation.cityCode);
		//1.不可以选择同一个号码 0可以选择
		if(!!businessParamVO&&businessParamVO.objectValue==1){
			var targetInstId = event.currentTarget.getAttribute("prodInstId");
			if(Me.checkInstList!=null&&Me.checkInstList.length>0){
				for(var p=0;p<Me.checkInstList.length;p++){
					var instData = Me.checkInstList[p];
					var flag = dojo.some(instData.data||[],function(instInfo){
						return instInfo.prodInstId == targetInstId;
					});
					if(flag&&event.currentTarget.getAttribute("checked")){
						alert("当前选中的号码["+event.currentTarget.getAttribute("serviceId")+"]已经是该客户下的其余产品"+instData.serviceId+"的账号，不允许选择为当前号码账号!!!");
						event.currentTarget.getAttribute("checked") == false;	
					}
				}
			}
		}
	};
	
	/**
	 * 初始化密码修改事件
	 */
	Me.initEventForPassWordComponent = function(instItemList,tempItemList){
		_buscard.util.each(instItemList, function(instInfo) {
			dojo.connect(Me.$("modifyPass-"+instInfo.userId),"click",function(event){
								Me.displayPassWordModify(event);
							});
			dojo.connect(Me.$("old-pass-"+instInfo.userId),"blur",function(event){
								Me.doCheckOldPassWord(event);
							});
			dojo.connect(Me.$("new-pass-"+instInfo.userId),"blur",function(event){
								Me.doCheckNewPassWord(event);
							});
			dojo.connect(Me.$("sureNew-pass-"+instInfo.userId),"blur",function(event){
								Me.doCheckSurePassWord(event);
							});
		});
		_buscard.util.each(tempItemList, function(tempInfo) {
			dojo.connect(Me.$("modifyPass-"+tempInfo.userId),"click",function(event){
								Me.displayPassWordModify(event);
							});
			dojo.connect(Me.$("old-pass-"+tempInfo.userId),"blur",function(event){
								Me.doCheckOldPassWord(event);
							});
			dojo.connect(Me.$("new-pass-"+tempInfo.userId),"blur",function(event){
								Me.doCheckNewPassWord(event);
							});
			dojo.connect(Me.$("sureNew-pass-"+tempInfo.userId),"blur",function(event){
								Me.doCheckSurePassWord(event);
							});
		});
	};
	/**
	 * 展现修改密码页面
	 */
	Me.displayPassWordModify = function(event){
		var prodInstId = event.currentTarget.getAttribute("prodInstId");
		var currentAcceptProdInstId = cardParam.serviceRelation.userId;
		//检测是否有未竣工的号码的用当前选择的号码作为账号,如果有，则不允许做账号密码变更,查询账号临时表
		var resultData = orderaccept.prodofferaccept.util.ServiceFactory.getService("url:prodOfferSaleAjaxAction.do?method=doGetServiceIds&prodInstId=" + prodInstId+"&currentAcceptProdInstId="+currentAcceptProdInstId);
		if(resultData.length != 0){
			var tipStr="";
			dojo.forEach(resultData||[],function(_data_){
				tipStr+="["+_data_+"]";
			});
			alert("号码"+tipStr+"有未竣工的账号变更业务，请先进行竣工，再进行账号密码变更");
			return;
		}
		if(Me.$("pass-div-"+prodInstId).style.display == ""){
			Me.$("pass-div-"+prodInstId).style.display = "none";
		}else{
			Me.$("pass-div-"+prodInstId).style.display = "";
		}
	};
	
	/**
	 * 旧号码的检测事件
	 */
	Me.doCheckOldPassWord = function(event){
		//旧的产品实例id
		var prodInstId = event.currentTarget.getAttribute("prodInstId");
		//现在的旧密码的输入框中的值
		var oldPassWord = Me.$('old-pass-'+prodInstId).value;
		//密码为空不处理
		if(oldPassWord== null || oldPassWord== ""){
			return;
		}
		//调用接口来查询旧的密码
		var oldpassWordFromTable = orderaccept.prodofferaccept.util.ServiceFactory.getService("url:prodOfferSaleAjaxAction.do?method=doGetAccessProdOldPassWord&prodInstId=" + prodInstId);
		//alert(oldpassWordFromTable);
		if(oldPassWord != oldpassWordFromTable){
			alert("原始密码错误，请重新输入！");
			Me.$('old-pass-'+prodInstId).value = "";
		}
	};
	/**
	 * 密码确认事件
	 */
	Me.doCheckSurePassWord = function(event){
		//旧的产品实例id
		var prodInstId = event.currentTarget.getAttribute("prodInstId");
		var newPass = Me.$('new-pass-'+prodInstId).value;
		var sureNewPass = Me.$('sureNew-pass-'+prodInstId).value;
		if(newPass!=sureNewPass){
			alert("新密码与再次输入密码输入不一致，请确认！");
			Me.$('sureNew-pass-'+prodInstId).value = "";
		}
	};
	/**
	 * 检测新的密码
	 */
	Me.doCheckNewPassWord = function(event){
		//旧的产品实例id
		var prodInstId = event.currentTarget.getAttribute("prodInstId");
		//新密码
		var newPass = Me.$('new-pass-'+prodInstId).value;
		//旧密码
		var oldPass = Me.$('old-pass-'+prodInstId).value;
		if(newPass==""&&oldPass==""){
			return ;
		}
		if(newPass == oldPass){
			alert("新密码和原密码一致");
			Me.$('new-pass-'+prodInstId).value = "";
		}
	};
	
	
});
