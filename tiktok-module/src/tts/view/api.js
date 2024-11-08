import React, { useState } from 'react';
import TopBar from './TopBar';
import { GetOrderList, GetOrderDetail, CancelOrder, ShipAllItem, GetPackageDetail } from '../service/APIManagers/OrderAPI';
import { GetProductDetail, GetProductList } from '../service/APIManagers/ProductAPI';
import { GetActiveShops } from '../service/APIManagers/SellerAPI';
import { GetCancellations } from '../service/APIManagers/ReturnfundAPI';

import { getCrrShopID } from '../service/HelperFunction';
import './css/api.css';

const Api = () => {
  const [result, setResult] = useState('');

  const handleRequest = (fetchFunction, ...args) => {
    fetchFunction(getCrrShopID(), ...args)
      .then(data => {
        console.log('Fetched Data:', data);
        setResult(JSON.stringify(data, null, 2));
      })
      .catch(error => {
        console.log('Error occurred:', error);
      });
  };

  const handleApiRequest = async (requestId) => {
    console.log("handleApiRequest: " + requestId);
    try {
      let response;
      if (requestId === 'get_order_list') {
        handleRequest(GetOrderList);
      } else if (requestId === 'get_order_detail') {
        const ids = prompt("Please enter IDs (format: id1,id2,...):");
        if (ids) {
          handleRequest(GetOrderDetail, ids);
        } else {
          console.log("No IDs entered.");
        }
      } else if (requestId === 'cancel_order') {
        const id = prompt("Please enter ID:");
        if (id) {
          const cancel_reason = prompt("Please enter reason:");
          handleRequest(CancelOrder, id, cancel_reason);
        } else {
          console.log("No ID entered.");
        }
      } else if (requestId === 'ship_all_items') {
        const id = prompt("Please enter ID:");
        handleRequest(ShipAllItem, id);
      } else if (requestId === 'get_package_detail') {
        const packageID = prompt("Enter packageID");
        handleRequest(GetPackageDetail, packageID);
      }
      //--------------------------------------------------------------Product------------------------------------------------
      else if (requestId === 'get_product_list') {
        handleRequest(GetProductList);
      } else if (requestId === 'get_product_detail') {
        const productID = prompt("Enter ID:");
        handleRequest(GetProductDetail, productID);
      }
      //-----------------------------------------------------------------Seller-----------------------------------------------
      else if (requestId === 'get_active_shops') {
        handleRequest(GetActiveShops);
      }
      //---------------------------------------------------------------Return/Refund----------------------------------------
      else if (requestId === 'get_cancellations') {
        let cancel_type = ['BUYER_CANCEL', 'CANCEL'];
        const filterCancelType = prompt("Enter filter CancelTypes: BUYER_CANCEL,CANCEL]");
        if (filterCancelType !== '') cancel_type = filterCancelType.trim().split(',');
        console.log("cancel_type: " + cancel_type);
        handleRequest(GetCancellations, { cancel_types: cancel_type });
      }
    } catch (error) {
      setResult('Error: ' + error.message);
    }
  };

  const exportToCSV = () => {
    try {
      // Parse the result string back to JSON
      let resultData = JSON.parse(result);

      if (resultData && resultData.data) {
        // Extract the headers from the first row of data
        const headers = Object.keys(resultData.data[0]);

        // Convert the data to CSV rows
        const rows = resultData.data.map(row => 
          headers.map(header => "'"+row[header]+"'").join(',')
        );

        // Combine the headers and rows into CSV format
        const csvContent = [headers.join(','), ...rows].join('\n');
        console.log(csvContent)


        // Create a Blob from the CSV content and trigger the download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'exported_data.csv';
        link.click();
        console.log('CSV export initiated!');
      } else {
        console.log('No valid data to export');
      }
    } catch (error) {
      console.error('Error during export:', error);
    }
  };

  return (
    <div className="api-page">
      <TopBar />
      <div className="api-content">
        <h2>API Functions</h2>
        <h3>Order APIs</h3>
        <button onClick={() => handleApiRequest('get_order_list')}>Get Order List</button>
        <button onClick={() => handleApiRequest('get_order_detail')}>Get Order Detail</button>
        <button onClick={() => handleApiRequest('cancel_order')}>Cancel Order</button>
        <button onClick={() => handleApiRequest('get_package_detail')}>Get Package Detail</button>
        <button onClick={() => handleApiRequest('ship_all_items')}>Ship All Items(in order)</button>
        <h3>Product APIs</h3>
        <button onClick={() => handleApiRequest('get_product_list')}>Get Product List</button>
        <button onClick={() => handleApiRequest('get_product_detail')}>Get Product Detail</button>
        <h3>Seller APIs</h3>
        <button onClick={() => handleApiRequest('get_active_shops')}>Get Active Shops</button>
        <h3>Return/Refund</h3>
        <button onClick={() => handleApiRequest('get_cancellations')}>Get Cancellations</button>
        <div className="result-section">
          <h2>Results</h2>
          <pre>{result}</pre>
        </div>
        {/* Export CSV Button */}
        <button onClick={exportToCSV}>Export CSV</button>
      </div>
    </div>
  );
};

export default Api;
