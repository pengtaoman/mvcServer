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
 * ������ : CheckPersonVO.java
 * ����  : 2007-7-17
 * ����  : sunchonggui@neusoft.com
 * ģ��  : 
 * ����  : 
 * ��ע  : 
 * ------------------------------------------------------------
 * �޸���ʷ
 * ���  ����  �޸���   �޸�ԭ��
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
     * ��SQL�Ľ������������ 
     */ 
    public void setAttribute(ResultSet resultSet) throws SQLException { 
        ResultSetMetaData metaData = resultSet.getMetaData();
        for(int i=1;i<=metaData.getColumnCount();i++) {
            String columnNames = metaData.getColumnName(i).toLowerCase();
            if(columnNames.intern()=="f_work_no".intern())
                fWorkNO = resultSet.getString(i);
            if(columnNames.intern()=="check_flag".intern()){
                if(resultSet.getInt(i)==1){
                    checkFlag="�����";
                }else{
                    checkFlag="δ���";
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
