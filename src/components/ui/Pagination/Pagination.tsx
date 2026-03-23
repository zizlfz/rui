import React from "react";
import { Button } from "#/components/ui/Button";
import { Select, SelectItem } from "#/components/ui/Select";
import { Tooltip, TooltipTrigger } from "#/components/ui/Tooltip";
import { cn } from "#/utils/classname";
import "./Pagination.css";

export interface PaginationProps {
  /** Total number of items */
  totalItems: number;

  /** Number of items shown per page */
  pageSize: number;

  /** Currently active page (1-indexed) */
  currentPage: number;

  /** Called when user navigates to a new page */
  onPageChange: (page: number) => void;

  /** Called when user changes page size. Enables the per-page select. */
  onPageSizeChange?: (size: number) => void;

  /** Available page size options (default: [10, 25, 50, 100]) */
  pageSizeOptions?: number[];

  /** Max page buttons shown before collapsing with ellipsis (default: 1) */
  siblingCount?: number;

  /** Additional Tailwind classes for the wrapper */
  className?: string;
}

function usePagination({
  totalItems,
  pageSize,
  currentPage,
  siblingCount = 1,
}: {
  totalItems: number;
  pageSize: number;
  currentPage: number;
  siblingCount?: number;
}): (number | "ellipsis")[] {
  const totalPages = Math.ceil(totalItems / pageSize);

  // Edge case: no pages
  if (totalPages === 0) {
    return [];
  }

  // Edge case: single page
  if (totalPages === 1) {
    return [1];
  }

  // If all pages can fit with no ellipsis
  const totalPageNumbers = siblingCount * 2 + 5; // 1 + ellipsis + siblingCount*2 + 1 + ellipsis + 1
  if (totalPages <= totalPageNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // Calculate the range of page numbers to show around the current page
  // Clamp to interior pages (2 to totalPages-1) to avoid overlapping with pinned first/last pages
  const leftSiblingIndex = Math.max(currentPage - siblingCount, 2);
  const rightSiblingIndex = Math.min(
    currentPage + siblingCount,
    totalPages - 1,
  );

  // Calculate whether we need to show left and right ellipsis
  const shouldShowLeftEllipsis = leftSiblingIndex > 2;
  const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 1;

  // Build the page array
  const pages: (number | "ellipsis")[] = [];

  // Always include first page
  pages.push(1);

  if (shouldShowLeftEllipsis) {
    pages.push("ellipsis");
  }

  // Add pages around current page
  for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
    pages.push(i);
  }

  if (shouldShowRightEllipsis) {
    pages.push("ellipsis");
  }

  // Always include last page
  pages.push(totalPages);

  return pages;
}

export function Pagination({
  totalItems,
  pageSize,
  currentPage,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 25, 50, 100],
  siblingCount = 1,
  className,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / pageSize);
  const pages = usePagination({
    totalItems,
    pageSize,
    currentPage,
    siblingCount,
  });

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageSizeChange = (value: React.Key | null) => {
    if (value !== null) {
      const newSize = parseInt(value.toString(), 10);
      if (onPageSizeChange) {
        onPageSizeChange(newSize);
      }
    }
  };

  // Edge case: no items
  if (totalItems === 0) {
    return null;
  }

  return (
    <nav aria-label="Pagination" className={cn("pagination", className)}>
      <div className="pagination-content">
        {/* Left: rows per page */}
        {onPageSizeChange && (
          <div className="pagination-size-selector">
            <span className="pagination-label">Rows per page</span>
            <Select
              defaultSelectedKey={pageSize.toString()}
              onChange={handlePageSizeChange}
              aria-label="Rows per page"
            >
              {pageSizeOptions.map((size) => (
                <SelectItem key={size} id={size.toString()}>
                  {size}
                </SelectItem>
              ))}
            </Select>
          </div>
        )}

        {/* Right: navigation */}
        <div className="pagination-nav">
          <Button
            variant="secondary"
            isDisabled={currentPage === 1}
            onPress={handlePrev}
            aria-label="Go to previous page"
          >
            Previous
          </Button>

          <div className="pagination-pages">
            {pages.map((page, i) =>
              page === "ellipsis" ? (
                <TooltipTrigger key={`ellipsis-${i}`}>
                  <Button
                    variant="quiet"
                    aria-label="More pages"
                    className="pagination-ellipsis"
                  >
                    …
                  </Button>
                  <Tooltip>Jump to page</Tooltip>
                </TooltipTrigger>
              ) : (
                <Button
                  key={page}
                  variant={page === currentPage ? "primary" : "quiet"}
                  onPress={() => onPageChange(page)}
                  aria-label={`Page ${page}`}
                  aria-current={page === currentPage ? "page" : undefined}
                  className={cn(
                    "pagination-page",
                    page === currentPage && "pagination-page-current",
                  )}
                >
                  {page}
                </Button>
              ),
            )}
          </div>

          <Button
            variant="secondary"
            isDisabled={currentPage === totalPages}
            onPress={handleNext}
            aria-label="Go to next page"
          >
            Next
          </Button>
        </div>
      </div>
    </nav>
  );
}
