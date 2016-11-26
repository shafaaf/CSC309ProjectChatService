$(document).ready(function(){

	function resetCursor(txtElement) { 
    if (txtElement.setSelectionRange) { 
        txtElement.focus(); 
        txtElement.setSelectionRange(0, 0); 
    } else if (txtElement.createTextRange) { 
        var range = txtElement.createTextRange();  
        range.moveStart('character', 0); 
        range.select(); 
    } 
}


	//By default calls to URL that served the page
	var socket = io();
	console.log("Hi guys");

	//Need socket to listen from server

	//Typing something in text area
	document.getElementById("textarea_message").addEventListener("keydown", function(event){
		console.log("Typing something");

		//Only send when user presses enter key with no shift key
		if(event.which === 13 && event.shiftKey === false)
		{	console.log("Sending message");
			
			//Getting name and message fields
			var name = $( ".chat-name" ).val();
			var message = $( "#textarea_message").val();


			//send user name and chat message
			socket.emit("input", {name:name, message:message});

			$( "#textarea_message").val('');

			//Prevent default behavior of enter button
			event.preventDefault();
		}
	});	

	//Listening for messages from server
	socket.on('output',function(data){
		if(data.length)
		{
			for(var x = 0;x<data.length;x++)
			{
				var message = document.createElement("div");
				message.setAttribute('class','my_message');
				message.textContent = data[x].name + ": " +data[x].message;
				//messages.appendChild(message);
				$('.chat-messages').append(message);
				
				/*If want new message to appear at top put this in*/
				//messages.insertBefore(message, messages.firstChild);
			}
		}
	});


});

