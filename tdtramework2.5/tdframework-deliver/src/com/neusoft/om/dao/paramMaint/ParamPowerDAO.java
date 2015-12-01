/*
 * 创建日期 2006-7-12
 *
 * TODO 要更改此生成的文件的模板，请转至
 * 窗口 － 首选项 － Java － 代码样式 － 代码模板
 */
package com.neusoft.om.dao.paramMaint;

import com.neusoft.popedom.ParamPowerInfoCollection;
import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

/**
 * @author Administrator
 *
 * TODO 要更改此生成的类型注释的模板，请转至
 * 窗口 － 首选项 － Java － 代码样式 － 代码模板
 */
public interface ParamPowerDAO extends BaseDao{
    
    public static final String BEAN = "parampowerDAO";
    

    public ParamPowerInfoCollection getParamPowerInfoColl(String executeSql,String [] params) throws DataAccessException;
    
    public int executeUpdate(String executeSql) throws DataAccessException;
   
    
}
