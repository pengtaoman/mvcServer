BusCard.define('/buscardapp/rela/js/fixedSyncHandler.js', function(_buscard, cardParam) {
	try {
		var Me = this;
		var addrDetailPath = "/129/addrDetail/change";
		var addrIdPath = "/129/addrId/change";
		var bookBegDatePath = "/129/bookBegDate/change";
		var bookEndDatePath = "/129/bookEndDate/change";
		var datePattern = /^(\d+)\-(\d+)\-(\d{2,2})$/
		Me.subscribe(addrDetailPath);
		Me.subscribe(addrIdPath);
		Me.subscribe(bookBegDatePath);
		Me.subscribe(bookEndDatePath);
		var addrDetailElem = Me.$("addrDetail"),
			addrIdElem = Me.$("addrId"),
			bookBegDateElem = Me.$("installBegTime"),
			bookEndDateElem = Me.$("installEndTime");
		Me.on(addrDetailElem, "blur", function() {
			        Me.publish(addrDetailPath, this.value);
		        });
		Me.on(addrIdElem, "blur", function() {
			        Me.publish(addrIdPath, this.value);
		        });
		
		var checkDate = function(elem) {
			if (bookBegDateElem && bookEndDateElem && datePattern.test(bookBegDateElem.value)
			        && datePattern.test(bookEndDateElem.value)) {
				var beginTime = new Date();
				var endTime = new Date();
				var dateArr = bookBegDateElem.value.split("-");
				beginTime.setFullYear(parseInt(dateArr[0], 10), parseInt(dateArr[1], 10) - 1,
				        parseInt(dateArr[2], 10));
				dateArr = bookEndDateElem.value.split("-");
				endTime.setFullYear(parseInt(dateArr[0], 10), parseInt(dateArr[1], 10) - 1,
				        parseInt(dateArr[2], 10));
				if (beginTime > endTime) {
					alert("\u5f00\u59cb\u65f6\u95f4\u4e0d\u80fd\u5927\u4e8e\u7ed3\u675f\u65f6\u95f4");
					elem.value = "";
					elem.focus();
					return false;
				}
			}
			return true;
		};
		
		var checkCurrentDate = function(elem) {
			if (datePattern.test(elem.value)) {
				var current = new Date(),
					elemTime = new Date();
				var dateArr = elem.value.split("-");
				elemTime.setFullYear(parseInt(dateArr[0], 10), parseInt(dateArr[1], 10) - 1,
				        parseInt(dateArr[2], 10));
				if (elemTime < current) {
					alert("\u5f00\u59cb\u65f6\u95f4\u6216\u7ed3\u675f\u65f6\u95f4\u4e0d\u80fd\u5c0f\u4e8e\u5f53\u524d\u65f6\u95f4");
					elem.value = "";
					elem.focus();
					return false;
				}
			}
		};
		Me.on(bookBegDateElem, "propertychange", function() {
			        var evt = event || window.event;
			        if (evt.propertyName == "value" && datePattern.test(this.value)) {
				        if (checkCurrentDate(this) == false) return false;
				        if (checkDate(this) == false) return false;
				        Me.publish(bookBegDatePath, this.value);
			        }
		        });
		Me.on(bookEndDateElem, "propertychange", function() {
			        var evt = event || window.event;
			        if (evt.propertyName == "value" && datePattern.test(this.value)) {
				        if (checkCurrentDate(this) == false) return false;
				        if (checkDate(this) == false) return false;
				        Me.publish(bookEndDatePath, this.value);
			        }
		        });
		Me.receive = function(message) {
			var path = message.path;
			var value = message.data;
			if (path == addrDetailPath) {
				if (!addrDetailElem.value) {
					addrDetailElem.value = value;
				}
			} else if (path == addrIdPath) {
				if (!addrIdElem.value) {
					addrIdElem.value = value;
				}
				
			} else if (path == bookBegDatePath) {
				if (!bookBegDateElem.value) {
					bookBegDateElem.value = value;
				}
			} else if (path == bookEndDatePath) {
				if (!bookEndDateElem.value) {
					bookEndDateElem.value = value;
				}
				
			}
		};
		if(!!addrDetailElem){
			var serviceRelationVO = Me.getCardRelationInfo();
			if(!!serviceRelationVO){
				if(serviceRelationVO.userId > 0 && !!serviceRelationVO.addrDetail){		
					addrDetailElem.value = serviceRelationVO.addrDetail;
					addrDetailElem.onblur();
				}
			}
		}
		
	}
	catch (e) {
		alert(e.message)
	}
});
