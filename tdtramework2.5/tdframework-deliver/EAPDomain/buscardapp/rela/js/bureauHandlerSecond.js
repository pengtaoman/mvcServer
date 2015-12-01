BusCard.define('/buscardapp/rela/js/bureauHandlerSecond.js', function(_buscard, cardParam) {
	        var Me = this;
	        var a = arguments[0];
	        var b = arguments[1];
	        var executeRequest = _buscard.executeRequest;
	        var serviceRelation = b.serviceRelation || this.serviceRelation;
	        var c = b.belongCode || serviceRelation.belongCode;
	        var belongCodeElem = Me.$("belongCode");
	        var addrIdElem = Me.$("addrId");
	        var addrDetailElem = Me.$("addrDetail");
	        var serviceParamBO = a.$remote("serviceParamBO");
	        var initFlag = false;
	        var bureauIdElem = Me.$('bureauId');
	        var oldBureaId;
	        window.FistTime=false;
	            //if(bureauIdElem)
	           // bureauIdElem.value =BusCard.$remote("commResourceBO").getUpIdByBureauId(serviceRelation.cityCode,serviceRelation.branchNo) + "";
				        
	        var branchNoElem = Me.$('branchNo');
	        if (belongCodeElem) belongCodeElem.value = c;
	        
	        // 刷新子局,考虑效率不是大问题,不缓存了
	        var refreshBranch = function(bureauId, targetCityCode) {
		        if (branchNoElem) {
			        var branchData = serviceParamBO.getBureauId(5, bureauId, targetCityCode);
			        if (branchData && branchData.list) a.$rs(branchNoElem, branchData.list);
			        if (Me.postBureauOrBranchNoChangeHandle) {
				        Me.postBureauOrBranchNoChangeHandle();
			        }
		        }
	        };
	        var refreshBureauAndBranch = function(belongCode) {
		        var cityCodeNode = Me.$("cityCode");
		        var targetCityCode = b.cityCode;
		        // ddn业务处理
		        if (cityCodeNode) {
			        targetCityCode = cityCodeNode.value;
		        }
		        // 如果区域是5级的,取4级区域
		           belongCode=belongCode==""?c:belongCode;
		        if (Me.$("belongCode")&&belongCode) {
			        var commonRegionDAOStub = BusCard.$remote("commonRegionDAO", "om");
			        var commonRegionVO = commonRegionDAOStub.getCommonRegionVO(parseInt(belongCode + ""));
			        if (commonRegionVO.regionLevel >= 5) {
				        Me.$("belongCode").value = commonRegionVO.upRegionId+"";
				        belongCode=commonRegionVO.upRegionId+"";
			        }
			        
		        }
		        if (Me.$('bureauId')) {
			        var cdata = serviceParamBO.getBureauId(4, belongCode, targetCityCode);
			        if (cdata && cdata.list) a.$rs(Me.$('bureauId'), cdata.list);
			        bureauIdElem.onchange = function() {
				        refreshBranch(this.value, targetCityCode);
			        };
			       // 首次根据实例刷新子局和母局
			        if (serviceRelation  && !initFlag) {
				       
				        oldBureaId=BusCard.$remote("mktResInterfaceBO").getUpIdByBureauId4(targetCityCode,serviceRelation.branchNo) + "";
				        bureauIdElem.value = a.parse(oldBureaId);
				        oldBureaId = oldBureaId.replace(/\"/g,"");
				        bureauIdElem.onchange();
				        //branchNoElem && (branchNoElem.value = serviceRelation.branchNo + "");
				        initFlag = true;
			        } else {
				       bureauIdElem.onchange();
			        }
		        }
		        if (Me.$('branchNo')) {
			        var branchData = serviceParamBO.getBureauId(5, oldBureaId, targetCityCode);
			        if (branchData && branchData.list) a.$rs(Me.$('branchNo'), branchData.list);
			        if(serviceRelation&&serviceRelation.branchNo){
			        		var _existFlag = dojo.some(branchData.list||[],function(_data_){
			        			return _data_.id == serviceRelation.branchNo + "";
			        		});
			        		if(branchData.list.length>0&&!_existFlag){
			        			//重新调用资源接口进行取归属局向的值
			        			var _branchData = serviceParamBO.getBureauIdForChg(5, belongCode, targetCityCode);
			        			if (_branchData && _branchData.list) a.$rs(Me.$('branchNo'), _branchData.list);
			        		}
							Me.$('branchNo').value = serviceRelation.branchNo + "";		        
			        }
			        
		        }
		        
	        };
	        var cleanUpAddr = function() {
		        if (addrIdElem) {
			        addrIdElem.value = "";
		        }
		        if (addrDetailElem) {
			        addrDetailElem.value = "";
		        }
	        };
	        if (belongCodeElem) {
		        belongCodeElem.onchange = function() {
			        refreshBureauAndBranch(this.value);
			        // 不存在是否移机选项，或存在是否移机选项，并要求移机
			        //if (!Me.$("ifSpanBureau") || (Me.$("ifSpanBureau").value && Me.$("ifSpanBureau").value > 0)) {
				      //  cleanUpAddr();
			        //}
			        if(window.FistTime){
			           checkBelongCode();
			        }
			         window.FistTime=true;
		        };
		        belongCodeElem.onchange();
		       
		        
	        } else {
		        refreshBureauAndBranch(c);
	        }
	       var checkBelongCode=function(){
	            var parameter="belongCode="+Me.$("belongCode").value+"&prodInstId="+b.serviceRelation.userId;
		        var resultJsonStr=executeRequest("orderDetailAction", "checkBelongCode", parameter);
		        var jsonResultObj = (typeof resultJsonStr == "string") ? eval("(" + resultJsonStr + ")") : resultJsonStr;
				if (jsonResultObj && jsonResultObj.flag && jsonResultObj.flag == "-1") {
				    Me.$("belongCode").value=b.serviceRelation.belongCode;
				     alert("\u6b64\u7528\u6237\u8ba2\u8d2d\u7684\u4e3b\u9500\u552e\u54c1\u4e0d\u9002\u7528\u8981\u53d8\u66f4\u7684\u4f7f\u7528\u533a\u57df\uff0c\u8bf7\u5148\u53d8\u66f4\u4e3b\u9500\u552e\u54c1\u3002");
				     return false;
			    }
	       
	       };
	        
	        
        });
