let minusImgElem = document.querySelector("#minus-img");
let plusImgElem = document.querySelector("#plus-img");
let quantityElem = document.querySelector("#quantity");
let quantityVal = 0;
let previewImgArr = ["./images/image-product-1.jpg", 
                      "./images/image-product-2.jpg", 
                      "./images/image-product-3.jpg", 
                      "./images/image-product-4.jpg"];
const currentPreviewImgIndex = {
    index: 0,
    set decrementIndex(decrement) { if(this.index > 0) this.index -= decrement; },
    set incrementIndex(increment) { if(this.index < 3) this.index += increment; }
};
let sneakerPreviewElem = document.querySelector("#sneaker-preview");
let previousImgElem = document.querySelector("#icon-bg-previous");
let nextImgElem = document.querySelector("#icon-bg-next");
let headerCartBtnElem = document.querySelector("#cart-img");
let cartContainerElem = document.querySelector("#cart-container");
let addCartBtnElem = document.querySelector("#add-cart-btn");
let fullCartContainerElem = document.querySelector("#full-cart-container");
let emptyCartTextElem = document.querySelector("#empty-cart-text");
let deleteCartItemElem = document.querySelector("#cart-item-delete-btn");
let cartItemQuantityElem = document.querySelector("#cart-item-quantity");
let cartQuantity = 0;
let cartItemTotalElem = document.querySelector("#cart-item-total");
let cartImgQuantityElem = document.querySelector("#cart-img-quantity");
let menuImgElem = document.querySelector("#menu-img");
let hamburgerMenuElem = document.querySelector("#hamburger-menu-pullout");
let hamburgerMenuCloseElem = document.querySelector("#hamburger-menu-close-img");
let hamburgerMenuOpen = false;
let menuFadeBgElem = document.querySelector("#menu-fade-bg");

//increase quantity
plusImgElem.addEventListener("click", () => {
    if(quantityVal >= 0) {
        quantityVal++;
        quantityElem.textContent = quantityVal;
    }
});

//decrease quantity
minusImgElem.addEventListener("click", () => {
    if(quantityVal > 0) {
        quantityVal--;
        quantityElem.textContent = quantityVal;
    }
});


//next image preview
nextImgElem.addEventListener("click", () => {
    currentPreviewImgIndex.incrementIndex = 1;
    sneakerPreviewElem.setAttribute("src", previewImgArr[currentPreviewImgIndex.index]);
});


//previous image preview
previousImgElem.addEventListener("click", () => {
    currentPreviewImgIndex.decrementIndex = 1;
    sneakerPreviewElem.setAttribute("src", previewImgArr[currentPreviewImgIndex.index]);
});

headerCartBtnElem.addEventListener("click", () => {
    //enable cart display, disable preview buttons
    if(cartContainerElem.style.display === "none" && !hamburgerMenuOpen) {
        cartContainerElem.style.display = "flex";
        previousImgElem.style.display = "none";
        nextImgElem.style.display = "none";
    } else {
        //disable cart display, re-enable preview buttons
        cartContainerElem.style.display = "none";
        previousImgElem.style.display = "flex";
        nextImgElem.style.display = "flex";
    }
})

//add cart functionality
addCartBtnElem.addEventListener("click", () => {

    // Check if quantity is 0, and if so return and pop up warning
    if(quantityVal == 0) {
        return;
    }

    //enable full-cart-preview
    //disable empty-cart-preview
    fullCartContainerElem.style.display = "flex";
    emptyCartTextElem.style.display = "none";

    //evaluate new quantity 
    // \u00a0 is nbsp but works when parsed by textContent for a space
    cartQuantity += quantityVal;
    cartItemQuantityElem.textContent = `${cartQuantity}\u00a0`;

    //calculate total and assign to total text
    cartItemTotalElem.textContent = `$${cartQuantity * 125}.00`;

    //enable cart icon quantity preview
    cartImgQuantityElem.style.display = "inline";
    //assign cart icon quantity value
    cartImgQuantityElem.textContent = `${cartQuantity}`;
});

deleteCartItemElem.addEventListener("click", () => {
    //disable full-cart-preview
    //enable empty-cart-preview
    fullCartContainerElem.style.display = "none";
    emptyCartTextElem.style.display = "block";

    //reset cart quantity
    cartQuantity = 0;

    //dosable cart icon quantity preview
    cartImgQuantityElem.style.display = "none";
});

//hamburger menu functionality
menuImgElem.addEventListener("click", () => {
    hamburgerMenuElem.style.display = "block";
    hamburgerMenuOpen = true;
    //renable previous and next buttons in case was in cart when clicked menu
    previousImgElem.style.display = "flex";
    nextImgElem.style.display = "flex";
    //disable cart so both aren't open at the same time
    cartContainerElem.style.display = "none";
    //enaable menu fade background
    menuFadeBgElem.style.display = "block";
});

hamburgerMenuCloseElem.addEventListener("click", () => {
    hamburgerMenuElem.style.display = "none";
    hamburgerMenuOpen = false;
    //renable previous and next buttons
    previousImgElem.style.display = "flex";
    nextImgElem.style.display = "flex";
    //disable menu fade background
    menuFadeBgElem.style.display = "none";
});