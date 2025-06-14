
import { useState } from 'react';

// Minimal hook implementation to fix build errors
export const useEventRequirements = () => {
  const [requirements] = useState([]);
  const [loading] = useState(false);
  const [error] = useState(null);

  return {
    requirements,
    loading,
    error,
  };
};
