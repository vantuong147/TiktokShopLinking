import React from 'react';

const DataTable: React.FC = () => {
    return (
        <table width="100%" style={{ marginTop: '20px' }}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Sample Data</td>
                    <td><button>Edit</button></td>
                </tr>
            </tbody>
        </table>
    );
};

export default DataTable;
