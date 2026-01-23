import { Switch, Route, Router as WouterRouter } from "wouter"; // 1. Renamed import
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import VaultPage from "@/pages/vault";

// 2. Renamed this function to Navigation to avoid conflict
function Navigation() {
  return (
    <Switch>
      <Route path="/" component={VaultPage} />
      <Route path="/chat" component={VaultPage} />
      <Route path="/feed" component={VaultPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* 3. Wrapped Navigation in WouterRouter with the base path */}
      <WouterRouter base="/TorryVault">
        <TooltipProvider>
          <Toaster />
          <Navigation />
        </TooltipProvider>
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;