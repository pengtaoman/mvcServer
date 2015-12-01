/*
 * <p>Title:       简单的标题</p>
 * <p>Description: 稍详细的说明</p>
 * <p>Copyright:   Copyright (c) 2004</p>
 * <p>Company:     东软软件股份有限公司</p>
 */
package com.neusoft.om.dao.employeeroledisplay;

import com.neusoft.tdframework.common.data.BaseVO;
import com.neusoft.tdframework.common.util.NullProcessUtil;
import com.neusoft.tdframework.common.util.StringUtil;

public class OwnAndAssignedRoleDispVO extends BaseVO
{
    private int roleId; //角色编码
    private String roleName; //角色名称
    private int owner; //是否创建者
    private int usableFlag;  //是否具有使用权
    private int adminFlag;    //是否具有管理权限

    /**
        空的构造方法
    */
    public OwnAndAssignedRoleDispVO(){

    }
    /**
        通过属性值构造一个对象
    */
    public OwnAndAssignedRoleDispVO( int roleId, String roleName, int usableFlag,
            int adminFlag, String owner){

    }
    /**
        通过一个已有对象构造一个对象
    */
    public OwnAndAssignedRoleDispVO(OwnAndAssignedRoleDispVO other){
        if(this != other) {
            this.roleId = other.roleId;
            this.roleName = other.roleName;
            this.usableFlag = other.usableFlag;
            this.adminFlag = other.adminFlag;
            this.owner = other.owner;

        }
    }
    /** 
        空值处理
    */
    private String nvl(String str) {
        return str==null?"":str;
    }

    public int getAdminFlag()
    {
        return adminFlag;
    }
    public void setAdminFlag(int adminFlag)
    {
        this.adminFlag = adminFlag;
    }
    public int getRoleId()
    {
        return roleId;
    }
    public void setRoleId(int roleId)
    {
        this.roleId = roleId;
    }
    public String getRoleName()
    {
        return roleName;
    }
    public void setRoleName(String roleName)
    {
        this.roleName = roleName;
    }
    public int getUsableFlag()
    {
        return usableFlag;
    }
    public void setUsableFlag(int usableFlag)
    {
        this.usableFlag = usableFlag;
    }

    public int getOwner()
    {
        return owner;
    }
    public void setOwner(int owner)
    {
        this.owner = owner;
    }
    /**
    * 通过MAP初始化信息
    */
    public void setAttribute(java.util.HashMap map)throws NumberFormatException {
        roleName = NullProcessUtil.nvlToString(
            map.get("roleName"),"");
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
        ret.append(str_tab).append("<roleId>").append(roleId).append("</roleId>\n");
        ret.append(str_tab).append("<roleName>").append(nvl(roleName)).append("</roleName>\n");
        ret.append(str_tab).append("<usableFlag>").append(usableFlag).append("</usableFlag>\n");
        ret.append(str_tab).append("<adminFlag>").append(adminFlag).append("</adminFlag>\n");
        ret.append(str_tab).append("<owner>").append(owner).append("</owner>\n");
        return ret.toString();
    }

}
