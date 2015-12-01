
dojo.require("unieap.ds.DataStore");
dojo.require("unieap.menu.Menu");
dojo.require("unieap.tree.Tree");
dojo.require("unieap.rpc");
var treeStore = new unieap.ds.DataStore([{
		"id": "id_root1",
		"label": "树根1",
	    "type": "menu",
	    "parentID": "",
	    "leaf": false
	},
	{
		"id": "11111",
	    "label": "叶子A",
	    "type": "menu",
	    "parentID": "id_root1",
	    "leaf": true
	},
	{
		"id": "22222",
	    "label": "叶子B",
	    "type": "menu",
	    "parentID": "id_root1",
	    "leaf": true
	},
	{
		"id": "id_root2",
		"label": "树根2",
	    "type": "menu",
	    "parentID": "",
	    "leaf": false
	},
	{
		"id": "33333",
	    "label": "叶子C",
	    "type": "menu",
	    "parentID": "id_root2",
	    "leaf": true
	},
	{
		"id": "44444",
	    "label": "叶子D",
	    "type": "menu",
	    "parentID": "id_root2",
	    "leaf": true
	}
]);
dataCenter.addDataStore("treeStore", treeStore);
