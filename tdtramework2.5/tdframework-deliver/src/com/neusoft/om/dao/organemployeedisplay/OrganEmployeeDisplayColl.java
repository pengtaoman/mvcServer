/*
 * <p>Title:       �򵥵ı���</p>
 * <p>Description: ����ϸ��˵��</p>
 * <p>Copyright:   Copyright (c) 2004</p>
 * <p>Company:     ��������ɷ����޹�˾</p>
 */
package com.neusoft.om.dao.organemployeedisplay;

import com.neusoft.om.dao.employee.EmployeeVO;
import com.neusoft.tdframework.common.data.ObjectCollection;

public class OrganEmployeeDisplayColl extends ObjectCollection
{
    public void addOrganEmployeeDisplay(OrganEmployeeDisplayVO vo){
        addElement(vo);
    }
    public OrganEmployeeDisplayVO getOrganEmployeeDisplay(int index) {
        return (OrganEmployeeDisplayVO)getElement(index);
    }

}
