import {
    createAsyncThunk,
    createSelector,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

// Types
// interface Product {
//     id: number;
//     name: string;
//     price: number;
//     quantity: number;
// }
//
// interface CartItem {
//     id: number;
//     session: string;
//     products: Product[];
// }

interface CartState {
    items: App.Data.CartData | null; // Ensure this matches the object structure
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: CartState = {
    items: null,
    status: 'idle',
    error: null,
};

// Async Thunks
export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
    const response = await axios.get('/cart-items'); // Replace with your backend endpoint
    return response.data;
});

export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async (item: {
        product_id: number;
        variation_id?: number;
        quantity: number;
    }) => {
        const response = await axios.post('/cart', item); // Replace with your backend endpoint
        console.log(response);
        fetchCart();

        return response.data.product; // Assuming the backend returns the newly added product
    },
);

export const removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async (productId: number) => {
        await axios.delete(`/cart/${productId}`); // Replace with your backend endpoint
        return productId;
    },
);

// Selector to calculate total price
export const selectCartTotal = createSelector(
    (state: RootState) => state.cart.items?.products,
    (products) => {
        return (
            products?.reduce((total, product) => {
                return product ? total + product?.price * product?.quantity : 0;
            }, 0) || 0
        );
    },
);
// Cart Slice
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Cart
            .addCase(fetchCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(
                fetchCart.fulfilled,
                (state, action: PayloadAction<App.Data.CartData>) => {
                    state.status = 'succeeded';
                    state.items = action.payload;
                },
            )
            .addCase(fetchCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch cart';
            });
        // Add to Cart
        // .addCase(
        //     addToCart.fulfilled,
        //     (state, action: PayloadAction<Product>) => {
        //         if (state.items) {
        //             state.items.products.push(action.payload); // Add the new product to the `products` array
        //         }
        //     },
        // )
        // Remove from Cart
        // .addCase(
        //     removeFromCart.fulfilled,
        //     (state, action: PayloadAction<number>) => {
        //         if (state.items) {
        //             state.items.products = state.items.products.filter(
        //                 (product) => product.id !== action.payload,
        //             );
        //         }
        //     },
        // );
    },
});

export default cartSlice.reducer;
