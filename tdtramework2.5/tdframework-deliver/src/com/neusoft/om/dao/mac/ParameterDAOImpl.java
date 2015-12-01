package com.neusoft.om.dao.mac;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.dao.BaseDictionaryDAO;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;

public class ParameterDAOImpl extends BaseDictionaryDAO implements ParameterDAO{
    public ParameterDAOImpl() {
        super();
    }
    public ParamObjectCollection getDealerArea(String areaId) throws DataAccessException{
        try {
            StringBuffer strBuf = new StringBuffer();
           strBuf.append(" select distinct a.*" +
            		" from om_area_t a, om_organ_t b, bd_dealer_main_t c" +
            		" where a.f_area_id = b.f_area_id and b.f_organ_id = c.belongs_part" +
            		" order by a.f_area_level");  
//            strBuf.append("select distinct a.* from (SELECT * FROM OM_AREA_T a  start with f_area_id = '"+areaId+"' " +
//            		" CONNECT BY  PRIOR f_area_id =  f_parent_area_id ) a " +
//            		" start with a.f_area_id in  (select distinct a.f_area_id " +
//            		" from om_area_t a, om_organ_t b, bd_dealer_main_t c " +
//            		" where a.f_area_id=b.f_area_id and b.f_organ_id = c.belongs_part) " +
//            		" CONNECT BY   f_area_id = PRIOR  f_parent_area_id order by f_area_level");
            return executeQuery(strBuf.toString(), "f_area_id", "f_area_id", "f_area_name", true);
         } catch (DataAccessException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, 
         	   "ParameterDAOImpl--getDealerArea():" + e.getMessage());
            throw new DataAccessException(e);
         }
    }
    
    public ParamObjectCollection getDealerOrgan(String areaId) throws DataAccessException{
        try {
            StringBuffer strBuf = new StringBuffer();
            strBuf.append(" select distinct b.*" +
            		" from om_organ_t b, bd_dealer_main_t c" +
            		" where b.f_organ_id = c.belongs_part and b.f_area_id='"+areaId+"'" +
            		" order by b.f_organ_name");            
            return executeQuery(strBuf.toString(), "f_organ_id", "f_organ_id", "f_organ_name", true);
         } catch (DataAccessException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, 
         	   "ParameterDAOImpl--getDealerOrgan():" + e.getMessage());
            throw new DataAccessException(e);
         }
    }
    public ParamObjectCollection getDealer(String organId) throws DataAccessException{
        try {
            StringBuffer strBuf = new StringBuffer();
            strBuf.append(" select * from bd_dealer_main_t where belongs_part = '"+organId+"' order by dealer_name");            
            return executeQuery(strBuf.toString(), "dealer_id", "dealer_name", "dealer_id", true);
         } catch (DataAccessException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, 
         	   "ParameterDAOImpl--getDealer():" + e.getMessage());
            throw new DataAccessException(e);
         }
    }
}
