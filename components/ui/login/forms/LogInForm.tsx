import { checkSignIn } from "@/lib/user/queries";
import { LoaderPinwheel } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

type TLoginFormProps = {
  sectionController: (value: number) => void;
};

export const SignInForm = ({ sectionController }: TLoginFormProps) => {
  const [isSigningIn, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const form = new FormData(target);
    const { email, password } = Object.fromEntries(form.entries()) as {
      email: string;
      password: string;
    };
    if (email.length < 3 || password.length < 1) {
      toast("All camps are required.");
      return;
    }
    startTransition(async () => {
      try {
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
        if (res!.error) {
          throw new Error(res!.error);
        }
        router.push("/home");
      } catch (err: any) {
        toast.error(err.message);
      }
    });
  };

  return (
    <>
      <div className="flex min-h-full flex-1 items-center justify-center pb-4 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm space-y-10">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="relative -space-y-px rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-0 z-10 rounded-md ring-1 ring-inset ring-gray-300" />
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full rounded-t-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-primaryColor sm:text-sm sm:leading-6 bg-white"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full rounded-b-md border-0 px-2 py-1.5 focus:outline-none text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primaryColor sm:text-sm sm:leading-6 bg-white"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSigningIn}
                className="flex w-full justify-center rounded-md bg-secondaryColor px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-secondaryColor/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isSigningIn ? (
                  <LoaderPinwheel className="text-white animate-spin w-6 h-6" />
                ) : (
                  "Sign in"
                )}
              </button>
            </div>
          </form>

          <p className="text-center text-sm leading-6 text-gray-500">
            Not a member?{" "}
            <label
              className="font-semibold text-secondaryColor hover:text-secondaryColor/90 cursor-pointer"
              onClick={() => sectionController(1)}
            >
              Sign up
            </label>
          </p>
        </div>
      </div>
    </>
  );
};
