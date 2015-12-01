dojo.provide("unieap.layout.AdaptiveContainer");
dojo.require("unieap.layout.Container");
dojo.require("unieap.layout.AdaptivePane");
dojo.declare("unieap.layout.AdaptiveContainer", [unieap.layout.Container], {
	/**
     * @declaredClass:
     * 		unieap.layout.AdaptiveContainer
     * @summary:
     * 		自适应组件
     * @classDescription:
     *		自适应容器自动撑满高度
     * @superClass:
	 * 		unieap.layout.Container
     * @example:
	 * |<div id="AdaptiveContainer" dojoType="unieap.layout.AdaptiveContainer">
	 * |	<div dojoType="unieap.layout.AdaptivePane">
	 * |		<div dojoType="unieap.layout.TitlePane" title="titlepane" >
	 * |			固定高度1
	 * |		</div>	
	 * |	</div>
	 * |	<div dojoType="unieap.layout.AdaptivePane">
	 * |		<div dojoType="unieap.layout.TitlePane" title="titlepane" >
	 * |			固定高度2
	 * |		</div>	
	 * |	</div>
	 * |	<div dojoType="unieap.layout.AdaptivePane" autoHeight="true">
	 * |		自适应内容
	 * |	</div>
	 * |	<div dojoType="unieap.layout.AdaptivePane">
	 * |		<div dojoType="unieap.layout.TitlePane" title="titlepane" >
	 * |			固定高度3
	 * |		</div>	
	 * |	</div>
	 * | </div>	
     */

	/**
	 * @summary：
	 * 		设置容器的高度
	 * @type：
	 * 		{string}
	 * @default：
	 * 		"100%"
	 */
	height : "100%",
	
    postCreate:function(){
		dojo.addClass(this.containerNode,"adaptivecontainer");
		this.initContainer();
	},
    //重写父类设置容器大小的方法
	resizeContainer : function(){
		this._resizeChildren();
	},
	
	//通知执行自适应容器大小变化的方法，一般由某一子项发起
	notifyParentResize : function(child){
		this._resizeChildren(child);
	},
	
	//重新设置各个子项的大小
	_resizeChildren : function(c){
		var children = this.getChildrenContainer(),
			leftHeight = this.containerNode.clientHeight,
			fixed = [], 
			nofixed = [],
			percent = 0;
		if(leftHeight == 0)	return ;
		for(var i=0,child;i < children.length;i++){
			child=children[i]
			if(child.isHidden()) continue;
			if(child.isAutoHeight()){
				nofixed.push(child);
				percent += child.getHeight();
			}
			else{
				fixed.push(child);
			}
		}
		//处理非自适应部分容器
		for(var i=0,child;i<fixed.length;i++){
			child = fixed[i];
			if (c != child) {
				child.resizeContainer();
			}
			leftHeight = leftHeight - child.getHeight();
			if(leftHeight<0) return;
		}
		if(leftHeight < 0) return ;
		//处理自适应部分容器
		for(var i=0,child;i<nofixed.length;i++){
			child = nofixed[i];
			var height =  Math.floor(leftHeight*child.getHeight()/percent);
			child.setHeight(height);
			child.resizeContainer();
		}
	}
});
