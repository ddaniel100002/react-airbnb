'use client'
//NOT ADJUSTED TO NEXTJS! WE NEED TO USE TOASTER LIKE THIS!! UNDER THE HOOD, IT USES USEEFFECT, AND WE NEED A WRAPPER LIKE THIS TO MAKE THIS WORK.
import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {

  return (
    <Toaster />
  )
}
export default ToasterProvider;