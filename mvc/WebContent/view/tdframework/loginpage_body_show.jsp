<!-- 
<div class="col-sm-9 col-md-9">
<div ng-controller="CarouselCtrl" class="carousel">
	<div style="height: 105px">
		<uib-carousel interval="myInterval" no-wrap="noWrapSlides">
		<uib-slide ng-repeat="slide in slides" active="slide.active">
		<img ng-src="{{slide.image}}" style="margin: auto;">
		<div class="carousel-caption">
			<h4>Slide {{$index}}</h4>
			<p>{{slide.text}}</p>
		</div>
		</uib-slide> </uib-carousel>
	</div>
	<div class="row">
		<div class="col-md-6">
			<button type="button" class="btn btn-info" ng-click="addSlide()">
				Add Slide
				</button>
				<div class="checkbox">
					<label> <input type="checkbox" ng-model="noWrapSlides">
						Disable Slide Looping
					</label>
				</div>
		</div>
		<div class="col-md-6">
			Interval, in milliseconds: <input type="number" class="form-control"
				ng-model="myInterval"> <br />Enter a negative number or 0
			to stop the interval.
		</div>
	</div>
</div>

</div>
 -->