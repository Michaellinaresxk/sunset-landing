import Image from 'next/image';
import Link from 'next/link';
import FooterContactButton from '@/src/components/FooterContactButton';

export default function Footer() {
  return (
    <footer className='bg-zinc-950 border-t border-white/5'>
      <div className='max-w-3xl mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-start'>
          {/* ── Left: Brand ─────────────────────────────── */}
          <div className='space-y-4'>
            <Link href='/' className='inline-block'>
              <Image
                src='https://luxpuntacana.com/img/logo.png'
                alt='LuxPuntaCana'
                width={140}
                height={40}
                className='h-10 w-auto object-contain'
                unoptimized
              />
            </Link>
            <p className='text-white/40 text-sm font-light leading-relaxed max-w-xs'>
              Guided horseback riding tours along Playa Macao beach at golden
              hour. Hotel pickup included — book online in minutes.
            </p>

            {/* Social */}
            <div className='flex items-center gap-4 pt-1'>
              <a
                href='https://www.instagram.com/lxpuntacana/'
                target='_blank'
                rel='noopener noreferrer'
                className='text-white/30 hover:text-white/70 transition-colors'
                aria-label='Instagram'
              >
                <svg
                  width='18'
                  height='18'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <rect x='2' y='2' width='20' height='20' rx='5' ry='5' />
                  <circle cx='12' cy='12' r='4' />
                  <circle
                    cx='17.5'
                    cy='6.5'
                    r='0.5'
                    fill='currentColor'
                    stroke='none'
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* ── Right: Contact ───────────────────────────── */}
          <div className='space-y-3'>
            <p className='text-xs font-medium text-white/30 uppercase tracking-widest'>
              Contact
            </p>

            {/* WhatsApp */}
            <a
              href='https://wa.me/18298123753'
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-3 text-white/60 hover:text-white transition-colors group'
            >
              <span className='w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors flex-shrink-0'>
                <svg
                  width='15'
                  height='15'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='text-emerald-400'
                >
                  <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z' />
                  <path d='M12 0C5.373 0 0 5.373 0 12c0 2.118.554 4.107 1.523 5.832L0 24l6.338-1.499A11.946 11.946 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.002-1.368l-.358-.214-3.724.881.939-3.618-.234-.372A9.818 9.818 0 1 1 12 21.818z' />
                </svg>
              </span>
              <span className='text-sm'>+1 (829) 812-3753</span>
            </a>

            {/* Contact modal trigger — Client Component */}
            <FooterContactButton />

            {/* Location */}
            <div className='flex items-center gap-3 text-white/40'>
              <span className='w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0'>
                <svg
                  width='14'
                  height='14'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='text-white/30'
                >
                  <path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z' />
                  <circle cx='12' cy='10' r='3' />
                </svg>
              </span>
              <span className='text-sm'>Playa Macao, Punta Cana, RD</span>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ──────────────────────────────────── */}
        <div className='mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3'>
          <p className='text-xs text-white/20'>
            © {new Date().getFullYear()} LuxPuntaCana. All rights reserved.
          </p>
          <div className='flex items-center gap-1 text-xs text-white/20'>
            <svg
              width='12'
              height='12'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <rect x='3' y='11' width='18' height='11' rx='2' ry='2' />
              <path d='M7 11V7a5 5 0 0 1 10 0v4' />
            </svg>
            Secure payments via Stripe
          </div>
        </div>
      </div>
    </footer>
  );
}
