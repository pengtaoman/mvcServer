package com.neusoft.tdframework.common.util.json;

import java.util.HashMap;
import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.TypeAdapter;
import com.google.gson.TypeAdapterFactory;
import com.google.gson.reflect.TypeToken;

public class TdTypeAdapterFactory<T> implements TypeAdapterFactory {

	private Map<String,TypeAdapter<T>> regAdapterMap = new HashMap<String,TypeAdapter<T>>();

	@SuppressWarnings("unchecked")
	public void regAdapter(String typeName, TypeAdapter typeAdapter) {
		regAdapterMap.put(typeName, (TypeAdapter<T>) typeAdapter);
	}
	
	public void clearAdapterMap() {
		regAdapterMap.clear();
		regAdapterMap = null;
	}

	@SuppressWarnings("hiding")
	public <T> TypeAdapter<T> create(Gson gson, TypeToken<T> typeToken) {
		try {
			if (regAdapterMap.size()> 0) {
				for (String typeName : regAdapterMap.keySet()) {
					if (typeToken.getRawType() == Class.forName(typeName)) {
						@SuppressWarnings("unchecked")
						TypeAdapter<T> result = (TypeAdapter<T>) regAdapterMap.get(typeName);
						return result;
					} 
				}
				
			} else {
				return null;
			}
		} catch (Exception ex) {
			return null;
		}
		return null;
	}
}
