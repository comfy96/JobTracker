import { useState, useEffect, useMemo } from 'react';
import type { JobApplication, ApplicationStatus } from './types/job';
import { StorageService } from './services/storage';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { FilterBar } from './components/FilterBar';
import { JobCard } from './components/JobCard';
import { JobModal } from './components/JobModal';
import { ConfirmDeleteModal } from './components/ConfirmDeleteModal';
import { EmptyState } from './components/EmptyState';

export function App() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('newest');

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingApplication, setEditingApplication] = useState<JobApplication | null>(null);
  const [deletingApplication, setDeletingApplication] = useState<JobApplication | null>(null);

  useEffect(() => {
    const loaded = StorageService.getApplications();
    setApplications(loaded);
  }, []);

  const handleOpenAddModal = () => {
    setEditingApplication(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (app: JobApplication) => {
    setEditingApplication(app);
    setIsModalOpen(true);
  };

  const handleSaveApplication = (
    data: Omit<JobApplication, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    if (editingApplication) {
      const updatedList = StorageService.updateApplication(editingApplication.id, data);
      setApplications(updatedList);
    } else {
      StorageService.addApplication(data);
      setApplications(StorageService.getApplications());
    }
  };

  const handleQuickStatusChange = (id: string, newStatus: ApplicationStatus) => {
    const updatedList = StorageService.updateApplication(id, { status: newStatus });
    setApplications(updatedList);
  };

  const handleDeleteConfirm = () => {
    if (!deletingApplication) return;
    const updatedList = StorageService.deleteApplication(deletingApplication.id);
    setApplications(updatedList);
    setDeletingApplication(null);
  };

  const handleResetData = () => {
    if (window.confirm('Reset applications back to sample demo data?')) {
      const reset = StorageService.resetToSampleData();
      setApplications(reset);
      setSelectedStatus('ALL');
      setSearchQuery('');
    }
  };

  // Filtered & Sorted applications
  const filteredApplications = useMemo(() => {
    return applications
      .filter((app) => {
        // Status filter
        if (selectedStatus !== 'ALL' && app.status !== selectedStatus) {
          return false;
        }

        // Search filter
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchCompany = app.company.toLowerCase().includes(query);
          const matchRole = app.role.toLowerCase().includes(query);
          const matchNotes = app.notes?.toLowerCase().includes(query);
          return matchCompany || matchRole || matchNotes;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime();
        } else if (sortBy === 'oldest') {
          return new Date(a.appliedDate).getTime() - new Date(b.appliedDate).getTime();
        } else if (sortBy === 'company') {
          return a.company.localeCompare(b.company);
        }
        return 0;
      });
  }, [applications, selectedStatus, searchQuery, sortBy]);

  const hasFiltersApplied = selectedStatus !== 'ALL' || searchQuery.trim().length > 0;

  return (
    <div className="app-layout">
      <Header onOpenAddModal={handleOpenAddModal} onResetData={handleResetData} />

      <main className="main-container">
        <Dashboard
          applications={applications}
          activeFilter={selectedStatus}
          onSelectFilter={(status) => setSelectedStatus(status)}
        />

        <FilterBar
          selectedStatus={selectedStatus}
          onSelectStatus={setSelectedStatus}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalCount={applications.length}
          filteredCount={filteredApplications.length}
        />

        {filteredApplications.length > 0 ? (
          <div className="cards-grid">
            {filteredApplications.map((app) => (
              <JobCard
                key={app.id}
                application={app}
                onEdit={handleOpenEditModal}
                onDeleteRequest={(app) => setDeletingApplication(app)}
                onStatusChange={handleQuickStatusChange}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            hasFilters={hasFiltersApplied}
            onClearFilters={() => {
              setSelectedStatus('ALL');
              setSearchQuery('');
            }}
            onOpenAddModal={handleOpenAddModal}
            onResetData={handleResetData}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>
          <strong>JobTrack</strong> — Personal Application Tracker &bull; Built with React & LocalStorage
        </p>
      </footer>

      {/* Modals */}
      <JobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveApplication}
        editingApplication={editingApplication}
      />

      <ConfirmDeleteModal
        isOpen={Boolean(deletingApplication)}
        application={deletingApplication}
        onClose={() => setDeletingApplication(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}

export default App;
