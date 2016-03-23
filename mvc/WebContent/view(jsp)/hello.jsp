sdvadvadvadvvv

<br><br><br> hello: 
<% out.println(request.getAttribute("message"));%>

<br><br><br> isME: 
<% out.println(request.getAttribute("isme"));%>

<br><br><br> @ModelAttribute: 
<% out.println(request.getAttribute("addresses"));%>

<br><br><br>@RequestParam: 
<% out.println(request.getAttribute("pet"));%>

<br><br><br> @ModelAttribute001: 
<% out.println(request.getAttribute("modAtt"));%>

<form id='aaform' action=".././hello22" method="post">
<input type="text" name="lnameff" />
<input id=aasub type="button" value="Submitaa"  onclick='document.getElementById("aaform").submit();'/>
</form>