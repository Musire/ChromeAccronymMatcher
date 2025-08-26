import { InfoIcon as Info, Check as Success, X as Error } from "lucide-react";

const icons = {
    info: [Info, "text-sky-50 bg-sky-900"], 
    success: [Success, "text-black bg-green-200"],
    error: [Error, "text-red-50 bg-error dark:bg-error-dark"]
}

const Toast = ({ data }) => {
  const { type, message } = data
  const [Icon, styling] = icons[type]

  return (
    <div className={` relative flex items-center gap-x-4 p-3 rounded-lg text-black shadow-md animate-fade ${styling}`}>
      <Icon size={30} />
      <p className="">{message}</p>
      <div className="absolute bottom-0 left-0 h-1 bg-green-700 animate-progress" />
    </div>
  )
}

export default Toast