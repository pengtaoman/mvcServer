BusCard.define('/buscardapp/rela/js/extraInfo.js',function(_buscard,cardParam){ 
var Me = this;
var a = arguments[0];
var b = arguments[1];
var executeRequest = _buscard.executeRequest;
var unicoder = {"KEY_NOT_BLANK":"\u8bf7\u8f93\u5165\u67e5\u8be2\u5173\u952e\u8bcd"};
	if(!!Me.$("serviceGroupId")){
		Me.$("serviceGroupId").onquery = function () {
				var checkbox = this, _card = arguments[0], _buscard = arguments[1], _p = arguments[2];
				var value = _buscard.util.trim(this.value);
				if (!value) {
					alert("\u8bf7\u8f93\u5165\u67e5\u8be2\u5173\u952e\u8bcd");
					this.focus();
					return false;
				}
				var data = {productId:_p.productId, name:value, fieldId:this.getAttribute("fieldId")};
				var jsonData = BusCard.util.native2ascii(_buscard.toJson(data));
				var requestParam = {jsonData:jsonData, method:"query"};
				return _buscard.util.doGet(_buscard.path.initPath, requestParam);
			};
	}
	if(!!Me.$('groupId')){	
		Me.$('groupId').onquery = function() {
			var checkbox = this, _card = arguments[0], _buscard = arguments[1], _p = arguments[2];
			_data = arguments[3];
			var value = _buscard.util.trim(this.value);
	//		if (!_data || !_data.groupName || !_data.groupMarker) {
	//			alert(unicoder.KEY_NOT_BLANK);
	//			this.focus();
	//			return false;
	//		}
			
			if(Me.$("groupName").value==""&&Me.$("groupMarker").value=="")
			{
				alert("[\u96c6\u56e2\u540d\u79f0]\u548c[\u96c6\u56e2\u6807\u8bc6]\u81f3\u5c11\u8f93\u5165\u4e00\u9879!");
				Me.$("groupName").focus();
				return;
			}
			
			var data = {
				groupName : _data.groupName,
				groupMarker : _data.groupMarker,
				cityCode: b.cityCode,
				fieldId : this.getAttribute('fieldId')
			};
			var jsonData = BusCard.util.native2ascii(_buscard.toJson(data));
			var requestParam = {
				jsonData : jsonData,
				method : 'query'
			};
			return _buscard.util.doGet(_buscard.path.initPath, requestParam);
		};
		
	
		Me.$('groupId').onchange = function() {
			var cityCode= b.cityCode;
			var productId=b.productId;
				
			var name = Me.$('groupId').options[Me.$('groupId').selectedIndex].innerHTML;	
			var C = "cityCode=" + cityCode+ "&productId=" + productId + "&name=" + BusCard.util.native2ascii(name);
			var resultJsonStr = executeRequest("orderDetailAction", "getUserRoleParam", C);
			try{
				var jsonResultObj = (typeof resultJsonStr == "string") ? eval("(" + resultJsonStr + ")") : resultJsonStr;
				if (jsonResultObj ) {
					serviceGroupName = jsonResultObj.serviceGroupName;
					if (serviceGroupName!=null) {
						Me.$("serviceGroupId").value=serviceGroupName;
					}				
				}		
			}catch(e){
				return false;
			}
	
		};
	}
});
