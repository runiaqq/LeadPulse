import { useState } from 'react';
import { leads as initialLeads } from './data/leads';

function App() {
  const [leads, setLeads] = useState(initialLeads);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    company: '',
    contactName: '',
    status: 'New',
    amount: '',
  });

  const totalAmount = leads.reduce((sum, lead) => sum + lead.amount, 0);
  const wonDeals = leads.filter((lead) => lead.status === 'Closed Won').length;
  const activeDeals = leads.filter((lead) => lead.status !== 'Closed Lost').length;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const addLead = (event) => {
    event.preventDefault();

    const newLead = {
      id: Date.now(),
      company: form.company,
      contactName: form.contactName,
      status: form.status,
      amount: Number(form.amount),
    };

    setLeads([...leads, newLead]);

    setForm({
      company: '',
      contactName: '',
      status: 'New',
      amount: '',
    });

    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex">
        <aside className="hidden min-h-screen w-64 border-r border-slate-800 bg-slate-900 p-6 md:block">
          <h2 className="text-2xl font-bold text-white">LeadPulse</h2>

          <nav className="mt-10 space-y-3">
            <a className="block rounded-xl bg-blue-600 px-4 py-3 font-medium text-white" href="/">
              Dashboard
            </a>
            <a className="block rounded-xl px-4 py-3 text-slate-400 hover:bg-slate-800" href="/">
              Leads
            </a>
            <a className="block rounded-xl px-4 py-3 text-slate-400 hover:bg-slate-800" href="/">
              Analytics
            </a>
            <a className="block rounded-xl px-4 py-3 text-slate-400 hover:bg-slate-800" href="/">
              Settings
            </a>
          </nav>
        </aside>

        <main className="flex-1 p-6">
          <header className="mb-8 flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div>
              <h1 className="text-3xl font-bold">CRM Dashboard</h1>
              <p className="mt-1 text-slate-400">Manage leads and sales analytics</p>
            </div>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-500"
            >
              + Add Lead
            </button>
          </header>

          <section className="mb-8 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <p className="text-slate-400">Total Leads</p>
              <h3 className="mt-2 text-3xl font-bold">{leads.length}</h3>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <p className="text-slate-400">Active Deals</p>
              <h3 className="mt-2 text-3xl font-bold">{activeDeals}</h3>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <p className="text-slate-400">Revenue Pipeline</p>
              <h3 className="mt-2 text-3xl font-bold">${totalAmount.toLocaleString()}</h3>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="mb-5 text-xl font-bold">Leads</h2>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {leads.map((lead) => (
                <div key={lead.id} className="rounded-2xl bg-slate-800 p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-bold">{lead.company}</h3>
                    <span className="rounded-full bg-blue-500/20 px-3 py-1 text-sm text-blue-300">
                      {lead.status}
                    </span>
                  </div>

                  <p className="text-slate-400">{lead.contactName}</p>
                  <p className="mt-4 text-2xl font-bold">${lead.amount.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Add New Lead</h2>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={addLead} className="space-y-4">
              <input
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="Company name"
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
              />

              <input
                name="contactName"
                value={form.contactName}
                onChange={handleChange}
                placeholder="Contact name"
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
              />

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
              >
                <option>New</option>
                <option>Negotiation</option>
                <option>Proposal Sent</option>
                <option>Closed Won</option>
                <option>Closed Lost</option>
              </select>

              <input
                name="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder="Amount"
                type="number"
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
              />

              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-500"
              >
                Add Lead
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;