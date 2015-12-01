dojo.provide("unieap.form.ComboBoxPopupMulti");
unieap.form.ComboBoxPopup.multi = {
	_createPopup: function(items, structure) {
		this._createHeader(structure);
		this._createOptions(items, structure);
	},
	_createHeader: function(structure) {
		dojo.empty(this.tableHeaderNode);
		var head = dojo.create("thead");
		var tr = dojo.create("tr", null, head);
		if (dojo.some(structure.rows, function(row) {return !row.title})) {
			dojo.style(this.listHeaderNode, "display", "none");
		} else {
			// 每列都有title的情况
			dojo.create("th", {style:{"width":"25px"}}, tr);
			dojo.forEach(structure.rows, function(row) {
				dojo.create("th", {innerHTML: "<span>"+row.title+"</span>", style:{"width": row.width||""}}, tr);
			});
			dojo.style(this.listHeaderNode, "display", "");
			this.tableHeaderNode.appendChild(head);
		}
	},
	_createOptions: function(results, structure, text) {
		var matchReg = null;
		if (text && text!="") {
			matchReg = this._getMatchReg(text);
		}
		dojo.empty(this.tableBodyNode);
		var tbody = dojo.create("tbody");
		for (var i=0; i<results.length; i++) {
			var item = results[i];
			var tr = dojo.create("tr");
			var selection = this._selection||[];
			if ((this.widget.comboShowSelect||this.widget.getDataProvider().isComboShowSelect()) 
				&& this.widget.comboShowSelectValue == item.CODEVALUE) {
				 //"请选择"行不生成checkbox
			} else if (dojo.indexOf(selection, item)!=-1) {
				item["checked"] = true;
			} else {
				item["checked"] = false;
			}
			var checkbox = null;
			if (dojo.isIE) {
				// ie下设置checkbox.checked=boolean存在问题
				if (item["checked"]==true) {
					checkbox = document.createElement("<input type='checkbox' checked/>");
				} else if (item["checked"]==false){
					checkbox = document.createElement("<input type='checkbox'/>");
				}
			} else if (item["checked"]!=undefined) {
				checkbox = dojo.create("input", {type:"checkbox"});
				checkbox.checked = item["checked"];
			}
			checkbox?dojo.create("td", {style:{"width":"25px"}}, tr).appendChild(checkbox):dojo.create("td", {style:{"width":"25px"}}, tr);
			
			for (var k=0,len=structure.rows.length; k<len; k++) {
				var col = structure.rows[k];// it should be named "col" instead of "row"
				var field = col.field;
				var value = item[field]||"";
				var td = dojo.create("td", {style:{"width": col.width||""}}, tr);
				td.innerHTML = this.getInnerHTML(value, item, field, text, matchReg);
			}
			tr.item = item;
			dojo.addClass(tr, "u-combobox-item");
			tbody.appendChild(tr);
		}
		this.tableBodyNode.appendChild(tbody);
	},
	_getMatchReg: function(text) {
		var texts = text.split(this.widget.separator);
		text = dojo.filter(texts, function(text) {
			return text != "";
		}).join("|");
		try {
			// new RegExp("("+text+")","gi")可能发生异常
			if (text != "") {
				return new RegExp("("+text+")","gi");
			}
		} catch (e) {
			return null;
		}
	},
	_onSelect: function(evt, target) {
		var items = this.widget.getDataProvider().getItems();
		var item = target.item;
		if ((this.widget.comboShowSelect||this.widget.getDataProvider().isComboShowSelect()) 
			&& this.widget.comboShowSelectValue == item.CODEVALUE)
			return;
		var decoder = this.widget.getDecoder();
		var selection = [];
		var texts = [];
		
		for (var i=0; i<items.length; i++) {
			var selected = false;
			for (var j=0; j<this._selection.length; j++) {
				if (this._selection[j] == items[i]) {
					selected = true;
					break;
				}
			}
			if (!selected && item==items[i]) {
				selection.push(items[i]);
				texts.push(decoder.decode(items[i]));
			} else if (selected && item!=items[i]) {
				selection.push(items[i]);
				texts.push(decoder.decode(items[i]));
			}
		}
		this._selection = selection;
		this._updateCheckbox(evt, target);
		this.widget.setText(texts.join(this.widget.separator));
		this.onSelect(item, this.widget);
	},
	_updateCheckbox: function(evt, target) {
		var t = evt.target;
		var checkbox;
		if (evt.type=="click" && t && t.tagName=="INPUT") {
			// 选中checkbox将自动改变checkbox的状态
			checkbox=t;
		} else {
			checkbox = dojo.query("input", target);
			if (checkbox && checkbox.length>0)
				checkbox = checkbox[0];
			// 选中行，手动改变checkbox的状态
			checkbox.checked = !checkbox.checked;
		}
		target.item["checked"] = checkbox.checked;
	},
	_handleKeyDown: function(evt) {
		if (!this.isOpen())
			return;
		var kcode = evt.keyCode;
		if (kcode==dojo.keys.PAGE_DOWN || kcode==dojo.keys.DOWN_ARROW) {
			this._highlightNext();
		} else if (kcode==dojo.keys.PAGE_UP || kcode==dojo.keys.UP_ARROW) {
			this._highlightPrev();
		} else if (kcode==dojo.keys.ENTER && this._highlighted) {
			this._onSelect(evt, this._highlighted);
			this.close(this._callback);
		}
	}
}
