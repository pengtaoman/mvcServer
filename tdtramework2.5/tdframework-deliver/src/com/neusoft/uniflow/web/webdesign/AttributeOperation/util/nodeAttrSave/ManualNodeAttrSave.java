package com.neusoft.uniflow.web.webdesign.AttributeOperation.util.nodeAttrSave;

import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.manualNodeForms.ManualNodeForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.ParticipantUtil;
import com.neusoft.workflow.model.ExtendProperty;
import com.neusoft.workflow.model.ManualNode;
import com.neusoft.workflow.model.Participant;
import com.neusoft.workflow.model.ParticipantType;
import com.neusoft.workflow.model.Participants;
import com.neusoft.workflow.model.ProcessContentDocument;
import com.neusoft.workflow.model.AssignRuleType.Enum;


public class ManualNodeAttrSave {
		
	public static ManualNode save(ProcessContentDocument doc ,ManualNodeForm form , String id){
		ManualNode manual = null;
	   	String namespace ="declare namespace s='http://workflow.neusoft.com/model/'";
        String pathExpression =  "./s:ProcessContent/Process//ManualNode";
        ManualNode[] results = (ManualNode[])doc.selectPath(namespace+pathExpression);
		if (results.length > 0) {
			for (int i = 0; i < results.length; i++) {
				if (results[i].getID().equals(id)) {
					manual = results[i];
				}
			}
		}
		String[] variable= form.getVariablesString().split(";");
		String[] node=form.getNodeArraryString().split(";");
		String[] mVariable= form.getMinorVariablesString().split(";");
		String[] mNode=form.getMinorNodeArraryString().split(";");
    	if( null != manual)	
    	{
//    		manual.setApplication(form.getApplication());
//    		manual.setApplicationParams(form.getApplicationParams());
            
    		Participant [] persons = null;
    		if( manual.getParticipants()!=null){
    		   persons = manual.getParticipants().getParticipantArray();
    		   if(persons != null){
    		   for(int i=persons.length;i>0;i--){ 
    			   manual.getParticipants().removeParticipant(0);
    		   }
    	      }
    		}else{
    			manual.addNewParticipants();
    		}
    		if(variable!=null){
    			for(int i=0;i<variable.length;i++){
    				if(variable[i].toString().equals("")){
    					continue;
    				}
    				Participant participant =  manual.getParticipants().addNewParticipant();
    				participant.setAuthorityType("1");
    				participant.setValue(variable[i].toString());
    				participant.setType(ParticipantType.X_8);
    		}
    		}
    		if(mVariable!=null){
    			for(int i=0;i<mVariable.length;i++){
    				if(mVariable[i].toString().equals("")){
        				continue;
        			}
    				Participant participant =  manual.getParticipants().addNewParticipant();
    				participant.setAuthorityType("0");
    				participant.setValue(mVariable[i].toString());
    				participant.setType(ParticipantType.X_8);
    		}
    		}
    		if(node!=null){
    			for(int i=0;i<node.length;i++){
    				if(node[i].toString().equals("")){
    					continue;
    				}
    				Participant participant =  manual.getParticipants().addNewParticipant();
    				participant.setAuthorityType("1");
    				participant.setValue(node[i].toString());
    				participant.setType(ParticipantType.X_7);
    		}
    		}
    		if(mNode!=null){
    			for(int i=0;i<mNode.length;i++){
    				if(mNode[i].toString().equals("")){
    					continue;
    				}
    				Participant participant =  manual.getParticipants().addNewParticipant();
    				participant.setAuthorityType("0");
    				participant.setValue(mNode[i].toString());
    				participant.setType(ParticipantType.X_7);
    		}
    		}
    		manual.setOperationLevel(com.neusoft.workflow.model.OperationLevelType.Enum.forString(form.getOpertionLevel()));
    		manual.setAssignRule(com.neusoft.workflow.model.AssignRuleType.Enum.forString(form.getAssignRule()));
    		manual.setApplication(form.getApplication());
    		ParticipantUtil.setParticipant(form.getMinorPeople(), "0", manual.getParticipants());
    	    ParticipantUtil.setParticipant(form.getPrimaryPeople(), "1", manual.getParticipants());
            for(int i=2;i<6;i++){
            	if(form.getPrimaryPreDefine().toString().indexOf(Integer.toString(i))!=-1){
            		Participant participant =  manual.getParticipants().addNewParticipant();
            		participant.setAuthorityType("1");
                	participant.setValue(Integer.toString(i));
                	participant.setType(ParticipantType.X_10);
            	}
            	if(form.getMinorPreDefine().toString().indexOf(Integer.toString(i))!=-1){
            		Participant participant =  manual.getParticipants().addNewParticipant();
            		participant.setAuthorityType("0");
                	participant.setValue(Integer.toString(i));
                	participant.setType(ParticipantType.X_10);
            	}
            }

            ActivityNodeAttrSave.save(manual, form , "ManualNode");
            
    	}

    	return manual;
    }
}
