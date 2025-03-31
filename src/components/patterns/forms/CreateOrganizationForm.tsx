import { useState } from 'react';
import { organizationService } from '@services/organizationService';

export const CreateOrganizationForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('Organization name is required');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      await organizationService.create({
        name,
        description,
        created_at: new Date().toISOString(),
      });

      setSuccess(true);
      setName('');
      setDescription('');
    } catch (err) {
      console.error('Error creating organization:', err);
      setError('Failed to create organization. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-md bg-green-50 p-4 text-green-700">
        <p>Organization created successfully!</p>
        <button
          className="bg-primary text-primary-foreground mt-2 rounded-md px-4 py-2"
          onClick={() => setSuccess(false)}
        >
          Create Another
        </button>
      </div>
    );
  }

  return (
    <div className="border-system rounded-md border p-4">
      <h2 className="mb-4 text-xl font-bold">Create Organization</h2>

      {error && <div className="mb-4 rounded-md bg-red-50 p-2 text-red-500">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="mb-1 block font-medium">
            Organization Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-system w-full rounded-md border p-2"
            placeholder="Enter organization name"
            disabled={isSubmitting}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="mb-1 block font-medium">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-system w-full rounded-md border p-2"
            placeholder="Enter organization description"
            rows={3}
            disabled={isSubmitting}
          />
        </div>

        <button
          type="submit"
          className="border-system rounded-md border px-4 py-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Create Organization'}
        </button>
      </form>
    </div>
  );
};
