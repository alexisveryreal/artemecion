import { notFound } from "next/navigation";

import { db } from "@/server/db";

interface EditBillPageProps {
  params: {
    "bill-id": string;
  };
}

const EditBillPage = async ({ params }: EditBillPageProps) => {
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
      <div>Edit Bill page</div>
      <div>{bill.name}</div>
    </div>
  );
};

export default EditBillPage;
