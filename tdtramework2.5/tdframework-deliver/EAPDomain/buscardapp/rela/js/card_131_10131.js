BusCard.define('/buscardapp/rela/js/card_131_10131.js',function(_buscard,cardParam){ 
var Me = this;
var cardInstance = this;
var webPath = $("webPath").value;
var data = BusCard.util.doGet(webPath + "/secondAcceptAjaxAction.do?method=initPage&", cardInstance.getCardRelationInfo());
var bankData = data.bankTypeList;
var belongCodeData = data.belongCodeBCList;
var bankCardKindData = data.bankCardKindList;
var bankChargeData = data.bankChargeList;
BusCard.util.$rs(cardInstance.$("bankId"), bankData);
BusCard.util.$rs(cardInstance.$("belongCode"), belongCodeData);
BusCard.util.$rs(cardInstance.$("cardKind"), bankCardKindData);
BusCard.util.$rs(cardInstance.$("bankCharge"), bankChargeData);
});
