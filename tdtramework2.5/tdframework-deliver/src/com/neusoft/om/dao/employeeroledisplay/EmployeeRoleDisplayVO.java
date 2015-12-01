/*
 * <p>Title:       ��ǰְԱ��ɫ�ͱ�ά��ְԱ���н�ɫ��Ϣ���ں�</p>
 * <p>Description: ��voר��������ְԱ��Ȩʱ��ʾ��ǰְԱ���й���Ȩ�޵Ľ�ɫ�ͱ�ά����ְԱ�Դ˽�ɫ��Ȩ�����ͣ�ʹ��Ȩ������Ȩ��</p>
 * <p>Copyright:   Copyright (c) 2004</p>
 * <p>Company:     ������������޹�˾</p>
 */
package com.neusoft.om.dao.employeeroledisplay;

import com.neusoft.tdframework.common.data.BaseVO;
import com.neusoft.tdframework.common.util.NullProcessUtil;
import com.neusoft.tdframework.common.util.StringUtil;

public class EmployeeRoleDisplayVO extends BaseVO
{
        private int roleId; //��ɫ����
        private String roleName; //��ɫ����
        private int usableFlag;  //�Ƿ����ʹ��Ȩ
        private int adminFlag;    //�Ƿ���й���Ȩ��

        /**
            �յĹ��췽��
        */
        public EmployeeRoleDisplayVO(){

        }
        /**
            ͨ������ֵ����һ������
        */
        public EmployeeRoleDisplayVO( int roleId, String roleName, int usableFlag, int adminFlag){

        }
        /**
            ͨ��һ�����ж�����һ������
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
            ��ֵ����
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
        * ͨ��MAP��ʼ����Ϣ
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
            ת�����ַ���
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
