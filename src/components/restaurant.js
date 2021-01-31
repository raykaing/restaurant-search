import React from 'react'

const Restaurant = (props) => {
	return (
		<div className="restaurant-tile">
			<div className="restaurant-rating">
				<p style={{ backgroundColor: `${props.rating_color}` }}>{props.rating}</p>
			</div>
			<img alt="" src={props.thumb} className="restaurant-img" />
			<div className="restaurant-details">
				<h2 className="restaurant-name">{props.name}</h2>
				<div className="restaurant-cost">Average Price ${(props.cost)/2}</div>
				<div className="restaurant-cusines">{props.cuisines}</div> 	
				<div className="restaurant-add">{props.address}</div>

				
			</div>
			
		</div>
	)
}

export default Restaurant
