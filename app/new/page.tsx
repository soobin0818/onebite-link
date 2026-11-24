import NewLinkForm from "@/components/NewLinkForm";
import { folders } from "@/lib/mock-data";

export default function NewLinkPage() {
  return (
    <section className="flex max-w-lg flex-col gap-6">
      <h1 className="text-2xl font-bold">새 링크</h1>
      <NewLinkForm folders={folders} />
    </section>
  );
}
