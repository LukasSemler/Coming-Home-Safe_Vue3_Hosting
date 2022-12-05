import { WebSocketServer } from 'ws';

//WebsocketVariablen
let connections = [];

function wsServer(httpServer) {
  const wss = new WebSocketServer({ server: httpServer });

  wss.on('connection', (ws) => {
    console.log('Neuer User hat sich verbunden');

    //Verbundenen User anpassen und in Array speichern
    let email = ws._protocol;
    email = email.replace('|', '@');
    const vorhanden = connections.find(({ email: found }) => found == email);
    if (!vorhanden) connections.push({ ws, email });
    else {
      connections = connections.map((elem) => {
        if (elem.email == email) {
          return { ws, email: elem.email };
        } else {
          return { ...elem };
        }
      });
    }

    //Alle Aktiven User an alle User senden
    connections.forEach((elem) => {
      try {
        elem.ws.send(JSON.stringify({ type: 'newConnection', data: email }));
      } catch {
        console.log('FEHLER BEIM WEBSOCKET --> newConnection');
        console.log(elem);
        console.log('FEHLER BEIM WEBSOCKET --> newConnection');
      }
    });

    //Wenn der WebsocketServer Nachrichten bekommt
    ws.on('message', (data) => {
      const { daten: positionData, type, from, to } = JSON.parse(data);
      //------ALARM------
      if (type == 'setalarm') {
        connections.forEach((elem) =>
          elem.ws.send(JSON.stringify({ type: 'setalarm', data: positionData })),
        );
      } else if (type == 'useralarmstopped') {
        //An WebSocketUser senden dass Alarm beendet wird, SW kümmert sich weiteres drum --> PositonData ist in dem Fall ganzes User-Obj.
        connections.forEach((elem) => {
          try {
            elem.ws.send(JSON.stringify({ type: 'useralarmstopped', data: positionData }));
          } catch {
            console.log('FEHLER BEIM WEBSOCKET --> useralarmstopped');
            console.log(elem);
            console.log('FEHLER BEIM WEBSOCKET --> useralarmstopped');
          }
        });
      }
      //-------POSITION-TRACKING-------
      else if (type == 'sendPosition') {
        console.log('POSTITION WEITERGESANDT ', positionData.dateTime);

        connections.forEach((elem) => {
          try {
            elem.ws.send(JSON.stringify({ type: 'getPosition', data: positionData }));
          } catch {
            console.log('FEHLER BEIM WEBSOCKET --> sendPosition');
            console.log(elem);
            console.log('FEHLER BEIM WEBSOCKET --> sendPosition');
          }
        });
      }
      //-----MESSAGE------
      else if (type == 'MessageUser') {
        console.log(type);
        console.log(positionData);

        connections.forEach((elem) => {
          try {
            elem.ws.send(JSON.stringify({ type: 'MessageUser', data: positionData, from: from }));
          } catch {
            console.log('FEHLER BEIM WEBSOCKET --> MessageUser');
            console.log(elem);
            console.log('FEHLER BEIM WEBSOCKET --> MessageUser');
          }
        });
      } else if (type == 'MessageMitarbeiter') {
        connections.forEach((elem) => {
          console.log('to: ' + to);
          console.log('EMAIL', elem.email);
          console.log(elem);
          if (elem.email == to) {
            try {
              elem.ws.send(JSON.stringify({ type: 'MessageMitarbeiter', data: positionData }));
            } catch {
              console.log('FEHLER BEIM WEBSOCKET --> MessageUser');
              console.log(elem);
              console.log('FEHLER BEIM WEBSOCKET --> MessageUser');
            }
          }
        });
      }
      // ------Userabmeldung------ --> Ab da verschwindet dieser dann von der map
      else if (type == 'userabmeldung') {
        console.log(`User: ${connections.find((elem) => elem.ws == ws).email} left`);

        // den anderen Verbindeungen sagen das ein User gegangen ist
        connections.forEach((elem) => {
          try {
            elem.ws.send(
              JSON.stringify({
                type: 'userLeft',
                data: connections.find((elem) => elem.ws == ws).email,
              }),
            );
          } catch {
            console.log('FEHLER BEIM WEBSOCKET --> userabmeldung');
            console.log(elem);
            console.log('FEHLER BEIM WEBSOCKET --> userabmeldung');
          }
        });

        // User aus dem Array löschen
        connections = connections.filter((elem) => elem.ws != ws);
      }
    });
    ws.on('close', () => {
      // User aus dem Array löschen
      connections = connections.map((elem) => {
        if (elem.ws == ws) {
          return { email: elem.email };
        } else {
          return { ...elem };
        }
      });
    });
  });
}

//Testausgabe, damit man immer die Anzahl der aktiven User bekommt
setInterval(() => {
  console.log('Länge: ' + connections.length);
  console.log(connections.map(({ email }) => email));
  // console.log(connections);
}, 1000);

export default wsServer;
