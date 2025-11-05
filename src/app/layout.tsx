import { AuthProvider } from '@/contexts/AuthContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#0A0A0A',
                  color: '#fff',
                  border: '1px solid #1a1a1a',
                },
                success: {
                  iconTheme: {
                    primary: '#00D9FF',
                    secondary: '#000',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#FF006E',
                    secondary: '#000',
                  },
                },
              }}
            />
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}