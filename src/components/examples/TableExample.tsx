import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

// Try to import table components
let Table: React.ComponentType<any> | undefined;
let TableHead: React.ComponentType<any> | undefined;
let TableBody: React.ComponentType<any> | undefined;
let TableRow: React.ComponentType<any> | undefined;
let TableHeader: React.ComponentType<any> | undefined;
let TableCell: React.ComponentType<any> | undefined;

try {
  const tableComponents = require('@/components/catalyst/table');
  Table = tableComponents.Table;
  TableHead = tableComponents.TableHead;
  TableBody = tableComponents.TableBody;
  TableRow = tableComponents.TableRow;
  TableHeader = tableComponents.TableHeader;
  TableCell = tableComponents.TableCell;
} catch (e) {
  console.warn('Table components could not be loaded:', (e as Error).message);
}

// Sample data for the table
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
  { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'User', status: 'Active' },
  { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Editor', status: 'Pending' },
];

// Fallback table component using basic HTML
const FallbackTable = () => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {users.map((user) => (
          <tr key={user.id}>
            <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
            <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
            <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 
                  user.status === 'Inactive' ? 'bg-red-100 text-red-800' : 
                  'bg-yellow-100 text-yellow-800'}`}>
                {user.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export function TableExample() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Table Component</CardTitle>
        </CardHeader>
        <CardContent>
          {Table && TableHead && TableBody && TableRow && TableHeader && TableCell ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>Name</TableHeader>
                  <TableHeader>Email</TableHeader>
                  <TableHeader>Role</TableHeader>
                  <TableHeader>Status</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 
                          user.status === 'Inactive' ? 'bg-red-100 text-red-800' : 
                          'bg-yellow-100 text-yellow-800'}`}>
                        {user.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <FallbackTable />
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Striped Table</CardTitle>
        </CardHeader>
        <CardContent>
          {Table && TableHead && TableBody && TableRow && TableHeader && TableCell ? (
            <Table striped>
              <TableHead>
                <TableRow>
                  <TableHeader>Name</TableHeader>
                  <TableHeader>Email</TableHeader>
                  <TableHeader>Role</TableHeader>
                  <TableHeader>Status</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 
                          user.status === 'Inactive' ? 'bg-red-100 text-red-800' : 
                          'bg-yellow-100 text-yellow-800'}`}>
                        {user.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <FallbackTable />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default TableExample; 