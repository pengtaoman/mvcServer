package com.neusoft.om.dao.funcrole;

import com.neusoft.om.dao.funcrole.FuncRoleVO;
import com.neusoft.tdframework.common.data.ObjectCollection;
/**
 * Title: ���ܽ�ɫ
 * Description: 
 * Company: neusoft
 * Date: 2004-12-07
 * @author renh
 * @version 
 */
public class FuncRoleColl extends ObjectCollection {

	public void addFuncRole(FuncRoleVO vo){
		addElement(vo);
	}
	/**
	 * �����кŻ�ȡarea
	 * @param index
	 */
	public FuncRoleVO getFuncRole(int index) {
		return (FuncRoleVO)getElement(index);
	}
	/**����menuId�õ����ܽ�ɫ��Ϣ
	 * @param menuId
	 * @return
	 */
	public FuncRoleVO getFuncRoleByMenuId(String menuId){
		return (FuncRoleVO)getElement(menuId);	
	}
}
