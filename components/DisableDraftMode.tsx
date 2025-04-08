
"use client";
import { disableDraftMode } from "@/sanity/lib/draft-mode/disable";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function DisableDraftMode() {
    const router = useRouter();
    const [pending, startTransition] = useTransition();

    const disable = () =>
        startTransition(async () => {
            await disableDraftMode();
            router.refresh();
        });

    return (
        <div>
            {pending ? (
                "Disabling draft mode..."
            ) : (
                <button type="button" onClick={disable}>
                    Disable draft mode
                </button>
            )}
        </div>
    );
}