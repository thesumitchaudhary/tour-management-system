
import { useState } from "react";
import "./BusSeatLayout.css";

const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];

const bookedSeats = ["A2", "B3", "D1", "F4"];

export default function BusSeatLayout() {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const seats = [
    { number: 4, x: 24 },
    { number: 3, x: 53 },
    { number: 2, x: 107 },
    { number: 1, x: 136 },
  ];

  const toggleSeat = (seatId: string) => {
    if (bookedSeats.includes(seatId)) return;

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((seat) => seat !== seatId)
        : [...prev, seatId]
    );
  };

  const getSeatClass = (seatId: string) => {
    if (bookedSeats.includes(seatId)) return "booked";
    if (selectedSeats.includes(seatId)) return "selected";
    return "available";
  };

  return (
    <div className="bus-container">

      <h2>Select Your Seats</h2>

      <svg viewBox="0 0 180 390" className="bus-svg">

        {/* Bus outline */}
        <rect
          x="13"
          y="5"
          width="154"
          height="380"
          rx="5"
          className="bus-body"
        />

        {/* Seat rows */}
        {rows.map((row, rowIndex) => (
          <g key={row}>
            {seats.map((seat) => {
              const seatId = `${row}${seat.number}`;

              return (
                <g
                  key={seatId}
                  className="seat"
                  role="button"
                  tabIndex={bookedSeats.includes(seatId) ? -1 : 0}
                  aria-label={`Seat ${seatId}`}
                  aria-pressed={selectedSeats.includes(seatId)}
                  aria-disabled={bookedSeats.includes(seatId)}
                  onClick={() => toggleSeat(seatId)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleSeat(seatId);
                    }
                  }}
                  style={{
                    cursor: bookedSeats.includes(seatId)
                      ? "not-allowed"
                      : "pointer",
                  }}
                >
                  <rect
                    x={seat.x}
                    y={16 + rowIndex * 45}
                    width="20"
                    height="25"
                    rx="3"
                    className={getSeatClass(seatId)}
                  />

                  <text
                    x={seat.x + 10}
                    y={32 + rowIndex * 45}
                    className="seat-text"
                  >
                    {seatId}
                  </text>
                </g>
              );
            })}
          </g>
        ))}
      </svg>

      {/* Legend */}
      <div className="legend">
        <span>🟩 Selected</span>
        <span>⬜ Available</span>
        <span>🟥 Booked</span>
      </div>

      {/* Selected seats */}
      <div className="selected-info">
        <h3>Selected Seats</h3>

        <p>
          {selectedSeats.length > 0
            ? selectedSeats.join(", ")
            : "No seats selected"}
        </p>

        <h3>
          Total: ₹{selectedSeats.length * 500}
        </h3>

        <button
          disabled={selectedSeats.length === 0}
          onClick={() =>
            alert(`Selected seats: ${selectedSeats.join(", ")}`)
          }
        >
          Continue Booking
        </button>
      </div>

    </div>
  );
}
