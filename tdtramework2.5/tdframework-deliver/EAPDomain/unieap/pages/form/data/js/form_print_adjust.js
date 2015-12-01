
function DocumentAdjuster(divObj,doc){
	this.constructor(divObj,doc);
}

DocumentAdjuster.prototype = {
	constructor : function(divObj,doc){
		this.divObj = divObj;
		this.doc = doc;
		this.printContainer = doc.getElementById("form_print_temp_div");//document.getElementById("form_print_temp_div");
		this.eleList = new Array();
		/**
		 * ҳ��߾�
		 * margin{top,right,bottom,left}
		 */
		//alert(this.divObj.margin[0]);
		//this.margin = this.divObj.margin.split(",");

		this.margin = new Array(19.05,0,5,0);
	},

	buildList : function(){
		var arr = this.divObj.childNodes;//getElementsByTagName("*");
		for(var i=0, l=arr.length; i<l; i++){
			var ele = arr[i];
			if(ele.tagName == "polyline" || ele.tagName == "rect"){
				this.insertEle(ele);
			}
			if(ele.style){			
				if(ele.style.position != "absolute" ||ele.style.top == ""){
					continue;
				}
				if("pageheader"==ele.useas||"pagefooter"==ele.useas){
					continue;
				}
				this.insertEle(ele);			
			}
		}
	},
	insertEle : function(ele, startIndex){
		//insert a ele to list 
		if(!startIndex) startIndex = 0;
		for(var i=startIndex,arr=this.eleList,l=arr.length; i<l; i++){
			var t = arr[i];
			if(t.offsetTop > ele.offsetTop){
				this.eleList.splice(i,0,ele);
				return;
			}
		}
		this.eleList.push(ele);
	},
	removeEle : function(index ){
		this.eleList.splice(index , 1);
	},
	adjustEleHeight : function(index , ele , newHeight){
		//alert(ele.style.pixelHeight+"="+newHeight);
		//if(ele.style.pixelHeight > newHeight){
			//ele.style.pixelHeight = newHeight;
		//}
		//if(newHeight<ele.style.pixelHeight){
			//return;
		//}
		
		var diff = newHeight - ele.offsetHeight;
		
		
		var h = ele.offsetTop + ele.offsetHeight;
		ele.style.pixelHeight = newHeight;
		
		//alert("@@@@@@@@@@@@@@");
		for(var i=index +1, arr=this.eleList, l = arr.length; i<l; i++){
			var t = arr[i];
			//alert(t.name+"::"+t.style.pixelTop+"<="+h);           
            if("polyline"==t.tagName){
				/**
				 * ���߱�ִ������
				 */
            	i++;
            }
			if(t.style.pixelTop <= h) continue;
			t.style.pixelTop = t.offsetTop + diff;
			
		}			

	},
	adjustDocumentHeight : function(){
		for(var i=0, arr=this.eleList, l = arr.length; i<l; i++){
			var t = arr[i]; 
			if(t.tagName == "polyline" || t.tagName == "rect"){
				continue;
			}
			if((t.tagName == "TEXTAREA") && (t.style.pixelHeight < t.scrollHeight)){
			    //alert(1);
				this.adjustEleHeight(i, t, t.scrollHeight);
			}
			if(("datagrid" == t.type)){//	
			    t.setAttribute("oldheight",t.style.pixelHeight);
				//alert(2);
			   	this.adjustEleHeight(i, t, parseInt(t.scrollHeight));
			}
		}	
	},
	
	//�ָ�TextArea��TextԪ�أ�ʹ��߶��ܹ���ָ��λ��֮ǰ��ȫ����ʾ
	splitText : function(ele, targetY, baseY){

		var diff = targetY - ele.offsetTop - baseY;
		
		//�ָ�ҳ
		var origHeight = ele.offsetHeight;
		ele.style.pixelHeight = diff;
		
		var origValue = ele.value;
		var  splitLength ;

		if(ele.offsetHeight == ele.scrollHeight){ //װ����
			splitLength = origValue.length;	
		}else{
			if(origValue.length <=1){ //һ���ַ���װ���£������Ƶ���һҳ
				splitLength = 0;
			}else{
				//�����������ַ�������װ���£������˹�����
				
				splitLength = origValue.length >> 1;
				var stepLength = splitLength >> 1;
				while(stepLength > 0){
					//debugger;
					ele.value = origValue.substr(0, splitLength);
					if(ele.offsetHeight < ele.scrollHeight){ //װ����
						splitLength -= stepLength;
					}else{
						splitLength += stepLength;
					}
					stepLength = stepLength >> 1;
					
				}	
				
				ele.value = origValue.substr(0,splitLength);

				/**
				 * ������ַ���˳�λ��ˣ�ֱ�������ı����ٳ��ֹ�����
				 */
				while(ele.offsetHeight < ele.scrollHeight){				
					splitLength -= 1;
					ele.value = origValue.substr(0,splitLength);
				}
			}
		}
        
		var remainEle = ele.cloneNode(true);
		remainEle.value = trim(origValue.substr(splitLength));
		
		remainEle.style.pixelHeight = origHeight - ele.offsetHeight;
		
		if(ele.style.position == "absolute") {
			remainEle.style.pixelTop = targetY;
		}

		var ret = {};
		ret.first = ele;
		ret.next = remainEle;
		//ret.tempOffsetHeight = tempOffsetHeight;
		return ret;	
	},
	printCells : function(cells){
		var s = "";
		for(var i=0; i<cells.length;i ++){
			var cell = cells[i];
			if(cell == null)
				s += "NULL";
			else
				s += cells[i].outerHTML + "\n";
		}
	},
	freezeTableSize : function( table){
		//��ÿһ�С��еĳߴ���й̻���������Ϊ��ҳ
		var tbody = table.tBodies[0];
		var rowIndex = 0;
		while(rowIndex < tbody.rows.length){
			var tr = tbody.rows[rowIndex];
			
			if(tr.style.pixelHeight != tr.offsetHeight){
				tr.style.pixelHeight = tr.offsetHeigth;
			}
			for(var i=0,l=tr.cells.length; i<l; i++){
				var td = tr.cells[i];
				if(td.style.pixelWidth != td.offsetWidth){
					td.style.pixelWidth = td.offsetWidth;
				}
			}
			
			rowIndex ++;
		}
	},
	splitTable : function( table, targetY){

		var ret = {};
		
		//ѭ��ÿһ��
		var tbody = table.tBodies[0];

		//û��������,��ֻ��һ�У���ŵ���һҳ
		/*if(tbody.rows.length <=1){
			ret.first = null;
			ret.next = table;
			table.style.pixelTop = targetY;
			return ret;
		}*/
		
		var table2 = null;  //�ռ���һҳ������
		var rowIndex = 0;
		var cells = new Array();
		while(rowIndex < tbody.rows.length){
	
			var tr = tbody.rows[rowIndex];
			if(rowIndex == 0){
                
				//��һ�оͳ�����ҳ�߽磬���������Ƶ���ҳ����
				if(tr.offsetTop + tr.offsetHeight > targetY){
					ret.first = null;
					ret.next = table;
					table.style.pixelTop = targetY;
					return ret;
				}	
				for(var i=0,l=tr.cells.length; i<l; i++){
					var td = tr.cells[i];
					cells.push(td);
					var j = td.colSpan;
					while(j-- > 1){
						cells.push(null);
					}
				}
			}else{
			
				for(var colIndex=0,l=cells.length,tdIndex = 0; colIndex < l;){
					var cell = cells[colIndex];
					if(cell != null){
						if(rowIndex - cell.parentNode.rowIndex < cell.rowSpan){
							//����
							colIndex += cell.colSpan;
							continue;
						}
					}	
					//ȡԪ��
					var td = tr.cells[tdIndex ++];
					cells[colIndex] = td;
					var j = td.colSpan;
					while(j-- > 1){
						colIndex ++;
						cells[colIndex] = null;
					}
					colIndex ++;
				}
			}
			//this.printCells(cells);
			
			var trNext = (rowIndex < tbody.rows.length - 1) ? tbody.rows[rowIndex + 1] : null;
			if(!trNext || trNext.offsetTop + trNext.offsetHeight < targetY){
				rowIndex ++;
				continue;	
			}
			//��ǰ��δ����ҳ�߽磬����һ���ѳ����߽�,�������
			
			rowIndex ++;
			break;
		}
		
		if(rowIndex < tbody.rows.length){
			this.freezeTableSize(table);
			//����Cells
			for(var colIndex=0,l=cells.length; colIndex < l;){
				var cell = cells[colIndex];
				if(cell != null){
					if(rowIndex - cell.parentNode.rowIndex < cell.rowSpan){
						//����
						var td = cell.cloneNode(false);
						td.innerHTML = "&nbsp;";
						td.rowSpan =  "" + ( cell.rowSpan -  rowIndex + cell.parentNode.rowIndex );
						cell.rowSpan = rowIndex - cell.parentNode.rowIndex ;
						
						cells[colIndex] = td;
						
						colIndex += cell.colSpan;
						continue;
					}else{
						cells[colIndex] = null;
					}
				}	
				colIndex ++;
			}
			
			var trArr = new Array();
			while(rowIndex < tbody.rows.length ){
				trArr.push(tbody.rows[rowIndex]);
				rowIndex ++;
			}
			
			//���ɿ�table
			table2 = table.cloneNode(false);
			table2.style.pixelTop = targetY;
			var tbody2 = tbody.cloneNode(false);
			table2.appendChild(tbody2);
			
			//��һ��
			var trFirst = trArr.shift();
			tbody2.appendChild(trFirst);
			
			//trFirst������cells
			for(var colIndex=0,l=cells.length,tdTarget=trFirst.firstChild; colIndex < l;){
				var cell = cells[colIndex];
				if(cell != null){
					//��tdTargetλ�ò���cell
					trFirst.insertBefore(cell, tdTarget);
					colIndex += cell.colSpan;
				}else{
					colIndex ++;
					if(tdTarget)
						tdTarget = tdTarget.nextSibling;
				}
			}
			//����������
			while(trArr.length > 0){
				tbody2.appendChild(trArr.shift());
			}
		}
		
		ret.first = table;
		ret.next = table2;
		
		return ret;
	},
	splitDataGrid : function(ele,targetY,baseY){		
		var ret = {};
		var diff = targetY - ele.offsetTop - baseY ;
		var table = ele.childNodes[0];
		var tbody = table.tBodies[0];
		
		//�ָ�ҳ
		var origHeight = ele.offsetHeight;
		ele.style.pixelHeight = diff;
		ele.style.overflow = "hidden";
		
		var trs = tbody.rows;
		var rowIndex =0;
		//alert(targetY+"::"+diff);
		while(rowIndex < trs.length){
			var tr = trs[rowIndex];
			//alert("["+rowIndex+"]"+tr.offsetHeight+"+"+tr.offsetTop+">"+diff);
			if(tr.offsetHeight + tr.offsetTop > diff){
				//��һ�оͳ�����ҳ�߽磬���������Ƶ���ҳ����
				if(rowIndex == 0){
					ret.first = null;
					ret.next = table;
					table.style.pixelTop = targetY;
					return ret;
				}				
				break;
			}
			rowIndex++;
		}

		//rowIndex--;
		var remainEle = ele.cloneNode(false);
		if(ele.style.position == "absolute") {
			remainEle.style.pixelTop = targetY;
		}		
		remainEle.style.pixelHeight = origHeight - diff ;

		remainEle.style.overflow = "hidden"
		remainEle.style.visibility = "visible";
		
		var table2 = table.cloneNode(false); 
		tbody2 = tbody.cloneNode(false);
		remainEle.appendChild(table2);
		table2.appendChild(tbody2);
		
		var trArr = new Array();
	   	while(rowIndex < trs.length){
	   		trArr.push(trs[rowIndex]);
	   	 	rowIndex ++;
	   	}		
	   	
	   	var trFirst = trs[0].cloneNode(true);
	   	tbody2.appendChild(trFirst);
	   
	   	//����������
		while(trArr.length > 0){
			tbody2.appendChild(trArr.shift());
		}		
		
		ret.first = ele;
		ret.next = remainEle;
		return ret;	
	},
	splitElement : function(ele, targetY, baseY, index){
		var diff = targetY - ele.offsetTop - baseY;
		var ret = {};
		ret.first = ele;
		
		if(diff >= ele.offsetHeight) { //��ȫ�ڴ�ҳ
			
			if(ele.tagName == "polyline" || ele.tagName == "rect"){
				return ret;
			}
			
			/**
			 * �����ǰ�ı�������������������ڴ�ҳ����ʾ�����ı���չ����ʾ
			 * ����Ӧ�������ı�������Ŀؼ�λ�á�
			 * 2 Ϊƫ�������Ա�֤�ı��������ȫ��ʾ���ֵ�ͬʱ�����Ҳ����ֹ�������
			 */		
			if(ele.tagName == "TEXTAREA" && ele.offsetHeight < ele.scrollHeight ){	
				//alert(3);
				this.adjustEleHeight(index, ele, ele.scrollHeight + 2);
			}
			
			if(ele.type == "datagrid" ){//&& ele.offsetHeight < ele.scrollHeight

				if(ele.scrollHeight<ele.oldheight){		
					//alert(4);
					this.adjustEleHeight(i, ele, parseInt(ele.scrollHeight)+ 5);
				}else{
					//alert(5);
					this.adjustEleHeight(i, ele, parseInt(ele.scrollHeight)+Math.ceil((parseInt(ele.scrollHeight)-parseInt(ele.oldheight))/5) +15);
				}
			}

			return ret;
		}
				
		if(ele.tagName == "TEXTAREA"){
			return this.splitText(ele, targetY, baseY);
			//return ret;
		}
		if(ele.tagName == "TABLE"){

			if("paragraph"==ele.type){		
				return ret;
			}
			return this.splitTable(ele, targetY, baseY);
			//return ret;
		}
		
		if(ele.type == "datagrid"){
			//alert(6);
			return this.splitDataGrid(ele, targetY, baseY); 
			//return ret;
		}
		
		
		
		//�ŵ���һҳ
		if(ele.style.position == "absolute") {
			ret.first = null;
			ret.next = ele;
			ele.style.pixelTop = targetY - baseY;
		}
		return ret;
	},
	createPageDiv : function (pageNo, pageBegin, pageHeight, flag){
		
		var div = this.doc.createElement("div");//document.createElement("DIV");//this.doc.createElement("DIV");
		div.id="PT_form_page" + pageNo;
		//window.status += pageNo+"&";
		div.style.position = "absolute";
		var pageheader = getPageHeader(this.divObj);//this.doc.getElementById("pageheader");
		var pagefooter = getPageFooter(this.divObj);//this.doc.getElementById("pagefooter");
		var pagetitle = getPageTitle(this.divObj);
		
		var pageno = this.doc.getElementById("pageno");
		
      	if(pageno){
      		pageno.value = pageNo;
      	}
		var header;
		var footer;
		var title;
		
		var no;
		
		if(pageheader){
			header = pageheader.cloneNode(true);
			div.appendChild(header);
		}
		if(pagefooter){
			footer = pagefooter.cloneNode(true);
			div.appendChild(footer);
		}
		if(pagetitle){
			title = pagetitle.cloneNode(true);
			div.appendChild(title);
		}
		
		
		/**
		 * ��ǰҳ��������ҳ������Ҫ����ҳ�涥����׶˵Ŀհ�
		 */
		if(flag == true){
			//alert(header.style.pixelTop +"::"+ header.style.height);
			
			div.style.pixelTop = this.margin[0]*4;
			div.style.pixelHeight = pageHeight - this.margin[0]*4;// - 75;//this.margin[0]*4;
			if(pageheader||pagefooter||pagetitle){
				div.style.pixelTop = 0;
				div.style.pixelHeight = pageHeight;
			}
			//window.status += div.style.pixelHeight;
		}else{
			div.style.pixelHeight = pageHeight ;//+ this.margin[0]*4 ;
		}

		
		div.style.pixelLeft = 0;
		div.style.width = "100%";
		//div.style.border = "1 solid red";
		//div.style.zIndex = "-9999";
		//this.doc.body.appendChild(div);
		this.printContainer.appendChild(div);
		return div;
	},
	splitPage : function(pageHeight,startNo){
		var _s  = new Date();
		var stepNo = 0;
		var pageheader = getPageHeader(this.divObj);// this.doc.getElementById("pageheader");//
		var pagefooger = getPageFooter(this.divObj);//this.doc.getElementById("pagefooter");
		var pagetitle = getPageTitle(this.divObj);
		
		var pageBegin = 0;
		var pageNo = stepNo + startNo;
		/**
		 *��һ��ҳ����Ҫ����һ��topmargin��bottommargin�ĸ߶ȣ���Ϊҳ�汾���Ѿ��������ҳ�߾������
		 */
		var pageEnd = pageBegin + pageHeight ;//+ parseInt(this.margin[2]*4)+ 5;;
		if(pageheader||pagefooger||pagetitle){
			pageEnd = pageBegin + pageHeight ;//+ parseInt(this.margin[2]*4)+ 5;
		} 
		
		var pageDiv  = this.divObj;//this.createPageDiv(pageNo, pageBegin, pageHeight);
		var index = 0;
		var origHeight;
		while(index < this.eleList.length){
			var ele = this.eleList[index];
			
			if(ele.offsetTop >= pageEnd ){
				stepNo ++;
				pageBegin = pageEnd;
				if(pageheader){
					pageBegin = pageEnd - parseInt(pageheader.style.top) - parseInt(pageheader.offsetHeight) - 5;
				}
				if(pagetitle){
					pageBegin = pageEnd - parseInt(pagetitle.style.top) - parseInt(pagetitle.offsetHeight) - 5;
				}
				
				pageEnd = pageBegin + pageHeight;
				pageNo = stepNo + startNo;
				pageDiv = this.createPageDiv(pageNo, pageBegin, pageHeight, true);
				continue;
			}	
				
			var v = this.splitElement(ele, pageEnd, 0, index);
			
			if(v.first == null){ //��������һҳ
				this.removeEle(index);
				this.insertEle(ele, index);
				continue;
			}
			
			if(v.next != null){		
				ele.insertAdjacentElement("afterEnd", v.next);
				this.insertEle(v.next, index + 1);
			}
			ele.style.pixelTop -= pageBegin;
			
			if(ele.tagName == "TEXTAREA"){
                /**
                 * ��mipcwϵͳ�У�was�����¶����ı��������ת��Ϊlabel
                 * ���ӡʱ��Ӱ�������ؼ��Ĳ��֣������ı����չ����ʽ����ȷ
                 */
				changeTextAreaToLabel(ele,this.doc);
				pageDiv.appendChild(label);
			}else{
				pageDiv.appendChild(ele);
			}

			index ++;
		}
		//window.status += "splitpage "+(new Date()-_s);
		return stepNo;
	}
}


function adjustDocument(divObj,height,startNo,doc){

	var da = new DocumentAdjuster(divObj,doc);
	var _s  = new Date();
	da.buildList();
	
	//window.status += "buildList "+(new Date()-_s);
	//_s  = new Date();
	da.adjustDocumentHeight();
	
	//window.status += "adjust "+(new Date()-_s);
	return da.splitPage(parseInt(height),startNo);
	
}
function changeTextAreaToLabel(ele,doc){
				
	label = doc.createElement("label");//document.createElement("label");   	
    label.innerText = ele.value;
	label.style.fontSize = ele.style.fontSize;
    label.style.position = ele.style.position;
    label.style.top = ele.style.top;
    label.style.left = ele.style.left;
    label.style.width = ele.style.width;
    label.style.height = ele.style.height;
    label.style.fontFamily = ele.style.fontFamily;
    label.style.fontStyle = ele.style.fontStyle;
    label.style.fontWeight = ele.style.fontWeight;
    label.style.foreground = ele.style.foreground;
    label.style.background = ele.style.background;
    	

	label.style.borderStyle = ele.style.borderStyle;
	label.style.borderWidth = ele.style.borderWidth;
	label.style.borderColor = ele.style.borderColor;
    	
	label.style.textAlign =  ele.style.textAlign;    	
    label.style.margin = ele.style.margin;
    label.style.wordBreak  = ele.style.wordBreak;//"keep-all";
    label.style.wordWrap = "break-word";//textarea.style.wordWrap;//
    label.style.overflow = "hidden";
    label.style.textOverflow = "ellipsis"; 
    	
    if(label.style.borderStyle.indexOf("solid")<0){
         label.style.borderStyle = "none";
    }else{
    if(label.style.borderTopWidth>0)
         label.style.borderStyle = "none";
    }	
	//ele.parentNode.replaceChild(textarea);  
	ele.parentNode.replaceChild(label,ele);   	
}

