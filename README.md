# Hemtest
## Verktyg och ramverk
Använde bara Node.js här, personligen hade jag använt ett ramverk som typ Express.js för att ha mer abstraktion men det stod inget om det i mailet så använde bara rent Node.js istället men det gick också bra.

## Installation/körning
Node.js behövs på datorn som kör det. Starta servern genom: klona mitt repository eller bara hämta filen app.js -> Navigera till foldern genom terminalen -> Skriv "node app" i terminalen för att starta servern. Servern körs på localhost och port 3000 för tillfället, länk: http://localhost:3000. Huvudsidan har bara lite simpel text, textanalysen ligger på http://localhost:3000/count. API'n kommer kommer att mäta förekomsten av ord med mellanslag/newline som delimiter. Ni kan skicka POST request med en body genom Postman eller om ni använder curl så kan ni göra följande: "curl -H "Content-type: text/plain" -X "POST" -d "Banan Äpple Katt Hund Banan
Hund Katt Hund" http://localhost:3000/count", detta borde ge er en respons med formatet
ord1: antal
ord2: antal
ord3: antal
osv
