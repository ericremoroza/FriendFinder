var friends = require("../data/friends.js");

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        
        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };

        console.log(req.body);

        // Parse the result of user's survey POST
        var userData = req.body;
        var userScores = userData.scores;

        console.log(userScores);

        // Calculates difference between user's scores and scores of each user in database
        var totalDifference;

        // Loop all friend possibilities in database
        for (var i = 0; i <friends.length; i++) {
            var currentFriend = friends[i];
            totalDifference = 0;

            console.log(currentFriend.name);

            // Next, loop friend scores
            for (var j = 0; j < currentFriend.scores.length; j++) {
                // Calculate difference between scores and sum that into the total difference
                var currentFriendScore = currentFriend.scores[j];
                var currentUserScore = userScores[j];
                totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));

                // If the sum of the differences < differences of current "best match"
                if (totalDifference <= bestMatch.friendDifference) {

                    // Reset bestMatch to be new friend
                    bestMatch.name = friends[i].name;
                    bestMatch.photo = friends[i].photo;
                    bestMatch.friendDifference = totalDifference;
                }
            }
        }
        friends.push(userData);
        res.json(bestMatch);
    });
}

