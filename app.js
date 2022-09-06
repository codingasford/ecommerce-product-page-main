let mobileMediaQuery = window.matchMedia("(max-width: 1000px)");
let desktopMediaQuery = window.matchMedia("(min-width: 1000px)");

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
let previousImgElemMobile = document.querySelector("#icon-bg-previous");
let nextImgElemMobile = document.querySelector("#icon-bg-next");
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
let sneakerPreviewThumbnailElems = document.querySelectorAll(".product-thumbnail-container");
let desktopSneakerPreviewThumbnailElems = document.querySelectorAll(".product-thumbnail-container.preview-mode-thumbnail");
const desktopPreviewModeContainer = document.querySelector("#desktop-preview-mode-container");
const desktopPreviewModeCloseImg = document.querySelector("#desktop-preview-mode-close-img");
let isPreviewMode = false;
const desktopPreviewModeImgElem = document.querySelector("#desktop-preview-mode-main-img")
const previousImgElemDesktop = document.querySelector("#preview-mode-icon-bg-previous");
const nextImgElemDesktop = document.querySelector("#preview-mode-icon-bg-next");
const ThumbnailFilterElems = document.querySelectorAll(".thumbnail-img-selected-filter");
const previewModeThumbnailFilterElems = document.querySelectorAll(".preview-mode-filter");
const defaultFilterSettings = {
    //these wont be null, also it assumes all filter elem will have same settings as 1st thumbnail, which they should
    backgroundColor: `${ThumbnailFilterElems[0].style.backgroundColor}`,
    border: `${ThumbnailFilterElems[0].style.border}`,
    borderRadius: `${ThumbnailFilterElems[0].style.borderRadius}`
};
const thumbnailImgIndex = {
    index: 0,
    set assignValue(value) { this.index = value; },
    set decrementIndex(decrement) { if(this.index > 0) this.index -= decrement; },
    set incrementIndex(increment) { if(this.index < 3) this.index += increment; }
};
const previewModeBackground = document.querySelector("#preview-bg");


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


//next image preview mobile
nextImgElemMobile.addEventListener("click", () => {
    currentPreviewImgIndex.incrementIndex = 1;
    sneakerPreviewElem.setAttribute("src", previewImgArr[currentPreviewImgIndex.index]);
});


//previous image preview mobile
previousImgElemMobile.addEventListener("click", () => {
    currentPreviewImgIndex.decrementIndex = 1;
    sneakerPreviewElem.setAttribute("src", previewImgArr[currentPreviewImgIndex.index]);
});

headerCartBtnElem.addEventListener("click", () => {
    //enable cart display, disable preview buttons
    if(cartContainerElem.style.display === "none" && !hamburgerMenuOpen) {
        cartContainerElem.style.display = "flex";
        previousImgElemMobile.style.display = "none";
        nextImgElemMobile.style.display = "none";
    } else {
        //disable cart display, re-enable preview buttons
        cartContainerElem.style.display = "none";
        if(mobileMediaQuery.matches) {
             //this checks to make sure user still in mobile
             //or else this would enable the mobile icons in desktop mode
            previousImgElemMobile.style.display = "flex";
            nextImgElemMobile.style.display = "flex";
        }

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
    previousImgElemMobile.style.display = "flex";
    nextImgElemMobile.style.display = "flex";
    //disable cart so both aren't open at the same time
    cartContainerElem.style.display = "none";
    //enaable menu fade background
    menuFadeBgElem.style.display = "block";
});

hamburgerMenuCloseElem.addEventListener("click", () => {
    hamburgerMenuElem.style.display = "none";
    hamburgerMenuOpen = false;
    //renable previous and next buttons
    previousImgElemMobile.style.display = "flex";
    nextImgElemMobile.style.display = "flex";
    //disable menu fade background
    menuFadeBgElem.style.display = "none";
});

window.addEventListener("resize", () => {
    //everytime window resized check if changed to desktop mode 
    //disable preview buttons
    //initially disable the preview buttons so no carry over from desktop mode on resize
    if(desktopMediaQuery.matches) {
        previousImgElemMobile.style.display = "none";
        nextImgElemMobile.style.display = "none";

    } else {
        previousImgElemMobile.style.display = "flex";
        nextImgElemMobile.style.display = "flex";
    }
    
});

//Click To Select Thumbnail and Open Up Preview

sneakerPreviewThumbnailElems.forEach(thumbnail => {
    

    thumbnail.addEventListener("click", () => {

        thumbnailImgIndex.assignValue = thumbnail.firstElementChild.getAttribute("src").match(/\d+/)[0] - 1;

        
        if(isPreviewMode) {

            DeselectAllPreviewThumbnails();
            SelectPreviewModeThumbnailByIndex(thumbnailImgIndex.index);

        } else {

            DeselectAllThumbnails();

            //apply select styles to thumbnail clicked in normal mode then enable preview mode
            SelectPreviewModeThumbnailByIndex(thumbnailImgIndex.index);
            EnablePreviewMode();
            
        }

        //change preview img to selected img
        desktopPreviewModeImgElem.setAttribute("src", previewImgArr[thumbnailImgIndex.index]);


    
    });
});

function SelectPreviewModeThumbnailByIndex(index) {
    let thisThumbnailFilterElem = desktopSneakerPreviewThumbnailElems[index].querySelector(".thumbnail-img-selected-filter");
    console.log(index);
    
    thisThumbnailFilterElem.style.backgroundColor = "hsl(0, 0%, 100%, 65%)";
    thisThumbnailFilterElem.style.border = "0.2rem solid var(--primary-color)";
    thisThumbnailFilterElem.style.borderRadius = "0.8rem";
    
}

function DeselectAllPreviewThumbnails() {
    //gives all relevant thumbnails default styling
    previewModeThumbnailFilterElems.forEach(thumbnailFilter => {
        thumbnailFilter.style.backgroundColor = defaultFilterSettings.backgroundColor;
        thumbnailFilter.style.border = defaultFilterSettings.border;
        thumbnailFilter.style.borderRadius = defaultFilterSettings.borderRadius;
    });
}

function DeselectAllThumbnails() {
        //gives all relevant thumbnails default styling
    ThumbnailFilterElems.forEach(thumbnailFilter => {
        thumbnailFilter.style.backgroundColor = defaultFilterSettings.backgroundColor;
        thumbnailFilter.style.border = defaultFilterSettings.border;
        thumbnailFilter.style.borderRadius = defaultFilterSettings.borderRadius;
    });
}


function EnablePreviewMode() {
    //enable black transparent background
    previewModeBackground.style.display = "block";

    desktopPreviewModeContainer.style.display = "flex";
    isPreviewMode = true;

    //disable cart so cart and preview aren't open at the same time
    cartContainerElem.style.display = "none";

    //add close button logic
    desktopPreviewModeCloseImg.addEventListener("click", () => {
        desktopPreviewModeContainer.style.display = "none";
        previewModeBackground.style.display = "none";
        isPreviewMode = false;
    

    DeselectAllThumbnails();

    });
}


//next image preview desktop
nextImgElemDesktop.addEventListener("click", () => {

    //select next image
    DeselectAllPreviewThumbnails();
    thumbnailImgIndex.incrementIndex = 1;
    SelectPreviewModeThumbnailByIndex(thumbnailImgIndex.index);

    //change big image preview to next img
    desktopPreviewModeImgElem.setAttribute("src", previewImgArr[thumbnailImgIndex.index]);

});


//previous image preview desktop
previousImgElemDesktop.addEventListener("click", () => {

    //select previous image
    DeselectAllPreviewThumbnails();
    thumbnailImgIndex.decrementIndex = 1;
    SelectPreviewModeThumbnailByIndex(thumbnailImgIndex.index);
    
    // //change big image preview to previous img
    desktopPreviewModeImgElem.setAttribute("src", previewImgArr[thumbnailImgIndex.index]);
});
