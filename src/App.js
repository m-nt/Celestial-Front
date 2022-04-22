
import { router } from "./utility/Router";


import { Routes } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Route } from 'react-router-dom';
 
function App() {
  return (
    <>
    <Helmet titleTemplate="Celestial Verse" defaultTitle="Celestial Verse">
      <meta name="description" content="This is Celestial Verse" />
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
