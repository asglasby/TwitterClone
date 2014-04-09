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
    myApp.postMessage(message);
    alert(JSON.stringify(message) + " " + messageText);
}

myApp.postMessage = function (data) {
    var request = new XMLHttpRequest();
    request.open("Post", myApp.url+".json", true);
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            console.log();
        } else {
            console.log(this.response);
        }
    }

    request.onerror = function () {
        console.log("ERRRRRRRR");
    }
    request.send(JSON.stringify(data));
}


myApp.userName = "Donald";