import { getGuestApi } from "@/api/guest-api";
import { GuestResponse, RewardResponse } from "@/GuestApiTypes";
import { ThemeSpaceVariable } from "@caspeco/casper-ui-library.base-ui.theme";
import { Box } from "@caspeco/casper-ui-library.components.box";
import { Button } from "@caspeco/casper-ui-library.components.button";
import { Flex } from "@caspeco/casper-ui-library.components.flex";
import { FormControl, FormLabel } from "@caspeco/casper-ui-library.components.formcontrol";
import { Input } from "@caspeco/casper-ui-library.components.input";
import { Text } from "@caspeco/casper-ui-library.components.text";
import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalFooter,
	ModalHeader,
} from "@caspeco/casper-ui-library.components.modal";
import { Stack } from "@caspeco/casper-ui-library.components.stack";
import { Table, TableContent, TableToolbar } from "@caspeco/casper-ui-library.components.table";
import { useToast } from "@caspeco/casper-ui-library.components.toast";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "@caspeco/casper-ui-library.components.badge";
import { Icon } from "@caspeco/casper-ui-library.components.icon";
import { GuestModal } from "./edit-guest-modal";

export default function GuestService() {
	const api = getGuestApi();

	const [guests, setGuests] = useState<GuestResponse[]>([]);
	const [editGuest, setEditGuest] = useState<GuestResponse>();
	const [searchQuery, setSearchQuery] = useState<string>("");

	useEffect(() => {
		const getGuests = async () => {
			const response = await api.v1.getGuests();

			setGuests(response.data.guestList);
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
			header: "E-post",
		},
		{
			accessorKey: "identifier",
			header: "Gäst-ID",
		},
		{
			accessorKey: "createdDate",
			header: "Skapad",
			// todo: type this corectly
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			cell: (info: any) => {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
				const date = new Date(info.getValue()).toLocaleDateString();
				return <>{date}</>;
			},
		},
	];

	const onGuestUpdated = (identifier: string, guest: GuestForUpdate) => {
		setGuests((guests) => {
			const updatedGuests = guests.map((g) => {
				if (g.identifier === identifier) {
					return { ...g, name: guest.name, msisdn: guest.msisdn };
				}
				return g;
			});

			return updatedGuests;
		});
	};

  const onGuestDeleted = () => {
    const getGuests = async () => {
			const response = await api.v1.getGuests();

			setGuests(response.data.guestList);
		};

		getGuests().catch(console.error);
  }

	const onClose = () => {
		setEditGuest(undefined);
	};

	const filteredGuest = useMemo(() => {
		if (!searchQuery) {
			return guests;
		}

		return guests.filter(
			(g) =>
				g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				g.emailAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
				g.identifier.toLowerCase().includes(searchQuery.toLowerCase()),
		);
	}, [searchQuery, guests]);

	return (
		<>
			<Box minWidth="1000px">
				<Table data={filteredGuest} columns={columns} localeString="sv-SE">
					<TableToolbar
						tableName="Gäster"
						onSearch={(ev) => {
							setSearchQuery(ev.target.value);
						}}
					/>
					<TableContent
						onClickRow={(ev) => {
							setEditGuest(ev as GuestResponse);
						}}
					/>
				</Table>
			</Box>
			<GuestModal guest={editGuest} onClose={onClose} onGuestUpdated={onGuestUpdated} onGuestDeleted={onGuestDeleted} />
		</>
	);
}

type GuestForUpdate = {
	name: string;
  msisdn: string,
};

