import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Switch, Route } from "wouter";
import Home from "./pages/Home";
import NotFound from "./pages/not-found";
import { GameProvider } from "./components/GameElements";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GameProvider>
        <Router />
      </GameProvider>
    </QueryClientProvider>
  );
}

export default App;
