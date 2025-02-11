import "react";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";
import BookingForm from "./components/BookingForm";

const App = () => (
  <ApolloProvider client={client}>
    <BookingForm />
  </ApolloProvider>
);

export default App;
