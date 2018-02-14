// Setup
var collection = {
    "2548": {
        "album": "Slippery When Wet",
        "artist": "Bon Jovi",
        "tracks": [ 
            "Let It Rock", 
            "You Give Love a Bad Name" 
        ]
    },
    "2468": {
        "album": "1999",
        "artist": "Prince",
        "tracks": [ 
            "1999", 
            "Little Red Corvette" 
        ]
    },
    "1245": {
        "artist": "Robert Palmer",
        "tracks": [ ]
    },
    "5439": {
        "album": "ABBA Gold"
    }
};
// Keep a copy of the collection for tests
var collectionCopy = JSON.parse(JSON.stringify(collection));

function updateRecords(id, prop, value) {
    // for(var i in collectionCopy) {
    //     console.log(i);
    // }

    Object.keys(collection).map(function(objectKey, index) {
        var value = collection[objectKey].album;
        if(objectKey == id){
            collection[objectKey].artist = value;
        }
    });
  
    return collection;
}

// Alter values below to test your code
updateRecords(5439, "artist", "ABBA");



