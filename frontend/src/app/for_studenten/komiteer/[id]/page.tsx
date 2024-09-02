'use client';

import HSCard from '@/components/cards/styretCard';
import SmallTransissionPCSPC from '@/components/hero/transissions/smallTransissionPCSPC';
import useFetch from '@/hooks/use-fetch';
import { Komite } from '@/schemas/komite';
import { useEffect, useState } from 'react';

const KomitePage = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const { data, loading, error } = useFetch<Komite>(`/api/komite/id?id=${id}`);
  const [leder, setLeder] = useState<boolean>(true);
  const [hasMail, sethasMail] = useState<boolean>(true);
  const [isStyret, setIsStyret] = useState<boolean>(false);
  const [styret, setStyret] = useState([]);

  const fetchAndSetStyretData = async () => {
    try {
      const response = await fetch("/api/styret");
      const styretData = await response.json();
      setStyret(styretData);
    } catch (error) {
      console.error("Error fetching styret data:", error);
    }
  };

  useEffect(() => {
    if (!loading && data) {
      const hasLeder = !!data.leder;
      setLeder(hasLeder);

      const hasMail = !!data.mail;
      sethasMail(hasMail);

      const isHS = data.id === "clz5mq8g500012l1u5dwp0wyb";
      setIsStyret(isHS);

      if (isHS) {
        fetchAndSetStyretData();
      }
    }
  }, [data, loading]);

  if (loading) {
    return (
      <div className='w-full flex items-center justify-center'>
        <div className="animate-ping h-4 w-4 bg-blue-400 rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='w-full flex items-center justify-center'>
        <p className="text-red-500">Failed to load data.</p>
      </div>
    );
  }

  return (
    <div className="w-full text-white flex flex-col items-center ">
      <img src={data?.bilde} alt="Komite bilde" className="px-4 lg:px-8 rounded-md w-full lg:h-[50vh] object-contain" />
      <div className='max-w-[512px] px-4 space-y-4'>
        <h1 className="text-3xl font-bold text-center py-4">{data?.navn}</h1>
        <div className='w-full rounded-md p-4 bg-[#001D21]'>
          <p>{data?.text2}</p>
        </div>
      </div>
      <SmallTransissionPCSPC />
      <div className="w-full bg-[#225654] rounded-b-xl flex flex-col items-center justify-center p-4 gap-y-4">
        <div className='max-w-[512px] flex items-center justify-center px-2 lg:px-4'>
          <p className='text-sm'>{data?.text3}</p>
        </div>
        <div className='w-full flex flex-col items-center justify-center'>
          <div className='max-w-[512px] p-4 bg-[#3333] rounded-md text-center'>
              {leder ? (
                <>
                  <p className='font-bold text-base'>Leder: {data?.leder}</p>
                  {hasMail ? (
                    <p className="font-bold text-base">Kontakt: {data?.mail}</p>
                  ) : (
                    <div>Ta kontakt med leder for ytterlige spørsmål</div>
                  )}
                </>
              ) : (
                <>
                <p>Komite har hverken leder eller mail.
                  <br></br>
                   Ta kontakt med hovedstyret for spørsmål angående komiteen: styret@emilweb.no</p>
                </>
              )}
          </div>
</div>

      </div>
    </div>
  );
};

export default KomitePage;