BusCard.define('/buscardapp/rela/js/groupProdHandler.js',function(_buscard,cardParam){ 
try{
var a = arguments[0];
var b = arguments[1];
var Me = this;
Me.productId = b.productId;
Me.cityCode = b.cityCode;
Me.serviceOfferId = b.serviceOfferId;
Me.productId  = arguments[1].productId;
var groupNameElem =  Me.$("groupProdInstQueryName");
var groupNoElem = Me.$("groupProdInstQueryId");
var groupProdInstIdElem = Me.$('groupProdInstId');
var content = function(){
var tabPage = Me.getTabPanel();
var index = 0;
while(true)   
{ 
	var header = tabPage.getHeaderByIndex(index++);
	if(!header)
	break;
	else if((header.groupId||header.getAttribute("groupId")) =="1006")
	return tabPage.getPageByIndex(index-1);
}
}(); 
var groupProdBuilder = new GroupProdBuilder({
			container : content,
			memProdId:Me.productId
		}); 
 
Me.groupProdBuilder = groupProdBuilder;

//groupProdBuilder.renderAttrView("groupId",'30281');
Me.$("link_groupProdInstQueryName").onclick = Me.$("link_groupProdInstQueryId").onclick = function(){
var groupName = groupNameElem.value;
var groupNo = groupNoElem.value;
if(!(groupName||groupNo))
{
 alert("\u7fa4\u7ec4\u540d\u79f0\u6216\u7fa4\u7ec4\u6807\u793a\u4e0d\u80fd\u4e3a\u7a7a");
 return false;
}
if(!groupName)
groupName = "_";
if(!groupNo)
groupNo = "_";
var result = BusCard.$remote("prodInstCommFacadeBO").queryGroupByGroupNoAndName(groupNo,groupName);
  if(!BusCard.util.isArray(result))
  {
  alert("\u67e5\u8be2\u62a5\u9519:\n" +result);
  return false;
  }
  else if(result==0)
  {
      alert("\u67e5\u8be2\u7ed3\u679c\u4e3a\u7a7a,\u8bf7\u786e\u8ba4");
      return false;
  }
if(result.length!=0)
{    
   var param = []; 
   BusCard.util.each(result,function(item){
   param.push({id:item.prodInstId,name:item.custName+"-"+item.accNbr});
   });
   groupProdBuilder.addGroupProdInst(result);
   a.$rs(groupProdInstIdElem,param); 
   groupProdBuilder.renderAttrView(result[0].prodInstId,result[0].productId);
}
};
groupProdInstIdElem.onchange =function(){
if(this.value)
{
 var groupProdInst = groupProdBuilder.getGroupProdInst(this.value);
  groupProdBuilder.renderAttrView(groupProdInst.prodInstId,groupProdInst.productId);
}
};
/*-------------------------begin---------------------------------------*/
if(b.userId)
{
   var prodInstCommFacadeBO = a.$remote("prodInstCommFacadeBO");	
   var oldGroups = prodInstCommFacadeBO.queryGroupByUserId(parseInt(b.userId.toString()));
   //alert(oldGroups.length);
   if(oldGroups&&oldGroups.length>0)
   {
      groupProdBuilder.addOldGroup(oldGroups);
      var tempList = a.util.map(oldGroups,function(item){return {
      productId:item.productId,
      prodInstId:item.prodInstId
      }});
      groupProdBuilder.addGroupProdInst(tempList);
      
      a.util.each(oldGroups,function(groupInstVO){
      groupProdBuilder.grid.addRecord({
                           prodInstId : groupInstVO.prodInstId,
							groupName : groupInstVO.custName,
							accNbr:groupInstVO.accNbr})
      
      })
   
   }

   
}
/*-------------------------end---------------------------------------*/
 
}
catch(e){
alert(e.message)
}
});
