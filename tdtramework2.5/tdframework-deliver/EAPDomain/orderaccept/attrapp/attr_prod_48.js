BusCard.define('/orderaccept/attrapp/attr_prod_48.js',function(_buscard,cardParam){ 
	//密码
    var prodOfferAcceptPageDispatch=function(){
		var Me = this;
		//生成6位随即密码（翼聊密码）
		var getRandomPassword=function(){
			var selectChar=new Array('0','1','2','3','4','5','6','7','8','9',
									 'a','b','c','d','e','f','g','h','i','j',
									 'k','l','m','n','o','p','q','r','s','t',
									 'u','v','w','x','y','z',
									 'A','B','C','D','E','F','G','H','I','J',
									 'K','L','M','N','O','P','Q','R','S','T',
									 'U','V','W','X','Y','Z');
			var password = "";
			for(var i = 0; i < 6;i++){
			    password +=""+selectChar[Math.floor(Math.random()*62)];
			}
			return password;
		}
		if(!!Me.$("48") && !Me.$("48").value){
			Me.$("48").value = getRandomPassword();
		}
    };
    var attrUsedPage = window.attrUsedPage || 'prodOfferAcceptPage';
    /**
     * 综合查询页面处理分支
     * @method
     */
    var allInfoQueryPageDispatch = function() {};
    /**
     * 二次业务处理分支
     * @method
     */
    var secondBusinessPageDispatch = function() {};
    /**
     * 批量页面处理分支
     * @method
     */
    var batchPageDispatch = function() {};
  
    //调用具体分支处理逻辑
    return eval(attrUsedPage + "Dispatch").apply(this, arguments);
});
