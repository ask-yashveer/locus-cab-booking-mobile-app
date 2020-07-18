//Automatically set to 'production' when published through Expo
var env = process.env.NODE_ENV || 'development';
// var env = 'production'
var config = require('../config')[env];

const apiKey = config.googleDirectionsAPI.key

const routesNearHome = [
	{
		origin: 'Shop No 16,17,18,19, Karishma Complex, Late GA Kulkarni Path, Kothrud Industrial Area, Kothrud, Pune, Maharashtra 411017',
		destination: '6/1, Nalstop, Karve Road, Opposite Padale Palace, Erandwane, Pune, Maharashtra 411004'
	},
	{
		origin: 'S No- 32/2A, Erandwana, Gulawani Maharaj Road, Near Hotel Abhishek, Pandurang Colony, Pune, Maharashtra 411004',
		destination: 'Nalanda’, S No.39 CTS No 943, Hissa 2 /2, Opp. Gandhi Lawns Near ICICI Bank, Erandawana, Gulawani Maharaj Road, Pune, Maharashtra 411004'
	},
	{
		origin: 'Deenanath Mangeshkar Hospital Road, Near, Mhatre Bridge, Erandwane, Pune, Maharashtra 411004',
		destination: 'Shop No 16,17,18,19, Karishma Complex, Late GA Kulkarni Path, Kothrud Industrial Area, Kothrud, Pune, Maharashtra 411017'
	},
	// {
	// 	origin: '3909 Guadalupe St, Austin, TX 78751',
	// 	destination: '1000 E 41st St, Austin, TX 78751'
	// },
	// {
	// 	origin: '',
	// 	destination: ''
	// },
]


//Returns the coordinates for the each route located in the routesNearHome array
export async function getSimulatorPolylines(cb) {
	console.log('getSimulatorPolylines called ')

	const routes = formatRouteAddresses(routesNearHome)
	var polylines = []

	for (var i = 0; i < routes.length; i++)
		await getDirections(routes[i].origin, routes[i].destination, (coords) => {
			polylines.push(coords)
		})

	cb(polylines)
}

const iterateThruRoute = (routes) => {
	const nextRoutes = routes.slice(1, routes.length) //remove first elem

	if (coords.length != 0)
		this.animate(coords[0], () => { this.animateThruCoords(nextCoords) })
}

export const getDirections = (origin, destination, cb) => {
	// routes = [origin, destination]
	// formattedRoutes = formatRouteAddresses(routes)

	origin = formatAddress(origin)
	destination = formatAddress(destination)

	return fetch('https://maps.googleapis.com/maps/api/directions/json?origin=' + origin + '&destination=' + destination + '&key=' + apiKey)
		.then((res) => res.json())
		.then((resJson) => {
			console.log('origin: ', origin)
			console.log('dest: ', destination)
			var polylineCoords = null;
			// console.log('before, =null')
			if (resJson.routes.length)
				polylineCoords = decode(resJson.routes[0].overview_polyline.points)

			console.log('POLYLINE COORDS: ', polylineCoords)

			cb(polylineCoords)
		})
		.catch((err) => {
			console.error(err)
		})
}

const formatRouteAddresses = (routes) => {
	var formattedRoutes = []

	routes.forEach((route) => {
		formattedRoutes.push({ origin: formatAddress(route.origin), destination: formatAddress(route.destination) })
	})

	return formattedRoutes
}

//Replaces commas and spaces with '+' signs
export const formatAddress = (address) => {
	var formattedAddress = address.split(',').join('').split(' ').join('+')

	return formattedAddress
}

export const disneylandDirections = (cb) => {
	fetch('https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood&key=' + apiKey)
		.then((res) => res.json())
		.then((resJson) => {
			var polylineCoords = null;

			if (resJson.routes.length)
				polylineCoords = decode(resJson.routes[0].overview_polyline.points)

			cb(polylineCoords)
		})
		.catch((err) => {
			console.error(err)
		})
}

export const getExamplePolyline = (cb) => {
	const origin = 'Alankar+Police+Station'
	const destination = "SEED+Infotech+-+Nalanda"

	fetch('https://maps.googleapis.com/maps/api/directions/json?origin=' + origin + '&destination=' + destination + '&key=' + apiKey)
		.then((res) => res.json())
		.then((resJson) => {
			var polylineCoords = null;

			if (resJson.routes.length)
				polylineCoords = decode(resJson.routes[0].overview_polyline.points)

			console.log('EXAMPLE POLYLINE COORDS: ', polylineCoords)

			cb(polylineCoords)
		})
		.catch((err) => {
			console.error(err)
		})
}

//Decodes encoded polyline strings returned from the Google Directions API
//Can find source at this url: https://github.com/react-native-community/react-native-maps/issues/929#issuecomment-271365235
const decode = (t, e) => {
	for (var n, o, u = 0, l = 0, r = 0, d = [], h = 0, i = 0, a = null, c = Math.pow(10, e || 5); u < t.length;) { a = null, h = 0, i = 0; do a = t.charCodeAt(u++) - 63, i |= (31 & a) << h, h += 5; while (a >= 32); n = 1 & i ? ~(i >> 1) : i >> 1, h = i = 0; do a = t.charCodeAt(u++) - 63, i |= (31 & a) << h, h += 5; while (a >= 32); o = 1 & i ? ~(i >> 1) : i >> 1, l += n, r += o, d.push([l / c, r / c]) } return d = d.map(function (t) { return { latitude: t[0], longitude: t[1] } })
}