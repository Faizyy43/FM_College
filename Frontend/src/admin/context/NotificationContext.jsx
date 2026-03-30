import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import api from "../../api/axios.js";

export const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [loadingMarkRead, setLoadingMarkRead] = useState(false);

  const isMounted = useRef(true);

  /* ================= GET AUTH TOKEN ================= */
  const getAuthConfig = () => {
    const token = localStorage.getItem("token");

    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  };

  /* ================= FETCH NOTIFICATIONS ================= */
  const fetchNotifications = useCallback(async () => {
    try {
      const res = await api.get("/notifications", getAuthConfig());

      const data = Array.isArray(res.data) ? res.data : [];

      if (isMounted.current) {
        setNotifications(data);
      }
    } catch (error) {
      console.error("Notification fetch error:", error);
    }
  }, []);

  /* ================= MARK ALL AS READ ================= */
  const markAllAsRead = useCallback(async () => {
    try {
      setLoadingMarkRead(true);

      await api.put("/notifications/mark-all-read", {}, getAuthConfig());

      // Instantly update UI
      setNotifications((prev) =>
        prev.map((n) => ({
          ...n,
          read: true,
        })),
      );
    } catch (error) {
      console.error("Mark read error:", error);
    } finally {
      setLoadingMarkRead(false);
    }
  }, []);

  /* ================= INITIAL FETCH + POLLING ================= */
  useEffect(() => {
    isMounted.current = true;

    fetchNotifications();

    const interval = setInterval(() => {
      fetchNotifications();
    }, 10000);

    return () => {
      isMounted.current = false;
      clearInterval(interval);
    };
  }, [fetchNotifications]);

  /* ================= UNREAD COUNT ================= */
  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !n.read).length;
  }, [notifications]);

  /* ================= CONTEXT VALUE ================= */
  const value = useMemo(() => {
    return {
      notifications,
      unreadCount,
      markAllAsRead,
      loadingMarkRead,
    };
  }, [notifications, unreadCount, markAllAsRead, loadingMarkRead]);

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
