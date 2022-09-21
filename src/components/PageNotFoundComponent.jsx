import { useNavigate } from "react-router-dom"

const style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}

const btnStyle = {
  backgroundColor: "#60c7a2",
  color: "#ffffff",
  borderRadius: "5px",
  padding: "5px",
  height: "30px",
  border: "0",
};

const PageNotFoundComponent = () => {
  const navigate = useNavigate()
  return (
    <div style={style}>
      <h1>404 - Page not found</h1>
      <button onClick={() => navigate('/')} style={btnStyle}>Home</button>
    </div>
  )
}

export default PageNotFoundComponent