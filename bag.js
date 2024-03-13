let bagItemsObject;
onLoad();

function onLoad() {
  loadBagItemObject();
  displayBagItems();
  displayBagSummary();
}

function displayBagSummary() {
  let bagSummaryElement = document.querySelector(".bag-summary");
  let totalIem = bagItemsObject.length;
  let totalMRP = 0;
  let totalDiscount = 0;

  bagItemsObject.forEach((bagItem) => {
    totalMRP += bagItem.original_p;
    totalDiscount += bagItem.original_p - bagItem.current_p;
  });

  let finalPayment = totalMRP - totalDiscount + 88;
  bagSummaryElement.innerHTML = `  <div class="bag-details-container">
    <div class="price-header">PRICE DETAILS (${totalIem} ITEMS)</div>
    <div class="price-item">
        <span class="price-item-tag">Total MRP</span>
        <span class="price-item-value">Rs ${totalMRP}</span>
    </div>
    <div class="price-item">
        <span class="price-item-tag">Discount on MRP</span>
        <span class="price-item-value priceDetail-base-discount">-Rs ${totalDiscount}</span>
    </div>
    <div class="price-item">
        <span class="price-item-tag">Convience fess</span>
        <span class="price-item-value">Rs 88</span>
    </div>
    <hr>
    <div class="price-footer">
        <span class="price-item-tag">Total Amount</span>
        <span class="price-item-value">Rs ${finalPayment}</span>
    </div>
</div>
<button class="btn-place-order">
    <div class="css-xjhrni">PLACE ORDER</div>
</button>`;
}
function loadBagItemObject() {
  bagItemsObject = bagItems.map((itemId) => {
    for (let i = 0; i < items.length; i++) {
      if (itemId == items[i].id) {
        return items[i];
      }
    }
  });
}

function displayBagItems() {
  let containerElement = document.querySelector(".bag-items-container");
  let innerHTML = "";
  bagItemsObject.forEach((bagItem) => {
    innerHTML += generateItemHTML(bagItem);
  });
  containerElement.innerHTML = innerHTML;
}

function removeFromBag(itemId) {
  bagItems = bagItems.filter((bagItemId) => bagItemId != itemId);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  loadBagItemObject();
  displaybagIcon();
  displayBagItems();
  displayBagSummary();
}

function generateItemHTML(item) {
  return ` <div class="bag-item-container">
    <div class="item-left-part">
        <img class="bag-item-img" src="${item.item_image}">
    </div>
    <div class="item-right-part">
        <div class="company">${item.company_name}</div>
        <div class="item-name">${item.item_name}</div>
        <div class="price-container">
            <span class="current-price">${item.current_p}</span>
            <span class="original-price">${item.original_p}</span>
            <span class="discount">${item.discount}</span>
        </div>
        <div class="return-period">
            <span class="retrun-period-days">${item.return_period} days </span>return available
        </div>
        <div class="delivery-details">Delivery-By
            <span class="deliver-details-days">${item.delivery_date}</span>
        </div>
    </div>
    <div class="remove-from-cart" onclick="removeFromBag(${item.id})">X</div>
</div>`;
}
