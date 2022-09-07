import "../styles/TodaysShowsComponent.css";

const TodaysShowsComponent = () => {
  const eventInfo = [
    {
      artist: "Kendrick Lamar",
      img: "src/assets/KonsertGen.jpg",
      arena: "Hovet",
      info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum necessitatibus obcaecati dicta dignissimos delectus facilis atque fugiat, excepturi dolore recusandae minus non, error enim id facere animi iste commodi perspiciatis!",
      datum: "2023-01-01",
    },
    {
      artist: "Spajs Görls",
      img: "src/assets/KonsertGen2.jpg",
      arena: "Gamla Ullevi",
      info: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur explicabo unde pariatur eum. Pariatur possimus tenetur id iste rem odio adipisci quod aspernatur voluptatum vel assumenda voluptates, maiores animi distinctio! ",
      datum: "2023-02-02",
    },
    {
      artist: "Mother Mother",
      img: "src/assets/KonsertGen3.jpg",
      arena: "Nya Ullevi",
      info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum quo obcaecati quaerat libero perferendis atque voluptatibus possimus labore debitis corporis vero nam commodi, quisquam maiores nostrum iure recusandae impedit aut! ",
      datum: "2023-03-03",
    },
    {
      artist: "Arne Quick",
      img: "src/assets/KonsertGen4.jpg",
      arena: "Stora Ullevi",
      info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum quo obcaecati quaerat libero perferendis atque voluptatibus possimus labore debitis corporis vero nam commodi, quisquam maiores nostrum iure recusandae impedit aut! ",
      datum: "2023-04-04",
    },
  ];

  return (
    <>
      <div className="main">
        
        {eventInfo.map((show) => (
          <div className="subpic">
            <img src={show.img}></img>
            <div className="cinfo">
              <div className="divcol">
                <h5>{show.artist}</h5>
                <h5>{show.arena}</h5>
                <h5>{show.datum}</h5>
              </div>
              <p>{show.info}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TodaysShowsComponent;
