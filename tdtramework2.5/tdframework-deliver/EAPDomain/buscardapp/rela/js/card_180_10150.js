BusCard.define('/buscardapp/rela/js/card_180_10150.js',function(_buscard,cardParam){ 
Me = this;
var cardInfo = arguments[1];
var sysdate = cardInfo.sysdate;//��ǰʱ��
var months = cardInfo.months;//��Ч����
var subsidyFee = cardInfo.subsidyFee;//�������

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
