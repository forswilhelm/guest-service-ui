import { getGuestApi } from "@/api/guest-api";
import { GuestResponse } from "@/GuestApiTypes";
import { ThemeSpaceVariable } from "@caspeco/casper-ui-library.base-ui.theme";
import { Box } from "@caspeco/casper-ui-library.components.box";
import { Button } from "@caspeco/casper-ui-library.components.button";
import { Flex } from "@caspeco/casper-ui-library.components.flex";
import { FormControl, FormLabel } from "@caspeco/casper-ui-library.components.formcontrol";
import { Input } from "@caspeco/casper-ui-library.components.input";
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
					return { ...g, name: guest.name };
				}
				return g;
			});

			return updatedGuests;
		});
	};

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
			<GuestModal guest={editGuest} onClose={onClose} onGuestUpdated={onGuestUpdated} />
		</>
	);
}

type GuestForUpdate = {
	name: string;
};

const GuestModal = ({
	guest,
	onClose,
	onGuestUpdated,
}: {
	guest: GuestResponse | undefined;
	onClose: () => void;
	onGuestUpdated: (identifier: string, guest: GuestForUpdate) => void;
}) => {
	const api = getGuestApi();

	const [guestForUpdate, setGuestForUpdate] = useState<GuestForUpdate>({
		name: guest?.name ?? "",
	});
	const [isSaving, setIsSaving] = useState(false);

	const { showToast } = useToast();

	useEffect(() => {
		if (!guest) {
			return;
		}

		setGuestForUpdate({
			name: guest.name,
		});
	}, [guest]);

	const updateGuest = async () => {
		if (!guest) {
			return;
		}
		setIsSaving(true);

		try {
			await api.v1.updateGuest(guest.identifier, {
				name: guestForUpdate.name,
			});

			showToast({
				title: "Gäst uppdaterad",
				description: "Gästen har uppdaterats.",
				type: "success",
				duration: 1000,
			});
			onGuestUpdated(guest.identifier, guestForUpdate);
			onClose();
		} catch (error) {
			setIsSaving(false);
			throw error;
		}
		setIsSaving(false);
	};

	return (
		<Modal isOpen={guest != undefined} onClose={onClose}>
			<ModalHeader
				display="flex"
				alignItems="center"
				justifyContent="space-between"
				p={ThemeSpaceVariable.Medium}
			>
				{guest?.name}
				<ModalCloseButton isAbsolutePositioned />
			</ModalHeader>
			<ModalBody px={ThemeSpaceVariable.Medium} pb={ThemeSpaceVariable.Medium}>
				{guest && (
					<Flex direction="column" gap={ThemeSpaceVariable.Medium}>
						<FormControl>
							<FormLabel>Namn</FormLabel>
							<Input
								value={guestForUpdate.name}
								onChange={(ev) => {
									setGuestForUpdate({ ...guestForUpdate, name: ev.target.value });
								}}
							/>
						</FormControl>
						<FormControl isReadOnly>
							<FormLabel>E-post</FormLabel>
							<Input value={guest.emailAddress} />
						</FormControl>
					</Flex>
				)}
			</ModalBody>
			<ModalFooter display="flex" justifyContent="flex-end" p={ThemeSpaceVariable.Medium}>
				<Stack direction="row" spacing={ThemeSpaceVariable.Small}>
					<Button variant="ghost" onClick={onClose}>
						Avbryt
					</Button>
					<Button
						variant="primary"
						isLoading={isSaving}
						onClick={() => {
							updateGuest().catch(console.error);
						}}
					>
						Spara
					</Button>
				</Stack>
			</ModalFooter>
		</Modal>
	);
};
