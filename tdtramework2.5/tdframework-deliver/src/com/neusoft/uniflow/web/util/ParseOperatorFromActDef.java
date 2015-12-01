package com.neusoft.uniflow.web.util;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Vector;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.def.NWActDef;
import com.neusoft.uniflow.api.def.NWParticipantEntity;
import com.neusoft.uniflow.api.def.NWRelData;
import com.neusoft.uniflow.api.handler.NWActInst;
import com.neusoft.uniflow.api.handler.NWProcInst;
import com.neusoft.uniflow.api.handler.NWWorkItem;
import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.common.StorageException;
import com.neusoft.uniflow.engine.Engine;
import com.neusoft.uniflow.engine.EngineFactory;
import com.neusoft.uniflow.engine.def.ProcessDef;
import com.neusoft.uniflow.engine.exception.EngineException;
import com.neusoft.uniflow.engine.inst.ProcessInstance;
import com.neusoft.uniflow.engine.operator.Operator;
import com.neusoft.uniflow.engine.persist.IVariablePersistAdaptor;
import com.neusoft.uniflow.engine.variable.Variable;
import com.neusoft.uniflow.engine.variable.XMLVariable;
import com.neusoft.uniflow.util.Util;

public class ParseOperatorFromActDef {

	private static Engine engine = null;

	/**
	 * 取得未生成实例的节点定义的参与者。
	 * <p>
	 * 先从变量中取得，如果为
	 * 
	 * @param variables
	 *            相关变量集合
	 * @param operators
	 *            通过节点定义获取的办理人员operator列表
	 * @return
	 * @throws EngineException
	 */
	private static Vector getOperators(ProcessInstance procInst,
			Vector operators, Vector varables) throws NWException {
		Vector retOperators = new Vector();
		for (int i = 0; i < operators.size(); i++) {
			Operator operator = (Operator) operators.elementAt(i);
			switch (operator.getType()) {
			// 流程实例创建者
			case Operator.OPERATOR_TYPE_CREATER:
				operator.setID(procInst.getCreater());
				operator.setType(Operator.OPERATOR_TYPE_PERSONNEL);
				retOperators.addElement(operator);
				break;
			case Operator.OPERATOR_TYPE_ACTIVITY:
				NWSession session =UniflowManager.getNWSession();
				String actDefId = operator.getEntityID();
				List matchedWorkItems = new ArrayList();
				Vector completedActInsts = session.getActInstManager()
						.openActInstListByActDefID("", 16, actDefId ,procInst.getProcInstID());
				if (completedActInsts.size() > 0) {
					Collections.sort(completedActInsts,
							new ActInstCompleteTimeComparator());
					NWActInst actInst = (NWActInst) completedActInsts.get(0);
					Vector completedWorkItems = session.getWorkItemManager()
							.openWorkitemListByActDefID(16, actDefId ,actInst.getProcInstID());
					for (int j = 0; j < completedWorkItems.size(); j++) {
						NWWorkItem workItem = (NWWorkItem) completedWorkItems
								.get(j);
						if (workItem.getActInstID().equals(
								actInst.getActInstID())) {
							matchedWorkItems.add(workItem);
						}
					}
				}
				for (int j = 0; j < matchedWorkItems.size(); j++) {
					NWWorkItem workItem = (NWWorkItem) matchedWorkItems.get(j);
					Operator oper = new Operator();
					oper.setAccount(workItem.getUserName());
					oper.setID(workItem.getUserID());
					oper.setType(workItem.getUserType());
					oper.setOriginID(workItem.getOriginalID());
					oper.setOriginName(workItem.getOriginalName());
					oper.setOriginType(workItem.getOriginalType());
					oper.setActorID(workItem.getActorID());
					oper.setActorName(workItem.getActorName());
					oper.setActorType(workItem.getActorType());
					oper.setEntityID(workItem.getEntityID());
					oper.setEntityType(workItem.getEntityType());
					oper.setActionType(workItem.getActionType());
					retOperators.add(oper);
				}
				break;
			case Operator.OPERATOR_TYPE_VARIABLE:
				// 参与者是变量，变量中可以存多人
				// 变量的格式为：type1,id1;type2,id2
				// 变量格式新改为
				ProcessDef processDef = (ProcessDef) procInst.getProcDef();
				Vector vars = processDef.getVariableList();
				String varName = getVarNameByID(vars, operator.getID());
				Variable variable = getVariableByName(varName, varables);
				if (variable.getType() == NWRelData.RELDATA_TYPE_XML) {
					XMLVariable xmlVar = variable.getXmlObject(procInst
							.getProcInstID());
					retOperators.addAll(xmlVar.getParti());
				} else {
					String varValue = getVariableValue(variable, procInst
							.getProcInstID());
					if (!Util.isNullOrEmpty(varValue)) {
						String[] operas = varValue.split(";");
						for (int l = 0; l < operas.length; l++) {
							String opera = operas[l];
							int m = opera.indexOf(",");
							if (m > 0) {
								Operator oper = new Operator();
								oper.setID(opera.substring(m + 1));
								oper
										.setActionType(Operator.OPERATION_TYPE_COMPULSORY);
								oper.setType(Integer.parseInt(opera.substring(
										0, m)));
								retOperators.addElement(oper);
							} else {
								continue;
							}
						}
					}
				}
				break;
			case Operator.OPERATOR_TYPE_PERSONNEL:
				retOperators.addElement(operator);
				break;
			case Operator.OPERATOR_TYPE_ROLE:
				retOperators.addElement(operator);
				break;
			default:
				break;

			}
		}
		return retOperators;
	}
	
	private static Vector filterCompletedActInsts(Vector completedActInsts, ProcessInstance procInst){
		Vector ret = new Vector(5);
		for(int i=0; i < completedActInsts.size(); i++){
			NWActInst actInst = (NWActInst) completedActInsts.get(i);
			if(actInst.getProcInstID().equals(procInst.getProcInstID())){
				ret.add(actInst);
			}
		}
		return ret;
	}

	/**
	 * 根据流程实例和节点定义ID获取该节点定义的办理人信息
	 * 
	 * @param procInstID
	 *            流程实例ID
	 * @param actDefID
	 *            节点定义ID
	 * @return operator对象 集合
	 * @throws NWException
	 */
	public static Vector getOperators(String procInstID, String actDefID)
			throws NWException {
		NWSession nwsession = UniflowManager.getNWSession();
		NWActDef actDef = nwsession.getActDef(actDefID, 0);
		ProcessInstance procInst = (ProcessInstance) nwsession.getProcInst("",
				procInstID);
		Vector participants = actDef.openParticipantList();
		Vector operators = convertToOperators(participants);
		Vector variableList = getRunningVariables(procInst);
		return getOperators(procInst, operators, variableList);

	}

	/**
	 * 从流程实例中的特点节点中获取节点的扩展属性值信息
	 * 
	 * @param procInst
	 *            流程实例
	 * @param actDef
	 *            节点定义
	 * @param extProperty
	 *            扩展属性的名称
	 * @return string 对象 集合
	 * @throws Exception
	 */
	public static String getActExtPropertyValue(NWProcInst procInst,
			NWActDef actDef, String extProperty) throws Exception {
		String varID = actDef.getExtendProperty(extProperty);
		if (varID != null) {
			String tempChar = varID.substring(0, 1);// 去掉变量ID前面的＃号
			if (tempChar.equals("#")) {
				return getVariableValue(procInst, varID.substring(1));
			} else {
				return varID;
			}
		} else
			return null;

	}

	// 通过指定的变量列表获取变量值
	private static String getVariableValue(String varID, NWProcInst procInst,
			Vector varables) throws Exception {
		ProcessDef processDef = (ProcessDef) procInst.getProcDef();
		Vector vars = processDef.getVariableList();
		String varName = getVarNameByID(vars, varID);
		Variable variable = getVariableByName(varName, varables);
		return getVariableValue(variable, procInst.getProcInstID());
	}

	// 根据现有运行的变量获取变量的值
	private static String getVariableValue(NWProcInst procInst, String varID)
			throws Exception {
		Vector variableList = getRunningVariables(procInst);
		return getVariableValue(varID, procInst, variableList);
	}

	// 获取运行态的变量列表
	private static Vector getRunningVariables(NWProcInst procinst)
			throws NWException {
		NWActInst actInst = null;
		Vector vars = null;
		Vector actinsts = procinst.openActInstList(6);

		for (int k = 0; k < actinsts.size(); k++) {

			actInst = (NWActInst) actinsts.get(k);
			if (actInst.getType() == NWActDef.ACT_TYPE_MANUAL)
				break;
		}
		if (actInst != null)
			vars = actInst.openRelDataList();
		else
			vars = procinst.openRelDataList();

		return vars;
	}

	private static Engine getEngine() throws EngineException {
		if (engine == null) {
			engine = EngineFactory.getEngine();
		}
		return engine;
	}

	private static IVariablePersistAdaptor getVariablePersistAdaptor()
			throws EngineException {
		return getEngine().getPersistManager().getVariablePersistAdaptor();
	}

	/**
	 * @param variable
	 * @return 如果变量配置了变量处理类，则从变量处理类中取值
	 * @throws NWException
	 */
	protected static String getVariableValue(Variable variable,
			String procInstID) throws NWException {
		String app = variable.getApplication();
		String ret = null;
		if (app != null && !app.equals("")) {
			ret = variable.getStringValue(procInstID);
		} else {
			ret = variable.getValue();
		}
		return ret;
	}

	/**
	 * 根据变量名返回变量对象
	 * 
	 * @param name
	 * @return 如果该变量不存在返回null；若变量存在且没有值，返回“”。
	 * @throws EngineException
	 */
	protected static Variable getVariableByName(String name, Vector variableList)
			throws NWException {
		if (name == null)
			return null;
		Variable variable = null;
		for (int i = 0; i < variableList.size(); i++) {
			Variable varTemp = (Variable) variableList.elementAt(i);
			if (varTemp.getName().equalsIgnoreCase(name)) {
				variable = varTemp;
				break;
			}
		}
		return variable;
	}

	protected static String getVarNameByID(Vector variableDefs, String defID) {
		String name = "";
		for (int i = 0; i < variableDefs.size(); i++) {
			Variable variable = (Variable) variableDefs.elementAt(i);
			if (variable.getDefID().equals(defID)) {
				name = variable.getName();
				break;
			}
		}
		return name;
	}

	private static Vector convertToOperators(Vector participants) {
		NWParticipantEntity parEn;
		Vector operators = new Vector();
		Operator operator;
		for (int i = 0; i < participants.size(); i++) {
			parEn = (NWParticipantEntity) participants.get(i);
			operator = new Operator();
			operator.setID(parEn.getEntityID());
			operator.setActionType(parEn.getActionType());
			operator.setType(parEn.getEntityType());
			operator.setEntityID(parEn.getEntityID());
			operator.setEntityType(parEn.getEntityType());
			operator.setActionType(parEn.getActionType());
			operators.add(operator);

		}
		return operators;
	}

}