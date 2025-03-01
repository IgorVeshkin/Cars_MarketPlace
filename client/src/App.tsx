import { Global } from "@emotion/react";
import { FC } from "react";
import Cars from "./pages/Cars/Cars";
import Favorite from "./pages/Cars/Favorite";
import { GLOBAL_STYLES } from "./styles/global.styles";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App: FC = () => {

  return (<BrowserRouter>
      <Routes>

        {/* Route каталога */}
        <Route path="/" element={
          <div>
            <Cars />
            <Global styles={GLOBAL_STYLES} />
          </div>
        } />

        {/* Route избранных */}
        <Route path="/favorite" element={
          <div>
            <Favorite />
            <Global styles={GLOBAL_STYLES} />
          </div>
        } />

      </Routes>
    </BrowserRouter>);
};

export default App;
