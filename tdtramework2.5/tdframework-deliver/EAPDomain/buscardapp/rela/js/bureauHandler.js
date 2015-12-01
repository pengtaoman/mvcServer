BusCard.define('/buscardapp/rela/js/bureauHandler.js', function(_buscard, cardParam) {
	        var Me = this;
	        var a = arguments[0];
	        var b = arguments[1];
	        var serviceRelation = b.serviceRelation || this.serviceRelation || {};
            if (dojo.getObject("prodOfferAcceptLoader") != null && 
                        prodOfferAcceptLoader.declaredClass == "orderaccept.prodofferaccept.loader.PreAcceptOrderLoader") {
                serviceRelation = prodOfferAcceptLoader.preAcceptOrderVO;
                serviceRelation.branchNo = serviceRelation.bureauNo || "";
            }
	        var c = b.belongCode || serviceRelation.belongCode;
	        var belongCodeElem = Me.$("belongCode");
	        var addrIdElem = Me.$("addrId");
	        var addrDetailElem = Me.$("addrDetail");
	        var serviceParamBO = a.$remote("serviceParamBO");
	        var bureauIdElem = Me.$('bureauId');
	        var branchNoElem = Me.$('branchNo');
	        var initFlag = false;
			var util = dojo.require("orderaccept.prodofferaccept.util");
	        // ˢ���Ӿ�,����Ч�ʲ��Ǵ�����,��������
	        var refreshBranch = function(bureauId, targetCityCode) {
		        if (branchNoElem) {
			        var branchData = serviceParamBO.getBureauId(5, bureauId, targetCityCode);
			        if (branchData && branchData.list){
			        
						var param = "&ServiceKind=0"+"&apply_event=-1"+"&infoId=66";
						var result = util.ServiceFactory.getService("url:businessAcceptAction.do?method=getCityBusinessParamValue" + param);
						var branchLsit = branchData.list;
						if (!!result && result == "1") {
							branchLsit = dojo.filter( branchData.list,function(object){
											return object.id == bureauId;
										});
							
						}
						a.$rs(branchNoElem, branchLsit)
			        } ;
			        if (Me.postBureauOrBranchNoChangeHandle) {
				        Me.postBureauOrBranchNoChangeHandle();
			        }
		        }
	        };
	        if (belongCodeElem) {
		        Me.renderDefaultValue({
			                "belongCode" : c
		                });
	        }
	        var refreshBureauAndBranch = function(belongCode) {
		        var cityCodeNode = Me.$("cityCode");
		        var targetCityCode = b.cityCode;
		        // ddnҵ����
		        if (cityCodeNode) {
			        targetCityCode = cityCodeNode.value;
		        }
		        // ���������5����,ȡ4������
		        if (!Me.$("belongCode") && belongCode) {
			        var commonRegionDAOStub = BusCard.$remote("commonRegionDAO", "om");
			        var commonRegionVO = commonRegionDAOStub.getCommonRegionVO(parseInt(belongCode + ""));
			        if (commonRegionVO.regionLevel >= 5) {
				        belongCode = commonRegionVO.upRegionId + "";
			        }
			        
		        }
		        // ��ĸ�ְ󶨱���¼�,ˢ���Ӿ�
		        if (bureauIdElem) {
			        var cdata = serviceParamBO.getBureauId(4, belongCode, targetCityCode);
			        if (cdata && cdata.list) a.$rs(bureauIdElem, cdata.list);
			        bureauIdElem.onchange = function() {
				        refreshBranch(this.value, targetCityCode);
			        };
			        // �״θ���ʵ��ˢ���Ӿֺ�ĸ��
			        if (serviceRelation && serviceRelation.branchNo && !initFlag) {
			        	var branchNo = serviceRelation.branchNo;
	        			var param = "&ServiceKind=0"+"&apply_event=-1"+"&infoId=66";
						var result = util.ServiceFactory.getService("url:businessAcceptAction.do?method=getCityBusinessParamValue" + param);
						if(!!result && result == "1"){
							bureauIdElem.value = branchNo;
						}else{
							var value = BusCard.$remote("mktResInterfaceBO").getUpIdByBureauId(targetCityCode,branchNo);
	        				bureauIdElem.value = (value||"").replace(/"/g,"");
						}
	        			BusCard.dispatchEvent(bureauIdElem,"change");
				        branchNoElem && (branchNoElem.value = branchNo + "");
				        initFlag = true;
			        } else {
			        	BusCard.dispatchEvent(bureauIdElem,"change");
			        }
		        } else if (branchNoElem) {
			        if (serviceRelation && serviceRelation.branchNo) {
				        // ���µ�����Դ�ӿڽ���ȡ���������ֵ
				        var _branchData = serviceParamBO.getBureauIdForChg(5, belongCode, targetCityCode);
				        if (_branchData && _branchData.list) a.$rs(Me.$('branchNo'), _branchData.list);
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
			        // �������Ƿ��ƻ�ѡ�������Ƿ��ƻ�ѡ���Ҫ���ƻ�
			        if (!Me.$("ifSpanBureau") || (Me.$("ifSpanBureau").value && Me.$("ifSpanBureau").value > 0)) {
				        cleanUpAddr();
			        }
		        };
		        BusCard.dispatchEvent(belongCodeElem, "change");
	        } else {
		        refreshBureauAndBranch(c);
	        }
	        BusCard.addEventListener(Me.$("branchNo"), "change", function() {
		                if (Me.postBureauOrBranchNoChangeHandle) {
			                Me.postBureauOrBranchNoChangeHandle();
		                }
		                
	                });
	        
        });
