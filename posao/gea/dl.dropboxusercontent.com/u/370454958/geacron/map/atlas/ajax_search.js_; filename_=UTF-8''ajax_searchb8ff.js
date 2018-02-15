/*
	This is the JavaScript file for the AJAX Suggest Tutorial

	You may use this code in your own projects as long as this 
	copyright is left	in place.  All code is provided AS-IS.
	This code is distributed in the hope that it will be useful,
 	but WITHOUT ANY WARRANTY; without even the implied warranty of
 	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
	
	For the rest of the code visit http://www.DynamicAJAX.com
	
	Copyright 2006 Ryan Smith / 345 Technical / 345 Group.	

*/
//Gets the browser specific XmlHttpRequest Object
function getXmlHttpRequestObject() {
	if (window.XMLHttpRequest) {
		return new XMLHttpRequest();
	} else if(window.ActiveXObject) {
		return new ActiveXObject("Microsoft.XMLHTTP");
	} else {
		alert("It's time to upgrade Browser?");
	}
}

//Our XmlHttpRequest object to get the auto suggest
var searchReq = getXmlHttpRequestObject();

//Called from keyup on the search textbox.
//Starts the AJAX request.
function searchSuggest() {
        if (document.busqueda.interv.length > 0) {  removebased(document.busqueda.interv) }
	if (searchReq.readyState == 4 || searchReq.readyState == 0) {
		// var str = escape(document.getElementById('txtSearch').value);
                var strw = document.fsearch.txtSearch.value;
                var str = encodeURIComponent(strw);
                var categ = document.busqueda.categoria.value;

		searchReq.open("GET", 'searchSuggest.php?lng=' + lng + '&search=' + str + '&categ=' + categ, true);
		searchReq.onreadystatechange = handleSearchSuggest; 
		searchReq.send(null);
	}		
}

//Called when the AJAX response is returned.
function handleSearchSuggest() {

	if (searchReq.readyState == 4) {
		var ss = document.getElementById('search_suggest')
		ss.innerHTML = '';
		var str = searchReq.responseText.split("\n");
                if (str.length > 11) { var total = 11 } else { var total = str.length }
		for(i=0; i < total - 1; i++) {

			//Build our element string.  This is cleaner using the DOM, but
			//IE doesn't support dynamically added attributes.
			var suggest = '<div style="background:white" onmouseover="javascript:suggestOver(this);" ';
			suggest += 'onmouseout="javascript:suggestOut(this);" ';
			suggest += 'onclick="javascript:setSearch(this.innerHTML);" ';
			suggest += 'class="suggest_link">' + str[i] + '</div>';
			ss.innerHTML += suggest;
		}
	}
}

//Starts the Literal-date-coor.
function searchLiteral() {
	if (searchReq.readyState == 4 || searchReq.readyState == 0) {
		// var str = escape(document.getElementById('txtSearch').value);
                var strw = document.fsearch.txtSearch.value;
                var str = encodeURIComponent(strw);
                var categ = document.busqueda.categoria.value;
		searchReq.open("GET", 'searchLiteral.php?lng=' + lng + '&search=' + str + '&categ=' + categ, true);
		searchReq.onreadystatechange = handleSearchLiteral; 
		searchReq.send(null);
	}		
}

//Called when the AJAX response is returned.
function handleSearchLiteral() {
	if (searchReq.readyState == 4) {
                removebased(document.busqueda.interv);
   		var ss = document.getElementById('search_suggest')
		ss.innerHTML = '';
		var str = searchReq.responseText.split("\n");

                if (str.length > 1 ) {  insertbased(document.busqueda.interv, "----", "----") 
	   	  for(i=0; i < str.length - 1; i++) {
                  insertbased(document.busqueda.interv, str[i], str[i]);
 		  }

               document.busqueda.interv.selectedIndex=0;
               centrar(6);
               }
	}
}

//Starts Contribution
function searchContribution() {
	if (searchReq.readyState == 4 || searchReq.readyState == 0) {
		searchReq.open("GET", 'searchContribution.php?lng=' + lng , true);
		searchReq.onreadystatechange = handleSearchContribution; 
		searchReq.send(null);
	}		
}

//Called when the AJAX response is returned.
function handleSearchContribution() {
	if (searchReq.readyState == 4) {
                removebased(document.frmcontri.contribut);
   		var ss = document.getElementById('search_suggest')
		ss.innerHTML = '';
		var str = searchReq.responseText.split("\n");
                   var ind = 0;
	   	  for(i=0; i < str.length - 1; i++) {
                   var l = str[i].split('*');
                  insertbased(document.frmcontri.contribut, l[0], l[1]);
                  if (l[1]==ct) {ind = (str.length-1) - (i+1)}
 		  }

               document.frmcontri.contribut.selectedIndex=ind;
               // centrar(6);
               }
	
}

//Mouse over function
function suggestOver(div_value) {
	div_value.className = 'suggest_link_over';
        div_value.style.background="blue";
        div_value.style.color="white";
        div_value.style.cursor="hand";
}
//Mouse out function
function suggestOut(div_value) {
	div_value.className = 'suggest_link';
        div_value.style.background="white"; 
        div_value.style.color="black"; 
}
//Click function
function setSearch(value) {
	document.getElementById('txtSearch').value = value;
	document.getElementById('search_suggest').innerHTML = '';
        searchLiteral();
       // centrar();
}