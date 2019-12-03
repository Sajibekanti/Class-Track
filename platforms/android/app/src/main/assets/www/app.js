var db;
var database = "allclass";
var database_varsion = 2;
var option = 0;
var getid = -1;
function indexedDBOk() {
return "indexedDB" in window;
}
document.addEventListener("DOMContentLoaded", function() {
	//No support? Go in the corner and pout.
	if(!indexedDBOk) return;

	var openRequest = indexedDB.open(database,database_varsion);
	openRequest.onupgradeneeded = function(e) {
		var thisDB = e.target.result;
		if(!thisDB.objectStoreNames.contains("subject")) {
			thisDB.createObjectStore("subject", {keyPath: "id", autoIncrement:true});
		}
		if(!thisDB.objectStoreNames.contains("class")) {
			thisDB.createObjectStore("class", {keyPath: "id", autoIncrement:true});
		}
		if(!thisDB.objectStoreNames.contains("exam")) {
			thisDB.createObjectStore("exam", {keyPath: "id", autoIncrement:true});
		}
		if(!thisDB.objectStoreNames.contains("ass")) {
			thisDB.createObjectStore("ass", {keyPath: "id", autoIncrement:true});
		}
		if(!thisDB.objectStoreNames.contains("meet")) {
			thisDB.createObjectStore("meet", {keyPath: "id", autoIncrement:true});
		}
	}
	openRequest.onsuccess = function(e) {
		db = e.target.result;
		
		if(document.querySelector("#clearsubject")) {
			document.querySelector("#clearsubject").addEventListener("click", clearsubject, false);
		}

		if(document.querySelector("#savesubject")) {
			document.querySelector("#savesubject").addEventListener("click", savesubject, false);
		}

		if(document.querySelector("#subview")) {
			document.querySelector("#subview").addEventListener("click", subview, false);
		}

		if(document.querySelector("#clearexam")) {
			document.querySelector("#clearexam").addEventListener("click", clearexam, false);
		}

		if(document.querySelector("#saveexam")) {
			document.querySelector("#saveexam").addEventListener("click", saveexam, false);
		}

		if(document.querySelector("#examview")) {
			document.querySelector("#examview").addEventListener("click", examview, false);
		}

		if(document.querySelector("#clearcls")) {
			document.querySelector("#clearcls").addEventListener("click", clearcls, false);
		}

		if(document.querySelector("#savecls")) {
			document.querySelector("#savecls").addEventListener("click", savecls, false);
		}

		if(document.querySelector("#clsview")) {
			document.querySelector("#clsview").addEventListener("click", clsview, false);
		}

		if(document.querySelector("#clearass")) {
			document.querySelector("#clearass").addEventListener("click", clearass, false);
		}

		if(document.querySelector("#saveass")) {
			document.querySelector("#saveass").addEventListener("click", saveass, false);
		}

		if(document.querySelector("#assview")) {
			document.querySelector("#assview").addEventListener("click", assview, false);
		}

		if(document.querySelector("#clearmeet")) {
			document.querySelector("#clearmeet").addEventListener("click", clearmeet, false);
		}

		if(document.querySelector("#savemeet")) {
			document.querySelector("#savemeet").addEventListener("click", savemeet, false);
		}

		if(document.querySelector("#meetview")) {
			document.querySelector("#meetview").addEventListener("click", meetview, false);
		}

	}	
	openRequest.onerror = function(e) {
		console.log("Error",e.target.error.name);
	}
},false);


function getvalue()
{
	var queryString = new Array();
    if (queryString.length == 0) {
        if (window.location.search.split('?').length > 1) {
            var params = window.location.search.split('?')[1].split('&');
            for (var i = 0; i < params.length; i++) {
                var key = params[i].split('=')[0];
                var value = decodeURIComponent(params[i].split('=')[1]);
                queryString[key] = value;
            }
        }
    }
    if(queryString["subjecttitle"] != null && queryString["subjectcode"] != null && queryString["pname"] != null) {
    	//For Subject
    	$("#subjecttitle").val(queryString["subjecttitle"]);
    	$("#subjectcode").val(queryString["subjectcode"]);
    	$("#pname").val(queryString["pname"]);
    	$("#phonenumber").val(queryString["phonenumber"]);
    	$("#id").val(queryString["id"]);
    }
    else if (queryString["subjectid"] != null && queryString["date"] != null && queryString["stime"] != null && queryString["etime"] != null && queryString["room"] != null && queryString["type"] != null) {
    	// For Exam
        $("#type").val(queryString["type"]);
        $("#date").val(queryString["date"]);
        $("#stime").val(queryString["stime"]);
        $("#etime").val(queryString["etime"]);
        $("#room").val(queryString["room"]);
        $("#id").val(queryString["id"]);
        var msg = '<option value=\'{"subjectid":"'+queryString["subjectid"]+'","subjectcode":"'+queryString["subjectcode"]+'","subjecttitle":"'+queryString["subjecttitle"]+'","pname":"'+queryString["pn"]+'","phonenumber":"'+queryString["phn"]+'"}\' selected>'+queryString["subjecttitle"]+'</option>';
        // var msg = '<option value="'+queryString["sub"]+'" selected>'+queryString["sub"]+'</option>';
		$("#sub").append(msg);
    }
    else if (queryString["day"] != null && queryString["subjecttitle"] != null && queryString["room"] != null && queryString["stime"] != null && queryString["etime"] != null) {
    	//For Class
        $("#day").val(queryString["day"]);
        $("#stime").val(queryString["stime"]);
        $("#etime").val(queryString["etime"]);
        $("#room").val(queryString["room"]);
        $("#note").val(queryString["note"]);
        $("#id").val(queryString["id"]);
        var msg = '<option value=\'{"subjectid":"'+queryString["subjectid"]+'","subjectcode":"'+queryString["subjectcode"]+'","subjecttitle":"'+queryString["subjecttitle"]+'","pname":"'+queryString["pn"]+'","phonenumber":"'+queryString["phn"]+'"}\' selected>'+queryString["subjecttitle"]+'</option>';
		$("#sub").append(msg);
    }

    else if (queryString["subjecttitle"] != null && queryString["date"] != null && queryString["topic"] != null) {
    	//For Assignment
        $("#date").val(queryString["date"]);
        $("#id").val(queryString["id"]);
        $("#topic").val(queryString["topic"]);
        var msg = '<option value=\'{"subjectid":"'+queryString["subjectid"]+'","subjectcode":"'+queryString["subjectcode"]+'","subjecttitle":"'+queryString["subjecttitle"]+'","pname":"'+queryString["pn"]+'","phonenumber":"'+queryString["phn"]+'"}\' selected>'+queryString["subjecttitle"]+'</option>';
		$("#sub").append(msg);
    }
    else if (queryString["meettitle"] != null && queryString["date"] != null && queryString["time"] != null) {
    	//For Meeting
        $("#meettitle").val(queryString["meettitle"]);
        $("#date").val(queryString["date"]);
        $("#time").val(queryString["time"]);
        $("#place").val(queryString["place"]);
        $("#id").val(queryString["id"]);
    }


 	// clearexam();
}

function p(key)
{
	var transaction = db.transaction(["class"],"readonly");
	var store = transaction.objectStore("class");
	var heading = '<section class="content-header">'+
          '<h1>'+
            key+' List'+
            '<div class="box-tools pull-right">'+
              '<a href="./day.html"><button class="btn  bg-maroon btn-xs"><i class="fa fa-chevron-left"></i> Back</button></a>'+
            '</div>'+
            '<small>your stored data...</small>'+
          '</h1>'+
        '</section>';

	$("#heading").html(heading);
	$("#class").html("");

	var f= false;
	
	store.openCursor().onsuccess = function(e) {
		var result = e.target.result;
		if(result) {
			var value = result.value;

			var url = "./cls.html?day=" + encodeURIComponent(value.day)+
   			"&subjecttitle="+encodeURIComponent(value.subjecttitle)+
   			"&subjectcode="+encodeURIComponent(value.subjectcode)+
   			"&pn="+encodeURIComponent(value.pname)+
   			"&subjectid="+encodeURIComponent(value.subjectid)+
   			"&stime="+encodeURIComponent(value.stime)+
   			"&etime="+encodeURIComponent(value.etime)+
   			"&room="+encodeURIComponent(value.room)+
   			"&note="+encodeURIComponent(value.note)+
   			"&phn="+encodeURIComponent(value.phonenumber)+
   			"&id="+encodeURIComponent(value.id);

			var msg = '<div class="box box-solid">'+
			'<div class="box-header with-border">'+
				'<h3 class="box-title">'+value.subjectcode+'</h3>'+
				'<div class="box-tools pull-right">'+
                    '<button onclick="go(\''+url+'\')" class="btn bg-purple btn-sm"><i class="fa fa-pencil"></i></button> '+
                    '<button onclick="del('+value.id+',\'class\')" data-widget="remove" class="btn bg-purple btn-sm"><i class="fa fa-trash-o"></i></button> '+
                 '</div>'+
            '</div>'+
            '<div class="box-body">'+
              '<dl>'+
              	'<dt>'+value.subjecttitle+'</dt>'+
                '<dd>'+value.subjectcode+'</dd>'+
                '<i><dd>'+value.pname+'</dd></i>'+
                '<dt>Start Time:  <b class="text-green">'+value.stime+'</b></dt>'+
                '<dt>End Time:  <b class="text-red">'+value.etime+'</b></dt>'+
                '<dt>Room: '+value.room+'</dt>'+
                '<dd>'+value.note+'</dd>'+
              '</dl>'+
            '</div>'+
  		'</div>';

			if(value.day==key)
			{
				$("#class").append(msg);
				f=true;
			}
			// move to the next item in the cursor
			result.continue();
		} 
		else if(f!=true){
			var br = "<br />";
			$("#class").append(br);
			var msg = '<div class="callout callout-danger">'+
                    '<h4>You don\'t have any Classes !!!</h4>'+
                  '</div>';
			$("#class").append(msg);
		}	
	}	
}

function go(url)
{
	window.location.href = url;
}

function del(id, object)
{
	// alert(id);
    if(window.confirm("Do you want to Delete This ?"))
    {
    	 var transaction = db.transaction([ object ], 'readwrite');
   		 var store = transaction.objectStore(object);

   		 //Perform the delete
    	 var request = store.delete(id);
	     request.onsuccess = function () {
				   if(object=='subject') {
				   		alert("Subject Sucessfully Deleted !!!");
				   		go("./subview.html");
				   }
				   else if(object == 'class') {
				   		alert("Class Sucessfully Deleted !!!");
				   		go("./clsview.html");
				   }
				   else if(object == 'exam') {
				   		alert("Examination Sucessfully Deleted !!!");
				   		go("./examview.html");
				   }
				   else if(object == 'ass') {
				   		alert("Assignment Sucessfully Deleted !!!");
				   		go("./assview.html");
				   }
				   else if(object == 'meet') {
				   		alert("Meeting Sucessfully Cancel !!!");
				   		go("./meetview.html");
				   }
				   
		 }
		  request.onerror = function (e) {
				   alert("Error while deleting notes : " + e.value);
		  };
    }
    else
    {
		   if(object=='subject') {
		   		alert("Subject Sucessfully Deleted !!!");
		   		go("./subview.html");
		   }
		   else if(object == 'class') {
		   		alert("Class Sucessfully Deleted !!!");
		   		go("./clsview.html");
		   }
		   else if(object == 'exam') {
		   		alert("Examination Sucessfully Deleted !!!");
		   		go("./examview.html");
		   }
		   else if(object == 'ass') {
		   		alert("Assignment Sucessfully Deleted !!!");
		   		go("./assview.html");
		   }
		   else if(object == 'meet') {
		   		alert("Meeting Sucessfully Cancel !!!");
		   		go("./meetview.html");
		   }
}
     
}

function suboption(e)
{
	var queryString = new Array();
    if (queryString.length == 0) {
        if (window.location.search.split('?').length > 1) {
            var params = window.location.search.split('?')[1].split('&');
            for (var i = 0; i < params.length; i++) {
                var key = params[i].split('=')[0];
                var value = decodeURIComponent(params[i].split('=')[1]);
                queryString[key] = value;
            }
        }
    }
	if(option==0)
	{
		if(!indexedDBOk) return;

		var openRequest = indexedDB.open(database,database_varsion);
		openRequest.onsuccess = function(e) {
			db = e.target.result;
			var transaction = db.transaction(["subject"],"readonly");
			var store = transaction.objectStore("subject");
			
			store.openCursor().onsuccess = function(e) {
				var result = e.target.result;
				if(result) {
					var value = result.value;
					if(queryString["subjectid"]!=value.id)
						var msg = '<option value=\'{"subjectid":"'+value.id+'","subjectcode":"'+value.subjectcode+'","subjecttitle":"'+value.subjecttitle+'","pname":"'+value.pname+'","phonenumber":"'+value.phonenumber+'"}\'>'+value.subjecttitle+'</option>';
					$("#sub").append(msg);
					option=1;

					result.continue();
				}
			}
		}	
	}
}

function clearsubject(e)
{
   $("#id").val("");
   $("#subjecttitle").val("");
   $("#subjectcode").val("");
   $("#pname").val("");
   $("#phonenumber").val("");
   $("#subjecttitle").focus();
}

function savesubject(e)
{
	var id = $("#id").val();
	var subjecttitle = $("#subjecttitle").val();
   	var subjectcode = $("#subjectcode").val();
	var pname = $("#pname").val();
   	var phonenumber = $("#phonenumber").val();

   	if(subjecttitle=='')
   	{
   		alert("Please Fill out Subject Name. Future you can edit this.");
   		$("#subjecttitle").focus();
   		return false;
   	}
   	else if(subjectcode=='')
   	{
   		alert("Please Fill out Subject Code. Future you can edit this.");
   		$("#subjectcode").focus();
   		return false;
   	}
   	else if(pname=='')
   	{
   		alert("Please Fill out Professor Name. Future you can edit this.");
   		$("#pname").focus();
   		return false;
   	}

	var transaction = db.transaction(["subject"],"readwrite");
	//Ask for the objectStore
	var store = transaction.objectStore("subject");

   	if(id!='')
   	{
		var sub = {
			subjecttitle:subjecttitle,
			subjectcode:subjectcode,
			pname:pname,
			phonenumber:phonenumber,
			id:Number(id)
		}

		//Perform the update
		var request = store.put(sub);
		request.onerror = function(e) {
			go("./subview.html");
		}
		request.onsuccess = function(e) {
			 // clsupdate(id,subjecttitle,subjectcode,pname,phonenumber);
			 alert("Subject Update Successfully !!!");


			 go("./subview.html");
		}

   	}
   	else
   	{
		var sub = {
			subjecttitle:subjecttitle,
			subjectcode:subjectcode,
			pname:pname,
			phonenumber:phonenumber
		}
		//Perform the add
		var request = store.add(sub);
		request.onerror = function(e) {
			go("./sub.html");
		}
		request.onsuccess = function(e) {

			alert("Subject Add Successfully !!!");
			var msg = '<div class="alert alert-success alert-dismissable">'+
	                '<button type="button" data-dismiss="alert" aria-hidden="true" class="close">×</button>'+
	                '<h4>'+
	                '<i class="icon fa fa-check"></i>'+
	                'Subject Add Successfully!'+
	                '</h4>'+
	                'You can view all subjects in <a href="./subview.html">here...</a>'+
	              '</div>';
			$("#notis").html(msg);
			clearsubject();
		}

   	}

}

function subview(e)
{
	if(!indexedDBOk) return;

	var openRequest = indexedDB.open(database,database_varsion);
	openRequest.onsuccess = function(e) {
		db = e.target.result;
		var transaction = db.transaction(["subject"],"readonly");
		var store = transaction.objectStore("subject");

		$("#notis").html("");
		var f=false;
		
		store.openCursor().onsuccess = function(e) {
			var result = e.target.result;
			if(result) {
				var value = result.value;
	   			var url = "./sub.html?subjecttitle=" + encodeURIComponent(value.subjecttitle) + 
	   			"&subjectcode=" + encodeURIComponent(value.subjectcode)+ 
	   			"&pname=" + encodeURIComponent(value.pname)+
	   			"&phonenumber=" + encodeURIComponent(value.phonenumber)+
	   			"&id=" + encodeURIComponent(value.id);

				var msg = '<div class="box box-solid">'+
					'<div class="box-header with-border">'+
						'<h3 class="box-title">'+value.subjectcode+'</h3>'+
						'<div class="box-tools pull-right">'+
		                    '<button onclick="go(\''+url+'\')" class="btn bg-purple btn-sm"><i class="fa fa-pencil"></i></button> '+
		                    '<button onclick="del('+value.id+',\'subject\')" data-widget="remove" class="btn bg-purple btn-sm"><i class="fa fa-trash-o"></i></button> '+
		                 '</div>'+
		            '</div>'+
	                '<div class="box-body">'+
	                  '<dl>'+
	                    '<dt>'+value.subjecttitle+'</dt>'+
	                    '<dd>'+value.subjectcode+'</dd>'+
	                    '<dt>'+value.pname+'</dt>'+
	                    '<dd>'+value.phonenumber+'</dd>'+
	                  '</dl>'+
	                '</div>'+
          		'</div>';

				$("#notis").append(msg);
				f=true;
				// move to the next item in the cursor
				result.continue();
			}
			else if(f!=true){
				var br = "<br />";
				$("#notis").append(br);
				var msg = '<div class="callout callout-danger">'+
	                    '<h4>You don\'t have any Subject !!!</h4>'+
	                  '</div>';
				$("#notis").append(msg);
			}	
		}	
	}
}

function clearexam(e)
{
   $("#id").val("");
   $("#type").val("");
   $("#sub").val("");
   $("#date").val("");
   $("#stime").val("");
   $("#etime").val("");
   $("#room").val("");
}

function saveexam(e)
{

	var id = $("#id").val();
	var type = $("#type").val();
	var date = $("#date").val();
   	var stime = $("#stime").val();
   	var etime = $("#etime").val();
   	var room = $("#room").val();
   	var obj = 	$.parseJSON($('#sub').val());


   	if(type=='' || type==null)
   	{
   		alert("Please Fill out Exam Type. Future you can edit this.");
   		$("#type").focus();
   		return false;
   	}
   	else if(obj=='' || obj==null)
   	{
   		alert("Please Fill out Exam Subject. Future you can edit this.");
   		$("#sub").focus();
   		return false;
   	}
   	else if(date=='')
   	{
   		alert("Please Fill out Exam Date. Future you can edit this.");
   		$("#date").focus();
   		return false;
   	}
   	else if(stime=='')
   	{
   		alert("Please Fill out Start Time. Future you can edit this.");
   		$("#stime").focus();
   		return false;
   	}
   	else if(etime=='')
   	{
   		alert("Please Fill out End Time. Future you can edit this.");
   		$("#etime").focus();
   		return false;
   	}
   	else if(room=='')
   	{
   		alert("Please Fill out Room/Place. Future you can edit this.");
   		$("#room").focus();
   		return false;
   	}
	else
	{
		f=0;
		for(i=0;i<date.length;i++)
		{
			if(date[i]=='m' || date[i]=='y')
			{
				f=1;
				break;
			}
		}
		if(f){
			alert("Please Fill out Valid Date. Future you can edit this.");
	   		$("#date").focus();
	   		return false;
		}
		
	}

	// alert(obj['subjectcode']);	
	var transaction = db.transaction(["exam"],"readwrite");
	//Ask for the objectStore
	var store = transaction.objectStore("exam");

   	if(id!='')
   	{
		//Define a sub
		var sub = {
			type:type,
			subjectid:obj.subjectid,
			subjecttitle:obj.subjecttitle,
			subjectcode:obj.subjectcode,
			pname:obj.pname,
			phonenumber:obj.phonenumber,
			date:date,
			stime:stime,
			etime:etime,
			room:room,
			id:Number(id)
		}
		//Perform the update
		var request = store.put(sub);
		request.onerror = function(e) {
			go("./examview.html");
		}
		request.onsuccess = function(e) {

			alert("Examination Update Successfully !!!");
			go("./examview.html");
		}

   	}
   	else
   	{
		//Define a sub
		var sub = {
			type:type,
			subjectid:obj.subjectid,
			subjecttitle:obj.subjecttitle,
			subjectcode:obj.subjectcode,
			pname:obj.pname,
			phonenumber:obj.phonenumber,
			date:date,
			stime:stime,
			etime:etime,
			room:room
		}
		//Perform the add
		var request = store.add(sub);
		request.onerror = function(e) {
			go("./exam.html");
		}
		request.onsuccess = function(e) {

			 alert("Examination Add Successfully !!!");
			var msg = '<div class="alert alert-success alert-dismissable">'+
	                '<button type="button" data-dismiss="alert" aria-hidden="true" class="close">×</button>'+
	                '<h4>'+
	                '<i class="icon fa fa-check"></i>'+
	                'Examination Add Successfully!'+
	                '</h4>'+
	                'You can view all examination in <a href="./examview.html">here</a> ...'+
	              '</div>';
			$("#notis").html(msg);
			clearexam();
		}
	}
}

function examview(e)
{
	if(!indexedDBOk) return;

	var openRequest = indexedDB.open(database,database_varsion);
	openRequest.onsuccess = function(e) {
		db = e.target.result;
		var transaction = db.transaction(["exam"],"readonly");
		var store = transaction.objectStore("exam");

		$("#notis").html("");
		var f=false;
		
		store.openCursor().onsuccess = function(e) {
			var result = e.target.result;
			if(result) {
				var value = result.value;

	   			var url = "./exam.html?subjectid=" + encodeURIComponent(value.subjectid)+
	   			"&subjecttitle="+encodeURIComponent(value.subjecttitle)+
	   			"&subjectcode="+encodeURIComponent(value.subjectcode)+
	   			"&pn="+encodeURIComponent(value.pname)+
	   			"&phn="+encodeURIComponent(value.phonenumber)+
	   			"&type="+encodeURIComponent(value.type)+
	   			"&date="+encodeURIComponent(value.date)+
	   			"&stime="+encodeURIComponent(value.stime)+
	   			"&etime="+encodeURIComponent(value.etime)+
	   			"&room="+encodeURIComponent(value.room)+
	   			"&id="+encodeURIComponent(value.id);

	   			color= 'bg-purple';
	   			if(value.type=="Class Test")
	   			{
	   				color= 'bg-olive';
	   			}
	   			else if(value.type=="Mid")
	   			{
	   				color= 'bg-navy';
	   			}
	   			else if(value.type=="Final")
	   			{
	   				color= 'bg-red';
	   			}

				var msg = '<div class="box box-solid">'+
					'<div class="box-header with-border">'+
						'<h3 class="box-title">'+value.subjectcode+'</h3>'+
						'<div class="box-tools pull-right">'+
		                    '<button class="btn '+color+' btn-sm disabled">'+value.type+'</button> '+
		                    '<button onclick="go(\''+url+'\')" class="btn bg-purple btn-sm"><i class="fa fa-pencil"></i></button> '+
		                    '<button onclick="del('+value.id+',\'exam\')" data-widget="remove" class="btn bg-purple btn-sm"><i class="fa fa-trash-o"></i></button> '+
		                 '</div>'+
		            '</div>'+
	                '<div class="box-body">'+
	                  '<dl>'+
	                  	'<dt>'+value.type+' (<b class="text-aqua"> '+value.date+' </b>)</dt>'+
	                    '<dt>'+value.subjecttitle+' ('+value.subjectcode+')</dt>'+
	                    '<i><dd>'+value.pname+'</dd></i>'+
	                    '<dt>Start Time:  <b class="text-green">'+value.stime+'</b></dt>'+
	                    '<dt>End Time:  <b class="text-red">'+value.etime+'</b></dt>'+
	                    '<dt>Room/Place : '+value.room+'</dt>'+
	                  '</dl>'+
	                '</div>'+
          		'</div>';

				$("#notis").append(msg);
				f=true;
				// move to the next item in the cursor
				result.continue();
			}
			else if(f!=true){
				var br = "<br />";
				$("#notis").append(br);
				var msg = '<div class="callout callout-danger">'+
	                    '<h4>You don\'t have any Exam !!!</h4>'+
	                  '</div>';
				$("#notis").append(msg);
			}	
		}

		store.openCursor().onerror = function(e) {	
			alert("not working exam");
		}

	}	
}

function clearcls(e)
{
   $("#id").val("");
   $("#day").val("");
   $("#sub").val("");
   $("#room").val("");
   $("#stime").val("");
   $("#etime").val("");
   $("#note").val("");
}

function savecls(e)
{

	var id = $("#id").val();
	var day = $("#day").val();
	var room = $("#room").val();
   	var stime = $("#stime").val();
   	var etime = $("#etime").val();
   	var note = $("#note").val();

   	var obj = $.parseJSON($('#sub').val());
	if(day=='' || day==null)
   	{
   		alert("Please Fill out Class Day. Future you can edit this.");
   		$("#day").focus();
   		return false;
   	}
	else if(obj=='' || obj==null)
   	{
   		alert("Please Fill out Class Subject. Future you can edit this.");
   		$("#sub").focus();
   		return false;
   	}
   	else if(room=='')
   	{
   		alert("Please Fill out Room. Future you can edit this.");
   		$("#room").focus();
   		return false;
   	}
   	else if(stime=='')
   	{
   		alert("Please Fill out Start Time. Future you can edit this.");
   		$("#stime").focus();
   		return false;
   	}
   	else if(etime=='')
   	{
   		alert("Please Fill out End Time. Future you can edit this.");
   		$("#etime").focus();
   		return false;
   	}

   	var transaction = db.transaction(["class"],"readwrite");
	//Ask for the objectStore
	var store = transaction.objectStore("class");

   	if(id!='')
   	{
		//Define a sub
		var sub = {
			day:day,
			subjectid:obj.subjectid,
			subjecttitle:obj.subjecttitle,
			subjectcode:obj.subjectcode,
			pname:obj.pname,
			phonenumber:obj.phonenumber,
			stime:stime,
			etime:etime,
			room:room,
			note:note,
			id:Number(id)
		}
		//Perform the update
		var request = store.put(sub);
		request.onerror = function(e) {
			go("./clsview.html");
		}
		request.onsuccess = function(e) {

			alert("Class Update Successfully !!!");
			go("./clsview.html");
		}

   	}
   	else
   	{
		//Define a sub
		var sub = {
			day:day,
			subjectid:obj.subjectid,
			subjecttitle:obj.subjecttitle,
			subjectcode:obj.subjectcode,
			pname:obj.pname,
			phonenumber:obj.phonenumber,
			stime:stime,
			etime:etime,
			room:room,
			note:note
		}
		//Perform the add
		var request = store.add(sub);
		request.onerror = function(e) {
			go("./cls.html");
		}
		request.onsuccess = function(e) {

			alert("Class Add Successfully !!!");
			var msg = '<div class="alert alert-success alert-dismissable">'+
	                '<button type="button" data-dismiss="alert" aria-hidden="true" class="close">×</button>'+
	                '<h4>'+
	                '<i class="icon fa fa-check"></i>'+
	                'Class Add Successfully!'+
	                '</h4>'+
	                'You can view all Classes in <a href="./clsview.html">here</a> ...'+
	              '</div>';
			$("#notis").html(msg);
			clearcls();
		}
	}

}

function clsview(e)
{
	if(!indexedDBOk) return;

	var openRequest = indexedDB.open(database,database_varsion);
	openRequest.onsuccess = function(e) {
		db = e.target.result;
		var transaction = db.transaction(["class"],"readonly");
		var store = transaction.objectStore("class");

		$("#notis").html("");
		var f=false;
		
		store.openCursor().onsuccess = function(e) {
			var result = e.target.result;
			if(result) {
				var value = result.value;

	   			var url = "./cls.html?day=" + encodeURIComponent(value.day)+
	   			"&subjecttitle="+encodeURIComponent(value.subjecttitle)+
	   			"&subjectcode="+encodeURIComponent(value.subjectcode)+
	   			"&pn="+encodeURIComponent(value.pname)+
	   			"&subjectid="+encodeURIComponent(value.subjectid)+
	   			"&stime="+encodeURIComponent(value.stime)+
	   			"&etime="+encodeURIComponent(value.etime)+
	   			"&room="+encodeURIComponent(value.room)+
	   			"&note="+encodeURIComponent(value.note)+
	   			"&phn="+encodeURIComponent(value.phonenumber)+
	   			"&id="+encodeURIComponent(value.id);
	   			color= 'bg-purple';
	   			if(value.day=="Sunday" || value.day=="Thursday")
	   			{
	   				color= 'bg-olive';
	   			}
	   			else if(value.day=="Monday" || value.day=="Wednesday")
	   			{
	   				color= 'bg-navy';
	   			}
	   			else if(value.day=="Saturday")
	   			{
	   				color= 'bg-red';
	   			}
	   			else if(value.day=="Tuesday")
	   			{
	   				color= 'bg-black';
	   			}


				var msg = '<div class="box box-solid">'+
					'<div class="box-header with-border">'+
						'<h3 class="box-title">'+value.subjectcode+'</h3>'+
						'<div class="box-tools pull-right">'+
		                    '<button class="btn '+color+' btn-sm disabled">'+value.day+'</button> '+
		                    '<button onclick="go(\''+url+'\')" class="btn bg-purple btn-sm"><i class="fa fa-pencil"></i></button> '+
		                    '<button onclick="del('+value.id+',\'class\')" data-widget="remove" class="btn bg-purple btn-sm"><i class="fa fa-trash-o"></i></button> '+
		                 '</div>'+
		            '</div>'+
	                '<div class="box-body">'+
	                  '<dl>'+
	                  	'<dt>'+value.subjecttitle+'</dt>'+
	                    '<dd>'+value.subjectcode+'</dd>'+
	                    '<i><dd>'+value.pname+'</dd></i>'+
	                    '<dt>Start Time:  <b class="text-green">'+value.stime+'</b></dt>'+
	                    '<dt>End Time:  <b class="text-red">'+value.etime+'</b></dt>'+
	                    '<dt>Room: '+value.room+'</dt>'+
	                    '<dd>'+value.note+'</dd>'+
	                  '</dl>'+
	                '</div>'+
          		'</div>';

				$("#notis").append(msg);
				f=true;
				// move to the next item in the cursor
				result.continue();
			}
			else if(f!=true){
				var br = "<br />";
				$("#notis").append(br);
				var msg = '<div class="callout callout-danger">'+
	                    '<h4>You don\'t have any Classes !!!</h4>'+
	                  '</div>';
				$("#notis").append(msg);
			}	
		}

		store.openCursor().onerror = function(e) {	
			alert("not working cls");
		}

	}	
}

function clearass(e)
{
   $("#id").val("");
   $("#sub").val("");
   $("#date").val("");
   $("#topic").val("");
}

function saveass(e)
{

	var id = $("#id").val();
	var date = $("#date").val();
   	var topic = $("#topic").val();

   	var obj = $.parseJSON($('#sub').val());

	if(date=='')
   	{
   		alert("Please Fill out Assignment Date. Future you can edit this.");
   		$("#date").focus();
   		return false;
   	}
   	else if(obj=='' || obj==null)
   	{
   		alert("Please Fill out Assignment Subject. Future you can edit this.");
   		$("#sub").focus();
   		return false;
   	}
   	else if(topic=='')
   	{
   		alert("Please Fill out Assignment Topic. Future you can edit this.");
   		$("#topic").focus();
   		return false;
   	}
	else
	{
		f=0;
		for(i=0;i<date.length;i++)
		{
			if(date[i]=='m' || date[i]=='y')
			{
				f=1;
				break;
			}
		}
		if(f){
			alert("Please Fill out Valid Date. Future you can edit this.");
	   		$("#date").focus();
	   		return false;
		}
		
	}

   	var transaction = db.transaction(["ass"],"readwrite");
	//Ask for the objectStore
	var store = transaction.objectStore("ass");

   	if(id!='')
   	{
		//Define a sub
		var sub = {
			date:date,
			subjectid:obj.subjectid,
			subjecttitle:obj.subjecttitle,
			subjectcode:obj.subjectcode,
			pname:obj.pname,
			phonenumber:obj.phonenumber,
			topic:topic,
			id:Number(id)
		}
		//Perform the update
		var request = store.put(sub);
		request.onerror = function(e) {
			go("./assview.html");
		}
		request.onsuccess = function(e) {

			alert("Assignment Update Successfully !!!");
			go("./assview.html");
		}

   	}
   	else
   	{
		//Define a sub
		var sub = {
			date:date,
			subjectid:obj.subjectid,
			subjecttitle:obj.subjecttitle,
			subjectcode:obj.subjectcode,
			pname:obj.pname,
			phonenumber:obj.phonenumber,
			topic:topic
		}
		//Perform the add
		var request = store.add(sub);
		request.onerror = function(e) {
			go("./ass.html");
		}
		request.onsuccess = function(e) {

			alert("Assignment Add Successfully !!!");
			var msg = '<div class="alert alert-success alert-dismissable">'+
	                '<button type="button" data-dismiss="alert" aria-hidden="true" class="close">×</button>'+
	                '<h4>'+
	                '<i class="icon fa fa-check"></i>'+
	                'Assignment Add Successfully!'+
	                '</h4>'+
	                'You can view all Classes in <a href="./assview.html">here</a> ...'+
	              '</div>';
			$("#notis").html(msg);
			clearass();
		}
	}

}

function assview(e)
{
	if(!indexedDBOk) return;

	var openRequest = indexedDB.open(database,database_varsion);
	openRequest.onsuccess = function(e) {
		db = e.target.result;
		var transaction = db.transaction(["ass"],"readonly");
		var store = transaction.objectStore("ass");

		$("#notis").html("");
		var f=false;
		
		store.openCursor().onsuccess = function(e) {
			var result = e.target.result;
			if(result) {
				var value = result.value;

	   			var url = "./ass.html?subjectid=" + encodeURIComponent(value.subjectid)+
	   			"&subjecttitle="+encodeURIComponent(value.subjecttitle)+
	   			"&subjectcode="+encodeURIComponent(value.subjectcode)+
	   			"&pn="+encodeURIComponent(value.pname)+
	   			"&date="+encodeURIComponent(value.date)+
	   			"&topic="+encodeURIComponent(value.topic)+
	   			"&phn="+encodeURIComponent(value.phonenumber)+
	   			"&id="+encodeURIComponent(value.id);

	   			var have="";
	   			if(value.phonenumber!='')
	   			{
	   				have= "Professor Phone Number :";
	   			}


				var msg = '<div class="box box-solid">'+
					'<div class="box-header with-border">'+
						'<h3 class="box-title">'+value.subjectcode+'</h3>'+
						'<div class="box-tools pull-right">'+
		                    '<button onclick="go(\''+url+'\')" class="btn bg-purple btn-sm"><i class="fa fa-pencil"></i></button> '+
		                    '<button onclick="del('+value.id+',\'ass\')" data-widget="remove" class="btn bg-purple btn-sm"><i class="fa fa-trash-o"></i></button> '+
		                 '</div>'+
		            '</div>'+
	                '<div class="box-body">'+
	                  '<dl>'+
	                  	'<dt>Topic : '+value.topic+'</dt>'+
	                    '<dd>Subject : '+value.subjecttitle+'</dd>'+
	                    '<dt>Submission Date :  <b class="text-green">'+value.date+'</b></dt>'+
	                    '<dt>Submitted To :  <b class="text-red">'+value.pname+'</b></dt>'+
	                    // '<dt>Room: '+value.room+'</dt>'+
	                    '<dd>'+have+' '+value.phonenumber+'</dd>'+
	                  '</dl>'+
	                '</div>'+
          		'</div>';

				$("#notis").append(msg);
				f=true;
				// move to the next item in the cursor
				result.continue();
			}
			else if(f!=true){
				var br = "<br />";
				$("#notis").append(br);
				var msg = '<div class="callout callout-danger">'+
	                    '<h4>You don\'t have any Assignment!!!</h4>'+
	                  '</div>';
				$("#notis").append(msg);
			}	

		}

		store.openCursor().onerror = function(e) {	
			alert("not working Assignment");
		}

	}	
}

function clearmeet(e)
{
   $("#id").val("");
   $("#meettitle").val("");
   $("#date").val("");
   $("#time").val("");
   $("#place").val("");
}

function savemeet(e)
{

	var id = $("#id").val();
	var meettitle = $("#meettitle").val();
	var date = $("#date").val();
	var time = $("#time").val();
   	var place = $("#place").val();

   	if(meettitle=='')
   	{
   		alert("Please Fill out Meeting Title. Future you can edit this.");
   		$("#meettitle").focus();
   		return false;
   	}
	else if(date=='')
   	{
   		alert("Please Fill out Meeting Date. Future you can edit this.");
   		$("#date").focus();
   		return false;
   	}
   	else if(time=='')
   	{
   		alert("Please Fill out Meeting Time. Future you can edit this.");
   		$("#time").focus();
   		return false;
   	}
   	else if(place=='')
   	{
   		alert("Please Fill out Meeting Place. Future you can edit this.");
   		$("#place").focus();
   		return false;
   	}
	else
	{
		f=0;
		for(i=0;i<date.length;i++)
		{
			if(date[i]=='m' || date[i]=='y')
			{
				f=1;
				break;
			}
		}
		if(f){
			alert("Please Fill out Valid Date. Future you can edit this.");
	   		$("#date").focus();
	   		return false;
		}
		
	}

   	var transaction = db.transaction(["meet"],"readwrite");
	//Ask for the objectStore
	var store = transaction.objectStore("meet");

   	if(id!='')
   	{
		//Define a sub
		var sub = {
			meettitle:meettitle,
			date:date,
			time:time,
			place:place,
			id:Number(id)
		}
		//Perform the update
		var request = store.put(sub);
		request.onerror = function(e) {
			go("./meetview.html");
		}
		request.onsuccess = function(e) {

			alert("Meeting Update Successfully !!!");
			go("./meetview.html");
		}

   	}
   	else
   	{
		//Define a sub
		var sub = {
			meettitle:meettitle,
			date:date,
			time:time,
			place:place
		}
		//Perform the add
		var request = store.add(sub);
		request.onerror = function(e) {
			go("./meet.html");
		}
		request.onsuccess = function(e) {

			alert("Meeting Add Successfully !!!");
			var msg = '<div class="alert alert-success alert-dismissable">'+
	                '<button type="button" data-dismiss="alert" aria-hidden="true" class="close">×</button>'+
	                '<h4>'+
	                '<i class="icon fa fa-check"></i>'+
	                'Meeting Add Successfully!'+
	                '</h4>'+
	                'You can view all Classes in <a href="./meetview.html">here</a> ...'+
	              '</div>';
			$("#notis").html(msg);
			clearmeet();
		}
	}

}

function meetview(e)
{
	if(!indexedDBOk) return;

	var openRequest = indexedDB.open(database,database_varsion);
	openRequest.onsuccess = function(e) {
		db = e.target.result;
		var transaction = db.transaction(["meet"],"readonly");
		var store = transaction.objectStore("meet");

		$("#notis").html("");

		var f=false;
		
		store.openCursor().onsuccess = function(e) {
			var result = e.target.result;
			if(result) {
				var value = result.value;

	   			var url = "./meet.html?meettitle=" + encodeURIComponent(value.meettitle)+
	   			"&date="+encodeURIComponent(value.date)+
	   			"&time="+encodeURIComponent(value.time)+
	   			"&place="+encodeURIComponent(value.place)+
	   			"&id="+encodeURIComponent(value.id);


				var msg = '<div class="box box-solid">'+
					'<div class="box-header with-border">'+
						'<h3 class="box-title">'+value.meettitle+'</h3>'+
						'<div class="box-tools pull-right">'+
		                    '<button onclick="go(\''+url+'\')" class="btn bg-purple btn-sm"><i class="fa fa-pencil"></i></button> '+
		                    '<button onclick="del('+value.id+',\'meet\')" data-widget="remove" class="btn bg-purple btn-sm"><i class="fa fa-trash-o"></i></button> '+
		                 '</div>'+
		            '</div>'+
	                '<div class="box-body">'+
	                  '<dl>'+
	                  	'<dt>'+value.meettitle+'</dt>'+
	                    '<dd class="text-red">'+value.date+'</dd>'+
	                    '<dt><b class="text-green">'+value.place+'</b></dt>'+
	                  '</dl>'+
	                '</div>'+
          		'</div>';

				$("#notis").append(msg);
				f=true;
				// move to the next item in the cursor
				result.continue();
			}
			else if(f!=true){
				var br = "<br />";
				$("#notis").append(br);
				var msg = '<div class="callout callout-danger">'+
	                    '<h4>You don\'t have any Meeting !!!</h4>'+
	                  '</div>';
				$("#notis").append(msg);
			}	
		}

		store.openCursor().onerror = function(e) {	
			alert("not working meeting");
		}

	}	
}