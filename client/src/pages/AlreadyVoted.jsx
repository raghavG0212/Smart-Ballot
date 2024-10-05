import { FaArrowDown } from 'react-icons/fa';

export default function AlreadyVoted() {
  return (
    <div className="flex justify-center text-center items-center h-screen">
      <div className="flex flex-col space-y-4 items-center">
        <h1 className="text-5xl">You Have Already Voted</h1>
        <img src="/tick.webp" alt="Tick" height="150px" width="150px" />
        <div className="flex space-x-2">
          <h1 className="text-blue-500 mt-2">
            Check Out the Upcoming Elections Below
          </h1>
          <FaArrowDown className='mt-3'/>
        </div>
      </div>
    </div>
  );
}
