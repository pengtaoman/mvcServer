/* /unieap/ria3.3/unieap/util/util.js */
if (!dojo._hasResource["unieap.util.util"]) {
	dojo._hasResource["unieap.util.util"] = true;
	dojo.require("unieap.global");
	dojo.provide("unieap.util.util");
	(function() {
		String.prototype.startWith = function(string) {
			return this.indexOf(string) == 0;
		};
		String.prototype.endWith = function(string) {
			return this.lastIndexOf(string) == this.length - string.length;
		};
		String.prototype.getName = function() {
			return this;
		};
		String.prototype.padLeft = function(nSize, ch) {
			var len = 0;
			var s = this ? this : "";
			ch = ch ? ch : "0";
			len = s.length;
			while (len < nSize) {
				s = ch + s;
				len++;
			}
			return s;
		};
		String.prototype.padRight = function(nSize, ch) {
			var len = 0;
			var s = this ? this : "";
			ch = ch ? ch : "0";
			len = s.length;
			while (len < nSize) {
				s = s + ch;
				len++;
			}
			return s;
		};
		String.prototype.movePointLeft = function(scale) {
			var s, s1, s2, ch, ps, sign;
			ch = ".";
			sign = "";
			s = this ? this : "";
			if (scale <= 0) { return s; }
			ps = s.split(".");
			s1 = ps[0] ? ps[0] : "";
			s2 = ps[1] ? ps[1] : "";
			if (s1.slice(0, 1) == "-") {
				s1 = s1.slice(1);
				sign = "-";
			}
			if (s1.length <= scale) {
				ch = "0.";
				s1 = s1.padLeft(scale);
			}
			return sign + s1.slice(0, -scale) + ch + s1.slice(-scale) + s2;
		};
		String.prototype.movePointRight = function(scale) {
			var s, s1, s2, ch, ps;
			ch = ".";
			s = this ? this : "";
			if (scale <= 0) { return s; }
			ps = s.split(".");
			s1 = ps[0] ? ps[0] : "";
			s2 = ps[1] ? ps[1] : "";
			if (s2.length <= scale) {
				ch = "";
				s2 = s2.padRight(scale);
			}
			return s1 + s2.slice(0, scale) + ch + s2.slice(scale, s2.length);
		};
		String.prototype.movePoint = function(scale) {
			if (scale >= 0) {
				return this.movePointRight(scale);
			} else {
				return this.movePointLeft(-scale);
			}
		};
		Number.prototype.toFixed = function(scale) {
			var s, s1, s2, start;
			s1 = this + "";
			start = s1.indexOf(".");
			s = s1.movePoint(scale);
			if (start >= 0) {
				s2 = Number(s1.substr(start + scale + 1, 1));
				if (s2 >= 5 && this >= 0 || s2 < 5 && this < 0) {
					s = Math.ceil(s);
				} else {
					s = Math.floor(s);
				}
			}
			return s.toString().movePoint(-scale);
		};
		unieap.version = (function() {
			var v = {
				major : 3,
				minor : 4,
				patch : 1,
				flag : "M20111008",
				toString : function() {
					return this.major + "." + this.minor + "." + this.patch + this.flag;
				}
			};
			return v;
		})();
		unieap.array_unique = function(inArray) {
			if (!dojo.isArray(inArray)) { return; }
			var obj = {};
			var res = [];
			for (var i = 0, l = inArray.length; i < l; i++) {
				obj[inArray[i]] = 1;
			}
			for (var value in obj) {
				res.push(value);
			}
			return res;
		};
		unieap.translate = function(key) {
			return {
				max : RIA_I18N.util.util.max,
				min : RIA_I18N.util.util.min,
				avg : RIA_I18N.util.util.avg,
				sum : RIA_I18N.util.util.sum
			}[key];
		};
		function addtranscode(data) {
			var topWin = unieap.getTopWin(),
				transcodeBase = topWin.transcodeBase || (topWin.transcodeBase = {}),
				key = [data.store.getName(), data.valueAttr, data.displayAttr].join("_"),
				store = unieap.getDataStore(data.store, null, true);
			if (store) {
				var _map = transcodeBase[key] || (transcodeBase[key] = {});
				store.getRowSet().forEach(function(row) {
					        _map[row.getItemValue(data.valueAttr)] = row
					                .getItemValue(data.displayAttr);
				        });
				return _map;
			}
			return null;
		}
		unieap.transcode = function(inValue, data) {
			var topWin = unieap.getTopWin(),
				transcodeBase = topWin.transcodeBase || (topWin.transcodeBase = {});
			data = dojo.isString(data) && {
				store : data
			} || data;
			data = dojo.mixin({
				        valueAttr : "CODEVALUE",
				        displayAttr : "CODENAME"
			        }, data);
			var key = [data.store.getName(), data.valueAttr, data.displayAttr].join("_"),
				base = transcodeBase[key];
			if (null == base) {
				addtranscode(data);
			}
			if (null == (base = transcodeBase[key])) {
				return inValue;
			} else {
				var values = String(inValue).split(",");
				for (var i = 0; i < values.length; i++) {
					values[i] = base[values[i]];
				}
				return values.join(",");
			}
		};
		unieap.transcode.clear = function(name) {
			var topWin = unieap.getTopWin(),
				transcodeBase = topWin.transcodeBase || (topWin.transcodeBase = {});
			if (name == null) {
				topWin.transcodeBase = {};
				return;
			}
			for (var key in transcodeBase) {
				if (key.indexOf(name + "_") >= 0) {
					delete transcodeBase[key];
				}
			}
		};
		unieap.transcode.get = function(data) {
			var topWin = unieap.getTopWin(),
				transcodeBase = topWin.transcodeBase || (topWin.transcodeBase = {});
			data = dojo.isString(data) && {
				store : data
			} || data;
			data = dojo.mixin({
				        valueAttr : "CODEVALUE",
				        displayAttr : "CODENAME"
			        }, data);
			var key = [data.store.getName(), data.valueAttr, data.displayAttr].join("_");
			return transcodeBase[key] || (function() {
				return addtranscode(data);
			})();
		};
		unieap.getDataStore = function(store, dc, isUseCache) {
			if (store && dojo.isObject(store)) { return store; }
			var ds;
			(!dc || !dojo.isObject(dc) && !(dc = dojo.getObject(dc)));
			if (dc) {
				ds = dc.getDataStore(store);
			} else {
				dc = dataCenter;
			}
			if (!ds && currentDataCenter) {
				ds = currentDataCenter.getDataStore(store);
			}
			if (!ds) {
				ds = dataCenter.getDataStore(store);
			}
			if (!ds) {
				if (isUseCache) {
					dojo.require("unieap.cache");
					var cachedData = unieap.cache.get(store);
					if (cachedData) {
						ds = new unieap.ds.DataStore(store, cachedData);
						ds.setType("static");
						dc.addDataStore(ds);
					}
				} else {
					var topWin = unieap.getTopWin(),
						database = topWin.database || (topWin.database = {});
					if (database[store]) {
						ds = new unieap.ds.DataStore(store, dojo.fromJson(database[store]));
						ds.setType("static");
						dc.addDataStore(ds);
					}
				}
			}
			return ds;
		};
		unieap.setDataStore = function(store, dc, isUseCache, timeStamp) {
			if (!store) { return; }
			(!dc || !dojo.isObject(dc) && !(dc = dojo.getObject(dc))) && (dc = dataCenter);
			dc.addDataStore(store, "static");
			if (isUseCache) {
				dojo.require("unieap.cache");
				unieap.cache
				        .put(store.getName(), store.getRowSet().toBufJson("primary"), timeStamp);
			} else {
				var topWin = unieap.getTopWin(),
					database = topWin.database || (topWin.database = {}),
					dsName = store.getName();
				if (!database[dsName]) {
					database[dsName] = dojo.toJson(store.getRowSet().getData());
				}
			}
		};
		var _dataTypeMap = {
			"0" : "null",
			"1" : "string",
			"2" : "number",
			"3" : "number",
			"4" : "number",
			"6" : "number",
			"8" : "number",
			"12" : "string",
			"16" : "boolean",
			"91" : "date",
			"93" : "date",
			"-5" : "number"
		};
		unieap.getDataType = function(dataType) {
			return _dataTypeMap[dataType] || dataType;
		};
		unieap.getCompare = function(dataType, relation) {
			var _compare = {
				string : {
					"=" : {
						compare : function(columnValue, value, ignoreCase) {
							if (ignoreCase && columnValue && value) { return columnValue
							        .toUpperCase() == value.toUpperCase(); }
							return columnValue == value;
						}
					},
					"!=" : {
						compare : function(columnValue, value) {
							return columnValue != value;
						}
					},
					like : {
						compare : function(columnValue, value) {
							if (value != null) { return columnValue
							        && columnValue.match(value) != null; }
							return columnValue == null || columnValue == "";
						}
					},
					"not like" : {
						compare : function(columnValue, value) {
							if (value != null) { return columnValue == null
							        || columnValue.match(value) == null; }
							return columnValue != null && columnValue != "";
						}
					}
				},
				number : {
					"=" : {
						compare : function(columnValue, value) {
							return columnValue == value;
						}
					},
					"!=" : {
						compare : function(columnValue, value) {
							return columnValue != value;
						}
					},
					">" : {
						compare : function(columnValue, value) {
							return columnValue > value;
						}
					},
					">=" : {
						compare : function(columnValue, value) {
							return columnValue >= value;
						}
					},
					"<" : {
						compare : function(columnValue, value) {
							return columnValue < value;
						}
					},
					"<=" : {
						compare : function(columnValue, value) {
							return columnValue <= value;
						}
					}
				},
				date : {
					"=" : {
						compare : function(columnValue, value, pattern) {
							columnValue = unieap.getRelativeTime(columnValue, pattern);
							return columnValue == value;
						}
					},
					"!=" : {
						compare : function(columnValue, value, pattern) {
							columnValue = unieap.getRelativeTime(columnValue, pattern);
							return columnValue != value;
						}
					},
					">" : {
						compare : function(columnValue, value, pattern) {
							columnValue = unieap.getRelativeTime(columnValue, pattern);
							return columnValue > value;
						}
					},
					">=" : {
						compare : function(columnValue, value, pattern) {
							columnValue = unieap.getRelativeTime(columnValue, pattern);
							return columnValue >= value;
						}
					},
					"<" : {
						compare : function(columnValue, value, pattern) {
							columnValue = unieap.getRelativeTime(columnValue, pattern);
							return columnValue < value;
						}
					},
					"<=" : {
						compare : function(columnValue, value, pattern) {
							columnValue = unieap.getRelativeTime(columnValue, pattern);
							return columnValue <= value;
						}
					}
				},
				"boolean" : {
					"=" : {
						compare : function(columnValue, value) {
							return columnValue == value;
						}
					},
					"!=" : {
						compare : function(columnValue, value) {
							return columnValue != value;
						}
					}
				},
				"null" : {
					"is null" : {
						compare : function(columnValue) {
							return columnValue == null;
						}
					},
					"is not null" : {
						compare : function(columnValue) {
							return columnValue != null;
						}
					}
				}
			};
			return (unieap.getCompare = function(dataType, relation) {
				if (relation == "is null" || relation == "is not null") { return _compare["null"][relation]; }
				var type = unieap.getDataType(dataType);
				var type = _compare[type];
				return type && type[relation] ? type[relation] : {
					compare : function(columnValue, value) {
						return eval("(" + columnValue + relation + value + ")");
					}
				};
			})(dataType, relation);
		};
		unieap.getRelativeTimePlace = function(dataFormat) {
			dataFormat = dataFormat || RIA_I18N.util.util.defaultDateFormat;
			var place = [];
			dataFormat.indexOf("yyyy") != -1 && place.push(0);
			dataFormat.indexOf("MM") != -1 && place.push(1);
			dataFormat.indexOf("dd") != -1 && place.push(2);
			(dataFormat.indexOf("HH") != -1 || dataFormat.indexOf("hh") != -1) && place.push(3);
			dataFormat.indexOf("mm") != -1 && place.push(4);
			dataFormat.indexOf("ss") != -1 && place.push(5);
			return place;
		};
		unieap.getRelativeTime = function(value, place) {
			if (value == null) { return null; }
			var time = new Date(Number(value));
			var relativeDate = new Date(2000, 0, 1, 0, 0, 0);
			var opers = ["Year", "Month", "Date", "Hours", "Minutes", "Seconds"];
			for (var i = 0, l = place.length; i < l; i++) {
				var sMethod = "set".concat(opers[place[i]]),
					gMethod = "get".concat(opers[place[i]]);
				relativeDate[sMethod](time[gMethod]());
			}
			return relativeDate.getTime();
		};
		unieap.convertArrayToMap = function(value, mapvalue) {
			var _map = {};
			if (!(value instanceof Array)) {
				value = [value];
			}
			for (var i = 0; i < value.length; i++) {
				_map[value[i]] = mapvalue || 1;
			}
			return _map;
		};
		unieap.isEmpty = function(data) {
			if (!data) { return true; }
			if (data instanceof Array) { return data.length == 0; }
			if (typeof(data) == "object") {
				for (var _t in data) {
					return false;
				}
				return true;
			}
			return false;
		};
		unieap.getLength = function(data) {
			if (data instanceof Array) { return data.length; }
			if (typeof(data) == "object") {
				var len = 0;
				for (var _t in data) {
					len++;
				}
				return len;
			}
			return 0;
		};
		unieap.debug = function(json) {
			json = dojo.isString(json) && dojo.fromJson(json) || json;
			window.unieapDebugArguments = json;
			var url = dojo.moduleUrl("") + "unieap/util/debug.html";
			var feature = "dialogHeight=500px;dialogWidth=500px;resizable=yes;status=yes;titlebar=yes";
			if (dojo.isIE) {
				window.showModalDialog(url, window, feature);
			} else {
				feature = "height=500,width=500,resizable=yes,status=yes,titlebar=yes";
				unieap.debug.opener = open(url, "debug", feature);
				if (!unieap.debug.unload) {
					dojo.addOnUnload(function() {
						        unieap.debug.opener.close();
					        });
					unieap.debug.unload = 1;
				}
			}
		};
		dojo.connect(document, "onkeydown", function(evt) {
			        if (unieap.isDebug && evt.altKey && evt.keyCode == 88) {
				        unieap.debug(dataCenter);
			        }
		        });
		unieap.stopEvent = function() {
			throw new Error(RIA_I18N.util.util.stopEvent);
		};
		var loadingMask = null;
		unieap.showLoading = function(isShow) {
			if (null == loadingMask) {
				var html = ["<div class='loading-alpha'></div>"];
				html.push("<div class='loading-p'>");
				html.push("<div class='loading-content'>");
				html.push("<div class='loading-text'>");
				html.push(RIA_I18N.util.util.loading);
				html.push("</div>");
				html.push("<div class='loading-img'></div>");
				html.push("<div class='loading-cancel'></div>");
				html.push("</div>");
				html.push("</div>");
				loadingMask = dojo.create("div");
				loadingMask.className = "loading";
				loadingMask.innerHTML = html.join("");
				var cancel = dojo.query(".loading-cancel", loadingMask)[0];
				dojo.connect(cancel, "onclick", function() {
					        dojo.style(loadingMask, "display", "none");
				        });
				document.body && document.body.appendChild(loadingMask);
			}
			dojo.style(loadingMask, "display", isShow == false ? "none" : "block");
		};
		unieap.dateFormatToString = function(date, retV) {
			retV = retV.replace(/ am/g, "");
			if (retV.indexOf("yyyy") != -1) {
				retV = retV.replace(/yyyy/gi, date.getFullYear());
			}
			if (retV.indexOf("MM") != -1) {
				var m = date.getMonth() + 1;
				m = m < 10 ? "0" + m : m;
				retV = retV.replace(/MM/g, m);
			}
			if (retV.indexOf("dd") != -1) {
				var d = date.getDate();
				d = d < 10 ? "0" + d : d;
				retV = retV.replace(/dd/g, d);
			}
			if (retV.indexOf("hh") != -1) {
				var h = date.getHours();
				if (h >= 12) {
					retV = retV + " pm";
					h = (h == 12) ? 12 : h - 12;
				} else {
					retV = retV + " am";
					h = (h == 0) ? 12 : h;
				}
				h = h < 10 ? "0" + h : h;
				retV = retV.replace(/hh/g, h);
			} else {
				if (retV.indexOf("HH") != -1) {
					var h = date.getHours();
					h = h < 10 ? "0" + h : h;
					retV = retV.replace(/HH/g, h);
				}
			}
			if (retV.indexOf("mm") != -1) {
				var mm = date.getMinutes();
				mm = mm < 10 ? "0" + mm : mm;
				retV = retV.replace(/mm/g, mm);
			}
			if (retV.indexOf("ss") != -1) {
				var s = date.getSeconds();
				s = s < 10 ? "0" + s : s;
				retV = retV.replace(/ss/g, s);
			}
			if (retV.indexOf("w") != -1) {
				retV = retV.replace(/w/g, "0");
			}
			return retV;
		};
		unieap.dateFormat = function(inValue, datePattern, data) {
			if (!inValue || inValue == "") { return ""; }
			var date,
				retV = datePattern || RIA_I18N.util.util.defaultDateFormat;
			!data && (data = {
				dataType : "date"
			});
			if (data.dataType == "string" || data.dataType == "text") {
				var valueFormat = data.valueFormat || retV;
				var date = unieap.dateParser(inValue, valueFormat);
			} else {
				var date = new Date(Number(inValue));
			}
			return unieap.dateFormatToString(date, retV);
		};
		unieap.dateParser = function(str, format) {
			str = str + "";
			var now = new Date();
			if (str.lastIndexOf("am") > -1) {
				format = format + " am";
			}
			if (str.lastIndexOf("pm") > -1) {
				format = format + " pm";
			}
			if (str.length !== format.length) { return now; }
			var sub = function(s, f1) {
				var rtv = -1;
				var index = format.indexOf(f1);
				if (index != -1) {
					rtv = parseInt(s.substr(index, f1.length), 10);
				}
				return rtv;
			};
			var year = sub(str, "yyyy");
			(year == -1) && (year = now.getFullYear());
			var month = sub(str, "MM");
			(month == -1) && (month = now.getMonth() + 1);
			var date = sub(str, "dd");
			(date == -1) && (date = 1);
			var hour = -1;
			if (sub(str, "hh") != -1) {
				hour = sub(str, "hh");
				if (str.indexOf("pm") != -1) {
					hour = (hour == 12) ? 12 : hour + 12;
				} else {
					if (str.indexOf("am")) {
						hour = (hour == 12) ? 0 : hour;
					}
				}
			} else {
				if (sub(str, "HH") != -1) {
					hour = sub(str, "HH");
				}
			}
			(hour == -1) && (hour = 0);
			var minute = sub(str, "mm");
			(minute == -1) && (minute = 0);
			var second = sub(str, "ss");
			(second == -1) && (second = 0);
			var d = new Date(year, month - 1, date, hour, minute, second);
			if (d == "NaN") { return now; }
			return d;
		};
		unieap.bitLength = function(inValue) {
			if (inValue == null || inValue == "") { return 0; }
			inValue = inValue.toString();
			var len = 0;
			for (var i = 0, l = inValue.length; i < l; i++) {
				if (inValue.charCodeAt(i) < 128) {
					len++;
					continue;
				}
				len += unieap.global.bitsOfOneChinese;
			}
			return len;
		};
		unieap.revDS = function(store) {
			var data = store.toData(),
				fn = function(obj, name) {
					obj[name] && (obj[name] = Array.apply(Array, obj[name]));
				};
			fn(data, "parameters");
			fn(data, "attributes");
			fn(data.rowSet, "primary");
			fn(data.rowSet, "filter");
			fn(data.rowSet, "delete");
			return new unieap.ds.DataStore(data);
		};
		unieap.getDialog = function(hnd) {
			var dialog = null;
			if (window.DialogUtil && DialogUtil.getDialog
			        && (dialog = DialogUtil.getDialog(hnd)) != null) { return dialog; }
			try {
				var pWin = window;
				while (pWin != pWin.parent) {
					pWin = pWin.parent;
					if (pWin.DialogUtil && pWin.DialogUtil.getDialog
					        && (dialog = pWin.DialogUtil.getDialog(hnd))) { return dialog; }
				}
			}
			catch (e) {
				var topWin = unieap.getTopWin();
				topWin.DialogUtil && (dialog = topWin.DialogUtil.getDialog(hnd));
			}
			return dialog;
		};
		unieap.setPageAuthority = function(scene) {
			var authList = "unieap.pageAuthList",
				setting = "unieap.pageAuth.defaultSetting",
				pageAuthList = window[authList],
				permission = scene && (pageAuthList || 0)[scene] || pageAuthList;
			if (!permission) { return; }
			var cache = function(widget, type) {
				var data = window[setting];
				if (widget.declaredClass == "unieap.grid.Grid") {
					var d = {}, id, cells, layoutManager;
					layoutManager = widget.getManager("LayoutManager");
					cells = layoutManager.getOriginCells();
					for (var i = 0, cell, l = cells.length; i < l; i++) {
						cell = cells[i];
						if (id = cell.securityId) {
							switch (permission[id]) {
								case "hidden" :
									if (!layoutManager.isHidden(cell.name)) {
										d[id] = "visible";
									}
									layoutManager.hideCell([id]);
									break;
								case "writely" :
									cell = layoutManager.getCell(cell.name);
									if (!cell.enable) {
										d[id] = "disabled";
									}
									cell.enable = true;
									break;
								case "disabled" :
									cell = layoutManager.getCell(cell.name);
									if (cell.enable) {
										d[id] = "writely";
									}
									cell.enable = false;
									break;
							}
						}
					}
					data[widget.id] = d;
				} else {
					switch (type) {
						case "hidden" :
							if (dojo.style(widget.domNode, "display") != "none") {
								data[widget.id] = "visible";
							}
							dojo.style(widget.domNode, "display", "none");
							break;
						case "writely" :
							if (widget.disabled === true) {
								data[widget.id] = "disabled";
							}
							(widget.setDisabled || Boolean).call(widget, false);
							break;
						case "disabled" :
							if (widget.disabled === false) {
								data[widget.id] = "writely";
							}
							(widget.setDisabled || Boolean).call(widget, true);
							break;
					}
				}
			},
				resume = function(id) {
					var widget = dijit.byId(id);
					if (widget.declaredClass == "unieap.grid.Grid") {
						var d = window[setting][id], cells, cell, data;
						var layoutManager = widget.getManager("LayoutManager");
						cells = layoutManager.getOriginCells();
						for (var i = 0, l = cells.length; i < l; i++) {
							cell = cells[i];
							data = cell.securityId && d[cell.securityId];
							switch (data) {
								case "visible" :
									layoutManager.showCell([cell.securityId]);
									break;
								case "writely" :
									cell = layoutManager.getCell(cell.name);
									cell.enable = true;
									break;
								case "disabled" :
									cell = layoutManager.getCell(cell.name);
									cell.enable = false;
									break;
							}
						}
					} else {
						switch (window[setting][id]) {
							case "visible" :
								dojo.style(widget.domNode, "display", "block");
								break;
							case "writely" :
								(widget.setDisabled || Boolean).call(widget, false);
								break;
							case "disabled" :
								(widget.setDisabled || Boolean).call(widget, true);
								break;
						}
					}
				};
			for (var name in window[setting]) {
				resume(name);
			}
			window[setting] = {};
			dijit.registry.forEach(function(widget) {
				        var securityId;
				        if (widget.declaredClass == "unieap.grid.Grid") {
					        cache(widget, null);
				        } else {
					        securityId = widget.securityId;
					        securityId && permission[securityId]
					                && cache(widget, permission[securityId]);
				        }
			        });
		};
		unieap.isClassEntity = function(inData) {
			if (inData && inData.declaredClass) {
				var clazz = dojo.getObject(inData.declaredClass);
				return clazz && clazz.prototype.constructor == inData.constructor;
			}
			return false;
		};
		unieap.getModuleInstance = function(context, moduleName, declaredClass) {
			var module = context[moduleName];
			if (!unieap.isClassEntity(module)) {
				module = dojo.mixin({
					        widget : context
				        }, module);
				declaredClass = module.declaredClass || module.cls || declaredClass;
				dojo.require(declaredClass);
				var clazz = dojo.getObject(declaredClass);
				module = new clazz(module);
				var getter = "get" + moduleName.replace(/(.)/, function(s) {
					        return s.toUpperCase();
				        });
				if (!(getter in context)) {
					getter = (function(func) {
						for (var name in context) {
							if (this[name] == func) { return name; }
						}
						return null;
					}).call(context, arguments.callee.caller);
				}
				if (getter == null) { return module; }
				context[getter] = function() {
					return module;
				};
				context[moduleName] = module;
			}
			return module;
		};
		unieap.getUnique = function() {
			window.unieap_unique = window.unieap_unique || 1;
			return "unieap_unique" + (window.unieap_unique++);
		};
		unieap.setLabelFormatProps = function(widget) {
			if (!widget.editor) { return; }
			var editorClass = widget.editor.editorClass;
			var editorProps = widget.editor.editorProps || (widget.editor.editorProps = {});
			switch (editorClass) {
				case "unieap.form.ComboBox" :
				case "unieap.form.CheckBoxGroup" :
				case "unieap.form.RadioButtonGroup" :
					if (!widget.decoder && editorProps.dataProvider
					        && editorProps.dataProvider.store) {
						var store = editorProps.dataProvider.store;
						widget.decoder = dojo.mixin({
							        store : store
						        }, {
							        displayAttr : "CODENAME",
							        valueAttr : "CODEVALUE"
						        }, editorProps.decoder);
					}
					break;
				case "unieap.form.ComboBoxTree" :
					if (!widget.decoder) {
						var store = editorProps.treeJson.binding.store;
						widget.decoder = dojo.mixin({
							        store : store
						        }, {
							        displayAttr : "CODENAME",
							        valueAttr : "CODEVALUE"
						        }, editorProps.decoder);
					}
					break;
				case "unieap.form.CheckBox" :
					if (widget.declaredClass == "unieap.grid.Cell") {
						var checkProps = {
							checkedValue : "1",
							uncheckedValue : "0"
						};
						widget.checkProps = dojo.mixin(checkProps, editorProps);
						editorProps.disabled = true;
						widget.serial = "cell_" + unieap.getUnique();
						window[widget.serial] = widget;
						if (!widget.checkLogic) {
							widget.checkLogic = function(evt, inRowIndex) {
								evt = dojo.fixEvent(evt);
								var checkValue = this["checkProps"]["checkedValue"],
									uncheckedValue = this["checkProps"]["uncheckedValue"],
									value = evt.target.checked ? checkValue : uncheckedValue;
								var rs = this.grid.getBinding().getRowSet();
								widget.name && rs.setItemValue(inRowIndex, this.name, value);
								this["checkProps"]["onClick"]
								        && this["checkProps"]["onClick"](inRowIndex, value);
								this["checkProps"]["onChange"]
								        && this["checkProps"]["onChange"](inRowIndex, value);
							};
						}
						if (!widget.formatter) {
							widget.formatter = function(value, inRowIndex) {
								if (this.enable == false) { return value; }
								var checked = (String(value) == String(widget.checkProps["checkedValue"]))
								        ? " checked "
								        : " ";
								var result = ['<input tabindex="-1" type="checkbox" '],
									marginTop = Math
									        .floor((widget.grid.managers.get("RowManager").defaultRowHeight - 13)
									                / 2)
									        + "px";
								result.push('name="checkbox_');
								result.push(widget.serial);
								result.push('"');
								if (dojo.isIE > 7 || dojo.isFF) {
									result.push(' style="margin-top:');
									result.push(marginTop + '"');
								}
								result.push(checked);
								result.push('onclick="');
								result.push("window['");
								result.push(widget.serial);
								result.push("'].checkLogic(event,");
								result.push(inRowIndex);
								result.push(')"');
								result.push(">");
								return result.join("");
							};
						}
					}
					break;
				case "unieap.form.RadioButton" :
					if (widget.declaredClass == "unieap.grid.Cell" && !widget.formatter) {
						var radioProps = {
							checkedValue : "1",
							uncheckedValue : "0"
						};
						widget.radioProps = dojo.mixin(radioProps, editorProps);
						editorProps.disabled = true;
						widget.serial = "cell_" + unieap.getUnique();
						window[widget.serial] = widget;
						widget.checkLogic = function(evt, inRowIndex) {
							if (widget.name && this.checkedRowIndex != inRowIndex) {
								evt = dojo.fixEvent(evt);
								var checkValue = this["radioProps"]["checkedValue"],
									uncheckedValue = this["radioProps"]["uncheckedValue"];
								var rs = this.grid.getBinding().getRowSet();
								if (this.checkedRowIndex != null) {
									rs
									        .setItemValue(this.checkedRowIndex, this.name,
									                uncheckedValue);
								}
								rs.setItemValue(inRowIndex, this.name, checkValue);
								this.checkedRowIndex = inRowIndex;
								this["radioProps"]["onClick"]
								        && this["radioProps"]["onClick"](inRowIndex, checkValue);
								this["radioProps"]["onChange"]
								        && this["radioProps"]["onChange"](inRowIndex, checkValue);
							}
						};
						widget.formatter = function(value, inRowIndex) {
							if (this.enable == false) { return value; }
							var checked = " ";
							if (String(value) == String(this["radioProps"]["checkedValue"])) {
								checked = " checked ";
								this.checkedRowIndex = inRowIndex;
							}
							var result = ['<input tabindex="-1" type="radio" '],
								marginTop = Math
								        .floor((this.grid.managers.get("RowManager").defaultRowHeight - 14)
								                / 2)
								        + "px";
							result.push('name="radio_');
							result.push(this.serial);
							result.push('"');
							if (dojo.isIE > 7 || dojo.isFF) {
								result.push(' style="margin-top:');
								result.push(marginTop + '"');
							}
							result.push(checked);
							result.push('onclick="');
							result.push("window['");
							result.push(this.serial);
							result.push("'].checkLogic(event,");
							result.push(inRowIndex);
							result.push(')"');
							result.push(">");
							return result.join("");
						};
					}
					break;
				default :
					if ("unieap.form.DateTextBox" == editorClass) {
						var vft = {
							declaredClass : "unieap.form.DateValueFormatter",
							dataFormat : ""
						};
						editorProps.valueFormatter = dojo.mixin(vft, editorProps.valueFormatter);
						var dft = {
							declaredClass : "unieap.form.DateDisplayFormatter",
							dataFormat : RIA_I18N.util.util.defaultDateFormat
						};
						editorProps.displayFormatter = dojo
						        .mixin(dft, editorProps.displayFormatter);
					} else {
						if ("unieap.form.NumberTextBox" == editorClass) {
							var dft = {
								declaredClass : "unieap.form.NumberDisplayFormatter"
							};
							editorProps.displayFormatter = dojo.mixin(dft,
							        editorProps.displayFormatter);
						}
					}
					if (!widget.valueFormatter && editorProps.valueFormatter) {
						widget.valueFormatter = dojo.clone(editorProps.valueFormatter);
					}
					if (!widget.displayFormatter && editorProps.displayFormatter) {
						widget.displayFormatter = dojo.clone(editorProps.displayFormatter);
					}
			}
		};
		unieap.showWidget = function(widget) {
			var node = widget && (widget.domNode || widget);
			if (widget.show) {
				widget.show();
			} else {
				node && dojo.style(node, "display", "block");
			}
		};
		unieap.hideWidget = function(widget) {
			var node = widget && (widget.domNode || widget);
			if (widget.hide) {
				widget.hide();
			} else {
				node && dojo.style(node, "display", "none");
			}
		};
		unieap.notify = function(widget, methodName) {
			if (!widget) { return; }
			if (widget[methodName]) {
				var args = Array.prototype.slice.call(arguments, 2);
				widget[methodName].apply(widget, args);
			}
		};
		unieap.getChildrenContainer = function(domNode) {
			dojo.require("unieap.layout.Container");
			var result = [],
				left = [domNode], nodes;
			while (left.length) {
				nodes = left.shift().childNodes;
				for (var i = 0, node, widget; (node = nodes[i]); i++) {
					if (node.getAttribute && (widget = dijit.byNode(node))) {
						if (dojo.hasClass(node, "unieap-container")) {
							result.push(widget);
							continue;
						}
					}
					left.push(node);
				}
			}
			return result;
		};
		unieap.fireContainerResize = function(domNode) {
			var children = unieap.getChildrenContainer(domNode || document.body);
			for (var i = 0, child; (child = children[i]); i++) {
				child.resizeContainer();
			}
		}, unieap.blurWidget = function() {
			try {
				(dojo.byId("unieap_for_focus") || dojo.body()).focus();
			}
			catch (e) {}
		};
		dojo.addOnLoad(function() {
			        dojo.create("a", {
				                href : "javascript:void(0);",
				                id : "unieap_for_focus",
				                "class" : "u-common-focus",
				                tabIndex : -1
			                }, dojo.body(), "first");
			        dojo.connect(window, "onscroll", function(evt) {
				                dojo.style(dojo.byId("unieap_for_focus"), "top",
				                        document.documentElement.scrollTop + "px");
			                });
		        });
		unieap.showTooltip = function(innerHTML, aroundNode, position) {
			dojo.require("unieap.Tooltip");
			if (!unieap._masterTT) {
				unieap._masterTT = new unieap._MasterTooltip();
			}
			return unieap._masterTT.show(innerHTML, aroundNode, position);
		};
		unieap.hideTooltip = function(aroundNode) {
			dojo.require("unieap.Tooltip");
			if (!unieap._masterTT) {
				unieap._masterTT = new unieap._MasterTooltip();
			}
			return unieap._masterTT.hide(aroundNode);
		};
		unieap.getMessageBox = function() {
			dojo.require("unieap.dialog.MessageBox");
			return MessageBox;
		};
		unieap.getTopWin = function() {
			var win = window.opener || window;
			try {
				win.navigator;
			}
			catch (e) {
				win = window;
			}
			try {
				win.top.navigator;
				return win.top;
			}
			catch (e) {
				try {
					do {
						var pwin = win.parent;
						pwin.navigator;
						win = pwin;
					} while (win);
				}
				catch (e1) {
					return win;
				}
			}
		};
		unieap.focusTabWidget = function(tabId, widgetId) {
			var tabWidget = unieap.byId(tabId);
			if (tabWidget) {
				var parentWidget = tabWidget.getParentContainer();
				parentWidget.selectChild(tabWidget);
				var context = tabWidget.getContentWindow();
				if (context && context.unieap) {
					var widget = context.unieap.byId(widgetId);
					if (widget) {
						if (widget.focus) {
							widget.focus();
						} else {
							if (widget.focusNode) {
								widget.focusNode.focus && widget.focusNode.focus();
							}
						}
					}
				}
			}
		};
		unieap.subscribe = function(topic, fun) {
			if (!topic || fun == null) { return null; }
			var disp = dojo._topics[topic];
			if (disp && disp._listeners) {
				var ls = [].concat(disp._listeners);
				while (ls.length) {
					if (fun == ls.pop()) { return null; }
				}
			}
			return [topic, dojo._listener.add(dojo._topics, topic, fun)];
		};
		unieap.publish = function(topic, obj) {
			var f = dojo._topics[topic];
			if (f) {
				f.apply(this, obj ? [obj] : []);
			}
		};
		unieap.unsubscribe = function(handle) {
			if (handle) {
				dojo._listener.remove(dojo._topics, handle[0], handle[1]);
			}
		};
		unieap.focusBrotherTabWidget = function(tabId, widgetId) {
			var parent = window.parent;
			parent.unieap.focusTabWidget(tabId, widgetId);
		};
		unieap.getText = function(key, map, scope, defaultValue) {
			if (!key || typeof(key) != "string") { return; }
			var scopeType = typeof(scope),
				defaultValueType = typeof(defaultValue);
			map = (dojo.isArray(map) && map) || null;
			scope = scopeType != "undefined" ? (scopeType == "string"
			        ? eval(scope)
			        : (scope != null) ? scope : RIA_I18N) : RIA_I18N;
			defaultValue = defaultValueType != "undefined" ? defaultValue : "";
			var result;
			try {
				result = scope && eval("scope." + key);
				typeof(result) != "undefined" && map != null
				        && (result = dojo.string.substitute(result, map));
			}
			catch (e) {
				!result && (result = defaultValue);
			}
			return result;
		}, unieap.toJson = function(value) {
			if (!value) { return; }
			if (dojo.isString(value)) {
				return "{data:" + value + ",__originalType:String}";
			} else {
				if (value instanceof unieap.ds.DataStore) {
					return "{data:" + value.toJson() + ",__originalType:DataStore}";
				} else {
					if (value instanceof unieap.ds.DataCenter) {
						return "{data:" + value.toJson() + ",__originalType:DataCenter}";
					} else {
						return "{data:" + dojo.toJson(value) + ",__originalType:Object}";
					}
				}
			}
		}, unieap.fromJson = function(json) {
			if (!json) { return; }
			var index = json.lastIndexOf(",__originalType");
			var value = json.substring(6, index);
			var type = json.substring(index + 16, json.length - 1);
			if (type == "String") {
				return value;
			} else {
				if (type == "DataStore") {
					var temjson = dojo.fromJson(value);
					var name = temjson.name ? temjson.name : "tempStore";
					return new unieap.ds.DataStore(temjson.name, value);
				} else {
					if (type == "DataCenter") {
						return new unieap.ds.DataCenter(value);
					} else {
						return dojo.fromJson(value);
					}
				}
			}
		};
	})();
}
/* /unieap/ria3.3/unieap/ds/Constants.js */
dojo.provide("unieap.ds.Constants");
unieap.ds.Status = {
	NEWMODIFIED : 1,
	NOTMODIFIED : 2,
	DATAMODIFIED : 3
};
unieap.ds.Buffer = {
	PRIMARY : 0,
	FILTER : 1,
	DELETE : 2
};
/* /unieap/ria3.3/unieap/ds/DataCenter.js */
if (!dojo._hasResource["unieap.ds.DataCenter"]) {
	dojo._hasResource["unieap.ds.DataCenter"] = true;
	dojo.provide("unieap.ds.DataCenter");
	dojo.declare("unieap.ds.DataCenter", null, {
		        constructor : function(b) {
			        this.clear();
			        if (!b || (dojo.isString(b) && !dojo.isObject(b = dojo.fromJson(b)))) { return; }
			        if (b.header) {
				        dojo.mixin(this.header, b.header);
			        }
			        if (b.body) {
				        this.parameters = b.body.parameters;
			        }
			        var a = b.body.dataStores;
			        for (_dataStore in a) {
				        this.dataStores[_dataStore] = new unieap.ds.DataStore(_dataStore,
				                a[_dataStore]);
			        }
		        },
		        getCode : function() {
			        return this.header.code;
		        },
		        getTitle : function() {
			        return this.header.message.title;
		        },
		        getDetail : function() {
			        return this.header.message.detail;
		        },
		        getHeaderAttribute : function(a) {
			        return this.header[a];
		        },
		        addHeaderAttribute : function(a, b) {
			        this.header[a] = b;
		        },
		        getParameter : function(a) {
			        return this.parameters[a];
		        },
		        addParameter : function(a, b) {
			        if (typeof this.parameters[a] == "array" || this.parameters[a] instanceof Array) {
				        this.parameters[a].push(b);
			        } else {
				        this.parameters[a] = b;
			        }
		        },
		        setParameter : function(a, b) {
			        this.parameters[a] = b;
		        },
		        removeParameter : function(a) {
			        delete this.parameters[a];
		        },
		        getDataStore : function(a) {
			        return this.dataStores[a];
		        },
		        getSingleDataStore : function() {
			        if (this.dataStores) {
				        for (var a in this.dataStores) {
					        return this.dataStores[a];
				        }
			        }
			        return null;
		        },
		        getDataStores : function() {
			        return this.dataStores;
		        },
		        addDataStore : function(b, a, c) {
			        if (arguments[0] == null) { return; }
			        if (dojo.isObject(arguments[0])) {
				        arguments.length == 2 && (c = arguments[1]);
				        a = arguments[0];
				        b = a.getName();
			        }
			        a.setName(b);
			        c && a.setType(c);
			        this.dataStores[b] = a;
		        },
		        removeDataStore : function(a) {
			        delete this.dataStores[a];
		        },
		        clear : function() {
			        this.header = {
				        code : 0,
				        message : {
					        title : "",
					        detail : ""
				        }
			        };
			        this.parameters = {};
			        this.dataStores = {};
		        },
		        collect : function(b) {
			        var a = new unieap.ds.DataCenter();
			        if (b == null || b == "" || b == "none") {
				        return a;
			        } else {
				        if (typeof(b) == "string") {
					        if (b == "all") {
						        this._collectParameters(a, b);
						        this._collectDataStores(a, b);
						        return a;
					        }
					        b = dojo.fromJson(b);
				        }
				        this._collectParameters(a, b.parameters, b.exclude);
				        this._collectDataStores(a, b.dataStores, b.exclude);
			        }
			        return a;
		        },
		        _collectDataStores : function(b, f, c) {
			        if (f == null || f == "" || f == "none") { return; }
			        var a = {}, g, d;
			        b.dataStores = a;
			        if (c && c.dataStores) {
				        g = unieap.convertArrayToMap(c.dataStores);
			        }
			        if (typeof(f) == "object") {
				        if (f instanceof Array) {
					        d = unieap.convertArrayToMap(f, "auto");
				        } else {
					        d = f;
				        }
			        }
			        for (var e in this.dataStores) {
				        if (g && g[e]) {
					        continue;
				        }
				        if (d) {
					        if (d[e] && this.dataStores[e].canCollect()) {
						        a[e] = this.dataStores[e].collect(d[e]);
					        }
				        } else {
					        a[e] = this.dataStores[e].collect(f);
				        }
			        }
		        },
		        _collectParameters : function(a, e, b) {
			        if (e == null || e == "" || e == "none") { return; }
			        var f, c;
			        if (b && b.parameters) {
				        f = unieap.convertArrayToMap(b.parameters);
			        }
			        if (e instanceof Array) {
				        c = unieap.convertArrayToMap(e);
			        }
			        for (var d in this.parameters) {
				        if (f && f[d]) {
					        continue;
				        }
				        if (c) {
					        if (c[d]) {
						        a.parameters[d] = this.parameters[d];
					        }
				        } else {
					        a.parameters[d] = this.parameters[d];
				        }
			        }
		        },
		        append : function(b, g, f) {
			        if (b == this) { return; }
			        !f && (f = []);
			        var d = {};
			        for (var c = 0; f[c]; c++) {
				        this.header[f[c]] && (d[f[c]] = this.header[f[c]]);
			        }
			        dojo.mixin(this.header, b.header || {}, d);
			        var a = b.parameters;
			        for (var e in a) {
				        if (!(e in this["parameters"]) || g) {
					        this["parameters"][e] = b.parameters[e];
				        }
			        }
			        a = b.dataStores;
			        for (var e in a) {
				        if (e in this["dataStores"]) {
					        this["dataStores"][e].append(b.dataStores[e], g);
					        if (g == "replace") {
						        b.dataStores[e] = this["dataStores"][e];
					        }
				        } else {
					        this["dataStores"][e] = b.dataStores[e];
				        }
			        }
		        },
		        containRowSet : function(b) {
			        var a = this.getDataStore(b);
			        if (a && !a.getRowSet().isEmpty()) { return true; }
			        return false;
		        },
		        isEmpty : function() {
			        var a = unieap.isEmpty;
			        return (a(this.parameters) && a(this.dataStores));
		        },
		        toJson : function() {
			        var c = [],
				        b = [],
				        a = [];
			        a.push("{");
			        a.push("header:");
			        a.push(dojo.toJson(this.header));
			        a.push(",");
			        a.push("body:{");
			        for (var d in this.dataStores) {
				        c.push(('"' + d + '"').concat(":").concat(this.dataStores[d].toJson()));
			        }
			        b.push("dataStores:{".concat(c.join(",")).concat("}"));
			        b.push("parameters:".concat(dojo.toJson(this.parameters)));
			        a.push(b.join(","));
			        a.push("}}");
			        return a.join("");
		        }
	        });
}
/* /unieap/ria3.3/unieap/ds/DataStore.js */
if (!dojo._hasResource["unieap.ds.DataStore"]) {
	dojo._hasResource["unieap.ds.DataStore"] = true;
	dojo.provide("unieap.ds.DataStore");
	dojo.declare("unieap.ds.DataStore", null, {
		constructor : function(c, b) {
			this._initData();
			if (arguments.length == 2) {
				this.name = c;
				dojo.isString(b) && (b = dojo.fromJson(b));
				this._loadData(b);
			} else {
				if (arguments.length == 1) {
					var a = arguments[0];
					if (typeof a == "object") {
						this._loadData(a);
					} else {
						this.name = a;
					}
				}
			}
			this.rowSet.setDataStore(this);
		},
		_initData : function() {
			this.name = "";
			this.pageNumber = 1;
			this.pageSize = 2147483647;
			this.recordCount = 0;
			this.rowSet = new unieap.ds.RowSet();
		},
		_loadData : function(a) {
			if (a instanceof Array) {
				this.setRecordCount(a.length);
				this.rowSet = new unieap.ds.RowSet(a);
				return;
			}
			if (a.rowSet) {
				this.rowSet = new unieap.ds.RowSet(a.rowSet);
				delete a.rowSet;
			}
			dojo.mixin(this, a);
		},
		setName : function(a) {
			this.name = a;
		},
		setPageSize : function(a) {
			this.pageSize = a;
		},
		setPageNumber : function(a) {
			this.pageNumber = a;
		},
		setRowSetName : function(a) {
			this.rowSetName = a;
		},
		setRecordCount : function(a) {
			this.recordCount = a;
		},
		setCondition : function(a) {
			this.condition = a;
		},
		setOrder : function(a) {
			this.order = a;
		},
		setGroup : function(a) {
			this.group = a;
		},
		setMetaData : function(a) {
			this.metaData = a;
		},
		addMetaData : function(e, b) {
			var c = b || {}, a,
				d = this.metaData;
			if (arguments.length == 1 && (a = arguments[0])) {
				for (var f in a) {
					if (!dojo.isFunction(a[f])) {
						c[f] = a[f];
					}
				}
				e = c.name;
				if (e == null) { return; }
			}
			if (!this.metaData) {
				this.metaData = {};
				d = this.metaData.columns = {};
			} else {
				if (this.metaData.columns) {
					d = this.metaData.columns;
				}
			}
			d[e] = c;
		},
		setStatementName : function(a) {
			this.statementName = a;
		},
		insertConditionValue : function(c, a, b) {
			this.conditionValues ? this.conditionValues : (this.conditionValues = []);
			if (!b == undefined) {
				this.conditionValues[b] = [c, a];
			} else {
				this.conditionValues.push([c, a]);
			}
		},
		removeConditionValues : function() {
			this.conditionValues = null;
		},
		resetCondition : function() {
			this.condition = "";
			this.conditionValues = null;
			this.pageNumber = 1;
			this.recordCount = 0;
		},
		addAttribute : function(b, c, a) {
			(this.attributes ? this.attributes : (this.attributes = {}))[b] = [c, a];
		},
		removeAttribute : function(a) {
			this.attributes && delete this.attributes[a];
		},
		removeAttributes : function() {
			delete this["attributes"];
		},
		setAttributes : function(a) {
			this.attributes = a;
		},
		setPool : function(a) {
			this.pool = a;
		},
		addStatistic : function(a, b) {
			this.statistics = this.statistics || {};
			(this.statistics[a] = this.statistics[a] || {})[b] = "";
		},
		removeStatistic : function(a, b) {
			this.statistics = this.statistics || {};
			if (b && this.statistics[a]) {
				delete this.statistics[a][b];
				if (unieap.isEmpty(this.statistics[a])) {
					delete this.statistics[a];
				}
			} else {
				delete this.statistics[a];
			}
		},
		setStatistics : function(a) {
			this.statistics = a;
		},
		setRowSet : function(a) {
			this.rowSet = a;
			this.rowSet.setDataStore(this);
			this.recordCount = this.rowSet.getTotalCount();
		},
		setType : function(a) {
			this.type = a;
		},
		setDistinct : function(a) {
			this.distinct = a;
		},
		getName : function() {
			return this.name;
		},
		getPageSize : function() {
			return this.pageSize;
		},
		getRecordCount : function() {
			return this.recordCount;
		},
		getRealRecordCount : function() {
			var b = 0;
			if (this.rowSet) {
				var c = this.rowSet.getRowCount();
				var a = this.rowSet.getInitialCount();
				b = c - a;
			}
			return this.recordCount + b;
		},
		getPageNumber : function() {
			return this.pageNumber;
		},
		getRowSet : function() {
			return this.rowSet;
		},
		getRowSetName : function() {
			return this.rowSetName;
		},
		getGroup : function() {
			return this.group;
		},
		getCondition : function() {
			return this.condition || "";
		},
		getOrder : function() {
			return this.order || "";
		},
		getMetaData : function(c) {
			if (!c) {
				if (this.metaData) {
					var b = this.metaData;
					this.metaData.columns && (b = this.metaData.columns);
					var a = [];
					for (var e in b) {
						a.push(new unieap.ds.MetaData(e, b[e]));
					}
					return a;
				}
				return this.metaData;
			}
			var d = null;
			this.metaData
			        && (this.metaData.columns && (d = this.metaData.columns[c]) || (d = this.metaData[c]));
			if (d) { return new unieap.ds.MetaData(c, d); }
			return null;
		},
		getStatementName : function() {
			return this.statementName;
		},
		_getPart : function(a) {
			return {
				getValue : function() {
					return a[0];
				},
				getDataType : function() {
					return a[1];
				},
				toString : function() {
					return this.getValue();
				}
			};
		},
		getConditionValues : function() {
			return this.conditionValues;
		},
		getAttribute : function(b) {
			var a = null;
			if (this.attributes && (a = this.attributes[b])) { return this._getPart(a); }
			return null;
		},
		getAttributes : function() {
			return this.attributes;
		},
		getPool : function() {
			return this.pool;
		},
		getStatistic : function(a, b) {
			if (this.statistics && this.statistics[a]) { return b
			        ? this.statistics[a][b]
			        : this.statistics[a]; }
			return null;
		},
		getStatistics : function() {
			return this.statistics;
		},
		getType : function() {
			return this.type;
		},
		isDistinct : function() {
			return this.distinct === true;
		},
		canCollect : function() {
			return !this.getType() || this.getType() == "dynamic";
		},
		toData : function() {
			var a = {};
			a.rowSet = this.rowSet.toData();
			a.name = this.name;
			a.pageNumber = this.pageNumber;
			a.pageSize = this.pageSize;
			a.recordCount = this.recordCount;
			this.rowSetName && (a.rowSetName = this.rowSetName);
			this.order && (a.order = this.order);
			this.conditionValues && (a.conditionValues = this.conditionValues);
			this.parameters && (a.parameters = this.parameters);
			this.metaData && (a.metaData = this.metaData);
			if (this.statementName && this.statementName != "") {
				a.statementName = this.statementName;
				this.getAttributes() && (a.attributes = this.attributes);
			} else {
				this.condition && (a.condition = this.condition);
				this.group && (a.group = this.group);
			}
			this.pool && (a.pool = this.pool);
			this.statistics && (a.statistics = this.statistics);
			this.distinct && (a.distinct = true);
			return a;
		},
		toJson : function() {
			var a = [];
			a.push("rowSet:".concat(this.rowSet.toJson()));
			a.push('name:"'.concat(this.name).concat('"'));
			a.push("pageNumber:".concat(this.pageNumber));
			a.push("pageSize:".concat(this.pageSize));
			a.push("recordCount:".concat(this.recordCount));
			this.rowSetName && a.push('rowSetName:"'.concat(this.rowSetName).concat('"'));
			this.order && a.push('order:"'.concat(this.order).concat('"'));
			this.conditionValues
			        && a.push("conditionValues:".concat(dojo.toJson(this.conditionValues)));
			this.parameters && a.push("parameters:".concat(dojo.toJson(this.parameters)));
			this.metaData && a.push("metaData:".concat(dojo.toJson(this.metaData)));
			if (this.statementName && this.statementName != "") {
				this.statementName
				        && a.push('statementName:"'.concat(this.statementName).concat('"'));
				this.attributes && a.push("attributes:".concat(dojo.toJson(this.attributes)));
			} else {
				this.condition && a.push('condition:"'.concat(this.condition).concat('"'));
				this.group && a.push('group:"'.concat(this.group).concat('"'));
			}
			this.pool && a.push('pool:"'.concat(this.pool).concat('"'));
			this.statistics && a.push("statistics:".concat(dojo.toJson(this.statistics)));
			this.distinct && a.push("pool:".concat(this.distinct));
			return "{".concat(a.join(",").concat("}"));
		},
		collect : function(b) {
			var a = new unieap.ds.DataStore();
			dojo.mixin(a, this);
			if (!((dojo.isObject(b) && b.metaData) || a.statementName)) {
				delete a.metaData;
			}
			if (dojo.isObject(b)) {
				b = b.policy;
			}
			a.rowSet = this["rowSet"].collect(b);
			a.rowSet.setDataStore(a);
			return a;
		},
		append : function(b, e) {
			if (!b instanceof unieap.ds.DataStore || this == b || "discard" == e) { return; }
			if (e != "union" && e != "append") {
				var d = ["name", "pageNumber", "recordCount", "pageSize", "rowSetName", "order",
				        "condition", "conditionValues", "parameters", "metaData", "statementName",
				        "attributes", "group", "pool", "statistics", "distinct"];
				for (var c = 0, a; (a = d[c]); c++) {
					if (b[a] == null) {
						delete this[a];
						continue;
					}
					this[a] = b[a];
				}
			}
			e == "append" && (this.recordCount += b.getRowSet().getRowCount());
			this.rowSet.append(b.rowSet, e);
			if (e != "updateProps") {
				this.onRowSetChanged();
			} else {
				this.onPropsChanged();
			}
		},
		clone : function(f) {
			if (!this instanceof unieap.ds.DataStore) { return; }
			var a = new unieap.ds.DataStore(f);
			var d = ["pageNumber", "recordCount", "pageSize", "rowSetName", "order", "condition",
			        "conditionValues", "parameters", "metaData", "statementName", "attributes",
			        "group", "pool", "statistics", "distinct"];
			for (var c = 0, b; (b = d[c]); c++) {
				a[b] = this[b];
			}
			var e = this.getRowSet().clone();
			a.setRowSet(e);
			return a;
		},
		onRowSetChanged : function() {},
		onPropsChanged : function() {},
		isFullData : function() {
			return this.getType() != "incomplete";
		},
		getParameter : function(a) {
			if (!this.parameters) {
				this.parameters = {};
			}
			var b = this.parameters[a];
			if (b != "undefined") {
				if (typeof b == "array" || b instanceof Array) { return b[0]; }
				return b;
			}
		},
		addParameter : function(a, b) {
			if (!this.parameters) {
				this.parameters = {};
			}
			if (typeof this.parameters[a] == "array" || this.parameters[a] instanceof Array) {
				this.parameters[a].push(b);
			} else {
				this.parameters[a] = b;
			}
		},
		setParameter : function(a, b) {
			if (!this.parameters) {
				this.parameters = {};
			}
			this.parameters[a] = b;
		},
		removeParameter : function(a) {
			delete this.parameters[a];
		}
	});
}
/* /unieap/ria3.3/unieap/ds/IDataCenter.js */
if (!dojo._hasResource["unieap.ds.IDataCenter"]) {
	dojo._hasResource["unieap.ds.IDataCenter"] = true;
	dojo.provide("unieap.ds.IDataCenter");
	dojo.declare("unieap.ds.IDataCenter", null, {
		        constructor : function(a) {},
		        getCode : function() {},
		        getTitle : function() {},
		        getDetail : function() {},
		        getHeaderAttribute : function(a) {},
		        addHeaderAttribute : function(a, b) {},
		        getParameter : function(a) {},
		        setParameter : function(a, b) {},
		        removeParameter : function(a) {},
		        getDataStore : function(a) {},
		        getSingleDataStore : function() {},
		        getDataStores : function() {},
		        addDataStore : function(b, a, c) {},
		        removeDataStore : function(a) {},
		        clear : function() {},
		        collect : function(a) {},
		        append : function(a, c, b) {},
		        containRowSet : function(a) {},
		        isEmpty : function() {},
		        toJson : function() {}
	        });
}
/* /unieap/ria3.3/unieap/ds/IDataStore.js */
if (!dojo._hasResource["unieap.ds.IDataStore"]) {
	dojo._hasResource["unieap.ds.IDataStore"] = true;
	dojo.provide("unieap.ds.IDataStore");
	dojo.declare("unieap.ds.IDataStore", null, {
		        constructor : function(b, a) {},
		        setName : function(a) {},
		        setPageSize : function(a) {},
		        setPageNumber : function(a) {},
		        setRowSetName : function(a) {},
		        setRecordCount : function(a) {},
		        setCondition : function(a) {},
		        setOrder : function(a) {},
		        setGroup : function(a) {},
		        addMetaData : function(b, a) {},
		        setStatementName : function(a) {},
		        insertConditionValue : function(c, a, b) {},
		        removeConditionValues : function() {},
		        resetCondition : function() {},
		        addAttribute : function(b, c, a) {},
		        removeAttribute : function(a) {},
		        removeAttributes : function() {},
		        setAttributes : function(a) {},
		        setPool : function(a) {},
		        addStatistic : function(a, b) {},
		        removeStatistic : function(a, b) {},
		        setStatistics : function(a) {},
		        setRowSet : function(a) {},
		        getName : function() {},
		        getPageSize : function() {},
		        getRecordCount : function() {},
		        getRealRecordCount : function() {},
		        getPageNumber : function() {},
		        getRowSet : function() {},
		        getRowSetName : function() {},
		        getGroup : function() {},
		        getCondition : function() {},
		        getOrder : function() {},
		        getMetaData : function(a) {},
		        getStatementName : function() {},
		        getConditionValues : function() {},
		        getAttribute : function(a) {},
		        getAttributes : function() {},
		        getPool : function() {},
		        getStatistic : function(a, b) {},
		        getStatistics : function() {},
		        toData : function() {},
		        toJson : function() {},
		        collect : function(a) {},
		        append : function(a, b) {},
		        clone : function(a) {},
		        onRowSetChanged : function() {},
		        onPropsChanged : function() {},
		        getParameter : function(a) {},
		        setParameter : function(a, b) {},
		        removeParameter : function(a) {}
	        });
}
/* /unieap/ria3.3/unieap/ds/IMetaData.js */
if (!dojo._hasResource["unieap.ds.IMetaData"]) {
	dojo._hasResource["unieap.ds.IMetaData"] = true;
	dojo.provide("unieap.ds.IMetaData");
	dojo.declare("unieap.ds.IMetaData", null, {
		        setData : function(a) {},
		        getName : function() {},
		        setName : function(a) {},
		        getLabel : function() {},
		        setLabel : function(a) {},
		        getDataType : function() {},
		        setDataType : function(a) {},
		        isPrimaryKey : function() {},
		        setPrimaryKey : function(a) {},
		        getPrecision : function() {},
		        setPrecision : function(a) {},
		        getScale : function() {},
		        setScale : function(a) {},
		        isNullable : function() {},
		        setNullable : function(a) {},
		        getDefaultValue : function() {},
		        setDefaultValue : function(a) {},
		        getFormat : function() {},
		        setFormat : function(a) {},
		        getMax : function() {},
		        setMax : function(a) {},
		        getMin : function() {},
		        setMin : function(a) {},
		        getRange : function() {},
		        setRange : function(a) {},
		        getPast : function() {},
		        setPast : function(a) {},
		        getFuture : function() {},
		        setFuture : function(a) {},
		        getPattern : function() {},
		        setPattern : function(a) {},
		        getAttribute : function(a) {},
		        setAttribute : function(a, b) {},
		        getMaxLength : function() {},
		        setMaxLength : function(a) {},
		        getMinLength : function() {},
		        setMinLength : function(a) {},
		        getPrompt : function(a) {},
		        setPrompt : function(a, b) {}
	        });
}
/* /unieap/ria3.3/unieap/ds/IRow.js */
if (!dojo._hasResource["unieap.ds.IRow"]) {
	dojo._hasResource["unieap.ds.IRow"] = true;
	dojo.provide("unieap.ds.IRow");
	dojo.declare("unieap.ds.IRow", null, {
		        constructor : function(c, b, a) {},
		        getRowStatus : function() {},
		        setRowStatus : function(a) {},
		        isRowSelected : function() {},
		        setRowSelected : function(a) {},
		        getData : function() {},
		        getRowSet : function() {},
		        getIndex : function() {},
		        getItemValue : function(a) {},
		        getItemOrigValue : function(a) {},
		        setItemValue : function(a, b, c) {},
		        isItemChanged : function(a) {},
		        isModified : function() {},
		        resetUpdate : function() {},
		        discardUpdate : function() {},
		        clear : function() {},
		        getIdentifier : function(a) {},
		        setIdentifier : function(a, b) {},
		        removeIdentifier : function(a) {}
	        });
}
/* /unieap/ria3.3/unieap/ds/IRowSet.js */
if (!dojo._hasResource["unieap.ds.IRowSet"]) {
	dojo._hasResource["unieap.ds.IRowSet"] = true;
	dojo.provide("unieap.ds.IRowSet");
	dojo.declare("unieap.ds.IRowSet", null, {
		        constructor : function(a) {},
		        isModified : function() {},
		        toData : function() {},
		        toJson : function() {},
		        toBufJson : function(a) {},
		        getData : function(a) {},
		        getRowCount : function(a) {},
		        getTotalCount : function() {},
		        getInitialCount : function() {},
		        resetInitialCount : function() {},
		        isEmpty : function() {},
		        reset : function() {},
		        resetUpdate : function(a) {},
		        discardUpdate : function(a) {},
		        addRow : function(a, d, c, b) {},
		        addRows : function(a, b) {},
		        insertRow : function(a, e, d, c, b) {},
		        deleteRow : function(a) {},
		        deleteRows : function(a) {},
		        deleteAllRows : function() {},
		        unDeleteRow : function(a) {},
		        unDeleteAll : function() {},
		        rowsDiscard : function(c, a, b) {},
		        rowsCopy : function(f, d, c, b, e, a) {},
		        rowsMove : function(f, d, c, b, e, a) {},
		        selectRows : function(a, d, b, c) {},
		        getSelectedCount : function(a) {},
		        getSelectedRows : function(a) {},
		        getSelectedRowIndexs : function(a) {},
		        getUnSelectedRows : function(a) {},
		        getUnSelectedRowIndexs : function(a) {},
		        deleteSelectedRows : function() {},
		        getRow : function(b, a) {},
		        getRows : function(c, a, b) {},
		        getRowData : function(b, a) {},
		        forEach : function(e, d, b, c, a) {},
		        every : function(e, d, b, c, a) {},
		        some : function(e, d, b, c, a) {},
		        forEachFilter : function(e, d, b, c, a) {},
		        disabledEvent : function() {},
		        enabledEvent : function() {},
		        onItemChanging : function(d, c, b, a) {},
		        onItemChanged : function(d, c, b, a) {},
		        onBeforeAddRow : function(b, a) {},
		        onAfterAddRow : function(b, a) {},
		        onBeforeAddRows : function(a) {},
		        onAfterAddRows : function(a) {},
		        onBeforeDeleteRow : function(b, a) {},
		        onAfterDeleteRow : function(b, a) {},
		        onBeforeDeleteRows : function(a) {},
		        onAfterDeleteRows : function() {},
		        onBeforeDeleteAllRows : function() {},
		        onAfterDeleteAllRows : function() {},
		        onBeforeDeleteSelectedRows : function(a, b) {},
		        onAfterDeleteSelectedRows : function(a, b) {},
		        onBeforeDiscardUpdate : function(a) {},
		        onAfterDiscardUpdate : function() {},
		        onFilter : function(a) {},
		        onSort : function(a) {},
		        onResetUpdate : function(a) {},
		        sorts : function(a, b) {},
		        sort : function(b, c, a, d) {},
		        sum : function(a, b, c) {},
		        max : function(a, b) {},
		        min : function(a, b) {},
		        avg : function(a, b, c) {},
		        doFilter : function(b, c, d, a) {},
		        getSatisfiedFilterRows : function(a) {},
		        getMetaData : function(a) {},
		        getName : function() {},
		        setDataStore : function(a) {},
		        getDataStore : function() {},
		        updateRow : function(b, a) {},
		        setItemValue : function(d, a, b, c) {},
		        setDate : function(d, a, b, c) {},
		        getItemValue : function(c, a, b) {},
		        getDate : function(c, a, b) {},
		        getInt : function(c, a, b) {},
		        getFloat : function(c, a, b) {},
		        getItemOrigValue : function(c, a, b) {},
		        getRowStatus : function(b, a) {},
		        setRowStatus : function(c, a, b) {},
		        isRowSelected : function(b, a) {},
		        setRowSelected : function(c, a, b) {},
		        clear : function(b, a) {},
		        collect : function(a) {},
		        append : function(a, b) {},
		        clone : function() {},
		        generateTreeSet : function(a) {}
	        });
}
/* /unieap/ria3.3/unieap/ds/MetaData.js */
if (!dojo._hasResource["unieap.ds.MetaData"]) {
	dojo._hasResource["unieap.ds.MetaData"] = true;
	dojo.provide("unieap.ds.MetaData");
	dojo.declare("unieap.ds.MetaData", null, {
		        constructor : function(b, a) {
			        if (arguments.length == 0) { return; }
			        this.setData(a);
			        this.setName(b);
		        },
		        setData : function(a) {
			        dojo.mixin(this, a);
		        },
		        getName : function() {
			        return this.name;
		        },
		        setName : function(a) {
			        this.name = a;
		        },
		        getLabel : function() {
			        return this.label;
		        },
		        setLabel : function(a) {
			        this.label = a;
		        },
		        getDataType : function() {
			        return this.dataType;
		        },
		        setDataType : function(a) {
			        this.dataType = a;
		        },
		        isPrimaryKey : function() {
			        return !!this.primaryKey;
		        },
		        setPrimaryKey : function(a) {
			        this.primaryKey = a;
		        },
		        getPrecision : function() {
			        return this.precision;
		        },
		        setPrecision : function(a) {
			        this.precision = a;
		        },
		        getScale : function() {
			        return this.scale;
		        },
		        setScale : function(a) {
			        this.scale = a;
		        },
		        isNullable : function() {
			        return this.nullable != false;
		        },
		        setNullable : function(a) {
			        this.nullable = a;
		        },
		        getDefaultValue : function() {
			        return this.defaultValue;
		        },
		        setDefaultValue : function(a) {
			        this.defaultValue = a;
		        },
		        getFormat : function() {
			        return this.format;
		        },
		        setFormat : function(a) {
			        this.format = a;
		        },
		        getMax : function() {
			        return this.max;
		        },
		        setMax : function(a) {
			        this.max = a;
		        },
		        getMin : function() {
			        return this.min;
		        },
		        setMin : function(a) {
			        this.min = a;
		        },
		        getRange : function() {
			        return this.range;
		        },
		        setRange : function(a) {
			        this.range = a;
		        },
		        getPast : function() {
			        return this.past;
		        },
		        setPast : function(a) {
			        this.past = a;
		        },
		        getFuture : function() {
			        return this.future;
		        },
		        setFuture : function(a) {
			        this.future = a;
		        },
		        getPattern : function() {
			        return this.pattern;
		        },
		        setPattern : function(a) {
			        this.pattern = a;
		        },
		        getAttribute : function(a) {
			        return this[a];
		        },
		        setAttribute : function(a, b) {
			        this[a] = b;
		        },
		        getMaxLength : function() {
			        return this.maxLength;
		        },
		        setMaxLength : function(a) {
			        this.maxLength = a;
		        },
		        getMinLength : function() {
			        return this.minLength;
		        },
		        setMinLength : function(a) {
			        this.minLength = a;
		        },
		        getPrompt : function(a) {
			        return (this.prompts || (0))[a];
		        },
		        setPrompt : function(a, b) {
			        (this.prompts = this.prompts || {})[a] = b;
		        }
	        });
}
/* /unieap/ria3.3/unieap/ds/Row.js */
if (!dojo._hasResource["unieap.ds.Row"]) {
	dojo._hasResource["unieap.ds.Row"] = true;
	dojo.provide("unieap.ds.Row");
	(function() {
		var b = unieap.ds.Status;
		var a = unieap.ds.Buffer;
		var c = {};
		c._getRowStatus = function(d) {
			return d._t || b.NOTMODIFIED;
		};
		c._setRowStatus = function(e, d) {
			e._t = d;
		};
		c._isRowSelected = function(d) {
			return (d._s == true);
		};
		c._setRowSelected = function(e, d) {
			e._s = d;
		};
		c._getItemValue = function(e, d) {
			return e[d];
		};
		c._getItemOrigValue = function(e, d) {
			if ((e._o == null) || (typeof e._o[d] == "undefined")) { return c._getItemValue(e, d); }
			return e._o[d];
		};
		c._setItemValue = function(g, e, f, h) {
			var d = e in g ? g[e] : null;
			f = h ? f : (f === "" || f === null ? null : f);
			if (d === f) { return; }
			g[e] = f;
			if (!g._o) {
				(g._o = {})[e] = d;
			} else {
				if (!(e in g._o)) {
					g._o[e] = d;
				} else {
					if (f == g._o[e]) {
						delete g._o[e];
						unieap.isEmpty(g._o) && delete g._o;
					}
				}
			}
			if (c._getRowStatus(g) != b.NEWMODIFIED) {
				if (g._o) {
					c._setRowStatus(g, b.DATAMODIFIED);
				} else {
					delete g._t;
				}
			}
			return true;
		};
		c._isItemChanged = function(e, d) {
			if (!e._o || !(d in e._o)) { return false; }
			return (e._o[d] != e[d]);
		};
		c._resetUpdate = function(d) {
			delete d._t;
			delete d._o;
		};
		dojo.declare("unieap.ds.Row", null, {
			constructor : function(f, e, d) {
				(this.rowset = f) && (this._e = (f.onItemChanging || f.onItemChanged));
				this.data = e;
				this.index = d;
			},
			getRowStatus : function() {
				return c._getRowStatus(this.data);
			},
			setRowStatus : function(d) {
				c._setRowStatus(this.data, d);
			},
			isRowSelected : function() {
				return c._isRowSelected(this.data);
			},
			setRowSelected : function(d) {
				c._setRowSelected(this.data, d);
			},
			getData : function() {
				return this.data;
			},
			getRowSet : function() {
				return this.rowset;
			},
			getIndex : function() {
				return this.index;
			},
			getItemValue : function(e) {
				var d = null;
				return (d = c._getItemValue(this.data, e)) != null ? d : null;
			},
			getItemOrigValue : function(d) {
				return c._getItemOrigValue(this.data, d);
			},
			setItemValue : function(e, f, g) {
				var d = this.data[e];
				if (d === f) { return false; }
				if (this._e && (this._raiseItemEvent("onItemChanging", e, f) == false)) { return false; }
				c._setItemValue(this.data, e, f, g);
				this._e && this._raiseItemEvent("onItemChanged", e, f);
				return true;
			},
			isItemChanged : function(d) {
				return c._isItemChanged(this.data, d);
			},
			isModified : function() {
				return !unieap.isEmpty(this.data._o);
			},
			resetUpdate : function() {
				c._resetUpdate(this.data);
			},
			discardUpdate : function() {
				if (this.getRowStatus() == b.DATAMODIFIED) {
					delete this.data._t;
				}
				var e = this.data._o;
				for (var d in e) {
					this.data[d] = e[d];
				}
				delete this.data._o;
			},
			clear : function() {
				var f, g, d;
				(f = this.data._t) && delete this.data._t;
				(g = this.data._s) && delete this.data._s;
				(d = (this.data._o || {})) && delete this.data._o;
				for (var e in this.data) {
					typeof(d[e]) != "undefined" || (d[e] = this.data[e]);
					delete this.data[e];
				}
				g && (this.data._s = true);
				if (f == b.NEWMODIFIED) {
					(this.data._t = b.NEWMODIFIED) && !unieap.isEmpty(d) && (this.data._o = d);
				} else {
					if (!unieap.isEmpty(d)) {
						(this.data._t = b.DATAMODIFIED) && (this.data._o = d);
					}
				}
			},
			_raiseItemEvent : function(d, f, e) {
				if (this.rowset.applyEvent(d, [this, f, e, this.index]) == false) { return false; }
				return true;
			},
			getIdentifier : function(d) {
				return this.data[d];
			},
			setIdentifier : function(d, e) {
				return this.data[d] = e;
			},
			removeIdentifier : function(d) {
				this.data[d] && (delete this.data[d]);
			}
		});
	})();
}
/* /unieap/ria3.3/unieap/ds/RowSet.js */
if (!dojo._hasResource["unieap.ds.RowSet"]) {
	dojo._hasResource["unieap.ds.RowSet"] = true;
	dojo.require("unieap.util.util");
	dojo.provide("unieap.ds.RowSet");
	(function() {
		var b = unieap.ds.Status;
		var a = unieap.ds.Buffer;
		dojo.declare("unieap.ds.RowSet", null, {
			constructor : function(c) {
				this["primary"] = [];
				this["delete"] = [];
				this["filter"] = [];
				this.initialCount = 0;
				if (c) {
					if (typeof c.length == "number") {
						this["primary"] = c;
						this.initialCount = c.length;
					} else {
						if (typeof c.primary != "undefined") {
							this["primary"] = c.primary;
							this.initialCount += c.primary.length;
						}
						if (typeof c["delete"] != "undefined") {
							this["delete"] = c["delete"];
						}
						if (typeof c.filter != "undefined") {
							this["filter"] = c.filter;
						}
					}
				}
			},
			isModified : function() {
				var c = this.some(function(e) {
					        var d = e.getRowStatus();
					        return ((d != b.NEWMODIFIED));
				        }, null, null, a.DELETE);
				(!c) && (c = this.some(function(e) {
					        var d = e.getRowStatus();
					        return d && d != b.NOTMODIFIED;
				        }, null, null, a.PRIMARY));
				(!c) && (c = this.some(function(e) {
					        var d = e.getRowStatus();
					        return d && d != b.NOTMODIFIED;
				        }, null, null, a.FILTER));
				return c;
			},
			toData : function() {
				var c = {};
				c.primary = this["primary"];
				c["delete"] = this["delete"];
				c.filter = this["filter"];
				return c;
			},
			toJson : function() {
				var c = [];
				c.push("{");
				c.push('"primary":'.concat(this.toBufJson(a.PRIMARY)));
				c.push(",");
				c.push('"filter":'.concat(this.toBufJson(a.FILTER)));
				c.push(",");
				c.push('"delete":'.concat(this.toBufJson(a.DELETE)));
				c.push("}");
				return c.join("");
			},
			toBufJson : function(c) {
				var e = this._getBuff(c),
					n = [], m, j;
				for (var g = 0, d, f, l, h; (f = e[g]); g++) {
					d = f._o;
					delete f._o;
					h = [];
					for (l in f) {
						m = [];
						m.push('"');
						m.push(l);
						m.push('"');
						m.push(":");
						j = f[l];
						if (dojo.isString(j)) {
							m.push(dojo._escapeString(j));
						} else {
							if (/\[object [oO]bject\]/.test(j)) {
								m = [];
							} else {
								m.push(j == null ? "null" : j);
							}
						}
						m.length > 0 && h.push(m.join(""));
					}
					if (d) {
						f._o = d;
						var k = [];
						for (l in d) {
							m = [];
							m.push(l);
							m.push(":");
							j = d[l];
							if (dojo.isString(j)) {
								m.push(dojo._escapeString(j));
							} else {
								m.push(j == null ? "null" : j);
							}
							k.push(m.join(""));
						}
						m = [];
						m.push("_o : {");
						m.push(k.join(","));
						m.push("}");
						h.push(m.join(""));
					}
					m = [];
					m.push("{");
					m.push(h.join(","));
					m.push("}");
					n.push(m.join(""));
				}
				return "[".concat(n.join(",")).concat("]");
			},
			getData : function(c) {
				return this._getBuff(c);
			},
			getRowCount : function(c) {
				var d = this._getBuff(c);
				return d.length;
			},
			getTotalCount : function() {
				return (this["primary"].length + this["filter"].length + this["delete"].length);
			},
			getInitialCount : function() {
				return this.initialCount;
			},
			resetInitialCount : function() {
				var c = this.getRowCount(a.FILTER) + this.getRowCount();
				if (this._dataStore) {
					this._dataStore.recordCount += c - this.initialCount;
				}
				this.initialCount = c;
			},
			isEmpty : function() {
				return 0 == this.getTotalCount();
			},
			reset : function() {
				this["primary"] = [];
				this["filter"] = [];
				this["delete"] = [];
			},
			resetUpdate : function(g) {
				if (g != null) {
					this.getRow(g).resetUpdate();
					this.applyEvent("onResetUpdate", [g]);
					return;
				}
				this["delete"] = [];
				var f = this["primary"];
				for (var d = 0, c = f.length; d < c; d++) {
					var e = new unieap.ds.Row(this, f[d]);
					e.resetUpdate();
				}
				f = this["filter"];
				for (var d = 0, c = f.length; d < c; d++) {
					var e = new unieap.ds.Row(this, f[d]);
					e.resetUpdate();
				}
				this.resetInitialCount();
				this.applyEvent("onResetUpdate", []);
			},
			discardUpdate : function(f) {
				if (this.applyEvent("onBeforeDiscardUpdate", typeof(f) != "undefined" ? [f] : []) == false) { return; }
				if (f != null) {
					this.getRow(f).discardUpdate();
					return;
				}
				Array.prototype.push.apply(this["primary"], this["filter"].splice(0,
				                this["filter"].length));
				Array.prototype.push.apply(this["primary"], this["delete"].splice(0,
				                this["delete"].length));
				for (var c = 0; c < this["primary"].length; c++) {
					if (this["primary"][c]._t == b.DATAMODIFIED) {
						var e = this["primary"][c]._o;
						for (var d in e) {
							this["primary"][c][d] = e[d];
						}
						delete this["primary"][c]._t;
						delete this["primary"][c]._o;
					} else {
						if (this["primary"][c]._t == b.NEWMODIFIED) {
							this["primary"].splice(c, 1);
							c--;
						}
					}
				}
				this.applyEvent("onAfterDiscardUpdate", []);
			},
			addRow : function(d, h, g, f) {
				if (this.applyEvent("onBeforeAddRow", arguments) == false) { return; }
				d = this._buildRow(d, h, g, f);
				var c = this["primary"].length;
				this["primary"].push(d);
				var e = new unieap.ds.Row(this, d, c);
				if (g != true) {
					e.setRowStatus(b.NEWMODIFIED);
				}
				this.applyEvent("onAfterAddRow", [e, this]);
				return e;
			},
			addRows : function(d, f) {
				if (this.applyEvent("onBeforeAddRows", arguments) == false) { return; }
				if (!d) {
					d = [];
				}
				if (!(typeof d == "array" || d instanceof Array)) {
					d = [d];
				}
				for (var c = 0; c < d.length; c++) {
					d[c] = this._buildRow(d[c], null, null, f);
					var e = new unieap.ds.Row(this, d[c]);
					e.setRowStatus(b.NEWMODIFIED);
					this["primary"].push(d[c]);
				}
				this.applyEvent("onAfterAddRows", [d, this]);
			},
			insertRow : function(c, i, h, g, e) {
				if (this.applyEvent("onBeforeAddRow", arguments) == false) { return; }
				var f = this["primary"], d;
				if ((i == null) || (i < 0) || (i > f.length)) {
					i = f.length;
				}
				c = this._buildRow(c, h, g, e);
				f.splice(i, 0, c);
				d = new unieap.ds.Row(this, c, i);
				if (!g) {
					d.setRowStatus(b.NEWMODIFIED);
				}
				this.applyEvent("onAfterAddRow", [d, this]);
				return d;
			},
			deleteRow : function(g) {
				if (this.applyEvent("onBeforeDeleteRow", arguments) == false) { return; }
				var f = this["primary"];
				if ((g == null) || (g < 0) || (g >= f.length)) { return false; }
				var d = f.splice(g, 1);
				var c = this["delete"].length;
				if (d[0]._t != 1) {
					this["delete"].push(d[0]);
				}
				var e = new unieap.ds.Row(this, d[0], c);
				this.applyEvent("onAfterDeleteRow", [e, this]);
				return e;
			},
			deleteRows : function(e) {
				if (this.applyEvent("onBeforeDeleteRows", arguments) == false) { return; }
				e = dojo.clone(e).sort(function(g, f) {
					        return g - f;
				        });
				for (var c = e.length - 1; c >= 0; c--) {
					if (e[c] < 0 || e[c] >= this["primary"].length) {
						continue;
					}
					var d = this["primary"].splice(e[c], 1);
					if (d[0]._t != 1) {
						this["delete"].push(d[0]);
					}
				}
				this.applyEvent("onAfterDeleteRows", arguments);
			},
			deleteAllRows : function() {
				if (this.applyEvent("onBeforeDeleteAllRows", arguments) == false) { return; }
				var c = this["primary"].concat(this["filter"]);
				c = dojo.filter(c, function(d) {
					        return d._t != 1;
				        });
				this["delete"] = this["delete"].concat(c);
				this["primary"] = [];
				this["filter"] = [];
				this.applyEvent("onAfterDeleteAllRows", [this]);
			},
			unDeleteRow : function(e) {
				var d = this["delete"];
				if ((e == null) || (e < 0) || (e >= d.length)) { return false; }
				var c = d.splice(e, 1);
				this["primary"].push(c[0]);
				return true;
			},
			unDeleteAll : function() {
				var d = this["delete"];
				var c = this.rowsMove(0, -1, a.DELETE, this, -1, a.PRIMARY);
				return c;
			},
			rowsDiscard : function(f, d, e) {
				var g = this._getBuff(e);
				if ((f == null) || (f < 0) || (f >= g.length)) {
					f = 0;
				}
				if ((d == null) || (d < 0) || (d > g.length)) {
					d = g.length;
				}
				var c = g.splice(f, d - f);
				return c;
			},
			_rowsMove : function(o, h, p, e, d, k, n) {
				if (e == null) { return 0; }
				var q = this._getBuff(p);
				var g = e._getBuff(k);
				if ((o == null) || (o < 0) || (o >= q.length)) {
					o = 0;
				}
				if ((h == null) || (h < 0) || (h > q.length)) {
					h = q.length;
				}
				var j = h - o;
				if (j <= 0) { return 0; }
				var s;
				if (n) {
					s = q.splice(o, j);
				} else {
					s = q.slice(o, h);
					var m = [], r;
					for (var f = 0, c = s.length; f < c; f++) {
						r = this._cloneRow(s[f]);
						(new unieap.ds.Row(this, r)).setRowStatus(b.NEWMODIFIED);
						m.push(r);
					}
					s = m;
				}
				if ((d == null) || (d < 0) || (d >= g.length)) {
					d = g.length;
				}
				var m = g.splice(d, g.length - d);
				for (var f = 0, c = s.length; f < c; f++) {
					g.push(s[f]);
				}
				if (m.length > 0) {
					for (var f = 0, c = m.length; f < c; f++) {
						g.push(m[f]);
					}
				}
				return (j);
			},
			rowsCopy : function(h, f, e, d, g, c) {
				return this._rowsMove(h, f, e, d, g, c, false);
			},
			rowsMove : function(h, f, e, d, g, c) {
				return this._rowsMove(h, f, e, d, g, c, true);
			},
			selectRows : function(c, f, d, e) {
				c = c || false;
				this.forEach(function(g) {
					        g.setRowSelected(c);
				        }, f, d, e);
			},
			getSelectedCount : function(d) {
				var c = 0;
				this.forEach(function(e) {
					        if (e.isRowSelected()) {
						        c++;
					        }
				        }, null, null, d);
				return c;
			},
			getSelectedRows : function(d) {
				var c = [];
				this.forEach(function(e) {
					        if (e.isRowSelected()) {
						        c.push(this.getRow(e.getIndex(), d));
					        }
				        }, null, null, d, this);
				return c;
			},
			getSelectedRowIndexs : function(d) {
				var c = [];
				this.forEach(function(e) {
					        if (e.isRowSelected()) {
						        c.push(e.getIndex());
					        }
				        }, null, null, d);
				return c;
			},
			getUnSelectedRows : function(d) {
				var c = [];
				this.forEach(function(e) {
					        if (!e.isRowSelected()) {
						        c.push(this.getRow(e.getIndex(), d));
					        }
				        }, null, null, d, this);
				return c;
			},
			getUnSelectedRowIndexs : function(d) {
				var c = [];
				this.forEach(function(e) {
					        if (!e.isRowSelected()) {
						        c.push(e.getIndex());
					        }
				        }, null, null, d);
				return c;
			},
			deleteSelectedRows : function() {
				if (this.applyEvent("onBeforeDeleteSelectedRows", arguments) == false) { return; }
				var d = this["primary"],
					k = this["filter"],
					e = this["delete"];
				var c = [];
				var j;
				for (var f = 0; f < d.length; f++) {
					j = d[f];
					var g = (new unieap.ds.Row(this, j)).isRowSelected();
					if (g) {
						c.push(this.getRow(f));
						var h = d.splice(f, 1);
						e.push(h[0]);
						f--;
					}
				}
				this.applyEvent("onAfterDeleteSelectedRows", [c, this]);
			},
			getRow : function(e, c) {
				var d = this._getBuff(c);
				if (!d[e]) { return null; }
				return new unieap.ds.Row(this, d[e], e);
			},
			getRows : function(f, d, e) {
				var c = [];
				this.forEach(function(g) {
					        c.push(this.getRow(g.getIndex(), f));
				        }, d, e, f, this);
				return c;
			},
			getRowData : function(e, c) {
				var d = this._getBuff(c);
				if ((e == null) || (e < 0) || (e >= d.length)) { return null; }
				return d[e];
			},
			forEach : function(k, j, g, e, h) {
				var m = this._getBuff(e);
				var c = this._getParts(k, j, g, m.length);
				var n = new unieap.ds.Row(this);
				for (var f = c[1], d = c[2]; f < d; f++) {
					n.data = m[f];
					n.index = f;
					c[0].call(h, n, f, this);
				}
			},
			_everyOrSome : function(g, m, k, h, e, j) {
				var n = this._getBuff(e);
				var c = this._getParts(m, k, h, n.length);
				var p = new unieap.ds.Row(this);
				for (var f = c[1], d = c[2]; f < d; f++) {
					p.data = n[f];
					p.index = f;
					var o = !!c[0].call(j, p, f, this);
					if (g ^ o) { return o; }
				}
				return g;
			},
			every : function(g, f, d, e, c) {
				return this._everyOrSome(true, g, f, d, e, c);
			},
			some : function(g, f, d, e, c) {
				return this._everyOrSome(false, g, f, d, e, c);
			},
			forEachFilter : function(m, k, h, e, j) {
				var o = this._getBuff(e);
				var c = this._getParts(m, k, h, o.length);
				var n = new unieap.ds.RowSet();
				var p = new unieap.ds.Row(this), g;
				for (var f = c[1], d = c[2]; f < d; f++) {
					g = o[f];
					p.data = g;
					p.index = f;
					if (c[0].call(j, p, f, this)) {
						n.addRow(g, false, true);
					}
				}
				return n;
			},
			disabledEvent : function() {
				this._stopEvent = true;
			},
			enabledEvent : function() {
				this._stopEvent = false;
			},
			applyEvent : function(c, d) {
				return this._stopEvent || this[c].apply(this, d);
			},
			onItemChanging : function(f, e, d, c) {},
			onItemChanged : function(f, e, d, c) {},
			onBeforeAddRow : function(d, c) {},
			onAfterAddRow : function(d, c) {},
			onBeforeAddRows : function(c) {},
			onAfterAddRows : function(c) {},
			onBeforeDeleteRow : function(d, c) {},
			onAfterDeleteRow : function(d, c) {},
			onBeforeDeleteRows : function(c) {},
			onAfterDeleteRows : function() {},
			onBeforeDeleteAllRows : function() {},
			onAfterDeleteAllRows : function() {},
			onBeforeDeleteSelectedRows : function(c, d) {},
			onAfterDeleteSelectedRows : function(c, d) {},
			onBeforeDiscardUpdate : function(c) {},
			onAfterDiscardUpdate : function() {},
			onFilter : function(c) {},
			onSort : function(c) {},
			onResetUpdate : function(c) {},
			_getBuff : function(c) {
				return (c == a.DELETE ? this["delete"] : (c == a.FILTER
				        ? this["filter"]
				        : this["primary"]));
			},
			_buildRow : function(f, j, h, g) {
				if (f == null) {
					f = {};
				} else {
					if (j) {
						f = this._cloneRow(f, h);
					}
				}
				if (g != false) {
					var d = this.getMetaData();
					if (d) {
						for (var e = 0, c = d.length; e < c; e++) {
							if (f[d[e].getName()] == null && d[e].getDefaultValue() != null) {
								f[d[e].getName()] = d[e].getDefaultValue();
							}
						}
					}
				}
				return f;
			},
			_cloneRow : function(e, c) {
				c = c || false;
				var f = dojo.clone(e) || {};
				if (!c) {
					delete f._t;
					delete f._s;
					delete f._o;
				}
				return f;
			},
			_getParts : function(c, f, g, d) {
				return [(typeof c == "string" ? (new Function("row", "index", "rowset", c)) : c),
				        ((f == null) || (f < 0) || (f >= d) ? 0 : f),
				        ((g == null) || (g < 0) || (g > d) ? d : g)];
			},
			sorts : function(e, g) {
				if (!dojo.isArray(e)) {
					e = [e];
				}
				for (var c = e.length - 1; c >= 0; c--) {
					var f = e[c];
					this.sort(f.name, f.asc || 1, f.dataType, g);
				}
			},
			sort : function(e, g, d, h) {
				if (!d) {
					var c = this.getMetaData(e);
					if (c) {
						d = unieap.getDataType(c.getDataType());
					}
				}
				var f;
				if (d == "number" || d == "date") {
					f = function(j, i) {
						if (j[e] == null) { return g * 1; }
						if (i[e] == null) { return g * -1; }
						j = Number(j[e]);
						i = Number(i[e]);
						return g * (j - i);
					};
				} else {
					f = function(j, i) {
						return g * ((j[e] + "").localeCompare(i[e] + ""));
					};
				}
				this._getBuff(h).sort(f);
				this.applyEvent("onSort", [this]);
			},
			sum : function(c, e, f) {
				this._isNumberType(c);
				var d = 0;
				this.forEach(function(h) {
					        var g = h.data[c];
					        if (g != null) {
						        d += Number(g, 10);
					        }
				        }, null, null, f);
				if (e != null) {
					dojo.require("dojo.number");
					dojo.require("unieap.patch.number");
					d = dojo.number.format(d, {
						        pattern : e
					        });
				}
				return d;
			},
			max : function(c, d) {
				return this._mm(c, "max", d);
			},
			min : function(c, d) {
				return this._mm(c, "min", d);
			},
			_mm : function(f, e, g) {
				this._isNumberType(f);
				var d = "";
				var c = [];
				this.forEach(function(i) {
					        var h = i.data[f];
					        if (h != null) {
						        c.push(h);
					        }
				        }, null, null, g);
				if (!unieap.isEmpty(c)) {
					d = Math[e].apply(Math, c);
					d = window.isNaN(d) ? "" : d;
				}
				return d;
			},
			avg : function(d, f, g) {
				if (this._getBuff(g).length == 0) { return 0; }
				var e = this.sum(d, null, g);
				var c = e / this._getBuff(g).length;
				if (f != null) {
					dojo.require("dojo.number");
					dojo.require("unieap.patch.number");
					c = dojo.number.format(c, {
						        pattern : f
					        });
				}
				return c;
			},
			_isNumberType : function(d) {
				var c = this.getMetaData(d);
				if (c) {
					if (unieap.getDataType(c.getDataType()) != "number") { throw new Error("Don't support to calc string"); }
					return c.getDataType();
				}
			},
			doFilter : function(c, d, l, k) {
				var f = this._getBuff(a.PRIMARY),
					e = this._getBuff(a.FILTER);
				if (c == null) {
					Array.prototype.push.apply(f, e.splice(0, e.length));
					this.applyEvent("onFilter", [this]);
					return;
				}
				var h = arguments[0];
				if (arguments.length > 1) {
					h = {
						name : c,
						relation : d,
						value : l,
						ignoreCase : k,
						dataFormat : k
					};
				}
				var j = this._getApplyFilter(h);
				for (var g = f.length - 1; g >= 0; g--) {
					if (!j(f[g])) {
						e.unshift(f.splice(g, 1)[0]);
					}
				}
				this.applyEvent("onFilter", [this]);
			},
			getSatisfiedFilterRows : function(h) {
				var g = this._getBuff(a.PRIMARY),
					e = this._getApplyFilter(h),
					c = [];
				for (var f = 0, d = g.length; f < d; f++) {
					if (e(g[f])) {
						c.push(f);
					}
				}
				return c;
			},
			doClassifyFilter : function(g, f, e) {
				Array.prototype.push.apply(f, e.splice(0, e.length));
				var c = this._getApplyFilter(g);
				for (var d = f.length - 1; d >= 0; d--) {
					if (!c(f[d])) {
						e.unshift(f.splice(d, 1)[0]);
					}
				}
			},
			_getApplyFilter : function(h) {
				var f = this,
					d = function(m) {
						var l = f._getDataType(m.name, m.value);
						if (m.value != null) {
							if (m.relation == "like") {
								m.value = new RegExp(m.value, "i");
							} else {
								if (m.value instanceof Date) {
									m.value = m.value.getTime();
									l = "date";
								}
								if (l == "date") {
									m.place = unieap.getRelativeTimePlace(m.dataFormat);
									m.value = unieap.getRelativeTime(m.value, m.place);
								}
							}
						}
						m.compare = unieap.getCompare(l, m.relation).compare;
					};
				var i = h.pattern || "&&",
					e = (i == "&&" || i == "||") ? [] : null,
					g = h.condition || (unieap.getLength(h) > 1 ? {
						firstCondition : h
					} : h);
				for (var c in g) {
					e && e.push(" ${".concat(c).concat("} "));
					d(g[c]);
				}
				e && (i = e.join(i));
				var k = {
					judge : function(m, l) {
						var n = g[l];
						return n.compare(m[n.name], n.value, n.place || n.ignoreCase);
					}
				};
				for (var c in g) {
					var j = new RegExp("\\$\\{".concat(c).concat("\\}"), "g");
					i = i.replace(j, 'this.judge(context,"' + c + '")');
				}
				return dojo.hitch(k, new Function("var context=arguments[0]; return (" + i + ")"));
			},
			_getDataType : function(d, e) {
				var c = this.getMetaData(d);
				if (c) { return unieap.getDataType(c.getDataType()); }
				if (typeof e == "number") {
					return "number";
				} else {
					return "string";
				}
			},
			getMetaData : function(d) {
				var c = this._dataStore && this._dataStore.getMetaData(d) || null;
				return c;
			},
			getName : function() {
				var c = this.getDataStore();
				if (!c) { return ""; }
				var d = c.getStatementName();
				if (d && d != "") { return d; }
				return c.getRowSetName();
			},
			setDataStore : function(c) {
				this._dataStore = c;
			},
			getDataStore : function() {
				return this._dataStore;
			},
			updateRow : function(e, c) {
				var d = this._getBuff();
				if (d[e]) {
					d[e] = dojo.mixin(c.getData(), {
						        _s : d[e]._s ? true : false
					        });
					return true;
				}
				return false;
			},
			setItemValue : function(f, c, d, e) {
				this.getRow(f, e).setItemValue(c, d);
			},
			setDate : function(f, c, d, e) {
				if (d instanceof Date) {
					d = d.getTime();
				}
				this.getRow(f, e).setItemValue(c, d);
			},
			getItemValue : function(e, c, d) {
				return this.getRow(e, d).getItemValue(c);
			},
			getDate : function(f, c, e) {
				var d = this.getRow(f, e).getItemValue(c);
				return d ? new Date(parseInt(d, 10)) : null;
			},
			getInt : function(f, c, e) {
				var d = this.getRow(f, e).getItemValue(c);
				return d ? parseInt(d, 10) : null;
			},
			getFloat : function(f, c, e) {
				var d = this.getRow(f, e).getItemValue(c);
				return d ? parseFloat(d, 10) : null;
			},
			getItemOrigValue : function(e, c, d) {
				return this.getRow(e, d).getItemOrigValue(c);
			},
			getRowStatus : function(d, c) {
				return this.getRow(d, c).getRowStatus();
			},
			setRowStatus : function(e, c, d) {
				this.getRow(e, d).setRowStatus(c);
			},
			isRowSelected : function(d, c) {
				return this.getRow(d, c).isRowSelected();
			},
			setRowSelected : function(e, c, d) {
				this.getRow(e, d).setRowSelected(c);
			},
			clear : function(d, c) {
				this.getRow(d, c).clear(d);
			},
			collect : function(d) {
				var c = new unieap.ds.RowSet();
				switch (d) {
					case "auto" :
						this._collectAuto(c);
						break;
					case "none" :
						this._collectNone(c);
						break;
					case "all" :
						this._collectAll(c);
						break;
					case "update" :
						this._collectUpdate(c);
						break;
					case "delete" :
						this._collectDelete(c);
						break;
					case "insert" :
						this._collectInsert(c);
						break;
					case "select" :
						this._collectSelect(c);
						break;
					default :
						if (dojo.isFunction(d)) {
							this._collectCallback(c, d);
						}
						break;
				}
				c.setDataStore(this.getDataStore());
				return c;
			},
			_collectAll : function(c) {
				c.primary = this["primary"];
				c.filter = this["filter"];
				c["delete"] = this["delete"];
			},
			_collectNone : function(c) {
				c.primary = [];
				c.filter = [];
				c["delete"] = [];
			},
			_collectAuto : function(c) {
				var d = function(e) {
					if (e.getRowStatus() == b.DATAMODIFIED || e.getRowStatus() == b.NEWMODIFIED) { return true; }
					return false;
				};
				this._collectBuffer(c, d, a.PRIMARY);
				this._collectBuffer(c, d, a.FILTER);
				this._collectDelete(c);
			},
			_collectDelete : function(c) {
				this._collectBuffer(c, function(d) {
					        if (d.getRowStatus() != b.NEWMODIFIED) { return true; }
					        return false;
				        }, a.DELETE);
			},
			_collectUpdate : function(c) {
				var d = function(e) {
					if (e.getRowStatus() == b.DATAMODIFIED) { return true; }
					return false;
				};
				this._collectBuffer(c, d, a.PRIMARY);
				this._collectBuffer(c, d, a.FILTER);
			},
			_collectInsert : function(c) {
				var d = function(e) {
					if (e.getRowStatus() == b.NEWMODIFIED) { return true; }
					return false;
				};
				this._collectBuffer(c, d, a.PRIMARY);
				this._collectBuffer(c, d, a.FILTER);
			},
			_collectSelect : function(c) {
				var d = function(e) {
					if (e.isRowSelected()) { return true; }
					return false;
				};
				this._collectBuffer(c, d, a.PRIMARY);
				this._collectBuffer(c, d, a.FILTER);
				this._collectBuffer(c, d, a.DELETE);
			},
			_collectCallback : function(c, d) {
				this._collectBuffer(c, d, a.PRIMARY);
				this._collectBuffer(c, d, a.FILTER);
				this._collectBuffer(c, d, a.DELETE);
			},
			_collectBuffer : function(d, h, g) {
				var c = d._getBuff(g);
				try {
					this.forEach(function(e) {
						        if (h(e, g)) {
							        c.push(e.getData());
						        }
					        }, null, null, g);
				}
				catch (f) {}
			},
			doPrimaryKey : function(g) {
				if (arguments.length < 1) { return; }
				var f = {},
					d = arguments,
					c = new Array(),
					k = this._getBuff(),
					e = (arguments.length == 1) && function(i) {
						return i[g];
					} || function(n) {
						var m = [];
						for (var l = d.length - 1; l >= 0; l--) {
							m.push(n[d[l]]);
						}
						return m.join("_");
					};
				for (var j = k.length - 1; j >= 0; j--) {
					var h = e(k[j]);
					f[h] && c.push(k.splice(j, 1)[0]) || (f[h] = 1);
				}
				return c;
			},
			append : function(d, f) {
				if (this == d) { return; }
				switch (f) {
					case "replace" :
						this["primary"] = d.primary;
						this["filter"] = d.filter;
						this["delete"] = d["delete"];
						this.initialCount = this["primary"].length;
						break;
					case "append" :
						Array.prototype.push.apply(this["primary"], d.primary);
						Array.prototype.push.apply(this["filter"], d.filter);
						Array.prototype.push.apply(this["delete"], d["delete"]);
						this.initialCount += d.primary.length;
						break;
					case "union" :
						if (this["primary"].length == d.primary.length) {
							for (var c = 0, e; (e = this["primary"][c]); c++) {
								dojo.mixin(e, d.primary[c]);
							}
						}
				}
			},
			clone : function() {
				var c = dojo.fromJson(this.toJson());
				var d = new unieap.ds.RowSet(c);
				return d;
			},
			generateTreeSet : function(g) {
				var d = this["primary"],
					k = {}, m, e, n,
					c = g.id,
					j = g.parent,
					h = g.props;
				for (var f = 0; (m = d[f]); f++) {
					e = m[c];
					n = m[j] == null ? null : m[j];
					(k[e] || (k[e] = {}))["data"] = m;
					for (var l in h) {
						k[e][l] = h[l];
					}
					if (!k[n]) {
						k[n] = {};
					}
					if (!k[n]["children"]) {
						k[n]["children"] = [];
					}
					k[n]["children"].push(k[e]);
				}
				if (!k[g.root]) { return {}; }
				if (!("data" in k[g.root])) {
					(k[g.root]["data"] = {})[c] = g.root;
				}
				return k[g.root];
			}
		});
	})();
}
/* /unieap/ria3.3/unieap/ds.js */
if (!dojo._hasResource["unieap.ds"]) {
	dojo._hasResource["unieap.ds"] = true;
	dojo.provide("unieap.ds");
	dojo.require("unieap.ds.Constants");
	dojo.require("unieap.ds.Row");
	dojo.require("unieap.ds.RowSet");
	dojo.require("unieap.ds.MetaData");
	dojo.require("unieap.ds.DataStore");
	dojo.require("unieap.ds.DataCenter");
}
/* /unieap/ria3.3/unieap/rpc.js */
if (!dojo._hasResource["unieap.rpc"]) {
	dojo._hasResource["unieap.rpc"] = true;
	dojo.provide("unieap.rpc");
	dojo.require("unieap.ds");
	dojo.require("unieap.util.util");
	dojo.declare("unieap.Action", null);
	unieap.riaPath = dojo.moduleUrl("");
	unieap.dbDialect = "drm";
	if (!window.dataCenter) {
		dataCenter = new unieap.ds.DataCenter();
	}
	if (!window.currentDataCenter) {
		currentDataCenter = null;
	}
	unieap.buildRequestPath = function(b, c) {
		var d = [];
		for (var a in c) {
			d.push(a + "=" + encodeURIComponent(c[a]));
		}
		if (d.length == 0) { return b; }
		d = d.join("&");
		return b.concat(b.lastIndexOf("?") > 0 ? "&" : "?").concat(d);
	};
	_timeoutProcess = function(d, f, b, c) {
		if (dojo.isString(d) && d.match(unieap.session.timeout) && f.sessionout != false) {
			if (unieap.session.dialogRelogin) {
				dojo.require("unieap.dialog.DialogUtil");
				var e = unieap.appPath.substring(unieap.WEB_APP_NAME.length + 1);
				DialogUtil.showDialog({
					        url : unieap.WEB_APP_NAME + "/login.do?method=relogin",
					        dialogData : {
						        j_application : e
					        },
					        width : "563",
					        height : "318",
					        resizable : false,
					        isExpand : false,
					        isClose : false,
					        title : RIA_I18N.rpc.sessionOut,
					        onComplete : function(g) {
						        if (g == "success") {
							        unieap.Action.requestData(f, b, c);
						        }
					        }
				        });
			} else {
				var a = unieap.getTopWin();
				a.location = a.location;
			}
			return true;
		}
		return false;
	};
	_exceptionProcess = function(b, d, c, a) {
		if (c.getCode() < 0) {
			dojo.require("unieap.dialog.MessageBox");
			MessageBox.alert({
				        title : RIA_I18N.rpc.errorTip,
				        message : c.getTitle() || RIA_I18N.rpc.errorMessage,
				        onComplete : function() {
					        if (d.error) {
						        d.context ? d.error.call(d.context, c) : d.error(c);
					        }
				        }
			        });
			return true;
		}
		dataCenter.append(c, d.coverage || "discard");
		if (c.getCode() > 0) {
			dojo.require("unieap.dialog.MessageBox");
			MessageBox.alert({
				        title : RIA_I18N.rpc.success,
				        message : c.getTitle() || RIA_I18N.rpc.successMessage,
				        onComplete : a
			        });
			return true;
		}
		return false;
	};
	dojo.mixin(unieap.Action, {
		CODELISTURL : "/rpc.do?method=getCodeList",
		MULTICODELISTURL : "/rpc.do?method=getMultiCodeList",
		QUERYURL : "/rpc.do?method=doQuery",
		COUNTURL : "/rpc.do?method=doCount",
		UPDATEURL : "/rpc.do?method=doUpdate",
		PRINTURL : "/rpc.do?method=doPrint",
		EXPORTURL : "/rpc.do?method=doExport",
		GINDIVIDUALURL : "/rpc.do?method=getIndividual",
		SINDIVIDUALURL : "/rpc.do?method=setIndividual",
		CACHEURL : "/rpc.do?method=loadCacheData",
		requestData : function(f, a, b) {
			var e = unieap.buildRequestPath(f.url, f.parameters);
			var c = a && a.toJson ? a.toJson() : String(a || "");
			var d = null;
			if (!f.sync && b != false) {
				unieap.showLoading(true);
			}
			if (unieap.isEncrypt == true) {
				dojo.require("unieap.util.encrypt");
				var g = hex_sha1(escape(c).toLowerCase());
				f.headers = f.headers || {};
				f.headers.digest = g;
			}
			dojo.rawXhrPost({
				        url : e,
				        sync : f.sync,
				        preventCache : (f.preventCache ? f.preventCache : true),
				        timeout : ((f.timeout) ? f.timeout : 120 * 1000),
				        headers : dojo.mixin({
					                ajaxRequest : true
				                }, f.headers, {
					                "Content-Type" : "application/json"
				                }),
				        postData : c,
				        load : function(l, i) {
					        var j = l;
					        if (!f.sync && b != false) {
						        unieap.showLoading(false);
					        }
					        try {
						        j = dojo.fromJson(l);
					        }
					        catch (k) {}
					        if (_timeoutProcess(j, f, a, b)) { return; }
					        function h() {
						        if (f.load) {
							        try {
								        f.context ? f.load.call(f.context, d, i.xhr) : f.load(d,
								                i.xhr);
							        }
							        catch (m) {
								        alert(RIA_I18N.rpc.loadError + "\n " + dojo.toJson(m, true));
							        }
						        }
					        }
					        try {
						        j.body.dataStores;
						        d = new unieap.ds.DataCenter(j);
						        if (_exceptionProcess(j, f, d, h)) { return; }
					        }
					        catch (k) {
						        d = j;
					        }
					        h();
				        },
				        error : function(j, i) {
					        var h = j.responseText;
					        if (!f.sync && b != false) {
						        unieap.showLoading(false);
					        }
					        if (_timeoutProcess(h, f, a, b)) { return; }
					        if (f.error) {
						        f.context ? f.error.call(f.context, h, i.xhr) : f.error(h, i.xhr);
					        }
				        }
			        });
			if (f.sync) { return d; }
		},
		getCodeList : function(b) {
			if (!b) { return; }
			var c = unieap.getDataStore(b, dataCenter, true);
			if (c) { return c; }
			var a = new unieap.ds.DataCenter();
			a.setParameter("store", b);
			unieap.Action.requestData({
				        url : unieap.WEB_APP_NAME + this.CODELISTURL,
				        sync : true,
				        load : function(d) {
					        c = d.getSingleDataStore();
					        if (c) {
						        var f = c.getName();
						        var e = d.getParameter(f);
						        unieap.setDataStore(c, dataCenter, true, e);
					        }
				        }
			        }, a);
			return c;
		},
		getMultiCodeList : function(a, f) {
			if (!a || unieap.isEmpty(a = unieap.array_unique(a))) {
				f && f();
			} else {
				var b = new unieap.ds.DataCenter();
				var c = [];
				for (var d = 0; d < a.length; d++) {
					var e = unieap.getDataStore(a[d], dataCenter, true);
					if (!e) {
						c.push(a[d]);
					} else {
						b.addDataStore(e);
					}
				}
				if (c.length == 0) {
					f && f(b);
				} else {
					if (c.length > 0) {
						b.setParameter("stores", a);
						unieap.Action.requestData({
							        url : unieap.WEB_APP_NAME + this.MULTICODELISTURL,
							        sync : true,
							        load : function(h) {
								        if (h == "") { return; }
								        var g = h.getDataStores();
								        for (var j in g) {
									        var i = h.getParameter(j);
									        unieap.setDataStore(h.getDataStore(j), dataCenter,
									                true, i);
								        }
								        f && f(h);
							        },
							        error : function() {
								        f && f();
							        }
						        }, b);
					}
				}
			}
		},
		doQuery : function(c, a) {
			var b = new unieap.ds.DataCenter();
			var d = c.collect("none");
			b.addDataStore(d);
			a = a || {};
			a.synCount = a.synCount != false;
			b.setParameter("synCount", String(a.synCount));
			if (a.onBeforeQuery && a.onBeforeQuery(b, a) == false) { return; }
			var e = unieap.WEB_APP_NAME + (a.url ? a.url : unieap.Action.QUERYURL);
			e = unieap.buildRequestPath(e, a.parameters);
			unieap.Action.requestData({
				        url : e,
				        sync : a.sync != false,
				        load : function(f) {
					        var g = f.getSingleDataStore();
					        a.load && a.load(g, f);
					        if (!a.synCount) {
						        f = new unieap.ds.DataCenter();
						        f.addDataStore(g.collect("none"));
						        e = unieap.WEB_APP_NAME
						                + (a.countUrl ? a.countUrl : unieap.Action.COUNTURL);
						        e = unieap.buildRequestPath(e, a.parameters);
						        unieap.Action.requestData({
							                url : e,
							                load : function(h) {
								                var j = h.getSingleDataStore();
								                var i = dataCenter.getDataStore(j.getName());
								                i.append(j, "updateProps");
							                }
						                }, f);
					        }
				        },
				        error : function(f) {
					        a.error && a.error(f);
				        }
			        }, b);
		},
		doUpdate : function(c, a) {
			var b = new unieap.ds.DataCenter();
			var d = c.collect("auto");
			b.addDataStore(d);
			a = a || {};
			if (a.onBeforeSubmit && a.onBeforeSubmit(b) == false) { return; }
			var e = unieap.WEB_APP_NAME + (a.url ? a.url : this.UPDATEURL);
			e = unieap.buildRequestPath(e, a.parameters);
			unieap.Action.requestData({
				        url : e,
				        load : function(f) {
					        c.getRowSet().resetUpdate();
					        a.load && a.load(f);
				        },
				        error : function(f) {
					        a.error && a.error(f);
				        }
			        }, b);
		},
		doPrint : function(a) {
			var c = unieap.WEB_APP_NAME + (a.url ? a.url : this.PRINTURL);
			c = unieap.buildRequestPath(c, a.parameters);
			if (!a.layout) {
				alert(RIA_I18N.rpc.layoutInfoEmpty);
				return;
			}
			var b = new unieap.ds.DataCenter();
			var d = a.store;
			if (!d.getRowSetName()) {
				dojo.require("unieap.dialog.MessageBox");
				MessageBox.alert({
					        type : "warn",
					        yesStr : RIA_I18N.rpc.confirmButton,
					        title : RIA_I18N.rpc.info,
					        message : RIA_I18N.rpc.printError,
					        motion : false
				        });
				return;
			}
			d = d.collect({
				        policy : "none",
				        metaData : true
			        });
			d.setPageSize(-1);
			b.setParameter("layout", a.layout);
			a.unitedCells && b.setParameter("unitedCells", a.unitedCells);
			b.addDataStore(d);
			unieap.Action.requestData({
				url : c,
				sync : true,
				load : function(e) {
					var h = dojo.byId("unieap-print-form"), g;
					if (!h) {
						if (dojo.isIE) {
							g = dojo
							        .create("<iframe name='printIframe' style='border:0px;' width=0 height=0></iframe>");
						} else {
							g = dojo.create("iframe", {
								        name : "printIframe",
								        style : {
									        border : "0px"
								        },
								        width : 0,
								        height : 0
							        });
						}
						dojo.place(g, dojo.body());
						h = dojo.create("form", {
							        id : "unieap-print-form",
							        method : "post",
							        target : "printIframe"
						        });
						dojo.place(h, dojo.body());
						var f = dojo.create("input", {
							        type : "hidden",
							        name : "myAction",
							        value : "rpc.do?method=doPrint"
						        });
						dojo.place(f, h);
						f = dojo.create("input", {
							        type : "hidden",
							        name : "uid",
							        value : ""
						        });
						dojo.place(f, h);
						h.action = unieap.WEB_APP_NAME
						        + "/unieap/pages/report/jsp/show/UniPrint.jsp";
					}
					h.submit();
				}
			}, b, false);
		},
		doExport : function(g) {
			var b = unieap.WEB_APP_NAME + (g.url ? g.url : this.EXPORTURL);
			b = unieap.buildRequestPath(b, g.parameters);
			if (!g.layout) {
				alert(RIA_I18N.rpc.layoutInfoEmpty);
				return;
			}
			var i = new unieap.ds.DataCenter();
			var d = g.store;
			i.setParameter("layout", g.layout);
			g.unitedCells && i.setParameter("unitedCells", g.unitedCells);
			i.setParameter("type", g.type);
			i.setParameter("dsName", d.getName());
			for (var e in g.parameters || {}) {
				i.setParameter(e, g.parameters[e]);
			}
			g.footer && i.setParameter("footer", g.footer);
			g.lockedData && i.addDataStore(new unieap.ds.DataStore("lockedStore", g.lockedData));
			if (g.type == "server") {
				d = d.collect({
					        policy : "none",
					        metaData : true
				        });
				d.setPageSize(-1);
			}
			i.addDataStore(d);
			var c = dojo.byId("unieap_export_form"), f;
			if (!c) {
				if (dojo.isIE) {
					f = dojo
					        .create("<iframe name='exportIframe' style='border:0px' width=0 height=0></iframe>");
				} else {
					f = dojo.create("iframe", {
						        name : "exportIframe",
						        style : {
							        border : "0px"
						        },
						        width : 0,
						        height : 0
					        });
				}
				dojo.place(f, dojo.body());
				c = dojo.create("form", {
					        id : "unieap_export_form",
					        name : "unieap_export_form",
					        method : "post",
					        target : "exportIframe"
				        });
				var h = dojo.create("input", {
					        name : "data",
					        type : "hidden"
				        });
				dojo.place(h, c);
				dojo.place(c, document.body);
			} else {
				h = c.firstChild;
			}
			h.value = i.toJson();
			if (unieap.isEncrypt) {
				dojo.require("unieap.util.encrypt");
				var a = c.lastChild;
				if (a.getAttribute("name") != "digest") {
					a = dojo.create("input", {
						        type : "hidden",
						        name : "digest"
					        });
					dojo.place(a, c);
				}
				a.value = hex_sha1(escape(h.value).toLowerCase());
			}
			c.action = b;
			c.submit();
		},
		getIndividual : function(b) {
			var a = window["unieap.individual"];
			if (unieap.WEB_APP_NAME == null) { return null; }
			if (!a) {
				unieap.Action.requestData({
					        url : unieap.WEB_APP_NAME + this.GINDIVIDUALURL,
					        parameters : {
						        path : unieap.cmpPath
					        },
					        sync : true,
					        timeout : 5000,
					        load : function(c) {
						        var d = c.getParameter("individual");
						        a = window["unieap.individual"] = d;
					        },
					        error : function(c) {
						        a = {};
						        c.getDetail
						                ? alert(c.getDetail())
						                : alert(RIA_I18N.rpc.getInfoError);
					        }
				        });
			}
			return a[b] || null;
		},
		setIndividual : function(a) {
			if (unieap.WEB_APP_NAME == null) {
				a.callback && a.callback();
				return;
			}
			var c = a.data;
			if (!a || !(c instanceof Array)) { return; }
			var d = window["unieap.individual"];
			if (d && (dojo.toJson(d[a.id]) == dojo.toJson(c))) { return; }
			var b = new unieap.ds.DataCenter();
			b.setParameter("individual", c);
			unieap.Action.requestData({
				        url : unieap.WEB_APP_NAME + this.SINDIVIDUALURL,
				        parameters : {
					        id : a.id,
					        path : unieap.cmpPath
				        },
				        preventCache : true,
				        timeout : 5000,
				        load : function(e) {
					        d && (d[a.id] = c);
					        a.callback && a.callback(e);
				        },
				        error : function(e) {
					        e.getDetail ? alert(e.getDetail()) : alert(RIA_I18N.rpc.saveError);
				        }
			        }, b);
		},
		loadCacheData : function(b, e) {
			dojo.require("unieap.cache");
			var d = document.createElement("div");
			d.style.cssText = "position:absolute;bottom:0px;left:0px;overflow:hidden;height:20px;border:1px solid #eee;width:120px;background:#fff;font:12px;";
			d.innerHTML = RIA_I18N.rpc.loadingCache;
			document.body.appendChild(d);
			var a = new unieap.ds.DataCenter();
			if (b == "check") {
				var c = unieap.cache.getAllTimeStamps();
				a.setParameter("timeStamps", c);
			}
			unieap.Action.requestData({
				        url : unieap.WEB_APP_NAME + this.CACHEURL,
				        sync : false,
				        parameters : {
					        mode : b
				        },
				        load : function(f) {
					        var k = f.getParameter("timeStamps");
					        var i = [];
					        var g = [];
					        var l = [];
					        for (var h in f.dataStores) {
						        var j = f.dataStores[h];
						        i.push(h);
						        g.push(j.getRowSet().toBufJson("primary"));
						        l.push(k[h]);
					        }
					        unieap.cache.putMultiple(i, g, l);
					        d.style.visibility = "hidden";
					        e && e();
				        },
				        timeout : 5000,
				        error : function(f) {
					        d.innerHTML = RIA_I18N.rpc.loadCacheError;
				        }
			        }, a, false);
		},
		upload : function(c) {
			dojo.require("dojo.io.iframe");
			c.parameters = c.parameters || {};
			var b = null;
			var a = c.url || "";
			a = unieap.buildRequestPath(a, {
				        ajaxRequest : true
			        });
			dojo.io.iframe.send({
				        url : a || "",
				        handleAs : "json",
				        form : c.form || "",
				        timeout : c.timeout || 1000 * 120,
				        content : c.parameters,
				        load : function(h, f) {
					        var g = h;
					        try {
						        g = dojo.fromJson(h);
					        }
					        catch (i) {}
					        function d() {
						        if (c.load) {
							        try {
								        c.context ? c.load.call(c.context, b, f.xhr) : c.load(b,
								                f.xhr);
							        }
							        catch (j) {
								        alert(RIA_I18N.rpc.loadError + "\n " + dojo.toJson(j, true));
							        }
						        }
					        }
					        try {
						        g.body.dataStores;
						        b = new unieap.ds.DataCenter(g);
						        if (_exceptionProcess(g, c, b, d)) { return; }
					        }
					        catch (i) {
						        b = g;
					        }
					        d();
				        },
				        error : function(e, d) {
					        c.error && dojo.hitch(c, c.error(e, d));
				        }
			        });
		}
	});
}
/* /unieap/ria3.3/unieap/clientCache/localStorage.js */
dojo.require("unieap.global");
dojo.require("unieap.util.util");
dojo.provide("unieap.clientCache.localStorage");
dojo.declare("unieap.clientCache", null, {
	        DB_NAME : "com_neusoft_unieap_clientCache_",
	        constructor : function(a) {
		        dojo.mixin(this, a);
	        },
	        isAvailable : function() {
		        return unieap.global.isUseClientCache && ("localStorage" in window)
		                && window.localStorage !== null && window.localStorage !== undefined;
	        },
	        clear : function() {
		        if (!this.isAvailable()) { return; }
		        var b = this.getKeys();
		        for (var a = 0; a < b.length; a++) {
			        key = b[a];
			        window.localStorage.removeItem(key);
		        }
	        },
	        put : function(a, c, b) {
		        if (!this.isAvailable()) { return; }
		        var d,
			        e = {};
		        e.value = c;
		        e.timestamp = b || 1;
		        d = this.DB_NAME + a;
		        var c = dojo.toJson(e);
		        window.localStorage.setItem(d, c);
	        },
	        remove : function(a) {
		        var b = this.DB_NAME + a;
		        window.localStorage.removeItem(b);
	        },
	        putMultiple : function(e, b, a) {
		        if (!this.isAvailable()) { return; }
		        var d, g, f;
		        for (var c = j = k = 0; c < e.length; c++) {
			        d = e[c];
			        g = b[j];
			        f = a && a[k] || 1;
			        this.put(d, g, f);
			        j++;
			        k++;
		        }
	        },
	        get : function(b) {
		        if (!this.isAvailable() || b == null) { return; }
		        var a, c, d;
		        d = this.DB_NAME + b;
		        a = window.localStorage.getItem(d);
		        c = dojo.fromJson(a);
		        return (c == null ? null : c.value);
	        },
	        getKeys : function() {
		        if (!this.isAvailable()) { return; }
		        var b,
			        c = [];
		        for (var a = 0; a < window.localStorage.length; a++) {
			        b = window.localStorage.key(a);
			        if (b.indexOf(this.DB_NAME) > -1) {
				        c.push(b);
			        }
		        }
		        return c;
	        },
	        getCount : function() {
		        if (!this.isAvailable()) { return; }
		        var b,
			        c = 0;
		        for (var a = 0; a < window.localStorage.length; a++) {
			        b = window.localStorage.key(a);
			        if (b.indexOf(this.DB_NAME) > -1) {
				        c++;
			        }
		        }
		        return c;
	        },
	        getAllTimeStamps : function() {
		        if (!this.isAvailable()) { return; }
		        var d, c, g, f,
			        a = {};
		        var e = this.getKeys();
		        for (var b = 0; b < e.length; b++) {
			        d = e[b];
			        c = window.localStorage.getItem(d);
			        g = dojo.fromJson(c);
			        f = parseInt(g.timestamp);
			        if (f > 2649600000) {
				        a[d] = f;
			        }
		        }
		        return a;
	        }
        });
/* /unieap/ria3.3/unieap/cache.js */
dojo.require("unieap.global");
dojo.require("unieap.util.util");
dojo.provide("unieap.cache");
(function() {
	var a = ("localStorage" in window) && window.localStorage !== null
	        && window.localStorage !== undefined;
	if (a) {
		dojo.require("unieap.clientCache.localStorage");
	} else {
		dojo.require("unieap.clientCache.googlegear");
	}
	unieap.cache = new unieap.clientCache();
})();
/* /unieap/ria3.3/unieap/patch/number.js */
if (!dojo._hasResource["unieap.patch.number"]) {
	dojo._hasResource["unieap.patch.number"] = true;
	dojo.provide("unieap.patch.number");
	dojo.require("dojo.number");
	dojo.number._applyPattern = function(f, e, i) {
		i = i || {};
		var g = i.customs.group;
		var b = i.customs.decimal;
		var a = e.split(";");
		var h = a[0];
		e = a[(f < 0) ? 1 : 0] || ("-" + h);
		if (e.indexOf("%") != -1) {
			f = f.toString().movePoint(2);
		} else {
			if (e.indexOf("\u2030") != -1) {
				f = f.toString().movePoint(3);
			} else {
				if (e.indexOf("\u00a4") != -1) {
					g = i.customs.currencyGroup || g;
					b = i.customs.currencyDecimal || b;
					e = e.replace(/\u00a4{1,3}/, function(j) {
						        var k = ["symbol", "currency", "displayName"][j.length - 1];
						        return i[k] || i.currency || "";
					        });
				} else {
					if (e.indexOf("E") != -1) { throw new Error("exponential notation not supported"); }
				}
			}
		}
		var d = dojo.number._numberPatternRE;
		var c = h.match(d);
		if (!c) { throw new Error("unable to find a number expression in pattern: " + e); }
		if (i.fractional === false) {
			i.places = 0;
		}
		return e.replace(d, dojo.number._formatAbsolute(f, c[0], {
			                decimal : b,
			                group : g,
			                places : i.places,
			                round : i.round
		                }));
	};
}
/* /unieap/ria3.3/unieap/util/spell.js */
if (!dojo._hasResource["unieap.util.spell"]) {
	dojo._hasResource["unieap.util.spell"] = true;
	dojo.provide("unieap.util.spell");
	var strChineseFirstPY = [
	        "YDYQSXMWZSSXJBYMGCCZQPSSQBYCDSCDQLDYLYBSSJGYZZJJFKCCLZDHWDWZJLJPFYYNWJJTMYHZWZHFLZPPQHGSCYYYNJQYXXGJ",
	        "HHSDSJNKKTMOMLCRXYPSNQSECCQZGGLLYJLMYZZSECYKYYHQWJSSGGYXYZYJWWKDJHYCHMYXJTLXJYQBYXZLDWRDJRWYSRLDZJPC",
	        "BZJJBRCFTLECZSTZFXXZHTRQHYBDLYCZSSYMMRFMYQZPWWJJYFCRWFDFZQPYDDWYXKYJAWJFFXYPSFTZYHHYZYSWCJYXSCLCXXWZ",
	        "ZXNBGNNXBXLZSZSBSGPYSYZDHMDZBQBZCWDZZYYTZHBTSYYBZGNTNXQYWQSKBPHHLXGYBFMJEBJHHGQTJCYSXSTKZHLYCKGLYSMZ",
	        "XYALMELDCCXGZYRJXSDLTYZCQKCNNJWHJTZZCQLJSTSTBNXBTYXCEQXGKWJYFLZQLYHYXSPSFXLMPBYSXXXYDJCZYLLLSJXFHJXP",
	        "JBTFFYABYXBHZZBJYZLWLCZGGBTSSMDTJZXPTHYQTGLJSCQFZKJZJQNLZWLSLHDZBWJNCJZYZSQQYCQYRZCJJWYBRTWPYFTWEXCS",
	        "KDZCTBZHYZZYYJXZCFFZZMJYXXSDZZOTTBZLQWFCKSZSXFYRLNYJMBDTHJXSQQCCSBXYYTSYFBXDZTGBCNSLCYZZPSAZYZZSCJCS",
	        "HZQYDXLBPJLLMQXTYDZXSQJTZPXLCGLQTZWJBHCTSYJSFXYEJJTLBGXSXJMYJQQPFZASYJNTYDJXKJCDJSZCBARTDCLYJQMWNQNC",
	        "LLLKBYBZZSYHQQLTWLCCXTXLLZNTYLNEWYZYXCZXXGRKRMTCNDNJTSYYSSDQDGHSDBJGHRWRQLYBGLXHLGTGXBQJDZPYJSJYJCTM",
	        "RNYMGRZJCZGJMZMGXMPRYXKJNYMSGMZJYMKMFXMLDTGFBHCJHKYLPFMDXLQJJSMTQGZSJLQDLDGJYCALCMZCSDJLLNXDJFFFFJCZ",
	        "FMZFFPFKHKGDPSXKTACJDHHZDDCRRCFQYJKQCCWJDXHWJLYLLZGCFCQDSMLZPBJJPLSBCJGGDCKKDEZSQCCKJGCGKDJTJDLZYCXK",
	        "LQSCGJCLTFPCQCZGWPJDQYZJJBYJHSJDZWGFSJGZKQCCZLLPSPKJGQJHZZLJPLGJGJJTHJJYJZCZMLZLYQBGJWMLJKXZDZNJQSYZ",
	        "MLJLLJKYWXMKJLHSKJGBMCLYYMKXJQLBMLLKMDXXKWYXYSLMLPSJQQJQXYXFJTJDXMXXLLCXQBSYJBGWYMBGGBCYXPJYGPEPFGDJ",
	        "GBHBNSQJYZJKJKHXQFGQZKFHYGKHDKLLSDJQXPQYKYBNQSXQNSZSWHBSXWHXWBZZXDMNSJBSBKBBZKLYLXGWXDRWYQZMYWSJQLCJ",
	        "XXJXKJEQXSCYETLZHLYYYSDZPAQYZCMTLSHTZCFYZYXYLJSDCJQAGYSLCQLYYYSHMRQQKLDXZSCSSSYDYCJYSFSJBFRSSZQSBXXP",
	        "XJYSDRCKGJLGDKZJZBDKTCSYQPYHSTCLDJDHMXMCGXYZHJDDTMHLTXZXYLYMOHYJCLTYFBQQXPFBDFHHTKSQHZYYWCNXXCRWHOWG",
	        "YJLEGWDQCWGFJYCSNTMYTOLBYGWQWESJPWNMLRYDZSZTXYQPZGCWXHNGPYXSHMYQJXZTDPPBFYHZHTJYFDZWKGKZBLDNTSXHQEEG",
	        "ZZYLZMMZYJZGXZXKHKSTXNXXWYLYAPSTHXDWHZYMPXAGKYDXBHNHXKDPJNMYHYLPMGOCSLNZHKXXLPZZLBMLSFBHHGYGYYGGBHSC",
	        "YAQTYWLXTZQCEZYDQDQMMHTKLLSZHLSJZWFYHQSWSCWLQAZYNYTLSXTHAZNKZZSZZLAXXZWWCTGQQTDDYZTCCHYQZFLXPSLZYGPZ",
	        "SZNGLNDQTBDLXGTCTAJDKYWNSYZLJHHZZCWNYYZYWMHYCHHYXHJKZWSXHZYXLYSKQYSPSLYZWMYPPKBYGLKZHTYXAXQSYSHXASMC",
	        "HKDSCRSWJPWXSGZJLWWSCHSJHSQNHCSEGNDAQTBAALZZMSSTDQJCJKTSCJAXPLGGXHHGXXZCXPDMMHLDGTYBYSJMXHMRCPXXJZCK",
	        "ZXSHMLQXXTTHXWZFKHCCZDYTCJYXQHLXDHYPJQXYLSYYDZOZJNYXQEZYSQYAYXWYPDGXDDXSPPYZNDLTWRHXYDXZZJHTCXMCZLHP",
	        "YYYYMHZLLHNXMYLLLMDCPPXHMXDKYCYRDLTXJCHHZZXZLCCLYLNZSHZJZZLNNRLWHYQSNJHXYNTTTKYJPYCHHYEGKCTTWLGQRLGG",
	        "TGTYGYHPYHYLQYQGCWYQKPYYYTTTTLHYHLLTYTTSPLKYZXGZWGPYDSSZZDQXSKCQNMJJZZBXYQMJRTFFBTKHZKBXLJJKDXJTLBWF",
	        "ZPPTKQTZTGPDGNTPJYFALQMKGXBDCLZFHZCLLLLADPMXDJHLCCLGYHDZFGYDDGCYYFGYDXKSSEBDHYKDKDKHNAXXYBPBYYHXZQGA",
	        "FFQYJXDMLJCSQZLLPCHBSXGJYNDYBYQSPZWJLZKSDDTACTBXZDYZYPJZQSJNKKTKNJDJGYYPGTLFYQKASDNTCYHBLWDZHBBYDWJR",
	        "YGKZYHEYYFJMSDTYFZJJHGCXPLXHLDWXXJKYTCYKSSSMTWCTTQZLPBSZDZWZXGZAGYKTYWXLHLSPBCLLOQMMZSSLCMBJCSZZKYDC",
	        "ZJGQQDSMCYTZQQLWZQZXSSFPTTFQMDDZDSHDTDWFHTDYZJYQJQKYPBDJYYXTLJHDRQXXXHAYDHRJLKLYTWHLLRLLRCXYLBWSRSZZ",
	        "SYMKZZHHKYHXKSMDSYDYCJPBZBSQLFCXXXNXKXWYWSDZYQOGGQMMYHCDZTTFJYYBGSTTTYBYKJDHKYXBELHTYPJQNFXFDYKZHQKZ",
	        "BYJTZBXHFDXKDASWTAWAJLDYJSFHBLDNNTNQJTJNCHXFJSRFWHZFMDRYJYJWZPDJKZYJYMPCYZNYNXFBYTFYFWYGDBNZZZDNYTXZ",
	        "EMMQBSQEHXFZMBMFLZZSRXYMJGSXWZJSPRYDJSJGXHJJGLJJYNZZJXHGXKYMLPYYYCXYTWQZSWHWLYRJLPXSLSXMFSWWKLCTNXNY",
	        "NPSJSZHDZEPTXMYYWXYYSYWLXJQZQXZDCLEEELMCPJPCLWBXSQHFWWTFFJTNQJHJQDXHWLBYZNFJLALKYYJLDXHHYCSTYYWNRJYX",
	        "YWTRMDRQHWQCMFJDYZMHMYYXJWMYZQZXTLMRSPWWCHAQBXYGZYPXYYRRCLMPYMGKSJSZYSRMYJSNXTPLNBAPPYPYLXYYZKYNLDZY",
	        "JZCZNNLMZHHARQMPGWQTZMXXMLLHGDZXYHXKYXYCJMFFYYHJFSBSSQLXXNDYCANNMTCJCYPRRNYTYQNYYMBMSXNDLYLYSLJRLXYS",
	        "XQMLLYZLZJJJKYZZCSFBZXXMSTBJGNXYZHLXNMCWSCYZYFZLXBRNNNYLBNRTGZQYSATSWRYHYJZMZDHZGZDWYBSSCSKXSYHYTXXG",
	        "CQGXZZSHYXJSCRHMKKBXCZJYJYMKQHZJFNBHMQHYSNJNZYBKNQMCLGQHWLZNZSWXKHLJHYYBQLBFCDSXDLDSPFZPSKJYZWZXZDDX",
	        "JSMMEGJSCSSMGCLXXKYYYLNYPWWWGYDKZJGGGZGGSYCKNJWNJPCXBJJTQTJWDSSPJXZXNZXUMELPXFSXTLLXCLJXJJLJZXCTPSWX",
	        "LYDHLYQRWHSYCSQYYBYAYWJJJQFWQCQQCJQGXALDBZZYJGKGXPLTZYFXJLTPADKYQHPMATLCPDCKBMTXYBHKLENXDLEEGQDYMSAW",
	        "HZMLJTWYGXLYQZLJEEYYBQQFFNLYXRDSCTGJGXYYNKLLYQKCCTLHJLQMKKZGCYYGLLLJDZGYDHZWXPYSJBZKDZGYZZHYWYFQYTYZ",
	        "SZYEZZLYMHJJHTSMQWYZLKYYWZCSRKQYTLTDXWCTYJKLWSQZWBDCQYNCJSRSZJLKCDCDTLZZZACQQZZDDXYPLXZBQJYLZLLLQDDZ",
	        "QJYJYJZYXNYYYNYJXKXDAZWYRDLJYYYRJLXLLDYXJCYWYWNQCCLDDNYYYNYCKCZHXXCCLGZQJGKWPPCQQJYSBZZXYJSQPXJPZBSB",
	        "DSFNSFPZXHDWZTDWPPTFLZZBZDMYYPQJRSDZSQZSQXBDGCPZSWDWCSQZGMDHZXMWWFYBPDGPHTMJTHZSMMBGZMBZJCFZWFZBBZMQ",
	        "CFMBDMCJXLGPNJBBXGYHYYJGPTZGZMQBQTCGYXJXLWZKYDPDYMGCFTPFXYZTZXDZXTGKMTYBBCLBJASKYTSSQYYMSZXFJEWLXLLS",
	        "ZBQJJJAKLYLXLYCCTSXMCWFKKKBSXLLLLJYXTYLTJYYTDPJHNHNNKBYQNFQYYZBYYESSESSGDYHFHWTCJBSDZZTFDMXHCNJZYMQW",
	        "SRYJDZJQPDQBBSTJGGFBKJBXTGQHNGWJXJGDLLTHZHHYYYYYYSXWTYYYCCBDBPYPZYCCZYJPZYWCBDLFWZCWJDXXHYHLHWZZXJTC",
	        "ZLCDPXUJCZZZLYXJJTXPHFXWPYWXZPTDZZBDZCYHJHMLXBQXSBYLRDTGJRRCTTTHYTCZWMXFYTWWZCWJWXJYWCSKYBZSCCTZQNHX",
	        "NWXXKHKFHTSWOCCJYBCMPZZYKBNNZPBZHHZDLSYDDYTYFJPXYNGFXBYQXCBHXCPSXTYZDMKYSNXSXLHKMZXLYHDHKWHXXSSKQYHH",
	        "CJYXGLHZXCSNHEKDTGZXQYPKDHEXTYKCNYMYYYPKQYYYKXZLTHJQTBYQHXBMYHSQCKWWYLLHCYYLNNEQXQWMCFBDCCMLJGGXDQKT",
	        "LXKGNQCDGZJWYJJLYHHQTTTNWCHMXCXWHWSZJYDJCCDBQCDGDNYXZTHCQRXCBHZTQCBXWGQWYYBXHMBYMYQTYEXMQKYAQYRGYZSL",
	        "FYKKQHYSSQYSHJGJCNXKZYCXSBXYXHYYLSTYCXQTHYSMGSCPMMGCCCCCMTZTASMGQZJHKLOSQYLSWTMXSYQKDZLJQQYPLSYCZTCQ",
	        "QPBBQJZCLPKHQZYYXXDTDDTSJCXFFLLCHQXMJLWCJCXTSPYCXNDTJSHJWXDQQJSKXYAMYLSJHMLALYKXCYYDMNMDQMXMCZNNCYBZ",
	        "KKYFLMCHCMLHXRCJJHSYLNMTJZGZGYWJXSRXCWJGJQHQZDQJDCJJZKJKGDZQGJJYJYLXZXXCDQHHHEYTMHLFSBDJSYYSHFYSTCZQ",
	        "LPBDRFRZTZYKYWHSZYQKWDQZRKMSYNBCRXQBJYFAZPZZEDZCJYWBCJWHYJBQSZYWRYSZPTDKZPFPBNZTKLQYHBBZPNPPTYZZYBQN",
	        "YDCPJMMCYCQMCYFZZDCMNLFPBPLNGQJTBTTNJZPZBBZNJKLJQYLNBZQHKSJZNGGQSZZKYXSHPZSNBCGZKDDZQANZHJKDRTLZLSWJ",
	        "LJZLYWTJNDJZJHXYAYNCBGTZCSSQMNJPJYTYSWXZFKWJQTKHTZPLBHSNJZSYZBWZZZZLSYLSBJHDWWQPSLMMFBJDWAQYZTCJTBNN",
	        "WZXQXCDSLQGDSDPDZHJTQQPSWLYYJZLGYXYZLCTCBJTKTYCZJTQKBSJLGMGZDMCSGPYNJZYQYYKNXRPWSZXMTNCSZZYXYBYHYZAX",
	        "YWQCJTLLCKJJTJHGDXDXYQYZZBYWDLWQCGLZGJGQRQZCZSSBCRPCSKYDZNXJSQGXSSJMYDNSTZTPBDLTKZWXQWQTZEXNQCZGWEZK",
	        "SSBYBRTSSSLCCGBPSZQSZLCCGLLLZXHZQTHCZMQGYZQZNMCOCSZJMMZSQPJYGQLJYJPPLDXRGZYXCCSXHSHGTZNLZWZKJCXTCFCJ",
	        "XLBMQBCZZWPQDNHXLJCTHYZLGYLNLSZZPCXDSCQQHJQKSXZPBAJYEMSMJTZDXLCJYRYYNWJBNGZZTMJXLTBSLYRZPYLSSCNXPHLL",
	        "HYLLQQZQLXYMRSYCXZLMMCZLTZSDWTJJLLNZGGQXPFSKYGYGHBFZPDKMWGHCXMSGDXJMCJZDYCABXJDLNBCDQYGSKYDQTXDJJYXM",
	        "SZQAZDZFSLQXYJSJZYLBTXXWXQQZBJZUFBBLYLWDSLJHXJYZJWTDJCZFQZQZZDZSXZZQLZCDZFJHYSPYMPQZMLPPLFFXJJNZZYLS",
	        "JEYQZFPFZKSYWJJJHRDJZZXTXXGLGHYDXCSKYSWMMZCWYBAZBJKSHFHJCXMHFQHYXXYZFTSJYZFXYXPZLCHMZMBXHZZSXYFYMNCW",
	        "DABAZLXKTCSHHXKXJJZJSTHYGXSXYYHHHJWXKZXSSBZZWHHHCWTZZZPJXSNXQQJGZYZYWLLCWXZFXXYXYHXMKYYSWSQMNLNAYCYS",
	        "PMJKHWCQHYLAJJMZXHMMCNZHBHXCLXTJPLTXYJHDYYLTTXFSZHYXXSJBJYAYRSMXYPLCKDUYHLXRLNLLSTYZYYQYGYHHSCCSMZCT",
	        "ZQXKYQFPYYRPFFLKQUNTSZLLZMWWTCQQYZWTLLMLMPWMBZSSTZRBPDDTLQJJBXZCSRZQQYGWCSXFWZLXCCRSZDZMCYGGDZQSGTJS",
	        "WLJMYMMZYHFBJDGYXCCPSHXNZCSBSJYJGJMPPWAFFYFNXHYZXZYLREMZGZCYZSSZDLLJCSQFNXZKPTXZGXJJGFMYYYSNBTYLBNLH",
	        "PFZDCYFBMGQRRSSSZXYSGTZRNYDZZCDGPJAFJFZKNZBLCZSZPSGCYCJSZLMLRSZBZZLDLSLLYSXSQZQLYXZLSKKBRXBRBZCYCXZZ",
	        "ZEEYFGKLZLYYHGZSGZLFJHGTGWKRAAJYZKZQTSSHJJXDCYZUYJLZYRZDQQHGJZXSSZBYKJPBFRTJXLLFQWJHYLQTYMBLPZDXTZYG",
	        "BDHZZRBGXHWNJTJXLKSCFSMWLSDQYSJTXKZSCFWJLBXFTZLLJZLLQBLSQMQQCGCZFPBPHZCZJLPYYGGDTGWDCFCZQYYYQYSSCLXZ",
	        "SKLZZZGFFCQNWGLHQYZJJCZLQZZYJPJZZBPDCCMHJGXDQDGDLZQMFGPSYTSDYFWWDJZJYSXYYCZCYHZWPBYKXRYLYBHKJKSFXTZJ",
	        "MMCKHLLTNYYMSYXYZPYJQYCSYCWMTJJKQYRHLLQXPSGTLYYCLJSCPXJYZFNMLRGJJTYZBXYZMSJYJHHFZQMSYXRSZCWTLRTQZSST",
	        "KXGQKGSPTGCZNJSJCQCXHMXGGZTQYDJKZDLBZSXJLHYQGGGTHQSZPYHJHHGYYGKGGCWJZZYLCZLXQSFTGZSLLLMLJSKCTBLLZZSZ",
	        "MMNYTPZSXQHJCJYQXYZXZQZCPSHKZZYSXCDFGMWQRLLQXRFZTLYSTCTMJCXJJXHJNXTNRZTZFQYHQGLLGCXSZSJDJLJCYDSJTLNY",
	        "XHSZXCGJZYQPYLFHDJSBPCCZHJJJQZJQDYBSSLLCMYTTMQTBHJQNNYGKYRQYQMZGCJKPDCGMYZHQLLSLLCLMHOLZGDYYFZSLJCQZ",
	        "LYLZQJESHNYLLJXGJXLYSYYYXNBZLJSSZCQQCJYLLZLTJYLLZLLBNYLGQCHXYYXOXCXQKYJXXXYKLXSXXYQXCYKQXQCSGYXXYQXY",
	        "GYTQOHXHXPYXXXULCYEYCHZZCBWQBBWJQZSCSZSSLZYLKDESJZWMYMCYTSDSXXSCJPQQSQYLYYZYCMDJDZYWCBTJSYDJKCYDDJLB",
	        "DJJSODZYSYXQQYXDHHGQQYQHDYXWGMMMAJDYBBBPPBCMUUPLJZSMTXERXJMHQNUTPJDCBSSMSSSTKJTSSMMTRCPLZSZMLQDSDMJM",
	        "QPNQDXCFYNBFSDQXYXHYAYKQYDDLQYYYSSZBYDSLNTFQTZQPZMCHDHCZCWFDXTMYQSPHQYYXSRGJCWTJTZZQMGWJJTJHTQJBBHWZ",
	        "PXXHYQFXXQYWYYHYSCDYDHHQMNMTMWCPBSZPPZZGLMZFOLLCFWHMMSJZTTDHZZYFFYTZZGZYSKYJXQYJZQBHMBZZLYGHGFMSHPZF",
	        "ZSNCLPBQSNJXZSLXXFPMTYJYGBXLLDLXPZJYZJYHHZCYWHJYLSJEXFSZZYWXKZJLUYDTMLYMQJPWXYHXSKTQJEZRPXXZHHMHWQPW",
	        "QLYJJQJJZSZCPHJLCHHNXJLQWZJHBMZYXBDHHYPZLHLHLGFWLCHYYTLHJXCJMSCPXSTKPNHQXSRTYXXTESYJCTLSSLSTDLLLWWYH",
	        "DHRJZSFGXTSYCZYNYHTDHWJSLHTZDQDJZXXQHGYLTZPHCSQFCLNJTCLZPFSTPDYNYLGMJLLYCQHYSSHCHYLHQYQTMZYPBYWRFQYK",
	        "QSYSLZDQJMPXYYSSRHZJNYWTQDFZBWWTWWRXCWHGYHXMKMYYYQMSMZHNGCEPMLQQMTCWCTMMPXJPJJHFXYYZSXZHTYBMSTSYJTTQ",
	        "QQYYLHYNPYQZLCYZHZWSMYLKFJXLWGXYPJYTYSYXYMZCKTTWLKSMZSYLMPWLZWXWQZSSAQSYXYRHSSNTSRAPXCPWCMGDXHXZDZYF",
	        "JHGZTTSBJHGYZSZYSMYCLLLXBTYXHBBZJKSSDMALXHYCFYGMQYPJYCQXJLLLJGSLZGQLYCJCCZOTYXMTMTTLLWTGPXYMZMKLPSZZ",
	        "ZXHKQYSXCTYJZYHXSHYXZKXLZWPSQPYHJWPJPWXQQYLXSDHMRSLZZYZWTTCYXYSZZSHBSCCSTPLWSSCJCHNLCGCHSSPHYLHFHHXJ",
	        "SXYLLNYLSZDHZXYLSXLWZYKCLDYAXZCMDDYSPJTQJZLNWQPSSSWCTSTSZLBLNXSMNYYMJQBQHRZWTYYDCHQLXKPZWBGQYBKFCMZW",
	        "PZLLYYLSZYDWHXPSBCMLJBSCGBHXLQHYRLJXYSWXWXZSLDFHLSLYNJLZYFLYJYCDRJLFSYZFSLLCQYQFGJYHYXZLYLMSTDJCYHBZ",
	        "LLNWLXXYGYYHSMGDHXXHHLZZJZXCZZZCYQZFNGWPYLCPKPYYPMCLQKDGXZGGWQBDXZZKZFBXXLZXJTPJPTTBYTSZZDWSLCHZHSLT",
	        "YXHQLHYXXXYYZYSWTXZKHLXZXZPYHGCHKCFSYHUTJRLXFJXPTZTWHPLYXFCRHXSHXKYXXYHZQDXQWULHYHMJTBFLKHTXCWHJFWJC",
	        "FPQRYQXCYYYQYGRPYWSGSUNGWCHKZDXYFLXXHJJBYZWTSXXNCYJJYMSWZJQRMHXZWFQSYLZJZGBHYNSLBGTTCSYBYXXWXYHXYYXN",
	        "SQYXMQYWRGYQLXBBZLJSYLPSYTJZYHYZAWLRORJMKSCZJXXXYXCHDYXRYXXJDTSQFXLYLTSFFYXLMTYJMJUYYYXLTZCSXQZQHZXL",
	        "YYXZHDNBRXXXJCTYHLBRLMBRLLAXKYLLLJLYXXLYCRYLCJTGJCMTLZLLCYZZPZPCYAWHJJFYBDYYZSMPCKZDQYQPBPCJPDCYZMDP",
	        "BCYYDYCNNPLMTMLRMFMMGWYZBSJGYGSMZQQQZTXMKQWGXLLPJGZBQCDJJJFPKJKCXBLJMSWMDTQJXLDLPPBXCWRCQFBFQJCZAHZG",
	        "MYKPHYYHZYKNDKZMBPJYXPXYHLFPNYYGXJDBKXNXHJMZJXSTRSTLDXSKZYSYBZXJLXYSLBZYSLHXJPFXPQNBYLLJQKYGZMCYZZYM",
	        "CCSLCLHZFWFWYXZMWSXTYNXJHPYYMCYSPMHYSMYDYSHQYZCHMJJMZCAAGCFJBBHPLYZYLXXSDJGXDHKXXTXXNBHRMLYJSLTXMRHN",
	        "LXQJXYZLLYSWQGDLBJHDCGJYQYCMHWFMJYBMBYJYJWYMDPWHXQLDYGPDFXXBCGJSPCKRSSYZJMSLBZZJFLJJJLGXZGYXYXLSZQYX",
	        "BEXYXHGCXBPLDYHWETTWWCJMBTXCHXYQXLLXFLYXLLJLSSFWDPZSMYJCLMWYTCZPCHQEKCQBWLCQYDPLQPPQZQFJQDJHYMMCXTXD",
	        "RMJWRHXCJZYLQXDYYNHYYHRSLSRSYWWZJYMTLTLLGTQCJZYABTCKZCJYCCQLJZQXALMZYHYWLWDXZXQDLLQSHGPJFJLJHJABCQZD",
	        "JGTKHSSTCYJLPSWZLXZXRWGLDLZRLZXTGSLLLLZLYXXWGDZYGBDPHZPBRLWSXQBPFDWOFMWHLYPCBJCCLDMBZPBZZLCYQXLDOMZB",
	        "LZWPDWYYGDSTTHCSQSCCRSSSYSLFYBFNTYJSZDFNDPDHDZZMBBLSLCMYFFGTJJQWFTMTPJWFNLBZCMMJTGBDZLQLPYFHYYMJYLSD",
	        "CHDZJWJCCTLJCLDTLJJCPDDSQDSSZYBNDBJLGGJZXSXNLYCYBJXQYCBYLZCFZPPGKCXZDZFZTJJFJSJXZBNZYJQTTYJYHTYCZHYM",
	        "DJXTTMPXSPLZCDWSLSHXYPZGTFMLCJTYCBPMGDKWYCYZCDSZZYHFLYCTYGWHKJYYLSJCXGYWJCBLLCSNDDBTZBSCLYZCZZSSQDLL",
	        "MQYYHFSLQLLXFTYHABXGWNYWYYPLLSDLDLLBJCYXJZMLHLJDXYYQYTDLLLBUGBFDFBBQJZZMDPJHGCLGMJJPGAEHHBWCQXAXHHHZ",
	        "CHXYPHJAXHLPHJPGPZJQCQZGJJZZUZDMQYYBZZPHYHYBWHAZYJHYKFGDPFQSDLZMLJXKXGALXZDAGLMDGXMWZQYXXDXXPFDMMSSY",
	        "MPFMDMMKXKSYZYSHDZKXSYSMMZZZMSYDNZZCZXFPLSTMZDNMXCKJMZTYYMZMZZMSXHHDCZJEMXXKLJSTLWLSQLYJZLLZJSSDPPMH",
	        "NLZJCZYHMXXHGZCJMDHXTKGRMXFWMCGMWKDTKSXQMMMFZZYDKMSCLCMPCGMHSPXQPZDSSLCXKYXTWLWJYAHZJGZQMCSNXYYMMPML",
	        "KJXMHLMLQMXCTKZMJQYSZJSYSZHSYJZJCDAJZYBSDQJZGWZQQXFKDMSDJLFWEHKZQKJPEYPZYSZCDWYJFFMZZYLTTDZZEFMZLBNP",
	        "PLPLPEPSZALLTYLKCKQZKGENQLWAGYXYDPXLHSXQQWQCQXQCLHYXXMLYCCWLYMQYSKGCHLCJNSZKPYZKCQZQLJPDMDZHLASXLBYD",
	        "WQLWDNBQCRYDDZTJYBKBWSZDXDTNPJDTCTQDFXQQMGNXECLTTBKPWSLCTYQLPWYZZKLPYGZCQQPLLKCCYLPQMZCZQCLJSLQZDJXL",
	        "DDHPZQDLJJXZQDXYZQKZLJCYQDYJPPYPQYKJYRMPCBYMCXKLLZLLFQPYLLLMBSGLCYSSLRSYSQTMXYXZQZFDZUYSYZTFFMZZSMZQ",
	        "HZSSCCMLYXWTPZGXZJGZGSJSGKDDHTQGGZLLBJDZLCBCHYXYZHZFYWXYZYMSDBZZYJGTSMTFXQYXQSTDGSLNXDLRYZZLRYYLXQHT",
	        "XSRTZNGZXBNQQZFMYKMZJBZYMKBPNLYZPBLMCNQYZZZSJZHJCTZKHYZZJRDYZHNPXGLFZTLKGJTCTSSYLLGZRZBBQZZKLPKLCZYS",
	        "SUYXBJFPNJZZXCDWXZYJXZZDJJKGGRSRJKMSMZJLSJYWQSKYHQJSXPJZZZLSNSHRNYPZTWCHKLPSRZLZXYJQXQKYSJYCZTLQZYBB",
	        "YBWZPQDWWYZCYTJCJXCKCWDKKZXSGKDZXWWYYJQYYTCYTDLLXWKCZKKLCCLZCQQDZLQLCSFQCHQHSFSMQZZLNBJJZBSJHTSZDYSJ",
	        "QJPDLZCDCWJKJZZLPYCGMZWDJJBSJQZSYZYHHXJPBJYDSSXDZNCGLQMBTSFSBPDZDLZNFGFJGFSMPXJQLMBLGQCYYXBQKDJJQYRF",
	        "KZTJDHCZKLBSDZCFJTPLLJGXHYXZCSSZZXSTJYGKGCKGYOQXJPLZPBPGTGYJZGHZQZZLBJLSQFZGKQQJZGYCZBZQTLDXRJXBSXXP",
	        "ZXHYZYCLWDXJJHXMFDZPFZHQHQMQGKSLYHTYCGFRZGNQXCLPDLBZCSCZQLLJBLHBZCYPZZPPDYMZZSGYHCKCPZJGSLJLNSCDSLDL",
	        "XBMSTLDDFJMKDJDHZLZXLSZQPQPGJLLYBDSZGQLBZLSLKYYHZTTNTJYQTZZPSZQZTLLJTYYLLQLLQYZQLBDZLSLYYZYMDFSZSNHL",
	        "XZNCZQZPBWSKRFBSYZMTHBLGJPMCZZLSTLXSHTCSYZLZBLFEQHLXFLCJLYLJQCBZLZJHHSSTBRMHXZHJZCLXFNBGXGTQJCZTMSFZ",
	        "KJMSSNXLJKBHSJXNTNLZDNTLMSJXGZJYJCZXYJYJWRWWQNZTNFJSZPZSHZJFYRDJSFSZJZBJFZQZZHZLXFYSBZQLZSGYFTZDCSZX",
	        "ZJBQMSZKJRHYJZCKMJKHCHGTXKXQGLXPXFXTRTYLXJXHDTSJXHJZJXZWZLCQSBTXWXGXTXXHXFTSDKFJHZYJFJXRZSDLLLTQSQQZ",
	        "QWZXSYQTWGWBZCGZLLYZBCLMQQTZHZXZXLJFRMYZFLXYSQXXJKXRMQDZDMMYYBSQBHGZMWFWXGMXLZPYYTGZYCCDXYZXYWGSYJYZ",
	        "NBHPZJSQSYXSXRTFYZGRHZTXSZZTHCBFCLSYXZLZQMZLMPLMXZJXSFLBYZMYQHXJSXRXSQZZZSSLYFRCZJRCRXHHZXQYDYHXSJJH",
	        "ZCXZBTYNSYSXJBQLPXZQPYMLXZKYXLXCJLCYSXXZZLXDLLLJJYHZXGYJWKJRWYHCPSGNRZLFZWFZZNSXGXFLZSXZZZBFCSYJDBRJ",
	        "KRDHHGXJLJJTGXJXXSTJTJXLYXQFCSGSWMSBCTLQZZWLZZKXJMLTMJYHSDDBXGZHDLBMYJFRZFSGCLYJBPMLYSMSXLSZJQQHJZFX",
	        "GFQFQBPXZGYYQXGZTCQWYLTLGWSGWHRLFSFGZJMGMGBGTJFSYZZGZYZAFLSSPMLPFLCWBJZCLJJMZLPJJLYMQDMYYYFBGYGYZMLY",
	        "ZDXQYXRQQQHSYYYQXYLJTYXFSFSLLGNQCYHYCWFHCCCFXPYLYPLLZYXXXXXKQHHXSHJZCFZSCZJXCPZWHHHHHAPYLQALPQAFYHXD",
	        "YLUKMZQGGGDDESRNNZLTZGCHYPPYSQJJHCLLJTOLNJPZLJLHYMHEYDYDSQYCDDHGZUNDZCLZYZLLZNTNYZGSLHSLPJJBDGWXPCDU",
	        "TJCKLKCLWKLLCASSTKZZDNQNTTLYYZSSYSSZZRYLJQKCQDHHCRXRZYDGRGCWCGZQFFFPPJFZYNAKRGYWYQPQXXFKJTSZZXSWZDDF",
	        "BBXTBGTZKZNPZZPZXZPJSZBMQHKCYXYLDKLJNYPKYGHGDZJXXEAHPNZKZTZCMXCXMMJXNKSZQNMNLWBWWXJKYHCPSTMCSQTZJYXT",
	        "PCTPDTNNPGLLLZSJLSPBLPLQHDTNJNLYYRSZFFJFQWDPHZDWMRZCCLODAXNSSNYZRESTYJWJYJDBCFXNMWTTBYLWSTSZGYBLJPXG",
	        "LBOCLHPCBJLTMXZLJYLZXCLTPNCLCKXTPZJSWCYXSFYSZDKNTLBYJCYJLLSTGQCBXRYZXBXKLYLHZLQZLNZCXWJZLJZJNCJHXMNZ",
	        "ZGJZZXTZJXYCYYCXXJYYXJJXSSSJSTSSTTPPGQTCSXWZDCSYFPTFBFHFBBLZJCLZZDBXGCXLQPXKFZFLSYLTUWBMQJHSZBMDDBCY",
	        "SCCLDXYCDDQLYJJWMQLLCSGLJJSYFPYYCCYLTJANTJJPWYCMMGQYYSXDXQMZHSZXPFTWWZQSWQRFKJLZJQQYFBRXJHHFWJJZYQAZ",
	        "MYFRHCYYBYQWLPEXCCZSTYRLTTDMQLYKMBBGMYYJPRKZNPBSXYXBHYZDJDNGHPMFSGMWFZMFQMMBCMZZCJJLCNUXYQLMLRYGQZCY",
	        "XZLWJGCJCGGMCJNFYZZJHYCPRRCMTZQZXHFQGTJXCCJEAQCRJYHPLQLSZDJRBCQHQDYRHYLYXJSYMHZYDWLDFRYHBPYDTSSCNWBX",
	        "GLPZMLZZTQSSCPJMXXYCSJYTYCGHYCJWYRXXLFEMWJNMKLLSWTXHYYYNCMMCWJDQDJZGLLJWJRKHPZGGFLCCSCZMCBLTBHBQJXQD",
	        "SPDJZZGKGLFQYWBZYZJLTSTDHQHCTCBCHFLQMPWDSHYYTQWCNZZJTLBYMBPDYYYXSQKXWYYFLXXNCWCXYPMAELYKKJMZZZBRXYYQ",
	        "JFLJPFHHHYTZZXSGQQMHSPGDZQWBWPJHZJDYSCQWZKTXXSQLZYYMYSDZGRXCKKUJLWPYSYSCSYZLRMLQSYLJXBCXTLWDQZPCYCYK",
	        "PPPNSXFYZJJRCEMHSZMSXLXGLRWGCSTLRSXBZGBZGZTCPLUJLSLYLYMTXMTZPALZXPXJTJWTCYYZLBLXBZLQMYLXPGHDSLSSDMXM",
	        "BDZZSXWHAMLCZCPJMCNHJYSNSYGCHSKQMZZQDLLKABLWJXSFMOCDXJRRLYQZKJMYBYQLYHETFJZFRFKSRYXFJTWDSXXSYSQJYSLY",
	        "XWJHSNLXYYXHBHAWHHJZXWMYLJCSSLKYDZTXBZSYFDXGXZJKHSXXYBSSXDPYNZWRPTQZCZENYGCXQFJYKJBZMLJCMQQXUOXSLYXX",
	        "LYLLJDZBTYMHPFSTTQQWLHOKYBLZZALZXQLHZWRRQHLSTMYPYXJJXMQSJFNBXYXYJXXYQYLTHYLQYFMLKLJTMLLHSZWKZHLJMLHL",
	        "JKLJSTLQXYLMBHHLNLZXQJHXCFXXLHYHJJGBYZZKBXSCQDJQDSUJZYYHZHHMGSXCSYMXFEBCQWWRBPYYJQTYZCYQYQQZYHMWFFHG",
	        "ZFRJFCDPXNTQYZPDYKHJLFRZXPPXZDBBGZQSTLGDGYLCQMLCHHMFYWLZYXKJLYPQHSYWMQQGQZMLZJNSQXJQSYJYCBEHSXFSZPXZ",
	        "WFLLBCYYJDYTDTHWZSFJMQQYJLMQXXLLDTTKHHYBFPWTYYSQQWNQWLGWDEBZWCMYGCULKJXTMXMYJSXHYBRWFYMWFRXYQMXYSZTZ",
	        "ZTFYKMLDHQDXWYYNLCRYJBLPSXCXYWLSPRRJWXHQYPHTYDNXHHMMYWYTZCSQMTSSCCDALWZTCPQPYJLLQZYJSWXMZZMMYLMXCLMX",
	        "CZMXMZSQTZPPQQBLPGXQZHFLJJHYTJSRXWZXSCCDLXTYJDCQJXSLQYCLZXLZZXMXQRJMHRHZJBHMFLJLMLCLQNLDXZLLLPYPSYJY",
	        "SXCQQDCMQJZZXHNPNXZMEKMXHYKYQLXSXTXJYYHWDCWDZHQYYBGYBCYSCFGPSJNZDYZZJZXRZRQJJYMCANYRJTLDPPYZBSTJKXXZ",
	        "YPFDWFGZZRPYMTNGXZQBYXNBUFNQKRJQZMJEGRZGYCLKXZDSKKNSXKCLJSPJYYZLQQJYBZSSQLLLKJXTBKTYLCCDDBLSPPFYLGYD",
	        "TZJYQGGKQTTFZXBDKTYYHYBBFYTYYBCLPDYTGDHRYRNJSPTCSNYJQHKLLLZSLYDXXWBCJQSPXBPJZJCJDZFFXXBRMLAZHCSNDLBJ",
	        "DSZBLPRZTSWSBXBCLLXXLZDJZSJPYLYXXYFTFFFBHJJXGBYXJPMMMPSSJZJMTLYZJXSWXTYLEDQPJMYGQZJGDJLQJWJQLLSJGJGY",
	        "GMSCLJJXDTYGJQJQJCJZCJGDZZSXQGSJGGCXHQXSNQLZZBXHSGZXCXYLJXYXYYDFQQJHJFXDHCTXJYRXYSQTJXYEFYYSSYYJXNCY",
	        "ZXFXMSYSZXYYSCHSHXZZZGZZZGFJDLTYLNPZGYJYZYYQZPBXQBDZTZCZYXXYHHSQXSHDHGQHJHGYWSZTMZMLHYXGEBTYLZKQWYTJ",
	        "ZRCLEKYSTDBCYKQQSAYXCJXWWGSBHJYZYDHCSJKQCXSWXFLTYNYZPZCCZJQTZWJQDZZZQZLJJXLSBHPYXXPSXSHHEZTXFPTLQYZZ",
	        "XHYTXNCFZYYHXGNXMYWXTZSJPTHHGYMXMXQZXTSBCZYJYXXTYYZYPCQLMMSZMJZZLLZXGXZAAJZYXJMZXWDXZSXZDZXLEYJJZQBH",
	        "ZWZZZQTZPSXZTDSXJJJZNYAZPHXYYSRNQDTHZHYYKYJHDZXZLSWCLYBZYECWCYCRYLCXNHZYDZYDYJDFRJJHTRSQTXYXJRJHOJYN",
	        "XELXSFSFJZGHPZSXZSZDZCQZBYYKLSGSJHCZSHDGQGXYZGXCHXZJWYQWGYHKSSEQZZNDZFKWYSSTCLZSTSYMCDHJXXYWEYXCZAYD",
	        "MPXMDSXYBSQMJMZJMTZQLPJYQZCGQHXJHHLXXHLHDLDJQCLDWBSXFZZYYSCHTYTYYBHECXHYKGJPXHHYZJFXHWHBDZFYZBCAPNPG",
	        "NYDMSXHMMMMAMYNBYJTMPXYYMCTHJBZYFCGTYHWPHFTWZZEZSBZEGPFMTSKFTYCMHFLLHGPZJXZJGZJYXZSBBQSCZZLZCCSTPGXM",
	        "JSFTCCZJZDJXCYBZLFCJSYZFGSZLYBCWZZBYZDZYPSWYJZXZBDSYUXLZZBZFYGCZXBZHZFTPBGZGEJBSTGKDMFHYZZJHZLLZZGJQ",
	        "ZLSFDJSSCBZGPDLFZFZSZYZYZSYGCXSNXXCHCZXTZZLJFZGQSQYXZJQDCCZTQCDXZJYQJQCHXZTDLGSCXZSYQJQTZWLQDQZTQCHQ",
	        "QJZYEZZZPBWKDJFCJPZTYPQYQTTYNLMBDKTJZPQZQZZFPZSBNJLGYJDXJDZZKZGQKXDLPZJTCJDQBXDJQJSTCKNXBXZMSLYJCQMT",
	        "JQWWCJQNJNLLLHJCWQTBZQYDZCZPZZDZYDDCYZZZCCJTTJFZDPRRTZTJDCQTQZDTJNPLZBCLLCTZSXKJZQZPZLBZRBTJDCXFCZDB",
	        "CCJJLTQQPLDCGZDBBZJCQDCJWYNLLZYZCCDWLLXWZLXRXNTQQCZXKQLSGDFQTDDGLRLAJJTKUYMKQLLTZYTDYYCZGJWYXDXFRSKS",
	        "TQTENQMRKQZHHQKDLDAZFKYPBGGPZREBZZYKZZSPEGJXGYKQZZZSLYSYYYZWFQZYLZZLZHWCHKYPQGNPGBLPLRRJYXCCSYYHSFZF",
	        "YBZYYTGZXYLXCZWXXZJZBLFFLGSKHYJZEYJHLPLLLLCZGXDRZELRHGKLZZYHZLYQSZZJZQLJZFLNBHGWLCZCFJYSPYXZLZLXGCCP",
	        "ZBLLCYBBBBUBBCBPCRNNZCZYRBFSRLDCGQYYQXYGMQZWTZYTYJXYFWTEHZZJYWLCCNTZYJJZDEDPZDZTSYQJHDYMBJNYJZLXTSST",
	        "PHNDJXXBYXQTZQDDTJTDYYTGWSCSZQFLSHLGLBCZPHDLYZJYCKWTYTYLBNYTSDSYCCTYSZYYEBHEXHQDTWNYGYCLXTSZYSTQMYGZ",
	        "AZCCSZZDSLZCLZRQXYYELJSBYMXSXZTEMBBLLYYLLYTDQYSHYMRQWKFKBFXNXSBYCHXBWJYHTQBPBSBWDZYLKGZSKYHXQZJXHXJX",
	        "GNLJKZLYYCDXLFYFGHLJGJYBXQLYBXQPQGZTZPLNCYPXDJYQYDYMRBESJYYHKXXSTMXRCZZYWXYQYBMCLLYZHQYZWQXDBXBZWZMS",
	        "LPDMYSKFMZKLZCYQYCZLQXFZZYDQZPZYGYJYZMZXDZFYFYTTQTZHGSPCZMLCCYTZXJCYTJMKSLPZHYSNZLLYTPZCTZZCKTXDHXXT",
	        "QCYFKSMQCCYYAZHTJPCYLZLYJBJXTPNYLJYYNRXSYLMMNXJSMYBCSYSYLZYLXJJQYLDZLPQBFZZBLFNDXQKCZFYWHGQMRDSXYCYT",
	        "XNQQJZYYPFZXDYZFPRXEJDGYQBXRCNFYYQPGHYJDYZXGRHTKYLNWDZNTSMPKLBTHBPYSZBZTJZSZZJTYYXZPHSSZZBZCZPTQFZMY",
	        "FLYPYBBJQXZMXXDJMTSYSKKBJZXHJCKLPSMKYJZCXTMLJYXRZZQSLXXQPYZXMKYXXXJCLJPRMYYGADYSKQLSNDHYZKQXZYZTCGHZ",
	        "TLMLWZYBWSYCTBHJHJFCWZTXWYTKZLXQSHLYJZJXTMPLPYCGLTBZZTLZJCYJGDTCLKLPLLQPJMZPAPXYZLKKTKDZCZZBNZDYDYQZ",
	        "JYJGMCTXLTGXSZLMLHBGLKFWNWZHDXUHLFMKYSLGXDTWWFRJEJZTZHYDXYKSHWFZCQSHKTMQQHTZHYMJDJSKHXZJZBZZXYMPAGQM",
	        "STPXLSKLZYNWRTSQLSZBPSPSGZWYHTLKSSSWHZZLYYTNXJGMJSZSUFWNLSOZTXGXLSAMMLBWLDSZYLAKQCQCTMYCFJBSLXCLZZCL",
	        "XXKSBZQCLHJPSQPLSXXCKSLNHPSFQQYTXYJZLQLDXZQJZDYYDJNZPTUZDSKJFSLJHYLZSQZLBTXYDGTQFDBYAZXDZHZJNHHQBYKN",
	        "XJJQCZMLLJZKSPLDYCLBBLXKLELXJLBQYCXJXGCNLCQPLZLZYJTZLJGYZDZPLTQCSXFDMNYCXGBTJDCZNBGBQYQJWGKFHTNPYQZQ",
	        "GBKPBBYZMTJDYTBLSQMPSXTBNPDXKLEMYYCJYNZCTLDYKZZXDDXHQSHDGMZSJYCCTAYRZLPYLTLKXSLZCGGEXCLFXLKJRTLQJAQZ",
	        "NCMBYDKKCXGLCZJZXJHPTDJJMZQYKQSECQZDSHHADMLZFMMZBGNTJNNLGBYJBRBTMLBYJDZXLCJLPLDLPCQDHLXZLYCBLCXZZJAD",
	        "JLNZMMSSSMYBHBSQKBHRSXXJMXSDZNZPXLGBRHWGGFCXGMSKLLTSJYYCQLTSKYWYYHYWXBXQYWPYWYKQLSQPTNTKHQCWDQKTWPXX",
	        "HCPTHTWUMSSYHBWCRWXHJMKMZNGWTMLKFGHKJYLSYYCXWHYECLQHKQHTTQKHFZLDXQWYZYYDESBPKYRZPJFYYZJCEQDZZDLATZBB",
	        "FJLLCXDLMJSSXEGYGSJQXCWBXSSZPDYZCXDNYXPPZYDLYJCZPLTXLSXYZYRXCYYYDYLWWNZSAHJSYQYHGYWWAXTJZDAXYSRLTDPS",
	        "SYYFNEJDXYZHLXLLLZQZSJNYQYQQXYJGHZGZCYJCHZLYCDSHWSHJZYJXCLLNXZJJYYXNFXMWFPYLCYLLABWDDHWDXJMCXZTZPMLQ",
	        "ZHSFHZYNZTLLDYWLSLXHYMMYLMBWWKYXYADTXYLLDJPYBPWUXJMWMLLSAFDLLYFLBHHHBQQLTZJCQJLDJTFFKMMMBYTHYGDCQRDD",
	        "WRQJXNBYSNWZDBYYTBJHPYBYTTJXAAHGQDQTMYSTQXKBTZPKJLZRBEQQSSMJJBDJOTGTBXPGBKTLHQXJJJCTHXQDWJLWRFWQGWSH",
	        "CKRYSWGFTGYGBXSDWDWRFHWYTJJXXXJYZYSLPYYYPAYXHYDQKXSHXYXGSKQHYWFDDDPPLCJLQQEEWXKSYYKDYPLTJTHKJLTCYYHH",
	        "JTTPLTZZCDLTHQKZXQYSTEEYWYYZYXXYYSTTJKLLPZMCYHQGXYHSRMBXPLLNQYDQHXSXXWGDQBSHYLLPJJJTHYJKYPPTHYYKTYEZ",
	        "YENMDSHLCRPQFDGFXZPSFTLJXXJBSWYYSKSFLXLPPLBBBLBSFXFYZBSJSSYLPBBFFFFSSCJDSTZSXZRYYSYFFSYZYZBJTBCTSBSD",
	        "HRTJJBYTCXYJEYLXCBNEBJDSYXYKGSJZBXBYTFZWGENYHHTHZHHXFWGCSTBGXKLSXYWMTMBYXJSTZSCDYQRCYTWXZFHMYMCXLZNS",
	        "DJTTTXRYCFYJSBSDYERXJLJXBBDEYNJGHXGCKGSCYMBLXJMSZNSKGXFBNBPTHFJAAFXYXFPXMYPQDTZCXZZPXRSYWZDLYBBKTYQP",
	        "QJPZYPZJZNJPZJLZZFYSBTTSLMPTZRTDXQSJEHBZYLZDHLJSQMLHTXTJECXSLZZSPKTLZKQQYFSYGYWPCPQFHQHYTQXZKRSGTTSQ",
	        "CZLPTXCDYYZXSQZSLXLZMYCPCQBZYXHBSXLZDLTCDXTYLZJYYZPZYZLTXJSJXHLPMYTXCQRBLZSSFJZZTNJYTXMYJHLHPPLCYXQJ",
	        "QQKZZSCPZKSWALQSBLCCZJSXGWWWYGYKTJBBZTDKHXHKGTGPBKQYSLPXPJCKBMLLXDZSTBKLGGQKQLSBKKTFXRMDKBFTPZFRTBBR",
	        "FERQGXYJPZSSTLBZTPSZQZSJDHLJQLZBPMSMMSXLQQNHKNBLRDDNXXDHDDJCYYGYLXGZLXSYGMQQGKHBPMXYXLYTQWLWGCPBMQXC",
	        "YZYDRJBHTDJYHQSHTMJSBYPLWHLZFFNYPMHXXHPLTBQPFBJWQDBYGPNZTPFZJGSDDTQSHZEAWZZYLLTYYBWJKXXGHLFKXDJTMSZS",
	        "QYNZGGSWQSPHTLSSKMCLZXYSZQZXNCJDQGZDLFNYKLJCJLLZLMZZNHYDSSHTHZZLZZBBHQZWWYCRZHLYQQJBEYFXXXWHSRXWQHWP",
	        "SLMSSKZTTYGYQQWRSLALHMJTQJSMXQBJJZJXZYZKXBYQXBJXSHZTSFJLXMXZXFGHKZSZGGYLCLSARJYHSLLLMZXELGLXYDJYTLFB",
	        "HBPNLYZFBBHPTGJKWETZHKJJXZXXGLLJLSTGSHJJYQLQZFKCGNNDJSSZFDBCTWWSEQFHQJBSAQTGYPQLBXBMMYWXGSLZHGLZGQYF",
	        "LZBYFZJFRYSFMBYZHQGFWZSYFYJJPHZBYYZFFWODGRLMFTWLBZGYCQXCDJYGZYYYYTYTYDWEGAZYHXJLZYYHLRMGRXXZCLHNELJJ",
	        "TJTPWJYBJJBXJJTJTEEKHWSLJPLPSFYZPQQBDLQJJTYYQLYZKDKSQJYYQZLDQTGJQYZJSUCMRYQTHTEJMFCTYHYPKMHYZWJDQFHY",
	        "YXWSHCTXRLJHQXHCCYYYJLTKTTYTMXGTCJTZAYYOCZLYLBSZYWJYTSJYHBYSHFJLYGJXXTMZYYLTXXYPZLXYJZYZYYPNHMYMDYYL",
	        "BLHLSYYQQLLNJJYMSOYQBZGDLYXYLCQYXTSZEGXHZGLHWBLJHEYXTWQMAKBPQCGYSHHEGQCMWYYWLJYJHYYZLLJJYLHZYHMGSLJL",
	        "JXCJJYCLYCJPCPZJZJMMYLCQLNQLJQJSXYJMLSZLJQLYCMMHCFMMFPQQMFYLQMCFFQMMMMHMZNFHHJGTTHHKHSLNCHHYQDXTMMQD",
	        "CYZYXYQMYQYLTDCYYYZAZZCYMZYDLZFFFMMYCQZWZZMABTBYZTDMNZZGGDFTYPCGQYTTSSFFWFDTZQSSYSTWXJHXYTSXXYLBYQHW",
	        "WKXHZXWZNNZZJZJJQJCCCHYYXBZXZCYZTLLCQXYNJYCYYCYNZZQYYYEWYCZDCJYCCHYJLBTZYYCQWMPWPYMLGKDLDLGKQQBGYCHJ",
	        "XY"];
	strChineseFirstPY = strChineseFirstPY.join("");
	var oMultiDiff = {
		"19969" : "DZ",
		"19975" : "WM",
		"19988" : "QJ",
		"20048" : "YL",
		"20056" : "SC",
		"20060" : "NM",
		"20094" : "QG",
		"20127" : "QJ",
		"20167" : "QC",
		"20193" : "YG",
		"20250" : "KH",
		"20256" : "ZC",
		"20282" : "SC",
		"20285" : "QJG",
		"20291" : "TD",
		"20314" : "YD",
		"20340" : "NE",
		"20375" : "TD",
		"20389" : "YJ",
		"20391" : "CZ",
		"20415" : "PB",
		"20446" : "YS",
		"20447" : "SQ",
		"20504" : "TC",
		"20608" : "KG",
		"20854" : "QJ",
		"20857" : "ZC",
		"20911" : "PF",
		"20504" : "TC",
		"20608" : "KG",
		"20854" : "QJ",
		"20857" : "ZC",
		"20911" : "PF",
		"20985" : "AW",
		"21032" : "PB",
		"21048" : "XQ",
		"21049" : "SC",
		"21089" : "YS",
		"21119" : "JC",
		"21242" : "SB",
		"21273" : "SC",
		"21305" : "YP",
		"21306" : "QO",
		"21330" : "ZC",
		"21333" : "SDC",
		"21345" : "QK",
		"21378" : "CA",
		"21397" : "SC",
		"21414" : "XS",
		"21442" : "SC",
		"21477" : "JG",
		"21480" : "TD",
		"21484" : "ZS",
		"21494" : "YX",
		"21505" : "YX",
		"21512" : "HG",
		"21523" : "XH",
		"21537" : "PB",
		"21542" : "PF",
		"21549" : "KH",
		"21571" : "E",
		"21574" : "DA",
		"21588" : "TD",
		"21589" : "O",
		"21618" : "ZC",
		"21621" : "KHA",
		"21632" : "ZJ",
		"21654" : "KG",
		"21679" : "LKG",
		"21683" : "KH",
		"21710" : "A",
		"21719" : "YH",
		"21734" : "WOE",
		"21769" : "A",
		"21780" : "WN",
		"21804" : "XH",
		"21834" : "A",
		"21899" : "ZD",
		"21903" : "RN",
		"21908" : "WO",
		"21939" : "ZC",
		"21956" : "SA",
		"21964" : "YA",
		"21970" : "TD",
		"22003" : "A",
		"22031" : "JG",
		"22040" : "XS",
		"22060" : "ZC",
		"22066" : "ZC",
		"22079" : "MH",
		"22129" : "XJ",
		"22179" : "XA",
		"22237" : "NJ",
		"22244" : "TD",
		"22280" : "JQ",
		"22300" : "YH",
		"22313" : "XW",
		"22331" : "YQ",
		"22343" : "YJ",
		"22351" : "PH",
		"22395" : "DC",
		"22412" : "TD",
		"22484" : "PB",
		"22500" : "PB",
		"22534" : "ZD",
		"22549" : "DH",
		"22561" : "PB",
		"22612" : "TD",
		"22771" : "KQ",
		"22831" : "HB",
		"22841" : "JG",
		"22855" : "QJ",
		"22865" : "XQ",
		"23013" : "ML",
		"23081" : "WM",
		"23487" : "SX",
		"23558" : "QJ",
		"23561" : "YW",
		"23586" : "YW",
		"23614" : "YW",
		"23615" : "SN",
		"23631" : "PB",
		"23646" : "ZS",
		"23663" : "ZT",
		"23673" : "YG",
		"23762" : "TD",
		"23769" : "ZS",
		"23780" : "QJ",
		"23884" : "QK",
		"24055" : "XH",
		"24113" : "DC",
		"24162" : "ZC",
		"24191" : "GA",
		"24273" : "QJ",
		"24324" : "NL",
		"24377" : "TD",
		"24378" : "QJ",
		"24439" : "PF",
		"24554" : "ZS",
		"24683" : "TD",
		"24694" : "WE",
		"24733" : "LK",
		"24925" : "TN",
		"25094" : "ZG",
		"25100" : "XQ",
		"25103" : "XH",
		"25153" : "PB",
		"25170" : "PB",
		"25179" : "KG",
		"25203" : "PB",
		"25240" : "ZS",
		"25282" : "FB",
		"25303" : "NA",
		"25324" : "KG",
		"25341" : "ZY",
		"25373" : "WZ",
		"25375" : "XJ",
		"25384" : "A",
		"25457" : "A",
		"25528" : "SD",
		"25530" : "SC",
		"25552" : "TD",
		"25774" : "ZC",
		"25874" : "ZC",
		"26044" : "YW",
		"26080" : "WM",
		"26292" : "PB",
		"26333" : "PB",
		"26355" : "ZY",
		"26366" : "CZ",
		"26397" : "ZC",
		"26399" : "QJ",
		"26415" : "ZS",
		"26451" : "SB",
		"26526" : "ZC",
		"26552" : "JG",
		"26561" : "TD",
		"26588" : "JG",
		"26597" : "CZ",
		"26629" : "ZS",
		"26638" : "YL",
		"26646" : "XQ",
		"26653" : "KG",
		"26657" : "XJ",
		"26727" : "HG",
		"26894" : "ZC",
		"26937" : "ZS",
		"26946" : "ZC",
		"26999" : "KJ",
		"27099" : "KJ",
		"27449" : "YQ",
		"27481" : "XS",
		"27542" : "ZS",
		"27663" : "ZS",
		"27748" : "TS",
		"27784" : "SC",
		"27788" : "ZD",
		"27795" : "TD",
		"27812" : "O",
		"27850" : "PB",
		"27852" : "MB",
		"27895" : "SL",
		"27898" : "PL",
		"27973" : "QJ",
		"27981" : "KH",
		"27986" : "HX",
		"27994" : "XJ",
		"28044" : "YC",
		"28065" : "WG",
		"28177" : "SM",
		"28267" : "QJ",
		"28291" : "KH",
		"28337" : "ZQ",
		"28463" : "TL",
		"28548" : "DC",
		"28601" : "TD",
		"28689" : "PB",
		"28805" : "JG",
		"28820" : "QG",
		"28846" : "PB",
		"28952" : "TD",
		"28975" : "ZC",
		"29100" : "A",
		"29325" : "QJ",
		"29575" : "SL",
		"29602" : "FB",
		"30010" : "TD",
		"30044" : "CX",
		"30058" : "PF",
		"30091" : "YSP",
		"30111" : "YN",
		"30229" : "XJ",
		"30427" : "SC",
		"30465" : "SX",
		"30631" : "YQ",
		"30655" : "QJ",
		"30684" : "QJG",
		"30707" : "SD",
		"30729" : "XH",
		"30796" : "LG",
		"30917" : "PB",
		"31074" : "NM",
		"31085" : "JZ",
		"31109" : "SC",
		"31181" : "ZC",
		"31192" : "MLB",
		"31293" : "JQ",
		"31400" : "YX",
		"31584" : "YJ",
		"31896" : "ZN",
		"31909" : "ZY",
		"31995" : "XJ",
		"32321" : "PF",
		"32327" : "ZY",
		"32418" : "HG",
		"32420" : "XQ",
		"32421" : "HG",
		"32438" : "LG",
		"32473" : "GJ",
		"32488" : "TD",
		"32521" : "QJ",
		"32527" : "PB",
		"32562" : "ZSQ",
		"32564" : "JZ",
		"32735" : "ZD",
		"32793" : "PB",
		"33071" : "PF",
		"33098" : "XL",
		"33100" : "YA",
		"33152" : "PB",
		"33261" : "CX",
		"33324" : "BP",
		"33333" : "TD",
		"33406" : "YA",
		"33426" : "WM",
		"33432" : "PB",
		"33445" : "JG",
		"33486" : "ZN",
		"33493" : "TS",
		"33507" : "QJ",
		"33540" : "QJ",
		"33544" : "ZC",
		"33564" : "XQ",
		"33617" : "YT",
		"33632" : "QJ",
		"33636" : "XH",
		"33637" : "YX",
		"33694" : "WG",
		"33705" : "PF",
		"33728" : "YW",
		"33882" : "SR",
		"34067" : "WM",
		"34074" : "YW",
		"34121" : "QJ",
		"34255" : "ZC",
		"34259" : "XL",
		"34425" : "JH",
		"34430" : "XH",
		"34485" : "KH",
		"34503" : "YS",
		"34532" : "HG",
		"34552" : "XS",
		"34558" : "YE",
		"34593" : "ZL",
		"34660" : "YQ",
		"34892" : "XH",
		"34928" : "SC",
		"34999" : "QJ",
		"35048" : "PB",
		"35059" : "SC",
		"35098" : "ZC",
		"35203" : "TQ",
		"35265" : "JX",
		"35299" : "JX",
		"35782" : "SZ",
		"35828" : "YS",
		"35830" : "E",
		"35843" : "TD",
		"35895" : "YG",
		"35977" : "MH",
		"36158" : "JG",
		"36228" : "QJ",
		"36426" : "XQ",
		"36466" : "DC",
		"36710" : "JC",
		"36711" : "ZYG",
		"36767" : "PB",
		"36866" : "SK",
		"36951" : "YW",
		"37034" : "YX",
		"37063" : "XH",
		"37218" : "ZC",
		"37325" : "ZC",
		"38063" : "PB",
		"38079" : "TD",
		"38085" : "QY",
		"38107" : "DC",
		"38116" : "TD",
		"38123" : "YD",
		"38224" : "HG",
		"38241" : "XTC",
		"38271" : "ZC",
		"38415" : "YE",
		"38426" : "KH",
		"38461" : "YD",
		"38463" : "AE",
		"38466" : "PB",
		"38477" : "XJ",
		"38518" : "YT",
		"38551" : "WK",
		"38585" : "ZC",
		"38704" : "XS",
		"38739" : "LJ",
		"38761" : "GJ",
		"38808" : "SQ",
		"39048" : "JG",
		"39049" : "XJ",
		"39052" : "HG",
		"39076" : "CZ",
		"39271" : "XT",
		"39534" : "TD",
		"39552" : "TD",
		"39584" : "PB",
		"39647" : "SB",
		"39730" : "LG",
		"39748" : "TPB",
		"40109" : "ZQ",
		"40479" : "ND",
		"40516" : "HG",
		"40536" : "HG",
		"40583" : "QJ",
		"40765" : "YQ",
		"40784" : "QJ",
		"40840" : "YK",
		"40863" : "QJG"
	};
	unieap.makePy = function(e) {
		if (typeof(e) != "string") { throw new Error(-1, "函数makePy需要字符串类型参数!"); }
		var b = new Array();
		for (var c = 0, a = e.length; c < a; c++) {
			var d = e.charAt(c);
			b.push(unieap.checkCh(d));
		}
		return unieap.mkRslt(b);
	};
	unieap.mkRslt = function(f) {
		var h = [""];
		for (var e = 0, g = f.length; e < g; e++) {
			var l = f[e];
			var m = l.length;
			if (m == 1) {
				for (var a = 0; a < h.length; a++) {
					h[a] += l;
				}
			} else {
				var c = h.slice(0);
				h = [];
				for (a = 0; a < m; a++) {
					var d = c.slice(0);
					for (var b = 0; b < d.length; b++) {
						d[b] += l.charAt(a);
					}
					h = h.concat(d);
				}
			}
		}
		return h;
	};
	unieap.checkCh = function(a) {
		var b = a.charCodeAt(0);
		if (b > 40869 || b < 19968) { return a; }
		return (oMultiDiff[b] ? oMultiDiff[b] : (strChineseFirstPY.charAt(b - 19968)));
	};
}
/* /unieap/ria3.3/unieap/tree/Tree.js */
dojo.provide("unieap.tree.Tree");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dojo.fx");
dojo.declare("unieap.tree.TreeNodeUI", [dijit._Widget, dijit._Templated], {
	templateString : '<div class="dijitTreeNode"  isTreeNode = "true"><div class="treeRenderNode" dojoAttachPoint="contentNode,renderNode"><table cellspacing="0" cellpadding="0" dojoAttachPoint="showingNode"><tr><td width=16><div dojoAttachPoint="expandoNode" class="dijitTreeExpando">&nbsp;</div></td><td><div dojoattachpoint="checkboxNode"  class="dijitReset dijitInline dijitCheckBox  "><input valuenow="on" value="on" pressed="true" style="-moz-user-select: none;" tabindex="0" class="dijitReset dijitCheckBoxInput" dojoattachpoint="inputNode" type="checkbox"></div></td><td width=16><div dojoAttachPoint="iconNode" class="dijitInline dijitTreeIcon" ></div></td><td><div hideFocus="true" dojoAttachPoint="labelNode" class="dijitTreeLabel "  tabindex="-1"></div></td></tr></table></div><div dojoAttachPoint="containerNode" class="dijitTreeContainer"  style="display:none;overflow:visible"></div></div>'
});
dojo.declare("unieap.tree.TreeNode", null, {
	        tree : null,
	        item : null,
	        readOnly : false,
	        disabled : false,
	        domNode : null,
	        constructor : function(a) {
		        dojo.mixin(this, a);
		        if (this.domNode && this.domNode.associatedData.readOnly == true) {
			        this.readOnly = true;
		        }
		        if (this.domNode && this.domNode.associatedData.disabled == true) {
			        this.disabled = true;
		        }
	        },
	        getFirstChild : function() {
		        if (this.tree.getChildrenByDom(this.domNode).length > 0) {
			        return this.tree._createTreeNode({
				                item : this.tree.getChildrenByDom(this.domNode)[0].associatedData.item,
				                domNode : this.tree.getChildrenByDom(this.domNode)[0],
				                tree : this.tree
			                });
		        } else {
			        return null;
		        }
	        },
	        getNextChild : function() {
		        var a = this.tree.getNextChildByDom(this.domNode);
		        if (a) {
			        return this.tree._createTreeNode({
				                item : a.associatedData.item,
				                domNode : a,
				                tree : this.tree
			                });
		        } else {
			        return null;
		        }
	        },
	        getPreviousChild : function() {
		        var a = this.tree.getPreviousChildByDom(this.domNode);
		        if (a) {
			        return this.tree._createTreeNode({
				                item : a.associatedData.item,
				                domNode : a,
				                tree : this.tree
			                });
		        } else {
			        return null;
		        }
	        },
	        getParent : function() {
		        var a = this.tree.getParentByDom(this.domNode);
		        if (a) {
			        return this.tree._createTreeNode({
				                item : a.associatedData.item,
				                domNode : a,
				                tree : this.tree
			                });
		        } else {
			        return null;
		        }
	        },
	        getChildren : function() {
		        var d = this.tree.getChildrenByDom(this.domNode);
		        if (d.length > 0) {
			        var a = [];
			        for (var b = 0; b < d.length; b++) {
				        var c = this.tree._createTreeNode({
					                item : this.tree.getChildrenByDom(this.domNode)[b].associatedData.item,
					                domNode : this.tree.getChildrenByDom(this.domNode)[b],
					                tree : this.tree
				                });
				        a.push(c);
			        }
			        return a;
		        } else {
			        return null;
		        }
	        },
	        getPosition : function() {
		        var c = this.tree.getParentByDom(this.domNode);
		        var a = 0;
		        if (c) {
			        var d = this.tree.getChildrenByDom(c);
			        for (var b = 0; b < d.length; b++) {
				        if (d[b] == this.domNode) {
					        a = b;
					        break;
				        }
			        }
		        }
		        return a;
	        },
	        getData : function() {
		        return this.item.data;
	        },
	        setChecked : function(b, a) {
		        if (this.readOnly || this.disabled) { return; }
		        this.tree.setChecked(this, b, a);
	        },
	        setReadOnly : function(a) {
		        this.readOnly = a;
		        this.domNode.associatedData.readOnly = a;
		        this.tree.getCheckboxInputNode(this.domNode).disabled = a;
		        if (a) {
			        dojo.addClass(this.tree.getLabelNode(this.domNode), "treeLabelReadOnly");
			        if (this.isChecked()) {
				        dojo.addClass(this.tree.getCheckboxNode(this.domNode),
				                "dijitCheckBoxCheckedDisabled");
			        } else {
				        dojo.addClass(this.tree.getCheckboxNode(this.domNode),
				                "treeCheckBoxReadOnly");
			        }
		        } else {
			        dojo.removeClass(this.tree.getLabelNode(this.domNode), "treeLabelReadOnly");
			        if (this.isChecked()) {
				        dojo.removeClass(this.tree.getCheckboxNode(this.domNode),
				                "dijitCheckBoxCheckedDisabled");
			        } else {
				        dojo.removeClass(this.tree.getCheckboxNode(this.domNode),
				                "treeCheckBoxReadOnly");
			        }
		        }
	        },
	        setDisabled : function(a) {
		        this.disabled = a;
		        this.domNode.associatedData.disabled = a;
		        this.tree.getCheckboxInputNode(this.domNode).disabled = a;
		        if (a) {
			        dojo.addClass(this.tree.getLabelNode(this.domNode), "treeLabelDisabled");
			        if (this.isChecked()) {
				        dojo.addClass(this.tree.getCheckboxNode(this.domNode),
				                "dijitCheckBoxCheckedDisabled");
			        } else {
				        dojo.addClass(this.tree.getCheckboxNode(this.domNode),
				                "treeCheckBoxReadOnly");
			        }
		        } else {
			        dojo.removeClass(this.tree.getLabelNode(this.domNode), "treeLabelDisabled");
			        if (this.isChecked()) {
				        dojo.removeClass(this.tree.getCheckboxNode(this.domNode),
				                "dijitCheckBoxCheckedDisabled");
			        } else {
				        dojo.removeClass(this.tree.getCheckboxNode(this.domNode),
				                "treeCheckBoxReadOnly");
			        }
		        }
		        this.tree.getBinding().setDisabled(this, a);
	        },
	        isReadOnly : function() {
		        return this.readOnly;
	        },
	        isDisabled : function() {
		        return this.disabled;
	        },
	        isChecked : function() {
		        return this.tree.getBinding().isSelected(this.item);
	        },
	        isLeaf : function() {
		        return this.tree.getBinding().isLeaf(this.item);
	        },
	        isRoot : function() {
		        return this.domNode.associatedData.isRoot;
	        },
	        isOpend : function() {
		        return this.domNode.associatedData.isExpanded;
	        },
	        getItem : function() {
		        return this.item;
	        },
	        getLevel : function() {
		        return this.domNode.associatedData.level;
	        },
	        getTree : function() {
		        return this.domNode.associatedData.tree;
	        },
	        getLabel : function() {
		        return this.domNode.associatedData.label;
	        },
	        getDomNode : function() {
		        return this.domNode;
	        },
	        destroyRelatedNode : function() {
		        this.destroyChildren(this.domNode);
	        },
	        destroyChildren : function(c) {
		        if (this.tree.lastFocused == c) {
			        this.tree.lastFocused = null;
		        }
		        var d = c.associatedData.item;
		        var b = this.tree.getChildrenByDom(c);
		        if (b) {
			        for (var a = 0; a < b.length; a++) {
				        this.destroyChildren(b[a]);
			        }
		        }
		        dojo.removeAttr(c, "associatedData");
		        delete d.domNode;
		        delete this.tree._nodeMap[this.tree.getBinding().getId(d)];
		        dojo.destroy(c);
	        },
	        refresh : function() {
		        var b = this.getTree().getChildrenByDom(this.domNode);
		        if (b && b.length > 0) {
			        for (var a = 0; a < b.length; a++) {
				        this.destroyChildren(b[a]);
			        }
		        }
		        this.domNode.associatedData.state = "UNCHECKED";
		        this.domNode.associatedData.isExpanded = false;
		        this.tree.getBinding().refresh(this.getItem());
		        this.tree.expandNode(this);
	        }
        });
dojo.declare("unieap.tree.Tree", [dijit._Widget, dijit._Templated], {
	UserInterfaces : {
		checkLogic : "object",
		binding : "object",
		treeEditor : "object",
		treeDnd : "object",
		label : "string",
		expandRoot : "boolean",
		loader : "object",
		pathSeparator : "string",
		animate : "boolean",
		securityId : "string",
		id : "string",
		jsId : "string",
		"class" : "string",
		style : "string",
		getIconClass : "function",
		getLabelClass : "function",
		getIconStyle : "function",
		getLabelStyle : "function",
		onBeforeClick : "function",
		onClick : "function",
		onAfterClick : "function",
		onSetNodeClass : "function",
		onMouseOver : "function",
		onMouseOut : "function",
		onMouseDown : "function",
		onDblClick : "function",
		onContextMenu : "function",
		onBeforeCollapse : "function",
		onAfterCollapse : "function",
		onBeforeExpand : "function",
		onAfterExpand : "function",
		onBeforeSelectAll : "function",
		onAfterSelectAll : "function",
		onBeforeSetCurrentNode : "function",
		onAfterSetCurrentNode : "function",
		onEnterKeyPress : "function",
		onAfterNodeRender : "function"
	},
	treeLoaderClass : "unieap.tree.TreeLoader",
	checkLogicClass : "unieap.tree.CheckLogic",
	dndSourceClass : "unieap.tree.DndSource",
	treeEditorClass : "unieap.tree.TreeEditor",
	checkLogic : null,
	binding : null,
	treeEditor : null,
	treeDnd : null,
	label : "",
	expandRoot : true,
	loader : null,
	pathSeparator : "/",
	animate : (typeof(unieap.animate) == "undefined") ? true : unieap.animate,
	securityId : "",
	_nodeMap : null,
	_editing : false,
	globalTreeNode : null,
	templateString : '<div class="dijitTreeContainer" dojoAttachPoint="treeNode"></div>',
	postCreate : function() {
		this.connect(this.treeNode, "onclick", "_onClick");
		this.connect(this.treeNode, "onkeypress", "_onKeyPress");
		this.connect(this.treeNode, "ondblclick", "_onDblClick");
		this.connect(this.treeNode, "oncontextmenu", "_onContextMenu");
		this.connect(this.treeNode, "onmouseover", "_onMouseOver");
		this.connect(this.treeNode, "onmouseout", "_onMouseOut");
		this.connect(this.treeNode, "onmousedown", "_onMouseDown");
		this.showRoot = Boolean(this.label);
		this._nodeMap = {};
		this.globalTreeNode = this._createTreeNode({
			        tree : this
		        });
		this._load();
		this.inherited("postCreate", arguments);
		this.getDndSource();
	},
	_load : function() {
		this.rootNodeUI = new unieap.tree.TreeNodeUI();
		dojo.removeAttr(this.rootNodeUI.domNode, "id");
		this.rootNodeUI.domNode.associatedData = {
			isExpanded : false,
			item : this.getBinding().getRootNodeItem(),
			isRoot : true,
			tree : this,
			label : this.label,
			level : 0,
			state : "UNCHECKED",
			readOnly : false,
			disabled : false
		};
		this.rootNodeUI.domNode.associatedData.item.domNode = this.rootNodeUI.domNode;
		this._nodeMap[this.getBinding().rootNodeId] = this.rootNodeUI.domNode;
		if (!this.getCheckLogic() || !this.getCheckLogic().isShowRootCheckbox()) {
			this.getCheckboxNode(this.rootNodeUI.domNode).style.display = "none";
		}
		this.setLabelNode(this.rootNodeUI.domNode, this.label);
		this._setExpando(this.rootNodeUI.domNode);
		this._updateItemClasses(this.rootNodeUI.domNode);
		this.domNode.appendChild(this.rootNodeUI.domNode);
		if (!this.showRoot) {
			this.rootNodeUI.renderNode.style.display = "none";
		}
		this._updateLayout(this.rootNodeUI.domNode);
		if (this.expandRoot) {
			this._expandNode(this.rootNodeUI.domNode);
		}
	},
	destroy : function() {
		for (var a in this._nodeMap) {
			dojo.removeAttr(this._nodeMap[a], "associatedData");
		}
		this._nodeMap = null;
		this.rootNodeUI.destroy();
		if (unieap.isClassEntity(this.treeEditor)) {
			this.getEditor().destroy();
		}
		if (unieap.isClassEntity(this.treeDnd)) {
			this.getDndSource().destroy();
		}
		this.inherited(arguments);
	},
	getParentByDom : function(b) {
		for (var c = b.parentNode; c; c = c.parentNode) {
			var a = c.getAttribute && c.getAttribute("isTreeNode");
			if (a) { return c; }
		}
		return null;
	},
	getNextChildByDom : function(a) {
		var b = a;
		do {
			b = b.nextSibling;
		} while (b && b.nodeType != 1);
		if (!b) { return null; }
		return b;
	},
	getPreviousChildByDom : function(a) {
		var b = a;
		do {
			b = b.previousSibling;
		} while (b && b.nodeType != 1);
		if (!b) { return null; }
		return b;
	},
	getChildrenByDom : function(d) {
		var c = [];
		for (var b = 0, a = this.getContainerNode(d).childNodes; a[b]; b++) {
			c.push(a[b]);
		}
		return c;
	},
	getContentNode : function(a) {
		return a.firstChild;
	},
	getShowingNode : function(a) {
		return a.firstChild.firstChild;
	},
	getExpandoNode : function(a) {
		return a.firstChild.firstChild.rows[0].cells[0].firstChild;
	},
	getCheckboxNode : function(a) {
		return a.firstChild.firstChild.rows[0].cells[1].firstChild;
	},
	getCheckboxInputNode : function(a) {
		return a.firstChild.firstChild.rows[0].cells[1].firstChild.firstChild;
	},
	getIconNode : function(a) {
		return a.firstChild.firstChild.rows[0].cells[2].firstChild;
	},
	getLabelNode : function(a) {
		if (a) { return a.firstChild.firstChild.firstChild.firstChild.childNodes[3].firstChild; }
	},
	getContainerNode : function(a) {
		return a.childNodes[1];
	},
	setNodeCollapseStyle : function(a, b) {
		if (!a.associatedData.isExpanded) { return; }
		a.associatedData.isExpanded = false;
		this._setExpando(a);
		this._updateItemClasses(a);
		if (this.getContainerNode(a)) {
			if (b == false || this.animate == false) {
				this.getContainerNode(a).style.display = "none";
			} else {
				var c = this;
				this._wipeOut = dojo.fx.wipeOut({
					        node : this.getContainerNode(a),
					        duration : 200
				        });
				dojo.connect(this._wipeOut, "onEnd", function() {
					        c.getContainerNode(a).style.width = "";
					        c.getContainerNode(a).style.height = "";
				        });
				this._wipeOut.play();
			}
		}
	},
	setNodeExpandStyle : function(a, c) {
		if (a.associatedData.isExpanded) { return; }
		a.associatedData.isExpanded = true;
		this._wipeOut && this._wipeOut.stop();
		this._setExpando(a);
		this._updateItemClasses(a);
		if (this.getContainerNode(a)) {
			if (c == false || this.animate == false) {
				var b = this.getContainerNode(a);
				b.style.display = "block";
				b.style.width = "auto";
				b.style.height = "auto";
			} else {
				var d = this;
				this._wipeIn = dojo.fx.wipeIn({
					        node : this.getContainerNode(a),
					        duration : 200
				        });
				dojo.connect(this._wipeIn, "onEnd", function() {
					        d.getContainerNode(a).style.width = "auto";
					        d.getContainerNode(a).style.height = "auto";
					        if (dojo.isIE) {
						        d.getContainerNode(a).style.display = "";
						        d.getContainerNode(a).style.display = "block";
					        }
				        });
				this._wipeIn.play();
			}
		}
	},
	setLabelNode : function(a, b) {
		if (!b) {
			b = "";
		} else {
			b = String(b).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
			        .replace(/\s/g, "&nbsp;");
		}
		this.getLabelNode(a).innerHTML = b;
	},
	_setExpando : function(b, d) {
		var c = ["dijitTreeExpandoLoading", "dijitTreeExpandoOpened", "dijitTreeExpandoClosed",
		        "dijitTreeExpandoLeaf"];
		var a = d ? 0 : (!this.isLeafByData(b.associatedData.item) ? (b.associatedData.isExpanded
		        ? 1
		        : 2) : 3);
		this.getExpandoNode(b).className = c[a];
	},
	_updateItemClasses : function(e, g) {
		var b = g || e.firstChild.firstChild.rows[0];
		var d = b.cells[2].firstChild;
		var a = this.getIconClass(e.associatedData.item, e.associatedData.isExpanded, !this
		                .isLeafByData(e.associatedData.item));
		d.className = "dijitInline dijitTreeIcon " + a;
		if (this.getIconStyle(e.associatedData.item, e.associatedData.isExpanded, !this
		                .isLeafByData(e.associatedData.item))) {
			dojo.style(d, this.getIconStyle(e.associatedData.item, e.associatedData.isExpanded,
			                !this.isLeafByData(e.associatedData.item)));
		}
		var c = this.getLabelClass(e.associatedData.item, e.associatedData.isExpanded, !this
		                .isLeafByData(e.associatedData.item));
		if (c) {
			var f = b.cells[3].firstChild;
			f.className = c;
		}
		if (this.getLabelStyle(e.associatedData.item, e.associatedData.isExpanded, !this
		                .isLeafByData(e.associatedData.item))) {
			dojo
			        .style(this.getLabelNode(e), this.getLabelStyle(e.associatedData.item,
			                        e.associatedData.isExpanded, !this
			                                .isLeafByData(e.associatedData.item)));
		}
		this._setGlobalTreeNode(e, e.associatedData.item);
		this.onSetNodeClass(this.globalTreeNode);
	},
	clearIconClass : function(a) {
		this.getIconNode(a).className = "";
	},
	_updateLayout : function(a) {
		var b = this.getParentByDom(a);
		if (!b || this.getContentNode(b).style.display == "none") {
			dojo.addClass(a, "dijitTreeIsRoot");
		} else {
			dojo.toggleClass(a, "dijitTreeIsLast", !this.getNextChildByDom(a));
		}
	},
	markProcessing : function(a) {
		this.state = "LOADING";
		this._setExpando(a, true);
	},
	unmarkProcessing : function(a) {
		this._setExpando(a, false);
	},
	getIconClass : function(c, d, e) {
		if (c) {
			var a = this.getBinding().getIconClass(c);
			if (a) { return a; }
		}
		var b = (!c || e) ? (d ? "dijitFolderOpened" : "dijitFolderClosed") : "dijitLeaf";
		return b;
	},
	getLabelClass : function(b, c, d) {
		if (b) {
			var a = this.getBinding().getLabelClass(b);
			if (a) { return a; }
		}
	},
	getIconStyle : function(a, b, c) {},
	getLabelStyle : function(a, b, c) {},
	createNode : function(e, a, c) {
		if (!a) { return; }
		var d = a.domNode;
		var b = dojo.hitch(this, function() {
			        var f = this.getBinding().addItem(e, a.getItem());
			        this._addChildren(f, d, c);
		        });
		if (!a.getItem().loaded) {
			this.loadNodeData(a.getItem(), dojo.hitch(this, b));
		} else {
			b();
		}
	},
	deleteNode : function(e, c) {
		if (!e || e.isRoot()) { return; }
		var d = e.getItem();
		var b = e.getParent();
		var a = null;
		if (b) {
			a = b.getItem();
		}
		delete d.domNode;
		if (c != false) {
			this.getBinding().deleteItem(d, a);
		}
		e.destroyRelatedNode();
		if (b) {
			this._updateItemClasses(b.domNode);
			this._setExpando(b.domNode, false);
			var f = this;
			if (b.getChildren()) {
				dojo.forEach(b.getChildren(), function(g) {
					        f._updateLayout(g.domNode);
				        });
			} else {
				b.domNode.associatedData.isExpanded = false;
				this.getContainerNode(b.domNode).style.display = "none";
			}
		}
	},
	expandNodeByLevel : function(a) {
		this.collapseAllNodes();
		this.toExpandNodeByLevel = [];
		this.toExpandNodeByLevel.push(this.rootNodeUI.domNode);
		this._expandNodeByLevelHelper(this.rootNodeUI.domNode, a);
	},
	_expandNodeByLevelHelper : function(a, c) {
		var b = dojo.hitch(this, function(e) {
			        this.toExpandNodeByLevel.shift();
			        this._expandNode(a, false);
			        a.associatedData.isExpanded = true;
			        if (a.associatedData.level < c) {
				        var g = this.getChildrenByDom(a);
				        if (g && g.length > 0) {
					        for (var f = 0, d = g.length; f < d; f++) {
						        this.toExpandNodeByLevel.push(g[f]);
					        }
				        }
			        }
			        if (this.toExpandNodeByLevel.length > 0) {
				        this._expandNodeByLevelHelper(this.toExpandNodeByLevel[0], c);
			        } else {
				        return;
			        }
		        });
		if (a.associatedData.item.loaded) {
			b();
		} else {
			this.getBinding().getChildren(a.associatedData.item, dojo.hitch(this, b));
		}
	},
	expandAllNodes : function() {
		this.toExpandNodeAll = [];
		this.toExpandNodeAll.push(this.rootNodeUI.domNode);
		this._expandNodeAllHelper(this.rootNodeUI.domNode);
	},
	_expandNodeAllHelper : function(a) {
		var b = dojo.hitch(this, function(c) {
			        var f = this.toExpandNodeAll.shift();
			        this._expandNode(f, false);
			        f.associatedData.isExpanded = true;
			        var e = this.getChildrenByDom(f);
			        if (e && e.length > 0) {
				        for (var d = 0, g; (g = e[d]); d++) {
					        if (!this.isLeafByData(g.associatedData.item)) {
						        this.toExpandNodeAll.push(e[d]);
					        }
				        }
			        }
			        if (this.toExpandNodeAll.length) {
				        this._expandNodeAllHelper(this.toExpandNodeAll[0]);
			        }
		        });
		if (a.associatedData.item.loaded) {
			b();
		} else {
			this.getBinding().getChildren(a.associatedData.item, b);
		}
	},
	collapseAllNodes : function() {
		var a = 0;
		if (!this.showRoot) {
			a = 1;
		}
		for (var b in this._nodeMap) {
			if (this._nodeMap[b].associatedData.level >= a
			        && this._nodeMap[b].associatedData.isExpanded) {
				this._collapseNode(this._nodeMap[b], false);
			}
		}
	},
	setCurrentNode : function(b) {
		if (b.isDisabled()) { return; }
		var a = this.onBeforeSetCurrentNode(b);
		if (a === false) { return; }
		this._onTreeFocus(b.domNode);
		this.focusNode(b.getDomNode());
		this.onAfterSetCurrentNode(b);
	},
	getCurrentNode : function() {
		if (this.lastFocused) {
			return this._createTreeNode({
				        item : this.lastFocused.associatedData.item,
				        domNode : this.lastFocused,
				        tree : this
			        });
		} else {
			return null;
		}
	},
	selectAll : function(b) {
		if (this.getCheckLogic()) {
			var a = this.onBeforeSelectAll();
			if (a == false) { return; }
			this.getCheckLogic().selectAll(b);
			this.onAfterSelectAll();
		} else {
			return;
		}
	},
	getSelectedNodes : function() {
		var b = [];
		for (var a in this._nodeMap) {
			if (this._nodeMap[a].associatedData.isChecked
			        && !this._nodeMap[a].associatedData.isRoot) {
				b.push(this._createTreeNode({
					        item : this._nodeMap[a].associatedData.item,
					        domNode : this._nodeMap[a],
					        tree : this
				        }));
			}
		}
		return b;
	},
	expandNodeByPath : function(b, c) {
		var a = c || function() {};
		this.pathToExpand = b.split(this.pathSeparator);
		if (this.pathToExpand && this.pathToExpand.length > 0 && this.pathToExpand[0] == "") {
			this.pathToExpand.splice(0, 1);
		}
		this._expandNodeByPathHelper(this.rootNodeUI.domNode, a);
	},
	_expandNodeByPathHelper : function(c, a) {
		var b;
		if (this.getBinding().getId(c.associatedData.item) == this.pathToExpand[0]) {
			b = this.pathToExpand.shift();
		}
		var d = dojo.hitch(this, function(e) {
			        this._expandNode(c, false);
			        c.associatedData.isExpanded = true;
			        if (this.pathToExpand.length > 0 && this._nodeMap[this.pathToExpand[0]]) {
				        this._expandNodeByPathHelper(this._nodeMap[this.pathToExpand[0]], a);
			        } else {
				        if (this.pathToExpand.length == 0 && this._nodeMap[b]) {
					        var f = this.getNodeByDom(this._nodeMap[b]);
					        a(f);
				        } else {
					        return;
				        }
			        }
		        });
		if (c.associatedData.item.loaded) {
			d();
		} else {
			this.getBinding().getChildren(c.associatedData.item, dojo.hitch(this, d));
		}
	},
	_addChildren : function(e, c, a) {
		if (c.associatedData.state == "UNCHECKED" && c.associatedData.isExpanded != true) {
			this._expandNode(c, false);
		} else {
			var f = c.cloneNode(true);
			f.className = "dijitTreeNode";
			this.getContentNode(f).className = "treeRenderNode";
			this.getLabelNode(f).className = "dijitTreeLabel";
			this.getContainerNode(f).innerHTML = "";
			dojo.removeClass(this.getShowingNode(f));
			this.getContainerNode(f).style.display = "none";
			this._createChildrenDom(c, f, e);
			var b = this.getChildrenByDom(c);
			if (b && b.length > 0 && a != "undefined" && a <= b.length && a >= 0) {
				if (a < b.length) {
					dojo.place(f, b[a], "before");
				} else {
					dojo.place(f, b[a - 1], "after");
				}
			} else {
				this.getContainerNode(c).appendChild(f);
			}
			var d = this._createTreeNode({
				        item : e,
				        domNode : f,
				        tree : this
			        });
			this.onAfterNodeRender(d);
			this._setExpando(c);
			this._updateItemClasses(c);
			var h = this;
			var g = this.getChildrenByDom(c);
			dojo.forEach(g, function(i) {
				        h._updateLayout(i);
			        });
			this._expandNode(c);
		}
	},
	_createChildrenDom : function(c, a, h) {
		a.style.display = "block";
		h.domNode = a;
		var g = this.getBinding().isSelected(h);
		var d = this.getBinding().isDisabledByData(h);
		a.associatedData = {
			readOnly : false,
			disabled : d,
			isChecked : g,
			domNode : a,
			isExpanded : false,
			item : h,
			isRoot : false,
			tree : this,
			label : this.getBinding().getLabel(h),
			level : c.associatedData.level + 1,
			state : "UNCHECKED"
		};
		if (!this.getCheckLogic()) {
			this.getCheckboxNode(a).style.display = "none";
		} else {
			this.getCheckboxNode(a).style.display = "block";
			this.getCheckboxNode(a).className = "dijitCheckBox";
			this.getCheckboxInputNode(a).disabled = d;
		}
		var b = this._createTreeNode({
			        item : h,
			        domNode : a,
			        tree : this
		        });
		this.tmpElementParentNode = a.firstChild.firstChild.rows[0];
		if (this.getCheckLogic() && (this.getNodeByDom(c).isChecked() || g)) {
			this.getCheckLogic().setCheckedForNewNode(b);
		}
		this.getContentNode(a).style.display = "block";
		this._nodeMap[this.getBinding().getId(h)] = a;
		var e = this.getBinding().getLabel(h);
		this.tmpElementParentNode.cells[3].firstChild.innerHTML = e || "";
		var i = ["dijitTreeExpandoLoading", "dijitTreeExpandoOpened", "dijitTreeExpandoClosed",
		        "dijitTreeExpandoLeaf"];
		var f = (!this.isLeafByData(a.associatedData.item)
		        ? (a.associatedData.isExpanded ? 1 : 2)
		        : 3);
		this.tmpElementParentNode.cells[0].firstChild.className = i[f];
		this._updateItemClasses(a, this.tmpElementParentNode);
		if (d) {
			b.setDisabled(true);
		}
	},
	setChildItems : function(e, g) {
		e.associatedData.state = "LOADED";
		var c = e.cloneNode(true);
		c.className = "dijitTreeNode";
		this.getContentNode(c).className = "treeRenderNode";
		this.getLabelNode(c).className = "dijitTreeLabel";
		dojo.removeClass(this.getShowingNode(c));
		this.getContentNode(c).style.display = "block";
		if (g && g.length > 0) {
			var h = document.createDocumentFragment();
			for (var f = 0; f < g.length; f++) {
				if (!g[f]) {
					continue;
				}
				var a = c.cloneNode(true);
				this._createChildrenDom(e, a, g[f]);
				h.appendChild(a);
				var b = this._createTreeNode({
					        item : g[f],
					        domNode : a,
					        tree : this
				        });
				this.onAfterNodeRender(b);
			}
			this.getContainerNode(e).appendChild(h);
			var j = this.getChildrenByDom(e);
			for (var d = 0; d < j.length; d++) {
				this._updateLayout(j[d]);
			}
		} else {
			this._updateItemClasses(e);
		}
		if (this._setExpando) {
			this._setExpando(e, false);
		}
	},
	isLeafByData : function(a) {
		return this.getBinding().isLeaf(a);
	},
	_createTreeNode : function(a) {
		return new unieap.tree.TreeNode(a);
	},
	focusNode : function(a) {},
	_expandNode : function(b, c) {
		if (b.associatedData.isExpanded) { return; }
		this._setGlobalTreeNode(b, b.associatedData.item);
		var a = this.onBeforeExpand(this.globalTreeNode);
		if (a == false) { return; }
		if (this.isLeafByData(b.associatedData.item)) {
			if (this.loader != null) {
				this.setChildItems(b, []);
				this.setNodeExpandStyle(b, c);
			}
			return;
		}
		switch (b.associatedData.state) {
			case "LOADING" :
				return;
			case "UNCHECKED" :
				this.markProcessing(b);
				var d = this;
				this.getBinding().getChildren(b.associatedData.item, function(e) {
					        d.unmarkProcessing(b);
					        d.setChildItems(b, e);
					        d.setNodeExpandStyle(b, c);
					        d.onAfterExpand(d.globalTreeNode);
				        }, function(e) {
					        console.error(d, ": error loading children: ", e);
				        });
				break;
			default :
				this.setNodeExpandStyle(b, c);
				this.onAfterExpand(this.globalTreeNode);
		}
	},
	_collapseNode : function(b, c) {
		this._setGlobalTreeNode(b, b.associatedData.item);
		var a = this.onBeforeCollapse(this.globalTreeNode);
		if (a == false) { return; }
		if (!this.isLeafByData(b.associatedData.item)) {
			if (b.associatedData.state == "LOADING") { return; }
			this.setNodeCollapseStyle(b, c);
			this.onAfterCollapse(this.globalTreeNode);
		}
	},
	blurNode : function() {
		var c = this.lastFocused;
		if (!c) { return; }
		var b = this.getLabelNode(c);
		var a = this.getShowingNode(c);
		dojo.removeClass(a, "dijitTreeLabelFocused");
		b.setAttribute("tabIndex", "-1");
		this.lastFocused = null;
	},
	getModuleInstance : function(d, a) {
		dojo.require("unieap.util.util");
		var e = this[d];
		if (!unieap.isClassEntity(e)) {
			e = dojo.mixin({
				        widget : this
			        }, e);
			a = e.declaredClass || a;
			dojo.require(a);
			var c = dojo.getObject(a);
			e = new c(e);
			var b = (function(g) {
				for (var f in this) {
					if (this[f] == g) { return f; }
				}
				return "";
			}).call(this, arguments.callee.caller);
			this[b] = function() {
				return e;
			};
			this[d] = e;
		}
		return e;
	},
	getRootNode : function() {
		return this._createTreeNode({
			        item : this.getBinding().getRootNodeItem(),
			        domNode : this.rootNodeUI.domNode,
			        tree : this
		        });
	},
	getBinding : function() {
		if (this.binding) {
			if (!this.binding.bindingClass) {
				this.binding.bindingClass = "unieap.tree.RowSetTreeBinding";
			}
		} else {
			this.binding = {};
			this.binding.bindingClass = "unieap.tree.RowSetTreeBinding";
		}
		return this.getModuleInstance("binding", this.binding.bindingClass);
	},
	getCheckLogic : function() {
		if (this.checkLogic) {
			return this.getModuleInstance("checkLogic", this.checkLogicClass);
		} else {
			return null;
		}
	},
	getEditor : function() {
		if (this.treeEditor) {
			return this.getModuleInstance("treeEditor", this.treeEditorClass);
		} else {
			return null;
		}
	},
	getLoader : function() {
		return this.getModuleInstance("loader", this.treeLoaderClass);
	},
	getDndSource : function() {
		if (this.treeDnd) {
			return this.getModuleInstance("treeDnd", this.dndSourceClass);
		} else {
			return null;
		}
	},
	getText : function() {
		return this.label;
	},
	expandNode : function(a) {
		if (!a) { return; }
		this._expandNode(a.domNode);
	},
	collapseNode : function(a, b) {
		if (!a) { return; }
		this._collapseNode(a.domNode, b);
	},
	loadNodeData : function(a, b) {
		this.getBinding().getChildren(a, b);
	},
	getPath : function(d) {
		if (!d) { return null; }
		if (d.isRoot()) { return this.pathSeparator; }
		var a = [this.getBinding().getId(d.getItem())];
		var e = this.getParentByDom(d.domNode);
		while (e) {
			if (e == this.rootNodeUI.domNode) {
				break;
			}
			a.unshift(this.getBinding().getId(e.associatedData.item));
			e = this.getParentByDom(e);
		}
		var c = this.pathSeparator;
		return c + a.join(c);
	},
	getNodeByDom : function(a) {
		return this._createTreeNode({
			        item : a.associatedData.item,
			        domNode : a,
			        tree : this
		        });
	},
	getNodeByItem : function(a) {
		if (a.domNode) {
			return this._createTreeNode({
				        item : a,
				        domNode : a.domNode,
				        tree : this
			        });
		} else {
			return null;
		}
	},
	getNodeById : function(a) {
		if (this._nodeMap[a]) {
			return this._createTreeNode({
				        item : this._nodeMap[a].associatedData.item,
				        domNode : this._nodeMap[a],
				        tree : this
			        });
		} else {
			return null;
		}
	},
	setChecked : function(d, c, b, a) {
		if (!d || d.isReadOnly() || d.isDisabled() || !this.getCheckLogic()) { return; }
		if (b != null && b != "undefined" && b == false) {
			this.getCheckLogic().setChecked(d, c, "Multiple", a);
		} else {
			this.getCheckLogic().setChecked(d, c, null, a);
		}
	},
	showNodesById : function(e, j) {
		this.callback = j || function() {};
		var h = (dojo.isString(e) ? e.split(",") : e),
			c = {};
		for (var d = h.length - 1; d >= 0; d--) {
			var a = h[d];
			if (a in this._nodeMap) {
				var b = this.getNodeByDom(this._nodeMap[a]);
				var f = b.getParent();
				if (f) {
					var k = this.getPath(f);
					this.expandNodeByPath(k);
				}
				this.setCurrentNode(b);
				this.callback(b);
				continue;
			}
			c[a] = 1;
		}
		if (unieap.isEmpty(c)) {
			this.callback = null;
			return;
		}
		this.stack = [];
		this.dataStack = [];
		this.pathMap = c;
		var g = this.getBinding().getRootNodeItem();
		this.searchNode(g);
	},
	searchNode : function(a) {
		if (a == null) { return; }
		this.stack.push(a);
		var c = dojo.hitch(this, function(m) {
			        m = m || [];
			        var d = [];
			        var j = [];
			        for (var h = 0, p; (p = m[h]); h++) {
				        if (p.loaded) {
					        j.unshift(p);
				        } else {
					        j.push(p);
				        }
			        }
			        a.last = j[j.length - 1];
			        for (var h = 0, p; (p = j[h]); h++) {
				        var e = String(this.getBinding().getId(p));
				        if (e in this.pathMap) {
					        var q = [];
					        for (var g = 1, n = this.stack.length; g < n; g++) {
						        q[g] = this.getBinding().getId(this.stack[g]);
					        }
					        q = q.join(this.pathSeparator);
					        this.expandNodeByPath(q);
					        var l = this.getNodeById(e);
					        this.setCurrentNode(l);
					        this.callback(l);
					        delete this.pathMap[e];
					        continue;
				        }
				        if (!this.getBinding().isLeaf(p)) {
					        d.push(p);
				        }
			        }
			        if (unieap.isEmpty(this.pathMap)) {
				        this.callback = null;
				        return;
			        }
			        Array.prototype.unshift.apply(this.dataStack, d);
			        if (d.length == 0) {
				        var f, o;
				        do {
					        f = this.stack.pop();
					        delete f.last;
					        o = this.stack[this.stack.length - 1];
				        } while (o && a.last == f);
			        }
			        if (arguments[1] != false) {
				        throw new Error("break onComplete");
			        } else {
				        this.searchNode(this.dataStack.shift());
			        }
		        });
		try {
			this.loadNodeData(a, c);
		}
		catch (b) {
			this.searchNode(this.dataStack.shift());
		}
	},
	_setGlobalTreeNode : function(a, b) {
		this.globalTreeNode.domNode = a;
		this.globalTreeNode.item = b;
		this.globalTreeNode.tree = this;
		this.globalTreeNode.readOnly = a.associatedData.readOnly;
		this.globalTreeNode.disabled = a.associatedData.disabled;
	},
	_onClick : function(a) {
		if (this._editing) { return; }
		var d = a.target;
		var b = this._getTreeDomNodeByEvent(a);
		if (!b) { return; }
		dojo.stopEvent(a);
		this.focusNode(b);
		var c = this.getNodeByDom(b);
		if (d == this.getCheckboxNode(b) || d == this.getCheckboxInputNode(b)) {
			this._handleCheckboxClick(c, a);
		} else {
			if (d == this.getExpandoNode(b)) {
				if (!this.isLeafByData(c.getItem())) {
					this._onExpandoClick(c);
				}
			} else {
				this._selectedNode = b;
				this._handleClick(c);
			}
		}
	},
	_handleCheckboxClick : function(c, a) {
		if (c.isReadOnly() || c.isDisabled()) { return; }
		var b = !c.isChecked();
		if (this.getCheckLogic()) {
			this.setChecked(c, b, null, a);
		} else {
			return;
		}
	},
	_onExpandoClick : function(a) {
		if (a.isOpend()) {
			this._collapseNode(a.domNode);
		} else {
			this._expandNode(a.domNode);
		}
	},
	_onKeyPress : function(f) {
		if (this.getEditor() && this._editing == true) { return; }
		if (f.altKey) { return; }
		var c = this.getCurrentNode();
		if (c && c.isDisabled()) { return; }
		if (!c) { return; }
		var b = dojo.keys;
		var a = f.charOrCode;
		if (typeof a == "string") {
			dojo.stopEvent(f);
			return;
		} else {
			var d = this._keyHandlerMap;
			if (!d) {
				d = {};
				d[b.ENTER] = "_onEnterKey";
				d[b.UP_ARROW] = "_onUpArrow";
				d[b.DOWN_ARROW] = "_onDownArrow";
				d[b.LEFT_ARROW] = "_onLeftArrow";
				d[b.RIGHT_ARROW] = "_onRightArrow";
				d[b.HOME] = "_onHomeKey";
				d[b.END] = "_onEndKey";
				this._keyHandlerMap = d;
			}
			if (this._keyHandlerMap[a]) {
				this[this._keyHandlerMap[a]](c);
				dojo.stopEvent(f);
			}
		}
	},
	_onLeftArrow : function(b) {
		if (!b.isLeaf() && b.isOpend()) {
			this.collapseNode(b);
		} else {
			var a = b.getParent();
			if (a && !a.isRoot()) {
				this.setCurrentNode(a);
			} else {
				if (a && a.isRoot() && this.showRoot) {
					this.setCurrentNode(a);
				} else {
					return;
				}
			}
		}
	},
	_onRightArrow : function(b) {
		if (!b.isLeaf() && !b.isOpend()) {
			this.expandNode(b);
		} else {
			if (!b.isLeaf()) {
				var a = b.getFirstChild();
				if (a) {
					this.setCurrentNode(a);
				}
			}
		}
	},
	_onUpArrow : function(d) {
		try {
			this.focusNode(d.getDomNode());
		}
		catch (f) {
			return;
		}
		var c = d.getPreviousChild();
		if (c) {
			d = c;
			while (!d.isLeaf() && d.isOpend() && d.getChildren()) {
				var a = d.getChildren();
				d = a[a.length - 1];
			}
		} else {
			var b = d.getParent();
			if (!(!this.showRoot && b.isRoot())) {
				d = b;
			}
		}
		if (d) {
			this.setCurrentNode(d);
		}
	},
	_onDownArrow : function(b) {
		try {
			this.focusNode(b.getDomNode());
		}
		catch (c) {
			return;
		}
		var a = this._getNextNode(b);
		if (a) {
			this.setCurrentNode(a);
		}
	},
	_getNextNode : function(c) {
		var b = c.getChildren();
		if (!c.isLeaf() && c.isOpend() && b) {
			return b[0];
		} else {
			while (c) {
				var a = c.getNextChild();
				if (a) { return a; }
				c = c.getParent();
			}
			return null;
		}
	},
	_onEnterKey : function(a) {
		this.onEnterKeyPress(a);
	},
	_onHomeKey : function(a) {
		var a = this._getRootOrFirstNode();
		if (a) {
			this.setCurrentNode(a);
		}
	},
	_getRootOrFirstNode : function() {
		return this.showRoot ? this.getRootNode() : this.getRootNode().getChildren()[0];
	},
	_onEndKey : function(a) {
		var a = this.getRootNode();
		while (a.isOpend()) {
			var b = a.getChildren();
			a = b[b.length - 1];
		}
		if (a) {
			this.setCurrentNode(a);
		}
	},
	_onContextMenu : function(a) {
		var b = this._getTreeDomNodeByEvent(a);
		dojo.stopEvent(a);
		if (!b || b.associatedData.disabled) { return; }
		this._setGlobalTreeNode(b, b.associatedData.item);
		var c = this.getNodeByDom(b);
		this.onContextMenu(c);
	},
	_onDblClick : function(a) {
		var c = a.target;
		var b = this._getTreeDomNodeByEvent(a);
		if (!b || b.associatedData.disabled) { return; }
		this.focusNode(b);
		if (c == this.getExpandoNode(b) || c == this.getCheckboxNode(b)) {
			return;
		} else {
			this._setGlobalTreeNode(b, b.associatedData.item);
			this.onDblClick(this.globalTreeNode);
		}
	},
	_handleClick : function(c) {
		if (c.isDisabled()) { return; }
		var a = this.onBeforeClick(c);
		if (a === false) { return; }
		if (this.getEditor() && this.lastFocused == c.domNode && !c.isReadOnly() && !c.isDisabled()) {
			this._editing = true;
			var b = this.getNodeByDom(c.domNode);
			this.getEditor().editNode(b);
		} else {
			this.setCurrentNode(c);
		}
		a = this.onClick(c);
		if (a === false) { return; }
		this.onAfterClick(c);
	},
	_onTreeFocus : function(c) {
		if (c != this.lastFocused) {
			this.blurNode();
		}
		var b = this.getLabelNode(c);
		var a = this.getShowingNode(c);
		b.setAttribute("tabIndex", "0");
		dojo.removeClass(a, "unieapTreeMouseOver");
		dojo.addClass(a, "dijitTreeLabelFocused");
		this.lastFocused = c;
	},
	_onMouseOut : function(a) {
		var b = this._getTreeDomNodeByEvent(a);
		if (!b || b.associatedData.disabled) { return; }
		dojo.removeClass(this.getShowingNode(b), "unieapTreeMouseOver");
		this._setGlobalTreeNode(b, b.associatedData.item);
		this.onMouseOut(this.globalTreeNode, a);
	},
	_onMouseOver : function(a) {
		var b = this._getTreeDomNodeByEvent(a);
		if (!b || b.associatedData.disabled) { return; }
		if (b != this.lastFocused) {
			dojo.addClass(this.getShowingNode(b), "unieapTreeMouseOver");
		}
		this._setGlobalTreeNode(b, b.associatedData.item);
		this.onMouseOver(this.globalTreeNode, a);
	},
	_onMouseDown : function(a) {
		var b = this._getTreeDomNodeByEvent(a);
		if (!b || b.associatedData.disabled) { return; }
		this._setGlobalTreeNode(b, b.associatedData.item);
		this.onMouseDown(this.globalTreeNode);
	},
	_getTreeDomNodeByEvent : function(b) {
		var e = b.target;
		if (dojo.hasClass(e, "dijitTreeContainer")) { return null; }
		var c = null;
		for (var d = e; d; d = d.parentNode) {
			var a = d.getAttribute && d.getAttribute("isTreeNode");
			if (a) {
				c = d;
				break;
			}
		}
		return c;
	},
	onBeforeClick : function(a) {},
	onClick : function(a) {},
	onAfterClick : function(a) {},
	onSetNodeClass : function(a) {},
	onMouseOver : function(a) {},
	onMouseOut : function(a) {},
	onMouseDown : function(a) {},
	onDblClick : function(a) {},
	onContextMenu : function(a) {},
	onBeforeCollapse : function(a) {},
	onAfterCollapse : function(a) {},
	onBeforeExpand : function(a) {},
	onAfterExpand : function(a) {},
	onBeforeSelectAll : function() {},
	onAfterSelectAll : function() {},
	onBeforeSetCurrentNode : function(a) {
		return true;
	},
	onAfterSetCurrentNode : function(a) {},
	onEnterKeyPress : function(a) {},
	freshNodeLabel : function(b) {
		if (b && this.getLabelNode(b.domNode)) {
			var a = this.getBinding().getLabel(b.getItem());
			var c = this.getLabelNode(b.domNode).innerHTML;
			if (a != c) {
				if (!a) {
					a = "";
				} else {
					a = String(a).replace(/&/g, "&amp;").replace(/</g, "&lt;")
					        .replace(/>/g, "&gt;").replace(/\s/g, "&nbsp;");
				}
				this.getLabelNode(b.domNode).innerHTML = a;
			}
		}
	},
	fireDataChange : function(a) {
		this.freshNodeLabel(a);
	},
	onAfterNodeRender : function(a) {}
});
/* /unieap/ria3.3/unieap/tree/TreeBinding.js */
dojo.provide("unieap.tree.TreeBinding");
dojo.require("unieap.tree.Tree");
dojo.declare("unieap.tree.TreeBinding", null, {
	        id : "id",
	        label : "label",
	        iconClass : "",
	        labelClass : "",
	        children : "children",
	        leaf : "",
	        sort : null,
	        bindingClass : "",
	        rootNodeId : "unieap_ria_tree_id_for_root",
	        disabled : "",
	        createRootNodeItem : function() {
		        this.treeRoot = {};
		        this.treeRoot.data = {
			        label : this.widget.label || ""
		        };
		        this.treeRoot.data[this.id] = this.rootNodeId;
	        },
	        getRootNodeItem : function() {
		        return this.treeRoot;
	        },
	        getIconClass : function(a) {
		        if (this.iconClass) { return a.data[this.iconClass]; }
	        },
	        getLabelClass : function(a) {
		        if (this.labelClass) { return a.data[this.labelClass]; }
	        },
	        getLabel : function(a) {
		        return a.data[this.label];
	        },
	        isLeaf : function(a) {
		        if (this.leaf && a.data[this.leaf] != null) { return a.data[this.leaf] == true; }
		        if (a.children) { return !a.children.length > 0; }
		        return this.widget.loader != null || a == this.treeRoot ? false : true;
	        },
	        getId : function(a) {
		        return a.data[this.id];
	        },
	        isDisabledByData : function(a) {
		        if (this.disabled) { return a.data[this.disabled] == true; }
		        return false;
	        },
	        setDisabled : function(b, a) {
		        if (this.disabled) {
			        b.getItem().data[this.disabled] = a;
		        }
	        }
        });
/* /unieap/ria3.3/unieap/tree/JsonTreeBinding.js */
dojo.provide("unieap.tree.JsonTreeBinding");
dojo.require("unieap.tree.Tree");
dojo.require("unieap.tree.TreeBinding");
dojo.declare("unieap.tree.JsonTreeBinding", unieap.tree.TreeBinding, {
	        jsonData : "",
	        constructor : function(a) {
		        dojo.mixin(this, a);
		        this.createRootNodeItem();
		        if (this.jsonData) {
			        this._treeData = dojo.isString(this.jsonData) && dojo.fromJson(this.jsonData)
			                || this.jsonData;
			        this.getRootNodeItem()[this.children] = this._treeData;
			        this.getRootNodeItem().loaded = true;
		        }
		        this.widget.afterLoad = dojo.hitch(this, "afterLoad");
	        },
	        afterLoad : function() {},
	        getChildren : function(b, e) {
		        e = e || function() {};
		        if (b.loaded) {
			        e(b[this.children]);
			        return;
		        }
		        b.loaded = true;
		        if (this.isLeaf(b)) {
			        e(null);
			        return;
		        }
		        if (this.doPreLoad(b)) {
			        e(this.doPreLoad(b));
		        } else {
			        if (this.widget.loader) {
				        var a = this.widget.getLoader();
				        var d = this;
				        var c = function(f) {
					        b[d.children] = f || [];
					        e(f, false);
				        };
				        a.load(b, c);
			        } else {
				        e(null);
			        }
		        }
	        },
	        doPreLoad : function(a) {
		        var b;
		        if (a == this.treeRoot && this.jsonData) {
			        b = this._treeData;
		        } else {
			        b = a[this.children];
		        }
		        return b;
	        },
	        setSelected : function(b, a) {
		        b.isChecked = a;
	        },
	        isSelected : function(a) {
		        return a.isChecked == true;
	        },
	        setLabel : function(c, a) {
		        if (!c || c.isRoot()) { return; }
		        var b = c.getItem();
		        b.data[this.label] = a;
		        this.widget.fireDataChange(c);
	        },
	        getData : function() {
		        var a = [],
			        d = this.getRootNodeItem()[this.children] || [];
		        for (var c = 0, b = d.length; c < b; c++) {
			        a.push(this._addContent(d[c]));
		        }
		        return a;
	        },
	        _addContent : function(d) {
		        var c = {};
		        c.data = d.data;
		        if (d.children) {
			        c.children = [];
			        for (var b = 0, a = d.children.length; b < a; b++) {
				        c.children.push(this._addContent(d.children[b]));
			        }
		        }
		        return c;
	        },
	        addItem : function(c, a) {
		        var b = {};
		        var d = a.children;
		        if (d) {
			        b = {
				        data : c
			        };
			        d.push(b);
		        } else {
			        b = {
				        data : c
			        };
			        a.children = [];
			        a.children.push(b);
			        if (this.leaf) {
				        a.data[this.leaf] = false;
			        }
		        }
		        return b;
	        },
	        deleteItem : function(d, a) {
		        var b = a[this.children];
		        for (var c = 0; c < b.length; c++) {
			        if (b[c] == d) {
				        b.splice(c, 1);
				        break;
			        }
		        }
	        },
	        refresh : function(a) {}
        });
/* /unieap/ria3.3/unieap/tree/TreeLoader.js */
dojo.provide("unieap.tree.TreeLoader");
dojo.require("unieap.tree.Tree");
dojo.require("unieap.rpc");
dojo.require("unieap.ds");
dojo.declare("unieap.tree.TreeLoader", null, {
	        url : "",
	        parameters : null,
	        constructor : function(a) {
		        dojo.mixin(this, a);
	        },
	        getPostData : function(a) {
		        return null;
	        },
	        onBeforeLoad : function(a) {
		        return true;
	        },
	        onAfterLoad : function(a, b) {
		        this.widget.afterLoad(a, b);
	        },
	        getLocalData : function(a) {
		        return null;
	        },
	        sync : false,
	        rpc : null,
	        load : function(f, g) {
		        if (this.url || this.rpc) {
			        var b = this.onBeforeLoad(f),
				        d = this;
			        if (b == false) {
				        g(null);
				        return;
			        }
			        var c = function(h) {
				        if (h instanceof unieap.ds.DataCenter) {
					        d.onAfterLoad(h, f);
					        g(h);
				        }
			        };
			        var e = function() {
				        g(null);
			        };
			        if (dojo.isFunction(this.rpc)) {
				        this.rpc(f, c, e);
			        } else {
				        unieap.Action.requestData({
					                url : this.url,
					                sync : this.sync,
					                parameters : this.buliderParams(this.parameters, f),
					                load : function(h) {
						                c(h);
					                },
					                error : function() {
						                e();
					                }
				                }, this.getPostData(f), false);
			        }
		        } else {
			        var a = this.getLocalData(f);
			        g(a);
		        }
	        },
	        buliderParams : function(b, a) {
		        b = b ? b : {};
		        b.node = this.widget.getBinding().getId(a);
		        return b;
	        },
	        setUrl : function(a) {
		        this.url = a;
	        }
        });
/* /unieap/ria3.3/unieap/menu/MenuSeparator.js */
dojo.provide("unieap.menu.MenuSeparator");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.declare("unieap.menu.MenuSeparator", [dijit._Widget, dijit._Templated], {
	templateString : '<tr class="u-menu-separator"><td class="left"><span class="u-menu-item-separator"></span></td><td class="middle"><span class="u-menu-item-separator"></span></td><td class="right"><span class="u-menu-item-separator"></span></td></tr>',
	postCreate : function() {
		dojo.setSelectable(this.domNode, false);
	}
});
/* /unieap/ria3.3/unieap/menu/MenuItem.js */
dojo.provide("unieap.menu.MenuItem");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit._Contained");
dojo.declare("unieap.menu.MenuItem", [dijit._Widget, dijit._Templated, dijit._Contained], {
	templateString : '<tr class="u-menu-item" dojoAttachPoint="itemNode" ><td class="u-menu-itemLeft" dojoAttachPoint="itemLeftNode"><div class="${iconClass}" dojoAttachPoint="iconNode" ></div></td><td tabIndex="-1" class="u-menu-itemLabel" dojoAttachPoint="containerNode" waiRole="menuitem"><div dojoAttachPoint="labelNode"></div></td><td class="u-menu-itemRight" dojoAttachPoint="arrowCell"><div class="u-menu-expand" dojoAttachPoint="expandNode" style="display:none"></div></td></tr>',
	label : "",
	iconClass : "",
	disabled : false,
	postCreate : function() {
		dojo.setSelectable(this.domNode, false);
		this.disabled && this.setDisabled(this.disabled);
		this._conn();
		if (this.label) {
			this.labelNode.innerHTML = this.label;
		}
		if (this.getParent()) {
			!this.getParent().isShowIcon && dojo.style(this.itemLeftNode, "display", "none");
			this.getParent().menuHeight
			        && dojo.style(this.itemNode, "height", this.getParent().menuHeight);
		}
	},
	_conn : function() {
		this.connect(this.itemNode, "onmouseover", this._onMouseOver);
		this.connect(this.itemNode, "onclick", this._onClick);
	},
	_onMouseOver : function(a) {
		dijit.focus(this.containerNode);
		this._toggleClass(true);
		this.getParent()._mouseOver(this);
	},
	_onClick : function(a) {
		if (this.disabled) { return; }
		if (false == this.onClick(this.label, a)) { return; }
		var b = this._getTopMenu();
		dijit.popup.close(b);
	},
	_getTopMenu : function() {
		var a = this;
		while (a.getParent && a.getParent() && a.getParent().parentMenu) {
			a._toggleClass(false);
			dijit.popup.close(a.getParent());
			a = a.getParent().parentMenu;
		}
		a._toggleClass(false);
		return a.getParent && a.getParent();
	},
	onClick : function(b, a) {
		return true;
	},
	isLeafNode : function() {
		return this.declaredClass != "unieap.menu.PopupMenuItem";
	},
	setDisabled : function(c) {
		this.disabled = c;
		if (c) {
			this.domNode && dojo.addClass(this.domNode, "u-menu-itemDisabled");
			var b = null;
			if (this.iconNode) {
				b = this.iconNode.className;
			}
			if (b && b.lastIndexOf("Disabled") < 0) {
				this.iconNode.className = b.concat("Disabled");
			}
			if (!this.isLeafNode()) {
				dojo.addClass(this.expandNode, "u-menu-expandDisabled");
				dojo.removeClass(this.expandNode, "u-menu-expandEnabled");
			}
		} else {
			this.domNode && dojo.removeClass(this.domNode, "u-menu-itemDisabled");
			var b = null, a;
			if (this.iconNode) {
				b = this.iconNode.className;
			}
			if (b && (a = b.lastIndexOf("Disabled")) > 0) {
				this.iconNode.className = b.substring(0, a);
			}
			if (!this.isLeafNode()) {
				dojo.removeClass(this.expandNode, "u-menu-expandDisabled");
				dojo.addClass(this.expandNode, "u-menu-expandEnabled");
			}
		}
	},
	focus : function() {
		this._toggleClass(true);
		try {
			dijit.focus(this.containerNode);
		}
		catch (a) {}
	},
	_toggleClass : function(a) {
		if (a) {
			dojo.addClass(this.domNode, "u-menu-itemHover");
			dojo.addClass(this.itemLeftNode, "u-menu-itemHover");
		} else {
			dojo.removeClass(this.domNode, "u-menu-itemHover");
			dojo.removeClass(this.itemLeftNode, "u-menu-itemHover");
		}
	}
});
/* /unieap/ria3.3/unieap/menu/PopupMenuItem.js */
dojo.provide("unieap.menu.PopupMenuItem");
dojo.require("unieap.menu.MenuItem");
dojo.declare("unieap.menu.PopupMenuItem", unieap.menu.MenuItem, {
	        popupDelay : 250,
	        parentMenu : null,
	        _fillContent : function() {
		        if (this.srcNodeRef) {
			        var a = dojo.query("*", this.srcNodeRef);
			        if (a && a[0] && a[0].tagName == "SPAN") {
				        unieap.menu.PopupMenuItem.superclass._fillContent.call(this, a[0]);
			        }
			        this.dropDownContainer = this.srcNodeRef;
		        }
	        },
	        startup : function() {
		        if (!this.popup) {
			        var a = dojo.query("[widgetId]", this.dropDownContainer)[0];
			        this.popup = dijit.byNode(a);
			        dojo.body().appendChild(this.popup.domNode);
			        this.popup.domNode.style.display = "none";
		        }
		        dojo.addClass(this.expandNode, "u-menu-expandEnabled");
		        dojo.style(this.expandNode, "display", "");
		        dijit.setWaiState(this.containerNode, "haspopup", "true");
		        this.inherited(arguments);
	        },
	        _onMouseOver : function(a) {
		        this.inherited(arguments);
		        this._startPopupTimer(a);
	        },
	        _startPopupTimer : function(a) {
		        if (!this.disabled && !this.hover_timer) {
			        this.hover_timer = setTimeout(dojo.hitch(this, "_openPopup"), this.popupDelay);
		        }
	        },
	        _stopPopupTimer : function() {
		        if (this.hover_timer) {
			        clearTimeout(this.hover_timer);
			        this.hover_timer = null;
		        }
	        },
	        _openPopup : function() {
		        this._stopPopupTimer();
		        var a = this.popup;
		        if (a.isShowingNow) { return; }
		        a.startup && a.startup();
		        dijit.popup.open({
			                parent : this,
			                popup : a,
			                around : this.domNode,
			                orient : this._orient || (this.isLeftToRight() ? {
				                TR : "TL",
				                TL : "TR",
				                BR : "BL",
				                BL : "BR"
			                } : {
				                TL : "TR",
				                TR : "TL",
				                BL : "BR",
				                BR : "BL"
			                })
		                });
		        a.parentMenu = this;
		        this._onBlur = function() {
			        this._toggleClass(false);
			        this._closePopup();
		        };
		        a._removeAllToggle(a);
	        },
	        _closePopup : function() {
		        this._stopPopupTimer();
		        if (!this.popup.isShowingNow) { return; }
		        dijit.popup.close(this.popup);
		        this.popup.isShowingNow = false;
	        },
	        _onClick : function(a) {
		        if (this.disabled) { return; }
		        if (this.popup.isShowingNow) {
			        this._closePopup();
		        }
		        this.onClick(this.label, a);
	        }
        });
/* /unieap/ria3.3/unieap/menu/Menu.js */
dojo.provide("unieap.menu.Menu");
dojo.require("unieap.menu.MenuItem");
dojo.require("unieap.menu.PopupMenuItem");
dojo.require("unieap.menu.MenuSeparator");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit._KeyNavContainer");
dojo.declare("unieap.menu.Menu", [dijit._Widget, dijit._Templated, dijit._KeyNavContainer], {
	constructor : function() {
		this._bindings = [];
	},
	templateString : '<table class="u-menu-table" cellPadding="0" cellSpacing="0" dojoAttachPoint="menuNode" ><tbody dojoAttachPoint="containerNode"></tbody></table>',
	isShowingNow : false,
	isShowIcon : true,
	menuWidth : "",
	menuHeight : "",
	targetNodeIds : [],
	contextMenuForWindow : false,
	obj : null,
	postCreate : function() {
		dojo.addOnLoad(dojo.hitch(this, function() {
			        if (this.contextMenuForWindow) {
				        this.bindDomNode(dojo.body());
			        } else {
				        dojo.forEach(this.targetNodeIds, this.bindDomNode, this);
			        }
		        }));
		this.menuWidth && dojo.style(this.menuNode, "width", this.menuWidth);
	},
	startup : function() {
		dojo.forEach(this.getChildren(), function(a) {
			        a.startup();
		        });
	},
	bindDomNode : function(a) {
		a = dojo.byId(a);
		a[this.id] = this._bindings.push([dojo.connect(a, "oncontextmenu", this, "_openMyself")]);
	},
	unBindDomNode : function(e) {
		var d = dojo.byId(e);
		var c = d[this.id] - 1,
			a = this._bindings[c];
		dojo.forEach(a, dojo.disconnect, this);
		delete this._bindings[c];
	},
	popup : function(a) {
		if (a && ((a.x && a.y) || a.around)) {
			dijit.popup.open(dojo.mixin(a, {
				        popup : this
			        }));
		} else {
			var b = this._getMouseLocation();
			dijit.popup.open(dojo.mixin(a, {
				        x : b.x,
				        y : b.y,
				        popup : this
			        }));
		}
		this.onOpen();
		dijit.focus(this.domNode);
	},
	_getEvent : function() {
		if (dojo.isIE) { return window.event; }
		var b = this._getEvent.caller;
		while (b != null) {
			var a = b.arguments[0];
			if (a) {
				if ((a.constructor == Event || a.constructor == MouseEvent)
				        || (typeof(a) == "object" && a.preventDefault && a.stopPropagation)) { return a; }
			}
			b = b.caller;
		}
		return null;
	},
	_getMouseLocation : function() {
		var c = this._getEvent();
		var b = 0;
		var a = 0;
		if (!c) { return {
			x : dojo.body().scrollLeft,
			y : dojo.body().scrollLeft
		}; }
		if (dojo.isIE) {
			b = c.clientX;
			a = c.clientY;
		} else {
			b = c.pageX;
			a = c.pageY;
		}
		return {
			x : b,
			y : a
		};
	},
	_openMyself : function(b) {
		dojo.stopEvent(b);
		var a, c;
		if (dojo.isIE) {
			a = b.clientX;
			c = b.clientY;
		} else {
			a = b.pageX;
			c = b.pageY;
		}
		dijit.popup.open({
			        popup : this,
			        x : a,
			        y : c,
			        orient : this._orient || (this.isLeftToRight() ? {
				        TR : "TL",
				        TL : "TR",
				        BR : "BL",
				        BL : "BR"
			        } : {
				        TL : "TR",
				        TR : "TL",
				        BL : "BR",
				        BR : "BL"
			        })
		        });
		this._removeAllToggle(this);
		this.focus();
		this._onBlur = function() {
			dijit.popup.close(this);
		};
	},
	_onBlur : function() {
		if (this.isShowingNow) {
			dijit.popup.close(this);
			this.isShowingNow = false;
		}
	},
	_removeAllToggle : function(b) {
		var a = b.getChildren();
		dojo.forEach(a, function(c) {
			        c._toggleClass && c._toggleClass(false);
		        }, this);
	},
	setObject : function(a) {
		this.obj = a;
	},
	getObject : function() {
		return this.obj;
	},
	onOpen : function(a) {
		this.isShowingNow = true;
	},
	_mouseOver : function(b) {
		var a = this.getChildren();
		dojo.forEach(a, function(c) {
			        if (c != b) {
				        c._toggleClass && c._toggleClass(false);
				        c._closePopup && c._closePopup();
			        }
		        }, this);
		if (b.disabled) {
			b._toggleClass && b._toggleClass(false);
		}
	},
	destroy : function() {
		dojo.forEach(this._bindings, function(b) {
			        if (b) {
				        while (b.length) {
					        dojo.disconnect(b.pop());
				        }
			        }
		        });
		var a = this.getChildren();
		dojo.forEach(a, function(b) {
			        b.popup && b.popup.destroy();
			        b.destroy();
		        }, this);
		this.inherited(arguments);
	}
});
/* /unieap/ria3.3/unieap/layout/TabScrollProvider.js */
dojo.provide("unieap.layout.TabScrollProvider");
dojo.declare("unieap.layout.TabScrollProvider", null, {
	        isShowing : false,
	        constructor : function(a) {
		        dojo.mixin(this, a);
		        this.connects = [];
	        },
	        calculateScroll : function() {
		        if (this.widget.tabPosition == "top" || this.widget.tabPosition == "bottom") {
			        var a = this.widget.containerNode.offsetWidth;
			        var b = this.widget._getTabWidth();
			        if (a < b || a == 0) {
				        this.showScroll();
			        } else {
				        this.hideScroll();
			        }
		        } else {
			        var d = this.widget.containerNode.offsetHeight;
			        var c = this.widget._getTabHeight();
			        if (d < c || d == 0) {
				        this.showScroll();
			        } else {
				        this.hideScroll();
			        }
		        }
	        },
	        showScroll : function() {
		        var c = this.widget.tabPosition.charAt(0).toUpperCase()
		                + this.widget.tabPosition.substr(1).replace(/-.*/, "");
		        if (this.widget.tabPosition == "top" || this.widget.tabPosition == "bottom") {
			        if (!this.leftNode) {
				        this.leftNode = dojo.create("div", {
					                "class" : "tabward"
				                }, this.widget.tablistContainer, "first");
				        dojo.addClass(this.leftNode, "eapLeft" + c);
				        this.connects
				                .push(dojo.connect(this.leftNode, "onclick", this, "leftward"));
			        }
			        if (!this.rightNode) {
				        this.rightNode = dojo.create("div", {
					                "class" : "tabward"
				                }, this.widget.tablistContainer, "first");
				        dojo.addClass(this.rightNode, "eapRight" + c);
				        this.connects.push(dojo.connect(this.rightNode, "onclick", this,
				                "rightward"));
			        }
			        dojo.style(this.leftNode, "display", "block");
			        dojo.style(this.rightNode, "display", "block");
			        var a = dojo.style(this.widget.scrollingNode, "left");
			        if (a == 0) {
				        this.widget.scrollingNode.style.left = "19px";
			        }
		        } else {
			        if (!this.upNode) {
				        this.upNode = dojo.create("div", {
					                "class" : "tabward"
				                }, this.widget.tablistContainer, "first");
				        dojo.addClass(this.upNode, "eapUp" + c);
				        this.connects.push(dojo.connect(this.upNode, "onclick", this, "upward"));
			        }
			        if (!this.downNode) {
				        this.downNode = dojo.create("div", {
					                "class" : "tabward"
				                }, this.widget.tablistContainer, "first");
				        dojo.addClass(this.downNode, "eapDown" + c);
				        this.connects
				                .push(dojo.connect(this.downNode, "onclick", this, "downward"));
			        }
			        dojo.style(this.upNode, "display", "block");
			        dojo.style(this.downNode, "display", "block");
			        var b = dojo.style(this.widget.scrollingNode, "top");
			        if (b == 0) {
				        this.widget.scrollingNode.style.top = "19px";
			        }
		        }
		        if (!this.menuNode) {
			        this.menuNode = dojo.create("div", {
				                "class" : "tabward"
			                }, this.widget.tablistContainer, "first");
			        dojo.addClass(this.menuNode, "eapMenu" + c);
			        this.connects.push(dojo.connect(this.menuNode, "onclick", this, "menuward"));
		        }
		        dojo.style(this.menuNode, "display", "block");
		        this.isShowing = true;
	        },
	        hideScroll : function() {
		        if (this.leftNode) {
			        dojo.style(this.leftNode, "display", "none");
		        }
		        if (this.rightNode) {
			        dojo.style(this.rightNode, "display", "none");
		        }
		        if (this.upNode) {
			        dojo.style(this.upNode, "display", "none");
		        }
		        if (this.downNode) {
			        dojo.style(this.downNode, "display", "none");
		        }
		        if (this.menuNode) {
			        dojo.style(this.menuNode, "display", "none");
		        }
		        this.widget.scrollingNode.style.left = "0px";
		        this.widget.scrollingNode.style.top = "0px";
		        this.isShowing = false;
	        },
	        leftward : function() {
		        var a = dojo.style(this.widget.scrollingNode, "left");
		        a = a + 100;
		        if (a > 0) {
			        a = 19;
		        }
		        this.scrollLeft(a);
	        },
	        rightward : function() {
		        var a = dojo.style(this.widget.scrollingNode, "left");
		        a = (a - 100);
		        var b = this.widget._getTabWidth();
		        if ((a + b) <= 0) {
			        a = 19;
		        }
		        this.scrollLeft(a);
	        },
	        upward : function() {
		        var a = dojo.style(this.widget.scrollingNode, "top");
		        a = a + 100;
		        if (a > 0) {
			        a = 19;
		        }
		        this.scrollTop(a);
	        },
	        downward : function() {
		        var a = dojo.style(this.widget.scrollingNode, "top");
		        a = (a - 100);
		        var b = this.widget._getTabHeight();
		        if ((b + a) <= 0) {
			        a = 19;
		        }
		        this.scrollTop(a);
	        },
	        needScroll : function(d) {
		        if (this.widget.tabPosition == "top" || this.widget.tabPosition == "bottom") {
			        var c = 0, a, e,
				        f = dojo.style(this.widget.scrollingNode, "left"),
				        b = this.widget.containerNode.offsetWidth;
			        dojo.some(this.widget.tablist.getChildren(), function(l) {
				                if (d.controlButton == l) {
					                a = c;
				                }
				                c += l.getWidth();
				                if (d.controlButton == l) {
					                e = c;
					                return true;
				                }
				                return false;
			                }, this);
			        if ((a + f) < 0 || (e + f + 37) > b) {
				        this.scrollLeft((19 - a));
			        }
		        } else {
			        var j = 0, i, g,
				        k = dojo.style(this.widget.scrollingNode, "top"),
				        h = this.widget.containerNode.offsetHeight;
			        dojo.some(this.widget.tablist.getChildren(), function(l) {
				                if (d.controlButton == l) {
					                i = j;
				                }
				                j += l.getHeight();
				                if (d.controlButton == l) {
					                g = j;
					                return true;
				                }
				                return false;
			                }, this);
			        if ((i + k) < 0 || (g + k + 37) > h) {
				        this.scrollTop((19 - i));
			        }
		        }
	        },
	        scrollLeft : function(b) {
		        var a = dojo.animateProperty({
			                node : this.widget.scrollingNode,
			                duration : 700,
			                properties : {
				                left : b,
				                unit : "px"
			                }
		                });
		        a.play();
	        },
	        scrollTop : function(b) {
		        var a = dojo.animateProperty({
			                node : this.widget.scrollingNode,
			                duration : 700,
			                properties : {
				                top : b,
				                unit : "px"
			                }
		                });
		        a.play();
	        },
	        menuward : function(a) {
		        dojo.require("unieap.menu.Menu");
		        this.updateMenu();
		        this.menu._openMyself(a);
	        },
	        updateMenu : function() {
		        if (!this.menu) {
			        this.menu = new unieap.menu.Menu({});
		        }
		        this.menu.destroy();
		        this.menu = new unieap.menu.Menu({});
		        var b = this.widget.getChildrenNotHidden();
		        var h = this.widget;
		        var e = function(f) {
			        return function() {
				        h.selectChild(f);
			        };
		        };
		        var n, m;
		        for (var d = b.length, g = 0; g < d; g++) {
			        if ((g) % 5 == 0) {
				        var c = "Items " + (g + 1) + "--" + (g + 5);
				        if (g + 5 >= d) {
					        c = "Items " + (g + 1) + "--" + (d);
				        }
				        m = new unieap.menu.Menu();
				        n = new unieap.menu.PopupMenuItem({
					                popup : m,
					                label : c
				                });
				        this.menu.addChild(n);
			        }
			        var a = b[g];
			        var k = a.title;
			        var j = e(a);
			        m.addChild(new unieap.menu.MenuItem({
				                label : k,
				                onClick : j
			                }));
		        }
		        this.menu.startup();
	        },
	        destory : function() {
		        if (this.menu) {
			        this.menu.destroy();
		        }
		        while (this.connects.length) {
			        dojo.disconnect(this.connects.pop());
		        }
	        }
        });
/* /unieap/ria3.3/unieap/layout/_BaseContainer.js */
dojo.provide("unieap.layout._BaseContainer");
dojo.declare("unieap.layout._BaseContainer", null, {
	        buildRendering : function() {
		        this.inherited(arguments);
		        if (!this.containerNode) {
			        this.containerNode = this.domNode;
		        }
	        },
	        getChildren : function() {
		        !this.containerNode && (this.containerNode = this.domNode);
		        this.children = dojo.query("> [widgetId]", this.containerNode).map(dijit.byNode);
		        return this.children;
	        },
	        addChild : function(d, a) {
		        var b = this.containerNode;
		        if (a && typeof a == "number") {
			        var c = this.getChildren();
			        if (c && c.length >= a) {
				        b = c[a - 1].domNode;
				        a = "after";
			        }
		        }
		        dojo.place(d.domNode, b, a);
		        if (this._started && !d._started) {
			        d.startup();
		        }
	        },
	        removeChild : function(b) {
		        if (typeof b == "number" && b > 0) {
			        b = this.getChildren()[b];
		        }
		        if (!b || !b.domNode) { return; }
		        var a = b.domNode;
		        a.parentNode.removeChild(a);
	        },
	        getIndexOfChild : function(e) {
		        var b = this.getChildren();
		        for (var a = 0, d; d = b[a]; a++) {
			        if (d == e) { return a; }
		        }
		        return -1;
	        },
	        hasChildren : function() {
		        return !!this.getChildren().length;
	        }
        });
/* /unieap/ria3.3/unieap/layout/Container.js */
dojo.provide("unieap.layout.Container");
dojo.require("unieap.util.util");
dojo.require("dijit._Widget");
(function() {
	var a = new function() {
		var b = [];
		this.getContainers = function() {
			return b;
		};
		this.addContainer = function(c) {
			b.push(c);
		};
		this.removeContainer = function(c) {
			for (var d = 0; b[d]; d++) {
				if (c == b[d]) {
					b.splice(d, 1);
					return;
				}
			}
		};
		this.getParent = function(c) {
			if (dojo.byId(c.id) == null) { return -1; }
			var d = c.domNode.parentNode, e;
			while (d) {
				if (d.getAttribute && (e = dijit.byNode(d))) {
					if (dojo.hasClass(d, "unieap-container")) { return e; }
				}
				d = d.parentNode;
			}
			return null;
		};
		this.getChildren = function(c) {
			var e = [];
			for (var d = 0; b[d]; d++) {
				if (c == b[d].getParent()) {
					children.push(b[d]);
				}
			}
			return children;
		};
	}();
	dojo.declare("unieap.layout.Container", dijit._Widget, {
		        UserInterfaces : {
			        width : "string",
			        height : "string",
			        securityId : "string",
			        id : "string",
			        jsId : "string",
			        "class" : "string",
			        style : "string",
			        postponeRender : "boolean",
			        onContainerResize : "function"
		        },
		        buildRendering : function() {
			        this.inherited(arguments);
			        if (this.templateString == null) {
				        this.containerNode = this.domNode;
			        }
		        },
		        postCreate : function() {
			        if (this.declaredClass == "unieap.layout.Container") {
				        dojo.style(this.containerNode, {
					                position : "relative",
					                overflow : "hidden"
				                });
			        }
			        this.initContainer();
		        },
		        startup : function() {
			        if (!this.getParentContainer()) {
				        this.bindEvent4onresize();
				        this.resizeContainer();
			        }
		        },
		        postponeRender : false,
		        width : "auto",
		        height : "auto",
		        securityId : "",
		        parentContainer : "",
		        children : null,
		        initContainer : function() {
			        dojo.addClass(this.domNode, "unieap-container");
			        this.connects = [];
			        this._setWidth(this.domNode.style.width || this.width);
			        this._setHeight(this.domNode.style.height || this.height);
			        this.connects.push(dojo.connect(this, "resizeContainer", this,
			                "onContainerResize"));
		        },
		        bindEvent4onresize : function() {
			        this._viewport = dijit.getViewport();
			        this.connects.push(dojo.connect(dojo.global, "onresize", this, function() {
				                var b = dijit.getViewport();
				                if (b.w != this._viewport.w || b.h != this._viewport.h) {
					                this._viewport = b;
					                this.resizeContainer();
				                }
			                }));
		        },
		        notifyResize : function() {
			        this.resizeContainer();
			        unieap.notify(this.getParentContainer(), "notifyParentResize", this);
		        },
		        resizeContainer : function() {
			        if (null == this.domNode) { return; }
			        this.resizeChildrenContainer();
		        },
		        resizeChildrenContainer : function() {
			        var b = this.getChildrenContainer();
			        setTimeout(function() {
				                for (var c = 0, d; c < b.length; c++) {
					                d = b[c];
					                unieap.notify(d, "resizeContainer");
				                }
			                }, 0);
		        },
		        notifyParentResize : function(b) {
			        unieap.notify(this.getParentContainer(), "notifyParentResize", this);
		        },
		        onContainerResize : function() {},
		        resize : function(c, b) {},
		        setParentContainer : function(b) {
			        this.parentContainer = b;
		        },
		        getParentContainer : function() {
			        if (this.parentContainer) {
				        if (dojo.isString(this.parentContainer)) {
					        this.parentContainer = unieap.byId(this.parentContainer);
				        }
				        return this.parentContainer;
			        }
			        var b = this.domNode.parentNode,
				        c = null;
			        while (b) {
				        if (b.getAttribute && (c = dijit.byNode(b))) {
					        if (dojo.hasClass(b, "unieap-container")) {
						        break;
					        }
				        }
				        b = b.parentNode;
			        }
			        return (this.parentContainer = c);
		        },
		        show : function() {
			        if (this.postponeRender) {
				        this.postponeRender = false;
				        dojo.parser.parse(this.containerNode);
			        }
			        dojo.style(this.domNode, "display", "block");
			        this.notifyResize(1);
		        },
		        hide : function() {
			        dojo.style(this.domNode, "display", "none");
			        this.notifyResize(0);
		        },
		        isHidden : function() {
			        return dojo.style(this.domNode, "display") == "none";
		        },
		        getChildrenContainer : function() {
			        return unieap.getChildrenContainer(this.containerNode);
		        },
		        destroy : function() {
			        if (this.connects) {
				        while (this.connects.length) {
					        dojo.disconnect(this.connects.pop());
				        }
			        }
			        var b = (this instanceof unieap.layout.Container) && this.containerNode ? dijit
			                .findWidgets(this.containerNode) : [];
			        dojo.forEach(b, function(c) {
				                c.destroy();
			                });
			        this.inherited(arguments);
		        },
		        _setWidth : function(b) {
			        this.width = b;
			        dojo.style(this.domNode, "width", this._convertNumber(this.width));
		        },
		        setWidth : function(b) {
			        this._setWidth(b);
			        this.notifyResize();
		        },
		        _setHeight : function(b) {
			        this.height = b;
			        dojo.style(this.domNode, "height", this._convertNumber(this.height));
		        },
		        setHeight : function(b) {
			        this._setHeight(b);
			        this.notifyResize();
		        },
		        _convertNumber : function(b) {
			        return b + ((isNaN(b) || b == "") ? "" : "px");
		        },
		        getChildren : function() {
			        !this.containerNode && (this.containerNode = this.domNode);
			        this.children = dojo.query("> [widgetId]", this.containerNode)
			                .map(dijit.byNode);
			        return this.children;
		        },
		        addChild : function(e, b) {
			        var c = this.containerNode;
			        if (b && typeof b == "number") {
				        var d = this.getChildren();
				        if (d && d.length >= b) {
					        c = d[b - 1].domNode;
					        b = "after";
				        }
			        }
			        dojo.place(e.domNode, c, b);
			        if (this._started && !e._started) {
				        e.startup();
			        }
		        },
		        removeChild : function(c) {
			        if (typeof c == "number" && c > 0) {
				        c = this.getChildren()[c];
			        }
			        if (!c || !c.domNode) { return; }
			        var b = c.domNode;
			        b.parentNode.removeChild(b);
		        },
		        getIndexOfChild : function(f) {
			        var d = this.getChildren();
			        for (var b = 0, e; e = d[b]; b++) {
				        if (e == f) { return b; }
			        }
			        return -1;
		        },
		        hasChildren : function() {
			        return !!this.getChildren().length;
		        }
	        });
})();
/* /unieap/ria3.3/unieap/layout/ContentPane.js */
dojo.provide("unieap.layout.ContentPane");
dojo.require("unieap.layout.Container");
dojo.declare("unieap.layout.ContentPane", [unieap.layout.Container], {
	UserInterfaces : dojo.mixin({
		        href : "string",
		        showLoading : "boolean",
		        refreshOnShow : "boolean",
		        selected : "boolean",
		        closable : "boolean",
		        hidden : "boolean",
		        title : "string",
		        onClose : "function",
		        onShow : "function",
		        onInit : "function",
		        enabled : "boolean"
	        }, unieap.layout.Container.prototype.UserInterfaces),
	href : "",
	_hasInit : false,
	_inTabContainer : false,
	showLoading : false,
	refreshOnShow : false,
	selected : false,
	closable : false,
	hidden : false,
	title : "",
	loadingMessage : RIA_I18N.layout.contentPane.loading,
	enabled : true,
	startup : function() {
		this.inherited(arguments);
		if (this._started) { return; }
		var a = this.getParentContainer();
		if (!a || a.declaredClass != "unieap.layout.TabContainer") {
			this._onShow();
		}
	},
	setContent : function(a) {
		this.href = "";
		this._setContent(a || "");
		this._createSubWidgets();
		unieap.fireContainerResize(this.domNode);
	},
	_setContent : function(a) {
		this.destroyDescendants();
		var b = this.containerNode || this.domNode;
		try {
			while (b.firstChild) {
				dojo._destroyElement(b.firstChild);
			}
			if (typeof a == "string") {
				b.innerHTML = a;
			} else {
				if (a.nodeType) {
					b.appendChild(a);
				} else {
					dojo.forEach(a, function(d) {
						        b.appendChild(d.cloneNode(true));
					        });
				}
			}
		}
		catch (c) {}
	},
	_createSubWidgets : function() {
		var a = this.containerNode || this.domNode;
		try {
			dojo.parser.parse(a, true);
		}
		catch (b) {}
	},
	setHref : function(a) {
		this.href = a;
		this.refresh();
	},
	_createForm : function(d) {
		dojo.byId(this.id + "_form") && dojo.destroy(this.id + "_form");
		var c = dojo.create("form", {
			        name : this.id + "_form",
			        method : "post",
			        target : this.id + "_frame"
		        }, dojo.body());
		for (var b in d) {
			var a = dojo.create("input", {
				        type : "hidden",
				        value : this._formatParams(d[b]),
				        name : b
			        }, c);
		}
		c.action = this.href;
		return c;
	},
	_formatParams : function(a) {
		if (a
		        && (a.declaredClass == "unieap.ds.DataCenter" || a.declaredClass == "unieap.ds.DataStore")) {
			return a.toJson();
		} else {
			if (dojo.isObject(a)) { return dojo.toJson(a); }
		}
		return a;
	},
	refresh : function(c) {
		if (this.href) {
			this.onDownloadStart();
			if (dojo.isObject(c)) {
				var b = this._createForm(c);
				b.submit();
			} else {
				if (dojo.isIE) {
					this._if.src = "javascript:false;";
					this._if.src = this.href;
				} else {
					var a = this;
					setTimeout(function() {
						        a._if.src = a.href;
					        }, 1000);
				}
			}
		}
	},
	onClose : function() {
		return true;
	},
	onShow : function(a) {},
	onInit : function(a) {},
	_onShow : function(a) {
		if (this.postponeRender) {
			this.postponeRender = false;
			dojo.parser.parse(this.containerNode);
		}
		if (this.refreshOnShow || !this._hasInit) {
			this.refresh(a);
		}
		!this._hasInit && (this._hasInit = true) && this._onInit();
		this.onShow(this);
	},
	_onInit : function() {
		this.resizeContainer();
		this.onInit(this);
	},
	_createIframe : function() {
		var a = null;
		if (dojo.isIE < 9) {
			a = dojo
			        .create("<iframe class='u-contentpane-iframe' name='" + this.id
			                + "_frame' id='" + this.id
			                + "_frame' dojoAttachPoint='subFrameNode'></iframe>");
		} else {
			a = dojo.create("iframe", {
				        name : this.id + "_frame",
				        "class" : "u-contentpane-iframe"
			        });
		}
		dojo.style(a, {
			        width : 0,
			        border : 0,
			        height : 0
		        });
		dojo.place(a, this.containerNode || this.domNode);
		return a;
	},
	onDownloadStart : function() {
		if (this.showLoading) {
			this._loadingNode && dojo.destroy(this._loadingNode);
			this._loadingNode = dojo.create("div", {
				        "class" : "loading",
				        innerHTML : this.loadingMessage
			        }, this.containerNode || this.domNode, "first");
		}
		if (!this._if) {
			this._if = this._createIframe();
			this._if.frameBorder = "no";
			var a = this;
			this._if.onreadystatechange = this._if.onload = function(b) {
				if (!this.readyState || this.readyState == "loaded"
				        || this.readyState == "complete") {
					a.onDownloadEnd();
				}
			};
			this._if.onactivate = function(b) {
				dojo.stopEvent(b);
			};
		}
	},
	onDownloadEnd : function() {
		this._loadingNode && dojo.destroy(this._loadingNode);
		dojo.style(this._if, {
			        height : "100%",
			        width : "100%"
		        });
		(dojo.isFF || dojo.isIE >= 8) && this.height == "auto"
		        && dojo.style(this.domNode, "height", "100%");
	},
	destroy : function() {
		if (this._if) {
			this._if.onreadystatechange = null;
			this._if.onload = null;
			this._if.onactivate = null;
		}
		this.inherited(arguments);
	},
	getContentWindow : function() {
		if (this._if) { return this._if.contentWindow; }
		return window;
	}
});
/* /unieap/ria3.3/unieap/layout/BorderPane.js */
dojo.provide("unieap.layout.BorderPane");
dojo.require("unieap.layout.Container");
dojo.declare("unieap.layout.BorderPane", [unieap.layout.Container, dijit._Templated], {
	UserInterfaces : dojo.mixin({
		        region : "string",
		        title : "string",
		        showTitleBar : "boolean",
		        splitLine : "boolean",
		        wrap : "boolean",
		        fixed : "boolean",
		        minSize : "string",
		        maxSize : "string",
		        onOpen : "function",
		        onClose : "function"
	        }, unieap.layout.Container.prototype.UserInterfaces),
	templateString : "<div class=\"borderPaneOuter\"><div dojoAttachPoint='wrapNode' style=\"display:none\"><a href='javascript:void(0);' dojoAttachPoint='wrapButton' class=\"u-border-wrapButton u-border-a\"></a></div><div dojoAttachPoint='splitNode'></div><div dojoAttachPoint='paneNode' class=\"borderPane\"><div dojoAttachPoint='titleNode' class=\"titleNode\"><a href='javascript:void(0);' dojoAttachPoint='titleButton' class=\"u-border-titleButton u-border-a\"></a><div class=\"u-border-titleText\"><div dojoAttachPoint='titleText' class=\"u-border-titleText-Inner\"></div></div></div><div dojoAttachPoint='containerNode' style=\"overflow:auto;width:100%;position:relative;\"></div></div></div>",
	region : "",
	title : "",
	showTitleBar : true,
	splitLine : true,
	wrap : true,
	paneSize_h : -1,
	paneSize_w : -1,
	fixed : false,
	minSize : "23px",
	maxSize : "10000px",
	width : "100px",
	height : "100px",
	isShowing : true,
	borderSize : 1,
	splitLineSize : 5,
	wrapBarSize : 23 + 2,
	titleSize : 23 - 1,
	centerMinSize : 50,
	borderContainer : null,
	_reverseRegion : function(a) {
		switch (a) {
			case "left" :
				return "right";
			case "right" :
				return "left";
			case "top" :
				return "bottom";
			case "bottom" :
				return "top";
			default :
				return a;
		}
	},
	_setDivBorder : function() {
		if (dojo.isIE && dojo.doc.compatMode == "BackCompat") {
			this.borderSize = 0;
		} else {
			this.borderSize = 2 * this.borderSize;
		}
	},
	postCreate : function() {
		this.borderContainer = this.getParentContainer();
		this.addRegionStyle();
		this.inherited(arguments);
		if (this.borderContainer.wrap && this.wrap && this.region != "center") {
			this.connects
			        .push(dojo.connect(this.titleButton, "onclick", this, "_clickTitleButton"));
			this.connects.push(dojo.connect(this.wrapButton, "onclick", this, "_clickWrapButton"));
		}
		!this.borderContainer.fixed
		        && !this.fixed
		        && this.connects.push(dojo.connect(this.splitNode, "onmousedown", this,
		                "_startMove"));
		this.borderContainer[this.region + "Pane"] = this;
	},
	layoutInner : function() {
		if (this.domNode.clientHeight == 0 || this.domNode.clientWidth == 0) { return; }
		if (this.region == "top") {
			this.paneNode.style.height = this._adjustSize(this.domNode.clientHeight
			        - this.splitLineSize - this.borderSize);
			dojo.place(this.splitNode, this.domNode, "last");
		} else {
			if (this.region == "bottom") {
				this.paneNode.style.height = this._adjustSize(this.domNode.clientHeight
				        - this.splitLineSize - this.borderSize);
				dojo.place(this.splitNode, this.domNode, "first");
			} else {
				if (this.region == "left" || this.region == "right") {
					dojo.style(this.splitNode, "styleFloat", this._reverseRegion(this.region));
					this.paneNode.style.height = this._adjustSize(this.domNode.clientHeight
					        - this.borderSize);
					this.wrapNode.style.height = this._adjustSize(this.domNode.clientHeight
					        - this.borderSize);
				} else {
					if (this.region == "center") {
						this.paneNode.style.height = this._adjustSize(this.domNode.clientHeight
						        - this.borderSize);
					}
				}
			}
		}
		this.containerNode.style.height = this._adjustSize(this.paneNode.clientHeight
		        - this.titleSize);
	},
	_adjustSize : function(a) {
		if (a < 0) {
			return "0px";
		} else {
			return a + "px";
		}
	},
	resizeContainer : function() {
		if (null == this.domNode) { return; }
		this.resize();
		this.resizeChildrenContainer();
	},
	resize : function() {
		this.layoutInner();
	},
	addRegionStyle : function() {
		this._setDivBorder();
		dojo.addClass(this.domNode, this.region + "BorderPane");
		this.title && this.setTitle(this.title);
		this.domNode.title = "";
		if (this.region != "center" && this.wrap) {
			dojo.addClass(this.titleButton, "u-border-titleButton-" + this.region);
			dojo.addClass(this.wrapButton, "u-border-wrapButton-" + this.region);
		} else {
			dojo.style(this.titleButton, "display", "none");
			dojo.style(this.wrapButton, "display", "none");
		}
		if (this.region == "top" || this.region == "bottom") {
			dojo.addClass(this.splitNode, "u-border-splitterH");
			!this.fixed && dojo.style(this.splitNode, "cursor", "n-resize");
			dojo.addClass(this.wrapNode, "u-border-wrapNodeH");
		} else {
			if (this.region == "left" || this.region == "right") {
				dojo.addClass(this.splitNode, "u-border-splitterV");
				dojo.addClass(this.splitNode, "u-border-splitterV-" + this.region);
				!this.fixed && dojo.style(this.splitNode, "cursor", "w-resize");
				dojo.addClass(this.wrapNode, "u-border-wrapNodeV");
			}
		}
		if (!this.borderContainer.splitLine || !this.splitLine) {
			dojo.style(this.splitNode, "display", "none");
			this.splitLineSize = 0;
		}
		if (!this.borderContainer.showTitleBar || !this.showTitleBar) {
			dojo.style(this.titleNode, "display", "none");
			this.titleSize = 0;
		}
	},
	setTitle : function(a) {
		this.title = a;
		if (dojo.isFF) {
			this.titleText.textContent = a;
		} else {
			this.titleText.innerText = a;
		}
	},
	_savePaneSize : function() {
		if (this.domNode.offsetHeight > 0) {
			this.paneSize_h = this.domNode.offsetHeight;
			this.paneSize_w = this.domNode.offsetWidth;
		} else {
			this.paneSize_h = this.domNode.style.height || this.height;
			this.paneSize_w = this.domNode.style.width || this.width;
		}
	},
	_clickTitleButton : function() {
		this.close();
	},
	_clickWrapButton : function() {
		this.open();
	},
	open : function() {
		if (!this.isShowing && this.onOpen() != false) {
			dojo.style(this.paneNode, "display", "block");
			dojo.style(this.wrapNode, "display", "none");
			this._calculateOpenHW();
			this.isShowing = true;
			if (!this.fixed) {
				if (this.region == "top" || this.region == "bottom") {
					dojo.style(this.splitNode, "cursor", "n-resize");
				} else {
					if (this.region == "left" || this.region == "right") {
						dojo.style(this.splitNode, "cursor", "w-resize");
					}
				}
			}
			this.notifyParentResize();
		}
	},
	_calculateOpenHW : function() {
		var d = this.toRealValue(this.paneSize_w, this.borderContainer.domNode.offsetWidth);
		var f = this.toRealValue(this.paneSize_h, this.borderContainer.domNode.offsetHeight);
		if (this.region == "left" || this.region == "right") {
			var b = this.borderContainer[this._reverseRegion(this.region) + "Pane"]
			        ? this.borderContainer[this._reverseRegion(this.region) + "Pane"].domNode.offsetWidth
			        : 0;
			var a = b + this.centerMinSize + d;
			if (a > this.borderContainer.domNode.offsetWidth) {
				dojo.style(this.domNode, "width", this.wrapBarSize + this.splitLineSize + "px");
			} else {
				dojo.style(this.domNode, "width", d + "px");
			}
		} else {
			if (this.region == "top" || this.region == "bottom") {
				var c = this.borderContainer[this._reverseRegion(this.region) + "Pane"]
				        ? this.borderContainer[this._reverseRegion(this.region) + "Pane"].domNode.offsetHeight
				        : 0;
				var e = c + this.centerMinSize + f;
				if (e > this.borderContainer.domNode.offsetHeight) {
					dojo
					        .style(this.domNode, "height", this.wrapBarSize + this.splitLineSize
					                        + "px");
				} else {
					dojo.style(this.domNode, "height", f + "px");
				}
			}
		}
	},
	toRealValue : function(a, b) {
		if (isNaN(a)) {
			if (a.indexOf("%") != -1) { return a = Math.floor(b * parseInt(a) / 100); }
			if (a.indexOf("px") != -1) { return parseInt(a); }
		}
		return a;
	},
	close : function() {
		if (this.isShowing && this.onClose() != false) {
			this._savePaneSize();
			dojo.style(this.paneNode, "display", "none");
			dojo.style(this.wrapNode, "display", "block");
			if (this.region == "top" || this.region == "bottom") {
				dojo.style(this.domNode, "height", this.wrapBarSize + this.splitLineSize + "px");
			} else {
				if (this.region == "left" || this.region == "right") {
					dojo.style(this.domNode, "width", this.wrapBarSize + this.splitLineSize + "px");
					dojo.style(this.wrapNode, "float", this.region);
				}
			}
			this.isShowing = false;
			dojo.style(this.splitNode, "cursor", "default");
			this.notifyParentResize();
		}
	},
	onOpen : function() {
		return true;
	},
	onClose : function() {
		return true;
	},
	_showMoveLine : function() {
		this._moveLine.style.display = "block";
		this._moveLine.style.height = this.splitNode.offsetHeight + "px";
		this._moveLine.style.width = this.splitNode.offsetWidth + "px";
		this._setMoveLineTL();
		this._moveEvents = [];
		if (this._moveLine.setCapture) {
			this._moveLine.setCapture();
			this._moveEvents.push(dojo.connect(this._moveLine, "onmousemove", this, "_doMoveLine"));
			this._moveEvents.push(dojo.connect(this._moveLine, "onmouseup", this, "_endMoveLine"));
		} else {
			this._moveEvents.push(dojo.connect(document, "onmousemove", this, "_doMoveLine"));
			this._moveEvents.push(dojo.connect(document, "onmouseup", this, "_endMoveLine"));
		}
	},
	_setMoveLineTL : function() {
		if (this.borderContainer.design == "sidebar") {
			if (this.region == "left") {
				this._moveLine.style.top = "0px";
				this._moveLine.style.left = this.paneNode.offsetWidth + "px";
			} else {
				if (this.region == "right") {
					this._moveLine.style.top = "0px";
					this._moveLine.style.left = this.borderContainer.domNode.clientWidth
					        - this.domNode.offsetWidth + "px";
				} else {
					if (this.region == "top") {
						this._moveLine.style.top = this.paneNode.offsetHeight + "px";
						if (this.borderContainer.leftPane) {
							this._moveLine.style.left = this.borderContainer.leftPane.domNode.offsetWidth
							        + "px";
						} else {
							this._moveLine.style.left = "0px";
						}
					} else {
						if (this.region == "bottom") {
							this._moveLine.style.top = this.borderContainer.domNode.clientHeight
							        - this.domNode.offsetHeight + "px";
							if (this.borderContainer.leftPane) {
								this._moveLine.style.left = this.borderContainer.leftPane.domNode.offsetWidth
								        + "px";
							} else {
								this._moveLine.style.left = "0px";
							}
						}
					}
				}
			}
		} else {
			if (this.region == "left") {
				if (this.borderContainer.topPane) {
					this._moveLine.style.top = this.borderContainer.topPane.domNode.offsetHeight
					        + "px";
				} else {
					this._moveLine.style.top = "0px";
				}
				this._moveLine.style.left = this.paneNode.offsetWidth + "px";
			} else {
				if (this.region == "right") {
					if (this.borderContainer.topPane) {
						this._moveLine.style.top = this.borderContainer.topPane.domNode.offsetHeight
						        + "px";
					} else {
						this._moveLine.style.top = "0px";
					}
					this._moveLine.style.left = this.borderContainer.domNode.clientWidth
					        - this.domNode.offsetWidth + "px";
				} else {
					if (this.region == "top") {
						this._moveLine.style.top = this.paneNode.offsetHeight + "px";
						this._moveLine.style.left = "0px";
					} else {
						if (this.region == "bottom") {
							this._moveLine.style.top = this.borderContainer.domNode.clientHeight
							        - this.domNode.offsetHeight + "px";
							this._moveLine.style.left = "0px";
						}
					}
				}
			}
		}
	},
	_startMove : function(a) {
		if (!this.isShowing) { return; }
		dojo.disconnect(this.startMoveEvent);
		this._showMoveLine();
		this.splitMouse_x = a.clientX;
		this.splitMouse_y = a.clientY;
		this.splitLine_t = this._moveLine.offsetTop;
		this.splitLine_l = this._moveLine.offsetLeft;
	},
	_doMoveLine : function(a) {
		var b;
		if (this.region == "left") {
			b = a.clientX - this.splitMouse_x;
			this._isValid(b)
			        && (this._moveLine.style.left = Math.floor(this.splitLine_l + b) + "px");
		} else {
			if (this.region == "right") {
				b = this.splitMouse_x - a.clientX;
				this._isValid(b)
				        && (this._moveLine.style.left = Math.floor(this.splitLine_l - b) + "px");
			} else {
				if (this.region == "top") {
					b = a.clientY - this.splitMouse_y;
					this._isValid(b)
					        && (this._moveLine.style.top = Math.floor(this.splitLine_t + b) + "px");
				} else {
					if (this.region == "bottom") {
						b = this.splitMouse_y - a.clientY;
						this._isValid(b)
						        && (this._moveLine.style.top = Math.floor(this.splitLine_t - b)
						                + "px");
					}
				}
			}
		}
	},
	_isValid : function(d) {
		var c, a, b;
		if (this.region == "left" || this.region == "right") {
			a = parseInt(this.minSize, 10);
			c = Math
			        .min(
			                parseInt(this.maxSize),
			                (this.domNode.offsetWidth
			                        + this.borderContainer.centerPane.domNode.offsetWidth - this.centerMinSize));
			b = this.domNode.offsetWidth + d;
		} else {
			if (this.region == "top" || this.region == "bottom") {
				a = parseInt(this.minSize, 10);
				c = Math
				        .min(
				                parseInt(this.maxSize),
				                (this.domNode.offsetHeight
				                        + this.borderContainer.centerPane.domNode.offsetHeight - this.centerMinSize));
				b = this.domNode.offsetHeight + d;
			}
		}
		c = Math.min(c, parseInt(this.maxSize));
		if (b >= a && b <= c) {
			return true;
		} else {
			return false;
		}
	},
	_endMoveLine : function(a) {
		var b = 0;
		if (this.region == "left") {
			b = Math.floor(this._moveLine.offsetLeft - this.splitLine_l);
			if (this.wrap && this.domNode.offsetWidth + b <= this.wrapBarSize + this.splitLineSize) {
				this.close();
			} else {
				dojo.style(this.domNode, "width", this.domNode.offsetWidth + b + "px");
			}
		} else {
			if (this.region == "right") {
				b = Math.floor(this.splitLine_l - this._moveLine.offsetLeft);
				if (this.wrap
				        && this.domNode.offsetWidth + b <= this.wrapBarSize + this.splitLineSize) {
					this.close();
				} else {
					dojo.style(this.domNode, "width", this.domNode.offsetWidth + b + "px");
				}
			} else {
				if (this.region == "top") {
					b = Math.floor(this._moveLine.offsetTop - this.splitLine_t);
					if (this.wrap
					        && this.domNode.offsetHeight + b <= this.wrapBarSize
					                + this.splitLineSize) {
						this.close();
					} else {
						dojo.style(this.domNode, "height", this.domNode.offsetHeight + b + "px");
					}
				} else {
					if (this.region == "bottom") {
						b = Math.floor(this.splitLine_t - this._moveLine.offsetTop);
						if (this.wrap
						        && this.domNode.offsetHeight + b <= this.wrapBarSize
						                + this.splitLineSize) {
							this.close();
						} else {
							dojo
							        .style(this.domNode, "height", this.domNode.offsetHeight + b
							                        + "px");
						}
					}
				}
			}
		}
		this._destoryAfterMove();
		this.notifyParentResize();
	},
	_destoryAfterMove : function() {
		if (this._moveLine.releaseCapture) {
			this._moveLine.releaseCapture();
		}
		dojo.forEach(this._moveEvents, dojo.disconnect);
		this._moveLine.style.top = "0px";
		this._moveLine.style.left = "0px";
		this._moveLine.style.display = "none";
		delete this.splitMouse_x;
		delete this.splitMouse_y;
		delete this.splitLine_t;
		delete this.splitLine_l;
	},
	setPaneHeight : function(a) {
		if (this.region == "left" || this.region == "right" || this.region == "center") { return; }
		if (this.isShowing) {
			this.setHeight(a);
		} else {
			this.paneSize_h = a;
		}
	},
	setPaneWidth : function(a) {
		if (this.region == "top" || this.region == "bottom" || this.region == "center") { return; }
		if (this.isShowing) {
			this.setWidth(a);
		} else {
			this.paneSize_w = a;
		}
	}
});
/* /unieap/ria3.3/unieap/layout/AdaptivePane.js */
dojo.provide("unieap.layout.AdaptivePane");
dojo.require("unieap.layout.Container");
dojo.declare("unieap.layout.AdaptivePane", [unieap.layout.Container], {
	        UserInterfaces : dojo.mixin({
		                autoHeight : "boolean",
		                marginTop : "number",
		                marginBottom : "number"
	                }, unieap.layout.Container.prototype.UserInterfaces),
	        autoHeight : false,
	        marginTop : 0,
	        marginBottom : 0,
	        postCreate : function() {
		        dojo.addClass(this.containerNode, "adaptivepane");
		        dojo.style(this.containerNode, {
			                marginTop : this.marginTop + "px",
			                marginBottom : this.marginBottom + "px"
		                });
		        this.initContainer();
	        },
	        getHeight : function() {
		        if (this.isAutoHeight()) { return this.height == "auto"
		                ? 100
		                : parseInt(this.height); }
		        var b = 0;
		        if (this.height == "auto") {
			        for (var a = 0, c; (c = this.containerNode.childNodes[a]); a++) {
				        if (c.nodeType && c.nodeType != 8) {
					        b += (c.offsetHeight || 0);
				        }
			        }
			        dojo.style(this.containerNode, "height", b + "px");
		        } else {
			        b = this.containerNode.offsetHeight;
		        }
		        return b;
	        },
	        setHeight : function(a) {
		        this.height = a;
		        dojo.style(this.domNode, "height", this._convertNumber(this.height));
	        },
	        isAutoHeight : function() {
		        return this.autoHeight;
	        }
        });
/* /unieap/ria3.3/unieap/layout/AccordionPane.js */
dojo.provide("unieap.layout.AccordionPane");
dojo.require("unieap.layout.ContentPane");
dojo.declare("unieap.layout.AccordionPane", [unieap.layout.ContentPane], {
	        UserInterfaces : dojo.mixin({
		                iconClass : "string",
		                onSelected : "function"
	                }, unieap.layout.ContentPane.prototype.UserInterfaces),
	        iconClass : "",
	        selected : false,
	        resize : function(b) {
		        if (b) {
			        var a = this.domNode.style;
			        this.height = Math.max(0, b.h);
			        this.width = Math.max(0, b.w);
			        a.width = this.width + "px";
			        a.height = this.height + "px";
		        }
		        this.resizeChildrenContainer();
	        },
	        onSelected : function() {}
        });
/* /unieap/ria3.3/unieap/layout/TitlePane.js */
dojo.provide("unieap.layout.TitlePane");
dojo.require("dijit._Templated");
dojo.require("dojo.fx");
dojo.require("unieap.layout.ContentPane");
dojo.declare("unieap.layout.TitlePane", [unieap.layout.ContentPane, dijit._Templated], {
	UserInterfaces : dojo.mixin({
		        title : "string",
		        href : "string",
		        open : "boolean",
		        duration : "number",
		        animate : "boolean",
		        flexible : "boolean",
		        onCollapse : "function",
		        onBeforeCollapse : "function",
		        onBeforeExpand : "function",
		        onExpand : "function",
		        onShow : "function",
		        showTitle : "boolean"
	        }, unieap.layout.Container.prototype.UserInterfaces),
	title : "",
	href : "",
	open : true,
	duration : 300,
	animate : (typeof(unieap.animate) == "undefined") ? true : unieap.animate,
	flexible : true,
	templateString : "<div class='u-titlepane-widget' ><div  class='u-titlepane-title' dojoAttachPoint='titleBarNode,focusNode'><span dojoAttachPoint='arrowNode' class='u-titlepane-arrownode'>-</span><div class='u-titlepane-buttonfield' dojoAttachPoint='buttonContainerNode'></div><span dojoAttachPoint='titleNode' class='u-titlepane-titlenode'></span></div><div class='u-titlepane-content-outer' dojoAttachPoint='hideNode'><div dojoAttachPoint='wipeNode' class='u-titlepane-content-wipe'><div class='u-titlepane-content-inner' dojoAttachPoint='containerNode'></div></div></div></div>",
	postCreate : function() {
		this.inherited(arguments);
		this.flexible
		        ? this.connect(this.titleBarNode, "onclick", "toggle")
		        : (this.arrowNode.innerHTML = "");
		this.createButtonContainer(this.buttonContainerNode);
		this.animate && this._initWipe();
		if (!this.open) {
			this.hideNode.style.display = "none";
			this.arrowNode.innerHTML = this.open ? "-" : "+";
			this.domNode.style.height = "24px";
		}
		this._setOpenCss();
		if (this.href) {
			this.setHref(this.href);
		}
		this.title && this.setTitle(this.title);
		if (this.showTitle == false) {
			this.titleBarNode.style.display = "none";
		}
	},
	resizeContainer : function() {
		if (null == this.domNode || 0 == this.domNode.offsetHeight) { return; }
		if (this.height != "auto") {
			dojo.style(this.domNode, "overflow", "hidden");
			var a = dojo.contentBox(this.domNode).h || dojo.style(this.domNode, "height");
			var b = 0;
			if (a > 25) {
				b = (a - 25);
			}
			if (dojo.boxModel == "content-box") {
				var c = dojo.marginBox(this.hideNode).h - dojo.contentBox(this.hideNode).h;
				if (b > c) {
					b = b - c;
				}
			}
			if (b <= 0) { return; }
			dojo.style(this.containerNode, "height", b + "px");
		}
		this.resizeChildrenContainer();
	},
	_setOpenCss : function() {
		dojo.removeClass(this.domNode, "u-titlepane-widget-open");
		dojo.removeClass(this.domNode, "u-titlepane-widget-close");
		if (this.open) {
			dojo.addClass(this.domNode, "u-titlepane-widget-open");
		} else {
			dojo.addClass(this.domNode, "u-titlepane-widget-close");
		}
	},
	_initWipe : function() {
		this._wipeIn = dojo.fx.wipeIn({
			        node : this.wipeNode,
			        duration : this.duration,
			        beforeBegin : dojo.hitch(this, function() {
				                this.hideNode.style.display = "";
				                if (dojo.isIE == 6) {
					                this.hideNode.style.visibility = "hidden";
				                }
			                }),
			        onEnd : dojo.hitch(this, function() {
				                if (dojo.isIE) {
					                this.hideNode.style.display = "none";
					                this.hideNode.style.display = "";
					                if (dojo.isIE == 6) {
						                this.wipeNode.style.height = "auto";
						                this.hideNode.style.visibility = "visible";
					                }
				                }
				                this._onExpand();
			                })
		        });
		if (dojo.isIE == 6) {
			dojo.disconnect([this._wipeIn, "onEnd", 1, 0]);
		}
		this._wipeOut = dojo.fx.wipeOut({
			        node : this.wipeNode,
			        duration : this.duration,
			        onEnd : dojo.hitch(this, function() {
				                this.hideNode.style.display = "none";
				                this._onCollapse();
			                })
		        });
	},
	createButtonContainer : function(a) {
		dojo.query(" > [type='buttons']", this.containerNode).place(a);
	},
	destroy : function() {
		if (this.buttonContainerNode) {
			dojo.query("[widgetId]", this.buttonContainerNode).forEach(function(b) {
				        var a = dijit.byNode(b);
				        a && a.destroy && a.destroy();
			        });
		}
		this.inherited(arguments);
	},
	toggle : function(a) {
		if (a && dojo.indexOf([this.titleBarNode, this.titleNode, this.arrowNode], a.target) == -1) { return; }
		dojo.forEach([this._wipeIn, this._wipeOut], function(c) {
			        if (c && c.status() == "playing") {
				        c.stop();
			        }
		        });
		if (this.open) {
			if (false === this._onBeforeCollapse()) { return; }
		} else {
			if (false === this._onBeforeExpand()) { return; }
		}
		var b = this[this.open ? "_wipeOut" : "_wipeIn"];
		if (b) {
			b.play();
		} else {
			this.hideNode.style.display = this.open ? "none" : "";
			this.open ? this._onCollapse() : this._onExpand();
		}
		this.open = !this.open;
		this.arrowNode.innerHTML = this.open ? "-" : "+";
		this._setOpenCss();
	},
	onCollapse : function() {},
	onBeforeCollapse : function() {
		return true;
	},
	onBeforeExpand : function() {
		return true;
	},
	onExpand : function() {},
	onShow : function() {},
	setTitle : function(a) {
		this.title = a;
		dojo.attr(this.domNode, "title", "");
		if (dojo.isFF) {
			this.titleNode.textContent = a;
		} else {
			this.titleNode.innerText = a;
		}
	},
	getTitle : function() {
		return this.title;
	},
	_onCollapse : function() {
		this.domNode.style.height = "24px";
		this.notifyResize();
		this.onCollapse();
	},
	_onExpand : function() {
		dojo.style(this.domNode, "height", this.height);
		this.notifyResize();
		this.onExpand();
	},
	_onBeforeCollapse : function() {
		return this.onBeforeCollapse();
	},
	_onBeforeExpand : function() {
		return this.onBeforeExpand();
	}
});
/* /unieap/ria3.3/unieap/layout/AdaptiveContainer.js */
dojo.provide("unieap.layout.AdaptiveContainer");
dojo.require("unieap.layout.Container");
dojo.require("unieap.layout.AdaptivePane");
dojo.declare("unieap.layout.AdaptiveContainer", [unieap.layout.Container], {
	        height : "100%",
	        postCreate : function() {
		        dojo.addClass(this.containerNode, "adaptivecontainer");
		        this.initContainer();
	        },
	        resizeContainer : function() {
		        if (null == this.domNode) { return; }
		        this._resizeChildren();
	        },
	        notifyParentResize : function(a) {
		        this._resizeChildren(a);
	        },
	        _resizeChildren : function(j) {
		        var b = this.getChildrenContainer(),
			        h = this.containerNode.clientHeight,
			        e = [],
			        l = [],
			        g = 0;
		        if (h <= 0) { return; }
		        for (var f = 0, a; f < b.length; f++) {
			        a = b[f];
			        if (a.isHidden()) {
				        continue;
			        }
			        if (a.isAutoHeight()) {
				        l.push(a);
				        g += a.getHeight();
			        } else {
				        e.push(a);
			        }
			        h = h - (a.marginTop || 0) - (a.marginBottom || 0);
		        }
		        for (var f = 0, a; f < e.length; f++) {
			        a = e[f];
			        if (j != a) {
				        a.resizeContainer();
			        }
			        h = h - a.getHeight();
			        if (h < 0) {
				        for (var d = 1; f + d < e.length; d++) {
					        e[f + d].getHeight();
				        }
				        return;
			        }
		        }
		        for (var f = 0, a; f < l.length; f++) {
			        a = l[f];
			        var k = Math.floor(h * a.getHeight() / g);
			        a.setHeight(k);
			        a.resizeContainer();
		        }
	        }
        });
/* /unieap/ria3.3/unieap/layout/AccordionContainer.js */
dojo.provide("unieap.layout.AccordionContainer");
dojo.require("unieap.layout.Container");
dojo.require("dijit._Templated");
dojo.require("unieap.layout.ContentPane");
dojo.require("dijit._CssStateMixin");
dojo.declare("unieap.layout.AccordionContainer", [unieap.layout.Container], {
	        UserInterfaces : dojo.mixin({
		                duration : "number",
		                animate : "boolean"
	                }, unieap.layout.Container.prototype.UserInterfaces),
	        duration : 300,
	        animate : (typeof(unieap.animate) == "undefined") ? true : unieap.animate,
	        doLayout : true,
	        buttonWidget : "unieap.layout._AccordionButton",
	        baseClass : "accordionContainer",
	        buildRendering : function() {
		        this.inherited(arguments);
		        this.domNode.style.overflow = "hidden";
	        },
	        startup : function() {
		        if (this._started) { return; }
		        var a = this.getChildren();
		        dojo.forEach(a, this._setupChild, this);
		        dojo.some(a, function(d) {
			                if (d.selected) {
				                this.selectedChildWidget = d;
			                }
			                return d.selected;
		                }, this);
		        var c = this.selectedChildWidget;
		        if (!c && a[0]) {
			        c = this.selectedChildWidget = a[0];
			        c.selected = true;
		        }
		        this.inherited(arguments);
		        if (this.selectedChildWidget) {
			        var b = this.selectedChildWidget.containerNode.style;
			        b.display = "";
			        b.overflow = "auto";
			        this.selectedChildWidget._wrapperWidget.set("selected", true);
		        }
		        this._started = true;
	        },
	        selectChild : function(a) {
		        a = dijit.byId(a);
		        if (this.selectedChildWidget != a) {
			        var b = this._transition(a, this.selectedChildWidget);
			        this._set("selectedChildWidget", a);
		        }
		        return b;
	        },
	        resize : function(a, i) {
		        var c = this.selectedChildWidget;
		        if (c && !this._hasBeenShown) {
			        this._hasBeenShown = true;
			        this._showChild(c);
		        }
		        var b = this.domNode;
		        if (a) {
			        dojo.marginBox(b, a);
			        if (a.t) {
				        b.style.top = a.t + "px";
			        }
			        if (a.l) {
				        b.style.left = a.l + "px";
			        }
		        }
		        var j = i || {};
		        dojo.mixin(j, a || {});
		        if (!("h" in j) || !("w" in j)) {
			        j = dojo.mixin(dojo.marginBox(b), j);
		        }
		        var e = dojo.getComputedStyle(b);
		        var h = dojo._getMarginExtents(b, e);
		        var d = dojo._getBorderExtents(b, e);
		        var g = (this._borderBox = {
			        w : j.w - (h.w + d.w),
			        h : j.h - (h.h + d.h)
		        });
		        var f = dojo._getPadExtents(b, e);
		        this._contentBox = {
			        l : dojo._toPixelValue(b, e.paddingLeft),
			        t : dojo._toPixelValue(b, e.paddingTop),
			        w : g.w - f.w,
			        h : g.h - f.h
		        };
		        this.layout();
	        },
	        resizeContainer : function() {
		        if (null == this.domNode) { return; }
		        this.resize();
	        },
	        layout : function() {
		        var h = this.selectedChildWidget;
		        if (!h) { return; }
		        var a = h._wrapperWidget.domNode,
			        g = dojo._getMarginExtents(a),
			        f = dojo._getPadBorderExtents(a),
			        e = h._wrapperWidget.containerNode,
			        d = dojo._getMarginExtents(e),
			        b = dojo._getPadBorderExtents(e),
			        c = this._contentBox;
		        var i = 0;
		        dojo.forEach(this.getChildren(), function(j) {
			                if (j != h && j._wrapperWidget) {
				                i += dojo._getMarginSize(j._wrapperWidget.domNode).h;
			                }
		                });
		        this._verticalSpace = c.h - i - g.h - f.h - d.h - b.h
		                - h._buttonWidget.getTitleHeight();
		        this._containerContentBox = {
			        h : this._verticalSpace,
			        w : this._contentBox.w - g.w - f.w - d.w - b.w
		        };
		        if (h) {
			        h.resize(this._containerContentBox);
		        }
	        },
	        _setupChild : function(a) {
		        a._wrapperWidget = new unieap.layout._AccordionInnerContainer({
			                contentWidget : a,
			                buttonWidget : this.buttonWidget,
			                id : a.id + "_wrapper",
			                dir : a.dir,
			                lang : a.lang,
			                parent : this
		                });
		        this.inherited(arguments);
	        },
	        addChild : function(b, a) {
		        if (this._started) {
			        dojo.place(b.domNode, this.containerNode, a);
			        if (!b._started) {
				        b.startup();
			        }
			        this._setupChild(b);
			        dojo.publish(this.id + "-addChild", [b, a]);
			        this.layout();
			        if (!this.selectedChildWidget) {
				        this.selectChild(b);
			        }
		        } else {
			        this.inherited(arguments);
		        }
	        },
	        removeChild : function(a) {
		        if (a == this.selectedChildWidget && this.getChildren().length > 1) {
			        this.forward();
		        }
		        if (1 == this.getChildren().length) {
			        this.selectedChildWidget = null;
		        }
		        if (a._wrapperWidget) {
			        dojo.place(a.domNode, a._wrapperWidget.domNode, "after");
			        a._wrapperWidget.destroy();
			        delete a._wrapperWidget;
		        }
		        this.inherited(arguments);
		        this.layout();
	        },
	        getChildren : function() {
		        return dojo.map(this.inherited(arguments), function(a) {
			                return a.declaredClass == "unieap.layout._AccordionInnerContainer"
			                        ? a.contentWidget
			                        : a;
		                }, this);
	        },
	        destroy : function() {
		        if (this._animation) {
			        this._animation.stop();
		        }
		        dojo.forEach(this.getChildren(), function(a) {
			                if (a._wrapperWidget) {
				                a._wrapperWidget.destroy();
			                } else {
				                a.destroyRecursive();
			                }
		                });
		        this.inherited(arguments);
	        },
	        _showChild : function(a) {
		        a._wrapperWidget.containerNode.style.display = "block";
		        return this.inherited(arguments);
	        },
	        _hideChild : function(a) {
		        a._wrapperWidget.containerNode.style.display = "none";
		        this.inherited(arguments);
	        },
	        _transition : function(j, f) {
		        var b = this.animate;
		        if (dojo.isIE < 8) {
			        b = false;
		        }
		        if (this._animation) {
			        this._animation.stop(true);
			        delete this._animation;
		        }
		        var l = this;
		        if (j) {
			        j._wrapperWidget.set("selected", true);
			        var k = this._showChild(j);
			        if (this.doLayout && j.resize) {
				        j.resize(this._containerContentBox);
			        }
		        }
		        if (f && f._wrapperWidget) {
			        f._wrapperWidget.set("selected", false);
			        if (!b) {
				        this._hideChild(f);
			        }
		        }
		        if (b && f) {
			        var e = j._wrapperWidget.containerNode,
				        i = f._wrapperWidget.containerNode;
			        var h = j._wrapperWidget.containerNode,
				        g = dojo._getMarginExtents(h),
				        c = dojo._getPadBorderExtents(h),
				        a = g.h + c.h;
			        i.style.height = (l._verticalSpace - a) + "px";
			        var l = this;
			        this._animation = new dojo.Animation({
				                node : e,
				                duration : this.duration,
				                curve : [1, this._verticalSpace - a - 1],
				                onAnimate : function(d) {
					                d = Math.floor(d);
					                e.style.height = d + "px";
					                i.style.height = (l._verticalSpace - a - d) + "px";
				                },
				                onEnd : function() {
					                delete l._animation;
					                e.style.height = "auto";
					                if (f && f._wrapperWidget) {
						                f._wrapperWidget.containerNode.style.display = "none";
						                i.style.height = "auto";
						                l._hideChild(f);
					                }
				                }
			                });
			        this._animation.onStop = this._animation.onEnd;
			        this._animation.play();
		        }
		        return k;
	        },
	        _onKeyPress : function(d, a) {
		        if (this.disabled || d.altKey || !(a || d.ctrlKey)) { return; }
		        var b = dojo.keys,
			        f = d.charOrCode;
		        if ((a && (f == b.LEFT_ARROW || f == b.UP_ARROW)) || (d.ctrlKey && f == b.PAGE_UP)) {
			        this._adjacent(false)._buttonWidget._onTitleClick();
			        dojo.stopEvent(d);
		        } else {
			        if ((a && (f == b.RIGHT_ARROW || f == b.DOWN_ARROW))
			                || (d.ctrlKey && (f == b.PAGE_DOWN || f == b.TAB))) {
				        this._adjacent(true)._buttonWidget._onTitleClick();
				        dojo.stopEvent(d);
			        }
		        }
	        },
	        _adjacent : function(b) {
		        var c = this.getChildren();
		        var a = dojo.indexOf(c, this.selectedChildWidget);
		        a += b ? 1 : c.length - 1;
		        return c[a % c.length];
	        },
	        forward : function() {
		        return this.selectChild(this._adjacent(true));
	        },
	        back : function() {
		        return this.selectChild(this._adjacent(false));
	        }
        });
dojo.declare("unieap.layout._AccordionInnerContainer", [dijit._Widget, dijit._CssStateMixin], {
	        baseClass : "accordioninnerContainer",
	        isContainer : true,
	        isLayoutContainer : true,
	        buildRendering : function() {
		        this.domNode = dojo.place("<div class='" + this.baseClass + "'>",
		                this.contentWidget.domNode, "after");
		        var b = this.contentWidget,
			        a = dojo.getObject(this.buttonWidget);
		        this.button = b._buttonWidget = (new a({
			                contentWidget : b,
			                label : b.title,
			                title : b.tooltip,
			                dir : b.dir,
			                lang : b.lang,
			                iconClass : b.iconClass,
			                id : b.id + "_button",
			                parent : this.parent
		                })).placeAt(this.domNode);
		        this.containerNode = dojo.place(
		                "<div class='accordionChildWrapper' style='display:none'>", this.domNode);
		        dojo.place(this.contentWidget.domNode, this.containerNode);
	        },
	        _setSelectedAttr : function(b) {
		        this._set("selected", b);
		        this.button.set("selected", b);
		        if (b) {
			        var a = this.contentWidget;
			        if (a.onSelected) {
				        a.onSelected();
			        }
		        }
	        },
	        startup : function() {
		        this.contentWidget.startup();
	        },
	        destroy : function() {
		        this.button.destroyRecursive();
		        dojo.forEach(this._contentWidgetWatches || [], function(a) {
			                a.unwatch();
		                });
		        delete this.contentWidget._buttonWidget;
		        delete this.contentWidget._wrapperWidget;
		        this.inherited(arguments);
	        },
	        destroyDescendants : function() {
		        this.contentWidget.destroyRecursive();
	        }
        });
dojo.declare("unieap.layout._AccordionButton", [dijit._Widget, dijit._Templated,
                dijit._CssStateMixin], {
	        templateString : "<div dojoAttachEvent='onclick:_onTitleClick' class='accordionTitle'><div dojoAttachPoint='titleNode,focusNode' dojoAttachEvent='onkeypress:_onTitleKeyPress' class='accordionTitleFocus' role='tab' aria-expanded='false'><span class='accordionArrow' role='presentation'></span><span class='arrowTextUp' role='presentation'>+</span><span class='arrowTextDown' role='presentation'>-</span><img src='${_blankGif}' alt='' class='accordionIcon' dojoAttachPoint='iconNode' style='vertical-align: middle' role='presentation'/><span role='presentation' dojoAttachPoint='titleTextNode' class='dijitAccordionText'></span></div></div>",
	        attributeMap : dojo.mixin(dojo.clone(unieap.layout.ContentPane.prototype.attributeMap),
	                {
		                label : {
			                node : "titleTextNode",
			                type : "innerHTML"
		                },
		                title : {
			                node : "titleTextNode",
			                type : "attribute",
			                attribute : "title"
		                },
		                iconClass : {
			                node : "iconNode",
			                type : "class"
		                }
	                }),
	        baseClass : "accordionTitle",
	        getParent : function() {
		        return this.parent;
	        },
	        buildRendering : function() {
		        this.inherited(arguments);
		        var a = this.id.replace(" ", "_");
		        dojo.attr(this.titleTextNode, "id", a + "_title");
		        dijit
		                .setWaiState(this.focusNode, "labelledby", dojo.attr(this.titleTextNode,
		                                "id"));
		        dojo.setSelectable(this.domNode, false);
	        },
	        getTitleHeight : function() {
		        return dojo._getMarginSize(this.domNode).h;
	        },
	        _onTitleClick : function() {
		        var a = this.getParent();
		        a.selectChild(this.contentWidget);
		        dijit.focus(this.focusNode);
	        },
	        _onTitleKeyPress : function(a) {
		        return this.getParent()._onKeyPress(a, this.contentWidget);
	        },
	        _setSelectedAttr : function(a) {
		        this._set("selected", a);
		        dijit.setWaiState(this.focusNode, "expanded", a);
		        dijit.setWaiState(this.focusNode, "selected", a);
		        this.focusNode.setAttribute("tabIndex", a ? "0" : "-1");
	        }
        });
/* /unieap/ria3.3/unieap/layout/HBoxContainer.js */
dojo.provide("unieap.layout.HBoxContainer");
dojo.require("unieap.layout.Container");
dojo.require("dijit._Templated");
dojo.declare("unieap.layout.HBoxContainer", [unieap.layout.Container, dijit._Templated], {
	UserInterfaces : dojo.mixin({
		        align : "string",
		        pack : "string",
		        margins : "string"
	        }, unieap.layout.Container.prototype.UserInterfaces),
	templateString : '<div class="hbox-outer"><div class="hbox-inner" dojoAttachPoint="containerNode"></div></div>',
	align : "middle",
	postMixInProperties : function() {
		dojo.isIE < 8 && (this.align = this.srcNodeRef.getAttribute("align") || this.align);
		this.inherited(arguments);
	},
	pack : "start",
	margins : "0",
	paddings : "0",
	height : "100%",
	width : "auto",
	postCreate : function() {
		this.margins = this.margins || {
			top : 0,
			right : 0,
			bottom : 0,
			left : 0
		};
		this.paddings = this.paddings || {
			top : 0,
			right : 0,
			bottom : 0,
			left : 0
		};
		dojo.isString(this.margins) && (this.margins = this.parseMargins(this.margins));
		dojo.isString(this.paddings) && (this.paddings = this.parseMargins(this.paddings));
		this.initContainer();
	},
	startup : function() {
		this.doLayout();
		this.inherited(arguments);
	},
	resizeContainer : function() {
		if (null == this.domNode) { return; }
		this.doLayout();
	},
	doLayout : function(n) {
		var b = this.containerNode.childNodes,
			g = [],
			o = [],
			m = 0,
			p = dojo.contentBox(this.containerNode).w;
		this.pureWidth = 0;
		for (var f = b.length, k = f - 1, e; k >= 0; k--) {
			e = b[k];
			if (e.nodeType == 3) {
				this.containerNode.removeChild(e);
				continue;
			}
			if (e.offsetHeight == 0) {
				continue;
			}
			var j = this._getWidth(e);
			if (j.isPercent) {
				m += j.width;
				o.unshift(e);
			} else {
				g.unshift(e);
			}
		}
		p = p - this.paddings.left - (this.margins.left + this.margins.right) * (b.length)
		        - this.paddings.right;
		for (var k = 0, f = g.length, e; k < f; k++) {
			e = g[k];
			var d = this._getWidth(e)["width"];
			this.pureWidth += d;
			p -= d;
		}
		for (var k = 0, f = o.length, e; k < f; k++) {
			e = o[k];
			var d = 0;
			if (p > 0) {
				d = Math.floor((p + 0) * this._getWidth(e)["width"] / m);
				var h = dojo.marginBox(e).w - dojo.contentBox(e).w;
				dojo.style(e, "width", (d - h) + "px");
			} else {
				d = e.offsetWidth;
			}
			this.pureWidth += d;
		}
		for (var k = 0, f = b.length; k < f; k++) {
			e = b[k];
			if (k == 0) {
				e.style.position = "absolute";
				e.style.left = this._getPackLeft() + "px";
			} else {
				var a = b[k - 1];
				e.style.position = "absolute";
				e.style.left = (dojo.style(a, "left") + dojo.marginBox(a).w + this.margins.right + this.margins.left)
				        + "px";
			}
			this._doVeticalLayout(e);
		}
		unieap.fireContainerResize(this.containerNode);
	},
	_getWidth : function(b) {
		var c = dijit.byNode(b),
			a = (c || 0).width || b.style.width;
		if (a && this.isPercent(a)) { return {
			width : parseInt(a, 10) || 100,
			isPercent : true
		}; }
		return {
			width : dojo.marginBox(b).w
		};
	},
	_doVeticalLayout : function(a) {
		switch (this.align) {
			case "top" :
				var b = this.paddings.top + this.margins.top;
				a.style.top = b + "px";
				break;
			case "bottom" :
				var b = this.containerNode.offsetHeight - dojo.marginBox(a).h - this.margins.bottom
				        - this.paddings.bottom;
				if (b <= 0) {
					a.style.top = this.paddings.top + "px";
					return;
				}
				a.style.top = b + "px";
				break;
			default :
				var b = (this.containerNode.offsetHeight - dojo.marginBox(a).h) / 2;
				if (b <= 0) {
					a.style.top = this.paddings.top + "px";
					return;
				}
				b >= this.paddings.top ? (b = b) : (b = this.paddings.top);
				b += this.margins.top;
				a.style.top = b + "px";
				break;
		}
	},
	_getPackLeft : function() {
		switch (this.pack) {
			case "center" :
				var b = dojo.contentBox(this.containerNode).w,
					a = this.pureWidth;
				if (a > b) { return this.paddings.left; }
				a += (this.margins.left + this.margins.right)
				        * this.containerNode.childNodes.length;
				var c = (b - a) / 2;
				c > this.paddings.left ? (c = c) : (c = this.paddings.left);
				return c;
			case "end" :
				var b = dojo.contentBox(this.containerNode).w,
					a = this.pureWidth;
				if (a > b) { return this.paddings.left; }
				a += (this.margins.left + this.margins.right)
				        * this.containerNode.childNodes.length;
				var c = b - a - this.paddings.right;
				c > this.paddings.left ? (c = c) : (c = this.paddings.left);
				return c;
			default :
				return this.paddings.left + this.margins.left;
		}
	},
	isPercent : function(a) {
		a = String(a);
		return (a.indexOf("%") == a.length - 1) || (a == "auto");
	},
	parseMargins : function(c) {
		c = dojo.trim(String(c));
		var b = c.split(/\s+/),
			a = b.length;
		if (a == 1) {
			b[1] = b[2] = b[3] = b[0];
		} else {
			if (a == 2) {
				b[2] = b[0];
				b[3] = b[1];
			} else {
				if (a == 3) {
					b[3] = b[1];
				}
			}
		}
		return {
			top : parseInt(b[0], 10) || 0,
			right : parseInt(b[1], 10) || 0,
			bottom : parseInt(b[2], 10) || 0,
			left : parseInt(b[3], 10) || 0
		};
	}
});
/* /unieap/ria3.3/unieap/layout/StackContainer.js */
dojo.provide("unieap.layout.StackContainer");
dojo.require("unieap.layout.Container");
dojo.require("dijit._Templated");
dojo.declare("unieap.layout.StackContainer", [unieap.layout.Container, dijit._Templated], {
	        templateString : '<div dojoAttachPoint="containerNode" class="stackcontainer"></div>',
	        height : "400px",
	        _adjacent : function(b) {
		        var c = this.getChildren();
		        var a = dojo.indexOf(c, this.selectedChildWidget);
		        if (a == 0 && b == -1) {
			        return c[0];
		        } else {
			        if (a == c.length - 1 && b == 1) { return c[c.length - 1]; }
		        }
		        a += b;
		        return c[a];
	        },
	        forward : function(a) {
		        this.selectChild(this._adjacent(1), a);
	        },
	        back : function(a) {
		        this.selectChild(this._adjacent(-1), a);
	        },
	        selectChild : function(c, b) {
		        typeof(c) == "string" ? (c = unieap.byId(c)) : (typeof(c) == "number" ? (c = this
		                .getChildren()[c]) : (c = c));
		        if (this.getIndexOfChild(c) == -1) { return; }
		        if (c instanceof unieap.layout.ContentPane && this.selectedChildWidget != c) {
			        var a = this.selectedChildWidget;
			        this.selectedChildWidget = c;
			        this._transition(a, c, b);
		        }
	        },
	        _transition : function(a, b, c) {
		        a && this._hideChild(a);
		        this._showChild(b, c);
		        b.resizeContainer();
	        },
	        _showChild : function(b, c) {
		        var a = this.getChildren();
		        b.isFirstChild = (b == a[0]);
		        b.isLastChild = (b == a[a.length - 1]);
		        b.selected = true;
		        dojo.removeClass(b.domNode, "stackpage-hidden");
		        dojo.addClass(b.domNode, "stackpage-visible");
		        b._onShow(c);
	        },
	        _hideChild : function(a) {
		        a.selected = false;
		        dojo.removeClass(a.domNode, "stackpage-visible");
		        dojo.addClass(a.domNode, "stackpage-hidden");
		        a.onHide && a.onHide();
	        },
	        addChild : function(c, b) {
		        typeof(b) == "undefined" && (b = true);
		        if (!(c instanceof unieap.layout.ContentPane)) { return; }
		        b = !!b;
		        c._inTabContainer = true;
		        this.inherited(arguments);
		        var a = this.getChildren();
		        if (this._started) {
			        if (b || a.length == 1) {
				        this.selectChild(c);
			        } else {
				        dojo.addClass(c.domNode, "stackpage-hidden");
			        }
		        }
	        },
	        removeChild : function(b) {
		        var a = this.getChildren();
		        typeof(b) == "string" ? (b = unieap.byId(b)) : (typeof(b) == "number"
		                ? (b = a[b])
		                : (b = b));
		        if (!(b instanceof unieap.layout.ContentPane)) { return; }
		        this.inherited(arguments);
		        if (this._beingDestroyed) { return; }
		        if (this.selectedChildWidget === b) {
			        this.selectedChildWidget = null;
			        this._started && (a = this.getChildren()) && a[0] && this.selectChild(a[0]);
		        }
	        },
	        getSelectedChild : function() {
		        return this.selectedChildWidget;
	        },
	        selectedChildWidget : null,
	        postCreate : function() {
		        this.initContainer();
	        },
	        startup : function() {
		        if (this._started) { return; }
		        var a = this.getChildren();
		        if (a.length == 0) { return; }
		        dojo.forEach(a, function(b) {
			                if (b.selected && !this.selectedChildWidget) {
				                this.selectedChildWidget = b;
			                } else {
				                dojo.removeClass(b.domNode, "stackpage-visible");
				                dojo.addClass(b.domNode, "stackpage-hidden");
			                }
			                b._inTabContainer = true;
		                }, this);
		        !this.selectedChildWidget && a[0] && (this.selectedChildWidget = a[0])
		                && (a[0].selected = true);
		        this.inherited(arguments);
	        },
	        resizeContainer : function() {
		        var a = this.selectedChildWidget;
		        if (a && !this._hasBeenShown) {
			        this._hasBeenShown = true;
			        this._showChild(a);
		        }
		        this.inherited(arguments);
	        },
	        notifyParentResize : function() {}
        });

/* /unieap/ria3.3/unieap/layout/VBoxContainer.js */
dojo.provide("unieap.layout.VBoxContainer");
dojo.require("unieap.layout.Container");
dojo.require("dijit._Templated");
dojo.declare("unieap.layout.VBoxContainer", [unieap.layout.Container, dijit._Templated], {
	UserInterfaces : dojo.mixin({
		        align : "string",
		        pack : "string",
		        margins : "string",
		        paddings : "string"
	        }, unieap.layout.Container.prototype.UserInterfaces),
	templateString : '<div class="vbox-outer"><div class="vbox-inner" dojoAttachPoint="containerNode"></div></div>',
	align : "left",
	postMixInProperties : function() {
		dojo.isIE < 8 && (this.align = this.srcNodeRef.getAttribute("align") || this.align);
		this.inherited(arguments);
	},
	pack : "center",
	margins : "0",
	paddings : "0",
	height : "100%",
	width : "auto",
	postCreate : function() {
		this.margins = this.margins || {
			top : 0,
			right : 0,
			bottom : 0,
			left : 0
		};
		this.paddings = this.paddings || {
			top : 0,
			right : 0,
			bottom : 0,
			left : 0
		};
		dojo.isString(this.margins) && (this.margins = this.parseMargins(this.margins));
		dojo.isString(this.paddings) && (this.paddings = this.parseMargins(this.paddings));
		this.initContainer();
	},
	startup : function() {
		this.doLayout();
	},
	resizeContainer : function() {
		if (null == this.domNode) { return; }
		this.doLayout();
	},
	doLayout : function(p) {
		var b = this.containerNode.childNodes,
			h = [],
			q = [],
			o = 0,
			e = dojo.contentBox(this.containerNode).h;
		this.pureHeight = 0;
		for (var g = b.length, m = g - 1, f; m >= 0; m--) {
			f = b[m];
			if (f.nodeType == 3) {
				this.containerNode.removeChild(f);
				continue;
			}
			var n = dijit.byNode(f),
				r = (n || 0).height || f.style.height;
			if (f.offsetHeight == 0 && r != "auto") {
				continue;
			}
			var d = (n || 0).width || f.style.width;
			if (d == "auto") {
				f.style.width = "100%";
			}
			var k = this._getHeight(f);
			if (k.isPercent) {
				o += k.height;
				q.unshift(f);
			} else {
				h.unshift(f);
			}
		}
		e = e - this.paddings.top - this.paddings.bottom - (this.margins.top + this.margins.bottom)
		        * (b.length);
		for (var m = 0, g = h.length, f; m < g; m++) {
			f = h[m];
			var r = this._getHeight(f)["height"];
			this.pureHeight += r;
			e -= r;
		}
		for (var m = 0, g = q.length, f; m < g; m++) {
			f = q[m];
			var r = 0;
			if (e > 0) {
				r = Math.floor((e + 0) * this._getHeight(f)["height"] / o);
				var j = dojo.marginBox(f).h - dojo.contentBox(f).h;
				(dijit.byNode(f || 0) || 0).setHeight
				        ? dijit.byNode(f).setHeight((r - j) + "px")
				        : dojo.style(f, "height", (r - j) + "px");
			} else {
				r = f.offsetHeight;
			}
			this.pureHeight += r;
		}
		for (var m = 0, g = b.length; m < g; m++) {
			f = b[m];
			if (m == 0) {
				f.style.position = "absolute";
				f.style.top = this._getPack() + "px";
			} else {
				var a = b[m - 1];
				f.style.position = "absolute";
				f.style.top = (dojo.style(a, "top") + dojo.marginBox(a).h + this.margins.bottom + this.margins.top)
				        + "px";
			}
			this._doVeticalLayout(f);
		}
		unieap.fireContainerResize(this.domNode);
	},
	_getHeight : function(b) {
		var c = dijit.byNode(b),
			a = (c || 0).height || b.style.height;
		if (a && this.isPercent(a)) { return {
			height : parseInt(a, 10) || 100,
			isPercent : true
		}; }
		return {
			height : dojo.marginBox(b).h
		};
	},
	_doVeticalLayout : function(a) {
		switch (this.align) {
			case "middle" :
				var b = (this.containerNode.offsetWidth - a.offsetWidth) / 2;
				if (b <= 0) {
					a.style.left = this.paddings.left + "px";
					return;
				}
				b >= this.paddings.left ? (b = b) : (b = this.paddings.left);
				b += this.margins.left;
				a.style.left = b + "px";
				break;
			case "right" :
				var b = this.containerNode.offsetWidth - dojo.marginBox(a).w - this.margins.right
				        - this.paddings.right;
				if (b <= 0) {
					a.style.left = this.paddings.left + "px";
					return;
				}
				a.style.left = b + "px";
				break;
			default :
				var b = this.paddings.left + this.margins.left;
				a.style.left = b + "px";
				break;
		}
	},
	_getPack : function() {
		switch (this.pack) {
			case "start" :
				return this.paddings.top + this.margins.top;
			case "end" :
				var a = dojo.contentBox(this.containerNode).h,
					c = this.pureHeight;
				if (c > a) { return this.paddings.top; }
				c += (this.margins.top + this.margins.bottom)
				        * this.containerNode.childNodes.length;
				var b = a - c - this.paddings.bottom;
				b > this.paddings.top ? (b = b) : (b = this.paddings.top);
				return b;
			default :
				var a = dojo.contentBox(this.containerNode).h,
					c = this.pureHeight;
				if (c > a) { return this.paddings.top; }
				c += (this.margins.top + this.margins.bottom)
				        * this.containerNode.childNodes.length;
				var b = (a - c) / 2;
				b > this.paddings.top ? (b = b) : (b = this.paddings.top);
				return b;
		}
	},
	isPercent : function(a) {
		a = String(a);
		return (a.indexOf("%") == a.length - 1) || (a == "auto");
	},
	parseMargins : function(c) {
		c = dojo.trim(String(c));
		var b = c.split(/\s+/),
			a = b.length;
		if (a == 1) {
			b[1] = b[2] = b[3] = b[0];
		} else {
			if (a == 2) {
				b[2] = b[0];
				b[3] = b[1];
			} else {
				if (a == 3) {
					b[3] = b[1];
				}
			}
		}
		return {
			top : parseInt(b[0], 10) || 0,
			right : parseInt(b[1], 10) || 0,
			bottom : parseInt(b[2], 10) || 0,
			left : parseInt(b[3], 10) || 0
		};
	}
});
/* /unieap/ria3.3/unieap/layout/TabController.js */
dojo.provide("unieap.layout.TabController");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("unieap.menu.Menu");
dojo.require("unieap.layout._BaseContainer");
dojo.declare("unieap.layout.TabController", [dijit._Widget, dijit._Templated,
                unieap.layout._BaseContainer], {
	        templateString : "<div wairole='tablist' dojoAttachEvent='onkeypress:onkeypress'></div>",
	        tabPosition : "top",
	        buttonWidget : "unieap.layout._TabButton",
	        container : null,
	        postCreate : function() {
		        dijit.setWaiRole(this.domNode, "tablist");
		        if (this.tabPosition == "left-h" || this.tabPosition == "right-h") {
			        this.domNode.style.height = "99999px";
		        } else {}
		        this.pane2button = {};
		        this._subscriptions = [
		                dojo.subscribe(this.container.id + "-startup", this, "onStartup"),
		                dojo.subscribe(this.container.id + "-addChild", this, "onAddChild"),
		                dojo.subscribe(this.container.id + "-removeChild", this, "onRemoveChild"),
		                dojo.subscribe(this.container.id + "-selectChild", this, "onSelectChild"),
		                dojo.subscribe(this.container.id + "-hideTabButton", this, "hideTabButton"),
		                dojo.subscribe(this.container.id + "-showTabButton", this, "showTabButton")];
	        },
	        onAddChild : function(e, a) {
		        var c = dojo.doc.createElement("span");
		        this.domNode.appendChild(c);
		        var b = dojo.getObject(this.buttonWidget);
		        var d = new b({
			                tablist : this,
			                page : e
		                }, c);
		        this.addChild(d, a);
		        this.pane2button[e] = d;
		        e.controlButton = d;
		        if (!this._currentChild) {
			        d.focusNode.setAttribute("tabIndex", "0");
			        this._currentChild = e;
		        }
		        if (!this.isLeftToRight() && dojo.isIE && this._rectifyRtlTabList) {
			        this._rectifyRtlTabList();
		        }
	        },
	        _rectifyRtlTabList : function() {
		        if (0 >= this.tabPosition.indexOf("-h")) { return; }
		        if (!this.pane2button) { return; }
		        var b = 0;
		        for (var c in this.pane2button) {
			        var a = this.pane2button[c].innerDiv.scrollWidth;
			        b = Math.max(b, a);
		        }
		        for (c in this.pane2button) {
			        this.pane2button[c].innerDiv.style.width = b + "px";
		        }
	        },
	        onStartup : function(a) {
		        dojo.forEach(a.children, this.onAddChild, this);
		        this.onSelectChild(a.selected);
	        },
	        onRemoveChild : function(b) {
		        if (this._currentChild === b) {
			        this._currentChild = null;
		        }
		        var a = this.pane2button[b];
		        if (a) {
			        a.destroy();
			        delete this.pane2button[b];
		        }
	        },
	        onSelectChild : function(c) {
		        if (!c) { return; }
		        if (this._currentChild) {
			        var a = this.pane2button[this._currentChild];
			        a.setSeleted(false);
			        a.focusNode.setAttribute("tabIndex", "-1");
		        }
		        var b = this.pane2button[c];
		        b.setSeleted(true);
		        this._currentChild = c;
		        b.focusNode.setAttribute("tabIndex", "0");
		        dijit.setWaiState(this.container.containerNode, "labelledby", b.id);
		        this._handleFocus(b);
	        },
	        hideTabButton : function(b) {
		        var a = this.pane2button[b];
		        a.hide();
	        },
	        showTabButton : function(b) {
		        var a = this.pane2button[b];
		        a.show();
	        },
	        _handleFocus : function(a) {
		        unieap.blurWidget();
	        },
	        onButtonClick : function(a) {
		        this.container.selectChild(a);
	        },
	        onCloseButtonClick : function(c) {
		        this.container.closeChild(c);
		        var a = this.pane2button[this._currentChild];
		        if (a) {
			        dijit.focus(a.focusNode || a.domNode);
		        }
	        },
	        adjacent : function(a) {
		        if (!this.isLeftToRight()
		                && (!this.tabPosition || /top|bottom/.test(this.tabPosition))) {
			        a = !a;
		        }
		        var b = this.getChildren();
		        var c = dojo.indexOf(b, this.pane2button[this._currentChild]);
		        var d = a ? 1 : b.length - 1;
		        return b[(c + d) % b.length];
	        },
	        onkeypress : function(c) {
		        if (this.disabled || c.altKey) { return; }
		        var b = null;
		        if (c.ctrlKey || !c._djpage) {
			        var a = dojo.keys;
			        switch (c.charOrCode) {
				        case a.LEFT_ARROW :
				        case a.UP_ARROW :
					        if (!c._djpage) {
						        b = false;
					        }
					        break;
				        case a.PAGE_UP :
					        if (c.ctrlKey) {
						        b = false;
					        }
					        break;
				        case a.RIGHT_ARROW :
				        case a.DOWN_ARROW :
					        if (!c._djpage) {
						        b = true;
					        }
					        break;
				        case a.PAGE_DOWN :
					        if (c.ctrlKey) {
						        b = true;
					        }
					        break;
				        case a.DELETE :
					        if (this._currentChild.closable) {
						        this.onCloseButtonClick(this._currentChild);
					        }
					        dojo.stopEvent(c);
					        break;
				        default :
					        if (c.ctrlKey) {
						        if (c.charOrCode === a.TAB) {
							        this.adjacent(!c.shiftKey).onClick();
							        dojo.stopEvent(c);
						        } else {
							        if (c.charOrCode == "w") {
								        if (this._currentChild.closable) {
									        this.onCloseButtonClick(this._currentChild);
								        }
								        dojo.stopEvent(c);
							        }
						        }
					        }
			        }
			        if (b !== null) {
				        this.adjacent(b).onClick();
				        dojo.stopEvent(c);
			        }
		        }
	        },
	        destroy : function() {
		        for (var a in this.pane2button) {
			        this.onRemoveChild(a);
		        }
		        dojo.forEach(this._subscriptions, dojo.unsubscribe);
		        this.inherited(arguments);
	        }
        });
dojo.declare("unieap.layout._TabButton", [dijit._Widget, dijit._Templated], {
	baseClass : "tab",
	tabPosition : "top",
	selected : false,
	container : null,
	selected : false,
	closable : false,
	templateString : "<a href='javascript:void(0);' class='tab u-a-tab' dojoAttachPoint='focusNode' dojoAttachEvent='onclick:onButtonClick'><div  class='tabInnerDiv' dojoAttachPoint='innerDiv'><span dojoAttachPoint='containerNode' class='tabLabel'></span><span class='closeImage' dojoAttachPoint='closeNode' dojoAttachEvent='onclick: onClickCloseButton'></span></div></a>",
	tabIndex : "-1",
	postCreate : function() {
		this.label = this.page.title;
		this.tabPosition = this.tablist.tabPosition;
		this.closable = this.page.closable;
		var a = "u-a-tab" + this.tabPosition.charAt(0).toUpperCase()
		        + this.tabPosition.substr(1).replace(/-.*/, "");
		dojo.addClass(this.domNode, a);
		if (this.closable) {
			dojo.addClass(this.innerDiv, "unieapClosable");
			dojo.attr(this.closeNode, "title", RIA_I18N.layout.tabController.close);
		} else {
			this.closeNode.style.display = "none";
		}
		this.inherited(arguments);
		if (this.label) {
			if (-1 != this.tabPosition.indexOf("-h") && dojo.isFF) {
				var c = this.label.split("");
				var d;
				for (var b = 0; b < c.length; b++) {
					d = dojo.create("div", null, this.containerNode);
					d.textContent = c[b];
				}
			} else {
				if (dojo.isFF) {
					this.containerNode.textContent = this.label;
				} else {
					this.containerNode.innerText = this.label;
				}
			}
		}
		dojo.setSelectable(this.containerNode, false);
	},
	setSeleted : function(b) {
		this.selected = b;
		var a = this.baseClass + "Checked";
		if (b) {
			dojo.addClass(this.domNode, a);
			dojo.isIE == 6
			        && dojo.style(this.domNode, "height", dojo.style(this.domNode, "height") + 2);
		} else {
			if (dojo.isIE == 6 && dojo.hasClass(this.domNode, a)) {
				dojo.style(this.domNode, "height", dojo.style(this.domNode, "height") - 2);
				dojo.style(this.domNode, "backgroundColor", "white");
			}
			dojo.removeClass(this.domNode, a);
		}
	},
	onButtonClick : function(a) {
		if (dojo.isIE && this.domNode.setActive) {
			try {
				this.domNode.setActive();
			}
			catch (b) {}
		}
		this.tablist.onButtonClick(this.page);
	},
	onClickCloseButton : function(a) {
		a.stopPropagation();
		this.tablist.onCloseButtonClick(this.page);
	},
	onClose : function() {
		return true;
	},
	getWidth : function() {
		var a = dojo.marginBox(this.domNode);
		if (dojo.isWebKit) { return a.w + 4; }
		return a.w;
	},
	getHeight : function() {
		var a = dojo.marginBox(this.domNode);
		return a.h;
	},
	hide : function() {
		dojo.style(this.domNode, "display", "none");
	},
	show : function() {
		dojo.style(this.domNode, "display", "inline-block");
	}
});
/* /unieap/ria3.3/unieap/layout/TabContainer.js */
dojo.provide("unieap.layout.TabContainer");
dojo.require("unieap.layout.TabController");
dojo.require("unieap.layout.Container");
dojo.require("dijit._Templated");
dojo.declare("unieap.layout.TabContainer", [unieap.layout.Container, dijit._Templated], {
	UserInterfaces : dojo.mixin({
		        tabPosition : "string",
		        baseClass : "string",
		        persist : "boolean"
	        }, unieap.layout.Container.prototype.UserInterfaces),
	templateString : "<div class='tabContainer'><div dojoAttachPoint='tabNest' class=\"tabContainer-nest\"><div dojoAttachPoint='tablistContainer' class='tab-scrolling-container'><div class='tab-scrolling' dojoAttachPoint='scrollingNode'><div dojoAttachPoint='tablistNode'></div></div></div><div dojoAttachPoint='tablistSpacer' class='tabSpacer' style='dispaly:none;'></div><div class='tabPaneWrapper'  dojoAttachPoint='containerNode' style='overflow:hidden;'></div></div></div>",
	tabPosition : "top",
	baseClass : "tabContainer",
	persist : false,
	height : "400px",
	scroll : null,
	tablistsize : 23 + 1,
	getScroll : function() {
		return unieap.getModuleInstance(this, "scroll", "unieap.layout.TabScrollProvider");
	},
	postCreate : function() {
		this.inherited(arguments);
		var b = this.tabPosition.charAt(0).toUpperCase()
		        + this.tabPosition.substr(1).replace(/-.*/, "");
		this.baseClass += b;
		dojo.addClass(this.domNode, this.baseClass);
		dojo.addClass(this.tablistContainer, "tab-scrolling-container" + b);
		dojo.isIE != 6 && dojo.addClass(this.tablistSpacer, "tabSpacer" + b);
		dojo.addClass(this.containerNode, "tabPaneWrapper" + b);
		var a = dojo.getObject("unieap.layout.TabController");
		this.tablist = new a({
			        id : this.id + "_tablist",
			        tabPosition : this.tabPosition,
			        container : this,
			        style : "height:'100%'",
			        "class" : this.baseClass + "-tabs"
		        }, this.tablistNode);
		dojo.forEach(this.containerNode.children, function(c) {
			        dojo.style(c, "display", "none");
		        }, this);
	},
	_setupChild : function(a) {
		dojo.addClass(a.domNode, "tabPane");
		dojo.style(a.domNode, "overflow", "auto");
		dojo.style(a.domNode, "position", "relative");
		a.domNode.title = "";
		if ("_inTabContainer" in a) {
			a._inTabContainer = true;
			a.tabContainer = this;
		}
	},
	startup : function() {
		if (!this._started) {
			this.tablist.startup();
			var b = this.getChildren();
			dojo.forEach(b, this._setupChild, this);
			dojo.some(b, function(d) {
				        if (d.selected) {
					        this.selectedChildWidget = d;
				        }
				        return d.selected;
			        }, this);
			var c = this.selectedChildWidget;
			if (!c && b[0]) {
				c = this.selectedChildWidget = b[0];
				c.selected = true;
			}
			dojo.publish(this.id + "-startup", [{
				                children : b,
				                selected : c
			                }]);
			this.layout();
			if (c) {
				this._showChild(c);
			}
			this._started = true;
			for (var a = 0; a < b.length; a++) {
				if (b[a].hidden) {
					this.hideTabButton(b[a]);
				}
				if (!b[a].enabled) {
					this._disableTabButton(b[a]);
				}
			}
		}
		this.inherited(arguments);
	},
	resizeContainer : function() {
		if (null == this.domNode) { return; }
		this.resize();
		this.resizeChildrenContainer();
	},
	notifyParentResize : function() {},
	resize : function() {
		this.layout();
	},
	layout : function() {
		if (this.domNode.offsetHeight == 0) { return; }
		this._calculaBorder();
		var b = this.tabPosition.replace(/-.*/, "");
		if (b == "left" || b == "right") {
			var a = this._adjustSize(this.domNode.clientHeight - 2 * this.borderSize);
			this.containerNode.style.height = a;
			this.tablistContainer.style.height = a;
		} else {
			if (b == "bottom") {
				dojo.place(this.tablistContainer, this.tabNest, "last");
				dojo.place(this.tablistSpacer, this.tablistContainer, "before");
				if (this.height != "auto") {
					this.containerNode.style.height = this._adjustSize(this.domNode.clientHeight
					        - this.tablistsize);
				}
			} else {
				if (this.height != "auto") {
					this.containerNode.style.height = this._adjustSize(this.domNode.clientHeight
					        - this.tablistsize - this.borderSize);
				}
			}
		}
		if (this.height != "auto" && this.selectedChildWidget
		        && this.selectedChildWidget instanceof unieap.layout.Container) {
			this.selectedChildWidget.setHeight("100%");
		}
		this.getScroll().calculateScroll();
	},
	_adjustSize : function(a) {
		if (a < 0) {
			return "0px";
		} else {
			return a + "px";
		}
	},
	_calculaBorder : function() {
		if (dojo.isIE && dojo.doc.compatMode == "BackCompat") {
			this.borderSize = 0;
		} else {
			this.borderSize = 1;
		}
	},
	addChild : function(c, a, b) {
		if (!c instanceof unieap.layout.ContentPane) { return; }
		typeof(b) == "undefined" && (b = true);
		b = !!b;
		c._inTabContainer = true;
		if (this.getIndexOfChild(c) != -1) {
			this.selectChild(c);
		} else {
			this.inherited(arguments);
			if (this._started) {
				dojo.publish(this.id + "-addChild", [c, a]);
				this.layout();
				if (b) {
					this.selectChild(c);
				} else {
					dojo.removeClass(c.domNode, "unieapVisible");
					dojo.addClass(c.domNode, "unieapHidden");
				}
			}
		}
	},
	removeChild : function(b) {
		this.inherited(arguments);
		if (this._beingDestroyed) { return; }
		if (this._started) {
			dojo.publish(this.id + "-removeChild", [b]);
			this.getScroll().calculateScroll();
		}
		if (this.selectedChildWidget === b) {
			this.selectedChildWidget = undefined;
			if (this._started) {
				var a = this.getChildrenNotHidden();
				if (a.length) {
					this.selectChild(a[0]);
				}
			}
		}
	},
	selectChild : function(b) {
		var b = unieap.byId(b);
		if (b.hidden == true) { return; }
		if (this.selectedChildWidget != b) {
			var a = this.selectedChildWidget;
			this.selectedChildWidget = b;
			this._transition(b, a);
			dojo.publish(this.id + "-selectChild", [b]);
		}
		this.getScroll().isShowing && this.getScroll().needScroll(b);
	},
	getSelectedTab : function() {
		return this.selectedChildWidget || null;
	},
	_transition : function(b, a) {
		if (a) {
			this._hideChild(a);
		}
		this._showChild(b);
	},
	_showChild : function(b) {
		var a = this.getChildren();
		b.selected = true;
		dojo.removeClass(b.domNode, "unieapHidden");
		dojo.addClass(b.domNode, "unieapVisible");
		this.resizeContainer();
		if (b._onShow) {
			b._onShow();
		} else {
			if (b.onShow) {
				b.onShow();
			}
		}
	},
	_hideChild : function(a) {
		a.selected = false;
		dojo.removeClass(a.domNode, "unieapVisible");
		dojo.addClass(a.domNode, "unieapHidden");
		if (a.onHide) {
			a.onHide();
		}
	},
	closeChild : function(b) {
		var a = b.onClose(this, b);
		if (a) {
			this.removeChild(b);
			b.destroyRecursive();
		}
	},
	hideTabButton : function(b) {
		if (this._started) {
			dojo.publish(this.id + "-hideTabButton", [b]);
			this.getScroll().calculateScroll();
			if (this.selectedChildWidget === b) {
				var a = this.getChildrenNotHidden();
				if (a.length) {
					this.selectChild(a[0]);
				}
			}
		}
	},
	_disableTabButton : function(b) {
		if (this._started) {
			dojo.publish(this.id + "-disableTabButton", [b]);
			this.getScroll().calculateScroll();
			if (this.selectedChildWidget === b) {
				var a = this.getChildrenEnabled();
				if (a.length) {
					this.selectChild(a[0]);
				}
			}
		}
	},
	enableTabButton : function(b) {
		var a = unieap.byId(b);
		if (this._started) {
			dojo.publish(this.id + "-enableTabButton", [a]);
			this.getScroll().calculateScroll();
		}
	},
	setTabButtonState : function(c, b) {
		var a = unieap.byId(c);
		if (this._started) {
			dojo.publish(this.id + "-setTabButtonState", [a, b]);
			this.getScroll().calculateScroll();
		}
	},
	showTabButton : function(a) {
		if (this._started) {
			dojo.publish(this.id + "-showTabButton", [a]);
			this.getScroll().calculateScroll();
		}
	},
	hideTab : function(b) {
		var a = unieap.byId(b);
		if (a && a._inTabContainer) {
			a.hidden = true;
			this.hideTabButton(a);
		}
	},
	showTab : function(c, a) {
		var b = unieap.byId(c);
		if (b._inTabContainer) {
			b.hidden = false;
			this.showTabButton(b);
			if (a) {
				this.selectChild(b);
			}
		}
	},
	getChildrenNotHidden : function() {
		var a = this.getChildren();
		var c = [];
		for (var b = 0; b < a.length; b++) {
			if (a[b].hidden == false) {
				c.push(a[b]);
			}
		}
		return c;
	},
	getChildrenEnabled : function() {
		var a = this.getChildren();
		var c = [];
		for (var b = 0; b < a.length; b++) {
			if (a[b].enabled) {
				c.push(a[b]);
			}
		}
		return c;
	},
	_adjacent : function(b) {
		var c = this.getChildren();
		var a = dojo.indexOf(c, this.selectedChildWidget);
		a += b ? 1 : c.length - 1;
		return c[a % c.length];
	},
	forward : function() {
		this.selectChild(this._adjacent(true));
	},
	back : function() {
		this.selectChild(this._adjacent(false));
	},
	_getTabWidth : function() {
		var a = 0;
		dojo.forEach(this.tablist.getChildren(), function(b) {
			        a += b.getWidth();
		        }, this);
		return a;
	},
	_getTabHeight : function() {
		var a = 0;
		dojo.forEach(this.tablist.getChildren(), function(b) {
			        a += b.getHeight();
		        }, this);
		return a;
	},
	destroy : function() {
		if (this.tablist) {
			this.tablist.destroy();
		}
		if (this.scroll) {
			this.scroll.destory();
		}
		this._beingDestroyed = true;
		this.inherited(arguments);
	}
});
/* /unieap/ria3.3/unieap/layout/BorderContainer.js */
dojo.provide("unieap.layout.BorderContainer");
dojo.require("unieap.layout.Container");
dojo.declare("unieap.layout.BorderContainer", [unieap.layout.Container], {
	        UserInterfaces : dojo.mixin({
		                design : "string",
		                splitLine : "boolean",
		                showTitleBar : "boolean",
		                splitLine : "boolean",
		                wrap : "boolean",
		                fixed : "boolean"
	                }, unieap.layout.Container.prototype.UserInterfaces),
	        design : "headline",
	        splitLine : true,
	        showTitleBar : true,
	        fixed : false,
	        wrap : true,
	        width : "100%",
	        height : "100%",
	        leftPane : null,
	        rightPane : null,
	        centerPane : null,
	        topPane : null,
	        bottomPane : null,
	        postCreate : function() {
		        dojo.addClass(this.domNode, "borderContainer");
		        this.inherited(arguments);
		        var e = this.containerNode.childNodes;
		        var b = ["showTitleBar", "fixed", "splitLine", "wrap"];
		        for (var a = 0; a < b.length; a++) {
			        var d = b[a];
			        var f = this.containerNode.getAttribute(d);
			        if (f != undefined) {
				        for (var c = 0; c < e.length; c++) {
					        if (e && e.nodeType == 1) {
						        dojo.attr(e[c], d) == null && dojo.attr(e[c], d, f);
					        }
				        }
			        }
		        }
	        },
	        startup : function() {
		        if (this.design == "sidebar") {
			        this.panes = [this.leftPane, this.rightPane, this.topPane, this.centerPane,
			                this.bottomPane];
		        } else {
			        this.panes = [this.topPane, this.leftPane, this.rightPane, this.centerPane,
			                this.bottomPane];
		        }
		        this.sortPanes();
		        this.inherited(arguments);
		        this._moveLine = dojo.create("div", {
			                id : "moveLine",
			                "class" : "u-border-moveSplitLine"
		                }, this.domNode, "last");
		        dojo.style(this._moveLine, "display", "none");
		        for (var a = 0; a < this.panes.length; a++) {
			        if (this.panes[a]) {
				        this.panes[a]._moveLine = this._moveLine;
			        }
		        }
	        },
	        sortPanes : function() {
		        var b = dojo.create("div", null, this.domNode, "first");
		        for (var a = 0; a < this.panes.length; a++) {
			        if (this.panes[a]) {
				        dojo.place(this.panes[a].domNode, b, "after");
				        b = this.panes[a].domNode;
			        }
		        }
		        this.domNode.removeChild(this.domNode.firstChild);
	        },
	        resize : function() {
		        this.resizePanesHW();
	        },
	        resizeContainer : function() {
		        if (null == this.domNode) { return; }
		        this.resize();
		        this.resizeChildrenContainer();
	        },
	        notifyParentResize : function() {
		        this.resizeContainer();
	        },
	        resizePanesHW : function() {
		        this.topPane && (this.topPane.domNode.style.width = "auto");
		        this.bottomPane && (this.bottomPane.domNode.style.width = "auto");
		        this.centerPane.domNode.style.width = "auto";
		        if (this.centerPane.domNode.offsetWidth < this.centerPane.centerMinSize) {
			        this.centerPane.domNode.style.width = this.centerPane.centerMinSize + "px";
		        }
		        var b = this.topPane ? parseInt(this.topPane.domNode.offsetHeight) : 0;
		        var d = this.bottomPane ? parseInt(this.bottomPane.domNode.offsetHeight) : 0;
		        var c = this.domNode.clientHeight;
		        var a = (c - b - d);
		        a = this._adjustCenterSize(a);
		        this.centerPane.domNode.style.height = a;
		        if (this.design == "sidebar") {
			        this.leftPane && (this.leftPane.domNode.style.height = "100%");
			        this.rightPane && (this.rightPane.domNode.style.height = "100%");
		        } else {
			        this.leftPane && (this.leftPane.domNode.style.height = a);
			        this.rightPane && (this.rightPane.domNode.style.height = a);
			        this.bottomPane && (this.bottomPane.domNode.style.clear = "both");
		        }
		        this.handleFloatLayout();
	        },
	        handleFloatLayout : function() {
		        var d = this.leftPane ? this.leftPane.domNode.offsetWidth : 0;
		        var f = this.rightPane ? this.rightPane.domNode.offsetWidth : 0;
		        var a = this.domNode.offsetWidth;
		        if (a == 0) { return; }
		        var e = d + f + this.centerPane.centerMinSize - a;
		        if (e > 0) {
			        if (this.leftPane && this.rightPane) {
				        var c = Math.floor(e / 2);
				        var b = e - c;
				        if (f - c >= 30 && d - b >= 30) {
					        dojo.style(this.rightPane.domNode, "width", (f - c) + "px");
					        dojo.style(this.leftPane.domNode, "width", (d - b) + "px");
				        } else {
					        if (f - c >= 30 && d - b <= 30) {
						        dojo.style(this.leftPane.domNode, "width", "30px");
						        c = e - (d - 30);
						        if (f - c >= 30) {
							        dojo.style(this.rightPane.domNode, "width", (f - c) + "px");
						        } else {
							        dojo.style(this.rightPane.domNode, "width", "30px");
						        }
					        } else {
						        if (f - c <= 30 && d - b >= 30) {
							        dojo.style(this.rightPane.domNode, "width", "30px");
							        b = e - (f - 30);
							        if (d - b >= 30) {
								        dojo.style(this.leftPane.domNode, "width", (d - b) + "px");
							        } else {
								        dojo.style(this.leftPane.domNode, "width", "30px");
							        }
						        }
					        }
				        }
			        } else {
				        if (this.rightPane) {
					        if (f - e >= 30) {
						        dojo.style(this.rightPane.domNode, "width", (f - e) + "px");
					        } else {
						        dojo.style(this.rightPane.domNode, "width", "30px");
					        }
				        } else {
					        if (this.leftPane) {
						        if (d - e >= 30) {
							        dojo.style(this.leftPane.domNode, "width", (d - e) + "px");
						        } else {
							        dojo.style(this.leftPane.domNode, "width", "30px");
						        }
					        }
				        }
			        }
			        dojo.style(this.centerPane.domNode, "width", this.centerPane.centerMinSize
			                        + "px");
		        }
	        },
	        _adjustCenterSize : function(a) {
		        if (a < this.centerPane.centerMinSize) {
			        return this.centerPane.centerMinSize + "px";
		        } else {
			        return a + "px";
		        }
	        },
	        getPaneByRegion : function(a) {
		        switch (a) {
			        case "left" :
				        return this.leftPane;
			        case "right" :
				        return this.rightPane;
			        case "top" :
				        return this.topPane;
			        case "bottom" :
				        return this.bottomPane;
			        case "center" :
				        return this.centerPane;
			        default :
				        return null;
		        }
	        }
        });
/* /unieap/ria3.3/unieap/Tooltip.js */
dojo.provide("unieap.Tooltip");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.declare("unieap._MasterTooltip", [dijit._Widget, dijit._Templated], {
	duration : 100,
	handle : null,
	loadingText : RIA_I18N.tooltip.loading,
	parenetNode : null,
	isDomNode : false,
	inner : null,
	isAroundnode : true,
	isLoadData : false,
	eventPosition : null,
	templateString : '<div class="dijitTooltip dijitTooltipLeft" id="dojoTooltip"><div class="dijitTooltipContainer dijitTooltipContents" dojoAttachPoint="containerNode"></div><div class="dijitTooltipConnector"></div></div>',
	postCreate : function() {
		dojo.body().appendChild(this.domNode);
		this.bgIframe = new dijit.BackgroundIframe(this.domNode);
		this.fadeIn = dojo.fadeIn({
			        node : this.domNode,
			        duration : this.duration,
			        onEnd : dojo.hitch(this, "_onShow")
		        });
		this.fadeOut = dojo.fadeOut({
			        node : this.domNode,
			        duration : this.duration,
			        onEnd : dojo.hitch(this, "_onHide")
		        });
	},
	getLoadingContent : function() {
		return '<div class="dijitTooltipContainerLoadingContainer"><div class="dijitTooltipContainerLoadingImage"></div><div class="dijitTooltipContainerLoadingText">'
		        + this.loadingText + "</div></div>";
	},
	show : function(f, g, a) {
		if (this.isLoadData) { return; }
		if (this.aroundNode && this.aroundNode === g) { return; }
		if (this.isShowingNow) {
			this.hide();
		}
		if (this.fadeOut.status() == "playing") {
			if (!g.tagName) {
				var a = {
					x : g.clientX,
					y : g.clientY,
					width : 1,
					height : 1,
					preEventForTooltip : true
				};
				arguments[1] = a;
			}
			this._onDeck = arguments;
			return;
		}
		if (g) {
			if (g.tagName) {
				this.aroundNode = g;
				this.isAroundnode = true;
			} else {
				if (g.preEventForTooltip) {
					delete g.preEventForTooltip;
					this.isAroundnode = false;
					this.aroundNode = null;
					this.eventPosition = g;
				} else {
					var i = dojo.fixEvent(g);
					this.isAroundnode = false;
					this.aroundNode = null;
					this.eventPosition = {
						x : g.clientX,
						y : g.clientY,
						width : 1,
						height : 1
					};
				}
			}
		} else {
			return;
		}
		var c = null;
		var d = null;
		if (typeof f == "string") {
			c = f;
			this.setAutoClose(false);
		} else {
			var b = f.autoClose;
			this.setAutoClose(b);
			c = f.inner;
			d = f.url;
		}
		if (c) {
			if (typeof(c) == "object") {
				this.isDomNode = true;
				this.inner = c;
				this.parenetNode = c.parentNode;
				this.containerNode.innerHTML = "";
				this.containerNode.appendChild(c);
			} else {
				this.containerNode.innerHTML = c;
			}
			this._show(a);
		} else {
			if (d) {
				var h = this;
				this.containerNode.innerHTML = this.getLoadingContent();
				this.isLoadData = true;
				this._show(a);
				dojo.rawXhrPost({
					        url : d,
					        sync : false,
					        timeout : 120 * 1000,
					        headers : {
						        ajaxRequest : true
					        },
					        load : function(j, e) {
						        h.isLoadData = false;
						        h.domNode.style.cssText = "";
						        h.containerNode.innerHTML = j;
						        h._show(a);
					        },
					        error : function(j, e) {
						        h.isLoadData = false;
						        alert(j);
					        }
				        });
			}
		}
	},
	orient : function(c, a, b) {
		c.className = "dijitTooltip " + {
			"BL-TL" : "dijitTooltipBelow dijitTooltipABLeft",
			"TL-BL" : "dijitTooltipAbove dijitTooltipABLeft",
			"BR-TR" : "dijitTooltipBelow dijitTooltipABRight",
			"TR-BR" : "dijitTooltipAbove dijitTooltipABRight",
			"BR-BL" : "dijitTooltipRight",
			"BL-BR" : "dijitTooltipLeft"
		}[a + "-" + b];
	},
	_show : function(g) {
		this.domNode.style.top = (this.domNode.offsetTop + 1) + "px";
		var h = {};
		var b = this.isLeftToRight();
		dojo.forEach((g && g.length) ? g : unieap.Tooltip.defaultPosition, function(n) {
			        switch (n) {
				        case "after" :
					        h[b ? "BR" : "BL"] = b ? "BL" : "BR";
					        break;
				        case "before" :
					        h[b ? "BL" : "BR"] = b ? "BR" : "BL";
					        break;
				        case "below" :
					        h[b ? "BL" : "BR"] = b ? "TL" : "TR";
					        h[b ? "BR" : "BL"] = b ? "TR" : "TL";
					        break;
				        case "above" :
				        default :
					        h[b ? "TL" : "TR"] = b ? "BL" : "BR";
					        h[b ? "TR" : "TL"] = b ? "BR" : "BL";
					        break;
			        }
		        });
		if (this.isAroundnode) {
			var a = dojo.coords(this.containerNode).w;
			var m = this.aroundNode.offsetWidth;
			var f = this.aroundNode.offsetHeight;
			var i = dojo.coords(this.aroundNode, true);
			var l = dijit._placeOnScreenAroundRect(this.domNode, i.x, i.y, m, f, h, dojo.hitch(
			                this, "orient"));
			if (l.corner == "TR" && l.aroundCorner == "BR") {
				var d = dojo.style(this.domNode, "left"),
					k = dojo.style(this.domNode, "top");
				dojo.style(this.domNode, {
					        left : (d - 3) + "px",
					        top : (k - 5) + "px"
				        });
			}
		} else {
			var l = dijit.placeOnScreenAroundElement(this.domNode, this.eventPosition, h, dojo
			                .hitch(this, "orient"));
		}
		var j = dojo.style(dojo.body(), "width"),
			e = dojo.style(this.domNode, "left"),
			c = dojo.style(this.domNode, "width");
		toolTipWidth = j - e - 50;
		if (c > toolTipWidth) {
			dojo.style(this.domNode, "width", toolTipWidth + "px");
		}
		dojo.style(this.domNode, "opacity", 0);
		this.fadeIn.play();
		this.isShowingNow = true;
	},
	_onShow : function() {
		if (dojo.isIE) {
			this.domNode.style.filter = "";
		}
	},
	hide : function(a) {
		if (this.isShowingNow == false) { return; }
		if (this._onDeck && this._onDeck[1] == a) {
			this._onDeck = null;
		}
		this.fadeIn.stop();
		this.isShowingNow = false;
		this.aroundNode = null;
		this.fadeOut.play();
	},
	_onHide : function() {
		this.domNode.style.cssText = "";
		if (this.isDomNode && this.parenetNode) {
			this.parenetNode.appendChild(this.inner);
		}
		this.containerNode.style.cssText = "";
		this.containerNode.innerHTML = "";
		if (this._onDeck) {
			this.show.apply(this, this._onDeck);
			this._onDeck = null;
		}
	},
	setAutoClose : function(a) {
		if (a && !this.handle) {
			this.handle = dojo.connect(dojo.body(), "onmousedown", this, this._hide);
		} else {
			if (!a && this.handle) {
				dojo.disconnect(this.handle);
				this.handle = null;
			}
		}
	},
	_hide : function(b) {
		var a = b.target;
		for (; a != null && a != this.domNode; a = a.parentNode) {}
		if (a == null && !this.isLoadData && this.isShowingNow) {
			this.hide(this.aroundNode);
		}
	},
	destroy : function() {
		if (this.bgIframe) {
			this.bgIframe.destroy();
		}
		this.inherited(arguments);
	}
});
dojo.declare("unieap.Tooltip", dijit._Widget, {
	        label : "",
	        showDelay : 400,
	        connectId : [],
	        position : [],
	        _setConnectIdAttr : function(a) {
		        this._connectNodes = [];
		        this.connectId = dojo.isArrayLike(a) ? a : [a];
		        dojo.forEach(this.connectId, function(c) {
			                var b = dojo.byId(c);
			                if (b) {
				                this._connectNodes.push(b);
				                dojo.forEach(["onMouseEnter", "onMouseLeave", "onFocus", "onBlur"],
				                        function(d) {
					                        this.connect(b, d.toLowerCase(), "_" + d);
				                        }, this);
				                if (dojo.isIE) {
					                b.style.zoom = 1;
				                }
			                }
		                }, this);
	        },
	        postCreate : function() {
		        dojo.addClass(this.domNode, "dijitTooltipData");
	        },
	        _onMouseEnter : function(a) {
		        this._onHover(a);
	        },
	        _onMouseLeave : function(a) {
		        this._onUnHover(a);
	        },
	        _onFocus : function(a) {
		        this._focus = true;
		        this._onHover(a);
		        this.inherited(arguments);
	        },
	        _onBlur : function(a) {
		        this._focus = false;
		        this._onUnHover(a);
		        this.inherited(arguments);
	        },
	        _onHover : function(b) {
		        if (!this._showTimer) {
			        var a = b.target;
			        this._showTimer = setTimeout(dojo.hitch(this, function() {
				                        this.open(a);
			                        }), this.showDelay);
		        }
	        },
	        _onUnHover : function(a) {
		        if (this._focus) { return; }
		        if (this._showTimer) {
			        clearTimeout(this._showTimer);
			        delete this._showTimer;
		        }
		        this.close();
	        },
	        open : function(a) {
		        a = a || this._connectNodes[0];
		        if (!a) { return; }
		        if (this._showTimer) {
			        clearTimeout(this._showTimer);
			        delete this._showTimer;
		        }
		        unieap.showTooltip(this.label || this.domNode.innerHTML, a, this.position);
		        this._connectNode = a;
	        },
	        close : function() {
		        if (this._connectNode) {
			        unieap.hideTooltip(this._connectNode);
			        delete this._connectNode;
		        }
		        if (this._showTimer) {
			        clearTimeout(this._showTimer);
			        delete this._showTimer;
		        }
	        },
	        uninitialize : function() {
		        this.close();
	        }
        });
unieap.Tooltip.defaultPosition = ["after", "before"];
/* /unieap/ria3.3/unieap/dialog/Dialog.js */
dojo.provide("unieap.dialog.Dialog");
dojo.require("dojo.fx");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
(function() {
	var a = new function() {
		this.getIframe = function() {
			var b = dojo.create("iframe", {
				        className : "unieap-dlg-contentIframe",
				        frameBorder : 0,
				        onactivate : function(c) {
					        dojo.stopEvent(c);
				        }
			        }, dojo.body());
			dojo.style(b, "display", "block");
			return b;
		};
	}();
	dojo.declare("unieap.dialog.Dialog", [dijit._Widget, dijit._Templated], {
		src : null,
		width : "",
		height : "",
		title : RIA_I18N.dialog.dialog.title,
		onComplete : null,
		inner : "",
		animate : (typeof(unieap.animate) == "undefined") ? true : unieap.animate,
		url : "",
		isExpand : true,
		isMax : false,
		isClose : true,
		resizable : true,
		minWidth : "185",
		minHeight : "80",
		dialogData : null,
		iconCloseComplete : false,
		buttons : null,
		_moveDiv : null,
		returnObj : null,
		dialogFrame : null,
		tempEvents : null,
		startx : null,
		starty : null,
		startWidth : null,
		startHeight : null,
		startHeadx : 0,
		startHeady : 0,
		winStartx : 0,
		winStarty : 0,
		isHeadmove : false,
		isResizing : false,
		resizeType : "",
		buttonFocus : null,
		_iconClose : false,
		preDialog : null,
		_modalDiv : null,
		_isExpanded : false,
		_initX : null,
		_initY : null,
		_beforeExpandPara : null,
		_isReady : false,
		_isShow : false,
		_autoWidth : false,
		_autoHeight : false,
		_buttonArea : null,
		templateString : '<div class="u-dlg"  dojoAttachPoint="mainNode"  style="display:none"><div class="u-dlg-mt" dojoAttachPoint="topNode"><div class="u-dlg-mtl"></div><div class="u-dlg-mtr"></div><div class="u-dlg-mtc" dojoAttachPoint="topContentNode"><div class="u-dlg-mtt"  dojoAttachPoint="dialogTitleNode"></div><div class="u-dlg-mtb" dojoAttachPoint="topButtonNode"><span class="u-dlg-be"  dojoAttachPoint="enlargeNode">&nbsp;&nbsp;&nbsp;&nbsp;</span><span  class="u-dlg-bc" dojoAttachPoint="closeNode">&nbsp;&nbsp;&nbsp;&nbsp;</span></div></div></div><div class="u-dlg-mm"   dojoAttachPoint="dialogMiddle"><div class="u-dlg-ml" dojoAttachPoint="dialogLeftBorder"></div><div class="u-dlg-mr" dojoAttachPoint="dialogRightBorder"></div><div class="u-dlg-mmm" dojoAttachPoint="dialogMiddleMain"><div class="u-dlg-mmf" dojoAttachPoint="dialogMain" style="height:100%"><div class="u-dlg-mmc"  dojoAttachPoint="dialogMainContent"></div></div><div class="u-dlg-mmb" style="display:block;" align="center" dojoAttachPoint="dialogMiddleButton"></div></div></div><div class="u-dlg-mb"  dojoAttachPoint="dialogBottom"><div class="u-dlg-mbl" dojoAttachPoint="dialogBottomLeft"></div><div class="u-dlg-mbr" dojoAttachPoint="dialogBottomRight"></div></div><div dojoAttachPoint=\'containerNode\' style=\'display:none\'></div></div>',
		postCreate : function() {
			this.enlargeNode.title = RIA_I18N.dialog.dialog.maximinze;
			this.closeNode.title = RIA_I18N.dialog.dialog.close;
			this.srcNodeRef && (this._createDlgWithTag = true);
			if (!this._createDlgWithTag) {
				this.updatePreDlg();
				this.addDialog(this);
				this.initModal();
				this._createMoveDiv();
			}
			unieap.blurWidget();
			this.buttons = [];
			this.tempEvents = [];
			if (this.inner && typeof(this.inner) == "object" && this.inner.parentNode
			        && this.inner.parentNode.nodeType != 11) {
				this.innerParentNode = this.inner.parentNode;
			}
			document.body.appendChild(this.domNode);
			this._dealDialogSize();
			this.originUrl = this.url;
			this._postCreate_ex();
		},
		_dealDialogSize : function() {
			this.minWidth = parseInt(this.minWidth, 10);
			this.minHeight = parseInt(this.minHeight, 10);
			if (this.isMax) {
				var b = dojo.window.getBox();
				this.width = b.w;
				this.height = b.h;
			} else {
				if (this.width && this.width != "auto") {
					this.width = parseInt(this.width, 10);
					if (this.width < this.minWidth) {
						this.width = this.minWidth;
					}
				} else {
					this.width = 50;
					this._autoWidth = true;
				}
				if (this.height && this.height != "auto") {
					this.height = parseInt(this.height, 10);
					if (this.height < this.minHeight) {
						this.height = this.minHeight;
					}
				} else {
					this.height = 80;
					this._autoHeight = true;
				}
			}
		},
		_postCreate_ex : function() {},
		updatePreDlg : function() {
			var b = this.getUtil().getDialogs(),
				c = b && b[b.length - 1];
			if (c) {
				this.preDialog = c;
				c._isShow && this._createModalDiv();
			}
		},
		innerShow : function() {
			this.initShowContent();
			!this._dlgClosed && this.initEvent();
			this.domNode.style.display = "block";
			if (this._isUseButton() && this.buttonFocus) {
				this.buttons[0].focusNode.focus();
			}
			this._moveDiv.style.display = "none";
			this._isShow = true;
			unieap.fireContainerResize(this.domNode);
		},
		startup : function() {
			var b = dojo.query("*", this.containerNode);
			b.length > 0 && !this.url && (this.inner = this.containerNode);
		},
		show : function(b, d) {
			if (typeof(d) == "object" && this.url) {
				this.url = unieap.buildRequestPath(this.originUrl, d);
			} else {
				this.url = this.originUrl;
			}
			if (this._createDlgWithTag) {
				this.updatePreDlg();
				this.addDialog(this);
				this.initModal();
				this._createMoveDiv();
				this._iconClose = false;
				!this.url && dojo.style(this.containerNode, "display", "block");
			}
			var c = dojo.byId("bgMask");
			c && dojo.style(c, "display", "block");
			this.refNode = b;
			this.innerShow();
			dojo.require("unieap.form.Popup");
			if (unieap.form.Popup.popwidget) {
				var f = unieap.form.Popup.popwidget;
				var e = dijit.byId(f);
				e && e.getPopup().close();
			}
		},
		startAnim : function() {
			var d = dijit.getViewport();
			this._initX = Math.floor(d.l + (d.w - this.width) / 2) > 0 ? Math.floor(d.l
			        + (d.w - this.width) / 2) : "0";
			this._initY = Math.floor(d.t + (d.h - this.height) / 2) > 0 ? Math.floor(d.t
			        + (d.h - this.height) / 2) : "0";
			dojo.style(this.mainNode, {
				        left : this._initX + "px",
				        top : this._initY + "px"
			        });
			if (this.animate) {
				var d = dijit.getViewport();
				this.starty = Math.floor(d.t + 10);
				this.startx = Math.floor(d.l + 800);
				this.startWidth = "50";
				this.startHeight = "30";
				var c = unieap.getTopWin();
				if (this.refNode && this.getWindow() == c) {
					var f = dojo.coords(this.refNode, true);
					if (dojo.isIE) {
						this.starty = f.y
						        + dijit.getDocumentWindow(this.refNode.ownerDocument).screenTop
						        - c.screenTop;
						this.startx = f.x
						        + dijit.getDocumentWindow(this.refNode.ownerDocument).screenLeft
						        - c.screenLeft;
					} else {
						var b = this.getObjTopRect(this.refNode);
						this.starty = b.top;
						this.startx = b.left;
					}
					this.startWidth = f.w;
					this.startHeight = f.h;
				} else {
					if (this.refNode) {
						var f = dojo.coords(this.refNode, true);
						this.starty = f.y;
						this.startx = f.x;
						this.startWidth = f.w;
						this.startHeight = f.h;
					}
				}
				dojo.style(this._moveDiv, {
					        width : this.startWidth + "px",
					        height : this.startHeight + "px",
					        left : this.startx + "px",
					        top : this.starty + "px",
					        display : "block"
				        });
				var e = dojo.animateProperty({
					node : this._moveDiv,
					duration : 450,
					properties : {
						width : {
							end : this.width,
							unit : "px"
						},
						height : {
							end : this.height,
							unit : "px"
						},
						top : this._initY,
						left : this._initX,
						unit : "px"
					},
					onEnd : dojo.hitch(this, function() {
						this._moveDiv.style.display = "none";
						this.domNode.style.visibility = "visible";
						if (this.url && this.dialogFrame) {
							this.dialogFrame.contentWindow.document.body.style.cssText = this.dialogFrame.contentWindow.document.body.style.cssText;
						}
					})
				});
				e.play();
			} else {
				this.domNode.style.visibility = "visible";
			}
		},
		getObjTopRect : function(g) {
			var d = {
				top : 0,
				left : 0
			};
			var c = g.getBoundingClientRect();
			d.top += c.top;
			d.left += c.left;
			var f = dijit.getDocumentWindow(g.ownerDocument);
			while (f != window.top) {
				var b = f.frameElement;
				c = b.getBoundingClientRect();
				d.top += c.top;
				d.left += c.left;
				var e = f.frameElement.ownerDocument;
				f = e.parentWindow || e.defaultView;
			}
			return d;
		},
		initEvent : function() {
			if (this.isExpand) {
				this.connect(this.enlargeNode, "onclick", "_enlarge");
				this.connect(this.enlargeNode, "onmouseover", "_enlargeOver");
				this.connect(this.enlargeNode, "onmouseout", "_enlargeOut");
			}
			if (this.isClose) {
				this.connect(this.closeNode, "onclick", "_imgClose");
				this.connect(this.closeNode, "onmouseover", "_closeOver");
				this.connect(this.closeNode, "onmouseout", "_closeOut");
			}
			if (this.resizable) {
				this.connect(this.dialogBottomRight, "onmousedown", "_onDialogBottomRightDown");
				this.connect(this.dialogBottomLeft, "onmousedown", "_onDialogBottomDown");
				this.connect(this.dialogBottom, "onmousedown", "_onDialogBottomDown");
				this.connect(this.dialogRightBorder, "onmousedown", "_onDialogRightDown");
			} else {
				this.dialogBottomRight.style.cursor = "default";
				this.dialogBottomLeft.style.cursor = "default";
				this.dialogBottom.style.cursor = "default";
				this.dialogRightBorder.style.cursor = "default";
			}
			this.connect(this.topContentNode, "onmousedown", "_onheadmousedown");
			this.resizeHandle = dojo.connect(this.getWindow(), "onresize", this, "update");
		},
		initModal : function() {
			if (this.preDialog) {
				this.preDialog._isShow && (this.preDialog._modalDiv.style.display = "block");
				var b = dojo.byId("bgMask");
				b && this.removeNode(b);
			}
			this._createModalIframe();
		},
		initShowContent : function() {
			this.mainNode.style.top = "0px";
			this.mainNode.style.left = "0px";
			this.mainNode.style.width = this.width + "px";
			this.mainNode.style.height = this.height + "px";
			if (dojo.isIE == 6) {
				this.baseIframe = dojo.create("iframe", null, this.mainNode);
				dojo.addClass(this.baseIframe, "u-dlg-backgroundIframe");
				dojo.style(this.baseIframe, {
					        width : "100%",
					        height : "100%",
					        top : "0px",
					        left : "0px"
				        });
			}
			this.initHeader();
			this.initBody();
			this.initFooter();
		},
		initHeader : function() {
			this.dialogTitleNode.innerHTML = this.title;
			if (!this.isExpand) {
				this.enlargeNode.style.display = "none";
			}
			if (!this.isClose) {
				this.closeNode.style.display = "none";
			}
		},
		initBody : function() {
			this.dialogMiddle.style.height = (this.height - 28) + "px";
			if (this._isUseButton()) {
				this.dialogMain.style.height = (this.height - 62) + "px";
			}
			this.domNode.style.visibility = "hidden";
			this.domNode.style.display = "block";
			if (this.url) {
				this.dialogMainContent.style.height = this.dialogMiddle.style.height;
				var g = this;
				var d = this.dialogFrame = a.getIframe();
				this.dialogMainContent.appendChild(d);
				d.onreadystatechange = d.onload = function() {
					if (g._isReady == false
					        && (!this.readyState || this.readyState === "loaded" || this.readyState == "complete")) {
						if (g._autoHeight || g._autoWidth) {
							if (g.dialogFrame.contentWindow && g.dialogFrame.contentWindow.dojo) {
								var h = g.dialogFrame.contentWindow.dojo;
								h.addOnLoad(function() {
									        g._adaptiveDialog();
									        g.startAnim();
								        });
							} else {
								if (g._autoHeight) {
									g.setHeight(420);
								}
								if (g._autoWidth) {
									g.setWidth(428);
								}
								g.startAnim();
							}
						}
						g._isReady = true;
						if (!g.animate) {
							g.dialogFrame.contentWindow.document.body.style.cssText = g.dialogFrame.contentWindow.document.body.style.cssText;
						}
					}
				};
				if (!this._autoHeight && !this._autoWidth) {
					this.startAnim();
				}
				this.dialogFrame.src = this.url;
			} else {
				if (this.inner) {
					this._isReady = true;
					if (typeof(this.inner) == "object") {
						var e = dojo.query(".dialogButtonArea", this.inner);
						if (e.length > 0) {
							this._buttonArea = e[0];
							this.dialogMain.style.height = (this.height - 62) + "px";
						}
						this.dialogMainContent.appendChild(this.inner);
					} else {
						this.dialogMainContent.innerHTML = this.inner;
					}
					if (this._autoHeight || this._autoHeight) {
						var c = dojo.position(this.dialogMainContent);
						var f = c.w;
						var b = c.h;
						if (this._autoHeight) {
							if (b <= 80) {
								this.setHeight(420);
							} else {
								this.setHeight(b + 30);
							}
						}
						if (this._autoWidth) {
							if (f <= 50) {
								this.setWidth(428);
							} else {
								this.setWidth(f + 20);
							}
						}
					}
					this.startAnim();
				} else {
					this._isReady = true;
				}
			}
		},
		adaptiveDialog : function() {
			if (!this._isReady) { return; }
			if (this.url) {
				if (this.dialogFrame.contentWindow && this.dialogFrame.contentWindow.dojo) {
					this._adaptiveDialog(true);
				} else {
					if (this._autoHeight) {
						this.setHeight(420);
					}
					if (this._autoWidth) {
						this.setWidth(428);
					}
				}
			} else {
				if (this._autoHeight || this._autoHeight) {
					var c = dojo.position(this.dialogMainContent);
					var d = c.w;
					var b = c.h;
					if (this._autoHeight) {
						if (b <= 50) {
							this.setHeight(420);
						} else {
							this.setHeight(b);
						}
					}
					if (this._autoWidth) {
						if (d <= 50) {
							this.setWidth(428);
						} else {
							this.setWidth(d);
						}
					}
				}
			}
		},
		_adaptiveDialog : function(j) {
			var e = this.dialogFrame.contentWindow.dojo;
			var g = e.doc.body.scrollWidth;
			var c = e.doc.body.scrollHeight;
			var h = this.dialogFrame.contentWindow.unieap
			        .getChildrenContainer(this.dialogFrame.contentWindow.document.body);
			for (var f = 0; f < h.length; f++) {
				e.require("unieap.grid.Grid");
				if (h[f] instanceof this.dialogFrame.contentWindow.unieap.grid.Grid) {
					continue;
				}
				var d = h[f].containerNode.scrollWidth;
				var b = h[f].containerNode.scrollHeight;
				if (d > g) {
					g = d;
				}
				if (b > c) {
					c = b;
				}
			}
			if (this._autoHeight) {
				if (c <= 52) {
					this.setHeight(420);
				} else {
					this.setHeight(c + 30);
				}
			}
			if (this._autoWidth) {
				if (g <= 50) {
					this.setWidth(428);
				} else {
					this.setWidth(g + 20);
				}
			}
		},
		initFooter : function() {
			if (this._isUseButton()) {
				var c = document.createElement("span");
				c.innerHTML = "&nbsp;";
				for (var d = 0, b = this.buttons.length; d < b; d++) {
					if (d > 0) {
						this.dialogMiddleButton.appendChild(c.cloneNode(true));
					}
					this.dialogMiddleButton.appendChild(this.buttons[d].domNode);
				}
			} else {
				if (this._buttonArea) {
					this.dialogMiddleButton.appendChild(this._buttonArea);
				} else {
					this.dialogMiddleButton.style.display = "none";
				}
			}
		},
		addButton : function(b, f, e) {
			dojo.require("unieap.form.Button");
			var c = new unieap.form.Button({
				        label : b
			        });
			var d = function(h) {
				f.call(e || window, h);
			};
			var g = dojo.hitch(this, d);
			if (!this.connects) {
				this.connects = [];
			}
			this.connects.push(dojo.connect(c, "onClick", g));
			this.buttons.push(c);
			return c;
		},
		getInner : function() {
			if (this.inner) {
				return this.inner;
			} else {
				return null;
			}
		},
		destroy : function() {
			if (this.connects) {
				for (var c = 0, b = this.connects.length; c < b; c++) {
					dojo.disconnect(this.connects[c]);
				}
			}
			this.inherited(arguments);
		},
		addDialog : function(c) {
			this.getUtil().addDialog(c);
			if (this._createDlgWithTag) {
				var b = this.getTopFrm();
				!b.dialogs && (b.dialogs = []);
				b.dialogs.push(this.id);
			}
		},
		removeDialog : function(b) {
			this.getUtil().removeDialog(b);
			if (this._createDlgWithTag) {
				var c = this.getTopFrm();
				c.dialogs.pop();
			}
		},
		getTopFrm : function() {
			var d = window, c;
			do {
				if (d == d.parent) { return d; }
				c = d.frameElement;
				if (c) {
					var b = c.parentNode;
					if (b && b.getAttribute("id") == "unieap_pages") { return c; }
				}
				d = d.parent;
			} while (d);
			return d;
		},
		getUtil : function() {
			return window.DialogUtil;
		},
		setHeight : function(c) {
			this.height = isNaN(c) ? parseInt(c, 10) : c;
			if (this.height < this.minHeight) {
				this.height = this.minHeight;
			}
			var b = dijit.getViewport();
			if (this.height >= b.h) {
				this.height = 428;
			}
			dojo.style(this.domNode, "height", this.height + "px");
			if (this._isUseButton() || this._buttonArea) {
				this.dialogMain.style.height = (this.height - 62) + "px";
			}
			var c = (this.height - 28) + "px";
			dojo.style(this.dialogMiddle, "height", c);
			dojo.style(this.dialogMainContent, "height", c);
			dojo.isIE < 7 && dojo.style(this.baseIframe, "height", this.height + "px");
		},
		setWidth : function(c) {
			this.width = isNaN(c) ? parseInt(c, 10) : c;
			if (this.width < this.minWidth) {
				this.width = this.minWidth;
			}
			var b = dijit.getViewport();
			if (this.width >= b.w) {
				this.width = 420;
			}
			dojo.style(this.domNode, "width", this.width + "px");
		},
		_isUseButton : function() {
			if (this.buttons.length == 0) {
				return false;
			} else {
				return true;
			}
		},
		_createModalDiv : function() {
			this.preDialog._modalDiv = dojo.create("div");
			this.preDialog._modalDiv.className = "u-dlg-modalDiv";
			this.preDialog._modalDiv.style.height = this.preDialog.domNode.style.height;
			this.preDialog._modalDiv.style.width = this.preDialog.domNode.style.width;
			if (this.preDialog.mainNode.style.top) {
				this.preDialog._modalDiv.style.top = this.preDialog.domNode.style.top;
				this.preDialog._modalDiv.style.left = this.preDialog.domNode.style.left;
			} else {
				this.preDialog._modalDiv.style.top = this.preDialog.endy;
				this.preDialog._modalDiv.style.left = this.preDialog.endx;
			}
			this.preDialog._modalDiv.style.display = "none";
			document.body.appendChild(this.preDialog._modalDiv);
		},
		_createMoveDiv : function() {
			this._moveDiv = dojo.create("div");
			this._moveDiv.className = "u-dlg-moveDiv";
			document.body.appendChild(this._moveDiv);
			this._moveDiv.style.display = "none";
		},
		canECR : function() {
			if (this._createDlgWithTag) {
				var b = this.getTopFrm();
				if (b.dialogs[b.dialogs.length - 1] != this.id) { return false; }
			}
			return true;
		},
		_enlarge : function(c) {
			if (!this.canECR()) { return; }
			if (this._isExpanded) {
				this.getWindow().document.body.scroll = this._beforeScroll;
				this.enlargeNode.className = "u-dlg-be";
				this.enlargeNode.title = RIA_I18N.dialog.dialog.maximinze;
				this._isExpanded = false;
				var b = dijit.getViewport();
				dojo.style(this.mainNode, {
					        left : Math.floor(this._beforeExpandPara.l) + "px",
					        top : Math.floor(this._beforeExpandPara.t) + "px",
					        width : this._beforeExpandPara.w + "px",
					        height : this._beforeExpandPara.h + "px"
				        });
				this.dialogMiddle.style.height = (this._beforeExpandPara.h - 28) + "px";
				if (this._isUseButton() || this._buttonArea) {
					this.dialogMain.style.height = (this._beforeExpandPara.h - 62) + "px";
				}
				this.dialogMainContent.style.height = this.dialogMiddle.style.height;
			} else {
				this.enlargeNode.className = "u-dlg-bs";
				this.enlargeNode.title = RIA_I18N.dialog.dialog.restore;
				this._isExpanded = true;
				this._beforeExpandPara = dojo.coords(this.mainNode, true);
				this._beforeScroll = this.getWindow().document.body.scroll;
				this.getWindow().document.body.scroll = "no";
				var b = dijit.getViewport();
				dojo.style(this.mainNode, {
					        left : Math.floor(b.l) + "px",
					        top : Math.floor(b.t) + "px",
					        width : Math.floor(b.w) + "px",
					        height : Math.floor(b.h) + "px"
				        });
				this.dialogMiddle.style.height = (b.h - 28) + "px";
				if (this._isUseButton() || this._buttonArea) {
					this.dialogMain.style.height = (b.h - 62) + "px";
				}
				this.dialogMainContent.style.height = this.dialogMiddle.style.height;
			}
		},
		update : function() {
			var c = dijit.getViewport();
			if (this._isExpanded) {
				var g = c.t;
				var f = c.l;
				var e = c.w;
				var b = c.h;
				if (c.w < this.minWidth) {
					e = this.minWidth;
					f = 0;
				}
				if (c.h < this.minHeight) {
					b = this.minHeight;
					g = 0;
				}
				dojo.style(this.mainNode, {
					        left : Math.floor(f) + "px",
					        top : Math.floor(g) + "px",
					        width : Math.floor(e) + "px",
					        height : Math.floor(b) + "px"
				        });
				this.dialogMiddle.style.height = (b - 28) + "px";
				if (this._isUseButton() || this._buttonArea) {
					this.dialogMain.style.height = (b - 62) + "px";
				}
				this.dialogMainContent.style.height = this.dialogMiddle.style.height;
			}
			var d = dojo.byId("bgMask");
			if (d) {
				var h = dojo.coords(this.getWindow().document.body, true);
				dojo.style(d, {
					        left : "0px",
					        top : "0px",
					        width : Math.floor(h.w) + "px",
					        height : Math.floor(h.h) + "px"
				        });
			}
		},
		_enlargeOver : function() {},
		_enlargeOut : function() {},
		_imgClose : function() {
			if (!this.canECR()) { return; }
			this._iconClose = true;
			this.onImgClose && this.onImgClose();
			this.close();
		},
		_closeOver : function() {},
		_closeOut : function() {},
		_onDialogBottomRightDown : function(b) {
			if (!this.canECR()) { return; }
			if (this.resizeType != "" || this._isExpanded) { return; }
			this.isResizing = true;
			this.resizeType = "se";
			this.onStartResize(b);
		},
		_onDialogBottomDown : function(b) {
			if (!this.canECR()) { return; }
			if (this.resizeType != "" || this._isExpanded) { return; }
			var d = dojo.fixEvent(b);
			var c = d.srcElement;
			if (c != this.dialogBottomRight && c != this.dialogBottomLeft) {
				this.isResizing = true;
				this.resizeType = "s";
				this.onStartResize(b);
			}
		},
		_onDialogRightDown : function(b) {
			if (!this.canECR()) { return; }
			if (this.resizeType != "" || this._isExpanded) { return; }
			this.isResizing = true;
			this.resizeType = "e";
			this.onStartResize(b);
		},
		onStartResize : function(b) {
			this.startHeadx = b.clientX;
			this.startHeady = b.clientY;
			this._moveDiv.style.height = this.domNode.style.height;
			this._moveDiv.style.width = this.domNode.style.width;
			this._moveDiv.style.left = this.domNode.style.left;
			this._moveDiv.style.top = this.domNode.style.top;
			this._moveDiv.style.display = "block";
			if (this._moveDiv.setCapture) {
				this.tempEvents.push(dojo.connect(this._moveDiv, "onmousemove", this, dojo.hitch(
				                this, this.onResizeMouseMove)));
				this.tempEvents.push(dojo.connect(this._moveDiv, "onmouseup", this, dojo.hitch(
				                this, this.onResizeMouseUp)));
				this._moveDiv.setCapture();
			} else {
				this.resizeMove = dojo.hitch(this, this.onResizeMouseMove);
				this.resizeUp = dojo.hitch(this, this.onResizeMouseUp);
				document.addEventListener("mousemove", this.resizeMove, true);
				document.addEventListener("mouseup", this.resizeUp, true);
			}
		},
		onResizeMouseMove : function(c) {
			var b = c.clientX;
			var e = c.clientY;
			var d = dojo.coords(this.domNode);
			if (this.resizeType == "e") {
				if (Math.floor(b - d.x) > this.minWidth) {
					this._moveDiv.style.width = Math.floor(b - d.x) + "px";
				}
				return;
			}
			if (this.resizeType == "s") {
				if (Math.floor(e - d.y) > this.minHeight) {
					this._moveDiv.style.height = Math.floor(e - d.y) + "px";
				}
				return;
			}
			if (this.resizeType == "se") {
				if (Math.floor(b - d.x) > this.minWidth) {
					this._moveDiv.style.width = Math.floor(b - d.x) + "px";
				}
				if (Math.floor(e - d.y) > this.minHeight) {
					this._moveDiv.style.height = Math.floor(e - d.y) + "px";
				}
			}
		},
		onResizeMouseUp : function(b) {
			dojo.stopEvent(dojo.fixEvent(b));
			this.isResizing = false;
			this.startHeadx = 0;
			this.startHeady = 0;
			if (this._moveDiv != null) {
				dojo.forEach(this.tempEvents, dojo.disconnect);
				this.tempEvents = [];
				this.mainNode.style.width = this._moveDiv.style.width;
				this.mainNode.style.height = this._moveDiv.style.height;
				this.dialogMiddle.style.height = Math.floor(parseInt(this.mainNode.style.height)
				        - 28)
				        + "px";
				if (this._isUseButton() || this._buttonArea) {
					this.dialogMain.style.height = Math.floor(parseInt(this.mainNode.style.height)
					        - 62)
					        + "px";
				}
				this.dialogMainContent.style.height = this.dialogMiddle.style.height;
				this._moveDiv.style.display = "none";
				if (this._moveDiv.releaseCapture) {
					this._moveDiv.releaseCapture();
				} else {
					document.removeEventListener("mouseup", this.resizeUp, true);
					document.removeEventListener("mousemove", this.resizeMove, true);
				}
				if (this.baseIframe) {
					if (this.baseIframe.style.width == "100%") {
						dojo.style(this.baseIframe, {
							        width : "99%"
						        });
					} else {
						dojo.style(this.baseIframe, {
							        width : "100%"
						        });
					}
					if (this.baseIframe.style.height == "100%") {
						dojo.style(this.baseIframe, {
							        height : "99%"
						        });
					} else {
						dojo.style(this.baseIframe, {
							        height : "100%"
						        });
					}
				}
			}
			this.resizeType = "";
		},
		_onheadmousedown : function(b) {
			if (this._isExpanded) { return; }
			var d = dojo.fixEvent(b);
			var c = d.srcElement || d.target;
			if (c != this.topButtonNode && c != this.enlargeNode && c != this.closeNode) {
				this.isHeadmove = true;
				this.startHeadx = b.clientX;
				this.startHeady = b.clientY;
				this.winStartx = parseInt(this.domNode.style.left);
				this.winStarty = parseInt(this.domNode.style.top);
				this.onheadStartmove();
			}
		},
		onheadStartmove : function() {
			this._moveDiv.style.height = this.domNode.style.height;
			this._moveDiv.style.width = this.domNode.style.width;
			this._moveDiv.style.left = this.winStartx + "px";
			this._moveDiv.style.top = this.winStarty + "px";
			this._moveDiv.style.display = "block";
			if (this._moveDiv.setCapture) {
				this._moveDiv.setCapture();
			} else {
				this.moveMove = dojo.hitch(this, this.onheadmousemove);
				this.moveUp = dojo.hitch(this, this.onheadmouseup);
				document.addEventListener("mousemove", this.moveMove, true);
				document.addEventListener("mouseup", this.moveUp, true);
			}
			this.tempEvents.push(dojo.connect(this._moveDiv, "onmousemove", this, dojo.hitch(this,
			                this.onheadmousemove)));
			this.tempEvents.push(dojo.connect(this._moveDiv, "onmouseup", this, dojo.hitch(this,
			                this.onheadmouseup)));
		},
		onheadmousemove : function(c) {
			if (this.isHeadmove) {
				var b = c.clientX;
				var d = c.clientY;
				if (this.winStartx + b - this.startHeadx > 0) {
					this._moveDiv.style.left = Math.floor(this.winStartx + b - this.startHeadx)
					        + "px";
				}
				if (this.winStarty + d - this.startHeady > 0) {
					this._moveDiv.style.top = Math.floor(this.winStarty + d - this.startHeady)
					        + "px";
				}
			}
		},
		onheadmouseup : function() {
			if (this.isHeadmove) {
				this.isHeadmove = false;
				this.startHeadx = 0;
				this.startHeady = 0;
				if (this._moveDiv != null) {
					dojo.forEach(this.tempEvents, dojo.disconnect);
					this.tempEvents = [];
					this.mainNode.style.top = this._moveDiv.style.top;
					this.mainNode.style.left = this._moveDiv.style.left;
					this._moveDiv.style.display = "none";
					if (this._moveDiv.releaseCapture) {
						this._moveDiv.releaseCapture();
					} else {
						document.removeEventListener("mouseup", this.moveUp, true);
						document.removeEventListener("mousemove", this.moveMove, true);
					}
				}
			}
		},
		close : function(b) {
			this.isComplete = b;
			this._close();
		},
		_close : function() {
			if (!this._isReady) {
				this._iconClose = false;
				return;
			}
			this.dialogFrame
			        && (this.dialogFrame.onreadystatechange = this.dialogFrame.onload = null);
			if (!this._createDlgWithTag) {
				dojo.disconnect(this.resizeHandle);
			}
			if (this.inner && this.innerParentNode) {
				this.innerParentNode.appendChild(this.inner);
			}
			var c = this.getUtil().getDialogs();
			if (c == null) { return; }
			for (var b = c.length - 1; b >= 0; b--) {
				if (c[b] == this) {
					this.removeDialog(b);
					break;
				}
			}
			if (this.getUtil().getDialog(this)) {
				this.getUtil().removeDialog(this);
			}
			this.domNode.style.display = "none";
			if (this.animate) {
				dojo.style(this._moveDiv, {
					        width : this.domNode.style.width,
					        height : this.domNode.style.height,
					        left : this.domNode.style.left,
					        top : this.domNode.style.top,
					        display : "block"
				        });
				var d = dojo.animateProperty({
					        node : this._moveDiv,
					        duration : 450,
					        properties : {
						        width : {
							        end : this.startWidth,
							        unit : "px"
						        },
						        height : {
							        end : this.startHeight,
							        unit : "px"
						        },
						        top : Math.floor(this.starty),
						        left : Math.floor(this.startx),
						        unit : "px"
					        },
					        onEnd : dojo.hitch(this, this._clear)
				        });
				d.play();
			} else {
				this._clear();
			}
			this._isShow = false;
		},
		_innerDisappear : function() {},
		_clear : function() {
			this._moveDiv.style.display = "none";
			this.removeNode(this._moveDiv);
			this.destroyModal();
			if (this.onComplete
			        && ((this._iconClose && this.iconCloseComplete) || (!this._iconClose && this.isComplete != false))) {
				try {
					this.onComplete.call(this.src, this.returnObj);
				}
				catch (c) {}
			}
			if (this.baseIframe != null) {
				this.removeNode(this.baseIframe);
			}
			this.preDialog = null;
			var b = this;
			this._createDlgWithTag && (this._dlgClosed = true) && (this._isReady = false);
			window.setTimeout(function() {
				        var d = b.dialogFrame;
				        if (b.dialogFrame) {
					        dojo.withDoc(b.dialogFrame.contentWindow.document, function() {
						                var e = b.dialogFrame.contentWindow.dijit
						                        ? b.dialogFrame.contentWindow.dijit
						                                .findWidgets(dojo.body())
						                        : [];
						                dojo.forEach(e, function(f) {
							                        f && f.destroy && f.destroy();
						                        });
					                }, b);
					        d.src = "";
					        d.contentWindow.document.write("");
					        dojo.destroy(d);
					        d = null;
					        delete b.dialogFrame;
				        }
				        if (b.inner && typeof(b.inner) == "object" && !b.innerParentNode) {
					        unieap.destroyWidgets(b.inner);
					        unieap.destroyWidgets(b.dialogMiddleButton);
				        }
				        !b._createDlgWithTag && b.destroy();
			        }, 0);
		},
		setReturn : function(b) {
			this.returnObj = b;
		},
		_createModalIframe : function() {
			var b;
			var e = dojo.coords(this.getWindow().document.body, true);
			if (dojo.isIE == 6) {
				var d = dojo.moduleUrl("dojo", "../unieap/dialog/_bgLayer.html") + "";
				var c = "<iframe src='"
				        + d
				        + '\' style=\'position: absolute;z-index: 1000; filter:Alpha(Opacity="0");\' id="bgMask">';
				b = dojo.create("iframe", {
					        id : "bgMask",
					        src : d,
					        style : {
						        position : "absolute",
						        zIndex : "1000",
						        filter : 'Alpha(Opacity="0")',
						        opacity : 0
					        }
				        });
				dojo.style(b, {
					        left : "0px",
					        top : "0px",
					        width : Math.floor(e.w) + "px",
					        height : Math.floor(e.h) + "px",
					        display : "none"
				        });
				dojo.body().appendChild(b);
				b.contentWindow.focus();
			} else {
				var c = '<div style=\'position: absolute;background:#FFF;z-index: 1000; filter:Alpha(Opacity="0");\' id="bgMask"></div>';
				b = dojo.create("div", {
					        style : {
						        position : "absolute",
						        background : "#FFF",
						        zIndex : 1000,
						        filter : 'Alpha(Opacity="0")',
						        opacity : 0
					        },
					        id : "bgMask"
				        });
				dojo.style(b, {
					        left : "0px",
					        top : "0px",
					        width : Math.floor(e.w) + "px",
					        height : Math.floor(e.h) + "px",
					        display : "none"
				        });
				dojo.body().appendChild(b);
			}
			return b;
		},
		destroyModal : function() {
			if (this.preDialog && this.preDialog._modalDiv) {
				this.removeNode(this.preDialog._modalDiv);
				this.preDialog._modalDiv = null;
				delete this.preDialog._modalDiv;
			} else {
				var b = dojo.byId("bgMask");
				b && this.removeNode(b);
			}
		},
		removeNode : function(b) {
			dojo.destroy(b);
		},
		getWindow : function() {
			return window;
		},
		getDialogData : null,
		getObject : function() {
			var b = this.getDialogData;
			return dojo.isFunction(b) ? b() : this.dialogData;
		}
	});
})();
/* /unieap/ria3.3/unieap/fckeditor/fckeditor.js */
dojo.provide("unieap.fckeditor.fckeditor");
FCKeditor = function(b, d, a, c, e) {
	this.InstanceName = b;
	this.Width = d || "100%";
	this.Height = a || "200";
	this.ToolbarSet = c || "Default";
	this.Value = e || "";
	this.BasePath = FCKeditor.BasePath;
	this.CheckBrowser = true;
	this.DisplayErrors = true;
	this.Config = new Object();
	this.OnError = null;
};
FCKeditor.BasePath = "/fckeditor/";
FCKeditor.MinHeight = 200;
FCKeditor.MinWidth = 750;
FCKeditor.prototype.Version = "2.6.4.1";
FCKeditor.prototype.VersionBuild = "23187";
FCKeditor.prototype.Create = function() {
	document.write(this.CreateHtml());
};
FCKeditor.prototype.CreateHtml = function() {
	if (!this.InstanceName || this.InstanceName.length == 0) {
		this._ThrowError(701, "You must specify an instance name.");
		return "";
	}
	var c = "";
	if (!this.CheckBrowser || this._IsCompatibleBrowser()) {
		c += '<input type="hidden" id="' + this.InstanceName + '" name="' + this.InstanceName
		        + '" value="' + this._HTMLEncode(this.Value) + '" style="display:none" />';
		c += this._GetConfigHtml();
		c += this._GetIFrameHtml();
	} else {
		var b = this.Width.toString().indexOf("%") > 0 ? this.Width : this.Width + "px";
		var a = this.Height.toString().indexOf("%") > 0 ? this.Height : this.Height + "px";
		c += '<textarea name="' + this.InstanceName + '" rows="4" cols="40" style="width:' + b
		        + ";height:" + a;
		if (this.TabIndex) {
			c += '" tabindex="' + this.TabIndex;
		}
		c += '">' + this._HTMLEncode(this.Value) + "</textarea>";
	}
	return c;
};
FCKeditor.prototype.ReplaceTextarea = function() {
	if (document.getElementById(this.InstanceName + "___Frame")) { return; }
	if (!this.CheckBrowser || this._IsCompatibleBrowser()) {
		var c = document.getElementById(this.InstanceName);
		var b = document.getElementsByName(this.InstanceName);
		var a = 0;
		while (c || a == 0) {
			if (c && c.tagName.toLowerCase() == "textarea") {
				break;
			}
			c = b[a++];
		}
		if (!c) {
			alert('Error: The TEXTAREA with id or name set to "' + this.InstanceName
			        + '" was not found');
			return;
		}
		c.style.display = "none";
		if (c.tabIndex) {
			this.TabIndex = c.tabIndex;
		}
		this._InsertHtmlBefore(this._GetConfigHtml(), c);
		this._InsertHtmlBefore(this._GetIFrameHtml(), c);
	}
};
FCKeditor.prototype._InsertHtmlBefore = function(c, b) {
	if (b.insertAdjacentHTML) {
		b.insertAdjacentHTML("beforeBegin", c);
	} else {
		var d = document.createRange();
		d.setStartBefore(b);
		var a = d.createContextualFragment(c);
		b.parentNode.insertBefore(a, b);
	}
};
FCKeditor.prototype._GetConfigHtml = function() {
	var a = "";
	for (var b in this.Config) {
		if (a.length > 0) {
			a += "&amp;";
		}
		a += encodeURIComponent(b) + "=" + encodeURIComponent(this.Config[b]);
	}
	return '<input type="hidden" id="' + this.InstanceName + '___Config" value="' + a
	        + '" style="display:none" />';
};
FCKeditor.prototype._GetIFrameHtml = function() {
	var d = "fckeditor.html";
	try {
		if ((/fcksource=true/i).test(window.top.location.search)) {
			d = "fckeditor.original.html";
		}
	}
	catch (c) {}
	var a = this.BasePath + "editor/" + d + "?InstanceName="
	        + encodeURIComponent(this.InstanceName);
	if (this.ToolbarSet) {
		a += "&amp;Toolbar=" + this.ToolbarSet;
	}
	var b = '<iframe id="' + this.InstanceName + '___Frame" src="' + a + '" width="' + this.Width
	        + '" height="' + this.Height;
	if (this.TabIndex) {
		b += '" tabindex="' + this.TabIndex;
	}
	b += '" frameborder="0" scrolling="no"></iframe>';
	return b;
};
FCKeditor.prototype._IsCompatibleBrowser = function() {
	return FCKeditor_IsCompatibleBrowser();
};
FCKeditor.prototype._ThrowError = function(b, a) {
	this.ErrorNumber = b;
	this.ErrorDescription = a;
	if (this.DisplayErrors) {
		document.write('<div style="COLOR: #ff0000">');
		document.write("[ FCKeditor Error " + this.ErrorNumber + ": " + this.ErrorDescription
		        + " ]");
		document.write("</div>");
	}
	if (typeof(this.OnError) == "function") {
		this.OnError(this, b, a);
	}
};
FCKeditor.prototype._HTMLEncode = function(a) {
	if (typeof(a) != "string") {
		a = a.toString();
	}
	a = a.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;")
	        .replace(/>/g, "&gt;");
	return a;
};
(function() {
	var a = function(b) {
		var c = new FCKeditor(b.name);
		c.Width = Math.max(b.offsetWidth, FCKeditor.MinWidth);
		c.Height = Math.max(b.offsetHeight, FCKeditor.MinHeight);
		return c;
	};
	FCKeditor.ReplaceAllTextareas = function() {
		var b = document.getElementsByTagName("textarea");
		for (var e = 0; e < b.length; e++) {
			var f = null;
			var c = b[e];
			var d = c.name;
			if (!d || d.length == 0) {
				continue;
			}
			if (typeof arguments[0] == "string") {
				var g = new RegExp("(?:^| )" + arguments[0] + "(?:$| )");
				if (!g.test(c.className)) {
					continue;
				}
			} else {
				if (typeof arguments[0] == "function") {
					f = a(c);
					if (arguments[0](c, f) === false) {
						continue;
					}
				}
			}
			if (!f) {
				f = a(c);
			}
			f.ReplaceTextarea();
		}
	};
})();
function FCKeditor_IsCompatibleBrowser() {
	var sAgent = navigator.userAgent.toLowerCase();
	if (
	/* @cc_on!@ */
	false && sAgent.indexOf("mac") == -1) {
		var sBrowserVersion = navigator.appVersion.match(/MSIE (.\..)/)[1];
		return (sBrowserVersion >= 5.5);
	}
	if (navigator.product == "Gecko" && navigator.productSub >= 20030210
	        && !(typeof(opera) == "object" && opera.postError)) { return true; }
	if (window.opera && window.opera.version && parseFloat(window.opera.version()) >= 9.5) { return true; }
	if (sAgent.indexOf(" adobeair/") != -1) { return (sAgent.match(/ adobeair\/(\d+)/)[1] >= 1); }
	if (sAgent.indexOf(" applewebkit/") != -1) { return (sAgent.match(/ applewebkit\/(\d+)/)[1] >= 522); }
	return false;
}
/* /unieap/ria3.3/unieap/form/FormWidget.js */
dojo.provide("unieap.form.FormWidget");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("unieap.util.util");
dojo.declare("unieap.form.FormWidget", [dijit._Widget, dijit._Templated], {
	        UserInterfaces : {
		        id : "string",
		        jsId : "string",
		        "class" : "string",
		        style : "string",
		        name : "string",
		        tabIndex : "number",
		        disabled : "boolean",
		        display : "string",
		        required : "boolean",
		        width : "string",
		        height : "string",
		        binding : "object",
		        validator : "object",
		        nextFocusId : "string",
		        securityId : "string"
	        },
	        name : "",
	        tabIndex : 0,
	        disabled : false,
	        display : null,
	        required : false,
	        width : "",
	        height : "",
	        binding : null,
	        validator : null,
	        validatorClass : "unieap.form.FormWidgetValidator",
	        nextFocusId : "",
	        securityId : "",
	        postCreate : function() {
		        if (this.tabIndex && this.focusNode) {
			        dojo.attr(this.focusNode, "tabindex", this.tabIndex);
		        }
		        this._setWidthAndHeigth();
		        this.disabled && this.setDisabled(this.disabled);
		        this.required && this._setRequired(this.required);
		        this.name && this.inputNode && (this.inputNode.name = this.name);
		        this.origValue = this.value || "";
		        this.display && this.setDisplay(this.display);
	        },
	        _setRequired : function(a) {
		        this.required = a;
		        this.requiredNode
		                && dojo.style(this.requiredNode, "visibility", a ? "visible" : "hidden");
	        },
	        _setWidthAndHeigth : function() {
		        this.width
		                && dojo.style(this.domNode, "width", isNaN(this.width)
		                                ? this.width
		                                : (this.width + "px"));
		        this.height
		                && dojo.style(this.domNode, "height", isNaN(this.height)
		                                ? this.height
		                                : (this.height + "px"));
	        },
	        setStyle : function(a, b) {
		        if (dojo.isString(a)) {
			        dojo.style(this.domNode, a, String(b));
		        }
	        },
	        getWidth : function() {
		        return dojo.contentBox(this.domNode).w;
	        },
	        getHeight : function() {
		        return dojo.contentBox(this.domNode).h;
	        },
	        setWidth : function(a) {
		        dojo.style(this.domNode, "width", a);
	        },
	        setHeight : function(a) {
		        dojo.style(this.domNode, "height", a);
	        },
	        setVisible : function(a) {
		        if (a) {
			        dojo.style(this.domNode, "position", "relative");
			        dojo.style(this.domNode, "visibility", "visible");
		        } else {
			        dojo.style(this.domNode, "postion", "absolute");
			        dojo.style(this.domNode, "visibility", "hidden");
		        }
	        },
	        setDisabled : function(a) {
		        this.disabled = a;
		        this.inputNode && (this.inputNode.disabled = a);
	        },
	        setRequired : function(a) {
		        this._setRequired(a);
		        this.getValidator().validate();
	        },
	        setDisplay : function(a) {
		        dojo.style(this.domNode, "display", a);
	        },
	        setModified : function(a) {
		        this.modifiedNode
		                && dojo.style(this.modifiedNode, "visibility", a ? "visible" : "hidden");
	        },
	        getBinding : function() {
		        return this.binding
		                && unieap.getModuleInstance(this, "binding",
		                        "unieap.form.FormWidgetBinding");
	        },
	        getValidator : function() {
		        return unieap.getModuleInstance(this, "validator", this.validatorClass);
	        },
	        fireDataChange : function() {},
	        setValue : function(a) {},
	        getValue : function() {},
	        reset : function() {
		        var b = this.getBinding(),
			        a = b ? b.getOrigValue() : this.origValue;
		        this.setValue(a);
		        if (a == "" || a == null) {
			        this.setModified(false);
		        }
	        },
	        setNextFocusId : function(a) {
		        this.nextFocusId = a;
	        },
	        destroy : function() {
		        this.getBinding() && this.getBinding().unbind();
		        this.inherited(arguments);
	        },
	        processNextFocusId : function() {
		        if (this.nextFocusId) {
			        var c = dijit.byId(this.nextFocusId);
			        if (c) {
				        if (c.domNode && c.domNode.offsetHeight && !c.skipFocus) {
					        if (c.focus) {
						        c.disabled ? c.processNextFocusId() : c.focus();
					        } else {
						        if (c.focusNode) {
							        var b = dojo.attr(c.focusNode, "disabled");
							        b ? c.processNextFocusId() : setTimeout(function() {
								                c.focusNode.focus();
							                }, 0);
						        } else {
							        var a = dojo.query("input", c.domNode);
							        var b = dojo.filter(a, function(d) {
								                return !dojo.attr(d, "disabled");
							                });
							        b.length > 0 ? b[0].focus() : c.processNextFocusId();
						        }
					        }
				        } else {
					        c.processNextFocusId();
				        }
			        }
		        }
	        }
        });
/* /unieap/ria3.3/unieap/form/TextBox.js */
dojo.provide("unieap.form.TextBox");
dojo.require("unieap.form.FormWidget");
dojo.declare("unieap.form.TextBox", unieap.form.FormWidget, {
	UserInterfaces : dojo.mixin({
		        textAlign : "string",
		        trim : "boolean",
		        password : "boolean",
		        maxLength : "number",
		        minLength : "number",
		        displayFormatter : "object",
		        valueFormatter : "object",
		        editFormatter : "object",
		        inputFilter : "object",
		        prompt : "object",
		        readOnly : "boolean",
		        value : "string",
		        onBeforeClick : "function",
		        onClick : "function",
		        onEnter : "function",
		        onTab : "function",
		        onChange : "function",
		        onKeyUp : "function",
		        onKeyPress : "function",
		        onKeyDown : "function",
		        onBlur : "function",
		        onFocus : "function",
		        onDblClick : "function",
		        onBeforeCopy : "function",
		        onCopy : "function",
		        onBeforePaste : "function",
		        onPaste : "function",
		        onBeforeCut : "function",
		        onCut : "function"
	        }, unieap.form.FormWidget.prototype.UserInterfaces),
	templateString : "<div class='u-form-widget'><div dojoAttachPoint='requiredNode' class='u-form-required'>*</div><div dojoAttachPoint='fieldNode' class='u-form-field'><div dojoAttachPoint='modifiedNode' class='u-form-modified'></div><div dojoAttachPoint='errorNode' class='u-form-error'></div><div class='u-form-textbox-field'><input dojoAttachPoint='inputNode,focusNode' class='u-form-textbox-input' onfocus='unieap.fep&&unieap.fep(this)'></div></div></div>",
	textAlign : "left",
	trim : false,
	password : false,
	maxLength : -1,
	minLength : -1,
	validatorClass : "unieap.form.TextBoxValidator",
	displayFormatter : null,
	displayFormatterClass : "unieap.form.SimpleFormatter",
	valueFormatter : null,
	valueFormatterClass : "unieap.form.SimpleFormatter",
	editFormatter : null,
	editFormatterClass : "unieap.form.SimpleFormatter",
	inputFilter : null,
	value : "",
	readOnly : false,
	prompt : null,
	_backgroundColor : "",
	postCreate : function() {
		if (this.password) {
			var a = this.inputNode;
			this.inputNode = this.focusNode = dojo.create("input", {
				        type : "password",
				        "class" : "u-form-textbox-input",
				        name : a.name,
				        tabIndex : a.tabIndex
			        });
			a.parentNode.replaceChild(this.inputNode, a);
			this.inputNode.onfocus = function() {
				unieap.fep && unieap.fep(this);
			};
		}
		this.inputNode.style.textAlign = this.textAlign;
		this.maxLength > -1 && (this.inputNode.maxLength = this.maxLength);
		this.readOnly && this.setReadOnly(this.readOnly);
		this.value && this.setValue(this.value);
		this.connect(this.focusNode, "onfocus", "_onFocus");
		this.connect(this.focusNode, "onblur", "_onBlur");
		this.connect(this.inputNode, "onchange", "_onChange");
		this.connect(this.inputNode, "onkeyup", "_onKeyUp");
		this.connect(this.inputNode, "onkeydown", "_onKeyDown");
		this.connect(this.inputNode, "onkeypress", "_onKeyPress");
		this.connect(this.inputNode, "ondblclick", "_onDblClick");
		this.connect(this.inputNode, "onclick", "_onClick");
		this.connect(this.inputNode, "oncopy", "_onCopy");
		this.connect(this.inputNode, "onpaste", "_onPaste");
		this.connect(this.inputNode, "oncut", "_onCut");
		this.inherited(arguments);
	},
	focus : function() {
		dijit.focus(this.focusNode);
		this.select();
	},
	select : function() {
		this.focusNode && this.focusNode.select();
	},
	setValue : function(a) {
		(a == null || typeof(a) == "undefined") && (a = "");
		a = this._trim(a);
		if (this.valueFormatter) {
			a = this.getValueFormatter().format(a);
		}
		if (this.displayFormatter) {
			a = this.getDisplayFormatter().format(a);
		}
		this.inputNode.value = (a != null ? a : "");
		this.getValidator().validate();
		this.fireDataChange();
	},
	getValue : function() {
		var a = this.getText();
		a = this.getDisplayFormatter().parse(a);
		a = this.getValueFormatter().parse(a);
		return a;
	},
	getText : function() {
		return this._trim(this.inputNode.value);
	},
	setText : function(a) {
		this.inputNode.value = a;
	},
	getMaxLength : function() {
		return this.maxLength;
	},
	getDisplayFormatter : function() {
		return unieap.getModuleInstance(this, "displayFormatter", this.displayFormatterClass);
	},
	getEditFormatter : function() {
		return unieap.getModuleInstance(this, "editFormatter", this.editFormatterClass);
	},
	getValueFormatter : function() {
		return unieap.getModuleInstance(this, "valueFormatter", this.valueFormatterClass);
	},
	getInputFilter : function() {
		return unieap.getModuleInstance(this, "inputFilter", "unieap.form.InputFilter");
	},
	getPromptManager : function() {
		if (!this.prompt) {
			this.prompt = {};
		}
		return unieap.getModuleInstance(this, "prompt", "unieap.form.PromptManager");
	},
	setReadOnly : function(a) {
		this.inputNode.readOnly = this.readOnly = a;
		if (a) {
			dojo.addClass(this.fieldNode, "u-form-readOnly");
		} else {
			dojo.removeClass(this.fieldNode, "u-form-readOnly");
		}
	},
	destroy : function() {
		if (this.inputNode) {
			this.inputNode.onfocus = null;
		}
		this.inherited(arguments);
	},
	setDisabled : function(a) {
		if (this.disabled = a) {
			this.inputNode.disabled = true;
			dojo.addClass(this.fieldNode, "u-form-disabled");
			this.wasValidated && this.getValidator().handleError(true);
		} else {
			dojo.removeAttr(this.inputNode, "disabled");
			dojo.removeClass(this.fieldNode, "u-form-disabled");
		}
	},
	_trim : function(a) {
		return this.trim
		        ? dojo.trim(a + "").replace(/^[\u3000]*/, "").replace(/[\u3000]*$/, "")
		        : a;
	},
	_job : function(c, b) {
		var a = b + "Handle";
		window.clearTimeout(c[a]);
		c[a] = window.setTimeout(dojo.hitch(c, b), "250");
	},
	_showPromptMsg : function(b) {
		var a = this.getPromptManager();
		if (a) {
			if (b) {
				a.showPromptMsg(this.inputNode);
			} else {
				a.hidePromptMsg(this.inputNode);
			}
		}
	},
	_onFocus : function(a) {
		if (!a || typeof(a) == "string") { return; }
		var b = this.getValidator();
		if (!unieap.widget.form.alwaysShowErrMssage) {
			b.handleError && b.handleError(true);
		}
		var c = this.getText();
		c = this.getDisplayFormatter().parse(c);
		c = this.getEditFormatter().format(c);
		if (this.inputNode.value != c) {
			this.inputNode.value = c;
		}
		this._showPromptMsg(true);
		this.select();
		this.onFocus(a);
	},
	_onBlur : function(b, a) {
		if (!b || typeof(b) == "string" && !a) { return; }
		var d = this.getText(),
			c = d;
		d = this.getEditFormatter().parse(d);
		d = this.getDisplayFormatter().format(d);
		c != d && (this.inputNode.value = d);
		this.getValidator().validate();
		this.fireDataChange();
		this._showPromptMsg(false);
		this.onBlur(b);
	},
	_onChange : function(a) {
		var b = this._lengthCheck();
		if (!b) {
			this.focusNode.value = this._subString(this.focusNode.value, this.maxLength);
		}
		a = this.getValue();
		this.fireDataChange();
		this.onChange(a);
	},
	_onKeyUp : function(a) {
		var c = this._lengthCheck();
		if (!c) {
			this.focusNode.value = this._subString(this.focusNode.value, this.maxLength);
		}
		var b = this.getValidator();
		b.realTime && this._job(b, "validate");
		this.onKeyUp(a);
	},
	_onKeyDown : function(a) {
		switch (a.keyCode) {
			case dojo.keys.ENTER :
				if (this.onEnter(a) == false) { return; }
				this._enter2Tab(a);
				break;
			case dojo.keys.TAB :
				this.onTab(a);
				break;
			case dojo.keys.BACKSPACE :
				this.readOnly && dojo.stopEvent(a);
				this.onKeyDown(a);
				break;
			default :
				this.onKeyDown(a);
		}
	},
	_enter2Tab : function(a) {
		if (!this.nextFocusId) {
			dojo.isIE ? (a.keyCode = dojo.keys.TAB) : dojo.byId("unieap_for_focus").focus();
		} else {
			dojo.stopEvent(a);
			dijit.byId(this.nextFocusId) ? this.processNextFocusId() : dojo
			        .byId("unieap_for_focus").focus();
		}
		this.onTab(a);
	},
	_onKeyPress : function(a) {
		this.getInputFilter().filter(a);
		this.onKeyPress(a);
	},
	_onDblClick : function(a) {
		this.onDblClick(a);
	},
	_onClick : function(a) {
		if (this.onBeforeClick()) {
			this.onClick(a);
		}
	},
	_onCopy : function(a) {
		if (this.password || !this.onBeforeCopy()) {
			dojo.stopEvent(a);
			return;
		}
		this.onCopy(a);
	},
	_onPaste : function(a) {
		if (this.password || !this.onBeforePaste()) {
			dojo.stopEvent(a);
			return;
		}
		this.onPaste();
	},
	_onCut : function(a) {
		if (this.password || !this.onBeforeCut()) {
			dojo.stopEvent(a);
			return;
		}
		this.onCut(a);
	},
	_lengthCheck : function() {
		var a = unieap.bitLength(this.getValue());
		return this.maxLength > 0 ? this.maxLength >= a : true;
	},
	_subString : function(f, d) {
		var c = 0;
		var e = "";
		for (var b = 0, a = f.length; b < a; b++) {
			f.charCodeAt(b) > 255 ? c += unieap.global.bitsOfOneChinese : c++;
			if (c > d) { return e; }
			e += f.charAt(b);
		}
		return f;
	},
	onBeforeClick : function() {
		return true;
	},
	onClick : function(a) {},
	onEnter : function(a) {},
	onTab : function(a) {},
	onChange : function(a) {},
	onKeyUp : function(a) {},
	onKeyPress : function(a) {},
	onKeyDown : function(a) {},
	onBlur : function(a) {},
	onFocus : function(a) {},
	onDblClick : function(a) {},
	onBeforeCopy : function() {
		return true;
	},
	onCopy : function(a) {},
	onBeforePaste : function() {
		return true;
	},
	onPaste : function(a) {},
	onBeforeCut : function() {
		return true;
	},
	onCut : function(a) {},
	fireEvent : function(a, b) {
		this._hasFiredEvent = this._hasFiredEvent || {};
		if (a in this._hasFiredEvent) { return; }
		this._hasFiredEvent[a] = true;
		setTimeout(dojo.hitch(this, function() {
			                delete this._hasFiredEvent[a];
		                }), 0);
		return this[a](b);
	}
});
/* /unieap/ria3.3/unieap/form/Formatter.js */
if (!dojo._hasResource["unieap.form.Formatter"]) {
	dojo._hasResource["unieap.form.Formatter"] = true;
	dojo.provide("unieap.form.Formatter");
	dojo.declare("unieap.form.Formatter", null, {
		        format : function(a) {
			        return a;
		        },
		        parse : function(a) {
			        return a;
		        }
	        });
}
/* /unieap/ria3.3/unieap/form/SimpleFormatter.js */
if (!dojo._hasResource["unieap.form.SimpleFormatter"]) {
	dojo._hasResource["unieap.form.SimpleFormatter"] = true;
	dojo.provide("unieap.form.SimpleFormatter");
	dojo.require("unieap.form.Formatter");
	dojo.declare("unieap.form.SimpleFormatter", unieap.form.Formatter, {
		        dataFormat : "",
		        constructor : function(a) {
			        dojo.mixin(this, a);
		        },
		        setFormat : function(a) {
			        this.dataFormat = a;
		        },
		        getFormat : function() {
			        return this.dataFormat;
		        }
	        });
}
/* /unieap/ria3.3/unieap/form/Popup.js */
dojo.provide("unieap.form.Popup");
dojo.require("dojo.fx");
dojo.declare("unieap.form.Popup", [dijit._Widget, dijit._Templated], {
	templateString : "<div  class='u-popupcontainer' dojoAttachPoint='popupcontainer,containerNode' ></div>",
	height : 0,
	width : 0,
	isOpen : function() {
		return this._isShowingNow;
	},
	animate : (typeof(unieap.animate) == "undefined") ? true : unieap.animate,
	duration : 300,
	_isShowingNow : false,
	_needFocus : function() {
		return true;
	},
	postCreate : function() {
		if (!dojo.byId("dijit-popupBody")) {
			var a = dojo.create("div", null, dojo.body(), "first");
			a.id = "dijit-popupBody";
		}
		if (!dojo.byId("_backgroundIframe")) {
			this._iframe = dojo.create("iframe", null, dojo.byId("dijit-popupBody"));
			this._iframe.frameBorder = "no";
			this._iframe.id = "_backgroundIframe";
			dojo.addClass(this._iframe, "u-backgroundIframe");
		} else {
			this._iframe = dojo.byId("_backgroundIframe");
		}
		dojo.style(this.domNode, "display", "none");
		dojo.place(this.domNode, dojo.byId("dijit-popupBody"));
		this._needFocus() && this.connect(this.domNode, "onclick", function() {
			        dijit.focus(this.widget.inputNode);
		        });
		dojo.isFF && dojo.attr(this.domNode, "tabindex", "0");
	},
	open : function(c, a) {
		if (this.animation && this.animation.status() == "playing") {
			this.animation.stop();
		}
		this._isShowingNow = true;
		this._resetWidgetHW();
		this._resetWidgetTL(c || this.width, a || this.height);
		dojo.style(this.domNode, "overflow", "hidden");
		dojo.style(this.domNode, "display", "block");
		if (this.animate) {
			var d = this.domNode;
			var a = d.offsetHeight;
			var b = d.style.height;
			this.animation = dojo.animateProperty({
				        node : d,
				        duration : this.duration,
				        onBegin : dojo.hitch(this, function() {
					                this.onAnimateBegin();
				                }),
				        properties : {
					        height : {
						        start : "0",
						        end : a,
						        unit : "px"
					        }
				        },
				        onEnd : dojo.hitch(this, function() {
					                this.domNode.style.height = b;
					                this.onAnimateEnd();
				                })
			        });
			this.animation.play();
		} else {
			dojo.isIE && this._adjustIframePosition();
			if (!this.widget.focusShift) {
				dijit.focus(this.widget.inputNode);
			}
		}
		if (unieap.form.Popup.popwidget) {
			var f = unieap.form.Popup.popwidget, e;
			if (f != this.widget.id) {
				e = dijit.byId(f);
				e && e.getPopup().close();
			}
		}
		unieap.form.Popup.popwidget = this.widget.id;
	},
	onAnimateBegin : function() {
		dojo.style(this.domNode, "height", "1px");
	},
	onAnimateEnd : function() {
		dojo.isIE && this._adjustIframePosition();
		if (!this.widget.focusShift) {
			dijit.focus(this.widget.inputNode);
		}
	},
	_resetWidgetTL : function() {
		var a = this.widget;
		dijit.placeOnScreenAroundElement(this.popupcontainer, a.domNode, {
			        BL : "TL",
			        BR : "TR",
			        TL : "BL",
			        TR : "BR"
		        });
	},
	_resetWidgetHW : function(b, a) {
		dojo.style(this.popupcontainer, "width", this.width
		                || dojo.style(this.widget.domNode, "width") + "px");
		dojo.style(this.popupcontainer, "height", this.height);
	},
	_adjustIframePosition : function() {
		dojo.style(this._iframe, {
			        width : dojo.style(this.popupcontainer, "width"),
			        height : dojo.style(this.popupcontainer, "height"),
			        top : dojo.style(this.popupcontainer, "top"),
			        left : dojo.style(this.popupcontainer, "left")
		        });
	},
	close : function() {
		if (this.animation && this.animation.status() == "playing") {
			this.animation.stop();
		}
		if (this._isShowingNow) {
			this._isShowingNow = false;
			dojo.style(this.popupcontainer, "display", "none");
			var a = this._iframe;
			if (a) {
				a.style.width = "0px";
				a.style.height = "0px";
			}
		}
	},
	appendNode : function(a) {
		this.popupcontainer.appendChild(a);
	},
	clearNode : function(c) {
		var a = this.popupcontainer;
		if (a == null) { return; }
		for (var b = a.childNodes.length - 1; b >= 0; b--) {
			a.removeChild(a.childNodes[b]);
		}
	},
	destroy : function() {
		if (this._iframe) {
			this._iframe.onreadystatechange = this._iframe.onload = null;
			this._iframe.src = "javascript:false";
			this._iframe = null;
			delete this._iframe;
		}
		this.inherited(arguments);
	}
});
/* /unieap/ria3.3/unieap/form/FormWidgetValidator.js */
if (!dojo._hasResource["unieap.form.FormWidgetValidator"]) {
	dojo._hasResource["unieap.form.FormWidgetValidator"] = true;
	dojo.provide("unieap.form.FormWidgetValidator");
	dojo.require("unieap.util.util");
	dojo.declare("unieap.form.FormWidgetValidator", null, {
		        errorMsg : RIA_I18N.form.formWidgetValidator.errorMsg,
		        prompts : null,
		        _errorMsg : "",
		        errorCode : 20001,
		        _errorCode : 0,
		        constructor : function(b) {
			        dojo.mixin(this, b);
			        !this.prompts && (this.prompts = {});
			        var a = this.validate;
			        this.validate = function() {
				        var d = arguments.callee.caller;
				        if (d.caller && "widgetBind" == d.caller._innerIdentify) { return true; }
				        if (this.widget.disabled) { return true; }
				        this.widget.wasValidated = true;
				        this._errorMsg = "";
				        this._errorCode = 0;
				        var e = this.widget.getValue();
				        var c = this.onBeforeValidate(e);
				        if (c) {
					        c = this._baseValidate(e);
					        if (c && e != "") {
						        c = a.call(this, e);
						        if (!c) {
							        this._errorMsg = this._errorMsg || this.errorMsg;
							        this._errorCode = this._errorCode || this.errorCode;
						        }
					        }
				        }
				        this.handleError(c);
				        return c;
			        };
		        },
		        getDefaultErrorMsg : function() {
			        return dojo.getObject(this.declaredClass).prototype.errorMsg;
		        },
		        getNullableMsg : function(a) {
			        return this.prompts.nullable || (a && a.getPrompt("nullable"))
			                || RIA_I18N.form.formWidgetValidator.nullError;
		        },
		        getMaxLengthMsg : function(a) {
			        return this.prompts.maxLength || (a && a.getPrompt("maxLength"));
		        },
		        getMinLengthMsg : function(a) {
			        return this.prompts.minLength || (a && a.getPrompt("minLength"));
		        },
		        _baseValidate : function(d) {
			        d = d != null ? String(d) : "";
			        var f = this.widget.getBinding(),
				        c = true, e;
			        if (f && f.getRow()) {
				        var e = f.getMetaData();
				        e && (c = e.isNullable());
			        }
			        if ((this.widget.required || !c) && d == "") {
				        this._errorMsg = this.getNullableMsg(e);
				        this._errorCode = 10001;
				        return false;
			        }
			        var b = this.widget.minLength > -1 ? this.widget.minLength : -1;
			        var a = this.widget.maxLength > -1 ? this.widget.maxLength : -1;
			        if (a > -1) {
				        b > a && (this.widget.minLength = -1);
				        if (unieap.bitLength(d) > a) {
					        this._errorMsg = this.getMaxLengthMsg(e)
					                || (RIA_I18N.form.formWidgetValidator.maxLengthError + a);
					        this._errorCode = 10002;
					        return false;
				        }
			        }
			        if (d != null && unieap.bitLength(d) < b) {
				        this._errorMsg = this.getMinLengthMsg(e)
				                || (RIA_I18N.form.formWidgetValidator.minLengthError + b);
				        this._errorCode = 10003;
				        return false;
			        }
			        return true;
		        },
		        validate : function(a) {
			        return true;
		        },
		        onBeforeValidate : function(a) {
			        return true;
		        },
		        handleError : function(b) {
			        var a = this.widget.errorNode;
			        if (b) {
				        this.widget.fieldNode
				                && dojo.removeClass(this.widget.fieldNode, "u-form-textbox-error");
				        if (a) {
					        dojo.require("unieap.Tooltip");
					        unieap.hideTooltip(a);
					        dojo.style(a, "display", "none");
				        }
			        } else {
				        this.widget.fieldNode
				                && dojo.addClass(this.widget.fieldNode, "u-form-textbox-error");
				        if (a) {
					        dojo.style(a, "display", "block");
					        if (!a.onmouseover) {
						        dojo.require("unieap.Tooltip");
						        this.widget.connect(a, "onmouseover", function() {
							                var c = this.getValidator().getErrorMsg();
							                unieap.showTooltip(c, this.errorNode);
						                });
						        this.widget.connect(a, "onmouseout", function() {
							                unieap.hideTooltip(this.errorNode);
						                });
					        }
				        }
			        }
		        },
		        getErrorMsg : function() {
			        return this._errorMsg;
		        },
		        setErrorMsg : function(a) {
			        this._errorMsg = a;
		        },
		        getErrorCode : function() {
			        return this._errorCode;
		        },
		        setErrorCode : function(a) {
			        this._errorCode = a;
		        }
	        });
}
/* /unieap/ria3.3/unieap/form/TextBoxValidator.js */
dojo.provide("unieap.form.TextBoxValidator");
dojo.require("unieap.form.FormWidgetValidator");
dojo.declare("unieap.form.TextBoxValidator", unieap.form.FormWidgetValidator, {
	        regExp : null,
	        realTime : false,
	        validate : function() {
		        var a = true, d,
			        e = this.widget.getBinding();
		        if (e && e.getRow()) {
			        var d = e.getMetaData(), b;
			        this.regExpFlag && (this.regExp = this.getDefaultRegExp());
			        if (d) {
				        b = this.getRegExp(d);
				        b && (this.regExp = b);
			        }
		        }
		        if (this.regExp) {
			        var c = this.widget.getValue();
			        if (dojo.isFunction(this.regExp) && this.regExp.call) {
				        a = !!this.regExp.call(this, c, this.widget);
			        } else {
				        a = new RegExp(this.regExp).test(c);
			        }
			        !a && (this.setErrorMsg(this.getPatternMsg(d)));
			        return a;
		        }
		        return a;
	        },
	        getRegExp : function(c) {
		        var a,
			        b = this.getDefaultRegExp();
		        this.regExp == b && c.getPattern() && (a = c.pattern) && (this.regExpFlag = true);
		        return a;
	        },
	        getDefaultRegExp : function() {
		        return dojo.getObject(this.declaredClass).prototype.regExp;
	        },
	        getPatternMsg : function(a) {
		        return this.prompts.pattern || (a && a.getPrompt("pattern")) || this.errorMsg
		                || this.getDefaultErrorMsg();
	        },
	        setRegExp : function(a) {
		        this.regExp = a;
	        }
        });
/* /unieap/ria3.3/unieap/form/NumberTextBoxValidator.js */
dojo.provide("unieap.form.NumberTextBoxValidator");
dojo.require("unieap.form.TextBoxValidator");
dojo.declare("unieap.form.NumberTextBoxValidator", unieap.form.TextBoxValidator, {
	        regExp : /^(-)?\d+\.?\d*$/,
	        errorMsg : RIA_I18N.form.numberTextBox.errorMsg,
	        realTime : true,
	        validate : function() {
		        var a = this.inherited(arguments),
			        b = this.widget;
		        if (a) {
			        var d = b.getBinding(),
				        c = d && d.getRow() && d.getMetaData();
			        this._update(b);
			        c && this.updateRange(b.range, {
				                range : c.getRange(),
				                max : c.getMax(),
				                min : c.getMin()
			                });
			        a = this.validateRange(b, c);
			        a && (a = this.validatePrecisionAndScale(b, c));
		        }
		        return a;
	        },
	        getMaxMsg : function(a) {
		        var b = this.prompts.max || a && a.getPrompt("max");
		        return b;
	        },
	        getMinMsg : function(a) {
		        var b = this.prompts.min || a && a.getPrompt("min");
		        return b;
	        },
	        getRangeMsg : function(a) {
		        var b = this.prompts.range || a && a.getPrompt("range");
		        return b;
	        },
	        getPrecisionMsg : function(a) {
		        var b = this.prompts.precision || a && a.getPrompt("precision");
		        return b;
	        },
	        getScaleMsg : function(a) {
		        var b = this.prompts.scale || a && a.getPrompt("scale");
		        return b;
	        },
	        getDecimalMsg : function(a) {
		        var b = this.prompts.decimal || a && a.getPrompt("decimal");
		        return b;
	        },
	        validateRange : function(d, e) {
		        var c = d.getValue(),
			        a = d.range.max,
			        b = d.range.min,
			        f = "";
		        if (e) {
			        if (e.range) {
				        if (c > a || c < b) {
					        f = this.getRangeMsg(e);
					        f && this.setErrorMsg(f);
					        return false;
				        }
			        } else {
				        if (e.max && c > a) {
					        f = this.getMaxMsg(e);
					        f && this.setErrorMsg(f);
					        return false;
				        } else {
					        if (e.min && c < b) {
						        f = this.getMinMsg(e);
						        f && this.setErrorMsg(f);
						        return false;
					        } else {
						        if (c > a || c < b) { return false; }
					        }
				        }
			        }
		        } else {
			        if (this.prompts.range) {
				        if (c > a || c < b) {
					        f = this.getRangeMsg(null);
					        f && this.setErrorMsg(f);
					        return false;
				        }
			        } else {
				        if (this.prompts.max && c > a) {
					        f = this.getMaxMsg(null);
					        f && this.setErrorMsg(f);
					        return false;
				        }
				        if (this.prompts.min && c < b) {
					        f = this.getMinMsg(null);
					        f && this.setErrorMsg(f);
					        return false;
				        }
				        if (c > a || c < b) { return false; }
			        }
		        }
		        if (String(d.range.allowDecimal) == "false") {
			        if (c.indexOf(".") > -1) {
				        var f = this.getDecimalMsg();
				        f && this.setErrorMsg(f);
				        return false;
			        }
		        }
		        return true;
	        },
	        validatePrecisionAndScale : function(e, f) {
		        var b = true;
		        if (e.precision > 0) {
			        var d = e.getValue() + "", c;
			        var a = e.precision - e.scale;
			        if (a <= 0) { return true; }
			        if (d.indexOf(".") > -1 && e.scale > 0) {
				        c = new RegExp("^(-)?\\d{1," + a + "}.\\d{1," + e.scale + "}$");
			        } else {
				        c = new RegExp("^(-)?\\d{1," + a + "}$");
			        }
			        if (!c.test(d)) {
				        if (e.scale > 0) {
					        var g = this.getScaleMsg(f);
					        g && this.setErrorMsg(g);
				        } else {
					        var g = this.getPrecisionMsg(f);
					        g && this.setErrorMsg(g);
				        }
				        b = false;
			        }
		        }
		        return b;
	        },
	        _update : function(a) {
		        this.maxRangeFlag && (a.range.max = Infinity);
		        this.minRangeFlag && (a.range.min = -Infinity);
	        },
	        updateRange : function(b, d) {
		        var a, c;
		        if (d.range) {
			        a = d.range["max"];
			        c = d.range["min"];
			        this._updateRange(b, a, c);
		        } else {
			        a = d.max, c = d.min;
			        this._updateRange(b, a, c);
		        }
	        },
	        _updateRange : function(b, a, c) {
		        if (a && b.max == Infinity) {
			        b.max = a;
			        this.maxRangeFlag = true;
		        }
		        if (c && b.min == -Infinity) {
			        b.min = c;
			        this.minRangeFlag = true;
		        }
	        }
        });
/* /unieap/ria3.3/unieap/form/TextBoxWithIcon.js */
dojo.provide("unieap.form.TextBoxWithIcon");
dojo.require("unieap.form.TextBox");
dojo.declare("unieap.form.TextBoxWithIcon", unieap.form.TextBox, {
	UserInterfaces : dojo.mixin({
		        label : "string",
		        cancelText : "string",
		        fileFilter : "string",
		        iconClass : "string",
		        showIcon : "boolean",
		        onBeforeIconClick : "function",
		        onIconClick : "function",
		        onBeforeCancel : "function",
		        onCancel : "function",
		        onChange : "function",
		        popup : "object"
	        }, unieap.form.TextBox.prototype.UserInterfaces),
	templateString : '<div class="u-form-widget"><div dojoAttachPoint=\'requiredNode\' class=\'u-form-required\'>*</div><div dojoAttachPoint="fieldNode" class="u-form-field"><div dojoAttachPoint="modifiedNode" class="u-form-modified"></div><a href=\'javascript:void(0);\' tabindex=\'-1\' class="u-form-textbox-icon u-form-textbox-icon-normal u-a-common" dojoAttachPoint="iconNode"></a><div dojoAttachPoint="errorNode" class="u-form-error"></div><div class="u-form-textbox-field"><input dojoAttachPoint="inputNode,focusNode,textbox" class="u-form-textbox-input" onfocus="unieap.fep&&unieap.fep(this)"></div></div></div>',
	showIcon : true,
	iconClass : "u-form-textbox-icon",
	popup : null,
	focusShift : false,
	popupClass : "unieap.form.Popup",
	_infield : false,
	onBeforeIconClick : function(a) {
		return true;
	},
	onIconClick : function(a) {},
	setIconClass : function(a) {
		dojo.removeClass(this.iconNode, this.iconClass);
		dojo.addClass(this.iconNode, a);
		this.iconClass = a;
	},
	changeIconState : function(a) {
		if (!a) {
			dojo.style(this.iconNode, "display", "none");
		} else {
			dojo.style(this.iconNode, "display", "block");
		}
	},
	postCreate : function() {
		this.inherited(arguments);
		if (this.iconClass) {
			dojo.addClass(this.iconNode, this.iconClass);
		}
		this.connect(document.body, "onclick", "_onBodyClick");
		this.connect(this.fieldNode, "onmousedown", "_mouseDownInFiled");
		this.connect(this.iconNode, "onclick", "_onIconClick");
		this.connect(this.iconNode, "onblur", "_onIconBlur");
		!this.showIcon && dojo.style(this.iconNode, "display", "none");
	},
	setDisabled : function() {
		this.inherited(arguments);
		if (this.disabled) {
			dojo.removeClass(this.iconNode, "u-form-textbox-icon-normal");
			dojo.addClass(this.iconNode, "u-form-textbox-icon-disabled");
		} else {
			dojo.removeClass(this.iconNode, "u-form-textbox-icon-disabled");
			dojo.addClass(this.iconNode, "u-form-textbox-icon-normal");
		}
	},
	getPopup : function() {
		return unieap.getModuleInstance(this, "popup", this.popupClass);
	},
	destroy : function() {
		if (this.popup && this.popup.destroy) {
			this.popup.destroy();
		}
		this.inherited(arguments);
	},
	_mouseDownInFiled : function() {
		this._infield = true;
	},
	_onIconClick : function(b) {
		if (!this.disabled && this.onBeforeIconClick(b)) {
			this.onIconClick(b);
			var a = this.getPopup();
			if (a._isShowingNow) {
				a.close();
			} else {
				a.open();
			}
		}
	},
	_canPopOpen : function() {
		return true;
	},
	_onIconBlur : function(a) {
		if (this._interestInBlur(a)) {
			this._onBlur(a);
		}
	},
	_onBlur : function(b, a) {
		if (this._interestInBlur(b)) {
			this._onBeforeBlur && this._onBeforeBlur();
			this.getPopup().close();
			this.inherited("_onBlur", arguments);
		} else {
			if (arguments.length > 1 && !this._infield) {
				this.inherited("_onBlur", arguments);
			}
		}
		this._infield = false;
	},
	_onBodyClick : function(a) {
		if (unieap.isClassEntity(this.popup) && this.getPopup()._isShowingNow) {
			var b = a.target;
			if (dojo.isDescendant(b, this.domNode) || dojo.isDescendant(b, this.getPopup().domNode)) {
				return;
			} else {
				this.getPopup().close();
				if (dojo.isSafari || dojo.isChrome) {
					this.inherited("_onBlur", arguments);
				}
			}
		}
		this._infield = false;
	},
	_onTab : function(a) {
		this.getPopup().close();
		this.inherited("_onTab", arguments);
		this._infield = false;
	},
	_interestInBlur : function(b) {
		if (!b || typeof(b) == "string") { return false; }
		var a = null;
		if (dojo.isIE) {
			a = document.activeElement;
		} else {
			if (dojo.isFF) {
				a = b.explicitOriginalTarget;
			} else {
				if (this._infield) {
					a = this.iconNode;
				}
			}
		}
		if (a == this.iconNode) { return false; }
		if (dojo.isDescendant(a, this.domNode)
		        || (this.getPopup() && dojo.isDescendant(a, this.getPopup().domNode))) { return false; }
		return true;
	}
});
/* /unieap/ria3.3/unieap/form/CheckGroup.js */
dojo.provide("unieap.form.CheckGroup");
dojo.require("unieap.form.FormWidget");
dojo.declare("unieap.form.CheckGroup", unieap.form.FormWidget, {
	UserInterfaces : dojo.mixin({
		        cols : "number",
		        value : "string",
		        labelAlign : "string",
		        dataProvider : "object",
		        decoder : "object",
		        nextFocusId : "string",
		        disabled : "boolean",
		        focusOffset : "number",
		        onChange : "function",
		        onTab : "function"
	        }, unieap.form.FormWidget.prototype.UserInterfaces),
	cols : 4,
	value : "",
	labelAlign : "left",
	dataProvider : null,
	decoder : null,
	nextFocusId : "",
	disabled : false,
	focusOffset : 0,
	templateString : "<div class='u-form-chkGroup'><div dojoAttachPoint='modifiedNode' class='u-form-modified'></div><div dojoAttachPoint='requiredNode' class='u-form-required'>*</div><div dojoAttachPoint='errorNode' class='u-form-error'></div><div dojoAttachPoint='containerNode' class='u-form-chkGroup-border'><div dojoAttachPoint='inputNode,focusNode'  style='overflow:hidden;width:100%;zoom:100%;'></div></div></div>",
	postCreate : function() {
		this.checkboxMap = [];
		this.setLayout(this.getDataProvider().getDataStore());
		this.inherited(arguments);
	},
	_attachTab : function() {},
	startup : function() {
		if (!this.getDataProvider().getDataStore()) {
			this.checkboxMap = dijit.findWidgets(this.containerNode);
			this._attachTab();
		}
		this.value && this.setValue(this.value);
		this.disabled && (this.setDisabled(true, []));
	},
	setLayout : function(n) {
		if (!n) { return; }
		var e = n.getRowSet(),
			k = e.getRowCount();
		if (k < 1) { return; }
		dojo.empty(this.inputNode);
		var a = this.checkboxMap;
		while (a.length > 0) {
			a.pop().destroy();
		}
		var f = document.createElement("TABLE"),
			h = document.createElement("TBODY"),
			j = this[["_", this.labelAlign, "Layout"].join("")];
		f.className = "u-form-chkGroup-tab";
		f.cellpadding = f.cellspacing = 0;
		f.appendChild(h);
		for (var m = 0; m < k; m++) {
			j.call(this, h, m);
		}
		for (var g = 0, d = k % this.cols == 0 ? 0 : (this.cols - k % this.cols); g < d; g++) {
			var c = document.createElement("TD");
			c.innerHTML = "&nbsp;";
			this.tr.appendChild(c);
			var b = document.createElement("TD");
			b.innerHTML = "&nbsp;";
			this.labelTr.appendChild(b);
		}
		this.tr = this.labelTr = null;
		this.inputNode.appendChild(f);
	},
	_leftLayout : function(a, b) {
		if (b % this.cols == 0) {
			this.labelTr = this.tr = document.createElement("TR");
			a.appendChild(this.tr);
		}
		var c = document.createElement("TD");
		c.className = "u-form-chkGroup-label";
		c.align = "right";
		c.innerHTML = this.getLabel(b);
		this.labelTr.appendChild(c);
		var d = document.createElement("TD");
		d.align = "center";
		d.className = "u-form-chkGroup-cell";
		d.appendChild(this.getCheckBox(b).domNode);
		this.tr.appendChild(d);
	},
	_rightLayout : function(a, b) {
		if (b % this.cols == 0) {
			this.labelTr = this.tr = document.createElement("TR");
			a.appendChild(this.tr);
		}
		this._addCell(b, "left");
	},
	_topLayout : function(a, b) {
		if (b % this.cols == 0) {
			this.labelTr = document.createElement("TR");
			a.appendChild(this.labelTr);
			this.tr = document.createElement("TR");
			a.appendChild(this.tr);
		}
		this._addCell(b, "center");
	},
	_bottomLayout : function(a, b) {
		if (b % this.cols == 0) {
			this.tr = document.createElement("TR");
			a.appendChild(this.tr);
			this.labelTr = document.createElement("TR");
			a.appendChild(this.labelTr);
		}
		this._addCell(b, "center");
	},
	_addCell : function(b, a) {
		var d = document.createElement("TD");
		d.align = "center";
		d.className = "u-form-chkGroup-cell";
		d.appendChild(this.getCheckBox(b).domNode);
		this.tr.appendChild(d);
		var c = document.createElement("TD");
		c.className = "u-form-chkGroup-label";
		c.align = a;
		c.innerHTML = this.getLabel(b);
		this.labelTr.appendChild(c);
	},
	_setDisabled : function(a) {
		var c = this.checkboxMap, b;
		for (key in c) {
			b = c[key];
			b && b.setDisabled && b.setDisabled(a);
		}
	},
	getDataProvider : function() {
		return unieap.getModuleInstance(this, "dataProvider", "unieap.form.CheckGroupProvider");
	},
	getDecoder : function() {
		return unieap.getModuleInstance(this, "decoder", "unieap.form.GroupDecoder");
	},
	onChange : function(a) {},
	getLabel : function(b) {
		var a = this.getDecoder().getDisplayAttr();
		return this.getDataProvider().getItemValue(a, b);
	},
	setDisabled : function(b, a) {
		if (!a) {
			this._setDisabled(b);
		} else {
			if (dojo.isArray(a) && a.length != 0) {
				var e = this.checkboxMap, d;
				for (var c = 0; c < a.length; c++) {
					d = e[a[c]];
					d && d.setDisabled(b);
				}
			}
		}
	},
	getCheckBox : function(a) {
		return null;
	},
	onTab : function() {},
	focus : function() {
		this.checkboxMap.length && this.checkboxMap[0].focus();
	},
	_showPromptMsg : function(b) {
		var a = this.getPromptManager();
		if (a) {
			if (b) {
				a.showPromptMsg(this.inputNode);
			} else {
				a.hidePromptMsg(this.inputNode);
			}
		}
	},
	getPromptManager : function() {
		if (!this.prompt) {
			this.prompt = {};
		}
		return unieap.getModuleInstance(this, "prompt", "unieap.form.PromptManager");
	}
});
/* /unieap/ria3.3/unieap/form/AutoCompleter.js */
dojo.provide("unieap.form.AutoCompleter");
dojo.require("unieap.rpc");
dojo.declare("unieap.form.AutoCompleter", null, {
	        constructor : function(a) {
		        dojo.mixin(this, a);
	        },
	        widget : null,
	        minQueryLength : 1,
	        url : "",
	        queryName : "query",
	        alwaysSendRequest : false,
	        onBeforeSendQuery : function(b, a) {},
	        onAfterSendQuery : function(a) {},
	        _canSendQuery : function(a) {
		        if (!a || this.minQueryLength <= 0) { return false; }
		        if (a.length < this.minQueryLength) { return false; }
		        return true;
	        },
	        _sendQuery : function(e) {
		        var c = this;
		        if (this.url && this._canSendQuery(e)) {
			        var b = unieap.WEB_APP_NAME + this.url;
			        var d = c.queryName;
			        c.params = {};
			        c.params[d] = e;
			        var a = new unieap.ds.DataCenter();
			        c.onBeforeSendQuery(c.params, a);
			        unieap.Action.requestData({
				                url : b,
				                parameters : c.params,
				                sync : false,
				                load : function(f) {
					                if (!f) { return; }
					                c._showResult(f);
					                c.onAfterSendQuery(f);
				                }
			                }, a, false);
		        }
	        },
	        _showResult : function(a) {
		        var b = a.getSingleDataStore();
		        this.widget.getDataProvider().setDataStore(b);
		        this.widget.getPopup()._isShowingNow && this.widget.getPopup().close();
		        this.widget.getPopup().open(this.widget.getText(), [], this.widget._onPopupClose);
	        },
	        _handleKeyUp : function() {
		        var b = this.widget.getText();
		        if (this.alwaysSendRequest) {
			        this._sendQuery(b);
		        } else {
			        var a = this.widget.getDataProvider().getItems(b, false);
			        a.length == 0 && this._sendQuery(b);
		        }
	        }
        });
/* /unieap/ria3.3/unieap/form/BaseButton.js */
dojo.provide("unieap.form.BaseButton");
dojo.require("unieap.form.FormWidget");
dojo.declare("unieap.form.BaseButton", unieap.form.FormWidget, {
	        UserInterfaces : dojo.mixin({
		                accessKey : "string",
		                onEnter : "function",
		                onTab : "function",
		                onKeyDown : "function",
		                onClick : "function"
	                }, unieap.form.FormWidget.prototype.UserInterfaces),
	        accessKey : "",
	        postCreate : function() {
		        this.inherited(arguments);
		        this.inputNode.accessKey = this.accessKey;
		        var a = true;
		        if ("" != this.accessKey) {
			        a = false;
		        }
		        this._postCreate();
		        this.connect(this.inputNode, "onclick", "_onButtonClick", a);
		        this.connect(this.inputNode, "onkeydown", "_onKeyDown", a);
	        },
	        _postCreate : function() {},
	        _onButtonClick : function(a) {
		        this.onClick(a);
	        },
	        _onKeyDown : function(a) {
		        switch (a.keyCode) {
			        case dojo.keys.ENTER :
				        this._onEnterDown(a);
				        break;
			        case dojo.keys.TAB :
				        this.onTab(a);
				        break;
			        default :
				        this.onKeyDown(a);
		        }
	        },
	        _onEnterDown : function(a) {
		        if (this.onEnter(a) == false) { return; }
		        this._enter2Tab(a);
	        },
	        _enter2Tab : function(a) {
		        if (dojo.isIE && !this.nextFocusId) {
			        a.keyCode = dojo.keys.TAB;
		        } else {
			        dojo.stopEvent(a);
			        this.processNextFocusId();
		        }
		        this.onTab(a);
	        },
	        onEnter : function(a) {},
	        onTab : function(a) {},
	        onKeyDown : function(a) {},
	        onClick : function(a) {},
	        focus : function() {
		        this.focusNode && this.focusNode.focus();
	        }
        });
/* /unieap/ria3.3/unieap/form/Button.js */
dojo.provide("unieap.form.Button");
dojo.require("unieap.form.BaseButton");
dojo.declare("unieap.form.Button", unieap.form.BaseButton, {
	UserInterfaces : dojo.mixin({
		        label : "string",
		        iconClass : "string"
	        }, unieap.form.BaseButton.prototype.UserInterfaces),
	label : "",
	iconClass : "",
	_background : "",
	templateString : '<a href=\'javascript:void(0);\' class=\'u-form-btn-outer\' tabindex=\'-1\' style="text-decoration:none;vertical-align:middle;"><button type="button"  class="u-form-btn" dojoAttachPoint="focusNode, inputNode,btnNode" onfocus="unieap.fep&&unieap.fep(this)"><table style="display:inline-block"><tr><td dojoAttachPoint="iconNode"></td><td class="u-form-btn-txt" dojoAttachPoint="labelNode"></td></tr></table></button></a>',
	postCreate : function() {
		this.inherited(arguments);
		this.label && this.setLabel(this.label);
		this.iconClass && this.setIconClass(this.iconClass);
		this.connect(this.btnNode, "onmouseover", this._onMouseOver);
	},
	_setWidthAndHeigth : function() {
		var b = this.width || this.domNode.style.width;
		var a = this.height || this.domNode.style.height;
		b && dojo.style(this.domNode, "width", isNaN(b) ? b : (this.width + "px"));
		b && dojo.style(this.btnNode, "width", "100%");
		a && dojo.style(this.domNode, "height", isNaN(a) ? a : (this.height + "px"));
	},
	setDisabled : function(a) {
		if (a) {
			dojo.style(this.labelNode, "color", "#a7a6aa");
			dojo.removeClass(this.domNode, "u-form-btn-outer");
			dojo.addClass(this.domNode, "u-form-btn-outer-disabled");
		} else {
			dojo.style(this.labelNode, "color", "#000");
			dojo.removeClass(this.domNode, "u-form-btn-outer-disabled");
			dojo.addClass(this.domNode, "u-form-btn-outer");
		}
		this.btnNode.disabled = a;
		this.disabled = a;
	},
	setValue : function(a) {
		this.label = a;
		if (this.getBinding() && this.getBinding().getRow()) {
			this.setLabel(this.label);
			this.fireDataChange();
		}
	},
	getValue : function() {
		return this.label;
	},
	setLabel : function(a) {
		this.label = a;
		this.labelNode.innerHTML = a;
	},
	setIconClass : function(a) {
		this.iconClass && dojo.removeClass(this.iconNode, this.iconClass);
		dojo.addClass(this.iconNode, a);
		this.iconClass = a;
	},
	_onMouseOver : function() {},
	_onEnterDown : function(a) {
		this.onEnter(a);
	}
});
/* /unieap/ria3.3/unieap/form/calendar.js */
if (!dojo._hasResource["unieap.form.calendar"]) {
	dojo._hasResource["unieap.form.calendar"] = true;
	dojo.provide("unieap.form.calendar");
	Calendar = function(d, c, f, a) {
		this.activeDiv = null;
		this.currentDateEl = null;
		this.getDateStatus = null;
		this.getDateToolTip = null;
		this.getDateText = null;
		this.timeout = null;
		this.onSelected = f || null;
		this.onClose = a || null;
		this.dragging = false;
		this.hidden = false;
		this.minYear = 1970;
		this.maxYear = 2050;
		this.dateFormat = Calendar._TT.DEF_DATE_FORMAT;
		this.ttDateFormat = Calendar._TT.TT_DATE_FORMAT;
		this.isPopup = true;
		this.weekNumbers = true;
		this.firstDayOfWeek = typeof d == "number" ? d : Calendar._FD;
		this.showsOtherMonths = false;
		this.dateStr = c;
		this.ar_days = null;
		this.showsTime = false;
		this.time24 = true;
		this.yearStep = 2;
		this.hiliteToday = true;
		this.multiple = null;
		this.table = null;
		this.element = null;
		this.tbody = null;
		this.firstdayname = null;
		this.monthsCombo = null;
		this.yearsCombo = null;
		this.hilitedMonth = null;
		this.activeMonth = null;
		this.hilitedYear = null;
		this.activeYear = null;
		this.dateClicked = false;
		if (typeof Calendar._SDN == "undefined") {
			if (typeof Calendar._SDN_len == "undefined") {
				Calendar._SDN_len = 3;
			}
			var b = new Array();
			for (var e = 8; e > 0;) {
				b[--e] = Calendar._DN[e].substr(0, Calendar._SDN_len);
			}
			Calendar._SDN = b;
			if (typeof Calendar._SMN_len == "undefined") {
				Calendar._SMN_len = 3;
			}
			b = new Array();
			for (var e = 12; e > 0;) {
				b[--e] = Calendar._MN[e].substr(0, Calendar._SMN_len);
			}
			Calendar._SMN = b;
		}
	};
	Calendar._C = null;
	Calendar.is_ie = (/msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent));
	Calendar.is_ie5 = (Calendar.is_ie && /msie 5\.0/i.test(navigator.userAgent));
	Calendar.is_opera = /opera/i.test(navigator.userAgent);
	Calendar.is_khtml = /Konqueror|Safari|KHTML/i.test(navigator.userAgent);
	Calendar.getAbsolutePos = function(e) {
		var a = 0,
			d = 0;
		var c = /^div$/i.test(e.tagName);
		if (c && e.scrollLeft) {
			a = e.scrollLeft;
		}
		if (c && e.scrollTop) {
			d = e.scrollTop;
		}
		var f = {
			x : e.offsetLeft - a,
			y : e.offsetTop - d
		};
		if (e.offsetParent) {
			var b = this.getAbsolutePos(e.offsetParent);
			f.x += b.x;
			f.y += b.y;
		}
		return f;
	};
	Calendar.isRelated = function(c, a) {
		var d = a.relatedTarget;
		if (!d) {
			var b = a.type;
			if (b == "mouseover") {
				d = a.fromElement;
			} else {
				if (b == "mouseout") {
					d = a.toElement;
				}
			}
		}
		while (d) {
			if (d == c) { return true; }
			d = d.parentNode;
		}
		return false;
	};
	Calendar.removeClass = function(e, d) {
		if (!(e && e.className)) { return; }
		var a = e.className.split(" ");
		var b = new Array();
		for (var c = a.length; c > 0;) {
			if (a[--c] != d) {
				b[b.length] = a[c];
			}
		}
		e.className = b.join(" ");
	};
	Calendar.addClass = function(b, a) {
		Calendar.removeClass(b, a);
		b.className += " " + a;
	};
	Calendar.getElement = function(a) {
		var b = Calendar.is_ie ? window.event.srcElement : a.currentTarget;
		while (b.nodeType != 1 || /^div$/i.test(b.tagName)) {
			b = b.parentNode;
		}
		return b;
	};
	Calendar.getTargetElement = function(a) {
		var b = Calendar.is_ie ? window.event.srcElement : a.target;
		while (b.nodeType != 1) {
			b = b.parentNode;
		}
		return b;
	};
	Calendar.stopEvent = function(a) {
		a || (a = window.event);
		if (Calendar.is_ie) {
			a.cancelBubble = true;
			a.returnValue = false;
		} else {
			a.preventDefault();
			a.stopPropagation();
		}
		return false;
	};
	Calendar.addEvent = function(a, c, b) {
		if (a.attachEvent) {
			a.attachEvent("on" + c, b);
		} else {
			if (a.addEventListener) {
				a.addEventListener(c, b, true);
			} else {
				a["on" + c] = b;
			}
		}
	};
	Calendar.removeEvent = function(a, c, b) {
		if (a.detachEvent) {
			a.detachEvent("on" + c, b);
		} else {
			if (a.removeEventListener) {
				a.removeEventListener(c, b, true);
			} else {
				a["on" + c] = null;
			}
		}
	};
	Calendar.createElement = function(c, b) {
		var a = null;
		if (document.createElementNS) {
			a = document.createElementNS("http://www.w3.org/1999/xhtml", c);
		} else {
			a = document.createElement(c);
		}
		if (typeof b != "undefined") {
			b.appendChild(a);
		}
		return a;
	};
	Calendar._add_evs = function(el) {
		with (Calendar) {
			addEvent(el, "mouseover", dayMouseOver);
			addEvent(el, "mousedown", dayMouseDown);
			addEvent(el, "mouseout", dayMouseOut);
			if (is_ie) {
				addEvent(el, "dblclick", dayMouseDblClick);
				el.setAttribute("unselectable", true);
			}
		}
	};
	Calendar.findMonth = function(a) {
		if (typeof a.month != "undefined") {
			return a;
		} else {
			if (typeof a.parentNode.month != "undefined") { return a.parentNode; }
		}
		return null;
	};
	Calendar.findYear = function(a) {
		if (typeof a.year != "undefined") {
			return a;
		} else {
			if (typeof a.parentNode.year != "undefined") { return a.parentNode; }
		}
		return null;
	};
	Calendar.showMonthsCombo = function() {
		var e = Calendar._C;
		if (!e) { return false; }
		var e = e;
		var f = e.activeDiv;
		var d = e.monthsCombo;
		if (e.hilitedMonth) {
			Calendar.removeClass(e.hilitedMonth, "hilite");
		}
		if (e.activeMonth) {
			Calendar.removeClass(e.activeMonth, "active");
		}
		var c = e.monthsCombo.getElementsByTagName("div")[e.date.getMonth()];
		Calendar.addClass(c, "active");
		e.activeMonth = c;
		var b = d.style;
		b.display = "block";
		if (f.navtype < 0) {
			b.left = f.offsetLeft + "px";
		} else {
			var a = d.offsetWidth;
			if (typeof a == "undefined") {
				a = 50;
			}
			b.left = (f.offsetLeft + f.offsetWidth - a) + "px";
		}
		b.top = (f.offsetTop + f.offsetHeight) + "px";
	};
	Calendar.showYearsCombo = function(d) {
		var a = Calendar._C;
		if (!a) { return false; }
		var a = a;
		var c = a.activeDiv;
		var f = a.yearsCombo;
		if (a.hilitedYear) {
			Calendar.removeClass(a.hilitedYear, "hilite");
		}
		if (a.activeYear) {
			Calendar.removeClass(a.activeYear, "active");
		}
		a.activeYear = null;
		var b = a.date.getFullYear() + (d ? 1 : -1);
		var j = f.firstChild;
		var h = false;
		for (var e = 12; e > 0; --e) {
			if (b >= a.minYear && b <= a.maxYear) {
				j.innerHTML = b;
				j.year = b;
				j.style.display = "block";
				h = true;
			} else {
				j.style.display = "none";
			}
			j = j.nextSibling;
			b += d ? a.yearStep : -a.yearStep;
		}
		if (h) {
			var k = f.style;
			k.display = "block";
			if (c.navtype < 0) {
				k.left = c.offsetLeft + "px";
			} else {
				var g = f.offsetWidth;
				if (typeof g == "undefined") {
					g = 50;
				}
				k.left = (c.offsetLeft + c.offsetWidth - g) + "px";
			}
			k.top = (c.offsetTop + c.offsetHeight) + "px";
		}
	};
	Calendar.tableMouseUp = function(ev) {
		var cal = Calendar._C;
		if (!cal) { return false; }
		if (cal.timeout) {
			clearTimeout(cal.timeout);
		}
		var el = cal.activeDiv;
		if (!el) { return false; }
		var target = Calendar.getTargetElement(ev);
		ev || (ev = window.event);
		if (el.navtype == -2) {
			Calendar.removeClass(el, "preyearactive");
			Calendar.removeClass(el, "preyearhilite");
		} else {
			if (el.navtype == -1) {
				Calendar.removeClass(el, "premonthactive");
				Calendar.removeClass(el, "premonthhilite");
			} else {
				if (el.navtype == 0) {
					Calendar.removeClass(el, "todayactive");
					Calendar.removeClass(el, "todayhilite");
				} else {
					if (el.navtype == 1) {
						Calendar.removeClass(el, "nextmonthactive");
						Calendar.removeClass(el, "nextmonthhilite");
					} else {
						if (el.navtype == 2) {
							Calendar.removeClass(el, "nextyearactive");
							Calendar.removeClass(el, "nextyearhilite");
						} else {
							if (el.navtype == 200) {
								Calendar.removeClass(el, "closeactive");
							} else {
								Calendar.removeClass(el, "active");
							}
						}
					}
				}
			}
		}
		if (target == el || target.parentNode == el) {
			Calendar.cellClick(el, ev);
		}
		var mon = Calendar.findMonth(target);
		var date = null;
		if (mon) {
			date = new Date(cal.date);
			if (mon.month != date.getMonth()) {
				date.setMonth(mon.month);
				cal.setDate(date);
				cal.dateClicked = false;
				cal.callHandler();
			}
		} else {
			var year = Calendar.findYear(target);
			if (year) {
				date = new Date(cal.date);
				if (year.year != date.getFullYear()) {
					date.setFullYear(year.year);
					cal.setDate(date);
					cal.dateClicked = false;
					cal.callHandler();
				}
			}
		}
		with (Calendar) {
			removeEvent(document, "mouseup", tableMouseUp);
			removeEvent(document, "mouseover", tableMouseOver);
			removeEvent(document, "mousemove", tableMouseOver);
			cal._hideCombos();
			_C = null;
			return stopEvent(ev);
		}
	};
	Calendar.tableMouseOver = function(n) {
		var a = Calendar._C;
		if (!a) { return; }
		var c = a.activeDiv;
		var j = Calendar.getTargetElement(n);
		if ((j == c || j.parentNode == c) && Math.abs(c.navtype) > 2) {
			Calendar.addClass(c, "hilite active");
			Calendar.addClass(c.parentNode, "rowhilite");
		} else {
			if (typeof c.navtype == "undefined"
			        || (c.navtype != 50 && (c.navtype == 0 || Math.abs(c.navtype) > 2))) {
				Calendar.removeClass(c, "active");
			}
			Calendar.removeClass(c, "hilite");
			Calendar.removeClass(c.parentNode, "rowhilite");
		}
		n || (n = window.event);
		if (c.navtype == 50 && j != c) {
			var m = Calendar.getAbsolutePos(c);
			var p = c.offsetWidth;
			var o = n.clientX;
			var q;
			var l = true;
			if (o > m.x + p) {
				q = o - m.x - p;
				l = false;
			} else {
				q = m.x - o;
			}
			if (q < 0) {
				q = 0;
			}
			var f = c._range;
			var h = c._current;
			var g = Math.floor(q / 10) % f.length;
			for (var e = f.length; --e >= 0;) {
				if (f[e] == h) {
					break;
				}
			}
			while (g-- > 0) {
				if (l) {
					if (--e < 0) {
						e = f.length - 1;
					}
				} else {
					if (++e >= f.length) {
						e = 0;
					}
				}
			}
			var b = f[e];
			c.innerHTML = b;
			a.onUpdateTime();
		}
		var d = Calendar.findMonth(j);
		if (d) {
			if (d.month != a.date.getMonth()) {
				if (a.hilitedMonth) {
					Calendar.removeClass(a.hilitedMonth, "hilite");
				}
				Calendar.addClass(d, "hilite");
				a.hilitedMonth = d;
			} else {
				if (a.hilitedMonth) {
					Calendar.removeClass(a.hilitedMonth, "hilite");
				}
			}
		} else {
			if (a.hilitedMonth) {
				Calendar.removeClass(a.hilitedMonth, "hilite");
			}
			var k = Calendar.findYear(j);
			if (k) {
				if (k.year != a.date.getFullYear()) {
					if (a.hilitedYear) {
						Calendar.removeClass(a.hilitedYear, "hilite");
					}
					Calendar.addClass(k, "hilite");
					a.hilitedYear = k;
				} else {
					if (a.hilitedYear) {
						Calendar.removeClass(a.hilitedYear, "hilite");
					}
				}
			} else {
				if (a.hilitedYear) {
					Calendar.removeClass(a.hilitedYear, "hilite");
				}
			}
		}
		return Calendar.stopEvent(n);
	};
	Calendar.tableMouseDown = function(a) {
		if (Calendar.getTargetElement(a) == Calendar.getElement(a)) { return Calendar.stopEvent(a); }
	};
	Calendar.calDragIt = function(b) {
		var c = Calendar._C;
		if (!(c && c.dragging)) { return false; }
		var e;
		var d;
		if (Calendar.is_ie) {
			d = window.event.clientY + document.body.scrollTop;
			e = window.event.clientX + document.body.scrollLeft;
		} else {
			e = b.pageX;
			d = b.pageY;
		}
		c.hideShowCovered();
		var a = c.element.style;
		a.left = (e - c.xOffs) + "px";
		a.top = (d - c.yOffs) + "px";
		return Calendar.stopEvent(b);
	};
	Calendar.calDragEnd = function(ev) {
		var cal = Calendar._C;
		if (!cal) { return false; }
		cal.dragging = false;
		with (Calendar) {
			removeEvent(document, "mousemove", calDragIt);
			removeEvent(document, "mouseup", calDragEnd);
			tableMouseUp(ev);
		}
		cal.hideShowCovered();
	};
	Calendar.dayMouseDown = function(ev) {
		var el = Calendar.getElement(ev);
		if (el.disabled) { return false; }
		var cal = el.calendar;
		cal.activeDiv = el;
		Calendar._C = cal;
		if (el.navtype != 300) {
			with (Calendar) {
				if (el.navtype == 50) {
					el._current = el.innerHTML;
					addEvent(document, "mousemove", tableMouseOver);
				} else {
					addEvent(document, Calendar.is_ie5 ? "mousemove" : "mouseover", tableMouseOver);
				}
				if (el.navtype == -2) {
					Calendar.removeClass(el, "preyearhilite");
					Calendar.addClass(el, "preyearactive");
				} else {
					if (el.navtype == -1) {
						Calendar.removeClass(el, "premonthhilite");
						Calendar.addClass(el, "premonthactive");
					} else {
						if (el.navtype == 0) {
							Calendar.removeClass(el, "todayhilite");
							Calendar.addClass(el, "todayactive");
						} else {
							if (el.navtype == 1) {
								Calendar.removeClass(el, "nextmonthhilite");
								Calendar.addClass(el, "nextmonthactive");
							} else {
								if (el.navtype == 2) {
									Calendar.removeClass(el, "nextyearhilite");
									Calendar.addClass(el, "nextyearactive");
								} else {
									if (el.navtype == 200) {
										Calendar.removeClass(el, "closehilite");
										Calendar.addClass(el, "closeactive");
									} else {
										Calendar.addClass(el, "hilite active");
									}
								}
							}
						}
					}
				}
				addEvent(document, "mouseup", tableMouseUp);
			}
		} else {
			if (cal.isPopup) {
				cal._dragStart(ev);
			} else {
				Calendar.addEvent(document, "mouseup", Calendar.tableMouseUp);
			}
		}
		if (el.navtype == -1 || el.navtype == 1) {
			if (cal.timeout) {
				clearTimeout(cal.timeout);
			}
			cal.timeout = setTimeout("Calendar.showMonthsCombo()", 250);
		} else {
			if (el.navtype == -2 || el.navtype == 2) {
				if (cal.timeout) {
					clearTimeout(cal.timeout);
				}
				cal.timeout = setTimeout((el.navtype > 0)
				                ? "Calendar.showYearsCombo(true)"
				                : "Calendar.showYearsCombo(false)", 250);
			} else {
				cal.timeout = null;
			}
		}
		return Calendar.stopEvent(ev);
	};
	Calendar.dayMouseDblClick = function(a) {
		Calendar.cellClick(Calendar.getElement(a), a || window.event);
		if (Calendar.is_ie) {
			document.selection.empty();
		}
	};
	Calendar.dayMouseOver = function(b) {
		var a = Calendar.getElement(b);
		if (Calendar.isRelated(a, b) || Calendar._C || a.disabled) { return false; }
		if (a.ttip) {
			if (a.ttip.substr(0, 1) == "_") {
				a.ttip = a.caldate.print(a.calendar.ttDateFormat) + a.ttip.substr(1);
			}
			a.calendar.tooltips.innerHTML = a.ttip;
		}
		if (a.navtype != 300 && a.navtype != 200) {
			if (Math.abs(a.navtype) <= 2) {} else {
				Calendar.addClass(a, "hilite");
				if (a.caldate) {
					Calendar.addClass(a.parentNode, "rowhilite");
				}
			}
		}
		if (a.navtype == -2) {
			Calendar.addClass(a, "preyearhilite");
		} else {
			if (a.navtype == -1) {
				Calendar.addClass(a, "premonthhilite");
			} else {
				if (a.navtype == 0) {
					Calendar.addClass(a, "todayhilite");
				} else {
					if (a.navtype == 1) {
						Calendar.addClass(a, "nextmonthhilite");
					} else {
						if (a.navtype == 2) {
							Calendar.addClass(a, "nextyearhilite");
						} else {
							if (a.navtype == 200) {
								Calendar.addClass(a, "closehilite");
							}
						}
					}
				}
			}
		}
		return Calendar.stopEvent(b);
	};
	Calendar.dayMouseOut = function(ev) {
		with (Calendar) {
			var el = getElement(ev);
			if (isRelated(el, ev) || _C || el.disabled) { return false; }
			if (el.navtype == -2) {
				Calendar.removeClass(el, "preyearhilite");
			} else {
				if (el.navtype == -1) {
					Calendar.removeClass(el, "premonthhilite");
				} else {
					if (el.navtype == 0) {
						Calendar.removeClass(el, "todayhilite");
					} else {
						if (el.navtype == 1) {
							Calendar.removeClass(el, "nextmonthhilite");
						} else {
							if (el.navtype == 2) {
								Calendar.removeClass(el, "nextyearhilite");
							} else {
								if (el.navtype == 200) {
									Calendar.removeClass(el, "closehilite");
								} else {
									removeClass(el, "hilite");
								}
							}
						}
					}
				}
			}
			if (el.caldate) {
				removeClass(el.parentNode, "rowhilite");
			}
			if (el.calendar) {
				el.calendar.tooltips.innerHTML = _TT.SEL_DATE;
			}
			return stopEvent(ev);
		}
	};
	Calendar.cellClick = function(e, o) {
		var c = e.calendar;
		var h = false;
		var l = false;
		var f = null;
		if (typeof e.navtype == "undefined") {
			if (c.currentDateEl) {
				Calendar.removeClass(c.currentDateEl, "selected");
				Calendar.addClass(e, "selected");
				h = (c.currentDateEl == e);
				if (!h) {
					c.currentDateEl = e;
				}
			}
			c.date.setDateOnly(e.caldate);
			f = c.date;
			var b = !(c.dateClicked = !e.otherMonth);
			if (!b && !c.currentDateEl) {
				c._toggleMultipleDate(new Date(f));
			} else {
				l = !e.disabled;
			}
			if (b) {
				c._init(c.firstDayOfWeek, f);
			}
		} else {
			if (e.navtype == 200) {
				Calendar.removeClass(e, "closeactive");
				c.callCloseHandler();
				return;
			}
			f = new Date(c.date);
			if (e.navtype == 0) {
				f.setDateOnly(new Date());
			}
			c.dateClicked = false;
			var n = f.getFullYear();
			var g = f.getMonth();
			function a(q) {
				var r = f.getDate();
				var i = f.getMonthDays(q);
				if (r > i) {
					f.setDate(i);
				}
				f.setMonth(q);
			}
			switch (e.navtype) {
				case 400 :
					Calendar.removeClass(e, "hilite");
					var p = Calendar._TT.ABOUT;
					if (typeof p != "undefined") {
						p += c.showsTime ? Calendar._TT.ABOUT_TIME : "";
					} else {
						p = 'Help and about box text is not translated into this language.\nIf you know this language and you feel generous please update\nthe corresponding file in "lang" subdir to match calendar-en.js\nand send it back to <mihai_bazon@yahoo.com> to get it into the distribution  ;-)\n\nThank you!\nhttp://dynarch.com/mishoo/calendar.epl\n';
					}
					return;
				case -2 :
					if (n > c.minYear) {
						f.setFullYear(n - 1);
					}
					break;
				case -1 :
					if (g > 0) {
						a(g - 1);
					} else {
						if (n-- > c.minYear) {
							f.setFullYear(n);
							a(11);
						}
					}
					break;
				case 1 :
					if (g < 11) {
						a(g + 1);
					} else {
						if (n < c.maxYear) {
							f.setFullYear(n + 1);
							a(0);
						}
					}
					break;
				case 2 :
					if (n < c.maxYear) {
						f.setFullYear(n + 1);
					}
					break;
				case 100 :
					c.setFirstDayOfWeek(e.fdow);
					return;
				case 50 :
					var k = e._range;
					var m = e.innerHTML;
					for (var j = k.length; --j >= 0;) {
						if (k[j] == m) {
							break;
						}
					}
					if (o && o.shiftKey) {
						if (--j < 0) {
							j = k.length - 1;
						}
					} else {
						if (++j >= k.length) {
							j = 0;
						}
					}
					var d = k[j];
					e.innerHTML = d;
					c.onUpdateTime();
					return;
				case 0 :
					if ((typeof c.getDateStatus == "function")
					        && c.getDateStatus(f, f.getFullYear(), f.getMonth(), f.getDate())) { return false; }
					break;
			}
			if (!f.equalsTo(c.date)) {
				c.setDate(f);
				l = true;
			} else {
				if (e.navtype == 0) {
					l = h = true;
				}
			}
		}
		if (l) {
			o && c.callHandler();
		}
		if (h) {
			Calendar.removeClass(e, "hilite");
			o && c.callCloseHandler();
		}
	};
	Calendar.prototype.create = function(o) {
		var n = null;
		if (!o) {
			n = document.getElementsByTagName("body")[0];
			this.isPopup = true;
		} else {
			n = o;
			this.isPopup = false;
		}
		this.date = this.dateStr ? new Date(this.dateStr) : new Date();
		var r = Calendar.createElement("table");
		this.table = r;
		r.cellSpacing = 0;
		r.cellPadding = 0;
		r.calendar = this;
		Calendar.addEvent(r, "mousedown", Calendar.tableMouseDown);
		var a = Calendar.createElement("div");
		this.element = a;
		a.className = "calendar";
		a.id = "calendar" + (new Date).getTime();
		if (this.isPopup) {
			a.style.position = "absolute";
			a.style.display = "none";
		}
		a.appendChild(r);
		var l = Calendar.createElement("thead", r);
		var p = null;
		var s = null;
		var b = this;
		var f = function(t, j, i) {
			p = Calendar.createElement("td", s);
			p.colSpan = j;
			if (i == -2) {
				p.className = "preyear";
			} else {
				if (i == -1) {
					p.className = "premonth";
				} else {
					if (i == 0) {
						p.className = "today";
					} else {
						if (i == 1) {
							p.className = "nextmonth";
						} else {
							if (i == 2) {
								p.className = "nextyear";
							} else {
								if (i == 200) {
									p.className = "close";
								} else {
									p.className = "button";
								}
							}
						}
					}
				}
			}
			Calendar._add_evs(p);
			p.calendar = b;
			p.navtype = i;
			p.innerHTML = "<div unselectable='on'>" + t + "</div>";
			return p;
		};
		s = Calendar.createElement("tr", l);
		var d = 6;
		(this.isPopup) && --d;
		(this.weekNumbers) && ++d;
		this.title = f("", d + 1, 300);
		this.title.className = "title";
		if (this.isPopup) {
			this.title.ttip = Calendar._TT.DRAG_TO_MOVE;
			this.title.style.cursor = "move";
			f("&nbsp", 1, 200).ttip = Calendar._TT.CLOSE;
		}
		s = Calendar.createElement("tr", l);
		s.className = "headrow";
		this._nav_py = f("&nbsp;", 1, -2);
		this._nav_py.ttip = Calendar._TT.PREV_YEAR;
		this._nav_pm = f("&nbsp;", 1, -1);
		this._nav_pm.ttip = Calendar._TT.PREV_MONTH;
		this._nav_now = f(Calendar._TT.TODAY, this.weekNumbers ? 4 : 3, 0);
		this._nav_now.ttip = Calendar._TT.GO_TODAY;
		this._nav_nm = f("&nbsp;", 1, 1);
		this._nav_nm.ttip = Calendar._TT.NEXT_MONTH;
		this._nav_ny = f("&nbsp;", 1, 2);
		this._nav_ny.ttip = Calendar._TT.NEXT_YEAR;
		s = Calendar.createElement("tr", l);
		s.className = "daynames";
		if (this.weekNumbers) {
			p = Calendar.createElement("td", s);
			p.className = "name wn";
			p.innerHTML = Calendar._TT.WK;
		}
		for (var k = 7; k > 0; --k) {
			p = Calendar.createElement("td", s);
			if (!k) {
				p.navtype = 100;
				p.calendar = this;
				Calendar._add_evs(p);
			}
		}
		this.firstdayname = (this.weekNumbers) ? s.firstChild.nextSibling : s.firstChild;
		this._displayWeekdays();
		var h = Calendar.createElement("tbody", r);
		this.tbody = h;
		for (k = 6; k > 0; --k) {
			s = Calendar.createElement("tr", h);
			if (this.weekNumbers) {
				p = Calendar.createElement("td", s);
			}
			for (var g = 7; g > 0; --g) {
				p = Calendar.createElement("td", s);
				p.calendar = this;
				Calendar._add_evs(p);
			}
		}
		if (this.showsTime) {
			s = Calendar.createElement("tr", h);
			s.className = "time";
			p = Calendar.createElement("td", s);
			p.className = "time";
			p.colSpan = 2;
			p.innerHTML = Calendar._TT.TIME || "&nbsp;";
			p = Calendar.createElement("td", s);
			p.className = "time";
			p.colSpan = this.weekNumbers ? 4 : 3;
			(function() {
				function v(G, I, H, J) {
					var E = Calendar.createElement("span", p);
					E.className = G;
					E.innerHTML = I;
					E.calendar = b;
					E.ttip = Calendar._TT.TIME_PART;
					E.navtype = 50;
					E._range = [];
					if (typeof H != "number") {
						E._range = H;
					} else {
						for (var F = H; F <= J; ++F) {
							var D;
							if (F < 10 && J >= 10) {
								D = "0" + F;
							} else {
								D = "" + F;
							}
							E._range[E._range.length] = D;
						}
					}
					Calendar._add_evs(E);
					return E;
				}
				var B = b.date.getHours();
				var i = b.date.getMinutes();
				var x = b.date.getSeconds();
				var C = !b.time24;
				var j = (B > 12);
				if (C && j) {
					B -= 12;
				}
				var z = v("hour", B, C ? 1 : 0, C ? 12 : 23);
				var y = Calendar.createElement("span", p);
				y.innerHTML = ":";
				y.className = "colon";
				var u = v("minute", i, 0, 59);
				var w = Calendar.createElement("span", p);
				w.innerHTML = ":";
				w.className = "colon";
				var t = v("minute", x, 0, 59);
				var A = null;
				p = Calendar.createElement("td", s);
				p.className = "time";
				p.colSpan = 2;
				if (C) {
					A = v("ampm", j ? "pm" : "am", ["am", "pm"]);
				} else {
					p.innerHTML = "&nbsp;";
				}
				b.onSetTime = function() {
					var E,
						D = this.date.getHours(),
						F = this.date.getMinutes();
					secs = this.date.getSeconds();
					if (C) {
						E = (D >= 12);
						if (E) {
							D -= 12;
						}
						if (D == 0) {
							D = 12;
						}
						A.innerHTML = E ? "pm" : "am";
					}
					z.innerHTML = (D < 10) ? ("0" + D) : D;
					u.innerHTML = (F < 10) ? ("0" + F) : F;
					t.innerHTML = (secs < 10) ? ("0" + secs) : secs;
				};
				b.onUpdateTime = function() {
					var E = this.date;
					var F = parseInt(z.innerHTML, 10);
					if (C) {
						if (/pm/i.test(A.innerHTML) && F < 12) {
							F += 12;
						} else {
							if (/am/i.test(A.innerHTML) && F == 12) {
								F = 0;
							}
						}
					}
					var G = E.getDate();
					var D = E.getMonth();
					var H = E.getFullYear();
					E.setHours(F);
					E.setMinutes(parseInt(u.innerHTML, 10));
					E.setSeconds(parseInt(t.innerHTML, 10));
					E.setFullYear(H);
					E.setMonth(D);
					E.setDate(G);
					this.dateClicked = false;
					this.callHandler();
				};
			})();
		} else {
			this.onSetTime = this.onUpdateTime = function() {};
		}
		var m = Calendar.createElement("tfoot", r);
		s = Calendar.createElement("tr", m);
		s.className = "footrow";
		p = f(Calendar._TT.SEL_DATE, this.weekNumbers ? 8 : 7, 300);
		p.className = "ttip";
		if (this.isPopup) {
			p.ttip = Calendar._TT.DRAG_TO_MOVE;
			p.style.cursor = "move";
		}
		this.tooltips = p;
		a = Calendar.createElement("div", this.element);
		this.monthsCombo = a;
		a.className = "combo";
		for (k = 0; k < Calendar._MN.length; ++k) {
			var e = Calendar.createElement("div");
			e.className = Calendar.is_ie ? "label-IEfix" : "label";
			e.month = k;
			e.innerHTML = Calendar._SMN[k];
			a.appendChild(e);
		}
		a = Calendar.createElement("div", this.element);
		this.yearsCombo = a;
		a.className = "combo";
		for (k = 12; k > 0; --k) {
			var q = Calendar.createElement("div");
			q.className = Calendar.is_ie ? "label-IEfix" : "label";
			a.appendChild(q);
		}
		this._init(this.firstDayOfWeek, this.date);
		var c = Calendar.createElement("iframe");
		c.width = "245px";
		c.height = "194px";
		c.style.filter = "alpha(opacity=0)";
		c.style.left = "-1px";
		c.style.top = "-1px";
		c.style.position = "absolute";
		c.style.zIndex = "-1000";
		c.style.border = "0px";
		this.element.appendChild(c);
		n.appendChild(this.element);
	};
	Calendar._keyEvent = function(k) {
		var a = window._dynarch_popupCalendar;
		if (!a || a.multiple) { return false; }
		(Calendar.is_ie) && (k = window.event);
		var i = (Calendar.is_ie || k.type == "keypress"),
			l = k.keyCode;
		if (k.ctrlKey) {
			switch (l) {
				case 37 :
					i && Calendar.cellClick(a._nav_pm);
					break;
				case 38 :
					i && Calendar.cellClick(a._nav_py);
					break;
				case 39 :
					i && Calendar.cellClick(a._nav_nm);
					break;
				case 40 :
					i && Calendar.cellClick(a._nav_ny);
					break;
				default :
					return false;
			}
		} else {
			switch (l) {
				case 32 :
					Calendar.cellClick(a._nav_now);
					break;
				case 27 :
					i && a.callCloseHandler();
					break;
				case 37 :
				case 38 :
				case 39 :
				case 40 :
					if (i) {
						var e, m, j, g, c, d;
						e = l == 37 || l == 38;
						d = (l == 37 || l == 39) ? 1 : 7;
						function b() {
							c = a.currentDateEl;
							var n = c.pos;
							m = n & 15;
							j = n >> 4;
							g = a.ar_days[j][m];
						}
						b();
						function f() {
							var n = new Date(a.date);
							n.setDate(n.getDate() - d);
							a.setDate(n);
						}
						function h() {
							var n = new Date(a.date);
							n.setDate(n.getDate() + d);
							a.setDate(n);
						}
						while (1) {
							switch (l) {
								case 37 :
									if (--m >= 0) {
										g = a.ar_days[j][m];
									} else {
										m = 6;
										l = 38;
										continue;
									}
									break;
								case 38 :
									if (--j >= 0) {
										g = a.ar_days[j][m];
									} else {
										f();
										b();
									}
									break;
								case 39 :
									if (++m < 7) {
										g = a.ar_days[j][m];
									} else {
										m = 0;
										l = 40;
										continue;
									}
									break;
								case 40 :
									if (++j < a.ar_days.length) {
										g = a.ar_days[j][m];
									} else {
										h();
										b();
									}
									break;
							}
							break;
						}
						if (g) {
							if (!g.disabled) {
								Calendar.cellClick(g);
							} else {
								if (e) {
									f();
								} else {
									h();
								}
							}
						}
					}
					break;
				case 13 :
					if (i) {
						Calendar.cellClick(a.currentDateEl, k);
					}
					break;
				default :
					return false;
			}
		}
		return Calendar.stopEvent(k);
	};
	Calendar.prototype._init = function(n, x) {
		var w = new Date(),
			r = w.getFullYear(),
			z = w.getMonth(),
			b = w.getDate();
		this.table.style.visibility = "hidden";
		var h = x.getFullYear();
		if (h < this.minYear) {
			h = this.minYear;
			x.setFullYear(h);
			x.setMonth(0);
			x.setDate(1);
		} else {
			if (h > this.maxYear) {
				h = this.maxYear;
				x.setFullYear(h);
				x.setMonth(11);
				x.setDate(31);
			}
		}
		this.firstDayOfWeek = n;
		this.date = new Date(x);
		var y = x.getMonth();
		var B = x.getDate();
		var A = x.getMonthDays();
		x.setDate(1);
		var s = (x.getDay() - this.firstDayOfWeek) % 7;
		if (s < 0) {
			s += 7;
		}
		x.setDate(-s);
		x.setDate(x.getDate() + 1);
		var e = this.tbody.firstChild;
		var l = Calendar._SMN[y];
		var p = this.ar_days = new Array();
		var o = Calendar._TT.WEEKEND;
		var d = this.multiple ? (this.datesCells = {}) : null;
		for (var u = 0; u < 6; ++u, e = e.nextSibling) {
			var a = e.firstChild;
			if (this.weekNumbers) {
				a.className = "day wn";
				a.innerHTML = x.getWeekNumber();
				a = a.nextSibling;
			}
			e.className = "daysrow";
			var v = false, f,
				c = p[u] = [];
			for (var t = 0; t < 7; ++t, a = a.nextSibling, x.setDate(f + 1)) {
				f = x.getDate();
				var g = x.getDay();
				a.className = "day";
				a.pos = u << 4 | t;
				c[t] = a;
				var m = (x.getMonth() == y);
				if (!m) {
					if (this.showsOtherMonths) {
						a.className += " othermonth";
						a.otherMonth = true;
					} else {
						a.className = "emptycell";
						a.innerHTML = "&nbsp;";
						a.disabled = true;
						continue;
					}
				} else {
					a.otherMonth = false;
					v = true;
				}
				a.disabled = false;
				a.innerHTML = this.getDateText ? this.getDateText(x, f) : f;
				if (d) {
					d[x.print("%Y%m%d")] = a;
				}
				if (this.getDateStatus) {
					var q = this.getDateStatus(x, h, y, f);
					if (this.getDateToolTip) {
						var k = this.getDateToolTip(x, h, y, f);
						if (k) {
							a.title = k;
						}
					}
					if (q === true) {
						a.className += " disabled";
						a.disabled = true;
					} else {
						if (/disabled/i.test(q)) {
							a.disabled = true;
						}
						a.className += " " + q;
					}
				}
				if (!a.disabled) {
					a.caldate = new Date(x);
					a.ttip = "_";
					if (!this.multiple && m && f == B && this.hiliteToday) {
						a.className += " selected";
						this.currentDateEl = a;
					}
					if (x.getFullYear() == r && x.getMonth() == z && f == b) {
						a.className += " tdtoday";
						a.ttip += Calendar._TT.PART_TODAY;
					}
					if (o.indexOf(g.toString()) != -1) {
						a.className += a.otherMonth ? " oweekend" : " weekend";
					}
				}
			}
			if (!(v || this.showsOtherMonths)) {
				e.className = "emptyrow";
			}
		}
		this.title.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + Calendar._MN[y] + ", " + h;
		this.onSetTime();
		this.table.style.visibility = "visible";
		this._initMultipleDates();
	};
	Calendar.prototype._initMultipleDates = function() {
		if (this.multiple) {
			for (var b in this.multiple) {
				var a = this.datesCells[b];
				var c = this.multiple[b];
				if (!c) {
					continue;
				}
				if (a) {
					a.className += " selected";
				}
			}
		}
	};
	Calendar.prototype._toggleMultipleDate = function(b) {
		if (this.multiple) {
			var c = b.print("%Y%m%d");
			var a = this.datesCells[c];
			if (a) {
				var e = this.multiple[c];
				if (!e) {
					Calendar.addClass(a, "selected");
					this.multiple[c] = b;
				} else {
					Calendar.removeClass(a, "selected");
					delete this.multiple[c];
				}
			}
		}
	};
	Calendar.prototype.setDateToolTipHandler = function(a) {
		this.getDateToolTip = a;
	};
	Calendar.prototype.setDate = function(a) {
		if (a.getTime() != this.date.getTime()) {
			this._init(this.firstDayOfWeek, a);
		}
	};
	Calendar.prototype.refresh = function() {
		this._init(this.firstDayOfWeek, this.date);
	};
	Calendar.prototype.setFirstDayOfWeek = function(a) {
		this._init(a, this.date);
		this._displayWeekdays();
	};
	Calendar.prototype.setDateStatusHandler = Calendar.prototype.setDisabledHandler = function(a) {
		this.getDateStatus = a;
	};
	Calendar.prototype.setRange = function(b, c) {
		this.minYear = b;
		this.maxYear = c;
	};
	Calendar.prototype.callHandler = function() {
		if (this.onSelected) {
			this.onSelected(this, this.date.print(this.dateFormat));
		}
	};
	Calendar.prototype.callCloseHandler = function() {
		if (this.onClose) {
			this.onClose(this);
		}
		this.hideShowCovered();
	};
	Calendar.prototype.destroy = function() {
		var a = this.element.parentNode;
		a && a.removeChild(this.element);
		Calendar._C = null;
		window._dynarch_popupCalendar = null;
	};
	Calendar.prototype.reparent = function(b) {
		var a = this.element;
		a.parentNode.removeChild(a);
		b.appendChild(a);
	};
	Calendar._checkCalendar = function(b) {
		var c = window._dynarch_popupCalendar;
		if (!c) { return false; }
		var a = Calendar.is_ie ? Calendar.getElement(b) : Calendar.getTargetElement(b);
		if (a != null && /^body$/i.test(a.tagName)) { return; }
		for (; a != null && a != c.element; a = a.parentNode) {}
		if (a == null) {
			window._dynarch_popupCalendar.callCloseHandler();
			return Calendar.stopEvent(b);
		}
	};
	Calendar.prototype.show = function() {
		var f = this.table.getElementsByTagName("tr");
		for (var d = f.length; d > 0;) {
			var g = f[--d];
			Calendar.removeClass(g, "rowhilite");
			var c = g.getElementsByTagName("td");
			for (var b = c.length; b > 0;) {
				var a = c[--b];
				Calendar.removeClass(a, "hilite");
				Calendar.removeClass(a, "active");
			}
		}
		this.element.style.display = "block";
		this.hidden = false;
		if (this.isPopup) {
			window._dynarch_popupCalendar = this;
			Calendar.addEvent(document, "keydown", Calendar._keyEvent);
			Calendar.addEvent(document, "keypress", Calendar._keyEvent);
			Calendar.addEvent(document, "mousedown", Calendar._checkCalendar);
		}
		this.hideShowCovered();
		var e = dojo.byId("backiframe" + this.element.id);
		if (!e) {
			var d = new dijit.BackgroundIframe(this.element);
			if (d.iframe) {
				d.iframe.style.left = "-1px";
				d.iframe.style.top = "-1px";
				d.iframe.id = "backiframe" + this.element.id;
			}
		}
	};
	Calendar.prototype.hide = function() {
		if (this.isPopup) {
			Calendar.removeEvent(document, "keydown", Calendar._keyEvent);
			Calendar.removeEvent(document, "keypress", Calendar._keyEvent);
			Calendar.removeEvent(document, "mousedown", Calendar._checkCalendar);
		}
		this.element.style.display = "none";
		this.hidden = true;
		this.hideShowCovered();
	};
	Calendar.prototype.showAt = function(a, c) {
		var b = this.element.style;
		b.left = a + "px";
		b.top = c + "px";
		this.show();
	};
	Calendar.prototype.showAtElement = function(c, a) {
		var i = this;
		var b = dojo.coords(c, true);
		var h = dojo.coords(c, true);
		var d = dojo.coords(c);
		var e = dojo.coords(document.body, true);
		var g = dojo.coords(document.body);
		if (!a || typeof a != "string") {
			this.showAt(b.x, b.y + c.offsetHeight);
			return true;
		}
		function f(j) {
			if (j.x < 0) {
				j.x = 0;
			}
			if (j.y < 0) {
				j.y = 0;
			}
			if ((j.y + j.height) > g.h) {
				j.y = h.y - j.height - 2;
			}
			if (j.y < 0) {
				j.y = h.y + h.h + 1;
			}
			if ((j.x + j.width) > g.w) {
				j.x = j.x - j.width + 14;
			}
		}
		this.element.style.display = "block";
		Calendar.continuation_for_the_fucking_khtml_browser = function() {
			var j = i.element.offsetWidth;
			var l = i.element.offsetHeight;
			i.element.style.display = "none";
			var k = a.substr(0, 1);
			var m = "l";
			if (a.length > 1) {
				m = a.substr(1, 1);
			}
			switch (k) {
				case "T" :
					b.y -= l;
					break;
				case "B" :
					b.y += c.offsetHeight + 1;
					break;
				case "C" :
					b.y += (c.offsetHeight - l) / 2;
					break;
				case "t" :
					b.y += c.offsetHeight - l;
					break;
				case "b" :
					break;
			}
			switch (m) {
				case "L" :
					b.x -= j;
					break;
				case "R" :
					b.x += c.offsetWidth;
					break;
				case "C" :
					b.x += (c.offsetWidth - j) / 2;
					break;
				case "l" :
					b.x += c.offsetWidth - j;
					break;
				case "r" :
					break;
			}
			b.width = j;
			b.height = l;
			i.monthsCombo.style.display = "none";
			f(b);
			i.showAt(b.x, b.y);
		};
		if (Calendar.is_khtml) {
			setTimeout("Calendar.continuation_for_the_fucking_khtml_browser()", 10);
		} else {
			Calendar.continuation_for_the_fucking_khtml_browser();
		}
	};
	Calendar.prototype.setDateFormat = function(a) {
		this.dateFormat = a;
	};
	Calendar.prototype.setTtDateFormat = function(a) {
		this.ttDateFormat = a;
	};
	Calendar.prototype.parseDate = function(b, a) {
		if (!a) {
			a = this.dateFormat;
		}
		this.setDate(Date.parseDate(b, a));
	};
	Calendar.prototype.hideShowCovered = function() {
		if (!Calendar.is_ie && !Calendar.is_opera) { return; }
		function b(k) {
			var i = k.style.visibility;
			if (!i) {
				if (document.defaultView
				        && typeof(document.defaultView.getComputedStyle) == "function") {
					if (!Calendar.is_khtml) {
						i = document.defaultView.getComputedStyle(k, "")
						        .getPropertyValue("visibility");
					} else {
						i = "";
					}
				} else {
					if (k.currentStyle) {
						i = k.currentStyle.visibility;
					} else {
						i = "";
					}
				}
			}
			return i;
		}
		var s = new Array("applet", "iframe", "select");
		var c = this.element;
		var a = Calendar.getAbsolutePos(c);
		var f = a.x;
		var d = c.offsetWidth + f;
		var r = a.y;
		var q = c.offsetHeight + r;
		for (var h = s.length; h > 0;) {
			var g = document.getElementsByTagName(s[--h]);
			var e = null;
			for (var l = g.length; l > 0;) {
				e = g[--l];
				a = Calendar.getAbsolutePos(e);
				var o = a.x;
				var n = e.offsetWidth + o;
				var m = a.y;
				var j = e.offsetHeight + m;
				if (this.hidden || (o > d) || (n < f) || (m > q) || (j < r)) {
					if (!e.__msh_save_visibility) {
						e.__msh_save_visibility = b(e);
					}
					e.style.visibility = e.__msh_save_visibility;
				} else {
					if (!e.__msh_save_visibility) {
						e.__msh_save_visibility = b(e);
					}
				}
			}
		}
	};
	Calendar.prototype._displayWeekdays = function() {
		var b = this.firstDayOfWeek;
		var a = this.firstdayname;
		var d = Calendar._TT.WEEKEND;
		for (var c = 0; c < 7; ++c) {
			a.className = "day name";
			var e = (c + b) % 7;
			if (c) {
				a.ttip = Calendar._TT.DAY_FIRST.replace("%s", Calendar._DN[e]);
				a.navtype = 100;
				a.calendar = this;
				a.fdow = e;
				Calendar._add_evs(a);
			}
			if (d.indexOf(e.toString()) != -1) {
				Calendar.addClass(a, "weekend");
			}
			a.innerHTML = Calendar._SDN[(c + b) % 7];
			a = a.nextSibling;
		}
	};
	Calendar.prototype._hideCombos = function() {
		this.monthsCombo.style.display = "none";
		this.yearsCombo.style.display = "none";
	};
	Calendar.prototype._dragStart = function(ev) {
		if (this.dragging) { return; }
		this.dragging = true;
		var posX;
		var posY;
		if (Calendar.is_ie) {
			posY = window.event.clientY + document.body.scrollTop;
			posX = window.event.clientX + document.body.scrollLeft;
		} else {
			posY = ev.clientY + window.scrollY;
			posX = ev.clientX + window.scrollX;
		}
		var st = this.element.style;
		this.xOffs = posX - parseInt(st.left);
		this.yOffs = posY - parseInt(st.top);
		with (Calendar) {
			addEvent(document, "mousemove", calDragIt);
			addEvent(document, "mouseup", calDragEnd);
		}
	};
	Date._MD = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
	Date.SECOND = 1000;
	Date.MINUTE = 60 * Date.SECOND;
	Date.HOUR = 60 * Date.MINUTE;
	Date.DAY = 24 * Date.HOUR;
	Date.WEEK = 7 * Date.DAY;
	Date.parseDate = function(n, c) {
		var o = new Date();
		var p = 0;
		var e = -1;
		var l = 0;
		var r = n.split(/\W+/);
		var q = c.match(/%./g);
		var h = 0,
			g = 0;
		var s = 0;
		var f = 0;
		var k = 0;
		for (h = 0; h < r.length; ++h) {
			if (!r[h]) {
				continue;
			}
			switch (q[h]) {
				case "%d" :
				case "%e" :
					l = parseInt(r[h], 10);
					break;
				case "%m" :
					e = parseInt(r[h], 10) - 1;
					break;
				case "%Y" :
				case "%y" :
					p = parseInt(r[h], 10);
					(p < 100) && (p += (p > 29) ? 1900 : 2000);
					break;
				case "%b" :
				case "%B" :
					for (g = 0; g < 12; ++g) {
						if (Calendar._MN[g].substr(0, r[h].length).toLowerCase() == r[h]
						        .toLowerCase()) {
							e = g;
							break;
						}
					}
					break;
				case "%H" :
				case "%I" :
				case "%k" :
				case "%l" :
					s = parseInt(r[h], 10);
					break;
				case "%P" :
				case "%p" :
					if (/pm/i.test(r[h]) && s < 12) {
						s += 12;
					} else {
						if (/am/i.test(r[h]) && s >= 12) {
							s -= 12;
						}
					}
					break;
				case "%M" :
					f = parseInt(r[h], 10);
				case "%S" :
				case "%s" :
					k = parseInt(r[h], 10);
					break;
			}
		}
		if (isNaN(p)) {
			p = o.getFullYear();
		}
		if (isNaN(e)) {
			e = o.getMonth();
		}
		if (isNaN(l)) {
			l = o.getDate();
		}
		if (isNaN(s)) {
			s = o.getHours();
		}
		if (isNaN(f)) {
			f = o.getMinutes();
		}
		if (isNaN(k)) {
			k = o.getSeconds();
		}
		if (p != 0 && e != -1 && l != 0) { return new Date(p, e, l, s, f, k); }
		p = 0;
		e = -1;
		l = 0;
		for (h = 0; h < r.length; ++h) {
			if (r[h].search(/[a-zA-Z]+/) != -1) {
				var u = -1;
				for (g = 0; g < 12; ++g) {
					if (Calendar._MN[g].substr(0, r[h].length).toLowerCase() == r[h].toLowerCase()) {
						u = g;
						break;
					}
				}
				if (u != -1) {
					if (e != -1) {
						l = e + 1;
					}
					e = u;
				}
			} else {
				if (parseInt(r[h], 10) <= 12 && e == -1) {
					e = r[h] - 1;
				} else {
					if (parseInt(r[h], 10) > 31 && p == 0) {
						p = parseInt(r[h], 10);
						(p < 100) && (p += (p > 29) ? 1900 : 2000);
					} else {
						if (l == 0) {
							l = r[h];
						}
					}
				}
			}
		}
		if (p == 0) {
			p = o.getFullYear();
		}
		if (e != -1 && l != 0) { return new Date(p, e, l, s, f, k); }
		return o;
	};
	Date.prototype.getMonthDays = function(b) {
		var a = this.getFullYear();
		if (typeof b == "undefined") {
			b = this.getMonth();
		}
		if (((0 == (a % 4)) && ((0 != (a % 100)) || (0 == (a % 400)))) && b == 1) {
			return 29;
		} else {
			return Date._MD[b];
		}
	};
	Date.prototype.getDayOfYear = function() {
		var a = new Date(this.getFullYear(), this.getMonth(), this.getDate(), 0, 0, 0);
		var c = new Date(this.getFullYear(), 0, 0, 0, 0, 0);
		var b = a - c;
		return Math.floor(b / Date.DAY);
	};
	Date.prototype.getWeekNumber = function() {
		var e = new Date(this.getFullYear(), this.getMonth(), this.getDate(), 0, 0, 0);
		var c = e.getDay();
		var a = e.valueOf();
		e.setMonth(0);
		var b = 1;
		e.setDate(b);
		while (e.getDay() != c) {
			b = b + 1;
			e.setDate(b);
		}
		return Math.round((a - e.valueOf()) / (7 * 86400000)) + 1;
	};
	Date.prototype.equalsTo = function(a) {
		return ((this.getFullYear() == a.getFullYear()) && (this.getMonth() == a.getMonth())
		        && (this.getDate() == a.getDate()) && (this.getHours() == a.getHours()) && (this
		        .getMinutes() == a.getMinutes()));
	};
	Date.prototype.setDateOnly = function(a) {
		var b = new Date(a);
		this.setDate(1);
		this.setFullYear(b.getFullYear());
		this.setMonth(b.getMonth());
		this.setDate(b.getDate());
	};
	Date.prototype.print = function(l) {
		var b = this.getMonth();
		var k = this.getDate();
		var n = this.getFullYear();
		var p = this.getWeekNumber();
		var q = this.getDay();
		var v = {};
		var r = this.getHours();
		var c = (r >= 12);
		var h = (c) ? (r - 12) : r;
		var u = this.getDayOfYear();
		if (h == 0) {
			h = 12;
		}
		var e = this.getMinutes();
		var j = this.getSeconds();
		v["%a"] = Calendar._SDN[q];
		v["%A"] = Calendar._DN[q];
		v["%b"] = Calendar._SMN[b];
		v["%B"] = Calendar._MN[b];
		v["%C"] = 1 + Math.floor(n / 100);
		v["%d"] = (k < 10) ? ("0" + k) : k;
		v["%e"] = k;
		v["%H"] = (r < 10) ? ("0" + r) : r;
		v["%I"] = (h < 10) ? ("0" + h) : h;
		v["%j"] = (u < 100) ? ((u < 10) ? ("00" + u) : ("0" + u)) : u;
		v["%k"] = r;
		v["%l"] = h;
		v["%m"] = (b < 9) ? ("0" + (1 + b)) : (1 + b);
		v["%M"] = (e < 10) ? ("0" + e) : e;
		v["%n"] = "\n";
		v["%p"] = c ? "PM" : "AM";
		v["%P"] = c ? "pm" : "am";
		v["%s"] = Math.floor(this.getTime() / 1000);
		v["%S"] = (j < 10) ? ("0" + j) : j;
		v["%t"] = "\t";
		v["%U"] = v["%W"] = v["%V"] = (p < 10) ? ("0" + p) : p;
		v["%u"] = q + 1;
		v["%w"] = q;
		v["%y"] = ("" + n).substr(2, 2);
		v["%Y"] = n;
		v["%%"] = "%";
		var t = /%./g;
		if (!Calendar.is_ie5 && !Calendar.is_khtml) { return l.replace(t, function(a) {
			        return v[a] || a;
		        }); }
		var o = l.match(t);
		for (var g = 0; g < o.length; g++) {
			var f = v[o[g]];
			if (f) {
				t = new RegExp(o[g], "g");
				l = l.replace(t, f);
			}
		}
		return l;
	};
	Date.prototype.__msh_oldSetFullYear = Date.prototype.setFullYear;
	Date.prototype.setFullYear = function(b) {
		var a = new Date(this);
		a.__msh_oldSetFullYear(b);
		if (a.getMonth() != this.getMonth()) {
			this.setDate(28);
		}
		this.__msh_oldSetFullYear(b);
	};
	window._dynarch_popupCalendar = null;
	Calendar._DN = new Array(RIA_I18N.form.calendar.full_Sunday,
	        RIA_I18N.form.calendar.full_Monday, RIA_I18N.form.calendar.full_Tuesday,
	        RIA_I18N.form.calendar.full_Wednesday, RIA_I18N.form.calendar.full_Thursday,
	        RIA_I18N.form.calendar.full_Firday, RIA_I18N.form.calendar.full_Saturday,
	        RIA_I18N.form.calendar.full_Sunday);
	Calendar._SDN = new Array(RIA_I18N.form.calendar.short_Sunday,
	        RIA_I18N.form.calendar.short_Monday, RIA_I18N.form.calendar.short_Tuesday,
	        RIA_I18N.form.calendar.short_Wednesday, RIA_I18N.form.calendar.short_Thursday,
	        RIA_I18N.form.calendar.short_Firday, RIA_I18N.form.calendar.short_Saturday,
	        RIA_I18N.form.calendar.short_Sunday);
	Calendar._MN = new Array(RIA_I18N.form.calendar.full_January,
	        RIA_I18N.form.calendar.full_February, RIA_I18N.form.calendar.full_March,
	        RIA_I18N.form.calendar.full_April, RIA_I18N.form.calendar.full_May,
	        RIA_I18N.form.calendar.full_June, RIA_I18N.form.calendar.full_July,
	        RIA_I18N.form.calendar.full_August, RIA_I18N.form.calendar.full_September,
	        RIA_I18N.form.calendar.full_October, RIA_I18N.form.calendar.full_November,
	        RIA_I18N.form.calendar.full_December);
	Calendar._SMN = new Array(RIA_I18N.form.calendar.short_January,
	        RIA_I18N.form.calendar.short_February, RIA_I18N.form.calendar.short_March,
	        RIA_I18N.form.calendar.short_April, RIA_I18N.form.calendar.short_May,
	        RIA_I18N.form.calendar.short_June, RIA_I18N.form.calendar.short_July,
	        RIA_I18N.form.calendar.short_August, RIA_I18N.form.calendar.short_September,
	        RIA_I18N.form.calendar.short_October, RIA_I18N.form.calendar.short_November,
	        RIA_I18N.form.calendar.short_December);
	Calendar._TT = {};
	Calendar._TT.INFO = RIA_I18N.form.calendar.about;
	Calendar._TT.ABOUT = "   DHTML \u65e5\u8d77/\u65f6\u95f4\u9009\u62e9\u63a7\u4ef6\n(c) dynarch.com 2002-2005 / Author: Mihai Bazon\nFor latest version visit: \u6700\u65b0\u7248\u672c\u8bf7\u767b\u9646http://www.dynarch.com/projects/calendar/\u5bdf\u770b\n\u9075\u5faaGNU LGPL.  \u7ec6\u8282\u53c2\u9605 http://gnu.org/licenses/lgpl.html\n\n\u65e5\u671f\u9009\u62e9:\n- \u70b9\u51fb\xab(\xbb)\u6309\u94ae\u9009\u62e9\u4e0a(\u4e0b)\u4e00\u5e74\u5ea6.\n- \u70b9\u51fb"
	        + String.fromCharCode(8249)
	        + "("
	        + String.fromCharCode(8250)
	        + ")\u6309\u94ae\u9009\u62e9\u4e0a(\u4e0b)\u4e2a\u6708\u4efd.\n- \u957f\u65f6\u95f4\u6309\u7740\u6309\u94ae\u5c06\u51fa\u73b0\u66f4\u591a\u9009\u62e9\u9879.";
	Calendar._TT.ABOUT_TIME = "\n\n\u65f6\u95f4\u9009\u62e9:\n-\u5728\u65f6\u95f4\u90e8\u5206(\u5206\u6216\u8005\u79d2)\u4e0a\u5355\u51fb\u9f20\u6807\u5de6\u952e\u6765\u589e\u52a0\u5f53\u524d\u65f6\u95f4\u90e8\u5206(\u5206\u6216\u8005\u79d2)\n-\u5728\u65f6\u95f4\u90e8\u5206(\u5206\u6216\u8005\u79d2)\u4e0a\u6309\u4f4fShift\u952e\u540e\u5355\u51fb\u9f20\u6807\u5de6\u952e\u6765\u51cf\u5c11\u5f53\u524d\u65f6\u95f4\u90e8\u5206(\u5206\u6216\u8005\u79d2).";
	Calendar._TT.PREV_YEAR = RIA_I18N.form.calendar.prev_year;
	Calendar._TT.PREV_MONTH = RIA_I18N.form.calendar.prev_month;
	Calendar._TT.GO_TODAY = RIA_I18N.form.calendar.go_today;
	Calendar._TT.NEXT_MONTH = RIA_I18N.form.calendar.next_month;
	Calendar._TT.NEXT_YEAR = RIA_I18N.form.calendar.next_year;
	Calendar._TT.SEL_DATE = RIA_I18N.form.calendar.sel_date;
	Calendar._TT.DRAG_TO_MOVE = RIA_I18N.form.calendar.drag_to_move;
	Calendar._TT.PART_TODAY = RIA_I18N.form.calendar.part_today;
	Calendar._TT.DAY_FIRST = RIA_I18N.form.calendar.day_first;
	Calendar._TT.WEEKEND = "0,6";
	Calendar._TT.CLOSE = RIA_I18N.form.calendar.close;
	Calendar._TT.TODAY = RIA_I18N.form.calendar.today;
	Calendar._TT.TIME_PART = RIA_I18N.form.calendar.time_part;
	Calendar._TT.DEF_DATE_FORMAT = RIA_I18N.form.calendar.def_date_format;
	Calendar._TT.TT_DATE_FORMAT = RIA_I18N.form.calendar.tt_date_format;
	Calendar._TT.WK = RIA_I18N.form.calendar.wk;
	Calendar._TT.TIME = RIA_I18N.form.calendar.time;
}
/* /unieap/ria3.3/unieap/form/Cascade.js */
dojo.provide("unieap.form.Cascade");
dojo.declare("unieap.form.Cascade", null, {
	        constructor : function(a) {
		        dojo.mixin(this, a);
		        this._registerCascade();
	        },
	        primary : "",
	        filterAttr : "FILTER",
	        defaultSelect : true,
	        filterNull : "all",
	        cascade : function(e) {
		        if (dojo.global.ComboBoxCascadeMap) {
			        var f = dojo.global.ComboBoxCascadeMap;
			        var d = this.widget.id;
			        if (f[d]) {
				        if (e) {
					        this._cascadeSecond(e);
				        } else {
					        var b = f[d];
					        for (var a = 0, c = b.length; a < c; a++) {
						        this._cascadeSecond(b[a]);
					        }
				        }
			        }
		        }
	        },
	        _cascadeSecond : function(e) {
		        var b = dijit.byId(e);
		        if (b) {
			        var a = this.widget.getDataProvider().getSelectedItems();
			        var f = (a && a.length > 0 ? a[0] : null) || null;
			        var g = this.widget.getValue();
			        var d = {};
			        d[b.getCascade().filterAttr] = g;
			        var c = this.widget.getDecoder().valueAttr;
			        var h = b.getCascade().getCascadeStore;
			        if (h) {
				        b.getDataProvider().setDataStore(h(f && f[c]));
				        b.getDataFilter().setCascadeFilter(null);
			        } else {
				        b.getDataFilter().setCascadeFilter(d, b.getCascade().defaultSelect,
				                b.getCascade().filterNull);
				        g != null && b.getValidator().handleError(true);
			        }
		        }
	        },
	        getCascadeStore : null,
	        _registerCascade : function() {
		        if (this.primary) {
			        var b = this.widget;
			        var a = this.primary;
			        if (!dojo.global) {
				        dojo.global = {};
			        }
			        if (!dojo.global.ComboBoxCascadeMap) {
				        dojo.global.ComboBoxCascadeMap = {};
			        }
			        if (!dojo.global.ComboBoxCascadeMap[a]) {
				        dojo.global.ComboBoxCascadeMap[a] = [];
			        }
			        dojo.global.ComboBoxCascadeMap[a].push(b.id);
		        }
	        },
	        _notifyFilterMe : function() {
		        if (this.primary) {
			        var a = dijit.byId(this.primary);
			        a && a.getCascade().cascade(this.widget.id);
		        }
	        }
        });
/* /unieap/ria3.3/unieap/form/CheckBox.js */
dojo.provide("unieap.form.CheckBox");
dojo.require("unieap.form.BaseButton");
dojo.declare("unieap.form.CheckBox", unieap.form.BaseButton, {
	UserInterfaces : dojo.mixin({
		        checked : "boolean",
		        checkedValue : "string",
		        uncheckedValue : "string",
		        onBeforeClick : "function",
		        onBeforeChange : "function",
		        onChange : "function"
	        }, unieap.form.BaseButton.prototype.UserInterfaces),
	checked : false,
	checkedValue : "1",
	uncheckedValue : "0",
	templateString : '<div class="u-form-chk" ><div dojoAttachPoint="modifiedNode" class="u-form-modified"></div><input type="checkbox" class="u-form-chkInput" name="${name}" dojoAttachPoint="inputNode,focusNode" onfocus="unieap.fep&&unieap.fep(this)"/></div>',
	name : "chkBox",
	postMixInProperties : function() {
		this.inherited(arguments);
		this.checked && (this.value = this.checkedValue);
	},
	_postCreate : function() {
		this.inputNode.checked = this.checked;
		this.inputNode.value = this.checkedValue;
	},
	onBeforeClick : function() {
		return true;
	},
	onBeforeChange : function() {
		return true;
	},
	_onButtonClick : function(a) {
		if (!this.onBeforeClick() || !this.onBeforeChange()) {
			dojo.stopEvent(a);
			return;
		}
		this.setChecked(!this.checked);
		this.onClick(a);
		this._onChange();
	},
	_onChange : function() {
		this.onChange(this.checked);
		this.fireDataChange();
	},
	setChecked : function(a) {
		this.inputNode.checked = a;
		if (a == this.checked) { return; }
		this.checked = a;
		this.fireDataChange();
	},
	isChecked : function() {
		return this.inputNode.checked;
	},
	onChange : function(a) {},
	setValue : function(a) {
		if (String(a) == String(this.checkedValue)) {
			this.setChecked(true);
		} else {
			this.setChecked(false);
		}
		this.fireDataChange();
	},
	getValue : function() {
		return this.inputNode.checked ? this.checkedValue : this.uncheckedValue;
	},
	getCheckedValue : function() {
		return this.checkedValue;
	},
	getUncheckedValue : function() {
		return this.uncheckedValue;
	},
	setCheckedOption : function(a, b) {
		this.checkedValue = a;
		this.uncheckedValue = b;
		this.inputNode.value = this.checkedValue;
	}
});
/* /unieap/ria3.3/unieap/form/CheckBoxGroup.js */
dojo.provide("unieap.form.CheckBoxGroup");
dojo.require("unieap.form.CheckGroup");
dojo.require("unieap.form.CheckBox");
dojo.declare("unieap.form.CheckBoxGroup", unieap.form.CheckGroup, {
	        UserInterfaces : dojo.mixin({
		                separator : "string"
	                }, unieap.form.CheckGroup.prototype.UserInterfaces),
	        separator : ",",
	        postCreate : function() {
		        this.inherited(arguments);
		        this._attachTab();
	        },
	        _attachTab : function() {
		        if (this.checkboxMap.length > 0) {
			        var a = this.getCheckBox(this.checkboxMap.length - 1);
			        dojo.connect(a, "onTab", this, "onTab");
		        }
	        },
	        getCheckBox : function(f) {
		        if (this.checkboxMap[f]) { return this.checkboxMap[f]; }
		        var e = this.getDataProvider();
		        var a = this.getDecoder().getValueAttr();
		        var b = this;
		        var d = {
			        checkedValue : e.getItemValue(a, f),
			        name : this.name || this.id,
			        onChange : function() {
				        b.getValidator().validate();
				        b.onChange(b.getValue());
				        b.fireDataChange();
			        }
		        };
		        var c = new unieap.form.CheckBox(d);
		        dojo.style(c.modifiedNode, "display", "none");
		        this.checkboxMap[f] = c;
		        return c;
	        },
	        setValue : function(d) {
		        d = (d != null ? String(d) : "").split(this.separator);
		        var c = unieap.convertArrayToMap(d);
		        var e = this.checkboxMap;
		        for (var b = 0, a = e.length; b < a; b++) {
			        e[b].setChecked(false);
			        if (c[e[b].getCheckedValue()]) {
				        e[b].setValue(e[b].getCheckedValue());
			        }
		        }
		        this.getValidator().validate();
		        this.fireDataChange();
	        },
	        getValue : function() {
		        var c = this.checkboxMap;
		        var b = [];
		        for (var a = 0; a < c.length; a++) {
			        if (c[a].checked) {
				        b.push(c[a].getCheckedValue());
			        }
		        }
		        return b.join(this.separator);
	        },
	        getText : function() {
		        var c = this.checkboxMap;
		        var b = [];
		        for (var a = 0; a < c.length; a++) {
			        if (c[a].checked) {
				        b.push(this.getLabel(a));
			        }
		        }
		        return b.join(this.separator);
	        },
	        setChecked : function(b, a) {
		        if (!dojo.isArray(a)) { return; }
		        for (var c = 0; c < a.length; c++) {
			        var d = this.checkboxMap[a[c]];
			        d.setChecked(b);
		        }
		        this.fireDataChange();
	        },
	        checkReverse : function() {
		        var c = this.checkboxMap;
		        for (var a = 0; a < c.length; a++) {
			        var b = c[a];
			        b.setChecked(!b.checked);
		        }
		        this.fireDataChange();
	        },
	        setNextFocusId : function(b) {
		        if (this.checkboxMap.length == 0) {
			        this.nextFocusId = b;
		        } else {
			        this.nextFocusId = this.checkboxMap[0].id;
			        for (var a = 0; a < this.checkboxMap.length; a++) {
				        if (a != (this.checkboxMap.length - 1)) {
					        this.checkboxMap[a].setNextFocusId(this.checkboxMap[a + 1].id);
				        } else {
					        this.checkboxMap[a].setNextFocusId(b);
				        }
			        }
		        }
	        }
        });
/* /unieap/ria3.3/unieap/form/CheckGroupProvider.js */
dojo.provide("unieap.form.CheckGroupProvider");
dojo.require("unieap.util.util");
dojo.declare("unieap.form.CheckGroupProvider", null, {
	        store : null,
	        constructor : function(a) {
		        dojo.mixin(this, a);
		        this.store = unieap.getDataStore(this.store, null, true);
	        },
	        getDataStore : function() {
		        return this.store;
	        },
	        setDataStore : function(a) {
		        this.store = unieap.getDataStore(a, null, true);
		        this.widget.setLayout(this.store);
	        },
	        getItemValue : function(a, b) {
		        return this.store.getRowSet().getItemValue(b, a);
	        }
        });
/* /unieap/ria3.3/unieap/form/ComboBox.js */
dojo.provide("unieap.form.ComboBox");
dojo.require("unieap.form.TextBoxWithIcon");
dojo.declare("unieap.form.ComboBox", unieap.form.TextBoxWithIcon, {
	        UserInterfaces : dojo.mixin({
		                dataProvider : "object",
		                separator : "string",
		                decoder : "object",
		                dataFilter : "object",
		                autoCompleter : "object",
		                cascade : "object",
		                hasDefault : "boolean",
		                focusOffset : "number",
		                popup : "object",
		                defaultText : "string",
		                dataType : "boolean",
		                textValidate : "boolean",
		                comboShowSelect : "boolean",
		                comboShowSelectValue : "string",
		                comboShowSelectText : "string"
	                }, unieap.form.TextBoxWithIcon.prototype.UserInterfaces),
	        dataProvider : null,
	        decoder : null,
	        dataFilter : null,
	        cascade : null,
	        autoCompleter : null,
	        popup : null,
	        popupClass : "unieap.form.ComboBoxPopup",
	        separator : ",",
	        dataType : "",
	        hasDefault : false,
	        textValidate : unieap.widget.form.textValidate,
	        defaultText : "",
	        comboShowSelect : null,
	        values : [],
	        _keyPressed : false,
	        comboShowSelectValue : unieap.widget.form.comboShowSelectValue || "",
	        comboShowSelectText : "",
	        getDataProvider : function() {
		        return unieap.getModuleInstance(this, "dataProvider",
		                "unieap.form.ComboBoxDataProvider");
	        },
	        getDecoder : function() {
		        return unieap.getModuleInstance(this, "decoder", "unieap.form.ComboBoxDecoder");
	        },
	        getDataFilter : function() {
		        return unieap.getModuleInstance(this, "dataFilter",
		                "unieap.form.ComboBoxDataFilter");
	        },
	        getCascade : function() {
		        return unieap.getModuleInstance(this, "cascade", "unieap.form.Cascade");
	        },
	        getAutoCompleter : function() {
		        return unieap.getModuleInstance(this, "autoCompleter", "unieap.form.AutoCompleter");
	        },
	        postMixInProperties : function() {
		        if (this.dataProvider && this.dataProvider.staticData) {
			        this._staticNode = dojo.clone(this.srcNodeRef);
		        }
	        },
	        postCreate : function() {
		        this.inherited(arguments);
		        this.getCascade();
		        if (this.hasDefault) {
			        var a = this.getDataProvider().getItems();
			        if (a.length > 0) {
				        this.setValue(this.getDecoder().code(a[0]));
			        }
		        }
	        },
	        setValue : function(a) {
		        if (a === "" || a === undefined) {
			        a = null;
		        }
		        this.dataType = this.dataType
		                || (this.getBinding() && this.getBinding().getDataType());
		        if (this.textValidate && !this._validateValue(a)) {
			        this._updateText();
			        this.getValidator().validate();
			        return;
		        }
		        if (!this._validateChange(a)) {
			        this._updateText();
			        this.getValidator().validate();
			        return;
		        }
		        this._changeValue(a);
		        this.getValidator().validate();
		        if (this.getPopup().isOpen()) {
			        setTimeout(dojo.hitch(this, function() {
				                        var b = this.getDataProvider().getItems();
				                        this.getPopup().open(b, this._getSelectedItems(b),
				                                this._onPopupClose);
			                        }), 0);
		        }
	        },
	        getValue : function() {
		        if (this.dataType == "boolean") {
			        if (this.values.length == 1 && this.values[0] == "true") {
				        return true;
			        } else {
				        if (this.values.length == 1 && this.values[0] == "false") { return false; }
			        }
		        }
		        return (this.values == null || this.values.length == 0) ? null : this.values
		                .join(this.separator);
	        },
	        setText : function(a) {
		        if (a == null) {
			        a = "";
		        }
		        this.inputNode.value = a;
	        },
	        getText : function() {
		        return this.inputNode.value;
	        },
	        getLoseItem : function(b) {
		        var a = {};
		        a[this.getDecoder().valueAttr] = b;
		        a[this.getDecoder().displayAttr] = b;
		        return a;
	        },
	        setSeparator : function(a) {
		        this.separator = a;
	        },
	        setSelectedItems : function(c) {
		        if (dojo.isArray(c)) {
			        var h = this.getDecoder();
			        var b = [];
			        var g = this.getDataProvider().getItems();
			        for (var f = 0; f < c.length; f++) {
				        for (var e = 0; e < g.length; e++) {
					        if (c[f] != g[e]) {
						        continue;
					        }
					        var a = h.code(c[f]);
					        b.push(a);
					        break;
				        }
			        }
			        this.setValue(b.join(this.separator));
		        }
	        },
	        setSelectedIndex : function(b) {
		        if (dojo.isArray) {
			        var a = this.getDataProvider().getItems();
			        var d = [];
			        for (var c in b) {
				        if (typeof b[c] == "number") {
					        d.push(a[b[c]]);
				        }
			        }
			        this.setSelectedItems(d);
		        }
	        },
	        _getSelectedItems : function(a) {
		        if (a == null) {
			        a = this.getDataProvider().getItems();
		        }
		        if (!(dojo.isArray(a) && dojo.isArray(this.values))) { return []; }
		        var e = [];
		        var f = this.getDecoder();
		        for (var c = 0; c < a.length; c++) {
			        for (var b = 0; b < this.values.length; b++) {
				        if (f.code(a[c]) == this.values[b]) {
					        e.push(a[c]);
					        break;
				        }
			        }
		        }
		        return e;
	        },
	        _changeValue : function(a) {
		        this.values = a == null ? [] : a.toString().split(this.separator);
		        this.getDataProvider()._checkLoseItems(this.values);
		        this._updateText();
		        this.fireDataChange();
		        this.getCascade().cascade();
	        },
	        _updateText : function() {
		        if (this.values == null || this.values.length == 0) {
			        this.setText("");
			        return;
		        }
		        var b = this.getDataProvider().getItems();
		        if (b == null) {
			        this.setText(this.values.join(this.separator));
			        return;
		        }
		        var g = [];
		        var f = this.getDecoder();
		        for (var e = 0; e < this.values.length; e++) {
			        var a = this.values[e];
			        for (var c = 0; c < b.length; c++) {
				        if (a == f.code(b[c])) {
					        a = f.decode(b[c]);
					        break;
				        }
			        }
			        g.push(a);
		        }
		        this.setText(g.join(this.separator));
	        },
	        _onIconClick : function(b) {
		        if (!this.disabled && this.onBeforeIconClick(b)) {
			        this.onIconClick(b);
			        var a = this.getPopup();
			        if (a.isOpen()) {
				        a.close();
			        } else {
				        var c = this.getDataProvider().getItems();
				        if (c.length && c.length > 0) {
					        a.open(c, this._getSelectedItems(c), this._onPopupClose);
				        }
			        }
			        this._keyPressed = true;
		        }
	        },
	        _onFocus : function(a) {
		        if (!a || typeof(a) == "string") { return; }
		        this.inherited(arguments);
		        this._keyPressed = false;
	        },
	        _onChange : function(a) {
		        var b = this.inputNode.value;
		        if (b == "") {
			        b = null;
		        }
		        if (this.textValidate && !this._validateValue(b)) {
			        this._updateText();
			        return;
		        }
		        if (!this._validateChange(b)) {
			        this._updateText();
			        return;
		        }
		        this._changeValue(b);
		        if (this.getPopup().isOpen()) {
			        this.getPopup()._updateSelection();
		        }
		        this.onChange(b);
	        },
	        _onClick : function(a) {
		        if (this.disabled || !this.onBeforeClick()) { return; }
		        if (this.getPopup().isOpen()) {
			        this.getPopup().close();
		        } else {
			        var b = this.getDataProvider().getItems();
			        if (b.length && b.length > 0) {
				        this.getPopup().open(b, this._getSelectedItems(b), this._onPopupClose);
			        }
		        }
		        this.onClick(a);
		        this._keyPressed = true;
	        },
	        _onPopupClose : function(c) {
		        if (c == null || !dojo.isArray(c) || c.length == 0) {
			        if (this._validateChange(null)) {
				        this._changeValue(null);
				        this.onChange();
			        } else {
				        this._updateText();
			        }
			        return;
		        }
		        var a = [],
			        e = this.getDecoder();
		        for (var b = 0; b < c.length; b++) {
			        a.push(e.code(c[b]));
		        }
		        var d = a.join(this.separator);
		        if (this._validateChange(d)) {
			        this._changeValue(d);
			        this.onChange(d);
		        } else {
			        this._updateText();
		        }
	        },
	        _validateChange : function(c) {
		        if (c == null) { return !(this.values == null || this.values.length == 0); }
		        var a = c.toString().split(this.separator);
		        if (this.values == null && a.length > 0) { return true; }
		        if (a.length != this.values.length) { return true; }
		        for (var b = 0; b < a.length; b++) {
			        if (this.values[b] != a[b]) { return true; }
		        }
		        return false;
	        },
	        _onKeyUp : function(a) {
		        var d = this._interestInKeyCode(a);
		        if (d && this.autoCompleter) {
			        !this.dataProvider && (this.dataProvider = {});
			        if (!this.dataProvider.declaredClass) {
				        var c = new unieap.ds.DataStore();
				        this.dataProvider.store = c;
				        this.getDataProvider().setDataStore(c);
			        }
			        this._job(this.getAutoCompleter(), "_handleKeyUp");
		        }
		        this.inherited(arguments);
		        if (d) {
			        if (!this._keyPressed) {
				        this.getPopup().open();
			        } else {
				        var b = this.getDataProvider().getItems(this.getText());
				        if (dojo.isArray(b) && b.length > 0) {
					        this.getPopup().open(b, [], this._onPopupClose);
				        } else {
					        if (this.getPopup().isOpen()) {
						        this.getPopup().close(function() {});
					        }
				        }
			        }
		        }
	        },
	        _onKeyDown : function(a) {
		        this.getPopup()._handleKeyDown(a);
		        this.inherited(arguments);
		        this._keyPressed = true;
	        },
	        _onBlur : function(a) {
		        if (this._interestInBlur(a)) {
			        this._keyPressed = false;
			        this.getPopup()._inmousedown = false;
		        }
		        this.inherited("_onBlur", arguments);
	        },
	        _interestInKeyCode : function(a) {
		        var b = a.keyCode;
		        return !((b < 2 && b != dojo.keys.BACKSPACE) || (b >= 33 && b <= 46)
		                || (b >= 112 && b <= 123) || (a.ctrlKey && b == 65));
	        },
	        _interestInBlur : function(a) {
		        if (this.getPopup()._inmousedown) { return false; }
		        return this.inherited(arguments);
	        },
	        _validateValue : function(h) {
		        if (h == null) { return true; }
		        var b = this.getDataProvider().getItems();
		        var g = h.toString().split(this.separator);
		        var f = this.getDecoder().valueAttr;
		        if ((!dojo.isArray(b) || b.length == 0) && g.length > 0) { return false; }
		        if (g.length > b.length) { return false; }
		        for (var e = 0; e < g.length; e++) {
			        var d = false,
				        a = g[e];
			        for (var c = 0; c < b.length; c++) {
				        if (a == b[c][f]) {
					        d = true;
					        break;
				        }
			        }
			        if (!d) { return false; }
		        }
		        return true;
	        }
        });
/* /unieap/ria3.3/unieap/form/ComboBoxDataFilter.js */
dojo.provide("unieap.form.ComboBoxDataFilter");
dojo.declare("unieap.form.ComboBoxDataFilter", null, {
	        constructor : function(b) {
		        dojo.mixin(this, b);
		        if (!this.searchAttr) {
			        var a = this.widget.getDecoder();
			        this.searchAttr = [];
			        this.searchAttr.push(a.displayAttr);
			        this.searchAttr.push(a.valueAttr);
		        }
	        },
	        searchAttr : null,
	        ignoreCase : true,
	        relation : "||",
	        filter : null,
	        filterMode : "include",
	        spellAttr : "",
	        filterNull : "all",
	        order : "",
	        setFilter : function(a) {
		        this.filter = a;
	        },
	        setCascadeFilter : function(d, e, c) {
		        this.filterNull = c;
		        var a;
		        this.cascadeFilter = d;
		        if (arguments.length >= 2) {
			        a = e;
		        } else {
			        a = this.widget.getCascade().defaultSelect;
		        }
		        if (a) {
			        var b = this.widget.getDataProvider().getItems();
			        if (b.length > 0) {
				        this.widget.setValue(this.widget.getDecoder().code(b[0]));
				        return;
			        }
		        }
		        this.widget.setValue(null);
	        },
	        doFilter : function(b, c, f, d) {
		        var c = c || this.filter;
		        var f = f || this.filterMode;
		        var d = d || this.relation;
		        var a = this.ignoreCase;
		        var e = function(j) {
			        var l = [];
			        var k = {};
			        if (typeof c == "function") {
				        var h = !!c.call(this.widget, j);
				        l.push(h);
			        } else {
				        for (k in c) {
					        var h = false;
					        if (c[k] === null && this.filterNull == "all") {
						        h = true;
					        } else {
						        if (c[k] === null && this.filterNull == "none") {
							        h = false;
						        } else {
							        if (typeof c[k] == "object") {
								        var g = null;
								        g = new RegExp(c[k]);
								        h = j[k].toString().match(g) ? true : false;
							        } else {
								        if (typeof c[k] == "string" || typeof c[k] == "number") {
									        var i = c[k].toString().split("|");
									        h = dojo.some(i, function(m) {
										                if (a) {
											                return m.toLowerCase() == (j[k] || "")
											                        .toString().toLowerCase();
										                } else {
											                return m == (j[k] || "").toString();
										                }
									                });
								        } else {
									        if (typeof c[k] == "function") {
										        if (c[k].call) {
											        h = !!c[k].call(this.widget, j[k], j);
										        } else {
											        var g = null;
											        g = new RegExp(c[k]);
											        h = j[k].toString().match(g) ? true : false;
										        }
									        }
								        }
							        }
						        }
					        }
					        l.push(h);
				        }
			        }
			        if (l.length > 0) {
				        var h;
				        if (d == "&&") {
					        h = dojo.every(l, function(m) {
						                return m;
					                });
				        } else {
					        h = dojo.some(l, function(m) {
						                return m;
					                });
				        }
				        return f == "include" ? h : !h;
			        } else {
				        return true;
			        }
		        };
		        var b = dojo.filter(b, dojo.hitch(this, e));
		        return b;
	        }
        });
/* /unieap/ria3.3/unieap/form/ComboBoxDataProvider.js */
dojo.provide("unieap.form.ComboBoxDataProvider");
dojo.declare("unieap.form.ComboBoxDataProvider", null, {
	        store : null,
	        parameters : {},
	        customItem : null,
	        items : null,
	        _currentItems : null,
	        _loseItems : null,
	        dataType : "",
	        staticData : false,
	        constructor : function(a) {
		        dojo.mixin(this, a);
		        this.setDataStore(this.store);
	        },
	        loadStore : function(a, b) {
		        return null;
	        },
	        setDataStore : function(a) {
		        var b = unieap.getDataStore(a, null, true);
		        if (!b) {
			        b = this.loadStore(a, this.parameters);
		        }
		        if (!b) {
			        dojo.require("unieap.rpc");
			        b = unieap.Action.getCodeList(a);
		        }
		        this.store = b;
		        this._loadItems(this.store);
	        },
	        getDataStore : function() {
		        return this.store;
	        },
	        getItems : function(n, j) {
		        var m = this.items;
		        if (this._loseItems != null && dojo.isArray(this._loseItems)) {
			        m = m.concat(this._loseItems);
		        }
		        var d = this.widget.getDecoder();
		        var b = this.widget.getDataFilter();
		        if (b.spellAttr) {
			        m = this._createSpellCols(m, b, d.displayAttr, b.spellAttr);
		        }
		        if (b.cascadeFilter) {
			        m = b.doFilter(m, b.cascadeFilter, "include", "||");
		        }
		        m = b.doFilter(m);
		        if (n && dojo.trim(n) !== "") {
			        if (j) {
				        var g = n.split(this.widget.separator);
				        n = g.join("|");
			        }
			        var c = null;
			        try {
				        c = b.ignoreCase ? new RegExp("^.*" + n + ".*$", "i") : new RegExp("^.*"
				                + n + ".*$");
			        }
			        catch (k) {
				        c = b.ignoreCase ? new RegExp("^.*$", "i") : new RegExp("^.*$");
			        }
			        var a = {};
			        if (b.searchAttr) {
				        b.searchAttr = [].concat(b.searchAttr);
				        for (var h = 0, f = b.searchAttr.length; h < f; h++) {
					        a[b.searchAttr[h]] = c;
				        }
			        }
			        m = b.doFilter(m, a, "include", "||");
		        }
		        this._currentItems = m;
		        return m;
	        },
	        getCurrentItems : function() {
		        return this._currentItems == null ? this.getItems() : this._currentItems;
	        },
	        clearCurrentItems : function() {
		        this._currentItems = null;
	        },
	        clearCacheItems : function() {},
	        getSelectedItems : function() {
		        return this.widget._getSelectedItems();
	        },
	        addItem : function(a) {
		        if (this.items && dojo.isArray(this.items)) {
			        if (dojo.isArray(a)) {
				        this.items = this.items.concat(a);
			        } else {
				        this.items.push(a);
			        }
		        }
	        },
	        setSelectedItems : function(g, e) {
		        if (dojo.isArray(g)) {
			        var c = this.widget.getDecoder();
			        var h = [];
			        var f = this.getItems();
			        for (var b = 0; b < g.length; b++) {
				        for (var a = 0; a < f.length; a++) {
					        if (g[b] != f[a]) {
						        continue;
					        }
					        var k = c.code(g[b]);
					        h.push(k);
					        break;
				        }
			        }
			        if (e === false) {
				        var l = this.widget.getText();
				        this.widget.setValue(h.join(this.widget.separator));
				        this.widget.setText(l);
			        } else {
				        this.widget.setValue(h.join(this.widget.separator));
			        }
		        }
	        },
	        clear : function() {
		        this.widget.setValue("");
	        },
	        _loadItems : function(a) {
		        var c = [];
		        if (a) {
			        try {
				        c = dojo.clone(a.rowSet.getData());
			        }
			        catch (f) {
				        c = [];
			        }
		        }
		        if (this.staticData) {
			        c = [].concat(this._createStaticItems(), c);
		        }
		        if (this.customItem) {
			        c = [].concat(this.customItem, c);
		        }
		        this.items = c;
		        if (this.isComboShowSelect()) {
			        var h = this.widget.comboShowSelectText
			                || unieap.widget.form.comboShowSelectText;
			        var g = this.widget.getDecoder();
			        if (this.items && this.items.length > 0) {
				        var b = {};
				        b[g.valueAttr] = this.widget.comboShowSelectValue;
				        b[g.displayAttr] = h;
				        this.items = [b].concat(this.items);
			        }
		        }
	        },
	        isComboShowSelect : function() {
		        var a = this.widget.comboShowSelect;
		        if (a != null) {
			        return a;
		        } else {
			        dojo.require("unieap.global");
			        return unieap.widget.form.comboShowSelect;
		        }
	        },
	        _checkLoseItems : function(b) {
		        if (b == null || !dojo.isArray(b)) { return; }
		        var e = this.widget.getDecoder(),
			        a = this.items;
		        var c = [];
		        dojo.forEach(b, dojo.hitch(this.widget, function(d) {
			                        var g = null;
			                        for (var f = 0; f < a.length; f++) {
				                        var h = a[f],
					                        j = e.code(h);
				                        this.dataType == "boolean" && (j = String(j));
				                        if (j == d) {
					                        g = h;
					                        break;
				                        }
			                        }
			                        if (g == null) {
				                        c.push(this.getLoseItem.call(this, d));
			                        }
		                        }));
		        this._setLoseItems(c);
	        },
	        _setLoseItems : function(a) {
		        if (a == null || !dojo.isArray(a)) {
			        this._loseItems = null;
			        return;
		        }
		        this._loseItems = a;
	        },
	        _createStaticItems : function() {
		        var b = this.widget._staticNode;
		        var a = [];
		        var c = this.widget.getDecoder();
		        dojo.forEach(b.childNodes, function(d) {
			                if (d && d.tagName == "OPTION") {
				                var e = {};
				                e[c.displayAttr] = d.text;
				                e[c.valueAttr] = d.value;
				                a.push(e);
			                }
		                });
		        return a;
	        },
	        _createSpellCols : function(b, c, d, a) {
		        if (dojo.some(b, function(e) {
			                return e[a] != null;
		                })) { return b; }
		        c.searchAttr = [].concat(c.searchAttr).concat(c.spellAttr);
		        dojo.require("unieap.util.spell");
		        b = dojo.map(b, function(e) {
			                e[a] = unieap.makePy(e[d].toString());
			                return e;
		                });
		        return b;
	        }
        });
/* /unieap/ria3.3/unieap/form/ComboBoxDecoder.js */
dojo.provide("unieap.form.ComboBoxDecoder");
dojo.declare("unieap.form.ComboBoxDecoder", null, {
	        constructor : function(a) {
		        dojo.mixin(this, a);
	        },
	        displayAttr : "CODENAME",
	        valueAttr : "CODEVALUE",
	        code : function(a) {
		        if (a == null) { return null; }
		        return a[this.valueAttr];
	        },
	        decode : function(a) {
		        if (a == null) { return null; }
		        return a[this.displayAttr];
	        }
        });
/* /unieap/ria3.3/unieap/form/ComboBoxPopup.js */
dojo.provide("unieap.form.ComboBoxPopup");
dojo.require("unieap.form.Popup");
dojo.require("unieap.global");
dojo.declare("unieap.form.ComboBoxPopup", unieap.form.Popup, {
	templateString : "<div tabindex='0' class='u-combobox-list' dojoAttachPoint='listNode,popupcontainer,containerNode'><div class='u-combobox-list-header' dojoAttachPoint='listHeaderNode'><table dojoAttachPoint='tableHeaderNode'></table></div><div class='u-combobox-items-container' dojoAttachPoint='listContainerNode'><table dojoAttachPoint='tableBodyNode,focusNode'><tbody></tbody></table></div><div class='u-combobox-list-footer' dojoAttachPoint='listFooterNode'></div><div>",
	height : "auto",
	pageSize : -1,
	displayStyle : unieap.widget.form.comboDisplayStyle,
	structure : null,
	widget : null,
	_selection : null,
	_highlighted : null,
	_callback : null,
	postMixInProperties : function() {
		this.inherited(arguments);
		if (this.displayStyle == "multi") {
			this.structure = this.structure || unieap.widget.form.comboStructure;
			dojo.require("unieap.form.ComboBoxPopupMulti");
			dojo.mixin(this, unieap.form.ComboBoxPopup.multi);
		} else {
			dojo.require("unieap.form.ComboBoxPopupList");
			dojo.mixin(this, unieap.form.ComboBoxPopup.list);
		}
	},
	postCreate : function() {
		this.inherited(arguments);
		if (dojo.isWebKit) {
			this.connect(this.focusNode, "onmousedown", "_onMouseDown");
		} else {
			this.connect(this.focusNode, "onclick", "_onClick");
		}
		this.connect(this.focusNode, "onmouseover", "_onMouseOver");
		this.connect(this.focusNode, "onmouseout", "_onMouseOut");
		this.connect(this.focusNode, "onblur", "_onBlur");
	},
	destroy : function() {
		dojo.query(".u-comboxbox-item", this.tableBodyNode).forEach(dojo.hitch(this, function(a) {
			        dojo.removeAttr(a, "item");
		        }));
		this.inherited(arguments);
	},
	open : function(a, c, d) {
		if (!this.widget._canPopOpen()) { return; }
		if (!dojo.isArray(a)) {
			a = this.widget.getDataProvider().getItems();
			if (!dojo.isArray(a) || a.length == 0) { return; }
		}
		if (this.pageSize == 0) { return; }
		if (this.pageSize > 0) {
			a = a.slice(0, this.pageSize);
		}
		if (c) {
			this._selection = dojo.isArray(c) ? c : [];
		} else {
			this._updateSelection();
		}
		this._callback = d || this.widget._onPopupClose;
		this._highlighted = null;
		if (this.structure == null) {
			this._createStructure();
		}
		this._createPopup(a, this.structure);
		this.inherited(arguments);
		if (!this.animate) {
			dojo.style(this.listContainerNode, "overflowY", "auto");
			if (this._selection && this._selection.length > 0) {
				for (var b = 0; b < this._selection.length; b++) {
					dojo.query(".u-combobox-item", this.tableBodyNode).forEach(dojo.hitch(this,
					        function(e) {
						        if (e.item == this._selection[b]) {
							        this._focusOptionNode(e);
						        }
					        }));
				}
			}
		}
	},
	close : function(a) {
		if (this.isOpen()) {
			this.inherited(arguments);
			if (dojo.isFunction(a)) {
				a.apply(this.widget, [this._selection]);
			} else {
				if (dojo.isFunction(this._callback)) {
					this._callback.apply(this.widget, [this._selection]);
				}
			}
		}
	},
	setStructure : function(a) {
		this.structure = a;
	},
	onAnimateBegin : function() {
		this.inherited(arguments);
		dojo.style(this.domNode, "visibility", "visible");
		dojo.style(this.listContainerNode, "overflowY", "hidden");
	},
	onAnimateEnd : function() {
		this.inherited(arguments);
		if (dojo.isIE) {
			if (this.listContainerNode.offsetHeight < this.tableBodyNode.offsetHeight) {
				dojo.style(this.listContainerNode, "overflowY", "scroll");
			}
		} else {
			dojo.style(this.listContainerNode, "overfolwY", "auto");
		}
	},
	onSelect : function(a, b) {},
	getInnerHTML : function(c, a, d, e, b) {
		if (b) {
			c = c.toString().replace(b, "<strong class='mtach'>$1</strong>");
		}
		return "<span>" + c + "</span>";
	},
	_updateSelection : function(a) {
		var a = this.widget._getSelectedItems();
		this._selection = dojo.isArray(a) ? a : null;
	},
	_createPopup : function(b, a) {},
	_createStructure : function() {
		var a = this.widget.getDecoder();
		if (this.displayStyle == "table") {
			this.structure = {
				rows : [{
					        title : RIA_I18N.form.combobox.codeValue,
					        field : a.valueAttr,
					        width : "30%"
				        }, {
					        title : RIA_I18N.form.combobox.codeName,
					        field : a.displayAttr,
					        width : "70%"
				        }]
			};
		} else {
			this.structure = {
				rows : [{
					        field : a.displayAttr
				        }]
			};
		}
		return this.structure;
	},
	_resetWidgetHW : function() {
		var c = this._getListContainerNodeWidth();
		if (this.animate) {
			dojo.style(this.domNode, "visibility", "hidden");
		}
		dojo.style(this.domNode, "display", "block");
		dojo.style(this.popupcontainer, "height", "");
		dojo.style(this.listContainerNode, "height", "");
		var b = dojo.style(this.widget.domNode, "width");
		if (this.width == "auto" || this.width == "") {
			dojo.style(this.popupcontainer, "width", (c ? (c > b ? c : b) : b) + "px");
		} else {
			dojo.style(this.popupcontainer, "width", this.width);
		}
		this.height = (this.height + "").replace(/[^0-9]/g, "");
		if (this.height && this.domNode.offsetHeight > this.height) {
			dojo.style(this.popupcontainer, "height", this.height + "px");
			var a = this.height - this.listHeaderNode.offsetHeight;
			dojo.style(this.listContainerNode, "height", a + "px");
		}
	},
	_getListContainerNodeWidth : function() {
		var c = document.createElement("div");
		dojo.style(c, {
			        visibility : "hidden",
			        position : "absolute",
			        top : "-100px",
			        left : "-100px"
		        });
		c.appendChild(this.tableBodyNode);
		dojo.doc.body.appendChild(c);
		var a = this.tableBodyNode.offsetWidth;
		this.listContainerNode.appendChild(this.tableBodyNode);
		c.appendChild(this.tableHeaderNode);
		var b = this.tableHeaderNode.offsetWidth;
		this.listHeaderNode.appendChild(this.tableHeaderNode);
		dojo.destroy(c);
		return Math.max(b, a) + 24;
	},
	_focusOptionNode : function(a) {
		if (this._highlighted == a) { return; }
		this._blurOptionNode();
		this._highlighted = a;
		dojo.addClass(this._highlighted, "u-comobobox-item-hover");
		dijit.scrollIntoView(this._highlighted);
	},
	_highlightNext : function() {
		if (!this._highlighted) {
			this._focusOptionNode(this.tableBodyNode.rows[0]);
		} else {
			if (this._highlighted.nextSibling) {
				this._focusOptionNode(this._highlighted.nextSibling);
			}
		}
	},
	_highlightPrev : function() {
		if (!this._highlighted) {
			this._focusOptionNode(this.tableBodyNode.rows[0]);
		} else {
			if (this._highlighted.previousSibling) {
				this._focusOptionNode(this._highlighted.previousSibling);
			}
		}
	},
	_blurOptionNode : function() {
		if (this._highlighted) {
			dojo.removeClass(this._highlighted, "u-comobobox-item-hover");
			this._highlighted = null;
		}
	},
	_onMouseDown : function(a) {
		var b = a.target || a.srcElement;
		var c = true;
		while (!b.item) {
			b = b.parentNode;
			if (b === this.listNode) {
				c = false;
				break;
			}
		}
		c && this._onSelect(a, b);
		this._inmousedown = true;
	},
	_onClick : function(a) {
		var b = a.target || a.srcElement;
		var c = true;
		while (!b.item) {
			b = b.parentNode;
			if (b === this.listNode) {
				c = false;
				break;
			}
		}
		c && this._onSelect(a, b);
	},
	_onSelect : function(a, b) {},
	_onMouseOver : function(a) {
		var b = a.target;
		while (b && !b.item) {
			b = b.parentNode;
		}
		if (!b) { return; }
		try {
			this._focusOptionNode(b);
		}
		catch (c) {}
	},
	_onMouseOut : function(a) {
		this._blurOptionNode();
	},
	_handKeyUp : function(a) {},
	_handleKeyDown : function(a) {},
	_onBlur : function(a) {
		this.widget._onBlur(a, true);
	}
});
/* /unieap/ria3.3/unieap/form/ComboBoxPopupList.js */
dojo.provide("unieap.form.ComboBoxPopupList");
unieap.form.ComboBoxPopup.list = {
	_createPopup : function(b, a) {
		this._createHeader(a);
		this._createOptions(b, a);
	},
	_createHeader : function(a) {
		dojo.empty(this.tableHeaderNode);
		var b = dojo.create("thead");
		var c = dojo.create("tr", null, b);
		if (dojo.some(a.rows, function(d) {
			        return !d.title;
		        })) {
			dojo.style(this.listHeaderNode, "display", "none");
		} else {
			dojo.forEach(a.rows, function(d) {
				        dojo.create("th", {
					                innerHTML : d.title,
					                style : {
						                width : d.width || ""
					                }
				                }, c);
			        });
			dojo.style(this.listHeaderNode, "display", "");
			this.tableHeaderNode.appendChild(b);
		}
	},
	_createOptions : function(f, d, o) {
		var b = null;
		if (o && o != "") {
			b = this._getMatchReg(o);
		}
		dojo.empty(this.tableBodyNode);
		var h = dojo.create("tbody");
		for (var g = 0; g < f.length; g++) {
			var p = f[g];
			var l = dojo.create("tr");
			for (var e = 0, j = d.rows.length; e < j; e++) {
				var a = d.rows[e];
				var m = a.field;
				var n = p[m] || "";
				if (this.widget.comboShowSelectValue == n) {
					n = "";
				}
				var c = dojo.create("td", {
					        style : {
						        width : a.width || ""
					        }
				        }, l);
				c.innerHTML = this.getInnerHTML(n, p, m, o, b);
			}
			l.item = p;
			dojo.addClass(l, "u-combobox-item");
			h.appendChild(l);
		}
		this.tableBodyNode.appendChild(h);
	},
	_getMatchReg : function(b) {
		try {
			if (b != "") { return new RegExp("(" + b + ")", "gi"); }
		}
		catch (a) {
			return null;
		}
	},
	_onSelect : function(a, b) {
		this._selection = [b.item];
		this.onSelect(b.item, this.widget);
		this.close(this._callback);
	},
	_handleKeyDown : function(a) {
		if (!this.isOpen()) { return; }
		var b = a.keyCode;
		if (b == dojo.keys.PAGE_DOWN || b == dojo.keys.DOWN_ARROW) {
			this._highlightNext();
			this._selection = [this._highlighted.item];
			this.widget.setText(this.widget.getDecoder().decode(this._selection[0]));
		} else {
			if (b == dojo.keys.PAGE_UP || b == dojo.keys.UP_ARROW) {
				this._highlightPrev();
				this._selection = [this._highlighted.item];
				this.widget.setText(this.widget.getDecoder().decode(this._selection[0]));
			} else {
				if (b == dojo.keys.ENTER && this._highlighted) {
					this._onSelect(a, this._highlighted);
				}
			}
		}
	}
};

/* /unieap/ria3.3/unieap/form/ComboBoxPopupMulti.js */
dojo.provide("unieap.form.ComboBoxPopupMulti");
unieap.form.ComboBoxPopup.multi = {
	_createPopup : function(b, a) {
		this._createHeader(a);
		this._createOptions(b, a);
	},
	_createHeader : function(a) {
		dojo.empty(this.tableHeaderNode);
		var b = dojo.create("thead");
		var c = dojo.create("tr", null, b);
		if (dojo.some(a.rows, function(d) {
			        return !d.title;
		        })) {
			dojo.style(this.listHeaderNode, "display", "none");
		} else {
			dojo.create("th", {
				        style : {
					        width : "25px"
				        }
			        }, c);
			dojo.forEach(a.rows, function(d) {
				        dojo.create("th", {
					                innerHTML : "<span>" + d.title + "</span>",
					                style : {
						                width : d.width || ""
					                }
				                }, c);
			        });
			dojo.style(this.listHeaderNode, "display", "");
			this.tableHeaderNode.appendChild(b);
		}
	},
	_createOptions : function(f, d, q) {
		var b = null;
		if (q && q != "") {
			b = this._getMatchReg(q);
		}
		dojo.empty(this.tableBodyNode);
		var h = dojo.create("tbody");
		for (var g = 0; g < f.length; g++) {
			var r = f[g];
			var m = dojo.create("tr");
			var p = this._selection || [];
			if ((this.widget.comboShowSelect || this.widget.getDataProvider().isComboShowSelect())
			        && this.widget.comboShowSelectValue == r.CODEVALUE) {} else {
				if (dojo.indexOf(p, r) != -1) {
					r.checked = true;
				} else {
					r.checked = false;
				}
			}
			var j = null;
			if (dojo.isIE) {
				if (r.checked == true) {
					j = document.createElement("<input type='checkbox' checked/>");
				} else {
					if (r.checked == false) {
						j = document.createElement("<input type='checkbox'/>");
					}
				}
			} else {
				if (r.checked != undefined) {
					j = dojo.create("input", {
						        type : "checkbox"
					        });
					j.checked = r.checked;
				}
			}
			j ? dojo.create("td", {
				        style : {
					        width : "25px"
				        }
			        }, m).appendChild(j) : dojo.create("td", {
				        style : {
					        width : "25px"
				        }
			        }, m);
			for (var e = 0, l = d.rows.length; e < l; e++) {
				var a = d.rows[e];
				var n = a.field;
				var o = r[n] || "";
				var c = dojo.create("td", {
					        style : {
						        width : a.width || ""
					        }
				        }, m);
				c.innerHTML = this.getInnerHTML(o, r, n, q, b);
			}
			m.item = r;
			dojo.addClass(m, "u-combobox-item");
			h.appendChild(m);
		}
		this.tableBodyNode.appendChild(h);
	},
	_getMatchReg : function(c) {
		var a = c.split(this.widget.separator);
		c = dojo.filter(a, function(d) {
			        return d != "";
		        }).join("|");
		try {
			if (c != "") { return new RegExp("(" + c + ")", "gi"); }
		}
		catch (b) {
			return null;
		}
	},
	_onSelect : function(k, f) {
		var g = this.widget.getDataProvider().getItems();
		var l = f.item;
		if ((this.widget.comboShowSelect || this.widget.getDataProvider().isComboShowSelect())
		        && this.widget.comboShowSelectValue == l.CODEVALUE) { return; }
		var a = this.widget.getDecoder();
		var h = [];
		var b = [];
		for (var e = 0; e < g.length; e++) {
			var d = false;
			for (var c = 0; c < this._selection.length; c++) {
				if (this._selection[c] == g[e]) {
					d = true;
					break;
				}
			}
			if (!d && l == g[e]) {
				h.push(g[e]);
				b.push(a.decode(g[e]));
			} else {
				if (d && l != g[e]) {
					h.push(g[e]);
					b.push(a.decode(g[e]));
				}
			}
		}
		this._selection = h;
		this._updateCheckbox(k, f);
		this.widget.setText(b.join(this.widget.separator));
		this.onSelect(l, this.widget);
	},
	_updateCheckbox : function(a, d) {
		var b = a.target;
		var c;
		if (a.type == "click" && b && b.tagName == "INPUT") {
			c = b;
		} else {
			c = dojo.query("input", d);
			if (c && c.length > 0) {
				c = c[0];
			}
			c.checked = !c.checked;
		}
		d.item.checked = c.checked;
	},
	_handleKeyDown : function(a) {
		if (!this.isOpen()) { return; }
		var b = a.keyCode;
		if (b == dojo.keys.PAGE_DOWN || b == dojo.keys.DOWN_ARROW) {
			this._highlightNext();
		} else {
			if (b == dojo.keys.PAGE_UP || b == dojo.keys.UP_ARROW) {
				this._highlightPrev();
			} else {
				if (b == dojo.keys.ENTER && this._highlighted) {
					this._onSelect(a, this._highlighted);
					this.close(this._callback);
				}
			}
		}
	}
};
/* /unieap/ria3.3/unieap/form/ComboBoxTree.js */
dojo.provide("unieap.form.ComboBoxTree");
dojo.require("unieap.form.TextBoxWithIcon");
dojo.require("unieap.tree.Tree");
dojo.require("unieap.util.util");
dojo.declare("unieap.form.ComboBoxTree", unieap.form.TextBoxWithIcon, {
	        UserInterfaces : dojo.mixin({
		                dataProvider : "object",
		                separator : "string",
		                expandTree : "boolean",
		                treeJson : "object"
	                }, unieap.form.TextBoxWithIcon.prototype.UserInterfaces),
	        popupClass : "unieap.form.ComboBoxTreePopup",
	        _tree : null,
	        _treeIdList : null,
	        _treeLabelList : null,
	        _treeId : "id",
	        _treeLabel : "label",
	        _isMultiTree : false,
	        _store : null,
	        _flag : true,
	        expandTree : true,
	        treeJson : null,
	        separator : ",",
	        dataProvider : null,
	        postMixInProperties : function() {
		        this.inherited(arguments);
		        this._treeIdList = [];
		        this._treeLabelList = [];
		        this._connectHandles = [];
		        this._getTreeInfo(this.treeJson);
	        },
	        postCreate : function() {
		        var b = this.getBinding(),
			        a = this.getDataProvider();
		        if (b && a && a.label) {
			        this.connect(b, "onBeforeBind", function() {
				                this._flag = true;
			                });
		        }
		        this.inherited(arguments);
	        },
	        getTree : function() {
		        return this._tree;
	        },
	        getDataProvider : function() {
		        return this.dataProvider
		                && unieap.getModuleInstance(this, "dataProvider",
		                        "unieap.form.ComboBoxTreeDataProvider");
	        },
	        setTreeJson : function(a) {
		        this._tree && this._tree.destroy();
		        this._tree = null;
		        this.treeJson = a;
		        this._reset();
		        if (this.getPopup()._isShowingNow) {
			        this.getPopup().close();
		        }
		        this._isMultiTree = false;
		        this._getTreeInfo(a);
		        this._createJsonTree(a);
	        },
	        setSeparator : function(a) {
		        this.separator = a;
	        },
	        setValue : function(b) {
		        this.treeJson && this._createJsonTree(this.treeJson);
		        if (b != null && b != "" && typeof(b) != "undefined") {
			        b = b + "";
			        b = unieap.array_unique(b.split(this.separator));
		        } else {
			        b = [];
		        }
		        if (this._isMultiTree && this._tree) {
			        this._processSelectedNode(b);
		        }
		        this._reset();
		        if (b.length > 0) {
			        if (this._store) {
				        this._helper1(b);
			        }
			        if (b.length != this._treeIdList.length && this._tree) {
				        this._helper2(b);
			        }
			        if (b.length != this._treeIdList.length) {
				        var a = this.getDataProvider();
				        a && this._getLazyLabel(a, b);
			        }
			        if (b.length != this._treeIdList.length) {
				        this._helper3(b);
			        }
		        }
		        this.setText(this._treeLabelList.join(this.separator));
		        this.fireDataChange();
	        },
	        getValue : function() {
		        return this._treeIdList.join(this.separator);
	        },
	        clear : function() {
		        if (this._isMultiTree) {
			        var a = this._tree.getSelectedNodes();
			        dojo.forEach(a, function(b) {
				                this._tree.setChecked(b, false);
			                }, this);
		        }
		        this._reset();
		        this._updateRow("");
		        this.fireDataChange();
	        },
	        _reset : function() {
		        this._treeIdList = [];
		        this._treeLabelList = [];
		        this.setText("");
	        },
	        _createJsonTree : function(a) {
		        if (this.getTree()) { return; }
		        if (a) {
			        this._tree = new unieap.tree.Tree(a);
		        }
		        if (this._tree) {
			        dojo.style(this._tree.domNode, "display", "none");
			        this._connectEvents();
			        this._tree.placeAt(this.getPopup().domNode, "first");
		        }
	        },
	        _getTreeInfo : function(b) {
		        var a, c;
		        if (b) {
			        a = b.checkLogic;
			        c = b.binding;
		        }
		        if (a && a.model) {
			        this._isMultiTree = true;
		        }
		        if (c) {
			        this._treeId = c.id || this._treeId;
			        this._treeLabel = c.label || this._treeLabel;
			        this._store = c.store;
		        }
	        },
	        _processSelectedNode : function(c) {
		        var b;
		        var a = unieap.array_unique(this._treeIdList.concat(c));
		        dojo.forEach(a, function(d) {
			                if (dojo.indexOf(c, d) == -1) {
				                b = this._tree.getNodeById(d);
				                b && b.isChecked() && this._tree.setChecked(b, false);
			                } else {
				                b = this._tree.getNodeById(d);
				                b && !b.isChecked() && this._tree.setChecked(b, true);
			                }
		                }, this);
	        },
	        _helper1 : function(a) {
		        dojo.forEach(a, function(c) {
			                var b = unieap.transcode(c, {
				                        valueAttr : this._treeId,
				                        displayAttr : this._treeLabel,
				                        store : this._store
			                        });
			                if (b) {
				                this._treeIdList.push(c);
				                this._treeLabelList.push(b);
			                }
		                }, this);
	        },
	        _helper2 : function(a) {
		        dojo.forEach(a, function(e) {
			                var c = dojo.indexOf(this._treeIdList, e);
			                var d = this._tree.getNodeById(e);
			                if (c == -1 && d) {
				                var b = d.getItem().data.label;
				                this._treeIdList.push(e);
				                this._treeLabelList.push(b);
			                }
		                }, this);
	        },
	        _getLazyLabel : function(a, d) {
		        if (a.getLazyLabel && dojo.isFunction(a.getLazyLabel)) {
			        var b = [];
			        dojo.forEach(d, function(h) {
				                dojo.indexOf(this._treeIdList, h) == -1 && b.push(h);
			                }, this);
			        var g = a.getLazyLabel(b.join(this.separator));
			        if (g && g.split(this.separator).length == b.length) {
				        this._treeIdList = this._treeIdList.concat(b);
				        this._treeLabelList = this._treeLabelList.concat(g);
			        }
		        } else {
			        if (a.label) {
				        if (this._flag) {
					        var f = this.getBinding(),
						        e = f && f.getRow();
					        var c = e && e.getItemValue(a.label);
					        if (c && c.split(this.separator).length == d.length) {
						        this._treeIdList = d;
						        this._treeLabelList = c.split(this.separator);
					        }
					        this._flag = false;
				        }
			        }
		        }
	        },
	        _helper3 : function(a) {
		        dojo.forEach(a, function(c) {
			                var b = dojo.indexOf(this._treeIdList, c);
			                if (b == -1) {
				                this._treeIdList.push(c);
				                this._treeLabelList.push(c);
			                }
		                }, this);
	        },
	        _expandTree : function() {
		        this._tree && this._treeIdList.length > 0
		                && this._tree.showNodesById(this._treeIdList);
	        },
	        _updateRow : function(d) {
		        var a = this.getDataProvider();
		        if (a && a.label) {
			        var c = this.getBinding();
			        var b = c && c.getRow();
			        b && b.setItemValue(a.label, d);
		        }
	        },
	        _onChange : function() {},
	        _connectEvents : function() {
		        this.handles = [];
		        if (this._isMultiTree) {
			        this.handles.push(dojo.connect(this._tree.getCheckLogic(), "onChecked", this,
			                "_checkTree"));
			        this.handles.push(dojo.connect(this._tree.getCheckLogic(), "onUnChecked", this,
			                "_unCheckTree"));
			        this.handles.push(dojo.connect(this._tree, "onAfterExpand", this,
			                "_checkOrUnCheckTree"));
		        } else {
			        this.handles.push(dojo.connect(this._tree, "onClick", this, "_singleClick"));
		        }
		        if (dojo.isWebKit) {
			        this.handles
			                .push(dojo.connect(this._tree, "onMouseDown", this, "_onMouseDown"));
		        }
	        },
	        destroy : function() {
		        while (this.handles.length) {
			        dojo.disconnect(this.handles.pop());
		        }
		        this.inherited(arguments);
	        },
	        _onBlur : function(a) {
		        if (this._interestInBlur(a)) {
			        this._inmousedown = false;
		        }
		        this.inherited(arguments);
	        },
	        _onMouseDown : function(a) {
		        this._inmousedown = true;
	        },
	        _singleClick : function(b) {
		        if (!b.isRoot()) {
			        var c = b.getItem().data;
			        var d = c[this._treeId];
			        var a = c[this._treeLabel];
			        if (this._treeIdList[0] != d) {
				        this._treeIdList = [d];
				        this._treeLabelList = [a];
				        this.setText(a);
				        this._updateRow(a);
				        this.onChange(d, a);
				        this.fireDataChange();
			        }
		        }
		        if (this.getPopup()._isShowingNow) {
			        this.getPopup().close();
		        }
		        this.focus();
	        },
	        _checkTree : function(b) {
		        if (!b.isRoot()) {
			        var c = b.getItem().data;
			        var d = c[this._treeId];
			        var a = c[this._treeLabel];
			        if (dojo.indexOf(this._treeIdList, d) == -1) {
				        this._treeIdList.push(d);
				        this._treeLabelList.push(a);
				        this.setText(this._treeLabelList.join(this.separator));
				        this._updateRow(this._treeLabelList.join(this.separator));
				        this.onChange(d, a);
				        this.fireDataChange();
			        }
		        }
	        },
	        _unCheckTree : function(c) {
		        if (!c.isRoot()) {
			        var d = c.getItem().data;
			        var e = d[this._treeId];
			        var b = d[this._treeLabel];
			        var a = dojo.indexOf(this._treeIdList, e);
			        if (a > -1) {
				        this._treeIdList.splice(a, 1);
				        this._treeLabelList.splice(a, 1);
				        this.setText(this._treeLabelList.join(this.separator));
				        this._updateRow(this._treeLabelList.join(this.separator));
				        this.onChange(e, b);
				        this.fireDataChange();
			        }
		        }
	        },
	        _checkOrUnCheckTree : function(b) {
		        var d, f, e, c;
		        var a = this._tree.getChildrenByDom(b.domNode);
		        dojo.forEach(a, function(g) {
			                d = g.associatedData;
			                f = d.isChecked;
			                e = d.item.data.id;
			                c = this._tree.getNodeByDom(g);
			                if (dojo.indexOf(this._treeIdList, e) > -1) {
				                !f && this._tree.setChecked(c, true);
			                } else {
				                f && this._tree.setChecked(c, false);
			                }
		                }, this);
	        },
	        _onIconClick : function(a) {
		        if (!this.disabled && this.onBeforeIconClick(a)) {
			        this.treeJson && this._createJsonTree(this.treeJson);
			        if (this.getPopup()._isShowingNow) {
				        this.getPopup().close();
			        } else {
				        this._tree && dojo.style(this._tree.domNode, "display", "block");
				        this.expandTree && this._expandTree();
				        this.getPopup().open();
			        }
			        this.onIconClick(a);
		        }
	        },
	        _onClick : function(a) {
		        if (!this.onBeforeClick()) { return; }
		        this._onIconClick();
	        },
	        _onKeyDown : function(a) {
		        dojo.isIE && (a.keyCode == 8) && dojo.stopEvent(a);
		        this.inherited(arguments);
	        },
	        _onKeyPress : function(a) {
		        var b = a.keyCode;
		        if (dojo.indexOf([9, 13, 37, 39], b) > -1) {
			        return;
		        } else {
			        if (a.ctrlKey && dojo.indexOf([65, 67, 97, 99], a.keyCode || a.which) > -1) { return; }
		        }
		        dojo.stopEvent(a);
	        },
	        destroy : function() {
		        if (this._tree) {
			        this._tree.destroy();
		        }
		        this.inherited(arguments);
	        }
        });
/* /unieap/ria3.3/unieap/form/ComboBoxTreeDataProvider.js */
dojo.provide("unieap.form.ComboBoxTreeDataProvider");
dojo.declare("unieap.form.ComboBoxTreeDataProvider", null, {
	        widget : null,
	        label : "",
	        getLazyLabel : null,
	        constructor : function(a) {
		        dojo.mixin(this, a);
	        }
        });
/* /unieap/ria3.3/unieap/form/ComboBoxTreePopup.js */
dojo.provide("unieap.form.ComboBoxTreePopup");
dojo.require("unieap.form.Popup");
dojo.declare("unieap.form.ComboBoxTreePopup", unieap.form.Popup, {
	        _isShowingNow : false,
	        height : "172px",
	        open : function() {
		        if (!this.widget._canPopOpen()) { return; }
		        this.inherited(arguments);
		        dojo.style(this.popupcontainer, {
			                overflow : "auto",
			                border : "1px solid #7f9db9"
		                });
	        }
        });
/* /unieap/ria3.3/unieap/form/DateDisplayFormatter.js */
if (!dojo._hasResource["unieap.form.DateDisplayFormatter"]) {
	dojo._hasResource["unieap.form.DateDisplayFormatter"] = true;
	dojo.provide("unieap.form.DateDisplayFormatter");
	dojo.require("unieap.util.util");
	dojo.require("unieap.form.SimpleFormatter");
	dojo.declare("unieap.form.DateDisplayFormatter", unieap.form.SimpleFormatter, {
		        dataFormat : RIA_I18N.form.dateTextBox.dataFormat,
		        format : function(b) {
			        if (!b) { return b; }
			        var a = new Date(Number(b));
			        return unieap.dateFormat(a.getTime(), this.getFormat());
		        },
		        parse : function(a) {
			        if (!a) { return a; }
			        return unieap.dateParser(a, this.getFormat()).getTime();
		        },
		        setFormat : function(a) {
			        this.dtaFormat = a;
			        if (this.widget && (typeof this.widget.updateDisplayText == "function")) {
				        this.widget.updateDisplayText();
			        }
		        }
	        });
}
/* /unieap/ria3.3/unieap/form/DateTextBoxPopup.js */
dojo.provide("unieap.form.DateTextBoxPopup");
dojo.require("unieap.form.Popup");
dojo.require("unieap.form.calendar");
dojo.declare("unieap.form.DateTextBoxPopup", unieap.form.Popup, {
	        _isShowingNow : false,
	        height : "auto",
	        width : "auto",
	        widget : null,
	        firstDayOfWeek : 7,
	        showsTime : "",
	        showsOtherMonths : true,
	        _calendar : null,
	        constructor : function(a) {
		        dojo.mixin(this, a);
	        },
	        postMixInProperties : function() {
		        this.width = "auto";
		        this.height = "auto";
		        this.inherited(arguments);
	        },
	        open : function() {
		        this.domNode.style.background = "transparent";
		        if (this._isShowingNow) {
			        this.close();
			        return;
		        } else {
			        if (!this.widget._canPopOpen()) { return; }
			        this._createCalendar();
			        var a;
			        if (this.widget.inputNode.value) {
				        a = this.widget.getDisplayFormatter().parse(this.widget.inputNode.value);
			        } else {
				        a = (new Date()).getTime();
			        }
			        this._calendar.setDate(new Date(a));
			        dojo.style(this.popupcontainer, "borderWidth", "0px");
			        this.popupcontainer.appendChild(this._calendar.element);
			        this._calendar.showAt(0, 0);
			        this.widget.inputNode.focus();
			        this.widget.inputNode.select();
			        this.inherited(arguments);
			        if (!this.animate) {
				        dojo.style(this.domNode, "overflow", "");
			        }
		        }
	        },
	        onAnimateEnd : function() {
		        this.inherited(arguments);
		        dojo.style(this.domNode, "overflow", "");
	        },
	        _selected : function(b, a) {
		        b.sel.value = a;
		        b.widget.inputNode.focus();
		        if (b.dateClicked && b.singleClick) {
			        b.callCloseHandler();
		        }
	        },
	        _closeHandler : function(a) {
		        a.widget.getPopup().close();
	        },
	        _createCalendar : function() {
		        if (!this._calendar) {
			        var a = this.widget.inputNode;
			        this._calendar = new Calendar(this.firstDayOfWeek, null, this._selected,
			                this._closeHandler);
			        this._calendar.singleClick = true;
			        this._calendar.widget = this.widget;
			        this._calendar.setRange(this.widget.range.min, this.widget.range.max);
			        if (this.showsTime && typeof this.showsTime == "number") {
				        this._calendar.showsTime = true;
				        this._calendar.time24 = (this.showsTime == 24);
			        }
			        if (this.showsOtherMonths) {
				        this._calendar.showsOtherMonths = true;
			        }
			        this._calendar.setDateFormat(this.widget._parseDateFormat(this.widget
			                .getDisplayFormatter().getFormat()));
			        this._calendar.create(this.popupcontainer);
			        this._calendar.sel = a;
		        }
		        return this._calendar;
	        },
	        destroy : function() {
		        this.clearNode();
		        if (this._calendar) {
			        dojo.removeAttr(this._calendar.table, "calendar");
			        var b = this._calendar.table.getElementsByTagName("td");
			        dojo.forEach(b, function(c) {
				                dojo.removeAttr(c, "calendar");
				                dojo.removeAttr(c, "caldate");
			                });
			        var a = this._calendar.table.getElementsByTagName("span");
			        dojo.forEach(a, function(c) {
				                dojo.removeAttr(c, "calendar");
				                dojo.removeAttr(c, "caldate");
			                });
			        this._calendar.destroy();
		        }
		        this.inherited(arguments);
	        }
        });
/* /unieap/ria3.3/unieap/form/DateValidator.js */
if (!dojo._hasResource["unieap.form.DateValidator"]) {
	dojo._hasResource["unieap.form.DateValidator"] = true;
	dojo.provide("unieap.form.DateValidator");
	dojo.require("unieap.form.TextBoxValidator");
	dojo.declare("unieap.form.DateValidator", unieap.form.TextBoxValidator, {
		        preDate : "",
		        validate : function() {
			        var b = this.inherited(arguments);
			        if (!b) { return false; }
			        if (this.nextDate) {
				        this._processValidate(this.nextDate, "next");
			        }
			        if (this.preDate) {
				        this._processValidate(this.preDate, "pre");
			        }
			        var g = this.widget.getBinding();
			        if (g && g.getRow()) {
				        var e = g.getMetaData(),
					        d = this._getLongValue(this.widget),
					        c = e && e.getPast(),
					        a = e && e.getFuture(), f;
				        if (e) {
					        if (c && this.compareTime(c, d)) {
						        f = this.getPastMsg(e);
						        f && (this.setErrorMsg(f));
						        return false;
					        } else {
						        if (a && this.compareTime(d, a)) {
							        f = this.getFutureMsg(e);
							        f && (this.setErrorMsg(f));
							        return false;
						        } else {
							        return true;
						        }
					        }
				        } else {
					        return true;
				        }
			        }
			        return true;
		        },
		        compareTime : function(b, a) {
			        return this.widget.getDisplayFormatter().format(b) > this.widget
			                .getDisplayFormatter().format(a);
		        },
		        getFutureMsg : function(a) {
			        var b = this.prompts.future || (a && a.getPrompt("future"));
			        return b;
		        },
		        getPastMsg : function(a) {
			        var b = this.prompts.past || (a && a.getPrompt("past"));
			        return b;
		        },
		        _processValidate : function(c, b) {
			        var a = dijit.byId(c);
			        if (!a.getValue()) { return; }
			        switch (b) {
				        case "pre" :
					        bool = this._compareResult(a, this.widget);
					        break;
				        case "next" :
					        bool = this._compareResult(this.widget, a);
					        break;
			        }
			        if (!bool) {
				        this.widget.setValue(a.getValue());
			        }
		        },
		        _compareResult : function(b, d) {
			        var c = this._getLongValue(b);
			        var a = this._getLongValue(d);
			        return c <= a;
		        },
		        _getLongValue : function(a) {
			        return a.getDisplayFormatter().parse(a.getText());
		        }
	        });
}
/* /unieap/ria3.3/unieap/form/DateValueFormatter.js */
if (!dojo._hasResource["unieap.form.DateValueFormatter"]) {
	dojo._hasResource["unieap.form.DateValueFormatter"] = true;
	dojo.provide("unieap.form.DateValueFormatter");
	dojo.require("unieap.form.SimpleFormatter");
	dojo.require("unieap.util.util");
	dojo.declare("unieap.form.DateValueFormatter", unieap.form.SimpleFormatter, {
		        dataFormat : "",
		        format : function(a) {
			        if (!this.dataFormat || !a) { return a; }
			        return unieap.dateParser(a, this.getFormat()).getTime();
		        },
		        parse : function(b) {
			        if (!this.dataFormat || !b) { return b; }
			        var a = new Date(b);
			        return unieap.dateFormat(a.getTime(), this.getFormat());
		        }
	        });
}
/* /unieap/ria3.3/unieap/form/DropDownButton.js */
dojo.provide("unieap.form.DropDownButton");
dojo.require("unieap.form.Button");
dojo.declare("unieap.form.DropDownButton", [unieap.form.Button], {
	UserInterfaces : dojo.mixin({
		        onBeforeArrowClick : "function",
		        onArrowClick : "function"
	        }, unieap.form.Button.prototype.UserInterfaces),
	templateString : "<a href='javascript:void(0);' tabIndex='-1' class='u-form-dropBtn u-form-btn-outer' style=\"text-decoration:none;\"><button class='u-form-btn' type='button' style=\"height:100%\" dojoAttachPoint='inputNode,btnNode' onfocus=\"unieap.fep&&unieap.fep(this)\"><table dojoAttachPoint=\"mainTable\" style=\"display:inline-block;\"><tr><td dojoAttachPoint=\"iconNode\"></td><td class=\"u-form-btn-txt\" dojoAttachPoint=\"labelNode\"></td></table></button><span class='u-form-dropBtn-icon u-form-dropBtn-icon-normal' dojoAttachPoint='arrowNode'></span></a>",
	dropDown : null,
	_fillContent : function() {
		if (this.srcNodeRef) {
			var a = dojo.query("*", this.srcNodeRef);
			unieap.form.DropDownButton.superclass._fillContent.call(this, a[0]);
			this.dropDownContainer = this.srcNodeRef;
		}
	},
	postCreate : function() {
		this.inherited(arguments);
		this.conns = [];
		if (!this.disabled) {
			this.dropDownHandle = dojo.connect(this.arrowNode, "onclick", this, "_processDropDown");
			this.conns.push(this.dropDownHandle);
		}
		var a = this.width || dojo.style(this.domNode, "width");
		var b = parseInt(a, 10) - (dojo.style(this.arrowNode, "width") || 16);
		b > 0 && dojo.style(this.btnNode, "width", b + "px");
		if (dojo.isIE == 8 || !!dojo.isWebKit) {
			if (b > 0 && parseInt(b, 10) < 30) {
				this.mainTable.style.width = b;
				this.btnNode.style.paddingLeft = "0";
				this.btnNode.style.paddingRight = "0";
			}
		}
	},
	_setWidthAndHeigth : function() {
		this.width
		        && dojo.style(this.domNode, "width", isNaN(this.width)
		                        ? this.width
		                        : (this.width + "px"));
		this.height
		        && dojo.style(this.domNode, "height", isNaN(this.height)
		                        ? this.height
		                        : (this.height + "px"));
	},
	startup : function() {
		if (this._started) { return; }
		if (!this.dropDown) {
			var a = dojo.query("[widgetId]", this.dropDownContainer)[0];
			a && (this.dropDown = dijit.byNode(a));
			delete this.dropDownContainer;
		}
		if (this.dropDown) {
			dijit.popup.moveOffScreen
			        ? dijit.popup.moveOffScreen(this.dropDown.domNode)
			        : dijit.popup.prepare(this.dropDown.domNode);
		}
		this.inherited(arguments);
	},
	destroy : function() {
		dojo.forEach(this.conns, dojo.disconnect);
		this.dropDown && this.dropDown.destroy();
		this.inherited(arguments);
	},
	setDisabled : function(a) {
		this.inherited(arguments);
		if (a) {
			this.dropDownHandle && dojo.disconnect(this.dropDownHandle);
			this.dropDownHandle = null;
			dojo.removeClass(this.arrowNode, "u-form-dropBtn-icon-normal");
			dojo.addClass(this.arrowNode, "u-form-dropBtn-icon-disabled");
		} else {
			if (!this.dropDownHandle) {
				this.dropDownHandle = dojo.connect(this.arrowNode, "onclick", this,
				        "_processDropDown");
				this.conns.push(this.dropDownHandle);
			}
			dojo.removeClass(this.arrowNode, "u-form-dropBtn-icon-disabled");
			dojo.addClass(this.arrowNode, "u-form-dropBtn-icon-normal");
		}
	},
	_processDropDown : function(a) {
		if (this.onBeforeArrowClick(a) && this.dropDown) {
			this._openDropDown();
			this.onArrowClick(a);
		}
	},
	_openDropDown : function() {
		if (!this._opened) {
			var e = this.dropDown;
			var b = e.domNode.style.width;
			var c = this;
			dijit.popup.open({
				        parent : this,
				        popup : e,
				        around : this.domNode,
				        orient : this.isLeftToRight() ? {
					        BL : "TL",
					        BR : "TR",
					        TL : "BL",
					        TR : "BR"
				        } : {
					        BR : "TR",
					        BL : "TL",
					        TR : "BR",
					        TL : "BL"
				        },
				        onExecute : function() {
					        c._closeDropDown(true);
				        },
				        onCancel : function() {
					        c._closeDropDown(true);
				        },
				        onClose : function() {
					        e.domNode.style.width = b;
					        this._opened = false;
				        }
			        });
			if (this.domNode.offsetWidth > e.domNode.offsetWidth) {
				var d = null;
				if (!this.isLeftToRight()) {
					d = e.domNode.parentNode;
					var a = d.offsetLeft + d.offsetWidth;
				}
				dojo.marginBox(e.domNode, {
					        w : this.domNode.offsetWidth
				        });
				if (d) {
					d.style.left = a - this.domNode.offsetWidth + "px";
				}
			}
			this._opened = true;
		} else {
			this._closeDropDown();
		}
	},
	_closeDropDown : function() {
		if (this._opened) {
			dijit.popup.close(this.dropDown);
			this._opened = false;
		}
	},
	onBeforeArrowClick : function(a) {
		return true;
	},
	onArrowClick : function(a) {},
	_onButtonClick : function(a) {
		this._closeDropDown();
		this.onClick(a);
	},
	_onBlur : function() {
		this._closeDropDown();
	}
});
/* /unieap/ria3.3/unieap/form/DropDownButton_crm.js */
dojo.provide("unieap.form.DropDownButton_crm");
dojo.require("unieap.form.Button");
dojo.declare("unieap.form.DropDownButton_crm", [unieap.form.Button], {
	templateString : "<a href='javascript:void(0);' tabIndex='-1' class='u-form-dropBtn u-form-btn-outer' style=\"text-decoration:none;\"><button class='u-form-btn' type='button' style=\"height:100%\" dojoAttachPoint='inputNode,btnNode' ><table dojoAttachPoint=\"mainTable\" style=\"display:inline-block;\"><tr><td dojoAttachPoint=\"iconNode\"></td><td class=\"u-form-btn-txt\" dojoAttachPoint=\"labelNode\"></td></table></button><span class='u-form-dropBtn-icon' dojoAttachPoint='arrowNode' style='height:20px'>&nbsp;&nbsp;功能导航</span></a>",
	dropDown : null,
	setBtnText : function(a) {
		this.arrowNode.innerHTML = "&nbsp;&nbsp;" + a;
	},
	getBtnText : function() {
		return this.arrowNode.innerHTML;
	},
	setBtnWidth : function(a) {
		dojo.style(this.arrowNode, "width", a);
	},
	_fillContent : function() {
		if (this.srcNodeRef) {
			var a = dojo.query("*", this.srcNodeRef);
			unieap.form.DropDownButton.superclass._fillContent.call(this, a[0]);
			this.dropDownContainer = this.srcNodeRef;
		}
	},
	postCreate : function() {
		this.inherited(arguments);
		this.conns = [];
		if (!this.disabled) {
			this.dropDownHandle = dojo.connect(this.arrowNode, "onclick", this, "_processDropDown");
			this.conns.push(this.dropDownHandle);
		}
		var a = this.width || dojo.style(this.domNode, "width");
		var b = parseInt(a, 10) - (dojo.style(this.arrowNode, "width") || 16);
		b > 0 && dojo.style(this.btnNode, "width", b + "px");
		if (dojo.isIE == 8) {
			if (b > 0 && parseInt(b, 10) < 30) {
				this.mainTable.style.width = b;
				this.btnNode.style.paddingLeft = "0";
				this.btnNode.style.paddingRight = "0";
			}
		}
	},
	_setWidthAndHeigth : function() {
		this.width
		        && dojo.style(this.domNode, "width", isNaN(this.width)
		                        ? this.width
		                        : (this.width + "px"));
		this.height
		        && dojo.style(this.domNode, "height", isNaN(this.height)
		                        ? this.height
		                        : (this.height + "px"));
	},
	startup : function() {
		if (this._started) { return; }
		if (!this.dropDown) {
			var a = dojo.query("[widgetId]", this.dropDownContainer)[0];
			a && (this.dropDown = dijit.byNode(a));
			delete this.dropDownContainer;
		}
		if (this.dropDown) {
			dijit.popup.moveOffScreen
			        ? dijit.popup.moveOffScreen(this.dropDown.domNode)
			        : dijit.popup.prepare(this.dropDown.domNode);
		}
		this.inherited(arguments);
	},
	destroy : function() {
		dojo.forEach(this.conns, dojo.disconnect);
		this.dropDown && this.dropDown.destroy();
		this.inherited(arguments);
	},
	setDisabled : function(a) {
		this.inherited(arguments);
		if (a) {
			this.dropDownHandle && dojo.disconnect(this.dropDownHandle);
			this.dropDownHandle = null;
			dojo.removeClass(this.arrowNode, "u-form-dropBtn-icon-normal");
			dojo.addClass(this.arrowNode, "u-form-dropBtn-icon-disabled");
		} else {
			if (!this.dropDownHandle) {
				this.dropDownHandle = dojo.connect(this.arrowNode, "onclick", this,
				        "_processDropDown");
				this.conns.push(this.dropDownHandle);
			}
			dojo.removeClass(this.arrowNode, "u-form-dropBtn-icon-disabled");
			dojo.addClass(this.arrowNode, "u-form-dropBtn-icon-normal");
		}
	},
	_processDropDown : function(a) {
		if (this.onBeforeArrowClick(a) && this.dropDown) {
			this._openDropDown();
			this.onArrowClick(a);
		}
	},
	_openDropDown : function() {
		if (!this._opened) {
			var e = this.dropDown;
			var b = e.domNode.style.width;
			var c = this;
			dijit.popup.open({
				        parent : this,
				        popup : e,
				        around : this.domNode,
				        orient : this.isLeftToRight() ? {
					        BL : "TL",
					        BR : "TR",
					        TL : "BL",
					        TR : "BR"
				        } : {
					        BR : "TR",
					        BL : "TL",
					        TR : "BR",
					        TL : "BL"
				        },
				        onExecute : function() {
					        c._closeDropDown(true);
				        },
				        onCancel : function() {
					        c._closeDropDown(true);
				        },
				        onClose : function() {
					        e.domNode.style.width = b;
					        this._opened = false;
				        }
			        });
			if (this.domNode.offsetWidth > e.domNode.offsetWidth) {
				var d = null;
				if (!this.isLeftToRight()) {
					d = e.domNode.parentNode;
					var a = d.offsetLeft + d.offsetWidth;
				}
				dojo.marginBox(e.domNode, {
					        w : this.domNode.offsetWidth
				        });
				if (d) {
					d.style.left = a - this.domNode.offsetWidth + "px";
				}
			}
			this._opened = true;
		} else {
			this._closeDropDown();
		}
	},
	_closeDropDown : function() {
		if (this._opened) {
			dijit.popup.close(this.dropDown);
			this._opened = false;
		}
	},
	onBeforeArrowClick : function(a) {
		return true;
	},
	onArrowClick : function(a) {},
	_onButtonClick : function(a) {
		this._closeDropDown();
		this.onClick(a);
	},
	_onBlur : function() {
		this._closeDropDown();
	}
});
/* /unieap/ria3.3/unieap/form/DropDownButton_crm_extend.js */
dojo.provide("unieap.form.DropDownButton_crm_extend");
dojo.require("unieap.form.Button");
dojo.declare("unieap.form.DropDownButton_crm_extend", [unieap.form.Button], {
	templateString : "<a href='javascript:void(0);' tabIndex='-1' class='u-form-dropBtn u-form-btn-outer' style=\"text-decoration:none;\"><button class='u-form-btn' type='button' style=\"height:100%\" dojoAttachPoint='inputNode,btnNode' ><table dojoAttachPoint=\"mainTable\" style=\"display:inline-block;\"><tr><td dojoAttachPoint=\"iconNode\"></td><td class=\"u-form-btn-txt\" dojoAttachPoint=\"labelNode\"></td></table></button><span class='u-form-dropBtn-icon' dojoAttachPoint='arrowNode' style='height:20px;width:210px;text-align:center'>请选择系统</span></a>",
	dropDown : null,
	setBtnText : function(a) {
		this.arrowNode.innerHTML = "&nbsp;&nbsp;" + a;
	},
	getBtnText : function() {
		return this.arrowNode.innerHTML;
	},
	setBtnWidth : function(a) {
		dojo.style(this.arrowNode, "width", a);
	},
	_fillContent : function() {
		if (this.srcNodeRef) {
			var a = dojo.query("*", this.srcNodeRef);
			unieap.form.DropDownButton.superclass._fillContent.call(this, a[0]);
			this.dropDownContainer = this.srcNodeRef;
		}
	},
	postCreate : function() {
		this.inherited(arguments);
		this.conns = [];
		if (!this.disabled) {
			this.dropDownHandle = dojo.connect(this.arrowNode, "onclick", this, "_processDropDown");
			this.conns.push(this.dropDownHandle);
		}
		var a = this.width || dojo.style(this.domNode, "width");
		var b = parseInt(a, 10) - (dojo.style(this.arrowNode, "width") || 16);
		b > 0 && dojo.style(this.btnNode, "width", b + "px");
		if (dojo.isIE == 8) {
			if (b > 0 && parseInt(b, 10) < 30) {
				this.mainTable.style.width = b;
				this.btnNode.style.paddingLeft = "0";
				this.btnNode.style.paddingRight = "0";
			}
		}
	},
	_setWidthAndHeigth : function() {
		this.width
		        && dojo.style(this.domNode, "width", isNaN(this.width)
		                        ? this.width
		                        : (this.width + "px"));
		this.height
		        && dojo.style(this.domNode, "height", isNaN(this.height)
		                        ? this.height
		                        : (this.height + "px"));
	},
	startup : function() {
		if (this._started) { return; }
		if (!this.dropDown) {
			var a = dojo.query("[widgetId]", this.dropDownContainer)[0];
			a && (this.dropDown = dijit.byNode(a));
			delete this.dropDownContainer;
		}
		if (this.dropDown) {
			dijit.popup.moveOffScreen
			        ? dijit.popup.moveOffScreen(this.dropDown.domNode)
			        : dijit.popup.prepare(this.dropDown.domNode);
		}
		this.inherited(arguments);
	},
	destroy : function() {
		dojo.forEach(this.conns, dojo.disconnect);
		this.dropDown && this.dropDown.destroy();
		this.inherited(arguments);
	},
	setDisabled : function(a) {
		this.inherited(arguments);
		if (a) {
			this.dropDownHandle && dojo.disconnect(this.dropDownHandle);
			this.dropDownHandle = null;
			dojo.removeClass(this.arrowNode, "u-form-dropBtn-icon-normal");
			dojo.addClass(this.arrowNode, "u-form-dropBtn-icon-disabled");
		} else {
			if (!this.dropDownHandle) {
				this.dropDownHandle = dojo.connect(this.arrowNode, "onclick", this,
				        "_processDropDown");
				this.conns.push(this.dropDownHandle);
			}
			dojo.removeClass(this.arrowNode, "u-form-dropBtn-icon-disabled");
			dojo.addClass(this.arrowNode, "u-form-dropBtn-icon-normal");
		}
	},
	_processDropDown : function(a) {
		if (this.onBeforeArrowClick(a) && this.dropDown) {
			this._openDropDown();
			this.onArrowClick(a);
		}
	},
	_openDropDown : function() {
		if (!this._opened) {
			var e = this.dropDown;
			var b = e.domNode.style.width;
			var c = this;
			dijit.popup.open({
				        parent : this,
				        popup : e,
				        around : this.domNode,
				        orient : this.isLeftToRight() ? {
					        BL : "TL",
					        BR : "TR",
					        TL : "BL",
					        TR : "BR"
				        } : {
					        BR : "TR",
					        BL : "TL",
					        TR : "BR",
					        TL : "BL"
				        },
				        onExecute : function() {
					        c._closeDropDown(true);
				        },
				        onCancel : function() {
					        c._closeDropDown(true);
				        },
				        onClose : function() {
					        e.domNode.style.width = b;
					        this._opened = false;
				        }
			        });
			if (this.domNode.offsetWidth > e.domNode.offsetWidth) {
				var d = null;
				if (!this.isLeftToRight()) {
					d = e.domNode.parentNode;
					var a = d.offsetLeft + d.offsetWidth;
				}
				dojo.marginBox(e.domNode, {
					        w : this.domNode.offsetWidth
				        });
				if (d) {
					d.style.left = a - this.domNode.offsetWidth + "px";
				}
			}
			this._opened = true;
		} else {
			this._closeDropDown();
		}
	},
	_closeDropDown : function() {
		if (this._opened) {
			dijit.popup.close(this.dropDown);
			this._opened = false;
		}
	},
	onBeforeArrowClick : function(a) {
		return true;
	},
	onArrowClick : function(a) {},
	_onButtonClick : function(a) {
		this._closeDropDown();
		this.onClick(a);
	},
	_onBlur : function() {
		this._closeDropDown();
	}
});
/* /unieap/ria3.3/unieap/form/FileInput.js */
dojo.provide("unieap.form.FileInput");
dojo.require("unieap.form.FormWidget");
dojo.declare("unieap.form.FileInput", unieap.form.FormWidget, {
	UserInterfaces : dojo.mixin({
		        label : "string",
		        cancelText : "string",
		        fileFilter : "string",
		        onBeforeCancel : "function",
		        onCancel : "function",
		        onChange : "function"
	        }, unieap.form.FormWidget.prototype.UserInterfaces),
	label : RIA_I18N.form.fileinput.browser,
	cancelText : RIA_I18N.form.fileinput.cancel,
	name : "uploadFile",
	fileFilter : "",
	templateString : "<div class='u-form-file'><span class='u-form-file-btn' dojoAttachPoint='cancelNode'></span><span class='u-form-file-btn' dojoAttachPoint='browseNode'></span><span class='u-form-file-required' dojoAttachPoint='requiredNode'>*</span><div dojoAttachPoint='fieldNode' class='u-form-field' style='position:relative;'><div dojoAttachPoint='errorNode' class='u-form-error'></div><div class='u-form-file-fileField'><input class='u-form-textbox-input' readonly tabindex='-1' type='text' dojoAttachPoint='focusNode,inputNode' onfocus='unieap.fep&&unieap.fep(this)'/></div></div><div class='u-form-file-realFileField' dojoAttachPoint='realinputArea'><input size='1' tabindex='-1' type='file' dojoAttachPoint='fileInput' style='cursor:pointer;position:absolute;width:62px;left:0;'></div></div>",
	postCreate : function() {
		this.inherited(arguments);
		if (dojo.isFF) {
			this.browseNode.textContent = this._processText(this.label);
			this.cancelNode.textContent = this._processText(this.cancelText);
		} else {
			this.browseNode.innerText = this._processText(this.label);
			this.cancelNode.innerText = this._processText(this.cancelText);
		}
		dojo.removeAttr(this.inputNode, "name");
		this.fileInput.name = this.name;
		this.inputNode.readOnly = true;
		this.fileFilter = this.fileFilter ? String(this.fileFilter).toLowerCase().split(",") : "";
		this.connect(this.cancelNode, "onclick", "_cancelClick");
		dojo.isIE && this.connect(this.inputNode, "onkeydown", "_stopBackSpaceKey");
		this._fileInputHandle = this.connect(this.fileInput, "onchange", "_onChange");
	},
	getValue : function() {
		return this.getFullPath();
	},
	onBeforeCancel : function() {
		return true;
	},
	onCancel : function(a) {},
	onChange : function(a) {},
	_stopBackSpaceKey : function(a) {
		a.keyCode == dojo.keys.BACKSPACE && dojo.stopEvent(a);
	},
	_processText : function(a) {
		return a;
	},
	setDisabled : function(a) {
		this.inherited(arguments);
		this.fileInput.disabled = a;
		this.browseNode.disabled = a;
		this.cancelNode.disabled = a;
	},
	_cancelClick : function(a) {
		if (this.onBeforeCancel()) {
			this._clearInput();
			this.onCancel(a);
		}
	},
	clearInput : function() {
		this._clearInput();
	},
	_clearInput : function() {
		if (dojo.isIE) {
			var a = dojo.clone(this.fileInput);
			this.realinputArea.innerHTML = "";
			this.disconnect(this._fileInputHandle);
			dojo.place(a, this.realinputArea);
			this.fileInput = a;
			this._fileInputHandle = this.connect(this.fileInput, "onchange", "_onChange");
		}
		this.inputNode.value = "";
		this.fileInput.value = "";
	},
	_onChange : function(a) {
		if (this._validateSuffix()) {
			this.inputNode.value = this.getFullPath();
			this.onChange(a);
			this.getValidator().validate();
		} else {
			this._clearInput();
			dojo.require("unieap.dialog.MessageBox");
			MessageBox.alert({
				        title : RIA_I18N.form.fileinput.info,
				        message : RIA_I18N.form.fileinput.fileInvalidFormer
				                + this.fileFilter.join(",")
				                + RIA_I18N.form.fileinput.fileInvalidLatter
			        });
		}
	},
	_validateSuffix : function() {
		var c = this.getFileName().toLowerCase();
		if (c) {
			if (this.fileFilter) {
				var a = c.lastIndexOf(".");
				if (a == -1) { return false; }
				var b = c.substring(a + 1);
				return dojo.some(this.fileFilter, function(d) {
					        return d == b;
				        });
			}
			return true;
		}
		return false;
	},
	getFileName : function() {
		var c = this.fileInput.value;
		if (c) {
			var b = c.lastIndexOf("\\");
			var a = c.substring(b + 1);
			return a;
		} else {
			return "";
		}
	},
	getFullPath : function() {
		return dojo.isFF ? this._getFFPath(this.fileInput) : this.fileInput.value;
	},
	_getFFPath : function(b) {
		var a = null;
		try {
			netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
			var d = b.value;
			a = Components.classes["@mozilla.org/file/local;1"]
			        .createInstance(Components.interfaces.nsILocalFile);
			a.initWithPath(d.replace(/\//g, "\\\\"));
		}
		catch (c) {}
		if (a && a.path) { return a.path; }
		return b.value;
	}
});
/* /unieap/ria3.3/unieap/form/FormBinding.js */
dojo.provide("unieap.form.FormBinding");
dojo.require("unieap.util.util");
dojo.declare("unieap.form.FormBinding", null, {
	        constructor : function(a) {
		        dojo.mixin(this, a);
		        this.connects = [];
		        this.store && this._initRow(this.store, this.bindIndex);
	        },
	        store : null,
	        datacenter : null,
	        bindIndex : 0,
	        connects : null,
	        getDataStore : function() {
		        return this.store;
	        },
	        setDataStore : function(a, b) {
		        this._initRow(a, b);
		        this.bind(this.row);
	        },
	        _initRow : function(b, c) {
		        typeof(c) == "undefined" && (c = 0);
		        var a;
		        if (this.datacenter) {
			        a = this.datacenter;
		        } else {
			        if (currentDataCenter) {
				        a = currentDataCenter;
			        } else {
				        a = dataCenter;
			        }
		        }
		        if (dojo.isString(b)) {
			        this.store = unieap.getDataStore(b, a, false);
		        } else {
			        this.store = b;
		        }
		        if (!this.store) { return; }
		        var d = this.store.getRowSet().getRowCount();
		        if (d == 0) {
			        this.store.getRowSet().addRow({});
			        d = 1;
		        }
		        this.bindIndex = (d <= c || c < 0) ? (d - 1) : c;
		        this.row = this.store.getRowSet().getRow(c);
	        },
	        getRow : function() {
		        return this.row;
	        },
	        bind : function(b) {
		        this.unbind();
		        !b && this.widget.clear();
		        if (!b || b.declaredClass != "unieap.ds.Row") { return; }
		        if (this.row != b || !this.row) {
			        this.row = b;
			        var a = this.row.getRowSet();
			        if (a) {
				        this.store = a.getDataStore();
			        }
		        }
		        this._bind(b);
		        this.addEventListener();
	        },
	        _bind : function(c) {
		        var b = [],
			        d = [], a;
		        dojo.forEach(this.widget.getDescendants(), function(h, f, g) {
			                if (!(h instanceof unieap.form.FormWidget)) { return; }
			                if (((a = h.dataProvider) && a.store) || ((a = h.decoder) && a.store)) {
				                var e = unieap.getDataStore(a.store, null, true);
				                if (!e) {
					                b.push(a.store);
					                d.push(h);
				                } else {
					                h.getBinding() && h.getBinding().bind(c);
				                }
			                } else {
				                h.getBinding() && h.getBinding().bind(c);
			                }
		                });
		        if (b.length > 0) {
			        unieap.Action.getMultiCodeList(b, dojo.hitch(this, function() {
				                        dojo.forEach(d, function(e) {
					                                e.getBinding() && e.getBinding().bind(c);
				                                });
				                        this.onBind();
			                        }));
		        } else {
			        this.onBind();
		        }
		        this._bind = function(e) {
			        dojo.forEach(this.widget.getDescendants(), function(h, f, g) {
				                h.getBinding() && h.getBinding().bind(e);
			                });
		        };
	        },
	        onBind : function() {},
	        unbind : function() {
		        dojo.forEach(this.widget.getDescendants(), function(a) {
			                a.setModified(false);
			                a.getValidator() && a.getValidator().handleError(true);
			                var b = a.getBinding();
			                b && b.unbind();
		                });
		        this.row = null;
		        this.store = null;
		        this.removelEventListener();
	        },
	        addEventListener : function() {
		        if (this.row.getRowSet() != null) {
			        this.connects.push(dojo.connect(this.row.getRowSet(), "onResetUpdate", this,
			                function() {
				                this.bind(this.row);
			                }));
			        this.connects.push(dojo.connect(this.getDataStore(), "onRowSetChanged", this,
			                function() {
				                this.setDataStore(this.getDataStore());
			                }));
		        }
	        },
	        removelEventListener : function() {
		        while (this.connects.length) {
			        dojo.disconnect(this.connects.pop());
		        }
	        }
        });
/* /unieap/ria3.3/unieap/form/FormHelper.js */
if (!dojo._hasResource["unieap.form.FormHelper"]) {
	dojo._hasResource["unieap.form.FormHelper"] = true;
	dojo.provide("unieap.form.FormHelper");
	dojo.declare("unieap.form.FormHelper", null, {
		        constructor : function(a) {
			        this.widget = a;
		        },
		        collectData : function(b) {
			        var c = this.widget.getDescendants(),
				        a = {};
			        dojo.forEach(c, function(e) {
				                var f = e.getBinding(), d;
				                if (f) {
					                d = f.name;
					                !a[d] && (a[d] = e.getValue());
				                } else {
					                if (!b) {
						                d = e.name || e.id;
						                !a[d] && (a[d] = e.getValue());
					                }
				                }
			                });
			        return a;
		        },
		        apply : function() {
			        dojo.forEach(this.widget.getDescendants(), function(b) {
				                var a = b.getValue();
				                b.setValue(a);
			                });
		        }
	        });
}
/* /unieap/ria3.3/unieap/form/FormWidgetBinding.js */
if (!dojo._hasResource["unieap.form.FormWidgetBinding"]) {
	dojo._hasResource["unieap.form.FormWidgetBinding"] = true;
	dojo.provide("unieap.form.FormWidgetBinding");
	dojo.declare("unieap.form.FormWidgetBinding", null, {
		        name : "",
		        dataType : "",
		        markDirty : true,
		        constructor : function(a) {
			        dojo.mixin(this, a);
			        this.connects = [];
		        },
		        isModified : function() {
			        return this.getValue() != this.getOrigValue();
		        },
		        setValue : function(b) {
			        if (!this.row) { return; }
			        var a = this.getDataType();
			        if (a == "number" && dojo.trim(String(b)) != "" && b != null && !isNaN(b)) {
				        b = Number(b);
			        }
			        this.getValue() != b && this.row.setItemValue(this.name, b);
			        this.markDirty && this.widget.setModified(this.row.isItemChanged(this.name));
		        },
		        getValue : function() {
			        var a = null;
			        if (this.row) {
				        a = this.row.getItemValue(this.name);
				        a == null && this.metadata && (a = this.metadata.getDefaultValue());
			        }
			        return a;
		        },
		        getDataType : function() {
			        var a = this.dataType;
			        if (!a && this.metadata) {
				        dojo.require("unieap.util.util");
				        a = unieap.getDataType(this.metadata.getDataType());
			        }
			        return a;
		        },
		        getOrigValue : function() {
			        return this.row && this.row.getItemOrigValue(this.name);
		        },
		        getRow : function() {
			        return this.row;
		        },
		        getMetaData : function() {
			        return this.metadata;
		        },
		        setMarkDirty : function(a) {
			        this.markDirty = a;
		        },
		        onBeforeBind : function() {},
		        bind : function(g) {
			        if (!this.name || !g) { return; }
			        this.onBeforeBind();
			        this.unbind();
			        this.row = g;
			        this.metadata = this.row.getRowSet().getMetaData(this.name);
			        var d = this.widget,
				        e = this.metadata;
			        dojo.require("unieap.form.TextBox");
			        if (e && (d instanceof unieap.form.TextBox)) {
				        var b = e.getMaxLength(),
					        c = e.getMinLength();
				        if (d.maxLength == -1 && b) {
					        d.inputNode.maxLength = b;
					        d.maxLength = b;
				        }
				        if (d.minLength == -1 && c) {
					        d.minLength = c;
				        }
				        dojo.require("unieap.form.NumberTextBox");
				        if (d instanceof unieap.form.NumberTextBox) {
					        var a = e.getPrecision(),
						        f = e.getScale();
					        if (d.precision == -1 && a) {
						        d.precision = a;
						        if (d.scale <= 0 && f && f < a) {
							        d.scale = f;
						        }
					        }
					        if (d.precision > -1 && d.scale <= 0 && f && f < d.precision) {
						        d.scale = f;
					        }
				        }
			        }
			        this.connect(this.widget, "fireDataChange", function() {
				                var h = this.widget.getValue();
				                this.setValue(h);
			                });
			        this.widget.setValue(this.getValue());
			        this.connect(this.row.getRowSet(), "onItemChanged", function(j, h, i) {
				                if (this.name == h && this.row.getData() == j.getData()
				                        && this.widget.getValue() != i) {
					                this.widget.setValue(i);
				                }
			                });
			        this._binded = true;
		        },
		        connect : function(b, a, c) {
			        this.connects.push(dojo.connect(b, a, this, c));
		        },
		        unbind : function() {
			        dojo.forEach(this.connects, function(a) {
				                dojo.disconnect(a);
			                });
			        this.connects = [];
			        this.row = null;
			        this.widget.setModified(false);
		        },
		        isBinded : function() {
			        return this._binded ? this._binded : false;
		        }
	        });
	unieap.form.FormWidgetBinding.prototype.bind._innerIdentify = "widgetBind";
}
/* /unieap/ria3.3/unieap/form/GroupDecoder.js */
if (!dojo._hasResource["unieap.form.GroupDecoder"]) {
	dojo._hasResource["unieap.form.GroupDecoder"] = true;
	dojo.provide("unieap.form.GroupDecoder");
	dojo.declare("unieap.form.GroupDecoder", null, {
		        valueAttr : "CODEVALUE",
		        displayAttr : "CODENAME",
		        constructor : function(a) {
			        dojo.mixin(this, a);
		        },
		        decode : function(a) {
			        return a;
		        },
		        getValueAttr : function() {
			        return this.valueAttr;
		        },
		        getDisplayAttr : function() {
			        return this.displayAttr;
		        }
	        });
}
/* /unieap/ria3.3/unieap/form/InlineDecoder.js */
dojo.provide("unieap.form.InlineDecoder");
dojo.require("unieap.rpc");
dojo.declare("unieap.form.InlineDecoder", null, {
	        store : null,
	        displayAttr : "CODENAME",
	        valueAttr : "CODEVALUE",
	        constructor : function(a) {
		        dojo.mixin(this, a);
		        this.store = unieap.Action.getCodeList(this.store);
	        },
	        decode : function(a) {
		        var b = a;
		        if (this.store) {
			        b = unieap.transcode(a, {
				                store : this.store,
				                valueAttr : this.valueAttr,
				                displayAttr : this.displayAttr
			                });
			        if (b == "") { return a; }
		        }
		        return b;
	        }
        });
/* /unieap/ria3.3/unieap/form/InlineEditBox.js */
dojo.provide("unieap.form.InlineEditBox");
dojo.require("unieap.form.FormWidget");
dojo.declare("unieap.form.InlineEditBox", unieap.form.FormWidget, {
	UserInterfaces : dojo.mixin({
		        showUnderLine : "boolean",
		        decoder : "object",
		        editor : "object",
		        displayFormatter : "object",
		        value : "string",
		        disabled : "boolean",
		        skipFocus : "boolean",
		        onChange : "function"
	        }, unieap.form.FormWidget.prototype.UserInterfaces),
	templateString : '<div class="u-form-inlineWidget"><div dojoAttachPoint="inlineNode"  class="u-form-inline"><div dojoAttachPoint="modifiedNode" class="u-form-modified"></div><div class="u-form-inline-display" dojoAttachPoint="displayNode,focusNode"></div></div></div>',
	showUnderLine : true,
	decoder : null,
	displayFormatter : null,
	valueFormatter : null,
	editor : {},
	disabled : false,
	value : "",
	skipFocus : true,
	onChange : function(a) {},
	postCreate : function() {
		unieap.setLabelFormatProps(this);
		if (!this.showUnderLine) {
			this.inlineNode.style.height = "20px";
			this.inlineNode.style.borderBottom = "1px";
		}
		this.connect(this.domNode, "onclick", "_onClick");
		this.connect(this.inlineNode, "onmouseover", "_onMouseover");
		this.connect(this.inlineNode, "onmouseout", "_onMouseout");
		this.value && this.setValue(this.value);
		this.orignBinding = dojo.clone(this.binding);
	},
	destroy : function() {
		if (this.getEditor().editWidget) {
			this.getEditor().editWidget.destroy();
		}
		this.inherited(arguments);
	},
	_onClick : function(a) {
		if (this.disabled || this.editing) { return; }
		if (a) {
			dojo.stopEvent(a);
		}
		var b = this.getEditor();
		b.attachEditor();
	},
	_onMouseover : function(a) {
		var c = dojo.style(this.displayNode, "height") > dojo.style(this.displayNode, "lineHeight");
		var d = this.getText();
		var b = this.domNode;
		if (c && d) {
			this.toolTip = window.setTimeout(function() {
				        unieap.showTooltip({
					                inner : d,
					                autoClose : true
				                }, b);
			        }, 500);
		}
	},
	_onMouseout : function(a) {
		var c = dojo.style(this.displayNode, "height") > dojo.style(this.displayNode, "lineHeight");
		var b = this.domNode;
		if (c && this.toolTip) {
			window.clearTimeout(this.toolTip);
			unieap.hideTooltip(b);
		}
	},
	getEditor : function() {
		this.editor.editorProps = dojo.mixin({}, this.editor.editorProps, {
			        binding : this.orignBinding
		        });
		return unieap.getModuleInstance(this, "editor", "unieap.form.InlineEditor");
	},
	getDisplayFormatter : function() {
		return unieap.getModuleInstance(this, "displayFormatter", "unieap.form.SimpleFormatter");
	},
	getDecoder : function() {
		return unieap.getModuleInstance(this, "decoder", "unieap.form.InlineDecoder");
	},
	setDecoder : function(a) {
		this.getDecoder = dojo.getObject(this.declaredClass).prototype.getDecoder;
		this.decoder = a;
		this.setValue(this.value);
	},
	getValueFormatter : function() {
		return unieap.getModuleInstance(this, "valueFormatter", "unieap.form.SimpleFormatter");
	},
	setValue : function(a) {
		(a == null || typeof(a) == "undefined") && (a = "");
		this.value = a;
		if (this.editing) { return; }
		if (this.decoder) {
			a = this.getDecoder().decode(a);
		}
		if (this.valueFormatter) {
			a = this.getValueFormatter().format(a);
		}
		if (this.displayFormatter) {
			a = this.getDisplayFormatter().format(a);
		}
		this.setText(a);
		this.fireDataChange();
	},
	getValue : function() {
		return this.value;
	},
	getText : function() {
		return this.displayNode[dojo.isFF ? "textContent" : "innerText"] || "";
	},
	setText : function(a) {
		a = a == null ? "" : dojo.trim(String(a));
		this.displayNode[dojo.isFF ? "textContent" : "innerText"] = a;
	}
});
/* /unieap/ria3.3/unieap/form/InputFilter.js */
dojo.provide("unieap.form.InputFilter");
dojo.declare("unieap.form.InputFilter", null, {
	constructor : function(a) {
		dojo.mixin(this, a);
	},
	filterRule : "",
	filter : function(a) {
		var c = a.charOrCode;
		if (this.filterRule) {
			if (this.isSpecialKey(a)) { return; }
			if (!new RegExp(this.filterRule).test(c)) {
				dojo.stopEvent(a);
			}
			if (this.widget.declaredClass == "unieap.form.NumberTextBox") {
				var b = this.widget.getText();
				if ((b.indexOf("-") > -1 && "-" == c) || (b.indexOf(".") > -1 && "." == c)) {
					dojo.stopEvent(a);
				}
			}
		}
	},
	setFilterRule : function(a) {
		this.filterRule = a;
	},
	isSpecialKey : function(a) {
		var b = [8, 9, 13, 37, 39];
		if (dojo.indexOf(b, a.charOrCode) > -1) {
			return true;
		} else {
			if (a.ctrlKey
			        && dojo.indexOf([65, 67, 86, 88, 97, 99, 118, 120, 129], a.keyCode || a.which) > -1) { return true; }
		}
		return false;
	}
});
/* /unieap/ria3.3/unieap/form/NumberTextBox.js */
dojo.provide("unieap.form.NumberTextBox");
dojo.require("unieap.form.TextBox");
dojo.declare("unieap.form.NumberTextBox", unieap.form.TextBox, {
	        UserInterfaces : dojo.mixin({
		                range : "object",
		                precision : "number",
		                scale : "number"
	                }, unieap.form.TextBox.prototype.UserInterfaces),
	        displayFormatterClass : "unieap.form.NumberDisplayFormatter",
	        validatorClass : "unieap.form.NumberTextBoxValidator",
	        inputFilter : {
		        filterRule : /[-\.\d]/
	        },
	        range : null,
	        precision : -1,
	        scale : 0,
	        postMixInProperties : function() {
		        this.inherited(arguments);
		        !this.range && (this.range = {
			        min : -Infinity,
			        max : Infinity,
			        allowDecimal : true
		        });
		        typeof(this.range.max) == "undefined" && (this.range.max = Infinity);
		        typeof(this.range.min) == "undefined" && (this.range.min = -Infinity);
		        typeof(this.range.allowDecimal) == "undefined" && (this.range.allowDecimal = true);
	        },
	        postCreate : function() {
		        this.password = false;
		        this.inherited(arguments);
		        dojo.style(this.inputNode, "imeMode", "disabled");
		        this._initMaxLength();
		        if (this.range.min > this.range.max) {
			        this.range.min = -Infinity;
		        }
	        },
	        setValue : function(a) {
		        a == null && (a = "");
		        this.inherited(arguments);
	        },
	        _initMaxLength : function() {
		        if (this.maxLength > -1) {
			        this.inputNode.maxLength = this.maxLength;
		        }
		        if (this.precision > -1) {
			        if (this.scale >= this.precision || !this.scale || this.scale < 0) {
				        this.scale = 0;
			        }
		        }
	        },
	        _onBlur : function(b) {
		        if (!b || typeof(b) == "string") { return; }
		        var c = this.inputNode.value;
		        var a = c.length;
		        if (a > 0 && c.indexOf(".") == a - 1) {
			        this.inputNode.value = this.inputNode.value.substring(0, a - 1);
		        }
		        this.inherited(arguments);
	        }
        });
/* /unieap/ria3.3/unieap/form/NumberSpinner.js */
dojo.provide("unieap.form.NumberSpinner");
dojo.require("unieap.form.FormWidget");
dojo.require("unieap.form.NumberTextBoxValidator");
dojo.declare("unieap.form.NumberSpinner", [unieap.form.NumberTextBox, unieap.form.FormWidget], {
	UserInterfaces : dojo.mixin({
		        smallDelta : "number",
		        constraints : "object"
	        }, unieap.form.FormWidget.prototype.UserInterfaces),
	templateString : "<div class='u-form-widget'><div dojoAttachPoint='requiredNode' class='u-form-required'>*</div><div dojoAttachPoint='fieldNode' class='u-form-field'><div dojoAttachPoint='modifiedNode' class='u-form-modified'></div><div class='u-form-spinner-icon' dojoAttachPoint='iconNode'><div tabindex='-1' class='u-form-spinner-arrowup' dojoAttachPoint='iconUpNode'></div><div tabindex='-1' class='u-form-spinner-arrowdown' dojoAttachPoint='iconDownNode'></div></div><div dojoAttachPoint='errorNode' class='u-form-error'></div><div class='u-form-textbox-field'><input dojoAttachPoint='inputNode,focusNode,textbox' class='u-form-textbox-input' onfocus='unieap.fep&&unieap.fep(this)'></div></div></div>",
	smallDelta : 1,
	constraints : {
		max : 999999,
		min : -999999
	},
	valueFormatterClass : "unieap.form.SimpleFormatter",
	postCreate : function() {
		this.inherited(arguments);
		this.connect(this.iconNode, "mouseover", "domouseover");
		this.connect(this.iconUpNode, "mousedown", "doupdown");
		this.connect(this.iconUpNode, "mouseup", "doupup");
		this.connect(this.iconDownNode, "mousedown", "dodowndown");
		this.connect(this.iconDownNode, "mouseup", "dodownup");
		var a = this.getBinding();
	},
	domouseover : function(a) {
		a.target.style.cursor = "hand";
	},
	doupdown : function(d) {
		dojo.addClass(this.iconUpNode, "u-form-spinner-arrowup-down");
		if (this.disabled || this.readOnly) { return; }
		var c = this.getValue();
		isNaN(c) && (c = this.constraints.min);
		var b = c + this.smallDelta;
		if (b > this.constraints.max) { return; }
		this.setValue(b);
		var a = this;
		this.handleUp && clearTimeout(this.handleUp);
		this.handleUp = setTimeout(dojo.hitch(a, function() {
			                a.doupdown();
		                }), 150);
	},
	doupup : function(a) {
		this.handleUp && clearTimeout(this.handleUp);
		dojo.removeClass(this.iconUpNode, "u-form-spinner-arrowup-down");
	},
	dodowndown : function(d) {
		dojo.addClass(this.iconDownNode, "u-form-spinner-arrowdown-down");
		if (this.disabled || this.readOnly) { return; }
		var c = this.getValue();
		isNaN(c) && (c = this.constraints.max);
		var b = c - this.smallDelta;
		if (b < this.constraints.min) { return; }
		this.setValue(b);
		var a = this;
		this.handleDown && clearTimeout(this.handleDown);
		this.handleDown = setTimeout(dojo.hitch(a, function() {
			                a.dodowndown();
		                }), 150);
	},
	dodownup : function(a) {
		this.handleDown && clearTimeout(this.handleDown);
		dojo.removeClass(this.iconDownNode, "u-form-spinner-arrowdown-down");
	},
	getValue : function() {
		var a = this.getText();
		a = parseInt(a);
		return a;
	}
});
/* /unieap/ria3.3/unieap/form/PromptManager.js */
dojo.provide("unieap.form.PromptManager");
dojo.require("unieap.Tooltip");
dojo.declare("unieap.form.PromptManager", null, {
	        promptMsg : "",
	        duration : 1000,
	        constructor : function(a) {
		        dojo.mixin(this, a);
	        },
	        showPromptMsg : function(a) {
		        var b = this;
		        setTimeout(function() {
			                if (b.promptMsg) {
				                unieap.showTooltip(b.promptMsg, a, ["after", "before", "above",
				                                "below"]);
			                }
		                }, 0);
		        if (b.duration > 0) {
			        this._handler = setTimeout(function() {
				                b.hidePromptMsg(a);
			                }, b.duration);
		        }
	        },
	        hidePromptMsg : function(a) {
		        window.clearTimeout(this._handler);
		        unieap.hideTooltip(this.promptMsg, a);
	        },
	        setPromptMsg : function(a) {
		        this.promptMsg = a;
	        },
	        setDuration : function(a) {
		        this.duration = a;
	        }
        });
/* /unieap/ria3.3/unieap/form/RadioButton.js */
dojo.provide("unieap.form.RadioButton");
dojo.require("unieap.form.CheckBox");
dojo.declare("unieap.form.RadioButton", unieap.form.CheckBox, {
	templateString : '<div class="u-form-rdoBtn" ><div dojoAttachPoint="modifiedNode" class="u-form-modified"></div><input type="radio" class="u-form-chkInput" name="${name}"  dojoAttachPoint="inputNode,focusNode" onfocus="unieap.fep&&unieap.fep(this)"/></div>',
	name : "radioBtn",
	_onButtonClick : function(a) {
		if (!this.onBeforeClick() || !this.onBeforeChange()) {
			dojo.stopEvent(a);
			return;
		}
		this.setChecked(true);
		this.onClick(a);
		this._onChange();
	}
});
/* /unieap/ria3.3/unieap/form/RadioButtonGroup.js */
dojo.provide("unieap.form.RadioButtonGroup");
dojo.require("unieap.form.CheckGroup");
dojo.require("unieap.form.RadioButton");
dojo.declare("unieap.form.RadioButtonGroup", unieap.form.CheckGroup, {
	        postCreate : function() {
		        this.inherited(arguments);
		        this._attachTab();
	        },
	        _attachTab : function() {
		        for (var a = 0; a < this.checkboxMap.length; a++) {
			        dojo.connect(this.checkboxMap[a], "onTab", this, "onTab");
		        }
	        },
	        getCheckBox : function(e) {
		        if (this.checkboxMap[e]) { return this.checkboxMap[e]; }
		        var d = this.getDataProvider();
		        var a = this.getDecoder().getValueAttr();
		        var c = {
			        checkedValue : d.getItemValue(a, e),
			        uncheckedValue : null,
			        name : this.name || this.id
		        };
		        if (this.nextFocusId && !dojo.isIE) {
			        dojo.mixin(c, {
				                nextFocusId : this.nextFocusId
			                });
		        }
		        var b = new unieap.form.RadioButton(c);
		        b.onChange = dojo.hitch(this, function(f) {
			                if (f) {
				                this._onChange(b);
			                }
		                });
		        dojo.style(b.modifiedNode, "display", "none");
		        this.checkboxMap[e] = b;
		        return b;
	        },
	        setValue : function(c) {
		        c = c != null ? String(c) : "";
		        var d = this.checkboxMap;
		        for (var b = 0, a = d.length; b < a; b++) {
			        if (String(d[b].getCheckedValue()) == c) {
				        d[b].setValue(d[b].getCheckedValue());
			        } else {
				        d[b].setValue(d[b].getUncheckedValue());
			        }
		        }
		        this.getValidator().validate();
		        this.fireDataChange();
	        },
	        getValue : function() {
		        var b = this.checkboxMap;
		        for (var a = 0; a < b.length; a++) {
			        if (b[a].checked) { return b[a].getCheckedValue(); }
		        }
		        return "";
	        },
	        getText : function() {
		        var b = this.checkboxMap;
		        for (var a = 0; a < b.length; a++) {
			        if (b[a].checked) { return this.getLabel(a); }
		        }
		        return "";
	        },
	        _onChange : function(b) {
		        var c = this.checkboxMap;
		        for (var a = 0; a < c.length; a++) {
			        if (c[a] == b) {
				        continue;
			        }
			        c[a].setValue(c[a].getUncheckedValue());
		        }
		        this.getValidator().validate();
		        this.fireDataChange();
		        this.onChange(b);
	        },
	        setNextFocusId : function(b) {
		        this.nextFocusId = b;
		        for (var a = 0; a < this.checkboxMap.length; a++) {
			        this.checkboxMap[a].setNextFocusId(b);
		        }
	        }
        });

/* /unieap/ria3.3/unieap/form/RichTextEditor.js */
dojo.provide("unieap.form.RichTextEditor");
dojo.require("unieap.fckeditor.fckeditor");
dojo.require("unieap.form.FormWidget");
dojo.declare("unieap.form.RichTextEditor", unieap.form.FormWidget, {
	UserInterfaces : dojo.mixin({
		        oFCKeditor : "object",
		        initValue : "object",
		        imageUploadURL : "string",
		        linkUploadURL : "string",
		        uploadParameter : "string",
		        toolbarSet : "string"
	        }, unieap.form.FormWidget.prototype.UserInterfaces),
	templateString : "<div style=\"width:100%;height:300px\"><div dojoAttachPoint='requiredNode' class='u-form-required'>*</div><div dojoAttachPoint='errorNode' class='u-form-error'></div><div dojoAttachPoint='fieldNode' style='height:100%;overflow:hidden;zoom:1;'><textarea  dojoAttachPoint=\"focusNode,editNode,stateNode\" onfocus=\"unieap.fep&&unieap.fep(this)\"></textarea></div></div>",
	basePath : dojo.moduleUrl("") + "unieap/fckeditor/",
	oFCKeditor : null,
	editor : null,
	initValue : null,
	imageUploadURL : unieap.WEB_APP_NAME + "/ria_richEditor.do?Type=Image&method=upload",
	linkUploadURL : unieap.WEB_APP_NAME + "/ria_richEditor.do?Type=File&method=upload",
	flashUploadURL : unieap.WEB_APP_NAME + "/ria_richEditor.do?Type=Flash&method=upload",
	uploadParameter : "",
	toolbarSet : "Default",
	valueEditor : null,
	_isListenBlur : false,
	setValue : function(a) {
		if (window.FCKeditorAPI) {
			this.editor = FCKeditorAPI.GetInstance(this.id);
			this.editor.SetData(a);
			if (!this._isListenBlur) {
				this.editor.Events.AttachEvent("OnBlur", dojo.hitch(this, this._onBlur));
				this._isListenBlur = true;
			}
		} else {
			this._tmpVlaue = a;
			window.FCKeditor_OnComplete = function(b) {
				var c = dijit.byId(b.Name);
				c.editor = FCKeditorAPI.GetInstance(c.id);
				c.editor.SetData(c._tmpVlaue);
				delete c._tmpVlaue;
				if (!c._isListenBlur) {
					c.editor.Events.AttachEvent("OnBlur", dojo.hitch(c, c._onBlur));
					c._isListenBlur = true;
				}
			};
		}
	},
	_onBlur : function() {
		this.fireDataChange();
		this.getValidator().validate();
	},
	postCreate : function() {
		this.inherited(arguments);
		if (this.uploadParameter.length > 0) {
			var a = "&uploadParameter=" + this.uploadParameter;
			this.imageUploadURL += a;
			this.linkUploadURL += a;
			this.flashUploadURL += a;
		}
		var b = dojo.moduleUrl("") + "unieap/fckeditor/";
		if (dojo.isIE) {
			dojo.attr(this.focusNode, "id", this.id);
		} else {
			dojo.attr(this.focusNode, "name", this.id);
		}
		this.oFCKeditor = new FCKeditor(this.id);
		this.oFCKeditor.BasePath = b;
		this.focusNode.value = this.initValue;
		this.oFCKeditor.Width = this.domNode.style.width;
		this.oFCKeditor.Height = this.domNode.style.height;
		this.oFCKeditor.Config.ImageUploadURL = this.imageUploadURL;
		this.oFCKeditor.Config.LinkUploadURL = this.linkUploadURL;
		this.oFCKeditor.Config.FlashUploadURL = this.flashUploadURL;
		this.oFCKeditor.Config.AutoDetectLanguage = false;
		this.oFCKeditor.Config.DefaultLanguage = this.getLanguage();
		this.oFCKeditor.ToolbarSet = this.toolbarSet;
		dojo.addOnLoad(dojo.hitch(this, function() {
			        this.oFCKeditor.ReplaceTextarea();
		        }));
		this.valueEditor = document.createElement("textarea");
		this.valueEditor.style.display = "none";
		document.body.appendChild(this.valueEditor);
	},
	getValue : function() {
		this.editor = FCKeditorAPI.GetInstance(this.id);
		this.valueEditor.value = this.editor.GetHTML();
		return this.valueEditor.value;
	},
	postMixInProperties : function() {
		if (this.srcNodeRef && this.srcNodeRef.innerHTML != "") {
			this.initValue = this.srcNodeRef.innerHTML;
			this.srcNodeRef.innerHTML = "";
		}
		if ((!this.initValue || this.initValue == "") && this.srcNodeRef && this.srcNodeRef.value) {
			this.initValue = this.srcNodeRef.value;
		}
		if (!this.initValue) {
			this.initValue = "";
		}
	},
	getLanguage : function() {
		var b = {
			af : "Afrikaans",
			ar : "Arabic",
			bg : "Bulgarian",
			bn : "Bengali/Bangla",
			bs : "Bosnian",
			ca : "Catalan",
			cs : "Czech",
			da : "Danish",
			de : "German",
			el : "Greek",
			en : "English",
			"en-au" : "English (Australia)",
			"en-ca" : "English (Canadian)",
			"en-uk" : "English (United Kingdom)",
			eo : "Esperanto",
			es : "Spanish",
			et : "Estonian",
			eu : "Basque",
			fa : "Persian",
			fi : "Finnish",
			fo : "Faroese",
			fr : "French",
			"fr-ca" : "French (Canada)",
			gl : "Galician",
			gu : "Gujarati",
			he : "Hebrew",
			hi : "Hindi",
			hr : "Croatian",
			hu : "Hungarian",
			is : "Icelandic",
			it : "Italian",
			ja : "Japanese",
			km : "Khmer",
			ko : "Korean",
			lt : "Lithuanian",
			lv : "Latvian",
			mn : "Mongolian",
			ms : "Malay",
			nb : "Norwegian Bokmal",
			nl : "Dutch",
			no : "Norwegian",
			pl : "Polish",
			pt : "Portuguese (Portugal)",
			"pt-br" : "Portuguese (Brazil)",
			ro : "Romanian",
			ru : "Russian",
			sk : "Slovak",
			sl : "Slovenian",
			sr : "Serbian (Cyrillic)",
			"sr-latn" : "Serbian (Latin)",
			sv : "Swedish",
			th : "Thai",
			tr : "Turkish",
			uk : "Ukrainian",
			vi : "Vietnamese",
			zh : "Chinese Traditional",
			"zh-cn" : "Chinese Simplified"
		};
		if (unieap.locale == "" && unieap.locale == null) { return "zh-cn"; }
		var a = unieap.locale.toLowerCase();
		if (a != "" && a != null) {
			a = a.replace("_", "-");
		}
		if (a.length >= 5) {
			a = a.substr(0, 5);
			if (b[a]) { return a; }
		}
		if (a.length >= 2) {
			a = a.substr(0, 2);
			if (b[a]) { return a; }
		}
		return "zh-cn";
	}
});
/* /unieap/ria3.3/unieap/form/Textarea.js */
if (!dojo._hasResource["unieap.form.Textarea"]) {
	dojo._hasResource["unieap.form.Textarea"] = true;
	dojo.provide("unieap.form.Textarea");
	dojo.require("unieap.form.TextBox");
	dojo.declare("unieap.form.Textarea", unieap.form.TextBox, {
		        height : "50px",
		        postCreate : function() {
			        this.password = false;
			        var b = this.inputNode;
			        dojo.style(this.fieldNode, "position", "relative");
			        dojo.style(this.errorNode, {
				                position : "absolute",
				                right : "17px"
			                });
			        this.inputNode = this.focusNode = dojo.create("textarea", {
				                "class" : "u-form-textarea-input",
				                name : b.name,
				                tabIndex : b.tabIndex,
				                style : {
					                overflowX : "hidden",
					                overflowY : "scroll"
				                }
			                });
			        b.parentNode.replaceChild(this.inputNode, b);
			        this.inputNode.onfocus = function() {
				        unieap.fep && unieap.fep(this);
			        };
			        dojo.style(this.inputNode.parentNode, "height", "100%");
			        dojo.style(this.inputNode, "height", "100%");
			        this.inherited(arguments);
			        this.connects = [];
			        if (this.height.indexOf("%") > 0) {
				        dojo.addClass(this.domNode, "unieap-container");
			        } else {
				        var a = parseInt(this.height, 10) - 2;
				        dojo.style(this.fieldNode, "height", a + "px");
				        dojo.style(this.inputNode, "height", a + "px");
			        }
		        },
		        onEnter : function() {
			        return false;
		        },
		        resizeContainer : function() {
			        var b = dojo.contentBox(this.domNode),
				        a = b.h - 2;
			        if (a > 0) {
				        dojo.style(this.fieldNode, "height", a + "px");
				        dojo.style(this.inputNode, "height", a + "px");
			        }
		        },
		        startup : function() {
			        dojo.require("unieap.layout.Container");
			        var a = unieap.layout.Container.prototype;
			        if (!a.getParentContainer.apply(this, arguments)) {
				        a.bindEvent4onresize.apply(this, arguments);
				        this.resizeContainer();
			        }
		        },
		        destroy : function() {
			        this.inherited(arguments);
			        while (this.connects.length) {
				        dojo.disconnect(this.connects.pop());
			        }
		        }
	        });
}
/* /unieap/ria3.3/unieap/form/DateTextBox.js */
if (!dojo._hasResource["unieap.form.DateTextBox"]) {
	dojo._hasResource["unieap.form.DateTextBox"] = true;
	dojo.provide("unieap.form.DateTextBox");
	dojo.require("unieap.form.TextBoxWithIcon");
	dojo.require("unieap.util.util");
	dojo.require("dojo.date");
	dojo.declare("unieap.form.DateTextBox", unieap.form.TextBoxWithIcon, {
		UserInterfaces : dojo.mixin({
			        autoDate : "boolean",
			        range : "object",
			        elementNumber : "number",
			        currentNode : "number",
			        yearNumber : "number"
		        }, unieap.form.TextBoxWithIcon.prototype.UserInterfaces),
		autoDate : unieap.widget.form.autoDate,
		iconClass : "u-calendar-icon",
		editFormatterClass : "unieap.form.DateDisplayFormatter",
		displayFormatterClass : "unieap.form.DateDisplayFormatter",
		valueFormatterClass : "unieap.form.DateValueFormatter",
		validatorClass : "unieap.form.DateValidator",
		popupClass : "unieap.form.DateTextBoxPopup",
		range : {
			min : 1900,
			max : 2999
		},
		elementNumber : 6,
		currentNode : 0,
		yearNumber : 0,
		_displayFormat : "",
		getEditFormatter : function() {
			return this.getDisplayFormatter();
		},
		postCreate : function() {
			if (!this.displayFormatter) {
				this.displayFormatter = {};
			}
			this.inherited(arguments);
			dojo.removeClass(this.iconNode, ["u-textbox-icon", "u-form-textbox-icon-normal"]);
			this._displayFormat = this.getDisplayFormatter().getFormat();
			this._parseFormat();
			dojo.addOnLoad(dojo.hitch(this, this._preDate));
		},
		setDisabled : function(a) {
			if (a) {
				this.setIconClass("u-calendar-disabled");
				this.inherited(arguments);
			} else {
				this.setIconClass("u-calendar-icon");
				this.inherited(arguments);
			}
		},
		getValue : function() {
			var b = this.getText();
			b = this.getDisplayFormatter().parse(b);
			if (Number(b)) {
				var c = this.getBinding();
				var a = c ? c.getOrigValue() : this.origValue;
				if (a
				        && this.getDisplayFormatter().format(b) == this.getDisplayFormatter()
				                .format(a)) {
					b = a;
				}
			}
			b = this.getValueFormatter().parse(b);
			return b;
		},
		updateDisplayText : function() {
			this._clearState();
			this._parsedFormat = null;
			this._displayFormat = this.getDisplayFormatter().getFormat();
			this._parseFormat();
			var a = this.getPopup();
			a._isShowingNow && a.close();
			a._calendar && a._calendar.setDateFormat(this._parsedFormat);
			this.setText(this.getDisplayFormatter().format(this.getValue()));
		},
		select : function() {
			var a = arguments.callee.caller;
			if (a.nom != "_onFocus") {
				this.focusNode && this.focusNode.select();
			}
		},
		_preDate : function() {
			if (this.validator && this.validator.preDate) {
				var a = dijit.byId(this.validator.preDate);
				a && (a.getValidator().nextDate = this.id);
			}
		},
		_initElement : function(c, f, e, b, d, a) {
			this.elementNode[c] = f;
			this.elementBegin[c] = e;
			this.elementEnd[c] = b;
			this.elementMin[c] = d;
			this.elementMax[c] = a;
		},
		_parseFormat : function() {
			this.elementNode = [];
			this.elementBegin = [];
			this.elementEnd = [];
			this.elementMax = [];
			this.elementMin = [];
			var a = this._parseDateFormat(this._displayFormat);
			var b = 0;
			var e = 0;
			var d = 0;
			for (var c = 0; c < a.length; c++) {
				if (a.charAt(c) == "%") {
					switch (a.charAt(c + 1)) {
						case "Y" :
							d = this._displayFormat.indexOf("yyyy");
							this._initElement(b, "yyyy", d + 1, d + 4, this.range.min,
							        this.range.max);
							b++;
							break;
						case "m" :
							d = this._displayFormat.indexOf("MM");
							this._initElement(b, "MM", d + 1, d + 2, 1, 12);
							b++;
							break;
						case "d" :
							d = this._displayFormat.indexOf("dd");
							this._initElement(b, "dd", d + 1, d + 2, 1, 31);
							b++;
							break;
						case "H" :
							d = this._displayFormat.indexOf("HH");
							this._initElement(b, "HH", d + 1, d + 2, 0, 23);
							b++;
							break;
						case "I" :
							d = this._displayFormat.indexOf("hh");
							this._initElement(b, "hh", d + 1, d + 2, 1, 12);
							b++;
							break;
						case "M" :
							d = this._displayFormat.indexOf("mm");
							this._initElement(b, "mm", d + 1, d + 2, 0, 59);
							b++;
							break;
						case "S" :
							d = this._displayFormat.indexOf("ss");
							this._initElement(b, "ss", d + 1, d + 2, 0, 59);
							b++;
							break;
						case "P" :
							d = this._displayFormat.indexOf("am");
							this._initElement(b, "ap", d + 1, d + 2, "am", "pm");
							break;
						default :
							break;
					}
					e++;
				}
			}
			this.elementNumber = e;
		},
		_parseDateFormat : function(a) {
			if (!a || typeof a != "string" || a.indexOf("%") != -1) { return "%Y-%m-%d %H:%M:%S"; }
			if (this._parsedFormat) { return this._parsedFormat; }
			var b = a;
			if (b.indexOf("yyyy") != -1) {
				b = b.replace(/yyyy/g, "%Y");
			}
			if (b.indexOf("MM") != -1) {
				b = b.replace(/MM/g, "%m");
			}
			if (b.indexOf("dd") != -1) {
				b = b.replace(/dd/g, "%d");
			}
			if (b.indexOf("hh") != -1) {
				b = b.replace(/hh/g, "%I");
			} else {
				if (b.indexOf("HH") != -1) {
					b = b.replace(/HH/g, "%H");
				}
			}
			if (b.indexOf("mm") != -1) {
				b = b.replace(/mm/g, "%M");
			}
			if (b.indexOf("ss") != -1) {
				b = b.replace(/ss/g, "%S");
			}
			if (b.indexOf("%I") != -1) {
				b = b + " %P";
				this._displayFormat = this._displayFormat + " am";
			}
			this._parsedFormat = b;
			return b;
		},
		_textSelect : function(d, a) {
			var b = a - d + 1;
			d = d < 1 ? 1 : d;
			b = b < 0 ? 0 : b;
			if (dojo.isIE) {
				var c = this.textbox.createTextRange();
				c.collapse();
				c.moveStart("character", d - 1);
				c.moveEnd("character", b);
				c.select();
			} else {
				this.textbox.setSelectionRange(d - 1, a);
			}
		},
		_getCursorPos : function() {
			if (typeof(this.textbox.selectionStart) == "number") {
				return this.textbox.selectionStart + 1;
			} else {
				var b = this.textbox.value.length;
				var a = document.selection.createRange();
				var d = this.textbox.createTextRange();
				d.collapse();
				if (a.inRange(d)) { return 1; }
				for (var c = 2; c <= b + 1; c++) {
					d.move("character", 1);
					if (a.inRange(d)) { return c; }
				}
			}
		},
		_getText : function(b, a) {
			return this.textbox.value.substr(b - 1, a - b + 1);
		},
		_setText : function(c, a, b) {
			this.textbox.value = this.textbox.value.substr(0, c - 1) + b
			        + this.textbox.value.substr(a);
		},
		_getSelectText : function() {
			return this._getText(this.elementBegin[this.currentNode],
			        this.elementEnd[this.currentNode]);
		},
		_setSelectText : function(c, b) {
			var a = this._getSelectText();
			if (c.length != a.length) {
				c = "0000" + c;
				c = c.substr(c.length - a.length, c.length);
			}
			this
			        ._setText(this.elementBegin[this.currentNode],
			                this.elementEnd[this.currentNode], c);
			if (b) {
				this._selectNext();
			} else {
				this._textSelect(this.elementBegin[this.currentNode],
				        this.elementEnd[this.currentNode]);
			}
		},
		_selectNext : function() {
			this._onRightClick();
		},
		_getElementMin : function() {
			return this.elementMin[this.currentNode];
		},
		_getElementMax : function() {
			if (this.elementMax[this.currentNode] == 31) {
				return this._getDayMax();
			} else {
				return this.elementMax[this.currentNode];
			}
		},
		_getDayMax : function() {
			var d, e, c, f;
			for (var b = 0; b < this.elementNumber; b++) {
				if (this.elementNode[b] == "yyyy") {
					d = b;
				} else {
					if (this.elementNode[b] == "MM") {
						e = b;
					}
				}
			}
			if (d != "undefined") {
				c = parseInt(this._getText(this.elementBegin[d], this.elementEnd[d]));
			}
			f = parseInt(this._getText(this.elementBegin[e], this.elementEnd[e]), 10);
			var a = new Date(c, f - 1, 1);
			return dojo.date.getDaysInMonth(a);
		},
		_doElemetValidator : function() {
			if (this.textbox.value != "") {
				for (var c = 0; c < this.elementNumber; c++) {
					if (this.elementNode[c] == "yyyy" || this.elementNode[c] == "MM"
					        || this.elementNode[c] == "dd" || this.elementNode[c] == "hh") {
						var a = this.currentNode;
						this.currentNode = c;
						var b = parseInt(this._getText(this.elementBegin[c], this.elementEnd[c]),
						        10);
						if (b > this._getElementMax() || b < this._getElementMin()) {
							this._setText(this.elementBegin[c], this.elementEnd[c], this
							                ._getElementMax());
						}
						this.currentNode = a;
					}
				}
			}
		},
		_clearState : function() {
			this.yearNumber = 0;
			for (var b = 0; b < this.elementNode.length; b++) {
				var a = "dateTextElementNode" + this.elementNode[this.currentNode];
				this[a] = 0;
			}
		},
		_setAutoDate : function() {
			if (this.autoDate && !this.disabled) {
				var a = new Date();
				var b = unieap.dateFormat(a.getTime(), this._displayFormat);
				this.textbox.value = b;
			}
		},
		_getKeyPress : function(a) {
			var c = a.keyCode;
			var b = "";
			if (this._getSelectText() == this.textbox.value) {
				this._textSelect(this.elementBegin[0], this.elementEnd[0]);
				this.currentNode = 0;
			}
			if ((c != 9) && (c != 13)) {
				dojo.stopEvent(a);
			}
			if (c >= 37 && c <= 40) {
				if (c == 37) {
					b = "Left";
				}
				if (c == 38) {
					b = "Up";
				}
				if (c == 39) {
					b = "Right";
				}
				if (c == 40) {
					b = "Down";
				}
			} else {
				if (c >= 48 && c <= 57) {
					c = c - 48;
					b = "" + c;
				} else {
					if (c >= 96 && c <= 105) {
						c = c - 96;
						b = "" + c;
					} else {
						if (c == 46 || c == 8) {
							b = "Delete";
						}
					}
				}
			}
			return b;
		},
		_onDeleteClick : function() {
			this.textbox.value = "";
		},
		_onKeyDown : function(a) {
			if (13 != a.keyCode && this.readOnly || this.disabled) { return; }
			var b = this._getKeyPress(a);
			if (b && "_on" + b + "Click" in this) {
				this["_on" + b + "Click"]();
			} else {
				if (b && !isNaN(b)) {
					this._onNumberClick(b);
				} else {
					this.inherited(arguments);
				}
			}
		},
		_processAP : function(a) {
			if (a == "am") {
				this._setSelectText("pm");
			} else {
				this._setSelectText("am");
			}
		},
		_doAddOrPlus : function(a) {
			var d = this._getSelectText();
			if (isNaN(d)) {
				this._processAP(d);
				return;
			}
			var b = parseInt(d, 10);
			var c = a == "add" ? b + 1 : b - 1;
			if (a == "add" && c > this._getElementMax()) {
				c = this._getElementMin();
			} else {
				if (c < this._getElementMin()) {
					c = this._getElementMax();
				}
			}
			this._setSelectText(c);
		},
		_onUpClick : function() {
			this._doAddOrPlus("add");
		},
		_onDownClick : function() {
			this._doAddOrPlus("plus");
		},
		_doNavigate : function(a) {
			this._doElemetValidator();
			var b = this.currentNode;
			if (a == "left") {
				if (this.currentNode == 0) {
					this._textSelect(this.elementBegin[0], this.elementEnd[0]);
				} else {
					this._textSelect(this.elementBegin[b - 1], this.elementEnd[b - 1]);
					this.currentNode = b - 1;
				}
			} else {
				if (this.currentNode == (this.elementNumber - 1)) {
					this._textSelect(this.elementBegin[0], this.elementEnd[0]);
					this.currentNode = 0;
				} else {
					this._textSelect(this.elementBegin[b + 1], this.elementEnd[b + 1]);
					this.currentNode = b + 1;
				}
			}
			this._clearState();
		},
		_onLeftClick : function() {
			this._doNavigate("left");
		},
		_onRightClick : function() {
			this._doNavigate("right");
		},
		_onNumberClick : function(h) {
			if (this._getSelectText() == "") {
				var e = new Date();
				this.textbox.value = unieap.dateFormat(e.getTime(), this._displayFormat);
			}
			if (dojo.indexOf(["am", "pm"], this._getSelectText()) > -1) {
				this._onRightClick();
			}
			if (this.elementNode[this.currentNode] == "yyyy"
			        || this.elementNode[this.currentNode] == "YYYY") {
				var a = this._getSelectText();
				var c = a.length;
				var g = "0000000000";
				var b = a.substr(1, c - 1) + h;
				if (this.yearNumber == 0) {
					this.oldYear = a;
					b = g.substr(1, c - 1) + h;
					this.yearNumber++;
					this._setSelectText(b);
				} else {
					if (this.yearNumber < 3) {
						var b = a.substr(1, c - 1) + h;
						this.yearNumber++;
						this._setSelectText(b);
					} else {
						if (this.yearNumber == 3) {
							var d = b;
							if (parseInt(b, 10) > this._getElementMax()
							        || parseInt(b, 10) < this._getElementMin()) {
								b = this.oldYear;
							} else {
								b = a.substr(1, c - 1) + h;
							}
							this._setSelectText(b, b == d);
							this.yearNumber = 0;
						}
					}
				}
			} else {
				var i = "dateTextElementNode" + this.elementNode[this.currentNode];
				var f = this[i];
				if (!f) {
					f = 0;
				}
				f = f == 1 ? 0 : 1;
				this[i] = f;
				var a = this._getSelectText();
				var c = a.length;
				var g = "0000000000";
				var b = a.substr(1, c - 1) + h;
				var d = b;
				if (parseInt(b, 10) > this._getElementMax()
				        || parseInt(b, 10) < this._getElementMin()) {
					b = g.substr(1, c - 1) + h;
				} else {
					b = a.substr(1, c - 1) + h;
				}
				if (b == 0
				        && f == 0
				        && (this.elementNode[this.currentNode] == "MM"
				                || this.elementNode[this.currentNode] == "dd" || this.elementNode[this.currentNode] == "hh")) {
					this._setSelectText(b, false);
					return;
				}
				if (b != d) {
					f == 0;
					this._setSelectText(b, false);
					return;
				}
				this._setSelectText(b, f == 0);
			}
		},
		_onClick : function(a) {
			if (this.disabled == true) { return; }
			var c = this._getCursorPos();
			if (c < (this.elementBegin[0])) {
				this.currentNode = 0;
			} else {
				if (c >= (this.elementEnd[this.elementNumber - 1])) {
					this.currentNode = this.elementNumber - 1;
				} else {
					for (var b = 1; b <= this.elementNumber; b++) {
						if (c <= (this.elementEnd[b - 1]) + 1) {
							this.currentNode = b - 1;
							break;
						}
					}
				}
			}
			this
			        ._textSelect(this.elementBegin[this.currentNode],
			                this.elementEnd[this.currentNode]);
			this.inherited(arguments);
		},
		_onFocus : function(a) {
			if (!a || typeof(a) == "string") { return; }
			this._oText = this.getText();
			if (this.textbox.value == "" && this.readOnly != true) {
				this._setAutoDate();
			}
			this.inherited(arguments);
		},
		_onBlur : function(a) {
			if (!a || typeof(a) == "string") { return; }
			this._doElemetValidator();
			this._clearState();
			this.inherited(arguments);
		},
		_onBeforeBlur : function() {
			var a = this.getText();
			if (a != this._oText) {
				this.fireDataChange();
				this.onChange(this.getValue());
			}
			this._oText = a;
		}
	});
}
/* /unieap/ria3.3/unieap/form/FieldSet-crm.js */
if (!dojo._hasResource["unieap.form.FieldSet-crm"]) {
	dojo._hasResource["unieap.form.FieldSet-crm"] = true;
	dojo.provide("unieap.form.FieldSet-crm");
	dojo.require("unieap.layout.Container");
	dojo.require("dijit._Templated");
	dojo.declare("unieap.form.FieldSet-crm", [unieap.layout.Container, dijit._Templated], {
		UserInterfaces : dojo.mixin({
			        showIcon : "boolean",
			        title : "string",
			        description : "string",
			        open : "boolean",
			        flexible : "boolean",
			        onBeforeToggle : "function",
			        onToggle : "function"
		        }, unieap.layout.Container.prototype.UserInterfaces),
		templateString : '<div style="background:#ffffff;border: 1px solid #86b5e4;"><fieldset class="u-form-fieldset" dojoAttachPoint="rootNode"><legend style="-moz-user-select: none;"  dojoAttachPoint="legendNode"><span class="u-form-fieldset-btn" dojoAttachEvent="onclick:_onToggle,onmouseover:_handleFocus,onmouseout:_handleFocus" dojoAttachPoint="focusNode"></span><span dojoAttachPoint="titleNode"></span><span dojoAttachPoint="descNode" ></span></legend><div class="u-form-fieldset-hiddenNode"><div style="background: #def0f9;height: auto;width: 196px;" dojoAttachPoint="containerNode" ></div></div></fieldset></div>',
		showIcon : true,
		title : "",
		description : "",
		open : true,
		flexible : true,
		onBeforeToggle : function() {
			return true;
		},
		_onToggle : function(a) {
			if (this.onBeforeToggle() && this.flexible) {
				this.onToggle();
				this.open = !this.open;
				this._setCss();
				this.notifyResize();
			}
		},
		onToggle : function(a) {},
		startup : function() {
			this.title && this.setTitle(this.title);
			!this.open && this.description && this.setDescription(this.description);
			dojo.style(this.focusNode, "display", !this.showIcon ? "none" : "block");
			this._setCss();
			this.inherited(arguments);
		},
		toggle : function() {
			if (this.onBeforeToggle() && this.flexible) {
				this.open = !this.open;
				this._setCss();
			}
		},
		_setCss : function() {
			if (this.open) {
				dojo.removeClass(this.rootNode, "dijitClosed");
				dojo.addClass(this.rootNode, "dijitOpen");
				dojo.style(this.rootNode, "borderWidth", "1px 1px 1px 1px");
				this.setDescription("");
				this._setHeight(this.height);
				this.resizeContainer();
			} else {
				dojo.removeClass(this.rootNode, "dijitOpen");
				dojo.addClass(this.rootNode, "dijitClosed");
				dojo.style(this.rootNode, "borderWidth", "1px 0px 0px 0px");
				this.description && this.setDescription(this.description);
				if (this.height != "auto") {
					var a = dojo.contentBox(this.legendNode).h + 7;
					dojo.style(this.rootNode, "height", a + "px");
					dojo.style(this.domNode, "height", "auto");
				}
			}
		},
		_handleFocus : function(a) {
			if (a.type == "mouseover") {
				dojo.addClass(this.legendNode, "u-form-fieldset-mouseover");
			} else {
				dojo.removeClass(this.legendNode, "u-form-fieldset-mouseover");
			}
		},
		setTitle : function(a) {
			if (a == "" || a == null || typeof(a) == undefined) {
				dojo.removeClass(this.titleNode, "u-form-fieldset-label");
			}
			this.titleNode.innerHTML = a;
			dojo.addClass(this.titleNode, "u-form-fieldset-label");
		},
		setDescription : function(a) {
			if (a == "" || a == null || typeof(a) == undefined) {
				dojo.removeClass(this.descNode, "u-form-fieldset-desc");
			}
			this.descNode.innerHTML = a;
			dojo.addClass(this.descNode, "u-form-fieldset-desc");
		},
		toggleIcon : function(a) {
			this.showIcon = a;
			if (!this.showIcon) {
				this.focusNode.style.display = "none";
			} else {
				this.focusNode.style.display = "block";
			}
		},
		resizeContainer : function() {
			if (null == this.domNode || 0 == this.domNode.offsetHeight) { return; }
			if (this.height != "auto" && this.open) {
				var a = dojo.contentBox(this.domNode).h - 2 - 7;
				dojo.style(this.rootNode, "height", a + "px");
				a = a - dojo.contentBox(this.legendNode).h - 7;
				dojo.style(this.containerNode, "height", a + "px");
				this.resizeChildrenContainer();
			}
		}
	});
}
/* /unieap/ria3.3/unieap/form/FieldSet.js */
if (!dojo._hasResource["unieap.form.FieldSet"]) {
	dojo._hasResource["unieap.form.FieldSet"] = true;
	dojo.provide("unieap.form.FieldSet");
	dojo.require("unieap.layout.Container");
	dojo.require("dijit._Templated");
	dojo.declare("unieap.form.FieldSet", [unieap.layout.Container, dijit._Templated], {
		UserInterfaces : dojo.mixin({
			        showIcon : "boolean",
			        title : "string",
			        description : "string",
			        open : "boolean",
			        flexible : "boolean",
			        onBeforeToggle : "function",
			        onToggle : "function"
		        }, unieap.layout.Container.prototype.UserInterfaces),
		templateString : '<div style="background:#ffffff;border: 1px solid #86b5e4;"><fieldset class="u-form-fieldset" dojoAttachPoint="rootNode" ><legend style="-moz-user-select: none;"  dojoAttachPoint="legendNode"><span class="u-form-fieldset-btn" dojoAttachEvent="onclick:_onToggle,onmouseover:_handleFocus,onmouseout:_handleFocus" dojoAttachPoint="focusNode"></span><span dojoAttachPoint="titleNode"></span><span dojoAttachPoint="descNode" ></span></legend><div class="u-form-fieldset-hiddenNode"><div style="height: " dojoAttachPoint="containerNode" ></div></div></fieldset></div>',
		showIcon : true,
		title : "",
		description : "",
		open : true,
		flexible : true,
		onBeforeToggle : function() {
			return true;
		},
		_onToggle : function(a) {
			if (this.onBeforeToggle() && this.flexible) {
				this.onToggle();
				this.open = !this.open;
				this._setCss();
				this.notifyResize();
			}
		},
		onToggle : function(a) {},
		startup : function() {
			this.title && this.setTitle(this.title);
			!this.open && this.description && this.setDescription(this.description);
			dojo.style(this.focusNode, "display", !this.showIcon ? "none" : "block");
			this._setCss();
			this.inherited(arguments);
		},
		toggle : function() {
			if (this.onBeforeToggle() && this.flexible) {
				this.open = !this.open;
				this._setCss();
			}
		},
		_setCss : function() {
			if (this.open) {
				dojo.removeClass(this.rootNode, "dijitClosed");
				dojo.addClass(this.rootNode, "dijitOpen");
				dojo.style(this.rootNode, "borderWidth", "1px 1px 1px 1px");
				this.setDescription("");
				this._setHeight(this.height);
				this.resizeContainer();
			} else {
				dojo.removeClass(this.rootNode, "dijitOpen");
				dojo.addClass(this.rootNode, "dijitClosed");
				dojo.style(this.rootNode, "borderWidth", "1px 0px 0px 0px");
				this.description && this.setDescription(this.description);
				if (this.height != "auto") {
					var a = dojo.contentBox(this.legendNode).h + 7;
					dojo.style(this.rootNode, "height", a + "px");
					dojo.style(this.domNode, "height", "auto");
				}
			}
		},
		_handleFocus : function(a) {
			if (a.type == "mouseover") {
				dojo.addClass(this.legendNode, "u-form-fieldset-mouseover");
			} else {
				dojo.removeClass(this.legendNode, "u-form-fieldset-mouseover");
			}
		},
		setTitle : function(a) {
			if (a == "" || a == null || typeof(a) == undefined) {
				dojo.removeClass(this.titleNode, "u-form-fieldset-label");
			}
			this.titleNode.innerHTML = a;
			dojo.addClass(this.titleNode, "u-form-fieldset-label");
		},
		setDescription : function(a) {
			if (a == "" || a == null || typeof(a) == undefined) {
				dojo.removeClass(this.descNode, "u-form-fieldset-desc");
			}
			this.descNode.innerHTML = a;
			dojo.addClass(this.descNode, "u-form-fieldset-desc");
		},
		toggleIcon : function(a) {
			this.showIcon = a;
			if (!this.showIcon) {
				this.focusNode.style.display = "none";
			} else {
				this.focusNode.style.display = "block";
			}
		},
		resizeContainer : function() {
			if (null == this.domNode || 0 == this.domNode.offsetHeight) { return; }
			if (this.height != "auto" && this.open) {
				var a = dojo.contentBox(this.domNode).h - 2 - 7;
				dojo.style(this.rootNode, "height", a + "px");
				a = a - dojo.contentBox(this.legendNode).h - 7;
				dojo.style(this.containerNode, "height", a + "px");
				this.resizeChildrenContainer();
			}
		}
	});
}
/* /unieap/ria3.3/unieap/form/Form.js */
if (!dojo._hasResource["unieap.form.Form"]) {
	dojo._hasResource["unieap.form.Form"] = true;
	dojo.provide("unieap.form.Form");
	dojo.require("dijit._Widget");
	dojo.require("dijit._Templated");
	dojo.require("unieap.rpc");
	dojo.declare("unieap.form.Form", [dijit._Widget, dijit._Templated], {
		        templateString : "<form dojoAttachPoint='containerNode'></form>",
		        binding : null,
		        enctype : "application/x-www-form-urlencoded",
		        action : "",
		        method : "post",
		        getDescendants : function() {
			        var b = this.inherited(arguments);
			        for (var a = b.length - 1; a >= 0; a--) {
				        if (!(b[a] instanceof unieap.form.FormWidget)) {
					        b.splice(a, 1);
				        }
			        }
			        return b;
		        },
		        postCreate : function() {
			        if (dojo.isIE < 9) {
				        if (this.enctype) {
					        var a = this.domNode.getAttributeNode("enctype");
					        a.value = this.enctype;
				        }
				        if (this.method) {
					        var b = this.domNode.getAttributeNode("method");
					        b.value = this.method;
				        }
			        } else {
				        this.enctype && dojo.attr(this.domNode, "enctype", this.enctype);
				        this.method && dojo.attr(this.domNode, "method", this.method);
			        }
			        this.action && dojo.attr(this.domNode, "action", this.action);
		        },
		        startup : function() {
			        this.binding && this.binding.store && this._bindData();
			        if (!dojo.isIE) {
				        setTimeout(dojo.hitch(this, "_enter2Tab"), 0);
			        }
		        },
		        isModified : function() {
			        var a = this.getBinding();
			        return a ? a.getRow().isModified() : false;
		        },
		        clear : function() {
			        dojo.forEach(this.getDescendants(), function(a) {
				                if ("unieap.form.FileInput" == a.declaredClass) {
					                a._clearInput();
				                } else {
					                a.setValue("");
				                }
				                a.setModified(false);
				                a.getValidator() && a.getValidator().handleError(true);
			                });
		        },
		        reset : function() {
			        dojo.forEach(this.getDescendants(), function(a) {
				                a.reset();
			                });
		        },
		        validate : function(d) {
			        var c = true, a;
			        this._inValidWidget = null;
			        dojo.forEach(this.getDescendants(), function(e) {
				                var b = e.getValidator();
				                if (b && !b.validate() && c) {
					                a = this._inValidWidget = e;
					                c = false;
				                }
			                }, this);
			        if (typeof(d) == "undefined") {
				        d = unieap.widget.errorPrompt;
			        }
			        d ? a && MessageBox.alert({
				                title : RIA_I18N.form.form.validateMsg,
				                message : a.getValidator().getErrorMsg(),
				                type : "warn",
				                onComplete : function() {
					                a.focus();
				                }
			                }) : a && a.focus && a.focus();
			        return c;
		        },
		        getInvalidWidget : function() {
			        return this._inValidWidget;
		        },
		        refresh : function() {
			        var a = this.getBinding();
			        a && a.getRow() ? a.bind(a.getRow()) : this.clear();
		        },
		        getHelper : function() {
			        dojo.require("unieap.form.FormHelper");
			        return new unieap.form.FormHelper(this);
		        },
		        getBinding : function() {
			        return unieap.getModuleInstance(this, "binding", "unieap.form.FormBinding");
		        },
		        bindGrid : function(b) {
			        var a = unieap.byId(b);
			        if (!a) { return; }
			        this.connect(a.getManager("SelectionManager"), "onAfterSelect", function() {
				                var d = a.getBinding().getDataStore();
				                var e = a.getManager("SelectionManager").getSelectedRows()[0];
				                if (e == null) {
					                var c = grid.getRowManager().getCurrentRowIndex();
					                if (c != null && c > 0) {
						                e = d.getRowSet().getRow(c);
					                }
				                }
				                if (e != null) { return this.getBinding().bind(e); }
			                });
		        },
		        _bindData : function() {
			        var a = this.getBinding();
			        a.bind(a.row);
		        },
		        _enter2Tab : function() {
			        dojo.forEach(this.getDescendants(), function(d, a, b) {
				                d.focusOffset && (a += d.focusOffset);
				                var e = b[a + 1];
				                if (e) {
					                !d.nextFocusId && d.setNextFocusId(e.id);
				                } else {
					                var c = this.domNode;
					                while (c && !c.nextSibling) {
						                c = c.parentNode;
					                }
					                !c && (c = document.body);
					                !c.id && (c.id = "focus_" + unieap.getUnique());
					                !d.nextFocusId && d.setNextFocusId(c.id);
				                }
			                });
		        }
	        });
}
/* /unieap/ria3.3/unieap/form/InlineEditor.js */
dojo.provide("unieap.form.InlineEditor");
dojo.declare("unieap.form.InlineEditor", null, {
	        editorClass : "unieap.form.TextBox",
	        editorProps : null,
	        constructor : function(b) {
		        this.widget = b.widget;
		        this.editorClass = b.editorClass || this.editorClass;
		        this.editorProps = b.editorProps;
		        dojo.require(this.editorClass);
		        var a = dojo.getObject(this.editorClass);
		        this.editWidget = new a(this.editorProps);
		        if (this.widget.nextFocusId) {
			        this.editWidget.setNextFocusId(this.widget.nextFocusId);
		        }
		        dojo.connect(this.editWidget, "onBlur", this, "_onBlur");
	        },
	        attachEditor : function() {
		        this.widget.editing = true;
		        this.editWidget.setValue(this.widget.value);
		        var a = this.editWidget.getBinding();
		        a && a.bind(this.widget.getBinding().row);
		        if (!this.widget.editorNode) {
			        this.widget.editorNode = this.editWidget.domNode;
			        this.widget.domNode.appendChild(this.editWidget.domNode);
		        }
		        dojo.style(this.widget.inlineNode, "display", "none");
		        dojo.style(this.editWidget.domNode, "display", "block");
		        this.focus();
	        },
	        _onBlur : function(a) {
		        dojo.style(this.widget.inlineNode, "display", "block");
		        dojo.style(this.editWidget.domNode, "display", "none");
		        var c = this.editWidget.getBinding();
		        c && c.unbind();
		        this.widget.editing = false;
		        var b = this.editWidget.getValue();
		        if (b != this.widget.value) {
			        this.widget.onChange(b);
		        }
		        this.widget.setValue(b);
		        this.editWidget.getPopup && this.editWidget.getPopup().close();
	        },
	        focus : function() {
		        this.editWidget.focus();
	        }
        });
/* /unieap/ria3.3/unieap/form/NumberDisplayFormatter.js */
dojo.provide("unieap.form.NumberDisplayFormatter");
dojo.require("unieap.form.SimpleFormatter");
dojo.require("dojo.number");
dojo.require("unieap.patch.number");
dojo.declare("unieap.form.NumberDisplayFormatter", unieap.form.SimpleFormatter, {
	        dataType : "number",
	        dataFormat : "",
	        format : function(b) {
		        var a = "";
		        if (this.dataType) {
			        dojo.require("unieap.util.util");
			        a = unieap.getDataType(this.dataType);
		        } else {
			        if (this.widget.getBinding) {
				        var c = this.widget.getBinding();
				        if (c) {
					        a = c.getDataType();
				        }
			        }
		        }
		        if (a == "number" && dojo.trim(String(b)) != "" && b != null && !isNaN(b)) {
			        b = Number(b);
		        }
		        if (b !== "" && !isNaN(b)) {
			        b = this.dataFormat ? dojo.number.format(b, {
				                pattern : this.dataFormat
			                }) : b;
		        }
		        return b;
	        },
	        parse : function(b) {
		        var a = this.dataFormat ? dojo.number.parse(b, {
			                pattern : this.dataFormat
		                }) : b;
		        return String(a) == "NaN" ? b : a;
	        }
        });
/* /unieap/ria3.3/unieap/grid/_grid/binding.js */
dojo.provide("unieap.grid._grid.binding");
dojo.declare("unieap.grid.Binding", null, {
	        grid : null,
	        store : null,
	        datacenter : null,
	        constructor : function(c, b) {
		        dojo.mixin(this, c);
		        this.connects = [];
		        this.grid = b;
		        if (c && c.store) {
			        var a;
			        if (this.datacenter) {
				        a = this.datacenter;
			        } else {
				        if (currentDataCenter) {
					        a = currentDataCenter;
				        } else {
					        a = dataCenter;
				        }
			        }
			        dojo.isString(c.store) ? (this.originStore = unieap.getDataStore(c.store, a,
			                false)) : (this.originStore = c.store);
			        if (this._supportClientPaging()) {
				        this.store = this
				                .getDataStoreByPageNumber(this.originStore.getPageNumber());
			        } else {
				        this.store = this.originStore;
			        }
		        }
		        !this.store && (this.store = new unieap.ds.DataStore(c.store || "temp"));
		        this.setData(this.store);
	        },
	        getDataStore : function() {
		        return this.store;
	        },
	        setDataStore : function(a) {
		        !a && (a = new unieap.ds.DataStore("temp"));
		        var b = a.getName();
		        if (this._supportClientPaging() && b.indexOf("_client_paging_ds") == -1) {
			        this.originStore = a;
			        this.store = this.getDataStoreByPageNumber(this.originStore.getPageNumber());
			        this.setData(this.store);
		        } else {
			        this.setData(a);
		        }
		        this.grid.onStoreChanged();
	        },
	        getDataStoreByPageNumber : function(b) {
		        b = b || 1;
		        var c = this.originStore,
			        g = c.getRowSet().getData(),
			        a = c.getPageSize(),
			        d = c.getRecordCount();
		        var h = (b - 1) * a,
			        f = g.slice(h, h + a),
			        e = {
				        pageSize : a,
				        pageNumber : b,
				        recordCount : d,
				        rowSet : f,
				        name : "_client_paging_ds",
				        metaData : (c.getMetaData())
			        };
		        return new unieap.ds.DataStore(e);
	        },
	        _supportClientPaging : function() {
		        var a = this.grid.managers.get("PagingManager");
		        if (a) { return a.supportClientPaging(); }
		        return false;
	        },
	        getOriginStore : function() {
		        return this.originStore;
	        },
	        syncOriginStore : function(g) {
		        if (this._supportClientPaging()) {
			        var e = this.grid.managers.get("PagingManager"),
				        d = e.getPageInfo(),
				        c = d.totalCount,
				        b = d.pageNumber,
				        a = d.pageSize,
				        f = (b - 1) * a;
			        g = dojo.map(g, function(h) {
				                return f + h;
			                });
			        if (c > 0) {
				        this.originStore.getRowSet().deleteRows(g);
				        this.originStore.setRecordCount(c - g.length);
				        this.setDataStore(this.getDataStoreByPageNumber(b));
			        }
		        }
	        },
	        clear : function() {
		        this.setDataStore(null);
	        },
	        setData : function(a) {
		        this.disconnect();
		        this.store = (a || new unieap.ds.DataStore(this.store.getName()));
		        this.setRowData(this.getRowSet().getData());
		        this.grid.trigger && this.bindDataSetTrigger();
	        },
	        setRowData : function(a) {
		        this.rowData = a;
	        },
	        updateRowData : function() {
		        this.setRowData(this.getRowSet().getData());
	        },
	        selectedData : function(b) {
		        var a = unieap.ds.Row(this.getRowSet(), this.getRowData()[b]);
		        a.setRowSelected(true);
	        },
	        unSelectedData : function(b) {
		        var a = unieap.ds.Row(this.getRowSet(), this.getRowData()[b]);
		        a.setRowSelected(false);
	        },
	        getRowSet : function() {
		        return this.store.getRowSet();
	        },
	        getRowCount : function() {
		        return this.getRowData().length;
	        },
	        getRow : function(a) {
		        return this.getRowData()[a];
	        },
	        getRowData : function() {
		        return this.rowData;
	        },
	        getDatum : function(d, a) {
		        var c = this.getRowData()[d];
		        if (!c) { return ""; }
		        var b = this.getRowData()[d][a];
		        if (b == null) { return ""; }
		        return String(b).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
		                .replace(/\s/g, "&nbsp;");
	        },
	        insertRow : function(b, c) {
		        var a = arguments.length;
		        if (a >= 2) {
			        this.getRowSet().insertRow(b, c);
		        } else {
			        if (a == 1) {
				        typeof(b) != "object" && (b = {});
				        this.getRowSet().insertRow(b, 0);
			        } else {
				        this.getRowSet().insertRow({}, 0);
			        }
		        }
	        },
	        deleteRow : function(a) {
		        this.getRowSet().deleteRow(a);
		        this.syncOriginStore([a]);
	        },
	        deleteRows : function(a) {
		        this.getRowSet().deleteRows(a);
		        this.syncOriginStore(a);
	        },
	        disabledEvent : function() {
		        this.getRowSet().disabledEvent();
	        },
	        enabledEvent : function() {
		        this.getRowSet().enabledEvent();
	        },
	        bindDataSetTrigger : function() {
		        var b = this.grid,
			        c = this.getRowSet(),
			        a = this;
		        if (b) {
			        this.connects.push(dojo.connect(c, "discardUpdate", function() {
				                b.getManager("ViewManager").refresh();
			                }));
			        this.connects.push(dojo.connect(c, "onItemChanged", function(g, f, e, d) {
				                if (b) {
					                b.onItemChanged(d, f);
				                }
				                return true;
			                }));
			        this.connects.push(dojo.connect(c, "onAfterAddRow", function() {
				                b.onRowSetChanged();
				                return true;
			                }));
			        this.connects.push(dojo.connect(c, "onAfterAddRows", function() {
				                b.onRowSetChanged();
				                return true;
			                }));
			        this.connects.push(dojo.connect(c, "onAfterDeleteRow", function() {
				                b.onRowSetChanged();
				                return true;
			                }));
			        this.connects.push(dojo.connect(c, "onAfterDeleteRows", function() {
				                b.onRowSetChanged();
				                return true;
			                }));
			        this.connects.push(dojo.connect(c, "onAfterDeleteAllRows", function() {
				                b.onStoreChanged();
				                return true;
			                }));
			        this.connects.push(dojo.connect(c, "onFilter", function() {
				                b.onRowSetFilter();
			                }));
			        this.connects.push(dojo.connect(c, "onResetUpdate", function(d) {
				                if (d != null) {
					                b.getManager("ViewManager").refreshRow(d);
					                return;
				                }
				                b.onStoreChanged();
			                }));
			        this.connects.push(dojo.connect(c, "onBeforeDiscardUpdate", function() {
				                var d = a.grid.managers.get("SelectionManager").getSelectType();
				                if (d == "s" || d == "single") {
					                this.forEach(function(e) {
						                        e.setRowSelected(false);
					                        }, null, null, unieap.ds.Buffer.DELETE);
					                this.forEach(function(e) {
						                        e.setRowSelected(false);
					                        }, null, null, unieap.ds.Buffer.FILTER);
				                }
			                }));
			        this.connects.push(dojo.connect(c, "onSort", function() {
				                b.onSorted();
			                }));
			        this.connects.push(dojo.connect(this.store, "onRowSetChanged", this,
			                function() {
				                b.setDataStore(this.store);
			                }));
			        this.connects.push(dojo.connect(this.store, "onPropsChanged", this, function() {
				                b.onStatisticChanged();
			                }));
			        this.connects.push(dojo.connect(this.getRowSet(), "onAfterDeleteSelectedRows",
			                function() {
				                b.onRowSetChanged();
				                return true;
			                }));
		        }
	        },
	        disconnect : function() {
		        while (this.connects.length > 0) {
			        dojo.disconnect(this.connects.pop());
		        }
	        },
	        destroy : function() {
		        this.disconnect();
	        },
	        isModified : function() {
		        return this.getDataStore().getRowSet().isModified();
	        },
	        isValid : function(c, b, a) {
		        return this.validate(c, b, a);
	        },
	        validate : function(g, j, c) {
		        if (arguments.length == 1) {
			        typeof(g) == "boolean" && (j = g);
		        }
		        if (arguments.length == 2) {
			        if (typeof(g) == "boolean" && typeof(j) == "boolean") {
				        c = j;
				        j = g;
			        }
		        }
		        typeof(j) == "undefined" && (j = unieap.widget.errorPrompt);
		        typeof(c) == "undefined" && (c = true);
		        var e = this.grid.managers.get("LayoutManager").getCells(),
			        a = this.getRowSet();
		        if (typeof(g) == "number") {
			        var h = a.getRow(g);
			        if (!h) { return true; }
			        for (var b = 0, d; (d = e[b]); b++) {
				        if (!d.isValid(h)) {
					        j ? this._showErrorPrompt(g, d, c) : this._setEdit(g, d, c);
					        return false;
				        }
			        }
			        return true;
		        }
		        var f = true;
		        f = !a.some(function(m) {
			                for (var l = 0, k; (k = e[l]); l++) {
				                if (!k.isValid(m)) {
					                j ? this._showErrorPrompt(m.getIndex(), k, c) : this._setEdit(m
					                                .getIndex(), k, c);
					                return true;
				                }
			                }
			                return false;
		                }, null, null, unieap.ds.Buffer.PRIMARY, this);
		        if (!f) { return false; }
		        f = !a.some(function(m) {
			                for (var l = 0, k; (k = e[l]); l++) {
				                if (!k.isValid(m)) {
					                k.setEditable(false);
					                j ? this._showErrorPrompt(m.getIndex(), k, false) : this
					                        ._setEdit(m.getIndex(), k, c);
					                return true;
				                }
			                }
			                return false;
		                }, null, null, unieap.ds.Buffer.FILTER, this);
		        return f;
	        },
	        _showErrorPrompt : function(d, a, b) {
		        var c = this;
		        MessageBox.alert({
			                title : a.label + "列校验信息",
			                type : "warn",
			                message : a.getErrorMsg(),
			                onComplete : function() {
				                c._setEdit(d, a, b);
			                }
		                });
	        },
	        _setEdit : function(c, a, b) {
		        if (b && a.isEditable()) {
			        this.grid.managers.get("EditManager").setEdit(c, a.index);
			        setTimeout(function() {
				                a.getEditor() && a.getEditor().getValidator().validate();
			                }, 0);
		        }
	        },
	        sort : function(e, c) {
		        this.grid.publish("onBeforeSort");
		        if (this.onBeforeSort(e, c) == false || !e.name) { return; }
		        c && (e.asc = c);
		        this.grid.setSortInfo(e);
		        var h = this.grid.getSortInfo();
		        if (this.grid.managers.get("ViewManager").orderType == "client") {
			        this.getRowSet().sort(e.name, e.asc, e.dataType);
			        this.onAfterSort(e, c);
		        } else {
			        var d = this.getDataStore(),
				        j = [];
			        for (var b = 0; b < h.length; b++) {
				        var a = h[b].name;
				        if (!d.getStatementName()) {
					        if (unieap.dbDialect && unieap.dbDialect == "drm") {
						        a = "[".concat(a).concat("]");
					        }
				        }
				        a = a.concat(" ").concat(h[b].asc > 0 ? "asc" : "desc");
				        j.push(a);
			        }
			        if (this.isModified() && confirm("保存修改？")) {
				        this.save();
			        }
			        d.setOrder(j.join(","));
			        d = d.collect("none");
			        d.setPageNumber(1);
			        var g = this,
				        f = function(l, i) {
					        var m, k;
					        if (arguments.length == 2) {
						        m = l;
						        k = i;
					        } else {
						        if (arguments.length == 1) {
							        k = l;
						        } else {
							        return;
						        }
					        }
					        !m && (m = k.getSingleDataStore());
					        g.setDataStore(m);
					        g.onAfterSort(e, c);
				        };
			        if (dojo.isFunction(this.rpc)) {
				        this.rpc(this.getDataStore().collect("none"), f, this.grid, "sort");
			        } else {
				        unieap.Action.doQuery(d, {
					                load : function(k, i) {
						                f(k, i);
					                },
					                sync : false
				                });
			        }
		        }
	        },
	        min : function(a) {
		        return this.getRowSet().min(a);
	        },
	        max : function(a) {
		        return this.getRowSet().max(a);
	        },
	        avg : function(a, b) {
		        return this.getRowSet().avg(a, b);
	        },
	        sum : function(a, b) {
		        return this.getRowSet().sum(a, b);
	        },
	        rpc : null,
	        getLockedRowData : function() {
		        var g = [];
		        if (this.grid.lockedRow) {
			        var f = this.grid.lockedRow.statistics;
			        var c = this.grid.lockedRow.getLockedRow;
			        var b = this.grid.lockedRow.setLockedRowData;
			        if (b) { return b; }
			        if (c) {
				        if (typeof(c) == "function") {
					        var e = c.apply(this.grid);
					        if (e) {
						        g = g.concat(e);
					        }
				        }
			        }
			        if (f) {
				        var a = this.store.getStatistics();
				        if (a) {
					        if (!dojo.isArray(f)) {
						        f = [f];
					        }
					        dojo.forEach(f, function(h) {
						                var j = {};
						                for (var d in h) {
							                if (a[d] && a[d][h[d]]) {
								                dojo.require("unieap.util.util");
								                var i = unieap.translate(h[d]) || "计";
								                j[d] = i + ": " + a[d][h[d]];
							                }
						                }
						                g.push(j);
					                });
				        }
			        }
		        }
		        return g;
	        },
	        setLockedRowData : function(b) {
		        if (this.grid.lockedRow) {
			        this.grid.lockedRow.setLockedRowData = b;
		        }
		        var a = this.grid.managers.get("ViewManager");
		        a.renderLockedRow(true);
	        },
	        doFilter : function() {
		        var a = this;
		        var d = this.grid.managers.get("LayoutManager");
		        var c = d.cells;
		        this.getRowSet().doFilter();
		        var e = {
			        condition : {},
			        pattern : ""
		        },
			        b = false;
		        dojo.forEach(c, function(f, g) {
			                if (f.filter) {
				                dojo.mixin(e.condition, f.filter.condition);
				                e.pattern += (e.pattern == "" ? "  " : " && ") + "("
				                        + f.filter.pattern + ")";
				                b = true;
			                }
		                });
		        if (b) {
			        a.getRowSet().doFilter(dojo.clone(e));
		        } else {
			        a.getRowSet().doFilter();
		        }
		        this.grid.getToolBar() && this.grid.getToolBar().update();
	        },
	        save : function(a) {
		        if (this.onBeforeSave() == false) { return; }
		        var b = this.store,
			        a = a || {};
		        if (b) {
			        if (a.load) {
				        dojo.connect(a, "load", dojo.hitch(this, this._onAfterSave));
			        } else {
				        dojo.mixin(a, {
					                load : dojo.hitch(this, this._onAfterSave)
				                });
			        }
			        unieap.Action.doUpdate(b, a);
		        }
	        },
	        _onAfterSave : function() {
		        this.grid.managers.get("ViewManager").refresh();
		        this.onAfterSave();
	        },
	        onBeforeSave : function() {
		        return true;
	        },
	        onAfterSave : function() {},
	        onBeforeSort : function(a, b) {
		        return;
	        },
	        onAfterSort : function(a, b) {}
        });
/* /unieap/ria3.3/unieap/grid/_grid/cell.js */
dojo.provide("unieap.grid._grid.cell");
dojo.declare("unieap.grid.Cell", null, {
	        width : 200,
	        asc : 1,
	        _cellProps : {
		        noresize : "boolean",
		        name : "string",
		        colSpan : "number",
		        rowSpan : "number",
		        id : "string",
		        dataType : "string",
		        canSort : "boolean",
		        formatter : "object",
		        get : "object",
		        headerStyles : "string",
		        styles : "string",
		        isMulTitle : "boolean",
		        label : "string",
		        securityId : "string",
		        width : "string",
		        decoder : "object",
		        cascade : "object",
		        valueFormatter : "object",
		        displayFormatter : "object",
		        editor : "object",
		        enable : "boolean",
		        onBeforeEdit : "object"
	        },
	        classes : null,
	        constructor : function(a) {
		        this.enable = true;
		        dojo.mixin(this, a);
		        this.setWidth(this.width);
		        unieap.setLabelFormatProps(this);
		        this.classes = ["u-grid-cell"];
		        this._isNumberStyle() && this.classes.push("u-grid-text2-number");
	        },
	        _isNumberStyle : function() {
		        if (this.dataType == "number") { return true; }
		        if (this.dataType) { return false; }
		        var b = this.grid.getBinding().getDataStore();
		        var a;
		        if (this.name && b.getMetaData(this.name)) {
			        a = b.getMetaData(this.name).dataType;
		        } else {
			        return false;
		        }
		        if (unieap.getDataType(a) == "number") { return true; }
		        return false;
	        },
	        getValueFormatter : function() {
		        return unieap.getModuleInstance(this, "valueFormatter",
		                "unieap.form.SimpleFormatter");
	        },
	        getDisplayFormatter : function() {
		        return unieap.getModuleInstance(this, "displayFormatter",
		                "unieap.form.SimpleFormatter");
	        },
	        get : function(b) {
		        var a = this.value || this.grid.getBinding().getDatum(b, this.name);
		        return a;
	        },
	        format : function(g, f, a) {
		        if (f) {
			        e = (this.name in f) ? f[this.name] : "";
		        } else {
			        var e = this.get(g);
		        }
		        e = this._format(e, g);
		        var d = "";
		        if (e.cls) {
			        d = e.cls;
		        }
		        if (e.value) {
			        e = e.value;
		        }
		        e === "" ? (e = "&nbsp;") : e;
		        var c = this.grid.managers.get("RowManager").defaultRowHeight,
			        b = "";
		        c = c - 1;
		        !a && (b = "line-height:" + c + "px");
		        if (d) {
			        e = "<div  class='" + d + "' style='" + b + "'>" + e + "</div>";
		        } else {
			        e = "<div  class=' u-grid-text' style='" + b + "'><div class='u-grid-text2'>"
			                + e + "</div></div>";
		        }
		        return e;
	        },
	        _format : function(a, c) {
		        var b = a;
		        if (this.decoder) {
			        if (!this.cascade && this.editor && this.editor.editorProps.cascade) {
				        this.cascade = this.editor.editorProps.cascade;
			        }
			        if (this.cascade && this.cascade.getCascadeStore) {
				        this.decoder.store = this._getCascadeStore(this.cascade, c);
			        }
			        if (this.decoder.store) {
				        b = unieap.transcode(b, this.decoder) || b;
			        }
		        } else {
			        if (this.valueFormatter) {
				        b = this.getValueFormatter().format(b, c);
			        }
			        if (this.displayFormatter) {
				        b = this.getDisplayFormatter().format(b, c);
			        }
		        }
		        if (dojo.isFunction(this.formatter)) {
			        b = this.formatter.call(this, b, c);
		        }
		        b = this.extraFormat(c, b);
		        return b;
	        },
	        extraFormat : function(b, a) {
		        return a;
	        },
	        _getCascadeStore : function(a, b) {
		        if (isNaN(b)) { return null; }
		        if (!a.primaryCell) {
			        this.grid.managers.get("LayoutManager").forEachCell(function(c, d) {
				        if ((c.editor && c.editor.editorProps && c.editor.editorProps.id == a.primary)
				                || (c.name == a.primary)) {
					        a.primaryCell = c;
				        }
			        });
		        }
		        return a.getCascadeStore(a.primaryCell.get(b));
	        },
	        isPercent : function() {
		        return this.percent == true;
	        },
	        setWidth : function(a) {
		        a = String(a || 200);
		        this.width = parseInt(a, 10);
		        if (a.indexOf("%") > 0) {
			        this.percent = true;
		        } else {
			        this.percent = false;
		        }
	        },
	        getWidth : function() {
		        return this.isPercent() ? String(this.width).concat("%") : String(this.width - 1)
		                .concat("px");
	        },
	        getPixelWidth : function() {
		        return this.width;
	        },
	        getRealWidth : function() {
		        var b = this.grid.managers.get("ViewManager");
		        var a = b.getViewByCell(this);
		        var c = a ? a.getCellNode(0, this.index) : null;
		        if (c) {
			        return c.offsetWidth;
		        } else {
			        return this.getPixelWidth();
		        }
	        },
	        getEdit : function() {
		        if (!this.edit) {
			        dojo.require("unieap.grid._grid.cellEdit");
			        this.edit = new unieap.grid.cellEdit(this);
		        }
		        return this.edit;
	        },
	        setEditor : function(a, b) {
		        this.getEdit().setEditor(a, b);
	        },
	        getEditor : function(a) {
		        return this.getEdit().getEditor(a);
	        },
	        isValid : function(e) {
		        if (!this.name) { return true; }
		        var c = e.getItemValue(this.name),
			        b = this.getEditor();
		        if (b) {
			        b.getBinding().bind(e);
			        b.setValue(c);
			        result = b.getValidator().validate();
			        b.getBinding().unbind(e);
			        if (!result) {
				        this._canEdit = true;
				        this._errorMsg = b.getValidator().getErrorMsg();
				        return false;
			        }
		        }
		        var d = e.getRowSet().getMetaData(this.name),
			        a = d ? d.isNullable() : true;
		        if (!a && (c == null || c === "")) {
			        this._errorMsg = "该列的值不能为空";
			        this._canEdit = false;
			        return false;
		        }
		        return true;
	        },
	        getErrorMsg : function() {
		        return this._errorMsg;
	        },
	        isEditable : function() {
		        return !!this._canEdit;
	        },
	        setEditable : function(a) {
		        this._canEdit = !!a;
	        },
	        destroy : function() {
		        if (this.edit) {
			        this.edit.destroy();
		        }
	        }
        });
/* /unieap/ria3.3/unieap/grid/_grid/cellEdit.js */
dojo.provide("unieap.grid._grid.cellEdit");
dojo.declare("unieap.grid.cellEdit", null, {
	constructor : function(a) {
		this.editors = {
			current : null
		};
		this.connects = [];
		this.cell = a;
		this.edit = a.grid.managers.get("EditManager");
		var b = a.editor;
		if (b) {
			this.setEditor(b.editorClass, b.editorProps);
		}
	},
	_createEditor : function(a, d) {
		dojo.require(a);
		var b = dojo.getObject(a);
		var c = new b(dojo.mixin(d, {
			        width : "auto",
			        style : "display:block;",
			        binding : {
				        name : this.cell.name
			        }
		        }));
		this.funnelEvents(c);
		return c;
	},
	funnelEvents : function(c) {
		this.connects.push(dojo.connect(c, "onTab", this, function(e) {
			        this.edit.onEditorTab(this.cell, e);
		        }));
		this.connects.push(dojo.connect(c, "onBlur", this, function(e) {
			        this.edit.onEditorBlur(this.cell, e);
		        }));
		var a = this.cell.grid.getManager("LayoutManager").getCells(), b,
			d = [];
		if (c.declaredClass == "unieap.form.ComboBox") {
			dojo.forEach(a, function(e) {
				        if (this._checkCell(c, e)) {
					        d.push(e);
				        }
			        }, this);
		}
		if (d.length > 0) {
			this.connects.push(dojo.connect(c, "onChange", this, function() {
				        setTimeout(dojo.hitch(this, function() {
					                        var e = c.getBinding().getRow();
					                        dojo.forEach(d, function(g) {
						                                var h = e.getIndex();
						                                var j = c.getBinding().getValue();
						                                var i = g.getEditor().getCascade().getCascadeStore;
						                                var f = i(j);
						                                g.getEditor().getDataProvider()
						                                        .setDataStore(f);
						                                this.cell.grid.getManager("ViewManager")
						                                        .refreshCell(e.getIndex(), g);
					                                }, this);
				                        }), 0);
			        }));
		}
	},
	_checkCell : function(d, c) {
		var e = c.editor,
			b = d.id,
			a = (e && e.cascade && e.cascade.primary) || (c.cascade && c.cascade.primary);
		if (b == a) { return true; }
		return false;
	},
	getEditor : function(a) {
		if (!this.editors) { return null; }
		return a && this.editors[a] || this.editors[this.editors.current];
	},
	setEditor : function(a, c) {
		this.editors.current = a;
		if (!(a in this.editors)) {
			this.editors[a] = this._createEditor(a, c);
		} else {
			var b = this.editors[a];
			b && b.destroy && b.destroy();
			delete b;
			this.editors[a] = this._createEditor(a, c);
		}
	},
	applyEdit : function(c) {
		var a = this.getEditor();
		if (!a) { return; }
		var b = a.domNode.parentNode;
		b && b.removeChild(a.domNode);
		this.cell.grid.getManager("ViewManager").refreshCell(c, this.cell);
	},
	unbind : function() {
		var a = this.getEditor();
		if (!a) { return; }
		a.binding && a.getBinding().unbind();
	},
	destroy : function() {
		while (this.connects.length > 0) {
			dojo.disconnect(this.connects.pop());
		}
		editors = this.editors;
		for (var a in editors) {
			editors[a] && editors[a].destroy && editors[a].destroy();
		}
		delete this.editors;
	}
});
/* /unieap/ria3.3/unieap/grid/_grid/lib.js */
dojo.provide("unieap.grid._grid.lib");
dojo.mixin(unieap.grid, {
	na : "...",
	nop : function() {},
	getTdIndex : function(a) {
		return a.cellIndex >= 0 ? a.cellIndex : dojo.indexOf(a.parentNode.cells, a);
	},
	getTrIndex : function(a) {
		return a.rowIndex >= 0 ? a.rowIndex : dojo.indexOf(a.parentNode.childNodes, a);
	},
	getTr : function(b, a) {
		return b && ((b.rows || 0)[a]);
	},
	getTd : function(b, c, a) {
		return (unieap.grid.getTr(inTable, c) || 0)[a];
	},
	findTable : function(a) {
		for (var b = a; b && b.tagName != "TABLE"; b = b.parentNode) {}
		return b;
	},
	ascendDom : function(c, a) {
		for (var b = c; b && a(b); b = b.parentNode) {}
		return b;
	},
	makeNotTagName : function(b) {
		var a = b.toUpperCase();
		return function(c) {
			return c.tagName != a;
		};
	},
	fire : function(a, d, b) {
		var c = a && d && a[d];
		return c && (b ? c.apply(a, b) : a[d]());
	},
	setStyleText : function(b, a) {
		if (b.style.cssText == undefined) {
			b.setAttribute("style", a);
		} else {
			b.style.cssText = a;
		}
	},
	getStyleText : function(b, a) {
		return (b.style.cssText == undefined ? b.getAttribute("style") : b.style.cssText);
	},
	setStyle : function(c, a, b) {
		if (c && c.style[a] != b) {
			c.style[a] = b;
		}
	},
	setStyleHeightPx : function(b, a) {
		if (a >= 0) {
			unieap.grid.setStyle(b, "height", a + "px");
		}
	},
	mouseEvents : ["mouseover", "mouseout", "mousedown", "mouseup", "click", "dblclick",
	        "contextmenu"],
	keyEvents : ["keyup", "keydown", "keypress"],
	funnelEvents : function(g, e, d, f) {
		var b = (f ? f : unieap.grid.mouseEvents.concat(unieap.grid.keyEvents));
		for (var c = 0, a = b.length; c < a; c++) {
			e.connect(g, "on" + b[c], d);
		}
	},
	removeNode : function(a) {
		a = dojo.byId(a);
		a && a.parentNode && a.parentNode.removeChild(a);
		return a;
	},
	getScrollbarWidth : function() {
		if (this._scrollBarWidth) { return this._scrollBarWidth; }
		this._scrollBarWidth = 18;
		try {
			var b = document.createElement("div");
			b.style.cssText = "top:0;left:0;width:100px;height:100px;overflow:scroll;position:absolute;visibility:hidden;";
			document.body.appendChild(b);
			this._scrollBarWidth = b.offsetWidth - b.clientWidth;
			document.body.removeChild(b);
			delete b;
		}
		catch (a) {}
		return this._scrollBarWidth;
	},
	getRef : function(a, d, c) {
		var g = c || dojo.global,
			f = a.split("."),
			h = f.pop();
		for (var b = 0, e; g && (e = f[b]); b++) {
			g = (e in g ? g[e] : (d ? g[e] = {} : undefined));
		}
		return {
			obj : g,
			prop : h
		};
	},
	getProp : function(name, create, context) {
		with (unieap.grid.getRef(name, create, context)) {
			return (obj) && (prop)
			        && (prop in obj ? obj[prop] : (create ? obj[prop] = {} : undefined));
		}
	},
	indexInParent : function(d) {
		var a = 0, c,
			b = d.parentNode;
		while (c = b.childNodes[a++]) {
			if (c == d) { return a - 1; }
		}
		return -1;
	},
	cleanNode : function(e) {
		if (!e) { return; }
		var d = function(f) {
			return f.domNode && dojo.isDescendant(f.domNode, e, true);
		};
		var b = dijit.registry.filter(d);
		for (var c = 0, a; (a = b[c]); c++) {
			a.destroy();
		}
		delete b;
	},
	getTagName : function(a) {
		var b = dojo.byId(a);
		return (b && b.tagName ? b.tagName.toLowerCase() : "");
	},
	nodeKids : function(e, d) {
		var a = [];
		var b = 0, c;
		while (c = e.childNodes[b++]) {
			if (unieap.grid.getTagName(c) == d) {
				a.push(c);
			}
		}
		return a;
	},
	divkids : function(a) {
		return unieap.grid.nodeKids(a, "div");
	},
	focusSelectNode : function(b) {
		try {
			unieap.grid.fire(b, "focus");
			unieap.grid.fire(b, "select");
		}
		catch (a) {}
	},
	whenIdle : function() {
		setTimeout(dojo.hitch.apply(dojo, arguments), 0);
	},
	arrayCompare : function(d, c) {
		for (var b = 0, a = d.length; b < a; b++) {
			if (d[b] != c[b]) { return false; }
		}
		return (d.length == c.length);
	},
	arrayInsert : function(b, c, a) {
		if (b.length <= c) {
			b[c] = a;
		} else {
			b.splice(c, 0, a);
		}
	},
	arrayRemove : function(a, b) {
		a.splice(b, 1);
	},
	arraySwap : function(d, b, a) {
		var c = d[b];
		d[b] = d[a];
		d[a] = c;
	},
	initTextSizePoll : function(inInterval) {
		var f = document.createElement("div");
		with (f.style) {
			top = "0px";
			left = "0px";
			position = "absolute";
			visibility = "hidden";
		}
		f.innerHTML = "TheQuickBrownFoxJumpedOverTheLazyDog";
		document.body.appendChild(f);
		var fw = f.offsetWidth;
		var job = function() {
			if (f.offsetWidth != fw) {
				fw = f.offsetWidth;
				unieap.grid.textSizeChanged();
			}
		};
		window.setInterval(job, inInterval || 200);
		unieap.grid.initTextSizePoll = unieap.grid.nop;
	},
	textSizeChanged : function() {},
	addObserver : function(b, a) {
		if (!b.observers) {
			b.observers = [];
		}
		b.observers.push(a);
	},
	notify : function(e, h, f) {
		var c = f || [];
		for (var d = 0, b, g; (g = e.observers[d]); d++) {
			(h in g) && (g[h].apply(g, c));
		}
	}
});
unieap.grid.jobs = {
	cancel : function(a) {
		if (a) {
			window.clearTimeout(a);
		}
	},
	jobs : {},
	job : function(c, d, a) {
		unieap.grid.jobs.cancelJob(c);
		var b = function() {
			delete unieap.grid.jobs.jobs[c];
			a();
		};
		unieap.grid.jobs.jobs[c] = setTimeout(b, d);
	},
	cancelJob : function(a) {
		unieap.grid.jobs.cancel(unieap.grid.jobs.jobs[a]);
	}
};
/* /unieap/ria3.3/unieap/grid/manager/LayoutManager.js */
dojo.provide("unieap.grid.manager.LayoutManager");
dojo.require("unieap.grid._grid.cell");
dojo.declare("unieap.grid.manager.LayoutManager", null, {
	ui : {
		getCell : true,
		sortCell : true,
		hideCell : true,
		showCell : true,
		lockCell : true,
		isHidden : true,
		getStructure : true,
		setStructure : true,
		getCells : true,
		getOriginCells : true
	},
	structure : null,
	constructor : function(a) {
		dojo.mixin(this, a);
		this.isMulTitle = this.isMulTitle == "true" ? true : false;
		this._parseFoot();
		this._parseToolBar();
		this.structure || this._setLayout(this.grid.srcNodeRef);
	},
	_parseFoot : function() {
		if (!this.grid.srcNodeRef) { return; }
		var a = dojo.query("div[tagName='foot']", this.grid.srcNodeRef);
		if (a.length > 0) {
			a = a[0];
			dojo.require("unieap.grid.view.foot");
			this.grid.foot = new unieap.grid.view.foot(this.grid, a);
		}
	},
	_parseToolBar : function() {
		if (!this.grid.srcNodeRef) { return; }
		var a = dojo.query("div[tagName='toolbar']", this.grid.srcNodeRef);
		if (a.length > 0) {
			dojo.require("unieap.grid.view.toolbar");
			dojo.attr(a[0], "dojoType", "unieap.grid.view.toolbar");
			var b = dojo.parser.instantiate(a, {
				        grid : this.grid
			        });
			if (b.length > 0) {
				this.grid.toolBar = b[0];
			}
		}
	},
	_setLayout : function(a) {
		var o = [];
		var c = dojo.query("div[tagName='fixed']", a);
		if (c.length > 0) {
			var e = {
				noscroll : true
			};
			e.rows = this._parseRows(c[0]);
			o.push(e);
		}
		var r = dojo.query("div[tagName='header']", a);
		if (r.length > 0) {
			var m = {};
			m.rows = this._parseRows(r[0]);
			o.push(m);
		}
		this.structure = o;
		this.origin = {
			fixed : 0,
			columns : [],
			sequence : []
		};
		for (var h = 0; h < this.structure.length; h++) {
			for (var f = 0; this.structure[h]["rows"] && f < this.structure[h]["rows"].length; f++) {
				for (var d = 0; d < this.structure[h]["rows"][f].length; d++) {
					if (this.structure[h]["rows"] && this.structure[h]["rows"].length != 1) {
						this.origin = null;
					} else {
						if (this.origin != null) {
							if (this.structure[h].noscroll) {
								this.origin.fixed = this.structure[h]["rows"][f].length;
							}
							this.origin.columns.push(this.structure[h]["rows"][f][d]);
						}
					}
				}
			}
		}
		if (this.origin) {
			for (var h = 0, b = this.origin.columns.length; h < b; h++) {
				this.origin.sequence.push(h);
			}
		}
		var q = this.grid.managers.get("Individual");
		if (this.origin && q) {
			var n = unieap.Action.getIndividual(this.grid.id);
			if (n) {
				var p = {};
				p.sequence = [];
				p.fixedNum = 0;
				for (var h = 0; h < n.length; h++) {
					var g = n[h];
					p.sequence.push(g.index);
					if (g.lock) {
						p.fixedNum++;
					}
				}
				if (p.sequence.length == this.origin.sequence.length) {
					this._newSequence = dojo.clone(p.sequence);
				}
				this.structure = this._customStructure(p.sequence, p.fixedNum);
			} else {
				this.structure = this._customStructure();
			}
		} else {
			if (this.origin) {
				this.structure = this._customStructure();
			}
		}
	},
	_parseRows : function(c) {
		var d = [];
		var b = dojo.query("div[tagName='row']", c);
		if (b.length == 0) {
			d.push(this._parseCells(dojo.query("div[tagName='cell']", c)));
		}
		for (var a = 0; a < b.length; a++) {
			d.push(this._parseCells(dojo.query("div[tagName='cell']", b[a])));
		}
		return d;
	},
	_parseCells : function(e) {
		var l = [], c, j;
		var a = unieap.grid.Cell.prototype._cellProps;
		for (var f = 0, g = e.length; f < g; f++) {
			var d = e[f];
			var k = {};
			for (var b in a) {
				var j = e[f].getAttribute(b);
				if (j != null) {
					var h = this._dataConvertor[a[b]];
					k[b] = h(j);
				}
			}
			if (dojo.trim(d.innerHTML) != "") {}
			l.push(k);
		}
		return l;
	},
	_dataConvertor : {
		string : function(a) {
			return a;
		},
		number : function(a) {
			return Number(a);
		},
		"boolean" : function(a) {
			return a == "true";
		},
		object : function(a) {
			return dojo.getObject(a) || dojo.fromJson(a);
		}
	},
	_postLayout : function() {
		if (this.grid.managers.get("ViewManager").hasRowBar() || this.structure.length == 0) {
			dojo.require("unieap.grid.view.rowbar");
			this.structure.unshift({
				        type : "unieap.grid.RowView",
				        width : 20
			        });
		}
	},
	_structureChanged : function() {
		unieap.grid.notify(this, "structureChanged");
	},
	getStructure : function() {
		return this.structure;
	},
	setStructure : function(b) {
		if (!dojo.isArray(b)) { return; }
		if (b) {
			if (b.length > 0) {
				var j = b[b.length - 1];
				j.noscroll && delete j.noscroll;
			}
			this.structure = b;
		}
		this._postLayout();
		this.fieldIndex = 0;
		if (this.cells) {
			for (var d = 0, f; f = this.cells[d]; d++) {
				f.destroy();
			}
		}
		this.cells = [];
		var m = [];
		for (var d = 0, g, l; (g = this.structure[d]); d++) {
			m.push(this.addViewDef(g));
		}
		var h = this.customStructure && this.customStructure.seq,
			k = this._filterSeq;
		if (h && k) {
			for (var a in k) {
				var e = dojo.indexOf(h, a);
				e != -1 && (this.cells[e].filter = k[a]);
			}
		}
		this.structure = m;
		this.cellCount = this.cells.length;
		this._structureChanged();
	},
	addViewDef : function(a) {
		this._defaultCellProps = a.defaultCell || {};
		return dojo.mixin({}, a, {
			        rows : this.addRowsDef(a.rows || a.cells)
		        });
	},
	addRowsDef : function(c) {
		var a = [];
		for (var b = 0, d; c && (d = c[b]); b++) {
			a.push(this.addRowDef(b, d));
		}
		return a;
	},
	addRowDef : function(f, d) {
		var b = [];
		for (var c = 0, e, a; (e = d[c]); c++) {
			a = this.addCellDef(f, c, e);
			this.onAfterAddCell(a);
			b.push(a);
			this.cells.push(a);
		}
		return b;
	},
	addCellDef : function(f, b, d) {
		var a;
		if (d.colSpan > 1) {
			a = 0;
		} else {
			a = d.width;
		}
		var c = d.field != undefined ? d.field : (d.get ? -1 : this.fieldIndex);
		if ((d.field != undefined) || !d.get) {
			this.fieldIndex = (d.field > -1 ? d.field : this.fieldIndex) + 1;
		}
		var e = dojo.mixin({}, this._defaultCellProps, d, {
			        grid : this.grid,
			        subrow : f,
			        layoutIndex : b,
			        index : this.cells.length,
			        fieldIndex : c
		        });
		a && dojo.mixin(e, {
			        width : a
		        });
		return new unieap.grid.Cell(e);
	},
	onAfterAddCell : function(a) {},
	getCell : function(a) {
		if (typeof(a) == "number") {
			return this.cells[a];
		} else {
			for (var b = 0; b < this.cells.length; b++) {
				if (this.cells[b]["name"] == a) { return this.cells[b]; }
			}
		}
	},
	getCells : function() {
		return this.cells;
	},
	getOriginCells : function() {
		return this.origin.columns;
	},
	getLayoutInfo : function() {
		var a = this.getStructure(),
			b = this;
		var c = [];
		dojo.forEach(a, function(d) {
			        if (d.type && d.type == "unieap.grid.RowView") {} else {
				        if (d.rows && d.rows.length > 0) {
					        var e = [];
					        e = b._getViewInfo(d);
					        c.push(e);
				        }
			        }
		        });
		return c;
	},
	_getViewInfo : function(g) {
		var o = g.rows,
			m = [];
		for (var f = 0, c = o.length; f < c; f++) {
			var n = o[f],
				a = [];
			for (var e = 0, d = n.length; e < d; e++) {
				var h = n[e], b;
				b = this._getCellInfo(h);
				a.push(b);
			}
			m.push(a);
		}
		return m;
	},
	_getCellInfo : function(j) {
		var f = {};
		if (j.name) {
			f.name = j.name;
		}
		var b = j.getRealWidth();
		if (b) {
			f.width = b;
		}
		if (j.label) {
			f.label = j.label;
		}
		if (j.rowSpan) {
			f.rowSpan = j.rowSpan;
		}
		if (j.colSpan) {
			f.colSpan = j.colSpan;
		}
		if (j.isMulTitle) {
			f.isMulTitle = j.isMulTitle;
		}
		if (j.getDisplayFormatter() && j.getDisplayFormatter().dataFormat) {
			f.dataFormat = j.getDisplayFormatter().dataFormat;
		}
		if (j.decoder) {
			var c = j.decoder,
				a = {};
			var d = c.valueAttr || "CODEVALUE",
				e = c.displayAttr || "CODENAME";
			var h = unieap.getDataStore(c.store);
			if (h) {
				var g, i;
				h.getRowSet().forEach(function(k) {
					        g = k.getItemValue(d);
					        i = k.getItemValue(e);
					        a[g] = i;
				        }, null, null, null, this);
			}
			f.decoder = a;
		}
		return f;
	},
	destroy : function() {
		for (var a = 0, b; b = this.cells[a]; a++) {
			b.destroy();
		}
	},
	isHidden : function(c) {
		var a = this.structure;
		var b = true;
		dojo.forEach(a, function(d) {
			        if (d.rows) {
				        dojo.forEach(d.rows, function(e) {
					                dojo.forEach(e, function(f) {
						                        if (f.name && f.name === c) {
							                        b = false;
							                        return b;
						                        }
					                        });
				                });
			        }
		        });
		return b;
	},
	_customStructure : function(h, b) {
		var f = this.origin.columns;
		if (!h) {
			h = [];
			for (var k = 0; f[k]; k++) {
				h.push(k);
			}
			b = this.origin.fixed;
		}
		b = b ? b : 0;
		var g = [];
		var j = {
			noscroll : true
		};
		var l = {};
		j.rows = [];
		l.rows = [];
		var o = [];
		var d = [];
		var e = null,
			n = null;
		var a = unieap.grid.Cell.prototype._cellProps;
		for (var k = 0; k < h.length; k++) {
			e = f[h[k]];
			if (e.name && this.cells) {
				var m = -2;
				if (this.customStructure) {
					m = dojo.indexOf(this.customStructure.seq, h[k]);
				}
				if (m > -1) {
					n = this.cells[m];
					for (var c in a) {
						if (c != "width") {
							e[c] = n[c];
						}
					}
				}
			}
			if (b && k < b) {
				o.push(e);
			} else {
				d.push(e);
			}
		}
		j.rows.push(o);
		l.rows.push(d);
		if (o.length > 0 && d.length > 0) {
			g.push(j);
			g.push(l);
		} else {
			if (o.length > 0) {
				g.push(j);
			} else {
				if (d.length > 0) {
					g.push(l);
				}
			}
		}
		this.customStructure && this._preserveFilteredCells(this.customStructure.seq, h);
		this.customStructure = {
			fixed : b,
			seq : []
		};
		for (var k = 0; k < h.length; k++) {
			this.customStructure.seq.push(h[k]);
		}
		return g;
	},
	_preserveFilteredCells : function(a) {
		!this._filterSeq && (this._filterSeq = {});
		dojo.forEach(this.cells, function(b, c) {
			        b.filter && (this._filterSeq[a[c]] = b.filter);
		        }, this);
	},
	clearFilterInfo : function(a) {
		var c = this.customStructure;
		if (!c || !this._filterSeq) { return; }
		if (a) {
			var d = -2,
				c = c.seq;
			for (var e = 0, b = this.cells.length; e < b; e++) {
				if (a.id == this.cells[e].id || a.name == this.cells[e].name) {
					d = e;
					break;
				}
			}
			d > -1 && (delete this._filterSeq[c[d]]);
		} else {
			this._filterSeq && (delete this._filterSeq);
		}
	},
	sortCell : function(g, e) {
		var f = g;
		if (!dojo.isArray(f) || f.length == 0 || !this.customStructure) { return; }
		f = unieap.array_unique(f);
		for (var c = 0; c < f.length; c++) {
			!isNaN(f[c]) && (f[c] = parseInt(f[c], 10));
			if (dojo.isString(f[c])) {
				for (var b = 0; this.origin.columns[b]; b++) {
					if (this.origin.columns[b].id == f[c]
					        || this.origin.columns[b].securityId == f[c]) {
						f[c] = b;
						break;
					}
				}
				if (dojo.isString(f[c])) { return; }
			} else {
				if (isNaN(f[c])) { return; }
			}
		}
		if (f.length == this.origin.sequence.length) {
			var a = arguments.callee.caller;
			a.nom != "applyIndividual" && (this._newSequence = f);
		}
		var d = this._customStructure(f, e);
		if (d) {
			this.structure = d;
			this.setStructure(this.structure);
		}
	},
	hideCell : function(g) {
		var b = this.customStructure;
		if (!dojo.isArray(g) || g.length == 0 || !b) { return; }
		g = unieap.array_unique(g);
		for (var d = 0; d < g.length; d++) {
			!isNaN(g[d]) && (g[d] = parseInt(g[d], 10));
			if (dojo.isString(g[d])) {
				for (var c = 0; this.origin.columns[c]; c++) {
					if (this.origin.columns[c].id == g[d]
					        || this.origin.columns[c].securityId == g[d]) {
						g[d] = c;
						break;
					}
				}
				if (dojo.isString(g[d])) { return; }
			} else {
				if (isNaN(g[d])) { return; }
			}
		}
		var f = b.fixed,
			b = dojo.clone(b.seq);
		for (var d = 0, a = g.length; d < a; d++) {
			if ((index = dojo.indexOf(b, g[d])) > -1) {
				index < f && f--;
				b.splice(index, 1);
			}
		}
		var e = this._customStructure(b, f);
		if (e) {
			this.structure = e;
			this.setStructure(this.structure);
		}
	},
	showCell : function(h) {
		var p = this.customStructure;
		if (!dojo.isArray(h) || h.length == 0 || !p) { return; }
		h = unieap.array_unique(h);
		for (var f = 0; f < h.length; f++) {
			!isNaN(h[f]) && (h[f] = parseInt(h[f], 10));
			if (dojo.isString(h[f])) {
				for (var e = 0; this.origin.columns[e]; e++) {
					if (this.origin.columns[e].id == h[f]
					        || this.origin.columns[e].securityId == h[f]) {
						h[f] = e;
						break;
					}
				}
				if (dojo.isString(h[f])) { return; }
			} else {
				if (isNaN(h[f])) { return; }
			}
		}
		var d = p.fixed,
			p = dojo.clone(p.seq),
			o = this._newSequence,
			g = [], a;
		if (o && o.length > 0) {
			a = o;
		} else {
			a = this.origin.sequence;
		}
		for (var f = 0, b = a.length; f < b; f++) {
			var n = false;
			for (var e = 0, c = p.length; e < c; e++) {
				if (a[f] == p[e]) {
					n = true;
					break;
				}
			}
			n || g.push(a[f]);
		}
		if (g.length == 0) { return; }
		for (var f = 0, b = h.length; f < b; f++) {
			var m = -1;
			if ((index = dojo.indexOf(g, h[f])) > -1) {
				if (o) {
					m = dojo.indexOf(o, g[index]);
				}
				m == -1 ? (m = g[index]) : (m = m);
				m > d ? (m = m) : (m = d);
				p.splice(m, 0, g[index]);
			}
		}
		var q = this._customStructure(p, d);
		if (q) {
			this.structure = q;
			this.setStructure(this.structure);
		}
	},
	lockCell : function(m, d) {
		var o = this.customStructure;
		if (!dojo.isArray(m) || m.length == 0 || !o) { return; }
		m = unieap.array_unique(m);
		typeof(d) == "undefined" && (d = true);
		for (var e = 0; e < m.length; e++) {
			!isNaN(m[e]) && (m[e] = parseInt(m[e], 10));
			if (dojo.isString(m[e])) {
				for (var c = 0; this.origin.columns[c]; c++) {
					if (this.origin.columns[c].id == m[e]) {
						m[e] = c;
						break;
					}
				}
				if (dojo.isString(m[e])) { return; }
			} else {
				if (isNaN(m[e])) { return; }
			}
		}
		var b = o.fixed,
			o = dojo.clone(o.seq),
			n = this._newSequence,
			f = [],
			h = [];
		for (var e = 0, a = o.length; e < a; e++) {
			if (e < b) {
				f.push(o[e]);
			}
		}
		if (f.length == 0 && !d) { return; }
		for (var e = 0, a = m.length; e < a; e++) {
			if (dojo.indexOf(o, m[e]) > -1) {
				if (d) {
					dojo.indexOf(f, m[e]) == -1 && h.push(m[e]);
				} else {
					dojo.indexOf(f, m[e]) > -1 && h.push(m[e]);
				}
			}
		}
		if (h.length == 0) { return; }
		for (var e = 0, a = h.length; e < a; e++) {
			var g = dojo.indexOf(o, h[e]);
			o.splice(g, 1);
			if (d) {
				o.splice(b, 0, h[e]);
				b++;
			}
		}
		if (!d) {
			b -= h.length;
			var k = b;
			for (var e = 0, a = h.length; e < a; e++) {
				o.splice(k, 0, h[e]);
				k++;
			}
		}
		var p = this._customStructure(o, b);
		if (p) {
			this.structure = p;
			this.setStructure(this.structure);
		}
	},
	forEachCell : function(a) {
		for (var b = 0, d; d = this.cells[b]; b++) {
			a(d, b);
		}
	}
});
/* /unieap/ria3.3/unieap/grid/manager/managers.js */
dojo.provide("unieap.grid.manager.managers");
dojo.declare("unieap.grid.managers", null, {
	        params : null,
	        managers : null,
	        userManagers : null,
	        lazyManagers : {
		        PrintManager : {},
		        ExportManager : {},
		        PagingManager : {},
		        FilterManager : {},
		        SelectionManager : {
			        selectType : "none"
		        },
		        EditManager : {
			        editType : "readonly"
		        }
	        },
	        constructor : function(a) {
		        this.grid = a;
		        this.params = {};
		        this.managers = {};
		        this.userManagers = {};
		        this.params.LayoutManager = a.layout || {};
		        this.params.ViewManager = a.views || {};
		        this.params.RowManager = a.rows || {};
		        this.params.MenuManager = a.menu || {};
		        this._updateMenuParams(this.params.MenuManager);
		        this.params.SelectionManager = a.selection;
		        this.params.EditManager = a.edit;
		        this.params.GroupManager = a.group;
		        this.params.TreeManager = a.tree;
		        this.params.UnitedCellManager = a.unitedCell;
		        this.params.DetailManager = a.detail;
	        },
	        _updateMenuParams : function(b) {
		        var a = {};
		        this.grid.filter && (a["unieap.grid.menu.filter"] = this.grid.filter);
		        dojo.mixin(b, {
			                controlsNameList : a
		                });
	        },
	        _loadManager : function(b) {
		        if (this.userManagers[b] || !this.get(b)) { return; }
		        var d = this.get(b);
		        var a = {};
		        for (var c in d.ui) {
			        if (dojo.isFunction(d[c])) {
				        a[c] = dojo.hitch(d, d[c]);
			        } else {
				        if (c == "events") {
					        for (e in d.ui[c]) {
						        a[e] = function() {};
						        dojo.connect(d, e, a, e);
					        }
				        } else {
					        a[c] = d[c];
				        }
			        }
		        }
		        a.funnelEvent = function(g, f) {
			        d[g] = f;
		        };
		        this.userManagers[b] = a;
	        },
	        reloadManager : function(b) {
		        if (!this.get(b)) { return; }
		        var c = this.get(b);
		        var a = {};
		        for (member in c.ui) {
			        if (dojo.isFunction(c[member])) {
				        a[member] = dojo.hitch(c, c[member]);
			        } else {
				        if (member == "events") {
					        for (e in c.ui[member]) {
						        a[e] = function() {};
						        dojo.connect(c, e, a, e);
					        }
				        } else {
					        a[member] = c[member];
				        }
			        }
		        }
		        dojo.mixin(this.userManagers[b], a);
	        },
	        init : function() {
		        for (manager in this.params) {
			        if (this.params[manager]) {
				        this.get(manager);
			        }
		        }
	        },
	        get : function(c) {
		        if (!this.managers[c]) {
			        var d = this.params[c];
			        if (!d) {
				        if (this.lazyManagers[c]) {
					        d = this.lazyManagers[c] || {};
				        } else {
					        return null;
				        }
			        }
			        d = dojo.mixin({
				                grid : this.grid
			                }, d);
			        var a = "unieap.grid.manager." + c;
			        dojo.require(a);
			        var b = dojo.getObject(a);
			        this.managers[c] = new b(d);
			        delete this.params[c];
		        }
		        return this.managers[c];
	        },
	        getManager : function(a) {
		        this._loadManager(a);
		        return this.userManagers[a];
	        },
	        destroy : function() {
		        var b = this.managers;
		        for (var a in b) {
			        b[a] && b[a].destroy && b[a].destroy();
		        }
	        },
	        addPlus : function(b, a, c) {
		        if (!b.plus) {
			        b.plus = {};
		        }
		        if (!b.plus[a]) {
			        b.plus[a] = [];
		        }
		        b.plus[a].push(c);
	        },
	        getPlus : function(b, a) {
		        if (b && b.plus && b.plus[a]) { return b.plus[a]; }
		        return null;
	        }
        });
/* /unieap/ria3.3/unieap/grid/view/drag.js */
dojo.provide("unieap.grid.view.drag");
(function() {
	var a = unieap.grid.drag = {};
	a.dragging = false;
	a.hysteresis = 2;
	a.capture = function(b) {
		if (b.setCapture) {
			b.setCapture();
		} else {
			document.addEventListener("mousemove", b.onmousemove, true);
			document.addEventListener("mouseup", b.onmouseup, true);
			document.addEventListener("click", b.onclick, true);
		}
	};
	a.release = function(b) {
		if (b.releaseCapture) {
			b.releaseCapture();
		} else {
			document.removeEventListener("click", b.onclick, true);
			document.removeEventListener("mouseup", b.onmouseup, true);
			document.removeEventListener("mousemove", b.onmousemove, true);
		}
		a.events.release();
	};
	a.start = function(f, e, g, b, c, d) {
		if (!f || a.dragging) { return; }
		a.dragging = true;
		a.elt = f;
		a.events = {
			drag : e || unieap.grid.nop,
			end : g || unieap.grid.nop,
			release : b || unieap.grid.nop,
			start : d || unieap.grid.nop,
			oldmove : f.onmousemove,
			oldup : f.onmouseup,
			oldclick : f.onclick
		};
		a.positionX = (c && ("screenX" in c) ? c.screenX : false);
		a.positionY = (c && ("screenY" in c) ? c.screenY : false);
		a.started = (a.position === false);
		f.onmousemove = a.mousemove;
		f.onmouseup = a.mouseup;
		f.onclick = a.click;
		a.capture(a.elt);
	};
	a.end = function() {
		a.release(a.elt);
		a.elt.onmousemove = a.events.oldmove;
		a.elt.onmouseup = a.events.oldup;
		a.elt.onclick = a.events.oldclick;
		a.elt = null;
		try {
			if (a.started) {
				a.events.end();
			}
		}
		finally {
			a.dragging = false;
		}
	};
	a.calcDelta = function(b) {
		b.deltaX = b.screenX - a.positionX;
		b.deltaY = b.screenY - a.positionY;
	};
	a.hasMoved = function(b) {
		return Math.abs(b.deltaX) + Math.abs(b.deltaY) > a.hysteresis;
	};
	a.mousemove = function(b) {
		b = dojo.fixEvent(b);
		dojo.stopEvent(b);
		a.calcDelta(b);
		if ((!a.started) && (a.hasMoved(b))) {
			a.events.start(b);
			a.started = true;
		}
		if (a.started) {
			a.events.drag(b);
		}
	};
	a.mouseup = function(b) {
		dojo.stopEvent(dojo.fixEvent(b));
		a.end();
	};
	a.click = function(b) {
		dojo.stopEvent(dojo.fixEvent(b));
	};
})();
/* /unieap/ria3.3/unieap/grid/view/builder.js */
dojo.provide("unieap.grid.view.builder");
dojo.require("unieap.grid.view.drag");
unieap.grid.rowIndexTag = "gridRowIndex";
dojo.declare("unieap.grid.view.Builder", null, {
	view : null,
	_table : '<table class="u-grid-row-table" border="0" cellspacing="0" cellpadding="0"',
	constructor : function(a) {
		this.view = a;
	},
	generateCellMarkup : function(d, h) {
		var a = [], b, f, g, e;
		if (h) {
			f = "th";
			g = "colSpan";
			e = "rowSpan";
		} else {
			f = "td";
			g = "contentColSpan";
			e = "contentRowSpan";
		}
		b = ["<" + f + " tabIndex='-1'"];
		d.colSpan && b.push(" colspan='", d.colSpan, "'");
		d.rowSpan && b.push(" rowspan='", d.rowSpan, "'");
		b.push(" class='");
		h && b.push("u-grid-hcell ");
		d.classes && b.push(d.classes.join(" "));
		b.push("");
		a.push(b.join(""));
		a.push("");
		b = ["' idx='", d.index, "' style='"];
		b.push(h ? d.headerStyles : d.styles);
		a.push(b.join(""));
		a.push("");
		b = ["'"];
		b.push(">");
		a.push(b.join(""));
		a.push("");
		a.push("</" + f + ">");
		return a;
	},
	isCellNode : function(a) {
		return Boolean(a && a.getAttribute && a.getAttribute("idx"));
	},
	getCellNodeIndex : function(a) {
		return a ? Number(a.getAttribute("idx")) : -1;
	},
	getCellNode : function(b, d) {
		for (var f = 0, g; g = unieap.grid.getTr(b.firstChild, f); f++) {
			for (var e = 0, a; a = g.cells[e]; e++) {
				if (this.getCellNodeIndex(a) == d) { return a; }
			}
		}
	},
	findCellTarget : function(a, b) {
		var d = a;
		while (d && !this.isCellNode(d) && (d != b)) {
			d = d.parentNode;
		}
		return d != b ? d : null;
	},
	baseDecorateEvent : function(b) {
		b.dispatch = "do" + b.type;
		b.grid = this.view.grid;
		b.sourceView = this.view;
		b.cellNode = this.findCellTarget(b.target, b.rowNode);
		b.cellIndex = this.getCellNodeIndex(b.cellNode);
		var a = this.view.grid.managers.get("LayoutManager");
		b.cell = (b.cellIndex >= 0 ? a.getCell(b.cellIndex) : null);
	},
	findTarget : function(a, d) {
		var b = a;
		while (b && !(d in b) && (b != this.view.grid.domNode)) {
			b = b.parentNode;
		}
		return (b != this.view.domNode) ? b : null;
	},
	findRowTarget : function(d) {
		var e = this.findTarget(d, unieap.grid.rowIndexTag);
		var b = 0,
			a = e;
		while (a && (a != this.view.grid.domNode)) {
			a = a.parentNode;
			b += 1;
			if (b > 10) { return null; }
		}
		if (b > 10) { return null; }
		return e;
	},
	isIntraNodeEvent : function(b) {
		try {
			return (b.cellNode && b.relatedTarget && dojo.isDescendant(b.relatedTarget, b.cellNode));
		}
		catch (a) {
			return false;
		}
	},
	isIntraRowEvent : function(b) {
		try {
			var d = b.relatedTarget && this.findRowTarget(b.relatedTarget);
			return !d && (b.rowIndex == -1) || d && (b.rowIndex == d.gridRowIndex);
		}
		catch (a) {
			return false;
		}
	},
	dispatchEvent : function(a) {
		if (a.dispatch in this) { return this[a.dispatch](a); }
	},
	domouseover : function(a) {
		if (a.cellNode && (a.cellNode != this.lastOverCellNode)) {
			this.lastOverCellNode = a.cellNode;
			this.view.onMouseOver(a);
		}
		this.view.onMouseOverRow(a);
	},
	domouseout : function(b) {
		var a = b.relatedTarget;
		if (a && a.className != "u-grid-text2" && a.className != "u-grid-cell") {
			this.view.onMouseOut(b);
		} else {
			if (b.cellNode && (b.cellNode == this.lastOverCellNode)
			        && !this.isIntraNodeEvent(b, this.lastOverCellNode)) {
				this.lastOverCellNode = null;
				if (!this.isIntraRowEvent(b)) {
					this.view.onMouseOutRow(b);
				}
			}
		}
	}
});
dojo.declare("unieap.grid.view.ContentBuilder", unieap.grid.view.Builder, {
	        update : function() {
		        this.prepareCells();
	        },
	        prepareCells : function() {
		        var e = this.view.contentStructure.rows;
		        for (var b = 0, f; (f = e[b]); b++) {
			        for (var d = 0, a; (a = f[d]); d++) {
				        a.markup = this.generateCellMarkup(a, false);
			        }
		        }
	        },
	        generateHtml : function(t, h, l) {
		        var k = [this._table],
			        q = this.view,
			        u = q.contentStructure.rows,
			        e = this.view.grid.getBinding().getRowData(),
			        d = this.view.grid.managers.get("ViewManager").markDirty,
			        o = this.view.grid.managers.get("RowManager").defaultRowHeight;
		        k.push('height="' + q.rowHeight + 'px">');
		        k.push(this.view.rowTable.colgroup);
		        for (var f = 0, s; (s = u[f]); f++) {
			        k.push(!s.invisible ? "<tr>" : '<tr class="u-grid-invisible">');
			        for (var g = 0, p, b, a; (p = s[g]); g++) {
				        b = dojo.clone(p.markup), a = p.customClasses = [];
				        if (l) {
					        var n = b[2].indexOf("style='");
					        b[2] = b[2].substring(0, n + 7);
				        }
				        if (dojo.trim(b[2]).endWith(";")) {
					        b[3] = "height:" + (o - 1) + "px";
				        } else {
					        b[3] = ";height:" + (o - 1) + "px";
				        }
				        b[5] = this.formatCellNode(p, t, h, e, d);
				        k.push.apply(k, b);
			        }
			        k.push("</tr>");
		        }
		        k.push("</table>");
		        return k.join("");
	        },
	        formatCellNode : function(i, j, e, d, b) {
		        var h = i.format(j, e),
			        f = "", a;
		        if (b && !e) {
			        if (i.name && d && d[j] && (a = d[j]["_o"]) && i.name in a) {
				        f += '<div class="u-grid-value-changed"></div></div>';
				        var g = h.lastIndexOf("</div>");
				        h = h.substring(0, g) + f;
			        }
		        }
		        return h;
	        },
	        decorateEvent : function(a) {
		        a.rowNode = this.findRowTarget(a.target);
		        if (!a.rowNode) { return false; }
		        a.rowIndex = a.rowNode[unieap.grid.rowIndexTag];
		        this.baseDecorateEvent(a);
		        return true;
	        }
        });
dojo.declare("unieap.grid.view.HeaderBuilder", unieap.grid.view.Builder, {
	        bogusClickTime : 0,
	        overResizeWidth : 4,
	        minColWidth : 10,
	        oldWidth : -1,
	        rawWidth : -1,
	        update : function() {
		        this.tableMap = new unieap.grid.tableMap(this.view.structure.rows);
	        },
	        generateHtml : function() {
		        var g = [],
			        q = this.view.structure.rows;
		        var m = this.view.grid.getSortInfo();
		        var a = false;
		        for (var e = 0, p; (p = q[e]); e++) {
			        g.push(!p.invisible ? "<tr>" : '<tr class="u-grid-invisible">');
			        for (var f = 0, h, b, l; (h = p[f]); f++) {
				        l = this.generateCellMarkup(h, true);
				        a = a || h.isMulTitle || false;
				        l[5] = "<nobr class='u-grid-text'>" + (h.label || "") + "</nobr>";
				        for (var d = 0; d < m.length; d++) {
					        if (m[d] == h) {
						        b = h.customClasses = [];
						        b.push(d == 0 ? " u-grid-sort-primary" : " u-grid-sort-secondary");
						        l[1] = b.join(" ");
						        var o = ["<nobr class='u-grid-text'><span"];
						        o.push(">");
						        o.push(h.label || "");
						        o.push("</span>");
						        o.push("<span class='"
						                + (h.asc > 0 ? "u-grid-sort-up" : "u-grid-sort-down")
						                + "'>&nbsp</span>");
						        o.push("</nobr>");
						        l[5] = o.join("");
						        break;
					        }
				        }
				        l[5] = "<div class='u-grid-header-cell'>" + l[5] + "</div>";
				        g.push(l.join(""));
			        }
			        g.push("</tr>");
		        }
		        g.push("</table>");
		        g.push("</div>");
		        if (dojo.isIE && a) {
			        var n = ["<tr style='display:none;'>"];
			        for (var f = this.view.rowTable.cols.length; f > 0; f--) {
				        n.push('<td class="u-grid-cell"></td>');
			        }
			        n.push("</tr>");
			        g.unshift(n.join(""));
		        }
		        g.unshift(this.view.rowTable.colgroup);
		        g.unshift('height="' + this.view.headerHeight + 'px">');
		        g.unshift(this._table);
		        g.unshift("<div class='u-grid-inner'>");
		        return g.join("");
	        },
	        getMousePosition : function(a, g) {
		        var h = {
			        x : 0,
			        y : 0
		        };
		        var f, e,
			        d = g;
		        var b = d;
		        e = d.offsetLeft;
		        while (b = b.offsetParent) {
			        e += b.offsetLeft;
		        }
		        h.x = a.clientX - e + document.body.scrollLeft;
		        b = d;
		        f = d.offsetTop;
		        while (b = b.offsetParent) {
			        f += b.offsetTop;
		        }
		        h.y = a.clientY - f + document.body.scrollTop;
		        return h;
	        },
	        decorateEvent : function(a) {
		        this.baseDecorateEvent(a);
		        a.rowIndex = -1;
		        a.cellX = this.getCellX(a);
		        return true;
	        },
	        getCellX : function(b) {
		        var a = b.layerX;
		        if (dojo.isMoz) {
			        var d = unieap.grid.ascendDom(b.target, unieap.grid.makeNotTagName("th"));
			        a -= (d && d.offsetLeft) || 0;
		        }
		        var d = unieap.grid.ascendDom(b.target, function() {
			                if (!d || d == b.cellNode) { return false; }
			                a += (d.offsetLeft < 0 ? 0 : d.offsetLeft);
			                return true;
		                });
		        return a;
	        },
	        prepareLeftResize : function(b) {
		        var a = unieap.grid.getTdIndex(b.cellNode);
		        b.cellNode = (a ? b.cellNode.parentNode.cells[a - 1] : null);
		        b.cellIndex = (b.cellNode ? this.getCellNodeIndex(b.cellNode) : -1);
		        return Boolean(b.cellNode);
	        },
	        canResize : function(d) {
		        if (!d.cellNode || d.cellNode.colSpan > 1 || d.cell.noresize) { return false; }
		        var b = this.view.grid.managers.get("LayoutManager");
		        var a = b.getCell(d.cellIndex);
		        return !a.noresize;
	        },
	        overRightResizeArea : function(b) {
		        if (dojo.isFF) {
			        return b.cellNode && (b.cellX >= b.cellNode.offsetWidth - this.overResizeWidth);
		        } else {
			        if (b.cellNode) {
				        var a = this.view.scrollboxNode,
					        d = 0;
				        while (a) {
					        d += a.scrollLeft;
					        a = a.offsetParent;
				        }
				        this.cellX = this.getMousePosition(b, b.cellNode).x + d;
				        return b.cellNode
				                && (this.cellX >= b.cellNode.offsetWidth - this.overResizeWidth);
			        } else {
				        return false;
			        }
		        }
	        },
	        domousemove : function(a) {
		        var b = this.overRightResizeArea(a) ? "e-resize" : "default";
		        if (b && !this.canResize(a)) {
			        b = "default";
		        }
		        a.sourceView.headerNode.style.cursor = b || "";
	        },
	        domousedown : function(a) {
		        if (!unieap.grid.drag.dragging) {
			        if (this.overRightResizeArea(a) && this.canResize(a)) {
				        this.beginColumnResize(a);
			        }
		        }
	        },
	        domouseup : function(a) {
		        this.resizeHelper && this.resizeHelper.end();
	        },
	        domouseover : function(a) {
		        this.view.onMouseOverHeader(a);
	        },
	        domouseout : function(a) {
		        this.view.onMouseOutHeader(a);
	        },
	        doclick : function(a) {
		        if (new Date().getTime() < this.bogusClickTime) {
			        dojo.stopEvent(a);
			        return true;
		        }
	        },
	        getResizeHelper : function() {
		        if (!this.resizeHelper) {
			        this.resizeHelper = new unieap.grid.resizeHelper(this.view);
		        }
		        return this.resizeHelper;
	        },
	        beginColumnResize : function(h) {
		        dojo.stopEvent(h);
		        var g = [],
			        b = this.tableMap.findOverlappingNodes(h.cellNode);
		        for (var d = 0, a; (a = b[d]); d++) {
			        g.push({
				                node : a,
				                index : this.getCellNodeIndex(a),
				                width : a.offsetWidth
			                });
		        }
		        var f = {
			        view : h.sourceView,
			        node : h.cellNode,
			        index : h.cellIndex,
			        w : h.cellNode.clientWidth,
			        spanners : g
		        };
		        this.oldWidth = h.cellNode.offsetWidth;
		        if (dojo.isFF) {
			        this.getResizeHelper().begin(h.cellX + h.cellNode.offsetLeft
			                + this.view.domNode.offsetLeft - this.view.scrollboxNode.scrollLeft);
		        } else {
			        this.getResizeHelper().begin(this.cellX + h.cellNode.offsetLeft
			                + this.view.domNode.offsetLeft - this.view.scrollboxNode.scrollLeft);
		        }
		        unieap.grid.drag.start(h.cellNode, dojo.hitch(this, "doResizeColumn", f), dojo
		                        .hitch(this, "endResizeColumn", f), dojo.hitch(this, "domouseup"),
		                h);
	        },
	        doResizeColumn : function(e, f) {
		        var k = e.w + f.deltaX,
			        i = e.view,
			        a = i.grid;
		        var b = f.target.parentNode.offsetParent;
		        while (b) {
			        if (dojo.hasClass(b, "u-grid")) {
				        break;
			        } else {
				        b = b.offsetParent;
			        }
		        }
		        if (null == b || e.view.grid.id != b.id) { return; }
		        if (k >= this.minColWidth) {
			        this.getResizeHelper().resize(f.deltaX);
			        this.rawWidth = k;
		        }
		        if (i.noscroll) {
			        var l = a.managers.get("ViewManager").hasRowBar(),
				        h = a.domNode.offsetWidth,
				        g = dojo.query(".u-grid-header", a.header), d;
			        if (l) {
				        var j = g[0];
				        fixedNode = g[1];
				        h = h - j.offsetWidth;
			        } else {
				        fixedNode = g[0];
			        }
			        h = h - this._getFixedNodeWidth(e.node, fixedNode);
			        this.rawWidth >= h && (this.rawWidth = h);
		        }
	        },
	        _getFixedNodeWidth : function(b, g) {
		        var d = dojo.query(".u-grid-cell", g),
			        f = 0;
		        for (var e = 0, a = d.length; e < a; e++) {
			        if (d[e] === b) {
				        break;
			        }
			        f += (d[e].offsetWidth + 1);
		        }
		        return f;
	        },
	        endResizeColumn : function(e) {
		        this.getResizeHelper().end();
		        this.bogusClickTime = new Date().getTime() + 30;
		        if (this.rawWidth > this.minColWidth && this.rawWidth != this.oldWidth) {
			        var b = this.getCellNodeIndex(e.node);
			        var d = this.view.grid.managers.get("LayoutManager");
			        var a = b >= 0 ? d.getCell(b) : null;
			        a && setTimeout(dojo.hitch(e.view, "updateCellWidth", a, this.rawWidth), 50);
		        }
	        }
        });
dojo.declare("unieap.grid.tableMap", null, {
	        constructor : function(a) {
		        this.mapRows(a);
	        },
	        map : null,
	        mapRows : function(n) {
		        var g = n.length;
		        if (!g) { return; }
		        this.map = [];
		        for (var a = 0; (m = n[a]); a++) {
			        this.map[a] = [];
		        }
		        for (var a = 0, m; (m = n[a]); a++) {
			        for (var b = 0, h = 0, k, d, e; (k = m[b]); b++) {
				        while (this.map[a][h]) {
					        h++;
				        }
				        this.map[a][h] = {
					        c : b,
					        r : a
				        };
				        e = k.rowSpan || 1;
				        d = k.colSpan || 1;
				        for (var f = 0; f < e; f++) {
					        for (var l = 0; l < d; l++) {
						        this.map[a + f][h + l] = this.map[a][h];
					        }
				        }
				        h += d;
			        }
		        }
	        },
	        getMapCoords : function(f, b) {
		        for (var d = 0, g; (g = this.map[d]); d++) {
			        for (var e = 0, a; (a = g[e]); e++) {
				        if (a.c == b && a.r == f) { return {
					        j : d,
					        i : e
				        }; }
			        }
		        }
		        return {
			        j : -1,
			        i : -1
		        };
	        },
	        getNode : function(b, d, a) {
		        var e = b && b.rows[d];
		        return e && e.cells[a];
	        },
	        _findOverlappingNodes : function(inTable, inRow, inCol) {
		        var nodes = [];
		        var m = this.getMapCoords(inRow, inCol);
		        var row = this.map[m.j];
		        for (var j = 0, row; (row = this.map[j]); j++) {
			        if (j == m.j || !row[m.i]) {
				        continue;
			        }
			        with (row[m.i]) {
				        var n = this.getNode(inTable, r, c);
				        if (n) {
					        nodes.push(n);
				        }
			        }
		        }
		        return nodes;
	        },
	        findOverlappingNodes : function(a) {
		        return this._findOverlappingNodes(unieap.grid.findTable(a), unieap.grid
		                        .getTrIndex(a.parentNode), unieap.grid.getTdIndex(a));
	        }
        });
dojo.declare("unieap.grid.resizeHelper", null, {
	        view : null,
	        helperNode : null,
	        positionX : 5,
	        constructor : function(a) {
		        this.view = a;
		        this.helperNode = dojo.create("div");
		        dojo.addClass(this.helperNode, "u-grid-resize-proxy");
		        dojo.style(this.helperNode, "display", "none");
	        },
	        begin : function(a) {
		        this.positionX = a;
		        dojo.place(this.helperNode, this.view.grid.domNode);
		        dojo.style(this.helperNode, "display", "block");
		        dojo.style(this.helperNode, "left", this.positionX + "px");
	        },
	        resize : function(a) {
		        dojo.style(this.helperNode, "left", (this.positionX + a) + "px");
	        },
	        end : function() {
		        dojo.style(this.helperNode, "display", "none");
		        dojo.style(this.helperNode, "left", "5px");
	        }
        });
/* /unieap/ria3.3/unieap/grid/view/view.js */
dojo.provide("unieap.grid.view.view");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.declare("unieap.grid.View", [dijit._Widget, dijit._Templated], {
	rowClassTag : "u-grid-row",
	headerNode : null,
	headerBuilder : null,
	contentBuilder : null,
	lastTop : null,
	viewWidth : "",
	templateString : '<td class="u-grid-view-cell" valign="top"><div class="u-grid-header-scrollbox" dojoAttachPoint="headerScrollNode"><div dojoAttachPoint="headerContentNode" class="u-grid-header-content"></div></div><div dojoAttachPoint="contentboxNode" class="u-grid-contentbox"><div class="u-grid-scrollbox" dojoAttachPoint="scrollboxNode"><div class="u-grid-content" dojoAttachPoint="contentNode"></div></div></div></td>',
	postCreate : function() {
		this.rowNodes = [];
		this.headerBuilder = new unieap.grid.view.HeaderBuilder(this);
		this.contentBuilder = new unieap.grid.view.ContentBuilder(this);
		unieap.grid.funnelEvents(this.contentNode, this, "doContentEvent", ["mouseover",
		                "mouseout", "mousedown", "click", "dblclick", "contextmenu", "mouseup"]);
		unieap.grid.funnelEvents(this.headerContentNode, this, "doHeaderEvent", ["mouseover",
		                "mouseout", "mousemove", "mousedown", "click", "dblclick", "contextmenu"]);
	},
	destroy : function() {
		dojo.destroy(this.domNode);
		dojo.destroy(this.headerNode);
		this.inherited(arguments);
	},
	resizeContentWidth : function() {
		var b = 0;
		for (var d = this.rowTable.cols, a = d.length - 1; a >= 0; a--) {
			if (!d[a].resized && d[a].isPercent()) {
				dojo.style(this.contentNode, "width", "auto");
				return;
			}
			b += d[a].getPixelWidth();
		}
		dojo.style(this.contentNode, "width", b + "px");
		if (!this.noscroll) {
			dojo.style(this.headerContentNode.firstChild.firstChild, "width", b + "px");
		}
	},
	setStructure : function(a) {
		this.structure = a;
		this.noscroll = a.noscroll;
		if (this.noscroll) {
			dojo.style(this.scrollboxNode, "overflow", "hidden");
		} else {
			this.connect(this.scrollboxNode, "onscroll", "doscroll");
		}
		this.updateStructure();
	},
	updateStructure : function() {
		this.updateLayout();
		this.headerBuilder.update();
		this.contentBuilder.update();
	},
	getHeaderNode : function() {
		if (!this.headerNode) {
			var a = document.createElement("td");
			dojo.addClass(a, "u-grid-header");
			a.appendChild(this.headerScrollNode);
			this.headerNode = a;
		}
		return this.headerNode;
	},
	getRowNode : function(a) {
		return this.rowNodes[a];
	},
	getCellNode : function(c, a) {
		var b = this.getRowNode(c);
		if (b) {
			return this.contentBuilder.getCellNode(b, a);
		} else {
			return null;
		}
	},
	getCurrentRows : function() {
		var a = [];
		for (i in this.rowNodes) {
			if (isNaN(i)) {
				continue;
			}
			a.push(Number(i));
		}
		return a;
	},
	getScrollbarWidth : function() {
		return (this.noscroll ? 0 : unieap.grid.getScrollbarWidth());
	},
	updateLayout : function() {
		this._prepareTable();
		this._generateTableColGroup();
		this._buildContentStructure();
		if (this.noscroll) {
			var d = 0;
			for (var c = 0, b = this.rowTable.cols.length; c < b; c++) {
				var a = this.rowTable.cols[c];
				d += a.isPercent() ? 200 : a.getPixelWidth();
			}
			dojo.style(this.domNode, "width", d + "px");
			dojo.style(this.headerNode, "width", d + "px");
		}
	},
	_prepareTable : function() {
		this.rowTable = {
			content : ""
		};
		var p = this.structure.rows,
			c = [],
			f = [];
		for (var d = 0; d < p.length; d++) {
			c[d] = [];
		}
		for (var d = 0, g, n, o; (o = p[d]); d++) {
			g = 0;
			c[d] = c[d] || [];
			f[d] = f[d] || [];
			for (var e = 0, a; (n = o[e]); e++) {
				if ((a = Number(n.colSpan)) > 1) {
					for (var b = 0; b < a; b++) {
						while (c[d][g] != null) {
							g++;
						}
						for (var h = 1, m = Number(n.rowSpan); h < m; h++) {
							c[d + h] = c[d + h] || [];
							c[d + h][g] = -1;
							f[d + h] = f[d + h] || [];
							f[d + h][g] = n.index;
						}
						c[d][g] = -1;
						f[d][g] = n.index;
						g++;
					}
				} else {
					while (c[d][g] != null) {
						g++;
					}
					c[d][g] = n.index;
					f[d][g] = n.index;
					for (var b = 1, a = Number(n.rowSpan); b < a; b++) {
						c[d + b] = c[d + b] || [];
						c[d + b][g] = c[d][g];
						f[d + b] = f[d + b] || [];
						f[d + b][g] = f[d][g];
					}
					g++;
				}
			}
		}
		this.rowTable.layout = f;
		this.rowTable.cache = c;
	},
	_generateTableColGroup : function() {
		var h = this.rowTable.cache,
			f = [],
			c = [];
		f.push("<colgroup>");
		var g = this.grid.managers.get("LayoutManager");
		for (var d = 0, b = h[0].length; d < b; d++) {
			for (var e = 0; e < h.length; e++) {
				if (h[e][d] != -1) {
					var a = g.getCell(h[e][d]);
					if (this.noscroll && a.isPercent() && !a.isRowBar) {
						a.setWidth("200px");
					}
					f.push("<col style='width:" + a.getWidth() + "'>");
					c.push(a);
					break;
				}
			}
		}
		f.push("</colgroup>");
		this.rowTable.colgroup = f.join("");
		this.rowTable.cols = c;
	},
	_buildContentStructure : function() {
		var p = this.rowTable.layout;
		this.contentStructure = {};
		var e = this.grid.managers.get("LayoutManager");
		if (p.length == 0) { return; }
		for (var c, b = 0, o, m; b < p[0].length; b++, c = p.length - 1) {
			c = p.length - 1;
			o = p[c][b];
			c--;
			while (c >= 0) {
				m = e.getCell(p[c][b]);
				if (m.isMulTitle) {
					p[c][b] = o;
				} else {
					o = p[c][b];
				}
				c--;
			}
		}
		var h = [];
		for (var c = 0; c < p.length - 1; c++) {
			var l = true;
			for (var b = 0; b < p[c].length; b++) {
				if (p[c][b] != p[c + 1][b]) {
					l = false;
					break;
				}
			}
			if (l) {
				h.push(c);
			}
		}
		for (c in h) {
			delete p[c];
		}
		var r = [],
			g = [];
		for (c in p) {
			if (typeof(p[c]) == "function") {
				continue;
			} else {
				r.push(p[c]);
			}
		}
		for (var c = 0; c < r.length; c++) {
			var q = [];
			for (var b = 0, m; b < r[c].length;) {
				if (r[c][b] == -1) {
					b++;
					continue;
				}
				m = e.getCell(r[c][b]);
				var a = c + 1;
				while (r[a] && r[a][b] == r[c][b]) {
					r[a][b] = -1;
					a++;
				}
				var k = a - c;
				if (k && k > 1) {
					m.contentRowSpan = k;
				}
				a = b + 1;
				while (r[c][b] == r[c][a]) {
					a++;
				}
				var f = a - b;
				if (f && f > 1) {
					m.contentColSpan = f;
				}
				q.push(m);
				b = a;
			}
			g.push(q);
		}
		this.contentStructure.rows = g;
	},
	hasCell : function(a) {
		var b = this.structure.rows;
		for (var d = 0; d < b.length; d++) {
			for (var e = 0; e < b[d].length; e++) {
				if (a == b[d][e]) { return true; }
			}
		}
		return false;
	},
	prerender : function(b, a) {
		this.rowHeight = b;
		this.headerHeight = a;
		this.renderHeader();
	},
	renderHeader : function() {
		this.headerContentNode.innerHTML = this.headerBuilder.generateHtml();
		this.resizeContentWidth();
		unieap.grid.notify(this, "onHeaderRender", [this.headerContentNode, this]);
	},
	renderRow : function(a, b) {
		if (a) {
			this.grid.managers.get("RowManager").onRowRemoved(a, b);
			a.innerHTML = this.contentBuilder.generateHtml(b);
		}
		unieap.grid.notify(this, "onRowRender", [a, b, this]);
	},
	destroyLockedRow : function() {
		if (this.lockedNode) {
			dojo.empty(this.lockedNode);
		}
	},
	renderLockedRow : function(c) {
		if (!c || c.length == 0) { return; }
		if (!this.lockedNode) {
			var a = "<div class='u-grid-locked'><div class='u-grid-locked-content'><div class='u-grid-inner'><div class='u-grid-locked-content-rows'></div></div></div></div>";
			var b = dojo._toDom(a);
			this.lockedContentNode = b;
			this.lockedNode = b.childNodes[0].childNodes[0].childNodes[0];
			this.lockedScrollNode = this.lockedNode.parentNode;
			this.generateLockedRow(this.lockedNode, c);
			dojo.place(b, this.scrollboxNode, "after");
		} else {
			this.generateLockedRow(this.lockedNode, c);
		}
	},
	generateLockedRow : function(a, c) {
		var b = "";
		dojo.forEach(c, function(f, e) {
			        b += "<div class='u-grid-row";
			        b += (e == 0) ? " u-grid-toplockedrow" : "";
			        b += (Boolean(e & 1) ? "" : " u-grid-row-odd");
			        b += "'>";
			        b += this.contentBuilder.generateHtml(e, f, true);
			        b += "</div>";
		        }, this);
		a.innerHTML = b;
		this.resizeLocked(c);
	},
	resizeLocked : function(d) {
		dojo.style(this.lockedScrollNode, "height", (d.length * this.rowHeight) + "px");
		var b = 0;
		if (!this.noscroll) {
			for (var e = this.rowTable.cols, a = e.length - 1; a >= 0; a--) {
				if (e[a].isPercent()) {
					dojo.style(this.lockedNode, "width", "100%");
					return;
				}
			}
		}
		dojo.style(this.lockedNode, "width", dojo.style(this.contentNode, "width") + "px");
	},
	setScrollTop : function(a) {
		if (this.lastTop == null) {
			this.lastTop = a;
			return;
		}
		this.lastTop = a;
		this.scrollboxNode.scrollTop = a;
		var b = this.scrollboxNode.scrollLeft;
		this.headerContentNode.firstChild.scrollLeft = b;
		this.lockedScrollNode && (this.lockedScrollNode.scrollLeft = b);
	},
	doscroll : function(a) {
		var e = this.grid.managers.managers.MenuManager,
			d = this.scrollboxNode.scrollLeft;
		if (e) {
			var c = e.getMenu();
			c.isShowingNow && dijit.popup.close(c);
		}
		this.headerContentNode.firstChild.scrollLeft = d;
		var b = this.scrollboxNode.scrollTop;
		if (b != this.lastTop) {
			unieap.grid.notify(this, "scrollTo", [b]);
		}
		if (this.lockedScrollNode) {
			this.lockedScrollNode.scrollLeft = d;
		}
	},
	doContentEvent : function(a) {
		if (this.contentBuilder.decorateEvent(a)) {
			this.grid.onContentEvent(a);
		}
	},
	doHeaderEvent : function(a) {
		if (this.headerBuilder.decorateEvent(a)) {
			typeof(this._flag) == "undefined" && (this._flag = true);
			if (this._flag && a.type == "click") {
				this._flag = false;
				this.grid.onHeaderEvent(a);
				setTimeout(dojo.hitch(this, function() {
					                this._flag = true;
				                }), 250);
			} else {
				if (a.type != "click") {
					this.grid.onHeaderEvent(a);
				}
			}
		}
	},
	dispatchContentEvent : function(a) {
		return this.contentBuilder.dispatchEvent(a);
	},
	dispatchHeaderEvent : function(a) {
		return this.headerBuilder.dispatchEvent(a);
	},
	onMouseOver : function(a) {
		unieap.grid.notify(this, "onMouseOver", [a]);
	},
	onMouseOut : function(a) {
		unieap.grid.notify(this, "onMouseOut", [a]);
	},
	onMouseOverHeader : function(a) {
		unieap.grid.notify(this, "onHeaderMouseOver", [a]);
	},
	onMouseOutHeader : function(a) {
		unieap.grid.notify(this, "onHeaderMouseOut", [a]);
	},
	onMouseOverRow : function(a) {
		unieap.grid.notify(this, "onMouseOverRow", [a]);
	},
	onMouseOutRow : function(a) {
		unieap.grid.notify(this, "onMouseOutRow", [a]);
	},
	updateCellWidth : function(m, f) {
		m.setWidth(f);
		var c = this.rowTable.cols,
			e = this.grid.managers.get("LayoutManager"),
			k = 0,
			n = [],
			h = -1,
			a = false;
		n.push("<colgroup>");
		for (var d = 0, l, j, b; c[d]; d++) {
			l = c[d];
			if (l == m) {
				h = d;
			}
			if (l.isPercent()) {
				a = true;
			}
			n.push("<col style='width:" + l.getWidth() + ";'>");
			k += l.getPixelWidth();
		}
		n.push("</colgroup>");
		this.rowTable.colgroup = n.join("");
		if (this.noscroll) {
			dojo.style(this.domNode, "width", k + "px");
			dojo.style(this.headerNode, "width", k + this.getScrollbarWidth() + "px");
			dojo.style(this.contentNode, "width", k + "px");
			dojo.style(this.headerContentNode, "width", k + this.getScrollbarWidth() + "px");
			dojo.style(this.headerContentNode.firstChild, "width", k + "px");
			this.lockedNode && dojo.style(this.lockedNode, "width", k + "px");
		} else {
			if (!a) {
				dojo.style(this.contentNode, "width", k + "px");
				dojo.style(this.headerContentNode.firstChild.firstChild, "width", k + "px");
				this.lockedNode && dojo.style(this.lockedNode, "width", k + "px");
			}
		}
		this._resizeWidth(this.headerContentNode, h, m.getWidth());
		this._resizeWidth(this.contentNode, h, m.getWidth());
		this.lockedNode && this._resizeWidth(this.lockedNode, h, m.getWidth());
		if (dojo.isSafari || dojo.isChrome) {
			dojo.style(this.headerContentNode, "display", "none");
			dojo.style(this.contentNode, "display", "none");
			unieap.grid.jobs.job("u-grid-cellresize", 0, dojo.hitch(this, function() {
				                dojo.style(this.headerContentNode, "display", "block");
				                dojo.style(this.contentNode, "display", "block");
			                }));
		}
		var g = this.grid.managers.get("ViewManager");
		g.adjustScrollBar();
	},
	_resizeWidth : function(e, b, d) {
		var f;
		if (e) {
			if (e == this.contentNode) {
				f = dojo.query("> div > div > .u-grid-row-table > colgroup", e);
			} else {
				f = dojo.query("> div > .u-grid-row-table > colgroup", e);
			}
		}
		for (var a, c = 0; a = f[c]; c++) {
			dojo.style(a.childNodes[b], "width", d);
		}
	},
	adjustScrollBar : function(d, c) {
		var a = this.domNode.clientHeight;
		if (!a) { return; }
		if (this.noscroll) {
			dojo.style(this.scrollboxNode, "height", (a - d.h) + "px");
		} else {
			var e = this.grid.managers.get("ViewManager");
			e.scroller.windowHeight = a - d.h;
			dojo.style(this.headerContentNode, "marginRight", d.v + "px");
			this.lockedContentNode
			        && dojo.style(this.lockedContentNode.childNodes[0], "marginRight", d.v + "px");
		}
		if (this.lockedContentNode) {
			dojo.style(this.lockedContentNode, "bottom", d.h + "px");
			dojo.style(this.lockedContentNode, "display", "none");
			dojo.style(this.lockedContentNode, "display", "block");
		}
	},
	getScrollBarPort : function() {
		var a = this.scrollboxNode;
		return {
			v : a.clientWidth < a.offsetWidth ? 17 : 0,
			h : a.clientHeight < a.offsetHeight ? 17 : 0
		};
	}
});
/* /unieap/ria3.3/unieap/grid/view/scroller.js */
dojo.provide("unieap.grid.view.scroller");
dojo.declare("unieap.grid.view.scroller.base", null, {
	rowCount : 0,
	keepRows : -1,
	defaultRowHeight : 21,
	constructor : function() {
		this.pageHeights = [];
		this.stack = [];
	},
	invalidate : function() {
		this.invalidateNodes();
		this.pageHeights = [];
		this.height = (this.pageCount ? (this.pageCount - 1) * this.pageHeight
		        + this.calcLastPageHeight() : 1);
		this.resize();
	},
	pageExists : function(a) {},
	measurePage : function(a) {},
	getRowHeight : function(a) {},
	positionPage : function(b, a) {},
	repositionPages : function(a) {},
	installPage : function(a) {},
	preparePage : function(c, b, a) {},
	renderPage : function(a) {},
	removePage : function(a) {},
	calcLastPageHeight : function() {
		if (!this.pageCount) { return 0; }
		var b = this.pageCount - 1;
		var a = ((this.rowCount % this.rowsPerPage) || (this.rowsPerPage)) * this.defaultRowHeight;
		this.pageHeights[b] = a;
		return a;
	},
	updateContentHeight : function(a) {
		this.height += a;
		this.resize();
	},
	updatePageHeight : function(c) {
		if (this.pageExists(c)) {
			var b = this.getPageHeight(c);
			var a = (this.measurePage(c)) || (b);
			this.pageHeights[c] = a;
			if ((a) && (b != a)) {
				this.updateContentHeight(a - b);
				this.repositionPages(c);
			}
		}
	},
	rowHeightChanged : function(a) {
		this.updatePageHeight(Math.floor(a / this.rowsPerPage));
	},
	invalidateNodes : function() {
		while (this.stack.length) {
			this.destroyPage(this.popPage());
		}
	},
	createPageNode : function() {
		var a = document.createElement("div");
		a.style.position = "absolute";
		a.style.width = "100%";
		a.style.left = "0";
		return a;
	},
	getPageHeight : function(b) {
		var a = this.pageHeights[b];
		return (a !== undefined ? a : this.pageHeight);
	},
	pushPage : function(a) {
		return this.stack.push(a);
	},
	popPage : function() {
		return this.stack.shift();
	},
	findPage : function(c) {
		var a = 0,
			b = 0;
		for (var d = 0; a < this.pageCount; a++, b += d) {
			d = this.getPageHeight(a);
			if (b + d >= c) {
				break;
			}
		}
		this.page = a;
		this.pageTop = b;
	},
	buildPage : function(c, a, b) {
		this.preparePage(c, a);
		this.positionPage(c, b);
		this.installPage(c);
		this.renderPage(c);
		this.pushPage(c);
	},
	needPage : function(d, c) {
		var a = this.getPageHeight(d),
			b = a;
		if (!this.pageExists(d)) {
			this.buildPage(d, (this.keepPages) && (this.stack.length >= this.keepPages), c);
			a = this.measurePage(d) || a;
			this.pageHeights[d] = a;
			if (a && (b != a)) {
				this.updateContentHeight(a - b);
			}
		} else {
			this.positionPage(d, c);
		}
		return a;
	},
	scroll : function(d) {
		this.findPage(d);
		var c = this.height;
		var a = this.getScrollBottom(d);
		for (var e = this.page, f = this.pageTop; (e < this.pageCount) && ((a < 0) || (f < a)); e++) {
			f += this.needPage(e, f);
		}
		this.firstVisibleRow = this.getFirstVisibleRow(this.page, this.pageTop, d);
		this.lastVisibleRow = this.getLastVisibleRow(e - 1, f, a);
		if (c != this.height) {
			this.repositionPages(e - 1);
		}
		return d + this.windowHeight <= this.height
		        ? d
		        : ((d = this.height - this.windowHeight) <= 0 ? 0 : d);
	},
	getScrollBottom : function(a) {
		return (this.windowHeight >= 0 ? a + this.windowHeight : -1);
	}
});
dojo.declare("unieap.grid.view.scroller", unieap.grid.view.scroller.base, {
	        renderRow : function(b, a) {},
	        removeRow : function(a) {},
	        getDefaultNodes : function() {
		        return this.pageNodes;
	        },
	        getDefaultPageNode : function(a) {
		        return this.getDefaultNodes()[a];
	        },
	        positionPageNode : function(b, a) {
		        b.style.top = a + "px";
	        },
	        getPageNodePosition : function(a) {
		        return a.offsetTop;
	        },
	        repositionPageNodes : function(g, d) {
		        var b = 0;
		        for (var a = 0; a < this.stack.length; a++) {
			        b = Math.max(this.stack[a], b);
		        }
		        var f = d[g];
		        var e = (f ? this.getPageNodePosition(f) + this.getPageHeight(g) : 0);
		        for (var c = g + 1; c <= b; c++) {
			        f = d[c];
			        if (f) {
				        if (this.getPageNodePosition(f) == e) { return; }
				        this.positionPage(c, e);
			        }
			        e += this.getPageHeight(c);
		        }
	        },
	        invalidatePageNode : function(c, b) {
		        var a = b[c];
		        if (a) {
			        delete b[c];
			        this.removePage(c, a);
			        unieap.grid.cleanNode(a);
			        a.innerHTML = "";
		        }
		        return a;
	        },
	        preparePageNode : function(d, a, c) {
		        var b = (a === null ? this.createPageNode() : this.invalidatePageNode(a, c));
		        b.pageIndex = d;
		        b.id = "page-" + d;
		        c[d] = b;
	        },
	        pageExists : function(a) {
		        return Boolean(this.getDefaultPageNode(a));
	        },
	        measurePage : function(a) {
		        if (a < this.pageCount - 1) {
			        return this.rowsPerPage * this.defaultRowHeight;
		        } else {
			        return (this.rowCount - this.rowsPerPage * (this.pageCount - 1))
			                * this.defaultRowHeight;
		        }
	        },
	        repositionPages : function(a) {
		        this.repositionPageNodes(a, this.getDefaultNodes());
	        },
	        getPageRow : function(a) {
		        return a * this.rowsPerPage;
	        },
	        getLastPageRow : function(a) {
		        return Math.min(this.rowCount, this.getPageRow(a + 1)) - 1;
	        },
	        getFirstVisibleRowNodes : function(a, f, e, h) {
		        var g = this.getPageRow(a);
		        var d = unieap.grid.divkids(h[a]);
		        for (var c = 0, b = d.length; c < b && f < e; c++, g++) {
			        f += this.getRowHeight(d[c]);
		        }
		        return (g ? g - 1 : g);
	        },
	        getFirstVisibleRow : function(a, c, b) {
		        if (!this.pageExists(a)) { return 0; }
		        return this.getFirstVisibleRowNodes(a, c, b, this.getDefaultNodes());
	        },
	        getLastVisibleRowNodes : function(a, e, c, g) {
		        var f = this.getLastPageRow(a);
		        var d = unieap.grid.divkids(g[a]);
		        for (var b = d.length - 1; b >= 0 && e > c; b--, f--) {
			        e -= this.getRowHeight(d[b]);
		        }
		        return f + 1;
	        },
	        getLastVisibleRow : function(a, c, b) {
		        if (!this.pageExists(a)) { return 0; }
		        return this.getLastVisibleRowNodes(a, c, b, this.getDefaultNodes());
	        },
	        findTopRowForNodes : function(f, g) {
		        var e = unieap.grid.divkids(g[this.page]);
		        for (var c = 0, a = e.length, b = this.pageTop, d; c < a; c++) {
			        d = this.getRowHeight(e[c]);
			        b += d;
			        if (b >= f) {
				        this.offset = d - (b - f);
				        return c + this.page * this.rowsPerPage;
			        }
		        }
		        return -1;
	        },
	        findScrollTopForNodes : function(g, h) {
		        var f = Math.floor(g / this.rowsPerPage);
		        var c = 0;
		        for (var b = 0; b < f; b++) {
			        c += this.getPageHeight(b);
		        }
		        this.pageTop = c;
		        this.needPage(f, this.pageTop);
		        if (h[f]) {
			        var e = unieap.grid.divkids(h[f]);
			        var d = g - this.rowsPerPage * f;
			        for (var b = 0, a = e.length; b < a && b < d; b++) {
				        c += this.getRowHeight(e[b]);
			        }
			        return c;
		        } else {
			        return -1;
		        }
	        },
	        findTopRow : function(a) {
		        return this.findTopRowForNodes(a, this.getDefaultNodes());
	        },
	        findScrollTop : function(a) {
		        return this.findScrollTopForNodes(a, this.getDefaultNodes());
	        }
        });
dojo.declare("unieap.grid.view.scroller.columns", unieap.grid.view.scroller, {
	setContentNodes : function(b) {
		this.contentNodes = b;
		this.colCount = (this.contentNodes ? this.contentNodes.length : 0);
		this.pageNodes = [];
		for (var a = 0; a < this.colCount; a++) {
			this.pageNodes[a] = [];
		}
	},
	init : function(a, d, c, b) {
		switch (arguments.length) {
			case 4 :
				this.defaultRowHeight = b;
			case 3 :
				this.rowsPerPage = c;
			case 2 :
				this.keepRows = d;
			case 1 :
				this.rowCount = a;
		}
		this.pageHeight = this.defaultRowHeight * this.rowsPerPage;
		this.pageCount = Math.ceil(this.rowCount / this.rowsPerPage);
		this.keepPages = Math.max(Math.ceil(this.keepRows / this.rowsPerPage), 2);
		this.invalidate();
	},
	updateRowCount : function(a) {
		this.invalidateNodes();
		this.rowCount = a;
		var c = this.pageCount;
		this.pageCount = Math.ceil(this.rowCount / this.rowsPerPage);
		if (this.pageCount < c) {
			for (var b = c - 1; b >= this.pageCount; b--) {
				this.height -= this.getPageHeight(b);
				delete this.pageHeights[b];
			}
		} else {
			if (this.pageCount > c) {
				this.height += this.pageHeight * (this.pageCount - c - 1)
				        + this.calcLastPageHeight();
			}
		}
		this.resize();
	},
	getDefaultNodes : function() {
		return this.pageNodes[this.pageNodes.length - 1] || [];
	},
	scroll : function(a) {
		if (this.colCount) { return unieap.grid.view.scroller.prototype.scroll.call(this, a); }
		return 0;
	},
	resize : function() {
		for (var a = 0; a < this.colCount; a++) {
			unieap.grid.setStyleHeightPx(this.contentNodes[a], this.height);
		}
	},
	positionPage : function(c, b) {
		for (var a = 0; a < this.colCount; a++) {
			this.positionPageNode(this.pageNodes[a][c], b);
		}
	},
	preparePage : function(d, b) {
		var c = (b ? this.popPage() : null);
		for (var a = 0; a < this.colCount; a++) {
			this.preparePageNode(d, c, this.pageNodes[a]);
		}
	},
	installPage : function(b) {
		for (var a = 0; a < this.colCount; a++) {
			this.contentNodes[a].appendChild(this.pageNodes[a][b]);
		}
	},
	destroyPage : function(b) {
		for (var a = 0; a < this.colCount; a++) {
			unieap.grid.removeNode(this.invalidatePageNode(b, this.pageNodes[a]));
		}
	},
	removePage : function(c) {
		for (var b = 0, a = c * this.rowsPerPage; b < this.rowsPerPage; b++, a++) {
			this.removeRow(a);
		}
	},
	renderPage : function(d) {
		var a = [];
		for (var c = 0; c < this.colCount; c++) {
			a[c] = this.pageNodes[c][d];
		}
		for (var c = 0, b = d * this.rowsPerPage; (c < this.rowsPerPage) && (b < this.rowCount); c++, b++) {
			this.renderRow(b, a);
		}
	},
	getRowHeight : function(a) {
		return this.defaultRowHeight;
	}
});
/* /unieap/ria3.3/unieap/grid/manager/RowManager.js */
dojo.provide("unieap.grid.manager.RowManager");
dojo.require("unieap.grid.view.builder");
dojo.declare("unieap.grid.manager.RowManager", null, {
	        ui : {
		        rowsPerPage : true,
		        keepRows : true,
		        defaultRowHeight : true,
		        defaultHeaderHeight : true,
		        getRowCount : true,
		        updateCurrnetRow : true,
		        updateCurrentRow : true,
		        getCurrentRowIndex : true,
		        mouseEffect : true,
		        events : {
			        onAfterRenderRow : true,
			        onUpdateCurrentRow : true
		        }
	        },
	        rowsPerPage : 25,
	        keepRows : 75,
	        defaultRowHeight : 23,
	        defaultHeaderHeight : 23,
	        mouseEffect : true,
	        overRow : -2,
	        currentRowIndex : -1,
	        managerRowBarWidth : null,
	        constructor : function(a) {
		        dojo.mixin(this, a);
	        },
	        forEachView : function(b) {
		        var a = this.grid.managers.get("ViewManager");
		        a.forEach(dojo.hitch(this, b));
	        },
	        renderRow : function(b, a) {
		        this._renderRow(b, a);
	        },
	        _renderRow : function(j, e) {
		        var c = this.grid.managers.get("ViewManager"),
			        f = this.grid.managers.get("LayoutManager");
		        rowNodes = [], rowData = this.grid.getBinding().getRowData();
		        for (var d = 0, b, g, a; (g = c.views[d]) && (b = e[d]); d++) {
			        a = this.createRowNode(j, g);
			        if (dojo.isIE && dojo.isIE < 7) {
				        b.appendChild(a);
				        g.renderRow(a, j);
			        } else {
				        g.renderRow(a, j);
				        b.appendChild(a);
			        }
			        this.styleRowNode(j, a, g);
			        var h = new unieap.ds.Row(this.grid.getBinding().getRowSet(), rowData[j]);
			        !g.isRowBar
			                && this.styleCustomRowNode(a, rowData[j] && h.getIdentifier("_style"),
			                        f);
			        rowNodes.push(a);
		        }
		        this.updateStyles(j);
		        this.onAfterRenderRow(j);
	        },
	        createRowNode : function(c, a) {
		        var b = document.createElement("div");
		        b.className = a.rowClassTag;
		        b.setAttribute(unieap.grid.rowIndexTag, c);
		        b[unieap.grid.rowIndexTag] = c;
		        a.rowNodes[c] = b;
		        return b;
	        },
	        rowRemoved : function(a) {
		        this.forEachView(function(b) {
			                var c = b.rowNodes[a];
			                this.onRowRemoved(c, a);
			                delete b.rowNodes[a];
		                });
	        },
	        setOverRow : function(c) {
		        var a = this.mouseEffect;
		        if (!a) { return; }
		        var b = this.overRow;
		        this.overRow = c;
		        if ((b != this.overRow) && (b >= 0)) {
			        this.updateStyles(b);
		        }
		        this.updateStyles(this.overRow);
	        },
	        isOver : function(a) {
		        return (this.overRow == a);
	        },
	        updateCurrnetRow : function(a) {
		        this.updateCurrentRow(a);
	        },
	        updateCurrentRow : function(a) {
		        if (a >= 0) {
			        var b = this.currentRowIndex;
			        this.currentRowIndex = a;
			        this.updateStyles(b);
			        this.updateStyles(this.currentRowIndex);
			        this.onUpdateCurrentRow(a);
		        }
	        },
	        updateStyles : function(a) {
		        this.forEachView(function(b) {
			                var c = b.getRowNode(a);
			                if (c) {
				                this.styleRowNode(a, c, b);
			                }
		                });
	        },
	        prepareStylingRow : function(c, a, b) {
		        return {
			        index : c,
			        node : a,
			        odd : Boolean(c & 1),
			        over : this.isOver(c),
			        customClasses : b.isRowBar ? "u-grid-rowbar" : "u-grid-row"
		        };
	        },
	        styleRowNode : function(e, a, c, b) {
		        var d = this.prepareStylingRow(e, a, c);
		        this.onStyleRow(d);
		        this.applyStyles(d);
	        },
	        styleCustomRowNode : function(c, a, g) {
		        if (!a) { return; }
		        var f = a.row && dojo.fromJson(a.row),
			        d = a.cell,
			        j = a.priority,
			        l = g.customStructure;
		        if (j == "row") {
			        if (d) {
				        for (var k in d) {
					        var h = k,
						        i = l ? dojo.indexOf(l.seq, h) : h;
					        if (i == -1) { return; }
					        var b = dojo.fromJson(d[k]);
					        var e = dojo.query("[idx=" + i + "]", c);
					        e && e[0] && dojo.style(e[0], b);
				        }
			        }
			        dojo.query(".u-grid-cell", c).forEach(function(m) {
				                dojo.style(m, f);
			                });
		        } else {
			        if (j == "cell") {
				        f && dojo.query(".u-grid-cell", c).forEach(function(m) {
					                dojo.style(m, f);
				                });
				        for (var k in d) {
					        var h = k,
						        i = l ? dojo.indexOf(l.seq, h) : h;
					        if (i == -1) { return; }
					        var b = dojo.fromJson(d[k]);
					        var e = dojo.query("[idx=" + i + "]", c);
					        e && e[0] && dojo.style(e[0], b);
				        }
			        }
		        }
	        },
	        applyStyles : function(inRow) {
		        with (inRow) {
			        node.className = customClasses;
			        var h = node.style.height;
			        node.style.height = h;
		        }
	        },
	        onStyleRow : function(inRow) {
		        with (inRow) {
			        customClasses += (odd ? " u-grid-row-odd" : "")
			                + (over ? " u-grid-row-over" : "")
			                + ((index == this.currentRowIndex) ? " u-grid-row-current" : "");
		        }
	        },
	        onRowRemoved : function(a, b) {},
	        getRowCount : function() {
		        return this.grid.getBinding().getRowCount();
	        },
	        setCurrentRow : function(a) {
		        if (isNaN(a)) { return; }
		        this.currentRowIndex = a;
		        this.grid.managers.get("ViewManager").refreshPage();
	        },
	        getCurrentRowIndex : function() {
		        return this.currentRowIndex;
	        },
	        hasLockedRow : function() {
		        var a = this.grid.getBinding().getLockedRowData();
		        if (!a || a.length == 0) {
			        return false;
		        } else {
			        return true;
		        }
	        },
	        getLockedRowHeight : function() {
		        if (this.hasLockedRow()) {
			        var a = this.grid.getBinding().getLockedRowData();
			        return a.length * this.defaultRowHeight;
		        } else {
			        return 0;
		        }
	        },
	        onAfterRenderRow : function(a) {},
	        onUpdateCurrentRow : function(a) {}
        });
/* /unieap/ria3.3/unieap/grid/manager/ViewManager.js */
dojo.provide("unieap.grid.manager.ViewManager");
dojo.require("unieap.grid.view.view");
dojo.require("unieap.grid.view.scroller");
dojo.declare("unieap.grid.manager.ViewManager", null, {
	ui : {
		autoRender : true,
		rowBar : true,
		rowNumber : true,
		orderType : true,
		hasRowBar : true,
		setAutoRender : true,
		setHeaderName : true,
		getHeaderName : true,
		setRowStyles : true,
		setCellStyles : true,
		getItemText : true,
		refresh : true,
		refreshRow : true,
		scrollToRow : true,
		getCellNode : true,
		refreshCell : true,
		refreshPage : true,
		events : {
			onBeforeRender : true,
			onAfterRender : true,
			onCellMouseOver : true,
			onCellMouseOut : true,
			onCellMousedown : true,
			onCellMouseup : true,
			onCellClick : true,
			onCellDblClick : true,
			onRowMouseOver : true,
			onRowMouseOut : true,
			onRowMousedown : true,
			onRowMouseup : true,
			onRowClick : true,
			onRowDblClick : true,
			onHeaderMouseOver : true,
			onHeaderMouseOut : true,
			onHeaderCellMouseOver : true,
			onHeaderCellMouseOut : true,
			onHeaderCellClick : true,
			onHeaderClick : true,
			onHeaderRender : true,
			onHeaderCellMousedown : true,
			onHeaderMousedown : true
		}
	},
	autoRender : true,
	rowBar : false,
	rowNumber : false,
	markDirty : true,
	orderType : "client",
	enableTooltip : false,
	views : [],
	fastScroll : true,
	delayScroll : false,
	scrollRedrawThreshold : (dojo.isIE ? 100 : 50),
	constructor : function(a) {
		dojo.mixin(this, a);
		this.createScroller();
	},
	structureChanged : function() {
		this.destroyViews();
		this.heightRelation = [];
		this.prerenderList = [];
		this.postrenderList = [];
		this.preaddViewList = [];
		this.buildViews();
		this.render();
	},
	createScroller : function() {
		var a = this.grid.managers.get("RowManager");
		this.scroller = new unieap.grid.view.scroller.columns();
		this.scroller.renderRow = dojo.hitch(a, "renderRow");
		this.scroller.removeRow = dojo.hitch(a, "rowRemoved");
	},
	destroyViews : function() {
		this.scroller.invalidateNodes();
		for (var b = 0, a; a = this.views[b]; b++) {
			a.destroy();
		}
		this.views = [];
	},
	getContentNodes : function() {
		var b = [];
		for (var c = 0, a; a = this.views[c]; c++) {
			b.push(a.contentNode);
		}
		return b;
	},
	createView : function(inClass) {
		var c = eval(inClass);
		var view = new c({
			        grid : this.grid
		        });
		if (this.preaddViewList.length > 0) {
			for (var i = 0, p; p = this.preaddViewList[i]; i++) {
				p.apply(this, [view]);
			}
		}
		this.addView(view);
		unieap.grid.addObserver(view, this);
		return view;
	},
	addView : function(a) {
		a.idx = this.views.length;
		this.views.push(a);
		this.grid.viewsNode.appendChild(a.domNode);
		this.grid.headerNode.appendChild(a.getHeaderNode());
	},
	buildViews : function() {
		var b = [],
			d = this.grid.managers.get("LayoutManager");
		for (var c = 0, e; (e = d.structure[c]); c++) {
			var a = this.createView(e.type || "unieap.grid.View");
			a.isRowBar && (a.rowNumber = this.rowNumber);
			a.setStructure(e);
			b.push(a.contentNode);
		}
		this.scroller.setContentNodes(b);
	},
	onEach : function(c, d) {
		d = d || [];
		for (var b = 0, a; a = this.views[b]; b++) {
			if (c in a) {
				a[c].apply(a, d);
			}
		}
	},
	forEach : function(a) {
		for (var c = 0, b; b = this.views[c]; c++) {
			a(b, c);
		}
	},
	resize : function() {
		this.resizeHeight();
		this.finishScrollJob();
	},
	resizeHeight : function(d) {
		var m = this.grid.managers.get("RowManager"),
			c = this.grid;
		var k = 1,
			j = 1;
		this.forEach(dojo.hitch(function(n, h) {
			        if (n.isRowBar) { return; }
			        k = Math.max(n.contentStructure.rows.length, k);
			        j = Math.max(n.structure.rows.length, j);
		        }));
		var g = m.defaultHeaderHeight * j,
			l = m.defaultRowHeight * k,
			i = typeof(d) == "number" ? d : (c.domNode.clientHeight - 3);
		var b = 0;
		if (this.grid.footNode) {
			b = this.grid.getFoot().getHeight();
		}
		var f = 0;
		if (this.grid.toolBar) {
			f = this.grid.getToolBar().getHeight() + 1;
		}
		var a = this._reviseWindowHeight(i - (g + b + f));
		this.forEach(function(o, n) {
			        o.prerender(l, g);
			        var h = a;
			        if (h < 18) {
				        h = 18;
			        }
			        if (isNaN(h)) {
				        dojo.style(o.domNode, "height", "auto");
			        } else {
				        dojo.style(o.domNode, "height", h + "px");
			        }
			        if (dojo.isWebKit && o.contentboxNode) {
				        dojo.style(o.contentboxNode, "height", h + "px");
			        }
		        });
		var e = 0;
		this.forEach(dojo.hitch(function(n, h) {
			        var o = n.scrollboxNode;
			        if (o.clientHeight < o.offsetHeight) {
				        e = (o.offsetHeight - o.clientHeight);
			        }
		        }));
		this.scroller.windowHeight = a - e > 0 ? a - e : 1;
		this.adjustScrollBar();
		return l;
	},
	_reviseWindowHeight : function(c) {
		var a = c;
		if (this.heightRelation.length > 0) {
			for (var b = 0, d; d = this.heightRelation[b]; b++) {
				a = d.reviseWindowHeight(a);
			}
		}
		return a;
	},
	prerender : function() {
		this.onBeforeRender();
		if (this.prerenderList.length > 0) {
			for (var a = 0, b; b = this.prerenderList[a]; a++) {
				b.apply(this);
			}
		}
	},
	_prerender : function() {
		this.prerender();
		var b = this.grid.managers.get("RowManager"),
			a = String(this.grid.height);
		a = (a.indexOf("%") < 0 ? parseInt(a, 10) : (this.grid.domNode.clientHeight || 200)) - 3;
		this.scroller.init(0, b.keepRows, b.rowsPerPage, this.resizeHeight(a));
	},
	_postrender : function() {
		if (dojo.isIE == 6) {
			for (var c = 0, b = this.views, a = b.length; c < a; c++) {
				if (b[c].noscroll) {
					dojo.style(b[c].scrollboxNode, "position", "relative");
				}
			}
		}
		this.postrender();
	},
	postrender : function() {
		this.onAfterRender();
		if (this.postrenderList.length > 0) {
			for (var a = 0, b; b = this.postrenderList[a]; a++) {
				b.apply(this);
			}
		}
	},
	render : function(e) {
		if (!this.grid.domNode) { return; }
		this._prerender();
		if (!this.autoRender) { return; }
		this.scroller.init(this.grid.managers.get("RowManager").getRowCount());
		var b = this.grid.managers.get("LayoutManager"),
			d = [];
		for (var a = 0, f; f = b.cells[a]; a++) {
			if (f.decoder && f.decoder.store) {
				unieap.getDataStore(f.decoder.store, dataCenter, true) || (d.push(f.decoder.store));
			}
		}
		if (d.length == 0) {
			this.setScrollTop(e || 0);
		} else {
			unieap.Action.getMultiCodeList(d, dojo.hitch(this, function() {
				                this.setScrollTop(e || 0);
			                }));
		}
		this.renderLockedRow();
		this._postrender();
	},
	_mouseOnView : function(b, a) {},
	_clickOnView : function(b, a) {},
	doscroll : function(b) {
		var a = this.scrollTop + b;
		this.setScrollTop(a);
	},
	scrollTo : function(a) {
		if (!this.fastScroll) {
			this.setScrollTop(a);
			return;
		}
		var b = Math.abs(this.lastScrollTop - a);
		this.lastScrollTop = a;
		this.scrollTop = a;
		if (b > this.scrollRedrawThreshold || this.delayScroll) {
			this.delayScroll = true;
			unieap.grid.jobs.job("unieap-scroll", 50, dojo.hitch(this, "finishScrollJob"));
		} else {
			this.finishScrollJob();
		}
	},
	finishScrollJob : function() {
		this.delayScroll = false;
		this.setScrollTop(this.scrollTop);
	},
	setScrollTop : function(d) {
		var c = this.scroller.scroll(d);
		this.scrollTop = c;
		for (var b = 0, a; a = this.views[b]; b++) {
			a.setScrollTop(c);
		}
	},
	getCurrentRows : function() {
		if (this.views[0]) {
			return this.views[0].getCurrentRows();
		} else {
			return [];
		}
	},
	getViewByCell : function(c) {
		for (var b = 0, a; a = this.views[b]; b++) {
			if (a.hasCell(c)) { return a; }
		}
		return null;
	},
	renderLockedRow : function(a) {
		if (a) {
			var c = [];
			this.forEach(function(d) {
				        if (d.lockedNode) {
					        c.push(dojo.query(".u-grid-row", d.lockedNode).length);
				        }
				        d.destroyLockedRow();
			        });
			if (c.length > 0) {
				c = Math.max.apply(this, c) * this.scroller.defaultRowHeight;
			} else {
				c = 0;
			}
			this.scroller.updateContentHeight(-c);
		}
		var b = this.grid.getBinding().getLockedRowData();
		if (!b || b.length == 0) { return; }
		this.forEach(function(d) {
			        d.renderLockedRow(b);
		        });
		this.scroller.updateContentHeight(this.getLockedRowHeight(b));
	},
	getLockedRowHeight : function(a) {
		var b = a || this.getLockedData();
		return b.length * this.scroller.defaultRowHeight;
	},
	_doHeaderClick : function(a) {
		if (a.cell) {
			if (this.canSort(a.cell)) {
				this.grid.getBinding().sort(a.cell, -a.cell.asc);
			}
			this.onHeaderCellClick(a.cell);
		}
		this.onHeaderClick(a);
	},
	_doHeaderMousedown : function(a) {
		if (a.cell) {
			this.onHeaderCellMousedown(a.cell);
		}
		this.onHeaderMousedown(a);
	},
	canSort : function(a) {
		return this.orderType != "none" && a.canSort != false && a.isMulTitle != true;
	},
	onMouseOverRow : function(b) {
		var a = this.grid.managers.get("RowManager");
		if (!a.isOver(b.rowIndex)) {
			a.setOverRow(b.rowIndex);
			b.rowIndex == -1 ? this.onHeaderMouseOver(b) : this.onRowMouseOver(b);
		}
	},
	onMouseOutRow : function(b) {
		var a = this.grid.managers.get("RowManager");
		if (a.isOver(-1)) {
			this.onHeaderMouseOut(b);
		} else {
			if (!a.isOver(-2)) {
				this.onRowMouseOut(b);
			}
		}
		this.enableTooltip && this._disableTooltip(b);
	},
	onMouseOver : function(a) {
		if (a.rowIndex == null || !a.cell) { return; }
		if (a.rowIndex >= 0) {
			this.enableTooltip && this._enableTooltip(a);
			this.onCellMouseOver(a.cell, a.rowIndex);
		}
	},
	onMouseOut : function(b) {
		if (b.rowIndex == null || !b.cell) { return; }
		if (b.rowIndex >= 0) {
			this.enableTooltip && this._disableTooltip(b);
			this.onCellMouseOut(b.cell, b.rowIndex);
		}
		var a = this.grid.managers.get("RowManager");
		a.setOverRow(-1);
	},
	_enableTooltip : function(a) {
		this._toolTipTimer = setTimeout(dojo.hitch(this, function() {
			var c = this.grid.managers.managers.EditManager;
			if (c) {
				var m = c.getFocusCell(),
					e = c.isEditing(),
					f = c.currentRowIndex,
					j = c.getType(),
					g = a.cell.getEditor();
				if (e) {
					if (j == "rowEdit") {
						if (g && a.rowIndex == f) { return; }
					} else {
						if (j == "cellEdit") {
							if (m == a.cell && a.rowIndex == f) { return; }
						}
					}
				}
			}
			if (!this._globalSpan && !dojo.byId("_globalSpan_")) {
				this._globalSpan = dojo.create("span", {
					        style : {
						        visibility : "hidden",
						        position : "absolute"
					        },
					        id : "_globalSpan_"
				        }, dojo.body(), "first");
			}
			this._globalSpan = dojo.byId("_globalSpan_");
			if (dojo.isIE == 6) {
				dojo.style(this._globalSpan, "display", "");
			}
			var d,
				n = "12px",
				b = 0;
			try {
				d = a.cellNode;
				n = dojo.style(d, "fontSize");
			}
			catch (h) {}
			this._globalSpan.style.fontSize = n;
			if (!d || !d.childNodes[0]) { return; }
			var k,
				i = k = d.childNodes[0].childNodes[0].innerHTML;
			k = '<DIV class="u-grid-text">' + k + "</DIV>";
			this._globalSpan.innerHTML = k;
			b = parseInt(dojo.getComputedStyle(d.childNodes[0]).paddingRight);
			var l = dojo.contentBox(this._globalSpan).w - b > dojo.contentBox(d).w;
			dojo.isIE == 6 && dojo.style(this._globalSpan, "display", "none");
			if (l) {
				i = "<DIV style='padding: 0 5px 0 5px;vertical-align: middle;word-wrap: break-word;overflow: hidden;height:100%;'>"
				        + i + "</DIV>";
				unieap.showTooltip(i, d);
			} else {}
		}), 500);
	},
	_disableTooltip : function(a) {
		clearTimeout(this._toolTipTimer);
		this._globalSpan && unieap.hideTooltip(a.cellNode);
	},
	destroy : function() {
		this.destroyViews();
	},
	onRowRefresh : function(a) {},
	onCellRefresh : function(b, a) {},
	_onMousedown : function(b) {
		if (b.cell) {
			this.onCellMousedown(b.cell, b.rowIndex);
		}
		var a = this.grid.managers.get("RowManager");
		if (isNaN(b.rowIndex)) { return; }
		this.onRowMousedown(b);
		a.updateCurrnetRow(Number(b.rowIndex));
	},
	_onMouseup : function(b) {
		if (b.cell) {
			this.onCellMouseup(b.cell, b.rowIndex);
		}
		var a = this.grid.managers.get("RowManager");
		if (isNaN(b.rowIndex)) { return; }
		this.onRowMouseup(b);
	},
	_doClick : function(b) {
		if (b.cell) {
			this.onCellClick(b.cell, b.rowIndex);
		}
		var a = this.grid.managers.get("RowManager");
		if (isNaN(b.rowIndex)) { return; }
		this.onRowClick(b);
		a.updateCurrnetRow(Number(b.rowIndex));
	},
	_doDbClick : function(a) {
		if (a.cell) {
			this.onCellDblClick(a.cell, a.rowIndex);
		}
		if (isNaN(a.rowIndex)) { return; }
		this.onRowDblClick(a);
	},
	_needPage : function(e) {
		var d = Math.floor(e / this.scroller.rowsPerPage);
		var c = 0;
		for (var b = 0; b < d; b++) {
			c += this.scroller.getPageHeight(b);
		}
		var a = c;
		this.scroller.needPage(d, a);
	},
	_doContextMenu : function(b) {
		if (isNaN(b.rowIndex)) { return; }
		this.onContextMenu(b.cell, b.cellNode, b.rowIndex);
		if (dojo.isIE) {
			b.cellNode.oncontextmenu && b.cellNode.fireEvent("oncontextmenu");
		} else {
			var a = document.createEvent("HTMLEvents");
			a.initEvent("contextmenu", false, false);
			b.cellNode.dispatchEvent(a);
		}
	},
	hasRowBar : function() {
		var a = this.grid.managers.SelectionManager;
		if (a) {
			return this.rowBar || this.rowNumber || a.getSelectType();
		} else {
			return this.rowBar || this.rowNumber;
		}
	},
	setAutoRender : function(a) {
		this.autoRender = a;
		this.refresh();
	},
	setHeaderName : function(b, d) {
		var a = this.grid.managers.get("LayoutManager").getCell(b);
		if (!a) { return; }
		var e = dojo.isString(d) ? d : a.name;
		var c = dojo.query("TH", this.getViewByCell(a).headerNode)[a.layoutIndex];
		if (dojo.isIE) {
			c.innerText = e;
		} else {
			c.textContent = e;
		}
		a.label = e;
	},
	getHeaderName : function(b) {
		var a = this.grid.managers.get("LayoutManager").getCell(b);
		return a ? a.label : null;
	},
	getCellNode : function(c, g) {
		try {
			var a = this.grid.managers.get("LayoutManager").getCell(c);
			var b = this.getViewByCell(a);
			var d = b ? b.getCellNode(g, a.index) : null;
			return d;
		}
		catch (f) {}
	},
	getItemText : function(a, c, d) {
		if (a.declaredClass != "unieap.grid.Cell") {
			a = this.grid.managers.get("LayoutManager").getCell(a);
		}
		if (!a) { return null; }
		var b = a.get(c);
		d != true && (b = a._format(b, c));
		return b;
	},
	setItemText : function(d, f, e) {
		if (typeof(f) != "number") { return; }
		var b = d,
			c = this.grid;
		if (typeof(d) == "number") {
			var a = c.getManager("LayoutManager").getCell(d);
			a && (b = a.name);
		}
		if (!b) { return; }
		c.getBinding().getRowSet().setItemValue(f, b, e);
	},
	setCellStyles : function(o, j, m) {
		if (typeof(o) != "number") { return; }
		var d = [],
			g = this.grid.getBinding().getRowData(),
			k = this.grid.managers.get("LayoutManager").getCell(j);
		if (o > g.length || !k) { return; }
		for (var f = 0, h; h = this.views[f]; f++) {
			if (h.isRowBar) {
				continue;
			}
			var b = h.getRowNode(o);
			b && d.push(b);
		}
		if (d.length == 0) { return; }
		var a, e;
		for (var f = 0, c; c = d[f]; f++) {
			e = dojo.query("[idx=" + k.index + "]", c)[0];
			if (e) {
				for (a in m) {
					dojo.style(e, a, m[a]);
				}
				dojo.isIE < 8 && (e.style.cssText = e.style.cssText);
			}
		}
		var n = new unieap.ds.Row(this.grid.getBinding().getRowSet(), g[o]);
		var l = n.getIdentifier("_style");
		!l && (l = {});
		!l.cell && (l.cell = {});
		l.cell[this._getCellIndex(k)] = dojo.toJson(m);
		l.cell["priority"] = "cell";
		n.setIdentifier("_style", l);
	},
	_getCellIndex : function(a) {
		var g = this.grid.managers.get("LayoutManager"),
			c = g.customStructure,
			e = g.cells, d;
		if (!c) { return a.index; }
		for (var f = 0, b = e.length; f < b; f++) {
			if (e[f] == a) {
				d = f;
				break;
			}
		}
		return c.seq[d];
	},
	setRowStyles : function(h, g) {
		if (typeof(h) != "number") { return; }
		var b = [],
			d = this.grid.getBinding().getRowData();
		if (h > d.length) { return; }
		for (var c = 0, e; e = this.views[c]; c++) {
			if (e.isRowBar) {
				continue;
			}
			var a = e.getRowNode(h);
			a && b.push(a);
		}
		var j = new unieap.ds.Row(this.grid.getBinding().getRowSet(), d[h]);
		var f = j.getIdentifier("_style");
		!f && (f = {});
		f.priority = "row";
		f.row = dojo.toJson(g);
		j.setIdentifier("_style", f);
		if (b.length == 0) { return; }
		dojo.forEach(b, function(i) {
			        dojo.query(".u-grid-cell", i).forEach(function(k) {
				                dojo.style(k, g);
				                dojo.isIE < 8 && (k.style.cssText = k.style.cssText);
			                });
		        });
	},
	refresh : function() {
		this.onBeforeRefresh();
		var e = this.grid.getBinding();
		var c = e.getRowData();
		if (c != null && c.length > 0) {
			for (var b = 0, a = c.length; b < a; b++) {
				var d = new unieap.ds.Row(e.getRowSet(), c[b]);
				d.removeIdentifier("_style");
			}
		}
		this.render();
	},
	refreshRow : function(a) {
		this.forEach(function(c, b) {
			        c.renderRow(c.getRowNode(a), a);
		        });
		this.onRowRefresh(a);
	},
	refreshCell : function(h, c) {
		var b = this.getViewByCell(c);
		var d = b ? b.getCellNode(h, c.index) : null;
		if (d == null) { return; }
		if (dojo.query("[widgetId]", d).length > 0) { return; }
		var g = this.grid.getBinding().getRowData(),
			f = c.format(h),
			e = "", a;
		if (this.markDirty) {
			if (c.name && g && g[h] && (a = g[h]["_o"]) && c.name in a) {
				e = '<div class="u-grid-value-changed"></div>';
			}
		}
		dojo.empty(d);
		d.appendChild(dojo._toDom(f));
		e && (d.childNodes[0].appendChild(dojo._toDom(e)));
		this.onCellRefresh(h, c);
	},
	refreshPage : function() {
		this.scroller.init(this.grid.managers.get("RowManager").getRowCount());
		var e = this.grid.getBinding();
		var c = e.getRowData();
		if (c != null && c.length > 0) {
			for (var b = 0, a = c.length; b < a; b++) {
				var d = new unieap.ds.Row(e.getRowSet(), c[b]);
				d.removeIdentifier("_style");
			}
		}
		this.renderLockedRow();
		this.setScrollTop(this.scrollTop);
	},
	scrollToRow : function(a) {
		if (isNaN(a) || a < 0) { return; }
		this._needPage(a);
		this.setScrollTop(this.scroller.findScrollTop(a) + 1);
	},
	visualizeRow : function(g) {
		var e = this.grid.managers.get("RowManager");
		var f = this.scroller.findScrollTop(g + 1);
		if (f == -1) {
			this.doscroll(e.defaultRowHeight);
			return;
		}
		var a = e.getLockedRowHeight();
		var d = this.scroller.getScrollBottom(this.scrollTop);
		var c = d - a - f;
		if (c < 1 || f < this.scrollTop) {
			this.doscroll(-c);
			return;
		}
		var b = this.scroller.findScrollTop(g);
		if (b < this.scrollTop && f > this.scrollTop) {
			this.doscroll(b - this.scrollTop);
		}
	},
	adjustScrollBar : function() {
		setTimeout(dojo.hitch(this, function() {
			        if (this.grid.domNode.offsetHeight == 0) { return; }
			        var c = this.views[this.views.length - 1];
			        if (c) {
				        var b = c.getScrollBarPort();
				        for (var d = 0, a; a = this.views[d]; d++) {
					        a.adjustScrollBar(b);
				        }
			        }
		        }));
	},
	onBeforeRefresh : function() {},
	onBeforeRender : function() {},
	onAfterRender : function() {},
	onCellMouseOver : function(a, b) {},
	onCellMouseOut : function(a, b) {},
	onCellMousedown : function(a, b) {},
	onCellMouseup : function(a, b) {},
	onCellClick : function(a, b) {},
	onCellDblClick : function(a, b) {},
	onHeaderMouseOver : function(a) {},
	onHeaderMouseOut : function(a) {},
	onRowMouseOver : function(a) {},
	onRowMouseOut : function(a) {},
	onRowMousedown : function(a) {},
	onRowMouseup : function(a) {},
	onRowClick : function(a) {},
	onRowDblClick : function(a) {},
	onHeaderCellClick : function(a) {},
	onHeaderClick : function(a) {},
	onHeaderCellMousedown : function(a) {},
	onHeaderMousedown : function(a) {},
	onHeaderRender : function(b, a) {},
	onContextMenu : function(a, b, c) {}
});

/* /unieap/ria3.3/unieap/grid/Grid.js */
dojo.provide("unieap.grid.Grid");
dojo.require("dijit._Templated");
dojo.require("unieap.grid._grid.lib");
dojo.require("unieap.grid._grid.binding");
dojo.require("unieap.grid.manager.managers");
dojo.require("unieap.ds");
dojo.require("unieap.layout.Container");
dojo.declare("unieap.grid.Grid", [unieap.layout.Container, dijit._Templated], {
	UserInterfaces : dojo.mixin({
		        height : "string",
		        trigger : "boolean",
		        layout : "object",
		        views : "object",
		        rows : "object",
		        selection : "object",
		        filter : "object",
		        menu : "object",
		        edit : "object",
		        group : "object",
		        tree : "object",
		        binding : "object",
		        lockedRow : "object",
		        detail : "object",
		        unitedCell : "object"
	        }, unieap.layout.Container.prototype.UserInterfaces),
	height : "250px",
	trigger : true,
	layout : null,
	views : null,
	rows : null,
	selection : null,
	filter : null,
	menu : null,
	edit : null,
	group : null,
	tree : null,
	binding : null,
	lockedRow : null,
	detail : null,
	unitedCell : null,
	templateString : '<div class="u-grid"><table class="u-grid-master-header" cellpadding="0" cellspacing="0" dojoAttachPoint="header"><tbody><tr dojoAttachPoint="headerNode"></tr></tbody></table><table class="u-grid-master-views" cellpadding="0" cellspacing="0" dojoAttachPoint="view"><tbody><tr dojoAttachPoint="viewsNode"></tr></tbody></table></div>',
	postMixInProperties : function() {
		var a;
		if (this.layout && this.layout.structure) {
			return;
		} else {
			if (typeof(a = this.srcNodeRef.innerHTML) == "undefined" || dojo.trim(a) == "") { return; }
		}
		this._preSrcNodeRef();
		a = a.replace(/<header/gi, "<div tagName=header").replace(/<fixed/gi, "<div tagName=fixed")
		        .replace(/<row/gi, "<div tagName=row").replace(/<cell/gi, "<div tagName=cell")
		        .replace(/<foot/gi, "<div tagName=foot").replace(/<toolbar/gi,
		                "<div tagName='toolbar'").replace(
		                /(<\/header>)|(<\/fixed>)|(<\/row>)|(<\/cell>)|(<\/foot>)|(<\/toolbar)/gi,
		                "</div>");
		this.srcNodeRef.innerHTML = a;
	},
	postCreate : function() {
		this.initContainer();
		this._createManagers();
		unieap.grid.funnelEvents(this.domNode, this, "doKeyEvent", unieap.grid.keyEvents);
		this.domNode.onmouseover = function() {
			if (unieap.attachEvent) {
				dojo.forEach(dijit.findWidgets(this), function(a) {
					        unieap.attachEvent(a);
				        });
			}
			this.onmouseover = null;
		};
	},
	_createManagers : function() {
		this.managers = new unieap.grid.managers(this);
		this.managers.init();
		var a = this.managers.get("LayoutManager");
		unieap.grid.addObserver(a, this.managers.get("ViewManager"));
		a.setStructure(a.structure);
	},
	resizeContainer : function() {
		if (!this.domNode || this.domNode.offsetHeight == 0) { return; }
		var a = this.managers.get("ViewManager");
		this.onBeforeResize();
		if (this.width.indexOf("%") > 0 || this.height.indexOf("%") > 0) {
			a.resize();
		} else {
			a.adjustScrollBar();
		}
	},
	onBeforeResize : function() {},
	getManager : function(a) {
		return this.managers.getManager(a);
	},
	getViewManager : function() {
		return this.getManager("ViewManager");
	},
	getLayoutManager : function() {
		return this.getManager("LayoutManager");
	},
	getRowManager : function() {
		return this.getManager("RowManager");
	},
	getCell : function(a) {
		return this.getManager("LayoutManager").getCell(a);
	},
	setDataStore : function(a) {
		this.getBinding().setDataStore(a);
	},
	getToolBar : function() {
		if (this.toolBar && this.toolBar.declaredClass == "unieap.grid.view.toolbar") {
			return this.toolBar;
		} else {
			return null;
		}
	},
	getFoot : function() {
		if (this.foot && this.foot.declaredClass == "unieap.grid.view.foot") {
			return this.foot;
		} else {
			return null;
		}
	},
	getGridData : function() {
		var g = {},
			j = this, f;
		var d = j.managers.get("LayoutManager");
		g.store = j.getBinding().store;
		g.layout = d.getLayoutInfo();
		f = j.getBinding().getLockedRowData();
		if (f && f.length > 0) {
			g.lockedData = f;
		}
		var h = j.getFoot();
		if (h) {
			g.footer = h.getInnerText();
		}
		var c = this.managers.getPlus(this, "getGridData");
		if (c && c.length > 0) {
			for (var b = 0; b < c.length; b++) {
				var e = c[b], a;
				if (typeof e == "function") {
					a = e.call();
					dojo.mixin(g, a);
				}
			}
		}
		return g;
	},
	getBinding : function() {
		this.binding = new unieap.grid.Binding(this.binding || {}, this);
		this.getBinding = function() {
			return this.binding;
		};
		return this.binding;
	},
	validate : function(c, a) {
		var b = this.getBinding();
		if (b) { return b.validate.apply(b, arguments); }
		return true;
	},
	destroy : function() {
		this.managers.destroy && this.managers.destroy();
		this.binding && this.binding.destroy && this.binding.destroy();
		this.foot && this.foot.destroy && this.foot.destroy();
		this.toolBar && this.toolBar.destroy && this.toolBar.destroy();
		this.inherited(arguments);
	},
	getSortInfo : function() {
		return this.sortInfo || [];
	},
	setSortInfo : function(b) {
		this.sortInfo = this.sortInfo || [];
		for (var a = 0; a < this.sortInfo.length; a++) {
			if (this.sortInfo[a] == b) {
				this.sortInfo.splice(a, 1);
				break;
			}
		}
		this.sortInfo.unshift(b);
		this.sortInfo.length > 2 && this.sortInfo.pop();
	},
	refresh : function() {
		this.managers.get("ViewManager").structureChanged();
	},
	_preSrcNodeRef : function() {
		if (this.srcNodeRef) {
			var f = this.srcNodeRef.getElementsByTagName("toolbar");
			var c = this.srcNodeRef.getElementsByTagName("foot");
			if (f && f[0]) {
				if (!dojo.isIE) {
					this.toolbarSrcNode = f[0];
				} else {
					this.toolbarSrcNode = dojo.create("div", {});
					this.toolbarSrcNode.appendChild(f[0]);
				}
			} else {
				var g = dojo.query(" > [tagName='toolbar']", this.srcNodeRef);
				if (g && g[0]) {
					this.toolbarSrcNode = dojo.create("div", {});
					while (g[0].hasChildNodes()) {
						this.toolbarSrcNode.appendChild(g[0].firstChild);
					}
				}
			}
			if (c && c[0]) {
				if (!dojo.isIE) {
					this.footSrcNode = c[0];
				} else {
					this.footSrcNode = dojo.create("div", {});
					var e = c[0].parentNode.childNodes;
					var d, a;
					for (var b = 0; b < e.length; b++) {
						if (e[b].tagName == "FOOT") {
							d = true;
							continue;
						}
						if (d) {
							if (e[b].tagName == "/FOOT") {
								break;
							}
							this.footSrcNode.appendChild(e[b]);
							b--;
						}
					}
				}
			}
		}
	},
	doKeyEvent : function(a) {
		a.dispatch = "do" + a.type;
		this.onKeyEvent(a);
	},
	onKeyEvent : function(a) {
		this.dispatchKeyEvent(a);
	},
	dispatchKeyEvent : function(a) {
		this._dispatch(a.dispatch, a);
	},
	onContentEvent : function(a) {
		this.dispatchContentEvent(a);
	},
	onHeaderEvent : function(a) {
		this.dispatchHeaderEvent(a);
	},
	dispatchContentEvent : function(a) {
		a.sourceView.dispatchContentEvent(a) || this._dispatch(a.dispatch, a);
	},
	dispatchHeaderEvent : function(a) {
		a.sourceView.dispatchHeaderEvent(a) || this._dispatch("doheader" + a.type, a);
	},
	_dispatch : function(a, b) {
		if (a in this) { return this[a](b); }
	},
	domousedown : function(a) {
		this.managers.get("ViewManager")._onMousedown(a);
	},
	domouseup : function(a) {
		this.managers.get("ViewManager")._onMouseup(a);
	},
	doclick : function(a) {
		this.managers.get("ViewManager")._doClick(a);
	},
	dodblclick : function(a) {
		this.managers.get("ViewManager")._doDbClick(a);
	},
	docontextmenu : function(b) {
		this.managers.get("ViewManager")._doContextMenu(b);
		if (dojo.isIE) {
			this.domNode.fireEvent("oncontextmenu");
		} else {
			var a = document.createEvent("HTMLEvents");
			a.initEvent("contextmenu", false, false);
			this.domNode.dispatchEvent(a);
		}
		dojo.stopEvent(b);
	},
	doheaderclick : function(a) {
		this.managers.get("ViewManager")._doHeaderClick(a);
	},
	doheadermousedown : function(a) {
		this.managers.get("ViewManager")._doHeaderMousedown(a);
	},
	onItemChanged : function(d, c) {
		var a = this.managers.get("LayoutManager").getCell(c);
		var b = this.managers.get("ViewManager");
		b.refreshCell(d, a);
		b.renderLockedRow(true);
	},
	onRowSetChanged : function() {
		this.managers.get("ViewManager").refreshPage();
		this.resizeContainer();
	},
	onStoreChanged : function() {
		this.binding.updateRowData();
		this.managers.get("ViewManager").refresh();
	},
	onRowSetFilter : function() {
		this.managers.get("ViewManager").refresh();
	},
	onStatisticChanged : function() {
		var a = this.managers.get("ViewManager");
		a.renderLockedRow();
	},
	onSorted : function() {
		var a = this.managers.get("ViewManager");
		dojo.forEach(a.views, function(b) {
			        !b.isRowBar && b.renderHeader();
		        });
		a.refreshPage();
	},
	publish : function(b, a) {
		var c = this._topics || (this._topics = []);
		dojo.forEach(c[b] || [], function(d) {
			        d.apply(null, a || []);
		        });
	},
	subscribe : function(a, b, g) {
		a = a.split(".");
		var f = a[1] || "";
		a = a[0];
		var e = this._topics || (this._topics = []);
		var d = e[a] || (e[a] = []);
		function c() {
			(dojo.isFunction(g) && g || b[g]).apply(b, arguments);
		}
		c.id = f;
		d.push(c);
	},
	unsubscribe : function(a) {
		a = a.split(".");
		var f = a[1] || "";
		a = a[0];
		var e = this._topics || (this.grid._topics = []);
		if (null == f) {
			delete e[a];
			return;
		}
		var d = e[a] || [];
		for (var b = d.length - 1, c; c = d[b]; b--) {
			if (c.id == f) {
				d.splice(b, 1);
			}
		}
	}
});
/* /unieap/ria3.3/unieap/dialog/DialogUtil.js */
dojo.provide("unieap.dialog.DialogUtil");
(function() {
	if (typeof this["DialogUtil"] == "undefined") {
		this.DialogUtil = {};
	}
	DialogUtil = {
		dialogs : [],
		hndlDlgs : [],
		showDialog : function(c, b, e) {
			c = this._config_show_ex(c, b);
			var d = null,
				a = unieap.getTopWin();
			if (a.DialogUtil && c.inner == null
			        && a.document.getElementsByTagName("frameset").length == 0) {
				d = a.DialogUtil.createDialog(c, e);
			} else {
				d = this.createDialog(c, e);
			}
			if (b) {
				d.show(b);
			} else {
				d.show();
			}
			return d;
		},
		_config_show_ex : function(b, a) {
			return b;
		},
		createDialog : function(c, f) {
			c = this._config_create_ex(c);
			var e = null,
				b = unieap.getTopWin();
			if (b.DialogUtil && c.inner == null
			        && b.document.getElementsByTagName("frameset").length == 0) {
				e = b;
			} else {
				e = window;
			}
			dojo.require("unieap.dialog.Dialog");
			var d = new e.unieap.dialog.Dialog(c);
			if (f) {
				e.DialogUtil.hndlDlgs.push({
					        hnd : f,
					        dlg : d
				        });
				var a = -1;
				for (i in e.DialogUtil.dialogs) {
					if (e.DialogUtil.dialogs[i] == d) {
						a = i;
						break;
					}
				}
				if (a != -1) {
					e.DialogUtil.removeDialog(a);
				}
			}
			return d;
		},
		_config_create_ex : function(a) {
			return a;
		},
		addDialog : function(a) {
			if (unieap.getDialog(a)) { return; }
			if (this.dialogs) {
				this.dialogs.push(a);
			}
		},
		getDialogs : function() {
			return this.dialogs;
		},
		removeDialog : function(a) {
			if (typeof a == "number") {
				this.dialogs.splice(a, 1);
			} else {
				var c = a,
					b = -1;
				for (el in this.hndlDlgs) {
					if (this.hndlDlgs[el].hnd == c || this.hndlDlgs[el].dlg == c) {
						b = el;
						break;
					}
				}
				if (b != -1) {
					this.hndlDlgs.splice(Number(b), 1);
				}
			}
		},
		getDialog : function(e) {
			if (e) {
				for (el in this.hndlDlgs) {
					if (this.hndlDlgs[el].hnd == e || this.hndlDlgs[el].dlg == e) { return this.hndlDlgs[el].dlg; }
				}
				return null;
			}
			var d = DialogUtil.getDialogs();
			if (d == null) { return null; }
			var a = d.length - 1;
			if (a >= 0) {
				for (var c = a; c >= 0; c--) {
					var b = d[c];
					if (b != null) { return b; }
				}
			}
		}
	};
})();
/* /unieap/ria3.3/unieap/dialog/MessageBox.js */
dojo.require("unieap.dialog.Dialog");
dojo.require("unieap.dialog.DialogUtil");
dojo.require("unieap.global");
dojo.provide("unieap.dialog.MessageBox");
MessageBox = {
	confirm : function(a, b) {
		a = a || {};
		var e = a.yesStr ? a.yesStr : RIA_I18N.dialog.messageBox.confirm;
		var d = a.noStr ? a.noStr : RIA_I18N.dialog.messageBox.cancel;
		var g = a.message ? a.message : RIA_I18N.dialog.messageBox.confirmText;
		g = this._stringConvert(g);
		var h = a.type;
		if (h != null) {
			h += "Icon";
		} else {
			h = "questionIcon";
		}
		var m = a.animate;
		if (typeof(m) == "undefined" || m == null) {
			m = unieap.animate;
		}
		var k = a.isClose;
		if (k != false) {
			k = true;
		}
		var l = a.iconCloseComplete;
		if (l != false) {
			l = true;
		}
		var j = this._getConfirmObj(g, h);
		var i = {
			width : j.width,
			height : j.Height,
			title : a.title ? a.title : RIA_I18N.dialog.messageBox.confirmTitle,
			modal : true,
			info : true,
			inner : j.obj,
			onComplete : a.onComplete,
			animate : m,
			buttonFocus : true,
			isExpand : false,
			resizable : false,
			iconCloseComplete : l,
			isClose : k
		};
		var f = null,
			c = unieap.getTopWin();
		if (c.DialogUtil && c.document.getElementsByTagName("frameset").length == 0) {
			f = c.DialogUtil.createDialog(i);
		} else {
			f = DialogUtil.createDialog(i);
		}
		f.addButton(e, function() {
			        f.setReturn(true);
			        f.close();
		        }, f);
		f.addButton(d, function() {
			        f.setReturn(false);
			        f.close();
		        }, f);
		l && k && f.setReturn(false);
		this._show(f, b);
	},
	cancelConfirm : function(a, b) {
		a = a || {};
		var f = a.yesStr ? a.yesStr : RIA_I18N.dialog.messageBox.yes;
		var e = a.noStr ? a.noStr : RIA_I18N.dialog.messageBox.no;
		var c = a.cancelStr ? a.cancelStr : RIA_I18N.dialog.messageBox.cancel;
		var h = a.message ? a.message : RIA_I18N.dialog.messageBox.confirmText;
		h = this._stringConvert(h);
		var i = a.type;
		if (i != null) {
			i += "Icon";
		} else {
			i = "questionIcon";
		}
		var n = a.animate;
		if (typeof(n) == "undefined" || n == null) {
			n = unieap.animate;
		}
		var l = a.isClose;
		if (l != false) {
			l = true;
		}
		var m = a.iconCloseComplete;
		if (m != false) {
			m = true;
		}
		var k = this._getConfirmObj(h, i);
		var j = {
			width : k.width,
			height : k.Height,
			title : a.title ? a.title : RIA_I18N.dialog.messageBox.confirmTitle,
			modal : true,
			info : true,
			inner : k.obj,
			onComplete : a.onComplete,
			animate : n,
			buttonFocus : true,
			isExpand : false,
			resizable : false,
			iconCloseComplete : m,
			isClose : l
		};
		var g = null,
			d = unieap.getTopWin();
		if (d.DialogUtil && d.document.getElementsByTagName("frameset").length == 0) {
			g = d.DialogUtil.createDialog(j);
		} else {
			g = DialogUtil.createDialog(j);
		}
		g.addButton(f, function() {
			        g.setReturn("yes");
			        g.close();
		        }, g);
		g.addButton(e, function() {
			        g.setReturn("no");
			        g.close();
		        }, g);
		g.addButton(c, function() {
			        g.setReturn("cancel");
			        g.close();
		        }, g);
		m && l && g.setReturn("cancel");
		this._show(g, b);
	},
	customerButtonConfirm : function(a, b) {
		a = a || {};
		var f = a.message ? a.message : RIA_I18N.dialog.messageBox.confirmText;
		f = this._stringConvert(f);
		var g = a.customerButtons;
		var h = a.type;
		if (h != null) {
			h += "Icon";
		} else {
			h = "questionIcon";
		}
		var n = a.animate;
		if (typeof(n) == "undefined" || n == null) {
			n = unieap.animate;
		}
		var l = a.isClose;
		if (l != false) {
			l = true;
		}
		var m = a.iconCloseComplete;
		if (m != false) {
			m = true;
		}
		var k = this._getConfirmObj(f, h);
		var j = {
			width : k.width,
			height : k.Height,
			title : a.title ? a.title : RIA_I18N.dialog.messageBox.confirmTitle,
			modal : true,
			info : true,
			inner : k.obj,
			onComplete : a.onComplete,
			animate : n,
			buttonFocus : true,
			isExpand : false,
			resizable : false,
			iconCloseComplete : m,
			isClose : l
		};
		var e = null,
			c = unieap.getTopWin();
		if (c.DialogUtil && c.document.getElementsByTagName("frameset").length == 0) {
			e = c.DialogUtil.createDialog(j);
		} else {
			e = DialogUtil.createDialog(j);
		}
		if (g && g.length != 0) {
			for (var d = 0; d < g.length; d++) {
				obj = g[d];
				this._addButton(e, obj);
			}
		}
		this._show(e, b);
	},
	prompt : function(a, b) {
		a = a || {};
		this._prompt(a, "single", b);
	},
	multiPrompt : function(a, b) {
		this._prompt(a, "multi", b);
	},
	alert : function(a, b) {
		if (!document.body) { return; }
		a = a || {};
		var d = a.yesStr ? a.yesStr : RIA_I18N.dialog.messageBox.confirm;
		var f = a.message ? a.message : RIA_I18N.dialog.messageBox.infoText;
		f = this._stringConvert(f);
		var g = a.type || "info";
		if (g != null) {
			g += "Icon";
		}
		var l = a.animate;
		if (typeof(l) == "undefined" || l == null) {
			l = unieap.animate;
		}
		var j = a.isClose;
		if (j != false) {
			j = true;
		}
		var k = a.iconCloseComplete;
		if (k != false) {
			k = true;
		}
		var i = this._getConfirmObj(f, g);
		var h = {
			width : i.width,
			height : i.Height,
			title : a.title ? a.title : RIA_I18N.dialog.messageBox.confirmTitle,
			modal : true,
			info : true,
			inner : i.obj,
			onComplete : a.onComplete,
			animate : l,
			buttonFocus : true,
			isExpand : false,
			resizable : false,
			iconCloseComplete : k,
			isClose : j
		};
		var e = null,
			c = unieap.getTopWin();
		if (c.DialogUtil && c.document.getElementsByTagName("frameset").length == 0) {
			e = c.DialogUtil.createDialog(h);
		} else {
			e = DialogUtil.createDialog(h);
		}
		e.addButton(d, function() {
			        e.close();
		        }, e);
		this._show(e, b);
	},
	autoCloseAlert : function(b, c) {
		b = b || {};
		var e = b.message ? b.message : RIA_I18N.dialog.messageBox.infoText;
		e = this._stringConvert(e);
		var g = b.type || "info";
		if (g != null) {
			g += "Icon";
		}
		var j = b.animate;
		if (typeof(j) == "undefined" || j == null) {
			j = unieap.animate;
		}
		var i = this._getConfirmObj(e, g);
		var h = {
			width : i.width,
			height : i.Height,
			title : b.title ? b.title : RIA_I18N.dialog.messageBox.autoClose,
			modal : true,
			info : true,
			inner : i.obj,
			onComplete : b.onComplete,
			animate : j,
			buttonFocus : true,
			isExpand : false,
			resizable : false,
			isClose : false
		};
		var f = null,
			d = unieap.getTopWin();
		if (d.DialogUtil && d.document.getElementsByTagName("frameset").length == 0) {
			f = d.DialogUtil.createDialog(h);
		} else {
			f = DialogUtil.createDialog(h);
		}
		this._show(f, c);
		var a = parseInt(b.durationTime);
		a ? j && a < 1000 && (a = 1000) : (a = 1000);
		setTimeout(function() {
			        f.close();
		        }, a);
	},
	_addButton : function(a, b) {
		a.addButton(b.label, function() {
			        a.setReturn(b.returnValue);
			        a.close();
		        }, a);
	},
	_getConfirmObj : function(e, c) {
		var d = dojo.create("span");
		d.innerHTML = e;
		dojo.mixin(d.style, {
			        display : "inline-block"
		        });
		document.body.appendChild(d);
		var a = d.offsetWidth;
		if (a == 0) {
			a = 50;
		}
		a += 92;
		if (a < 280) {
			a = 280;
		}
		if (!c && a > 50) {
			a = a - 32;
		}
		_height = d.offsetHeight;
		if (_height == 0) {
			_height = 20;
		}
		_height += 91;
		dojo.destroy(d);
		d = null;
		var b = "<table  vlign='center' style='width:100%;height:100%' class='messageBg'><tr>";
		b += "<td align='center'><table border=0><tr><td class='" + c
		        + "'><td style='text-align:left;'> " + e + "</td></tr></table></td></tr></table>";
		return {
			width : a,
			Height : _height,
			obj : b
		};
	},
	_show : function(a, b) {
		if (b == null) {
			a.show();
		} else {
			a.show(b);
		}
	},
	_prompt : function(b, h, a) {
		var e = b.yesStr ? b.yesStr : RIA_I18N.dialog.messageBox.confirm;
		var d = b.noStr ? b.noStr : RIA_I18N.dialog.messageBox.cancel;
		var g = b.message ? b.message : RIA_I18N.dialog.messageBox.inputContent;
		g = this._stringConvert(g);
		var j = null;
		if (h == "multi") {
			j = this._getMultiPromptObj(g);
		} else {
			j = this._getPromptObj(g);
		}
		var m = b.animate;
		if (typeof(m) == "undefined" || m == null) {
			m = unieap.animate;
		}
		var k = b.isClose;
		if (k != false) {
			k = true;
		}
		var l = b.iconCloseComplete;
		if (l != false) {
			l = true;
		}
		var i = {
			width : j.width,
			height : j.Height,
			title : b.title ? b.title : RIA_I18N.dialog.messageBox.promptDialog,
			modal : true,
			info : true,
			inner : j.obj,
			onComplete : b.onComplete,
			animate : m,
			buttonFocus : false,
			isExpand : false,
			resizable : false,
			iconCloseComplete : l,
			isClose : k
		};
		l && k && (i.onImgClose = function() {
			var n = f.getWindow().document.getElementById("promptText").value;
			this.setReturn({
				        text : n,
				        btn : false
			        });
		});
		var f = null,
			c = unieap.getTopWin();
		if (c.DialogUtil && c.document.getElementsByTagName("frameset").length == 0) {
			f = c.DialogUtil.createDialog(i);
		} else {
			f = DialogUtil.createDialog(i);
		}
		f.addButton(e, function() {
			        var n = f.getWindow().document.getElementById("promptText").value;
			        f.setReturn({
				                text : n,
				                btn : true
			                });
			        f.close();
		        }, f);
		f.addButton(d, function() {
			        var n = f.getWindow().document.getElementById("promptText").value;
			        f.setReturn({
				                text : n,
				                btn : false
			                });
			        f.close();
		        }, f);
		this._show(f, a);
		window.setTimeout(function() {
			        f.getWindow().document.getElementById("promptText").focus();
		        }, 500);
	},
	_getPromptObj : function(d) {
		var c = dojo.create("span");
		c.innerHTML = d;
		dojo.mixin(c.style, {
			        display : "inline-block"
		        });
		document.body.appendChild(c);
		var a = c.offsetWidth;
		if (a == 0) {
			a = 50;
		}
		a += 92;
		if (a < 280) {
			a = 280;
		}
		_height = c.offsetHeight;
		if (_height == 0) {
			_height = 20;
		}
		_height += 91;
		if (_height < 110) {
			_height = 110;
		}
		dojo.destroy(c);
		c = null;
		var b = "<table  vlign='center' style='width:100%;height:100%' class='messageBg'>";
		b += "<tr><td > " + d + "</td></tr>";
		b += "<tr><td ><input type='text' style='width:" + (a - 25)
		        + "px' id='promptText'></td></tr></table>";
		return {
			width : a,
			Height : _height,
			obj : b
		};
	},
	_getMultiPromptObj : function(d) {
		var c = dojo.create("span");
		c.innerHTML = d;
		dojo.mixin(c.style, {
			        display : "inline-block"
		        });
		document.body.appendChild(c);
		var a = c.offsetWidth;
		if (a == 0) {
			a = 50;
		}
		a += 92;
		if (a < 300) {
			a = 300;
		}
		_height = c.offsetHeight;
		if (_height == 0) {
			_height = 20;
		}
		_height += 162;
		if (_height < 180) {
			_height = 180;
		}
		dojo.destroy(c);
		c = null;
		var b = "<table  vlign='center' style='width:100%;height:100%' class='messageBg'>";
		b += "<tr><td > " + d + "</td></tr>";
		b += "<tr><td ><textarea rows='4' style='font-size:12pt;width:" + (a - 25)
		        + "px'  id='promptText'></textarea></td></tr></table>";
		return {
			width : a,
			Height : _height,
			obj : b
		};
	},
	_stringConvert : function(c) {
		c = this._convertEnterStr(c);
		var b = c.split("@br@");
		var a = "";
		dojo.forEach(b, dojo.hitch(this, function(d) {
			                (a != "") && (a += "@br@");
			                a += this._textSplit(d);
		                }));
		c = this._convertEnterBack(a);
		return this._convertCommonStr(c);
	},
	_textSplit : function(e) {
		var d = e;
		var b = "";
		var a = 0;
		while (e.length > 0) {
			(b != "") && (b += "@br@");
			var c = this._subString(e, 100);
			a = c.length;
			b += c;
			e = e.slice(a, (e.length));
		}
		b == "" ? b = "@br@" + e : b += e;
		return b;
	},
	_subString : function(e, c) {
		var b = 0;
		var d = "";
		for (var a = 0; a < e.length; a++) {
			if (e.charCodeAt(a) > 255) {
				b = b + 2;
			} else {
				b = b + 1;
			}
			if (b > c) { return d; }
			d = d + e.charAt(a);
		}
		return e;
	},
	_convertEnterStr : function(b) {
		var a = /\n|\r\n/g;
		b = b.replace(a, function(c) {
			        switch (c) {
				        case "\n" :
					        return "@br@";
					        break;
				        case "\r\n" :
					        return "@br@";
					        break;
				        default :
					        break;
			        }
		        });
		return b;
	},
	_convertEnterBack : function(b) {
		var a = /@br@/g;
		b = b.replace(a, "\n");
		return b;
	},
	_convertCommonStr : function(a) {
		return a.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/&/g, "&amp;").replace(/\"/g,
		        "&quot;").replace(/'/g, "&#39;").replace(/\n/g, "<br>").replace(/\t/g,
		        "&nbsp;&nbsp;").replace(/\s/g, "&nbsp;");
	}
};
/* /unieap/ria3.3/unieap/grid/manager/MenuManager.js */
dojo.provide("unieap.grid.manager.MenuManager");
dojo.require("unieap.menu.Menu");
dojo.declare("unieap.grid.manager.MenuManager", null, {
	        ui : {
		        alwaysShowMenu : true,
		        onBeforeMenuClick : true,
		        addMenuControl : true,
		        getMenu : true,
		        getCell : true
	        },
	        controlsNameList : null,
	        alwaysShowMenu : unieap.widget.grid.alwaysShowMenu,
	        _connectHandlers : null,
	        constructor : function(a) {
		        this._connectHandlers = [];
		        dojo.mixin(this, a);
		        this.menu = new unieap.menu.Menu({});
		        this.initEvent();
		        this.menuControls = [];
		        setTimeout(dojo.hitch(this, function() {
			                        this.initControls();
		                        }), 0);
	        },
	        initEvent : function() {
		        this._connectHandlers.push(dojo.connect(document, "onclick", dojo.hitch(this,
		                        function() {
			                        dijit.popup.close(this.menu);
		                        })));
		        var b = this.grid.managers.get("ViewManager");
		        var a = this;
		        this._connectHandlers.push(dojo.connect(b, "onHeaderRender", dojo.hitch(a,
		                        a.onHeaderRender)));
		        this._connectHandlers.push(dojo.connect(b, "onHeaderMouseOver", dojo.hitch(a,
		                        a.onHeaderMouseOver)));
		        this._connectHandlers.push(dojo.connect(b, "onHeaderMouseOut", dojo.hitch(a,
		                        a.onHeaderMouseOut)));
	        },
	        initControls : function() {
		        var d = this.controlsNameList;
		        for (var c in d) {
			        dojo.require(c);
			        var a = dojo.getObject(c);
			        var b = new a({
				                grid : this.grid,
				                menuManager : this,
				                args : d && d[c] || {}
			                });
			        this.addMenuControl(b);
		        }
	        },
	        addMenuControl : function(a) {
		        this.menuControls.push(a);
		        a && a.initMenu && a.initMenu();
	        },
	        getMenu : function() {
		        return this.menu;
	        },
	        updateMenu : function() {
		        dojo.forEach(this.menuControls, function(a) {
			                a.updateMenu && a.updateMenu();
		                });
		        this.menu.startup();
	        },
	        destroy : function() {
		        while (this._connectHandlers.length > 0) {
			        dojo.disconnect(this._connectHandlers.pop());
		        }
		        dojo.forEach(this.menuControls, function(a) {
			                a.destroy && a.destroy();
		                });
		        this.menu.destroy();
	        },
	        validate : function(b) {
		        var a = true;
		        dojo.forEach(this.menuControls, function(c) {
			                c.validateMenu && (a = c.validateMenu(b));
		                });
		        return a;
	        },
	        validateMenu : function(a) {
		        var c = !this.validate(a) && this.menuControls.length == 1;
		        var b = this.menuControls.length == 0 && !dojo.isFunction(this.onBeforeMenuClick);
		        if (c || b) { return false; }
		        return true;
	        },
	        onHeaderRender : function(b, a) {
		        setTimeout(dojo.hitch(this, function() {
			                        var c = this.grid.managers.get("LayoutManager");
			                        dojo.query(".u-grid-cell", b).forEach(function(e) {
				                                var f = dojo.create("div", {
					                                        "class" : "u-grid-menu"
				                                        }, e.childNodes[0], "last");
				                                if (this.alwaysShowMenu) {
					                                var d = c.getCell(Number(dojo.attr(e, "idx")));
					                                if (this.validateMenu(d)) {
						                                this.showMenu(f);
					                                }
				                                }
				                                a.connect(f, "onclick", dojo.hitch(this,
				                                                function(g) {
					                                                this.onMenuCick(g);
				                                                }));
			                                }, this);
			                        if (this.menu && this.menu.isShowingNow) {
				                        dijit.popup.close(this.menu);
			                        }
			                        dojo.forEach(this.menuControls, function(d) {
				                                d.onHeaderRender && d.onHeaderRender(b, a);
			                                });
		                        }), 0);
	        },
	        onHeaderMouseOver : function(b) {
		        if (b.cell) {
			        this.cell = b.cell;
			        var c = dojo.query(".u-grid-menu", b.cellNode)[0],
				        a = true;
			        if (!this.validateMenu(b.cell)) {
				        a = false;
			        }
			        if (c && a) {
				        this.showMenu(c);
			        }
		        }
	        },
	        onHeaderMouseOut : function(a) {
		        if (a.cell) {
			        if (this.menu.isShowingNow && this.menu.cell == a.cell) {} else {
				        var b = dojo.query(".u-grid-menu", a.cellNode)[0];
				        if (b) {
					        this.hideMenu(b);
				        }
			        }
		        }
	        },
	        showMenu : function(a) {
		        a.parentNode.style.position = "relative";
		        a.style.position = "absolute";
		        a.style.visibility = "visible";
		        a.style.display = "block";
	        },
	        hideMenu : function(a) {
		        if (this.alwaysShowMenu) { return; }
		        a.parentNode && (a.parentNode.style.position = "static");
		        a.style.position = "static";
		        a.style.visibility = "hidden";
		        a.style.display = "none";
	        },
	        onMenuCick : function(c) {
		        dojo.stopEvent(c);
		        if (this.menu.isShowingNow && c.target == this.menuParent) { return; }
		        dijit.popup.close(this.menu);
		        var b = c.target;
		        var d = this.menu;
		        this.menuParent = b;
		        var a = this.onBeforeMenuClick;
		        if (a && dojo.isFunction(a) && !a.call(this, this.getCell())) { return; }
		        this.menu.cell = this.getCell();
		        this.updateMenu();
		        if (!this.menu.hasChildren()) { return; }
		        dijit.popup.open({
			                parent : b,
			                popup : d,
			                around : b,
			                onClose : dojo.hitch(this, function() {
				                        this.hideMenu(b);
				                        this.menuParent = null;
			                        }),
			                orient : {
				                BL : "TL",
				                BR : "TR",
				                TL : "BL",
				                TR : "BR"
			                }
		                });
	        },
	        getCell : function() {
		        return this.cell;
	        }
        });
