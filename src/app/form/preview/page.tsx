import PreviewPage from "@/components/preview/PreviewPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Preview Form',
  description: 'Preview your form'
}

const page = () => {
  return <PreviewPage/>
}

export default page