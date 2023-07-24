import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Import apollo client objects
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
// Import setContext method
import { setContext } from "@apollo/client/link/context";

import SearchBooks from "./pages/SearchBooks";
import SavedBooks from "./pages/SavedBooks";
import Navbar from "./components/Navbar";

// Create GraphQL endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Update context to include JWT token in header to every request
const authLink = setContext((_, { headers }) => {
  // Retrieve token from localStorage
  const token = localStorage.getItem("id_token");

  // Return updated headers object including authorization token if it exists
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// authLink middleware will be executed ahead of GraphQL requests
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    // Create Apollo Provider and pass client prop, this will allow JWT token to be accessed by other components
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<SearchBooks />} />
            <Route path="/saved" element={<SavedBooks />} />
            <Route
              path="*"
              element={<h1 className="display-2">Wrong page!</h1>}
            />
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
