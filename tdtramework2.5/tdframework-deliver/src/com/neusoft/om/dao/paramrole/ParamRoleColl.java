/*
 * �������� 2006-7-12
 *
 * TODO Ҫ���Ĵ����ɵ��ļ���ģ�壬��ת��
 * ���� �� ��ѡ�� �� Java �� ������ʽ �� ����ģ��
 */
package com.neusoft.om.dao.paramrole;

import com.neusoft.tdframework.common.data.ObjectCollection;

/**
 * @author Administrator
 *
 * TODO Ҫ���Ĵ����ɵ�����ע�͵�ģ�壬��ת��
 * ���� �� ��ѡ�� �� Java �� ������ʽ �� ����ģ��
 */
public class ParamRoleColl extends ObjectCollection {

    public void addParamRole(ParamRoleVO vo){
		addElement(vo);
	}
	public ParamRoleVO getParamRole(int index) {
		return (ParamRoleVO)getElement(index);
	}
	
	/**
	 * �ж��Ƿ���Ӧ��ɫ��ʶ�Ľ�ɫ
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
