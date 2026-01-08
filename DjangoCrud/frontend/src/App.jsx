import React, { useState } from 'react';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import './App.css';

/**
 * Main Application Component - Modern Management Dashboard.
 */
function App() {
  const [showForm, setShowForm] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  // Sync body class with dark mode state
  React.useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const handleAddNew = () => {
    setEmployeeToEdit(null);
    setShowForm(true);
  };

  const handleEdit = (employee) => {
    setEmployeeToEdit(employee);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEmployeeToEdit(null);
  };

  const handleSave = () => {
    setRefreshKey(prev => prev + 1);
    handleCloseForm();
  };

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <div className="App">
      <button className="theme-toggle" onClick={toggleTheme} title="Toggle Theme">
        {isDarkMode ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
        )}
      </button>

      <header className="App-header">
        <h1>Manage Team</h1>
        <p className="subtitle">Optimize your organizational workflow with ease and precision.</p>
      </header>

      <main>
        <div className="actions-bar">
          <h2 className="section-title">Team Directory</h2>
          <button className="btn-add" onClick={handleAddNew}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            Add Member
          </button>
        </div>

        <EmployeeList
          refreshKey={refreshKey}
          onEdit={handleEdit}
        />

        {showForm && (
          <EmployeeForm
            employeeToEdit={employeeToEdit}
            onSave={handleSave}
            onCancel={handleCloseForm}
          />
        )}
      </main>
    </div>
  );
}

export default App;
