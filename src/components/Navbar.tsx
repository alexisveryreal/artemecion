import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, KeyIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/20/solid";
import { cn } from "../utils/cn";
import Image from "next/image";
import { Button } from "./ui/Button";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { FaGithub } from "react-icons/fa";

export type NavbarProps = {
  email?: string;
  image?: string;
  name?: string;
  status: "authenticated" | "loading" | "unauthenticated";
};

const Navbar = ({ email, image, name, status }: NavbarProps) => {
  const router = useRouter();
  const path = router.pathname;

  const authenticated = status === "authenticated";

  return (
    <Disclosure
      as="nav"
      className="sticky top-0 z-20 bg-white shadow backdrop-blur backdrop-filter"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  {authenticated && (
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-violet-500">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  )}
                </div>
                <div className="flex flex-shrink-0 items-center">
                  <Link href="/">
                    <Image
                      className="block h-10 w-auto lg:hidden"
                      src="/images/icon.svg"
                      alt="Artemecion"
                      width={32}
                      height={32}
                    />
                  </Link>

                  <Link href="/">
                    <Image
                      className="hidden h-10 w-auto lg:block"
                      src="/images/icon.svg"
                      alt="Artemecion"
                      width={32}
                      height={32}
                    />
                  </Link>
                </div>
                <div className="hidden md:ml-6 md:flex md:space-x-8">
                  {/* Current: "border-violet-500 text-zinc-900", Default: "border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-700" */}
                  {authenticated && (
                    <Link
                      href="/dashboard"
                      className={cn(
                        path === "/dashboard"
                          ? "border-violet-500 text-zinc-900"
                          : "border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-700",
                        "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium "
                      )}
                    >
                      Dashboard
                    </Link>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <div className="mr-4 flex-shrink-0">
                  <Link
                    href={"https://github.com/alexisveryreal/artemecion"}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="hidden md:block"
                  >
                    <Button variant="outline">
                      <FaGithub
                        className="-ml-1 mr-2 hidden h-5 w-5 md:block"
                        aria-hidden="true"
                      />
                      Github
                    </Button>
                  </Link>
                  <Link
                    href={"https://github.com/alexisveryreal/artemecion"}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="block md:hidden"
                  >
                    <Button variant="outline">
                      <FaGithub className="h-5 w-5" aria-hidden="true" />
                      <span className="sr-only">Github</span>
                    </Button>
                  </Link>
                </div>
                <div className="flex-shrink-0">
                  {authenticated ? (
                    <Link href="/create-bill">
                      <Button variant="default" size="sm">
                        <PlusIcon
                          className="-ml-1 mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                        New Bill
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      variant="default"
                      type="button"
                      // size="sm"
                      onClick={() =>
                        void signIn(undefined, { callbackUrl: "/dashboard" })
                      }
                    >
                      <KeyIcon className="-ml-1 mr-2 h-5 w-5" />
                      Sign in
                    </Button>
                  )}
                </div>
                {authenticated && (
                  <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2">
                          <span className="sr-only">Open user menu</span>

                          <Image
                            className="h-8 w-8 rounded-full"
                            src={
                              image ??
                              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            }
                            alt=""
                            width={32}
                            height={32}
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Button
                                variant="ghost"
                                // size="sm"
                                onClick={() =>
                                  void signOut({ callbackUrl: "/" })
                                }
                                className={cn(
                                  active ? "bg-zinc-50" : "",
                                  "w-full justify-start font-normal text-zinc-700 focus:ring-0 focus:ring-offset-0"
                                )}
                              >
                                Sign out
                              </Button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 pt-2 pb-3">
              {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-zinc-500 hover:bg-zinc-50 hover:border-zinc-300 hover:text-zinc-700" */}
              <Disclosure.Button
                as={Link}
                href="/dashboard"
                className={cn(
                  path === "/dashboard"
                    ? "border-violet-500 bg-violet-50 text-violet-700"
                    : "border-transparent text-zinc-500 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-700",
                  "block border-l-4 py-2 pl-3 pr-4 text-base font-medium sm:pl-5 sm:pr-6"
                )}
              >
                Dashboard
              </Disclosure.Button>
            </div>
            <div className="border-t border-zinc-200 pt-4 pb-3">
              <div className="flex items-center px-4 sm:px-6">
                <div className="flex-shrink-0">
                  <Image
                    className="h-10 w-10 rounded-full"
                    src={
                      image ??
                      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    }
                    alt=""
                    width={40}
                    height={40}
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-zinc-800">
                    {name ?? "Tom Cook"}
                  </div>
                  <div className="text-sm font-medium text-zinc-500">
                    {email ?? "tom@example.com"}
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <Disclosure.Button
                  as={Button}
                  variant="ghost"
                  className="w-full justify-start px-4 py-2 text-base font-medium text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 sm:px-6"
                  onClick={() => void signOut({ callbackUrl: "/" })}
                >
                  Sign out
                </Disclosure.Button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
