
//ADD YOUR FIREBASE LINKS HERE
// Your web app's Firebase configuration
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

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
      //Start code
      console.log("RoomNames", Room_names);
      row = "<div class='room_name' id="+Room_names+" onclick='taketoRoomName(this.id)'>#"+Room_names+"</div><hr>";
      document.getElementById("output").innerHTML+= row;
      //End code
      });});}
getData();

function taketoRoomName(name)
{
      console.log(name);
      localStorage.setItem("room_name", name);
      window.location = "kwitter_page.html";
}

username = localStorage.getItem("username");
document.getElementById("user_name").innerHTML = "Welcome " + username + "!";

function addRoom()
{
      room_name = document.getElementById("roomname").value;
      localStorage.setItem("room_name", room_name);

      firebase.database().ref("/").child(room_name).update({
          purpose: "adding room name"
      });

      window.location = "kwitter_page.html";
}

function logout()
{
      localStorage.removeItem("username");
      localStorage.removeItem('room_name');
      window.location = "index.html"
}