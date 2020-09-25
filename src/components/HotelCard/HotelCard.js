// import React from "react";

// const HotelCard = (props) => {
// 	const {beds,price,rooms,guest,features,ratings,totalRating,bathrooms,imgUrl} = props.hotel;
// 	return (
// 		<div className="hotel-card d-flex my-4 align-items-lg-center">
// 			<div className="img mr-4">
// 				<img src={imgUrl} alt="" style={{ maxWidth: "270px" }} />
// 			</div>
// 			<div className="info">
// 				<h4>{}</h4>
// 				<p>
// 					{guest} guest, {rooms} rooms, {beds} beds,{" "}
// 					{bathrooms} bathrooms
// 				</p>
// 				<p>{features[0]}</p>
// 				<p>{features[1]}</p>
// 				<p className="ratings d-flex">
// 					<small>
// 						<strong>
// 							{ratings}({totalRating})
// 						</strong>
// 					</small>
// 					<strong>${price}</strong>
// 					<del>$99 discount</del>
// 				</p>
// 			</div>
// 		</div>
// 	);
// };

// export default HotelCard;

import React from "react";
import { Col, Row } from "react-bootstrap";
import { hotelsInfo } from "../../fakeData/hotelsInfo";
import { GoogleMap } from "../Map/GoogleMap";
import Map from "../Map/Map";
import Map2 from "../Map/Map2";

const HotelCard = (props) => {
  console.log(props.hotels);

  return (
    <div className="">
      {hotelsInfo.map((hotel) => (
        <div>
          <Row className="col-lg-6">
            <Col>
              <img src={hotel.imgUrl} height="200px" alt="" />
            </Col>
            <Col>
              <h2>{hotel.title}</h2>
              <h3>Guest:{hotel.guest}</h3>
              <h3>Room:{hotel.rooms}</h3>
              <h3>Bed:{hotel.beds}</h3>
            </Col>
          </Row>

		  
        </div>
      ))}
      {/* <GoogleMap></GoogleMap> */}
	  <Row className="col-lg-12">
            <Col>
			<Map2></Map2>
            </Col>
            
          </Row>
      
    </div>


  );
};

export default HotelCard;
