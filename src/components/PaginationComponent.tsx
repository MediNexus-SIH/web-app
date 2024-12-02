import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

interface PaginationProps {
  page: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({
  page,
  totalPages,
  handlePageChange,
}) => {
  // Generate pagination links
  const generatePaginationLinks = (): (number | "...")[] => {
    // If total pages is 3 or less, show all pages
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    // If more than 3 pages
    const pageLinks: (number | "...")[] = [];

    // Always show first 3 pages if total pages > 3
    if (page <= 3) {
      // First 3 pages exactly
      pageLinks.push(1, 2, 3, "...");
    } else if (page > totalPages - 3) {
      // Close to the end, show last 3 pages
      pageLinks.push("...", totalPages - 2, totalPages - 1, totalPages);
    } else {
      // In the middle, show surrounding pages
      pageLinks.push("...", page - 1, page, page + 1, "...");
    }

    return pageLinks;
  };

  const paginationLinks = generatePaginationLinks();

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous button */}
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (page > 1) handlePageChange(page - 1);
            }}
            disabled={page === 1}
          />
        </PaginationItem>

        {/* Page links */}
        {paginationLinks.map((link, index) => (
          <PaginationItem key={index}>
            {link === "..." ? (
              <PaginationLink href="#" isActive={false}>
                ...
              </PaginationLink>
            ) : (
              <PaginationLink
                href="#"
                isActive={link === page}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(link);
                }}
              >
                {link}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {/* Next button */}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (page < totalPages) handlePageChange(page + 1);
            }}
            disabled={page === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
