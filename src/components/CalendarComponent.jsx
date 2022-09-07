import "../styles/CalendarComponent.css";

const CalendarComponent = () => {
  const exampleData = [
    {
      artist: "Deafhaven",
      location: "Göteborg",
      date: "04-06-2022",
    },
    {
      artist: "King Krule",
      location: "Stockholm",
      date: "04-06-2022",
    },
    {
      artist: "Sheer Mag",
      location: "Stockholm",
      date: "04-06-2022",
    },
  ];

  return (
    <>
      {exampleData.map((data) => (
        <div className="calendar-cards">
          <div className="card">
            <div className="date">{data.date}</div>
            <div className="info">
              <div className="artist">{data.artist}</div>
              <div className="location">{data.location}</div>
            </div>
            <span class="material-symbols-outlined">arrow_forward</span>
          </div>
        </div>
      ))}
    </>
  );
};

export default CalendarComponent;
