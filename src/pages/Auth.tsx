import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Loader2, Search } from "lucide-react";
import { z } from "zod";

const authSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  displayName: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").optional(),
});

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        navigate("/");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const validateForm = () => {
    try {
      authSchema.parse({
        email,
        password,
        displayName: isLogin ? undefined : displayName,
      });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast({
              title: "Credenciais inválidas",
              description: "Email ou senha incorretos. Tente novamente.",
              variant: "destructive",
            });
          } else if (error.message.includes("Email not confirmed")) {
            toast({
              title: "Email não confirmado",
              description: "Por favor, verifique seu email para confirmar sua conta.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Erro ao entrar",
              description: error.message,
              variant: "destructive",
            });
          }
          return;
        }

        toast({
          title: "Bem-vindo, detetive!",
          description: "Prepare-se para resolver casos misteriosos.",
        });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              display_name: displayName,
            },
          },
        });

        if (error) {
          if (error.message.includes("already registered")) {
            toast({
              title: "Email já cadastrado",
              description: "Este email já está em uso. Tente fazer login.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Erro ao cadastrar",
              description: error.message,
              variant: "destructive",
            });
          }
          return;
        }

        toast({
          title: "Cadastro realizado!",
          description: "Verifique seu email para confirmar sua conta.",
        });
      }
    } catch (error) {
      toast({
        title: "Erro inesperado",
        description: "Algo deu errado. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Pixel art background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Sky gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, hsl(200 70% 75%) 0%, hsl(35 45% 85%) 100%)'
          }}
        />
        {/* Decorative pixel clouds */}
        <div className="absolute top-10 left-[10%] w-24 h-8 bg-white/80" style={{ clipPath: 'polygon(0 50%, 15% 0, 85% 0, 100% 50%, 85% 100%, 15% 100%)' }} />
        <div className="absolute top-20 right-[15%] w-32 h-10 bg-white/70" style={{ clipPath: 'polygon(0 50%, 15% 0, 85% 0, 100% 50%, 85% 100%, 15% 100%)' }} />
        <div className="absolute top-8 right-[35%] w-20 h-6 bg-white/60" style={{ clipPath: 'polygon(0 50%, 15% 0, 85% 0, 100% 50%, 85% 100%, 15% 100%)' }} />
        
        {/* Ground */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            background: 'linear-gradient(180deg, hsl(120 35% 45%) 0%, hsl(120 40% 35%) 100%)'
          }}
        />
        {/* Grass detail */}
        <div className="absolute bottom-28 left-0 right-0 h-6 overflow-hidden flex">
          {Array.from({ length: 60 }).map((_, i) => (
            <div 
              key={i} 
              className="flex-shrink-0 w-3 h-5" 
              style={{ 
                backgroundColor: `hsl(${115 + (i % 3) * 8} ${35 + (i % 2) * 10}% ${40 + (i % 4) * 5}%)`,
                clipPath: 'polygon(50% 0, 100% 100%, 0 100%)'
              }} 
            />
          ))}
        </div>
      </div>

      {/* Main card */}
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
              {isLogin ? "Entre para continuar sua investigação" : "Registre-se para começar a investigar"}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="displayName" className="text-foreground font-pixel text-base">
                  Nome de Detetive
                </Label>
                <Input
                  id="displayName"
                  type="text"
                  placeholder="Seu codinome"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="pixel-input"
                  disabled={isLoading}
                />
                {errors.displayName && (
                  <p className="text-sm text-destructive font-pixel">{errors.displayName}</p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-pixel text-base">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="detetive@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pixel-input"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-sm text-destructive font-pixel">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground font-pixel text-base">
                Senha
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pixel-input pr-10"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive font-pixel">{errors.password}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full pixel-btn text-lg h-12"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  {isLogin ? "Entrando..." : "Registrando..."}
                </>
              ) : (
                isLogin ? "Entrar" : "Registrar"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setErrors({});
              }}
              className="text-base text-muted-foreground hover:text-primary transition-colors font-pixel"
              disabled={isLoading}
            >
              {isLogin ? (
                <>Novo por aqui? <span className="text-primary font-bold">Criar conta</span></>
              ) : (
                <>Já tem conta? <span className="text-primary font-bold">Fazer login</span></>
              )}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
