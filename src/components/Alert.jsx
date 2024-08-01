
const Alert = ({alertMessage, opacity}) => {
  return (
    <div style={{opacity: opacity}} className="absolute left-1/2 -translate-x-1/2 top-20 transition-opacity duration-500 bg-white p-5 w-96 text-center rounded-md font-bold border">{alertMessage}</div>
  )
}

export default Alert