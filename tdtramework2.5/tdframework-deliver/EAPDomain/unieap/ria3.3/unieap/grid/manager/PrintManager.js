dojo.provide('unieap.grid.manager.PrintManager');
dojo.declare("unieap.grid.manager.PrintManager", null, {
	/**
	 * @summary:
	 * 		打印控制器
	 * @classDescription：
	 * 		控制Grid的打印功能。
	 * @declaredClass:
	 * 		unieap.grid.manager.PrintManager
	 * @example:
	 * |	var manager=grid.getManager('PrintManager');
	 * 		得到打印控制器	
	 * @example:
	 * |	var manager=grid.getManager('PrintManager');
	 * |	manager.doPrint();
	 * 		进行打印
	 * @img:
	 * 		images/grid/print.png
	 */

	ui:{
		doPrint:true,
		setInfo:true
	},


	/**
	 * @summary:
	 * 		打印的url
	 * @type:
	 * 		{string}
	 * @example:
	 * |	<div dojoType='unieap.grid.Grid'>
	 * |		<header></header>
	 * |		<toolbar print="{url:'test.do'}" >
	 * |		</toolbar>
	 * |	</div>
	 * 		可在toolbar标签上的print定义url
	 * @example:
	 * |	var manager=grid.getManager('PrintManager');
	 * |	manager.setInfo({url:'test.do'});
	 * 		可以通过setInfo方法设置打印控制器的url
	 */
    url: null,
    
	
	/**
	 * @summary:
	 * 		打印所需的parameters
	 * @type：
	 * 		{object}
	 * @example:
	 * |	<div dojoType='unieap.grid.Grid'>
	 * |		<header></header>
	 * |		<toolbar print="{parameters:{user:'y',password:'f'}}" >
	 * |		</toolbar>
	 * |	</div>
	 * 		可在toolbar标签上的print定义parameters
	 * @example:
	 * |	var manager=grid.getManager('PrintManager');
	 * |	manager.setInfo({parameters:{user:'y',password:'f'}});
	 * 		可以通过setInfo方法设置打印控制器的parameters
	 */
    parameters: null,
    
    
    constructor: function(param){
        dojo.mixin(this, param);
    },
	
	
	/**
	 * @summary:
	 * 		打印操作
	 * @param:
	 * 		{object|null} printInfo 打印信息
	 * @example:
	 * |	grid.getManager('PrintManager').doPrint()
	 * 		通过PrintManager进行打印操作
	 * @example:
	 * |	var printInfo={url:'a.do',parameters:{a:b}}
	 * |	grid.getManager('PrintManager').doPrint(printInfo)
	 * 		通过PrintManager进行打印操作
	 */
	doPrint:function(printInfo){
		var printData = this.grid.getGridData();
		if(this.url){
			printData.url=this.url;
		}
		if(this.parameters){
			printData.parameters=this.parameters;
		}
		if(printInfo){
			if(printInfo.url){
				printData.url=printInfo.url;
			}
			if(printInfo.parameters){
				printData.parameters=printInfo.parameters;
			}
		}
        unieap.Action.doPrint(printData);
	},
	
	/**
	 * @summary:
	 * 		设置打印相关信息
	 * @param:
	 * 		{object} printInfo 打印信息
	 * @example:
	 * |	var manager=grid.getManager('PrintManager');
	 * |	var printInfo={
	 * |		url:'test',
	 * |		parameters:{user:'chen',password:'s'}
	 * |	}
	 * |	manager.setInfo(printInfo);
	 * 		设置翻页控制器的url与parameters属性。
	 */
	setInfo:function(printInfo){
		dojo.mixin(this,printInfo);
	}
	
});
