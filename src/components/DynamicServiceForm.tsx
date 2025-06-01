
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface DynamicField {
  name: string;
  type: 'text' | 'number' | 'select' | 'textarea';
  label: string;
  required?: boolean;
  options?: string[];
  placeholder?: string;
}

interface CategoryConfig {
  [key: string]: DynamicField[];
}

const categoryConfigs: CategoryConfig = {
  'Photography': [
    { name: 'package_type', type: 'select', label: 'Package Type', required: true, options: ['Basic', 'Standard', 'Premium', 'Wedding Package'] },
    { name: 'session_duration', type: 'number', label: 'Session Duration (hours)', required: true },
    { name: 'edited_photos', type: 'number', label: 'Number of Edited Photos' },
    { name: 'equipment', type: 'textarea', label: 'Equipment Used', placeholder: 'List your camera, lenses, lighting equipment...' },
  ],
  'Venue': [
    { name: 'capacity', type: 'number', label: 'Maximum Capacity', required: true },
    { name: 'venue_type', type: 'select', label: 'Venue Type', required: true, options: ['Indoor', 'Outdoor', 'Hybrid'] },
    { name: 'amenities', type: 'textarea', label: 'Amenities', placeholder: 'Parking, A/C, Sound System, Catering Kitchen...' },
    { name: 'area_size', type: 'text', label: 'Area Size (sq ft)' },
  ],
  'Catering': [
    { name: 'cuisine_type', type: 'select', label: 'Cuisine Type', required: true, options: ['Indian', 'Continental', 'Chinese', 'Italian', 'Mixed'] },
    { name: 'service_style', type: 'select', label: 'Service Style', required: true, options: ['Buffet', 'Plated', 'Family Style', 'Cocktail'] },
    { name: 'min_guests', type: 'number', label: 'Minimum Guests', required: true },
    { name: 'max_guests', type: 'number', label: 'Maximum Guests', required: true },
    { name: 'dietary_options', type: 'textarea', label: 'Dietary Options', placeholder: 'Vegetarian, Vegan, Gluten-free, etc.' },
  ],
  'Decoration': [
    { name: 'decoration_style', type: 'select', label: 'Decoration Style', required: true, options: ['Traditional', 'Modern', 'Vintage', 'Minimalist', 'Rustic'] },
    { name: 'included_items', type: 'textarea', label: 'Included Items', placeholder: 'Flowers, Lighting, Draping, Centerpieces...' },
    { name: 'setup_time', type: 'number', label: 'Setup Time (hours)', required: true },
    { name: 'color_themes', type: 'text', label: 'Available Color Themes' },
  ],
  'Music & Entertainment': [
    { name: 'entertainment_type', type: 'select', label: 'Entertainment Type', required: true, options: ['DJ', 'Live Band', 'Solo Artist', 'Dancer', 'Comedian'] },
    { name: 'performance_duration', type: 'number', label: 'Performance Duration (hours)', required: true },
    { name: 'equipment_provided', type: 'textarea', label: 'Equipment Provided', placeholder: 'Sound system, microphones, lighting...' },
    { name: 'music_genres', type: 'text', label: 'Music Genres/Specialties' },
  ],
};

interface DynamicServiceFormProps {
  selectedCategory: string;
  onSubmit: (formData: any) => void;
  isLoading?: boolean;
}

const DynamicServiceForm: React.FC<DynamicServiceFormProps> = ({
  selectedCategory,
  onSubmit,
  isLoading = false
}) => {
  const [formData, setFormData] = useState<any>({});

  const categoryFields = categoryConfigs[selectedCategory] || [];

  const handleFieldChange = (fieldName: string, value: string | number) => {
    setFormData((prev: any) => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (categoryFields.length === 0) {
    return null;
  }

  const renderField = (field: DynamicField) => {
    switch (field.type) {
      case 'select':
        return (
          <Select onValueChange={(value) => handleFieldChange(field.name, value)}>
            <SelectTrigger>
              <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      
      case 'textarea':
        return (
          <Textarea
            placeholder={field.placeholder}
            value={formData[field.name] || ''}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            rows={3}
          />
        );
      
      case 'number':
        return (
          <Input
            type="number"
            value={formData[field.name] || ''}
            onChange={(e) => handleFieldChange(field.name, parseInt(e.target.value) || 0)}
            placeholder={field.placeholder}
          />
        );
      
      default:
        return (
          <Input
            type="text"
            value={formData[field.name] || ''}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
          />
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{selectedCategory} Specific Details</CardTitle>
        <CardDescription>
          Please provide additional details specific to {selectedCategory.toLowerCase()} services
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {categoryFields.map((field) => (
            <div key={field.name} className="space-y-2">
              <Label htmlFor={field.name}>
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </Label>
              {renderField(field)}
            </div>
          ))}
          
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? 'Saving...' : 'Save Category Details'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DynamicServiceForm;
