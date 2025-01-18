import {defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'category'}]}],
      validation: (rule) => rule.required().min(1).max(5),
    }),
    defineField({
      name: 'subCategory',
      title: 'Sub Category',
      type: 'string',
      options: {
        list: [
          // Text & Writing
          {title: 'Content Writing', value: 'content-writing'},
          {title: 'Copywriting', value: 'copywriting'},
          {title: 'Translation', value: 'translation'},
          {title: 'Summarization', value: 'summarization'},
          {title: 'Story Writing', value: 'story-writing'},
          
          // Image
          {title: 'Image Generation', value: 'image-generation'},
          {title: 'Image Editing', value: 'image-editing'},
          {title: 'Image Enhancement', value: 'image-enhancement'},
          
          // Video
          {title: 'Video Generation', value: 'video-generation'},
          {title: 'Video Editing', value: 'video-editing'},
          {title: 'Animation', value: 'animation'},
          
          // Code & IT
          {title: 'Code Generation', value: 'code-generation'},
          {title: 'Code Analysis', value: 'code-analysis'},
          {title: 'DevOps', value: 'devops'},
          
          // Voice
          {title: 'Text to Speech', value: 'text-to-speech'},
          {title: 'Voice Generation', value: 'voice-generation'},
          {title: 'Voice Cloning', value: 'voice-cloning'},
          
          // Business
          {title: 'Analytics', value: 'analytics'},
          {title: 'Finance', value: 'finance'},
          {title: 'Strategy', value: 'strategy'},
          
          // Marketing
          {title: 'Social Media', value: 'social-media'},
          {title: 'SEO', value: 'seo'},
          {title: 'Email Marketing', value: 'email-marketing'},
          
          // AI Detector
          {title: 'Text Detection', value: 'text-detection'},
          {title: 'Image Detection', value: 'image-detection'},
          
          // Chatbot
          {title: 'Customer Service', value: 'customer-service'},
          {title: 'Personal Assistant', value: 'personal-assistant'},
          
          // Design & Art
          {title: 'Graphic Design', value: 'graphic-design'},
          {title: 'UI/UX', value: 'ui-ux'},
          {title: 'Digital Art', value: 'digital-art'},
          
          // Life Assistant
          {title: 'Health', value: 'health'},
          {title: 'Fitness', value: 'fitness'},
          {title: 'Lifestyle', value: 'lifestyle'},
          
          // 3D
          {title: '3D Modeling', value: '3d-modeling'},
          {title: '3D Animation', value: '3d-animation'},
          {title: 'Texturing', value: 'texturing'},
          
          // Education
          {title: 'Learning Tools', value: 'learning-tools'},
          {title: 'Study Aids', value: 'study-aids'},
          {title: 'Research', value: 'research'},
          
          // Prompt
          {title: 'Prompt Engineering', value: 'prompt-engineering'},
          {title: 'Prompt Library', value: 'prompt-library'},
          
          // Productivity
          {title: 'Task Management', value: 'task-management'},
          {title: 'Automation', value: 'automation'},
          {title: 'Organization', value: 'organization'},
          
          // Other
          {title: 'Other', value: 'other'}
        ]
      }
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'button',
      title: 'Button',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string'
        },
        {
          name: 'url',
          title: 'Button URL',
          type: 'url'
        }
      ]
    }),
    defineField({
      name: 'additionalInformation',
      title: 'Additional Information',
      type: 'object',
      fields: [
        {
          name: 'developedBy',
          type: 'string',
          title: 'Developed By',
        },
        {
          name: 'publishedBy',
          type: 'string',
          title: 'Published By',
        },
        {
          name: 'releaseDate',
          type: 'date',
          title: 'Release Date',
          options: {
            dateFormat: 'MM/DD/YYYY',
          },
        },
        {
          name: 'approximateSize',
          type: 'string',
          title: 'Approximate Size',
          description: 'Specify the size (e.g., "283.9 MB")',
        },
        {
          name: 'installation',
          type: 'text',
          title: 'Installation',
          description: 'Installation instructions or details.',
        },
        {
          name: 'appCapabilities',
          type: 'array',
          title: 'This App Can',
          of: [{ type: 'string' }],
          description: 'List of capabilities of the app.',
        },
        {
          name: 'supportedLanguages',
          type: 'string',
          title: 'Supported Languages',
        },
        {
          name: 'publisherInfo',
          type: 'array',
          title: 'Publisher Info',
          of: [{ type: 'object', fields: [
            { name: 'type', type: 'string', title: 'Type', options: { list: ['Website', 'Contact Information'] } },
            { name: 'value', type: 'url', title: 'URL' }
          ]}]
        },
        {
          name: 'additionalTerms',
          type: 'array',
          title: 'Additional Terms',
          of: [{ type: 'object', fields: [
            { name: 'type', type: 'string', title: 'Type', options: { list: ['Privacy Policy', 'Terms of Service', 'Terms of Transaction', 'Read More'] } },
            { name: 'url', type: 'url', title: 'URL' }
          ]}]
        },
        {
          name: 'reportProduct',
          type: 'array',
          title: 'Report This Product',
          of: [{ type: 'string' }],
          description: 'Options for reporting the product.',
        },
        {
          name: 'seizureWarning',
          type: 'string',
          title: 'Seizure Warning',
        },
        {
          name: 'appBadge',
          type: 'string',
          title: 'App Badge',
        },
        {
          name: 'legalDisclaimer',
          type: 'text',
          title: 'Legal Disclaimer',
        },
      ]
    }),
    defineField({
      name: 'likes',
      title: 'Likes',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'media',
      title: 'Media',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          }
        },
        {
          type: 'file',
          options: {
            accept: 'video/*,audio/*'
          }
        }
      ],
      description: 'Upload images, videos, or audio files related to the post'
    }),
    defineField({
      name: 'likes',
      title: 'Likes',
      type: 'number',
      initialValue: 50, // Set initial value for likes
    }),
  ],
})
