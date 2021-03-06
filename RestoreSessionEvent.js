"use strict";

module.exports = {
	Action: function (json, ws, sessionID, decoder, mysqlConnection) {
		var jsonReply, query;
		query = 'SELECT * FROM session WHERE sessionid = "' + decoder.write(json.sessionid) + '"';
		console.log(query);
		mysqlConnection.query(query, function (err, rows, fields) {
				if (err) {
					jsonReply = {
							event: "restoresession",
							error: "server sql error"
						};
					ws.send(JSON.stringify(jsonReply));
					throw err;
				}
				if (rows.length !== 0) {
						jsonReply = {
							event: "restoresession",
							sessionid: sessionID
						};
						ws.send(JSON.stringify(jsonReply));
				} else {
					jsonReply = {
							event: "restoresession",
							error: "sessionid not found"
						};
					ws.send(JSON.stringify(jsonReply));
				}
			});
	}
};