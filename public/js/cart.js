import axios from 'axios';

export let cart = { quantity: 0, products: [] };

export async function getAllProductsForUser() {
    try {
        const res = await axios({
            method: 'GET',
            url: `http://95.104.13.159:8080/api/v1/cart`,
        });

        if (res.data.status === 'Success') return res.data;

        return false;
    } catch (err) {
        console.error(err);
    }
}

(async function getCart() {
    const prods = await getAllProductsForUser();

    if (prods) {
        cart.quantity = prods.data.results;
        cart.products = new Array(...prods.data.products);
        return true;
    }

    return false;
})();

export function updateQuantityOfProduct(product, mode, el) {
    if (mode === 'increment') {
        product.quantity++;
    } else if (mode === 'decrement' && product.quantity > 1) {
        product.quantity--;
    }

    el.textContent = product.quantity;
    return false;
}

export function createCartProductObj(data) {
    return {
        user: data.user,
        product: data.product,
        name: data.name,
        id: data.id,
        quantity: data.quantity,
        price: data.price,
        image: data.image,
    };
}

export async function addProductToCart(id) {
    try {
        const res = await axios({
            method: 'POST',
            url: `http://95.104.13.159:8080/api/v1/cart/${id}`,
            data: {
                id,
            },
        });

        if (res.data.status === 'Success') return res.data;

        return false;
    } catch (err) {
        console.log(err);
    }
}

export async function deleteProductFromCart(id) {
    try {
        const res = await axios({
            method: 'delete',
            url: `http://95.104.13.159:8080/api/v1/cart/${id}`,
            data: {
                id,
            },
        });

        return true;
    } catch (err) {
        console.log(err);
    }
}
