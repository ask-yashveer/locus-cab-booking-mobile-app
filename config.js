var config = {
	development: { //Credentials used when app is not published
	    googleDirectionsAPI: {
	    	key: 'AIzaSyAtR5cH_4HKu44JNDCNmzO0rKNpEATtJV4', //Copy paste your Google Directions API key here
	    },
	    firebase: {
	    	//Place your Firebase web credentials here
	    	apiKey: "AIzaSyBGpub40uL4oo_dY9-lrKEtM2WAQmnS9O4",
		    authDomain: "locusfirebasemaps.firebaseapp.com",
		    databaseURL: "https://locusfirebasemaps.firebaseio.com",
		    projectId: "locusfirebasemaps",
		    storageBucket: "locusfirebasemaps.appspot.com",
		    messagingSenderId: "130468863111"
	    }
	},
	production: { //Credentials used after app has been published
		googleDirectionsAPI: {
	    	key: '', //Copy paste your Google Directions API key here
		},
		firebase: {
	    	//Place your Firebase web credentials here
	    	apiKey: "",
		    authDomain: "",
		    databaseURL: "",
		    projectId: "",
		    storageBucket: "",
		    messagingSenderId: ""
		}
	},
};

module.exports = config;