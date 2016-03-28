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


/*$.getJSON('db.json', function(data) {
	document.getElementById("json").innerHTML = JSON.stringify(data, null, 4);
})*/


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


/*var db = TAFFY();
$.getJSON('db.json', function(data) {
	
	$.each(data, function(key, value) {
		db.insert({ id: value.id,
					company_name: value.company_name,
					address: { street: value.address.street,
								city: value.address.city,
								state: value.address.state,
								zip: value.address.zip },
					low_temperature: value.low_temperature,
					high_temperature: value.high_temperature,
					timestamp: value.timestamp
		});
	});
});

db.store("mydb");

var count = db().count();
var filter = db().filter({high_temperature:{gte:1000}}).count();

document.writeln("total count: " + count);
document.writeln("count with high temp gte 1000: " + filter);*/


const MAX_RECORDS = 100000;

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
document.write("<p>Execution time: " + executionTime + "</p>");

// count total
var count = items.find().length;
document.write("<p>Total records: " + count + "</p>");

// filtered records
var filtered = items.find({'$and': [{'company_name':{'$regex': /[a-o][5-9]/i}}, {'low_temperature':{'$lt':20}}, {'high_temperature':{'$gt':120}}] });
var str = JSON.stringify(filtered);
var len = filtered.length;
document.write("<p>Filtered records count: " + len + "<br>" + str + "</p>");


