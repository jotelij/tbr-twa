import "./App.css";
import React from 'react';
import Dashboard from './pages/Dashboard';
import "@twa-dev/sdk";
import { Flex, Spacer, Container, Box } from "@chakra-ui/react";
// import { Outlet } from "react-router-dom";
import { AppTitle } from "./components/AppTitle";
import { ConnectButton } from "./components/ConnectButton";
import Footer from "./components/Footer";
import NetworkBadge from "./components/NetBadge";

// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   Route,
//   RouterProvider
// } from 'react-router-dom';
// import RootLayout from "./layouts/RootLayout";


// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<RootLayout />}>
//       <Route index element={<Dashboard />} />
//       <Route path="create" element={<Dashboard />} />
//     </Route>
//   )
// )

function App() {
  return (
    <>
      {/* <AppBar /> */}
      <NetworkBadge />
      <Box px="20px" py="20px" backgroundColor="#f7f9fb" min-height="100vh">
        {/* <Box padding={["30px 0px", "20px 20px", "20px 70px", "20px 70px"]} backgroundColor="#f7f9fb" min-height="100vh"> */}
        <Box minHeight="90vh">
          <Box fontFamily="Inter" bg="#F7F9FB">
            <Flex alignItems="center">
              <AppTitle title={import.meta.env.VITE_REACT_APP_TITLE || "Blueprint Dapp"} />
              <Spacer />
              <Flex alignItems="center" mt="-6">
                <ConnectButton />
              </Flex>
            </Flex>

            <Container as="main" my="20px">
              <Dashboard />
            </Container>
          </Box>
        </Box>
        <Footer />
      </Box>
    </>
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
