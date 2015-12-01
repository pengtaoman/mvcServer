/*
 * 创建日期 2006-7-12
 *
 * TODO 要更改此生成的文件的模板，请转至
 * 窗口 － 首选项 － Java － 代码样式 － 代码模板
 */
package com.neusoft.om.dao.paramrole;

import com.neusoft.tdframework.common.data.ObjectCollection;

/**
 * @author Administrator
 *
 * TODO 要更改此生成的类型注释的模板，请转至
 * 窗口 － 首选项 － Java － 代码样式 － 代码模板
 */
public class ParamRoleColl extends ObjectCollection {

    public void addParamRole(ParamRoleVO vo){
		addElement(vo);
	}
	public ParamRoleVO getParamRole(int index) {
		return (ParamRoleVO)getElement(index);
	}
	
	/**
	 * 判断是否相应角色标识的角色
	 * @param roleId
	 * @return
	 */
	public boolean isExists(int roleId) {
		boolean exist = false;
		for(int i=0; i <this.getRowCount();i++){
			ParamRoleVO vo = this.getParamRole(i);
			if(vo.getRoleId() == roleId){
				exist = true;
			}
		}
		return exist;
		
	}
}
