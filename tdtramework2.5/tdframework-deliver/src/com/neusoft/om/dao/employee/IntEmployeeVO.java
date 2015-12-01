package com.neusoft.om.dao.employee;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.BaseVO;

/**
 * Title:
 * Description:
 * Company: neusoft
 * Date: 2008-08-15
 * @author zhaof@neusoft.com
 * @version
 */

public class IntEmployeeVO extends BaseVO { 
    private String  employeeName;   //ְԱ����
    private String  workNo; //��¼�˺�
    private String  workPwd;    //��¼����
    private int operType;//������ʶ
    private int pickStatus; //״̬
   
    /**
        �յĹ��췽��
    */
    public IntEmployeeVO(){
    }
    /** 
        ��ֵ����
    */
    private String nvl(String str) {
        return str==null?"":str;
    }

	/**
	 * @return the employeeName
	 */
	public String getEmployeeName() {
		return employeeName;
	}
	/**
	 * @param employeeName the employeeName to set
	 */
	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}
	/**
	 * @return the operType
	 */
	public int getOperType() {
		return operType;
	}
	/**
	 * @param operType the operType to set
	 */
	public void setOperType(int operType) {
		this.operType = operType;
	}
	/**
	 * @return the pickStatus
	 */
	public int getPickStatus() {
		return pickStatus;
	}
	/**
	 * @param pickStatus the pickStatus to set
	 */
	public void setPickStatus(int pickStatus) {
		this.pickStatus = pickStatus;
	}
	/**
	 * @return the workNo
	 */
	public String getWorkNo() {
		return workNo;
	}
	/**
	 * @param workNo the workNo to set
	 */
	public void setWorkNo(String workNo) {
		this.workNo = workNo;
	}
	/**
	 * @return the workPwd
	 */
	public String getWorkPwd() {
		return workPwd;
	}
	/**
	 * @param workPwd the workPwd to set
	 */
	public void setWorkPwd(String workPwd) {
		this.workPwd = workPwd;
	}
	/**
        ��SQL�Ľ������������
    */
    public void setAttribute(ResultSet resultSet) throws SQLException {
        ResultSetMetaData metaData = resultSet.getMetaData();

        for(int i=1;i<=metaData.getColumnCount();i++) { 

            String columnName = metaData.getColumnName(i).toLowerCase();
            if(columnName.intern()=="f_employee_name".intern())
                employeeName = nvl(resultSet.getString(i));
            else if(columnName.intern()=="f_work_no".intern())
                workNo = nvl(resultSet.getString(i));
            else if(columnName.intern()=="f_work_pwd".intern())
                workPwd = nvl(resultSet.getString(i));
        	else if(columnName.intern()=="f_oper_type".intern())
        		operType = resultSet.getInt("f_oper_type");
        	else if(columnName.intern()=="pick_status".intern())
        		pickStatus = resultSet.getInt("pick_status");
        }
 
    }
}