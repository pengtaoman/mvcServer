/* ˫��������ʾ����
 * cityCode:���д��룺��ҵ���ҵ������CityCode
 * applyEventSource:����������Դ 1:Ӫҵ�� 2:�����
 * applyEvent:��������
 * setp������
 * serviceKind:ҵ������
 * queryFlag:��ѯ��ʽ  1:serviceId 2:prodId
 * queryValue:��ѯ����
 * otherValue:�������� һ�㲻��
 * pageValueStr:ҳ��ؼ���ֵ ��  "&firstName=����&mail=zhangsan@a.com"
 * userId:�û����,һ�㲻��
 */
function showServicePrompt(cityCode,applyEventSource,applyEvent,step,serviceKind,queryFlag,queryValue,otherValue,pageValueStr,userId){
	/*��ֵ����*/
	cityCode = cityCode == undefined ? '' : cityCode;
	applyEventSource = applyEventSource == undefined ? '1' : applyEventSource;
	applyEvent = applyEvent == undefined ? '0' : applyEvent;
	step = step == undefined ? '1' : step;
	serviceKind = serviceKind == undefined ? '0' : serviceKind;
	queryFlag = queryFlag == undefined ? '1' : queryFlag;
	queryValue = queryValue == undefined ? '' : queryValue;
	otherValue = otherValue == undefined ? '' : otherValue;
	userId = userId == undefined ? '0' : userId;
	/*���˫��Ӧ�õ�·���������ļ��û�������*/
	var result;
	var paramters = "";
   	result = executeRequest("doubleScreenAction","getServicePromptPath",paramters);
   	if(result.split("~")[0]!="1"){
   		return false;
   	}
	/*������ʾ����*/
	var leftWidth = screen.width;
	var param = "&cityCode="+cityCode+"&applyEventSource="+applyEventSource+"&applyEvent="+applyEvent+"&step="+step+"&serviceKind="+serviceKind+"&queryFlag="+queryFlag+"&queryValue="+queryValue+"&otherValue="+otherValue+"&userId="+userId+pageValueStr;
	promptWindow=open(result.split("~")[1]+param,"��ӭ��","top=0,left="+leftWidth+",captionbar=no,menubar=no,toolbar=no,location=no,directories=no,statusbar=no,resizable=no,scrollbars=no,titlebar=no,width=1024,height=768,depended=yes");
}