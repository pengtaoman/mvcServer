package com.neusoft.om.dao.role; 

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

public class RoleVO extends BaseVO { 
    private int roleId; //��ɫ����
    private int roleType;   //1���ܽ�ɫ��2���ݽ�ɫ
    private String  roleName;   //��ɫ����
    private String  createAreaId;   //��������
    private int ifDefault;  //�Ƿ�Ĭ���иý�ɫȨ��
    private String  creater;  //������
    private int dutyId; //ְ�����
    private String desc; //����
    
    /*
     * yangxg 20060630 ���ӽ�ɫ��ʾ
     */
    
     private int f_usable_flag;//�Ƿ���ʹ��Ȩ��
     private int f_admin_flag;//�Ƿ��з���Ȩ��
     private int f_if_creater;//�Ƿ��Ǵ�����
    /**
     * @return ���� if_creater��
     */
    public String getIf_creater() {
        return if_creater;
    }
    /**
     * @param if_creater Ҫ���õ� if_creater��
     */
    public void setIf_creater(String if_creater) {
        this.if_creater = if_creater;
    }
     private String if_creater;//������ʾ
    /**
        �յĹ��췽��
    */
    public RoleVO(){

    }
    /**
        ͨ������ֵ����һ������
    */
    public RoleVO(int roleId, int roleType, String roleName, String createAreaId, int ifDefault, String owner, int dutyId, String desc){

    }
    /**
        ͨ��һ�����ж�����һ������
    */
    public RoleVO(RoleVO other){
        if(this != other) {
            this.roleId = other.roleId;
            this.roleType = other.roleType;
            this.roleName = other.roleName;
            this.createAreaId = other.createAreaId;
            this.ifDefault = other.ifDefault;
            this.creater = other.creater;
            this.dutyId = other.dutyId;
            this.desc = other.desc;

        }
    }
    /** 
        ��ֵ����
    */
    private String nvl(String str) {
        return str==null?"":str;
    }

    /**
        ���ý�ɫ����
    */
    public void setRoleId(int roleId) {
        this.roleId = roleId;
    }
    /**
        ��ȡ��ɫ����
    */
    public int getRoleId() {
        return (this.roleId);
    }
    /**
        ����1���ܽ�ɫ��2���ݽ�ɫ
    */
    public void setRoleType(int roleType) {
        this.roleType = roleType;
    }
    /**
        ��ȡ1���ܽ�ɫ��2���ݽ�ɫ
    */
    public int getRoleType() {
        return (this.roleType);
    }
    /**
        ���ý�ɫ����
    */
    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }
    /**
        ��ȡ��ɫ����
    */
    public String getRoleName() {
        return (this.roleName);
    }
    /**
        ���ô�������
    */
    public void setCreateAreaId(String createAreaId) {
        this.createAreaId = createAreaId;
    }
    /**
        ��ȡ��������
    */
    public String getCreateAreaId() {
        return (this.createAreaId);
    }
    /**
        �����Ƿ�Ĭ���иý�ɫȨ��
    */
    public void setIfDefault(int ifDefault) {
        this.ifDefault = ifDefault;
    }
    /**
        ��ȡ�Ƿ�Ĭ���иý�ɫȨ��
    */
    public int getIfDefault() {
        return (this.ifDefault);
    }
    /**
        ���ô�����
    */
    public void setCreater(String creater) {
        this.creater = creater;
    }
    /**
        ��ȡ������
    */
    public String getCreater() {
        return (this.creater);
    }
    /**
        ����ְ�����
    */
    public void setDutyId(int dutyId) {
        this.dutyId = dutyId;
    }
    /**
        ��ȡְ�����
    */
    public int getDutyId() {
        return (this.dutyId);
    }

    public int getF_admin_flag() {
		return f_admin_flag;
	}
	public void setF_admin_flag(int f_admin_flag) {
		this.f_admin_flag = f_admin_flag;
	}
	public int getF_if_creater() {
		return f_if_creater;
	}
	public void setF_if_creater(int f_if_creater) {
		this.f_if_creater = f_if_creater;
	}
	public int getF_usable_flag() {
		return f_usable_flag;
	}
	public void setF_usable_flag(int f_usable_flag) {
		this.f_usable_flag = f_usable_flag;
	}
	
	public String getDesc() {
		return desc;
	}
	public void setDesc(String desc) {
		this.desc = desc;
	}
	/**
        ��SQL�Ľ������������
    */
    public void setAttribute(ResultSet resultSet) throws SQLException {
        ResultSetMetaData metaData = resultSet.getMetaData();

        for(int i=1;i<=metaData.getColumnCount();i++) { 

            String columnName = metaData.getColumnName(i).toLowerCase();

            if(columnName.intern()=="f_role_id".intern())
                roleId = resultSet.getInt(i);
            else if(columnName.intern()=="f_role_type".intern())
                roleType = resultSet.getInt(i);
            else if(columnName.intern()=="f_role_name".intern())
                roleName = resultSet.getString(i);
            else if(columnName.intern()=="f_create_area_id".intern())
                createAreaId = resultSet.getString(i);
            else if(columnName.intern()=="f_if_default".intern())
                ifDefault = resultSet.getInt(i);
            else if(columnName.intern()=="f_creater".intern())
                creater = resultSet.getString(i);
            else if(columnName.intern()=="f_duty_id".intern())
                dutyId = resultSet.getInt(i);
            else if(columnName.intern()=="f_admin_flag".intern())
            	f_admin_flag = resultSet.getInt(i);
            else if(columnName.intern()=="f_if_creater".intern())
                 {
            	   f_if_creater = resultSet.getInt(i);
            	   if(f_if_creater==1)
            	       if_creater="��";
            	   else
            	       if_creater="��";
                 }
            else if(columnName.intern()=="f_usable_flag".intern())
            	f_usable_flag = resultSet.getInt(i);
            else if(columnName.intern()=="f_desc".intern()){
            	desc = resultSet.getString(i);
            }
        }

    }

    /**
    * ͨ��MAP��ʼ����Ϣ
    */
    public void setAttribute(java.util.HashMap map)throws NumberFormatException {
        roleId = Integer.parseInt(NullProcessUtil.nvlToString(
            map.get("roleId"), "-10"));
        roleType = Integer.parseInt(NullProcessUtil.nvlToString(
            map.get("roleType"), "-10"));
        roleName = NullProcessUtil.nvlToString(
            map.get("roleName"),"");
        createAreaId = NullProcessUtil.nvlToString(
            map.get("createAreaId"),"");
        ifDefault = Integer.parseInt(NullProcessUtil.nvlToString(
            map.get("ifDefault"), "-10"));
        creater = NullProcessUtil.nvlToString(
            map.get("owner"),"");
        dutyId = Integer.parseInt(NullProcessUtil.nvlToString(
            map.get("dutyId"), "-10"));
        desc =  NullProcessUtil.nvlToString(map.get("desc"),"");
    }

    /**
        ת�����ַ���
    */
    public String toString(int tabs) {
        StringBuffer ret = new StringBuffer();
        String str_tab = StringUtil.tabs(tabs);
        ret.append("<roleId>").append(roleId).append("</roleId>\n");
        ret.append(str_tab).append("<roleType>").append(roleType).append("</roleType>\n");
        ret.append(str_tab).append("<roleName>").append(nvl(roleName)).append("</roleName>\n");
        ret.append(str_tab).append("<createAreaId>").append(nvl(createAreaId)).append("</createAreaId>\n");
        ret.append(str_tab).append("<ifDefault>").append(ifDefault).append("</ifDefault>\n");
        ret.append(str_tab).append("<creater>").append(nvl(creater)).append("</creater>\n");
        ret.append(str_tab).append("<dutyId>").append(dutyId).append("</dutyId>\n");
        return ret.toString();
    }
    
}

