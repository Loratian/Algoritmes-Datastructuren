const LOG_DETAILS = 1;
const LOG_STEPS = 2;
const LOG_ERRORS = 3;
const LOG_LEVEL = LOG_DETAILS;


// variabele index.html


/**
 * Function that onyl writes info to the console if its message exceeds the general LOG LEVEL
 * @param {*} msg 
 * @param {*} msgSeverity (one of the values LOG_DETAILS, LOG_STEPS, LOG_ERRORS)
 */

function logInfo (msg,msgSeverity) {
	if (msgSeverity >= LOG_LEVEL) {
		console.log (msg);
	}
}

/**
 * ImportMap is a function that read the content from a URL and expects JSON in return.
 * It then hands over the content to the function processMap to actually process its content
 * 
 * @param {*} fileName 
 */

function importMap (fileName) {

 	var xmlhttp = new XMLHttpRequest();
	var url = fileName;
	
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var myArr = JSON.parse(this.responseText);
			processMapInfo(myArr);
		}
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

/**
 * Reads the line information and updates the internal map structure
 * @param {*} lineData (JSON string as object)
 */
function processMapInfo (lineData) {
	var mainItem;
	var networkItem;
	var networkItemStop;
	var listOfStops = {}; // declared as associative array

	for (mainItem in lineData) {
		logInfo (mainItem,LOG_DETAILS);
		// There should be only 1 mainItem that starts with something like "GVB_"
		// We need this to access the other information

		/* First read the transportation type and its id */
		typeOfTransportation = lineData[mainItem]["Line"].TransportType;
		idOfTransportation = lineData[mainItem]["Line"].LinePublicNumber;

		for (networkItem in lineData[mainItem]["Network"]) {
			// usually there are 1 or 2 networkItems that each represent a list of network stops
			for (networkItemStop in lineData[mainItem]["Network"][networkItem]) {
				// scan all stops
				// add a stop to a list based on its order; this is described by UserStopOrderNumber
				// but only when it does not exist already
				if (!listOfStops.hasOwnProperty(lineData[mainItem]["Network"][networkItem][networkItemStop].UserStopOrderNumber)) {
					listOfStops [lineData[mainItem]["Network"][networkItem][networkItemStop].UserStopOrderNumber] = 
						lineData[mainItem]["Network"][networkItem][networkItemStop].TimingPointName;
				}
			}
		}
	}	
	logInfo (listOfStops,LOG_DETAILS);

	// listOfStops now has all the info to update your map structure :-)
}

/**
 * We need a way to check that ALL imports have finished as this is a ASYNCHRONOUS process
 * @param {*} expectedNumberOfFiles 
 */
/**function checkImport (expectedNumberOfFiles) {
	if (listOfLines.length == expectedNumberOfFiles) {
		clearTimeout ();

		// etc... all JSON files have been processed ... do your thing :-)
	}
}
*/

showAfsprakenButton.addEventListener("click", function () {
	showAfspraken();	
});




/**
 * INITIALISATION
 * Create the map of tram and metro data
 */

importMap ("https://ori.clow.nl/algds/GVB_1_1.json");
importMap ("https://ori.clow.nl/algds/GVB_2_1.json");
importMap ("https://ori.clow.nl/algds/GVB_3_1.json");
importMap ("https://ori.clow.nl/algds/GVB_4_1.json");
importMap ("https://ori.clow.nl/algds/GVB_5_1.json");
importMap ("https://ori.clow.nl/algds/GVB_7_1.json");
importMap ("https://ori.clow.nl/algds/GVB_11_1.json");
importMap ("https://ori.clow.nl/algds/GVB_12_1.json");
importMap ("https://ori.clow.nl/algds/GVB_13_1.json");
importMap ("https://ori.clow.nl/algds/GVB_14_1.json");
importMap ("https://ori.clow.nl/algds/GVB_17_1.json");
importMap ("https://ori.clow.nl/algds/GVB_19_1.json");
importMap ("https://ori.clow.nl/algds/GVB_24_1.json");
importMap ("https://ori.clow.nl/algds/GVB_26_1.json");
importMap ("https://ori.clow.nl/algds/GVB_50_1.json");
importMap ("https://ori.clow.nl/algds/GVB_51_1.json");
importMap ("https://ori.clow.nl/algds/GVB_52_1.json");
importMap ("https://ori.clow.nl/algds/GVB_53_1.json");
importMap ("https://ori.clow.nl/algds/GVB_54_1.json");


// add a short wait so we know ALL 16 lines have been processed


