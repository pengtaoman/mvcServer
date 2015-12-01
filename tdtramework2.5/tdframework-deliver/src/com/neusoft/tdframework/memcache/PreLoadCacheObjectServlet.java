package com.neusoft.tdframework.memcache;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;
import  java.util.Properties;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;
import com.neusoft.unieap.config.SystemConfig;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.util.IPUtil;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.memcache.CacheObjectPreHandler;
import com.neusoft.tdframework.message.bo.PromptInfoBO;
import com.neusoft.tdframework.quartz.bo.SchedulerMonitorBO;
import com.neusoft.tdframework.quartz.scheduler.SchedulerBeanNameHold;

public class PreLoadCacheObjectServlet extends HttpServlet{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private static final String PROP_KEY_TDFRAMEWORK_JSCSS_COMPRESS_CONTEXT = "context.compress.tdframework";

	private static final String PROP_KEY_BUSINESS_JSCSS_COMPRESS_CONTEXT = "context.compress.business";
	
	private static final String PROP_KEY_JOB_CONTEXT = "context.job.server";
	
	private static final String PROP_KEY_CACHE_PRELOAD_FLAG = "cache.preload.flag";
	
	public void init() throws ServletException
    {
		String methodName = "PreLoadCacheObjectServlet-init()";
		SysLog.writeLogs("om", GlobalParameters.INFO, methodName + ": begin");
		String servContext = "";
		try {
		    servContext= this.getServletContext().getContextPath();
		} catch (Exception ex) {
			SysLog.writeLogs("om", GlobalParameters.ERROR, "PreLoadCacheObjectServlet-init:改容器不支持servlet2.4,请选择其他容器启动应用，如Tomcat6。");
		    System.exit(0);
		}
		
		//将properties文件内容载入缓存
		InputStream inp =  null;
		Properties property = null;
		try{
			super.init();
			try {
				inp = this.getServletContext().getResourceAsStream("/WEB-INF/conf/properties/EnvConfig.properties");
				property = new java.util.Properties();
			    property.load(inp);
			    this.getServletContext().setAttribute("ENVCONF", property);
			    CacheManagerProxy cacheManagerProxy = CacheManagerProxy.getInstanceOfEhCacheProxy();
			    cacheManagerProxy.putObjectDirectly("ENVCONF", property);
			} catch (Exception ex) {
				ex.printStackTrace();
				SysLog.writeLogs("om", GlobalParameters.ERROR, "PreLoadCacheObjectServlet-init:读取Properties配置文件失败。");
			} finally {
				try {
					if (inp != null) {
						inp.close();
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		    //压缩整合js css文件
            if (!"".equals(servContext) && property != null 
            		&& isCorrectContext(servContext, PROP_KEY_TDFRAMEWORK_JSCSS_COMPRESS_CONTEXT, property)) {
			    if ("1".equals(property.getProperty("td.jscompress.flag"))) {
					try {
						compressJSCSS();
						SysLog.writeLogs("om", GlobalParameters.INFO, "框架JS和CSS文件整合压缩操作成功。");
					} catch (Exception ex) {
						ex.printStackTrace();
						SysLog.writeLogs("om", GlobalParameters.ERROR, "PreLoadCacheObjectServlet-init:框架JS和CSS文件整合压缩操作失败。");
					}
			    }
            } else {
            	SysLog.writeLogs("om", GlobalParameters.INFO, servContext + "不进行框架JS和CSS文件整合压缩操作。");
            }
            if (!"".equals(servContext) && property != null 
            		&& isCorrectContext(servContext, PROP_KEY_BUSINESS_JSCSS_COMPRESS_CONTEXT, property)) {
			    if ("1".equals(property.getProperty("td.busjscompress.flag"))) {
					try {
						compressAttrcardPlugin();
						SysLog.writeLogs("om", GlobalParameters.INFO, "AttrcardPlugin整合压缩操作成功。");
					} catch (Exception ex) {
						ex.printStackTrace();
						SysLog.writeLogs("om", GlobalParameters.ERROR, "PreLoadCacheObjectServlet-init:AttrcardPlugin文件整合压缩操作失败。");
					}
					try {
						compressServicecardPlugin();
						SysLog.writeLogs("om", GlobalParameters.INFO, "ServicecardPlugin整合压缩操作成功。");
					} catch (Exception ex) {
						ex.printStackTrace();
						SysLog.writeLogs("om", GlobalParameters.ERROR, "PreLoadCacheObjectServlet-init:ServicecardPlugin文件整合压缩操作失败。");
					}
					try {
						compressModuleDependencePlugin();
						SysLog.writeLogs("om", GlobalParameters.INFO, "ModuleDependencePlugin整合压缩操作成功。");
					} catch (Exception ex) {
						ex.printStackTrace();
						SysLog.writeLogs("om", GlobalParameters.ERROR, "PreLoadCacheObjectServlet-init:ModuleDependencePlugin文件整合压缩操作失败。");
					}
			    }
            } else {
            	SysLog.writeLogs("om", GlobalParameters.INFO, servContext + "不进行业务JS和CSS文件整合压缩操作。");
            }
			
			InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
		    
			//缓存业务定制的Message信息
			try {
		    
				AppContext appContext01 = new AppContextImpl();
				appContext01.setApplicationName("home");
			    PromptInfoBO promptInfoBO = (PromptInfoBO)factory.getInteractionObject(
			    		"promptInfoBO", 
			    		appContext01);
			    promptInfoBO.putMessageInfoToCache();
		    } catch (Exception ex) {
				ex.printStackTrace();
				SysLog.writeLogs("om", GlobalParameters.ERROR, "PreLoadCacheObjectServlet-init:缓存Message信息失败。");
			}
		    
			String preLoad = (String)property.getProperty(PROP_KEY_CACHE_PRELOAD_FLAG);
			if (preLoad != null && "1".equals(preLoad)) {
				//缓存业务定制的预加载缓存信息
			    try {
					AppContext appContext = new AppContextImpl();
				    appContext.setApplicationName("");
				    
				    CacheObjectPreHandler cacheObjectPreHandler = (CacheObjectPreHandler)factory.getInteractionObject(
				    		"preLoadCache", 
		            		appContext);
				    
				    String contextPath = SystemConfig.webAppName;
				    if (contextPath.startsWith("/")) {
				    	contextPath = contextPath.replaceAll("/", "");
				    }
				    cacheObjectPreHandler.afterPropertiesSet(contextPath);
			    
			    } catch (Exception ex) {
					ex.printStackTrace();
					SysLog.writeLogs("om", GlobalParameters.ERROR, "PreLoadCacheObjectServlet-init:预加载缓存失败。");
				}
			} else {
				SysLog.writeLogs("om", GlobalParameters.INFO, servContext + "不进行预加载缓存操作。");
			}
		    
		    //启动JOB
		    /**/
            if (!"".equals(servContext) && property != null 
            		&& isCorrectContext(servContext, PROP_KEY_JOB_CONTEXT, property)) {
			   
				if (property != null) {
					List<String> beanNameLst = SchedulerBeanNameHold.getInstance()
							.getBeanNameLst();
					
					AppContext appContext03 = new AppContextImpl();
					appContext03.setApplicationName("home");
					SchedulerMonitorBO schedulerMonitorBO = (SchedulerMonitorBO) factory
							.getInteractionObject(SchedulerMonitorBO.SchedulerMonitor_BEANNAME, appContext03);
					Map<String, String> schWar = schedulerMonitorBO.getSchedulerWar();
	
					for (String beanName : beanNameLst) {
						try {
							String httpStr = schWar.get(beanName);
							String contextPath = this.getServletContext()
									.getContextPath();
							if (contextPath.startsWith("/")) {
								contextPath = contextPath.substring(1);
							}

							AppContext appContext02 = new AppContextImpl();
							String schedulerAppname = property.getProperty("scheduler.applicationName");
							appContext02.setApplicationName(schedulerAppname);
							org.quartz.impl.StdScheduler stdScheduler = (org.quartz.impl.StdScheduler) factory
									.getInteractionObject(beanName, appContext02);
	
							stdScheduler.getContext().put("SERVER-INFO", "");
							
							if (httpStr != null && IPUtil.isLocalIPContained(httpStr)
									&& httpStr.indexOf(contextPath) > -1) {
	
								stdScheduler.start();
								SysLog.writeLogs(
										"JOB",
										GlobalParameters.INFO,
										"At " + httpStr + " SCHEDULER : "
												+ beanName + " . STARTED ! ");
							} else {
								
								SysLog.writeLogs(
										"JOB",
										GlobalParameters.INFO,
										"At " + httpStr + " SCHEDULER: "
												+ beanName + " . was not started ! ");
							}
						} catch (Exception ex) {
							ex.printStackTrace();
							SysLog.writeLogs("om",
									GlobalParameters.ERROR,
									"PreLoadCacheObjectServlet-init:JOB启动失败。");
						}
					}
				}
            } else {
            	SysLog.writeLogs("om", GlobalParameters.INFO, servContext + "不进行JOB相关操作。");
            }
            
		} catch(Exception e){
			//e.printStackTrace();
			SysLog.writeLogs("om", GlobalParameters.ERROR, "PreLoadCacheObjectServlet-init:初始化系统信息失败。");
		} finally {
			SysLog.writeLogs("om", GlobalParameters.INFO, methodName + ": end");
		}
	}
	
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// System.out.println("#############  doGet  ######################");
		String ca = request.getParameter("callback");
		if (request.getParameter("compressJsCss") != null
				&& "1".equals(request.getParameter("compressJsCss"))) {
			int sucCount = 0;
			try {
				compressJSCSS();
				sucCount++;
				SysLog.writeLogs("om", GlobalParameters.INFO, "框架JS和CSS文件整合压缩操作成功。");
				response.setContentType("text/html; charset=GBK");
				PrintWriter out = response.getWriter();
				out.println(ca + "('SUC');");
			} catch (Exception ex) {
				ex.printStackTrace();
				SysLog.writeLogs("om", GlobalParameters.ERROR, "PreLoadCacheObjectServlet-init:框架JS和CSS文件整合压缩操作失败。");
				response.setContentType("text/html; charset=GBK");
				PrintWriter out = response.getWriter();
				out.println(ca + "('FSI');");
			}

		} else if (request.getParameter("compressJsCss") != null
				&& "2".equals(request.getParameter("compressJsCss"))) {
			int sucCount = 0;
			try {
				compressAttrcardPlugin();
				sucCount++;
				SysLog.writeLogs("om", GlobalParameters.INFO, "AttrcardPlugin整合压缩操作成功。");
			} catch (Exception ex) {
				ex.printStackTrace();
				sucCount++;
				SysLog.writeLogs("om", GlobalParameters.ERROR, "PreLoadCacheObjectServlet-init:AttrcardPlugin文件整合压缩操作失败。");
			}
			try {
				compressServicecardPlugin();
				sucCount++;
				SysLog.writeLogs("om", GlobalParameters.INFO, "ServicecardPlugin整合压缩操作成功。");
			} catch (Exception ex) {
				ex.printStackTrace();
				SysLog.writeLogs("om", GlobalParameters.ERROR, "PreLoadCacheObjectServlet-init:ServicecardPlugin文件整合压缩操作失败。");
			}
			try {
				compressModuleDependencePlugin();
				sucCount++;
				SysLog.writeLogs("om", GlobalParameters.INFO, "ModuleDependencePlugin整合压缩操作成功。");
			} catch (Exception ex) {
				ex.printStackTrace();
				SysLog.writeLogs("om", GlobalParameters.ERROR, "PreLoadCacheObjectServlet-init:ModuleDependencePlugin文件整合压缩操作失败。");
			}
		    
			if (sucCount == 3) {
				response.setContentType("text/html; charset=GBK");
				PrintWriter out = response.getWriter();
				out.println(ca + "('SUC');");
			} else {
				response.setContentType("text/html; charset=GBK");
				PrintWriter out = response.getWriter();
				out.println(ca + "('FSI');");
			}
		} else {
			this.init();
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		//System.out.println("#############  doPost  ######################");
		String ca = request.getParameter("callback");
		if (request.getParameter("compressJsCss") != null && "1".equals(request.getParameter("compressJsCss"))) {
			int sucCount = 0;
				try {
					compressJSCSS();
					sucCount++;
					SysLog.writeLogs("om", GlobalParameters.INFO, "框架JS和CSS文件整合压缩操作成功。");
					response.setContentType("text/html; charset=GBK");
					PrintWriter out = response.getWriter();
					out.println(ca + "('SUC');");
				} catch (Exception ex) {
					ex.printStackTrace();
					SysLog.writeLogs("om", GlobalParameters.ERROR, "PreLoadCacheObjectServlet-init:框架JS和CSS文件整合压缩操作失败。");
					response.setContentType("text/html; charset=GBK");
					PrintWriter out = response.getWriter();
					out.println(ca + "('FSI');");
				}
		} else if (request.getParameter("compressJsCss") != null
				&& "2".equals(request.getParameter("compressJsCss"))) {
			int sucCount = 0;
			try {
				compressAttrcardPlugin();
				sucCount++;
				SysLog.writeLogs("om", GlobalParameters.INFO, "AttrcardPlugin整合压缩操作成功。");
			} catch (Exception ex) {
				ex.printStackTrace();
				sucCount++;
				SysLog.writeLogs("om", GlobalParameters.ERROR, "PreLoadCacheObjectServlet-init:AttrcardPlugin文件整合压缩操作失败。");
			}
			try {
				compressServicecardPlugin();
				sucCount++;
				SysLog.writeLogs("om", GlobalParameters.INFO, "ServicecardPlugin整合压缩操作成功。");
			} catch (Exception ex) {
				ex.printStackTrace();
				SysLog.writeLogs("om", GlobalParameters.ERROR, "PreLoadCacheObjectServlet-init:ServicecardPlugin文件整合压缩操作失败。");
			}
			try {
				compressModuleDependencePlugin();
				sucCount++;
				SysLog.writeLogs("om", GlobalParameters.INFO, "ModuleDependencePlugin整合压缩操作成功。");
			} catch (Exception ex) {
				ex.printStackTrace();
				SysLog.writeLogs("om", GlobalParameters.ERROR, "PreLoadCacheObjectServlet-init:ModuleDependencePlugin文件整合压缩操作失败。");
			}
		    
			if (sucCount == 3) {
				response.setContentType("text/html; charset=GBK");
				PrintWriter out = response.getWriter();
				out.println(ca + "('SUC');");
			} else {
				response.setContentType("text/html; charset=GBK");
				PrintWriter out = response.getWriter();
				out.println(ca + "('FSI');");
			}
		} else {
		    this.init();
		}
	}
	
	private void compressJSCSS() throws Exception {
		
		String rootPath = this.getServletContext().getRealPath("/");
    	if (rootPath.endsWith("\\")) {
    		rootPath = rootPath.substring(0, rootPath.length()-1);
    	}
    	
    	String seedFilePath = rootPath + "/unieap/ria3.3/pages/preLoadModulesCHE.js";
    	String resultPath = rootPath + "/unieap/ria3.3/pages/unieap-combo.js";
    	com.neusoft.tdframework.common.util.UnieapLibGenerator.yuigen(seedFilePath, resultPath, rootPath); 
    	
    	
    	String seedFilePathCSS = rootPath + "/unieap/ria3.3/pages/preLoadModulesCSS.js";
    	String resultPathCSS =   rootPath + "/unieap/ria3.3/unieap/themes/blue/css/unieap-combo.css";
    	com.neusoft.tdframework.common.util.UnieapLibGenerator.yuigenCSS(seedFilePathCSS, resultPathCSS, rootPath);
	}
	
	private void compressAttrcardPlugin() throws Exception {
		
		String rootPath = this.getServletContext().getRealPath("/");
    	if (rootPath.endsWith("\\")) {
    		rootPath = rootPath.substring(0, rootPath.length()-1);
    	}
    	
    	String seedFilePath = rootPath + "/orderaccept/attrapp/attrcard-plugin-seed.js";
    	String resultPath = rootPath + "/orderaccept/attrapp/attrcard-plugin-comb.js";
    	com.neusoft.tdframework.common.util.UnieapLibGenerator.yuigenBusUTF(seedFilePath, resultPath, rootPath); 
	}
	
	private void compressServicecardPlugin() throws Exception {
		
		String rootPath = this.getServletContext().getRealPath("/");
    	if (rootPath.endsWith("\\")) {
    		rootPath = rootPath.substring(0, rootPath.length()-1);
    	}
    	
    	String seedFilePath = rootPath + "/buscardapp/rela/js/servicecard-plugin-seed.js";
    	String resultPath = rootPath + "/buscardapp/rela/js/servicecard-plugin-comb.js";
    	com.neusoft.tdframework.common.util.UnieapLibGenerator.yuigenBusGBK(seedFilePath, resultPath, rootPath); 
	}
	
	private void compressModuleDependencePlugin() throws Exception {
		
		String rootPath = this.getServletContext().getRealPath("/");
    	if (rootPath.endsWith("\\")) {
    		rootPath = rootPath.substring(0, rootPath.length()-1);
    	}
    	
    	String seedFilePath = rootPath + "/orderaccept/prodofferaccept/moduleDependence.js";
    	String resultPath = rootPath + "/orderaccept/prodofferaccept/module-comb.js";
    	com.neusoft.tdframework.common.util.UnieapLibGenerator.yuigenBusUTF(seedFilePath, resultPath, rootPath); 
	}
	
	private boolean isCorrectContext(String servletContext, String propKey, Properties property) {
		boolean returnValue = false;
		try {
			String contextProp = (String)property.getProperty(propKey);
			if (contextProp != null && !"".equals(contextProp)) {
				String[] contexts = contextProp.split(";");
				for (String cont : contexts) {
					if (servletContext.indexOf(cont) > -1) {
						returnValue = true;
						break;
					}
				}
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return returnValue;
	}

}
