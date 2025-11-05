'use client';

export const TableSkeleton = ({ rows = 5 }) => (
  <div className="space-y-3 animate-pulse">
    {[...Array(rows)].map((_, i) => (
      <div key={i} className="h-16 bg-[#1a1a1a] rounded-lg" />
    ))}
  </div>
);

export const GridSkeleton = ({ items = 6 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {[...Array(items)].map((_, i) => (
      <div key={i} className="h-48 bg-[#1a1a1a] rounded-lg animate-pulse" />
    ))}
  </div>
);
