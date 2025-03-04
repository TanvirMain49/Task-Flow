"use client";
import { deleteProject } from '@/action/projects';
import { Button } from '@/components/ui/button';
import useFetch from '@/Hooks/useFetch';
import { useOrganization } from '@clerk/nextjs';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { toast } from 'sonner';

export default function DeleteProject({ projectId }) {
  const { membership } = useOrganization();
  const router = useRouter();
  const isAdmin = membership?.role === "org:admin";

  const {
    data: deleted,
    loader: isDeleting,
    error,
    fn: deleteProjectFn,
  } = useFetch(deleteProject);

  const handleDeleted = () => {
    if (window.confirm("Are You Sure You Want to Delete this project?")) {
      deleteProjectFn(projectId);
    }
  };

  useEffect(() => {
    if (deleted?.success) {
      toast.error("Project Deleted!");
      router.refresh();
    }
  }, [deleted, router]);

  if (!isAdmin) return null;

  return (
    <>
      <Button
        onClick={handleDeleted}
        size="sm"
        disabled={isDeleting}
        className={`${isDeleting ? "animate-pulse" : ""}`}
        variant="ghost"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </>
  );
}
