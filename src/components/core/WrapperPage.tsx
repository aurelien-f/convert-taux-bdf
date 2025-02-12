export const WrapperPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="pt-12 md:pt-32 pb-12 min-h-screen px-4 md:px-0">
      {children}
    </section>
  );
};