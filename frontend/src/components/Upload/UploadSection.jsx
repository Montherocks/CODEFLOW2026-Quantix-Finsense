import { useRef } from 'react';
import './UploadSection.css';

export default function UploadSection({ user, onFileSelect, onLogout, error }) {
  const fileRef = useRef(null);

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
  };

  return (
    <div className="upload-container">
      <header className="upload-header">
        <span>Hi, {user.displayName || user.email}</span>
        <button type="button" onClick={onLogout}>
          Log out
        </button>
      </header>
      <div className="drop-zone" onClick={() => fileRef.current?.click()}>
        <h1>Upload Bank Statement</h1>
        <p>PDF or CSV — including bankstatements.csv format (date, DrCr, amount, mode, name)</p>
        <input type="file" hidden ref={fileRef} accept=".pdf,.csv" onChange={handleChange} />
      </div>
      {error && <p className="upload-error">{error}</p>}
    </div>
  );
}
