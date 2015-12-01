package com.neusoft.om.interfase.ebisp.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.neusoft.om.interfase.ebisp.data.ButtonVO;
import com.neusoft.om.interfase.ebisp.data.FrameColl;
import com.neusoft.om.interfase.ebisp.data.FrameNode;
import com.neusoft.om.interfase.ebisp.data.FrameRelViewColl;
import com.neusoft.om.interfase.ebisp.data.FrameRelViewVO;
import com.neusoft.om.interfase.ebisp.data.FrameVO;
import com.neusoft.om.interfase.ebisp.data.IconColl;
import com.neusoft.om.interfase.ebisp.data.IconVO;
import com.neusoft.om.interfase.ebisp.data.StyleColl;
import com.neusoft.om.interfase.ebisp.data.StyleVO;
import com.neusoft.om.interfase.ebisp.data.ViewColl;
import com.neusoft.om.interfase.ebisp.data.ViewVO;
import com.neusoft.om.interfase.ebisp.data.WindowColl;
import com.neusoft.om.interfase.ebisp.data.WindowNode;
import com.neusoft.om.interfase.ebisp.data.WindowNodeColl;
import com.neusoft.om.interfase.ebisp.data.WindowRelFrameColl;
import com.neusoft.om.interfase.ebisp.data.WindowRelFrameVO;
import com.neusoft.om.interfase.ebisp.data.WindowVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;

public class UserDAOImpl extends BaseDaoImpl implements UserDAO{

	public WindowVO getWindowVOById(String windowId) throws DataAccessException {
		WindowVO vo = null;
		
		StringBuffer buf = new StringBuffer();        
        buf.append("SELECT * ");
		buf.append(" FROM om_window_t WHERE f_window_id = ?");
		
		String sql = buf.toString();
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,windowId);
			rest = pstmt.executeQuery();
			
			while(rest.next()){
				vo = new WindowVO();
				vo.setAttribute(rest);
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,"UserDAOImpl--getWindowVOById-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,"UserDAOImpl--getWindowVOById-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		return vo;
	}

	public FrameVO getFrameVOById(String frameId) throws DataAccessException {
		FrameVO vo = null;
		
		StringBuffer buf = new StringBuffer();        
        buf.append("SELECT * ");
		buf.append(" FROM om_frame_t WHERE f_frame_id = ?");
		
		String sql = buf.toString();
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,frameId);
			rest = pstmt.executeQuery();
			
			while(rest.next()){
				vo = new FrameVO();
				vo.setAttribute(rest);
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,"UserDAOImpl--getFrameVOById-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,"UserDAOImpl--getFrameVOById-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		return vo;
	}

	public ViewVO getViewVOById(String viewId) throws DataAccessException {
		ViewVO vo = null;
		
		StringBuffer buf = new StringBuffer();        
        buf.append("SELECT * ");
		buf.append(" FROM om_view_t WHERE f_view_id = ?");
		
		String sql = buf.toString();
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,viewId);
			rest = pstmt.executeQuery();
			
			while(rest.next()){
				vo = new ViewVO();
				vo.setAttribute(rest);
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,"UserDAOImpl--getViewVOById-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,"UserDAOImpl--getViewVOById-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}  
		return vo;
	}

	public List getWindowListByEmployeeId(String employeeId) throws DataAccessException {
		List windowList = new ArrayList();
		StringBuffer buf = new StringBuffer();        
        buf.append("SELECT b.* ");
        buf.append("FROM OM_MENU_T a, OM_window_T b, OM_MENU_REL_window_T c," +
        		   " OM_EMPLOYEE_ROLE_RELATION_T d,OM_FUNC_ROLE_T e");	
		buf.append(" WHERE a.f_menu_id = c.f_menu_id AND c.f_window_id = b.f_window_id AND d.f_employee_id = ? ");     
		buf.append(" AND d.f_role_id = e.f_role_id AND a.f_menu_id = e.f_menu_id ");
		String sql = buf.toString();		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,employeeId);
			rest = pstmt.executeQuery();			
			while(rest.next()){
				WindowVO vo = new WindowVO();
				vo.setAttribute(rest);
				windowList.add(vo);
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,
					"UserDAOImpl--getWindowListByEmployeeId-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,
					"UserDAOImpl--getWindowListByEmployeeId-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		} 
		/*
		SELECT b.*
		FROM OM_MENU_T a, OM_window_T b, OM_MENU_REL_window_T c, OM_EMPLOYEE_ROLE_RELATION_T d,
		     OM_FUNC_ROLE_T e
		WHERE a.f_menu_id = c.f_menu_id AND c.f_window_id = b.f_window_id AND d.f_employee_id = '999'
		     AND d.f_role_id = e.f_role_id AND a.f_menu_id = e.f_menu_id
		*/
		
		return windowList;
	}

	public List getViewListByEmployeeId(String employeeId) throws DataAccessException {
		/*
		SELECT b.*
		FROM OM_MENU_T a, OM_VIEW_T b, OM_MENU_REL_VIEW_T c, OM_EMPLOYEE_ROLE_RELATION_T d,
		     OM_FUNC_ROLE_T e
		WHERE a.f_menu_id = c.f_menu_id AND c.f_view_id = b.f_view_id AND d.f_employee_id = '999'
		     AND d.f_role_id = e.f_role_id AND a.f_menu_id = e.f_menu_id
		 */
		List viewList = new ArrayList();
		StringBuffer buf = new StringBuffer();        
        buf.append("SELECT b.* ");
        buf.append("FROM OM_MENU_T a, OM_VIEW_T b, OM_MENU_REL_VIEW_T c, " +
        		"OM_EMPLOYEE_ROLE_RELATION_T d, OM_FUNC_ROLE_T e");	
		buf.append(" WHERE a.f_menu_id = c.f_menu_id AND c.f_view_id = b.f_view_id AND d.f_employee_id = ? ");     
		buf.append(" AND d.f_role_id = e.f_role_id AND a.f_menu_id = e.f_menu_id ");
		String sql = buf.toString();		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,employeeId);
			rest = pstmt.executeQuery();			
			while(rest.next()){
				ViewVO vo = new ViewVO();
				vo.setAttribute(rest);
				viewList.add(vo);
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,
					"UserDAOImpl--getViewListByEmployeeId-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,
					"UserDAOImpl--getViewListByEmployeeId-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		} 
		return viewList;
	}

	public List getButtonListByEmployeeId(String employeeId) throws DataAccessException {
		/*
		SELECT DISTINCT a.*
		FROM om_button_t a, om_menu_rel_button_t b, om_menu_t c, om_func_role_t d, 
	     om_employee_role_relation_t e
		WHERE a.f_button_id = b.f_button_id AND e.f_employee_id = '999' AND d.f_role_id = d.f_role_id
		    AND c.f_menu_id = d.f_menu_id
			return null;
		*/
		List buttonList = new ArrayList();
		StringBuffer buf = new StringBuffer();        
        buf.append("SELECT DISTINCT a.* ");
        buf.append(" FROM om_button_t a, om_menu_rel_button_t b, om_menu_t c, om_func_role_t d,  " +
        		" om_employee_role_relation_t e ");	
		buf.append(" WHERE a.f_button_id = b.f_button_id AND e.f_employee_id = ? AND d.f_role_id = d.f_role_id");     
		buf.append(" AND c.f_menu_id = d.f_menu_id");
		String sql = buf.toString();		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,employeeId);
			rest = pstmt.executeQuery();			
			while(rest.next()){
				ButtonVO vo = new ButtonVO();
				vo.setAttribute(rest);
				buttonList.add(vo);
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,
					"UserDAOImpl--getButtonListByEmployeeId-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,
					"UserDAOImpl--getButtonListByEmployeeId-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		} 
		return buttonList;
	}

	public WindowColl getParentWindowByWinId(String windowId) throws DataAccessException {
		/*
		SELECT DISTINCT a.*
		FROM om_window_t a, om_windoe_relation_t b 
		WHERE a.f_window_id = b.f_parent_id AND b.f_child_id = ?
		 */
		WindowColl windowColl = new WindowColl();
		StringBuffer buf = new StringBuffer();        
        buf.append("SELECT DISTINCT a.* ");
        buf.append(" FROM om_window_t a, om_window_relation_t b" );	
		buf.append(" WHERE a.f_window_id = b.f_parent_id AND b.f_child_id = ?");
		String sql = buf.toString();		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,windowId);
			rest = pstmt.executeQuery();			
			while(rest.next()){
				WindowVO vo = new WindowVO();
				vo.setAttribute(rest);
				windowColl.addElement(vo);
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,
					"UserDAOImpl--getParentWindowByWinId-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,
					"UserDAOImpl--getParentWindowByWinId-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		} 
		return windowColl;
	}

	public WindowColl getChildrenWindowByWinId(String windowId) throws DataAccessException {
		/*
		SELECT DISTINCT a.*
		FROM om_window_t a, om_windoe_relation_t b 
		WHERE a.f_window_id = b.f_child_id AND b.f_parent_id = ?
		 */
		WindowColl windowColl = new WindowColl();
		StringBuffer buf = new StringBuffer();        
        buf.append("SELECT DISTINCT a.* ");
        buf.append(" FROM om_window_t a, om_window_relation_t b" );	
		buf.append(" WHERE a.f_window_id = b.f_child_id AND b.f_parent_id = ?");
		String sql = buf.toString();		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,windowId);
			rest = pstmt.executeQuery();			
			while(rest.next()){
				WindowVO vo = new WindowVO();
				vo.setAttribute(rest);
				windowColl.addElement(vo);
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,
					"UserDAOImpl--getParentWindowByWinId-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,
					"UserDAOImpl--getParentWindowByWinId-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		} 
		return windowColl;
	}

	public WindowColl getWindowCollByFrameId(String frameId) throws DataAccessException {
		/*
		SELECT DISTINCT a.* 
		FROM om_window_t a, om_window_rel_frame_t b
		WHERE a.f_window_id = b.f_window_id AND b.f_frame_id = '10050008'    
		*/		
		WindowColl windowColl = new WindowColl();
		StringBuffer buf = new StringBuffer();        
        buf.append("SELECT DISTINCT a.* ");
        buf.append(" FROM om_window_t a, om_window_rel_frame_t b" );	
		buf.append(" WHERE a.f_window_id = b.f_window_id AND b.f_frame_id = ?");
		String sql = buf.toString();		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,frameId);
			rest = pstmt.executeQuery();			
			while(rest.next()){
				WindowVO vo = new WindowVO();
				vo.setAttribute(rest);
				windowColl.addElement(vo);
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,
					"UserDAOImpl--getWindowCollByFrameId-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,
					"UserDAOImpl--getWindowCollByFrameId-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		} 
		return windowColl;
	}

	public FrameColl getFrameCollByWinId(String windowId) throws DataAccessException {
		/*
		SELECT DISTINCT a.* 
		FROM om_frame_t a, om_window_rel_frame_t b
		WHERE a.f_frame_id = b.f_frame_id AND b.f_window_id = '1015'    
		 */
		FrameColl frameColl = new FrameColl();
		StringBuffer buf = new StringBuffer();        
        buf.append("SELECT DISTINCT a.* ");
        buf.append(" FROM om_frame_t a, om_window_rel_frame_t b" );	
		buf.append(" WHERE a.f_frame_id = b.f_frame_id AND b.f_window_id = ?");
		String sql = buf.toString();		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,windowId);
			rest = pstmt.executeQuery();			
			while(rest.next()){
				FrameVO vo = new FrameVO();
				vo.setAttribute(rest);
				frameColl.addElement(vo);
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,
					"UserDAOImpl--getWindowCollByFrameId-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,
					"UserDAOImpl--getWindowCollByFrameId-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		} 
		return frameColl;
	}

	public FrameColl getFrameCollByViewId(String viewId) throws DataAccessException {
		/*
		SELECT DISTINCT a.* 
		FROM om_frame_t a, om_frame_rel_view_t b
		WHERE a.f_frame_id = b.f_frame_id AND b.f_view_id = '100220'
		 */
		FrameColl frameColl = new FrameColl();
		StringBuffer buf = new StringBuffer();        
        buf.append("SELECT DISTINCT a.* ");
        buf.append(" FROM om_frame_t a, om_frame_rel_view_t b" );	
		buf.append(" WHERE a.f_frame_id = b.f_frame_id AND b.f_view_id = ?");
		String sql = buf.toString();		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,viewId);
			rest = pstmt.executeQuery();			
			while(rest.next()){
				FrameVO vo = new FrameVO();
				vo.setAttribute(rest);
				frameColl.addElement(vo);
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,
					"UserDAOImpl--getFrameCollByViewId-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,
					"UserDAOImpl--getFrameCollByViewId-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		} 
		return frameColl;
	}

	public ViewColl getViewCollByFrameId(String frameId) throws DataAccessException {
		/*
		SELECT DISTINCT a.* 
		FROM om_view_t a, om_frame_rel_view_t b
		WHERE a.f_view_id = b.f_view_id AND b.f_frame_id = '10050008'
		 */
		ViewColl viewColl = new ViewColl();
		StringBuffer buf = new StringBuffer();        
        buf.append("SELECT DISTINCT a.* ");
        buf.append(" FROM om_view_t a, om_frame_rel_view_t b" );	
		buf.append(" WHERE a.f_view_id = b.f_view_id AND b.f_frame_id = ?");
		String sql = buf.toString();		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,frameId);
			rest = pstmt.executeQuery();			
			while(rest.next()){
				ViewVO vo = new ViewVO();
				vo.setAttribute(rest);
				viewColl.addElement(vo);
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,
					"UserDAOImpl--getFrameCollByViewId-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,
					"UserDAOImpl--getFrameCollByViewId-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		} 
		return viewColl;
	}

	public IconVO getIconVOById(String iconId) throws DataAccessException {
		/*
		 SELECT * FROM om_icon_t WHERE f_icon_id = '1030'
		 */
		IconVO iconVO = new IconVO();
		StringBuffer buf = new StringBuffer();        
        buf.append("SELECT * FROM om_icon_t WHERE f_icon_id = ?");
		String sql = buf.toString();		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,iconId);
			rest = pstmt.executeQuery();			
			while(rest.next()){
				iconVO.setAttribute(rest);
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,
					"UserDAOImpl--getIconVOById-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,
					"UserDAOImpl--getIconVOById-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		} 
		return iconVO;
	}

	public StyleVO getStyleVOById(String styleId) throws DataAccessException {
		/*
		 SELECT * FROM om_style_t WHERE f_style_id = '1047'
		 */
		StyleVO styleVO = new StyleVO();
		StringBuffer buf = new StringBuffer();        
        buf.append("SELECT * FROM om_style_t WHERE f_style_id = ?");
		String sql = buf.toString();		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,styleId);
			rest = pstmt.executeQuery();			
			while(rest.next()){
				styleVO.setAttribute(rest);
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,
					"UserDAOImpl--getStyleVOById-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,
					"UserDAOImpl--getStyleVOById-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		} 
		return styleVO;
	}

    /**
     * 根据employeeId得到其能够访问的所有windowNode集合
     */
	public WindowNodeColl getWindowNodeByEmpId(String employeeId) throws DataAccessException {
		WindowNodeColl windowNodeColl = new WindowNodeColl();
		//根据employeeId得到可以访问的window集合
		StringBuffer buf = new StringBuffer();        
        buf.append("SELECT b.* ");
        buf.append(" FROM OM_MENU_T a, OM_window_T b, OM_MENU_REL_window_T c, ");
        buf.append(" OM_EMPLOYEE_ROLE_RELATION_T d,OM_FUNC_ROLE_T e");
        buf.append(" WHERE a.f_menu_id = c.f_menu_id AND c.f_window_id = b.f_window_id AND d.f_employee_id = ? ");
		buf.append(" AND d.f_role_id = e.f_role_id AND a.f_menu_id = e.f_menu_id ");
		String sql = buf.toString();		
		Connection conn = null;
		PreparedStatement pstmt = null;
		PreparedStatement pstmtFrame = null;
		PreparedStatement pstmtView = null;
		PreparedStatement pstmtWinRelFrame = null;
		PreparedStatement pstmtFrameRelView = null;
		
		ResultSet rest = null;
		ResultSet restFrame = null;		
		ResultSet restView = null;			
		ResultSet restWinRelFrame = null;
		ResultSet restFrameRelView = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,employeeId);
			rest = pstmt.executeQuery();			
			while(rest.next()){				
				WindowNode windowNode = new WindowNode();
				//得到windowVO,并赋给windowNode
				WindowVO windowVO = new WindowVO();
				windowVO.setAttribute(rest);
				windowNode.setWindowVO(windowVO);
				//根据window的行列属性定义window中frameNode数组的维数
				int wRow = windowVO.getRowCount();
				int wCol = windowVO.getColCount();
				FrameNode[][] frameNodeArry = new FrameNode[wRow][wCol];
				//得到windowId,并据此得到此window下所有的frame
				String windowId = String.valueOf(windowVO.getWindowId());
				pstmtFrame = getFrameSql(conn,windowId);
				restFrame = pstmtFrame.executeQuery();				
				while(restFrame.next()){
					FrameNode frameNode = new FrameNode(); 
					//首先得到构造frameNode需要的frameVO
					FrameVO frameVO = new FrameVO();
					frameVO.setAttribute(restFrame);
					frameNode.setFrameVO(frameVO);
					//得到frameId
					String frameId = String.valueOf(frameVO.getFrameId());
					//得到构造frameNode需要的viewVO[][]
					int vRow = frameVO.getRowCount();
					int vCol = frameVO.getColCount();
					ViewVO[][] viewVOArry = new ViewVO[vRow][vCol];					
					//根据frameId得到对应的view集合
					pstmtView = getViewPstmt(conn,frameId);
					restView = pstmtView.executeQuery();					
					while(restView.next()){
						ViewVO viewVO = new ViewVO();
						viewVO.setAttribute(restView);
						//得到viewId
						String viewId = String.valueOf(viewVO.getViewId());
						//根据frameId和viewId得到对应关系集合
						pstmtFrameRelView = getFrameRelviewPstmt(conn, frameId, viewId);
						restFrameRelView = pstmtFrameRelView.executeQuery();
						while(restFrameRelView.next()){
							//得到view在frame中的位置信息
							int vRowNum = restFrameRelView.getInt("f_row_num");
							int vColNum = restFrameRelView.getInt("f_col_num");
							//给frameNode中的view[][]赋值
							viewVOArry[vRowNum-1][vColNum-1] = viewVO;
						}
						frameNode.setViewArry(viewVOArry);
					}//循环结束后，frameNode的view[][]生成完成
					//至此一个frameNode已经生成
					//根据windowId frameId得到frame在window中的位置信息
					pstmtWinRelFrame = getWinRelFramePstmt(conn, windowId, frameId);
					restWinRelFrame = pstmtWinRelFrame.executeQuery();
					while(restWinRelFrame.next()){
						int fRowNum = restWinRelFrame.getInt("f_row_num");
						int fColNum = restWinRelFrame.getInt("f_col_num");
						//windowNode中的frameNode[][]赋值
						frameNodeArry[fRowNum-1][fColNum-1] = frameNode;
						//至此一个windowNode生成
					}
					windowNode.setFrameNodeArry(frameNodeArry);
				}
				windowNodeColl.addElement(windowNode);
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,
					"UserDAOImpl--getWindowNodeByEmpId-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,
					"UserDAOImpl--getWindowNodeByEmpId-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}
		return windowNodeColl;
	}
    /**
     * 根据windowId得到其对应的windowNode
     * @param windowId
     * @return
     * @throws DataAccessException
     */
    public WindowNode getWindowNodeByWinId(String windowId) throws DataAccessException{
    	WindowNode windowNode = new WindowNode();
    	//得到windowVO
		StringBuffer buf = new StringBuffer();        
        buf.append("SELECT * ");
        buf.append(" FROM  OM_WINDOW_T ");
        buf.append(" WHERE f_window_id = ?");
		String sql = buf.toString();		
		Connection conn = null;
		PreparedStatement pstmt = null;
		PreparedStatement pstmtFrame = null;
		PreparedStatement pstmtView = null;
		PreparedStatement pstmtWinRelFrame = null;
		PreparedStatement pstmtFrameRelView = null;
		
		ResultSet rest = null;
		ResultSet restFrame = null;		
		ResultSet restView = null;			
		ResultSet restWinRelFrame = null;
		ResultSet restFrameRelView = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,windowId);
			rest = pstmt.executeQuery();			
			while(rest.next()){			
				//得到windowVO,并赋给windowNode
				WindowVO windowVO = new WindowVO();
				windowVO.setAttribute(rest);
				windowNode.setWindowVO(windowVO);
				//根据window的行列属性定义window中frameNode数组的维数
				int wRow = windowVO.getRowCount();
				int wCol = windowVO.getColCount();
				FrameNode[][] frameNodeArry = new FrameNode[wRow][wCol];
				//根据windowId此得到此window下所有的frame
				pstmtFrame = getFrameSql(conn,windowId);
				restFrame = pstmtFrame.executeQuery();				
				while(restFrame.next()){
					FrameNode frameNode = new FrameNode(); 
					//首先得到构造frameNode需要的frameVO
					FrameVO frameVO = new FrameVO();
					frameVO.setAttribute(restFrame);
					frameNode.setFrameVO(frameVO);
					//得到frameId
					String frameId = String.valueOf(frameVO.getFrameId());
					//得到构造frameNode需要的viewVO[][]
					int vRow = frameVO.getRowCount();
					int vCol = frameVO.getColCount();
					ViewVO[][] viewVOArry = new ViewVO[vRow][vCol];					
					//根据frameId得到对应的view集合
					pstmtView = getViewPstmt(conn,frameId);
					restView = pstmtView.executeQuery();					
					while(restView.next()){
						ViewVO viewVO = new ViewVO();
						viewVO.setAttribute(restView);
						//得到viewId
						String viewId = String.valueOf(viewVO.getViewId());
						//根据frameId和viewId得到对应关系集合
						pstmtFrameRelView = getFrameRelviewPstmt(conn, frameId, viewId);
						restFrameRelView = pstmtFrameRelView.executeQuery();
						while(restFrameRelView.next()){
							//得到view在frame中的位置信息
							int vRowNum = restFrameRelView.getInt("f_row_num");
							int vColNum = restFrameRelView.getInt("f_col_num");
							//给frameNode中的view[][]赋值
							viewVOArry[vRowNum-1][vColNum-1] = viewVO;
						}
						frameNode.setViewArry(viewVOArry);
					}//循环结束后，frameNode的view[][]生成完成
					//至此一个frameNode已经生成
					//根据windowId frameId得到frame在window中的位置信息
					pstmtWinRelFrame = getWinRelFramePstmt(conn, windowId, frameId);
					restWinRelFrame = pstmtWinRelFrame.executeQuery();
					while(restWinRelFrame.next()){
						int fRowNum = restWinRelFrame.getInt("f_row_num");
						int fColNum = restWinRelFrame.getInt("f_col_num");
						//windowNode中的frameNode[][]赋值
						frameNodeArry[fRowNum-1][fColNum-1] = frameNode;
						//至此一个windowNode生成
					}
					windowNode.setFrameNodeArry(frameNodeArry);
				}
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,
					"UserDAOImpl--getWindowNodeByEmpId-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,
					"UserDAOImpl--getWindowNodeByEmpId-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		}		
    	return windowNode;
    }
	/*
	 * 查询语句 －－ 根据windowId得到属于此window的非框架组的frame集合
	 */
	private PreparedStatement getFrameSql(Connection conn, String windowId){
		PreparedStatement pstmt = null;
		String frameSql = "";
		StringBuffer buf = new StringBuffer(); 
		/*
		buf.append("SELECT  wf.f_frame_id,  wf.f_row_num,  wf.f_col_num, wf.f_rowspan,");
		buf.append(" wf.f_colspan,wf.f_width,  wf.f_height,   trim(wf.f_frame_group)");
		buf.append(" FROM om_WINDOW_REL_FRAME_t wf ,om_FRAME_t f ");
		buf.append(" WHERE wf.f_window_id = ? AND wf.f_frame_group IS NULL ");
		buf.append(" AND f.f_enabled = 1 AND wf.f_frame_id=f.f_frame_id ");
		*/
		buf.append("SELECT b.*");
		buf.append(" FROM om_window_rel_frame_t a, om_frame_t b ");
		buf.append(" WHERE f_window_id = ? AND a.f_frame_id = b.f_frame_id");
		frameSql = buf.toString();
		try {
			pstmt = conn.prepareStatement(frameSql);
			pstmt.setString(1,windowId);
		} catch (SQLException e) {
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,
					"UserDAOImpl--getFrameSql-1:"+e.getMessage());
			throw new DataAccessException(e);
		}
		
		return pstmt;
	}
	/*
	 * 查询语句 －－ 根据windowId和frameId得到两者之间的对应关系
	 */
	private PreparedStatement getWinRelFramePstmt(Connection conn, String windowId, String frameId){
		PreparedStatement pstmt = null;
		String sql = "";
		StringBuffer buf = new StringBuffer(); 
		buf.append("SELECT f_row_num, f_col_num");
		buf.append(" FROM om_window_rel_frame_t");
		buf.append(" WHERE f_window_id = ? AND f_frame_id = ?");
		sql = buf.toString();
		try {
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,windowId);
			pstmt.setString(2,frameId);
		} catch (SQLException e) {
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,
					"UserDAOImpl--getWinRelFramePstmt:"+e.getMessage());
			throw new DataAccessException(e);
		}		
		return pstmt;
	}
    /*
     * 根据frameId得到属于该frame的所有view
     */
	private PreparedStatement getViewPstmt(Connection conn,String frameId){
		PreparedStatement pstmt = null;
		String sql = "";
		StringBuffer buf = new StringBuffer(); 
		buf.append("SELECT b.*");
		buf.append(" FROM om_frame_rel_view_t a, om_view_t b ");
		buf.append(" WHERE a.f_view_id = b.f_view_id AND a.f_frame_id = ?");
		sql = buf.toString();
		try {
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,frameId);
		} catch (SQLException e) {
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,
					"UserDAOImpl--getViewPstmt:"+e.getMessage());
			throw new DataAccessException(e);
		}		
		return pstmt;
	}
	/*
	 * 根据frameId和viewId得到两者之间的关系
	 */
	private PreparedStatement getFrameRelviewPstmt(Connection conn, String frameId, String viewId){
		PreparedStatement pstmt = null;
		String sql = "";
		StringBuffer buf = new StringBuffer(); 
		buf.append("SELECT f_row_num, f_col_num");
		buf.append(" from om_frame_rel_view_t ");
		buf.append(" WHERE f_frame_id = ? AND f_view_id = ?");
		sql = buf.toString();
		try {
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,frameId);
			pstmt.setString(2,viewId);
		} catch (SQLException e) {
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,
					"UserDAOImpl--getFrameRelviewPstmt:"+e.getMessage());
			throw new DataAccessException(e);
		}		
		return pstmt;
	}

	/*
	 *  判断某职员是否有权查看某window
	 */
	public boolean ifHaveWinowRight(String employeeId, String windowId) throws DataAccessException{
		boolean haveRight = false;
		/*
		SELECT COUNT(*)
		FROM OM_EMPLOYEE_ROLE_RELATION_T a, OM_FUNC_ROLE_T b, OM_MENU_REL_WINDOW_T c
		WHERE a.f_employee_id = '999' AND a.f_role_id = b.f_role_id AND b.f_menu_id = c.f_menu_id AND c.f_window_id = '30001'
		*/
		StringBuffer buf = new StringBuffer();        
        buf.append(" SELECT COUNT(*)" +
        		" FROM OM_EMPLOYEE_ROLE_RELATION_T a, OM_FUNC_ROLE_T b, OM_MENU_REL_WINDOW_T c " +
        		" WHERE a.f_employee_id = ? AND a.f_role_id = b.f_role_id " +
        		"AND b.f_menu_id = c.f_menu_id AND c.f_window_id = ? ");
		String sql = buf.toString();		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,employeeId);
			pstmt.setString(2,windowId);
			rest = pstmt.executeQuery();			
			while(rest.next()){
				if(rest.getInt(1) != 0){
					haveRight = true;
				}
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,
					"UserDAOImpl--ifHaveWinowRight-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,
					"UserDAOImpl--ifHaveWinowRight-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		} 
		return haveRight;
	}

	/*
	 * 判断某职员是否有权限查看某view
	 */
	public boolean ifHaveViewRight(String employeeId, String viewId) throws DataAccessException{
		boolean haveRight = false;
		StringBuffer buf = new StringBuffer();        
        buf.append(" SELECT COUNT(*)" +
        		" FROM OM_EMPLOYEE_ROLE_RELATION_T a, OM_FUNC_ROLE_T b, OM_MENU_REL_VIEW_T c " +
        		" WHERE a.f_employee_id = ? AND a.f_role_id = b.f_role_id " +
        		"AND b.f_menu_id = c.f_menu_id AND c.f_view_id = ? ");
		String sql = buf.toString();		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,employeeId);
			pstmt.setString(2,viewId);
			rest = pstmt.executeQuery();			
			while(rest.next()){
				if(rest.getInt(1) != 0){
					haveRight = true;
				}
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,
					"UserDAOImpl--ifHabeViewRight-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,
					"UserDAOImpl--ifHabeViewRight-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		} 
		return haveRight;
	}

	/*
	 * 通过windowId得到窗口与框架的关系集合
	 */
	public WindowRelFrameColl getWindowRelFrameColl(String windowId) throws DataAccessException{
		WindowRelFrameColl winRelFrameColl = new WindowRelFrameColl();
		StringBuffer buf = new StringBuffer();        
        buf.append(" SELECT * FROM OM_WINDOW_REL_FRAME_T" +
        		" WHERE f_window_id = ? ");
		String sql = buf.toString();		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,windowId);
			rest = pstmt.executeQuery();			
			while(rest.next()){
				WindowRelFrameVO windowRelFrameVo = new WindowRelFrameVO();
				windowRelFrameVo.setAttribute(rest);
				winRelFrameColl.addElement(windowRelFrameVo);
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,
					"UserDAOImpl--getWindowRelFrameColl-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,
					"UserDAOImpl--getWindowRelFrameColl-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		} 
		return winRelFrameColl;
	}

	/*
	 * 根据输入的frameId得到属于此frame的所有view信息
	 */
	public FrameRelViewColl getFrameRelViewColl(String frameId) throws DataAccessException{
		FrameRelViewColl frameRelViewColl = new FrameRelViewColl();
		StringBuffer buf = new StringBuffer();        
        buf.append(" SELECT * FROM OM_FRAME_REL_VIEW_T" +
        		" WHERE f_frame_id = ? ");
		String sql = buf.toString();		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1,frameId);
			rest = pstmt.executeQuery();			
			while(rest.next()){
				FrameRelViewVO frameRelViewVO = new FrameRelViewVO();
				frameRelViewVO.setAttribute(rest);
				frameRelViewColl.addElement(frameRelViewVO);
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,
					"UserDAOImpl--getFrameRelViewColl-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,
					"UserDAOImpl--getFrameRelViewColl-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		} 
		return frameRelViewColl;
	}
    /**
     * 得到所有style
     * @return
     * @throws DataAccessException
     */
    public StyleColl getAllStyle() throws DataAccessException{
    	StyleColl coll = new StyleColl();
		StringBuffer buf = new StringBuffer();        
        buf.append(" SELECT * FROM om_style_t ");
		String sql = buf.toString();		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();			
			while(rest.next()){
				StyleVO styleVO = new StyleVO();
				styleVO.setAttribute(rest);
				coll.addElement(styleVO);
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,
					"UserDAOImpl--getAllStyle-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,
					"UserDAOImpl--getAllStyle-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		} 
    	return coll;
    }
    
    /**
     * 得到所有icon
     * @return
     * @throws DataAccessException
     */
    public IconColl getAllIcon() throws DataAccessException{
    	IconColl coll = new IconColl();
		StringBuffer buf = new StringBuffer();        
        buf.append(" SELECT * FROM om_icon_t ");
		String sql = buf.toString();		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rest = null;
		try{
			conn = getConnection();
			pstmt = conn.prepareStatement(sql);
			rest = pstmt.executeQuery();			
			while(rest.next()){
				IconVO iconVO = new IconVO();
				iconVO.setAttribute(rest);
				coll.addElement(iconVO);
			}            
		}catch(SQLException e){
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,
					"UserDAOImpl--getAllIcon-1:"+e.getMessage());
			throw new DataAccessException(e);
		}catch(Exception e){
			SysLog.writeLogs("om - ebisp",GlobalParameters.ERROR,
					"UserDAOImpl--getAllIcon-2:"+e.getMessage());
			throw new DataAccessException(e);
		}finally{
			close(rest,pstmt,conn);
		} 
    	return coll;
    	
    }
}
