// CodeThatXPBar STANDARD
// Version: 1.2.1 (28.05.04.1)
// Script must be registered in order to be used on your sites.
// Copyright (c) 2003=04 by CodeThat.Com
// http://www.codethat.com/
var CT_IMG_BLANK = unieap.WEB_APP_NAME + "/unieap/images/unieap/menu/1x1.gif";
function CT_addLayer(w, h, x, y, ox, oy, z) {
    var i, l = new CLayer();
    l.setSize(w, h);
    l.moveTo(x + ox, y + oy);
    l.setZIndex(z);
    i = this._l.length;
    this._l[i] = {"l":l, "ox":ox, "oy":oy};
    return i;
}
function CT_pre(src) {
    return CodeThat.preload(src);
}
function pI(v) {
    return parseInt(v);
}
function CXPBar(def, id) {
    this.id = id;
    this.open = [];
    if (Undef(def)) {
        def = {};
    }
    if (Undef(def.style)) {
        def.style = {};
    }
    var o = def.style;
    o.z = o.z || 1;
    if (Undef(o.direction)) {
        o.direction = "v";
    }
    if (Undef(def.itemover)) {
        def.itemover = {};
    }
    if (Undef(def.position)) {
        def.position = {};
    }
    o = def.position;
    o.pos = o.pos || [0, 0];
    o.pos[0] = pI(o.pos[0]);
    o.pos[1] = pI(o.pos[1]);
    this.menu = new CXPBarLevel(def, this, null);
    this.defaction = def.defaction || {};
    CT_IMG_BLANK = def.imgblank || CT_IMG_BLANK;
    CT_pre(CT_IMG_BLANK);
    _CT_bars[_CT_bars.length] = this;
}
var XBp = CXPBar.prototype;
XBp.create = function () {
    this.menu.createTop();
};
XBp.Act = function (attr) {
    return this.defaction[attr];
};
XBp.topID = XBp.path = function () {
    return this.id;
};
XBp.childPath = function () {
    return this.topID() + ".menu";
};
XBp.click = function () {
    this.menu.moveItems();
};
XBp.run = function () {
    this.menu.create();
    this.menu.moveSubs();
    this.menu.visible(true);
};
function CXPBarLevel(def, parent, p_lvl) {
    if (Undef(def)) {
        def = {};
    }
    this._p = parent;
    this._p_lvl = p_lvl;
    this._top = Undef(p_lvl);
    var o = this.style = def.style || {};
    if (Def(o.itemoffset)) {
        o.itemoffset.x = pI(o.itemoffset.x || 0);
        o.itemoffset.y = pI(o.itemoffset.y || 0);
    }
    if (Def(o.size)) {
        o.size[0] = pI(o.size[0]);
        o.size[1] = pI(o.size[1]);
    }
    if (Def(o.shadow)) {
        o.shadow.width = pI(o.shadow.width);
    }
    if (Def(o.border)) {
        o.border.width = pI(o.border.width);
    }
    o.imgendoff = o.imgendoff || "";
    this.itemover = this._top ? def.itemover || {} : {};
    this.itemon = this._top ? def.itemon || {} : {};
    this._scr = 0;
    this.Scroller(def.scroller || null);
    o = this.position = def.position || {};
    if (Def(o.pos)) {
        o.pos[0] = pI(o.pos[0]);
        o.pos[1] = pI(o.pos[1]);
    }
    if (Def(o.menuoffset)) {
        o.menuoffset.x = pI(o.menuoffset.x || 0);
        o.menuoffset.y = pI(o.menuoffset.y || 0);
    }
    this.createItems(def);
    this._l = [];
}
var XLp = CXPBarLevel.prototype;
XLp.src = function () {
    var i, src = "", lr = this._l, it = this.items;
    for (i = 0; i < it.length; i++) {
        src += it[i].src() + it[i].menusrc();
    }
    if (lr.length == 0) {
        this.init();
    }
    if (!this._top) {
        for (i = 0; i < lr.length; ) {
            src += lr[i++].l.getSource();
        }
    }
    return src;
};
XLp.init = function () {
    with (this) {
        var n, i, mw, mh, l;
        var p = Pos("pos") || [0, 0], w = width(), h = height(), _z = this.z();
        mw = w;
        mh = h;
        if (_top) {
            mw = pI(St("fixwidth")) || w;
            mh = pI(St("fixheight")) || h;
        }
        l = _l[addLayer(mw, mh, 0, 0, 0, 0, _z + 2)].l;
        l.setPos(p[0], p[1]);
        l.setBgImage(St("bgimg"));
        CT_pre(St("bgimg"));
        l.setBgColor(St("bgcolor"));
        this._b = 0;
        if (hor()) {
            this._sl = new CLayer(width(true), mh);
        } else {
            this._sl = new CLayer(mw, height(true));
        }
        _sl.moveTo(0, 0);
        _sl.setZIndex(_z + 3);
        if (_top) {
            n = addLayer(150, 20, p[0], p[1], 0, mh, _z + 5);
            var ln = unescape("%43%6F%64%65%54%68%61%74%2E%43%6F%6D");
//_l[n].l.setHTML(ln.fontcolor('#AAAAAA').fontsize(-2).link('ftp://')	)
        }
        var jw, j = St("shadow");
        if (Def(j)) {
            jw = j.width;
            n = addLayer(jw, mh, p[0], p[1], mw, jw, _z);
            _l[n].l.setBgColor(j.color);
            n = addLayer(mw - jw, jw, p[0], p[1], jw, mh, _z);
            _l[n].l.setBgColor(j.color);
        }
        j = St("border");
        if (Def(j)) {
            jw = j.width;
            n = addLayer(mw + jw * 2, jw, p[0], p[1], -jw, -jw, _z + 1);
            _l[n].l.setBgColor(j.color);
            n = addLayer(mw + jw * 2, jw, p[0], p[1], -jw, mh, _z + 1);
            _l[n].l.setBgColor(j.color);
            n = addLayer(jw, mh, p[0], p[1], -jw, 0, _z + 1);
            _l[n].l.setBgColor(j.color);
            n = addLayer(jw, mh, p[0], p[1], mw, 0, _z + 1);
            _l[n].l.setBgColor(j.color);
        }
        if (_scroll) {
            var pt1, pt2, im, _sc = scroller, act = path() + ".scroll(";
            _sc.text = Def(_sc.up) ? (CT_pre(_sc.up), "<img src=\"" + _sc.up + "\">") : "up";
            _sc.action = {"js":act + "1);return false"};
            this._up = new CXPBarItem(_sc, this, "_up");
            _up.Pos(hor() ? [0, _sc.offset] : [_sc.offset, 0]);
            _sc.text = Def(_sc.down) ? (CT_pre(_sc.down), "<img src=\"" + _sc.down + "\">") : "down";
            _sc.action = {"js":act + "-1);return false"};
            this._dn = new CXPBarItem(_sc, this, "_dn");
            pt1 = _sc.offset;
            pt2 = hor() ? mw - _dn.St("size")[0] : mh - _dn.St("size")[1];
            _dn.Pos(hor() ? [pt2, pt1] : [pt1, pt2]);
        }
        moveItems();
    }
};
XLp.assignSubs = function () {
    var i = 0;
    with (this) {
        if (!_top) {
            for (; i < _l.length; ) {
                _l[i++].l.assignLayer();
            }
        } else {
            _sl.assignLayer();
            if (_scroll) {
                _up.assign();
                _dn.assign();
            }
        }
        for (i = 0; i < items.length; ) {
            items[i++].assign();
        }
    }
};
XLp.createTop = function () {
    with (this) {
        init();
        var l = _l[_b].l;
        _sl.setHTML(src());
        if (_scroll) {
            l.setHTML(_up.src() + _dn.src());
        }
        l.appendHTML(_sl.getSource());
        l.create();
        assignSubs();
    }
};
XLp.create = function () {
    for (i = 1; i < this._l.length; i++) {
        this._l[i].l.create();
    }
};
XLp.addLayer = CT_addLayer;
XLp.St = function (attr, val) {
    val = this.style[attr];
    if (Und(val) && !this._top) {
        val = this._p_lvl.St(attr);
    }
    return val;
};
XLp.StOver = function (attr, val) {
    val = this.itemover[attr];
    if (Und(val) && !this._top) {
        val = this._p_lvl.StOver(attr);
    }
    return val;
};
XLp.StOn = function (attr, val) {
    val = this.itemon[attr];
    if (Und(val) && !this._top) {
        val = this._p_lvl.StOn(attr);
    }
    return val;
};
XLp.Scroller = function (v) {
    if (Und(v)) {
        v = this.scroller;
    } else {
        this._scroll = this._top && Def(v);
        if (this._scroll) {
            this.scroller = v;
            v.step = pI(v.step || 5);
            v.time = pI(v.time || 30);
            v.len = pI(v.len || 50);
            v.offset = pI(v.offset || 0);
            v.style.imgitem = v.style.imgitem || "";
            v.style.imgendoff = v.style.imgendoff || "";
        }
    }
    return v;
};
XLp.Pos = function (attr, val) {
    val = this.position[attr];
    if (Und(val) && !this._top && attr != "pos") {
        val = this._p_lvl.Pos(attr);
    }
    return val;
};
XLp.hor = function () {
    return this.St("direction") == "h";
};
XLp.AbsPos = function () {
    var p = (this._top ? [0, 0] : this.Pos("pos")) || [0, 0];
    return [p[0], p[1]];
};
XLp.realPos = function () {
    with (this) {
        return _top && Def(this._b) ? _l[_b].l.getAbsolutePos() : AbsPos();
    }
};
XLp.z = function (z) {
    z = this.style.z;
    if (Undef(z) && !this._top) {
        z = this._p.z() + 5;
    }
    return z;
};
XLp.moveItems = function (ns) {
    var i, ix, iy, oy, ox;
    var it = this.items, ioff = this.St("itemoffset");
    var p = this.AbsPos(), _hor = this.hor();
    oy = ox = ix = iy = 0;
    if (Def(ioff)) {
        ix = ox = ioff.x;
        iy = oy = ioff.y;
    }
    for (i = 0; i < it.length; i++) {
        it[i].Pos([ix, iy]);
        if (_hor) {
            ix += it[i].realSize()[0] + ox;
        } else {
            iy += it[i].realSize()[1] + oy;
        }
        it[i].moveRel(p[0], p[1], ns);
    }
    this.s_scroll();
};
XLp.s_scroll = function () {
    with (this) {
        if (_scroll) {
            setScr(_up, _scr < 0);
            var it = items[items.length - 1];
            if (hor()) {
                setScr(_dn, _scr + it.Pos()[0] + it.realSize()[0] > width());
            } else {
                setScr(_dn, _scr + it.Pos()[1] + it.realSize()[1] > height());
            }
        }
    }
};
XLp.setScr = function (obj, cond) {
    if (cond) {
        if (!obj.vis) {
            obj.visible(true);
        }
    } else {
        obj.visible(false);
    }
};
XLp.moveSubs = function () {
    with (this) {
        var o, p = realPos(), i = _top ? 0 : -1;
        while (++i < _l.length) {
            o = _l[i];
            o.l.moveTo(p[0] + o.ox, p[1] + o.oy);
        }
    }
};
XLp.moveLayers = function (ns) {
    this.moveSubs();
    this.moveItems(ns);
};
XLp.scroll = function (c) {
    var s = this.scroller;
    this._scr += c * s.len;
    if (this.hor()) {
        this._sl.slide(this._scr, 0, s.step, s.time);
    } else {
        this._sl.slide(0, this._scr, s.step, s.time);
    }
    this.s_scroll();
};
XLp.itemsVisible = function (v) {
    var i = 0, it = this.items;
    for (; i < it.length; ) {
        it[i++].visible(v);
    }
};
XLp.visible = function (v) {
    this.vis = v;
    for (var i = 0; i < this._l.length; i++) {
        this._l[i].l.setVisible(v);
    }
    if (this._top) {
        this._sl.setVisible(v);
    }
    this.itemsVisible(v);
};
XLp.moveTo = function (x, y, ns) {
    var i, o, p = this.position;
    p.pos = [x, y];
    if (this._l.length > 0) {
        this._l[0].l.moveTo(x, y);
    }
    this.moveLayers(ns);
};
XLp.moveRel = function (x, y) {
    if (Def(this._p.width)) {
        if (this._p_lvl.hor()) {
            x += this._p.width();
        } else {
            y += this._p.height();
        }
    }
    var moff = this.Pos("menuoffset");
    if (Def(moff) && !this._top) {
        y += moff.y;
        x += moff.x;
    }
    this.moveTo(x, y);
};
XLp.topID = function () {
    return this._p.topID();
};
XLp.path = function () {
    return this._p.childPath();
};
XLp.childPath = function (id) {
    return this.path() + (isNaN(id) ? "." + id : ".items[" + id + "]");
};
XLp.width = function (f) {
    var i, ioff, r = 0, it = this.items, h = this.hor();
    if (Def(this._b) && !f) {
        r = this._l[this._b].l.getWidth();
    } else {
        if (Def(this._sl) && f) {
            r = this._sl.getWidth();
        } else {
            for (i = 0; i < it.length; i++) {
                if (h) {
                    r += it[i].realSize(f)[0];
                } else {
                    r = Math.max(r, it[i].width());
                }
            }
            if (Def(ioff = this.St("itemoffset"))) {
                r += (h ? it.length + 1 : 2) * ioff.x;
            }
        }
    }
    return r;
};
XLp.height = function (f) {
    var i, ioff, r = 0, it = this.items, h = this.hor();
    if (Def(this._b) && !f) {
        r = this._l[this._b].l.getHeight();
    } else {
        if (Def(this._sl) && f) {
            r = this._sl.getHeight();
        } else {
            for (i = 0; i < it.length; i++) {
                if (h) {
                    r = Math.max(r, it[i].height());
                } else {
                    r += it[i].realSize(f)[1];
                }
            }
            if (Def(ioff = this.St("itemoffset"))) {
                r += (h ? 2 : it.length + 1) * ioff.y;
            }
        }
    }
    return r;
};
XLp.createItems = function (def) {
    this.items = [];
    var it = def.items;
    if (Undef(it)) {
        return;
    }
    if (Undef(it.length) && Def(it.item)) {
        it = it.item;
    }
    if (Undef(it.length)) {
        it = [it];
    }
    for (var i = 0; i < it.length; i++) {
        this.addItem(it[i]);
    }
};
XLp.addItem = function (def) {
    var it = this.items;
    return it[it.length] = new CXPBarItem(def, this, it.length);
};
function CXPBarItem(def, parent, id) {
    this.id = id;
    this._p = parent;
    this.initDef(def);
    this._l = [];
}
var XIp = CXPBarItem.prototype;
XIp.src = function () {
    var i, src = "", l = this._l;
    if (!l.length) {
        this.init();
    }
    for (i = 0; i < l.length; ) {
        src += l[i++].l.getSource();
    }
    return src;
};
XIp.menusrc = function () {
    return Def(this.menu) ? this.menu.src() : "";
};
XIp.initDef = function (def) {
    var t = this;
    if (Undef(def)) {
        def = {};
    }
    t.text = def.text || "";
    var o = t.style = def.style || {};
    if (Def(o.size)) {
        o.size[0] = pI(o.size[0]);
        o.size[1] = pI(o.size[1]);
    }
    if (Def(o.shadow)) {
        o.shadow.width = pI(o.shadow.width);
    }
    if (Def(o.border)) {
        o.border.width = pI(o.border.width);
    }
    t.styleover = def.styleover || {};
    t.styleon = def.styleon || {};
    t.type = def.type;
    if (def.menu && t.path().split(".").length != 5) {
        t.menu = new CXPBarLevel(def.menu, t, t._p);
        t.type = "bool";
    } else {
        t.menu = null;
    }
    t.bool = t.type == "bool";
    if (t.bool) {
        t.val = 0;
    }
    t.action = def.action || {};
    t.position = {};
    t.vis = false;
};
XIp.init = function () {
    with (this) {
        var l, n, p = Pos() || [0, 0], s = St("size"), _z = z();
        var w = s[0], h = s[1], x = p[0], y = p[1], ox = 0, oy = 0;
        var tid = topID();
        var js = Act("js"), url = Act("url"), target = Act("target"), title = Act("title");
        var anch = Def(js) || Def(url) || this.bool;
        n = addLayer(w, h, x, y, 0, 0, _z + 5);
        setProp(n, "", "", "", this.vis);
        l = _l[n].l;
        //l.setHTML((anch ? "<a href=\"" + (url || "#") + "\"" + (Def(target) ? "\" target=\"" + target + "\"" : "") + " onClick=\"if (Def(this.blur)) this.blur();" + (this.bool ? path() + ".toggle();" + tid + ".click();" : "") + (Def(js) ? js : "return " + (Def(url) ? "true" : "false")) + "\"" + (Def(title) ? " title=\"" + title + "\"" : "") + ">" : "") + "<img border=0 src=\"" + CT_IMG_BLANK + "\" width=" + w + " height=" + h + ">" + (anch ? "</a>" : ""));
        l.setHTML((anch ? '<a href="'+(url||'#')+'"'+
				(Def(target)?'" target="'+target+'"':'')+
				' onClick="if (Def(this.blur)) this.blur();'+
				'if('+path()+'.menu==null){ XIp.selectedItem.out2(); XIp.selected('+path()+');XIp.selectedItem.over2();}'+
				(this.bool ? 
				path()+'.toggle();'+tid+'.click();':'')+
				(Def(js)?js:'return '+(Def(url) ?'true':'false'))+'"'+
				(Def(title)?' title="'+title+'"':'')+'>' : '')+
				'<img border=0 src="'+CT_IMG_BLANK+'" width='+w+' height='+h+'>'+(anch?'</a>':''));
        l.addEventHandler("onMouseOver", path() + ".over()");
        l.addEventHandler("onMouseOut", path() + ".out()");
        var v = Box("shadow");
        if (Def(v)) {
            this._si = n = addLayer(w, h, x, y, v.width, v.width, _z);
            setProp(n, "", v.color, "", this.vis);
        }
        v = Box("border");
        var ovb = StOver("border");
        if (Def(ovb)) {
            this._ob = true;
            this._ob_t = Def(v);
            if (_ob_t) {
                this.ob = ovb;
            } else {
                v = ovb;
            }
        }
        if (Def(v)) {
            var bw = v.width;
            this._bi = n = addLayer(w, bw, x, y, 0, 0, _z + 1);
            setProp(n, "", v.color, "", this.vis);
            n = addLayer(w, bw, x, y, 0, h - bw, _z + 1);
            setProp(n, "", v.color, "", this.vis);
            n = addLayer(bw, h - bw * 2, x, y, 0, bw, _z + 1);
            setProp(n, "", v.color, "", this.vis);
            n = addLayer(bw, h - bw * 2, x, y, w - bw, bw, _z + 1);
            setProp(n, "", v.color, "", this.vis);
            w -= bw * 2;
            h -= bw * 2;
            ox = oy = bw;
        }
        this._mn = n = addLayer(w, h, x, y, ox, oy, _z + 2);
        var i, al, css, tcol, ei = St("imgendoff"), ei_aux, bg;
        if (this.menu) {
            i = St("imgdir");
        } else {
            i = St("imgitem");
            if (ei) {
                ei = {"src":CT_IMG_BLANK, "width":ei.width, "height":ei.height};
            }
        }
        al = St("align");
        css = St("css");
        tcol = St("color");
        CT_pre(bg = Box("bgimg"));
        setProp(n, tcol, Box("bgcolor"), bg, vis, css, h, al, text, i, ei);
        this._mi = n = addLayer(w, h, x, y, ox, oy, _z + 4);
        ei_aux = (this.menu ? StOver("imgendoff") : "") || ei;
        if (Def(ei_aux)) {
            this._offsrc = ei_aux.src;
        }
        CT_pre(bg = StOver("bgimg"));
        setProp(n, StOver("color") || tcol, StOver("bgcolor"), bg, false, StOver("css") || css, h, StOver("align") || al, text, (this.menu ? StOver("imgdir") : StOver("imgitem")) || i, ei_aux, bool);
        if (bool) {
            this._on = n = addLayer(w, h, x, y, ox, oy, _z + 3);
            ei_aux = (this.menu ? StOn("imgendon") || St("imgendon") : "") || ei;
            CT_pre(bg = StOn("bgimg"));
            setProp(n, StOn("color") || tcol, StOn("bgcolor"), bg, false, StOn("css") || css, h, StOn("align") || al, text, (this.menu ? StOn("imgdir") || St("imgdiropen") : StOn("imgitem")) || i, ei_aux);
            ei_aux = StOver("imgendon") || ei_aux;
            if (Def(ei_aux)) {
                this._onsrc = ei_aux.src;
            }
        }
    }
};
XIp.addLayer = CT_addLayer;
XIp.setProp = function (n, fn, col, bgimg, vis, css, h, al, txt, img, ei, id_save) {
    var spc, id, iw, ih, w, o = this._l[n].l;
    o.setBgColor(col);
    o.setBgImage(bgimg);
    o.setVisible(vis);
    if (txt || Def(img) || Def(ei)) {
        o.setHTML("<table border=0 cellpadding=0 cellspacing=0 width=100%><tr>");
        if (Def(img)) {
            CT_pre(img.src);
            spc = img.space || this.St("imgspace");
            spc = Def(spc) ? pI(spc) : 0;
            iw = pI(img.width);
            ih = pI(img.height);
            w = iw + spc * 2;
            o.appendHTML("<td width=" + w + " height=" + ih + "><img src=\"" + img.src + "\" width=" + iw + " height=" + ih + " hspace=" + spc + " border=0></td>");
        }
        if (txt) {
            o.appendHTML("<td" + (Def(al) ? " align=" + al : "") + " height=\"" + h + "\"><div" + (Def(css) ? " class=\"" + css + "\"" : "") + ">" + (Undef(fn) ? txt : "<font color=" + fn + ">" + txt + "</font>") + "</div></td>");
        }
        if (Def(ei)) {
            CT_pre(ei.src);
            spc = ei.space || this.St("imgspace");
            spc = Def(spc) ? pI(spc) : 0;
            iw = pI(ei.width);
            ih = pI(ei.height);
            w = iw + spc * 2;
            if (id_save) {
                id = this._imid = CodeThat.newID();
            }
            o.appendHTML("<td width=" + w + " height=" + ih + " align=right><img " + (Def(id) ? "id=" + id : "") + " src=\"" + ei.src + "\" width=" + iw + " height=" + ih + " hspace=" + spc + " border=0></td>");
        }
        o.appendHTML("</tr></table>");
    }
};
XIp.St = function (attr, val) {
    val = this.style[attr];
    if (Und(val)) {
        val = this._p.St(attr);
    }
    return val;
};
XIp.Box = function (attr) {
    return this.style[attr];
};
XIp.StOver = function (attr, val) {
    val = this.styleover[attr];
    if (Und(val)) {
        val = this._p.StOver(attr);
    }
    return val;
};
XIp.StOn = function (attr, val) {
    val = this.styleon[attr];
    if (Und(val)) {
        val = this._p.StOn(attr);
    }
    return val;
};
XIp.Pos = function (p) {
    return Def(p) ? this.position.pos = p : this.position.pos;
};
XIp.Type = function () {
    return this.type;
};
XIp.Act = function (attr, val) {
    val = this.action[attr];
    if (Und(val)) {
        val = eval(this.topID() + ".Act('" + attr + "')");
    }
    return val;
};
XIp.AbsPos = function () {
    var pos = this._p.AbsPos();
    pos[0] += this.Pos()[0];
    pos[1] += this.Pos()[1];
    return pos;
};
XIp.z = function () {
    return ((this._p.z() + 6));
};
XIp.width = function () {
    return this.St("size")[0];
};
XIp.height = function () {
    return this.St("size")[1];
};
XIp.realSize = function (f) {
    with (this) {
        var w, h, s = St("size");
        w = s[0];
        h = s[1];
        if (menu && (this.val || f)) {
            if (St("direction") == "v") {
                h += menu.height();
            } else {
                w += menu.width();
            }
        }
        return [w, h];
    }
};
XIp.moveRel = function (x, y, ns) {
    var p = this.Pos();
    this.move(x + p[0], y + p[1], ns);
};
XIp.move = function (x, y, ns) {
    var i, l = this._l;
    for (i = 0; i < l.length; i++) {
        l[i].l.moveTo(x + l[i].ox, y + l[i].oy);
    }
    if (this.menu && !ns) {
        var ap = this.AbsPos();
        this.menu.moveRel(ap[0], ap[1]);
    }
};
XIp.visible = function (v) {
    with (this) {
        var i;
        this.vis = v;
        if (_l.length) {
            for (i = 0; i < _l.length; ) {
                _l[i++].l.setVisible(v);
            }
            setOvBorder(false);
            if (bool) {
                setBool();
            } else {
                if (Def(this._mi)) {
                    _l[_mi].l.hide();
                }
            }
        }
    }
};
XIp.topID = function () {
    return this._p.topID();
};
XIp.path = function () {
    return this._p.childPath(this.id);
};
XIp.childPath = function () {
    return this.path() + ".menu";
};
XIp.assign = function () {
    var i = 0;
    for (; i < this._l.length; ) {
        this._l[i++].l.assignLayer();
    }
    if (this._imid) {
        this._imid = CodeThat.findElement(this._imid);
    }
    if (this.menu) {
        this.menu.assignSubs();
    }
};
//????????
XIp.selectedItem = null;
XIp.selected = function (itemValue) {
	this.selectedItem = itemValue;
};
XIp.over = function () {
    with (this) {
        _l[_mi].l.show();
        setOvBorder(true);
        if (Def(this._on)) {
            _l[_on].l.hide();
        }
        _l[_mn].l.hide();
    }
};
XIp.over2 = function () {
	with (this) {
		_l[_mi].l.show();
		setOvBorder2(true);
		if (Def(this._on)) _l[_on].l.hide()
		_l[_mn].l.hide();
	}
};
XIp.out = function () {
	//???????????????
	//alert(this.selectedItem.path());
	if(this.path()==this.selectedItem.path()) return;
    this.setOvBorder(false);
    this.setBool();
};
XIp.out2 = function () {
	this.setOvBorder(false);
	this.setBool()
};
XIp.setOvBorder = function (v) {
    if (this._ob) {
        with (this) {
            for (var i = _bi; i < _bi + 4; i++) {
                if (_ob_t) {
                    _l[i].l.setBgColor(v ? ob.color : Box("border").color);
                } else {
                    _l[i].l.setVisible(v);
                }
            }
        }
    }
};
XIp.setOvBorder2 = function (v) {
	if (this._ob)
		with (this) {
			for (var i=_bi;i<_bi+4;i++) {
				if (_ob_t)
					_l[i].l.setBgColor(v ? Box('border').color : Box('border').color);
				else
					_l[i].l.setVisible(v);
			}
		}
}
XIp.setBool = function () {
    with (this) {
        _l[_mi].l.hide();
        if (this.vis) {
            if (bool) {
                _l[_mn].l.setVisible(!this.val);
                _l[_on].l.setVisible(this.val);
            } else {
                _l[_mn].l.show();
            }
        }
    }
};
XIp.toggle = function (on) {
    var t = this;
    if (Def(on) && on == t.val) {
        return;
    }
    t.val = !t.val;
    t._l[t._mn].l.setVisible(!t.val);
    t._l[t._on].l.setVisible(t.val);
    var code = t.val ? t.Act("on") : t.Act("off");
    if (Def(code)) {
        eval(code);
    }
    if (t._imid) {
        t._imid.src = t.val ? t._onsrc : t._offsrc;
    }
    if (t.menu) {
        t.menu.visible(t.val);
    }
};
var _CT_bars = [];
function CT_b_load() {
    CodeThat.setOnResize(CT_b_res, true);
}
function CT_b_res() {
    if (ua.oldOpera || ua.nn4) {
        if (Undef(window._CT_reloading)) {
            window._CT_reloading = true;
            location.reload();
        }
    }
}
if (ua.oldOpera) {
    CodeThat.setOnLoad(CT_b_load);
} else {
    CodeThat.setOnResize(CT_b_res);
}

