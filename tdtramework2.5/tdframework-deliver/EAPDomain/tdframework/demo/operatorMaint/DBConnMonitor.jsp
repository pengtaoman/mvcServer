<%@ page contentType="text/html;charset=gb2312"%>
<%@ page import="java.util.*" %>
<%@ page import ="com.neusoft.common.*"%>
<%@ page import ="com.neusoft.tdframework.test.ConnectionInfo"%>
<%@ page import ="com.neusoft.unieap.bl.context.AppContext"%>
<%@ page import ="com.neusoft.unieap.bl.context.impl.AppContextImpl"%>
<%@ page import ="com.neusoft.unieap.bl.interaction.InteractionObjectFactory"%>
<%@ page import ="com.neusoft.tdframework.demo.dao.staffer.OptrMaintDaoImpl"%>
<%@ page import ="com.neusoft.tdframework.dao.BaseDaoImpl"%>

<!-- ------------------------------
 * Writen by chenzt on 2005.1.25.
 * If any question,please communicate with chenzt@neusoft.com

 * @see also com.neusoft.common.ConnectionInfo
 * @see also com.neusoft.common.SDBPool
 * @see also com.neusoft.common.DBPool
 --------------------------------- -->

<%

	out.println("===============DBConnection Monitor Page=============== <br/><br/>");
	
	//DBPool pool = DBPool.getInstance();
	
    InteractionObjectFactory factory = InteractionObjectFactory.getInstance();                 
    AppContext appContext = new AppContextImpl();
    appContext.setApplicationName("tdframework");
    
    BaseDaoImpl dao = (BaseDaoImpl) factory.getInteractionObject("optrMaintDao",appContext);           
	
	Map map = dao.getConnectionHolders();
	
	if(map.size()<0){ map.clear();
		out.print("未知错误！缓存的调试连接信息出现负值！！已经清空。");
	}
	
	Set keyset = map.keySet();
	Object[] connections = keyset.toArray();
	
	out.println("Total inuse connections : " + connections.length + "<br/>");
	
	out.print("Current time is : "  + SysMaint.stringDateTime(SysMaint.today()));
	out.print("<br/><br/>");
	out.print("Connection detail is:<br/>");
	out.print("--------------------------------------------------<br/>");

	for(int i=0;i<connections.length;i++) {
	
		ConnectionInfo connectionInfo = (com.neusoft.tdframework.test.ConnectionInfo)map.get(connections[i]);
		
		if(connectionInfo == null) {
			out.print("null connection info!<br/>");
			continue;
		}
		
		long before = connectionInfo.currentUsedSeconds();
		
		out.println("Connection " + i + "  connect time is : " + SysMaint.stringDateTime(connectionInfo.getInvokeTime()));
		out.println(" ; time long is : " + connectionInfo.currentUsedSeconds() + "s , ");
		out.println("invoked by >> " + connectionInfo.getInvoker());
		out.println("<br/>");
		
        /**                
		if (before > 180) {
			try {
				java.sql.Connection connection = (java.sql.Connection)connections[i];
				pool.disConn(connection);
				out.println(" : this connection is disconnected!");
			}
			catch(Exception e) {
				out.println(" : this connection disconnect failed!");
			}
		}
		*/
		out.println("<br/>");
			
		}
%>
