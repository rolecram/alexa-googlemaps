{
    "interactionModel": {
        "languageModel": {
            "invocationName": "hotel class",
            "intents": [
                {
                    "name": "AMAZON.FallbackIntent",
                    "samples": []
                },
                {
                    "name": "AMAZON.CancelIntent",
                    "samples": [
                        "Exit"
                    ]
                },
                {
                    "name": "AMAZON.HelpIntent",
                    "samples": [
                        "What can I ask",
                        "help me",
                        "help"
                    ]
                },
                {
                    "name": "AMAZON.StopIntent",
                    "samples": []
                },
                {
                    "name": "AMAZON.NavigateHomeIntent",
                    "samples": []
                },
                {
                    "name": "MapIntent",
                    "slots": [],
                    "samples": [
                        "Back to the hotel",
                        "Go to the hotel",
                        "Show me in the map",
                        "Show me the hotel",
                        "Show the hotel"
                    ]
                },
                {
                    "name": "MapZoomIntent",
                    "slots": [
                        {
                            "name": "zoomaction",
                            "type": "mapZoom"
                        }
                    ],
                    "samples": [
                        "Zoom",
                        "Zoom {zoomaction}"
                    ]
                },
                {
                    "name": "MapMoveIntent",
                    "slots": [
                        {
                            "name": "moveaction",
                            "type": "mapMovement"
                        }
                    ],
                    "samples": [
                        "pan {moveaction}",
                        "move",
                        "move {moveaction}"
                    ]
                },
                {
                    "name": "MapRestaurantIntent",
                    "slots": [
                        {
                            "name": "cuisine",
                            "type": "cuisine"
                        }
                    ],
                    "samples": [
                        "Suggest me a {cuisine} restaurant",
                        "Suggest me a {cuisine} restaurant near the hotel",
                        "Show me a {cuisine} restaurant",
                        "Restaurants",
                        "Show me restaurants",
                        "Show me a restaurant",
                        "Show me a good restaurant",
                        "Suggest me a restaurant"
                    ]
                },
                {
                    "name": "CallIntent",
                    "slots": [
                        {
                            "name": "calling",
                            "type": "Calling"
                        }
                    ],
                    "samples": [
                        "Call {calling}"
                    ]
                },
                {
                    "name": "TVroomIntent",
                    "slots": [],
                    "samples": [
                        "T.V. room",
                        "T.V. at room"
                    ]
                },
                {
                    "name": "SuggestionsIntent",
                    "slots": [],
                    "samples": [
                        "Show me something to do",
                        "What can I do",
                        "Suggest me something to do at night",
                        "Suggest me something to do",
                        "Suggest me something"
                    ]
                },
                {
                    "name": "VideoIntent",
                    "slots": [
                        {
                            "name": "video",
                            "type": "video",
                            "samples": [
                                "Video mute"
                            ]
                        }
                    ],
                    "samples": [
                        "{video} Video",
                        "Video {video}"
                    ]
                },
                {
                    "name": "PhotoIntent",
                    "slots": [],
                    "samples": [
                        "Photo",
                        "Photos",
                        "Show Photos",
                        "Show me photos"
                    ]
                },
                {
                    "name": "ActionIntent",
                    "slots": [
                        {
                            "name": "action",
                            "type": "Action"
                        }
                    ],
                    "samples": [
                        "{action}"
                    ]
                },
                {
                    "name": "ReservationIntent",
                    "slots": [
                        {
                            "name": "date",
                            "type": "AMAZON.DATE"
                        },
                        {
                            "name": "time",
                            "type": "AMAZON.TIME"
                        },
                        {
                            "name": "number",
                            "type": "AMAZON.NUMBER",
                            "samples": [
                                "{number} peoples",
                                "{number} people",
                                "{number} persons",
                                "{number} person",
                                "{number}"
                            ]
                        }
                    ],
                    "samples": [
                        "Book {date} at {time} for {number} persons",
                        "Make a reservation {date} at {time} for {number} persons",
                        "Book for {date} at {time} for {number} persons"
                    ]
                },
                {
                    "name": "InfoIntent",
                    "slots": [
                        {
                            "name": "infoaction",
                            "type": "InfoAction"
                        }
                    ],
                    "samples": [
                        "label {infoaction}",
                        "{infoaction} Info",
                        "{infoaction} label",
                        "Info {infoaction}"
                    ]
                },
                {
                    "name": "SetHotelIntent",
                    "slots": [],
                    "samples": [
                        "Enabled Hotel",
                        "Set Hotel"
                    ]
                }
            ],
            "types": [
                {
                    "name": "mapMovement",
                    "values": [
                        {
                            "name": {
                                "value": "down"
                            }
                        },
                        {
                            "name": {
                                "value": "up"
                            }
                        },
                        {
                            "name": {
                                "value": "right"
                            }
                        },
                        {
                            "name": {
                                "value": "left"
                            }
                        }
                    ]
                },
                {
                    "name": "mapZoom",
                    "values": [
                        {
                            "name": {
                                "value": "restore"
                            }
                        },
                        {
                            "name": {
                                "value": "out"
                            }
                        },
                        {
                            "name": {
                                "value": "in"
                            }
                        }
                    ]
                },
                {
                    "name": "Calling",
                    "values": [
                        {
                            "name": {
                                "value": "reception"
                            }
                        },
                        {
                            "name": {
                                "value": "taxi"
                            }
                        }
                    ]
                },
                {
                    "name": "video",
                    "values": [
                        {
                            "name": {
                                "value": "unmute",
                                "synonyms": [
                                    "sound"
                                ]
                            }
                        },
                        {
                            "name": {
                                "value": "mute",
                                "synonyms": [
                                    "silent"
                                ]
                            }
                        },
                        {
                            "name": {
                                "value": "pause"
                            }
                        },
                        {
                            "name": {
                                "value": "play"
                            }
                        }
                    ]
                },
                {
                    "name": "Action",
                    "values": [
                        {
                            "name": {
                                "value": "escape"
                            }
                        },
                        {
                            "name": {
                                "value": "previous"
                            }
                        },
                        {
                            "name": {
                                "value": "next"
                            }
                        }
                    ]
                },
                {
                    "name": "InfoAction",
                    "values": [
                        {
                            "name": {
                                "value": "show"
                            }
                        },
                        {
                            "name": {
                                "value": "hide"
                            }
                        }
                    ]
                },
                {
                    "name": "cuisine",
                    "values": [
                        {
                            "name": {
                                "value": "chinese"
                            }
                        },
                        {
                            "name": {
                                "value": "russian"
                            }
                        },
                        {
                            "name": {
                                "value": "asiatic"
                            }
                        },
                        {
                            "name": {
                                "value": "french"
                            }
                        },
                        {
                            "name": {
                                "value": "spanish"
                            }
                        },
                        {
                            "name": {
                                "value": "italian"
                            }
                        },
                        {
                            "name": {
                                "value": "portuguese"
                            }
                        },
                        {
                            "name": {
                                "value": "german"
                            }
                        },
                        {
                            "name": {
                                "value": "regional"
                            }
                        },
                        {
                            "name": {
                                "value": "sushi"
                            }
                        },
                        {
                            "name": {
                                "value": "japanese"
                            }
                        }
                    ]
                }
            ]
        },
        "dialog": {
            "intents": [
                {
                    "name": "CallIntent",
                    "confirmationRequired": false,
                    "prompts": {},
                    "slots": [
                        {
                            "name": "calling",
                            "type": "Calling",
                            "confirmationRequired": false,
                            "elicitationRequired": true,
                            "prompts": {
                                "elicitation": "Elicit.Slot.4366429379.1194011086970"
                            }
                        }
                    ]
                },
                {
                    "name": "VideoIntent",
                    "confirmationRequired": false,
                    "prompts": {},
                    "slots": [
                        {
                            "name": "video",
                            "type": "video",
                            "confirmationRequired": false,
                            "elicitationRequired": true,
                            "prompts": {
                                "elicitation": "Elicit.Slot.1201072194124.1161787373906"
                            }
                        }
                    ]
                },
                {
                    "name": "ReservationIntent",
                    "delegationStrategy": "ALWAYS",
                    "confirmationRequired": false,
                    "prompts": {},
                    "slots": [
                        {
                            "name": "date",
                            "type": "AMAZON.DATE",
                            "confirmationRequired": false,
                            "elicitationRequired": true,
                            "prompts": {
                                "elicitation": "Elicit.Slot.1525236256136.1239771380809"
                            }
                        },
                        {
                            "name": "time",
                            "type": "AMAZON.TIME",
                            "confirmationRequired": false,
                            "elicitationRequired": true,
                            "prompts": {
                                "elicitation": "Elicit.Slot.1525236256136.1512717964185"
                            }
                        },
                        {
                            "name": "number",
                            "type": "AMAZON.NUMBER",
                            "confirmationRequired": false,
                            "elicitationRequired": true,
                            "prompts": {
                                "elicitation": "Elicit.Slot.424491150551.743220830191"
                            }
                        }
                    ]
                }
            ],
            "delegationStrategy": "ALWAYS"
        },
        "prompts": [
            {
                "id": "Elicit.Slot.4366429379.1194011086970",
                "variations": [
                    {
                        "type": "PlainText",
                        "value": "Please, specify the destination. For example, call taxi"
                    }
                ]
            },
            {
                "id": "Elicit.Slot.1201072194124.1161787373906",
                "variations": [
                    {
                        "type": "PlainText",
                        "value": "What do you want to do with the video?"
                    }
                ]
            },
            {
                "id": "Elicit.Slot.1525236256136.1239771380809",
                "variations": [
                    {
                        "type": "PlainText",
                        "value": "Please specify the date for reservation"
                    },
                    {
                        "type": "PlainText",
                        "value": "When?"
                    }
                ]
            },
            {
                "id": "Elicit.Slot.1525236256136.1512717964185",
                "variations": [
                    {
                        "type": "PlainText",
                        "value": "At what time?"
                    }
                ]
            },
            {
                "id": "Confirm.Intent.424491150551",
                "variations": [
                    {
                        "type": "PlainText",
                        "value": "Confirm a reservation for {date} at {time} for {number} people"
                    }
                ]
            },
            {
                "id": "Elicit.Slot.424491150551.743220830191",
                "variations": [
                    {
                        "type": "PlainText",
                        "value": "How many persons?"
                    },
                    {
                        "type": "PlainText",
                        "value": "How many persons are going to come?"
                    }
                ]
            }
        ]
    }
}