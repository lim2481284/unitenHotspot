


  // Initialize Firebase
var config = {
apiKey: "AIzaSyBkpGYDt7QqxQEBLFi4Jt1yzGcd0Lnuu6Y",
authDomain: "unitenhackhaton.firebaseapp.com",
databaseURL: "https://unitenhackhaton.firebaseio.com",
projectId: "unitenhackhaton",
storageBucket: "unitenhackhaton.appspot.com",
messagingSenderId: "801016906115"
};

  firebase.initializeApp(config);

function Api(){
	this.getEvent=function(map){
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
			getMarker(parseFloat(snap.val().lat),parseFloat(snap.val().long),map,icon,snap);
			//console.log("The value is: ",snap.val())
			//console.log("the key is: ",snap.key)
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
	this.createEvent=function(evname,description,type,needgive,lat,long){
		firebase.database().ref("events").push({
			name:evname,
			description:description,
			type:type,
			needgive:needgive,
			lat:lat,
			long:long
		});
			
	}

	this.selectEvent=function(key){
		var selected=firebase.database().ref("events/"+key);
		selected.on("value",function(snap){
			//console.log("Selected child is",snap.val());
			localStorage.setItem("current_details",JSON.stringify(snap.val()));
			localStorage.setItem("current_key",snap.key);
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
		message.on("child_added",function(snap){
				
				$('#noti_message').html(snap.val()[Object.keys(snap.val())[0]]);
		})
	}

	this.writeComment=function(key,comment,writer){

		firebase.database().ref("events/"+key+"/comments").push({
			comments:comment,
			writer:writer
		})
	}
	
	this.getComment=function(key){
	
		var events=firebase.database().ref("events/"+key+"/comments");
		events.on("child_added",function(snap){
			$('#commentArea').append("<div class='commentList'> <div style='width:100%'><input type='text' style='color:gray;margin:0; padding:0;' class='comment' value='" +snap.val().writer+ "'/><input type='text' class='comment' value='" +snap.val().comments+ "'/></div></div>");
			//console.log("the key is: ",snap.key)
		});
	}
}

//added noti message
var fire=new Api();
fire.getMessage();
	


function publishNoti() {
    var msg = prompt("Publish Notification");
	var fire=new Api();
	fire.createMessage("title",msg);

}	
	
	 