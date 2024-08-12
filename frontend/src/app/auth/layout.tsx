// NOE MED DENNE KODEN GJØR AT SVG'ER IKKE LASTER KORREKT - NICCO SE PÅ DETTE?
// DET ER NEXT JS SITT PROBLEM AS DRITTEN FUCKER OPP HVER GANG MED NY LAYOUT...

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
