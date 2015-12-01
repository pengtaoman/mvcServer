 function setDS(){
	var date=new Date().getTime();
    unieap.byId("form").getBinding().setDataStore(new unieap.ds.DataStore("test",[{
           col1:'col1',
           col2:5566,
           col3:date,
		   col4:1
     }]));
	close();
 }
 dojo.addOnLoad(setDS);
 function showDialog(){
 	 var dialog = new unieap.dialog.Dialog({
	 				url:"test_dialog.html",
					onComplete:testReturn,
					iconCloseComplete:true,
					height:"600", 
					width:"600"
				});
	 dialog.show();
 }
function testReturn(){
	MessageBox.alert({
		message:'Dialog回调事件'
	});
}
function open(){
	unieap.byId("container2").getPaneByRegion("right").open();
	unieap.byId("container2").getPaneByRegion("left").open();
}
function close(){
	unieap.byId("container1").getPaneByRegion("right").close();
	unieap.byId("container1").getPaneByRegion("left").close();
}
