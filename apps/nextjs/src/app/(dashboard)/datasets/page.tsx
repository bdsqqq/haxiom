import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@haxiom/ui/select";
import { TopToolBar } from "../_components/top-tool-bar";
import { MOCK_DATASETS } from "../_constants";

export default function Page() {
  return (
    <TopToolBar>
      <Select>
        <SelectTrigger className="w-[240px]">
          <SelectValue placeholder="Select dataset..."/>
        </SelectTrigger>
        <SelectContent>
          {MOCK_DATASETS.map((dataset) => (
            <SelectItem key={dataset.id} value={dataset.id}>
              {dataset.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </TopToolBar>
  );
}
