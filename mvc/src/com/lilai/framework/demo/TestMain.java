package com.lilai.framework.demo;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Arrays;
import java.util.Date;

import org.elasticsearch.action.search.SearchRequestBuilder;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.action.search.SearchType;
import org.elasticsearch.client.Client;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.common.transport.InetSocketTransportAddress;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHits;

public class TestMain {
	
	private static Client client;
	
	static {
		try {
			client = TransportClient.builder().build()
					   .addTransportAddress(new InetSocketTransportAddress(InetAddress.getByName("192.168.1.110"), 9300));

		} catch (UnknownHostException e) {
			e.printStackTrace();
		}
	}


	public void search(String qStr) {

		System.out.println("================BBB " + new Date().toString());
		SearchRequestBuilder searchRequestBuilder = null;
        try {
		    searchRequestBuilder = client.prepareSearch("city_code_188");
        } catch (Exception ex) {
        	try {
    			client = TransportClient.builder().build()
    					   .addTransportAddress(new InetSocketTransportAddress(InetAddress.getByName("10.4.121.90"), 9300));
    			searchRequestBuilder = client.prepareSearch("city_code_188");
    		} catch (UnknownHostException e) {
    			e.printStackTrace();
    		}
        }
		searchRequestBuilder.setSearchType(SearchType.DFS_QUERY_THEN_FETCH);
		searchRequestBuilder.setQuery(boolQueryBuilder(qStr));//.termQuery("_id", "AVXZZBDY7bGv8Zl62NNu")) // Query
		searchRequestBuilder.setFrom(0).setSize(10).setExplain(true);
        		
		SearchResponse response = searchRequestBuilder.execute().actionGet();
        
        SearchHits hits = response.getHits();
        System.out.println(hits.getTotalHits());
        for (int i = 0; i < hits.getHits().length; i++) {
            System.out.println(hits.getHits()[i].getSourceAsString() +"---" +hits.getHits()[i].getId());

        }
        System.out.println("================EEE " + new Date().toString());

    }
	
	private String[] buildQuery(String queryString) {
		String cnAndDi = "[^(0-9\\u4e00-\\u9fa5)]";
		String cnAndNum = queryString.replaceAll(cnAndDi, " ");
		char[] chr = cnAndNum.toCharArray();
		String[] priArr = new String[queryString.length()];
		int inx = 0;
		for (char ch : chr) {
			// if (c == ' ') { //数字会连
			// continue;
			// }
			if (inx > 0 && priArr[inx - 1].matches("[(0-9)]\\d*") && Character.isDigit(ch)) {
				priArr[inx - 1] = priArr[inx - 1] + ch;
				continue;
			} else {
				priArr[inx] = String.valueOf(ch);
				inx++;
			}

		}
		System.out.println(Arrays.toString(priArr));
		return priArr;
	}
	
	private BoolQueryBuilder boolQueryBuilder(String queryString) {
		BoolQueryBuilder boolQueryBuilder = QueryBuilders.boolQuery();
		String[] qStr = buildQuery(queryString);
		for (String qs : qStr) {
			if (qs != null && !"".equals(qs.trim())) {
				boolQueryBuilder.must(QueryBuilders.termQuery("area_desc", qs));
			}
		}
		return boolQueryBuilder;
	}
	
	
	public static void main(String[] args) throws Exception {

		TestMain tm = new TestMain();
		 String qrStr = "区域家庭3";

//		 Thread t1 = new Thread();
//		 t1.start();
//		tm.search("河北石家寨乡秋山村曹锁平");
//		tm.search("河曹锁平");
//		tm.search("河北县南寨乡秋山村曹锁平");
//		tm.search("河山村曹锁平");
//		tm.search("河北石家庄灵寿县南寨");
		tm.search(qrStr);
	}

}
