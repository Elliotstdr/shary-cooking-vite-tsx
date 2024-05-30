import { Dropdown } from "primereact/dropdown";
import { fetchPost, useFetchGet } from "../../Hooks/api.hook";
import Bouton from "../ui/Bouton";
import { useState } from "react";
import { errorToast, successToast } from "../../Services/functions";
import { useSelector } from "react-redux";
import { GiCook } from "react-icons/gi";
import Modal from "../ui/Modal";

type Props = {
  visibleModalShare: boolean,
  setVisibleModalShare: React.Dispatch<React.SetStateAction<boolean>>,
  listId: number
}

const ModalShareList = ({ visibleModalShare, setVisibleModalShare, listId }: Props) => {
  const auth = useSelector((state: RootState) => state.auth);
  const [userSelected, setUserSelected] = useState<RestrictedUser | null>(null)
  const users = useFetchGet<RestrictedUser[]>('/users')

  const share = async () => {
    if (!userSelected) return

    const res = await fetchPost(`/list/${listId}/share/${userSelected.id}`, {})
    if (res.error) {
      errorToast('Une erreur est survenue lors du partage')
      return
    }

    setVisibleModalShare(false)
    successToast('Liste partagée !')
  }

  const itemTemplate = (item: RestrictedUser) => {
    return (
      <div className="flex items-center gap-2">
        {item.imageUrl
          ? <img
            src={import.meta.env.VITE_BASE_URL_API + item.imageUrl}
            alt="ma pp"
            className=" size-6 rounded-full mr-2 object-cover"
          ></img>
          : (
            <GiCook
              className="text-green size-6 mr-2"
            ></GiCook>
          )
        }
        <span>{item.name}</span>
      </div>
    )
  }

  const valueTemplate = (item: RestrictedUser | null) => {
    if (!item) {
      return <span className="p-3"></span>
    }

    return itemTemplate(item)
  }

  return (
    <Modal
      visible={visibleModalShare}
      setVisible={setVisibleModalShare}
      headerClassName="!p-4"
      contentClassName="!px-2 laptop:!px-4"
    >
      <div className="flex-center gap-4 mt-8">
        <Dropdown
          value={userSelected}
          options={users.data?.filter((x) => x.id !== auth.userConnected?.id) || []}
          optionLabel="name"
          onChange={(e) => setUserSelected(e.value)}
          itemTemplate={itemTemplate}
          valueTemplate={valueTemplate}
          className="w-52"
        ></Dropdown>
        <Bouton btnAction={() => share()}>Partager</Bouton>
      </div>
    </Modal>
  );
};

export default ModalShareList;