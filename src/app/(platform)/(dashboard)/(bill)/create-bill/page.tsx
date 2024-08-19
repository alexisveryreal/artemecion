import { Separator } from "@/components/ui/separator";

import { CreateBillForm } from "./create-bill-form";

const CreateBillPage = () => {
  return (
    <div>
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Create Bill
      </h2>
      <Separator className="w-full" />
      <h4 className="mt-5 scroll-m-20 text-xl font-semibold tracking-tight">
        Bill Info
      </h4>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Please fill out as best as you can
      </p>
      <CreateBillForm />
    </div>
  );
};

export default CreateBillPage;
