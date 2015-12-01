
ie  = (navigator.appName == 'Microsoft Internet Explorer' && document.all != null);
ns4 = (navigator.appName == 'Netscape' && document.layers != null);
ns6 = (navigator.appName == 'Netscape' && navigator.appVersion.substring(0, 1) == '5');

function getImage(imgName)
{
  if (ie || ns6)
  {
    return document[imgName];
  }
  else if (ns4)
  {
    return document.images[imgName];
  }
}

function mouseover(imgName)
{
        if (getImage(imgName).src.indexOf("_off") == -1)
        {
                getImage(imgName).src = getImage(imgName).src.replace(/(.*)(\.gif)/, "$1_mouseover$2");
        }
}

function mouseout(imgName)
{
        getImage(imgName).src = getImage(imgName).src.replace(/(.*)_mouseover|_mousedown(\.gif)/, "$1$2");
}

function mousedown(imgName)
{
  getImage(imgName).src = getImage(imgName).src.replace(/(.*)_mouseover(\.gif)/, "$1_mousedown$2");
}

function mouseup(imgName)
{
  //fudge an onclick event handler for NS4
  if (getImage(imgName).src.indexOf("_mousedown") != -1)
  {
    mouseclick(imgName)
  }
  getImage(imgName).src = getImage(imgName).src.replace(/(.*)_mousedown(\.gif)/, "$1_mouseover$2");
}

function mouseclick(imgName)
{
  switch(imgName)
  {

    case 'add':
      alert('addff');//parent.frames[1].addSub();
      break;

    case 'delete':
      alert('deletettt');//top.location.href = top.frames[1].location.href;
      break;

    case 'up':
      parent.frames[1].del();
      break;
    case 'down':
      parent.frames[1].location.href="reload.jsp";
      break;

  }
}

function setupImage(imgName)
{
        if ((ie || ns6) && imgName == 'view')
        {
                getImage(imgName).alt = "Index View";
        }
        if (ns4)
        {
                getImage(imgName).onmouseover = new Function("mouseover('" + imgName + "')");
                getImage(imgName).onmouseout  = new Function("mouseout('"  + imgName + "')");
                getImage(imgName).onmousedown = new Function("mousedown('" + imgName + "')");
                getImage(imgName).onmouseup   = new Function("mouseup('"   + imgName + "')");
        }
}

function initialize()
{
  setupImage('add');
  setupImage('x');
  setupImage('expand');
  setupImage('collapse');
  setupImage('view');
}
