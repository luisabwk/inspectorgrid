import { SignedIn, SignedOut, SignIn, SignUp } from "@clerk/clerk-react";
import { Search } from "lucide-react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Auth = () => {
  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");

  return (
    <>
      <SignedIn>
        <Navigate to="/" replace />
      </SignedIn>
      <SignedOut>
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
          <Card className="w-full max-w-md relative z-10 pixel-card">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-14 h-14 flex items-center justify-center bg-primary pixel-border">
                <Search className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="font-pixel-title text-lg text-foreground">
                  InspectorGrid
                </CardTitle>
                <CardDescription className="text-muted-foreground mt-2 font-pixel text-base">
                  {mode === "signIn"
                    ? "Entre para continuar sua investigação"
                    : "Registre-se para começar a investigar"}
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="flex flex-col items-center gap-4">
              {mode === "signIn" ? (
                <SignIn
                  routing="virtual"
                  signUpUrl="/auth"
                  forceRedirectUrl="/"
                  appearance={{ elements: { footer: { display: "none" } } }}
                />
              ) : (
                <SignUp
                  routing="virtual"
                  signInUrl="/auth"
                  forceRedirectUrl="/"
                  appearance={{ elements: { footer: { display: "none" } } }}
                />
              )}

              <Button
                type="button"
                variant="ghost"
                onClick={() => setMode(mode === "signIn" ? "signUp" : "signIn")}
                className="text-base text-muted-foreground hover:text-primary font-pixel"
              >
                {mode === "signIn" ? (
                  <>
                    Novo por aqui? <span className="text-primary font-bold ml-1">Criar conta</span>
                  </>
                ) : (
                  <>
                    Já tem conta? <span className="text-primary font-bold ml-1">Fazer login</span>
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </SignedOut>
    </>
  );
};

export default Auth;
