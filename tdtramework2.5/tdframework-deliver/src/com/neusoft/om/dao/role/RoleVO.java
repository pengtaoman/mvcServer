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
    private int roleId; //角色编码
    private int roleType;   //1功能角色；2数据角色
    private String  roleName;   //角色名称
    private String  createAreaId;   //创建地市
    private int ifDefault;  //是否默认有该角色权利
    private String  creater;  //创建者
    private int dutyId; //职务编码
    private String desc; //描述
    
    /*
     * yangxg 20060630 增加角色表示
     */
    
     private int f_usable_flag;//是否有使用权限
     private int f_admin_flag;//是否有分配权限
     private int f_if_creater;//是否是创建者
    /**
     * @return 返回 if_creater。
     */
    public String getIf_creater() {
        return if_creater;
    }
    /**
     * @param if_creater 要设置的 if_creater。
     */
    public void setIf_creater(String if_creater) {
        this.if_creater = if_creater;
    }
     private String if_creater;//用于显示
    /**
        空的构造方法
    */
    public RoleVO(){

    }
    /**
        通过属性值构造一个对象
    */
    public RoleVO(int roleId, int roleType, String roleName, String createAreaId, int ifDefault, String owner, int dutyId, String desc){

    }
    /**
        通过一个已有对象构造一个对象
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
        空值处理
    */
    private String nvl(String str) {
        return str==null?"":str;
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
    /**
        设置1功能角色；2数据角色
    */
    public void setRoleType(int roleType) {
        this.roleType = roleType;
    }
    /**
        获取1功能角色；2数据角色
    */
    public int getRoleType() {
        return (this.roleType);
    }
    /**
        设置角色名称
    */
    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }
    /**
        获取角色名称
    */
    public String getRoleName() {
        return (this.roleName);
    }
    /**
        设置创建地市
    */
    public void setCreateAreaId(String createAreaId) {
        this.createAreaId = createAreaId;
    }
    /**
        获取创建地市
    */
    public String getCreateAreaId() {
        return (this.createAreaId);
    }
    /**
        设置是否默认有该角色权利
    */
    public void setIfDefault(int ifDefault) {
        this.ifDefault = ifDefault;
    }
    /**
        获取是否默认有该角色权利
    */
    public int getIfDefault() {
        return (this.ifDefault);
    }
    /**
        设置创建者
    */
    public void setCreater(String creater) {
        this.creater = creater;
    }
    /**
        获取创建者
    */
    public String getCreater() {
        return (this.creater);
    }
    /**
        设置职务编码
    */
    public void setDutyId(int dutyId) {
        this.dutyId = dutyId;
    }
    /**
        获取职务编码
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
        以SQL的结果集设置数据
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
            	       if_creater="是";
            	   else
            	       if_creater="否";
                 }
            else if(columnName.intern()=="f_usable_flag".intern())
            	f_usable_flag = resultSet.getInt(i);
            else if(columnName.intern()=="f_desc".intern()){
            	desc = resultSet.getString(i);
            }
        }

    }

    /**
    * 通过MAP初始化信息
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
        转化成字符串
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

