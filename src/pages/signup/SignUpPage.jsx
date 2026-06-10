import { LoginForm } from "@/components/login-form"

export default function SignUpPage() {
  return (
    <div className="bg-muted flex min-h-svh items-center justify-center p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          Dental Clinic Management System
        </a>
        <LoginForm mode="signup" />
      </div>
    </div>
  )
}
