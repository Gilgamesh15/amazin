import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { SignUpForm } from "@/components";

/**@todo CREATE A PRIVACY POLICY PAGE */

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full flex gap-8 items-center">
        <div className="flex-1 hidden lg:block">
          <Image
            src="/login.png"
            width={705}
            height={609}
            alt="Sign up illustration"
            className="w-full h-auto object-cover rounded-lg shadow-2xl"
          />
        </div>
        <Card className="flex-1 p-8 shadow-2xl bg-white">
          <CardContent>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Create an account
              </h1>
              <p className="text-gray-600">Enter your details below</p>
            </div>

            <SignUpForm />

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Log in
                </Link>
              </p>
            </div>

            <div className="mt-8">
              <p className="text-xs text-gray-500 text-center">
                By creating an account, you agree to our{" "}
                <a href="/terms-of-service" className="underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy-policy" className="underline">
                  Privacy Policy
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
