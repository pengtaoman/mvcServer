var _top_menuItem=null;
var _current_menuItem=null;
var _stored_item=null;
var _stored_frame=null;
var _array_menu=new Array();

function createMenu(id) {
	var menu=new Object();
	menu.id=id;
	menu.topItem=_createMenuItem(menu, null);
	return menu;
}

function initMenu(menu){
	initMenuItems(menu, menu.topItem, 0);
	menu.menuItems=null;
	_array_menu[_array_menu.length]=menu;
}

function _createMenuItem(menu, parentItem) {
	var item=new Object();
	item.items=new Array();
	item.menu=menu;
	if (parentItem){
		item.zIndex=parentItem.zIndex+1;
		item.parentItem=parentItem;
		parentItem.items[parentItem.items.length]=item;
	}
	else{
		item.zIndex=10000;
	}
	return item;
}

function initMenuItems(menu, parentItem, pos){
	while (pos<menu.menuItems.length){
		var newItem=_createMenuItem(menu, parentItem);
		for(var i=0; i<7; i++){
			var newPos=menu.menuItems.indexOf(",", pos);
			if (newPos>=0){
				var prop=menu.menuItems.substring(pos, newPos);
				switch (i){
					case 0: newItem.name=getDecodeStr(prop); break;
					case 1: newItem.label=getDecodeStr(prop); break;
					case 2: newItem.targetUrl=getDecodeStr(prop); break;
					case 3: newItem.icon=getDecodeStr(prop); break;
					case 4: newItem.disabled=isTrue(prop); break;
					case 5: newItem.visible=isTrue(prop); break;
					case 6: newItem.tag=getDecodeStr(prop); break;
				}
			}
			else{
				return 99999;
			}
			pos=newPos+1;
		}

		if (menu.menuItems.charAt(pos)!=";")
			pos=initMenuItems(menu, newItem, pos);
		else
			pos++;

		if (menu.menuItems.charAt(pos)==";") return pos+1;
	}
	return pos;
}

function prepareMenu(menuItem){
	if (menuItem.items.length<1) return;

	var frame=menuItem.subFrame;
	if (!frame){
		frame=document.createElement("<div extra=menuframe class=\"menuframe\" style=\"position:absolute; visibility:hidden; " +
			"z-index: "+menuItem.zIndex+"\"></div>");
		document.body.appendChild(frame);
		with (frame){
			innerHTML="<table width=128px border=0 cellspacing=0 cellpadding=3 rules=all class=menu></table>";
			onmouseover=_menu_onmouseover;
			onmousedown=_menu_onmousedown;
		}

		var row=frame.firstChild.insertRow();
		row.extra="menuitem";
		var cell=row.insertCell();
		cell.width="16px";
		cell=row.insertCell();
		cell.noWrap=true;
		cell=row.insertCell();
		cell.width="9px";
		frame.repeatrow=row.cloneNode(true);
		
		frame.menuItem=menuItem;
		menuItem.subFrame=frame;
	}

	var tBody=frame.firstChild.tBodies[0];
	for (var i=tBody.rows.length-1; i>=0; i--) tBody.rows[i].removeNode(true);

	var row, cell;
	for(var i=0; i<menuItem.items.length; i++){
		var item=menuItem.items[i];
		fireUserEvent(getElementEventName(menuItem.menu, "onRefreshItem"), [menuItem.menu, item]);
		if (!item.visible) continue;

		row=frame.repeatrow.cloneNode(true);
		frame.firstChild.tBodies[0].insertAdjacentElement("beforeEnd", row);

		row.className=(item.disabled)?"row_disabled":"";
		if (item.icon) row.cells[0].innerHTML="<img src=\""+item.icon+"\">";
		row.cells[1].innerHTML=item.label;
		if (item.items.length>0) row.cells[2].innerHTML="<label style=\"font-family: Webdings; font-size: 7pt\">4</label>";
		item.row=row;
		item.frame=frame;
		row.menuItem=item;
	}
	return frame;
}

function showMenu(menu){
	if (_top_menuItem){
		hideMenu();
		return;
	}

	menu.showMode="popup";
	_showSubMenu(menu.topItem, "popup", null, true);
	_stored_frame=menu.topItem.subFrame;
	setTimeout("_stored_frame.focus();", 0);
	_top_menuItem=menu.topItem;
}

function showButtonMenu(menu, button){
	if (_top_menuItem){
		hideMenu();
		return;
	}

	menu.showMode="button";
	_showSubMenu(menu.topItem, "button", button, true);
	_stored_frame=menu.topItem.subFrame;
	setTimeout("_stored_frame.focus();", 0);
	_top_menuItem=menu.topItem;
}

function showBarMenu(menuItem, button){
	if (_top_menuItem) hideMenu();

	menuItem.button=button;
	menuItem.menu.showMode="menubar";
	_showSubMenu(menuItem, "button", menuItem.button, false);
	_top_menuItem=menuItem;
}

function _locateMenu(frame, locateMode, element){
	switch (locateMode){
	case "popup":
		var tmp_left, tmp_top;
		if (event.x+frame.offsetWidth>document.body.clientWidth-2)
			tmp_left=event.x-frame.offsetWidth+5;
		else
			tmp_left=event.x-5;

		if (event.y+frame.offsetHeight>document.body.clientHeight-1)
			tmp_top=event.y-frame.offsetHeight+6;
		else
			tmp_top=event.y-4;

		frame.style.posLeft=tmp_left+document.body.scrollLeft;
		frame.style.posTop=tmp_top+document.body.scrollTop;
		break;
	case "button":
		var pos=getAbsPosition(element, document.body);

		if (pos[0]+frame.offsetWidth>document.body.clientWidth-2)
			frame.style.posLeft=pos[0]+element.offsetWidth-frame.offsetWidth-2;
		else
			frame.style.posLeft=pos[0];

		if (pos[1]+element.offsetHeight+frame.offsetHeight>document.body.clientHeight-1)
			frame.style.posTop=pos[1]-frame.offsetHeight-1;
		else
			frame.style.posTop=pos[1]+element.offsetHeight+2;
		break;
	case "submenu":
		var pos=getAbsPosition(element, document.body);

		if (pos[0]+element.offsetWidth+frame.offsetWidth>document.body.clientWidth-2)
			frame.style.posLeft=pos[0]-frame.offsetWidth;
		else
			frame.style.posLeft=pos[0]+element.offsetWidth;

		if (pos[1]+frame.offsetHeight>document.body.clientHeight-1)
			frame.style.posTop=pos[1]+element.offsetHeight-frame.offsetHeight+1;
		else
			frame.style.posTop=pos[1]+1;
		break;
	}
}

function _showSubMenu(menuItem, locateMode, element, animate){
	var frame=prepareMenu(menuItem);
	if (!frame) return;

	_locateMenu(frame, locateMode, element);
	if (frame.filters.blendTrans.status!=2){
		if (!animate || getIEVersion()<"5.5"){
			frame.style.visibility="visible";
		}
		else{
			frame.filters.blendTrans.apply();
			frame.style.visibility="visible";
			frame.filters.blendTrans.play();
		}
	}
	return frame;
}

function _hideMenu(menuItem){
	if (menuItem.currentMenuItem) _hideMenu(menuItem.currentMenuItem);
	if (menuItem.parentItem) menuItem.parentItem.currentMenuItem=null;
	if (menuItem==_current_menuItem) _current_menuItem=null;
	if (menuItem==_top_menuItem){
		if (_top_menuItem.menu.showMode=="menubar"){
			_top_menuItem.cell.style.backgroundImage = "url(images/tabs/button.gif)";
			_top_menuItem.cell.className="";
			var menubar=getTableByCell(_top_menuItem.cell);
			menubar.setAttribute("menuOpened", false);
		}
		_top_menuItem=null;
	}

	var frame=menuItem.subFrame;
	if (!frame) return;
	if (frame.style.visibility!="visible") return;
	frame.style.visibility="hidden";
}

function hideMenu(){
	if (!_top_menuItem) return;
	_hideMenu(_top_menuItem);
}

function _findMenuItemHolder(element){
	while (element){
		if (element.getAttribute("extra")=="menuitem")
			return element;
		element=element.parentElement;
	}
}

function _menu_onmouseover() {
	var element=_findMenuItemHolder(event.srcElement);

	if (element){
		var menuItem=element.getAttribute("menuItem");
		if (menuItem==_current_menuItem) return;
		_current_menuItem=menuItem;

		if (menuItem){
			if (!menuItem.disabled){
				element.className="row_selected";
				_showSubMenu(menuItem, "submenu", element, true);
			}

			var currentSlideItem=menuItem.parentItem.currentMenuItem;
			var newSlideItem=null;
			if (currentSlideItem){
				if (currentSlideItem!=menuItem){
					_hideMenu(currentSlideItem);
				}
				if (currentSlideItem.parentItem==menuItem.parentItem){
					currentSlideItem.row.className=(currentSlideItem.disabled)?"row_disabled":"";
					menuItem.parentItem.currentMenuItem=menuItem;
				}
			}
			else{
				menuItem.parentItem.currentMenuItem=menuItem;
			}
		}
	}
}

function _menu_onmousedown() {
	var frame=_current_menuItem.frame;
	if (frame && frame.filters.blendTrans.status==2) return;

	if (event.button!=2){
		var element=_findMenuItemHolder(event.srcElement);

		if (element){
			var menuItem=element.getAttribute("menuItem");
			if (menuItem) _processMenuItemClick(menuItem.menu, menuItem);
		}
	}
	hideMenu();
}

function initMenuBar(menubar){
	var menu=menubar.getAttribute("menu");
	if (typeof(menu)=="string" && menu!=""){
		eval("menu="+menu);
		menubar.menu=menu;
	}

	if (menubar.menu){
		for(var i=0; i<menubar.tBodies[0].rows.length; i++){
                var row=menubar.tBodies[0].rows[i];
                row.removeNode(true);
        }

		var row=menubar.tBodies[0].insertRow();
		row.align="center";
		for(var i=0; i<menu.topItem.items.length; i++){
			var item=menu.topItem.items[i];
			if (!item.visible) continue;
			var cell=row.insertCell();
			cell.extra="menuitem";
			cell.style.backgroundImage = "url(images/tabs/button.gif)";
			cell.onmouseover=_menubar_onmouseover;
			cell.onmouseup=_menubar_onmouseup;
			cell.innerText=item.label;
			cell.menuItem=item;
			if (item.disabled){
				cell.className="button_disabled";
			}
			item.cell=cell;
		}
	}
}

function _menubar_onmouseover() {
	var element=_findMenuItemHolder(event.srcElement);

	if (element){
		var menubar=getTableByCell(element);
		if (!menubar.getAttribute("menuOpened")) return;

		var menuItem=element.getAttribute("menuItem");
		if (menuItem==_current_menuItem) return;

		if (menuItem){
			var currentSlideItem=menuItem.parentItem.currentMenuItem;
			var newSlideItem=null;

			if (!menuItem.disabled){
				element.style.backgroundImage = "url(none)";
				element.className="button_active";

				showBarMenu(menuItem, element);
				_stored_frame=menubar;
				setTimeout("_stored_frame.focus();", 0);
			}

			if (currentSlideItem){
				if (currentSlideItem!=menuItem){
					_hideMenu(currentSlideItem);
				}
			}
			else{
				menuItem.parentItem.currentMenuItem=menuItem;
			}

			menubar.setAttribute("menuOpened", true);
		}
	}
}

function _menubar_onmouseup() {
	if (event.button!=2){
		var element=_findMenuItemHolder(event.srcElement);

		if (element){
			var menuItem=element.getAttribute("menuItem");
			if (menuItem) _processMenuItemClick(menuItem.menu, menuItem);

			var menubar=getTableByCell(element);
			if (!menubar.getAttribute("menuOpened")){
				menubar.setAttribute("menuOpened", true);
				_menubar_onmouseover();
				return;
			}			
		}
	}
}

function _processMenuItemClick(menu, menuItem){
	if (!menuItem.disabled){
		hideMenu();
		var event_name=getElementEventName(menu, "onItemClick");
		if (isUserEventDefined(event_name)){
			fireUserEvent(event_name, [menu, menuItem]);
		}

		if (getValidStr(menuItem.targetUrl)!=""){
			open(menuItem.targetUrl, menu.targetFrame);
		}
	}
}