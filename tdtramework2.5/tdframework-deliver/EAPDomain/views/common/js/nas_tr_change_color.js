/**
 * <p>Name: nas_tr_change_color.js</p>
 * <p>Description: ѡ���б���ĳ�к��ɫ�ĺ���</p>
 * <p>AppArea: CRMϵͳ����</p>
 * @author liyj@neusoft.com
 * @version 1.0
**/
/**
�������壺
selectedObj����һ��ѡ�е��ж���
seletedColor����һ��ѡ�е��ж������ɫ
obj����ǰѡ�е��ж���
*/
var selectedObj;
var selectedColor;
function trChangeColor(obj){
    if(selectedObj!= null){ 
        selectedObj.style.backgroundColor = selectedColor;
    }
    selectedObj = obj;
    selectedColor = obj.style.backgroundColor;    
    obj.style.backgroundColor = "#FFFFE9";
}