function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999;';  
}

$(".addtoCart").on('click', function() {
    alert("Access");

    var userID = getCookie('userID');

    if(userID) {
        alert('nothing to do here');

        $.post( "/cart/" + $(this).attr('value')).done("OK");

        return;
    }

    var cart = getCookie('cart');
    if(!cart) {
        var cartDetail = [];
        var product = {
            id: $(this).attr('value'), 
            quantity: 1
        };
        cartDetail.push(product);
        setCookie('cart',JSON.stringify(cartDetail),100);
    }
    else {
        var cartArray = JSON.parse(cart);

        var found = false;
        cartArray.forEach(product => {
            if(product.id == $(this).attr('value')) {
                product.quantity += 1;

                setCookie('cart',JSON.stringify(cartArray),100);

                found = true;
            }
        });
               
        if(!found) {
            var product = {
                id: $(this).attr('value'), 
                quantity: 1
            };
    
            cartArray.push(product);
            setCookie('cart',JSON.stringify(cartArray),100);
        }

        console.log(product);
    }
});



