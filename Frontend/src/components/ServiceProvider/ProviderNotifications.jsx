

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider";


const ProviderNotifications = () => {
  const { userId } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);

  const getNotifications = async () => {
    try {
      const res = await axios.get(`/notification/provider/${userId}`);
      setNotifications(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userId) getNotifications();
  }, [userId]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Provider Notifications</h1>

      {notifications.map((n) => (
        <div key={n._id} className="border p-3 mb-2 rounded">
          <p>{n.message}</p>
          <p className="text-sm text-gray-500">{n.type}</p>
        </div>
      ))}
    </div>
  );
};

export default ProviderNotifications;