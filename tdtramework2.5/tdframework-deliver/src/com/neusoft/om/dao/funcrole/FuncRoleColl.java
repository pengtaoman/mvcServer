package com.neusoft.om.dao.funcrole;

import com.neusoft.om.dao.funcrole.FuncRoleVO;
import com.neusoft.tdframework.common.data.ObjectCollection;
/**
 * Title: 功能角色
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
	 * 根据行号获取area
	 * @param index
	 */
	public FuncRoleVO getFuncRole(int index) {
		return (FuncRoleVO)getElement(index);
	}
	/**根据menuId得到功能角色信息
	 * @param menuId
	 * @return
	 */
	public FuncRoleVO getFuncRoleByMenuId(String menuId){
		return (FuncRoleVO)getElement(menuId);	
	}
}
