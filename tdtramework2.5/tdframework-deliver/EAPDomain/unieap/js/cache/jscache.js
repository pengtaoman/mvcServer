
/** 
 * @fileoverview 这个js文件创建了对象jscache,用于客户端缓存
 * @author wunc wunc@neusoft.com
 * @version 0.1 
 */
 /**
 * 一个对象,用来操作客户端缓存<br>
 * 直接使用JsCache对象,方式例如:<br>
 * JsCache.getData("id1","PartRefreshAction","changeContents")<br>
 * JsCache.saveData(id,data)...<br>
 */
var JsCache={
	/** 
     * ActiveX客户端缓存对象
     * @type ActiveXObject
    */
   activeXCache:null,
   isDebug:false,
   /** 
     * 默认数据存放时间
     * @type int
    */
   limitTime:30,
   
   /**
    * 获得数据,通过id在客户端缓存查找是否存在标识位id,如果有就返回数据.<br>
    * 如果没有,则通过参数action,method到服务器端取得数据,将获的数据放到客户端缓存中，然后返回数据
    * @param {string} id 标识符
    * @param {string} action struts配置文件的 Action
    * @param {string} method Action中的方法名
    * @param {string} params  可选的http参数
    * @return {string} 缓存的数据
   */
   getData:function(id,action,method,params){
   
   	 var result=this.activeXCache.getData(id);
   	 if(result==""){
   	    var result = executeRequest(action,method,params);
   	    if(this.isDebug){
   	    alert("first load");
   	    }
   	    this._cacheData(result,id);
   
   	 }else{
   	 	if(this.isDebug){
   	    alert("from cache");
   	    }
   	 	
   	 }
   	 	return result; 
   	 
   },
   
   /**
    * 对象内部使用,将数据放到客户端缓存中,数据存放时间是默认的30分钟
    *
    * @param {string} data 数据
    * @param {string} id   标识
   */
   _cacheData:function(data,id){
     this.activeXCache.setData(id,data,this.limitTime);
   },
   
   /**
    * 通过id在客户端缓存中获得数据
    * @param {string} id  标识
    * @return {string} 数据
   */
   getDataViaId:function(id){
   	 return this.activeXCache.getData(id);
   },
   
   /**
    * 将数据保存到客户端缓存中
    *
    * @param {string} id   标识
    * @param {string} data 数据
    * @param {int}    time  存放时间
   */
   saveData:function(id,data,time){
   	 if(typeof time == 'undefined'){
   	 	
   	 	this.activeXCache.setData(id,data,this.limitTime);
   	 } 
   	 else 
   	 {
   	 	this.activeXCache.setData(id,data,time);
   	 }
   
   },
   
   /**
    * 在客户端缓存中删除指定标识的数据
    * 
    * @param {string} id   标识
   */
   clearData:function(id){
      this.activeXCache.clearData(id);  
   },
    
  /**
    * 通过传入的字符串,得到唯一的不会重复的标识值
    * 
    * @param {string} str   字符串
    * @return {string} 标识
   */
   createId:function(str){
   	 return this.activeXCache.getCacheId(str);
   },
   
  /**
    * 得到客户端缓存使用内存的容量,单位MB,默认是0
    * 
    * @return (int} 容量
   */
   getCapacity:function(){  	
   	return this.activeXCache.getCapacity();
   },
   
  /**
    * 设置客户端缓存使用内存的容量,单位MB
    * 
    * @param {int} size 使用内存的大小
   */
   setCapacity:function(size){   	
    this.activeXCache.setCapacity(size);
   },
   
  /**
    * 清空客户端缓存中所有的数据
    * 
   */
   clearAll:function(){
   this.activeXCache.clearAll();
   	 
   },
   
   getActiveXObject:function(){
   	if(this.activeXCache==null){
   		this.activeXCache=new ActiveXObject("clientcache.CacheClass");
   	}
   	return this.activeXCache;
   },
   
   setCacheXObject:function(cacheXObject){
   	this.activeXCache=cacheXObject;
   	
   }
   
}