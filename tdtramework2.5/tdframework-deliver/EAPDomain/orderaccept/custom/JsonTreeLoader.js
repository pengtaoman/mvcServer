defineModule("orderaccept.custom.JsonTreeLoader", ["unieap.tree.TreeLoader"], function(TreeLoader) {
	        
	        dojo.declare("orderaccept.custom.JsonTreeLoader", [TreeLoader], {
		                // 发送Ajax请求，得到懒加载树子节点的数据
		                load : function(item, callback) {
			                if (this.url || this.rpc) {
				                var flag = this.onBeforeLoad(item),
					                self = this;
				                if (flag == false) {
					                callback(null);
					                return;
				                }
				                var loadCB = function(dc) {
				                	//modified by yusong ,无论是什么数据类型,都走此以下逻辑
					                if (true || dc instanceof unieap.ds.DataCenter) {
						                self.onAfterLoad(dc, item);
						                callback(dc);
					                }
				                };
				                var errorCB = function() {
					                callback(null);
				                };
				                if (dojo.isFunction(this.rpc)) {
					                this.rpc(item, loadCB, errorCB);
				                } else {
					                unieap.Action.requestData({
						                        url : this.url,
						                        sync : this.sync,
						                        parameters : this.buliderParams(this.parameters, item),
						                        load : function(dc) {
							                        loadCB(dc);
						                        },
						                        error : function() {
							                        errorCB();
						                        }
					                        }, this.getPostData(item), false);
				                }
			                } else {
				                var result = this.getLocalData(item);
				                callback(result);
			                }
		                }
		                
		                
	                });
	        
        });