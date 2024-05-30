import SimpleButton from "../ui/SimpleButton";
import Modal from "./Modal";

type Props = {
  wantToDelete: boolean,
  setWantToDelete: React.Dispatch<React.SetStateAction<boolean>>,
  deleteAction: () => void
}

const ModalDeleteConfirm = ({ wantToDelete, setWantToDelete, deleteAction }: Props) => {
  return (
    <Modal
      visible={wantToDelete}
      setVisible={setWantToDelete}
      header={"Confirmer la suppression"}
      headerClassName="!p-2"
    >
      <div>
        <div className="my-8">
          Etes vous sur de vouloir supprimer cette entité ?
        </div>
        <div className="flex justify-center gap-4">
          <SimpleButton btnAction={() => deleteAction()}>
            Oui
          </SimpleButton>
          <SimpleButton btnAction={() => setWantToDelete(false)}>
            Non
          </SimpleButton>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDeleteConfirm;