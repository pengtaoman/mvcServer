package com.neusoft.om.dao.employeerolerelation; 

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.BaseVO;
import com.neusoft.tdframework.common.util.NullProcessUtil;
import com.neusoft.tdframework.common.util.StringUtil;

/**
 * Title:
 * Description:
 * Company: neusoft
 * Date: 2006-06-10
 * @author ren.hui@neusoft.com
 * @version
 */

public class EmployeeRoleRelationVO extends BaseVO { 
    private String  employeeId; //职员编码
    private int roleId; //角色编码
    private int usableFlag;  //是否具有使用权
    private int adminFlag;    //是否具有管理权限
    private String roleName;
    private String employeeName;

    /**
        空的构造方法
    */
    public EmployeeRoleRelationVO(){

    }
    /**
        通过属性值构造一个对象
    */
    public EmployeeRoleRelationVO(String employeeId, int roleId, int usableFlag,
            int adminFlag, String roleName, String employeeName){

    }
    /**
        通过一个已有对象构造一个对象
    */
    public EmployeeRoleRelationVO(EmployeeRoleRelationVO other){
        if(this != other) {
            this.employeeId = other.employeeId;
            this.roleId = other.roleId;
            this.usableFlag = other.usableFlag;
            this.adminFlag = other.adminFlag;
            this.roleName = other.roleName;
            this.employeeName = other.employeeName;

        }
    }
    /** 
        空值处理
    */
    private String nvl(String str) {
        return str==null?"":str;
    }

    /**
        设置职员编码
    */
    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }
    /**
        获取职员编码
    */
    public String getEmployeeId() {
        return (this.employeeId);
    }
    /**
        设置角色编码
    */
    public void setRoleId(int roleId) {
        this.roleId = roleId;
    }
    /**
        获取角色编码
    */
    public int getRoleId() {
        return (this.roleId);
    }


    public int getAdminFlag()
    {
        return adminFlag;
    }
    public void setAdminFlag(int adminFlag)
    {
        this.adminFlag = adminFlag;
    }
    public int getUsableFlag()
    {
        return usableFlag;
    }
    public void setUsableFlag(int usableFlag)
    {
        this.usableFlag = usableFlag;
    }
    
    public String getEmployeeName()
    {
        return employeeName;
    }
    public void setEmployeeName(String employeeName)
    {
        this.employeeName = employeeName;
    }
    public String getRoleName()
    {
        return roleName;
    }
    public void setRoleName(String roleName)
    {
        this.roleName = roleName;
    }
    /**
        以SQL的结果集设置数据
    */
    public void setAttribute(ResultSet resultSet) throws SQLException {
        ResultSetMetaData metaData = resultSet.getMetaData();

        for(int i=1;i<=metaData.getColumnCount();i++) { 

            String columnName = metaData.getColumnName(i).toLowerCase();

            if(columnName.intern()=="f_employee_id".intern())
                employeeId = resultSet.getString(i);
            else if(columnName.intern()=="f_role_id".intern())
                roleId = resultSet.getInt(i);
            else if(columnName.intern()=="f_usable_flag".intern())
                usableFlag = resultSet.getInt(i);
            else if(columnName.intern()=="f_admin_flag".intern())
                adminFlag = resultSet.getInt(i);
        }

    }

    /**
    * 通过MAP初始化信息
    */
    public void setAttribute(java.util.HashMap map)throws NumberFormatException {
        employeeId = NullProcessUtil.nvlToString(
            map.get("employeeId"),"");
        roleId = Integer.parseInt(NullProcessUtil.nvlToString(
            map.get("roleId"), "-10"));
        usableFlag = Integer.parseInt(NullProcessUtil.nvlToString(
            map.get("usableFlag"), "-10"));
        adminFlag = Integer.parseInt(NullProcessUtil.nvlToString(
                map.get("adminFlag"), "-10"));
    }

    /**
        转化成字符串
    */
    public String toString(int tabs) {
        StringBuffer ret = new StringBuffer();
        String str_tab = StringUtil.tabs(tabs);
        ret.append("<employeeId>").append(nvl(employeeId)).append("</employeeId>\n");
        ret.append(str_tab).append("<roleId>").append(roleId).append("</roleId>\n");
        ret.append(str_tab).append("<usableFlag>").append(usableFlag).append("</usableFlag>\n");
        ret.append(str_tab).append("<adminFlag>").append(adminFlag).append("</adminFlag>\n");
        ret.append(str_tab).append("<employeeName>").append(employeeName).append("</employeeName>\n");
        ret.append(str_tab).append("<roleName>").append(roleName).append("</roleName>\n");
        return ret.toString();
    }

}