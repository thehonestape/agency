import { useState } from "react";
import { projectsService } from "@services/api";
import type { Database } from "@/types/database.types";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import { Textarea } from "@ui/textarea";
import { toast } from "react-hot-toast";

type InsertProject = Database['public']['Tables']['projects']['Insert'];

interface CreateProjectFormProps {
  brandId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export function CreateProjectForm({ brandId, onSuccess, onCancel }: CreateProjectFormProps) {
  const [formData, setFormData] = useState<Omit<InsertProject, 'brand_id' | 'current_phase' | 'discovery_complete' | 'definition_complete' | 'design_complete' | 'development_complete'>>({
    name: '',
    description: '',
    status: 'draft',
    start_date: null,
    due_date: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (error) return;

    try {
      setIsSubmitting(true);
      const projectData: InsertProject = {
        ...formData,
        brand_id: brandId,
        current_phase: 'discovery',
        discovery_complete: false,
        definition_complete: false,
        design_complete: false,
        development_complete: false,
      };

      await projectsService.create(projectData);
      onSuccess();
      toast.success('Project created successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create project');
      toast.error('Failed to create project');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Project Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
          />
        </div>

        <div>
          <Label htmlFor="start_date">Start Date</Label>
          <Input
            id="start_date"
            name="start_date"
            type="date"
            value={formData.start_date || ''}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="due_date">Due Date</Label>
          <Input
            id="due_date"
            name="due_date"
            type="date"
            value={formData.due_date || ''}
            onChange={handleChange}
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex justify-end space-x-3">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting || !!error}>
            {isSubmitting ? 'Creating...' : 'Create Project'}
          </Button>
        </div>
      </div>
    </form>
  );
} 