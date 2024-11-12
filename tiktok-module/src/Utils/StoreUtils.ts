export const StoreUtils = {
    async fetchShopData()
    {
      try {
        // Tạo body để gửi kèm trong request POST
        const requestBody = {
          shop_name: 'myShop', // Ví dụ tham số bạn muốn gửi trong POST request
        };
  
        // Gửi yêu cầu POST với headers và body
        const response = await fetch('http://localhost:8000/get_link_shop_data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Đảm bảo gửi dữ liệu dạng JSON
          },
          body: JSON.stringify(requestBody), // Chuyển đối tượng thành chuỗi JSON
        });
  
        const result = await response.json();
        return {success: true, data: result};
      } catch (error) {
        console.error('Error:', error);
        return {success: false, data: error};
      }
    },
    async onEditShopConfirm(
        selectedShopId: string | null,
        newFriendlyName: string,
        fetchStores: () => void
      ){
        console.log("onEditShopConfirm", newFriendlyName);
        if (newFriendlyName.trim() === '') {
          alert("Please Input Shop Name:");
          return;
        } else {
          try {
            console.log("handleUpdate shop info: " + selectedShopId + " | " + newFriendlyName);      
            const formData = new FormData();
            formData.append('shop_id', selectedShopId + "");
            formData.append('new_name', newFriendlyName);
      
            const response = await fetch('http://localhost:8000/update_shop_information', {
              method: 'POST',
              body: formData,
            });
      
            // Check response status
            if (!response.ok) {
              const result = await response.json();
              throw new Error(result.message || 'Failed to update shop info');
            }
      
            const result = await response.json();
            console.log("Update result: ", result);
            fetchStores(); // Reload stores after update
      
          } catch (error) {
            // Improved error handling
            console.error('Error updating shop info:', error);
            alert('Error updating shop info: ' + error);
          }
        }
      },
    async onSubmitAddNewShop(shop_friendly_name: string){
      try {
        const response = await fetch('http://localhost:8000/add_new_shop', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ shop_name: shop_friendly_name }),
        });
  
        const result = await response.json();
        return {success: true, data: result};
      } catch (error) {
        alert('Error adding shop: ' + error);
        return {success: false, data: error};
      }
    },
    async onSubmitDeleteShop(shop_id: string){
      try {
        const response = await fetch('http://localhost:8000/delete_shop', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ shop_id }),
        });
  
        const result = await response.json();
        return {success: true, data: result};
      } catch (error) {
        alert('Error deleting shop: ' + error);
        return {success: false, data: error};
      }
    }
}
  
  
  