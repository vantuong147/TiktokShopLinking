const apiBaseURL = 'http://localhost:8000';

export const fetchData = (requestId, appKey, shopData, additionalParams = {}) => {
  return fetch(`${apiBaseURL}/api_handler`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      app_key: appKey,
      requestId: requestId,
      shop_data: JSON.stringify(shopData),
      ...additionalParams  // Spread additionalParams for any extra data
    }),
  })
  .then(response => {
    console.log("Received response from server");
    if (!response.ok) {
      console.error("Response not OK:", response.statusText);
    }
    return response.json();
  })
  .catch(error => {
    console.error('Failed to fetch data:', error);
    alert(`Error fetching data for request: ${requestId}`);
    throw error;
  });
};

// Wrapper functions for each specific request
export const fetchOrderList = () => {
  return fetchData('get_order_list');
};

export const fetchOrderDetail = (orderIDs) => {
  return fetchData('get_order_detail', { params: { orderIDs: orderIDs.trim() } });
};

export const fetchProductList = () => {

  return fetchData('get_product_list');
};
