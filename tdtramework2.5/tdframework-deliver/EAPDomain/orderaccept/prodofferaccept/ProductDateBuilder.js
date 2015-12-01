defineModule("orderaccept.prodofferaccept.ProductDateBuilder", [], function() {
	/**
	 * 在Data中增加获取账期的方法，目前和getMonth方法一样
	 */
	Date.prototype.getMonthEnd = Date.prototype.getMonth;
	/**
	 * 在Data中增加设置账期的方法，设置为前一个月的最后一天
	 */
	Date.prototype.setMonthEnd = function(date) {
		// 设置当月一号
		this.setDate(1);
		this.setMonth(date);
		
	};
	
	var getDateFromString = function(dateString, flag) {
		if (!dateString) { return null; }
		var oDate;
		if (typeof dateString == 'number') {
			oDate = new Date(dateString);
		} else {
			var dateArr = dateString.split(" ");
			var dateYMD = dateArr[0].split("-");
			var year = parseInt(dateYMD[0], 10);
			var month = parseInt(dateYMD[1], 10) - 1;
			var date = parseInt(dateYMD[2], 10);
			var hour = "";
			var min = "";
			var sec = "";
			if (dateArr[1] != null && dateArr[1] != undefined) {
				var dateHMS = dateArr[1].split(":");
				hour = parseInt(dateHMS[0], 10);
				min = parseInt(dateHMS[1], 10);
				sec = parseInt(dateHMS[2], 10);
			}
			/*
			 * 预约销售品，开始时间只保留年月日
			 */
			if (flag && flag == 1) {
				oDate = new Date(year, month, date);
			} else {
				oDate = new Date(year, month, date, hour, min, sec);
			}
		}
		return oDate;
	}
	
	var formatDate = function(date) {
		var iMonth = date.getMonth() + 1;
		var sMonth = new String(iMonth);
		if (sMonth.length == 1) {
			sMonth = "0" + sMonth;
		}
		var iDate = date.getDate();
		var sDate = new String(iDate);
		if (sDate.length == 1) {
			sDate = "0" + sDate;
		}
		var iHour = date.getHours();
		var sHour = new String(iHour);
		if (sHour.length == 1) {
			sHour = "0" + sHour;
		}
		var iMin = date.getMinutes();
		var sMin = new String(iMin);
		if (sMin.length == 1) {
			sMin = "0" + sMin;
		}
		var iSec = date.getSeconds();
		var sSec = new String(iSec);
		if (sSec.length == 1) {
			sSec = "0" + sSec;
		}
		return date.getFullYear() + '-' + sMonth + '-' + sDate + ' ' + sHour + ':' + sMin + ':' + sSec;
	}
	/**
	 * 处理产品受理中的日期，包括开始日期和结束日期 产品新装没有预约 产品变更不支持工单级预约
	 * 
	 * @param oParameter
	 * @return
	 */
	orderaccept.prodofferaccept.ProductDateBuilder = function(oParameter) {
		var Me = this;
		/**
		 * 
		 * 数据库系统时间
		 * 
		 */
		Me.today = oParameter["today"];
		/**
		 * 常量 2037-01-01 00:00:00
		 * 
		 */
		Me.invalidDate = "2037-01-01 00:00:00"; //
		/**
		 * 变更类型：1 新增，2 变更，3删除
		 * 
		 */
		
		Me.changeKind = oParameter["changeKind"];
		/**
		 * 
		 * 延时生效单位，>0 表示有预约
		 * 
		 */
		Me.delayUnit = oParameter["delayUnit"];
		
		Me.delayTime = oParameter["delayTime"];
		/**
		 * 有效期类型
		 * 
		 */
		Me.validType = oParameter["validType"];
		/**
		 * 有效期周期
		 * 
		 */
		Me.validPeriod = oParameter["validPeriod"];
		/**
		 * 主产品是否预约标识，变更主产品时有用。新旧主产品只要有个是预约的其就是预约的。bluer值
		 * 
		 */
		Me.isMainReserve = oParameter["isMainReserve"];
		/**
		 * 产品预约标识
		 * 
		 * 
		 */
		Me.ifReserve = oParameter["ifReserve"];
		/**
		 * 用户订购的开始时间，新增的全部是系统时间
		 * 
		 * 
		 */
		Me.beginDate = oParameter["beginDate"];
		/**
		 * 主产品延时生效单位
		 * 
		 */
		Me.oEffectType = oParameter["oEffectType"];
		/**
		 * 主产品延时生效单位
		 * 
		 */
		Me.effectType = Me.oEffectType ? Me.oEffectType.value : "0";
		/**
		 * 用户订购的结束日期，新增是全部是2037-01-01
		 * 
		 */
		Me.endDate = oParameter["endDate"];
		/**
		 * 
		 * 组产品的组合标识
		 * 
		 * 
		 */
		
		var ifCombProd = oParameter["ifCombProd"];
		/**
		 * 
		 * 申请事项
		 * 
		 */
		var applyEvent = oParameter["applyEvent"];
		/**
		 * 
		 * 变更主产品标识
		 * 
		 * 
		 */
		
		var ifChangeMainProduct = oParameter["ifChangeMainProduct"];
		
		/**
		 * 是否变更主销售品标识
		 */
		var ifChangeMainFlag = oParameter["ifChangeMainFlag"];

		/**
		 * 延迟退订单位
		 */
		Me.delayUnorderUnit = oParameter["delayUnorderUnit"];
		/**
		 * 延迟退订时长
		 */
		Me.delayUnorderTime = oParameter["delayUnorderTime"];
		/**
		 * 
		 * 账期应该是截止到月底。
		 * 
		 */
		Me.dateTypeMap = {
			"1" : "setYear",
			"2" : "setMonth",
			"3" : "setMonthEnd",
			"4" : "setMonth",
			"6" : "setDate",
			"7" : "setHour"
		};
		
		Me.dateTypeMapGet = {
			"1" : "getFullYear",
			"2" : "getMonth",
			"3" : "getMonthEnd",
			"4" : "getMonth",
			"6" : "getDate",
			"7" : "getHour"
		};
		/**
		 * 计算延时生效的方法
		 */
		Me.delayDateTypeMap = {
			"1" : "setYear",
			"2" : "setMonth",
			"3" : "setMonth",
			"4" : "setDate",
			"5" : "setHours"
		};
		
		Me.delayDateTypeMapGet = {
			"1" : "getFullYear",
			"2" : "getMonth",
			"3" : "getMonth",
			"4" : "getDate",
			"5" : "getHours"
		};
		
		/**
		 * 开始日期计算函数
		 * 
		 */
		Me.getBeginDate = function() {
			
			if (dojo.some([0, 2, 3], function(value) {
				        return value == Me.changeKind
			        })) {
				/**
				 * 如果是比那更或删除开始时间就是用订购的开始时间
				 * 
				 */
				return Me.beginDate;
			}
			var oBeginDate = getDateFromString(Me.today);
			
			oBeginDate = getBeginDateObject(oBeginDate);// 获取正常开始时间
			
			if (oBeginDate == null) { throw new Error("开始日期计算错误"); }
			return formatDate(oBeginDate);
		};
		
		function getBeginDateObject(oBeginDate) {
			//变更主销售品可选包新订购的可选包默认下月生效,直接取页面的展示时间
			if (Me.changeKind == 1 && ifChangeMainFlag) {
				return getDateFromString(Me.beginDate);
			}
			/*
			 * if ([2, 3].has(Me.changeKind))
			 * //如果是比那更或删除开始时间就是用订购的开始时间 oBeginDate =
			 * getDateFromString(Me.beginDate); else {
			 * 针对预约主产品变更，开始时间统一为主产品的下一周期
			 */
			var isChangeMainReserve = applyEvent == 302 && ifChangeMainProduct == 1 && Me.isMainReserve;
			
			/*
			 * 产品配置的延时生效单位和周期都大于0则为预约
			 */
			var isProductReserve = false;
			if(Me.delayUnit!=null&&Me.delayTime!=null){
				isProductReserve = Me.delayUnit > 0 && Me.delayTime > 0;
			}
			
			var isNeedResever = isChangeMainReserve || isProductReserve;
			if (Me.changeKind == 1 && isNeedResever) {
				oBeginDate = getDelayTimeAfterPeriod(getDateFromString(Me.today, 1), Me.delayUnit, Me.delayTime);
			}
			return oBeginDate;
		}
		
		/**
		 * 获取结束日期
		 * 
		 */
		Me.getEndDate = function() {
			var oEndDate = getEndDateObject();
			return formatDate(oEndDate);
		};
		
		/**
		 * 获取结束日期对象
		 */
		function getEndDateObject() {
			if (!Me.endDate) {
				Me.endDate = Me.invalidDate;
			}
			if (Me.endDate.length < 10) { throw new Error("\u7ed3\u675f\u65e5\u671f\u6709\u8bef\uff1a" + Me.endDate); }
			// Me.endDate=Me.endDate.substr(0,10);
			var oEndDate = getDateFromString(Me.endDate);
			if (Me.changeKind == 1) {
				/*
				 * 获取开始时间
				 */
				var oBeginDate = getDateFromString(Me.getBeginDate());
				
				/*
				 * 增加有效期
				 */
				var tempEndDate = addDateByUnit(getDateFromString(Me.getBeginDate()), Me.validType, Me.validPeriod);
				
				/*
				 * 比较有效期和结束日期
				 */
				tempEndDate = getMinDate(tempEndDate, getDateFromString(Me.invalidDate));
				
				/*
				 * 比较开始日期和结束日期，如果相等，则结束日期等于2037-01-01
				 */
				if (tempEndDate.getTime() == oBeginDate.getTime()) oEndDate = getDateFromString(Me.invalidDate);
				else oEndDate = tempEndDate;
				if (typeof Me.dateTypeMap[Me.validType] === "undefined" || typeof Me.dateTypeMapGet[Me.validType] === "undefined" || Me.validPeriod == 0){
					//不做处理
				}else{
					//对结束时间进行处理,去掉时分秒
					oEndDate = getDateFromString(formatDate(oEndDate),1);
				}
			} else if (Me.changeKind == 3) {
				var oToday = getDateFromString(Me.today);
				if (Me.ifReserve != 1) {
					var tempEndDate;
					if (ifChangeMainProduct == 1) {
						if (Me.isMainReserve) tempEndDate = getFirstDayAfterPeriod(getDateFromString(Me.today, 1), 2, 1);
						else tempEndDate = oToday;
					} else {
						if (Me.delayUnorderUnit && (Me.delayUnorderUnit == 0 || Me.delayUnorderUnit == "0")) {
							tempEndDate = oToday;
						} else if (Me.delayUnorderUnit && Me.delayUnorderTime) {
							//获取退订延迟生效单位
							tempEndDate = getDelayTimeAfterPeriod(getDateFromString(Me.today, 1),Me.delayUnorderUnit,Me.delayUnorderTime);
						} else {
							tempEndDate = getFirstDayAfterPeriod(getDateFromString(Me.today, 1), 2, 1);	
						}
//						else {
//							if (Me.delayUnit > 1 && Me.delayTime > 0) {
//								tempEndDate = getFirstDayAfterPeriod(getDateFromString(Me.today, 1), 2, 1);
//							} else {
//								tempEndDate = oToday;
//							}
//						}
					}
					/*
					 * 比较有效期和结束日期
					 */
					oEndDate = getMinDate(tempEndDate, getDateFromString(Me.invalidDate));// 解决第二次计算时时间不变的问题
				} else {
					/*
					 * 预约删除立即生效
					 */
					oEndDate = oToday;
				}
			}
			return oEndDate;
		}
		
		function getMinDate(date1, date2) {
			var minDate = Math.min(date1.getTime(), date2.getTime());
			return new Date(minDate);
		}
		
		/*
		 * 计算延时时间
		 */
		function addDateByUnit(oDate, validType, validPeriod) {
			if (validType == 0) { return getDateFromString(Me.invalidDate); }
			var dateType = Me.dateTypeMap[validType];
			var dateTypeGet = Me.dateTypeMapGet[validType];
			if (typeof dateType === "undefined" || typeof dateTypeGet === "undefined" || validPeriod == 0) { return oDate; }
			oDate[dateType](oDate[dateTypeGet]() + parseInt(validPeriod, 10));
			return oDate;
		}
		
		function getFirstDayAfterPeriod(oDate, validType, validPeriod) {
			/*
			 * 如果延时单位或者周期为0则不处理
			 */

			if (validType == 0 || validPeriod == 0) { return oDate; }
			oDate.setDate(1);
			oDate = addDateByUnit(oDate, validType, validPeriod);
			return oDate;
		}
		/**
		 * 获取延迟生效的时间
		 */
		function getDelayTimeAfterPeriod(oDate, delayUnit, delayTime) {
			//账期后生效,特殊处理一下,设置成一号
			if(delayUnit == 2){
				oDate.setDate(1);
			}
			oDate = addDelayDateByUnit(oDate, delayUnit, delayTime);
			return oDate;
		}
		/**
		 * 计算延时生效单位
		 */
		function addDelayDateByUnit(oDate, delayUnit, delayTime) {
			var dateType = Me.delayDateTypeMap[delayUnit];
			var dateTypeGet = Me.delayDateTypeMapGet[delayUnit];
			if (typeof dateType === "undefined" || typeof dateTypeGet === "undefined" || delayTime == 0) { return oDate; }
			oDate[dateType](oDate[dateTypeGet]() + parseInt(delayTime, 10));
			return oDate;
		}
		
	};
	
	// export
	orderaccept.prodofferaccept.NewMainProductDateBuilder = function(oParameter) {
		var Me = this;
		
		Me.builder = new orderaccept.prodofferaccept.ProductDateBuilder(oParameter);
		
		Me.getBeginDate = function() {
			return Me.builder.getBeginDate();
		};
		
		Me.getEndDate = function() {
			return Me.builder.getEndDate();
		};
	};
	orderaccept.prodofferaccept.ProductDateBuilder.NewMainProductDateBuilder = orderaccept.prodofferaccept.NewMainProductDateBuilder;
	// export
	orderaccept.prodofferaccept.ProductDateBuilderFactoty = {
		getBuilder : function(productType, oParameter) {
			if (productType == 1) {
				return new orderaccept.prodofferaccept.NewMainProductDateBuilder(oParameter);
			} else {
				return new orderaccept.prodofferaccept.ProductDateBuilder(oParameter);
			}
		}
	};
	
	orderaccept.prodofferaccept.ProductDateBuilder.getDateFromString = getDateFromString;
	orderaccept.prodofferaccept.ProductDateBuilder.getStringTimeFromDate = formatDate;
	
})
