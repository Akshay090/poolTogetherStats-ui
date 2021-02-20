// pages/index.js

import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { createApolloClient } from "../lib/createApolloClient";
import { TokenSupplies } from "../components/TokenSupplies";
import { Prizes } from "../components/Prizes";
import Nav from "../components/Nav";

let apolloClient = createApolloClient();

const Home = () => (
  <div>
    <ApolloProvider client={apolloClient}>
      <Nav />
      <TokenSupplies />
      <Prizes />
    </ApolloProvider>
  </div>
);

export default Home;
