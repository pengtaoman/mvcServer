/*
 * <p>Title:       ר����ְԱ��Ȩʱ��ɫ��Ϣչʾ��collection</p>
 * <p>Description: ����ϸ��˵��</p>
 * <p>Copyright:   Copyright (c) 2004</p>
 * <p>Company:     ��������ɷ����޹�˾</p>
 */
package com.neusoft.om.dao.employeeroledisplay;


import com.neusoft.tdframework.common.data.ObjectCollection;

public class EmployeeRoleDisplayColl extends ObjectCollection
{
    public void addEmployeeRoleDisplay(EmployeeRoleDisplayVO vo){
        addElement(vo);
    }
    /**
     * �����кŻ�ȡarea
     * @param index
     */
    public EmployeeRoleDisplayVO getEmployeeRoleDisplay(int index) {
        return (EmployeeRoleDisplayVO)getElement(index);
    }
    
    public void removeEmployeeRoleDisplay(int index){
        removeElement(index);
    }
}
