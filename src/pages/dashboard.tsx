import { PlusIcon } from "@heroicons/react/20/solid";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import type { GetServerSideProps } from "next";
import Link from "next/link";
import { Button } from "../components/ui/Button";
import { getServerAuthSession } from "../server/auth";
import type { RouterOutputs } from "../utils/api";
import { api } from "../utils/api";
import { formatDate } from "../utils/date";
const DashboardPage = () => {
  const { data: bills } = api.bill.getUserBills.useQuery(undefined, {
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchOnReconnect: false,
  });

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
            {bills && bills.length === 0 && (
              <div className="text-center">
                <BanknotesIcon className="mx-auto h-12 w-12 text-zinc-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No bills
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by tracking a bill
                </p>
                <div className="mt-6">
                  <Link href="/create-bill">
                    <Button variant="default">
                      <PlusIcon
                        className="-ml-1 mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                      New Bill
                    </Button>
                  </Link>
                </div>
              </div>
            )}
            {bills && bills.length > 0 && <BillTable bills={bills} />}
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
        <table className="min-w-full divide-y divide-zinc-300">
          <thead className="bg-violet-50">
            <tr>
              <th
                scope="col"
                className="sticky top-14 z-10 bg-violet-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 md:pl-8"
              >
                Name
              </th>
              <th
                scope="col"
                className="sticky top-14 z-10 hidden bg-violet-50 bg-opacity-75 py-3.5 px-3 text-right text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
              >
                Amount
              </th>
              <th
                scope="col"
                className="sticky top-14 z-10 hidden bg-violet-50 bg-opacity-75 py-3.5 px-3 text-right text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
              >
                Category
              </th>
              <th
                scope="col"
                className="sticky top-14 z-10  bg-violet-50 bg-opacity-75 py-3.5 px-3 text-right text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
              >
                Date
              </th>
              <th
                scope="col"
                className="sticky top-14 z-10 bg-violet-50 bg-opacity-75 py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pr-6 md:pr-8"
              >
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill) => (
              <tr key={bill.id} className="border-b border-gray-200">
                <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-8">
                  <div className="font-medium text-gray-900">
                    <Link
                      href={bill.url ?? "#"}
                      className="capitalize underline-offset-4 hover:underline"
                      target={"_blank"}
                      rel="noreferrer"
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

                <td className="py-4 px-3 text-right text-sm text-gray-500 ">
                  {formatDate(bill.billDate)}
                </td>

                <td className="py-4 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-6 md:pr-8">
                  <Link href={`/edit-bill/${bill.id}`}>
                    <Button variant="outline">
                      Edit
                      <span className="sr-only">{bill.name}</span>
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
