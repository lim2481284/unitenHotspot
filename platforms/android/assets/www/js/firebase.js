
var x =1 ;

function Api(){
	this.getEvent=function(){
		var events=firebase.database().ref("events");
		events.on("child_added",function(snap){
			console.log("The value is: ",snap.val())
			console.log("the key is: ",snap.key)
		});
	
	}

	this.getEventForList=function(){
	
		var events=firebase.database().ref("events");
		events.on("child_added",function(snap){

			
		if (snap.val().type=="food" && snap.val().needgive.type=="give"){
			var icon="img/food.png";
		}
		else if (snap.val().type=="event" && snap.val().needgive.type=="give"){
			var icon="img/event.png";
		}
		else if (snap.val().type=="complain"){
			var icon="img/feed.png";
		}
		else if (snap.val().type=="lost" && snap.val().needgive.type=="give"){
			var icon="img/lost.png";
		}
		else if (snap.val().type=="trans" && snap.val().needgive.type=="give"){
			var icon="img/tran.png";
		}
		else if (snap.val().type=="notice"){
			var icon="img/notic.png";
		}
		else if (snap.val().type=="lost" && snap.val().needgive.type=="need"){
			var icon="img/Rlost.png";
		}
		else if (snap.val().type=="trans" && snap.val().needgive.type=="need"){
			var icon="img/Rtran.png";
		}
		else if (snap.val().type=="food" && snap.val().needgive.type=="need"){
			var icon="img/Rfood.png";
		}
		else if (snap.val().type=="event" && snap.val().needgive.type=="need"){
			var icon="img/Revent.png";
		}
			
			$('#list').append("<a style='cursor:pointer' class='event_row' key="+snap.key+"><img style='width:20vw;height:10vh;float:left;margin:5px;padding:5px;' src="+icon+"><div style=''><h3>"+snap.val().name+"</h3><p style='width:40%'>"+snap.val().description+"</p></a><hr>")
			$(".event_row").on('click',function(){
				console.log('clicked');
				fire.selectEvent($(this).attr("key"));
				window.location.href = 'details.html';
			});
		});	
		
		
		
	}
	
	

	this.createEvent=function(evname,description,endDate,startDate,type,needgive,time){
		firebase.database().ref("events").push({
			name:evname,
			description:description,
			endDate:endDate,
			startDate:startDate,
			type:type,
			needgive:needgive,
			time:time
		});
	}

	this.selectEvent=function(key){
		var selected=firebase.database().ref("events/"+key);
		selected.on("value",function(snap){
			//console.log("Selected child is",snap.val());
			localStorage.setItem("current_details",JSON.stringify(snap.val()))
			window.location="details.html";
		})
	}

	this.createMessage=function(title,message){
		firebase.database().ref("message").push({
			title:title,
			message:message
		})
	}

	this.getMessage=function(){
		var message=firebase.database().ref("message").limitToLast(1);
		message.on("value",function(snap){
			/*
			console.log("Message title :",snap.val().title);
			console.log("Message content :",snap.val().message);
			*/
			console.log(snap.val()[Object.keys(snap.val())[0]]);
		})
	}

	this.writeComment=function(key,comment,writer){
		firebase.database().ref("events/"+key+"/comments").push({
			comments:comment,
			writer:writer
		})
	}
}

var fire=new Api();

/*Sample




*************For Event*******************

fire.getEvent();
fire.selectEvent(2);

var needGiveSample={
	type:"give",
	item:"food"
}
fire.createEvent("Event1","Try to create event.","07-08-2017","08-08-2017","event",needGiveSample,"23:00");

*****************************************





**************For Message*****************
fire.createMessage("A new food store!","For all ilmu citizens, now we have Nasi Lemak Burger!!!");
fire.getMessage();

******************************************




*************Write Comments*************
fire.writeComment("-KqhBm8htHlBMv-ZNvkt","Hey Edward, behave please?","Johnny");

****************************************

*/



fire.getEventForList();

$( document ).ready(function() {

});
