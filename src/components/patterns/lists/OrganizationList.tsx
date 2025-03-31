import { useState, useEffect } from 'react';
import { organizationService } from '@services/api';
import type { Database } from '@/types/database.types';

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
        <div className="border-primary mx-auto h-8 w-8 animate-spin rounded-full border-t-2 border-b-2"></div>
        <p className="mt-2 text-center">Loading organizations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (organizations.length === 0) {
    return (
      <div className="p-4 text-center">
        <p className="text-muted-foreground">No organizations found.</p>
        <button
          className="bg-primary text-primary-foreground mt-2 rounded-md px-4 py-2"
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
      <h2 className="mb-4 text-xl font-bold">Organizations</h2>
      <ul className="space-y-2">
        {organizations.map((org) => (
          <li
            key={org.id}
            className="border-system hover:bg-accent rounded-md border p-4 transition-colors"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{org.name}</h3>
              <span className="text-muted-foreground text-xs">
                Created: {new Date(org.created_at).toLocaleDateString()}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
