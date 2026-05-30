import { useState } from 'react';
import './App.css';

import { leads as initialLeads } from './data/leads';

function App() {
  const [leads, setLeads] = useState(initialLeads);

  const addLead = () => {
    const newLead = {
      id: leads.length + 1,
      company: 'Future Vision Tech',
      contactName: 'Кравченко Олексій Миколайович',
      status: 'New',
      amount: 13500,
    };

    setLeads([...leads, newLead]);
  };

  return (
    <div className="app">
      <h1>LeadPulse CRM Dashboard</h1>

      <button type="button" onClick={addLead}>
        Add Lead
      </button>

      <div className="leads-list">
        {leads.map((lead) => (
          <div key={lead.id} className="lead-card">
            <h2>{lead.company}</h2>

            <p>
              <strong>Contact:</strong> {lead.contactName}
            </p>

            <p>
              <strong>Status:</strong> {lead.status}
            </p>

            <p>
              <strong>Amount:</strong> ${lead.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;