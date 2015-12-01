BusCard.define('/buscardapp/rela/js/card_180_10150.js',function(_buscard,cardParam){ 
Me = this;
var cardInfo = arguments[1];
var sysdate = cardInfo.sysdate;//当前时间
var months = cardInfo.months;//有效月数
var subsidyFee = cardInfo.subsidyFee;//补贴金额

var advancedEffDate = Me.$("advancedEffDate");
var advancedDays = Me.$("advancedDays");
var subFee = Me.$("subFee");

if(advancedEffDate){
	advancedEffDate.value = sysdate;
	advancedEffDate.style.width = "140px";
	advancedEffDate.disabled = true;
}

if(advancedDays){
	advancedDays.value = months;
	advancedDays.disabled = true;
}

if(subFee){
	subFee.value = subsidyFee;
	subFee.disabled = true;
}
});
