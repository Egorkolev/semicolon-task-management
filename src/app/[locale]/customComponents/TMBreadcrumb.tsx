import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"

  interface BreadCrumbType {
    breadCrumbHref?: string;
    breadCrumbLink?: string;
    breadCrumbPage?: string;
  }
   
  const TMBreadcrumb = ({breadCrumbHref, breadCrumbLink, breadCrumbPage}: BreadCrumbType) => {
    return (
      <Breadcrumb>
        <BreadcrumbList className="items-baseline">
          <BreadcrumbItem>
            <BreadcrumbLink className="text-darkBlue text-3xl font-bold" href={breadCrumbHref}>{breadCrumbLink}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-darkBlue font-bold" />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-darkBlue text-xl font-bold">{breadCrumbPage}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )
  }

  export default TMBreadcrumb;