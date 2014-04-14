

/// <reference path="index.html" />
var myApp = {};
myApp.db = "https://twittaclone.firebaseio.com/";

myApp.profile = function (userName, pic, bio, url, friendsArray) {
    this.userName = userName;
    this.pic = pic;
    this.bio = bio;
    this.url = url;
    this.friendsArray = friendsArray;  
};



myApp.message = function (userName, text) {
    this.userName = userName;
    this.text = text;
    this.time = Date.now();
};

myApp.mockProfile = function () {
    userName = "Daniel Rodriguez";
    pic = "";
    bio = "I'm Awesome!";
    url = "https://twittaclone.firebaseio.com/";
    friendsList = []
}//Mock profile to debug will erase later.  

myApp.createMessage = function () {
    var messageText = document.getElementById("text").value;
    var message = new myApp.message(myApp.userName, messageText);
    
    myApp.AJAX("POST", "text" , message, null);
    myApp.writeTable();
    var messageText = document.getElementById("text").value = "";

}


/*myApp.post = function (data, url) {
   myApp.AJAX("POST", )
    }

    request.onerror = function () {
        console.log("ERRRRRRRR");
    }
    request.send(JSON.stringify(data));
}*/

myApp.get = function (url) {

    var request = new XMLHttpRequest();
    if (!url) {
        request.open("GET", myApp.db + ".json", true);
        alert("Please input the valid url");
        return undefined;
    }
    else {
        request.open("GET", myApp.db + url + ".json", true);
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

myApp.URLMaker = function (array) {
    var url = myApp.db;
    if(array.length){
        for(var x in array){
            url =+ array[x] + "/";
        }
    }
    url + ".json";
    return url;
}

myApp.AJAX = function (method, urlArray, data, callback) {
    var request = new XMLHttpRequest();
    var url = myApp.URL(urlArray);
    request.open(method, url, true);
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            var returnData = JSON.parse.(this.response);
            if(callback){
                callback(returnData);
            }
        }else
            {console.log("Error: "+ this.response);
        }

    }
    request.onerror = function (){
        console.log("ERRRRR");
    }
    if(data){
        request.send(JSON.stringify(data));
    }else{
        request.send();
    }
}//Master AJAX call
myApp.get("tweets/");
