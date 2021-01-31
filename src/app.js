import React, { useEffect, useState } from 'react';
import Restaurant from './components/restaurant';
import './main.css';

function App() {

	const [id, setId] = useState();
	const [search, setSearch] = useState("");
	const [query, setQuery] = useState([0, ""]);
	const [restaurant, setRestaurants] = useState([]);

	useEffect(() => {
		getRestaurants();
	}, [query]);

	const getRestaurants = async () => {
		if (!(query[0] === 0 && query[1] === "")) {
			const response = await fetch(
				`https://developers.zomato.com/api/v2.1/search?entity_id=${query[0]}&entity_type=city&q=${query[1]}&count=50`,
				{
					method: 'GET',
					headers: {
						Accept: 'application/json',
						'user-key': '280caaeeb6974396398ecfbd1fa84431'
					}
				}
			);
			const data = await response.json();
			setRestaurants(data.restaurants);
		}
	};

	const getSearch = e => {
		e.preventDefault();
		setQuery([id, search])
	}

	const updateID = e => {
		setId(e.target.value);
	}

	const updateSearch = e => {
		setSearch(e.target.value);
	}


	return (
		<div>
			<div className="container">
				{/* <h1>Discover restaurants</h1> */}
				<form className="searchBar" onSubmit={getSearch}>
					<div>
					<input id="getText" type="text" className="restaurant" placeholder="Restaurant Name" onChange={updateSearch} />
						<select id="select_id" className="city form-control" onChange={updateID}>
							<option value="0" hidden>Location</option>
							<option value="297">Adelaide</option>
							<option value="298" >Brisbane</option>
							<option value="313">Canberra</option>
							<option value="259">Melbourne</option>
							<option value="296">Perth</option>
							<option value="260">Sydney</option>
						</select>
						<button id="getMessage" className="search-btn">Search</button>
					</div>
				</form>
			</div>

			{restaurant.map(rest => (
				<Restaurant
					key={rest.restaurant.id}
					name={rest.restaurant.name}
					thumb={rest.restaurant.thumb}
					cuisines={rest.restaurant.cuisines}
					cost={rest.restaurant.average_cost_for_two}
					rating={rest.restaurant.user_rating.aggregate_rating}
					rating_color={rest.restaurant.user_rating.rating_obj.bg_color.type}
					address={rest.restaurant.location.address}
				/>
			))}
		</div>
	);
}

export default App;