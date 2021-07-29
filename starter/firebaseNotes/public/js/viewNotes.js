let googleUser;

//on page load check user auth
window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUser = user;
      getNotes(googleUser.uid);
    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
  });
};

const getNotes = (userId) => {
    console.log("logged in as user:" + userId);
    // 1. get access to user's notes
    const dbRef =  firebase.database().ref(`users/${userId}`);
    // 2. display on page
        //listens for changes
    dbRef.on("value", (snapshot) => {
        document.querySelector("#app").innerHTML = "";
        renderData(snapshot.val());
    })
}
const renderData = (data) => {
    const destination = document.querySelector("#app");
    destination.innerHTML = ""
    for(let key in data){
        const note = data[key];
        console.log(data[key]);
        
        //+= appends the data instead of replacing
        destination.innerHTML += createCard(note);
    }

};

const createCard = (note) => {
    return `<div class = "column is-one-quarter">
                <div class = "card"           
                    <header class = "card-header">
                        <p class = "card-header-title">${note.title}</p>
                    </header>
                    <div class = "card-content">
                        <div class = "content">
                            ${note.text}
                        </div>
                    </div> 
                </div> 
             </div>`;
}