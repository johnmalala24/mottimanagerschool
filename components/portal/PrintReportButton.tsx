"use client";

export default function PrintReportButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-xs bg-white border border-outline text-secondary px-lg py-sm rounded-lg text-label-md font-medium hover:bg-surface-container transition-colors"
    >
      <span className="material-symbols-outlined text-[20px]">print</span>
      Print Report
    </button>
  );
}
