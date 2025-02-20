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

export const GuestModal = ({
	guest,
	onClose,
	onGuestUpdated,
  onGuestDeleted,
}: {
	guest: GuestResponse | undefined;
	onClose: () => void;
	onGuestUpdated: (identifier: string, guest: GuestForUpdate) => void;
  onGuestDeleted: () => void;
}) => {
	const api = getGuestApi();

	const [guestForUpdate, setGuestForUpdate] = useState<GuestForUpdate>({
		name: guest?.name ?? "",
    msisdn: guest?.msisdn ?? "",
	});

  const [rewards, setRewards] = useState<RewardResponse>();

	const [isSaving, setIsSaving] = useState(false);

	const { showToast } = useToast();

	useEffect(() => {
		if (!guest) {
			return;
		}

    const getRewards = async () => {
      if (!guest) {
        return;
      }
			const response = await api.v1.collectVouchers({guestIdentifier: guest.identifier});

			setRewards(response.data.rewardList);
		};

    getRewards().catch(console.error);

		setGuestForUpdate({
			name: guest.name,
      msisdn: guest.msisdn ?? "",
		});
	}, [guest]);

  const deleteUser = async () => {
      if (!guest) {
        return;
      }
      try {
        await api.v1.deleteGuest(guest.identifier);
        showToast({
          title: "Gäst raderad",
          description: "Gästen har raderats.",
          type: "success",
          duration: 2000,
        });
        onGuestDeleted();
        onClose();
      } catch (error) {
        setIsSaving(false);
        throw error;
      }
    }

	const updateGuest = async () => {
		if (!guest) {
			return;
		}
		setIsSaving(true);

		try {
			await api.v1.updateGuest(guest.identifier, {
				name: guestForUpdate.name,
        msisdn: guestForUpdate.msisdn,
			});

			showToast({
				title: "Gäst uppdaterad",
				description: "Gästen har uppdaterats.",
				type: "success",
				duration: 2000,
			});
			onGuestUpdated(guest.identifier, guestForUpdate);
			onClose();
		} catch (error) {
			setIsSaving(false);
			throw error;
		}
		setIsSaving(false);
	};

  const columns = [
		{
			accessorKey: "name",
			header: "Namn",
		},
		{
			accessorKey: "status",
      cell: (info) => {
        if (info.getValue() === 'REDEEMED') {
          return (
            <Badge.Success>
              <>Redeemed</>
            </Badge.Success>
          );
        } else if (info.getValue() === 'EXPIRED') {
          return (
            <Badge.Error>
              <>Expired</>
            </Badge.Error>
          );
        }
      },
			header: "Status",
		},
		{
			accessorKey: "expiresAt",
			header: "Utgår",
			// todo: type this corectly
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			cell: (info: any) => {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
				const date = new Date(info.getValue()).toLocaleDateString();
				return <>{date}</>;
			},
		},
	];

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
						<FormControl isReadOnly>
							<FormLabel>E-post</FormLabel>
							<Input value={guest.emailAddress} />
              <FormLabel>Guest ID</FormLabel>
              <Input value={guest.identifier} />
						</FormControl>
            <FormControl>
							<FormLabel>Namn</FormLabel>
							<Input
								value={guestForUpdate.name}
								onChange={(ev) => {
									setGuestForUpdate({ ...guestForUpdate, name: ev.target.value });
								}}
							/>
              <FormLabel>Telefonnummer</FormLabel>
							<Input
								value={guestForUpdate.msisdn}
								onChange={(ev) => {
									setGuestForUpdate({ ...guestForUpdate, msisdn: ev.target.value });
								}}
							/>
						</FormControl>
					</Flex>
				)}
          <Text fontWeight="medium">Vouchers</Text>
          <Table data={rewards ?? []} columns={columns} localeString="sv-SE">
					<TableContent />
				</Table>
			</ModalBody>
			<ModalFooter display="flex" justifyContent="flex-end" p={ThemeSpaceVariable.Medium}>
				<Stack direction="row" spacing={ThemeSpaceVariable.Small}>
					<Button variant="ghost" onClick={onClose}>
						Avbryt
					</Button>
          <Button variant="secondary" rightIcon={Icon.Forward} onClick={() => {
             deleteUser().catch(console.error);
             }}>
						Radera användare
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
