import styled from 'styled-components';
import Start from './pages/Start';

const Main = styled.main`
  box-sizing: border-box;
  width: 100%;
  max-width: 500px;
  padding: 0 35px;
  margin: auto;
  text-align: center;
`;
function App() {
  return (
    <Main>
      <Start />
    </Main>
  );
}

export default App;
