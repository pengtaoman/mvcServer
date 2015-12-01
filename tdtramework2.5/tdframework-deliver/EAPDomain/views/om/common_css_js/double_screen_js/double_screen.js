/* 双屏服务提示功能
 * cityCode:城市代码：做业务的业务号码的CityCode
 * applyEventSource:申请事项来源 1:营业库 2:账务库
 * applyEvent:申请事项
 * setp：步骤
 * serviceKind:业务类型
 * queryFlag:查询方式  1:serviceId 2:prodId
 * queryValue:查询条件
 * otherValue:其它条件 一般不传
 * pageValueStr:页面控件的值 如  "&firstName=张三&mail=zhangsan@a.com"
 * userId:用户编号,一般不传
 */
function showServicePrompt(cityCode,applyEventSource,applyEvent,step,serviceKind,queryFlag,queryValue,otherValue,pageValueStr,userId){
	/*空值处理*/
	cityCode = cityCode == undefined ? '' : cityCode;
	applyEventSource = applyEventSource == undefined ? '1' : applyEventSource;
	applyEvent = applyEvent == undefined ? '0' : applyEvent;
	step = step == undefined ? '1' : step;
	serviceKind = serviceKind == undefined ? '0' : serviceKind;
	queryFlag = queryFlag == undefined ? '1' : queryFlag;
	queryValue = queryValue == undefined ? '' : queryValue;
	otherValue = otherValue == undefined ? '' : otherValue;
	userId = userId == undefined ? '0' : userId;
	/*获得双屏应用的路径、上下文及用户名密码*/
	var result;
	var paramters = "";
   	result = executeRequest("doubleScreenAction","getServicePromptPath",paramters);
   	if(result.split("~")[0]!="1"){
   		return false;
   	}
	/*弹出提示窗口*/
	var leftWidth = screen.width;
	var param = "&cityCode="+cityCode+"&applyEventSource="+applyEventSource+"&applyEvent="+applyEvent+"&step="+step+"&serviceKind="+serviceKind+"&queryFlag="+queryFlag+"&queryValue="+queryValue+"&otherValue="+otherValue+"&userId="+userId+pageValueStr;
	promptWindow=open(result.split("~")[1]+param,"欢迎您","top=0,left="+leftWidth+",captionbar=no,menubar=no,toolbar=no,location=no,directories=no,statusbar=no,resizable=no,scrollbars=no,titlebar=no,width=1024,height=768,depended=yes");
}