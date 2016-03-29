/************************* $.getJSON method ************************/
/******************************************************************/
 /*function loadFileJSON(toLocalStorage, fromUrl){
    if (localStorage[toLocalStorage])
            { console.log("Good! Data already loaded locally! Nothing to do!");  }
    else {
        $.getJSON(fromUrl, function(data) { 
            localStorage[toLocalStorage] = JSON.stringify(data);
            console.log("Damn! Data not yet loaded locally! Ok: I am loading it!");
        });
      }
    }
// Function's firing:
loadFileJSON( 'myData','db.json'); */



/************************* $.getJSON method ************************/
/******************************************************************/
/*$.getJSON('db.json', function(data) {
	document.getElementById("json").innerHTML = JSON.stringify(data, null, 4);
})*/



/************************* $.getJSON and push to array ************/
/******************************************************************/
/*$.getJSON('db.json', function(data) {
	var items = [];
	$.each(data, function(key, value) {
		items.push("<li>key: " + key + ", " + "val: " + value.id + "</li><br>")
	});

	$("<ul/>", {
		"class": "my-new-list",
		html: items.join("")
	}).appendTo("body");
});*/



/************************* for loop method ************************/
/******************************************************************/
/*const MAX_RECORDS = 100000;

function randomString(length, chars) {
	var result = '';
	for (var i = length; i > 0; --i) {
		result += chars[Math.round(Math.random() * (chars.length - 1))];
	}

	return result;
}

function createDB(items) {
	var start = new Date().getTime();

	for (var i = 1; i < (MAX_RECORDS + 1); i++) {
		var lowtemp = Math.floor((Math.random() * 30) + 1),
			hightemp = Math.floor((Math.random() * 200) + 1),
			zip = Math.floor((Math.random() * 99999) + 1),
			date = new Date().toUTCString();

		items.insert(
			{
				id:i,
				company_id:randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				company_name:"company " + randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				address: {
					street:i + " main st",
					city:"city" + randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
					state:randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
					zip:i + 1
				},
				low_temperature:lowtemp,
				high_temperature:hightemp,
				timestamp:date
			}
		);
	}

	var end = new Date().getTime();
	var time = end - start;
	return time;
}

// create db
var db = new loki('testdb');
var items = db.addCollection('testdb');
var executionTime = createDB(items);
console.log("<p>Execution time: " + executionTime + "</p>");

// count total
var count = items.find().length;
console.log("<p>Total records: " + count + "</p>");

// filtered records
var filtered = items.find({'$and': [{'company_name':{'$regex': /[a-o][5-9]/i}}, {'low_temperature':{'$lt':20}}, {'high_temperature':{'$gt':120}}] });
var str = JSON.stringify(filtered);
var len = filtered.length;
console.log("<p>Filtered records count: " + len + "</p>");
//console.log("<p>" + str + "</p>");*/



/************************* PapaParse csv method ************************/
/***********************************************************************/
var db = new loki('testdb');
var coll = db.addCollection('testdb');

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

function renderDataset(dataset) {
	dataset.forEach(function(el) {
		coll.insert(el);
	});
}

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

function divScroll() {
	var elem = document.getElementById("div-right");
	elem.scrollTop = elem.scrollHeight;
}

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









