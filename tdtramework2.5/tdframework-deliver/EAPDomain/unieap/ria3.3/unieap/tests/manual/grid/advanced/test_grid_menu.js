dojo.declare("unieap.grid.myMenu", null, {
    constructor: function(grid){
        this.grid = grid;
        this.menuManager = grid.getManager('MenuManager');
    },
    initMenu: function(){
        var m = this.menuManager.getMenu();
        this.myMenuItem = new unieap.menu.MenuItem({
            label: '自定义',
			onClick:function(){
				alert('Hello');
				dijit.popup.close(m);
			}
        });
        m.addChild(this.myMenuItem);
    },
    updateMenu: function(){
        var cell = this.menuManager.getCell();
        if (cell && cell.name == 'NAME') {
            this.myMenuItem.setDisabled(true);
        }
        else {
            this.myMenuItem.setDisabled(false);
        }
    }
});
dojo.addOnLoad(function(){
	var menuManage=grid.getManager('MenuManager');
	var myMenuControl =new unieap.grid.myMenu(grid);
	menuManage.addMenuControl(myMenuControl);
})
