
var markers = [];

function initMap() {
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 15,
		center: {lat: 2.9713, lng: 101.7311 },
		disableDefaultUI: true
	});
	map.addListener('click', function(e) {
		var i = markers.length-1;
		if(i!=-1){
			clearOverlays();
		}
		createMarker(e.latLng, map);
	});
	fire.getEvent(map);
}
	 
function createMarker(latLng, map) {
	infowindow.close();
	var marker = new google.maps.Marker({
		position: latLng,
		map: map,
		title:"Hello World!",
		draggable:true
	});
	
	marker.addListener('click', function() {
		infowindow.setContent(html);
		infowindow.open(map, marker);	
    });
	var html = "<div ><input type='hidden' id='lat' value='"+latLng.lat()+"'/> <input type='hidden' id='lng' value='"+latLng.lng()+"'/> <table class='form'>" +
  "<tr><td>Purpose:</td> <td><input id='radio1' name='radio' type='radio'  checked='checked'>Looking For</td> </tr>" +
				 "<tr><td></td> <td><input id='radio2'  name='radio' type='radio' >Providing</td> </tr>" +
  "<tr><td>Categories:</td> <td><select id='type'>" +
  "<option value='food' SELECTED>Food</option>" +
  "<option value='trans'>Transport</option>" +
				  "<option value='event'>Event</option>" +
				  "<option value='notice'>Notice</option>" +
				  "<option value='lost'>Lost and Found</option>" +
				  "<option value='complain'>Complaint/Feedback</option>" +
  "</select> </td></tr>" +
				"<tr><td>Name:</td> <td><input class='input' type='text' id='name' /> </td> </tr>" +
  "<tr><td>Description:</td> <td><textarea id='description'/></textarea> </td> </tr>" +
					 "<tr><td></td><td><button style='width:50%;border:none; padding:10% !important;color :white; background-color:#2FDC58;' type='button' value='Create' onclick='createPost();clearOverlays(); '>Create</button><button style='width:50%;padding:10% !important;color:white;border:none;background-color:#CC0000' type='button' value='Cancel' onclick='clearOverlays()'>Cancel </button></td>	</tr> </div>";
	infowindow = new google.maps.InfoWindow({
		content: html
	});
	infowindow.close();	
	infowindow.setContent(html);
	infowindow.open(map, marker);
	map.panTo(latLng);

	markers.push({
		mark:marker
	});		 
}
var marker_api = [];
function getMarker(latt,long,maps,icon,info){
	var icons={
		url:icon,
		scaledSize:new google.maps.Size(50,61)
	}
	var marker=new google.maps.Marker({
		position: {lat: latt, lng: long},
		icon:icons,
		map: maps,
		animation: google.maps.Animation.DROP,
		title:"Hello World!",
		draggable:false
	})

	var content="<div><h3>"+info.val().name+"</h3><hr><h4>Description:</h4><p>"+info.val().description+"</p><button style='width:100%;border:none;background-color:#7cafd9; color:white;padding-top:4%;padding-bottom:4%;padding:10% !important;' key="+info.key+" onclick='fire.selectEvent($(this).attr(&quot;key&quot))'>View more</button></div>";

	infowindow=new google.maps.InfoWindow({
		content:content
	})

	marker.addListener('click',function(){
		infowindow.close();
		infowindow.setContent(content);
		infowindow.open(map,marker);
	})

		
}


function createPost(){

	console.log("clicked");
	var name = $('#name').val();
	var description = $('#description').val();
	//var needgive = $('#needgive').val();
	var type = $('#type').val();
	var lat = $('#lat').val();
	var lng = $('#lng').val();
	var needGiveSample= [];
	var types;
	var h;
	if($('#radio1').is(':checked')) {
		types= "need";
		var needGiveSample={
			type:types,
			item:""
		}
		fire.createEvent(name,description,type,needGiveSample,lat,lng);
	} 
	if($('#radio2').is(':checked')) {
		types= "give";
		var needGiveSample={
			type:types,
			item:""
		}
		fire.createEvent(name,description,type,needGiveSample,lat,lng);
	}

}
	  
	  
function clearOverlays() {
	var i = markers.length-1;
	markers[i].mark.setMap(null);
	markers.pop();
}
	 
function saveData() {
	var i = markers.length-1;
	markers[i].setMap(null);
	markers.pop();
 	setMapOnAll(null);
}
