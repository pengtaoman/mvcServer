package com.neusoft.tdframework.web.taglibs;

import java.lang.reflect.Method;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.sql.DataSource;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.dao.StaticDatasourceAccessor;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.SysException;
import com.neusoft.tdframework.log.SysLog;

/** ��̬����ά������.
  * <p>Title: ParamClassMaint </p>
  * <p>Description: 
  		����ʵ�ֲ������ݻ�ȡ��ˢ��. �� servlet ����ֱ�ӵ���. </p>
  		ֻ���ǲ���ά���ĸ���. �ڱ�bm_param_class_t�����ò��������ˢ��ʱ���õķ���. 
  		�̳и���. ����getParamClassColl��ȡ��Ӧϵͳ����������. 
  		��servletֱ�ӵ�������̳е� resetParam ��������ˢ������.
  		
  * <p>Copyright: Copyright (c) 2002</p>
  * <p>Company: neusoft</p>
  * 
  * @author Chenzt
  * @version 1.0 
*/

public class ParamClassMaint{
	
	private static DataSource dataSource = null;

	/**
	 * description: 
	 * @param source
	 */
	public static void setDataSource(DataSource source) {
		dataSource = source;
	}
	
	/**
		����ϵͳID�������о�̬��������.
	*/
	
	public static ParamClassCollection getParamClassColl(int system_id) throws DataAccessException{
		
		ParamClassCollection paramClassColl = new ParamClassCollection();
		
		Connection        conn        = null ;
		PreparedStatement pstmt       = null ;
		ResultSet         rest        = null ;

		String sql = "select * from bm_param_class_t where system_id = ?";

		try {		
			conn = StaticDatasourceAccessor.getConnection(dataSource);
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1,system_id);
			rest = pstmt.executeQuery();

			while(rest.next()) {
				
				ParamClass paramClass = new ParamClass();
				
				paramClass.setParam_id(rest.getInt("param_id"));
				paramClass.setSystem_id(rest.getInt("system_id"));
				paramClass.setParam_name(rest.getString("param_name"));
				paramClass.setClass_name(rest.getString("class_name"));
				paramClass.setMethod_name(rest.getString("method_name"));
				paramClass.setIf_city_code(rest.getInt("if_city_code"));
				paramClass.setIf_service_kind(rest.getInt("if_service_kind"));
				paramClass.setIf_apply_event(rest.getInt("if_apply_event"));
				paramClass.setIf_sub_service_kind(rest.getInt("if_sub_service_kind"));
				
				paramClassColl.addParamClass(paramClass);
			}
		}
		catch(SQLException e) {
			e.printStackTrace();
		}
		finally{
			StaticDatasourceAccessor.close(rest,pstmt,conn);
		}		
		return paramClassColl;
	}
	
	
	/**
		����ˢ�²�������
	*/
	public static void resetParam (
			ParamClass paramClass,
			String city_code,int service_kind,int apply_event,int sub_service_kind)
			throws SysException {
		
		//���췽���Ĳ�������
		ArrayList array = new ArrayList();
		if(paramClass.getIf_city_code()==1) array.add(city_code);
		if(paramClass.getIf_service_kind()==1) array.add(new Integer(service_kind));
		if(paramClass.getIf_apply_event()==1) array.add(new Integer(apply_event));
		if(paramClass.getIf_sub_service_kind()==1) array.add(new Integer(sub_service_kind));
		
		Object[] params = array.toArray();
		
		//��ȡ��
		Class paramDefineClass = null;
		
		try{
			paramDefineClass = Class.forName(paramClass.getClass_name());
		}catch(ClassNotFoundException e){
			SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"ParamClassMaint-resetParam-1:"+e.getMessage());
			throw new SysException("���õĲ�����û���ҵ���" + paramClass.getClass_name());
		}
		
		//��ȡ����
		try{
			Method method = paramDefineClass.getDeclaredMethod(paramClass.getMethod_name(),paramClass.getMethodParams());
			method.invoke(null,params);
		}catch(Exception e){
			SysLog.writeLogs("tdframework",GlobalParameters.ERROR,"ParamClassMaint-resetParam-2:"+e.getMessage());
			throw new SysException(paramClass.getClass_name() + " �������ʧ�ܣ�" + paramClass.getMethod_name());
		}		
	}

	public static void main(String args[]){
			
	}

}
