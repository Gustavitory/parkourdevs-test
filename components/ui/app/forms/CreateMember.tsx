import { LoaderPinwheel } from "lucide-react";
import { useTransition } from "react";
import FadeModal from "../../modals/FadeModal.";
import { ErrorMessage } from "./components/ErrorMessage";
import { useCreateMember } from "./hooks/useCreateMember";

interface ModalProps {
  controller: (value: boolean) => void;
  isOpen: boolean;
}

export const CreateMemberForm = ({ controller, isOpen }: ModalProps) => {
  const { handleSubmit, onChange, error, isCreatingMember } = useCreateMember();
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

            <form
              className="space-y-6"
              onSubmit={(e) =>
                handleSubmit(e).then((res) => {
                  if (res !== "invalid")
                    setTimeout(() => controller(false), 500);
                })
              }
            >
              <div className="relative -space-y-px rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-0 z-10 rounded-md ring-1 ring-inset ring-gray-300" />
                <div className="relative">
                  <label htmlFor="email-address" className="sr-only">
                    Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    onChange={onChange}
                    autoComplete="name"
                    autoFocus
                    className="relative block w-full rounded-t-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-primaryColor sm:text-sm sm:leading-6 bg-white"
                    placeholder="Name"
                  />
                  {error["name"] && <ErrorMessage message={error["name"]} />}
                </div>
                <div className="relative">
                  <label htmlFor="password" className="sr-only">
                    Id
                  </label>
                  <input
                    id="id"
                    onChange={onChange}
                    name="id"
                    type="text"
                    autoComplete="id"
                    className="relative block w-full border-0 px-2 py-1.5 focus:outline-none text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primaryColor sm:text-sm sm:leading-6 bg-white"
                    placeholder="ID"
                  />
                  {error["id"] && <ErrorMessage message={error["id"]} />}
                </div>
                <div className="relative">
                  <label htmlFor="password" className="sr-only">
                    Email
                  </label>
                  <input
                    id="email"
                    onChange={onChange}
                    name="email"
                    type="text"
                    autoComplete="email"
                    className="relative block w-full border-0 px-2 py-1.5 focus:outline-none text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primaryColor sm:text-sm sm:leading-6 bg-white"
                    placeholder="Email"
                  />
                  {error["email"] && <ErrorMessage message={error["email"]} />}
                </div>
                <div className="relative">
                  <label htmlFor="password" className="sr-only">
                    Phone
                  </label>
                  <input
                    id="phone"
                    onChange={onChange}
                    name="phone"
                    type="text"
                    autoComplete="phone"
                    className="relative block w-full border-0 px-2 py-1.5 focus:outline-none text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primaryColor sm:text-sm sm:leading-6 bg-white"
                    placeholder="Phone number"
                  />
                  {error["phone"] && <ErrorMessage message={error["phone"]} />}
                </div>
                <div className="relative">
                  <label htmlFor="password" className="sr-only">
                    Address
                  </label>
                  <input
                    id="address"
                    name="address"
                    onChange={onChange}
                    type="text"
                    autoComplete="address"
                    className="relative block w-full border-0 px-2 py-1.5 focus:outline-none text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primaryColor sm:text-sm sm:leading-6 bg-white"
                    placeholder="Address"
                  />
                  {error["address"] && (
                    <ErrorMessage message={error["address"]} />
                  )}
                </div>
                <div className="relative">
                  <label htmlFor="rpassword" className="sr-only">
                    Salary
                  </label>
                  <input
                    id="salary"
                    onChange={onChange}
                    name="salary"
                    type="text"
                    autoComplete="salary"
                    className="relative block w-full rounded-b-md border-0 px-2 py-1.5 focus:outline-none text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primaryColor sm:text-sm sm:leading-6 bg-white"
                    placeholder="Salary"
                  />
                  {error["salary"] && (
                    <ErrorMessage message={error["salary"]} />
                  )}
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
