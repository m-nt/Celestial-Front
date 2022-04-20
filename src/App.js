
import { router } from "./utility/Router";


import { Routes } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Route } from 'react-router-dom';
 
function App() {
  return (
    <>
    <Helmet titleTemplate="CELESTIAL" defaultTitle="CELESTIAL">
      <meta name="description" content="This is CELESTIAL" />
    </Helmet>
    
    <Routes>
      {router.map((route, i) =>
      <Route path={route.path} element={<route.component />} key={i}/>
      )}
    </Routes>

  </>
  );
}

export default App;
