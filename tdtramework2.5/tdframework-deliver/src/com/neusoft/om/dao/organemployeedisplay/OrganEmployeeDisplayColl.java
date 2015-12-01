/*
 * <p>Title:       简单的标题</p>
 * <p>Description: 稍详细的说明</p>
 * <p>Copyright:   Copyright (c) 2004</p>
 * <p>Company:     东软软件股份有限公司</p>
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
