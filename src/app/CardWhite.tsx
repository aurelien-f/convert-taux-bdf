import { mondayMessage } from "@/components/MondayMessage";
export const CardWhite = ({ children }: { children: React.ReactNode }) => {
  return <>
    {new Date().getDay() === 1 && mondayMessage}  <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl mx-auto" >
      {children}
    </div >
  </>
}
