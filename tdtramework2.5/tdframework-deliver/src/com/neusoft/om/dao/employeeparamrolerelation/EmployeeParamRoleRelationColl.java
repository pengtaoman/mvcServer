/*
 * 创建日期 2006-7-12
 *
 * TODO 要更改此生成的文件的模板，请转至
 * 窗口 － 首选项 － Java － 代码样式 － 代码模板
 */
package com.neusoft.om.dao.employeeparamrolerelation;

import com.neusoft.om.dao.employeeparamrolerelation.EmployeeParamRoleRelationVO;
import com.neusoft.tdframework.common.data.ObjectCollection;

/**
 * @author Administrator
 *
 * TODO 要更改此生成的类型注释的模板，请转至
 * 窗口 － 首选项 － Java － 代码样式 － 代码模板
 */
public class EmployeeParamRoleRelationColl extends ObjectCollection{

    public void addEmployeeParamRoleRelation(EmployeeParamRoleRelationVO vo){
		addElement(vo);
	}
	public EmployeeParamRoleRelationVO getEmployeeParamRoleRelation(int index) {
		return (EmployeeParamRoleRelationVO)getElement(index);
	}

}
