package com.neusoft.tdframework.listener;

import javax.persistence.PrePersist;

import com.google.gson.Gson;

public class EntityListener {
	
	private static final Gson gs = new Gson();
	
	@PrePersist
	public void prePersistEntity(Object entity) {
		System.out.println("*******???hashCode::  " + this.hashCode() + "~~~~" + gs.hashCode());
		System.out.println("*******???  " + gs.toJson(entity));
	}
}
