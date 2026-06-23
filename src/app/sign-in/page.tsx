import SignInButton from "./components/SignInButton"

export default function SignInPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="w-full max-w-md rounded-xl border bg-card p-8 shadow-sm">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold">Sign in to continue</h1>
          <p className="text-sm text-muted-foreground">
            App is available to authenticated users only.
          </p>
        </div>

        <div className="mt-6 flex justify-center">
          <SignInButton />
        </div>
      </div>
    </main>
  )
}
