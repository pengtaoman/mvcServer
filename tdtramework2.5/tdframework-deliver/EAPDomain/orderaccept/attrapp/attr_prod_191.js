BusCard.define('/orderaccept/attrapp/attr_prod_191.js',function(_buscard,cardParam){
	        var prodOfferAcceptPageDispatch=function(){
				var Me = this;
				//生成6位随即密码（wifi认证密码）
				var getRandomPassword=function(){
					var pwdReg = /^(?![a-zA-Z]+$)(?![0-9]+$)[a-zA-Z0-9]{6,10}$/;
					var selectChar=new Array('0','1','2','3','4','5','6','7','8','9',
											 'a','b','c','d','e','f','g','h','i','j',
											 'k','l','m','n','o','p','q','r','s','t',
											 'u','v','w','x','y','z',
											 'A','B','C','D','E','F','G','H','I','J',
											 'K','L','M','N','O','P','Q','R','S','T',
											 'U','V','W','X','Y','Z');
					var password = "";
					for(var i = 0; i < 6;i++){
					    password +=""+selectChar[Math.floor(Math.random()*62)];
					}
					if(!pwdReg.exec(password)){
						password = arguments.callee.apply();
					}
					return password;
				}
				if(!!Me.$("191")){//认证密码
					Me.$("191").onblur = function(){
					   if(Me.$("191").value!=""){					   	
							var password = Me.$("191").value;
							var pwdReg = /^(?![a-zA-Z]+$)(?![0-9]+$)[a-zA-Z0-9]{6,10}$/;
							if(password != "" && !pwdReg.exec(password)){
								orderaccept.common.dialog.MessageBox.alert({
									message:"[认证密码]应为6-10位的字母和数字的组合"
								});
							    Me.$("191").value = "";
							    return false;
							}
							if(Me.$("1") && Me.$("1").value != "" && Me.$("191").value!= Me.$("1").value){
								Me.$("1").value = "";
							}
					   }
					}	
					var util = dojo.getObject("orderaccept.prodofferaccept.util");
					if(!!util){
			            var widget = dijit.getEnclosingWidget(Me.dom);
			            var prodInstVO=widget.prodInstVO;
			            var prodInstAttrList = null;
			            var instVO = null;
			            if(!!prodInstVO){
				            prodInstAttrList = prodInstVO.prodInstAttrList;
				        	instVO = prodInstAttrList.find(function(inst) {
				                 return inst.attrId == '191';
				              });
			            }
						if(!instVO){
							Me.$("191").value=getRandomPassword();
							//Me.$("191").readOnly = true;//老系统订购时候，认证密码可改
							if(!!Me.$("1")){
								Me.$("1").value = "";
								Me.$("1").readOnly = true;
							}
						}
					}
				}
	        };
	        var attrUsedPage = window.attrUsedPage || 'prodOfferAcceptPage';
	        /**
	         * 综合查询页面处理分支
	         * @method
	         */
	        var allInfoQueryPageDispatch = function() {};
	        /**
	         * 二次业务处理分支
	         * @method
	         */
	        var secondBusinessPageDispatch = function() {};
	        /**
	         * 批量页面处理分支
	         * @method
	         */
	        var batchPageDispatch = function() {	        
	             prodOfferAcceptPageDispatch.apply(this,arguments);
	        };
	      
	        //调用具体分支处理逻辑
	        return eval(attrUsedPage + "Dispatch").apply(this, arguments);
});
