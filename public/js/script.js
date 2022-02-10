document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("cook-whaaat JS imported successfully!");
  },
  false
);

// script to change add to favorites button
// $("#favoriteButton").click(function () {
//   $("#favoriteButton").html("Added to favorites!");
//   $("#favoriteButton").css("background-color", "transparent");
//   $("#favoriteButton").css("color", "black");
//   $("#favoriteButton").css("border-style", "none");
// });

// script that loads the searchResults partial within this page by calling POST "recipes/search"
$("#search-button").click(function () {
  $.post("recipes/search", $("#searchInput").serialize(), function (data) {
    $("#searchResults").html(data);
  });
});

// script to change add to favorites icon button
$(".material-icons").click(function () {
  if (this.style.color === "yellow") {
    $.post("recipes/favoriteRemove", { recipeId: this.id });
    this.style.color = "";
  } else {
    $.post("recipes/favorite", { recipeId: this.id });
    this.style.color = "yellow";
  }
  //$("#" + this.id).addClass("favoriteIconToggled");
});

// changes image displayed when user updates image
$("#formFile").change(function(){
  readURL(this);
});
function readURL(input) {
  if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
          $('#preEditImg').attr('src', e.target.result);
      }

      reader.readAsDataURL(input.files[0]);
  }
}