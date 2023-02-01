import { BanknotesIcon } from "@heroicons/react/20/solid";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Button } from "../components/ui/Button";
import type { RouterOutputs } from "../utils/api";
import { api } from "../utils/api";
import { cn } from "../utils/cn";
const DashboardPage = () => {
  const { status } = useSession();
  const router = useRouter();

  const { data: bills } = api.bill.getUserBills.useQuery(undefined, {
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      void router.replace("/");
    }
  }, [router, status]);

  if (status === "unauthenticated") {
    return <h1>Oops please login to see this page :D </h1>;
  }

  return (
    <div className="min-h-screen py-10">
      <header>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
            Dashboard
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="px-4 py-8 sm:px-0">
            {bills && (
              // <ul role="list" className="divide-y divide-zinc-200">
              //   {bills.map((bill) => (
              //     <li key={bill.id} className="px-4 py-4 sm:px-0">
              //       {bill.name}
              //     </li>
              //   ))}
              // </ul>
              <BillTable bills={bills} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;

type BillTableProps = {
  bills: RouterOutputs["bill"]["getUserBills"];
};

const statusStyles = {
  success: "bg-green-100 text-green-800",
  processing: "bg-yellow-100 text-yellow-800",
  failed: "bg-gray-100 text-gray-800",
};

const BillTable = ({ bills }: BillTableProps) => {
  return (
    <div className="">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">All Bills</h1>
          <p className="mt-2 text-sm text-gray-700">
            These are all the bills you are keeping track of right now
          </p>
        </div>
      </div>
      <div className="-mx-4 mt-8 flex flex-col sm:-mx-6 md:mx-0">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0"
              >
                Name
              </th>
              <th
                scope="col"
                className="hidden py-3.5 px-3 text-right text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Amount
              </th>
              <th
                scope="col"
                className="hidden py-3.5 px-3 text-right text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Type
              </th>
              <th
                scope="col"
                className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 md:pr-0"
              >
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill) => (
              <tr key={bill.id} className="border-b border-gray-200">
                <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                  <div className="font-medium text-gray-900">
                    <Link
                      href={bill.url ?? "#"}
                      className="capitalize underline-offset-4 hover:underline"
                    >
                      {bill.name}
                    </Link>
                  </div>

                  <div className="mt-0.5 text-gray-500 sm:hidden">
                    {bill.amount}, {bill.type.split(/(?=[A-Z])/).join(" ")}
                  </div>
                </td>
                <td className="hidden py-4 px-3 text-right text-sm text-gray-500 sm:table-cell">
                  {bill.amount}
                </td>
                <td className="hidden py-4 px-3 text-right text-sm text-gray-500 sm:table-cell">
                  {bill.type.split(/(?=[A-Z])/).join(" ")}
                </td>
                <td className="py-4 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-6 md:pr-0">
                  {bill.description}
                </td>
              </tr>
            ))}
          </tbody>
          {/* <tfoot>
          <tr>
            <th
              scope="row"
              colSpan={3}
              className="hidden pl-6 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell md:pl-0"
            >
              Total
            </th>
            <th scope="row" className="pl-4 pr-3 pt-4 text-left text-sm font-semibold text-gray-900 sm:hidden">
              Total
            </th>
            <td className="pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 md:pr-0">
              $4,485.00
            </td>
          </tr>
        </tfoot> */}
        </table>
      </div>
    </div>
  );
};
