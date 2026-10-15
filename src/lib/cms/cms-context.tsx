"use client";

import { createContext, useContext } from "react";
import { defaultCms } from "@/lib/cms/defaults";
import type { CmsContent } from "@/lib/cms/types";

const CmsContext = createContext<CmsContent>(defaultCms);

export function CmsProvider({ content, children }: { content: CmsContent; children: React.ReactNode }) {
  return <CmsContext.Provider value={content}>{children}</CmsContext.Provider>;
}

export function useCms() {
  return useContext(CmsContext);
}
