/*
 * �������� 2006-7-12
 *
 * TODO Ҫ���Ĵ����ɵ��ļ���ģ�壬��ת��
 * ���� �� ��ѡ�� �� Java �� ������ʽ �� ����ģ��
 */
package com.neusoft.om.dao.employeeparamrolerelation;

import com.neusoft.om.dao.employeeparamrolerelation.EmployeeParamRoleRelationVO;
import com.neusoft.tdframework.common.data.ObjectCollection;

/**
 * @author Administrator
 *
 * TODO Ҫ���Ĵ����ɵ�����ע�͵�ģ�壬��ת��
 * ���� �� ��ѡ�� �� Java �� ������ʽ �� ����ģ��
 */
public class EmployeeParamRoleRelationColl extends ObjectCollection{

    public void addEmployeeParamRoleRelation(EmployeeParamRoleRelationVO vo){
		addElement(vo);
	}
	public EmployeeParamRoleRelationVO getEmployeeParamRoleRelation(int index) {
		return (EmployeeParamRoleRelationVO)getElement(index);
	}

}
