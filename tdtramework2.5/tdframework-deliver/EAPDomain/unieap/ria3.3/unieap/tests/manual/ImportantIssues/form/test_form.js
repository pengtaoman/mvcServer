var formDs=new unieap.ds.DataStore('formDs',[{cbb:true}]);
dataCenter.addDataStore(formDs);
var ds = new unieap.ds.DataStore('demo',[{name:"",age:"123",introduction:null}]);
dataCenter.addDataStore(ds);

function setValue(){
	var value = unieap.byId('tb').getValue();
	test_combobox.setValue(value);
}
function getValue(){
	alert(test_combobox.getValue());
}

dojo.addOnLoad(function(){

});