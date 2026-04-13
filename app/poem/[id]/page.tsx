"use client";

import { PoemViewPage } from "@/src/features/poems/ui/poem-page/poem-view-page";

interface PageProps {
  params: { id: string };
}

export default function PoemPage({ params }: PageProps) {
  return <PoemViewPage poemId={Number(params.id)} />;
}
