'use client';

import { MOCK_DATASETS } from '~/app/(dashboard)/_constants';
import { Button } from '@haxiom/ui/button';
import Link from 'next/link';
import { HardDrive, Layers } from '@haxiom/ui/icons';
import { Card, CardContent, CardHeader, CardTitle } from '@haxiom/ui/card';
import { NewDatasetDialog } from './new-dataset-dialog';
import { DialogTrigger } from '@haxiom/ui/dialog';

const DATASET_URL_PREFIX = '/datasets';
const MAKE_DATASET_URL = (id: string) => `${DATASET_URL_PREFIX}/${id}`;

export const DatasetsTable = () => {
  return (
    <Card>
      <CardHeader className="justify-between">
        <CardTitle>Datasets</CardTitle>
        <NewDatasetDialog>
          <DialogTrigger asChild>
            <Button>New Dataset</Button>
          </DialogTrigger>
        </NewDatasetDialog>
      </CardHeader>
      <CardContent className="p-0">
        {MOCK_DATASETS.map((dataset) => (
          <Link
            key={dataset.id}
            className="w-full flex justify-between h-full p-4 hover:bg-element-hover focus:bg-element-hover focus:ring-offset-0 [&:not(:last-child)]:border-b"
            href={MAKE_DATASET_URL(dataset.id)}
          >
            <span>{dataset.name}</span>
            <div className="flex gap-4 font-mono uppercase text-sm">
              <span className="inline-flex items-center gap-1">
                {dataset.size.value}
                {dataset.size.unit} <HardDrive className="w-4 h-4 text-subtle" />
              </span>
              <span className="inline-flex items-center gap-1">
                {dataset.entries} <Layers className="w-4 h-4 text-subtle" />
              </span>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
};
