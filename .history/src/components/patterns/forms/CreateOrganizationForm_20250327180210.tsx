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
      <div className="p-4 bg-green-50 text-green-700 rounded-md">
        <p>Organization created successfully!</p>
        <button
          className="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded-md"
          onClick={() => setSuccess(false)}
        >
          Create Another
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 border border-system rounded-md">
      <h2 className="text-xl font-bold mb-4">Create Organization</h2>
      
      {error && (
        <div className="mb-4 p-2 bg-red-50 text-red-500 rounded-md">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1 font-medium">
            Organization Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-system rounded-md"
            placeholder="Enter organization name"
            disabled={isSubmitting}
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="description" className="block mb-1 font-medium">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-system rounded-md"
            placeholder="Enter organization description"
            rows={3}
            disabled={isSubmitting}
          />
        </div>
        
        <button
          type="submit"
          className="px-4 py-2 border border-system rounded-md"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Create Organization'}
        </button>
      </form>
    </div>
  );
}; 