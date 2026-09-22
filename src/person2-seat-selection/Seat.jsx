import React from "react";

function Seat({
  seatNumber,
  isBooked,
  isSelected,
  onClick
}) {

  let className = "seat available";


  if (isBooked) {

    className = "seat booked";

  } else if (isSelected) {

    className = "seat selected";

  }


  return (

    <button
      className={className}
      disabled={isBooked}
      onClick={onClick}
    >
      {seatNumber}
    </button>

  );

}

export default Seat;