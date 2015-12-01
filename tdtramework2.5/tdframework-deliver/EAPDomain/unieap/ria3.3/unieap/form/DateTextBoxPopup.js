dojo.provide("unieap.form.DateTextBoxPopup");
dojo.require("unieap.form.Popup");
dojo.require("unieap.form.calendar");

dojo.declare("unieap.form.DateTextBoxPopup", unieap.form.Popup, {
    /**
     * @declaredClass:
     * 		unieap.form.DateTextBoxPopup
     * @summary:
     * 		日期的弹出框，继承自unieap.form.Popup，里面的内容是一个calendar的对象
     * @example:
     * |	<div dojoType="unieap.form.DateTextBox" popup="{firstDayOfWeek:2}">
     * |	</div>
     * 		在popup属性里配置日期弹出框的相关信息
     * @superClass:
     * 		unieap.form.Popup
     */
	
	
    _isShowingNow: false,
    
    
    height: "auto",
    
  	//设置弹出内容的宽度，默认值为auto，会根据内容自动进行调整
    width: "auto",
    
     //对应unieap.form.DateTextBox的引用，用户不需要设置
    widget: null,
    
    /**
     * @summary:
     * 		设置每周的第一天是周几，默认值为7，即以周日作为一周的开始
     * @type：
     * 		{number}
     * @default：
     * 		7
     * @example:
     * |	<div dojoType="unieap.form.DateTextBox" popup="{firstDayOfWeek:4}">
     * |	</div>
     * 		周四为一周的开始
     * @img:
     * 		images/form/date_firstDayOfWeek.png
     */
    firstDayOfWeek: 7,
    
    /**
     * @summary:
     * 		设置显示时间的制式，12或者24，默认为24
     * @description:
     * 		可以设置的值为12或24，将会分别显示12小时或24小时的时间
     * @type：
     * 		{number}
     * @example:
     * |	<div dojoType="unieap.form.DateTextBox" popup="{showsTime:24}">
     * |	</div>
     * 		在弹出的日期框下方显示24小时制的时间
     * @img:
     * 		images/form/date_showsTime.png
     */
    showsTime: "",
    
    /**
     * @summary:
     * 		设置是否显示其他月份的日期
     * @type：
     * 		{boolean}
     * @default:
     * 		true
     * @example:
     * |	<div dojoType="unieap.form.DateTextBox" popup="{showsOtherMonths:false}">
     * |	</div>
     * 		不显示其它月份的日期,否则灰色显示其它月份的日期
     * @img:
     * 		images/form/date_showsOtherMonths.png
     */
    showsOtherMonths: true,
    
    _calendar: null,
    
    
    constructor: function(params){
        dojo.mixin(this, params);
    },
	
	postMixInProperties:function(){
		this.width="auto";
		this.height="auto";
		this.inherited(arguments);
	},
    
    /**
	 * @summary:
	 * 		弹出popup下拉内容
	 */
    open: function(){
		this.domNode.style.background='transparent';
        if (this._isShowingNow) {
            this.close();
            return;
        }
        else {
    		if(!this.widget._canPopOpen()){
    			return;
    		}
            this._createCalendar();
			var date;
			if (this.widget.inputNode.value) {
				date = this.widget.getDisplayFormatter().parse(this.widget.inputNode.value);
			}
			else{
				date = (new Date()).getTime();
			}
            this._calendar.setDate(new Date(date));
			dojo.style(this.popupcontainer,"borderWidth","0px");
            this.popupcontainer.appendChild(this._calendar.element);
            this._calendar.showAt(0, 0);
			this.widget.inputNode.focus();
			this.widget.inputNode.select();
            this.inherited(arguments);
            if(!this.animate){
				dojo.style(this.domNode,'overflow','');
			}
        }
    },
	
	onAnimateEnd:function(){
		this.inherited(arguments);
		dojo.style(this.domNode,'overflow','');
	},
	
    _selected: function(cal, date){
        cal.sel.value = date;
        cal.widget.inputNode.focus();
		
        if (cal.dateClicked && cal.singleClick) 
            cal.callCloseHandler();
    },
    _closeHandler: function(cal){
        cal.widget.getPopup().close();
    },
    _createCalendar: function(){
        if (!this._calendar) {
            var el = this.widget.inputNode;
            this._calendar = new Calendar(this.firstDayOfWeek, null, this._selected, this._closeHandler);
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
            this._calendar.setDateFormat(this.widget._parseDateFormat(this.widget.getDisplayFormatter().getFormat()));
            this._calendar.create(this.popupcontainer);
            this._calendar.sel = el;
        }
        return this._calendar;
    },
	
	destroy : function(){
		this.clearNode();
		if(this._calendar){
			dojo.removeAttr(this._calendar.table, "calendar");
			var tds = this._calendar.table.getElementsByTagName("td");
			dojo.forEach(tds,function(td){
			   dojo.removeAttr(td, "calendar");
			   dojo.removeAttr(td, "caldate");
	        });
			var spans = this._calendar.table.getElementsByTagName("span");
			dojo.forEach(spans,function(span){
			   dojo.removeAttr(span, "calendar");
			   dojo.removeAttr(span, "caldate");
	        });
			this._calendar.destroy();
		}
		this.inherited(arguments);
	} 
});


