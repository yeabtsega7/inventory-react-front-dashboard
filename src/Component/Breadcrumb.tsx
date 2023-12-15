import React from "react";
import { Link } from "react-router-dom";
interface BreadcrumbProps {
  pageName: string;
}
const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-[1.7rem] font-semibold text-black dark:text-white">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link to="/">Dashboard /</Link>
          </li>
          <li className="text-blue-700">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
