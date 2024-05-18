import { createMember } from "@/lib/members/mutations";
import { LoaderPinwheel } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import FadeModal from "../../modals/FadeModal.";

interface ModalProps {
  controller: (value: boolean) => void;
  isOpen: boolean;
}

export const CreateMemberForm = ({ controller, isOpen }: ModalProps) => {
  const [isCreatingMember, startTransition] = useTransition();
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const form = new FormData(target);
    console.log(Object.fromEntries(form.entries()));
    const { email, name, phone, address, salary, id } = Object.fromEntries(
      form.entries()
    ) as {
      email: string;
      name: string;
      phone: string;
      address: string;
      salary: string;
      id: string;
    };
    if (
      email.length < 1 ||
      name.length < 1 ||
      phone.length < 1 ||
      address.length < 1 ||
      salary.length < 1 ||
      id.length < 1
    ) {
      toast.error("All camps are required.");
      return;
    }
    if (Number(id) < 1000000 || Number(id) > 100000000) {
      toast.error("Invalid ID");
    }
    startTransition(async () => {
      try {
        const { error, message } = await createMember({
          email,
          name,
          id: Number(id),
          phone,
          address,
          salary: Number(salary),
        });
        if (error) {
          throw new Error(message[0]);
        }
      } catch (err: any) {
        toast.error(err.message);
      }
    });
  };
  return (
    <>
      <FadeModal controller={controller} isOpen={isOpen}>
        <div className="flex min-h-full flex-1 items-center justify-center pb-4 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-sm space-y-10">
            <section className="flex items-center gap-2">
              <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Create a team member
              </h2>
            </section>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="relative -space-y-px rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-0 z-10 rounded-md ring-1 ring-inset ring-gray-300" />
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="relative block w-full rounded-t-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-primaryColor sm:text-sm sm:leading-6 bg-white"
                    placeholder="Name"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Id
                  </label>
                  <input
                    id="id"
                    name="id"
                    type="text"
                    autoComplete="id"
                    required
                    className="relative block w-full border-0 px-2 py-1.5 focus:outline-none text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primaryColor sm:text-sm sm:leading-6 bg-white"
                    placeholder="ID"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="relative block w-full border-0 px-2 py-1.5 focus:outline-none text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primaryColor sm:text-sm sm:leading-6 bg-white"
                    placeholder="Email"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    autoComplete="phone"
                    required
                    className="relative block w-full border-0 px-2 py-1.5 focus:outline-none text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primaryColor sm:text-sm sm:leading-6 bg-white"
                    placeholder="Phone number"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Address
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    autoComplete="address"
                    required
                    className="relative block w-full border-0 px-2 py-1.5 focus:outline-none text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primaryColor sm:text-sm sm:leading-6 bg-white"
                    placeholder="Address"
                  />
                </div>
                <div>
                  <label htmlFor="rpassword" className="sr-only">
                    Salary
                  </label>
                  <input
                    id="salary"
                    name="salary"
                    type="text"
                    autoComplete="salary"
                    required
                    className="relative block w-full rounded-b-md border-0 px-2 py-1.5 focus:outline-none text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primaryColor sm:text-sm sm:leading-6 bg-white"
                    placeholder="Salary"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isCreatingMember}
                  className="mt-5 mb-5 flex w-full justify-center rounded-md bg-secondaryColor px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-secondaryColor/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {isCreatingMember ? (
                    <LoaderPinwheel className="w-6 h-6 text-white animate-spin" />
                  ) : (
                    "Create"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </FadeModal>
    </>
  );
};
