
var hotel ={
	lat:-22.964144, 
	lng:-43.173313,
	name: 'Hilton Hotel',
	address:'Av. Atlântica, 1020 Copacabana - RJ - 22010-000',
	phone:'+55 21 3501-8000',
	zoom:15,
	photo:'images/hotel-onmap.jpg',
	photos:[
		'https://foto.hrsstatic.com/fotos/0/3/1090/700/80/000000/http%3A%2F%2Ffoto-origin.hrsstatic.com%2Ffoto%2F0%2F0%2F0%2F6%2F000671%2F000671_a_24301891.jpg/FqPYJzDPRLqyxgtDbjS65g%3D%3D/1000,1500/6/Hilton_Rio_de_Janeiro_Copacabana-Rio_de_Janeiro-Aussenansicht-15-671.jpg',
		'https://www.hiltonhotels.com/assets/img/Hotel%20Images/Hilton/R/RIOCCHH/RIOCCHH_Rooms_panel_kingbed.jpg',
		'images/hotel-1.jpg',
		'images/hotel-2.jpg',
		'images/hotel-3.jpg'
	],
	videos:['ZdmDu7ZLy70','zvsk50amhwM']
}
const xplace =[
	{
		name:'Restaurant: Olympe',
		lat: -22.961196, 
		lng: -43.2088347,
		zoom: 16,
		description:'Restaurant offers creations & tastings from acclaimed French chefs Claude & Thomas Troisgros.',
		phone:'+55 21 2537-8582',
		address:'Rua Custódio Serrão, 62 - Lagoa - RJ - 22470 - 230<br/>',
		travel:'DRIVING',
		photo:'images/olympe-onmap.jpg',
		photos:[
			'images/olympe-1.jpg',
			'images/olympe-2.jpg',
			'images/olympe-3.jpg',
			'images/olympe-4.jpg'
		],
		videos:[]
    }    
]
const xplaces = [
	{
		name:'Restaurant: Mee',
		lat: -22.967375, 
		lng: -43.17922,
		zoom: 16,
		description:'Pair exotic specialty dishes, created by chef Itamar Araujo, with one of twenty five imported sakes. And in the glow of our ambient interior, lose yourself in the fines pan asian cousine.',
		phone:'+55 21 2548-7070',
		address: 'Av. Atlântica, 1702 - Copacabana - RJ - 22010 - 001',
		travel:'WALKING',
		photo:'images/mee-onmap.jpg',
		photos:[
			'images/mee-1.jpg',
			'images/mee-2.jpg',
			'images/mee-3.jpg'
		],
		videos:[]
	},
	{
		name:'Restaurant: Olympe',
		lat: -22.961196, 
		lng: -43.2088347,
		zoom: 16,
		description:'Restaurant offers creations & tastings from acclaimed French chefs Claude & Thomas Troisgros.',
		phone:'+55 21 2537-8582',
		address:'Rua Custódio Serrão, 62 - Lagoa - RJ - 22470 - 230<br/>',
		travel:'DRIVING',
		photo:'images/olympe-onmap.jpg',
		photos:[
			'images/olympe-1.jpg',
			'images/olympe-2.jpg',
			'images/olympe-3.jpg',
			'images/olympe-4.jpg'
		],
		videos:[]
    },
	{
		name:'The library at night',
		lat:-22.972778,
		lng:-43.187391,
		address: 'Rua Domingos Ferreira 160 - Copacabana - Rio de Janeiro',
		phone: '+55 21 3747-5592',
		description: 'Visit the worlds greatest libraries in virtual reality at a cultural center. One hour of duration. Begin at eight p.m.',
		travel:'WALKING',
		zoom:16,
		photo: 'images/biblio-onmap.jpg',
		photos:[
			'images/biblio-1.jpg',
			'images/biblio-2.jpg',
			'images/biblio-3.jpg'
		],
		videos:['zvsk50amhwM']
	}    

];


const restaurants = {
	asiatic:
	{
		name:'Restaurant: Mee',
		lat: -22.967375, 
		lng: -43.17922,
		zoom: 16,
		description:'Pair exotic specialty dishes, created by chef Itamar Araujo, with one of twenty five imported sakes. And in the glow of our ambient interior, lose yourself in the fines pan asian cousine.',
		phone:'+55 21 2548-7070',
		address: 'Av. Atlântica, 1702 - Copacabana - RJ - 22010 - 001',
		travel:'WALKING',
		photo:'images/mee-onmap.jpg',
		photos:[
			'images/mee-1.jpg',
			'images/mee-2.jpg',
			'images/mee-3.jpg'
		],
		videos:[]
	},
	french:
	{
		name:'Restaurant: Olympe',
		lat: -22.961196, 
		lng: -43.2088347,
		zoom: 16,
		description:'Restaurant offers creations & tastings from acclaimed French chefs Claude & Thomas Troisgros.',
		phone:'+55 21 2537-8582',
		address:'Rua Custódio Serrão, 62 - Lagoa - RJ - 22470 - 230<br/>',
		travel:'DRIVING',
		photo:'images/olympe-onmap.jpg',
		photos:[
			'images/olympe-1.jpg',
			'images/olympe-2.jpg',
			'images/olympe-3.jpg',
			'images/olympe-4.jpg'
		],
		videos:[]
	}

}

const suggestions = {

	library:
	{
		name:'The library at night',
		lat:-22.972778,
		lng:-43.187391,
		address: 'Rua Domingos Ferreira 160 - Copacabana - Rio de Janeiro',
		phone: '+55 21 3747-5592',
		description: 'Visit the worlds greatest libraries in virtual reality at a cultural center. One hour of duration. Begin at eight p.m.',
		travel:'WALKING',
		zoom:16,
		photo: 'images/biblio-onmap.jpg',
		photos:[
			'images/biblio-1.jpg',
			'images/biblio-2.jpg',
			'images/biblio-3.jpg'
		],
		videos:['zvsk50amhwM']
	}
}

const dynamoDB = [

    {
        "address": "Av. Atlântica, 1702 - Copacabana - RJ - 22010-001",
        "class": "restaurant",
        "cousine": "asiatic asian",
        "id": "br.rj",
        "lat": -22.967375,
        "lng": -43.17922,
        "name": "Mee",
        "phone": "+55 21 2548-7070",
        "photo": "images/mee-onmap.jpg",
        "photos": [
          {
            "text": "Interior",
            "url": "images/mee-1.jpg"
          },
          {
            "text": "Interior",
            "url": "images/mee-2.jpg"
          },
          {
            "text": "Interior",
            "url": "images/mee-3.jpg"
          }
        ],
        "speak": "Pair exotic specialty dishes, created by chef Itamar Araujo, with one of twenty five imported sakes. And in the glow of our ambient interior, lose yourself in the fines pan asian cousine.",
        "tags": "restaurant",
        "text": "Lose yourself in the fines pan asian cousine.",
        "travel": "WALKING",
        "videos": [
      
        ],
        "zoom": 16
      },
      {
        "address": "Rua Custódio Serrão, 62 - Lagoa - RJ",
        "class": "restaurant",
        "cousine": "french",
        "id": "br.rj",
        "lat": -22.961196,
        "lng": -43.2088347,
        "name": "Olympe",
        "phone": "+55 21 2537-8582",
        "photo": "images/olympe-onmap.jpg",
        "photos": [
          {
            "text": "Interior",
            "url": "images/olympe-1.jpg"
          },
          {
            "text": "Interior",
            "url": "images/olympe-2.jpg"
          },
          {
            "text": "Interior",
            "url": "images/olympe-3.jpg"
          },
          {
            "text": "Interior",
            "url": "images/olympe-4.jpg"
          }
        ],
        "speak": "Restaurant offers creations and tastings from acclaimed French chefs Claude and Thomas Troisgros.",
        "tags": "restaurant",
        "text": "French chefs Claude and Thomas Troisgros.",
        "travel": "DRIVING",
        "videos": [
      
        ],
        "zoom": 16
      },
      {
        "address": "Rua Domingos Ferreira 160 - Copacabana - Rio de Janeiro",
        "class": "cultural",
        "id": "br.rj",
        "lat": -22.972778,
        "lng": -43.187391,
        "name": "The library at night",
        "phone": "+55 21 3747-5592",
        "photo": "images/biblio-onmap.jpg",
        "photos": [
          {
            "text": "Interior",
            "url": "images/biblio-1.jpg"
          },
          {
            "text": "Interior",
            "url": "images/biblio-2.jpg"
          },
          {
            "text": "Interior",
            "url": "images/biblio-3.jpg"
          }
        ],
        "speak": "Visit the worlds greatest libraries in virtual reality at a cultural center. One hour of duration. Begin at eight p.m.",
        "tags": "library books  cultural",
        "text": "Visit the worlds greatest libraries in virtual reality",
        "travel": "WALKING",
        "videos": [
          {
            "id": "zvsk50amhwM"
          }
        ],
        "zoom": 16
      }      



]



