document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("cook-whaaat JS imported successfully!");
  },
  false
);

// script to change add to favorites button
$("#favoriteButton").click(function () {
  $("#favoriteButton").html("Added to favorites!");
  $("#favoriteButton").css("background-color", "transparent");
  $("#favoriteButton").css("color", "black");
  $("#favoriteButton").css("border-style", "none");
});

// script that loads the searchResults partial within this page by calling POST "recipes/search"
$("#search-button").click(function () {
  $.post("recipes/search", $("#searchInput").serialize(), function (data) {
    $("#searchResults").html(data);
  });
});

// script to change add to favorites icon button
$(".material-icons").click(function () {
  $("#" + this.id).addClass("favoriteIconToggled");
});
