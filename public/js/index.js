import { login, logout } from './login';
import { signup } from './signup';
import { addProductToCart, deleteProductFromCart, updateQuantityOfProduct, createCartProductObj, cart } from './cart';

import { renderHTML, getData, joinTemplate, deleteById, findUsingId } from './utils';

const loginForm = document.querySelector('.form__login');
const signupForm = document.querySelector('.form__signup');
const cartContainer = document.querySelector('.cart');

if (loginForm) {
    loginForm.addEventListener('click', e => {
        e.preventDefault();
        const { target } = e;

        if (target.matches('.btn-submit')) {
            const email = document.querySelector('.form__email-input').value;
            const password = document.querySelector('.form__password-input').value;

            return login(email, password);
        }
    });
}

if (signupForm) {
    signupForm.addEventListener('click', e => {
        e.preventDefault();
        const { target } = e;

        if (target.matches('.btn-submit')) {
            const name = document.querySelector('.form__name-input').value;
            const email = document.querySelector('.form__email-input').value;
            const password = document.querySelector('.form__password-input').value;
            const passwordConfirm = document.querySelector('.form__confirm-password-input').value;

            return signup(name, email, password, passwordConfirm);
        }
    });
}

document.body.addEventListener('click', async e => {
    const { target } = e;

    if (target.matches('.header__cart-img')) {
        return cartContainer.classList.toggle('cart--active');
    }

    if (target.matches('.btn-purchase')) {
        const { id } = target.closest('.product');
        const cartProd = await addProductToCart(id);

        cart.quantity++;
        cart.products.push(createCartProductObj(cartProd.data.data));

        return true;
    }

    if (target.matches('.btn-delete') || target.matches('.btn-delete-img')) {
        const { id } = target.closest('.cart-product');

        if (cart.quantity > 0) cart.quantity--;
        cart.products = deleteById(cart.products, obj => id == obj.id);
        return deleteProductFromCart(id);
    }

    if (target.matches('.btn--decrement-qnt')) {
        const { id } = target.closest('.product');
        const product = findUsingId(cart.products, obj => id == obj.product);
        const productQnt = document.querySelector('.product__qnt');

        return updateQuantityOfProduct(product, 'decrement', productQnt);
    }

    if (target.matches('.btn--increment-qnt')) {
        const { id } = target.closest('.product');
        const product = findUsingId(cart.products, obj => id == obj.product);
        const productQnt = document.querySelector('.product__qnt');

        return updateQuantityOfProduct(product, 'increment', productQnt);
    }
});
