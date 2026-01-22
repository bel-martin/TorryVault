import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import VaultPage from "@/pages/vault";

function Router() {
  return (
    <Switch>
      <Route path="/" component={VaultPage} />
      <Route path="/chat" component={VaultPage} /> {/* Reuse vault for demo purposes */}
      <Route path="/feed" component={VaultPage} /> {/* Reuse vault for demo purposes */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
