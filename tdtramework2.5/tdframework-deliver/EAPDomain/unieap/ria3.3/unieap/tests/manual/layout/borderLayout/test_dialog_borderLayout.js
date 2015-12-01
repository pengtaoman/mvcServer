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