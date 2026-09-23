import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'roles', 'createdAt'],
    group: 'Admin & Governance',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Full Name',
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['editor'],
      options: [
        { label: 'Super Administrator', value: 'admin' },
        { label: 'Editor / Content Manager', value: 'editor' },
        { label: 'Programme Reviewer', value: 'reviewer' },
        { label: 'Media Manager', value: 'media_manager' },
      ],
      label: 'System Roles',
      admin: {
        description: 'Assigned platform governance and content access roles.',
      },
    },
  ],
};
