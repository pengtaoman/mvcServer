defineModule("orderaccept.tester.aop", ["../prodofferaccept/util", "../prodofferaccept/loader/ProdOfferNewLoader",
                "../prodofferaccept/behavior/ProdOfferNewBehavior",
                "../prodofferaccept/widget/payrelation/PayRelationWidget"], function() {
	        
	        BusCard.Aop.weave("orderaccept", function(pointcutContext) {
		                var methodName = pointcutContext.methodName;
		                var className = pointcutContext.className;
		                return true;
		                // �������ͷ����������Ҫweave����ķ���
		                if (/renderMainProdOfferTree/.test(pointcutContext.methodName))
		                    return true;
		                
	                }, function(pointcutContext) {
		                var args = Array.prototype.slice.apply(arguments);
		                args.shift();
		                var preTime = new Date().getTime();
		                // ����superMethodִ��ԭ�з�������
		                var result = pointcutContext.superMethod.apply(this, args);
		                var lastTime = new Date().getTime();
		                if (lastTime - preTime > 100) {
			                var message = pointcutContext.className + "."
			                        + pointcutContext.methodName + " cost time:"
			                        + (lastTime - preTime);
			                if (console.log) {
				                console.log(/(\d+\:\d+\:\d+)/.exec(new Date().toString())[1]+">>"+message);
			                }
			                if (!dojo.global.messagePool) {
				                
				                dojo.global.messagePool = [];
			                }
			                dojo.global.messagePool.push(message);
		                }
		                
		                return result;
		                
	                });
	        
        });