/*

 * Copyright 
 4 original author or authors.

 *

 * Licensed under the Apache License, Version 2.0 (the "License");

 * you may not use this file except in compliance with the License.

 * You may obtain a copy of the License at

 *

 *    http://www.apache.org/licenses/LICENSE-2.0

 *

 * Unless required by applicable law or agreed to in writing, software

 * distributed under the License is distributed on an "AS IS" BASIS,

 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.

 * See the License for the specific language governing permissions and

 * limitations under the License.

 */

package com.neusoft.tdframework.demo.bo.staffer;

import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;

/**
 * 
 * Make up the checkboxes to select the presidents. The trick is to keep
 * 
 * a hidden field for each checkbox. The hidden field will keep track
 * 
 * of what was selected and will be modified by using javascript. The
 * 
 * reason for the hidden field is to deal with the fact that a checkbox value
 * 
 * is not submitted in a form submit, but the hidden field will.
 * 
 * The javascript will look as follows:
 * 
 * <script>
 * 
 * function setPresidentState(chkbx) {
 * 
 * if (chkbx.checked) {
 * 
 * eval('pres.chkbx_' + chkbx.name).value='SELECTED'; } else {
 * 
 * eval('pres.chkbx_' + chkbx.name).value='UNSELECTED'; } }
 * 
 * </script>
 * 
 * @author Jeff Johnston
 * 
 */

public class SelectedCell {
	
	public final static String SELECTED_ROWS = "SELECTED_ROWS";
	public final static String SELECTED = "SELECTED";
	public final static String UNSELECTED = "UNSELECTED";

	public static List selected(HttpServletRequest request) {
		
		List rows = (List) request.getSession().getAttribute(SELECTED_ROWS);

		if (rows == null) {
			rows = new ArrayList();
			request.getSession().setAttribute(SELECTED_ROWS, rows);
		}

		Enumeration parameterNames = request.getParameterNames();
		
		while (parameterNames.hasMoreElements()) {
			String parameterName = (String) parameterNames.nextElement();
			if (parameterName.startsWith("chkbx_")) {
				String presidentId = StringUtils.stripStart(parameterName,"chkbx_");
				String parameterValue = request.getParameter(parameterName);
				if (parameterValue.equals("on")) {
					if (!rows.contains(presidentId)) {
						rows.add(presidentId);
					}
				} else {
					rows.remove(presidentId);
				}
			}
		}
		return rows;
	}

	public static void remove(HttpServletRequest request) {
		request.getSession().removeAttribute(SELECTED_ROWS);
	}
}