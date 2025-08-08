import { useQuery } from "@tanstack/react-query";
import { Eye, Edit, Trash2, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import type { Record } from "@/shared/schema";

interface RecordsTableProps {
  filters: {
    search: string;
    status: string;
    category: string;
  };
  onEdit: (record: Record) => void;
  onDelete: (record: Record) => void;
}

export default function RecordsTable({ filters, onEdit, onDelete }: RecordsTableProps) {
  const [sortField, setSortField] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const queryParams = new URLSearchParams();
  if (filters.search) queryParams.append("search", filters.search);
  if (filters.status) queryParams.append("status", filters.status);
  if (filters.category) queryParams.append("category", filters.category);

  const { data: records, isLoading, error } = useQuery<Record[]>({
    queryKey: ["/api/records", queryParams.toString()],
  });

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field: string) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4 text-gray-400" />;
    return sortDirection === "asc" ? 
      <ArrowUp className="h-4 w-4 text-primary" /> : 
      <ArrowDown className="h-4 w-4 text-primary" />;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
      case "inactive":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Inactive</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "technology":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Technology</Badge>;
      case "design":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Design</Badge>;
      case "business":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Business</Badge>;
      default:
        return <Badge variant="secondary">{category}</Badge>;
    }
  };

  const getInitials = (name: string) => {
    return name.split(" ").map(word => word.charAt(0)).join("").substring(0, 2).toUpperCase();
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-600">
            Error loading records. Please try again.
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!records || records.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-gray-500">
            No records found. Create your first record to get started.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">All Records</h3>
        <p className="mt-1 text-sm text-gray-600">
          Showing {records.length} records
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("id")}
              >
                <div className="flex items-center space-x-1">
                  <span>ID</span>
                  {getSortIcon("id")}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center space-x-1">
                  <span>Name</span>
                  {getSortIcon("name")}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("category")}
              >
                <div className="flex items-center space-x-1">
                  <span>Category</span>
                  {getSortIcon("category")}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("status")}
              >
                <div className="flex items-center space-x-1">
                  <span>Status</span>
                  {getSortIcon("status")}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("createdAt")}
              >
                <div className="flex items-center space-x-1">
                  <span>Created</span>
                  {getSortIcon("createdAt")}
                </div>
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {records.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  #{record.id.substring(0, 8)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-medium text-primary">
                        {getInitials(record.name)}
                      </span>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">{record.name}</div>
                      {record.description && (
                        <div className="text-sm text-gray-500">{record.description}</div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getCategoryBadge(record.category)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(record.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(record.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <Button variant="ghost" size="sm" title="View">
                      <Eye className="h-4 w-4 text-gray-400 hover:text-primary" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => onEdit(record)} title="Edit">
                      <Edit className="h-4 w-4 text-gray-400 hover:text-amber-600" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => onDelete(record)} title="Delete">
                      <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-600" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
