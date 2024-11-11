export const StoreUtils = {
    async onEditShopConfirm(
        selectedShopId: string | null,
        newFriendlyName: string,
        fetchStores: () => void
      ){
        console.log("onEditShopConfirm", newFriendlyName);
        if (newFriendlyName === '') {
          alert("Please Input Shop Name:");
          return;
        } else {
          try {
            console.log("handleUpdate shop info: " + selectedShopId + " | " + newFriendlyName);
            if (!newFriendlyName) {
              alert("Please provide a friendly name for your shop");
              return;
            }
      
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
      }
}
  
  
  