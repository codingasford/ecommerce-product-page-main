let minusImgElem = document.querySelector("#minus-img");
let plusImgElem = document.querySelector("#plus-img");
let quantityElem = document.querySelector("#quantity");
let quantityVal = 0;

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

