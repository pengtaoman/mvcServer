BusCard.define('/buscardapp/rela/js/card_132_100151.js',function(_buscard,cardParam){ 
var Me = this;
var cardInstance = this;

Me.setDisabled=function(arg,info){
	if(arg){
		arg.disabled=info;
	}
};



Me.setDisabled($("100634"),true);
Me.setDisabled($("100633"),true);
Me.setDisabled($("100629"),true);
Me.setDisabled($("100630"),true);
Me.setDisabled($("100631"),true);

//“一站式级别”的属性，当此属性所选的值为"省内跨本地网"时，页面“结算省份”“结算城市”“流水号”置灰不可修改。
 if($("100625")){
	 $("100625").onchange=function(){
			 if($("100625").value==4){
			   Me.setDisabled($("100629"),true);
               Me.setDisabled($("100630"),true);
               Me.setDisabled($("100631"),true);
			  }else{
			   Me.setDisabled($("100629"),false);
               Me.setDisabled($("100630"),false);
               Me.setDisabled($("100631"),false);
			  }
	  }
	}
 //“收费地”的属性，当此属性所选的值为"第三方收费"时，页面“收款省份”“收款单位”可修改，否则不可修改。
  if($("100628")){
	  $("100628").onchange=function(){
			 if($("100628").value!=3){
			 	  Me.setDisabled($("100634"),true);
                  Me.setDisabled($("100633"),true);
			  }else{
			      Me.setDisabled($("100634"),false);
                  Me.setDisabled($("100633"),false);
			  }
	    }
   }
  


});
