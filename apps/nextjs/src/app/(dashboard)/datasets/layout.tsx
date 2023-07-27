import { TopToolBar } from '../_components/top-tool-bar';
import { SelectDataset } from './_components/select-dataset';

export default function DatasetsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopToolBar>
        <SelectDataset />
      </TopToolBar>
      {children}
    </>
  );
}
