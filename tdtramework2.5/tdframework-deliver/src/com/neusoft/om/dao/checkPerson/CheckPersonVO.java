/**
 * 
 */
package com.neusoft.om.dao.checkPerson;

import java.sql.Date;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.BaseVO;

/***************************************************************
 * 程序名 : CheckPersonVO.java
 * 日期  : 2007-7-17
 * 作者  : sunchonggui@neusoft.com
 * 模块  : 
 * 描述  : 
 * 备注  : 
 * ------------------------------------------------------------
 * 修改历史
 * 序号  日期  修改人   修改原因
 * 1
 * 2
 ***************************************************************/
/**
 * @author wbsuncg
 *
 */
public class CheckPersonVO extends BaseVO { 

    /**
     * 
     */
    public CheckPersonVO() {
        super();
        // TODO Auto-generated constructor stub
    }

    private String fWorkNO; 
    private String checkFlag; 
    private String checkPerson; 
    private Date checkDate; 
    
    /** 
     * 以SQL的结果集设置数据 
     */ 
    public void setAttribute(ResultSet resultSet) throws SQLException { 
        ResultSetMetaData metaData = resultSet.getMetaData();
        for(int i=1;i<=metaData.getColumnCount();i++) {
            String columnNames = metaData.getColumnName(i).toLowerCase();
            if(columnNames.intern()=="f_work_no".intern())
                fWorkNO = resultSet.getString(i);
            if(columnNames.intern()=="check_flag".intern()){
                if(resultSet.getInt(i)==1){
                    checkFlag="已审核";
                }else{
                    checkFlag="未审核";
                }
                
            }
            if(columnNames.intern()=="check_person".intern())
                checkPerson = resultSet.getString(i); 
            if(columnNames.intern()=="check_date".intern())
                checkDate = resultSet.getDate(i);
        }
    }

    /**
     * @return Returns the checkDate.
     */
    public Date getCheckDate() {
        return checkDate;
    }

    /**
     * @param checkDate The checkDate to set.
     */
    public void setCheckDate(Date checkDate) {
        this.checkDate = checkDate;
    }

    /**
     * @return Returns the checkFlag.
     */
    public String getCheckFlag() {
        return checkFlag;
    }

    /**
     * @param checkFlag The checkFlag to set.
     */
    public void setCheckFlag(String checkFlag) {
        this.checkFlag = checkFlag;
    }

    /**
     * @return Returns the checkPerson.
     */
    public String getCheckPerson() {
        return checkPerson;
    }

    /**
     * @param checkPerson The checkPerson to set.
     */
    public void setCheckPerson(String checkPerson) {
        this.checkPerson = checkPerson;
    }

    /**
     * @return Returns the fWorkNO.
     */
    public String getfWorkNO() {
        return fWorkNO;
    }

    /**
     * @param workNo The fWorkNO to set.
     */
    public void setfWorkNO(String workNo) {
        fWorkNO = workNo;
    } 
   
}
