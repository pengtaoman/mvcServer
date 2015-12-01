package com.neusoft.uniflow.web.util;

import java.util.ArrayList;
import java.util.Vector;

public class PredictWorkItemInfoLists {
	
	private ArrayList errors = new ArrayList(1);
	
	private Vector predictWorkItemInfoLists = new Vector(5);

	public int getSize() {
		return predictWorkItemInfoLists.size();
	}


	public Vector getPredictWorkItemInfoLists() {
		return predictWorkItemInfoLists;
	}

	public void setPredictWorkItemInfoLists(Vector predictWorkItemInfoLists) {
		this.predictWorkItemInfoLists = predictWorkItemInfoLists;
	}


	public ArrayList getErrors() {
		return errors;
	}
	
}
