var path = require("path");

var friends = require("../data/friends");

module.exports = function (app) {
    app.get("api/friends", function (require, result) {
        result.json(friends);
    });

    app.post("api/friends", function (require, result) {
        var userInput = require.body;

        for (var i = 0; i < userInput.scores.length; i++) {
            userInput.scores[i] = parseInt(userInput.scores[i]);
        }

        var friendIndex = 0;
        var minDiff = 1000;

        //Start with zero difference and compare scores, add that difference to the totalDiff
        for (var i = 0; friends.length; i++) {
            var totalDiff = 0;
            for (var j = 0; j < friends[i].scores.length; j++) {
                var difference = Math.abs(userInput.scores[j] - friends[i].scores[j]);
                totalDiff += difference;
            }

            if (totalDiff < minDiff) {
                friendIndex = i;
                minDiff = totalDiff;
            }
        }

        friends.push(userInput);

        res.json(friends[friendIndex]);

    });
}