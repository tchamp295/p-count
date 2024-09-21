import Image from "next/image";
import LoginForm from "@/components/customui/login/LoginForm";

export default function SignIn() {
  return (
    <div className="relative flex flex-col lg:flex-row min-h-screen">
      {/* Background Image for Large Screens */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          src="/worrior.png"
          alt="Background Image"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"  // Adjust sizes based on screen width
          className="absolute inset-0 object-cover"
          priority={true}
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div> {/* Overlay for image */}
      </div>

      {/* Main Content Section */}
      <div className="flex-1 flex items-center justify-center lg:w-1/2 p-4 bg-white">
        <div className="w-full max-w-md mx-auto">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-6">
            <Image
              src="/worrior.png"
              alt="Mobile Logo"
              width={80}
              height={80}
              priority={true}
              className="w-20 h-20"
            />
          </div>
          
          {/* Login Form Section */}
          <div className="space-y-6">
            <div className="text-center space-y-6">
            <h1 className="text-4xl font-extrabold text-gray-900">Sign In</h1>
            <p className="text-sm text-gray-600">
              Enter your email to log into your account
            </p></div>
            <LoginForm />
            <div className="text-sm text-gray-500">
              Don’t have an account?{" "}
              <a href="/register" className="text-indigo-600 hover:text-indigo-500">
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
