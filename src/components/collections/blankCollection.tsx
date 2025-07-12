import type { ReactNode } from "react";

interface BlankCollectionProps {
  children: ReactNode;
}

const BlankCollection = (props: BlankCollectionProps) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-3 py-4">
      {props.children}
    </div>
  );
};

export default BlankCollection;
