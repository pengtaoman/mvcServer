/*
 * �������� 2006-7-12
 *
 * TODO Ҫ���Ĵ����ɵ��ļ���ģ�壬��ת��
 * ���� �� ��ѡ�� �� Java �� ������ʽ �� ����ģ��
 */
package com.neusoft.om.dao.paramMaint;

import com.neusoft.popedom.ParamPowerInfoCollection;
import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

/**
 * @author Administrator
 *
 * TODO Ҫ���Ĵ����ɵ�����ע�͵�ģ�壬��ת��
 * ���� �� ��ѡ�� �� Java �� ������ʽ �� ����ģ��
 */
public interface ParamPowerDAO extends BaseDao{
    
    public static final String BEAN = "parampowerDAO";
    

    public ParamPowerInfoCollection getParamPowerInfoColl(String executeSql,String [] params) throws DataAccessException;
    
    public int executeUpdate(String executeSql) throws DataAccessException;
   
    
}
