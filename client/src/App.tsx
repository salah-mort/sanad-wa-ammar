import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/404"} component={NotFound} />
      <Route path={"/summary"} component={Home} />
      <Route path={"/context"} component={Home} />
      <Route path={"/objectives"} component={Home} />
      <Route path={"/measurement"} component={Home} />
      <Route path={"/tracks"} component={Home} />
      <Route path={"/campaign"} component={Home} />
      <Route path={"/plan"} component={Home} />
      <Route path={"/methodology"} component={Home} />
      <Route path={"/budget"} component={Home} />
      <Route path={"/cost-efficiency"} component={Home} />
      <Route path={"/risks"} component={Home} />
      <Route path={"/sustainability"} component={Home} />
      <Route path={"/faq"} component={Home} />
      <Route path={"/partnership"} component={Home} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
