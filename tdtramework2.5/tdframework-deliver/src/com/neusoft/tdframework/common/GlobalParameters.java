package com.neusoft.tdframework.common;

/**brief description
 * <p>Date       : 2004-11-1</p>
 * <p>Module     : </p>
 * <p>Description: </p>
 * <p>Remark     : </p>
 * @author lub
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */
public class GlobalParameters {

	public static final String FATAL	= "FATAL";
	public static final String ERROR	= "ERROR";
	public static final String WARN		= "WARN";
	public static final String INFO		= "INFO";
	public static final String DEBUG	= "DEBUG";
	public static final String TRACE	= "TRACE";
	public static final String UNIFLOW_SESSION = "uni_nwsession";

	//global login page name
	//public static final String LOGIN_PAGE = "global_login_page";
	/**
	 * 登陆页面的structs配置
	 */
	public static final String LOGIN_PAGE = "Login";
	public static final String ALERT_PAGE = "alertMessage";
	public static final String ALERT_ATTRIBUTE_KEY = "alertMessage";
	
	/**
	 * session 实现的struts配置
	 */
	public static final String SESSION_INVALID_PAGE = "sessionInvalid";
	//upload file content type 
	public static final String MULTIPART_CONTENT_TYPE = "multipart/form-data";
	//postprocess upload request cotains file parameters 
	public static final String FILEPARAS_NAME = "FileParaMeters";
	//user logined session info
	public static final String SESSION_INFO = "login_info"; 
	//
	public static final String ENCODING = "encoding";
	//
	public static final String IFNEEDAUTH = "ifneedauth";
	//
	public static final String CHARSET = "charset";
	
}
