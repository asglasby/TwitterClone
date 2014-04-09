var myApp = {};

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

