import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import { Loader2 } from "lucide-react";

const SSOCallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="text-center">
      <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
      <p className="text-muted-foreground font-pixel text-sm">Finalizando login...</p>
    </div>
    <AuthenticateWithRedirectCallback signInForceRedirectUrl="/" signUpForceRedirectUrl="/" />
  </div>
);

export default SSOCallback;
