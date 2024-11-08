import React, { useState, useEffect } from 'react';
import TopBar from './TopBar';

const LinkShop = () => {
  const [shopData, setShopData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newShopName, setNewShopName] = useState('');
  const [tempAvatars, setTempAvatars] = useState({}); // To temporarily store avatar files

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const response = await fetch('http://localhost:8000/get_link_shop_data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();

        setShopData(data.shopData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchShopData();
  }, []);

  const handleAddShop = async () => {
    if (!newShopName.trim()) {
      alert('Shop name cannot be empty.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/add_new_shop', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ shop_name: newShopName }),
      });

      const result = await response.json();
      alert(result.message);
    } catch (error) {
      alert('Error adding shop: ' + error.message);
    }
  };

  const handleDeleteShop = async (shop_id) => {
    try {
      const response = await fetch('http://localhost:8000/delete_shop', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ shop_id }),
      });

      const result = await response.json();
      alert(result.message);
      setShopData(shopData.filter(shop => shop.shop_id !== shop_id)); // Update the list locally
    } catch (error) {
      alert('Error deleting shop: ' + error.message);
    }
  };

  const handleUpdateShopInfo = async (tiktokShopId, updatedName) => {
    try {
      console.log("handleUpdate shop info: " + tiktokShopId + " | " + updatedName);
      console.log(tempAvatars);
      const avatarFile = tempAvatars[tiktokShopId]?.file; // Ensure file exists
      if (!avatarFile && !updatedName) {
        alert("Please provide a shop name or avatar.");
        return;
      }
  
      const formData = new FormData();
      formData.append('shop_id_tt', tiktokShopId);
      formData.append('new_name', updatedName);
      
      // Append avatar if it exists
      if (avatarFile) {
        alert(avatarFile);
        formData.append('avatar', avatarFile);
      }
  
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
      alert(result.message);
  
      // Update shop data with new name and avatar if changed
      setShopData(shopData.map(shop =>
        (shop.data.data && shop.data.data.shop_id === tiktokShopId)
        ? { ...shop, shop_name: updatedName, avatar: avatarFile ? URL.createObjectURL(avatarFile) : shop.avatar }
        : shop
      ));
  
      // Clear the temporary avatar state
      setTempAvatars(prev => ({ ...prev, [tiktokShopId]: null }));
  
    } catch (error) {
      // Improved error handling
      console.error('Error updating shop info:', error);
      alert('Error updating shop info: ' + error.message);
    }
  };
  

  const handleAvatarClick = (tiktokShopId) => {
    console.log("Upload avatar: " + tiktokShopId)
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = (event) => {
      const file = event.target.files[0];
      const fileURL = URL.createObjectURL(file); // Create a temporary URL for the file
      setTempAvatars(prev => ({ ...prev, [tiktokShopId]: { file, url: fileURL } })); // Store both the file and URL
    };

    input.click();
  };

  const handleApiButtonClick = (shop) => {
    document.cookie = `crrShopData=${JSON.stringify(shop)}; path=/`;
    document.cookie = `crrShopName=${shop.shop_id}; path=/`; 
    window.location.href = '/tts/api';
  };

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <TopBar />

      <h1>Shop Data</h1>
      <input 
        type="text" 
        value={newShopName} 
        onChange={(e) => setNewShopName(e.target.value)} 
        placeholder="Enter new shop name" 
      />
      <button onClick={handleAddShop}>Add Shop</button>

      {shopData.length > 0 ? (
        <div>
          {shopData.map((shop, index) => {
            let parsedData;
            try {
              parsedData = shop.data ? shop.data.data : {};
            } catch (e) {
              parsedData = {};
            }

            const { shop_id: tiktokShopId = "Undefined", shop_name: tiktokShopName = "Undefined", avatar = 'https://via.placeholder.com/100' } = parsedData;
            const displayedAvatar = tempAvatars[tiktokShopId]?.url || shop.avatar || avatar;

            return (
              <div key={index} style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
                <img 
                  src={displayedAvatar} 
                  onClick={() => handleAvatarClick(tiktokShopId)} 
                  alt="Shop Avatar" 
                  style={{ width: '100px', height: '100px', borderRadius: '50%' }} 
                />
                <h3>Information</h3>
                <label>
                  <strong>Shop ID (Tiktok):</strong> 
                  <input
                    type="text"
                    value={shop.shop_id}
                    onChange={(e) => {
                      const updatedShopData = shopData.map(s => 
                        s.shop_id === shop.shop_id ? { ...s, shop_id: e.target.value } : s
                      );
                      setShopData(updatedShopData);
                    }}
                    style={{ marginLeft: '10px' }}
                  />
                </label>
                <br></br>

                <strong>Shop ID(Tiktok):</strong> {tiktokShopId} <br />
                <strong>Shop Name(Tiktok):</strong> {tiktokShopName} <br />
                
                <h3>Data</h3>
                {/* <strong>Token exprite date:</strong> {new Date(shop.data.access_token_expire_in * 1000).toLocaleString()} <br /> */}
                {/* <strong>Data:</strong> {JSON.stringify(shop.data)} <br /> */}

                <button onClick={() => {
                  alert("Authorize for: " + shop.shop_id);
                  document.cookie = `crrShopName=${shop.shop_id}; path=/`;
                  window.open('https://services.tiktokshop.com/open/authorize?service_id=7428518803406079750', '_blank');
                }}>Authorize Shop</button>

                <button onClick={() => handleApiButtonClick(shop)}>API</button>
                
                <button onClick={() => handleUpdateShopInfo(tiktokShopId, shop.shop_id)}>Update Information</button>
                
                <button onClick={() => handleDeleteShop(shop.shop_id)}>Delete Shop</button>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No shop data available.</p>
      )}

    </div>
  );
};

export default LinkShop;
