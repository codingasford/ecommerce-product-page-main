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
let addCartBtnElem = document.querySelector("#add-cart-button");

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
    if(cartContainerElem.style.display === "none") {
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
    
});