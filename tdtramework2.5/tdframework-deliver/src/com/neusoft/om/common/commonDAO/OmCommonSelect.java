package com.neusoft.om.common.commonDAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.data.ParamObject;
import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.dao.BaseDictionaryDAO;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;
/**
 * 
 * TDFramework2.0 常用数据通用类
 * 
 * @author yang-lm@neusoft.com
 * @version 1.0 Date 2006-11-22
 * @see java.lang.Class History: <author> <time> <version> <desc>
 */
public class OmCommonSelect extends BaseDictionaryDAO{
	public static final String BEAN = "omCommonSelect";
	/**
	 * 查询地市信息
	 * @return
	 * @throws DataAccessException
	 */
	public ParamObjectCollection getCityColl(int[] cityLevel) throws DataAccessException {
		
		try {
			StringBuffer strBuf = new StringBuffer();
			strBuf.append("select f_city_code,f_area_name from om_area_t where f_area_level in (");
			for(int i=0;i<cityLevel.length;i++){
				if(i==0){
					strBuf.append(cityLevel[i]);
				}else{
					strBuf.append(","+cityLevel[i]);
				}
			}
			strBuf.append(" ) order by f_city_code ");
			
			//System.out.println(strBuf.toString());
			
			return executeQuery(strBuf.toString(), "f_city_code","f_city_code","f_area_name",true);

		} catch (DataAccessException e) {
			SysLog.writeLogs("report", GlobalParameters.ERROR,
					"CrmReportSelectDAO--getCityColl():"+ e.getMessage());
			throw new DataAccessException(e);
		}
	}
	
	public ParamObjectCollection getCityColl(int cityLevel,String cityCode) throws DataAccessException {
		
		try {
			StringBuffer strBuf = new StringBuffer();
			if(cityLevel == 2){
				strBuf.append("select f_city_code,f_area_name from om_area_t ");
				strBuf.append("where f_area_level in (2,3) order by f_city_code ");
			}else if(cityLevel >= 3){
				strBuf.append("select f_city_code,f_area_name from om_area_t ");
				strBuf.append("where f_city_code = '"+cityCode+"' and f_area_level = 3 ");
				strBuf.append("order by f_city_code ");
			}else if(cityLevel == 1){
				strBuf.append("select f_city_code,f_area_name from om_area_t ");
				strBuf.append("where f_area_level in (1,2,3) ");
				strBuf.append("order by f_city_code ");
			}
			
			return executeQuery(strBuf.toString(), "f_city_code","f_city_code","f_area_name",true);

		} catch (DataAccessException e) {
			SysLog.writeLogs("report", GlobalParameters.ERROR,
					"CrmReportSelectDAO--getCityColl():"+ e.getMessage());
			throw new DataAccessException(e);
		}
	}
	/**
	 * 查询区县信息
	 * @return
	 * @throws DataAccessException
	 */
	public ParamObjectCollection getRegionColl(String sfCityCode,String cityCode) throws DataAccessException {
		
		try {
			StringBuffer strBuf = new StringBuffer();
			strBuf.append(" select f_area_id,f_area_name from (select f_area_id,f_area_name");
			strBuf.append(" from om_area_t where f_area_level = 4 and f_parent_area_id like '"+sfCityCode+"'");
			strBuf.append(" union all select f_area_id,f_area_name from om_area_t");
			strBuf.append(" where f_area_level = 3 and f_city_code like '"+cityCode+"') order by f_area_id");
			
			return executeQuery(strBuf.toString(), "f_area_id","f_area_id","f_area_name",true);

		} catch (DataAccessException e) {
			SysLog.writeLogs("report", GlobalParameters.ERROR,
					"CrmReportSelectDAO--getRegionColl():"+ e.getMessage());
			throw new DataAccessException(e);
		}
	}
	/**
	 * 查询获取营业厅信息
	 * @return
	 * @throws DataAccessException
	 */
	public ParamObjectCollection getDealerInfoColl(String cityCode,String regionId) throws DataAccessException {
		
		try {
			StringBuffer strBuf = new StringBuffer();
			strBuf.append(" SELECT BD_DEALER_T.DEALER_ID,BD_DEALER_T.DEALER_NAME FROM BD_DEALER_T ");
			strBuf.append(" WHERE CITY_CODE = '"+cityCode+"' AND DEALER_TYPE =1 ");
			strBuf.append(" AND REGION_CODE = '"+regionId+"'");
//			if(regionId!=null && !regionId.trim().equals("")){
//				strBuf.append(" AND REGION_CODE = '"+regionId+"'");
//			}
			strBuf.append(" ORDER BY BD_DEALER_T.DEALER_ID ASC");
			
			return executeQuery(strBuf.toString(), "dealer_id", "dealer_id","dealer_name",true);

		} catch (DataAccessException e) {
			SysLog.writeLogs("report", GlobalParameters.ERROR,
					"CrmReportSelectDAO--getDealerInfoColl():"+ e.getMessage());
			throw new DataAccessException(e);
		}
	}
	
	//获取营业厅类型
	public ParamObjectCollection getDealerKindInfoColl() throws DataAccessException {
		
		try {
			StringBuffer strBuf = new StringBuffer();
			strBuf.append(" SELECT kind, name FROM bd_dealer_kind_t ");
			return executeQuery(strBuf.toString(), "kind","kind", "name",true);

		} catch (DataAccessException e) {
			SysLog.writeLogs("report", GlobalParameters.ERROR,
					"CrmReportSelectDAO--getDealerInfoColl():"+ e.getMessage());
			throw new DataAccessException(e);
		}
	}
	public ParamObjectCollection getDealerInfoColl(String cityCode) throws DataAccessException {
		
		try {
			StringBuffer strBuf = new StringBuffer();
			strBuf.append(" SELECT BD_DEALER_T.DEALER_ID,BD_DEALER_T.DEALER_NAME FROM BD_DEALER_T ");
			strBuf.append(" WHERE CITY_CODE = '"+cityCode+"' AND DEALER_TYPE =1 ");
			strBuf.append(" ORDER BY BD_DEALER_T.DEALER_ID ASC");
			
			return executeQuery(strBuf.toString(), "dealer_id", "dealer_id","dealer_name",true);

		} catch (DataAccessException e) {
			SysLog.writeLogs("report", GlobalParameters.ERROR,
					"CrmReportSelectDAO--getDealerInfoColl():"+ e.getMessage());
			throw new DataAccessException(e);
		}
	}
	
	public ParamObjectCollection getDealerInfoCollByKind(String cityCode,String dealerKind) throws DataAccessException {
		
		try {
			StringBuffer strBuf = new StringBuffer();
			strBuf.append(" SELECT BD_DEALER_T.DEALER_ID,BD_DEALER_T.DEALER_NAME FROM BD_DEALER_T ");
			strBuf.append(" WHERE CITY_CODE = '"+cityCode+"' AND DEALER_TYPE =1 AND dealer_kind = '"+dealerKind+"'");
			strBuf.append(" ORDER BY BD_DEALER_T.DEALER_ID ASC");
			
			return executeQuery(strBuf.toString(), "dealer_id", "dealer_id","dealer_name",true);

		} catch (DataAccessException e) {
			SysLog.writeLogs("report", GlobalParameters.ERROR,
					"CrmReportSelectDAO--getDealerInfoColl():"+ e.getMessage());
			throw new DataAccessException(e);
		}
	}
	
	/**
	 * 查询获取操作员信息
	 * @return
	 * @throws DataAccessException
	 */
	public ParamObjectCollection getPersonInfoColl(String cityCode,String dealerId) throws DataAccessException {
		
		try {
			StringBuffer strBuf = new StringBuffer();
			strBuf.append(" SELECT f_employee_name,f_work_no FROM om_employee_t ");
			strBuf.append(" WHERE F_CITY_CODE = '"+cityCode+"' AND f_dealer_id = '"+dealerId+"'");
			strBuf.append(" ORDER BY f_work_no");
			
			return executeQuery(strBuf.toString(), "f_work_no", "f_employee_name");

		} catch (DataAccessException e) {
			SysLog.writeLogs("report", GlobalParameters.ERROR,
					"CrmReportSelectDAO--getPersonInfoColl():"+ e.getMessage());
			throw new DataAccessException(e);
		}
	}
	
	public ParamObjectCollection getOrganPersonColl(String cityCode,String organId) throws DataAccessException {
		
		try {
			StringBuffer strBuf = new StringBuffer();
			strBuf.append(" SELECT f_employee_name,f_work_no FROM om_employee_t ");
			strBuf.append(" WHERE F_CITY_CODE = '"+cityCode+"' AND f_organ_id = '"+organId+"'");
			strBuf.append(" ORDER BY f_work_no");
			
			return executeQuery(strBuf.toString(), "f_work_no", "f_employee_name");

		} catch (DataAccessException e) {
			SysLog.writeLogs("report", GlobalParameters.ERROR,
					"CrmReportSelectDAO--getPersonInfoColl():"+ e.getMessage());
			throw new DataAccessException(e);
		}
	}
	/**
	 * 查询服务类型信息
	 * @return
	 * @throws DataAccessException
	 */
	public ParamObjectCollection getServiceKindColl() throws DataAccessException {
		
		try {
			StringBuffer strBuf = new StringBuffer();
			strBuf.append("SELECT * FROM bs_service_kind_t WHERE service_flag = 3 and if_open = 1 order by service_kind");
			
			return executeQuery(strBuf.toString(), "service_kind","service_kind","service_name",true);

		} catch (DataAccessException e) {
			SysLog.writeLogs("billing", GlobalParameters.ERROR,
					"CrmReportSelectDAO--getServiceKindColl():"+ e.getMessage());
			throw new DataAccessException(e);
		}
	}
	
	public ParamObjectCollection getServiceKindColl(int[] serviceKind) throws DataAccessException {
		
		try {
			StringBuffer strBuf = new StringBuffer();
			strBuf.append(" SELECT * FROM bs_service_kind_t ");
			strBuf.append(" WHERE service_kind in (");
			for(int i=0;i<serviceKind.length;i++){
				if(i==0){
					strBuf.append(serviceKind[i]);
				}else{
					strBuf.append(","+serviceKind[i]);
				}
			}
			strBuf.append(" ) order by service_kind ");

			return executeQuery(strBuf.toString(), "service_kind","service_kind","service_name",true);

		} catch (DataAccessException e) {
			SysLog.writeLogs("billing", GlobalParameters.ERROR,
					"CrmReportSelectDAO--getServiceKindColl():"+ e.getMessage());
			throw new DataAccessException(e);
		}
	}
    
    /**
     * 查询全部服务类型信息(渠道专用查bd_service_kind_t)
     * @return
     * @throws DataAccessException
     */
    public ParamObjectCollection getChannelServiceKindColl() throws DataAccessException {
        
        try {
            StringBuffer strBuf = new StringBuffer();
            strBuf.append("SELECT service_kind,service_name FROM bd_service_kind_t WHERE if_open = 1 and service_kind in (8,9,22,23)");
            strBuf.append(" order by service_kind");
            return executeQuery(strBuf.toString(), "service_kind","service_kind","service_name",true);

        } catch (DataAccessException e) {
            SysLog.writeLogs("crm", GlobalParameters.ERROR,
                    "CrmReportSelectDAO--getChannelServiceKindColl():"+ e.getMessage());
            throw new DataAccessException(e);
        }
    }
    
    /**
     * 根据要求查询服务类型信息(渠道专用查bd_service_kind_t)
     * @return
     * @throws DataAccessException
     */
    public ParamObjectCollection getChannelServiceKindColl(int[] serviceKind) throws DataAccessException {
        
        try {
            StringBuffer strBuf = new StringBuffer();
            strBuf.append(" SELECT * FROM bd_service_kind_t ");
            strBuf.append(" WHERE service_kind in (");
            for(int i=0;i<serviceKind.length;i++){
                if(i==0){
                    strBuf.append(serviceKind[i]);
                }else{
                    strBuf.append(","+serviceKind[i]);
                }
            }
            strBuf.append(" ) order by service_kind ");

            return executeQuery(strBuf.toString(), "service_kind","service_kind","service_name",true);

        } catch (DataAccessException e) {
            SysLog.writeLogs("crm", GlobalParameters.ERROR,
                    "CrmReportSelectDAO--getChannelServiceKindColl():"+ e.getMessage());
            throw new DataAccessException(e);
        }
    }
    
	/**
	 * 查询部门信息
	 * @return
	 * @throws DataAccessException
	 */
	public ParamObjectCollection getOrganInfoColl() throws DataAccessException {
		
		try {
			StringBuffer strBuf = new StringBuffer();
			strBuf.append("select f_organ_id,f_organ_name from om_organ_t order by f_organ_id");
			
			return executeQuery(strBuf.toString(), "f_organ_id","f_organ_id","f_organ_name",true);

		} catch (DataAccessException e) {
			SysLog.writeLogs("billing", GlobalParameters.ERROR,
					"CrmReportSelectDAO--getOrganInfoColl():"+ e.getMessage());
			throw new DataAccessException(e);
		}
	}
	/**
	 * 查询渠道类别信息
	 * @return
	 * @throws DataAccessException
	 */
	public ParamObjectCollection getDealerTypeColl() throws DataAccessException {
		
		try {
			StringBuffer strBuf = new StringBuffer();
			strBuf.append("select dealer_type,dealer_type_name from bd_dealer_type_t where use_flag = 1 order by dealer_type");
			
			return executeQuery(strBuf.toString(), "dealer_type", "dealer_type","dealer_type_name",true);

		} catch (DataAccessException e) {
			SysLog.writeLogs("billing", GlobalParameters.ERROR,
					"CrmReportSelectDAO--getServiceKindColl():"+ e.getMessage());
			throw new DataAccessException(e);
		}
	}
	/**
	 * 查询渠道类型信息
	 * @return
	 * @throws DataAccessException
	 */
	public ParamObjectCollection getDealerKindColl(String dealerType) throws DataAccessException {
		
		try {
			StringBuffer strBuf = new StringBuffer();
			strBuf.append(" select dealer_kind,dealer_kind_name from bd_dealer_kind_main_t");
			strBuf.append(" where use_flag = 1 and dealer_type = '"+dealerType+"' order by dealer_kind");
			
			return executeQuery(strBuf.toString(), "dealer_kind", "dealer_kind","dealer_kind_name",true);

		} catch (DataAccessException e) {
			SysLog.writeLogs("billing", GlobalParameters.ERROR,
					"CrmReportSelectDAO--getServiceKindColl():"+ e.getMessage());
			throw new DataAccessException(e);
		}
	}
	/**
	 * 查询代理商信息
	 * @return
	 * @throws DataAccessException
	 */
	public ParamObjectCollection getDealerInfoColl(String cityCode,String regionCode,
			String dealerType,String dealerKind) throws DataAccessException {
		
		try {
			StringBuffer strBuf = new StringBuffer();
			strBuf.append(" SELECT BD_DEALER_T.DEALER_ID,BD_DEALER_T.DEALER_NAME FROM BD_DEALER_T ");
			strBuf.append(" WHERE CITY_CODE = '"+cityCode+"' AND DEALER_TYPE ='"+dealerType+"' ");
			strBuf.append(" AND REGION_CODE = '"+regionCode+"' AND DEALER_KIND = '"+dealerKind+"'");
//			if(regionId!=null && !regionId.trim().equals("")){
//				strBuf.append(" AND REGION_CODE = '"+regionId+"'");
//			}
			strBuf.append(" ORDER BY BD_DEALER_T.DEALER_ID ASC");
			
			return executeQuery(strBuf.toString(), "DEALER_ID", "DEALER_ID","DEALER_NAME",true);

		} catch (DataAccessException e) {
			SysLog.writeLogs("billing", GlobalParameters.ERROR,
					"CrmReportSelectDAO--getServiceKindColl():"+ e.getMessage());
			throw new DataAccessException(e);
		}
	}
	
	public ParamObjectCollection getCityDealerColl(String cityCode,String dealerType,
			String dealerKind) throws DataAccessException {
		
		try {
			StringBuffer strBuf = new StringBuffer();
			strBuf.append(" SELECT DEALER_ID,DEALER_NAME FROM BD_DEALER_MAIN_T ");
			strBuf.append(" WHERE CITY_CODE = '"+cityCode+"' AND DEALER_TYPE ='"+dealerType+"' ");
			strBuf.append(" AND DEALER_KIND like '"+dealerKind+"'");
			strBuf.append(" AND DEALER_STATUS=1");
			strBuf.append(" ORDER BY DEALER_ID ASC");
			
			return executeQuery(strBuf.toString(), "DEALER_ID", "DEALER_ID","DEALER_NAME",true);

		} catch (DataAccessException e) {
			SysLog.writeLogs("billing", GlobalParameters.ERROR,
					"CrmReportSelectDAO--getServiceKindColl():"+ e.getMessage());
			throw new DataAccessException(e);
		}
	}
	
	public ParamObjectCollection getCityDealerColl(String cityCode) 
		throws DataAccessException {		
		try {
			StringBuffer strBuf = new StringBuffer();
			strBuf.append(" SELECT BD_DEALER_T.DEALER_ID,BD_DEALER_T.DEALER_NAME FROM BD_DEALER_T ");
			strBuf.append(" WHERE CITY_CODE = '"+cityCode+"'");
			strBuf.append(" ORDER BY BD_DEALER_T.DEALER_ID ASC");
			
			return executeQuery(strBuf.toString(), "DEALER_ID", "DEALER_ID","DEALER_NAME",true);

		} catch (DataAccessException e) {
			SysLog.writeLogs("billing", GlobalParameters.ERROR,
					"CrmReportSelectDAO--getServiceKindColl():"+ e.getMessage());
			throw new DataAccessException(e);
		}
	}
	/**
	 * 查询结算入网方式信息
	 * @return
	 * @throws DataAccessException
	 */
	public ParamObjectCollection getInnetMethodColl(String cityCode,String serviceKind)
		throws DataAccessException {
		try {
			StringBuffer strBuf = new StringBuffer();
			strBuf.append(" select INNET_METHOD,NAME ");
			strBuf.append(" from bb_DEALER_INNET_METHOD_t ");
			strBuf.append(" where city_code = '"+cityCode+"' and service_kind = '"+serviceKind+"'");
			
			return executeQuery(strBuf.toString(), "INNET_METHOD", "INNET_METHOD","NAME",true);

		} catch (DataAccessException e) {
			SysLog.writeLogs("billing", GlobalParameters.ERROR,
					"CrmReportSelectDAO--getServiceKindColl():"+ e.getMessage());
			throw new DataAccessException(e);
		}
	}
	/**
	 * 查询主产品信息
	 * @return
	 * @throws DataAccessException
	 */
	public ParamObjectCollection getProdInfoColl(String cityCode,String serviceKind)
		throws DataAccessException {
		try {
			StringBuffer strBuf = new StringBuffer();
			strBuf.append(" SELECT a.f_prod_id,a.f_prod_name FROM PM_PRODUCT_T a ,PM_PRODUCT_AREA_T b ");
			strBuf.append(" WHERE  b.F_city_code = '"+cityCode+"' AND b.F_ACTIVE_DATE < SYSDATE ");
			strBuf.append(" AND b.F_INACTIVE_DATE > SYSDATE AND b.F_IF_USABLE = 1");
			strBuf.append(" AND a.F_PROD_ID = b.F_PROD_ID");
			strBuf.append(" AND a.F_PROD_TYPE = 1 AND a.F_SERVICE_KIND = '"+serviceKind+"'");
			
			return executeQuery(strBuf.toString(), "f_prod_id", "f_prod_id","f_prod_name",true);

		} catch (DataAccessException e) {
			SysLog.writeLogs("billing", GlobalParameters.ERROR,
					"CrmReportSelectDAO--getServiceKindColl():"+ e.getMessage());
			throw new DataAccessException(e);
		}
	}
	/**
	 * 查询客户群信息
	 * @return
	 * @throws DataAccessException
	 */
	public ParamObjectCollection getUserRoleColl(String cityCode,String serviceKind)
		throws DataAccessException {
		try {
			StringBuffer strBuf = new StringBuffer();
			strBuf.append(" SELECT a.kind,a.name FROM bs_user_role_t a,");
			strBuf.append(" bb_group_city_use_t b,bb_group_service_use_t c ");
			strBuf.append(" WHERE a.kind = b.service_group_id ");
			strBuf.append(" and a.kind = c.service_group_id and a.if_valid = 1");
			strBuf.append(" and b.if_valid = 1 and c.if_valid = 1 ");
			strBuf.append(" and b.use_city = '"+cityCode+"' and c.service_kind = '"+serviceKind+"'");
			
			return executeQuery(strBuf.toString(), "kind", "kind","name",true);

		} catch (DataAccessException e) {
			SysLog.writeLogs("billing", GlobalParameters.ERROR,
					"CrmReportSelectDAO--getServiceKindColl():"+ e.getMessage());
			throw new DataAccessException(e);
		}
	}
	
	public ParamObjectCollection getDutyColl()
		throws DataAccessException {
		StringBuffer buf = new StringBuffer();
		buf.append(" SELECT f_duty_id, f_duty_name FROM om_duty_t ORDER BY f_duty_id ");
		
		return executeQuery(buf.toString(), "f_duty_id", "f_duty_id", "f_duty_name", true);
	}
	
	public ParamObjectCollection getRoleColl(String areaLevel, String employeeId)
		throws DataAccessException {
		int area_level = Integer.parseInt(areaLevel);
		StringBuffer buf = new StringBuffer();
//		switch (iadminType){
//			case 0:
//				//普通人员
//				buf.append(" SELECT * from ( ");
//				buf.append(" SELECT b.f_role_id, b.f_role_name ");
//				buf.append(" FROM om_employee_role_relation_t a, om_role_t b ");
//				buf.append(" WHERE a.f_role_id = b.f_role_id ");  
//				buf.append(" AND a.f_admin_flag = 1 "); 
//				buf.append(" and b.f_status = 1 ");   
//				buf.append(" AND a.f_employee_id = '" + employeeId + "' ");  
//				buf.append(" UNION "); 
//				buf.append(" SELECT f_role_id, f_role_name ");
//				buf.append(" FROM om_role_t ");
//				buf.append(" WHERE f_status = 1 "); 
//				buf.append(" AND f_creater = '" + employeeId + "' )");
//				buf.append(" order by f_role_id  ");  
//				break;
//			case 1:
//				//特权管理
//				buf.append(" select f_role_id, f_role_name from om_role_t where f_status = 1 order by f_role_id ");
//				break;
//			case 2:
//				//普通管理员
//				buf.append(" SELECT * from ( ");
//				buf.append(" select a.f_role_id, a.f_role_name from om_role_t a,( ");
//				buf.append(" select f_employee_id ");
//				buf.append(" from om_employee_t where f_owner = '" + employeeId + "' ");
//				buf.append(" or f_employee_id = '" + employeeId + "' ) b ");
//				buf.append(" where a.f_creater = b.f_employee_id and a.f_status = 1 ");
//				buf.append(" union ");
//				buf.append(" select a.f_role_id, a.f_role_name from  om_role_t a,om_employee_role_relation_t b ");
//				buf.append(" where a.f_role_id = b.f_role_id and b.F_EMPLOYEE_ID = '" + employeeId + "' ");
//				buf.append(" and a.f_status = 1 and b.F_ADMIN_FLAG = 1 )");
//				buf.append(" order by f_role_id  ");  
//				break;
//			default:
//				buf.append(" select f_role_id, f_role_name from om_role_t where f_role_id is null ");
//			break;
//		}
		if(area_level > 2){
			//地市用户
			buf.append(" SELECT * from ( ");
			buf.append(" SELECT b.f_role_id, b.f_role_name ");
			buf.append(" FROM om_employee_role_relation_t a, om_role_t b ");
			buf.append(" WHERE a.f_role_id = b.f_role_id ");  
			buf.append(" AND a.f_admin_flag = 1 "); 
			buf.append(" and b.f_status = 1 ");   
			buf.append(" AND a.f_employee_id = '" + employeeId + "' ");  
			buf.append(" UNION "); 
			buf.append(" SELECT f_role_id, f_role_name ");
			buf.append(" FROM om_role_t ");
			buf.append(" WHERE f_status = 1 "); 
			buf.append(" AND f_creater = '" + employeeId + "' )");
			buf.append(" order by f_role_id  ");  
		}else{
			//省份用户
			buf.append(" select f_role_id, f_role_name from om_role_t where f_status = 1 order by f_role_id ");
		}
		
		return executeQuery(buf.toString(), "f_role_id", "f_role_id", "f_role_name", true);
	}
	
	/**
	 * 查询渠道佣金种类信息
	 * @return
	 * @throws DataAccessException
	 */
	public ParamObjectCollection getCommisionKindColl() throws DataAccessException {
		
		try {
			StringBuffer strBuf = new StringBuffer();
			strBuf.append("SELECT commision_kind_code ,commision_kind  FROM code_commision_kind");
			return executeQuery(strBuf.toString(), "commision_kind_code", "commision_kind_code","commision_kind",true);

		} catch (DataAccessException e) {
			SysLog.writeLogs("crm", GlobalParameters.ERROR,
					"CrmReportSelectDAO--getServiceKindColl():"+ e.getMessage());
			throw new DataAccessException(e);
		}
	}
	
    /**
     * <p>Description: 查询area_code表，获得地区信息</p>
     * <p>Remark: </p>
     * @param sql：查询语句
     * @param id：ID
     * @param param：用来对比的字段
     * @param copy：下拉框中的第一位显示值
     * @param name：下拉框中的第二位显示值 
     * @param copyControl：是否显示两如（188|石家庄）
     * @return
     * @throws DataAccessException
     */
    public ParamObjectCollection getAreaCodeColl(String sql, String id,
            String copy, String param, String name, boolean copyControl)
            throws DataAccessException {
        ParamObjectCollection coll = new ParamObjectCollection();
        Connection conn = null;
        PreparedStatement pst = null;
        ResultSet rest = null;
        try {
            conn = getConnection();
            pst = conn.prepareStatement(sql);
            rest = pst.executeQuery();
            while (rest.next()) {
                ParamObject obj = new ParamObject();
                if (copyControl) {
                    obj.setId(rest.getString(id));
                    if (rest.getInt(param) == 0) {//级别为0不加``
                        obj.setName(rest.getString(copy) + "|"
                                + rest.getString(name));
                    }
                    else if (rest.getInt(param) == 1) {//级别为1加`缩进
                        obj.setName("``" + rest.getString(copy) + "|"
                                + rest.getString(name));
                    }
                    else {
                        obj.setName("`````" + rest.getString(copy) + "|"
                                + rest.getString(name));
                    }
                }
                else {
                    obj.setId(rest.getString(id));
                    if (rest.getInt(param) == 0) {
                        obj.setName(rest.getString(name));
                    }
                    else if (rest.getInt(param) == 1) {
                        obj.setName("``" + rest.getString(name));
                    }
                    else {
                        obj.setName("`````" + rest.getString(name));
                    }
                }
                coll.addParamObject(obj);
            }
        }
        catch (SQLException e) {
            throw new DataAccessException(e);
        }
        finally {
            close(rest, pst, conn);
        }
        return coll;
    }
    
	/**
	 * 根据SQL参数查询下拉框信息
	 * @return
	 * @throws DataAccessException
	 */
	public ParamObjectCollection getSelectInfoColl(String sql,String param1,
			String param2,String param3) throws DataAccessException {
		
		try {
			if(param3.equals("false")){
				return executeQuery(sql,param1,param2);
			}else{
				return executeQuery(sql,param1,param3,param2);
			}
			

		} catch (DataAccessException e) {
			SysLog.writeLogs("billing", GlobalParameters.ERROR,
					"CrmReportSelectDAO--getServiceKindColl():"+ e.getMessage());
			throw new DataAccessException(e);
		}
	}
}


