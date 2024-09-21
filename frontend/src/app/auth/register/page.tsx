import { RegisterForm } from "@/components/auth/register-form";

export const revalidate = 0;

const RegisterPage = () => {
  return (
    <div className="w-full h-full flex justify-center items-center ">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
