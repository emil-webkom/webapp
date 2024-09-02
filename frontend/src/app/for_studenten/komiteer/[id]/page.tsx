'use client';

import useFetch from '@/hooks/use-fetch';
import { Komite } from '@/schemas/komite';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const KomitePage = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const { data, loading, error } = useFetch<Komite>(`/api/komite/id?id=${id}`);

if (loading){
  return(
  <div className='w-full items-center justify-center flex'>
    <div className="animate-ping h-4 w-4 bg-blue-400 rounded-full"></div>
  </div>
  )
}

  return (
    <div className="w-full p-6 text-white flex flex-col items-center gap-y-4">
      <img src={data?.bilde} alt="Komite bilde" className="px-4 lg:px-8 rounded-md w-full h-[50vh] object-contain" />
      <div className='max-w-[512px]'>
      <h1 className="text-3xl font-bold">{data?.navn}</h1>
      <p>Make pretty komitePage</p>
      </div>
    </div>
  );
};

export default KomitePage;
