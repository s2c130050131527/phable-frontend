import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { ChakraProvider } from "@chakra-ui/react"
import { lazy, Suspense } from 'react';

const NotFound = lazy(() => import('./components/NotFound'));
const Home = lazy(() => import('./components/Home'));


function App() {
  return (
    <Suspense fallback="...">
      <ChakraProvider>
        <BrowserRouter>
          <div className="App">
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route component={NotFound}></Route>
            </Switch>
          </div>
        </BrowserRouter>
      </ChakraProvider>
    </Suspense>


  );
}

export default App;
