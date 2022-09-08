$(document).ready(function(){
	$("#MailTemplate").click(function(){
		$("#content-right").load("../html/MailTemplate.html");
	});

	$("#WebTemplate").click(function(){
		$("#content-right").load("../html/WebTemplate.html");
	});

    $("#strategy").click(function(){
		$("#content-right").load("../html/strategy1.html");
	});

    $("#EmailSend").click(function(){
		$("#content-right").load("../html/EmailSend.html");
	});

    $("#DataProcessing").click(function(){
		$("#content-right").load("../html/DataProcessing.html");
	});


	$("#Attachment").click(function(){
		$("#content-right").load("../html/Attachment.html");
	});

	$("#User").click(function(){
		$("#content-right").load("../html/User.html");
	});

});