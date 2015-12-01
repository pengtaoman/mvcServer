dojo.require("unieap.global");
dojo.require("unieap.util.util");
dojo.require("unieap.dialog.DialogUtil");

/*
 * ��������
 * ҳ�����ӣ�windowUrl �Ի������ݵ����ӵ�ַ
 * ҳ����⣺windowTitle �Ի���ı��� 
 * ҳ��߶ȣ�winHeight �Ի���ĸ߶�
 * ҳ���ȣ�winWidth �Ի���Ŀ��
 * ���������setData �����ڴ��ݵ��������ڵĶ��� ��������{object} �� {name:"param1",value:"param2"}
 * �رջص���isComplete ������ϽǵĹرհ�ťʱ���Ƿ���ûص����� ֵΪ true ��false
 * �ص�������funcName �Ի���رյĻص�����
 */

function openWinDialog(windowUrl,windowTitle,winHeight,winWidth,setData,isComplete,funcName){
	
	var dialog = DialogUtil.showDialog(
	{
		url:windowUrl,
		title:windowTitle,
		height:winHeight,
		width:winWidth,
		dialogData:setData,
		onComplete:funcName,
		iconCloseComplete: isComplete
	});
	
}