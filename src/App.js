import { useEffect, useState } from "react";

import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import ProductBlock from "./components/ProductBlock";

import './scss/app.scss';

// import pizzas from './db.json';

function App() {
	const [items, setItems] = useState([]);
	useEffect(() => {
		fetch('http://apiserver/items').then((res) => res.json()).then((arr) => {
			setItems(arr);
		})
	}, []);
  	return (
      	<div className="wrapper">
          	<Header />
          	<div className="content">
			  	<div className="container">
			  		<div className="content__top">
				  		<Categories />
                      	<Sort />
                  	</div>
                  	<h2 className="content__title">Все пиццы</h2>
                  	<div className="content__items">
					  	{
						  	items.map((pizza) => (
							  	<ProductBlock {...pizza} key={pizza.pizzaID} />
						  	))
					  	}
                  	</div>
              	</div>
          	</div>
      	</div>
  	);
}

export default App;
