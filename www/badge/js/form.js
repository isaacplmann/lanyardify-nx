const nameField = document.getElementById("name")
const twitterField = document.getElementById("twitter");
const form = document.getElementsByTagName("form")[0];

nameField.oninput = (evt) => {
  document.getElementById('badge-name').innerHTML = evt.target.value;
}
twitterField.oninput = (evt) => {
  document.getElementById('badge-twitter').innerHTML = evt.target.value;
}

form.onsubmit = (evt) => {
  const button = document.getElementById("submit");
  button.value = "Laminating...";
  button.classList.add("active");
}