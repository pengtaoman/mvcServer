// Workflow Style 2009
// xiaoqingfeng @ yeah.net

function goToURL(url)
{
	if(window.parent!=null)
	{
		if(url!=null && url.length>0)
		{
			if(url.charAt(url.length-1)!="#")
			{
				if(url.indexOf("?")==-1) parent.FW_goToURL(url + "?parentPageId=" + pageId);
				else parent.FW_goToURL(url + "&parentPageId=" + pageId);
			}
		}
	}
	else
	{
	}
}

function setNavigateLocation(locArray)
{
	if(window.parent!=null)
	{
		parent.FW_setNavigateLocation(locArray)
	}
	else
	{
	}
}

//For navigator
var currentLocation = [{text:window.document.title,link:window.location.href}];
setNavigateLocation(currentLocation);