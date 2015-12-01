// for dojo 1.7
/*
 * this.dojoConfig = { packages : [{ name : 'orderaccept', location :
 * '../../orderaccept' }, { name : 'custmgr', location :
 * '../../custmgr' } ] };
 */

// for dojo version <1.7
(function() {
	var _globalObject = this;
	_globalObject.dojoConfig = {
		modulePaths : {
			orderaccept : '../../../orderaccept',
			custmgr : '../../../custmgr',
			unieap : '../unieap'
		},
		parseOnLoad : true
	};
	
	/**
	 * 支持模块相对路径计算
	 * 
	 * @function
	 */
	var computeRelatePath = function(absolutePath, relativePath) {
		var parts = absolutePath.split("."),
			relativeParts = relativePath.split("/"),
			_pathStack = [];
		if (relativeParts.length == 1 || !(relativeParts[0] == '.' || relativeParts[0] == '..')) { return relativePath; }
		parts.pop();
		Array.prototype.push.apply(_pathStack, parts);
		dojo.forEach(relativeParts, function(segment) {
			        if (segment == '.') {
				        return;
			        } else if (segment == "..") {
				        _pathStack.pop();
			        } else {
				        _pathStack.push(segment);
			        }
			        
		        });
		
		return _pathStack.join(".");
		
	};
	
	_globalObject.DependenceAnalyser = {
		deps : [],
		analyse : function() {
			// 第一遍,分析没有依赖其他模块的模块以及仅仅依赖unieap或者dojo的模块
			var firstList = dojo.filter(this.deps, function(depsObj) {
				        if (depsObj.deps.length == 0) {
					        return true;
				        } else {
					        var deps = depsObj.deps;
					        var allFlag = dojo.every(deps, function(moduleName) {
						                
						                return (/^unieap/i.test(moduleName
						                        || /^dijit/.test(moduleName)));
						                
					                });
					        return allFlag;
					        
				        }
				        
			        }),
				secondList = dojo.filter(this.deps, function(depsObj) {
					        return !dojo.some(firstList, function(obj) {
						                return obj === depsObj;
					                });
					        
				        });
			
			// 第二遍不完全排序
			var _loop_ = 0;
			dojo.forEach(secondList, function(depsObj) {
				        var deps = depsObj.deps;
				        var flag = dojo.every(deps, function(moduleName) {
					                if (/^unieap/i.test(moduleName || /^dijit/.test(moduleName))) {
						                return true;
					                } else {
						                
						                var flag = dojo.some(firstList, function(_obj) {
							                        
							                        return _obj.moduleName === moduleName;
							                        
						                        });
						                
						                return flag;
						                
					                }
					                
				                });
				        if (flag) {
					        var obj = secondList.splice(_loop_, 1);
					        secondList.unshift(obj[0]);
					        
				        }
				        _loop_++;
				        
			        });
			// 第三遍 交换依赖的位置,只有保证没有循环引用,依赖的顺序最终会达到平衡状态
			var depStack = dojo.map(secondList, function(value, index) {
				        return [value.moduleName];
			        }),
				hasSwap = false,
				assertNotCircleDep = function(depArr) {
					var len = depArr.length;
					dojo.forEach(depArr, function(value, index) {
						if (index != len - 1) {
							var lastArr = depArr.slice(index + 1);
							if (dojo.some(lastArr, function(item) {
								        return value == item
							        })) { throw new Error("exist circle deps:" + depArr.join("->"));

							}
						}
						
					})
					
				};
			
			do {
				hasSwap = false;
				dojo.forEach(secondList, function(depsObj, currentIndex) {
					        var deps = depsObj.deps;
					        var moduleName = depsObj.moduleName;
					        if (currentIndex > 0) {
						        var preList = secondList.slice(0, currentIndex);
						        var _swapIndex = -1;
						        BusCard.each(preList, function(index, preObj) {
							                var deps = preObj.deps;
							                var flag = dojo.some(deps, function(depModuleName) {
								                        return depModuleName == moduleName;
							                        });
							                if (flag) {
								                _swapIndex = index;
								                return false;
							                }
							                
						                }, true);
						        // swrap
						        if (_swapIndex != -1) {
							        hasSwap = true;
							        var temp = secondList[_swapIndex];
							        secondList[_swapIndex] = depsObj;
							        secondList[currentIndex] = temp;
							        // assert no circle deps /begin
							        var _len = depStack[_swapIndex].length;
							        if (depStack[_swapIndex][_len - 1] != depsObj.moduleName) {
								        depStack[_swapIndex].push(depsObj.moduleName);
								        assertNotCircleDep(depStack[_swapIndex]);
							        }
							        // assert no circle deps /end
							        
						        }
						        
					        }
					        
				        })
			} while (hasSwap);
			return firstList.concat(secondList);
			
		},
		addDepModules : function(targetModule, depModules) {
			var depObjList = dojo.filter(this.deps, function(obj) {
				        return obj.moduleName == targetModule;
			        });
			if (depObjList.length > 0 && depModules) {
				var depObj = depObjList[0],
					deps = depObj.deps;
				depObj.deps = BusCard.unique(deps, depModules);
			}
		}
		
	};
	
	_globalObject.defineModule = function() {
		var args = Array.prototype.slice.apply(arguments),
			noop = function() {},
			moduleName = dojo.isString(args[0]) ? args[0] : null,
			moduleFactory = dojo.isFunction(args[args.length - 1]) ? args[args.length - 1] : noop,
			deps = [],
			firstIndex = !!moduleName ? 1 : 0,
			lastIndex = moduleFactory === noop ? args.length - 1 : args.length - 2;
		if (lastIndex > 0 && firstIndex <= lastIndex) {
			for (var index = firstIndex; index <= lastIndex; index++) {
				if (dojo.isString(args[index])) {
					deps.push(args[index]);
				} else if (dojo.isArray(args[index])) {
					Array.prototype.push.apply(deps, args[index]);
				}
			}
			
		}
		if (moduleName) {
			if (dojo._hasResource[moduleName]) {
				return;
			} else {
				dojo.provide(moduleName);
				dojo._hasResource[moduleName] = true;
			}
		}
		var depsObj = {
			moduleName : moduleName,
			deps : []
		};
		var callbackArgs = dojo.map(deps, function(depModuleName) {
			        var finalDepModuleName = computeRelatePath(moduleName, depModuleName);
			        depsObj.deps.push(finalDepModuleName);
			        dojo.require(finalDepModuleName);
			        var returnValue = dojo._loadedModules[finalDepModuleName];
			        try {
				        returnValue = eval(finalDepModuleName);
			        }
			        catch (e) {}
			        return returnValue;
			        
		        });
		DependenceAnalyser.deps.push(depsObj);
		moduleFactory.apply(dojo._loadedModules[moduleName], callbackArgs);
		try {
			var realModule = dojo.eval(moduleName);
			if (dojo._loadedModules[moduleName] !== realModule)
			    dojo._loadedModules[moduleName] = realModule;
		}
		catch (e) {}
		
		return dojo._loadedModules[moduleName];
	};
	_globalObject.loadCssModule = function(module) {
		var path = dojo.moduleUrl(module, ".").toString().replace(/\/*$/, "") + ".css";
		var linkNodes  = document.getElementsByTagName("LINK");
		var targetNodeList = dojo.filter(dojo._toArray(linkNodes),function(node){
			return node.href.indexOf(module.replace(/\./g,"/"))>=0;
		});
		if(targetNodeList && targetNodeList.length>0){
			return ;
		}
		dojo.create("LINK", {
			        type : 'text/css',
			        rel : 'stylesheet',
			        href : path
		        }, dojo.query("head")[0], "last");
		
	};
	
})();
