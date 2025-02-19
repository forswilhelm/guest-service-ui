import { Api, GuestResponse } from "@/GuestApiTypes";
import { Box } from "@caspeco/casper-ui-library.components.box";
import { Modal, ModalBody, ModalCloseButton, ModalHeader, useDisclosure } from "@caspeco/casper-ui-library.components.modal";
import { Table, TableContent, TableDataType, TableToolbar } from "@caspeco/casper-ui-library.components.table";
import { TableSubrows } from "@caspeco/casper-ui-library.components.table/dist/tableTypes";
import { useEffect, useState } from "react";

export default function GuestService() {
	const api = new Api({
		baseUrl: "http://localhost:8083",
		baseApiParams: {
			headers: {
				system: "erics-test-system",
			},
			format: "json",
		},
	});

	const [guests, setGuests] = useState<GuestResponse[]>([]);

	useEffect(() => {
		const getGuests = async () => {
			try {
				const response = await api.v1.getGuests();

				setGuests(response.data.guestList);
			} catch (error) {
				console.error(error);
			}
		};

		getGuests().catch(console.error);
	}, []);

	const columns = [
		{
			accessorKey: "name",
			header: "Namn",
		},
		{
			accessorKey: "emailAddress",
			header: "Email",
		},
    {
			accessorKey: "identifier",
			header: "GuestID",
		},
	];

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [clickedGuestId, setClickedGuestId] = useState("");


	return (
  <>
		<Box minWidth="600px">
			<Table data={guests} columns={columns} localeString="en-US">
      <TableToolbar
        tableName="Guests"
      />
				<TableContent onClickRow={ setClickedGuestId } />
			</Table>
      </Box>
      <GuestModal guestId={clickedGuestId} onClose={onClose} />
    </>
	);
}

const GuestModal = ({guestId, onClose}:{guestId: string; onClose: () => void}) => {
  return <Modal isOpen={guestId?.length > 0} onClose={onClose}>
  <ModalHeader>
    Modal title
    <ModalCloseButton />
  </ModalHeader>
  <ModalBody>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur magnam.
  </ModalBody>
</Modal>
}
