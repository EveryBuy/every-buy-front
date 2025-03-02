import { Suspense } from "react";
import { CatalogyPage } from "../../../components/pages/catalogy/CatalogyPage";

function Page() {
  return (
    <Suspense>
      <CatalogyPage />;
    </Suspense>
  );
}

export default Page;
