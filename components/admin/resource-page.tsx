import { AdminPageHeader, AdminStatCard, AdminTable } from "@/components/admin/shell";
import { AdminControlBar, type AdminField } from "@/components/admin/control-center";

export function AdminResourcePage({
  title,
  text,
  stats,
  columns,
  rows,
  children,
  searchPlaceholder,
  filters,
  createLabel,
  formFields
}: {
  title: string;
  text: string;
  stats?: Array<{ label: string; value: string | number; detail?: string }>;
  columns: string[];
  rows: Array<Array<React.ReactNode>>;
  children?: React.ReactNode;
  searchPlaceholder?: string;
  filters?: string[];
  createLabel?: string;
  formFields?: AdminField[];
}) {
  return (
    <div>
      <AdminPageHeader title={title} text={text} />
      {stats?.length ? (
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          {stats.map((stat) => <AdminStatCard key={stat.label} {...stat} />)}
        </div>
      ) : null}
      {searchPlaceholder ? (
        <div className="mb-8">
          <AdminControlBar searchPlaceholder={searchPlaceholder} filters={filters} createLabel={createLabel} formTitle={createLabel} fields={formFields} />
        </div>
      ) : null}
      {children ? <div className="mb-8">{children}</div> : null}
      <AdminTable columns={columns} rows={rows} />
    </div>
  );
}
