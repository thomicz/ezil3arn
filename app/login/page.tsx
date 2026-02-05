import LoginForm from "@/components/Login";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="w-full max-w-sm border rounded-xl p-8">
                <h1 className="text-2xl font-bold mb-2">Přihlášení</h1>

                <LoginForm />
            </div>
        </div>
    );
}
