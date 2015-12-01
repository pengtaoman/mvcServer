package com.neusoft.om.interfase.authorize;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.neusoft.crm.channel.outInterface.om.dao.OmQueryDAOImpl;
import com.neusoft.om.OMAppContext;
import com.neusoft.om.dao.app.AppDAO;
import com.neusoft.om.dao.app.AppRoleRelColl;
import com.neusoft.om.dao.app.AppRoleRelVO;
import com.neusoft.om.dao.area.AreaColl;
import com.neusoft.om.dao.area.AreaDAO;
import com.neusoft.om.dao.area.AreaVO;
import com.neusoft.om.dao.common.SwitchDAO;
import com.neusoft.om.dao.duty.DutyDAO;
import com.neusoft.om.dao.duty.DutyVO;
import com.neusoft.om.dao.employee.EmployeeDAO;
import com.neusoft.om.dao.employee.EmployeeVO;
import com.neusoft.om.dao.menu.MenuColl;
import com.neusoft.om.dao.menu.MenuDAO;
import com.neusoft.om.dao.menu.MenuVO;
import com.neusoft.om.dao.omswitch.OmSwitchDAO;
import com.neusoft.om.dao.organ.OrganDAO;
import com.neusoft.om.dao.organ.OrganVO;
import com.neusoft.om.dao.paramrole.ParamRoleColl;
import com.neusoft.om.dao.paramrole.ParamRoleDAO;
import com.neusoft.om.dao.pwd.PwdValidDAO;
import com.neusoft.om.dao.pwd.PwdValidVO;
import com.neusoft.om.dao.role.RoleColl;
import com.neusoft.om.dao.role.RoleDAO;
import com.neusoft.om.dao.role.RoleVO;
import com.neusoft.om.dao.system.SystemDAO;
import com.neusoft.om.dao.work.WorkColl;
import com.neusoft.om.dao.work.WorkDAO;
import com.neusoft.om.omutil.OmUtilDAO;
import com.neusoft.om.omutil.PassWord;
import com.neusoft.tdframework.authorization.AuthorizeBO;
import com.neusoft.tdframework.authorization.AuthorizeVO;
import com.neusoft.tdframework.authorization.FrameMenuColl;
import com.neusoft.tdframework.authorization.FrameWorkColl;
import com.neusoft.tdframework.authorization.SystemColl;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.portal.config.TDConfigHelper;
import com.neusoft.tdframework.support.favorite.dao.FavoriteColl;
import com.neusoft.unieap.config.CacheConfig;
import com.neusoft.unieap.service.cache.ICacheManager;
import com.neusoft.unieap.service.cache.exception.CachingException;


/**brief description
 * <p>Date       : 2004-12-13</p>
 * <p>Module     : om</p>
 * <p>Description: 实现所有的权限与框架调用接口</p>
 * <p>Remark     : </p>
 * @author ren.hui@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */

public class AuthorizeBOImpl implements AuthorizeBO{
	private EmployeeDAO employeeDAO;
	private AreaDAO areaDAO;
	private OrganDAO organDAO;
	private DutyDAO dutyDAO;
	private OmSwitchDAO omSwitchDAO;
	private OmUtilDAO omUtilDAO;
	private PwdValidDAO pwdValidDAO;
	
	private SystemDAO systemDAO;
	private MenuDAO menuDAO;
	private WorkDAO workDAO;
    
    private ParamRoleDAO paramroleDAO;
    private AppDAO appDAO;
    private RoleDAO roleDAO;
    
    private SwitchDAO switchDAO;
    private OmQueryDAOImpl omQueryDAOInterface;
    
    private ICacheManager manager = CacheConfig.manager;
    private static Map switchMap;
    private static Map areaMap;
	/**
	 * 获得登陆账号认证信息:
	 * 返回认证信息放入OMAuthorizeVO中
	 * 通过vo中封装的getAuthorizeRest() 获得认证结果:
	 * 		0:失败
	 * 		1:成功,但密码实效,下一步应跳转到修改密码页面
	 * 		2:成功,但密码即将实效,可以进入系统,也可以条专去修改密码,应给出选择
	 * 		3.成功!
	 */
	public AuthorizeVO getAuthorizeInfo(String workNo,String workPwd) throws ServiceException {
		OMAuthorizeVO oMAuthorizeVO = null;
		AreaVO areaVO = new AreaVO();;
		EmployeeVO employeeVO = null;
		OrganVO organVO = new OrganVO();
		DutyVO dutyVO = null;
		PwdValidVO pwdValidVO = null;
		String popedomVerson = ""; //omSwitchDAO.getPopedomVersion();//得到权限系统的版本 hainan则表示海南版本，authorizevo中很多信息都不要。默认是河北，四川版本 2.0版本
		boolean needDealer = true; // omSwitchDAO.getIfNeedDealer();//从开关表中得到是否需要渠道信息的配置，用于确定用户登录时是否将dealerName放到session中

		try {
			switchMap = (Map)manager.peek("switchMap");
			if(switchMap==null || switchMap.isEmpty()){		
				popedomVerson =  omSwitchDAO.getPopedomVersion();
				needDealer = omSwitchDAO.getIfNeedDealer();
				switchMap = omSwitchDAO.getSwitchMap();				
				if(switchMap!=null && !switchMap.isEmpty()){       
					manager.putCacheObject("switchMap",switchMap);//将参数信息写到缓存中	
				}
			}else{
				popedomVerson = (String)switchMap.get("POPEDOM_VERSION");
				String needDealerString = (String)switchMap.get("F_NEED_DEALER");
				if(needDealerString!= null && needDealerString.intern() == "0".intern()){//只有等于零才表示不需要，其他值或者不配置均表示需要
					needDealer = false;
				}
			}
		} catch (CachingException e1) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AuthorizeBOImpl--getAuthorizeInfo-0:"+e1.getMessage());
			throw new ServiceException(e1);
		}//先在缓存中取参数信息
		oMAuthorizeVO = new OMAuthorizeVO();
		boolean ifMatchCase = true;
		//首先获得开关参数已得到登陆账号是否区分大小写
		try{
			switchMap = (Map)manager.peek("switchMap");
			if(switchMap==null || switchMap.isEmpty()){		
				ifMatchCase = omSwitchDAO.getIfMatchCase();
			}else{
				String ifMatchCaseString = (String)switchMap.get("F_DIFFERENTIATE");
				if(ifMatchCaseString!= null && ifMatchCaseString.intern() != "1".intern()){
					ifMatchCase = false;
				}
			}
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeManagementBOImpl--doAddEmployeeInfo-0:"+e.getMessage());
			throw new ServiceException(e);
		}catch(CachingException e1){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AuthorizeBOImpl--getAuthorizeInfo-0:"+e1.getMessage());
			throw new ServiceException(e1);
		}
		if(!ifMatchCase){ //如果不区分，需要将登陆账号转为大写
			workNo = workNo.toUpperCase();
		}
		//得到职员信息
		try {
			employeeVO = employeeDAO.getEmployeeInfoByWorkNo(workNo);
			
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AuthorizeBOImpl--getAuthorizeInfo-employeeVO:"+e.getMessage());
			throw new ServiceException(e);
		}
		int status = employeeVO.getStatus();
		if(employeeVO==null){
			oMAuthorizeVO.setAuthorizeResult(0);
			oMAuthorizeVO.setAuthorizeMessage("该账号不存在!");
			return oMAuthorizeVO;
		}else if(status != 0){
			oMAuthorizeVO.setAuthorizeResult(0);
			oMAuthorizeVO.setAuthorizeMessage("该帐号已停用!");
			return oMAuthorizeVO;
		}else {		
			oMAuthorizeVO.setEmployeeVO(employeeVO);
			oMAuthorizeVO.setCityCode(employeeVO.getCityCode());
			oMAuthorizeVO.setAdminType(employeeVO.getAdminType());
		}
		
		//密码是否正确
		String userPass = PassWord.decode(employeeVO.getWorkPwd());
	  	if(!userPass.equalsIgnoreCase(workPwd)){
			oMAuthorizeVO.setAuthorizeResult(0);
			oMAuthorizeVO.setAuthorizeMessage("密码错误!");
			return oMAuthorizeVO;
		}
	  	
	  	boolean checkApp = true;  
	  	try {
			switchMap = (Map)manager.peek("switchMap");
		} catch (CachingException e1) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AuthorizeBOImpl--getAuthorizeInfo-employeeVO:"+e1.getMessage());
			throw new ServiceException(e1);
		}
		if(switchMap == null || switchMap.isEmpty()){		
			checkApp = omSwitchDAO.getIfCheckapp();
		}else{
			String paraValue = (String)switchMap.get("F_CHECKAPP");
			if(paraValue != null && paraValue.intern() != "1".intern()){
				checkApp = false;
			}
		}
		//判断该用户是否可以登录配置好的应用
	  	if(checkApp){	  	
			boolean  notPassApp = false;
			String appConfigString = TDConfigHelper.getAppId();
			int appConfig = 0;
			if(appConfigString != null && !appConfigString.trim().equals("")){
				appConfig = Integer.parseInt(appConfigString);				
				RoleColl roleColl = roleDAO.getRoleInfoByEmployeeId(employeeVO.getEmployeeId());
				for(int i = 0; i < roleColl.getRowCount(); i++){
					RoleVO roleVO = roleColl.getRole(i);
					AppRoleRelColl appRoleRelColl = appDAO.getAppRoleRelCollByRoleId(roleVO.getRoleId());
					//如果该职员的所有角色都没有配置应用，则默认可以登录
					if(appRoleRelColl.getRowCount() == 0){
						notPassApp = notPassApp || false;
					}else{
						notPassApp = notPassApp || true;
					}
					for(int j = 0; j < appRoleRelColl.getRowCount(); j++){
						AppRoleRelVO appRoleRelVO = appRoleRelColl.getAppRoleRel(j);
						int appId = appRoleRelVO.getAppId();
						if(appId == appConfig){
							notPassApp = false;
						}
					}
				}
			}
			if( notPassApp ){
				oMAuthorizeVO.setAuthorizeResult(0);
				oMAuthorizeVO.setAuthorizeMessage("您无权登录该应用!");
				return oMAuthorizeVO;
			}
	  	}
	  	
		/*
		 * 密码过期验证
		 * 密码过期验证
		 * 密码过期验证
		 * 密码过期验证
		 */
		int messageDays = -1;
		int if_cortrol = -1;
		int inValidDays = 0;
		try{
			pwdValidVO = pwdValidDAO.getAllPwdValidInfo();
		}catch(DataAccessException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AuthorizeBOImpl--getOmSwitchMessagePeriod:"+e.getMessage());
			throw new ServiceException(e);
		}
		if(pwdValidVO!=null){
			if_cortrol = pwdValidVO.getIfCortrol();	
		}
		//判断是否需要密码过期验证
		if(if_cortrol>=1){
			messageDays = pwdValidVO.getAlertDays();
			inValidDays = pwdValidVO.getInValidDays();
			String inactivePwdDate = employeeVO.getPwdUpdate();               //上次密码修改的时间
			int pwdEffectDays;
			if (messageDays != -1&&inactivePwdDate!= ""){
				inactivePwdDate = inactivePwdDate.replaceAll("-","");               //去掉日期中的特殊字符
				try {
					pwdEffectDays = pwdValidDAO.getEffectDays(inactivePwdDate,inValidDays);
				}catch(DataAccessException e){
					SysLog.writeLogs("om",GlobalParameters.ERROR,"AuthorizeBOImpl--getEffectDays:"+e.getMessage());
					throw new ServiceException(e);
				}
				if(pwdEffectDays < 0 ){
					oMAuthorizeVO.setAuthorizeResult(1);
					oMAuthorizeVO.setAuthorizeMessage("登陆失败,密码已经失效,请与管理员联系!");
				}else if(pwdEffectDays <= messageDays){
					oMAuthorizeVO.setAuthorizeResult(2);
					oMAuthorizeVO.setAuthorizeEffectDays(pwdEffectDays);
					oMAuthorizeVO.setAuthorizeMessage("登陆成功,密码还有("+pwdEffectDays+"天)失效!");
				}else{
						oMAuthorizeVO.setAuthorizeResult(3);
						oMAuthorizeVO.setAuthorizeMessage("登录成功!");
					 }
			}else if(employeeVO.getWorkPwd() != null && !employeeVO.getWorkPwd().equals("") 
					 && (inactivePwdDate== null || inactivePwdDate.equals(""))){
				oMAuthorizeVO.setAuthorizeResult(4);
				oMAuthorizeVO.setAuthorizeMessage("初次登录，请修改密码");
			}else{
				oMAuthorizeVO.setAuthorizeResult(3);
				oMAuthorizeVO.setAuthorizeMessage("登录成功!");
			}
		}else{
			oMAuthorizeVO.setAuthorizeResult(3);
			oMAuthorizeVO.setAuthorizeMessage("登录成功!");
		}

		if(popedomVerson== null || !popedomVerson.equals("hainan")){//海南版本不需要这些信息		
			
			//得到职员的父信息的集合
			EmployeeVO parentEmployoeeVO = null;
			if(employeeVO.getParentEmployeeId() != null&&employeeVO.getParentEmployeeId().trim()!= ""){
				try {
					parentEmployoeeVO = employeeDAO.getEmployeeInfoById(employeeVO.getParentEmployeeId().trim());
					
				}catch (DataAccessException e) {
					SysLog.writeLogs("om",GlobalParameters.ERROR,"AuthorizeBOImpl--getAuthorizeInfo-parentEmployeeVO:"+e.getMessage());
					throw new ServiceException(e);
				}
				oMAuthorizeVO.setParentEmployeeVO(parentEmployoeeVO);
			}
			
			//得到行政区域信息
			try {	
				areaMap = (Map)manager.peek("areaMap");
				if(areaMap==null || areaMap.isEmpty()){	
					areaVO = areaDAO.getAreaById(employeeVO.getAreaId());	
					areaMap = getAllArea();				
					if(areaMap!=null && !areaMap.isEmpty()){       
						manager.putCacheObject("areaMap",areaMap);//将参数信息写到缓存中	
					}
				}else{
					areaVO = (AreaVO)areaMap.get(employeeVO.getAreaId());
				}			
				oMAuthorizeVO.setAreaCode("00001000");
			}catch (DataAccessException e) {
				SysLog.writeLogs("om",GlobalParameters.ERROR,"AuthorizeBOImpl--getAuthorizeInfo-areaVO:"+e.getMessage());
				throw new ServiceException(e);
			}catch(CachingException e1){
				SysLog.writeLogs("om",GlobalParameters.ERROR,"AuthorizeBOImpl--getAuthorizeInfo-areaVO:"+e1.getMessage());
				throw new ServiceException(e1);
			}
//			if(areaVO ==null){
//				oMAuthorizeVO.setAuthorizeResult(0);
//				oMAuthorizeVO.setAuthorizeMessage("登陆失败,无法获得操作员行政区域信息!");
//				return oMAuthorizeVO;
//				
//			}else{
//				oMAuthorizeVO.setAreaVO(areaVO);
//			}
			//得到上级地市名称
//			AreaVO parentAreaVO = null;
//			if(areaVO.getParentAreaId()!= null&&areaVO.getParentAreaId().trim()!= ""){
//				try {
//					
//					areaMap = (Map)manager.peek("areaMap");
//					if(areaMap == null || areaMap.isEmpty()){	
//						parentAreaVO = areaDAO.getAreaById("00001");							
//					}else{
//						parentAreaVO = (AreaVO)areaMap.get("00001");
//					}
//				}catch (DataAccessException e) {
//					SysLog.writeLogs("om",GlobalParameters.ERROR,"AuthorizeBOImpl--getAuthorizeInfo-parentAreaName:"+e.getMessage());
//					throw new ServiceException(e);
//				}catch(CachingException e1){
//					SysLog.writeLogs("om",GlobalParameters.ERROR,"AuthorizeBOImpl--getAuthorizeInfo-areaVO:"+e1.getMessage());
//					throw new ServiceException(e1);
//				}
//				oMAuthorizeVO.setParentAreaVO(parentAreaVO);
//			}
			
			//得到分区地市信息
			String partCity = "189";
			oMAuthorizeVO.setPartCity(partCity);
			oMAuthorizeVO.setHomeCity(partCity);
		
			//得到组织机构信息
			try {
				organVO = organDAO.getOrganInfoById(employeeVO.getOrganId());
			}catch (DataAccessException e) {
				SysLog.writeLogs("om",GlobalParameters.ERROR,"AuthorizeBOImpl--getAuthorizeInfo-organVO:"+e.getMessage());
				throw new ServiceException(e);
			}
			if(organVO ==null){
				oMAuthorizeVO.setAuthorizeResult(0);
				oMAuthorizeVO.setAuthorizeMessage("登陆失败,无法获得操作员组织机构信息!");
				return oMAuthorizeVO;
			}
			else{
				oMAuthorizeVO.setOrganVO(organVO);
			}
			//得到上级组织机构名字和类型
			OrganVO parentOrganVO = null;
			if(organVO.getParentOrganId()!= null&&organVO.getParentOrganId().trim()!= ""){
				try {
					parentOrganVO = organDAO.getOrganInfoById(organVO.getParentOrganId().trim());
				}catch (DataAccessException e) {
					SysLog.writeLogs("om",GlobalParameters.ERROR,"AuthorizeBOImpl--getAuthorizeInfo-parentOrganInfo:"+e.getMessage());
					throw new ServiceException(e);
				}
				oMAuthorizeVO.setParentOrganVO(parentOrganVO);		
			}
			
			//得到职务信息
			try{
				dutyVO = dutyDAO.getDutyInfoById(employeeVO.getDutyId());
			}catch (DataAccessException e) {
				SysLog.writeLogs("om",GlobalParameters.ERROR,"AuthorizeBOImpl--getAuthorizeInfo-dutyVO:"+e.getMessage());
				throw new ServiceException(e);
			}
			if(organVO ==null){
				oMAuthorizeVO.setAuthorizeResult(0);
				oMAuthorizeVO.setAuthorizeMessage("登陆失败,无法获得操作员职务信息!");
			}
			else{
				oMAuthorizeVO.setDutyVO(dutyVO);
			}
			//得到上级职务名称
			DutyVO parentDutyVO = null;
			if(dutyVO!= null && dutyVO.getParentDutyId()!= 0){
				try{
					parentDutyVO = dutyDAO.getDutyInfoById(dutyVO.getParentDutyId());
				}catch (DataAccessException e) {
					SysLog.writeLogs("om",GlobalParameters.ERROR,"AuthorizeBOImpl--getAuthorizeInfo-parentDutyInfo:"+e.getMessage());
					throw new ServiceException(e);
				}
				oMAuthorizeVO.setParentDutyVO(parentDutyVO);
			}
			String employeeId = employeeVO.getEmployeeId();
	        ParamRoleColl paramRoleColl = paramroleDAO.getUsableParamRoleCollByEmployeeId(employeeId);
	        oMAuthorizeVO.setParamRoleColl(paramRoleColl); 
	        if(needDealer){
		        //获得渠道名称
		        String dealerId = employeeVO.getDealerId();//渠道Id
		        if(dealerId != null && !dealerId.equals("")){
		        	com.neusoft.crm.channel.outInterface.om.data.DealerVO dealerVO = omQueryDAOInterface.doGetDealerByDealer(dealerId);
			        String dealerName = dealerVO.getDealer_name();
			        oMAuthorizeVO.setDealerName(dealerName);
		        }		        
		        //String dealerName = switchDAO.getDealerNameById(dealerId);
		        
	        }
		}
		else if(popedomVerson.equals("hainan")){//海南版本需要的信息
			//得到行政区域信息
			try {
				areaVO = areaDAO.getAreaById(employeeVO.getAreaId());
				areaVO = areaVO == null ? new AreaVO() : areaVO; 
				oMAuthorizeVO.setAreaCode(areaVO.getAreaCode());
				oMAuthorizeVO.setAreaVO(areaVO);
			}catch (DataAccessException e) {
				SysLog.writeLogs("om",GlobalParameters.ERROR,"AuthorizeBOImpl--getAuthorizeInfo-areaVOForHainan:"+e.getMessage());
				throw new ServiceException(e);
			}
		}
		//以上获得全部的认证信息,将信息返回
		return oMAuthorizeVO;
	}
	private Map getAllArea(){
		Map areaMap = new HashMap();
		AreaColl areaColl = areaDAO.getAreaAllInfo();
		for( int i=0; i < areaColl.getRowCount();i++){
			AreaVO vo = areaColl.getArea(i);
			areaMap.put(vo.getAreaId(), vo);
		}
		return areaMap;
	}
	/**
	 * 获取操作员的某一系统的菜单信息. <b>
	 * 返回结果不包括按钮. <b>
	 * key: "workMenu","favoriteMenu","funcMenu"
	 * value: menuName, 菜单名称
	 * @param employeeId
	 * @param systemId
	 * @return
	 * @throws ServiceException
	 */
	public Map getMenuInfo(String employeeId,String systemId) throws ServiceException {
		
		/*Map map = new WeakHashMap();
		MenuColl tmpMenu = new MenuColl();
		MenuColl allMenu = new MenuColl(); //所有菜单结果集
		MenuColl workMenu = new MenuColl();//工作区结果集
		
		//MenuColl favoriteMenu = new MenuColl();//收藏夹菜单结果集,暂时不处理
		MenuVO vo = null;
		try{
			tmpMenu = menuDAO.getMenuInfoByEmployeeId(employeeId,systemId);
		}catch(DataAccessException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AuthorizeBOImpl--getMenuInfo:"+e.getMessage());
			e.printStackTrace();
			throw new ServiceException(e);
		}
		//从结果集中得到工作区的数据
		for (int i=0;i<tmpMenu.getRowCount();i++ ){
			vo = tmpMenu.getMenu(i);
			if (vo.getIfMyWork()==1){
				workMenu.addMenu(vo);
			}else
				allMenu.addMenu(vo);
			}
		map.put("workMenu",workMenu);
		map.put("funcMenu",tmpMenu);*/
		return null;
	}
	/**
	 * 根据职员编号,系统编号得到菜单信息集合
	 * 返回结果不包括按钮
	 * @param employeeId
	 * @param systemId
	 * @return
	 * @throws ServiceException
	 */
	public FrameMenuColl getAllMenuInfo(String employeeId,String systemId) throws ServiceException {
		MenuColl coll = new MenuColl();
		try{
			coll = menuDAO.getMenuInfoByEmployeeId(employeeId,systemId);
		}catch(DataAccessException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AuthorizeBOImpl--getMenuInfo:"+e.getMessage());
			throw new ServiceException(e);
		}
		//将权限的结果集转换为框架的结果集
		OMObjectToFrameObject oMObjectToFrameObject = new OMObjectToFrameObject();
		return oMObjectToFrameObject.getFrameMenuColl(coll);		
	}
	/**
	 * 根据系统编号获取是否显示收藏夹
	 * 返回结果不包括按钮
	 * @param employeeId
	 * @param systemId
	 * @return
	 * @throws ServiceException
	 */
	public String getIfshowfav(String systemId) throws ServiceException {
		String if_show_fav = "";
		try{
			if_show_fav = menuDAO.getIfshowfav(systemId);
		}catch(DataAccessException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AuthorizeBOImpl--getMenuInfo:"+e.getMessage());
			throw new ServiceException(e);
		}
		
		return if_show_fav;		
	}
	/**
	 * 根据系统id得到该系统需要配置到工作区的信息
	 * @param systemId
	 * @return
	 * @throws ServiceException
	 */
	public FrameWorkColl getWorkInfoBySystemId(String systemId) throws ServiceException {
		WorkColl coll = null;
		try{
			coll = workDAO.getWorkInfoById(systemId);
		}catch(DataAccessException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AuthorizeBOImpl--getMenuInfo:"+e.getMessage());
			throw new ServiceException(e);
		}
		//将权限的结果集转换为框架的结果集
		OMObjectToFrameObject oMObjectToFrameObject = new OMObjectToFrameObject();
		return  oMObjectToFrameObject.getFrameWorkColl(coll); 
	}
	/**
	 * 根据职员编号,系统编号获得操作员收藏夹信息
	 * @param employeeId
	 * @param systemId
	 * @return
	 * @throws ServiceException
	 */
	public FavoriteColl getFavoriteInfoByEmployeeIdSystemId(String employeeId,String systemId) throws ServiceException {
		return null;
	}
	
	/**
	 * 根据操作员编号,得到有权限使用的系统的集合.
	 * 返回OMSystemColl对象
	 */
	public SystemColl getSystemInfo(String employeeId) throws ServiceException{
		com.neusoft.om.dao.system.SystemColl coll = new com.neusoft.om.dao.system.SystemColl();
		com.neusoft.om.dao.system.SystemColl assembledColl = new com.neusoft.om.dao.system.SystemColl();
		try{
			//get the value of om_system_t.f_system_name and so on with employeeId Info.. 
			List roleIdList = roleDAO.getUsableRoleId(employeeId);
			List roleMenuIdList = menuDAO.getMenuIdListByRoleList(roleIdList);
			List adjustUninMenuIdList = menuDAO.getAdjustMenuId(employeeId, 1);//微调增加的菜单
			List adjustMinusMenuList = menuDAO.getAdjustMenuId(employeeId, 2);//微调减少的菜单
			List menuIdList = minusList(unionList(roleMenuIdList, adjustUninMenuIdList),adjustMinusMenuList);//得到角色和微调之后所有可见的菜单
			List systemIdList = systemDAO.getSystemIdListByMenuList(menuIdList);
			List parentSystemIdList = systemDAO.getParentSystemIdList(systemIdList);
			List allSysId = unionList(parentSystemIdList,systemIdList );
			coll = systemDAO.getSystemCollBySystemIdList(allSysId);
			assembledColl = assembleSysColl(employeeId,coll); 
		}catch(DataAccessException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AuthorizeBOImpl--getSystemInfo:"+e.getMessage());
			throw new ServiceException(e);
		}
		OMSystemColl oMSystemColl = new OMSystemColl();
		oMSystemColl.setSystemColl(assembledColl);
		return oMSystemColl;
	}
	private List minusList (List list1, List list2){
		List list = new ArrayList();
		if(list1 != null){
			list = list1;
		}
		if(list2 != null && list2.size() != 0){
			for(int i=0; i < list2.size(); i++){
				String id = (String)list2.get(i);
				if(list.contains(id)){ //如果包含该元素，则将其从list中移除
					list.remove(id);
				}
			}			
		}
		return list;
	}
	private List unionList(List sysIdList1, List sysIdList2){
		List list = new ArrayList();
		if(sysIdList1 != null){
			list = sysIdList1;
		}
		if(sysIdList2 != null && sysIdList2.size() != 0){
			for(int i=0; i < sysIdList2.size(); i++){
				String systemId = (String)sysIdList2.get(i);
				if(!list.contains(systemId)){
					list.add(systemId);
				}
			}			
		}
		return list;
	}
	/**
	 * 根据输入参数判断页面是否有权限
	 */
	public boolean checkPage(String employeeId,String menuId) throws ServiceException{
		boolean ifHavePower = false;
		try{
			ifHavePower = menuDAO.getEmployeePowerInfo(employeeId,menuId);
		}catch(DataAccessException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AuthorizeBOImpl--getSystemInfo:"+e.getMessage());
			throw new ServiceException(e);
		}
		return ifHavePower;
	}
	/**
	 * 首先到菜单对象中校验一下该按钮是否已经注册,如果没有注册,认为有权限,如果已经注册
	 * 需要到职员权限表中校验该职员是否有该按钮的权限
	 * @param employeeId
	 * @param menuId
	 * @return
	 * @throws ServiceException
	 */
	public String getDisabledButton(String employeeId,String menuId) throws ServiceException{
		MenuVO menuVO = null;
		boolean ifHavePower = false;
		try{
			menuVO = menuDAO.getMenuByMenuId(menuId);
		}catch(DataAccessException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AuthorizeBOImpl--checkButtoun-1:"+e.getMessage());
			throw new ServiceException(e);
		}
		if(menuVO==null){
			return "";
		}else{
			try{
				ifHavePower = menuDAO.getEmployeePowerInfo(employeeId,menuId);
			}catch(DataAccessException e){
				SysLog.writeLogs("om",GlobalParameters.ERROR,"AuthorizeBOImpl--checkButtoun-2:"+e.getMessage());
				throw new ServiceException(e);
			}
			if(!ifHavePower){	//已经注册但没有权限
				return menuVO.getPageLink();
			}else{
				return "";
			}
		}
	}
	
    private com.neusoft.om.dao.system.SystemColl assembleSysColl(String employeeId,com.neusoft.om.dao.system.SystemColl pSystemColl) {
    	com.neusoft.om.dao.system.SystemColl systemColl = new com.neusoft.om.dao.system.SystemColl();
    	com.neusoft.om.dao.system.SystemColl secondLevelColl = new com.neusoft.om.dao.system.SystemColl(); //所有二级子系统
        int rowCount = pSystemColl.getRowCount();
        com.neusoft.om.dao.system.SystemColl firseLevelColl = new com.neusoft.om.dao.system.SystemColl();//用于保存所有二级子系统的一级子系统
        
        for(int i=0; i < rowCount; i++){
        	com.neusoft.om.dao.system.SystemVO systemVO = pSystemColl.getSystem(i);
            String parentSystemId = systemVO.getParentSystemId();            
            if((parentSystemId == null || parentSystemId.trim().equals("")) &&!existChild(pSystemColl,systemVO)){

            	systemColl.addSystem(systemVO);//将所有没有二级子系统的systemVO放到返回的集合中
            }else{
                secondLevelColl.addSystem(systemVO); //得到所有二级子系统的集合
                com.neusoft.om.dao.system.SystemVO parentSystemVO = pSystemColl.getSystemById(parentSystemId, pSystemColl);
                if(parentSystemVO != null && !existSystem(firseLevelColl, parentSystemVO)){
                	firseLevelColl.addSystem(parentSystemVO); 
                }
            }
        }
        
        for(int i=0; i<systemColl.getRowCount(); i++){
        	com.neusoft.om.dao.system.SystemVO systemVO = systemColl.getSystem(i);
    		if(existSystem(firseLevelColl, systemVO)){
    			systemColl.removeElement(i);
    		}
        }
//      整理二级菜单，每个key对应一个parentSystemId相同的二级子系统集合，且key值为二级子系统对应的一级子系统Id
        HashMap subSystemMap = new HashMap();
        for(int i = 0; i < secondLevelColl.getRowCount(); i++){
        	com.neusoft.om.dao.system.SystemVO systemVO = secondLevelColl.getSystem(i);
            String parentId = systemVO.getParentSystemId();
            if(subSystemMap.containsKey(parentId)){//如果已经存在，则将vo添加到已经存在的coll中，再放回map
            	com.neusoft.om.dao.system.SystemColl itemColl = (com.neusoft.om.dao.system.SystemColl)subSystemMap.get(parentId);
                itemColl.addSystem(systemVO);
                subSystemMap.put(parentId, itemColl);
            }else{//如果不存在，则新增一个二级子系统的coll
            	com.neusoft.om.dao.system.SystemColl itemColl = new  com.neusoft.om.dao.system.SystemColl();
                itemColl.addSystem(systemVO);
                subSystemMap.put(parentId, itemColl);
            }
        }
        //取出二级子系统集合，放到一级子系统VO中
        Set parenSystemIdSet = subSystemMap.keySet();
        Iterator it = parenSystemIdSet.iterator();          
        while(it.hasNext()){
            String parenSysId = (String)it.next();
            com.neusoft.om.dao.system.SystemVO parentSystemVO = systemDAO.getSystemInfoById(parenSysId);
            if(parentSystemVO != null ){
                com.neusoft.om.dao.system.SystemColl subColl = (com.neusoft.om.dao.system.SystemColl)subSystemMap.get(parenSysId);
                subColl = orderSysColl(subColl);
                //将systemColl转换成框架的systemColl
                OMSystemColl oMSystemColl = new OMSystemColl();
                oMSystemColl.setSystemColl(subColl);
                parentSystemVO.setSubSystemColl(oMSystemColl);
                systemColl.addSystem(parentSystemVO);//将有二级子系统的一级子系统VO放到systemColl中
            }

        }       
        com.neusoft.om.dao.system.SystemColl orderColl = orderSysColl(systemColl);
        return orderColl;
        
    }
    private boolean existSystem(com.neusoft.om.dao.system.SystemColl coll, com.neusoft.om.dao.system.SystemVO vo){
    	boolean exist = false;
    	String voId = vo.getSystemId();
    	for(int i=0; i < coll.getRowCount(); i++){
    		com.neusoft.om.dao.system.SystemVO sysVO = coll.getSystem(i);
    		if(sysVO != null && sysVO.getSystemId().trim().equals(voId)){
    			exist = true;
    		}
    	}
    	return exist;
    }

	/**
	 * 职员
	 * @param maintenanceDAO
	 */
	public void setEmployeeDAO(EmployeeDAO maintenanceDAO) {
		employeeDAO = maintenanceDAO;
	}
	/**
	 * 行政区域
	 * @param maintenanceDAO
	 */
	public void setAreaDAO(AreaDAO maintenanceDAO) {
		areaDAO = maintenanceDAO;
	}
	/**
	 * 组织机构
	 * @param maintenanceDAO
	 */
	public void setOrganDAO(OrganDAO maintenanceDAO) {
		organDAO = maintenanceDAO;
	}
	/**
	 * 职务
	 * @param maintenanceDAO
	 */
	public void setDutyDAO(DutyDAO maintenanceDAO) {
		dutyDAO = maintenanceDAO;
	}
	/**开关控制
	 * @param maintenanceDAO
	 */
	public void setOmSwitchDAO(OmSwitchDAO maintenanceDAO) {
		omSwitchDAO = maintenanceDAO;	
	}
	/**
	 * 权限自己定义的方法
	 * @param maintenanceDAO
	 */
	public void setOmUtilDAO(OmUtilDAO maintenanceDAO) {
		omUtilDAO = maintenanceDAO;	
	}
	/**
	 * 密码过期验证
	 * @param maintenanceDAO
	 */
	public void setPwdValidDAO(PwdValidDAO maintenanceDAO) {
		pwdValidDAO = maintenanceDAO;
	}
	/**
	 * 系统信息
	 * @param maintenanceDAO
	 */
	public void setSystemDAO(SystemDAO maintenanceDAO) {
		systemDAO = maintenanceDAO;
	}
	/**
	 * 菜单信息
	 * @param maintenanceDAO
	 */
	public void setMenuDAO(MenuDAO maintenanceDAO){
		menuDAO = maintenanceDAO;
	}

	/**
	 * 工作区信息
	 * @param workDAO
	 */
	public void setWorkDAO(WorkDAO workDAO) {
		this.workDAO = workDAO;
	}  
	
	public void setParamroleDAO(ParamRoleDAO paramroleDAO)
    {
        this.paramroleDAO = paramroleDAO;
    }
	
    public void setAppDAO(AppDAO appDAO) {
		this.appDAO = appDAO;
	}
	public void setRoleDAO(RoleDAO roleDAO) {
		this.roleDAO = roleDAO;
	}

	public void setSwitchDAO(SwitchDAO switchDAO) {
		this.switchDAO = switchDAO;
	}
	/**
	 * 测试方法
	 * @param args
	 */
	public static void main(String args[]) {
		AuthorizeBO bo = (AuthorizeBO)OMAppContext.getBean(AuthorizeBO.BEAN);
		try {
			System.out.println(bo.getAuthorizeInfo("test4","111111").getAuthorizeMessage());
			//test = bo.getMenuInfo("001","16");
			//MenuColl coll = (MenuColl)test.get("funcMenu");
			//System.out.println(coll.getMenu(0).toString(2));
			//SystemColl coll = bo.getSystemInfo("001");
			//FrameMenuColl coll = bo.getAllMenuInfo("001","16");
			//System.out.println(AuthXMLUtil.getMenuCollXML(coll));
			//FrameFavoriteColl coll = bo.getFavoriteInfoByEmployeeIdSystemId("001","16");
			//System.out.println(coll.getRowCount());
			//FrameWorkColl coll = bo.getWorkInfoBySystemId("16");
			//System.out.println(coll.getRowCount());
			
		} catch (ServiceException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	/**
	 * 根据key值排序，要求map的key均为可以解析为数字的字符
	 * @param map
	 * @return
	 */
	private ArrayList orderByKey(HashMap map){
		ArrayList list = new ArrayList();
		String key = "";
		Set set = map.keySet();
		Iterator it = set.iterator();		
		int size = set.size();
	    int i = 0;
		while(it.hasNext()){
			key = (String)it.next();
			list.add(i,key);
			i++;
		}				
		int min = 0;
		ArrayList orderList = new ArrayList();
		int index = 0;
		int j = 0;
		while(list.size() != 0){			
			min = Integer.valueOf((String)list.get(0)).intValue();
			for(int k= 0; k < list.size(); k++){
				int tmp = Integer.valueOf((String)list.get(k)).intValue();
				if(min >= tmp){
					min = tmp;
					index = k;
				}
			}				
			orderList.add(j,String.valueOf(min));
			list.remove(index);
			j++;
		}
		return orderList;
	}
	
    private com.neusoft.om.dao.system.SystemColl orderSysColl
    	(com.neusoft.om.dao.system.SystemColl coll) {
    	com.neusoft.om.dao.system.SystemColl orderedColl = new com.neusoft.om.dao.system.SystemColl();
    	HashMap map = new HashMap();
    	HashMap noOrderMap = new HashMap();
    	int j = 0;
        for(int i = 0; i < coll.getRowCount(); i++){
        	com.neusoft.om.dao.system.SystemVO vo = coll.getSystem(i);
        	if(vo.getOrder() == 0){//没有配置f_order字段，则认为放在最后且随机排列
        		noOrderMap.put(String.valueOf(j),vo);
        		j++;
        	}else {
        		String mapKey = String.valueOf(vo.getOrder());
        		if(map.containsKey(mapKey)){
        			noOrderMap.put(String.valueOf(j),vo);
        			j++;
        		}else{
        			map.put(String.valueOf(vo.getOrder()),vo.getSystemId());
        		}
        		
        	}        		
        }
        ArrayList orderList = orderByKey(map);
        for(int i = 0; i <orderList.size(); i++){
        	String orderKeyId = (String)orderList.get(i);
        	String orderSysId = (String)map.get(orderKeyId);
        	com.neusoft.om.dao.system.SystemVO orderVO = coll.getSystem(orderSysId);
        	orderedColl.addSystem(orderVO);
        }
        
        for(int i = 0 ; i < noOrderMap.size(); i++){
        	orderedColl.addSystem((com.neusoft.om.dao.system.SystemVO)noOrderMap.get(String.valueOf(i)));
        }
    	return orderedColl; 
    }
    private boolean existChild(com.neusoft.om.dao.system.SystemColl coll, com.neusoft.om.dao.system.SystemVO vo){
    	boolean exist = false;
    	String systemId = vo.getSystemId();
    	for(int i=0; i < coll.getRowCount(); i++){
    		com.neusoft.om.dao.system.SystemVO tempVO = coll.getSystem(i);
    		String parentId = tempVO.getParentSystemId();
    		if(parentId!= null && parentId.trim().equals(systemId)){
    			exist = true;
    		}
    	}
    	return exist;
    	
    }
	public void setOmQueryDAOInterface(OmQueryDAOImpl omQueryDAOInterface) {
		this.omQueryDAOInterface = omQueryDAOInterface;
	}
    
	/**added by pengtao 2011-05-24 for CRM6*/
	public List getMenuNavigation(String systemId, String employeeId) throws ServiceException {
		List coll = null;
		try{
			coll = menuDAO.getMenuNavigation(systemId, employeeId);
		}catch(DataAccessException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AuthorizeBOImpl--getMenuInfo:"+e.getMessage());
			throw new ServiceException(e);
		}
		//将权限的结果集转换为框架的结果集
		//OMObjectToFrameObject oMObjectToFrameObject = new OMObjectToFrameObject();
		return coll;	
	}
	
	/**added by pengtao 2011-05-24 for CRM6*/
	public List getSystemNavigation(String employeeId) throws ServiceException {
		List coll = null;
		try{
			coll = menuDAO.getSystemNavigation(employeeId);
		}catch(DataAccessException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AuthorizeBOImpl--getMenuInfo:"+e.getMessage());
			throw new ServiceException(e);
		}
		//将权限的结果集转换为框架的结果集
		//OMObjectToFrameObject oMObjectToFrameObject = new OMObjectToFrameObject();
		return coll;	
	}
	@Override
	public List getMenuForSearch(String employeeId, String searchKey)
			throws ServiceException {
		List coll = null;
		try{
			coll = menuDAO.getMenuForSearch(employeeId, searchKey);
		}catch(DataAccessException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AuthorizeBOImpl--getMenuForSearch:"+e.getMessage());
			throw new ServiceException(e);
		}
		//将权限的结果集转换为框架的结果集
		//OMObjectToFrameObject oMObjectToFrameObject = new OMObjectToFrameObject();
		return coll;
	}
}

