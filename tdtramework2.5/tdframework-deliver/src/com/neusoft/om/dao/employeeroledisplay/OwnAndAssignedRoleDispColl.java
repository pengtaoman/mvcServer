/*
 * <p>Title:       �򵥵ı���</p>
 * <p>Description: ����ϸ��˵��</p>
 * <p>Copyright:   Copyright (c) 2004</p>
 * <p>Company:     ��������ɷ����޹�˾</p>
 */
package com.neusoft.om.dao.employeeroledisplay;

import com.neusoft.tdframework.common.data.ObjectCollection;

public class OwnAndAssignedRoleDispColl extends ObjectCollection
{
    public void AddOwnAndAssignedRoleDisp(OwnAndAssignedRoleDispVO vo){
        addElement(vo);
    }
    /**
     * �����кŻ�ȡarea
     * @param index
     */
    public OwnAndAssignedRoleDispVO getOwnAndAssignedRoleDisp(int index) {
        return (OwnAndAssignedRoleDispVO)getElement(index);
    }
    
    public void removeOwnAndAssignedRoleDisp(int index){
        removeElement(index);
    }
}
