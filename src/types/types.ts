export interface Product { 
        id: number,
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

export interface CartItem {
        id: number,
        title: string,
        price: number,
        quantity: number,
        image: string,
}

export type CheckoutStep =
    "confirm" | "success";


export type Category = string;