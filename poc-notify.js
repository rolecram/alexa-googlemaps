// Alexa Proactive API sample script
const wsUri = "ws://192.168.0.3:8080";

const https = require('https');
const mode = 'dev'; // dev or 'prod'
const ws = require('nodejs-websocket');


const clientID = `client id`;

const clientSecret = `client secret`;

let userId1 = `user id`;


process.on('uncaughtException', function (err) {
  console.error(err.stack);
  console.log("Node NOT Exiting...");
}); 

var conn;
function initWebsocketClient()
{
	conn = ws.connect(wsUri);
	//console.log(conn);

	conn.on('text', function(message){
		console.log('text:' + message);
		
		var action = JSON.parse(JSON.parse(message));
		console.log('JSON entity:' + action.entity);
		if(action.entity == 'x-notify' && action.cmd == 'confirm')
		{
			console.log('notify');
			notify(userId1, 'ORDER', 3);
		}
	}
	);
	conn.on('close', function(code,reason){
		console.log('close connecction code:' + code + 'reason:' + reason);
		console.log('reconnect...');
		initWebsocketClient();
	}
	);
	conn.on('error', function(err){
		console.log('error' + err);
	}
	);
	conn.on('connect', function(conn){
		console.log('connected');
	}
	);
}
initWebsocketClient();
/*
ws.connect(wsUri,'',function (conn) {
	
	conn.on("text", function (message) {
		console.log('text:' + text);
    });
    conn.on("close", function (code, reason) {
        console.log("Connection closed");
    });
    conn.on("error", function (errObj) {
        console.log("Error");
    });

	
});
*/

//notify(userId1, 'ORDER', 3); // order shipped, arrives in 3 days
//notify(userId1, 'RESERVATION'); // Restaurant reservation


async function notify(userId, eventType, message) {
    const token = await getToken();
    const status = await sendEvent(eventType, token, userId, message);

    return status;
}

function getProactiveOptions(token, postLength){

    return {
        hostname: 'api.amazonalexa.com',  // api.eu.amazonalexa.com (Europe) api.fe.amazonalexa.com (Far East)
        port: 443,
        path: '/v1/proactiveEvents/' + (mode && mode === 'prod' ? '' : 'stages/development'),  // mode: global var
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': postLength,
            'Authorization' : 'Bearer ' + token
        }
    };
}

function getProactivePostData(eventType, userId, message) {
    // console.log(`routing ${eventType} ${message}`);
    switch (eventType) {
        case "ORDER":
            return getOrderStatusEvent(userId, message);
        // case "MEDIA":
        //     return getMediaEvent(message);
        // case "SPORTS":
        //     return getSportsEvent(userId, message);

        default:
            return getOrderStatusEvent(userId);
    }
}

function getOrderStatusEvent(userId, message) {

    let timestamp = new Date();
    let expiryTime = new Date();
    let arrivalDate = new Date();
	let reservation = new Date();
	
	reservation.setHours(22,0,0,0);

    arrivalDate.setTime( arrivalDate.getTime() + message * 86400000 );

    arrivalDate.setHours(0,0,0,0);

    expiryTime.setMinutes(expiryTime.getMinutes() + 120);

    let referenceId = "SampleReferenceId" + new Date().getTime();  // cross reference to records in your existing systems

/*

    const eventJson = {

        "timestamp": timestamp.toISOString(),
        "referenceId": referenceId,
        "expiryTime": expiryTime.toISOString(),
        "event": {
            "name": "AMAZON.OrderStatus.Updated",
            "payload": {
                "state": {
                    "status": "ORDER_SHIPPED",
                    "deliveryDetails": {
                        "expectedArrival": arrivalDate.toISOString() // "2018-12-14T23:32:00.463Z"
                    }
                },
                "order": {
                    "seller": {
                        "name": "localizedattribute:sellerName"
                    }
                }
            }
        },
        "localizedAttributes": [
            {
                "locale": "en-US",
                "sellerName": "Delivery Owl"
            },
            {
                "locale": "en-GB",
                "sellerName": "Delivery Owl UK"
            }
        ],
        "relevantAudience": {

            "type": "Unicast",
            "payload": {
                "user": userId
            }
        }
    };
*/
	const eventJson = {
		
        "timestamp": timestamp.toISOString(),
        "referenceId": referenceId,
        "expiryTime": expiryTime.toISOString(),
		
		"event": {
			"name": "AMAZON.Occasion.Updated",
			"payload": {
				"state": {
					"confirmationStatus": "CONFIRMED"
				},
			  "occasion": {
				"occasionType": "RESERVATION",
				"subject": "localizedattribute:subject",
				"provider": {
				  "name": "localizedattribute:providerName"
				},
				"bookingTime": reservation.toISOString(),
				"broker": {
				  "name": "localizedattribute:brokerName"
				}
			  }
			}
		},
		"localizedAttributes": [
			{
			  "locale": "en-US",
			  "subject": "Reservation",
			  "providerName": "Mee Restaurant",
			  "brokerName": "Mee Restaurant"
			}
		],
		"relevantAudience": {

			"type": "Unicast",
			"payload": {
				"user": userId
			}
		}		
	};
/*	

	const eventJson = {
		
		"timestamp": timestamp.toISOString(),
		"referenceId": referenceId,
		"expiryTime": expiryTime.toISOString(),

		  "event": {
			"name": "AMAZON.WeatherAlert.Activated",
			"payload": {
			  "weatherAlert": {
				"source": "localizedattribute:source",
				"alertType": "TORNADO"
			  }
			}
		  },
		  "localizedAttributes": [
			{
			  "locale": "en-US",
			  "source": "Example Weather Corp"
			}
		  ],
		"relevantAudience": {

			"type": "Unicast",
			"payload": {
				"user": userId
			}
		}
		  
	};
*/	
	//console.log(JSON.stringify(eventJson));
	return(eventJson);
}

// ----------------------------------------------------------------------------

function getTokenOptions(postLength){
    // const TokenPostData = getTokenPostData();
    return {
        hostname: 'api.amazon.com',
        port: 443,
        path: '/auth/O2/token',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postLength // TokenPostData.length
        }
    }
}
function getTokenPostData() {

    return 'grant_type=client_credentials&client_id=' + clientID + '&client_secret=' + clientSecret + '&scope=alexa::proactive_events';
}
// const TokenPostData  = 'grant_type=client_credentials&client_id=amzn1.application-oa2-client.45690dc26b6848419d11e3c3e51c4c76&client_secret=5571d04619803b123fc305f0b2a8b3ac4f91504f512c2faed7165ca54356aaff&scope=alexa::proactive_events';

function getToken() {
    return new Promise(resolve => {
        const TokenPostData = getTokenPostData();
        const req = https.request(getTokenOptions(TokenPostData.length), (res) => {
            res.setEncoding('utf8');
            let returnData = '';

            res.on('data', (chunk) => { returnData += chunk; });

            res.on('end', () => {
                const tokenRequestId = res.headers['x-amzn-requestid'];
                // console.log(`Token requestId: ${tokenRequestId}`);
                resolve(JSON.parse(returnData).access_token);
            });
        });
        req.write(TokenPostData);
        req.end();

    });
}

// ----------------------------------------------------------------------------

function sendEvent(eventType, token, userId, message) {
    return new Promise(resolve => {

        const ProactivePostData = JSON.stringify(getProactivePostData(eventType, userId, message));
        //console.log(`\nProactivePostData\n${JSON.stringify(JSON.parse(ProactivePostData), null, 2)}\n-----------`);

        const ProactiveOptions = getProactiveOptions(token, ProactivePostData.length);
        //console.log(`ProactiveOptions\n${JSON.stringify(ProactiveOptions, null, 2)}`);

        const req = https.request(ProactiveOptions, (res) => {
            res.setEncoding('utf8');

            if ([200, 202].includes(res.statusCode)) {
                // console.log('successfully sent event');
                console.log(`requestId: ${res.headers['x-amzn-requestid']}`);

            } else {
                console.log(`Error https response: ${res.statusCode}`);
                //console.log(`requestId: ${res.headers['x-amzn-requestid']}`);
				//console.log("headers: ", res.headers);

                if ([403].includes(res.statusCode)) {
                    console.log(`userId ${userId}\nmay not have subscribed to this event.`)
                }
            }


            let returnData;
            res.on('data', (chunk) => { returnData += chunk; });
            res.on('end', () => {
                console.log(`return headers: ${JSON.stringify(res.headers, null, 2)}`);
				console.log('data:' + returnData);

                resolve(`sent event ${eventType}`);
            });
        });
        req.write(ProactivePostData);
        req.end();

    });

}