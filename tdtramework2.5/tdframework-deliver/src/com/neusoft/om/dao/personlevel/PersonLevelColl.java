/*
 * <p>Title:       简单的标题</p>
 * <p>Description: 稍详细的说明</p>
 * <p>Copyright:   Copyright (c) 2004</p>
 * <p>Company:     东软软件股份有限公司</p>
 */
package com.neusoft.om.dao.personlevel;

import java.sql.ResultSet;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.ObjectCollection;

public class PersonLevelColl extends ObjectCollection 
{
    
    static final long serialVersionUID = 0;
    
    public void addPersonLevel(PersonLevelVO vo) {
        addElement(vo);
    }
    
    public PersonLevelVO getPersonLevel(int index){
        return (PersonLevelVO)getElement(index);
    }
    
    public void addPersonLevelResultSet(ResultSet resultSet) throws SQLException {
        while(resultSet.next()) {
            PersonLevelVO vo = new PersonLevelVO(); 
            vo.setAttribute(resultSet);
            addPersonLevel (vo);
        }
    }
    
    public void removePersonLevel(int index){
        removeElement(index);
    }

}
