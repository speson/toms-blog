"use client";

import { useMDXComponent } from "next-contentlayer2/hooks";
import { useMDXComponents } from "@/components/mdx-components";

interface MDXContentProps {
  code: string;
}

export function MDXContent({ code }: MDXContentProps) {
  const Component = useMDXComponent(code);
  const components = useMDXComponents({});

  return <Component components={components} />;
}
