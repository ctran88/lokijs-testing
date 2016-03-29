/************************* PapaParse csv method ************************/
/***********************************************************************/

// create db and collection
var db = new loki('testdb');
var coll = db.addCollection('testdb');

/**
 * parse csv into json
 *
 * @method     parseMe
 * @param      {<type>}  file    { csv file }
 */
function parseMe(file) {
	Papa.parse(file, {
		header: true,
		dynamicTyping: true,
		complete: function(results) {
			document.getElementById("parse-text").innerHTML = " Finished parsing.";
			renderDataset(results.data);
		}
	});
}

/**
 * insert json into collection
 *
 * @method     renderDataset
 * @param      {<type>}  dataset  { json data }
 */
function renderDataset(dataset) {
	dataset.forEach(function(el) {



		// time does not convert correctly..time zone conversion?
		// 
		// 
		el.BeginUTC = moment(el.BeginUTC, "M/D/YYYY HH:mm");
		el.EndUTC = moment(el.EndUTC, "M/D/YYYY HH:mm");
		el.EventUTC = moment(el.EventUTC, "M/D/YYYY HH:mm");
		coll.insert(el);
	});
	document.getElementById("parse-text").innerHTML = " Database populated.";
}

/**
 * default query for total records in collection
 *
 * @method     defaultQuery
 */
function defaultQuery() {
	// start time
	var start = new Date().getTime();

	// count total
	var count = coll.find().length;
	// display count total
	var h1node = document.createElement("h1");
	var h1textnode = document.createTextNode("Total records: " + count);
	h1node.appendChild(h1textnode);
	document.getElementById("div-right").appendChild(h1node);

	// end time
	var end = new Date().getTime();
	var time = end - start;
	// display query time
	var h3node = document.createElement("h3");
	var h3textnode = document.createTextNode("Query time: " + time + "ms");
	h3node.appendChild(h3textnode);
	document.getElementById("div-right").appendChild(h3node);
}

/**
 * custom query from user input
 *
 * @method     customQuery
 * @param      {string}  query   { user input query }
 */
function customQuery(query) {
	var custom;

	// start time
	var start = new Date().getTime();

	// custom query
	custom = eval(query);

	// queried count total
	var count = eval(query + ".length");
	// display queried count total
	var h1node = document.createElement("h1");
	var h1textnode = document.createTextNode("Queried records: " + count);
	h1node.appendChild(h1textnode);
	document.getElementById("div-right").appendChild(h1node);

	// end time
	var end = new Date().getTime();
	var time = end - start;
	// display query time
	var h3node = document.createElement("h3");
	var h3textnode = document.createTextNode("Query time: " + time + "ms");
	h3node.appendChild(h3textnode);
	document.getElementById("div-right").appendChild(h3node);

	// display results in console
	if (document.getElementById("display").checked) {
		var str = JSON.stringify(custom);
		console.log(str);
	}
}

/**
 * scrolls page to bottom when new results overflow right-div
 *
 * @method     divScroll
 */
function divScroll() {
	var elem = document.getElementById("div-right");
	elem.scrollTop = elem.scrollHeight;
}

/**
 * calls appropriate functions on button click
 *
 * @method     onload
 */
window.onload=function() {
	document.getElementById("parse").addEventListener('click', function() {
		document.getElementById("parse-text").innerHTML = " Parsing...";
		parseMe(document.getElementById("myFile").files[0]);
	});

	document.getElementById("default-query").addEventListener('click', function() {
		defaultQuery();
		divScroll();
	});

	document.getElementById("query").addEventListener('click', function() {
		var query = document.getElementById("input").value;

		customQuery(query);
		divScroll();
	});
}









