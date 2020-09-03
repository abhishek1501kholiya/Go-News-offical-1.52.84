var canvas;
var back ;
var i = 0;
var database;
var displayname2;
var displaynameout;
var name ;
var gameState = "notshow";
function setup (){
canvas = createCanvas(displayWidth,displayHeight);
database = firebase.database();
displaynameout = createElement('h2');
    //back = createButton("Back");
var storageRef = firebase.storage().ref();
imageRef = storageRef.child('pupies');
storageRef.child('/').listAll().then(function(result){
  result.items.forEach(function(imageRef){
     //console.log(imageRef.toString());
     i+=550;
     displayImage(i,imageRef); 
 })
});

}



function displayImage(row,image){
    image.getDownloadURL().then(function(url){
      console.log(url.toString());
    //  var modURL = "https://cors-anywhere.herokuapp.com" + url;
      var modURL = "https://cors-anywhere.herokuapp.com/" + url; 
      tab = createImg(modURL,"test");
  
      tab.position(200,row);
      tab.style("width","400px");
      tab.style("height","400px");
      caption(url,row);
   });
  }
function caption(url,positionY){
  var ref = database.ref("Users/Posts");  
  ref.once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();
      //var name  = childData.user;
 
    //  var displayref = database.ref("Users/"+ childData.user).on("value",(data)=>{
     //     name = data.val().firstName;
      //    console.log(name);
     // })
      // console.log(childKey);
    //  console.log(childData);
     //  console.log(childData.url);
      //var nameref = database.ref('Users/' + name).on("value",(data)=>{
       //     console.log(data.val());
      //      displayname2  = data.val().firstName;
     //    })
     if(childData.url === url){
        var imagecaption = createElement('h2');
         imagecaption.html(childData.caption);
         imagecaption.position(205,positionY+380);
        var displayname = createElement('h2');
        displayname.html(childData.displayname);
        displayname.position(200,positionY-40)
        var location = createElement('h2');
        location.html(" location = " + " " + childData.location);
        location.position(205,positionY+415)
         //  displayname2 = childData.displayname;
         // if(displayname2  !==null){
          //displaynameout.html(displayname2);
         // displaynameout.position(190,positionY-45);
         // }
         
     
        //
       //  createFrame(200,positionY);
           gameState = "show";
          
       }
       if(gameState === "show" &&  displaynameout.value() !== null){
        console.log("work")
        //text(displayname2,750,positionY);
      //  text(displayname2,550,200)
       // displayname2 = displaynameout.value();
   
      }
     //console.log(childData);
     //console.log(email);
    });
  });     
}
function draw(){

}
function createFrame(positionX,positionY){
rect(positionX,positionY,800,500);
}

