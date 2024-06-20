import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux-setup/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./shared/components/Layout/Header";
import Menu from "./shared/components/Layout/Menu";
import Slider from "./shared/components/Layout/Slider";
import Sidebar from "./shared/components/Layout/Sidebar";
import Footer from "./shared/components/Layout/Footer";
import publicRoutes from "./routes";
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <div>
            <Header />
            {/*	Body	*/}
            <div id="body">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <Menu />
                  </div>
                </div>
                <div className="row">
                  <div id="main" className="col-lg-8 col-md-12 col-sm-12">
                    <Slider />

                    <Routes>
                  {
                    publicRoutes.map((route,index)=>
                    <Route key={index} path={route.path} element={<route.element/>}/>
                    )
                  }
                      
                    </Routes>
                  </div>
                  <Sidebar />
                </div>
              </div>
            </div>
            {/*	End Body	*/}
            <Footer />
          </div>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};
export default App;
