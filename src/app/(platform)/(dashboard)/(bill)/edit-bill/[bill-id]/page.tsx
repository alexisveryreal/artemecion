import { notFound } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { db } from "@/server/db";

import { EditBillForm } from "./edit-bill-form";

interface EditBillPageProps {
  params: Promise<{
    "bill-id": string;
  }>;
}

const EditBillPage = async (props: EditBillPageProps) => {
  const params = await props.params;
  const bill = await db.billItem.findUnique({
    where: {
      id: params["bill-id"],
    },
  });

  if (!bill) {
    notFound();
  }

  return (
    <div>
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Edit Bill
      </h2>
      <Separator className="w-full" />
      <h4 className="mt-5 scroll-m-20 text-xl font-semibold tracking-tight">
        Bill Info
      </h4>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Please fill out as best as you can
      </p>
      <EditBillForm prevValues={bill} />
    </div>
  );
};

export default EditBillPage;
