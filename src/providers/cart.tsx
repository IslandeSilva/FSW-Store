"use client"

import { ReactNode, createContext, useState } from "react";
import { ProductWithTotalPrice } from "../../helpers/product";


export interface CartProduct extends ProductWithTotalPrice{
    quantity: number
}

interface ICartContext{
    products: CartProduct[]
    cartTotalPrice: number
    cartBasePrise: number
    cartTotalDiscount: number
    addProductToCart: (product: CartProduct) => void;
    decreaseProductQuantity: (productId: string) => void;
    increaseProductQuantity: (productId: string) => void;
    removeProductsFromCart: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
    products: [],
    cartTotalPrice: 0,
    cartBasePrise: 0,
    cartTotalDiscount: 0,
    addProductToCart: () => {},
    decreaseProductQuantity: () => {},
    increaseProductQuantity: () => {},
    removeProductsFromCart: () => {},
});

const CartProvider = ({children}: {children: ReactNode}) => {
    const [products, setProducts] = useState<CartProduct[]>([])

        const addProductToCart = (product: CartProduct) => {
        //Verifica se o item ja existe no carrinho
        const productIsAlreadyOnCart = products.some(
            (cartProduct) => cartProduct.id === product.id,
            );

        if (productIsAlreadyOnCart) {
            setProducts((prev) =>
            prev.map ((cartProduct) => {
                if (cartProduct.id === product.id){
                return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + product.quantity,
                };
            }
            return cartProduct;
        }),
        );
    return;
    }

    // Se não, adicione o produto a lista

        setProducts((prev) => [...prev, product])
    };

    const decreaseProductQuantity = (productId: string) => {

    setProducts(prev => prev.map(cartProduct => {
    if (cartProduct.id === productId) {
        return {
            ...cartProduct,
            quantity: cartProduct.quantity -1
        };
    }
    return cartProduct;
    }).filter((cartProduct) => cartProduct.quantity > 0),
  );
 };

 const increaseProductQuantity = (productId: string) => {

    setProducts(prev => prev.map(cartProduct => {
    if (cartProduct.id === productId) {
        return {
            ...cartProduct,
            quantity: cartProduct.quantity + 1
        };
    }
    return cartProduct;
    }),
  );
 };

    const removeProductsFromCart = (productId: string) => {
        setProducts ((prev) => 
            prev.filter ((cartProduct) => cartProduct.id != productId),
        );
    };



    return ( 
        <CartContext.Provider value={{
            products,
            addProductToCart,
            decreaseProductQuantity,
            increaseProductQuantity,
            removeProductsFromCart,
            cartTotalPrice: 0,
            cartBasePrise: 0,
            cartTotalDiscount: 0,
        }}>
            {children}
        </CartContext.Provider>

     );
}
 
export default CartProvider;