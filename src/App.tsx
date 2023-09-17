import { styled } from "styled-components";
import "./App.css";
import { Carousel } from "./components/Carousel";
import { NavBar } from "./components/NavBar";

const AppContainer = styled.div`
  position: relative;
`;

function App() {
  return (
    <AppContainer>
      <NavBar />
      <Carousel />
    </AppContainer>
  );
}

export default App;
