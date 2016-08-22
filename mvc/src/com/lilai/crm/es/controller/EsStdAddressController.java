package com.lilai.crm.es.controller;


import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.elasticsearch.action.delete.DeleteResponse;
import org.elasticsearch.action.index.IndexRequestBuilder;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.search.SearchRequestBuilder;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.action.search.SearchType;
import org.elasticsearch.action.update.UpdateRequest;
import org.elasticsearch.action.update.UpdateRequestBuilder;
import org.elasticsearch.action.update.UpdateResponse;
import org.elasticsearch.client.Client;

import org.elasticsearch.search.SearchHits;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.ui.Model;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.lilai.crm.es.document.StandardAddress;
import com.lilai.crm.es.util.QueryConditionUtil;
import com.lilai.framework.base.BaseController;

@Controller
public class EsStdAddressController extends BaseController {

	private Logger logger = LogManager.getLogger(EsStdAddressController.class);
	
	@Autowired  
	private Client client;  

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping(value = "/esquery/{cityCode}/{areaDesc}/{pageNum}/{pageSize}")
	@ResponseBody
	public Map search(@PathVariable String cityCode, 
			@PathVariable String areaDesc, 
			@PathVariable int pageNum,
			@PathVariable int pageSize, 
			Model mode) {
		
		try {
//			System.out.println(areaDesc);
//			System.out.println(new String(areaDesc.getBytes("ISO-8859-1"), "utf8"));
//			System.out.println(new String(areaDesc.getBytes("ISO-8859-1"), "GBK"));
//			System.out.println(new String(areaDesc.getBytes("GBK"), "utf8"));
			areaDesc = new String(areaDesc.getBytes("ISO-8859-1"), "utf8");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		logger.info("ElasticSearch cityCode:" + cityCode 
				+ " ; areaDesc:" + areaDesc 
				+ " ; pageNum/PageSize:" + pageNum +"/" + pageSize 
				+ " ; BeginTime:" + new Date().toString());

		SearchRequestBuilder searchRequestBuilder = client.prepareSearch("city_code_"+cityCode);
		
		searchRequestBuilder.setSearchType(SearchType.DFS_QUERY_THEN_FETCH);
		searchRequestBuilder.setQuery(QueryConditionUtil.BoolQueryBuilder("area_desc", areaDesc));
		searchRequestBuilder.setFrom(pageNum).setSize(pageSize).setExplain(true);
        		
		SearchResponse response = searchRequestBuilder.execute().actionGet();
        
        SearchHits hits = response.getHits();
        
        List<StandardAddress> lsd = new ArrayList<StandardAddress>();
        Map rtMap = new  HashMap();
        for (int i = 0; i < hits.getHits().length; i++) {

            StandardAddress sd = new StandardAddress();
            sd.setId(hits.getHits()[i].getId());
            sd.setCity_code(cityCode);
            sd.setArea_code((String)hits.getHits()[i].getSource().get("area_code"));
            sd.setArea_desc((String)hits.getHits()[i].getSource().get("area_desc"));
            sd.setArea_id((String)hits.getHits()[i].getSource().get("area_id"));
            sd.setArea_name((String)hits.getHits()[i].getSource().get("area_name"));
            sd.setParent_area_id((String)hits.getHits()[i].getSource().get("parent_area_id"));
            sd.setAdditionalinfo((String)hits.getHits()[i].getSource().get("additionalinfo"));
            lsd.add(sd);
        }
        
        rtMap.put("sum", hits.getTotalHits());
        rtMap.put("result", lsd);
		logger.info("ElasticSearch cityCode:" + cityCode 
				+ " ; areaDesc:" + areaDesc 
				+ " ; pageNum/PageSize:" + pageNum +"/" + pageSize 
				+ " ; EndTime:" + new Date().toString());
        return rtMap;
    }
	
	@RequestMapping(value = "/esquery/create")
	@ResponseBody
	public String createDoc(@RequestBody StandardAddress sda) {
		logger.info("ES Document will be created : " + new Gson().toJson(sda));
		ObjectMapper mapper = new ObjectMapper(); 
		
		try {
			sda.setId(null);
			byte[] json = mapper.writeValueAsBytes(sda);
			IndexResponse ires = client.prepareIndex("city_code_"+sda.getCity_code(), "db").setSource(json).get();
			logger.info("ES Document was created ID : " + ires.getId());
			return String.valueOf(ires.isCreated());
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return String.valueOf(false);
	}
	
	@RequestMapping(value = "/esquery/update")
	@ResponseBody
	public String updateDoc(@RequestBody StandardAddress sda) {
		logger.info("ES Document will be updated : " + new Gson().toJson(sda));
		ObjectMapper mapper = new ObjectMapper(); 
		
		try {
			UpdateRequestBuilder urb = client.prepareUpdate("city_code_"+sda.getCity_code(), "db", sda.getId());
			
			byte[] json = mapper.writeValueAsBytes(sda);
			urb.setDoc(json);
			
			UpdateResponse ures = urb.get();
			
			return String.valueOf(ures.isCreated());
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return String.valueOf(false);
	}
	
	@RequestMapping(value = "/esquery/delete")
	@ResponseBody
	public String deleteDoc(@RequestBody StandardAddress sda) {
		logger.info("ES Document will be deleted : " + new Gson().toJson(sda));

		DeleteResponse response = client.prepareDelete("city_code_"+sda.getCity_code(), "db", sda.getId())
		        .get();
		return String.valueOf(response.isFound());
	}

}
