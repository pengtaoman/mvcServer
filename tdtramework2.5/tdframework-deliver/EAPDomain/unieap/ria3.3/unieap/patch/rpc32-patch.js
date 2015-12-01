dojo.require("unieap.rpc");

dojo.mixin(unieap.Action,{
		//获取代码缓存地址
		CODELISTURL : "/ria_codelist.do?method=loadCodeList" ,
		//获取多个代码缓存地址
		MULTICODELISTURL : "/ria_codelist.do?method=loadCodeLists",
		//查询数据地址
		QUERYURL : "/ria_grid.do?method=query",
		//统计地址
		COUNTURL : "/ria_grid.do?method=loadStatistics",
		//更新数据地址
		UPDATEURL : "/ria_grid.do?method=save",
		//打印地址
		PRINTURL : "/ria_gridPrint.do?method=init",
		//导出地址
		EXPORTURL : "/GridExport.do?method=csvExport",
		//获取个性化信息地址
		GINDIVIDUALURL : "/ria_customComponent.do?method=getCustomInfo",
		//保存个性化信息地址
		SINDIVIDUALURL : "/ria_customComponent.do?method=saveCustomInfo",
		//获取缓存地址
		CACHEURL : "/ria_codelist.do?method=initCodeList",
		
		//获得单个代码表
		getCodeList : function(store){
		   if(!store){
		   		return;
		   }
		   //从缓存中获取数据
		   var ds = unieap.getDataStore(store,dataCenter,true);
		   if(ds){
		   		return ds;
		   }
	       unieap.Action.requestData({
	   			url:unieap.WEB_APP_NAME + this.CODELISTURL,
	   			sync : true,
				parameters:{
					category:store
				},
	   			load:function(dc){
					ds=dc.getSingleDataStore();
					if(ds){
						var name = ds.getName();
						var serverTimeStamps=dojo.fromJson(dc.getParameter('codelist_version'));
						var timeStamp = serverTimeStamps[name];
						unieap.setDataStore(ds,dataCenter,true,timeStamp);
					}
	   			}
	        });
	        return ds;
		},
		
		//获得多个代码表
		getMultiCodeList : function(inData,callback){
				if(!inData || unieap.isEmpty(inData=unieap.array_unique(inData))) {
					callback && callback();
				}
				else{
					var dc = new unieap.ds.DataCenter();
					var map={};
					for(var i=0;i<inData.length;i++){
						//首先从缓冲中查找数据
						var ds = unieap.getDataStore(inData[i],dataCenter,true);
						if(!ds){
							map[inData[i]]={};
						}else{
							dc.addDataStore(ds);
						}
					}
					if(unieap.isEmpty(map)){
						callback && callback(dc);
					}else{
						unieap.Action.requestData({
							url:unieap.WEB_APP_NAME + this.MULTICODELISTURL,
							parameters:{
								category:dojo.toJson(map)
							},
							load : function(dc){
								var stores = dc.getDataStores();
								var serverTimeStamps=dojo.fromJson(dc.getParameter('codelist_version'));
								for(var name in stores){
									var timeStamp= serverTimeStamps[name]
									unieap.setDataStore(dc.getDataStore(name),dataCenter,true,timeStamp);
								}
								callback && callback(dc);
							},
							error : function(){
								callback && callback();
							}
						},dc);
					}
				}			
		},
		
		//获取所有的代码表
		loadCacheData : function(mode){
			dojo.require("unieap.cache");
			var loading = document.createElement("div");
			loading.style.cssText = "position:absolute;bottom:0px;left:0px;overflow:hidden;height:20px;border:1px solid #eee;width:120px;background:#fff;font:12px;";
			loading.innerHTML = "正在装载缓存数据...";
			document.body.appendChild(loading);		
			//返回本地时间戳对象,格式为object['key']=>timestamp
			
			mode = !(mode!=true);
			var dc = new unieap.ds.DataCenter();
			var ds=new unieap.ds.DataStore("timestamp",[{}]);
			if(!mode){ //只获取修改过的
				var localTimeStamps=unieap.cache.getAllTimeStamps();
				ds=new unieap.ds.DataStore("timestamp",[localTimeStamps]);
			}
			dc.addDataStore(ds);
			unieap.Action.requestData({
				url:unieap.WEB_APP_NAME + this.CACHEURL,
				sync:false,
				parameters:{
					fetchAll:mode
				},	
				load:function(dc){
					var serverTimeStamps=dojo.fromJson(dc.getParameter('codelist_version'));
					var keys=[];
					var values=[];
					var stamps=[];
					for(var name in dc.dataStores){
						var ds = dc.dataStores[name];
						keys.push(name);
						values.push(ds.getRowSet().toBufJson("primary"));
						stamps.push(serverTimeStamps[name]);
					}
					unieap.cache.putMultiple(keys,values,stamps);
					loading.style.visibility = "hidden";
				},
				timeout:5000,
				error:function(text){
					loading.innerHTML="装载缓存数据失败。";
				}
			},dc,false);	
		},
			
	
		getIndividual:function(id){
			var obj = window["unieap.individual"];
			if(unieap.WEB_APP_NAME==null) return null;
			if(!obj){
				unieap.Action.requestData({
	            	url:unieap.WEB_APP_NAME+this.GINDIVIDUALURL,
	           		parameters:{path:unieap.cmpPath},
	           		sync:true,
	           		timeout:5000,
	            	load:function(dc){
	            		var msg = dc.getParameter("customJson");
	            		obj = window["unieap.individual"] = dojo.fromJson(msg);
						
	            	},
	            	error:function(err){
	            		obj = {};
	            		err.getDetail?alert(err.getDetail()):alert("获取信息失败");
	            	}            	
	            });
			}
			return dojo.fromJson(obj[id])||null;
		},
		
	
		setIndividual: function(inData){
			if (unieap.WEB_APP_NAME == null) {
				inData.callback && inData.callback();
				return;
			}
			var value = inData['data'];
			if (!inData || !(value instanceof Array)) {
				return;
			}
			
			var obj = window["unieap.individual"];
			if (obj && (dojo.toJson(obj[inData["id"]]) == dojo.toJson(value))) {
				return;
			}
			unieap.Action.requestData({
				url: unieap.WEB_APP_NAME + this.SINDIVIDUALURL,
				parameters: {
					cmp_id: inData["id"],
					path: unieap.cmpPath
				},
				preventCache: true,
				timeout: 5000,
				load: function(dc){
					obj && (obj[inData["id"]] = value); //更新本地的缓存个性化数据
					inData.callback && inData.callback(dc);
				},
				error: function(err){
				
					err.getDetail ? alert(err.getDetail()) : alert("保存信息失败");
				}
			}, dojo.toJson(value))
		},
			/**
	 * @summary：
	 * 		导出RowSet结果集
	 * @param:
	 * 		{object} inData 导出相关信息
	 * @example：
	 * |	var data={
	 * |		${1}store:store,
	 * |		${2}layout:
	 * |		[
	 * |			[
	 * |				[
	 * |					{name:"attr_empno",label:"员工编号",width:"80"}
	 * |				]
	 * |			],
	 * |			[
	 * |				[
	 * |					{name:"attr_ename",label:"姓名" , rowSpan:2,width:"150"},
	 * |					{label:"基本信息",colSpan:4,isMulTitle:true}
	 * |				],
	 * |				[
	 * |					{name:"attr_deptno",label:"部门", colSpan:1, width:"150",decoder:{"10":"财务部","20":"开发部"}}, 		
	 * | 					{name:"attr_hiredate",label:"入职日期" , width:"160", dataFormat:'yyyy-MM-dd'},
	 * | 					{name:"attr_job",label:"职位", width:"150"},
	 * |					{name:"attr_sal",label:"工资", width:"150",dataFormat:'#,###.00'}
	 * |				]
	 * |			]
	 * |		],
	 * |		${3}url:"/customRpc.do?method=print",
	 * |		${4}unitedCells:['detp','city'],
	 * |		${5}parameters:{username:"zhangsan",password:"***"},
	 * |		${6}lockedData：[{salary:"最大：20000"},{salary:"平均：4000"}],
	 * |		${7}footer："平均工资：4000  最大年限 1",
	 * |		${8}type:'server'
	 * |	}
	 * |	unieap.Action.doExport(data);
	 * ${1}要导出的DataStore对象
	 * ${2}列描述信息集合（包括名称、宽度、转义字典、格式化等信息）
	 * ${3}自定义提交url地址
	 * ${4}合并单元格信息
	 * ${5}传递其他额外信息
	 * ${6}锁定行数据，可以为空
	 * ${7}字符串类型，自定义信息，可以为空
	 * ${8}导出方式(server为服务器端导出，client为客户端导出)
	 */
		doExport: function(inData){
				var url = unieap.WEB_APP_NAME	+ (inData["url"] ? inData["url"]  : this.EXPORTURL );
				url = unieap.buildRequestPath(url,inData.parameters);
				if(!inData.layout){
		        	 alert("导出的布局信息为空！");
		        	 return;
		        }
				var dc=new unieap.ds.DataCenter();
				var ds = inData["store"];
				var printLayout = {};
				/* 兼容3.2的导出布局格式 */
				for(var a=0;a<inData["layout"].length;a++){
					for(var b=0;b<inData["layout"][a].length;b++){
						for(var c=0;c<inData["layout"][a][b].length;c++){
							var column = inData["layout"][a][b][c];
							var columnInfo = {};
							for(var key in column){
								if(key == "name"){
									continue;
								}
								if(key == "decoder"){
									for(var decoderInfo in column[key]){
										columnInfo[decoderInfo] = column[key][decoderInfo];
									}
									continue;
								}
								columnInfo[key] = column[key];
							}
							printLayout[column["name"]] = columnInfo;
						}
					}
				}
				//dc.setParameter("layout",inData["layout"]);
				dc.setParameter("printLayout",printLayout);
				inData["unitedCells"] && dc.setParameter("unitedCells",inData["unitedCells"]);
				dc.setParameter("type",inData["type"]);
				//dc.setParameter("dsName",ds.getName());
				dc.setParameter("custStoreName",ds.getName());
				for(var param in inData['parameters']||{}){
					dc.setParameter(param,inData['parameters'][param]);
				}
				inData["footer"] && dc.setParameter("foot",inData["footer"]);
				//inData["lockedData"]&&dc.addDataStore(new unieap.ds.DataStore("lockedStore",inData["lockedData"]));
				inData["lockedData"]&&dc.addDataStore(new unieap.ds.DataStore("lockedDataStore",inData["lockedData"]));
				
				if(inData["type"]=="server"){
					ds =ds.collect({policy:'none',metaData:true}); 
					ds.setPageSize(-1);
				}
				dc.addDataStore(ds);
				var form = dojo.byId("unieap_export_form"),iframe;
				 if(!form){
				 	if(dojo.isIE){
				 		iframe=dojo.create("<iframe name='exportIframe' style='border:0px' width=0 height=0></iframe>");
				 	}else{
				 		iframe=dojo.create('iframe',{name:'exportIframe',style:{border:'0px'}, width:0,height:0});
				 	}
					dojo.place(iframe,dojo.body())
					form = dojo.create("form",{
						id : "unieap_export_form",
						name : "unieap_export_form",
					    method : "post",
					    target:'exportIframe'
					});
					
					var input = dojo.create("input",{
						name : "data",
						type : "hidden"
					});
					
					dojo.place(input,form);
					dojo.place(form,document.body);
				 }
				 else{
				 	input = form.firstChild;
				 }		 

			
			    input.value =dc.toJson();
			    /*
				if(unieap.isEncrypt){
					dojo.require("unieap.util.encrypt");
					var digestInput = form.lastChild;
					if(digestInput.getAttribute("name")!="digest"){
						digestInput = dojo.create('input',{type:'hidden',name:'digest'});
						dojo.place(digestInput,form);
					}
					digestInput.value=  hex_sha1(escape(input.value).toLowerCase());
				}
				*/
			    form.action = url;
			    form.submit();	
			},
			doPrint : function(inData){
					var url = unieap.WEB_APP_NAME+(inData["url"]?inData["url"]: this.PRINTURL);
					url= unieap.buildRequestPath(url,inData.parameters);
					if(!inData.layout){
			        	 alert("导出的布局信息为空！");
			        	 return;
			        }
			        var dc=new unieap.ds.DataCenter();
			        var ds=inData["store"];
			        //如果rowSetName不存在,不执行打印操作
			        if(!ds.getRowSetName()){
			        	dojo.require("unieap.dialog.MessageBox");
			        	MessageBox.alert({
			        		type:'warn',
			        		yesStr:'确定',
			        		title:'提示信息',
			        		message:'由于数据资源文件配置出错,程序不执行打印操作。',
			        		motion:false
			        	})
			        	return;
			        };  
					ds =ds.collect({policy:'none',metaData:true}); //只收集metaData,不收集数据
					ds.setPageSize(-1);
					var printLayout = {};
					/* 兼容3.2的导出布局格式 */
					for(var a=0;a<inData["layout"].length;a++){
						for(var b=0;b<inData["layout"][a].length;b++){
							for(var c=0;c<inData["layout"][a][b].length;c++){
								var column = inData["layout"][a][b][c];
								var columnInfo = {};
								for(var key in column){
									if(key == "name"){
										continue;
									}
									if(key == "decoder"){
										for(var decoderInfo in column[key]){
											columnInfo[decoderInfo] = column[key][decoderInfo];
										}
										continue;
									}
									columnInfo[key] = column[key];
								}
								printLayout[column["name"]] = columnInfo;
							}
						}
					}
					//dc.setParameter("layout",inData["layout"]);
					dc.setParameter("printLayout",printLayout);
					
					inData["unitedCells"] && dc.setParameter("unitedCells",inData["unitedCells"]);
					dc.addDataStore(ds);
					
			
			    	unieap.Action.requestData({
			    		url:url,
			    		sync:true,
			    		load:function(dc){
			    			var form=dojo.byId('unieap-print-form'),iframe;
			    			if(!form){
							 	if(dojo.isIE){
							 		iframe=dojo.create("<iframe name='printIframe' style='border:0px;' width=0 height=0></iframe>");
							 	}else{
							 		iframe=dojo.create('iframe',{name:'printIframe',style:{border:'0px'},width:0,height:0});
							 	}
			    				dojo.place(iframe,dojo.body());
			    				form=dojo.create('form',{id:'unieap-print-form',method:'post',target:'printIframe'});
			    				dojo.place(form,dojo.body());
			    				var input=dojo.create('input',{type:'hidden',name:'myAction',value:'ria_gridPrint.do?method=print'})
			    				dojo.place(input,form);
			    				input=dojo.create('input',{type:'hidden',name:'uid',value:''});
			    				dojo.place(input,form);
			    				form.action=unieap.WEB_APP_NAME + "/unieap/pages/report/jsp/show/UniPrint.jsp";
								
			    			}
			    			form.submit();
			    		}
			    	},dc,false);
		}

});

 dojo.extend(unieap.ds.DataStore,{
 		toData: function() {
				var data = {} ;
				data["rowSet"] = this.rowSet.toData();
				data["name"] = this.name;
				data["pageNumber"] = this.pageNumber;
				data["pageSize"] = this.pageSize;	
				data["recordCount"] = this.recordCount;	
				this.rowSetName && (data["rowSetName"] = this.rowSetName);
				this.order && (data["order"] = this.order);
				this.conditionValues && (data["conditionValues"] = this.conditionValues);
				this.parameters && (data["parameters"] = this.parameters);		
				this.context && (data["context"] = this.context);		
				this.metaData &&  (data["metaData"] = this.metaData);				
				if(this.statementName&&this.statementName!=""){
					data["statementName"] = this.statementName;
					this.getAttributes() && (data["attributes"] = this.attributes);
				}else{			
					this.condition && (data["condition"] = this.condition);	
					this.group && (data["group"] = this.group);	
				}			
				this.pool && (data["pool"] = this.pool);
				this.statistics && (data["statistics"] = this.statistics);
				this.distinct && (data["distinct"]=true);
				return data;
		},
		toJson : function(){
				var result = [];
				result.push("rowSet:".concat(this.rowSet.toJson()));
				result.push("name:\"".concat(this.name).concat("\""));
				result.push("pageNumber:".concat(this.pageNumber));
				result.push("pageSize:".concat(this.pageSize));
				result.push("recordCount:".concat(this.recordCount));
				this.rowSetName && result.push("rowSetName:\"".concat(this.rowSetName).concat("\""));
				this.order && result.push("order:\"".concat(this.order).concat("\""));
				this.conditionValues && result.push("conditionValues:".concat(dojo.toJson(this.conditionValues)));
				this.parameters && result.push("parameters:".concat(dojo.toJson(this.parameters)));
				this.context && result.push("context:".concat(dojo.toJson(this.context))); 	
				this.metaData && result.push("metaData:".concat(dojo.toJson(this.metaData)));
				if(this.statementName&&this.statementName!=""){
					this.statementName && result.push("statementName:\"".concat(this.statementName).concat("\""));
					this.attributes && result.push("attributes:".concat(dojo.toJson(this.attributes)));
				}else{		
					this.condition && result.push("condition:\"".concat(this.condition).concat("\""));	
					this.group && result.push("group:\"".concat(this.group).concat("\""));	
				}		
				this.pool && result.push("pool:\"".concat(this.pool).concat("\""));		
				this.statistics && result.push("statistics:".concat(dojo.toJson(this.statistics)));
				this.distinct && result.push("pool:".concat(this.distinct));	
				return "{".concat(result.join(",").concat("}"));
		},
		insertConditionValue : function(value,dataType,index){
			this.conditionValues?this.conditionValues:(this.conditionValues = []);
			if(!index == undefined){
				this.conditionValues[index]=[value,dataType];	
			}else{
				this.conditionValues.push([value,dataType])
			}
			this.parameters = this.conditionValues
		},
		getConditionValues : function(){
			return this.parameters;
		},
		removeConditionValues : function(){
			this.parameters = this.conditionValues=null;
		},
			/**
		 * @summary：
		 * 		取得服务器端返回的某个参数值
		 * @param 
		 * 		{string} name 
		 * 		参数名称
		 * @return
		 * 		{boolean} 
		 * 		如果值为数组，则取数组的第一个值
		 */				
		getParameter: function(name) {	
			if(!this.context){this.context={}}
			var value = this.context[name];
			if (value != "undefined" ) {
				if (typeof value == "array" || value instanceof Array){
					return value[0];
				}
				return value;
			} 
		}, 
		
		

		/**
		 * @summary:
		 * 		向DataStore中添加自定义参数信息
		 * @description:
		 * 		当存在重复键时，其值为数组形式， 否则为单值，如 {roleId:[10,11], org:"neusoft"}
		 * @param 
		 * 		{string} name
		 * 		参数名称
		 * @param 
		 * 		{object} value
		 * 		参数值
		 */				
		addParameter:function(name, value) {	
			if(!this.context){this.context={}}
			if (typeof this.context[name] == "array" || this.context[name] instanceof Array) {
				this.context[name].push(value);
			}
			else{			
				this.context[name] = value;
			}
		},
		
		
		/**
		 * @summary；
		 * 		设置自定义参数信息，譬如查询条件的键值对
		 * @param 
		 * 		{string} name
		 *		 参数名称
		 * @param 
		 * 		{object} value
		 *		 参数值
		 */
		setParameter : function(name, value){	
			if(!this.context){this.context={}}
			this.context[name] = value;
		},
		
		
		/**
		 * @summary：
		 * 		删除变量
		 * @param：
		 * 		 {string} name 键值名称
		 */
		removeParameter: function(name){
			delete this.context[name];
		}
 });