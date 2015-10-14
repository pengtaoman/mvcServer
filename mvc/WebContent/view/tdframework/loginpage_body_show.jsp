<%
    String contextPath = request.getContextPath();
%>
<div id="myCarousel" class="carousel slide" data-ride="carousel">
	<!-- Indicators -->
	<ol class="carousel-indicators">
		<li data-target="#myCarousel" data-slide-to="0" class="active"></li>
		<li data-target="#myCarousel" data-slide-to="1"></li>
		<li data-target="#myCarousel" data-slide-to="2"></li>
	</ol>
	<div class="carousel-inner" role="listbox">
		<div class="item active">

			<div class="container">
				<div class="carousel-caption">
					<h1>TDF3</h1>
					<p>简介</p>
					<p></p>
				</div>
			</div>
		</div>
		<div class="item">
			<div class="container">
				<div class="carousel-caption">
					<h1>Another example headline.</h1>
					<p>VVVVV</p>
				</div>
			</div>
		</div>
		<div class="item">
			<div class="container">
				<div class="carousel-caption">
					<h1>One more for good measure.</h1>
					<p>TTTT</p>
				</div>
			</div>
		</div>
	</div>
	<a class="left carousel-control" href="#myCarousel" role="button"
		data-slide="prev"> <span class="glyphicon glyphicon-chevron-left"
		aria-hidden="true"></span> <span class="sr-only">Previous</span>
	</a> <a class="right carousel-control" href="#myCarousel" role="button"
		data-slide="next"> <span class="glyphicon glyphicon-chevron-right"
		aria-hidden="true"></span> <span class="sr-only">Next</span>
	</a>
</div>