package com.neusoft.uniflow.web.webdesign.util.beans;

import com.neusoft.org.NWOrg;
import com.neusoft.uniflow.api.def.NWParticipantEntity;
import com.neusoft.uniflow.util.Util;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class ToolTipUtil {

	public static ToolTipUtil getInstance() {
		return new ToolTipUtil();
	}

	public String execute(String ids) {
		if (!Util.isNullOrEmpty(ids)) {
			ids = ids.trim();
			ids = ids.substring(0, ids.length() - 1);
			String[] partiTypeAndId = ids.split(";");
			for (int i = 0; i < partiTypeAndId.length; i++) {
				int partiType = Integer.parseInt(partiTypeAndId[i].split(",")[0]);
				String partiId = partiTypeAndId[i].split(",")[1];
				if(partiType == NWParticipantEntity.PTCPTENTITY_TYPE_PERSON || partiType == NWParticipantEntity.PTCPTENTITY_TYPE_ROLE){
					String partiName = getName(partiId, partiType);
					ids = ids.replaceAll(partiId, partiName);
				}
			}
		}
		return ids;
	}

	private String getName(String id, int partiType) {
		NWOrg org = WorkflowManager.getNWOrg();
		String name = null;
		try {
			if (partiType == NWParticipantEntity.PTCPTENTITY_TYPE_PERSON) {
				name = org.getPerson(id).getName();
			} else if (partiType == NWParticipantEntity.PTCPTENTITY_TYPE_ROLE) {
				name = org.getRole(id).getName();
			}
		} catch (Exception e) {
			
		}
		if (name == null) {
			name = id;
		}
		return name;
	}
}
