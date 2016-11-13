
//Returns a random integer between two given values
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var dns = require ( 'dns' );


function checkAvailable( url ) {
  //Using the core modules to run an IPv4 resolver that returns 'err' on error
  dns.resolve4( url, function (err, addresses) {

    if (err) {
        //Ignoring timeouts and refuses
        if (err.code.includes("ETIMEOUT") || err.code.includes("ECONNREFUSED")) {
            (function(){
                //Retrying after random time
                setTimeout(function(){
                    checkAvailable(err.hostname)
                },getRandomInt(0,1000));
            }())

        } else {
            console.log (err.hostname + " could be available : " + err)
        };
    }
})
}


//Reads trough the file line by line
var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('file.txt')
});

lineReader.on('line', function (line) {
  
  //Checks word in line
  if (!line.includes("'")) checkAvailable( line + ".com")
});       
