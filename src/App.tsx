import RouterSetting from "./routes/routerList"
import { BrowserRouter } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <>
      <BrowserRouter>
        <RouterSetting/>
      </BrowserRouter>
      <Analytics/>
    </>
  );
}

export default App
