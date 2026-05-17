export interface Product { 
        id: string, //change from number to string because firebase uses UUID which are strings not numbers
        title: string,
        price: number,
        description: string,
        category: string,
        image: string,
        rating: {
            rate: number,
            count: number,
        };
    }

export type ProductInput = {
    title: string;
    description: string;
    category: string;
    price: string;
    image: string;
};

export interface CartItem {
        productId: string,
        title: string,
        price: number,
        quantity: number,
        image: string,
}

export type CheckoutStep =
    "confirm" | "success";


export type Category = string;