import { twMerge } from 'tailwind-merge';

const Section = ({ children, className }) => {
  return (
    <section className={twMerge(`xs:min-h-[100dvh] md:min-h-[80dvh] px-4 md:px-[clamp(1.5rem,10vw,17rem)] my-12 py-6`, className)}>
      {children}
    </section>
  );
};

export default Section;
