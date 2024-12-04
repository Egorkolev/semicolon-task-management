import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import { Link } from "@/i18n/routing";
import { UrlObject } from "url";

  interface BreadCrumbType {
    breadCrumbHref: string | UrlObject;
    breadCrumbLink?: string;
    breadCrumbPage?: string;
  }
   
  const TMBreadcrumb = ({breadCrumbHref, breadCrumbLink, breadCrumbPage}: BreadCrumbType) => {
    return (
      <Breadcrumb>
        <BreadcrumbList className="items-baseline">
          <BreadcrumbItem>
              <Link href={breadCrumbHref} passHref> 
                <BreadcrumbLink className="text-darkBlue dark:text-gray text-3xl font-bold">
                  {breadCrumbLink}
                </BreadcrumbLink>
              </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-darkBlue dark:text-gray font-bold" />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-darkBlue dark:text-gray text-xl font-bold">{breadCrumbPage}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )
  }

  export default TMBreadcrumb;