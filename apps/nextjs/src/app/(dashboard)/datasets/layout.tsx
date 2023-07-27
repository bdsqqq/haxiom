import { TopToolBar } from '../_components/top-tool-bar';
import { SelectDataset } from './_components/select-dataset';
import {
  DocsButton,
  QueryHistoryButton,
  StarredQuerriesButton,
  VirtualFieldsButton,
} from './_components/top-toolbar-buttons';

export default function DatasetsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopToolBar className="justify-between">
        <div className="flex h-full items-center">
          <SelectDataset />
        </div>
        <div className="flex h-full items-center gap-2">
          <DocsButton />
          <Separator />
          <VirtualFieldsButton />
          <StarredQuerriesButton />
          <QueryHistoryButton />
        </div>
      </TopToolBar>
      {children}
    </>
  );
}

const Separator = () => <div className="bg-gray-6 w-px my-2 h-full mx-2" />;
