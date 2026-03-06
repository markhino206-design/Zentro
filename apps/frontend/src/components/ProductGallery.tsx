'use client';

import Image from 'next/image';
import { useState } from 'react';

export function ProductGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(images[0]);

  return (
    <div>
      <div className="relative h-80 overflow-hidden rounded-2xl bg-slate-100 md:h-[420px]">
        <Image src={active} alt={title} fill className="object-cover transition hover:scale-110" />
      </div>
      <div className="mt-3 flex gap-2">
        {images.map((img) => (
          <button key={img} onClick={() => setActive(img)} className="relative h-16 w-16 overflow-hidden rounded-lg border border-slate-200">
            <Image src={img} alt={title} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
