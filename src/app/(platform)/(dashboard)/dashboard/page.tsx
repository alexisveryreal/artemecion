import { auth } from "@clerk/nextjs/server";
import { type BillItem } from "@prisma/client";

import { DataTable } from "@/components/ui/data-table";
import { db } from "@/server/db";

import { columns } from "./columns";

const getData = async (): Promise<BillItem[]> => {
  const { userId } = auth();

  if (!userId) {
    return [];
  }

  const data = await db.billItem.findMany({
    where: {
      userId,
    },
  });

  return data;
};

const DashboardPage = async () => {
  const data = await getData();

  return (
    <div>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Dashboard
      </h2>
      <h4 className="mt-5 scroll-m-20 text-xl font-semibold tracking-tight">
        All Bills
      </h4>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        These are all the bills you are keeping track of right now
      </p>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default DashboardPage;
