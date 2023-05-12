import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  totalPrice: 0,
  items: [],
  itemsLeft: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem (state, action) {
        const findItem = state.items.find(item => (Number(item.pizzaID) === Number(action.payload.pizzaID) && Number(item.size) === Number(action.payload.size) && String(item.type) === String(action.payload.type)));
        if (findItem) {
            findItem.count++
        } else {
            state.items.push({
                ...action.payload,
                count: 1
            });
        }
        state.totalPrice = state.items.reduce((sum, item) => {
            return Number(item.price) * Number(item.count) + sum;
        }, 0);

        console.log('action add item, state >', state);
    },
    minusItem (state, action) {
        const findItem = state.items.find(item => (Number(item.pizzaID) === Number(action.payload.pizzaID) && Number(item.size) === Number(action.payload.size) && String(item.type) === String(action.payload.type)));
        if (findItem) {
            findItem.count--
        }
    },
    removeItem (state, action) {
        // state.items = state.items.filter(item => (item.pizzaID !== action.payload.pizzaID && item.size !== action.payload.size && item.type !== action.payload.type));
        const itemsLeft = state.items.filter(item => (Number(item.pizzaID) !== Number(action.payload.pizzaID) && Number(item.size) !== Number(action.payload.size) && item.type != action.payload.type));
        // console.log('action > ', action);
        // console.log('state > ', state);
        // console.log('itemsLeft > ', itemsLeft);
        state.itemsLeft = itemsLeft;
    },
    clearItems (state) {
        state.items = [];
    }
  }
});

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
