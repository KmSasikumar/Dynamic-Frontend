import dynamic, { DynamicOptions } from "next/dynamic";
import { Suspense } from "react";

// Replace {} with Record<string, unknown> to avoid no-empty-object-type
interface DynamicOptionsWithSuspense extends DynamicOptions<Record<string, unknown>> {
  suspense?: boolean;
}

const DatabasePageContent = dynamic(() => import("./DatabasePageContent"), {
  suspense: true,
} as DynamicOptionsWithSuspense);

export default function DatabasePage() {
  return (
    <Suspense fallback={<div>Loading database page...</div>}>
      <DatabasePageContent />
    </Suspense>
  );
}
