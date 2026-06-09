"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { WingifyScript } from "wingify-smartcode-nextjs";

const DEFAULT_ACCOUNT_ID = "1241667";
const DEFAULT_TYPE = "ASYNC" as const;

function parseType(value: string | null): "ASYNC" | "SYNC" {
  const normalized = value?.toUpperCase();
  if (normalized === "SYNC" || normalized === "ASYNC") {
    return normalized;
  }
  return DEFAULT_TYPE;
}

function WingifyScriptFromParams() {
  const searchParams = useSearchParams();
  const accountId = searchParams.get("id") ?? DEFAULT_ACCOUNT_ID;
  const type = parseType(searchParams.get("t"));

  return <WingifyScript accountId={accountId} type={type} version={3.0} />;
}

export function DynamicWingifyScript() {
  return (
    <Suspense
      fallback={
        <WingifyScript
          accountId={DEFAULT_ACCOUNT_ID}
          type={DEFAULT_TYPE}
          version={3.0}
        />
      }
    >
      <WingifyScriptFromParams />
    </Suspense>
  );
}
