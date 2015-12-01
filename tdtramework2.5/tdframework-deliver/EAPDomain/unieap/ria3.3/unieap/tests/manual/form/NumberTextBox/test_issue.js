dojo.require("unieap.form.Form");

var empDataStore = new unieap.ds.DataStore("empDataStore",[{
		salary:1200,
		bonus : 1200
	}]);
empDataStore.addMetaData("salary",{
		primaryKey:true,
		label:"工资",
		dataType:4,
		nullable:false,
		precision:4
	});
	
dataCenter.addDataStore(empDataStore);
