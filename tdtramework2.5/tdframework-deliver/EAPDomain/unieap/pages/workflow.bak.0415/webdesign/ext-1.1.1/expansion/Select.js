Ext.apply(Ext.View.prototype, {
	deselect:function(nodeInfo, suppressEvent){
		if(nodeInfo instanceof Array){
			for(var i = 0, len = nodeInfo.length; i < len; i++){
				this.deselect(nodeInfo[i], true);
			}
		}else{
			var node = this.getNode(nodeInfo);
			if(node && this.isSelected(node)){
				Ext.fly(node).removeClass(this.selectedClass);
				this.selections.remove(node);
				if(!suppressEvent){
					this.fireEvent("selectionchange", this, this.selections);
				}
			}
		}
	}
});

Ext.namespace('Ext.ux.form');

/**
 * @class Ext.ux.form.Select
 * @extends Ext.form.ComboBox
 * A combobox control with support for multiselect and trackMouseOver, non-editable.
 * @constructor
 * Create a new Select.
 * @param {Object} config Configuration options
 * @author Andrei Neculau - andrei.neculau@gmail.com / http://andreineculau.wordpress.com
 * @version 0.2
 */
Ext.ux.form.Select = function(config){
	if (config.transform && typeof config.singleSelect == 'undefined'){
		var s = Ext.getDom(config.transform);
		config.singleSelect = !(Ext.isIE ? s.getAttributeNode('multiple').specified : o.hasAttribute('multiple'));
	}
	config.selectOnFocus = false;
	Ext.ux.form.Select.superclass.constructor.call(this, config);
	if (!this.singleSelect){
		this.typeAhead = false;
		this.editable = false;
		//this.lastQuery = this.allQuery;
		this.triggerAction = 'all';
	}
}

Ext.extend(Ext.ux.form.Select, Ext.form.ComboBox, {
	/**
	 * @cfg {Boolean} singleSelect True for single selection model (defaults to false)
	 */
	singleSelect:false,
	/**
	 * @cfg {Integer} minLength Minimum number of required items to be selected
	 */
	minLength:0,
	/**
	 * @cfg {String} minLengthText Validation message displayed when minLength is not met.
	 */
	minLengthText:'Minimum {0} items required',
	/**
	 * @cfg {Integer} maxLength Maximum number of allowed items to be selected
	 */
	maxLength:Number.MAX_VALUE,
	/**
	 * @cfg {String} maxLengthText Validation message displayed when maxLength is not met.
	 */
	maxLengthText:'Maximum {0} items allowed',
	
	// private
	onLoad:function(){
		if(!this.hasFocus){
			return;
		}
		if(this.store.getCount() > 0){
			this.expand();
			this.restrictHeight();
			if(this.lastQuery == this.allQuery){
				if(this.editable){
					this.el.dom.select();
				}
				this.selectByValue(this.value, true);
				if (this.store.getCount()){
					this.select(0, true, true);
				}
			}else{
				this.selectNext();
				if(this.typeAhead && this.lastKey != Ext.EventObject.BACKSPACE && this.lastKey != Ext.EventObject.DELETE){
					this.taTask.delay(this.typeAheadDelay);
				}
			}
		}else{
			this.onEmptyResults();
		}
		//this.el.focus();
	},
	
	// private
	onRender:function(ct, position){
		Ext.ux.form.Select.superclass.onRender.call(this, ct, position);
		this.view.singleSelect = this.singleSelect;
		this.view.on('beforeClick', this.onViewBeforeClick, this);
	},
	
	// private
	initEvents : function(){
		Ext.form.ComboBox.superclass.initEvents.call(this);

		this.keyNav = new Ext.KeyNav(this.el, {
			"up" : function(e){
				this.inKeyMode = true;
				this.selectPrev();
			},

			"down" : function(e){
				if(!this.isExpanded()){
					this.onTriggerClick();
				}else{
					this.inKeyMode = true;
					this.selectNext();
				}
			},

			"enter" : function(e){
				this.onViewBeforeClick(this.view, this.selectedIndex, this.view.getNode(this.selectedIndex), e);
				this.onViewClick(this.view, this.selectedIndex, this.view.getNode(this.selectedIndex), e);
				//return true;
			},

			"esc" : function(e){
				this.collapse();
			},

			"tab" : function(e){
				this.collapse();
				return true;
			},
			
			"home" : function(e){
				this.selectFirst();
				return false;
			},
			
			"end" : function(e){
				this.selectLast();
				return false;
			},

			scope : this,

			doRelay : function(foo, bar, hname){
				if(hname == 'down' || this.scope.isExpanded()){
				   return Ext.KeyNav.prototype.doRelay.apply(this, arguments);
				}
				return true;
			},

			forceKeyDown: true
		});
		this.queryDelay = Math.max(this.queryDelay || 10,
				this.mode == 'local' ? 10 : 250);
		this.dqTask = new Ext.util.DelayedTask(this.initQuery, this);
		if(this.typeAhead){
			this.taTask = new Ext.util.DelayedTask(this.onTypeAhead, this);
		}
		if(this.editable !== false){
			this.el.on("keyup", this.onKeyUp, this);
		}
		if(this.forceSelection){
			this.on('blur', this.doForce, this);
		}
	},

	// private
	onSelect:function(record, index){
		if(this.fireEvent('beforeselect', this, record, index) !== false){
			if (this.singleSelect){
				this.setValue(record.data[this.valueField || this.displayField]);
			}
			else{
				this.addValue(record.data[this.valueField || this.displayField]);
			}
			this.fireEvent('select', this, record, index);
			if (this.singleSelect){
				this.collapse();
			}
		}
	},

	/**
	 * Add a value if this is a multi select
	 * @param {String} value The value to match
	 */
	addValue:function(v){
		if (this.singleSelect){
			this.setValue(v);
			return;
		}
		var value = this.getValue();
		var valueArray = value.length?value.split(','):[];
		if (valueArray.indexOf(v) == -1){
			valueArray.push(v);
		}
			
		this.setValue(valueArray.join(','));
	},
	
	/**
	 * Remove a value
	 * @param {String} value The value to match
	 */
	removeValue:function(v){
		var value = this.getValue();
		var valueArray = value.length?value.split(','):[];
		if (valueArray.indexOf(v) != -1){
			valueArray.remove(v);
		}
			
		this.setValue(valueArray.join(','));
	},
	
	/**
	 * Sets the specified value into the field.  If the value finds a match, the corresponding record text
	 * will be displayed in the field.
	 * @param {String} value The value to match
	 */
	setValue:function(v){
		var oldValue = this.getValue();
		var valueArray = v.split(','),
				result = [],
				resultRaw = [];
		if (this.singleSelect){
			valueArray = valueArray.slice(0,1);
		}
		for (var i=0, len=valueArray.length; i<len; i++){
			var value = valueArray[i];
			var text = value;
			if(this.valueField){
				var r = this.findRecord(this.valueField, value);
				if(r){
					text = r.data[this.displayField];
				}
			}
			result.push(value);
			resultRaw.push(text);
		}
		text = resultRaw.join(',');
		v = result.join(',');
		
		this.lastSelectionText = text;
		if(this.hiddenField){
			this.hiddenField.value = v;
		}
		Ext.form.ComboBox.superclass.setValue.call(this, text);
		this.value = v;
		
		if (String(oldValue) != String(this.getValue())){
			this.fireEvent('change', this, oldValue, this.getValue());
		}
	},
	
	// private
	onViewOver:function(e, t){
		if(this.inKeyMode){ // prevent key nav and mouse over conflicts
			return;
		}
		var item = this.view.findItemFromChild(t);
		if(item){
			var index = this.view.indexOf(item);
			this.select(index, false, true);
		}
	},
	
	// private
	onViewBeforeClick:function(vw, index, node, e){
		this.startValue = this.getValue();
		this.preClickSelections = this.view.getSelectedIndexes();
		if (this.hoveredIndex == index && Ext.fly(this.view.getNode(this.hoveredIndex)).hasClass('x-combo-cursor')){
			this.preClickSelections.remove(this.hoveredIndex);
		}
		if (this.disabled){
			return false;
		}
	},
	
	// private
	onViewClick:function(vw, index, node, e){
		if (typeof index != 'undefined'){
			var arrayIndex = this.preClickSelections.indexOf(index);
			if (arrayIndex != -1){
				Ext.fly(this.view.getNode(index)).addClass('x-combo-cursor');
				Ext.fly(this.view.getNode(index)).removeClass('x-combo-selected-cursor');
				this.removeValue(this.store.getAt(index).data[this.valueField || this.displayField]);
				this.hoveredIndex = index;
			}
			else{
				if (this.singleSelect && this.view.getSelectionCount()){
					this.view.deselect(this.view.getSelectedIndexes()[0]);
				}
				if (this.hoveredIndex == index){
					Ext.fly(this.view.getNode(index)).removeClass('x-combo-cursor');
					Ext.fly(this.view.getNode(index)).addClass('x-combo-selected-cursor');
				}
				var r = this.store.getAt(index);
				if (r){
					this.onSelect(r, index);
				}
			}
		}
			
		// from the old doFocus argument; don't really know its use
		if(vw !== false){
			this.el.focus();
		}
	},

	/**
	 * Select item in the dropdown list by its numeric index in the list. This function does NOT cause the select event to fire.
	 * The store must be loaded and the list expanded for this function to work, otherwise use setValue.
	 * @param {Number} index The zero-based index of the list item to select
	 * @param {Boolean} scrollIntoView False to prevent the dropdown list from autoscrolling to display the
	 * selected item if it is not currently in view (defaults to true)
	 * @param {Boolean} hovering True if selection will be a cursor, false if the selection will be a selected item. Defaults to false 
	 */
	select:function(index, scrollIntoView, hovering){
		hovering = hovering || this.inKeyMode;
		if (typeof this.hoveredIndex != 'undefined' && this.hoveredIndex != index){
			if (Ext.fly(this.view.getNode(this.hoveredIndex)).hasClass('x-combo-cursor')){
				this.view.deselect(this.hoveredIndex);
			}
			Ext.fly(this.view.getNode(this.hoveredIndex)).removeClass('x-combo-cursor');
			Ext.fly(this.view.getNode(this.hoveredIndex)).removeClass('x-combo-selected-cursor');
			this.hoveredIndex = undefined;
		}
		if (hovering){
			this.hoveredIndex = index;
			if (!this.view.isSelected(index)){
				Ext.fly(this.view.getNode(index)).addClass('x-combo-cursor');
			}else{
				Ext.fly(this.view.getNode(index)).addClass('x-combo-selected-cursor');
			}
		}
		this.selectedIndex = index;
		this.view.select(index, (hovering || !this.singleSelect));
		if(scrollIntoView !== false){
			var el = this.view.getNode(index);
			if(el){
				this.innerList.scrollChildIntoView(el, false);
			}
		}
	},
	
	// private
	selectFirst:function(){
		var ct = this.store.getCount();
		if(ct > 0){
			this.select(0);
		}
	},
	
	// private
	selectLast:function(){
		var ct = this.store.getCount();
		if(ct > 0){
			this.select(ct);
		}
	},

	/**
	 * Select an item in the dropdown list by its data value. This function does NOT cause the select event to fire.
	 * The store must be loaded and the list expanded for this function to work, otherwise use setValue.
	 * @param {String} value The data values of the items to select - split by commas
	 * @param {Boolean} scrollIntoView False to prevent the dropdown list from autoscrolling to display the
	 * selected items if they are not currently in view (defaults to true) - will always display the last item
	 * @return {Array} Array of matched values
	 */
	selectByValue:function(v, scrollIntoView){
		this.view.deselect(Ext.apply([], this.view.getSelectedNodes()), true);
		if(v !== undefined && v !== null){
			var valueArray = v.split(','),
			result = [];
			for (var i=0, len=valueArray.length; i<len; i++){
				v = valueArray[i];
				var r = this.findRecord(this.valueField || this.displayField, v);
				if(r){
					this.select(this.store.indexOf(r), scrollIntoView);
					result.push(v);
				}
			}
			return result.join(',');
		}
		return false;
	},
	
	// private
	onTriggerClick:function(){
		if(this.disabled){
			return;
		}
		if(this.isExpanded()){
			this.collapse();
			this.el.focus();
		}else{
			this.hasFocus = true;
			this.startValue = this.getValue();
			if(this.triggerAction == 'all'){
				this.doQuery(this.allQuery, true);
			}else{
				this.doQuery(this.getRawValue());
			}
			this.el.focus();
		}
	},

	validateValue:function(value){
		if(!Ext.ux.form.Select.superclass.validateValue.call(this, value)){
			return false;
		}
		var valueArray = value.length?value.split(','):[];
		if (valueArray.length < this.minLength){
			this.markInvalid(String.format(this.minLengthText, this.minLength));
			return false;
		}
		if (valueArray.length > this.maxLength){
			this.markInvalid(String.format(this.maxLengthText, this.maxLength));
			return false;
		}
		return true;
	},
	
	collapse:function(){
		Ext.ux.form.Select.superclass.collapse.call(this);
		if (typeof this.hoveredIndex != 'undefined'){
			if (Ext.fly(this.view.getNode(this.hoveredIndex)).hasClass('x-combo-cursor')){
				this.view.deselect(this.hoveredIndex);
			}
			Ext.fly(this.view.getNode(this.hoveredIndex)).removeClass('x-combo-cursor');
			Ext.fly(this.view.getNode(this.hoveredIndex)).removeClass('x-combo-selected-cursor');
			this.hoveredIndex = undefined;
		}
	},
	setToolTip:function(text){
		 if(Ext.QuickTips && Ext.QuickTips.isEnabled()){
            this.getEl().dom.qtip = text;
            this.getEl().dom.removeAttribute('title');
        }else{
            this.getEl().dom.title = text;
        }
	}
});