import React, { Suspense } from "react";
import { DotLoader } from "react-spinners";

export default function projectLayout({ children }) {
    return (
        <div className="mx-auto">
            <Suspense fallback={<DotLoader
                color="#1f3a56"
                size={80}
            />}>{children}</Suspense>
        </div>
    )
} 