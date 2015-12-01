BusCard.define('/buscardapp/rela/js/userLinkPhone.js',function(_buscard,cardParam){
	var Me = this;
	if($ac$.requestParam.linkPhone){
		Me.$("contcatPhone").value = $ac$.requestParam.linkPhone;
	}
});
