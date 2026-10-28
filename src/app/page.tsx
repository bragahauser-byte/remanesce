import { Gallery } from "@/components/home/gallery";
import { brand } from "@/data/copy";

export default function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col justify-end overflow-hidden">
      <h1 className="sr-only">
        {brand.name}: {brand.collection}
      </h1>
      <Gallery />
    </div>
  );
}
