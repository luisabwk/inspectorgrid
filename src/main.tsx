import { ClerkProvider } from "@clerk/clerk-react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error("VITE_CLERK_PUBLISHABLE_KEY is not set");
}

createRoot(document.getElementById("root")!).render(
  <ClerkProvider publishableKey={publishableKey} afterSignOutUrl="/auth">
    <App />
  </ClerkProvider>
);
