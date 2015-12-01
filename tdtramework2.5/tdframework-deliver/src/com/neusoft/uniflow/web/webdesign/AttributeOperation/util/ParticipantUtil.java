package com.neusoft.uniflow.web.webdesign.AttributeOperation.util;

import java.util.ArrayList;

import com.neusoft.org.NWOrg;
import com.neusoft.org.NWPerson;
import com.neusoft.org.NWRole;
import com.neusoft.uniflow.web.util.WorkflowManager;
import com.neusoft.workflow.model.Participant;
import com.neusoft.workflow.model.ParticipantType;
import com.neusoft.workflow.model.Participants;
import com.neusoft.workflow.model.ParticipantType.Enum;

public class ParticipantUtil {
	private static final String primary_partition = ";";
	private static final String minor_partition = "|";

	/*
	 * setParticipant by participantType , authorityType
	 */
	public static boolean setParticipant(String str,
			com.neusoft.workflow.model.ParticipantType.Enum participantType,
			String authorityType, Participants persons) {
		boolean isSet = false;

		if ("".equals(str)) {
			str = null;
		}
		if (str == null) {
		} else {
			int k = str.indexOf(";");
			Participant participant = persons.addNewParticipant();
			participant.setAuthorityType(authorityType);
			participant.setType(participantType);
			if (k == -1) {
				participant.setValue(str);
			} else {
				String temp = str.substring(0, k);
				participant.setValue(temp);
				while (k > 0) {
					int n = k;
					k = str.indexOf(";", k + 1);
					if (k <= 0) {
						temp = str.substring(n + 1);
					} else {
						temp = str.substring(n + 1, k);
					}
					Participant parti = persons.addNewParticipant();
					parti.setAuthorityType(authorityType);
					parti.setType(participantType);
					parti.setValue(temp);
				}

			}
			isSet = true;
		}
		return isSet;
	}

	/*
	 * setParticipant by only authorityType
	 */
	public static boolean setParticipant(String str, String authorityType,
			Participants persons) {
		boolean isSet = false;

		if ("".equals(str)) {
			str = null;
		}
		if (str == null) {
		} else {
			int k = str.indexOf(primary_partition);
			String temp = null;
			if (k == -1) {
				temp = str;
			} else {
				temp = str.substring(0, k);
			}
			int m = temp.indexOf(minor_partition);
			String name = null;
			String value = null;
			name = temp.substring(0, m);
			value = temp.substring(m + 1);

			if ("1".equals(value) || "0".equals(value)) {
				Participant participant = persons.addNewParticipant();
				participant.setAuthorityType(authorityType);
				participant.setType(Enum.forString(value));
				participant.setValue(name);
			} else {
				System.out.println("partitipantType is not in (0 , 1),it is "
						+ value);
			}

			while (k > 0) {
				int n = k;
				k = str.indexOf(primary_partition, k + 1);
				if (k <= 0) {
					temp = str.substring(n + 1);
					m = temp.indexOf(minor_partition);
					name = temp.substring(0, m);
					value = temp.substring(m + 1);
				} else {
					temp = str.substring(n + 1, k);
					m = temp.indexOf(minor_partition);
					name = temp.substring(0, m);
					value = temp.substring(m + 1);
				}
				if ("1".equals(value) || "0".equals(value)) {
					Participant parti = persons.addNewParticipant();
					parti.setAuthorityType(authorityType);
					parti.setType(Enum.forString(value));
					parti.setValue(name);
				} else {
					System.out
							.println("partitipantType is not in (0 , 1),it is "
									+ value);
				}

			}
			isSet = true;
		}
		return isSet;
	}

	public static ArrayList getPrimaryParticipant(Participant[] particpants)
			throws Exception {
		NWOrg org = WorkflowManager.getNWOrg();
		ArrayList array = new ArrayList();
		String unit = "";
		String names = "";
		String id = "";
		for (int i = 0; i < particpants.length; i++) {
			if ("1".equals(particpants[i].getAuthorityType())) {

				if (particpants[i].getType().intValue() == ParticipantType.INT_X_0) {
					NWPerson person = org.getPerson(particpants[i].getValue());
					if (null != person) {
						names += person.getName() + ";";
						unit += person.getName() + "," + person.getID() + "|0"
								+ ";";
						id += person.getID() + "|0" + ";";
					} else {
						names += particpants[i].getValue() + ";";
						unit += particpants[i].getValue() + ","
								+ particpants[i].getValue() + "|0" + ";";
						id += particpants[i].getValue() + "|0" + ";";
					}
				} else if (particpants[i].getType().intValue() == ParticipantType.INT_X_1) {
					NWRole role = org.getRole(particpants[i].getValue());
					if (null != role) {
						names += role.getName() + ";";
						unit += role.getName() + "," + role.getID() + "|1"
								+ ";";
						id += role.getID() + "|1" + ";";
					} else {
						names += particpants[i].getValue() + ";";
						unit += particpants[i].getValue() + ","
								+ particpants[i].getValue() + "|1" + ";";
						id += particpants[i].getValue() + "|1" + ";";
					}
				}
			}
		}
		array.add(unit);
		array.add(names);
		array.add(id);
		return array;
	}

	public static ArrayList getParticipant(Participant[] particpants)
			throws Exception {
		NWOrg org = WorkflowManager.getNWOrg();
		ArrayList array = new ArrayList();
		String unit = "";
		String names = "";
		String id = "";
		for (int i = 0; i < particpants.length; i++) {
			if (particpants[i].getType().intValue() == ParticipantType.INT_X_0) {
				NWPerson person = org.getPerson(particpants[i].getValue());
				if (null != person) {
					names += person.getName() + ";";
					unit += person.getName() + "," + person.getID() + "|0"
							+ ";";
					id += person.getID() + "|0" + ";";
				}else{
					names += particpants[i].getValue() + ";";
					unit += particpants[i].getValue() + "," + particpants[i].getValue() + "|0"
							+ ";";
					id += particpants[i].getValue() + "|0" + ";";
				}

			} else if (particpants[i].getType().intValue() == ParticipantType.INT_X_1) {
				NWRole role = org.getRole(particpants[i].getValue());
				if (null != role) {
					names += role.getName() + ";";
					unit += role.getName() + "," + role.getID() + "|1" + ";";
					id += role.getID() + "|1" + ";";
				}else{
					names += particpants[i].getValue() + ";";
					unit += particpants[i].getValue() + "," + particpants[i].getValue() + "|1" + ";";
					id += particpants[i].getValue() + "|1" + ";";
				}
			}
		}
		array.add(unit);
		array.add(names);
		array.add(id);
		return array;
	}

	public static ArrayList getMinorParticipant(Participant[] particpants)
			throws Exception {
		NWOrg org = WorkflowManager.getNWOrg();
		ArrayList array = new ArrayList();
		String unit = "";
		String names = "";
		String id = "";
		for (int i = 0; i < particpants.length; i++) {
			if ("0".equals(particpants[i].getAuthorityType())) {
				if (particpants[i].getType().intValue() == ParticipantType.INT_X_0) {
					NWPerson person = org.getPerson(particpants[i].getValue());
					if (null != person) {
						names += person.getName() + ";";
						unit += person.getName() + "," + person.getID() + "|0"
								+ ";";
						id += person.getID() + "|0" + ";";
					}else{
						names += particpants[i].getValue() + ";";
						unit += particpants[i].getValue() + "," + particpants[i].getValue() + "|0"
								+ ";";
						id += particpants[i].getValue() + "|0" + ";";
					}
				} else if (particpants[i].getType().intValue() == ParticipantType.INT_X_1) {
					NWRole role = org.getRole(particpants[i].getValue());
					if (null != role) {
						names += role.getName() + ";";
						unit += role.getName() + "," + role.getID() + "|1"
								+ ";";
						id += role.getID() + "|1" + ";";
					}else{
						names += particpants[i].getValue() + ";";
						unit += particpants[i].getValue() + "," + particpants[i].getValue() + "|1"
								+ ";";
						id += particpants[i].getValue() + "|1" + ";";
					}
				}
			}
		}
		array.add(unit);
		array.add(names);
		array.add(id);
		return array;
	}

	public static String getPrimaryPreDefine(Participant[] particpants)
			throws Exception {
		String primaryPreDefine = "";
		for (int i = 0; i < particpants.length; i++) {
			if ("1".equals(particpants[i].getAuthorityType())) {
				if ("10".equals(particpants[i].getType().toString())) {
					primaryPreDefine += particpants[i].getValue() + ";";
				}
			}
		}
		return primaryPreDefine;
	}

	public static String getMinorPreDefinePreDefine(Participant[] particpants)
			throws Exception {
		String primaryPreDefine = "";
		for (int i = 0; i < particpants.length; i++) {
			if ("0".equals(particpants[i].getAuthorityType())) {
				if ("10".equals(particpants[i].getType().toString())) {
					primaryPreDefine += particpants[i].getValue() + ";";
				}
			}
		}
		return primaryPreDefine;
	}

	public static String getPrimaryVariablesParticipant(
			Participant[] particpants) throws Exception {
		String primaryVariablesParticipant = "";
		for (int i = 0; i < particpants.length; i++) {
			if ("1".equals(particpants[i].getAuthorityType())) {
				if ("8".equals(particpants[i].getType().toString())) {
					primaryVariablesParticipant += particpants[i].getValue()
							+ ";";
				}
			}
		}
		return primaryVariablesParticipant;
	}

	public static String getMinorVariablesParticipant(Participant[] particpants)
			throws Exception {
		String minorVariablesParticipant = "";
		for (int i = 0; i < particpants.length; i++) {
			if ("0".equals(particpants[i].getAuthorityType())) {
				if ("8".equals(particpants[i].getType().toString())) {
					minorVariablesParticipant += particpants[i].getValue()
							+ ";";
				}
			}
		}
		return minorVariablesParticipant;
	}

	public static String getPrimaryNodeParticipant(Participant[] particpants)
			throws Exception {
		String primaryNodeParticipant = "";
		for (int i = 0; i < particpants.length; i++) {
			if ("1".equals(particpants[i].getAuthorityType())) {
				if ("7".equals(particpants[i].getType().toString())) {
					primaryNodeParticipant += particpants[i].getValue() + ";";
				}
			}
		}
		return primaryNodeParticipant;
	}

	public static String getMinorNodeParticipant(Participant[] particpants)
			throws Exception {
		String minorNodeParticipant = "";
		for (int i = 0; i < particpants.length; i++) {
			if ("0".equals(particpants[i].getAuthorityType())) {
				if ("7".equals(particpants[i].getType().toString())) {
					minorNodeParticipant += particpants[i].getValue() + ";";
				}
			}
		}
		return minorNodeParticipant;
	}
}
