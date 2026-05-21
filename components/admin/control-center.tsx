"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle2, Eye, ListFilter, Pencil, Plus, Search, SlidersHorizontal, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export type AdminField = {
  label: string;
  name: string;
  type?: "text" | "email" | "number" | "select" | "textarea";
  placeholder?: string;
  required?: boolean;
  options?: string[];
};

export function AdminControlBar({
  searchPlaceholder,
  filters = [],
  createLabel,
  formTitle,
  fields = []
}: {
  searchPlaceholder: string;
  filters?: string[];
  createLabel?: string;
  formTitle?: string;
  fields?: AdminField[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-glow">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-h-12 flex-1 items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-3 text-sm text-slate-400">
          <Search className="h-4 w-4 text-cyan-300" />
          <input className="w-full bg-transparent py-3 outline-none placeholder:text-slate-500" placeholder={searchPlaceholder} />
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button key={filter} className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 text-sm text-slate-300 transition hover:bg-white/[0.08]">
              <ListFilter className="h-4 w-4 text-cyan-300" />
              {filter}
            </button>
          ))}
          {createLabel ? (
            <Button type="button" onClick={() => setOpen(true)} className="h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 text-white shadow-glow">
              <Plus className="h-4 w-4" />
              {createLabel}
            </Button>
          ) : null}
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-400">
        <span className="inline-flex items-center gap-1 rounded-full bg-cyan-300/10 px-2.5 py-1 text-cyan-100 ring-1 ring-cyan-300/20"><CheckCircle2 className="h-3.5 w-3.5" /> Live table controls</span>
        <span className="inline-flex items-center gap-1 rounded-full bg-white/[0.04] px-2.5 py-1 ring-1 ring-white/10"><SlidersHorizontal className="h-3.5 w-3.5" /> Filters are ready for API-backed refinement</span>
      </div>
      {open ? <AdminFormModal title={formTitle || createLabel || "Admin action"} fields={fields} onClose={() => setOpen(false)} /> : null}
    </div>
  );
}

export function AdminRowActions({ label, fields = [] }: { label: string; fields?: AdminField[] }) {
  const [editOpen, setEditOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  return (
    <div className="flex flex-wrap gap-2">
      <button type="button" onClick={() => setEditOpen(true)} className="inline-flex min-h-9 items-center gap-1 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-xs font-semibold text-cyan-100 transition hover:bg-cyan-300/10">
        <Pencil className="h-3.5 w-3.5" />
        Edit
      </button>
      <button type="button" onClick={() => setDetailsOpen(true)} className="inline-flex min-h-9 items-center gap-1 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-xs font-semibold text-slate-300 transition hover:bg-white/[0.08]">
        <Eye className="h-3.5 w-3.5" />
        Details
      </button>
      <button type="button" onClick={() => setConfirmOpen(true)} className="inline-flex min-h-9 items-center gap-1 rounded-lg border border-red-300/20 bg-red-400/10 px-2.5 py-1.5 text-xs font-semibold text-red-200 transition hover:bg-red-400/15">
        <Trash2 className="h-3.5 w-3.5" />
        Delete
      </button>
      {editOpen ? <AdminFormModal title={`Manage ${label}`} fields={fields} onClose={() => setEditOpen(false)} /> : null}
      {detailsOpen ? <AdminDetailDrawer title={label} fields={fields} onClose={() => setDetailsOpen(false)} /> : null}
      {confirmOpen ? <ConfirmModal title={`Delete ${label}?`} onClose={() => setConfirmOpen(false)} /> : null}
    </div>
  );
}

function AdminFormModal({ title, fields, onClose }: { title: string; fields: AdminField[]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-slate-950 p-5 text-white shadow-glow">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Admin operation</p>
            <h2 className="mt-2 text-2xl font-black">{title}</h2>
            <p className="mt-1 text-sm text-slate-400">Review, validate, and save administrative changes with clear audit context.</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-md border border-white/10 p-2 text-slate-400 hover:bg-white/[0.06] hover:text-white"><X className="h-4 w-4" /></button>
        </div>
        <form className="mt-5 grid gap-4" onSubmit={(event) => event.preventDefault()}>
          <div className="grid gap-4 md:grid-cols-2">
            {fields.map((field) => (
              <label key={field.name} className={field.type === "textarea" ? "grid gap-2 md:col-span-2" : "grid gap-2"}>
                <span className="text-sm font-medium text-slate-300">{field.label}{field.required ? <span className="text-cyan-300"> *</span> : null}</span>
                {field.type === "textarea" ? (
                  <Textarea name={field.name} required={field.required} placeholder={field.placeholder} className="min-h-28 border-white/10 bg-white/[0.05] text-white placeholder:text-slate-500" />
                ) : field.type === "select" ? (
                  <select name={field.name} required={field.required} className="h-12 rounded-md border border-white/10 bg-slate-900 px-3 text-sm text-white">
                    {(field.options || []).map((option) => <option key={option}>{option}</option>)}
                  </select>
                ) : (
                  <Input name={field.name} type={field.type || "text"} required={field.required} placeholder={field.placeholder} className="h-12 border-white/10 bg-white/[0.05] text-white placeholder:text-slate-500" />
                )}
              </label>
            ))}
          </div>
          <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-4 sm:flex-row sm:justify-end">
            <Button type="button" variant="outline" onClick={onClose} className="border-white/10 bg-transparent text-white hover:bg-white/[0.06]">Cancel</Button>
            <Button type="submit" className="bg-gradient-to-r from-indigo-500 to-cyan-400 text-white">Save changes</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AdminDetailDrawer({ title, fields, onClose }: { title: string; fields: AdminField[]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm">
      <button type="button" aria-label="Close details" className="absolute inset-0 cursor-default" onClick={onClose} />
      <aside className="absolute bottom-0 right-0 top-0 flex w-full max-w-xl flex-col border-l border-white/10 bg-slate-950 text-white shadow-[0_0_90px_rgba(0,0,0,0.45)]">
        <div className="border-b border-white/10 p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Record details</p>
              <h2 className="mt-2 text-2xl font-black">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">Review fields, status, audit context, and operational notes before editing.</p>
            </div>
            <button type="button" onClick={onClose} className="rounded-md border border-white/10 p-2 text-slate-400 hover:bg-white/[0.06] hover:text-white"><X className="h-4 w-4" /></button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          <div className="grid gap-3">
            {(fields.length ? fields : [{ label: "Record", name: "record", placeholder: title }]).map((field) => (
              <div key={field.name} className="rounded-xl border border-white/10 bg-white/[0.045] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{field.label}</p>
                <p className="mt-2 break-words text-sm text-slate-200">{field.placeholder || field.options?.[0] || "Available in the full record view"}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-xl border border-cyan-300/20 bg-cyan-300/10 p-4">
            <p className="text-sm font-semibold text-cyan-100">Governance note</p>
            <p className="mt-2 text-sm leading-6 text-cyan-100/75">Actions from this panel remain protected by SUPER_ADMIN access and should be backed by audited server routes when persistence is enabled.</p>
          </div>
        </div>
      </aside>
    </div>
  );
}

function ConfirmModal({ title, onClose }: { title: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl border border-red-300/20 bg-slate-950 p-5 text-white shadow-glow">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-md bg-red-400/10 text-red-200"><AlertTriangle className="h-5 w-5" /></span>
          <div>
            <h2 className="text-xl font-black">{title}</h2>
            <p className="mt-1 text-sm text-slate-400">This destructive operation is confirmation-gated and should be reviewed before it is applied.</p>
          </div>
        </div>
        <div className="mt-5 flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose} className="border-white/10 bg-transparent text-white hover:bg-white/[0.06]">Cancel</Button>
          <Button type="button" onClick={onClose} className="bg-red-500 text-white hover:bg-red-400">Confirm delete</Button>
        </div>
      </div>
    </div>
  );
}
