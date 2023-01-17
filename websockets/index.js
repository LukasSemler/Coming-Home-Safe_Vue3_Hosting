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

    if (!connections.find(({ email: found }) => found == email))
      connections.push({ ws, email }); //Neuen User hinzufügen
    //Rausgefallenen Kunden einordnen
    else {
      connections = connections.map((connEl) =>
        connEl.email == email ? { ...connEl, ws } : connEl,
      );
    }

    //Wenn der WebsocketServer Nachrichten bekommt
    ws.on('message', (data) => {
      const { daten: positionData, type, from, to } = JSON.parse(data);
      // console.log(positionData); //*Nachricht anzeigen

      //------USERANMELDUNG-------- HIER WIRD DER USER KOMPLETT IM ARRAY ERSTELLT!
      if (type == 'useranmeldung') {
        connections = connections.map((elem) => {
          if (elem.email == positionData.email) {
            return {
              ws: elem.ws,
              email: elem.email,
              userfarbe: '#' + Math.floor(Math.random() * 16777215).toString(16),
              nachrichten: [],
              alarm: false,
              user: positionData,
              lat: null,
              lng: null,
              zuletztGesichtet: null,
            };
          } else {
            return elem;
          }
        });
      }
      //------ALARM------
      else if (type == 'setalarm') {
        //Alarm beim bestimmten User auf True setzen
        console.log('ALARM BEIM KUNDEN ', positionData.email, ' setzen!');
        connections = connections.map((connEl) =>
          connEl.email == positionData.email ? { ...connEl, alarm: true } : connEl,
        );

        //Nachricht an MitarbeiterWS senden, dass Alarm gestartet wurde
        connections.forEach(({ ws }) =>
          ws?.send(JSON.stringify({ type: 'MessageAlarmAusgeloest', daten: positionData })),
        );

        // connections.filter(() => )
      } else if (type == 'useralarmstopped') {
        //An WebSocketUser senden dass Alarm beendet wird, SW kümmert sich weiteres drum --> PositonData ist in dem Fall ganzes User-Obj.
        console.log('ALARM BEIM KUNDEN ', positionData.email, ' gestoppt!');
        connections = connections.map((connEl) =>
          connEl.email == positionData.email ? { ...connEl, alarm: false } : connEl,
        );
      }
      //-------POSITION-TRACKING-------
      else if (type == 'sendPosition') {
        //Standort dem jeweiligen User zuteilen
        connections = connections.map((connEl) =>
          positionData.user.email == connEl.email
            ? {
                ...connEl,
                lat: positionData.lat,
                lng: positionData.lng,
                zuletztGesichtet: positionData.zuletztGesichtet,
                adresse: positionData.adresse,
              }
            : connEl,
        );
      }
      //-----MESSAGE------
      else if (type == 'MessageChatFromUser') {
        //NachrichtenArray im Connection-Array abspeichenr
        connections = connections.map((connEl) =>
          connEl.email == positionData.WSUser.email
            ? { ...connEl, nachrichten: positionData.nachrichten }
            : connEl,
        );

        //Nachricht an MitarbeiterWS senden, dass neue Nachricht eingetroffen ist
        connections.forEach(({ ws }) =>
          ws?.send(JSON.stringify({ type: 'MessageNeueNachrichtVonUser', daten: positionData })),
        );
      } else if (type == 'MessageChatFromMitarbeiter') {
        //NachrichtenArray im Connection-Array abspeichenr

        connections = connections.map((connEl) =>
          connEl.email == positionData.WSUser.email
            ? { ...connEl, nachrichten: positionData.nachrichten }
            : connEl,
        );

        //Nachricht an MitarbeiterWS senden, dass neue Nachricht eingetroffen ist
        connections.forEach(({ ws }) =>
          ws?.send(
            JSON.stringify({
              type: 'MessageNeueNachrichtVonMitarbeiter',
              daten: positionData.WSUser,
            }),
          ),
        );
      }
      // ------USERABMELDUNG------ --> Ab da verschwindet dieser dann von der map
      else if (type == 'userabmeldung') {
        // User aus dem Array löschen
        try {
          connections = connections.filter((elem) => elem.ws != ws);
        } catch {
          console.log(
            'Beim löschen des Users aus dem Array ist ein Fehler aufgetreten... (vielleicht war er schon weg)',
          );
        }
      }
    });

    //Wenn ein User disconnected
    ws.on('close', () => {
      // User aus dem Array löschen
      connections = connections.map((elem) => {
        if (elem.ws == ws) {
          return {
            ws: null,
            email: elem.email,
            userfarbe: elem.userfarbe,
            nachrichten: elem.nachrichten,
            alarm: elem.alarm,
            user: elem.user,
            lat: elem.lat,
            lng: elem.lng,
            adresse: elem.adresse,
            zuletztGesichtet: elem.zuletztGesichtet,
          };
        } else {
          return elem;
        }
      });
    });
  });
}

//Testausgabe, damit man immer die Anzahl der aktiven User bekommt
setInterval(() => {
  console.log('########');
  connections.forEach((elem) => {
    console.log(elem);
    console.log('--------------------------------');
  });
  console.log('########');
}, 1000);

//ConnectionsArray an alle Senden, für Gleichmäßigkeit
setInterval(() => {
  connections.forEach(({ ws }) =>
    ws?.send(
      JSON.stringify({
        type: 'connectionsVerteilung',
        daten: connections.map(
          ({
            email,
            nachrichten,
            alarm,
            user,
            lat,
            lng,
            zuletztGesichtet,
            userfarbe,
            adresse,
          }) => ({
            email,
            nachrichten,
            alarm,
            userfarbe,
            user,
            lat,
            lng,
            zuletztGesichtet,
            adresse,
          }),
        ),
      }),
    ),
  );
}, 2000);

export default wsServer;
