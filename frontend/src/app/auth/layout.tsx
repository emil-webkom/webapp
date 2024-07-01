// NOE MED DENNE KODEN GJØR AT SVG'ER IKKE LASTER KORREKT - NICCO SE PÅ DETTE?

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex items-center justify-center bg-slate-950">
      {children}
    </div>
  );
};

export default AuthLayout;
