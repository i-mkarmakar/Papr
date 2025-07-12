import type { Metadata } from "next";

import { getCollectionsWithReminders } from "@/server/queries/collections";

import { cn } from "@/lib/utils";
import { container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

import LoadingData from "@/components/loadingData";
import AppOptions from "@/components/layout/appOptions";
import ShowCollection from "@/components/collections/showCollection";
import BlankCollection from "@/components/collections/blankCollection";
import CollectionGroup from "@/components/collections/collectionGroup";
import CreateCollection from "@/components/collections/createCollection";
import { Await } from "@/lib/await";

export default function AppHomepage() {
  return (
    <>
      <AppOptions>
        <CreateCollection>
          <Button className="cursor-pointer">
            <PlusIcon size={16} />
            <span className="font-bold">Create Collection</span>
          </Button>
        </CreateCollection>
      </AppOptions>
      <div className="flex flex-col border-t-4">
        <main className={cn(container, "mt-6")}>
          <Await
            promise={getCollectionsWithReminders()}
            fallback={<LoadingData text="Preparing..." />}
            errorComponent={<div>Error</div>}
          >
            {(data) => {
              if (data) {
                if (data.length === 0) {
                  return (
                    <BlankCollection>
                      <CreateCollection>
                        <p className="font-onest text-lg">
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
    </>
  );
}
