import Image from "next/image";
import LoginForm from "@/components/customui/login/LoginForm";

export default function SignIn() {
  return (
    <div className="w-full lg:grid lg:min-h-[500px] lg:grid-cols-2 xl:min-h-[600px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email  to login to your account
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
      <div className="hidden lg:block lg:relative lg:overflow-hidden">
        <Image
          src="/worrior.png"
          alt="Image"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
          priority={true}
        />
      </div>
    </div>
  );
}
