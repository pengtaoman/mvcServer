/**
 *ҳ������ѯ���ύ�����ð�ť�Ŀ�ݼ�
 *ͨ����body��onkeydown�¼��е����������
 *operType��ҳ��������ͣ�����ǲ�ѯ��������query��������ύ��������commit����������ò�������reset
 *methodName��ҳ��ĳ��������Ҫִ�е�js����������
 *webPath:webӦ�õĸ�·��
 *���磺
 *		ĳ��ҳ���в�ѯ��ť���õ�js����������Ϊquery()����ô�ڵ���ʱд���ǣ�onkeydown="nas_shortcut_key('query','query()',{root/create/path})"
 */
function nas_shortcut_key(operType,methodName,webPath){
	if (operType == 'query' && event.ctrlKey && event.keyCode == 74){  //��ѯ��ݼ� "ctrl+J"
		event.keyCode=0;
		eval(methodName);
		event.returnValue=false;
    }    	
	if (operType == 'commit' && event.ctrlKey && event.keyCode == 75){  //�ύ��ݼ� "ctrl+K"
		event.keyCode=0;
		eval(methodName);
		event.returnValue=false;
    }  	
	if (operType == 'reset' && event.ctrlKey && event.keyCode == 71){  //���ÿ�ݼ� "ctrl+G"
		event.keyCode=0;
		eval(methodName);
		event.returnValue=false;
    }
    nas_global_shortcut(webPath);
}