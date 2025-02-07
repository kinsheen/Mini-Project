import { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FaList, FaPlus, FaTrash, FaTrashCan } from "react-icons/fa6";
import {
  addAchievement,
  deleteAchievement,
  getAchievements,
} from "../api/context";

const Achievement = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [description, setDescription] = useState("");
  const [achievements, setAchievements] = useState([]);
  const [shouldRefetch, setShouldRefetch] = useState(false);

  const fetchAchievements = async () => {
    const response = await getAchievements();
    setAchievements(response);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addAchievement(description);
    fetchAchievements();
    setIsOpen(false);
  };

  useEffect(() => {
    fetchAchievements();
  }, [shouldRefetch]);

  return (
    <div className="achievement mt-7 p-7">
      <div className="flex flex-row gap-2 mb-13 -mt-11 text-white">
        <div className="flex w-40 bg-[#0F4C5C] rounded-md p-2">
          <FaList className="mt-1 mx-1" />
          <h3 className=""> ACHIEVEMENT</h3>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="flex w-30 bg-[#0F4C5C] rounded-md p-2 hover:bg-[#0a3540] transition-colors"
        >
          <FaPlus className="mt-1 mx-1" />
          <h3 className="cursor-pointer">CREATE</h3>
        </button>
      </div>

      <div className="achievement-box h-100 bg-[#0F4C5C]">
        {achievements?.map((achievement, index) => (
          <ul key={index} className="list-disc list-inside p-2">
            <li className="text-white flex items-start">
              <span className="mr-2">•</span>
              <div className="flex flex-1">
                <div className="flex-1">{achievement.description}</div>
              </div>
              <div>
                <FaTrashCan
                  className="mx-2 cursor-pointer"
                  onClick={async () => {
                    await deleteAchievement(achievement._id);
                    setShouldRefetch((prev) => !prev);
                  }}
                />
              </div>
            </li>
          </ul>
        ))}
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0  bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-[#9FB7BE] border-2 p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-between items-center mb-4">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Add New Achievement
                    </Dialog.Title>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="mt-2">
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border border-gray-300 bg-white rounded-md focus:ring-2 focus:ring-[#0F4C5C] focus:border-transparent"
                        placeholder="Enter achievement description"
                        required
                      />
                    </div>

                    <div className="mt-4 flex justify-end">
                      <button
                        type="button"
                        className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                        onClick={() => setIsOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-[#0F4C5C] rounded-md hover:bg-[#0a3540]"
                      >
                        Add Achievement
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Achievement;
