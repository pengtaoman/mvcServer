dojo.provide('unieap.grid.view.foot');
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");

dojo.declare('unieap.grid.view.foot', null, {
	/**
	 * @summary:
	 * 		Grid的foot
	 * @declaredClass:
	 * 		unieap.grid.view.foot
	 * @classDescription：
	 * 		自定义Grid的foot区域
	 * @example:
	 * |	<div dojoType='unieap.grid.Grid'>
	 * |		<header></header>
     * |		<foot style="text-align:center;">
     * |			最大薪资：<span  express="max(attr_sal)"></span>
     * |			最小薪资：<span  express="min(attr_sal)"></span>
     * |			行数：<span  express="getRowCount()"></span>
     * |			自定义数据：<span  express="getData()"></span>
     * |			测试上下文：<span style="color: #2748c2" express="${testContext}" context="myContext"></span>
     * |		</foot>
	 * |	</div>
	 * 		Grid中定义foot标签。
	 * 		express表达式支持max min avg sum等表达式或自定义方法。
	 * 		通过grid.getFoot()得到Grid的foot。
  	 * @img:
     *      images/grid/foot.png
	 */

    constructor: function(inGrid, footNode){
        this.grid = inGrid;
		dojo.empty(footNode)
        this.grid.footNode = this.footNode=footNode;
		dojo.addClass(footNode,'u-grid-master-foot');
		dojo.place(footNode,this.grid.domNode, 'last');
		this.__fillContent();
        this.update();
		this.grid.connect(this.grid,'onStoreChanged',dojo.hitch(this,function(){
			this.update();
		}));
		this.grid.connect(this.grid,'onRowSetChanged',dojo.hitch(this,function(){
			this.update();
		}));

		this.grid.connect(this.grid,'onRowSetFilter',dojo.hitch(this,function(){
			this.update();
		}));
		this.grid.connect(this.grid,'onItemChanged',dojo.hitch(this,function(){
			this.update();
		}));
		this.grid.connect(this.grid,'onStatisticChanged',dojo.hitch(this,function(){
			this.update();
		}));
    },

	destroy:function(){
		dojo.query('[widgetId]', this.footNode).forEach(function(node){
			var w=dijit.byNode(node);
			w&&w.destroy();
		});
	},
	
    /**
     * @summary:
     * 		更新foot的信息
     * @description:
     * 		在数据发生变化时更新foot上表达式的信息
     * @example：
     * |	grid.getFoot().update();
     * 		更新foot上的信息
     */
    update: function(){
		if(this.footNode){
	        var expressList = dojo.query("[express]", this.footNode);
	        dojo.forEach(expressList, function(n){
	            n.innerHTML = this._parseExpress(n.getAttribute("express"), n.getAttribute("context"));
	        }, this);
		}
    },
    
	
	//计算表达式
    _parseExpress: function(v, context){
        if (v.startWith("${")) {
            var name = v.substring(2, v.length - 1);
            if (context) {
                context = dojo.getObject(context);
                return (context || window)[name];
            }
            return dataCenter.getParameter(name);
        }
        else {
            var operator = v.substring(0, v.indexOf("("));
            v = v.substring(v.indexOf("(") + 1);
            v = v.substring(0, v.length - 1);
            v = v.split(",");
            if (v.length > 2) {
                var name = v[0];
                v.shift();
                var pattern = v.join(",");
                v = [];
                v.push(name);
                v.push(pattern);
            }
			//sum avg 之类的方法放在Binding中实现
            context = context == null ? this.grid.getBinding() : (dojo.getObject(context) || window);
            var op = context[operator] || window[operator]
            v = op && op.apply(context, v);
            return v != null ? v : "&nbsp;";
        }
    },
	
	/**
	 * @summary:
	 * 		取得foot的innerText
	 * @example:
	 * |	var foot=grid.getFoot();
	 * |	foot.getInnerText();
	 * 		取得foot,并取得foot的innerText	
	 * @return:
	 * 		{string}
	 */
	getInnerText:function(){
		if(dojo.isFF){
			return this.footNode.textContent;
		}else{
			return this.footNode.innerText;
		}
		
	},
	
		
    __fillContent:function(){
		var source=this.grid.footSrcNode;
		var dest = this.footNode;
		if(source && dest){
			while(source.hasChildNodes()){
				dest.appendChild(source.firstChild);
			}
		}
	},
	
	getHeight:function(){
		return 26;
	}
	
    
});
