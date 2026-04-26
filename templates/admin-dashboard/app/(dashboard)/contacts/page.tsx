import type { Metadata } from "next";
import ContactsTable from "@/components/ui/ContactsTable";
import { MOCK_CONTACTS } from "@/lib/mock-data";

export const metadata: Metadata = { title: "Contacts" };

export default function ContactsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Contacts</h1>
          <p className="text-sm text-slate-400 mt-1">{MOCK_CONTACTS.length} demandes au total</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 transition-colors">
          Exporter CSV
        </button>
      </div>
      <ContactsTable contacts={MOCK_CONTACTS} />
    </div>
  );
}
