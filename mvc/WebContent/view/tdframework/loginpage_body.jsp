<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<div class="row">
	<div class="col-sm-9 col-md-9">
		<tiles:insertAttribute name="bodyshow" />
	</div>
	<div id="loginForm"
		class="col-sm-3 col-sm-offset-9 col-md-3 col-md-offset-9" >
		<tiles:insertAttribute name="bodyform" />
	</div>


</div>