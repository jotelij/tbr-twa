import "./App.css";
import React from 'react';
import Dashboard from './pages/Dashboard';
import "@twa-dev/sdk";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import RootLayout from "./layouts/RootLayout";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="create" element={<Dashboard />} />
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router}  />
  )
}


// function App() {
//   const { network } = useTonConnect();

//   return (
//     <StyledApp>
//       <AppContainer>
//         <FlexBoxCol>
//           <FlexBoxRow>
//             <TonConnectButton />
//             <Button>
//               {network
//                 ? network === CHAIN.MAINNET
//                   ? "mainnet"
//                   : "testnet"
//                 : "N/A"}
//             </Button>
//           </FlexBoxRow>
          
//           <BirrTokenComp />
//         </FlexBoxCol>
//       </AppContainer>
//     </StyledApp>
//   );
// }

export default App;
