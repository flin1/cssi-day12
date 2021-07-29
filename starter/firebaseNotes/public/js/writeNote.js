let googleUser;

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUser = user;
    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
  });
};

const handleNoteSubmit = () => {
    console.log("note submission function called");
    // 1. Capture the form data
       let noteTitle = document.querySelector("#noteTitle").value;
       let noteBody = document.querySelector("#noteText").value;
    // 2. Format the data and write it to our database
        const note = {
                title: noteTitle,
                text: noteBody
        };
    // 3. Clear the form so that we can write a new note
        const titleElement =  document.querySelector("#noteTitle")
        const textElement = document.querySelector("#noteText")
    // 4. Write it to our database
        console.log(note);
        console.log(googleUser);
        const userString = `users/${googleUser.uid}`;
        const dbRef = firebase.database().ref(userString);
        dbRef.push(note).then(()=>{
            titleElement.value = "";
            textElement.value = "";
        })

}
