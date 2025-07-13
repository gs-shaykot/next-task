'use client';

import Navbar from "@/app/components/Navbar";
import AuthProvider from "@/app/context/AuthProvider";

export default function ClientLayout({ children }) {
    return (
        <AuthProvider>
            <Navbar />
            {children}
        </AuthProvider>
    );
}
