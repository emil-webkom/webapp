import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="h-full flex flex-col items-center justify-center bg-slate-950">
      <div className="space-y-6 text-center">
        <h1 className="text-6xl font-semibold text-white">Auth</h1>
        <p className="text-lg text-white">Login page for EMIL</p>
        <div>
          <LoginButton>
            <Button variant="secondary" size="lg">
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
























