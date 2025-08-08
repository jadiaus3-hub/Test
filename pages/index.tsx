import { useState } from "react";
import Head from 'next/head';
import Header from "@/components/layout/header";
import FilterBar from "@/components/records/filter-bar";
import RecordsTable from "@/components/records/records-table";
import RecordFormModal from "@/components/records/record-form-modal";
import DeleteConfirmationModal from "@/components/records/delete-confirmation-modal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { Record } from "@/shared/schema";

export default function RecordsPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    category: "",
  });

  const handleEdit = (record: Record) => {
    setSelectedRecord(record);
    setIsEditModalOpen(true);
  };

  const handleDelete = (record: Record) => {
    setSelectedRecord(record);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModals = () => {
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedRecord(null);
  };

  return (
    <>
      <Head>
        <title>CRUD Manager - Records Management System</title>
        <meta name="description" content="Manage your data records with full CRUD operations. Create, read, update, and delete records with advanced filtering and search capabilities." />
      </Head>
      
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {/* Page Header */}
            <div className="mb-8">
              <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Records Management</h2>
                  <p className="mt-1 text-sm text-gray-600">Manage your data records with full CRUD operations</p>
                </div>
                <div className="mt-4 sm:mt-0">
                  <Button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="inline-flex items-center px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Record
                  </Button>
                </div>
              </div>
            </div>

            <FilterBar filters={filters} onFiltersChange={setFilters} />
            
            <RecordsTable
              filters={filters}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </main>

        <RecordFormModal
          isOpen={isCreateModalOpen}
          onClose={handleCloseModals}
          record={null}
          title="Create New Record"
        />

        <RecordFormModal
          isOpen={isEditModalOpen}
          onClose={handleCloseModals}
          record={selectedRecord}
          title="Edit Record"
        />

        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseModals}
          record={selectedRecord}
        />
      </div>
    </>
  );
}