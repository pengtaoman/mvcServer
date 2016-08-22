package com.lilai.crm.es.document;

import org.springframework.data.annotation.Id;  
import org.springframework.data.elasticsearch.annotations.Document;  
import org.springframework.data.elasticsearch.annotations.Field;  
import org.springframework.data.elasticsearch.annotations.FieldIndex;  
import org.springframework.data.elasticsearch.annotations.FieldType;  

 
//@Document(indexName = "city_code_188", type = "-1") 
public class StandardAddress {

	private String id;
	
	private String city_code;
	
	private String area_id;
	
	private String area_code;
	
	private String area_name;
	
	private String area_level;
	
	private String area_desc;
	
	
	private String parent_area_id;
	
	private String additionalinfo;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getCity_code() {
		return city_code;
	}

	public void setCity_code(String city_code) {
		this.city_code = city_code;
	}

	public String getArea_id() {
		return area_id;
	}

	public void setArea_id(String area_id) {
		this.area_id = area_id;
	}

	public String getArea_code() {
		return area_code;
	}

	public void setArea_code(String area_code) {
		this.area_code = area_code;
	}

	public String getArea_name() {
		return area_name;
	}

	public void setArea_name(String area_name) {
		this.area_name = area_name;
	}

	public String getArea_level() {
		return area_level;
	}

	public void setArea_level(String area_level) {
		this.area_level = area_level;
	}

	public String getArea_desc() {
		return area_desc;
	}

	public void setArea_desc(String area_desc) {
		this.area_desc = area_desc;
	}

	public String getParent_area_id() {
		return parent_area_id;
	}

	public void setParent_area_id(String parent_area_id) {
		this.parent_area_id = parent_area_id;
	}

	public String getAdditionalinfo() {
		return additionalinfo;
	}

	public void setAdditionalinfo(String additionalinfo) {
		this.additionalinfo = additionalinfo;
	}
	
}
