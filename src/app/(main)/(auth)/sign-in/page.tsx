import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { SignInForm } from "@/components";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full flex gap-8 items-center">
        <div className="flex-1 hidden lg:block">
          <Image
            src="/login.png"
            width={705}
            height={609}
            alt="Login illustration"
            className="w-full h-auto object-cover rounded-lg shadow-2xl"
          />
        </div>
        <Card className="flex-1 p-8 shadow-2xl bg-white">
          <CardContent>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Log in to Amazin
              </h1>
              <p className="text-gray-600">Enter your details below</p>
            </div>
            <SignInForm />

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <a
                  href="/sign-up"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Sign up
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
