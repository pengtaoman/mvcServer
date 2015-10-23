<%
    String contextPath = request.getContextPath();
%>

<header class="navbar navbar-default navbar-fixed-top navbar-inner">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-3" ng-click="isCollapsed = !isCollapsed">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand visible-xs" href="https://angular-ui.github.io/bootstrap/#">UI Bootstrap</a>
        </div>
        <nav class="hidden-xs">
            <ul class="nav navbar-nav">
                <a href="https://angular-ui.github.io/bootstrap/#top" role="button" class="navbar-brand">
                    UI Bootstrap
                </a>
                <li class="dropdown" uib-dropdown>
                    <a role="button" id="dorw001" class="dropdown-toggle" uib-dropdown-toggle aria-haspopup="true" aria-expanded="false">
                        Directives <b class="caret"></b>
                    </a>
                    <ul class="dropdown-menu">
                        <li><a href="#">Accordion</a></li>
                        <li><a href="#">Alert</a></li>
                        <li><a href="#">Buttons</a></li>
                        <li><a href="#">Carousel</a></li>
                    </ul>
                </li>
                <li><a href="#">Getting started</a></li>
            </ul>
            
		   <div class="btn-group" uib-dropdown>
				<button id="split-button" type="button" class="btn btn-danger">Action</button>
				<button type="button" class="btn btn-danger" uib-dropdown-toggle>
					<span class="caret"></span> <span class="sr-only">Split button!</span>
				</button>
				<ul class="uib-dropdown-menu" role="menu"
					aria-labelledby="split-button">
					<li role="menuitem"><a href="#">Action</a></li>
					<li role="menuitem"><a href="#">Another action</a></li>
					<li role="menuitem"><a href="#">Something else here</a></li>
					<li class="divider"></li>
					<li role="menuitem"><a href="#">Separated link</a></li>
				</ul>
		     </div>
        </nav>
        <nav class="visible-xs collapse" uib-collapse="!isCollapsed" style="height: 0px;">
            <ul class="nav navbar-nav">
                <li><a href="#" ng-click="isCollapsed = !isCollapsed">Getting started</a></li>
                <li><a href="#" ng-click="isCollapsed = !isCollapsed">Directives</a></li>
            </ul>
            

        </nav>
        

    </div>
</header>