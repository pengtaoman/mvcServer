BusCard.define('/orderaccept/attrapp/attr_prod_200016.js', function(_buscard,
				cardParam) {
			var prodOfferAcceptPageDispatch = function() {
				var Me = this;
				Me.$("200016").onblur = function(){
					var feeValue = Me.$("200016").value;
					if(!/^\d+$/.test(feeValue)){
						orderaccept.common.dialog.MessageBox.alert({
									message:"月费用限额只能输入数字！"
								});
						Me.$("200016").value = "";
						return false;
					}
				}
				
			};
			var attrUsedPage = window.attrUsedPage || 'prodOfferAcceptPage';
			/**
			 * 综合查询页面处理分支
			 * 
			 * @method
			 */
			var allInfoQueryPageDispatch = function() {
			};
			/**
			 * 二次业务处理分支
			 * 
			 * @method
			 */
			var secondBusinessPageDispatch = function() {};
			/**
			 * 批量页面处理分支
			 * 
			 * @method
			 */
			var batchPageDispatch = function() {
			};

			// 调用具体分支处理逻辑
			return eval(attrUsedPage + "Dispatch").apply(this, arguments);
		});
