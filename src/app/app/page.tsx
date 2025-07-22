import type { Metadata } from "next";
import { Await } from "@/lib/await";
import { getCollectionsWithReminders } from "@/server/queries/collections";
import { cn } from "@/lib/utils";
import { container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import AppOptions from "@/components/layout/appOptions";
import ShowCollection from "@/components/collections/showCollection";
import BlankCollection from "@/components/collections/blankCollection";
import CollectionGroup from "@/components/collections/collectionGroup";
import CreateCollection from "@/components/collections/createCollection";

export const metadata: Metadata = {
  title: "Home",
};

export default function AppHomepage() {
  return (
    <div className="flex flex-col pb-5">
      <AppOptions>
        <CreateCollection>
          <Button variant="default" className="cursor-pointer">
            <PlusIcon size={16} />
            <span>Create Collection</span>
          </Button>
        </CreateCollection>
      </AppOptions>
      <main className={cn(container, "mt-6")}>
        <Await
          promise={getCollectionsWithReminders()}
          errorComponent={<div>Error</div>}
        >
          {(data) => {
            if (data) {
              if (data.length === 0) {
                return (
                  <BlankCollection>
                    <CreateCollection>
                      <p className="mt-6 text-center opacity-50">
                        Start organizing your things by creating a collection
                      </p>
                    </CreateCollection>
                  </BlankCollection>
                );
              }
              return (
                <CollectionGroup>
                  {data.map((item, idx) => (
                    <ShowCollection
                      key={item.collection.id ?? idx}
                      collection={item.collection}
                      reminders={item.reminders}
                    />
                  ))}
                </CollectionGroup>
              );
            }
          }}
        </Await>
      </main>
    </div>
  );
}
