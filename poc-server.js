//PoC 4 Alexa 10-feb-2020


const AWS = require('aws-sdk');

const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');
const { ExpressAdapter } = require('ask-sdk-express-adapter');
const Alexa = require('ask-sdk');
const ws = require('nodejs-websocket');
//const lgtv = require("lgtv");

AWS.config.update({region: 'us-east-1'});
const docClient = new AWS.DynamoDB.DocumentClient();

const privateKey  = fs.readFileSync('private-key.pem', 'utf8');
const certificate = fs.readFileSync('certificate.pem', 'utf8');
const credentials = {key: privateKey, cert: certificate};

const app = express();
const skillBuilder = Alexa.SkillBuilders.custom();

const httpsServer = https.createServer(credentials, app);

process.on('unhandledRejection', error => {
	// Will print "unhandledRejection err is not defined"
	console.log('unhandledRejection', error.message);
  });
  
process.on('uncaughtException', function (err) {
  console.error(err.stack);
  console.log("Node NOT Exiting...");
}); 

//const tv_ip_address = "192.168.0.5";
//const url_webserver = 'http://192.168.0.3:4000/';

//lgtv.connect(tv_ip_address, function(err, response){
//  if (err)
//	  console.log("connect TV failed:" + JSON.stringify(response));
	
//});
var hotel = null;
var guest = {name: 'Marcelo',preferences:''};
async function getGuest()
{
	var g = (await docClient.get({TableName: 'guests', Key: {'id': '1'}}).promise()).Item;
	if(g)
	{
		guest.name = g.name;
		if(g.preferences)
			guest.preferences = g.preferences;
		else
			guest.preferences = '';

		console.log(JSON.stringify(guest));
	}
}

function getHotel()
{
	var params = {
		TableName: 'places',
		ExpressionAttributeValues: {
			':xclass': 'hotel',
			':xshow' : 'enabled'
		},
		FilterExpression: 'contains(#class, :xclass) and contains(#show, :xshow)',		
		ExpressionAttributeNames:{
			"#class": "class",
			"#show" : "show"
		}
	};
	docClient.scan(params, onScan);

	function onScan(err, data) {
		if (err) {
			console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
		} else {
			hotel = data.Items[0];
			broadcast({"cmd":"setHotel","object":hotel});
		}
	}	
}
getHotel();


const wsServer = ws.createServer(function (conn) {
    console.log("New connection");
	if(hotel != null)
		conn.sendText(JSON.stringify({"cmd":"setHotel","object":hotel}));

    conn.on("text", function (message) {
		console.log(message);
		//guest = JSON.parse(message);

    });
    conn.on("close", function (code, reason) {
        console.log("Connection closed");
    });
    conn.on("error", function (errObj) {
        console.log("web socket error");
    });
}).listen(8080);

function broadcast(msg) {
	try{
		wsServer.connections.forEach(function (conn) {
			conn.sendText(JSON.stringify(msg));
		})
		return(true);
	}
	catch(err)
	{
		console.log('Broadcast Error:' + err);
		return(false);
	}
} 


const reprompt = 'Continue?';
const speakActionNotInContext = 'I can not do that at this time';

var system = {firstLaunch:true, object:null, frame:'portal'} // frame:portal | map | content
var nameFrontDesk = 'Carla';
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
		getGuest();
		console.log('launch request');
        const speakOutput = guest.name + '. ' + hotel.speak;
		broadcast({"cmd":"showHotel"});
		system.object = hotel;
		system.frame = 'map';
		if(system.firstLaunch)
		{
			system.firstLaunch = false;
			var namesFrontDesk = hotel.frontdesk.split(',');
			nameFrontDesk = namesFrontDesk[Math.floor(Math.random() * namesFrontDesk.length)];
			setTimeout(happyhour,60000);
			setTimeout(atFrontDesk, 3000);
			return handlerInput.responseBuilder
				.speak(speakOutput)
				.reprompt(reprompt)
				.getResponse();
		}
		else
			return handlerInput.responseBuilder
				.speak('Welcome back.')
				.reprompt(reprompt)
				.getResponse();
			
    }
};
const MapIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
			&& Alexa.getIntentName(handlerInput.requestEnvelope) === 'MapIntent';
    },
    handle(handlerInput) {
		console.log('Map handler');
        const speakOutput = 'Our hotel on the map';
		broadcast({"cmd":"showHotel"});
		system.object = hotel;
		system.frame = 'map';
        return handlerInput.responseBuilder
            .speak(speakOutput)
			.reprompt(reprompt)
			.withShouldEndSession(false)
            .getResponse();
    }
};
var zoom = 'zoomIn';
const MapZoomIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
			&& Alexa.getIntentName(handlerInput.requestEnvelope) === 'MapZoomIntent';
    },
    handle(handlerInput) {
		
		if(system.frame != 'map')
		{
			return handlerInput.responseBuilder
				.speak(speakActionNotInContext)
				.reprompt(reprompt)
				.withShouldEndSession(false)
				.getResponse();			
		}
		var v = handlerInput.requestEnvelope.request.intent.slots.zoomaction.value;
		console.log('zoom action=' + v); 
		if(v === 'out')
		{
			zoom = 'zoomOut';
		}
		else if (v === 'in')
		{
			zoom = 'zoomIn';
		}
		else if (v === 'restore')
		{
			zoom = 'zoomRestore';
		}
		broadcast({"cmd":zoom});
		return handlerInput.responseBuilder
		.speak('Zoom')
		.reprompt(reprompt)
		.withShouldEndSession(false)
		.getResponse();
    }
};

var move = 'mapLeft';
const MapMoveIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
			&& Alexa.getIntentName(handlerInput.requestEnvelope) === 'MapMoveIntent';
    },
    handle(handlerInput) {

		if(system.frame != 'map')
		{
			return handlerInput.responseBuilder
				.speak(speakActionNotInContext)
				.reprompt(reprompt)
				.withShouldEndSession(false)
				.getResponse();			
		}

		var v = handlerInput.requestEnvelope.request.intent.slots.moveaction.value;
		console.log('move action=' + v);
		switch(v)
		{
			case 'up':
				move = 'mapUp'; 
				break;
			case 'down': 
				move = 'mapDown'; 
				break;
			case 'left':
				move = 'mapLeft'; 
				break;
			case 'right': 
				move = 'mapRight'; 
				break;
		}
		broadcast({"cmd":move});

        return handlerInput.responseBuilder
            .speak('Move')
			.reprompt(reprompt)
			.withShouldEndSession(false)
            .getResponse();
    }
};

const MapRestaurantIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
			&& Alexa.getIntentName(handlerInput.requestEnvelope) === 'MapRestaurantIntent';
    },
    async handle(handlerInput) {
		var cuisine = handlerInput.requestEnvelope.request.intent.slots.cuisine.value;
		console.log('cuisine:' + cuisine);
		if (cuisine)
		{
			cuisine = cuisine.toLowerCase();
			var params = {
				TableName: 'places',
				ExpressionAttributeValues: {
					':id': hotel.id,
					':xclass': 'restaurant',
					':cuisine' : cuisine
				},
				KeyConditionExpression: 'id = :id',
				FilterExpression: 'contains(#class, :xclass) and contains(cuisine, :cuisine)',		
				ExpressionAttributeNames:{
					"#class": "class"
				}
			};
		} else {
			var params = {
				TableName: 'places',
				ExpressionAttributeValues: {
					':id': hotel.id,
					':xclass': 'restaurant',
				},
				KeyConditionExpression: 'id = :id',
				FilterExpression: 'contains(#class, :xclass)',		
				ExpressionAttributeNames:{
					"#class": "class"
				}
			};
		}
		let result = (await docClient.query(params).promise()).Items;
		console.log('Restaurants:' + JSON.stringify(result));
		if(result.length == 0)
			return handlerInput.responseBuilder
				.speak('I can not find a restaurant of this type. Try again')
				.reprompt(reprompt)
				.withShouldEndSession(false)
				.getResponse();

		for(var i = 0; i < result.length ;i++)
		{
			if (new RegExp(guest.preferences).test(result[i].tags)) 
				break;
		}
		var speak;
		var x = [];
		if(i < result.length)
		{
			x.push(result[i]);
			system.object = x;
			speak = result[i].speak;
		}
		else
		{
			x.push(result[0]);
			system.object = x;
			speak = result[0].speak;
		}
		system.frame = 'map';
		broadcast({"cmd":"showPlaces","object":system.object});
        return handlerInput.responseBuilder
            .speak(speak)
			.reprompt(reprompt)
			.withShouldEndSession(false)
            .getResponse();
    }
};


const SuggestionsIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
			&& Alexa.getIntentName(handlerInput.requestEnvelope) === 'SuggestionsIntent';
    },
    async handle(handlerInput) {
		
		console.log('Suggestion handler');
		var params = {
			TableName: 'places',
			ExpressionAttributeValues: {
				':id': hotel.id,
				':tags': 'todo'
			  },
			KeyConditionExpression: 'id = :id',
			FilterExpression: 'contains(tags, :tags)'
		};
		var result = (await docClient.query(params).promise()).Items;
	
		if(result.length == 0)		
			return handlerInput.responseBuilder
				.speak('Sorry, there is no suggestions at this time')
				.reprompt(reprompt)
				.withShouldEndSession(false)
				.getResponse();
		
		for(var i = 0; i < result.length ;i++)
		{
			if (new RegExp(guest.preferences).test(result[i].tags)) 
				break;
		}
		var speak;
		var x = [];
		if(i < result.length)
		{
			x.push(result[i]);
			system.object = x;
			speak = result[i].speak;
		}
		else
		{
			x.push(result[0]);
			system.object = x;
			speak = result[0].speak;
		}
		system.frame = 'map';
		broadcast({"cmd":"showPlaces","object":system.object});
		
        return handlerInput.responseBuilder
            .speak(speak)
			.reprompt(reprompt)
			.withShouldEndSession(false)
            .getResponse();
    }
};


const CallIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
			&& Alexa.getIntentName(handlerInput.requestEnvelope) === 'CallIntent';
    },
    async handle(handlerInput) {

		console.log('Call handler');
		var speakOutput = 'Calling';
		var v = handlerInput.requestEnvelope.request.intent.slots.calling.value;
		console.log('call to:' + v);
		switch(v)
		{
			case 'taxi':
				const reminderApiClient = handlerInput.serviceClientFactory.getReminderManagementServiceClient(),
					{permissions} = handlerInput.requestEnvelope.context.System.user;
				if(!permissions)
				{
					return handlerInput.responseBuilder
					.speak('You need to give permissions on Alexa Application to receive a notification when the taxi arrives')
					.withAskForPermissionsConsentCard(['alexa::alerts:reminders:skill:readwrite'])
					.getResponse()
				}
				const reminderRequest = {
					
					trigger:{
						type: 'SCHEDULED_RELATIVE',
						offsetInSeconds : '20'
					},
					alertInfo:{
						spokenInfo:{
							content: [{
								locale: 'en-US',
								text: 'Your taxi is at the hotel'
							}]
						}
					},
					pushNotification:{
						status:'ENABLED'
					}
					
				}
				try{
					await reminderApiClient.createReminder(reminderRequest);
					/*
					setTimeout(function(){ 
						lgtv.show_float("Your taxi at the hotel", function(err, response){});

					}, 15000);
					*/
				}catch(error)
				{
					console.log(`------ERROR ${error}`)
				}
				setTimeout(taxi,20000);
				speakOutput = 'At aproximatly five minutes. We will send a notification when the taxi arrives at the hotel';
				break;
			case 'reception':
				speakOutput = 'Calling to Joao at reception';
				break;
		}

        return handlerInput.responseBuilder
            .speak(speakOutput)
			.reprompt(reprompt)
			.withShouldEndSession(false)
            .getResponse();
    }
};
function taxi()
{
	broadcast({"cmd":"alert","object":"Your taxi is waiting at reception<br/>Driver: Carlos"});

}
function happyhour()
{
	broadcast({"cmd":"alert","object":"Happy Hour!!!!! at second flor<br/>My name is: " + hotel.barman + ", ask for me"});
}
function atFrontDesk()
{
	broadcast({"cmd":"alert","object":"Welcome <br/> Your super host is:<br/>" + nameFrontDesk});

}
/*
const TVroomIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
			&& Alexa.getIntentName(handlerInput.requestEnvelope) === 'TVroomIntent';
    },
    handle(handlerInput) {
		console.log('TV room handler');
        const speakOutput = 'T.V. at your room';
		
		lgtv.open_browser_at(url_webserver, function(err, response){
			if (!err)
			  console.log("open_browser_at succeeded:" + JSON.stringify(response));
			else
			  console.log("open_browser_at failed:" + JSON.stringify(response));
			
		});
		console.log('put message on TV');
		//lgtv.show_float("Happy hour in our bar on second floor!", function(err, response){});
		setTimeout(function(){ 
			lgtv.show_float("Happy hour in our bar on second floor!", function(err, response){});

		}, 20000);

        return handlerInput.responseBuilder
            .speak(speakOutput)
			.reprompt(reprompt)
			.withShouldEndSession(false)
            .getResponse();
    }
};
*/
const VideoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
			&& Alexa.getIntentName(handlerInput.requestEnvelope) === 'VideoIntent';
    },
    handle(handlerInput) {
		var v = handlerInput.requestEnvelope.request.intent.slots.video.value;
		console.log('video action=' + v);
		var cmd = 'videoPlay';
		switch(v)
		{
			case 'mute':
				cmd = 'videoMute'; 
				break;
			case 'unmute': 
				cmd = 'videoUnmute'; 
				break;
			case 'play':
				cmd = 'videoPlay'; 
				break;
			case 'pause': 
				cmd = 'videoPause'; 
				break;
		}
		broadcast({"cmd":cmd});

		return handlerInput.responseBuilder
			.speak('video')
			.reprompt(reprompt)
			.withShouldEndSession(false)
            .getResponse();
    }
};

const PhotoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
			&& Alexa.getIntentName(handlerInput.requestEnvelope) === 'PhotoIntent';
    },
    handle(handlerInput) {

		broadcast({"cmd":"showPhotos"});
		system.frame = 'content';
        return handlerInput.responseBuilder
			.speak('photo')
			.reprompt(reprompt)
			.withShouldEndSession(false)
            .getResponse();
    }
};
const ActionIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
			&& Alexa.getIntentName(handlerInput.requestEnvelope) === 'ActionIntent';
    },
    handle(handlerInput) {

		var cmd = handlerInput.requestEnvelope.request.intent.slots.action.value;
		console.log('action=' + cmd);
		
		switch(cmd)
		{
			case 'next':
				cmd = 'next';
				break;
			case 'previous': 
				cmd = 'previous';
				break;
			case 'escape':
				system.frame = 'map';
				cmd = 'escape';
				break;
			default:
				cmd = 'sorry?';
				break;
		}
		if(cmd != '')
			broadcast({"cmd":cmd});
		return handlerInput.responseBuilder
			.speak(cmd)
			.reprompt(reprompt)
			.withShouldEndSession(false)
            .getResponse();
    }
}
const SetHotelIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
			&& Alexa.getIntentName(handlerInput.requestEnvelope) === 'SetHotelIntent';
    },
    handle(handlerInput) {
		getHotel();
		broadcast({"cmd":"bye"});
		system.firstLaunch = true;
		return handlerInput.responseBuilder
			.speak('Set Hotel')
			.reprompt(reprompt)
			.withShouldEndSession(true)
            .getResponse();
    }
}

const InfoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
			&& Alexa.getIntentName(handlerInput.requestEnvelope) === 'InfoIntent';
    },
    handle(handlerInput) {

		var cmd = handlerInput.requestEnvelope.request.intent.slots.infoaction.value;
		switch(cmd)
		{
			case 'hide':
				cmd = 'hideMapInfo';
				break;
			case 'show': 
				cmd = 'showMapInfo';
				break;
			default:
				cmd = '';
				break;
		}
		if(cmd != '')
			broadcast({"cmd":cmd});
        return handlerInput.responseBuilder
			.reprompt(reprompt)
			.withShouldEndSession(false)
            .getResponse();
    }
}

const ReservationIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
			&& Alexa.getIntentName(handlerInput.requestEnvelope) === 'ReservationIntent'
    },
    handle(handlerInput) {
		//if(system.frame == 'map' && system.object && system.object.length == 1 &&  system.object[0].class == 'restaurant')
		if(system.object[0].class == 'restaurant')
		{
			broadcast({"cmd":"x-notify","name":system.object[0].name});
			return handlerInput.responseBuilder
            .speak('You will be notify when the reservation is confirmed.')
			.withShouldEndSession(false)
            .getResponse();

		}
		else
		{
			return handlerInput.responseBuilder
				.speak('You can not reserve here.')
				.withShouldEndSession(false)
				.getResponse();
		}
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Try show me a french restaurant or call a taxi';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
			.withShouldEndSession(false)
            .getResponse();
    }
};

const CancelIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent');
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak('Cancel')
			.reprompt(reprompt)
			.withShouldEndSession(false)
            .getResponse();
    }
};

const StopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            &&  (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
		broadcast({"cmd":"bye"});
		system.firstLaunch = true;
        return handlerInput.responseBuilder
            .speak('See you later')
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        //const speakOutput = 'See you later!';
/*		
		action = {entity:'map',cmd:'bye'};

		try{
			console.log(JSON.stringify(action));
			broadcast(JSON.stringify(action));
		}
		catch(error)
		{
			console.log(error);
		}
		
*/		
        return handlerInput.responseBuilder.getResponse();
    }
};
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Please try again.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
			.reprompt(reprompt)
			.withShouldEndSession(false)
            .getResponse();
    }
};

const skill = skillBuilder.addRequestHandlers(
        LaunchRequestHandler,
		MapIntentHandler,
		MapZoomIntentHandler,
		MapMoveIntentHandler,
		MapRestaurantIntentHandler,
		CallIntentHandler,
        HelpIntentHandler,
        CancelIntentHandler,
        StopIntentHandler,
		SessionEndedRequestHandler,
		SetHotelIntentHandler,
//		TVroomIntentHandler,
		SuggestionsIntentHandler,
		VideoIntentHandler,
		PhotoIntentHandler,
		ActionIntentHandler,
		InfoIntentHandler,
		ReservationIntentHandler
    )
	.addErrorHandlers(
        ErrorHandler
    )
	.withApiClient(new Alexa.DefaultApiClient())
	.create();

const adapter = new ExpressAdapter(skill, true, true);

app.post('/', adapter.getRequestHandlers());

httpsServer.listen(3000);
console.log('Listen');

//app.listen(3000);



