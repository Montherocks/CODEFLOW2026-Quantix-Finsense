import SummaryCards from './SummaryCards.jsx';
import './Dashboard.css';

export default function Dashboard({ data, onNewAnalysis, onLogout, user }) {
  const { summary, transactions } = data;

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>Your FinSense Dashboard</h1>
          <p>{user?.email}</p>
        </div>
        <div className="dashboard-actions">
          <button type="button" onClick={onNewAnalysis}>
            Upload another
          </button>
          <button type="button" className="secondary" onClick={onLogout}>
            Log out
          </button>
        </div>
      </header>

      <SummaryCards summary={summary} />

      <section className="health-section">
        <h2>Financial health</h2>
        <div className="health-score">{summary.financialHealthScore}/100</div>
      </section>

      <section className="txn-section">
        <h2>Transactions ({transactions.length})</h2>
        <div className="txn-table-wrap">
          <table className="txn-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Narration</th>
                <th>Category</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id ?? t.transactionHash}>
                  <td>{t.id}</td>
                  <td>{t.date}</td>
                  <td>{t.narration}</td>
                  <td>{t.category}</td>
                  <td>
                    {t.debit > 0 && `−₹${t.debit.toLocaleString('en-IN')}`}
                    {t.credit > 0 && `+₹${t.credit.toLocaleString('en-IN')}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
