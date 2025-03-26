export default {
  name: 'brandMemory',
  title: 'Brand Memory',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'ID',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'brandId',
      title: 'Brand ID',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'history',
      title: 'History',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'id', type: 'string' },
            { name: 'timestamp', type: 'datetime' },
            { 
              name: 'type',
              type: 'string',
              options: {
                list: [
                  { title: 'Creation', value: 'creation' },
                  { title: 'Update', value: 'update' },
                  { title: 'Decision', value: 'decision' },
                  { title: 'Campaign', value: 'campaign' },
                  { title: 'Interaction', value: 'interaction' },
                ],
              },
            },
            { name: 'description', type: 'text' },
            { name: 'data', type: 'object' },
            { name: 'importance', type: 'number' },
            { name: 'connections', type: 'array', of: [{ type: 'string' }] },
          ],
        },
      ],
    },
    {
      name: 'values',
      title: 'Values',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'key', type: 'string' },
            { name: 'value', type: 'string' },
            { name: 'confidence', type: 'number' },
            {
              name: 'source',
              type: 'string',
              options: {
                list: [
                  { title: 'AI Derived', value: 'ai-derived' },
                  { title: 'User Defined', value: 'user-defined' },
                  { title: 'Hybrid', value: 'hybrid' },
                ],
              },
            },
          ],
        },
      ],
    },
    {
      name: 'visualIdentity',
      title: 'Visual Identity',
      type: 'object',
      fields: [
        {
          name: 'colorPalette',
          type: 'object',
          fields: [
            { name: 'primary', type: 'array', of: [{ type: 'string' }] },
            { name: 'secondary', type: 'array', of: [{ type: 'string' }] },
            { name: 'accent', type: 'array', of: [{ type: 'string' }] },
            { name: 'neutral', type: 'array', of: [{ type: 'string' }] },
            {
              name: 'semantic',
              type: 'object',
              fields: [
                { name: 'success', type: 'string' },
                { name: 'warning', type: 'string' },
                { name: 'error', type: 'string' },
                { name: 'info', type: 'string' },
              ],
            },
          ],
        },
        {
          name: 'typography',
          type: 'object',
          fields: [
            {
              name: 'fonts',
              type: 'object',
              fields: [
                { name: 'primary', type: 'string' },
                { name: 'secondary', type: 'string' },
                { name: 'accent', type: 'string' },
              ],
            },
            {
              name: 'sizes',
              type: 'object',
              fields: [
                { name: 'xs', type: 'string' },
                { name: 'sm', type: 'string' },
                { name: 'base', type: 'string' },
                { name: 'lg', type: 'string' },
                { name: 'xl', type: 'string' },
                { name: '2xl', type: 'string' },
                { name: '3xl', type: 'string' },
                { name: '4xl', type: 'string' },
              ],
            },
            {
              name: 'weights',
              type: 'object',
              fields: [
                { name: 'light', type: 'number' },
                { name: 'regular', type: 'number' },
                { name: 'medium', type: 'number' },
                { name: 'semibold', type: 'number' },
                { name: 'bold', type: 'number' },
              ],
            },
          ],
        },
        {
          name: 'patterns',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'id', type: 'string' },
                { name: 'name', type: 'string' },
                {
                  name: 'type',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Pattern', value: 'pattern' },
                      { title: 'Texture', value: 'texture' },
                      { title: 'Gradient', value: 'gradient' },
                    ],
                  },
                },
                { name: 'value', type: 'string' },
                { name: 'usage', type: 'array', of: [{ type: 'string' }] },
              ],
            },
          ],
        },
        {
          name: 'assets',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'id', type: 'string' },
                { name: 'name', type: 'string' },
                {
                  name: 'type',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Logo', value: 'logo' },
                      { title: 'Icon', value: 'icon' },
                      { title: 'Image', value: 'image' },
                      { title: 'Illustration', value: 'illustration' },
                    ],
                  },
                },
                { name: 'url', type: 'url' },
                { name: 'variants', type: 'object' },
                {
                  name: 'metadata',
                  type: 'object',
                  fields: [
                    {
                      name: 'dimensions',
                      type: 'object',
                      fields: [
                        { name: 'width', type: 'number' },
                        { name: 'height', type: 'number' },
                      ],
                    },
                    { name: 'format', type: 'string' },
                    { name: 'size', type: 'number' },
                    { name: 'tags', type: 'array', of: [{ type: 'string' }] },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'insights',
      title: 'Insights',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'id', type: 'string' },
            {
              name: 'type',
              type: 'string',
              options: {
                list: [
                  { title: 'Trend', value: 'trend' },
                  { title: 'Opportunity', value: 'opportunity' },
                  { title: 'Risk', value: 'risk' },
                  { title: 'Recommendation', value: 'recommendation' },
                ],
              },
            },
            { name: 'title', type: 'string' },
            { name: 'description', type: 'text' },
            { name: 'confidence', type: 'number' },
            { name: 'source', type: 'string' },
            { name: 'data', type: 'object' },
            { name: 'createdAt', type: 'datetime' },
            { name: 'expiresAt', type: 'datetime' },
          ],
        },
      ],
    },
    {
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
    },
  ],
}; 