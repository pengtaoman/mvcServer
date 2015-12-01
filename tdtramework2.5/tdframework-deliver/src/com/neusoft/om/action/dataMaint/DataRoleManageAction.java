package com.neusoft.om.action.dataMaint;

import java.util.StringTokenizer;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.common.ParamObjectCollection;
import com.neusoft.common.SysException;
import com.neusoft.om.dao.employee.EmployeeDAO;
import com.neusoft.om.dao.employee.EmployeeVO;
import com.neusoft.om.dao.paramMaint.ParamCommonTool;
import com.neusoft.om.dao.paramMaint.ParamPowerMaint;
import com.neusoft.om.dao.paramrole.ParamRoleColl;
import com.neusoft.om.dao.paramrole.ParamRoleDAO;
import com.neusoft.popedom.City;
import com.neusoft.popedom.CityCollection;
import com.neusoft.popedom.CityMaint;
import com.neusoft.popedom.ParamPowerInfo;
import com.neusoft.popedom.ParamPowerInfoCollection;
import com.neusoft.tdframework.authorization.AuthorizeVO;
import com.neusoft.tdframework.common.util.NullProcessUtil;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.web.struts.BaseAction;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;

/**
 * brief description
 * <p>
 * Date : 2004-11-01
 * </p>
 * <p>
 * Module : om
 * </p>
 * <p>
 * Description: 行政区域维护
 * </p>
 * <p>
 * Remark :
 * </p>
 * 
 * @author renh
 * @version
 *         <p>
 *         ------------------------------------------------------------
 *         </p>
 *         <p>
 *         修改历史
 *         </p>
 *         <p>
 *         序号 日期 修改人 修改原因
 *         </p>
 *         <p>
 *         1
 *         </p>
 */

public class DataRoleManageAction extends BaseAction {
	public ActionForward service(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws ActionException {
		String oprType = NullProcessUtil.nvlToString(request
				.getParameter("oprType"), "init");
		request.setAttribute("oprType", oprType);
		if (oprType.equals("init")) {
			return getDataRolePower(mapping, request, response);
		}

		else if (oprType.equals("query")) {
			return query(mapping, request, response);
		} else if (oprType.equals("update")) {
			return update(mapping, request, response);
		}else if(oprType.trim().equals("showEmpPower")){
			return showEmpParamPower(mapping, request, response);
		}else if(oprType.trim().equals("queryEmpPower")){
			return queryEmpPower(mapping, request,response);
		}
		else {
			return mapping.findForward("result");
		}
	}

	public ActionForward getDataRolePower(ActionMapping mapping,
			HttpServletRequest request, HttpServletResponse response) {
		AuthorizeVO authVO = getAuthorize(request);
		String cityCode = authVO.getCityCode();
		String roleId = request.getParameter("roleId");// authVO.("roleId");

		// 把cityCode和roleId存入session，供update()修改用
		//request.getSession().setAttribute("cityCode", cityCode);
		request.getSession().setAttribute("roleId", roleId);

		ParamObjectCollection tableObjCol = ParamCommonTool.getParamTable();
		request.getSession().setAttribute("tableObjCol", tableObjCol);
		String table_name = "";
		if (tableObjCol != null)
			table_name = tableObjCol.getParamObject(0).getIds();
		String if_city = "false";
		CityCollection cityColl = null;
		ParamPowerInfoCollection allInfoCol = null;
		if (table_name.intern() == "bm_city_id_t".intern()) {
			if_city = "true";
			cityColl = CityMaint.getCityAllInfoByParamId(cityCode, Integer
					.parseInt(roleId), table_name);
			request.setAttribute("CityColl", cityColl);
		} else {
			allInfoCol = ParamCommonTool.getAllTableData(table_name, cityCode,
					Integer.parseInt(roleId));
			request.getSession().setAttribute("allInfoCol", allInfoCol);
		}
		request.setAttribute("selected", table_name);
		request.setAttribute("if_city", if_city);
		return mapping.findForward("showPower");

	}

	/**
	 * 查询行政区域
	 * 
	 * @param mapping
	 * @param request
	 * @param response
	 * @return
	 */
	private ActionForward query(ActionMapping mapping,
			HttpServletRequest request, HttpServletResponse response) {
		AuthorizeVO authVO = getAuthorize(request);
		String cityCode = authVO.getCityCode();
		String roleId = (String) request.getSession().getAttribute("roleId");// authVO.("roleId");
		String table_name = (String) request.getParameter("tableName");

		String if_city = "false";
		CityCollection cityColl = null;
		ParamPowerInfoCollection allInfoCol = null;
		if (table_name.intern() == "bm_city_id_t".intern()) {
			if_city = "true";
			cityColl = CityMaint.getCityAllInfoByParamId(cityCode, Integer
					.parseInt(roleId), table_name);
			request.setAttribute("CityColl", cityColl);
		} else {
			allInfoCol = ParamCommonTool.getAllTableData(table_name, cityCode,
					Integer.parseInt(roleId));
			request.getSession().setAttribute("allInfoCol", allInfoCol);
		}

		request.setAttribute("selected", table_name);
		request.setAttribute("if_city", if_city);
		return mapping.findForward("showPower");

	}

	private ActionForward update(ActionMapping mapping,
			HttpServletRequest request, HttpServletResponse response) {

		String errorMessage = "修改成功!";
		String cityCode = (String)request.getSession().getAttribute("CityCode");
		String roleId = (String) request.getSession().getAttribute("roleId");
		String tableName = (String) request.getParameter("tableName");
		String deleteString = (String) request.getParameter("deleteString");
		String addString = (String) request.getParameter("addString");

		if (tableName.intern() == "bm_city_id_t".intern()) {
			try {
				CityMaint.updateCityRole(cityCode, tableName, Integer
						.parseInt(roleId), deleteString, addString);
			} catch (SysException syse) {
				syse.printStackTrace();
				errorMessage = syse.getMessage();
			}
			CityCollection cityColl = CityMaint.getCityAllInfoByParamId(
					cityCode, Integer.parseInt(roleId), tableName);
			request.setAttribute("CityColl", cityColl);
			request.setAttribute("if_city", "true");
		} else {
			StringTokenizer tok = new StringTokenizer(deleteString, "-");
			int indexNum = tok.countTokens();
			int delIndex[] = new int[indexNum];
			int i = 0;
			while (tok.hasMoreTokens()) {
				delIndex[i] = Integer.parseInt(tok.nextToken());
				i++;
			}

			tok = new StringTokenizer(addString, "-");
			indexNum = tok.countTokens();
			int addIndex[] = new int[indexNum];
			i = 0;
			while (tok.hasMoreTokens()) {
				addIndex[i] = Integer.parseInt(tok.nextToken());
				i++;
			}
			ParamPowerInfoCollection allInfoCol = (ParamPowerInfoCollection) request
					.getSession().getAttribute("allInfoCol");
			try {
				ParamPowerMaint.updateParamRolePower(cityCode, Integer
						.parseInt(roleId), delIndex, addIndex, allInfoCol);
			} catch (SysException e) {
				errorMessage = e.getMessage();
			}

			for (i = 0; i < delIndex.length; i++) {
				allInfoCol.getParamPowerInfo(delIndex[i]).setCheck_option(1);
			}
			for (i = 0; i < addIndex.length; i++) {
				allInfoCol.getParamPowerInfo(addIndex[i]).setCheck_option(0);
			}

		}
		request.setAttribute("errorMessage", errorMessage);
		request.setAttribute("selected", tableName);

		return mapping.findForward("showPower");
	}

	private ActionForward showEmpParamPower(ActionMapping mapping,
			HttpServletRequest request, HttpServletResponse response) {		
		String employeeId = request.getParameter("employeeId");
		
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        EmployeeDAO employeeDao = (EmployeeDAO) factory.getInteractionObject("employeeDAO", appContext);
	    EmployeeVO empVO = employeeDao.getEmployeeInfoById(employeeId);
		String cityCode = empVO.getCityCode();//request.getParameter("cityCode");
		
		// 把cityCode和roleId存入session，供update()修改用
		//request.getSession().setAttribute("cityCode", cityCode);
		request.getSession().setAttribute("paramEmp", employeeId);

		ParamObjectCollection tableObjCol = ParamCommonTool.getParamTable();
		request.getSession().setAttribute("tableObjCol", tableObjCol);
		String table_name = "";
		if (tableObjCol != null)
			table_name = tableObjCol.getParamObject(0).getIds();
		table_name = "bb_innet_method_t";
		String if_city = "false";
		CityCollection cityColl = null;
		ParamPowerInfoCollection allInfoCol = null;
		if (table_name.intern() == "bm_city_id_t".intern()) {
			if_city = "true";
			cityColl = CityMaint.getCityAllInfoByAccId(cityCode, employeeId);
			request.setAttribute("CityColl", cityColl);
		} else {
			allInfoCol = ParamPowerMaint.getDataRolePower(employeeId,table_name);
			request.getSession().setAttribute("allInfoCol", allInfoCol);
		}

		request.setAttribute("selected", table_name);
		request.setAttribute("if_city", if_city);
		request.setAttribute("employeeId",employeeId);
		return mapping.findForward("showEmpParamPower");
	}
	
	private ActionForward queryEmpPower(ActionMapping mapping,
			HttpServletRequest request, HttpServletResponse response) {
		AuthorizeVO authVO = getAuthorize(request);
		String cityCode = authVO.getCityCode();
		//String authEmpId = authVO.getEmployeeId();
		String employeeId = request.getParameter("employeeId");
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        ParamRoleDAO paramRoleDAO = (ParamRoleDAO) factory.getInteractionObject("paramroleDAO", appContext);
        ParamRoleColl paramColl = paramRoleDAO.getParamRoleInfoByEmployeeId(employeeId);
		String table_name = (String) request.getParameter("tableName");
		String if_city = "false";
		CityCollection cityColl = new CityCollection();
		ParamPowerInfoCollection allInfoCol = new ParamPowerInfoCollection();
			
		if (table_name.intern() == "bm_city_id_t".intern()) {
			if_city = "true";
			for(int i =0 ; i < paramColl.getRowCount(); i ++){
				int roleId = paramColl.getParamRole(i).getRoleId();
				CityCollection tempCityColl = CityMaint.getCityAllInfoByParamId(cityCode, roleId, table_name);
				cityColl = getUnionCity(cityColl, tempCityColl);
				request.setAttribute("CityColl", cityColl);	
			}			
		} else {
			for(int i =0 ; i < paramColl.getRowCount(); i ++){
				int roleId = paramColl.getParamRole(i).getRoleId();
				ParamPowerInfoCollection tempAllInfoCol = ParamCommonTool.getAllTableData(table_name, cityCode,roleId);
				allInfoCol = getUnionParamPower(allInfoCol, tempAllInfoCol);
				request.getSession().setAttribute("allInfoCol", allInfoCol);
			}
		}

		request.setAttribute("selected", table_name);
		request.setAttribute("if_city", if_city);
		request.setAttribute("employeeId", employeeId);
		return mapping.findForward("showEmpParamPower");

	}
	private CityCollection getUnionCity(CityCollection cityColl1, CityCollection cityColl2){
		CityCollection cityColl = new CityCollection();
		cityColl = cityColl1;
		for(int i=0; i < cityColl2.getRowCount(); i ++){
			City city = cityColl2.getCity(i);
			if(!hasExist(city, cityColl)){
				cityColl.addCity(city);
			}
		}
		return cityColl;
	}
	private boolean hasExist(City city, CityCollection cityColl){
		boolean exist = false;
		for(int i=0; i < cityColl.getRowCount(); i ++){
			City tempCity = cityColl.getCity(i);
			if(city.getCity_code().equals(tempCity.getCity_code())){
				exist = true;
			}
		}
		return exist;
	}
	private ParamPowerInfoCollection getUnionParamPower
		(ParamPowerInfoCollection powerColl1, ParamPowerInfoCollection powerColl2){
		ParamPowerInfoCollection powerColl = new  ParamPowerInfoCollection();
		powerColl = powerColl1;
		for(int i=0; i < powerColl2.getRowCount();i++){
			ParamPowerInfo power = powerColl2.getParamPowerInfo(i);
			if(!hasExist(power, powerColl)){
				powerColl.addParamPowerInfo(power);
			}
		}
		return powerColl;
	}
	private boolean hasExist(ParamPowerInfo power, ParamPowerInfoCollection powerColl){
		boolean exist = false;
		for(int i=0; i < powerColl.getRowCount(); i++){
			ParamPowerInfo tempPower = powerColl.getParamPowerInfo(i);
			if(power.getId()== tempPower.getId() ||(power.getIds() != null && 
					!power.getIds().trim().equals("") &&power.getIds().equals(tempPower.getIds()))){
				exist = true;
			}
		}		
		return exist;
	}
}
