'use client';

import { MOCK_DATASETS } from '~/app/(dashboard)/_constants';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@haxiom/ui/table';
import { Button } from '@haxiom/ui/button';
import Link from 'next/link';
import { HardDrive, Layers } from '@haxiom/ui/icons';

const DATASET_URL_PREFIX = '/datasets';
const MAKE_DATASET_URL = (id: string) => `${DATASET_URL_PREFIX}/${id}`;

export const DatasetsTable = () => {
  return (
    <Table className="border">
      <TableHeader>
        <TableRow className="bg-subtle hover:bg-subtle">
          <TableHead className="text-gray-12 w-full flex justify-between items-center">
            <span>Datasets</span>
            <Button>New Dataset</Button>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {MOCK_DATASETS.map((dataset) => (
          <TableRow key={dataset.id}>
            <TableCell className="font-medium p-0 hover:bg-element-hover focus-within:bg-element-hover focus-within:ring-1 focus-within:ring-inset focus-within:ring-gray-8 focus-within:ring-offset-0">
              <Link
                className="w-full flex justify-between h-full p-4 focus:ring-offset-0 focus:ring-0"
                href={MAKE_DATASET_URL(dataset.id)}
              >
                <span>{dataset.name}</span>
                <div className="flex gap-4 font-mono">
                  <span className="inline-flex items-center gap-1">
                    {dataset.size.value}
                    {dataset.size.unit} <HardDrive className="w-4 h-4" />
                  </span>
                  <span className="inline-flex items-center gap-1">
                    {dataset.entries} <Layers className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
