const CART_KEY = "cart";

export const getCart = () => {
    const cart = sessionStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
};

export const saveCart = (cart: any[]) => {
    sessionStorage.setItem(CART_KEY, JSON.stringify(cart));
}