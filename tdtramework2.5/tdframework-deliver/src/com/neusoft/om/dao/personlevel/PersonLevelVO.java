/*
 * <p>Title:       �򵥵ı���</p>
 * <p>Description: ����ϸ��˵��</p>
 * <p>Copyright:   Copyright (c) 2004</p>
 * <p>Company:     ��������ɷ����޹�˾</p>
 */
package com.neusoft.om.dao.personlevel;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import com.neusoft.tdframework.common.data.BaseVO;
import com.neusoft.tdframework.common.util.NullProcessUtil;
import com.neusoft.tdframework.common.util.StringUtil;

public class PersonLevelVO extends BaseVO
{
    private int levelCode;
    private String levelName;
    /**
    �յĹ��췽��
    */
    public PersonLevelVO(){
    
    }
    /**
        ͨ������ֵ����һ������
    */
    public PersonLevelVO(int levelCode, String levelName){
    
    }
    
    /**
         ͨ��һ�����ж�����һ������
    */
    public PersonLevelVO(PersonLevelVO other){
        if(this != other) {
            this.levelCode = other.levelCode;
            this.levelName = other.levelName;
        }
    }
    /** 
        ��ֵ����
    */
    private String nvl(String str) {
        return str==null?"":str;
    }
    public int getLevelCode()
    {
        return levelCode;
    }
    public void setLevelCode(int levelCode)
    {
        this.levelCode = levelCode;
    }
    public String getLevelName()
    {
        return levelName;
    }
    public void setLevelName(String levelName)
    {
        this.levelName = levelName;
    }
    
    /**
    * �������ַ���ת����Int
    * @param obj
    * @return
    */
    private int parseIntFromString(Object obj){
        String str = NullProcessUtil.nvlToString(obj, "0");
        if("".equals(str)){
        return 0;
        }
    return Integer.parseInt(str);
    }
    
    /**
        ��SQL�Ľ������������
    */
    public void setAttribute(ResultSet resultSet) throws SQLException {
        ResultSetMetaData metaData = resultSet.getMetaData();
    
        for(int i=1;i<=metaData.getColumnCount();i++) { 
    
            String columnName = metaData.getColumnName(i).toLowerCase();
    
            if(columnName.intern()=="f_level_code".intern())
                levelCode = resultSet.getInt(i);
            else if(columnName.intern()=="f_level_name".intern())
                levelName = resultSet.getString(i);
        }
    
    }
    /**
    * ͨ��MAP��ʼ����Ϣ
    */
    public void setAttribute(java.util.HashMap map)throws NumberFormatException {
        levelCode = parseIntFromString(
                map.get("levelCode"));
        levelName = NullProcessUtil.nvlToString(
            map.get("levelName"),"");
    }    
    /**
        ת�����ַ���
    */
    public String toString(int tabs) {
        StringBuffer ret = new StringBuffer();
        String str_tab = StringUtil.tabs(tabs);
        ret.append(str_tab).append("<levelCode>").append(levelCode).append("</levelCode>\n");
        ret.append("<levelName>").append(nvl(levelName)).append("</levelName>\n");        
        return ret.toString();
    }
    
}
