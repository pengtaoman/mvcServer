package com.neusoft.tdframework.chart.action;



import java.io.File;
import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.jfree.chart.servlet.ChartDeleter;
import org.jfree.chart.servlet.ServletUtilities;

import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.web.struts.BaseAction;

/**
 * <p>Date       : 2004-12-20</p>
 * <p>Module     : 
 * <p>Description: 
 * <p>Remark     : </p>
 * @author mdj
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */
public class ChartDisplayAction extends BaseAction {

	/**
	 * 
	 */
	public ActionForward service(
		ActionMapping mapping,
		ActionForm form,
		HttpServletRequest request,
		HttpServletResponse response)
		throws ActionException {
        HttpSession session = request.getSession();
        String filename = request.getParameter("filename");

        if (filename == null) {
            throw new ActionException("Parameter 'filename' must be supplied");
        }

        //  Replace ".." with ""
        //  This is to prevent access to the rest of the file system
        filename = ServletUtilities.searchReplace(filename, "..", "");

        //  Check the file exists
        File file = new File(System.getProperty("java.io.tmpdir"), filename);
        if (!file.exists()) {
            throw new ActionException("File '" + file.getAbsolutePath() + "' does not exist");
        }

        //  Check that the graph being served was created by the current user
        //  or that it begins with "public"
        boolean isChartInUserList = false;
        ChartDeleter chartDeleter = (ChartDeleter) session.getAttribute("JFreeChart_Deleter");
        if (chartDeleter != null) {
            isChartInUserList = chartDeleter.isChartAvailable(filename);
        }

        boolean isChartPublic = false;
        if (filename.length() >= 6) {
            if (filename.substring(0, 6).equals("public")) {
                isChartPublic = true;
            }
        }

        if (isChartInUserList || isChartPublic) {
            try {
                //  Serve it up
                ServletUtilities.sendTempFile(file, response);
            } catch (IOException e) {
                throw new ActionException(e);
            }
        }
        else {
            throw new ActionException("Chart image not found");
        }
    
	    return mapping.findForward("");
		}
}
