package com.neusoft.uniflow.web.util;

import java.util.Comparator;
import java.util.Date;

import com.neusoft.uniflow.api.handler.NWActInst;


public class ActInstCompleteTimeComparator implements Comparator {

	public int compare(Object sql1, Object sql2) {
		Date date1 = ((NWActInst) sql1).getCompleteTime();
		Date date2 = ((NWActInst) sql2).getCompleteTime();
		return date1.compareTo(date2);

	}

}
