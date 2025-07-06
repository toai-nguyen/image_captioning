export default function MainLayout({ children }) {
    return (
        <main className="main-layout">
            <div className="container">
                {children}
            </div>
        </main>
    );
}