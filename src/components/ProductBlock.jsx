import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addItem } from '../redux/slices/cartSlice';

function ProductBlock({ pizzaID, imageUrl, title, types, price, sizes }) {
    const [activeType, setActiveType] = useState(0);
    const [activeSize, setActiveSize] = useState(0);

    const cartItemsById = useSelector(state => state.cartSlice.items.filter(item => item.pizzaID === pizzaID));
    // const addedCount = useSelector(state => state.cartSlice.items.reduce((sum, item) => {
    //     if (item.pizzaID === pizzaID) {
    //         return sum + item.count;
    //     }
    // }, 0));

    const totalCountItemsById = cartItemsById.reduce((sum, item) => {
        return sum + item.count;
    }, 0);

    // const addedCount = cartItems ? cartItems.count : 0;

    const dispatch = useDispatch();

    const handleAddItem = () => {
        const item = {
            pizzaID,
            title,
            price,
            imageUrl,
            type: types[activeType],
            size: sizes[activeSize]
        }
        dispatch(addItem(item));
    }

    return (
        <div className="pizza-block-wrapper">
            <div className="pizza-block">
                <img
                    className="pizza-block__image"
                    src={imageUrl}
                    alt={title}
                />
                <h4 className="pizza-block__title">{title}</h4>
                <div className="pizza-block__selector">
                    <ul>
                        {
                            types.map((typeName, index) => <li key={index} className={activeType === index ? 'active' : ''} onClick={() => setActiveType(index)}>{typeName}</li>)
                        }
                    </ul>
                    <ul>
                        {
                            sizes.map((size, i) => (
                                <li key={i} className={activeSize === i ? 'active' : ''} onClick={() => setActiveSize(i)}>{size} см.</li>
                            ))
                        }
                    </ul>
                </div>
                <div className="pizza-block__bottom">
                    <div className="pizza-block__price">{price} ₴</div>
                    <div className="button button--outline button--add" onClick={handleAddItem}>
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                                fill="white"
                            />
                        </svg>
                        <span>Добавити</span>
                        {totalCountItemsById > 0 && <i>{totalCountItemsById}</i>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductBlock;