import { AdminPageHeader, AdminStatCard, AdminTable } from "@/components/admin/shell";

export function AdminResourcePage({
  title,
  text,
  stats,
  columns,
  rows,
  children
}: {
  title: string;
  text: string;
  stats?: Array<{ label: string; value: string | number; detail?: string }>;
  columns: string[];
  rows: Array<Array<React.ReactNode>>;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <AdminPageHeader title={title} text={text} />
      {stats?.length ? (
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          {stats.map((stat) => <AdminStatCard key={stat.label} {...stat} />)}
        </div>
      ) : null}
      {children ? <div className="mb-8">{children}</div> : null}
      <AdminTable columns={columns} rows={rows} />
    </div>
  );
}
