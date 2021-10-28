var user_name = localStorage.getItem('username');
var roomname = localStorage.getItem("room_name");

//YOUR FIREBASE LINKS
var firebaseConfig = {
      apiKey: "AIzaSyCsfEljWnhuboneBQMCEMezWcWD0WxNgsU",
      authDomain: "kwitter-application-bac6f.firebaseapp.com",
      databaseURL: "https://kwitter-application-bac6f-default-rtdb.firebaseio.com",
      projectId: "kwitter-application-bac6f",
      storageBucket: "kwitter-application-bac6f.appspot.com",
      messagingSenderId: "184145424324",
      appId: "1:184145424324:web:e61431abe4ea8aa6a53e91"
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

function getData() { firebase.database().ref("/"+roomname).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
console.log(firebase_message_id);
console.log(message_data);

pname = message_data['name'];
likes = message_data['likes'];
umessage = message_data['message'];

nametag = "<h3>"+pname+"<img src='tick.png' class='user_tick'></h3>";
messagetag = "<h5 class='message_h4'>"+umessage+"</h5>";
buttontag = "<button id="+firebase_message_id+" onclick='liking(this.id)' class='btn btn-warning'>";
spantag = "<span class='glyphicon glyphicon-thumbs-up'></span>Like: "+likes+"</button>";
row = nametag + messagetag + buttontag + spantag;
document.getElementById("output").innerHTML+=row;
//End code
      } });  }); }
getData();

function logout()
{
      localStorage.removeItem("username");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}

function sendmsg()
{
      msg = document.getElementById("msg").value;
      firebase.database().ref(roomname).push({
            name: user_name,
            message: msg,
            likes: 0
      });

      document.getElementById("msg").value = " ";
      
}

function liking(message_id)
{
      console.log("message id is- "+ message_id)
      button_id = message_id;
      numoflikes = document.getElementById(button_id).value;
      updatedlikes = Number(numoflikes) + 1;
      console.log(updatedlikes);

      firebase.database().ref(roomname).child(message_id).update({
            likes: updatedlikes
      });
}