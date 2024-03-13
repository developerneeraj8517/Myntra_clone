let bagItems;
onload();
function onload() {
  let bagItemStr = localStorage.getItem("bagItems");
  bagItems = bagItemStr ? JSON.parse(bagItemStr) : [];
  displayItemonHomepage();
  displaybagIcon();
}
function addToBag(itemId) {
  bagItems.push(itemId);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  displaybagIcon();
}

function displaybagIcon() {
  let bagItemCount = document.querySelector(".bag-count");
  if (bagItems.length > 0) {
    bagItemCount.style.visibility = "visible";
    bagItemCount.innerText = bagItems.length;
  } else {
    bagItemCount.style.visibility = "hidden";
  }
}
function displayItemonHomepage() {
  let itemsContainerElement = document.querySelector(".Mitems-cont");

  if (!itemsContainerElement) {
    return;
  }

  let innerHTML = ``;
  items.forEach((item) => {
    innerHTML += `<div class="item-cont">
  <img class ="item-img" src="${item.item_image}" alt="IMG">
  <div class="rating">
      ${item.ratings.stars} ⭐ | ${item.ratings.no_Reviews}
  </div>
  <div class="company-name">${item.company_name} </div>
  <div class="item-name">${item.item_name}</div>
  <div class="price">
      <span class="current-price">${item.current_p}</span>
      <span class="original-price"> ${item.original_p}</span>
      <span class="discount">${item.discount}</span>
      
  </div>
  <button class="add-bag" onclick="addToBag(${item.id})">Add to Bag</button>
</div>`;
  });
  itemsContainerElement.innerHTML = innerHTML;
}
