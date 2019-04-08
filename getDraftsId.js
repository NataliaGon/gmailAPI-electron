var request = require('request');
const fs = require('fs');
const OBJECT = 'draftsId.json';

// function goGmail() {

  // Load client secrets from a local file.
  fs.readFile('client_secret.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Gmail API.
    authorize(JSON.parse(content), getDraftsId);
  });


  function authorize(credentials, callback) {
    const { client_secret, client_id } = credentials.web;

    let newToken = {
      method: 'POST',
      url: 'https://www.googleapis.com/oauth2/v4/token',
      headers: { 'content-type': 'application/json' },
      body: {
        grant_type: 'refresh_token',
        client_id: client_id,
        client_secret: client_secret,
        refresh_token: '1/KsW2qFZxVNhE64M8HKq6p_29kOUJ3POPDxxpM6zCWdY'
      },
      json: true
    };
    request(newToken, function (error, response, body) {
      if (error) throw new Error(error);
      console.log('my token: ' + body.access_token);
      body.access_token;
      callback(body.access_token);
    })
  }


  function getDraftsId(token) {
    var options = {
      method: 'GET',
      url: 'https://www.googleapis.com/gmail/v1/users/enotzp@gmail.com/drafts',
      headers: { authorization: 'Bearer ' + token }
    }
    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      fs.writeFile(OBJECT, JSON.stringify(response), (err) => {
        if (err) return console.error(err);
        console.log('Object stored to', OBJECT);
      });

    });
  }
// }
// export { goGmail };