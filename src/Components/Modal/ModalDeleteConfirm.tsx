import Bouton from "../ui/Bouton";
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
    >
      <div>
        <div className="my-8">
          Etes vous sur de vouloir supprimer cette entité ?
        </div>
        <div className="flex justify-center gap-4">
          <Bouton type="normal" btnAction={() => deleteAction()}>
            Oui
          </Bouton>
          <Bouton type="normal" btnAction={() => setWantToDelete(false)}>
            Non
          </Bouton>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDeleteConfirm;