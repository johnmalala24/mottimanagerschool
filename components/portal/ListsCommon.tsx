"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

export function TableSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = (e.currentTarget.elements.namedItem("search") as HTMLInputElement).value;
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    params.set("page", "1"); // Reset page
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full md:w-auto flex items-center gap-xs text-sm bg-surface-container-low border border-outline-variant rounded-full px-sm py-xs">
      <span className="material-symbols-outlined text-[20px] text-secondary">search</span>
      <input
        name="search"
        type="text"
        defaultValue={searchParams.get("search") ?? ""}
        placeholder="Search..."
        className="bg-transparent outline-none text-body-medium placeholder-secondary/50 w-full md:w-[220px]"
      />
    </form>
  );
}

export function Pagination({ page, count, limit = 10 }: { page: number; count: number; limit?: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(count / limit);
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="p-md flex items-center justify-between border-t border-outline-variant text-secondary">
      <button
        disabled={!hasPrev}
        className="btn-secondary !w-auto !py-xs px-md disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        onClick={() => changePage(page - 1)}
      >
        Previous
      </button>
      <div className="flex items-center gap-xs">
        {Array.from({ length: totalPages }, (_, index) => {
          const pageIndex = index + 1;
          // Only show surrounding pages if too many
          if (
            totalPages > 5 &&
            pageIndex !== 1 &&
            pageIndex !== totalPages &&
            Math.abs(pageIndex - page) > 1
          ) {
            if (pageIndex === 2 && page > 3) return <span key="ellipsis-1">...</span>;
            if (pageIndex === totalPages - 1 && page < totalPages - 2) return <span key="ellipsis-2">...</span>;
            return null;
          }
          return (
            <button
              key={pageIndex}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                page === pageIndex
                  ? "bg-primary text-white"
                  : "hover:bg-surface-container-high"
              }`}
              onClick={() => changePage(pageIndex)}
            >
              {pageIndex}
            </button>
          );
        })}
      </div>
      <button
        disabled={!hasNext}
        className="btn-secondary !w-auto !py-xs px-md disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        onClick={() => changePage(page + 1)}
      >
        Next
      </button>
    </div>
  );
}
