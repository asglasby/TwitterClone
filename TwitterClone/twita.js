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
            var tweets = JSON.parse(this.response);
            for (var i in tweets) {
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
        holder += "</div>";
        document.getElementById("displayTweets").innerHTML += holder;
    }



}

