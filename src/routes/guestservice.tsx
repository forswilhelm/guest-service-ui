import { Table, TableContent } from "@caspeco/casper-ui-library.components.table";
import { Text } from "@caspeco/casper-ui-library.components.text";



export default function GuestService() {
        const columns = [
          {
            accessorKey: 'name',
            header: 'Namn',
          },
          {
            accessorKey: 'id',
            header: 'Email',
          },
        ];
      
        const data = [
          {
            name: 'Wilhelm',
            id: '1',
          },
          {
            name: 'Jörgen',
            id: '2',
          },
          {
            name: 'Eric',
            id: 3,
          },
        ];

	return <>
    <Text>This is the guest service j</Text>
    <Table data={data} columns={columns} localeString="en-US">
    <TableContent />
    </Table>
    </>;
}