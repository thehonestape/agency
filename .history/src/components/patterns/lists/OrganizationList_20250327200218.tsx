import { useState, useEffect } from 'react';
import { organizationService } from '@services/api';
import type { Database } from "@/types/database.types";

type Organization = Database['public']['Tables']['organizations']['Row'];

export const OrganizationList = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        setLoading(true);
        const data = await organizationService.getAll();
        setOrganizations(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching organizations:', err);
        setError('Failed to load organizations. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto"></div>
        <p className="text-center mt-2">Loading organizations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-500 rounded-md">
        <p>{error}</p>
      </div>
    );
  }

  if (organizations.length === 0) {
    return (
      <div className="p-4 text-center">
        <p className="text-muted-foreground">No organizations found.</p>
        <button 
          className="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded-md"
          onClick={() => {
            // This would typically open a modal or navigate to a form
            alert('Create organization functionality would go here');
          }}
        >
          Create Organization
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Organizations</h2>
      <ul className="space-y-2">
        {organizations.map((org) => (
          <li 
            key={org.id}
            className="p-4 border border-system rounded-md hover:bg-accent transition-colors"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-medium">{org.name}</h3>
              <span className="text-xs text-muted-foreground">
                Created: {new Date(org.created_at).toLocaleDateString()}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}; 