'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Layout, Typography, Tag, Skeleton, Button, message, Space, Breadcrumb } from 'antd';
import { ArrowLeftOutlined, CalendarOutlined, UserOutlined, HomeOutlined } from '@ant-design/icons';
import ProtectedRoute from '../../../../components/ProtectedRoute';
import { useTheme } from '../../../../context/ThemeContext';
import { articlesAPI } from '@/utils/api';

const { Content, Footer } = Layout;
const { Title, Text, Paragraph } = Typography;

interface Article {
  id: number;
  title: string;
  description: string;
  content: string;
  author: string;
  publishedAt: string;
  tags: string[];
  imageUrl?: string;
}

const DocumentationPage = () => {
  const params = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const { darkMode } = useTheme();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const articleId = params.id as string;
        const data = await articlesAPI.getArticle(articleId);
        
        const enhancedArticle = {
          ...data.article,
          content: getEnhancedContent(data.article.id, data.article.title, data.article.content)
        };
        
        setArticle(enhancedArticle);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching article:', error);
        message.error('Failed to load documentation. Please try again.');
        setLoading(false);
      }
    };

    if (params.id) {
      fetchArticle();
    }
  }, [params.id]);

  const getEnhancedContent = (id: number, title: string, originalContent: string): string => {
    if (title.includes('Next.js')) {
      return `# Getting Started with Next.js

Next.js is a **React framework** that enables functionality such as server-side rendering and generating static websites for React-based web applications. It provides an excellent developer experience with features like zero configuration, built-in CSS support, and automatic code splitting.

## Why Next.js?

Next.js has become the go-to framework for building modern web applications. Here's why:

### 🚀 Performance
- **Server-Side Rendering (SSR)**: Render pages on the server for faster initial loads
- **Static Site Generation (SSG)**: Pre-render pages at build time for lightning-fast performance
- **Incremental Static Regeneration**: Update static content after deployment without rebuilding
- **Automatic Image Optimization**: Optimize images automatically for better Core Web Vitals

### 💻 Developer Experience
- **Zero Configuration**: Start building immediately with sensible defaults
- **Fast Refresh**: See changes instantly without losing component state
- **Built-in TypeScript Support**: First-class TypeScript integration
- **File-based Routing**: Simple routing with the pages directory
- **API Routes**: Build your backend API within the same project

### 🎯 Key Features

#### 1. Hybrid Static & Server Rendering
Next.js lets you choose between SSG and SSR on a per-page basis:

\`\`\`typescript
// Static Site Generation (SSG)
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  
  return {
    props: { data },
    revalidate: 60, // Re-generate every 60 seconds
  };
}

// Server-Side Rendering (SSR)
export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  
  return { props: { data } };
}
\`\`\`

#### 2. File-based Routing
Create routes by adding files to the \`pages\` directory:

\`\`\`
pages/
├── index.tsx          → /
├── about.tsx          → /about
├── blog/
│   ├── index.tsx      → /blog
│   └── [slug].tsx     → /blog/:slug
└── api/
    └── hello.ts       → /api/hello
\`\`\`

#### 3. API Routes
Build your API endpoints directly in Next.js:

\`\`\`\`typescript
// pages/api/users.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json({ users: ['John', 'Jane'] });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
\`\`\`

#### 4. Image Component
Optimized images out of the box:

\`\`\`\`typescript
import Image from 'next/image';

<Image
  src="/profile.jpg"
  alt="Profile Picture"
  width={400}
  height={400}
  priority
/>
\`\`\`

#### 5. Link Component
Client-side navigation with prefetching:

\`\`\`\`typescript
import Link from 'next/link';

<Link href="/about" prefetch>
  About Us
</Link>
\`\`\`

### 📦 Installation & Setup

Getting started is easy:

\`\`\`bash
# Create a new Next.js app
npx create-next-app@latest my-app

cd my-app

# Start development server
npm run dev

# Open http://localhost:3000
\`\`\`

### 🏗️ Project Structure

\`\`\`
my-app/
├── pages/              # Routes and API endpoints
│   ├── _app.tsx       # Custom App component
│   ├── _document.tsx  # Custom Document component
│   ├── index.tsx      # Home page
│   └── api/           # API routes
├── public/            # Static assets
├── styles/            # Global styles
├── components/        # Reusable components
├── hooks/             # Custom hooks
├── lib/               # Utility functions
└── package.json
\`\`\`

### 🎨 Styling Options

Next.js supports multiple styling approaches:

- **CSS Modules**: Scoped CSS with \`.module.css\` files
- **Styled JSX**: Built-in CSS-in-JS solution
- **Tailwind CSS**: Official Tailwind support
- **Emotion/Styled Components**: Third-party libraries
- **Sass**: Built-in Sass support

### 🔧 Advanced Features

#### Middleware
Run code before a request is completed:

\`\`\`\`typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
\`\`\`

#### Dynamic Routes
Create dynamic pages with bracket notation:

\`\`\`\`typescript
// pages/blog/[slug].tsx
export async function getStaticPaths() {
  const posts = await fetchPosts();
  
  return {
    paths: posts.map(post => ({ params: { slug: post.slug } })),
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const post = await fetchPost(params.slug);
  return { props: { post } };
}
\`\`\`

### 📊 Use Cases

Next.js is perfect for:

✅ **E-commerce sites** - Fast product pages with SSG
✅ **Blogs & Content sites** - SEO-friendly static generation
✅ **Dashboards** - Dynamic SSR for real-time data
✅ **Marketing pages** - Lightning-fast landing pages
✅ **Documentation sites** - Easy navigation and search
✅ **SaaS applications** - Full-stack capabilities

### 🚀 Deployment

Deploy anywhere or use Vercel for the best experience:

\`\`\`bash
# Build for production
npm run build

# Start production server
npm start
\`\`\`

### 📚 Resources

- **Official Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **GitHub**: [github.com/vercel/next.js](https://github.com/vercel/next.js)
- **Examples**: [github.com/vercel/next.js/tree/canary/examples](https://github.com/vercel/next.js/tree/canary/examples)
- **Learn Course**: [nextjs.org/learn](https://nextjs.org/learn)

---

*Start building amazing applications with Next.js today!*`;
    }
    
    if (title.includes('TypeScript Generics')) {
      return `# Understanding TypeScript Generics

Generics are one of the most powerful features in TypeScript, enabling you to write **reusable**, **type-safe**, and **flexible** code. They allow you to create components and functions that work with any data type while maintaining full type safety.

## What are Generics?

Generics provide a way to make components work with any data type without losing type information. Think of them as **variables for types**.

### Basic Syntax

\`\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}

// Usage
const result = identity<string>('Hello');  // Type: string
const number = identity<number>(42);       // Type: number
\`\`\`

The \`<T>\` is a **type variable** that acts as a placeholder for the actual type that will be provided later.

## Why Use Generics?

### ❌ Without Generics

\`\`\`\`typescript
function identity(arg: any): any {
  return arg;
}

const result = identity('Hello');
// Problem: Return type is 'any' - no type safety!
result.toFixed(); // No error, but fails at runtime
\`\`\`

### ✅ With Generics

\`\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}

const result = identity('Hello');
// Benefit: Return type is inferred as 'string'
result.toUpperCase(); // ✓ Works perfectly
\`\`\`

## Generic Functions

### Multiple Type Parameters

\`\`\`\`typescript
function merge<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

const person = merge(
  { name: 'John' },
  { age: 30 }
);
// Type: { name: string } & { age: number }
// Result: { name: 'John', age: 30 }
\`\`\`

### Generic Constraints

Restrict what types can be used with generics:

\`\`\`\`typescript
interface HasLength {
  length: number;
}

// T must extend HasLength
function logLength<T extends HasLength>(arg: T): number {
  return arg.length;
}

logLength('Hello');        // ✓ 5 (strings have length)
logLength([1, 2, 3]);      // ✓ 3 (arrays have length)
logLength(42);             // ✗ Error: number doesn't have length
\`\`\`

## Generic Interfaces

Create reusable interface templates:

\`\`\`\`typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Usage
const userResponse: ApiResponse<{ id: number; name: string }> = {
  data: { id: 1, name: 'John' },
  status: 200,
  message: 'Success'
};

const postsResponse: ApiResponse<string[]> = {
  data: ['Post 1', 'Post 2'],
  status: 200,
  message: 'Success'
};
\`\`\`

## Generic Classes

Make classes work with any type:

\`\`\`\`typescript
class DataStore<T> {
  private data: T[] = [];
  
  add(item: T): void {
    this.data.push(item);
  }
  
  getAll(): T[] {
    return this.data;
  }
  
  findById(id: number): T | undefined {
    return this.data.find(item => (item as any).id === id);
  }
}

// Usage
const users = new DataStore<User>();
users.add({ id: 1, name: 'John', email: 'john@example.com' });

const numbers = new DataStore<number>();
numbers.add(1);
numbers.add(2);
numbers.add(3);
\`\`\`

## Generic Utilities

TypeScript provides built-in generic utility types:

### Partial<T>
Make all properties optional:

\`\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

type PartialUser = Partial<User>;
// Result:
// {
//   id?: number;
//   name?: string;
//   email?: string;
// }
\`\`\`

### Required<T>
Make all properties required:

\`\`\`\`typescript
type RequiredUser = Required<PartialUser>;
// All properties are now required
\`\`\`

### Pick<T, K>
Select specific properties:

\`\`\`\`typescript
type UserNameOnly = Pick<User, 'name' | 'email'>;
// Result:
// {
//   name: string;
//   email: string;
// }
\`\`\`

### Omit<T, K>
Exclude specific properties:

\`\`\`\`typescript
type UserNoId = Omit<User, 'id'>;
// Result:
// {
//   name: string;
//   email: string;
// }
\`\`\`

### Record<K, T>
Create object type with specific keys and values:

\`\`\`\`typescript
type UserRoles = Record<'admin' | 'user' | 'guest', User>;
// Result:
// {
//   admin: User;
//   user: User;
//   guest: User;
// }
\`\`\`

## Advanced Generic Patterns

### Conditional Types

Types that depend on a condition:

\`\`\`\`typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<string>;  // true
type B = IsString<number>;  // false
\`\`\`

### Mapped Types

Transform existing types:

\`\`\`\`typescript
type ReadOnly<T> = {
  readonly [K in keyof T]: T[K];
};

interface Person {
  name: string;
  age: number;
}

type ReadOnlyPerson = ReadOnly<Person>;
// Result:
// {
//   readonly name: string;
//   readonly age: number;
// }
\`\`\`

### Infer Keyword

Extract types from other types:

\`\`\`\`typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

function getUser() {
  return { id: 1, name: 'John' };
}

type UserReturnType = ReturnType<typeof getUser>;
// Result: { id: number; name: string }
\`\`\`

## Real-World Examples

### API Response Handler

\`\`\`\`typescript
async function fetchAPI<T>(url: string): Promise<ApiResponse<T>> {
  const response = await fetch(url);
  const data = await response.json();
  return data as ApiResponse<T>;
}

// Usage
const user = await fetchAPI<User>('/api/user/1');
const posts = await fetchAPI<Post[]>('/api/posts');
\`\`\`

### Form State Management

\`\`\`\`typescript
function useForm<T extends Record<string, any>>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);
  
  const handleChange = (field: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };
  
  return { values, handleChange };
}

// Usage
const { values, handleChange } = useForm({
  username: '',
  email: '',
  password: ''
});
\`\`\`

### Higher-Order Components (HOC)

\`\`\`\`typescript
function withLoading<P extends object>(
  Component: React.ComponentType<P>
) {
  return function WithLoadingComponent(
    props: P & { isLoading: boolean }
  ) {
    const { isLoading, ...rest } = props;
    
    if (isLoading) {
      return <div>Loading...</div>;
    }
    
    return <Component {...(rest as P)} />;
  };
}
\`\`\`

## Best Practices

### ✅ Do's

1. **Use meaningful type names**: \`<T>\`, \`<U>\`, \`<V>\` are fine, but consider descriptive names like \`<TData>\`, \`<TError>\`
2. **Keep it simple**: Don't over-engineer with unnecessary generics
3. **Use type inference**: Let TypeScript infer types when possible
4. **Document complex generics**: Add comments explaining type constraints

### ❌ Don'ts

1. **Avoid \`any\`**: Defeats the purpose of type safety
2. **Don't use generics everywhere**: Only when they add value
3. **Avoid deeply nested generics**: They become hard to read

## Common Pitfalls

### 1. Forgetting Type Constraints

\`\`\`\`typescript
// ❌ Wrong
function getProperty<T, K>(obj: T, key: K) {
  return obj[key]; // Error: K might not be a key of T
}

// ✅ Correct
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]; // Works!
}
\`\`\`

### 2. Misusing Any

\`\`\`\`typescript
// ❌ Loses type information
function wrap<T>(arg: any): T {
  return arg;
}

// ✅ Maintains type safety
function wrap<T>(arg: T): T {
  return arg;
}
\`\`\`

## Summary

Generics enable you to:

✅ Write **reusable** code without duplicating logic
✅ Maintain **type safety** across different scenarios
✅ Create **flexible** APIs and components
✅ Reduce code duplication and improve maintainability
✅ Build robust utility types and helper functions

---

*Master generics to unlock TypeScript's full potential!*`;
    }
    
    return originalContent;
  };

  const layoutStyle = {
    minHeight: '100vh',
    background: darkMode ? '#050508' : '#ffffff'
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <Layout style={layoutStyle}>
          <Content style={{ padding: '24px', marginTop: 64 }}>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
              <Skeleton active paragraph={{ rows: 10 }} />
            </div>
          </Content>
        </Layout>
      </ProtectedRoute>
    );
  }

  if (!article) {
    return (
      <ProtectedRoute>
        <Layout style={layoutStyle}>
          <Content style={{ padding: '24px', marginTop: 64 }}>
            <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
              <Title level={2} style={{ color: darkMode ? '#fff' : '#000000' }}>Documentation not found</Title>
              <Button type="primary" onClick={() => router.push('/dashboard')}>
                Back to Dashboard
              </Button>
            </div>
          </Content>
        </Layout>
      </ProtectedRoute>
    );
  }

  const handleTagClick = (tag: string) => {
    console.log(`Tag clicked: ${tag}`);
    // Open tag search or filter - for now show alert
    if (typeof window !== 'undefined') {
      alert(`You clicked on tag: ${tag}\n\nThis could filter articles by this tag.`);
    }
  };

  return (
    <ProtectedRoute>
      <Layout style={layoutStyle}>
        <Content style={{ padding: '0 24px', marginTop: 64 }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <Breadcrumb
              items={[
                {
                  title: <HomeOutlined />,
                  onClick: () => router.push('/dashboard'),
                },
                {
                  title: 'Dashboard',
                  onClick: () => router.push('/dashboard'),
                },
                {
                  title: article.title,
                },
              ]}
              style={{ marginBottom: '24px' }}
            />

            <Button 
              icon={<ArrowLeftOutlined />} 
              onClick={() => router.push('/dashboard')}
              style={{ 
                marginBottom: '32px', 
                background: 'transparent',
                border: darkMode ? '1px solid rgba(255,255,255,0.2)' : '1px solid #e5e7eb',
                color: darkMode ? '#fff' : '#000',
                padding: '8px 16px',
                borderRadius: '8px',
                fontWeight: 500,
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = darkMode ? 'rgba(255,255,255,0.08)' : '#f9fafb';
                e.currentTarget.style.borderColor = darkMode ? 'rgba(255,255,255,0.3)' : '#d1d5db';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = darkMode ? 'rgba(255,255,255,0.2)' : '#e5e7eb';
              }}
            >
              Back to Dashboard
            </Button>

            <div style={{ 
              padding: '48px', 
              borderRadius: '16px', 
              background: darkMode ? 'rgba(255, 255, 255, 0.04)' : 'rgba(249, 250, 251, 0.8)',
              border: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e5e7eb'
            }}>
              <Title level={1} style={{ 
                color: darkMode ? '#fff' : '#000000', 
                marginBottom: '24px',
                fontSize: '42px',
                fontWeight: 800,
                lineHeight: 1.2
              }}>
                {article.title}
              </Title>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
                {article.tags.map(tag => (
                  <Tag 
                    key={tag} 
                    color={darkMode ? 'rgba(99, 102, 241, 0.15)' : '#f3f4f6'} 
                    style={{ 
                      color: darkMode ? '#a5b4fc' : '#4f46e5', 
                      borderRadius: '6px',
                      border: 'none',
                      padding: '6px 14px',
                      fontSize: '14px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTagClick(tag);
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = darkMode ? 'rgba(99, 102, 241, 0.25)' : 'rgba(99, 102, 241, 0.15)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = darkMode ? 'rgba(99, 102, 241, 0.15)' : '#f3f4f6';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleTagClick(tag);
                      }
                    }}
                  >
                    {tag}
                  </Tag>
                ))}
              </div>

              <Space direction="vertical" size="middle" style={{ width: '100%', marginBottom: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap', paddingTop: '24px', borderTop: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid #eaeaea' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <UserOutlined style={{ color: darkMode ? '#a5b4fc' : '#4f46e5', fontSize: '16px' }} />
                    <Text style={{ color: darkMode ? '#a1a1aa' : '#4b5563', fontSize: '14px' }}>
                      By <span style={{ fontWeight: 500 }}>{article.author}</span>
                    </Text>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CalendarOutlined style={{ color: darkMode ? '#a5b4fc' : '#4f46e5', fontSize: '16px' }} />
                    <Text style={{ color: darkMode ? '#71717a' : '#6b7280', fontSize: '14px' }}>
                      {new Date(article.publishedAt).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </Text>
                  </div>
                </div>
              </Space>

              <Paragraph 
                style={{ 
                  color: darkMode ? '#a1a1aa' : '#4b5563',
                  fontSize: '18px',
                  lineHeight: 1.8,
                  marginBottom: '40px',
                  fontWeight: 400,
                  padding: '24px',
                  background: darkMode ? 'rgba(99, 102, 241, 0.08)' : 'rgba(243, 244, 246, 0.6)',
                  borderRadius: '12px',
                  borderLeft: `4px solid ${darkMode ? '#818cf8' : '#6366f1'}`
                }}
              >
                {article.description}
              </Paragraph>

              <div 
                style={{ 
                  color: darkMode ? '#d4d4d8' : '#1f2937',
                  fontSize: '17px',
                  lineHeight: 1.9,
                  whiteSpace: 'pre-wrap'
                }}
                className="article-content"
              >
                {article.content.split('\n').map((paragraph, index) => {
                  if (paragraph.startsWith('# ')) {
                    return (
                      <h1 key={index} style={{ 
                        color: darkMode ? '#fff' : '#111827',
                        fontSize: '36px',
                        fontWeight: 800,
                        marginTop: '40px',
                        marginBottom: '24px',
                        paddingBottom: '12px',
                        borderBottom: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #e5e7eb'
                      }}>
                        {paragraph.replace('# ', '')}
                      </h1>
                    );
                  }
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h2 key={index} style={{ 
                        color: darkMode ? '#fff' : '#111827',
                        fontSize: '28px',
                        fontWeight: 700,
                        marginTop: '36px',
                        marginBottom: '20px'
                      }}>
                        {paragraph.replace('## ', '')}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h3 key={index} style={{ 
                        color: darkMode ? '#fff' : '#111827',
                        fontSize: '22px',
                        fontWeight: 600,
                        marginTop: '28px',
                        marginBottom: '16px'
                      }}>
                        {paragraph.replace('### ', '')}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith('#### ')) {
                    return (
                      <h4 key={index} style={{ 
                        color: darkMode ? '#fff' : '#111827',
                        fontSize: '18px',
                        fontWeight: 600,
                        marginTop: '24px',
                        marginBottom: '12px'
                      }}>
                        {paragraph.replace('#### ', '')}
                      </h4>
                    );
                  }
                  if (paragraph.startsWith('```')) {
                    return null;
                  }
                  if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
                    const listItemContent = paragraph.substring(2);
                    // Check if list item starts with emoji like ✅
                    const hasEmoji = /^[✅❌✏️📦🎯💻🚀] /.test(listItemContent);
                    
                    return (
                      <div key={index} style={{ 
                        display: 'flex',
                        alignItems: 'flex-start',
                        marginBottom: '12px',
                        paddingLeft: '8px'
                      }}>
                        <span style={{ 
                          color: darkMode ? '#818cf8' : '#6366f1',
                          marginRight: '12px',
                          fontWeight: 600,
                          fontSize: '18px'
                        }}>•</span>
                        <span>{listItemContent}</span>
                      </div>
                    );
                  }
                  
                  // Handle lines starting with emoji (like ✅) without bullet points
                  if (/^[✅❌✏️📦🎯💻🚀] /.test(paragraph)) {
                    return (
                      <div key={index} style={{ 
                        display: 'flex',
                        alignItems: 'flex-start',
                        marginBottom: '12px',
                        paddingLeft: '8px'
                      }}>
                        <span style={{ 
                          color: darkMode ? '#818cf8' : '#6366f1',
                          marginRight: '12px',
                          fontWeight: 600,
                          fontSize: '18px'
                        }}>•</span>
                        <span>{paragraph}</span>
                      </div>
                    );
                  }
                  if (paragraph.startsWith('---')) {
                    return (
                      <hr key={index} style={{ 
                        margin: '40px 0',
                        border: 'none',
                        borderTop: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #e5e7eb'
                      }} />
                    );
                  }
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return (
                      <p key={index} style={{ 
                        fontWeight: 600,
                        margin: '16px 0',
                        color: darkMode ? '#e4e4e7' : '#374151'
                      }}>
                        {paragraph.replace(/\*\*/g, '')}
                      </p>
                    );
                  }
                  if (paragraph.trim()) {
                    return (
                      <p key={index} style={{ 
                        marginBottom: '20px',
                        color: darkMode ? '#d4d4d8' : '#1f2937'
                      }}>
                        {paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                   .replace(/`([^`]+)`/g, '<code style="background: ' + (darkMode ? 'rgba(99, 102, 241, 0.2)' : 'rgba(243, 244, 246, 0.8)') + '; padding: 2px 8px; border-radius: 4px; font-family: monospace; font-size: 0.9em;">$1</code>')
                                   .split('<').map((part, i, arr) => {
                                     if (i === 0) return <span key={i}>{part}</span>;
                                     const [tag, ...content] = part.split('>');
                                     const closeTag = content.join('>').split('</')[0];
                                     const text = content.join('>').split('</')[1]?.replace(/[<>]/g, '') || '';
                                     return <span key={i}>{text}</span>;
                                   })}
                      </p>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center', color: darkMode ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)', background: 'transparent', marginTop: '48px' }}>
          Secure Portal ©{new Date().getFullYear()} - Documentation
        </Footer>
      </Layout>
    </ProtectedRoute>
  );
};

export default DocumentationPage;
