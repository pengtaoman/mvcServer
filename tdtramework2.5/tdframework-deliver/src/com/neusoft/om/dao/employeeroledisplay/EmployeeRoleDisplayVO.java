/*
 * <p>Title:       当前职员角色和被维护职员具有角色信息的融合</p>
 * <p>Description: 此vo专门用于在职员赋权时显示当前职员具有管理权限的角色和被维护的职员对此角色的权限类型（使用权，管理权）</p>
 * <p>Copyright:   Copyright (c) 2004</p>
 * <p>Company:     东软软件份有限公司</p>
 */
package com.neusoft.om.dao.employeeroledisplay;

import com.neusoft.tdframework.common.data.BaseVO;
import com.neusoft.tdframework.common.util.NullProcessUtil;
import com.neusoft.tdframework.common.util.StringUtil;

public class EmployeeRoleDisplayVO extends BaseVO
{
        private int roleId; //角色编码
        private String roleName; //角色名称
        private int usableFlag;  //是否具有使用权
        private int adminFlag;    //是否具有管理权限

        /**
            空的构造方法
        */
        public EmployeeRoleDisplayVO(){

        }
        /**
            通过属性值构造一个对象
        */
        public EmployeeRoleDisplayVO( int roleId, String roleName, int usableFlag, int adminFlag){

        }
        /**
            通过一个已有对象构造一个对象
        */
        public EmployeeRoleDisplayVO(EmployeeRoleDisplayVO other){
            if(this != other) {
                this.roleId = other.roleId;
                this.roleName = other.roleName;
                this.usableFlag = other.usableFlag;
                this.adminFlag = other.adminFlag;

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
            
            return ret.toString();
        }

}
