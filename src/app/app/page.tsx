import { getCollectionsWithReminders } from "@/server/queries/collections";
import { cn } from "@/lib/utils";
import { container } from "@/components/ui/container";
import ShowCollection from "@/components/collections/showCollection";
import BlankCollection from "@/components/collections/blankCollection";
import CollectionGroup from "@/components/collections/collectionGroup";
import CreateCollection from "@/components/collections/createCollection";
import { Await } from "@/lib/await";

export default function AppHomepage() {
  return (
    <>

      <div className="flex flex-col">
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
                        <p className="opacity-50 mt-50">
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
