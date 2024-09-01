'use client';

import useFetch from '@/hooks/use-fetch';
import { Komite } from '@/schemas/komite';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const KomitePage = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const { data } = useFetch<Komite>(`/api/komite/${id}`);

  return (
    <div className="w-full p-6 text-white flex flex-col gap-y-4">
      <h1 className="text-3xl font-bold">{id}</h1>
    </div>
  );
};

export default KomitePage;
