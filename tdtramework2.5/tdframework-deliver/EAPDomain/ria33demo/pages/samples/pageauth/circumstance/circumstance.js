dojo.addOnLoad(init);
function init(){
	unieap.setPageAuthority("c1");
}
function fn_onchange(){
	var value=unieap.byId("combobox").getValue();
	switch(value){
		case "1":{
			unieap.setPageAuthority("c1");
			break;}
		case "2":{
			unieap.setPageAuthority("c2");
			break;}
		case "3":{
			unieap.setPageAuthority("c3");
			break;}					
	}
}
	