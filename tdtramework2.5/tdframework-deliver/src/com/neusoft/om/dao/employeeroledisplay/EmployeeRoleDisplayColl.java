/*
 * <p>Title:       专用于职员赋权时角色信息展示的collection</p>
 * <p>Description: 稍详细的说明</p>
 * <p>Copyright:   Copyright (c) 2004</p>
 * <p>Company:     东软软件股份有限公司</p>
 */
package com.neusoft.om.dao.employeeroledisplay;


import com.neusoft.tdframework.common.data.ObjectCollection;

public class EmployeeRoleDisplayColl extends ObjectCollection
{
    public void addEmployeeRoleDisplay(EmployeeRoleDisplayVO vo){
        addElement(vo);
    }
    /**
     * 根据行号获取area
     * @param index
     */
    public EmployeeRoleDisplayVO getEmployeeRoleDisplay(int index) {
        return (EmployeeRoleDisplayVO)getElement(index);
    }
    
    public void removeEmployeeRoleDisplay(int index){
        removeElement(index);
    }
}
