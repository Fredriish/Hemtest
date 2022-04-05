const http = require('http');
const { getSystemErrorMap } = require('util');
const hostname = '127.0.0.1';
const port = 3000;

const PATHS = {
    analyzeTextPath: "/count",
};

const server = http.createServer((req, res) => { // Skapar server
    res.setHeader('Content-Type', 'text/plain');
});
server.on('request', (req, res) =>{ // Hanterar alla requests här
    let requestBody = [];
    req.on('error', (err) => {
        console.log(err.stack);
    });

    // Hanterar olika endpoints
    if(req.url == "/"){
        let responseString = "Welcome to my webserver! Here is a list of the current endpoints:\n";
        for(const [key, value] of Object.entries(PATHS)){
            responseString = responseString + value + "\n";
        }
        res.end(responseString);
    }
    else if(req.url == PATHS.analyzeTextPath){ // Huvudsakliga endpointet
        if(req.method == "POST"){
            req.on('data', (data) => {
                requestBody.push(data);
            });
            req.on('end', () => {
                let objArray = getStringOccurence(Buffer.concat(requestBody).toString());
                let responseString = "";
            
                objArray.forEach((obj) => {
                    responseString = responseString.concat(obj.string, ": ", obj.count, "\n");
                });
                res.statusCode = 200;
                res.end(responseString);
            }) 
        }
        else{
            res.statusCode = 400;
            res.end("The request should be of type POST.");
        }
    }
    else{
        res.statusCode = 404;
        res.end("This webserver has no such endpoint.");
    }
   
});
server.listen(port, hostname, () => {
    console.log(`Server is running on: http://${hostname}:${port}/`);
});

// Tar in en string som innehåller en massa ord, separerade med mellanslag eller newline. Returnerar en array som innehåller objekt på formen: {count: int, string: string}
function getStringOccurence(allStrings){
    let occurenceArray = []; // I arrayen kommer statistik sparas
    let stringArray = allStrings.split(/\r\n|\r|\n| /); // Använder både line breaks och space som delimiter
    stringArray = stringArray.filter(element => element != ""); // Upprepade space leder till tomma element så jag tar bort dessa tomma element här
    
    // Loopar igenom string arrayen, notera att variabeln ej blir adderad, inre loopen kommer leda till att denna loop avslutas
    for(let i = 0; i < stringArray.length;){
        let searchString = stringArray[i].toLowerCase(); // Ordet som söks detta loop "varv"
        let hits = 0; // Antal träffar för ordet
        for(let x = i; x < stringArray.length; x++){ 
            if(searchString == stringArray[x].toLowerCase()){ // Båda jämförs i lowecase
                stringArray.splice(x, 1); // Varje gång ett matchande element hittas så tas det bort ur arrayen
                x-- // Backar tillbaks loopen
                hits++;
            }
        }
        searchString = searchString.charAt(0).toUpperCase() + searchString.slice(1); // Gör så att det börjar med stor bokstav

        // Skapar objekt som innehåller sökord och antal träffar, pushar det till arrayen
        occurenceArray.push({
            count: hits,
            string: searchString
        });
    }
    occurenceArray.sort((a, b) => { // Sorterar arrayen
        return b.count - a.count;
    });
    occurenceArray = occurenceArray.slice(0, 10); // Bara top 10
    return occurenceArray; 
}
