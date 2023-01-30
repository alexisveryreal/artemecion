import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { api } from "../utils/api";
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
              <ul role="list" className="divide-y divide-zinc-200">
                {bills.map((bill) => (
                  <li key={bill.id} className="px-4 py-4 sm:px-0">
                    {bill.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
