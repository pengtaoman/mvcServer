/*
 * <p>Title:       简单的标题</p>
 * <p>Description: 稍详细的说明</p>
 * <p>Copyright:   Copyright (c) 2004</p>
 * <p>Company:     东软软件股份有限公司</p>
 */
package com.neusoft.om.dao.employeeroledisplay;

import com.neusoft.tdframework.common.data.ObjectCollection;

public class OwnAndAssignedRoleDispColl extends ObjectCollection
{
    public void AddOwnAndAssignedRoleDisp(OwnAndAssignedRoleDispVO vo){
        addElement(vo);
    }
    /**
     * 根据行号获取area
     * @param index
     */
    public OwnAndAssignedRoleDispVO getOwnAndAssignedRoleDisp(int index) {
        return (OwnAndAssignedRoleDispVO)getElement(index);
    }
    
    public void removeOwnAndAssignedRoleDisp(int index){
        removeElement(index);
    }
}
