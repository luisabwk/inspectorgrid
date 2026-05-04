import { useSignIn, useSignUp, useUser } from "@clerk/clerk-react";
import { Eye, EyeOff, Loader2, Search } from "lucide-react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

type Mode = "signIn" | "signUp" | "verifyEmail" | "forgotPassword" | "resetPassword";

const emailSchema = z.string().email("Email inválido");
const passwordSchema = z.string().min(8, "Senha deve ter pelo menos 8 caracteres");
const displayNameSchema = z.string().min(2, "Nome deve ter pelo menos 2 caracteres");

const errorMessage = (err: unknown): string => {
  if (typeof err === "object" && err !== null && "errors" in err) {
    const arr = (err as { errors?: Array<{ message?: string; longMessage?: string }> }).errors;
    if (Array.isArray(arr) && arr[0]) return arr[0].longMessage || arr[0].message || "Erro desconhecido";
  }
  return err instanceof Error ? err.message : "Erro desconhecido";
};

const Auth = () => {
  const { isSignedIn } = useUser();
  const { isLoaded: signInLoaded, signIn, setActive: setSignInActive } = useSignIn();
  const { isLoaded: signUpLoaded, signUp, setActive: setSignUpActive } = useSignUp();
  const { toast } = useToast();

  const [mode, setMode] = useState<Mode>("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [code, setCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (isSignedIn) return <Navigate to="/" replace />;

  const switchMode = (next: Mode) => {
    setMode(next);
    setErrors({});
    setCode("");
    if (next === "signIn" || next === "signUp") setPassword("");
  };

  const validate = (fields: { email?: boolean; password?: boolean; displayName?: boolean }) => {
    const next: Record<string, string> = {};
    if (fields.email) {
      const r = emailSchema.safeParse(email);
      if (!r.success) next.email = r.error.errors[0].message;
    }
    if (fields.password) {
      const r = passwordSchema.safeParse(password);
      if (!r.success) next.password = r.error.errors[0].message;
    }
    if (fields.displayName) {
      const r = displayNameSchema.safeParse(displayName);
      if (!r.success) next.displayName = r.error.errors[0].message;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate({ email: true, password: true })) return;
    if (!signInLoaded) return;
    setIsLoading(true);
    try {
      const result = await signIn.create({ identifier: email, password });
      if (result.status === "complete") {
        await setSignInActive({ session: result.createdSessionId });
      } else {
        toast({ title: "Quase lá", description: "Mais um passo necessário.", variant: "destructive" });
      }
    } catch (err) {
      toast({ title: "Erro ao entrar", description: errorMessage(err), variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate({ email: true, password: true, displayName: true })) return;
    if (!signUpLoaded) return;
    setIsLoading(true);
    try {
      await signUp.create({
        emailAddress: email,
        password,
        unsafeMetadata: { displayName },
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      switchMode("verifyEmail");
      toast({ title: "Código enviado", description: "Verifique seu email." });
    } catch (err) {
      toast({ title: "Erro ao registrar", description: errorMessage(err), variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpLoaded) return;
    if (code.length < 6) {
      setErrors({ code: "Digite o código de 6 dígitos" });
      return;
    }
    setIsLoading(true);
    try {
      const result = await signUp.attemptEmailAddressVerification({ code });
      if (result.status === "complete") {
        await setSignUpActive({ session: result.createdSessionId });
      } else {
        toast({ title: "Código inválido", variant: "destructive" });
      }
    } catch (err) {
      toast({ title: "Erro ao verificar", description: errorMessage(err), variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate({ email: true })) return;
    if (!signInLoaded) return;
    setIsLoading(true);
    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });
      switchMode("resetPassword");
      toast({ title: "Código enviado", description: "Verifique seu email para redefinir a senha." });
    } catch (err) {
      toast({ title: "Erro", description: errorMessage(err), variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate({ password: true })) return;
    if (!signInLoaded) return;
    if (code.length < 6) {
      setErrors((prev) => ({ ...prev, code: "Digite o código de 6 dígitos" }));
      return;
    }
    setIsLoading(true);
    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });
      if (result.status === "complete") {
        await setSignInActive({ session: result.createdSessionId });
      } else {
        toast({ title: "Não foi possível redefinir", variant: "destructive" });
      }
    } catch (err) {
      toast({ title: "Erro ao redefinir", description: errorMessage(err), variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (!signInLoaded) return;
    setIsGoogleLoading(true);
    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: `${window.location.origin}/sso-callback`,
        redirectUrlComplete: `${window.location.origin}/`,
      });
    } catch (err) {
      toast({ title: "Erro ao entrar com Google", description: errorMessage(err), variant: "destructive" });
      setIsGoogleLoading(false);
    }
  };

  const description = {
    signIn: "Entre para continuar sua investigação",
    signUp: "Registre-se para começar a investigar",
    verifyEmail: `Digite o código enviado para ${email}`,
    forgotPassword: "Digite seu email para receber um código",
    resetPassword: "Digite o código e sua nova senha",
  }[mode];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md relative z-10 pixel-card">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-14 h-14 flex items-center justify-center bg-primary pixel-border">
            <Search className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="font-pixel-title text-lg text-foreground">InspectorGrid</CardTitle>
            <CardDescription className="text-muted-foreground mt-2 font-pixel text-base">
              {description}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          {mode === "signIn" && (
            <SignInForm
              email={email}
              password={password}
              showPassword={showPassword}
              isLoading={isLoading}
              isGoogleLoading={isGoogleLoading}
              errors={errors}
              onEmailChange={setEmail}
              onPasswordChange={setPassword}
              onTogglePassword={() => setShowPassword((v) => !v)}
              onSubmit={handleSignIn}
              onGoogle={handleGoogleSignIn}
              onForgot={() => switchMode("forgotPassword")}
              onSwitchToSignUp={() => switchMode("signUp")}
            />
          )}
          {mode === "signUp" && (
            <SignUpForm
              email={email}
              password={password}
              displayName={displayName}
              showPassword={showPassword}
              isLoading={isLoading}
              isGoogleLoading={isGoogleLoading}
              errors={errors}
              onEmailChange={setEmail}
              onPasswordChange={setPassword}
              onDisplayNameChange={setDisplayName}
              onTogglePassword={() => setShowPassword((v) => !v)}
              onSubmit={handleSignUp}
              onGoogle={handleGoogleSignIn}
              onSwitchToSignIn={() => switchMode("signIn")}
            />
          )}
          {mode === "verifyEmail" && (
            <CodeForm
              code={code}
              isLoading={isLoading}
              errors={errors}
              submitLabel="Verificar email"
              onCodeChange={setCode}
              onSubmit={handleVerifyEmail}
              onBack={() => switchMode("signUp")}
            />
          )}
          {mode === "forgotPassword" && (
            <ForgotPasswordForm
              email={email}
              isLoading={isLoading}
              errors={errors}
              onEmailChange={setEmail}
              onSubmit={handleForgotPassword}
              onBack={() => switchMode("signIn")}
            />
          )}
          {mode === "resetPassword" && (
            <ResetPasswordForm
              code={code}
              password={password}
              showPassword={showPassword}
              isLoading={isLoading}
              errors={errors}
              onCodeChange={setCode}
              onPasswordChange={setPassword}
              onTogglePassword={() => setShowPassword((v) => !v)}
              onSubmit={handleResetPassword}
              onBack={() => switchMode("signIn")}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const PixelButton = ({
  isLoading,
  loadingLabel,
  label,
  disabled,
}: {
  isLoading: boolean;
  loadingLabel: string;
  label: string;
  disabled?: boolean;
}) => (
  <Button type="submit" className="w-full pixel-btn text-lg h-12" disabled={isLoading || disabled}>
    {isLoading ? (
      <>
        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
        {loadingLabel}
      </>
    ) : (
      label
    )}
  </Button>
);

const PasswordInput = ({
  value,
  onChange,
  show,
  onToggle,
  disabled,
  id = "password",
}: {
  value: string;
  onChange: (v: string) => void;
  show: boolean;
  onToggle: () => void;
  disabled?: boolean;
  id?: string;
}) => (
  <div className="relative">
    <Input
      id={id}
      type={show ? "text" : "password"}
      placeholder="••••••••"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="pixel-input pr-10"
      disabled={disabled}
    />
    <button
      type="button"
      onClick={onToggle}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
    >
      {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
    </button>
  </div>
);

const GoogleButton = ({
  isLoading,
  disabled,
  onClick,
}: {
  isLoading: boolean;
  disabled?: boolean;
  onClick: () => void;
}) => (
  <Button
    type="button"
    variant="outline"
    className="w-full pixel-border-thin h-12 text-base"
    onClick={onClick}
    disabled={disabled}
  >
    {isLoading ? (
      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
    ) : (
      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
      </svg>
    )}
    Entrar com Google
  </Button>
);

const FieldError = ({ message }: { message?: string }) =>
  message ? <p className="text-sm text-destructive font-pixel">{message}</p> : null;

const SignInForm = (props: {
  email: string;
  password: string;
  showPassword: boolean;
  isLoading: boolean;
  isGoogleLoading: boolean;
  errors: Record<string, string>;
  onEmailChange: (v: string) => void;
  onPasswordChange: (v: string) => void;
  onTogglePassword: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onGoogle: () => void;
  onForgot: () => void;
  onSwitchToSignUp: () => void;
}) => (
  <>
    <form onSubmit={props.onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-foreground font-pixel text-base">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="detetive@email.com"
          value={props.email}
          onChange={(e) => props.onEmailChange(e.target.value)}
          className="pixel-input"
          disabled={props.isLoading}
        />
        <FieldError message={props.errors.email} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password" className="text-foreground font-pixel text-base">Senha</Label>
        <PasswordInput
          value={props.password}
          onChange={props.onPasswordChange}
          show={props.showPassword}
          onToggle={props.onTogglePassword}
          disabled={props.isLoading}
        />
        <FieldError message={props.errors.password} />
        <div className="text-right">
          <button
            type="button"
            onClick={props.onForgot}
            className="text-sm text-muted-foreground hover:text-primary transition-colors font-pixel"
            disabled={props.isLoading || props.isGoogleLoading}
          >
            Esqueci minha senha
          </button>
        </div>
      </div>
      <PixelButton isLoading={props.isLoading} loadingLabel="Entrando..." label="Entrar" />
    </form>
    <Divider />
    <GoogleButton
      isLoading={props.isGoogleLoading}
      disabled={props.isLoading || props.isGoogleLoading}
      onClick={props.onGoogle}
    />
    <BottomToggle
      onClick={props.onSwitchToSignUp}
      disabled={props.isLoading || props.isGoogleLoading}
      prompt="Novo por aqui?"
      action="Criar conta"
    />
    <CaptchaSlot />
  </>
);

const SignUpForm = (props: {
  email: string;
  password: string;
  displayName: string;
  showPassword: boolean;
  isLoading: boolean;
  isGoogleLoading: boolean;
  errors: Record<string, string>;
  onEmailChange: (v: string) => void;
  onPasswordChange: (v: string) => void;
  onDisplayNameChange: (v: string) => void;
  onTogglePassword: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onGoogle: () => void;
  onSwitchToSignIn: () => void;
}) => (
  <>
    <form onSubmit={props.onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="displayName" className="text-foreground font-pixel text-base">Nome de Detetive</Label>
        <Input
          id="displayName"
          type="text"
          placeholder="Seu codinome"
          value={props.displayName}
          onChange={(e) => props.onDisplayNameChange(e.target.value)}
          className="pixel-input"
          disabled={props.isLoading}
        />
        <FieldError message={props.errors.displayName} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email" className="text-foreground font-pixel text-base">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="detetive@email.com"
          value={props.email}
          onChange={(e) => props.onEmailChange(e.target.value)}
          className="pixel-input"
          disabled={props.isLoading}
        />
        <FieldError message={props.errors.email} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password" className="text-foreground font-pixel text-base">Senha</Label>
        <PasswordInput
          value={props.password}
          onChange={props.onPasswordChange}
          show={props.showPassword}
          onToggle={props.onTogglePassword}
          disabled={props.isLoading}
        />
        <FieldError message={props.errors.password} />
      </div>
      <PixelButton isLoading={props.isLoading} loadingLabel="Registrando..." label="Registrar" />
    </form>
    <Divider />
    <GoogleButton
      isLoading={props.isGoogleLoading}
      disabled={props.isLoading || props.isGoogleLoading}
      onClick={props.onGoogle}
    />
    <BottomToggle
      onClick={props.onSwitchToSignIn}
      disabled={props.isLoading || props.isGoogleLoading}
      prompt="Já tem conta?"
      action="Fazer login"
    />
    <CaptchaSlot />
  </>
);

const CodeForm = (props: {
  code: string;
  isLoading: boolean;
  errors: Record<string, string>;
  submitLabel: string;
  onCodeChange: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}) => (
  <form onSubmit={props.onSubmit} className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="code" className="text-foreground font-pixel text-base">Código</Label>
      <Input
        id="code"
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        placeholder="123456"
        value={props.code}
        onChange={(e) => props.onCodeChange(e.target.value.replace(/\D/g, "").slice(0, 6))}
        className="pixel-input tracking-widest text-center text-lg"
        disabled={props.isLoading}
      />
      <FieldError message={props.errors.code} />
    </div>
    <PixelButton isLoading={props.isLoading} loadingLabel="Verificando..." label={props.submitLabel} />
    <BackButton onClick={props.onBack} disabled={props.isLoading} label="Voltar" />
  </form>
);

const ForgotPasswordForm = (props: {
  email: string;
  isLoading: boolean;
  errors: Record<string, string>;
  onEmailChange: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}) => (
  <form onSubmit={props.onSubmit} className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="email" className="text-foreground font-pixel text-base">Email</Label>
      <Input
        id="email"
        type="email"
        placeholder="detetive@email.com"
        value={props.email}
        onChange={(e) => props.onEmailChange(e.target.value)}
        className="pixel-input"
        disabled={props.isLoading}
      />
      <FieldError message={props.errors.email} />
    </div>
    <PixelButton isLoading={props.isLoading} loadingLabel="Enviando..." label="Enviar código" />
    <BackButton onClick={props.onBack} disabled={props.isLoading} label="Voltar para login" />
  </form>
);

const ResetPasswordForm = (props: {
  code: string;
  password: string;
  showPassword: boolean;
  isLoading: boolean;
  errors: Record<string, string>;
  onCodeChange: (v: string) => void;
  onPasswordChange: (v: string) => void;
  onTogglePassword: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}) => (
  <form onSubmit={props.onSubmit} className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="code" className="text-foreground font-pixel text-base">Código</Label>
      <Input
        id="code"
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        placeholder="123456"
        value={props.code}
        onChange={(e) => props.onCodeChange(e.target.value.replace(/\D/g, "").slice(0, 6))}
        className="pixel-input tracking-widest text-center text-lg"
        disabled={props.isLoading}
      />
      <FieldError message={props.errors.code} />
    </div>
    <div className="space-y-2">
      <Label htmlFor="password" className="text-foreground font-pixel text-base">Nova senha</Label>
      <PasswordInput
        value={props.password}
        onChange={props.onPasswordChange}
        show={props.showPassword}
        onToggle={props.onTogglePassword}
        disabled={props.isLoading}
      />
      <FieldError message={props.errors.password} />
    </div>
    <PixelButton isLoading={props.isLoading} loadingLabel="Salvando..." label="Salvar nova senha" />
    <BackButton onClick={props.onBack} disabled={props.isLoading} label="Voltar para login" />
  </form>
);

const Divider = () => (
  <div className="relative my-6">
    <Separator className="bg-border" />
    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-xs text-muted-foreground font-pixel">
      ou
    </span>
  </div>
);

const BottomToggle = ({
  onClick,
  disabled,
  prompt,
  action,
}: {
  onClick: () => void;
  disabled?: boolean;
  prompt: string;
  action: string;
}) => (
  <div className="mt-6 text-center">
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="text-base text-muted-foreground hover:text-primary transition-colors font-pixel"
    >
      {prompt} <span className="text-primary font-bold">{action}</span>
    </button>
  </div>
);

const BackButton = ({
  onClick,
  disabled,
  label,
}: {
  onClick: () => void;
  disabled?: boolean;
  label: string;
}) => (
  <div className="text-center">
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="text-base text-muted-foreground hover:text-primary transition-colors font-pixel"
    >
      {label}
    </button>
  </div>
);

// Required by Clerk for bot protection on sign-up.
const CaptchaSlot = () => <div id="clerk-captcha" />;

export default Auth;
