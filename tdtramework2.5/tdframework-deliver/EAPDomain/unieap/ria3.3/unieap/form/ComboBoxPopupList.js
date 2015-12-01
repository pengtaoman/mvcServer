dojo.provide("unieap.form.ComboBoxPopupList");
unieap.form.ComboBoxPopup.list = {
	
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
			dojo.forEach(structure.rows, function(row) {
				dojo.create("th", {innerHTML: row.title, style:{"width": row.width||""}}, tr);
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
			for (var k=0,len=structure.rows.length; k<len; k++) {
				var col = structure.rows[k];// it should be named "col" instead of "row"
				var field = col.field;
				var value = item[field]||"";
				if(this.widget.comboShowSelectValue == value){
					value = "";
				}
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
		this._selection = [target.item];
		this.onSelect(target.item, this.widget);
		this.close(this._callback);
	},
	_handleKeyDown: function(evt) {
		if (!this.isOpen())
			return;
		var kcode = evt.keyCode;
		if (kcode==dojo.keys.PAGE_DOWN || kcode==dojo.keys.DOWN_ARROW) {
			this._highlightNext();
			this._selection = [this._highlighted.item];
			this.widget.setText(this.widget.getDecoder().decode(this._selection[0]));
		} else if (kcode==dojo.keys.PAGE_UP || kcode==dojo.keys.UP_ARROW) {
			this._highlightPrev();
			this._selection = [this._highlighted.item];
			this.widget.setText(this.widget.getDecoder().decode(this._selection[0]));
		} else if (kcode==dojo.keys.ENTER && this._highlighted) {
			this._onSelect(evt, this._highlighted);
		}
	}
}
