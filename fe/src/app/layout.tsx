import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Excel CRUD Uygulaması",
  description: "Excel dosyası üzerinde CRUD işlemleri yapabileceğiniz uygulama",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body>
        <header style={{ 
          backgroundColor: '#007bff', 
          color: 'white', 
          padding: '1rem 0',
          marginBottom: '2rem'
        }}>
          <div className="container">
            <h1 style={{ margin: 0, fontSize: '1.5rem' }}>
              📊 Excel CRUD Uygulaması
            </h1>
            <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9 }}>
              Excel dosyası üzerinde kullanıcı yönetimi
            </p>
          </div>
        </header>
        <main className="container">
          {children}
        </main>
      </body>
    </html>
  );
}
