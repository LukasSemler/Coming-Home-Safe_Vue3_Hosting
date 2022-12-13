import { WebSocketServer } from 'ws';
import colors from 'colors';

//WebsocketVariablen
let connections = [];
let counter = 0;

function wsServer(httpServer) {
  const wss = new WebSocketServer({ server: httpServer });

  wss.on('connection', (ws) => {
    console.log('Neuer User hat sich verbunden');

    //Verbundenen User anpassen und in Array speichern
    let email = ws._protocol;
    email = email.replace('|', '@');
    if (!connections.find(({ email: found }) => found == email)) connections.push({ ws, email });
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
      } catch (err) {
        console.log(elem);
        console.log('FEHLER BEIM WEBSOCKET --> newConnection');
        console.log(err);
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
            // console.log('FEHLER BEIM WEBSOCKET --> useralarmstopped');
            // console.log(elem);
            // console.log('FEHLER BEIM WEBSOCKET --> useralarmstopped');
          }
        });
      }
      //-------POSITION-TRACKING-------
      else if (type == 'sendPosition') {
        console.log(
          'POSTITION BEKOMMEN WS',
          positionData.user.vorname,
          ' ',
          positionData.user.nachname,
        );

        connections.forEach((elem) => {
          if (elem.ws) {
            elem.ws.send(JSON.stringify({ type: 'getPosition', data: positionData }));
          } else {
            // console.log('Kein WS beim dem Kunden im Connection-Array');
          }
        });
      }
      //-----MESSAGE------
      else if (type == 'MessageUser') {
        //! NEU
        console.log('MESSAGE FROM USER'.bgCyan);
        console.log(type);
        console.log(positionData);
        connections.forEach((elem) => {
          try {
            elem.ws.send(
              JSON.stringify({
                type: 'MessageUser',
                data: positionData,
                from: positionData.fromEmail,
              }),
            );
          } catch {
            console.log('FEHLER BEIM WEBSOCKET --> MessageUser');
            console.log(elem);
            console.log('FEHLER BEIM WEBSOCKET --> MessageUser');
          }
        });
      } else if (type == 'MessageMitarbeiter') {
        connections.forEach((elem) => {
          console.log('MESSAGE MITARBEITER'.bgGreen);
          console.log(positionData);
          // console.log('to: ' + to);
          // console.log('EMAIL', elem.email);
          console.log(elem);
          if (elem.email == positionData[positionData.length - 1].to) {
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
        // console.log(`User: ${connections.find((elem) => elem.ws == ws).email} left`);

        // den anderen Verbindeungen sagen das ein User gegangen ist
        // connections.forEach((elem) => {
        //   try {
        //     elem.ws.send(
        //       JSON.stringify({
        //         type: 'userLeft',
        //         data: connections.find((elem) => elem.ws == ws).email,
        //       }),
        //     );
        //   } catch {
        //     console.log('FEHLER BEIM WEBSOCKET --> userabmeldung');
        //     console.log(elem);
        //     console.log('FEHLER BEIM WEBSOCKET --> userabmeldung');
        //   }
        // });

        // User aus dem Array löschen
        try {
          connections = connections.filter((elem) => elem.ws != ws);
        } catch {
          console.log(
            'Beim löschen des Users aus dem Array ist ein Fehler aufgetreten... (vielleicht war er schon weg)',
          );
        }
      }

      //TODO LÖSCHEN
      else if (type == 'IamAlive') {
        counter += 1;
        connections.forEach((elem) => {
          if (elem.ws) {
            elem.ws.send(JSON.stringify({ type: 'hello world', data: `Hello World: ${counter}` }));
          }
        });
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
  // console.log('Länge: ' + connections.length);
  console.log('------');
  connections.forEach(({ ws, email }) =>
    console.log(ws ? email + ' ws aktiv' : email + 'ws nicht aktiv'),
  );
  console.log('------');
}, 1000);

export default wsServer;
