

// const stripeHandler = StripeCheckout.configure({
//     key: stripePublicKey,
//     locale: 'auto',
//     token: function (token) {
//         console.log(token);
//     }
// })


const buttons = document.querySelectorAll('.purchaseButton');
console.log(buttons);
buttons.forEach(button => {
    button.addEventListener("click", function () {
        purchaseClicked(button);
    });
});

function purchaseClicked(button) {
    price = button.querySelector('h2');
    price = price.innerText.slice(0, price.innerText.length - 1);
    console.log(price);
    stripeHandler.open({
        amount: price * 100
    });

    fetch('/purchase', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            stripeTokenId: token.id,
            items: items
        })
    });
}

