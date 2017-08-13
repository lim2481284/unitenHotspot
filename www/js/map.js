


function checkUser(){
	var value = window.localStorage.getItem("role");
    if(value =='student')
	{
		
		$('.admin').hide();
	}
}

 // added noti function	
function closeNoti() {
    document.getElementById("notifyDiv").style.top = "-15%";
}
	
	
	
	
function openNavBtm() {
    document.getElementById("myBtmnav").style.height = "80vh";
	$(this).one("click", closeNavBtm);
}

function closeNavBtm() {
    document.getElementById("myBtmnav").style.height = "0";
	 $(this).one("click", openNavBtm);
}

$("#btm").one("click", openNavBtm);


	
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}


checkUser();
