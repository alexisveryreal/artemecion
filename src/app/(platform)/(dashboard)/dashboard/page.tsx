import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { type BillItem } from "@prisma/client";
import { PlusIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
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
      <div className="flex justify-between">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Dashboard
        </h2>
        <Button asChild>
          <Link href="/create-bill">
            <PlusIcon className="mr-2 h-4 w-4" /> Add New Bill
          </Link>
        </Button>
      </div>
      <Separator className="w-full" />
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
