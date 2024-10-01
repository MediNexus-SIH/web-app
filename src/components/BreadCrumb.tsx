"use client";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import React from "react";

interface BreadCrumbInterface {
  pageName: string;
  path: string;
}

export default function Component({ paths }: { paths: BreadCrumbInterface[] }) {
  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {paths.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {index < paths.length - 1 ? (
                <BreadcrumbLink asChild>
                  <Link href={item.path} prefetch={false}>
                    {item.pageName}
                  </Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage className="hover:cursor-pointer">
                  {item.pageName}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index < paths.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
