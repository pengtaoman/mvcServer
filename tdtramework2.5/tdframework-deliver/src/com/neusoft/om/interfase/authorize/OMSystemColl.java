package com.neusoft.om.interfase.authorize;

//import com.neusoft.tdframework.authorization.SystemColl;
import com.neusoft.om.dao.system.SystemColl;
import com.neusoft.tdframework.authorization.SystemVO;

/**
 * @author chenzt
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public class OMSystemColl implements com.neusoft.tdframework.authorization.SystemColl{
	
	private SystemColl systemColl = null;
	
	
	/* (non-Javadoc)
	 * @see com.neusoft.tdframework.authorization.SystemColl#getSystem(int)
	 */
	public SystemVO getSystem(int index) {
		return systemColl.getSystem(index);
	}

	/* (non-Javadoc)
	 * @see com.neusoft.tdframework.authorization.SystemColl#getSystem(java.lang.String)
	 */
	public SystemVO getSystem(String systemId) {
		return systemColl.getSystem(systemId);
	}
	
	/**
	 * @param coll
	 */
	public void setSystemColl(SystemColl coll) {
		systemColl = coll;
	}

	/* (non-Javadoc)
	 * @see com.neusoft.tdframework.authorization.SystemColl#getRowCount()
	 */
	public int getRowCount() {
		return systemColl.getRowCount();
	}

}
