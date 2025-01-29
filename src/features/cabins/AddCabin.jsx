import { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import CabinTable from "./CabinTable";

// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);

//   const handleCLose = () => {
//     setIsOpenModal(false);
//   };

//   return (
//     <div>
//       <Button onClick={() => setIsOpenModal((showForm) => !showForm)}>
//         {isOpenModal ? "Hide form" : "Add cabin"}
//       </Button>
//       {isOpenModal && (
//         <Modal onCLose={handleCLose}>
//           <CreateCabinForm onCancel={handleCLose} />
//         </Modal>
//       )}
//     </div>
//   );
// }

function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button>Add cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddCabin;
