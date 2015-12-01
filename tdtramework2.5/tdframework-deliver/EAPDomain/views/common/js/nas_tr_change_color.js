/**
 * <p>Name: nas_tr_change_color.js</p>
 * <p>Description: 选中列表中某行后变色的函数</p>
 * <p>AppArea: CRM系统公用</p>
 * @author liyj@neusoft.com
 * @version 1.0
**/
/**
参数含义：
selectedObj：上一次选中的行对象
seletedColor：上一次选中的行对象的颜色
obj：当前选中的行对象
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