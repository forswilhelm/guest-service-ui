import { Api, GuestResponse } from "@/GuestApiTypes";
import { Table, TableContent } from "@caspeco/casper-ui-library.components.table";
import { Text } from "@caspeco/casper-ui-library.components.text";
import { useEffect, useState } from "react";

export default function GuestService() {

  const api = new Api({baseUrl: "http://localhost:8083", baseApiParams: {
    headers: {
      "system": "erics-test-system",
    },
    format: "json",
  }});



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

          getGuests();

        }, []); 

        

        const columns = [
          {
            accessorKey: 'name',
            header: 'Namn',
          },
          {
            accessorKey: 'emailAddress',
            header: 'Email',
          },
        ];
      
        // const data = [
        //   {
        //     name: 'Wilhelm',
        //     identifier: '1',
        //   },
        //   {
        //     name: 'Jörgen',
        //     identifier: '2',
        //   },
        //   {
        //     name: 'Eric',
        //     id: 3,
        //   },
        // ];

	return <>
    <Text>This is the guest service j</Text>
    <Table data={guests} columns={columns} localeString="en-US">
    <TableContent />
    </Table>
    </>;
}