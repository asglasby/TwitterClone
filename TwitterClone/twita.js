/// <reference path="index.html" />
var myApp = {};
myApp.url = "https://twita.firebaseio.com/";

myApp.profile = function (name, pic, bio) {
    this.name = name;
    this.pic = pic;
    this.bio = bio;
};

myApp.message = function (userName, text) {
    this.userName = userName;
    this.text = text;
    this.time = Date.now();
};

myApp.createMessage = function () {
    var messageText = document.getElementById("text").value;
    var message = new myApp.message(myApp.userName, messageText);
    myApp.post(message, "tweets/");
    alert(JSON.stringify(message) + " " + messageText);
}

myApp.post = function (data, url) {
    var request = new XMLHttpRequest();
    if (!url) {
        request.open("Post", myApp.url + ".json", true);
    }
    else {
        request.open("Post", myApp.url + url + ".json", true);
    }
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            console.log();
            myApp.get(url);
        } else {
            console.log(this.response);
        }
    }

    request.onerror = function () {
        console.log("ERRRRRRRR");
    }
    request.send(JSON.stringify(data));
}

myApp.get = function (url) {

    var request = new XMLHttpRequest();
    if (!url) {
        request.open("GET", myApp.url + ".json", true);
        alert("Please input the valid url");
        return undefined;
    }
    else {
        request.open("GET", myApp.url + url + ".json", true);
    }
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            console.log();
            myApp.tweets = [];
            var tweets = JSON.parse(this.response);
            for (var i in tweets) {
                tweets[i].key = i;
                myApp.tweets.push(tweets[i]);
                //we gonna need i for edit and delete 
            } myApp.writeTable(myApp.tweets);
        } else {
            console.log(this.response);
        }
    }

    request.onerror = function () {
        console.log("ERRRRRRRR");
    }
    request.send();

}

myApp.tweets = [];


myApp.userName = "Donald";
myApp.writeTable = function (array) {
    document.getElementById("displayTweets").innerHTML = "";
    for (var i in array) {
        var holder = "<div>";
        holder += "name:" + array[i].userName;
        holder += "tweet:" + array[i].text;
        holder += "timeStamp" + array[i].time;
        holder += "<span class = \"btn btn-danger fa fa-trash-o\" onclick = \"myApp.delete('"+ array[i].key +"', 'tweets/')\"></span>"; //backslash = escape character
        holder += "</div>";
        document.getElementById("displayTweets").innerHTML += holder;
    }
}
myApp.delete = function (key, url) {
    var request = new XMLHttpRequest();
    if (!url) {
        alert("Please input the valid url");
        return undefined;
    }
    else {
        request.open("DELETE", myApp.url + url + key + "/.json", true);
    }
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            console.log();
            for (var i in myApp.tweets) {
                if (myApp.tweets[i].key === key) {
                    myApp.tweets.splice(i, 1);
                }

            }
            myApp.writeTable(myApp.tweets);
        }
        else {
            console.log(this.response);
        }
    }

    request.onerror = function () {
        console.log("ERRRRRRRR");
    }
    request.send();
}
myApp.get("tweets/");
