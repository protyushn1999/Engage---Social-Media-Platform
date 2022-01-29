console.log('connected to post page');

const clearInput = () => {
    const input = document.getElementsByClassName("searchinput")[0];
    input.value = "";
    console.log('cleared input');
  }
  const form = document.getElementById("searchuser");
  const clearBtn = document.getElementById("search-btn");
  form.addEventListener("submit", clearInput);
  clearBtn.addEventListener("click", clearInput);



// var nav = document.getElementsByClassName("navbar-list");

// nav.forEach((li) => {
//   li.addEventListener("click", function () {
//     removeActive();
//     this.classList.add("active");
//   });
// });

// function removeActive() {
//   nav.forEach((li) => {
//     li.classList.remove("active");
//   });
// }
var nav = document.querySelectorAll("li");

nav.forEach((li) => {
  li.addEventListener("click", function () {
    removeActive();
    this.classList.add("active");
  });
});

function removeActive() {
  nav.forEach((li) => {
    li.classList.remove("active");
  });
}
